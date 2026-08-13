#!/usr/bin/env python3
"""Inventory filesystem metadata without opening source files."""

from __future__ import annotations

import argparse
import heapq
import logging
import os
import sqlite3
import sys
import time
import tracemalloc
from collections import Counter
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


SCHEMA = """
CREATE TABLE IF NOT EXISTS files (
    relative_path TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    extension TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    modified_utc TEXT NOT NULL,
    parent_directory TEXT NOT NULL,
    depth INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS errors (
    id INTEGER PRIMARY KEY,
    relative_path TEXT NOT NULL,
    operation TEXT NOT NULL,
    message TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS run (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
"""


@dataclass
class Frame:
    path: Path
    relative: str
    iterator: object
    size: int = 0
    files: int = 0


def utc_timestamp(value: float | None = None) -> str:
    moment = datetime.fromtimestamp(value, timezone.utc) if value is not None else datetime.now(timezone.utc)
    return moment.replace(microsecond=0).isoformat()


def extension_of(name: str) -> str:
    suffix = Path(name).suffix.lower()
    return suffix if suffix else "[sem extensão]"


def human_bytes(value: int) -> str:
    units = ("B", "KiB", "MiB", "GiB", "TiB", "PiB")
    amount = float(value)
    for unit in units:
        if amount < 1024 or unit == units[-1]:
            return f"{amount:.2f} {unit}"
        amount /= 1024
    return f"{value} B"


def top_push(heap: list[tuple[int, str]], size: int, path: str, limit: int = 20) -> None:
    item = (size, path)
    if len(heap) < limit:
        heapq.heappush(heap, item)
    elif item > heap[0]:
        heapq.heapreplace(heap, item)


def write_report(path: Path, stats: dict) -> None:
    def table_rows(counter: Counter[str], volumes: Counter[str]) -> list[str]:
        keys = sorted(counter, key=lambda key: (-counter[key], key))
        return [f"| `{key}` | {counter[key]} | {volumes[key]} | {human_bytes(volumes[key])} |" for key in keys]

    lines = [
        "# Inventário local do acervo — resumo de metadados",
        "",
        "**Classificação:** índice operacional local; não canônico.  ",
        f"**Raiz:** `{stats['root']}`  ",
        f"**Estado:** `{stats['status']}`  ",
        f"**Gerado em UTC:** {stats['finished_utc']}",
        "",
        "O inventário usa exclusivamente metadados do filesystem; nenhum arquivo-fonte foi aberto.",
        "",
        "## Totais",
        "",
        "| Indicador | Valor |",
        "|---|---:|",
        f"| Arquivos | {stats['files']} |",
        f"| Diretórios (incluindo a raiz) | {stats['directories']} |",
        f"| Tamanho total | {stats['bytes']} bytes ({human_bytes(stats['bytes'])}) |",
        f"| Profundidade máxima | {stats['max_depth']} |",
        f"| PDFs | {stats['pdfs']} |",
        f"| Outros formatos | {stats['files'] - stats['pdfs']} |",
        f"| Erros de acesso | {stats['errors']} |",
        f"| Tempo | {stats['elapsed_seconds']:.3f} s |",
        f"| Pico aproximado de memória Python | {human_bytes(stats['peak_python_bytes'])} |",
        "",
        "## Extensões",
        "",
        "| Extensão | Arquivos | Bytes | Volume |",
        "|---|---:|---:|---:|",
        *table_rows(stats["extensions"], stats["extension_bytes"]),
        "",
        "## Maiores diretórios",
        "",
        "| Diretório | Bytes acumulados | Volume |",
        "|---|---:|---:|",
        *[f"| `{name or '.'}` | {size} | {human_bytes(size)} |" for size, name in sorted(stats["largest_directories"], reverse=True)],
        "",
        "## Maiores arquivos por metadata",
        "",
        "| Arquivo | Bytes | Volume |",
        "|---|---:|---:|",
        *[f"| `{name}` | {size} | {human_bytes(size)} |" for size, name in sorted(stats["largest_files"], reverse=True)],
        "",
        "## Limites",
        "",
        "Tamanhos e datas vêm de `stat`; links simbólicos não são seguidos. Nomes e caminhos podem conter dados sensíveis e permanecem somente no índice local.",
        "",
    ]
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    temporary.replace(path)


def inventory(root: Path, output: Path, max_files: int | None, progress_every: int) -> dict:
    root = root.resolve(strict=True)
    if not root.is_dir():
        raise ValueError(f"root is not a directory: {root}")
    output.mkdir(parents=True, exist_ok=True)
    database = output / "inventory.sqlite3"
    report = output / "summary.md"
    log_path = output / "inventory.log"
    logger = logging.getLogger(f"archive_inventory.{id(output)}")
    logger.setLevel(logging.INFO)
    logger.propagate = False
    log_handler = logging.FileHandler(log_path, encoding="utf-8")
    log_handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    logger.addHandler(log_handler)

    connection = sqlite3.connect(database)
    connection.executescript(SCHEMA)
    connection.execute("DELETE FROM files")
    connection.execute("DELETE FROM errors")
    connection.execute("DELETE FROM run")
    connection.executemany("INSERT INTO run(key, value) VALUES (?, ?)", [("root", str(root)), ("status", "RUNNING"), ("started_utc", utc_timestamp())])
    connection.commit()

    stats = {"root": str(root), "files": 0, "directories": 1, "bytes": 0, "max_depth": 0, "pdfs": 0, "errors": 0,
             "extensions": Counter(), "extension_bytes": Counter(), "largest_directories": [], "largest_files": []}
    started = time.perf_counter()
    tracemalloc.start()

    def record_error(relative: str, operation: str, error: BaseException) -> None:
        stats["errors"] += 1
        message = f"{type(error).__name__}: {error}"
        connection.execute("INSERT INTO errors(relative_path, operation, message) VALUES (?, ?, ?)", (relative, operation, message))
        logger.warning("%s %s: %s", operation, relative, message)

    stack: list[Frame] = []
    status = "COMPLETE"
    try:
        stack.append(Frame(root, "", os.scandir(root)))
        while stack:
            frame = stack[-1]
            try:
                entry = next(frame.iterator)
            except StopIteration:
                frame.iterator.close()
                top_push(stats["largest_directories"], frame.size, frame.relative)
                stack.pop()
                if stack:
                    stack[-1].size += frame.size
                    stack[-1].files += frame.files
                continue
            except OSError as error:
                record_error(frame.relative, "scandir", error)
                frame.iterator.close()
                stack.pop()
                continue

            relative = entry.name if not frame.relative else f"{frame.relative}/{entry.name}"
            depth = relative.count("/") + 1
            try:
                if entry.is_symlink():
                    logger.info("symlink skipped: %s", relative)
                    continue
                if entry.is_dir(follow_symlinks=False):
                    stats["directories"] += 1
                    stats["max_depth"] = max(stats["max_depth"], depth)
                    try:
                        stack.append(Frame(Path(entry.path), relative, os.scandir(entry.path)))
                    except OSError as error:
                        record_error(relative, "scandir", error)
                    continue
                if not entry.is_file(follow_symlinks=False):
                    logger.info("non-regular entry skipped: %s", relative)
                    continue
                metadata = entry.stat(follow_symlinks=False)
            except OSError as error:
                record_error(relative, "stat", error)
                continue

            extension = extension_of(entry.name)
            parent = frame.relative
            connection.execute(
                "INSERT INTO files VALUES (?, ?, ?, ?, ?, ?, ?)",
                (relative, entry.name, extension, metadata.st_size, utc_timestamp(metadata.st_mtime), parent, depth),
            )
            stats["files"] += 1
            stats["bytes"] += metadata.st_size
            stats["max_depth"] = max(stats["max_depth"], depth)
            stats["extensions"][extension] += 1
            stats["extension_bytes"][extension] += metadata.st_size
            stats["pdfs"] += int(extension == ".pdf")
            frame.size += metadata.st_size
            frame.files += 1
            top_push(stats["largest_files"], metadata.st_size, relative)

            if stats["files"] % progress_every == 0:
                connection.commit()
                elapsed = time.perf_counter() - started
                print(f"progress files={stats['files']} directories={stats['directories']} elapsed={elapsed:.1f}s", flush=True)
            if max_files is not None and stats["files"] >= max_files:
                status = "LIMIT_REACHED"
                break
    except KeyboardInterrupt:
        status = "INTERRUPTED"
        logger.warning("interrupted safely after %d files", stats["files"])
    finally:
        for frame in stack:
            try:
                frame.iterator.close()
            except Exception:
                pass
        stats["elapsed_seconds"] = time.perf_counter() - started
        _, stats["peak_python_bytes"] = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        stats["status"] = status
        stats["finished_utc"] = utc_timestamp()
        connection.execute("INSERT OR REPLACE INTO run(key, value) VALUES ('status', ?)", (status,))
        connection.execute("INSERT OR REPLACE INTO run(key, value) VALUES ('finished_utc', ?)", (stats["finished_utc"],))
        connection.commit()
        write_report(report, stats)
        connection.close()
        logger.removeHandler(log_handler)
        log_handler.close()
    print(f"status={status} files={stats['files']} database={database} report={report}")
    return stats


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Inventory filesystem metadata without opening source files.")
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--dry-run", action="store_true", help="validate paths and print the plan without traversing the tree")
    parser.add_argument("--max-files", type=int)
    parser.add_argument("--progress-every", type=int, default=10_000)
    args = parser.parse_args(argv)
    if args.max_files is not None and args.max_files < 1:
        parser.error("--max-files must be positive")
    if args.progress_every < 1:
        parser.error("--progress-every must be positive")
    return args


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    root = args.root.resolve(strict=True)
    output = args.output.resolve()
    if output == root or root in output.parents:
        raise SystemExit("output must be outside the source tree")
    if args.dry_run:
        print(f"DRY RUN root={root} output={output} max_files={args.max_files}; no traversal performed")
        return 0
    stats = inventory(root, output, args.max_files, args.progress_every)
    return 130 if stats["status"] == "INTERRUPTED" else 0


if __name__ == "__main__":
    raise SystemExit(main())
