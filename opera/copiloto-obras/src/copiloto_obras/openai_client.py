import json
from dataclasses import dataclass
from typing import Callable

from .authorization import authorize_access
from .composition import validated_composition_bytes
from .config import RuntimeConfig
from .external_errors import sanitized_transport_error
from .limits import MAX_RESPONSE_BYTES
from .models import AuthorizedContext, Capability, CompositionManifest, Permission, SessionState
from .response_validation import validate_response


@dataclass(frozen=True)
class RawModelResponse:
    content: str


class OpenAIClient:
    """Pipeline externo explícito: autoriza, chama, valida e só então renderiza."""

    def __init__(self, config: RuntimeConfig, client_factory: Callable | None = None) -> None:
        self._config = config
        self._client_factory = client_factory

    def build_client(self):
        if not self._config.openai_api_key or not self._config.openai_model:
            raise RuntimeError("Credenciais e modelo são exigidos para chamada explícita.")
        if self._client_factory is not None:
            return self._client_factory()
        try:
            from openai import OpenAI
        except ImportError as exc:
            raise RuntimeError("Dependência externa indisponível.") from exc
        return OpenAI(api_key=self._config.openai_api_key, timeout=self._config.timeout_seconds, max_retries=self._config.max_retries)

    def respond(
        self,
        *,
        context: AuthorizedContext,
        session: SessionState,
        composition: CompositionManifest,
        requested_action: Permission,
        current_interlocutor_id: str,
        user_input: str,
    ) -> str:
        if len(user_input) > 8_000:
            raise ValueError("Entrada excede o limite permitido.")
        if session.company_id != context.company_id or session.worksite_id != context.worksite_id or session.authorized_period != context.authorized_period:
            raise ValueError("Sessão e contexto divergentes.")
        if session.current_interlocutor is None or session.current_interlocutor.id != current_interlocutor_id:
            raise ValueError("Interlocutor atual inválido.")
        allowed, _reason, actor = authorize_access(context, current_interlocutor_id, session.worksite_id, session.authorized_period.start, requested_action)
        if not allowed or actor is None:
            raise PermissionError("Chamada externa não autorizada.")
        if Capability.OPENAI_API_CALL in context.unavailable_capabilities or Capability.OPENAI_API_CALL in session.unavailable_capabilities:
            raise PermissionError("Capacidade externa indisponível.")
        if composition.manifest_sha256 != session.composition_manifest_sha256 or composition.composition_id != session.composition_id:
            raise ValueError("Composição e sessão divergentes.")

        canonical_bytes = validated_composition_bytes(composition)
        try:
            canonical_text = canonical_bytes.decode("utf-8")
        except UnicodeDecodeError as exc:
            raise ValueError("Snapshot canônico não é UTF-8 válido.") from exc

        try:
            client = self.build_client()
            api_response = client.responses.create(
                model=self._config.openai_model,
                input=[
                    {"role": "system", "content": canonical_text},
                    {"role": "user", "content": user_input},
                ],
            )
            raw_content = getattr(api_response, "output_text", "")
        except Exception as exc:
            raise sanitized_transport_error(exc) from None
        if not isinstance(raw_content, str) or not raw_content:
            raise ValueError("Resposta externa incompleta.")
        if len(raw_content.encode("utf-8")) > MAX_RESPONSE_BYTES:
            raise ValueError("Resposta externa excede o limite de bytes.")
        raw = RawModelResponse(content=raw_content)
        try:
            payload = json.loads(raw.content)
        except (json.JSONDecodeError, TypeError) as exc:
            raise ValueError("Resposta externa não contém JSON estruturado válido.") from exc
        if not isinstance(payload, dict):
            raise ValueError("Resposta externa deve ser um objeto estruturado.")
        return validate_response(payload, session, context, requested_action, current_interlocutor_id)
