#!/usr/bin/env python3
"""Route TEXT_NATIVE PDFs using structural metadata without persisting text."""

from __future__ import annotations

import argparse
import json
import logging
import multiprocessing
import re
import sqlite3
import statistics
import time
import tracemalloc
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader
from pypdf.generic import ContentStream


ROUTER_VERSION = "0.2.0"
SHORT_BLOCK_CHARS = 40
X_BIN_POINTS = 24


@dataclass(frozen=True)
class StructuralSignals:
    pages: int
    text_chars: int
    text_blocks: int
    short_blocks: int
    complex_pages: int
    image_pages: int
    rectangles: int
    line_ops: int
    painted_ops: int
    checkbox_marks: int
    list_markers: int
    median_x_bins: float
    average_text_density: float

    @property
    def blocks_per_page(self) -> float:
        return self.text_blocks / max(1, self.pages)

    @property
    def fragmentation_per_kchars(self) -> float:
        return self.text_blocks * 1000 / max(1, self.text_chars)

    @property
    def short_block_ratio(self) -> float:
        return self.short_blocks / max(1, self.text_blocks)

    @property
    def complex_page_ratio(self) -> float:
        return self.complex_pages / max(1, self.pages)

    @property
    def image_page_ratio(self) -> float:
        return self.image_pages / max(1, self.pages)

    @property
    def graphics_per_page(self) -> float:
        return (self.rectangles + self.line_ops) / max(1, self.pages)


def route(signals: StructuralSignals) -> tuple[str, list[str]]:
    """Return a conservative route and non-semantic reason codes."""
    if signals.pages <= 0 or signals.text_chars <= 0:
        return "STRUCTURAL_REVIEW", ["INSUFFICIENT_GEOMETRY"]

    reasons: list[str] = []
    if signals.checkbox_marks:
        reasons.append("CHECKBOX_PATTERN")
    if signals.rectangles / max(1, signals.pages) >= 20:
        reasons.append("RECTANGLE_DENSITY")
    if signals.graphics_per_page >= 35:
        reasons.append("VECTOR_DENSITY")
    if signals.fragmentation_per_kchars >= 30 and signals.short_block_ratio >= 0.68:
        reasons.append("FRAGMENTED_SHORT_BLOCKS")
    if (signals.complex_page_ratio >= 0.50 and signals.short_block_ratio >= 0.72
            and signals.fragmentation_per_kchars >= 25):
        reasons.append("RECURRING_SPATIAL_GRID")
    if signals.image_page_ratio >= 0.60 and signals.fragmentation_per_kchars >= 35:
        reasons.append("IMAGE_TEXT_LAYOUT")

    strong = {"CHECKBOX_PATTERN", "RECTANGLE_DENSITY", "FRAGMENTED_SHORT_BLOCKS", "RECURRING_SPATIAL_GRID"}
    if strong.intersection(reasons) or len(reasons) >= 2:
        return "STRUCTURED_TEXT", reasons

    clean = (
        signals.checkbox_marks == 0
        and signals.rectangles / max(1, signals.pages) < 3
        and signals.graphics_per_page < 12
        and signals.fragmentation_per_kchars < 25
        and signals.short_block_ratio < 0.65
        and signals.image_page_ratio < 0.60
        and signals.complex_page_ratio <= 0.75
    )
    if clean:
        return "LINEAR_TEXT", ["LOW_STRUCTURAL_SIGNAL"]
    return "STRUCTURAL_REVIEW", reasons or ["AMBIGUOUS_STRUCTURAL_SIGNAL"]


def page_has_image(page) -> bool:
    try:
        resources = page.get("/Resources") or {}
        xobjects = resources.get("/XObject") or {}
        xobjects = xobjects.get_object() if hasattr(xobjects, "get_object") else xobjects
        return any((obj.get_object() if hasattr(obj, "get_object") else obj).get("/Subtype") == "/Image"
                   for obj in xobjects.values())
    except Exception:
        return False


def analyze_pdf(path: Path) -> tuple[StructuralSignals, str | None]:
    """Inspect local PDF layout; extracted fragments are counted then discarded."""
    try:
        reader = PdfReader(path, strict=False)
        totals = dict(pages=0, text_chars=0, text_blocks=0, short_blocks=0,
                      complex_pages=0, image_pages=0, rectangles=0, line_ops=0,
                      painted_ops=0, checkbox_marks=0, list_markers=0)
        x_bins_per_page: list[int] = []
        density_per_page: list[float] = []
        for page in reader.pages:
            totals["pages"] += 1
            width, height = float(page.mediabox.width), float(page.mediabox.height)
            fragments: list[tuple[int, float, int, int]] = []

            def visitor(text, _cm, tm, _font, _font_size):
                value = (text or "").strip()
                if not value:
                    return
                is_list = int(bool(re.match(r"^(?:[-*\u2022\u25aa\u25e6]|\d+[.)]|[A-Za-z][.)])\s", value)))
                checks = sum(value.count(mark) for mark in "\u25a1\u2610\u2611\u2713")
                fragments.append((len(value), float(tm[4]), is_list, checks))

            page.extract_text(visitor_text=visitor)
            chars = sum(item[0] for item in fragments)
            blocks = len(fragments)
            x_values = [item[1] for item in fragments]
            x_bins = len({round(value / X_BIN_POINTS) for value in x_values})
            spread = (max(x_values) - min(x_values)) / width if x_values and width else 0
            totals["text_chars"] += chars
            totals["text_blocks"] += blocks
            totals["short_blocks"] += sum(item[0] <= SHORT_BLOCK_CHARS for item in fragments)
            totals["checkbox_marks"] += sum(item[3] for item in fragments)
            totals["list_markers"] += sum(item[2] for item in fragments)
            totals["complex_pages"] += int(x_bins >= 4 and blocks >= 10 and spread >= 0.35)
            totals["image_pages"] += int(page_has_image(page))
            x_bins_per_page.append(x_bins)
            density_per_page.append(chars / (width * height) * 1_000_000 if width and height else 0)
            try:
                for _, operator in ContentStream(page.get_contents(), reader).operations:
                    if operator == b"re":
                        totals["rectangles"] += 1
                    elif operator in (b"m", b"l"):
                        totals["line_ops"] += 1
                    if operator in (b"S", b"s", b"f", b"F", b"f*", b"B", b"B*", b"b", b"b*"):
                        totals["painted_ops"] += 1
            except Exception:
                pass
            del fragments
        signals = StructuralSignals(**totals,
            median_x_bins=float(statistics.median(x_bins_per_page)) if x_bins_per_page else 0,
            average_text_density=sum(density_per_page) / max(1, len(density_per_page)))
        return signals, None
    except Exception as error:
        empty = StructuralSignals(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        return empty, f"{type(error).__name__}: {error}"


def _analysis_worker(path: str, queue) -> None:
    queue.put(analyze_pdf(Path(path)))


def analyze_with_timeout(path: Path, timeout_seconds: int) -> tuple[StructuralSignals, str | None]:
    context = multiprocessing.get_context("spawn")
    queue = context.Queue(maxsize=1)
    process = context.Process(target=_analysis_worker, args=(str(path), queue))
    process.start(); process.join(timeout_seconds)
    if process.is_alive():
        process.terminate(); process.join(); queue.close()
        empty = StructuralSignals(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        return empty, f"TimeoutError: structural analysis exceeded {timeout_seconds}s"
    try:
        return queue.get_nowait()
    except Exception:
        empty = StructuralSignals(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        return empty, f"WorkerError: exit code {process.exitcode}"
    finally:
        queue.close()


def run_router(classification: Path, output: Path, progress_every: int = 10,
               timeout_seconds: int = 30) -> dict:
    started = time.perf_counter(); tracemalloc.start()
    source = sqlite3.connect(classification.resolve(strict=True))
    run = dict(source.execute("SELECT key,value FROM run"))
    if run.get("status") != "COMPLETE":
        raise ValueError("classification must be COMPLETE")
    root = Path(run["root"]).resolve(strict=True)
    documents = source.execute("""
        SELECT d.doc_id, MIN(p.relative_path), d.size_bytes
        FROM documents d JOIN paths p ON p.doc_id=d.doc_id
        WHERE d.class='TEXT_NATIVE' GROUP BY d.doc_id ORDER BY d.size_bytes, d.doc_id
    """).fetchall()
    output = output.resolve(); output.mkdir(parents=True, exist_ok=True)
    if output == root or root in output.parents:
        raise ValueError("output must be outside source tree")
    database = output / "structural-router.sqlite3"
    if database.exists(): database.unlink()
    target = sqlite3.connect(database)
    target.executescript("""
      CREATE TABLE run(key TEXT PRIMARY KEY,value TEXT NOT NULL);
      CREATE TABLE routes(doc_id TEXT PRIMARY KEY,route TEXT NOT NULL,reasons TEXT NOT NULL,
        pages INTEGER,text_chars INTEGER,text_blocks INTEGER,short_blocks INTEGER,complex_pages INTEGER,
        image_pages INTEGER,rectangles INTEGER,line_ops INTEGER,painted_ops INTEGER,checkbox_marks INTEGER,
        list_markers INTEGER,median_x_bins REAL,average_text_density REAL,error TEXT);
    """)
    params = {"router_version": ROUTER_VERSION, "short_block_chars": SHORT_BLOCK_CHARS,
              "x_bin_points": X_BIN_POINTS, "timeout_seconds": timeout_seconds}
    target.executemany("INSERT INTO run VALUES (?,?)", [("root", str(root)), ("status", "RUNNING"),
        ("started_utc", datetime.now(timezone.utc).isoformat()), ("parameters", json.dumps(params, sort_keys=True))])
    logger = logging.getLogger(f"structural_router.{id(output)}"); logger.setLevel(logging.INFO); logger.propagate=False
    handler = logging.FileHandler(output / "structural-router.log", encoding="utf-8"); logger.addHandler(handler)
    status = "COMPLETE"
    try:
        for index, (identity, relative, _size) in enumerate(documents, 1):
            signals, error = analyze_with_timeout(root / Path(relative), timeout_seconds)
            category, reasons = route(signals)
            if error:
                category, reasons = "STRUCTURAL_REVIEW", ["ANALYSIS_ERROR"]
                logger.warning("%s %s", identity, error)
            target.execute("INSERT INTO routes VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (identity, category, json.dumps(reasons), *asdict(signals).values(), error))
            if index % progress_every == 0:
                target.commit(); print(f"progress routed={index}/{len(documents)}", flush=True)
    except KeyboardInterrupt:
        status = "INTERRUPTED"; logger.warning("interrupted safely")
    target.execute("INSERT OR REPLACE INTO run VALUES ('status',?)", (status,)); target.commit()
    routes = dict(target.execute("SELECT route,COUNT(*) FROM routes GROUP BY route"))
    errors = target.execute("SELECT COUNT(*) FROM routes WHERE error IS NOT NULL").fetchone()[0]
    elapsed = time.perf_counter() - started; _, peak = tracemalloc.get_traced_memory(); tracemalloc.stop()
    summary = {"status": status, "expected": len(documents), "routed": sum(routes.values()),
               "routes": routes, "errors": errors, "elapsed_seconds": elapsed,
               "peak_python_bytes": peak, "parameters": params}
    (output / "structural-router-summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    target.close(); source.close(); logger.removeHandler(handler); handler.close()
    print(json.dumps(summary)); return summary


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--classification", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--progress-every", type=int, default=10)
    parser.add_argument("--timeout-seconds", type=int, default=30)
    return parser.parse_args()


if __name__ == "__main__":
    arguments = parse_args()
    run_router(arguments.classification, arguments.output, arguments.progress_every, arguments.timeout_seconds)
