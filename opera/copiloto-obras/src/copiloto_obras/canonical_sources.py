from pathlib import Path

CANONICAL_SOURCES = (
    "CONSTITUICAO.md",
    "DOCUMENTO_CANONICO.md",
    "GLOSSARIO_CANONICO.md",
    "01-teoria/TPC.md",
    "AXIOMAS_E_PROPOSICOES.md",
)


def required_canonical_paths(root: Path) -> list[Path]:
    return [root / relative for relative in CANONICAL_SOURCES]
