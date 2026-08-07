import argparse
import json
from pathlib import Path
from pydantic import ValidationError

from .composition import find_repository_root, load_composition
from .limits import parse_context_bytes
from .models import CompositionResult
from .session import create_session


def main() -> None:
    parser = argparse.ArgumentParser(description="Runtime local experimental do Copiloto de Obras")
    parser.add_argument("--context", required=True, help="Fixture JSON fictício, relativo ao diretório atual ou absoluto")
    parser.add_argument("--dry-run", action="store_true", help="Valida localmente; nunca chama a API")
    args = parser.parse_args()
    if not args.dry_run:
        parser.error("Neste MVP, somente --dry-run está disponível.")
    try:
        root = find_repository_root()
        context_path = Path(args.context)
        if not context_path.is_absolute():
            context_path = Path.cwd() / context_path
        context = parse_context_bytes(context_path.read_bytes())
        composition = load_composition(root)
    except (FileNotFoundError, OSError, ValueError, ValidationError, json.JSONDecodeError, UnicodeDecodeError):
        parser.exit(2, "Erro de validação local.\n")
    if composition.result is not CompositionResult.VALIDA:
        raise SystemExit(f"Composição bloqueada: {composition.result}")
    session = create_session(context, composition)
    output = {
        "mode": "DRY_RUN",
        "api_called": False,
        "composition_id": composition.composition_id,
        "composition_result": composition.result,
        "manifest_sha256": composition.manifest_sha256,
        "modules": [{"path": item.path, "sha256": item.sha256} for item in composition.modules],
        "session_id": session.session_id,
        "worksite_id": session.worksite_id,
        "unavailable_capabilities": sorted(item.value for item in session.unavailable_capabilities),
    }
    print(json.dumps(output, ensure_ascii=False, indent=2, default=str))
