import hashlib
import json
from pathlib import Path

from .canonical_sources import required_canonical_paths
from .models import CompositionManifest, CompositionResult, ModuleRecord

PROFILE_MODULES = (
    "agents/runtime/composicao-de-especialistas.md",
    "agents/core/estados-de-interacao.md",
    "agents/core/handoff-humano.md",
    "agents/informodinamica/evidencias-e-incerteza.md",
    "agents/domains/obras/copiloto.md",
    "agents/copiloto-obras-system-prompt.md",
)


def find_repository_root(start: Path | None = None) -> Path:
    cursor = (start or Path.cwd()).resolve()
    for candidate in (cursor, *cursor.parents):
        if (candidate / ".git").exists() and (candidate / "AGENTS.md").exists():
            return candidate
    raise FileNotFoundError("Não foi possível localizar a raiz do repositório canônico.")


def sha256_bytes(content: bytes) -> str:
    return hashlib.sha256(content).hexdigest()


def calculate_manifest_sha256(composition_id: str, records: list[ModuleRecord]) -> str:
    payload = {
        "composition_id": composition_id,
        "modules": [{"path": item.path, "sha256": item.sha256} for item in records],
    }
    return hashlib.sha256(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    ).hexdigest()


def _relative(root: Path, path: Path) -> str:
    return path.resolve().relative_to(root.resolve()).as_posix()


def load_composition(root: Path) -> CompositionManifest:
    paths = [*required_canonical_paths(root), *(root / item for item in PROFILE_MODULES)]
    records: list[ModuleRecord] = []
    missing: list[str] = []
    order: list[str] = []
    for path in paths:
        relative = _relative(root, path)
        order.append(relative)
        if not path.is_file():
            missing.append(relative)
            records.append(ModuleRecord(path=relative, sha256="", loaded=False))
        else:
            content = path.read_bytes()
            records.append(ModuleRecord(path=relative, sha256=sha256_bytes(content), snapshot_bytes=content))
    result = CompositionResult.VALIDA if not missing else CompositionResult.INCOMPLETA
    composition_id = "copiloto_obras.v0.1"
    manifest_hash = calculate_manifest_sha256(composition_id, records)
    return CompositionManifest(
        composition_id=composition_id,
        result=result,
        modules=records,
        missing_modules=missing,
        effective_order=order,
        manifest_sha256=manifest_hash,
    )


def validated_composition_bytes(composition: CompositionManifest, *, max_bytes: int = 4_000_000) -> bytes:
    """Return only the immutable bytes whose hashes produced the manifest."""
    chunks: list[bytes] = []
    total = 0
    if composition.result is not CompositionResult.VALIDA:
        raise ValueError("Composição inválida ou incompleta.")
    for module in composition.modules:
        content = module.snapshot_bytes
        if not module.loaded or not content or sha256_bytes(content) != module.sha256:
            raise ValueError("Snapshot da composição inválido.")
        total += len(content)
        if total > max_bytes:
            raise ValueError("Composição excede o limite estrutural.")
        chunks.append(content)
    if composition.manifest_sha256 != calculate_manifest_sha256(composition.composition_id, composition.modules):
        raise ValueError("Manifesto não corresponde ao snapshot validado.")
    return b"\n\n".join(chunks)
