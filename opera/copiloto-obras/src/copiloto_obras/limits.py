import json

from pydantic import ValidationError

from .models import AuthorizedContext

MAX_CONTEXT_BYTES = 65_536
MAX_RESPONSE_BYTES = 262_144
MAX_STRUCTURE_DEPTH = 12
MAX_STRUCTURE_NODES = 2_000
MAX_FREE_STRING = 8_000


def parse_context_bytes(content: bytes) -> AuthorizedContext:
    if len(content) > MAX_CONTEXT_BYTES:
        raise ValueError("Contexto excede o limite de bytes.")
    try:
        return AuthorizedContext.model_validate_json(content)
    except ValidationError:
        raise ValueError("Contexto rejeitado pelo schema estrutural.") from None


def validate_payload_limits(payload: object) -> None:
    try:
        encoded = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    except (TypeError, ValueError) as exc:
        raise ValueError("Resposta não é uma estrutura JSON válida.") from exc
    if len(encoded) > MAX_RESPONSE_BYTES:
        raise ValueError("Resposta excede o limite de bytes.")

    nodes = 0
    stack = [(payload, 0)]
    while stack:
        value, depth = stack.pop()
        nodes += 1
        if nodes > MAX_STRUCTURE_NODES:
            raise ValueError("Resposta excede o limite de elementos.")
        if depth > MAX_STRUCTURE_DEPTH:
            raise ValueError("Resposta excede a profundidade permitida.")
        if isinstance(value, str) and len(value) > MAX_FREE_STRING:
            raise ValueError("Texto excede o limite permitido.")
        if isinstance(value, dict):
            stack.extend((item, depth + 1) for item in value.values())
        elif isinstance(value, (list, tuple, set)):
            stack.extend((item, depth + 1) for item in value)
