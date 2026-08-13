#!/usr/bin/env python3
"""Find byte-identical files from an archive inventory using streaming SHA-256."""

from __future__ import annotations

import argparse
import hashlib
import json
import logging
import sqlite3
import time
import tracemalloc
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path


SCHEMA = """
CREATE TABLE run (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE hashes (
    relative_path TEXT PRIMARY KEY,
    size_bytes INTEGER NOT NULL,
    extension TEXT NOT NULL,
    sha256 TEXT,
    bytes_read INTEGER NOT NULL,
    error TEXT
);
CREATE TABLE duplicate_groups (
    group_id INTEGER PRIMARY KEY,
    sha256 TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    copies INTEGER NOT NULL,
    redundant_bytes INTEGER NOT NULL
);
CREATE TABLE duplicate_members (
    group_id INTEGER NOT NULL,
    relative_path TEXT NOT NULL,
    extension TEXT NOT NULL,
    PRIMARY KEY (group_id, relative_path)
);
CREATE TABLE same_size_different_hash (
    size_bytes INTEGER NOT NULL,
    relative_path TEXT NOT NULL,
    sha256 TEXT NOT NULL,
    PRIMARY KEY (size_bytes, relative_path)
);
CREATE TABLE errors (
    relative_path TEXT PRIMARY KEY,
    message TEXT NOT NULL
);
"""


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def human_bytes(value: int) -> str:
    units = ("B", "KiB", "MiB", "GiB", "TiB")
    amount = float(value)
    for unit in units:
        if amount < 1024 or unit == units[-1]:
            return f"{amount:.2f} {unit}"
        amount /= 1024
    return f"{value} B"


def hash_file(path: Path, chunk_size: int) -> tuple[str, int]:
    digest = hashlib.sha256()
    read_bytes = 0
    with path.open("rb") as source:
        while chunk := source.read(chunk_size):
            digest.update(chunk)
            read_bytes += len(chunk)
    return digest.hexdigest(), read_bytes


def load_inventory(inventory: Path) -> tuple[Path, list[tuple[str, int, str]], dict]:
    with closing(sqlite3.connect(inventory)) as database:
        schema = {row[1] for row in database.execute("PRAGMA table_info(files)")}
        required = {"relative_path", "size_bytes", "extension"}
        if not required.issubset(schema):
            raise ValueError(f"inventory files table lacks: {sorted(required - schema)}")
        run = dict(database.execute("SELECT key, value FROM run"))
        if run.get("status") != "COMPLETE":
            raise ValueError(f"inventory status must be COMPLETE, got {run.get('status')!r}")
        root = Path(run["root"]).resolve(strict=True)
        rows = database.execute(
            "SELECT relative_path, size_bytes, extension FROM files "
            "WHERE size_bytes IN (SELECT size_bytes FROM files GROUP BY size_bytes HAVING COUNT(*) > 1) "
            "ORDER BY size_bytes, relative_path"
        ).fetchall()
        corpus = database.execute("SELECT COUNT(*), COALESCE(SUM(size_bytes), 0) FROM files").fetchone()
        unique_sizes = database.execute(
            "SELECT COUNT(*), COALESCE(SUM(size_bytes), 0) FROM files "
            "WHERE size_bytes IN (SELECT size_bytes FROM files GROUP BY size_bytes HAVING COUNT(*) = 1)"
        ).fetchone()
        candidate_groups = database.execute(
            "SELECT COUNT(*) FROM (SELECT size_bytes FROM files GROUP BY size_bytes HAVING COUNT(*) > 1)"
        ).fetchone()[0]
        extensions = dict(database.execute("SELECT extension, COUNT(*) FROM files GROUP BY extension"))
        extension_bytes = dict(database.execute("SELECT extension, SUM(size_bytes) FROM files GROUP BY extension"))
    return root, rows, {
        "files": corpus[0], "bytes": corpus[1], "unique_size_files": unique_sizes[0],
        "unique_size_bytes": unique_sizes[1], "candidate_groups": candidate_groups,
        "candidate_files": len(rows), "candidate_bytes": sum(row[1] for row in rows),
        "extensions": extensions, "extension_bytes": extension_bytes,
    }


def write_outputs(output: Path, database: sqlite3.Connection, stats: dict) -> None:
    groups = database.execute(
        "SELECT group_id, sha256, size_bytes, copies, redundant_bytes FROM duplicate_groups "
        "ORDER BY redundant_bytes DESC, group_id"
    ).fetchall()
    ndjson_tmp = output / "duplicate-groups.ndjson.tmp"
    with ndjson_tmp.open("w", encoding="utf-8", newline="\n") as stream:
        for group_id, digest, size, copies, redundant in groups:
            paths = [row[0] for row in database.execute(
                "SELECT relative_path FROM duplicate_members WHERE group_id=? ORDER BY relative_path", (group_id,)
            )]
            stream.write(json.dumps({"group_id": group_id, "sha256": digest, "size_bytes": size,
                                     "copies": copies, "redundant_bytes": redundant, "paths": paths},
                                    ensure_ascii=False) + "\n")
    ndjson_tmp.replace(output / "duplicate-groups.ndjson")

    top_lines = []
    for group_id, _, size, copies, redundant in groups[:20]:
        paths = [row[0] for row in database.execute(
            "SELECT relative_path FROM duplicate_members WHERE group_id=? ORDER BY relative_path", (group_id,)
        )]
        top_lines.append(f"### Grupo {group_id} — {copies} cópias — {human_bytes(size)} cada — {human_bytes(redundant)} redundantes")
        top_lines.extend(["", *[f"- `{path}`" for path in paths], ""])

    false_cases = database.execute(
        "SELECT size_bytes, COUNT(*), COUNT(DISTINCT sha256) FROM same_size_different_hash "
        "GROUP BY size_bytes ORDER BY size_bytes DESC"
    ).fetchall()
    false_lines = []
    for size, files, hashes in false_cases:
        false_lines.extend([f"### {size} bytes — {files} arquivos — {hashes} hashes distintos", ""])
        false_lines.extend(
            f"- `{relative}` — `{digest}`"
            for relative, digest in database.execute(
                "SELECT relative_path, sha256 FROM same_size_different_hash WHERE size_bytes=? ORDER BY relative_path",
                (size,),
            )
        )
        false_lines.append("")
    pdf = stats["pdf"]
    lines = [
        "# Deduplicação estrutural do acervo — resumo",
        "",
        "**Classificação:** relatório operacional local; não canônico.  ",
        f"**Raiz:** `{stats['root']}`  ",
        f"**Estado:** `{stats['status']}`  ",
        f"**Gerado em UTC:** {stats['finished_utc']}",
        "",
        "Hashes SHA-256 foram calculados em streaming somente para grupos candidatos por tamanho. Nenhum formato foi interpretado.",
        "",
        "## Corpus original",
        "",
        f"- Arquivos: {stats['files']}",
        f"- Bytes: {stats['bytes']} ({human_bytes(stats['bytes'])})",
        f"- Arquivos com tamanho único: {stats['unique_size_files']}",
        f"- Arquivos em {stats['candidate_groups']} grupos candidatos: {stats['candidate_files']}",
        f"- Bytes em grupos candidatos: {stats['candidate_bytes']}",
        "",
        "## Resultado",
        "",
        f"- Arquivos binariamente únicos: {stats['unique_files']}",
        f"- Tamanho lógico do corpus único: {stats['unique_bytes']} ({human_bytes(stats['unique_bytes'])})",
        f"- Grupos duplicados: {stats['duplicate_groups']}",
        f"- Cópias redundantes: {stats['redundant_files']}",
        f"- Bytes redundantes: {stats['redundant_bytes']} ({human_bytes(stats['redundant_bytes'])})",
        f"- Redundância por arquivos: {stats['file_redundancy_percent']:.2f}%",
        f"- Redundância por bytes: {stats['byte_redundancy_percent']:.2f}%",
        f"- Erros: {stats['errors']}",
        "",
        "## PDFs",
        "",
        f"- Totais: {pdf['total']}",
        f"- Únicos: {pdf['unique']}",
        f"- Redundantes: {pdf['redundant']}",
        f"- Volume original: {pdf['original_bytes']} ({human_bytes(pdf['original_bytes'])})",
        f"- Volume único: {pdf['unique_bytes']} ({human_bytes(pdf['unique_bytes'])})",
        f"- Bytes redundantes: {pdf['redundant_bytes']} ({human_bytes(pdf['redundant_bytes'])})",
        "",
        "## Performance",
        "",
        f"- Duração: {stats['elapsed_seconds']:.3f} s",
        f"- Bytes efetivamente lidos: {stats['bytes_read']} ({human_bytes(stats['bytes_read'])})",
        f"- Pico aproximado de memória Python: {stats['peak_python_bytes']} bytes ({human_bytes(stats['peak_python_bytes'])})",
        "",
        "## Maiores grupos duplicados",
        "",
        *(top_lines or ["Nenhum.", ""]),
        "## Mesmo tamanho, hashes diferentes",
        "",
        *(false_lines or ["Nenhum."]),
        "",
        "Duplicata binária não implica cópia descartável; todos os caminhos foram preservados para análise futura de proveniência.",
        "",
    ]
    report_tmp = output / "duplicate-summary.md.tmp"
    report_tmp.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    report_tmp.replace(output / "duplicate-summary.md")


def deduplicate(inventory: Path, output: Path, chunk_size: int, progress_every: int) -> dict:
    root, candidates, stats = load_inventory(inventory.resolve(strict=True))
    output = output.resolve()
    if output == root or root in output.parents:
        raise ValueError("output must be outside the source tree")
    output.mkdir(parents=True, exist_ok=True)

    db_path = output / "dedup.sqlite3"
    if db_path.exists():
        db_path.unlink()
    database = sqlite3.connect(db_path)
    database.executescript(SCHEMA)
    log_handler = logging.FileHandler(output / "dedup.log", encoding="utf-8")
    log_handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    logger = logging.getLogger(f"archive_deduplicate.{id(output)}")
    logger.setLevel(logging.INFO); logger.propagate = False; logger.addHandler(log_handler)
    started = time.perf_counter(); tracemalloc.start(); status = "COMPLETE"; bytes_read = 0; errors = 0
    database.executemany("INSERT INTO run VALUES (?, ?)", [("root", str(root)), ("status", "RUNNING"), ("started_utc", utc_now())])
    database.commit()
    try:
        for index, (relative, size, extension) in enumerate(candidates, 1):
            try:
                digest, actual_read = hash_file(root / Path(relative), chunk_size)
                bytes_read += actual_read
                if actual_read != size:
                    raise OSError(f"size changed: inventory={size}, read={actual_read}")
                database.execute("INSERT INTO hashes VALUES (?, ?, ?, ?, ?, NULL)",
                                 (relative, size, extension, digest, actual_read))
            except OSError as error:
                errors += 1
                message = f"{type(error).__name__}: {error}"
                database.execute("INSERT INTO hashes VALUES (?, ?, ?, NULL, 0, ?)", (relative, size, extension, message))
                database.execute("INSERT INTO errors VALUES (?, ?)", (relative, message))
                logger.warning("%s: %s", relative, message)
            if index % progress_every == 0:
                database.commit()
                print(f"progress hashed={index}/{len(candidates)} bytes_read={bytes_read}", flush=True)
    except KeyboardInterrupt:
        status = "INTERRUPTED"
        logger.warning("interrupted safely; partial hashes committed")

    if status == "COMPLETE":
        duplicate_keys = database.execute(
            "SELECT size_bytes, sha256, COUNT(*) copies FROM hashes WHERE sha256 IS NOT NULL "
            "GROUP BY size_bytes, sha256 HAVING COUNT(*) > 1 ORDER BY size_bytes*(COUNT(*)-1) DESC, sha256"
        ).fetchall()
        for group_id, (size, digest, copies) in enumerate(duplicate_keys, 1):
            database.execute("INSERT INTO duplicate_groups VALUES (?, ?, ?, ?, ?)",
                             (group_id, digest, size, copies, size * (copies - 1)))
            database.execute(
                "INSERT INTO duplicate_members SELECT ?, relative_path, extension FROM hashes "
                "WHERE size_bytes=? AND sha256=?", (group_id, size, digest)
            )
        mixed_sizes = [row[0] for row in database.execute(
            "SELECT size_bytes FROM hashes WHERE sha256 IS NOT NULL GROUP BY size_bytes HAVING COUNT(DISTINCT sha256)>1"
        )]
        for size in mixed_sizes:
            database.execute(
                "INSERT INTO same_size_different_hash SELECT size_bytes, relative_path, sha256 FROM hashes "
                "WHERE size_bytes=? AND sha256 IS NOT NULL", (size,)
            )

    database.execute("INSERT OR REPLACE INTO run VALUES ('status', ?)", (status,))
    database.execute("INSERT OR REPLACE INTO run VALUES ('finished_utc', ?)", (utc_now(),))
    database.commit()
    _, peak = tracemalloc.get_traced_memory(); tracemalloc.stop()
    stats.update({"root": str(root), "status": status, "bytes_read": bytes_read, "errors": errors,
                  "elapsed_seconds": time.perf_counter() - started, "peak_python_bytes": peak,
                  "finished_utc": utc_now()})
    if status == "COMPLETE":
        stats["duplicate_groups"] = database.execute("SELECT COUNT(*) FROM duplicate_groups").fetchone()[0]
        stats["redundant_files"], stats["redundant_bytes"] = database.execute(
            "SELECT COALESCE(SUM(copies-1),0), COALESCE(SUM(redundant_bytes),0) FROM duplicate_groups"
        ).fetchone()
        distinct_candidate_hashes = database.execute(
            "SELECT COUNT(*) FROM (SELECT DISTINCT size_bytes, sha256 FROM hashes WHERE sha256 IS NOT NULL)"
        ).fetchone()[0]
        stats["unique_files"] = stats["unique_size_files"] + distinct_candidate_hashes
        stats["unique_bytes"] = stats["bytes"] - stats["redundant_bytes"]
        stats["file_redundancy_percent"] = 100 * stats["redundant_files"] / stats["files"] if stats["files"] else 0
        stats["byte_redundancy_percent"] = 100 * stats["redundant_bytes"] / stats["bytes"] if stats["bytes"] else 0
        pdf_redundant_files, pdf_redundant_bytes = database.execute(
            "SELECT COALESCE(SUM(copies-1),0), COALESCE(SUM(size_bytes*(copies-1)),0) FROM ("
            "SELECT g.size_bytes, g.copies FROM duplicate_groups g WHERE EXISTS ("
            "SELECT 1 FROM duplicate_members m WHERE m.group_id=g.group_id AND m.extension='.pdf'))"
        ).fetchone()
        stats["pdf"] = {"total": stats["extensions"].get(".pdf", 0),
                        "original_bytes": stats["extension_bytes"].get(".pdf", 0),
                        "redundant": pdf_redundant_files, "redundant_bytes": pdf_redundant_bytes}
        stats["pdf"]["unique"] = stats["pdf"]["total"] - pdf_redundant_files
        stats["pdf"]["unique_bytes"] = stats["pdf"]["original_bytes"] - pdf_redundant_bytes
        write_outputs(output, database, stats)
    database.close(); logger.removeHandler(log_handler); log_handler.close()
    print(f"status={status} files={stats['files']} candidates={stats['candidate_files']} bytes_read={bytes_read} output={output}")
    return stats


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Hash repeated-size candidates from an archive inventory.")
    parser.add_argument("--inventory", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--chunk-size", type=int, default=1024 * 1024)
    parser.add_argument("--progress-every", type=int, default=10)
    args = parser.parse_args(argv)
    if args.chunk_size < 1 or args.progress_every < 1:
        parser.error("chunk size and progress interval must be positive")
    return args


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    stats = deduplicate(args.inventory, args.output, args.chunk_size, args.progress_every)
    return 130 if stats["status"] == "INTERRUPTED" else (1 if stats["errors"] else 0)


if __name__ == "__main__":
    raise SystemExit(main())
