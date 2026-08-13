#!/usr/bin/env python3
"""Convert validated TEXT_NATIVE PDFs to provenance-tracked Markdown locally."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import sqlite3
import statistics
import time
from collections import Counter
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader


CONVERTER_VERSION = "0.1.0"
PAGE_MARKER = "<!-- source-page: {page} -->"
LIST_RE = re.compile(r"^\s*(?:[-*•]|\.\s|\d+[.)]|[A-Za-z][.)])\s*")
NUMBERED_HEADING_RE = re.compile(r"^\d+(?:\.\d+)*\.?\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ]", re.UNICODE)
CONTROL_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def normalized_chars(text: str) -> int:
    return sum(character.isalnum() for character in text)


def normalize_line(line: str) -> str:
    return re.sub(r"\s+", " ", CONTROL_RE.sub("", line)).strip()


def margin_key(line: str) -> str:
    return re.sub(r"\d+", "#", normalize_line(line)).casefold()


def repeated_margins(pages: list[list[str]]) -> set[str]:
    if len(pages) < 3:
        return set()
    candidates = Counter()
    for lines in pages:
        nonempty = [normalize_line(line) for line in lines if normalize_line(line)]
        for line in set(nonempty[:2] + nonempty[-2:]):
            if 1 < len(line) <= 160:
                candidates[margin_key(line)] += 1
    threshold = math.ceil(len(pages) * 0.60)
    return {key for key, count in candidates.items() if count >= threshold}


def markdown_line(line: str) -> tuple[str, str | None]:
    line = normalize_line(line)
    if not line:
        return "", None
    if NUMBERED_HEADING_RE.match(line) and len(line) <= 120:
        return f"## {line}", "heading"
    if LIST_RE.match(line):
        return re.sub(r"^\s*(?:[•*]|\.)\s+", "- ", line), "list"
    letters = [character for character in line if character.isalpha()]
    if 3 <= len(letters) and len(line) <= 100 and all(character.isupper() for character in letters):
        return f"## {line}", "heading"
    return line, None


def render_markdown(page_texts: list[str]) -> tuple[str, dict]:
    page_lines = [text.splitlines() for text in page_texts]
    margins = repeated_margins(page_lines)
    output: list[str] = []
    headings = lists = paragraphs = tables = 0
    warnings: list[str] = []
    for page_number, lines in enumerate(page_lines, 1):
        output.extend([PAGE_MARKER.format(page=page_number), ""])
        current: list[str] = []

        def flush() -> None:
            nonlocal paragraphs
            if current:
                output.append(" ".join(current).strip()); output.append(""); current.clear(); paragraphs += 1

        for raw_line in lines:
            ambiguous_columns = bool(re.search(r"\S(?:\s{3,}|\t+)\S", raw_line))
            line = normalize_line(raw_line)
            if not line or margin_key(line) in margins or re.fullmatch(r"(?:page|p[aá]gina)?\s*\d+(?:\s+de\s+\d+)?", line, re.IGNORECASE):
                flush(); continue
            converted, kind = markdown_line(line)
            if kind:
                flush(); output.extend([converted, ""])
                headings += kind == "heading"; lists += kind == "list"
            elif ambiguous_columns:
                flush(); output.extend([line, ""]); warnings.append(f"PAGE_{page_number}_TABLE_OR_COLUMNS_AMBIGUOUS")
            else:
                current.append(converted)
        flush()
    markdown = "\n".join(output).rstrip() + "\n"
    if not markdown.strip(): warnings.append("EMPTY_OUTPUT")
    return markdown, {"headings": headings, "lists": lists, "tables": tables, "paragraphs": paragraphs,
                      "source_pages": len(page_texts), "warnings": sorted(set(warnings)),
                      "repeated_margins_removed": len(margins)}


def resolve_document(classification: Path, doc_id: str) -> tuple[Path, dict]:
    with closing(sqlite3.connect(classification)) as database:
        run = dict(database.execute("SELECT key,value FROM run"))
        row = database.execute(
            "SELECT doc_id,sha256,size_bytes,class,pages FROM documents WHERE doc_id=?", (doc_id,)
        ).fetchone()
        if row is None:
            raise ValueError(f"unknown doc_id: {doc_id}")
        if row[3] != "TEXT_NATIVE":
            raise ValueError(f"{doc_id} has class {row[3]}, expected TEXT_NATIVE")
        relative = database.execute(
            "SELECT relative_path FROM paths WHERE doc_id=? ORDER BY relative_path LIMIT 1", (doc_id,)
        ).fetchone()[0]
    return Path(run["root"]) / Path(relative), {
        "doc_id": row[0], "source_sha256": row[1], "source_size_bytes": row[2], "source_class": row[3],
        "source_pages": row[4], "classifier_version": json.loads(run["parameters"])["classifier_version"],
    }


def convert_document(classification: Path, output_root: Path, identity: str) -> dict:
    started = time.perf_counter()
    source, provenance = resolve_document(classification.resolve(strict=True), identity)
    reader = PdfReader(source, strict=False)
    page_texts = [(page.extract_text() or "") for page in reader.pages]
    raw_text = "\n".join(page_texts)
    markdown, structure = render_markdown(page_texts)
    markdown_bytes = markdown.encode("utf-8")
    source_characters = normalized_chars(raw_text)
    markdown_characters = normalized_chars(re.sub(r"<!-- source-page: \d+ -->", "", markdown))
    retention = markdown_characters / source_characters if source_characters else 0.0
    warnings = list(structure["warnings"])
    if retention < 0.90: warnings.append("LOW_TEXT_RETENTION")
    if retention > 1.05: warnings.append("POSSIBLE_TEXT_DUPLICATION")
    status = "PASS" if not warnings else "PASS_WITH_WARNINGS"
    destination = output_root.resolve() / identity
    destination.mkdir(parents=True, exist_ok=True)
    (destination / "document.md").write_bytes(markdown_bytes)
    manifest = {
        **provenance, "converter_version": CONVERTER_VERSION,
        "conversion_timestamp": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "markdown_sha256": sha256_bytes(markdown_bytes), "markdown_size_bytes": len(markdown_bytes),
        "validation_status": status, "text_retention_ratio": round(retention, 6),
        "source_text_characters": source_characters, "markdown_text_characters": markdown_characters,
        "markdown_lines": len(markdown.splitlines()), "markdown_words": len(markdown.split()),
        "estimated_tokens": math.ceil(len(markdown) / 4), "token_estimation": "ceil(markdown_characters_total/4)",
        "structure": structure, "warnings": sorted(set(warnings)),
        "conversion_seconds": round(time.perf_counter() - started, 6),
    }
    (destination / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--classification", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--doc-id", action="append", required=True)
    args = parser.parse_args()
    results = [convert_document(args.classification, args.output, identity) for identity in args.doc_id]
    print(json.dumps([{key: item[key] for key in ("doc_id", "validation_status", "text_retention_ratio", "markdown_size_bytes", "estimated_tokens", "conversion_seconds", "warnings")} for item in results], ensure_ascii=False))
    return 1 if any(item["validation_status"] == "FAIL" for item in results) else 0


if __name__ == "__main__":
    raise SystemExit(main())
