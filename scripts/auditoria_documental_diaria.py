#!/usr/bin/env python3
"""Produce a deterministic operational report about tracked Markdown files."""

from __future__ import annotations

import argparse
import re
import subprocess
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
LINK_RE = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
MARKER_RE = re.compile(r"\b(TODO|FIXME|PENDENTE|BLOQUEADO)\b", re.IGNORECASE)
URI_SCHEME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9+.-]*:")
LARGE_FILE_BYTES = 100_000


def git_lines(*args: str) -> list[str]:
    result = subprocess.run(
        ["git", *args],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return [line for line in result.stdout.splitlines() if line]


def git_paths(*args: str) -> list[str]:
    result = subprocess.run(
        ["git", *args, "-z"],
        cwd=ROOT,
        check=True,
        capture_output=True,
    )
    return [path.decode("utf-8") for path in result.stdout.split(b"\0") if path]


def tracked_markdown() -> list[Path]:
    return sorted(ROOT / path for path in git_paths("ls-files", "*.md"))


def zone(path: Path) -> str:
    relative = path.relative_to(ROOT)
    return relative.parts[0] if len(relative.parts) > 1 else "raiz"


def local_link_target(source: Path, raw_target: str) -> Path | None:
    target = raw_target.strip().split(maxsplit=1)[0].strip("<>")
    if not target or target.startswith("#") or URI_SCHEME_RE.match(target):
        return None
    without_anchor = unquote(target.split("#", 1)[0])
    if not without_anchor:
        return None
    return (source.parent / without_anchor).resolve()


def markdown_report() -> tuple[str, int]:
    files = tracked_markdown()
    zones = Counter(zone(path) for path in files)
    missing_h1: list[str] = []
    broken_links: list[tuple[str, str]] = []
    large_files: list[tuple[str, int]] = []
    markers = Counter()

    for path in files:
        relative = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8", errors="replace")
        first_content = next((line.strip() for line in text.splitlines() if line.strip()), "")
        if not first_content.startswith("# "):
            missing_h1.append(relative)

        size = path.stat().st_size
        if size >= LARGE_FILE_BYTES:
            large_files.append((relative, size))

        markers.update(match.upper() for match in MARKER_RE.findall(text))
        for raw_target in LINK_RE.findall(text):
            target = local_link_target(path, raw_target)
            if target is not None and not target.exists():
                broken_links.append((relative, raw_target))

    recent = git_paths("log", "--since=24 hours ago", "--name-only", "--pretty=format:")
    recent_markdown = sorted({path for path in recent if path.lower().endswith(".md")})
    generated = datetime.now(timezone.utc).replace(microsecond=0).isoformat()

    lines = [
        "# Auditoria documental diaria",
        "",
        f"**Gerado em UTC:** {generated}  ",
        "**Classificacao:** relatorio operacional automatizado; nao normativo",
        "",
        "## Sintese",
        "",
        "| Indicador | Valor |",
        "|---|---:|",
        f"| Arquivos Markdown rastreados | {len(files)} |",
        f"| Zonas documentais | {len(zones)} |",
        f"| Links locais quebrados | {len(broken_links)} |",
        f"| Arquivos sem H1 inicial | {len(missing_h1)} |",
        f"| Arquivos com pelo menos {LARGE_FILE_BYTES // 1000} kB | {len(large_files)} |",
        f"| Documentos alterados nas ultimas 24h | {len(recent_markdown)} |",
        "",
        "## Distribuicao por zona",
        "",
        "| Zona | Documentos |",
        "|---|---:|",
    ]
    lines.extend(f"| `{name}` | {count} |" for name, count in sorted(zones.items()))

    lines.extend(["", "## Marcadores explicitos", "", "| Marcador | Ocorrencias |", "|---|---:|"])
    if markers:
        lines.extend(f"| `{name}` | {count} |" for name, count in sorted(markers.items()))
    else:
        lines.append("| Nenhum | 0 |")

    def add_list(title: str, values: list[str], empty: str) -> None:
        lines.extend(["", f"## {title}", ""])
        lines.extend(f"- `{value}`" for value in values) if values else lines.append(empty)

    add_list("Alterados nas ultimas 24 horas", recent_markdown, "Nenhum documento rastreado foi alterado.")
    add_list("Arquivos sem H1 inicial", missing_h1, "Nenhum.")
    add_list(
        "Arquivos grandes",
        [f"{path} ({size} bytes)" for path, size in sorted(large_files, key=lambda item: -item[1])],
        "Nenhum.",
    )

    lines.extend(["", "## Links locais quebrados", ""])
    if broken_links:
        lines.extend(f"- `{source}` -> `{target}`" for source, target in broken_links)
    else:
        lines.append("Nenhum.")

    lines.extend(
        [
            "",
            "## Limites",
            "",
            "Este relatorio identifica sinais mecanicos. Ele nao avalia verdade teorica, qualidade de evidencia, coerencia semantica ou autoridade documental.",
            "",
        ]
    )
    return "\n".join(lines), len(broken_links)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--strict", action="store_true", help="fail when broken local links exist")
    args = parser.parse_args()

    report, broken_count = markdown_report()
    output = args.output if args.output.is_absolute() else ROOT / args.output
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(report, encoding="utf-8", newline="\n")
    print(report)
    return 1 if args.strict and broken_count else 0


if __name__ == "__main__":
    raise SystemExit(main())
