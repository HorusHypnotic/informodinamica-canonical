#!/usr/bin/env python3
"""Deterministically classify unique PDFs by local structural signals."""

from __future__ import annotations

import argparse
import hashlib
import json
import logging
import multiprocessing
import sqlite3
import time
import tracemalloc
from collections import Counter
from contextlib import closing
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader


CLASSIFIER_VERSION = "1.0.0"
MIN_TEXT_CHARS = 40
TEXT_NATIVE_RATIO = 0.80
MIXED_MIN_RATIO = 0.20
VISUAL_IMAGE_RATIO = 0.60
VISUAL_MAX_AVG_TEXT_CHARS = 400


@dataclass(frozen=True)
class Signals:
    pages: int
    text_pages: int
    image_pages: int
    text_chars: int


def doc_id(digest: str) -> str:
    return f"DOC-{digest[:8]}"


def classify(signals: Signals) -> str:
    if signals.pages <= 0:
        return "FAILED"
    text_ratio = signals.text_pages / signals.pages
    image_ratio = signals.image_pages / signals.pages
    average_text = signals.text_chars / signals.pages
    if text_ratio == 0:
        return "SCAN"
    if MIXED_MIN_RATIO <= text_ratio < TEXT_NATIVE_RATIO:
        return "MIXED"
    if text_ratio < MIXED_MIN_RATIO:
        return "SCAN"
    if image_ratio >= VISUAL_IMAGE_RATIO and average_text < VISUAL_MAX_AVG_TEXT_CHARS:
        return "VISUAL_TECHNICAL"
    return "TEXT_NATIVE"


def sha256_file(path: Path, chunk_size: int = 1024 * 1024) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        while chunk := stream.read(chunk_size):
            digest.update(chunk)
    return digest.hexdigest()


def page_has_image(page) -> bool:
    try:
        resources = page.get("/Resources") or {}
        xobjects = resources.get("/XObject") or {}
        xobjects = xobjects.get_object() if hasattr(xobjects, "get_object") else xobjects
        return any((obj.get_object() if hasattr(obj, "get_object") else obj).get("/Subtype") == "/Image"
                   for obj in xobjects.values())
    except Exception:
        return False


def analyze_pdf(path: Path) -> tuple[str, Signals, bool, str | None]:
    try:
        reader = PdfReader(path, strict=False)
        encrypted = bool(reader.is_encrypted)
        if encrypted:
            try:
                if reader.decrypt("") == 0:
                    return "ENCRYPTED_OR_RESTRICTED", Signals(0, 0, 0, 0), True, None
            except Exception:
                return "ENCRYPTED_OR_RESTRICTED", Signals(0, 0, 0, 0), True, None
        pages = text_pages = image_pages = text_chars = 0
        for page in reader.pages:
            pages += 1
            text = page.extract_text() or ""
            chars = len(text.strip())
            text_chars += chars
            text_pages += int(chars >= MIN_TEXT_CHARS)
            image_pages += int(page_has_image(page))
            del text
        signals = Signals(pages, text_pages, image_pages, text_chars)
        return classify(signals), signals, encrypted, None
    except Exception as error:
        return "FAILED", Signals(0, 0, 0, 0), False, f"{type(error).__name__}: {error}"


def _analysis_worker(path: str, queue) -> None:
    queue.put(analyze_pdf(Path(path)))


def analyze_with_timeout(path: Path, timeout_seconds: int) -> tuple[str, Signals, bool, str | None]:
    context = multiprocessing.get_context("spawn")
    queue = context.Queue(maxsize=1)
    process = context.Process(target=_analysis_worker, args=(str(path), queue))
    process.start(); process.join(timeout_seconds)
    if process.is_alive():
        process.terminate(); process.join()
        queue.close()
        return "FAILED", Signals(0, 0, 0, 0), False, f"TimeoutError: structural analysis exceeded {timeout_seconds}s"
    try:
        return queue.get_nowait()
    except Exception:
        return "FAILED", Signals(0, 0, 0, 0), False, f"WorkerError: exit code {process.exitcode}"
    finally:
        queue.close()


def unique_pdfs(inventory: Path, dedup: Path) -> tuple[Path, list[dict], int]:
    with closing(sqlite3.connect(inventory)) as inv, closing(sqlite3.connect(dedup)) as dup:
        run = dict(inv.execute("SELECT key,value FROM run"))
        if run.get("status") != "COMPLETE":
            raise ValueError("inventory must be COMPLETE")
        root = Path(run["root"]).resolve(strict=True)
        pdfs = inv.execute("SELECT relative_path,size_bytes FROM files WHERE extension='.pdf' ORDER BY relative_path").fetchall()
        known = {path: digest for path, digest in dup.execute(
            "SELECT relative_path,sha256 FROM hashes WHERE extension='.pdf' AND sha256 IS NOT NULL"
        )}
    by_identity: dict[tuple[int, str], dict] = {}
    bytes_hashed = 0
    for relative, size in pdfs:
        digest = known.get(relative)
        if digest is None:
            digest = sha256_file(root / Path(relative)); bytes_hashed += size
        item = by_identity.setdefault((size, digest), {"sha256": digest, "size_bytes": size, "paths": []})
        item["paths"].append(relative)
    return root, list(by_identity.values()), bytes_hashed


def run_classifier(inventory: Path, dedup: Path, output: Path, progress_every: int = 10, timeout_seconds: int = 30) -> dict:
    started = time.perf_counter(); tracemalloc.start()
    root, documents, hash_bytes = unique_pdfs(inventory.resolve(strict=True), dedup.resolve(strict=True))
    output = output.resolve(); output.mkdir(parents=True, exist_ok=True)
    if output == root or root in output.parents:
        raise ValueError("output must be outside source tree")
    db_path = output / "classification.sqlite3"
    if db_path.exists(): db_path.unlink()
    db = sqlite3.connect(db_path)
    db.executescript("""
    CREATE TABLE run(key TEXT PRIMARY KEY,value TEXT NOT NULL);
    CREATE TABLE documents(doc_id TEXT PRIMARY KEY,sha256 TEXT UNIQUE,size_bytes INTEGER,class TEXT,
      pages INTEGER,text_pages INTEGER,image_pages INTEGER,text_chars INTEGER,encrypted INTEGER,error TEXT);
    CREATE TABLE paths(doc_id TEXT,relative_path TEXT,PRIMARY KEY(doc_id,relative_path));
    """)
    params = {"classifier_version": CLASSIFIER_VERSION, "min_text_chars": MIN_TEXT_CHARS,
              "text_native_ratio": TEXT_NATIVE_RATIO, "mixed_min_ratio": MIXED_MIN_RATIO,
              "visual_image_ratio": VISUAL_IMAGE_RATIO, "visual_max_avg_text_chars": VISUAL_MAX_AVG_TEXT_CHARS}
    db.executemany("INSERT INTO run VALUES (?,?)", [("root",str(root)),("status","RUNNING"),
        ("started_utc",datetime.now(timezone.utc).isoformat()),("parameters",json.dumps(params,sort_keys=True))])
    handler = logging.FileHandler(output / "classifier.log", encoding="utf-8")
    logger = logging.getLogger(f"pdf_classifier.{id(output)}"); logger.setLevel(logging.INFO); logger.propagate=False; logger.addHandler(handler)
    try:
        for index, item in enumerate(sorted(documents, key=lambda x: x["sha256"]), 1):
            identity = doc_id(item["sha256"])
            category, signals, encrypted, error = analyze_with_timeout(root / Path(item["paths"][0]), timeout_seconds)
            db.execute("INSERT INTO documents VALUES (?,?,?,?,?,?,?,?,?,?)", (identity,item["sha256"],item["size_bytes"],category,
                signals.pages,signals.text_pages,signals.image_pages,signals.text_chars,int(encrypted),error))
            db.executemany("INSERT INTO paths VALUES (?,?)", [(identity,path) for path in item["paths"]])
            if error: logger.warning("%s %s", identity, error)
            if index % progress_every == 0: db.commit(); print(f"progress classified={index}/{len(documents)}",flush=True)
        status="COMPLETE"
    except KeyboardInterrupt:
        status="INTERRUPTED"; logger.warning("interrupted safely")
    db.execute("INSERT OR REPLACE INTO run VALUES ('status',?)",(status,)); db.commit()
    classes=dict(db.execute("SELECT class,COUNT(*) FROM documents GROUP BY class"))
    totals=db.execute("SELECT COUNT(*),COALESCE(SUM(pages),0),COALESCE(SUM(text_pages),0),COALESCE(SUM(image_pages),0),SUM(error IS NOT NULL) FROM documents").fetchone()
    elapsed=time.perf_counter()-started; _,peak=tracemalloc.get_traced_memory(); tracemalloc.stop()
    summary={"status":status,"expected":len(documents),"classified":totals[0],"classes":classes,"pages":totals[1],
             "text_pages":totals[2],"no_text_pages":totals[1]-totals[2],"image_pages":totals[3],"errors":totals[4],
             "hash_bytes":hash_bytes,"elapsed_seconds":elapsed,"peak_python_bytes":peak,"parameters":params}
    with (output/"classification.ndjson.tmp").open("w",encoding="utf-8",newline="\n") as stream:
        for row in db.execute("SELECT doc_id,sha256,size_bytes,class,pages,text_pages,image_pages,text_chars,encrypted,error FROM documents ORDER BY doc_id"):
            keys=("doc_id","sha256","size_bytes","class","pages","text_pages","image_pages","text_chars","encrypted","error")
            record=dict(zip(keys,row)); record["paths"]=[p[0] for p in db.execute("SELECT relative_path FROM paths WHERE doc_id=? ORDER BY relative_path",(row[0],))]
            stream.write(json.dumps(record,ensure_ascii=False)+"\n")
    (output/"classification.ndjson.tmp").replace(output/"classification.ndjson")
    conversion={"automatic":classes.get("TEXT_NATIVE",0),"visual_preservation":classes.get("MIXED",0)+classes.get("VISUAL_TECHNICAL",0),
                "future_ocr":classes.get("SCAN",0),"manual_review":classes.get("FAILED",0)+classes.get("ENCRYPTED_OR_RESTRICTED",0)}
    lines=["# Classificação estrutural de PDFs únicos","","**Classificação:** índice operacional local; não canônico.","",
      f"- Versão: `{CLASSIFIER_VERSION}`",f"- PDFs classificados: {totals[0]}",f"- Páginas: {totals[1]}",
      f"- Páginas com texto detectável: {totals[2]}",f"- Páginas sem texto detectável: {totals[1]-totals[2]}","","## Classes",""]
    for name in ("TEXT_NATIVE","SCAN","MIXED","VISUAL_TECHNICAL","ENCRYPTED_OR_RESTRICTED","FAILED"):
        count=classes.get(name,0); lines.append(f"- {name}: {count} ({100*count/totals[0] if totals[0] else 0:.2f}%)")
    lines += ["","## Conversibilidade futura","",f"- Conversão automática: {conversion['automatic']}",
      f"- Preservação visual: {conversion['visual_preservation']}",f"- OCR futuro: {conversion['future_ocr']}",
      f"- Revisão manual: {conversion['manual_review']}","","## Performance","",f"- Duração: {elapsed:.3f} s",
      f"- Pico aproximado de memória Python: {peak} bytes",f"- Erros: {totals[4]}",""]
    (output/"classification-summary.md.tmp").write_text("\n".join(lines),encoding="utf-8",newline="\n")
    (output/"classification-summary.md.tmp").replace(output/"classification-summary.md")
    db.close(); logger.removeHandler(handler); handler.close()
    print(json.dumps(summary,ensure_ascii=False)); return summary


def main() -> int:
    parser=argparse.ArgumentParser(); parser.add_argument("--inventory",type=Path,required=True); parser.add_argument("--dedup",type=Path,required=True)
    parser.add_argument("--output",type=Path,required=True); parser.add_argument("--progress-every",type=int,default=10)
    parser.add_argument("--timeout-seconds",type=int,default=30); args=parser.parse_args()
    result=run_classifier(args.inventory,args.dedup,args.output,args.progress_every,args.timeout_seconds)
    return 130 if result["status"]=="INTERRUPTED" else 0


if __name__ == "__main__": raise SystemExit(main())
