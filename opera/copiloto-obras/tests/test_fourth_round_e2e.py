import hashlib
import json
from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import patch

import pytest

from copiloto_obras.composition import calculate_manifest_sha256
from copiloto_obras.config import RuntimeConfig
from copiloto_obras.external_errors import ExternalTransportError
from copiloto_obras.models import (
    AccessDecision,
    Capability,
    CompositionManifest,
    CompositionResult,
    InformationItem,
    ModuleRecord,
    Permission,
    Recommendation,
    RecommendationReactivation,
    SessionState,
)
from copiloto_obras.openai_client import OpenAIClient
from copiloto_obras.recommendations import record_recommendation_reactivation
from copiloto_obras.renderer import render
from copiloto_obras.response_validation import validate_response
from copiloto_obras.session import create_session, switch_interlocutor


def composition():
    content = b"composicao fixture"
    module = ModuleRecord(path="fixture", sha256=hashlib.sha256(content).hexdigest(), snapshot_bytes=content)
    return CompositionManifest(result=CompositionResult.VALIDA, modules=[module], manifest_sha256=calculate_manifest_sha256("copiloto_obras.v0.1", [module]))


def linked_session(context, actor="mariana-lopes"):
    return switch_interlocutor(create_session(context, composition()), context, actor)


def payload(actor="mariana-lopes", information=None):
    return {
        "composition_result": "VALIDA",
        "session_state": {"previous": "CONTATO", "current": "DESCOBERTA"},
        "interlocutor_id": actor,
        "information": information or [],
        "evidence_gaps": [],
        "contradictions": [],
        "recommendations": [],
        "handoff": None,
        "unavailable_capabilities": [],
        "response_plan": {"intent": "INFORMATION_INCOMPLETE"},
    }


def test_e2e_session_without_interlocutor_is_rejected(context):
    session = create_session(context, composition())
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="sem interlocutor"):
            validate_response(payload(), session, context, Permission.VIEW_PRODUCTION, "mariana-lopes")
    renderer.assert_not_called()
    assert session.current_state.value == "CONTATO"


def test_e2e_company_divergence_is_rejected(context):
    session = linked_session(context)
    divergent = context.model_copy(update={"company_id": "outra-empresa"})
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="Contexto e sessão divergentes"):
            validate_response(payload(), session, divergent, Permission.VIEW_PRODUCTION, "mariana-lopes")
    renderer.assert_not_called()


def test_e2e_late_reference_failure_preserves_transition(context):
    session = linked_session(context)
    item = {"id": "i1", "company_id": context.company_id, "worksite_id": context.worksite_id, "period": context.authorized_period.model_dump(mode="json"), "type": "INFERENCIA", "content": "x", "source_type": "DERIVADA", "source_reference": "fixture", "confidence": "BAIXA", "supporting_information_ids": ["missing"]}
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="Referência inexistente"):
            validate_response(payload(information=[item]), session, context, Permission.VIEW_PRODUCTION, "mariana-lopes")
    renderer.assert_not_called()
    assert session.current_state.value == "CONTATO"


def test_e2e_valid_transition_is_committed_only_after_render(context):
    session = linked_session(context)
    assert validate_response(payload(), session, context, Permission.VIEW_PRODUCTION, "mariana-lopes") == "Informações validadas:"
    assert session.current_state.value == "DESCOBERTA"


def test_e2e_renderer_failure_preserves_previous_state(context):
    session = linked_session(context)
    with patch("copiloto_obras.response_validation.render", side_effect=ValueError("falha segura")):
        with pytest.raises(ValueError, match="falha segura"):
            validate_response(payload(), session, context, Permission.VIEW_PRODUCTION, "mariana-lopes")
    assert session.current_state.value == "CONTATO"


def test_e2e_invalid_transition_preserves_previous_state(context):
    session = linked_session(context)
    proposal = payload()
    proposal["session_state"]["current"] = "OPERACAO_ATIVA"
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="Transição"):
            validate_response(proposal, session, context, Permission.VIEW_PRODUCTION, "mariana-lopes")
    renderer.assert_not_called()
    assert session.current_state.value == "CONTATO"


class SensitiveTransportError(RuntimeError):
    status_code = 503
    request_id = "safe-request-42"


def external_client(output=None, error=None):
    def create(**_kwargs):
        if error is not None:
            raise error
        return SimpleNamespace(output_text=output)
    config = RuntimeConfig("fixture-key", "fixture-model", 1, 0, "INFO")
    return OpenAIClient(config, client_factory=lambda: SimpleNamespace(responses=SimpleNamespace(create=create)))


def api_scope(context):
    clean = context.model_copy(update={"unavailable_capabilities": context.unavailable_capabilities - {Capability.OPENAI_API_CALL}})
    return clean, linked_session(clean)


def test_e2e_transport_exception_is_sanitized(context):
    secret = "SEGREDO_TRANSPORTE_HEADER_PROMPT"
    clean, session = api_scope(context)
    with pytest.raises(ExternalTransportError) as captured:
        external_client(error=SensitiveTransportError(secret)).respond(context=clean, session=session, composition=composition(), requested_action=Permission.VIEW_PRODUCTION, current_interlocutor_id="mariana-lopes", user_input="x")
    assert secret not in str(captured.value)
    assert captured.value.code == "EXT-001" and captured.value.status_code == 503 and captured.value.correlation_id == "safe-request-42"


def test_e2e_oversized_raw_response_never_calls_json_parser(context):
    clean, session = api_scope(context)
    oversized = '{"x":"' + "á" * 140_000 + '"}'
    with patch("copiloto_obras.openai_client.json.loads") as parser:
        with pytest.raises(ValueError, match="excede"):
            external_client(output=oversized).respond(context=clean, session=session, composition=composition(), requested_action=Permission.VIEW_PRODUCTION, current_interlocutor_id="mariana-lopes", user_input="x")
    parser.assert_not_called()


def test_e2e_renderer_rejects_same_worksite_from_other_company(context):
    secret = "SEGREDO_EMPRESA_RENDERER"
    session = linked_session(context)
    item = InformationItem(id="i", company_id="outra-empresa", worksite_id=context.worksite_id, period=context.authorized_period, type="RELATO", content=secret, source_type="RELATO_VERBAL", source_reference="fixture", confidence="BAIXA")
    with pytest.raises(ValueError) as captured:
        render(session, AccessDecision(allowed=True), {"i": item}, {}, ["i"], [])
    assert secret not in str(captured.value)


def suspended_recommendation(context):
    return Recommendation(recommendation_id="r1", company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, content="ação", status="SUSPENSA", scope="obra", created_from_information_ids=["i1"], created_by="humano", created_at=datetime(2026, 8, 4, tzinfo=timezone.utc), requires_human_validation=False)


def reactivation_event(context):
    return RecommendationReactivation(event_id="ev-e2e", recommendation_id="r1", human_actor_id="renata-alves", role="ENGENHEIRA_RESPONSAVEL", company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, timestamp=datetime(2026, 8, 5, tzinfo=timezone.utc), origin="HUMAN")


def suspended_session(context):
    session = linked_session(context, "renata-alves")
    return session.model_copy(update={"suspended_recommendations": [suspended_recommendation(context)]})


def test_e2e_valid_reactivation_moves_state_and_consumes_event(context):
    original = suspended_session(context)
    updated = record_recommendation_reactivation(original, context, reactivation_event(context))
    assert original.suspended_recommendations[0].status.value == "SUSPENSA"
    assert not updated.suspended_recommendations
    assert updated.active_recommendations[0].status.value == "ATIVA"
    assert updated.consumed_reactivation_event_ids == {"ev-e2e"}


def test_e2e_reactivation_event_replay_is_rejected(context):
    updated = record_recommendation_reactivation(suspended_session(context), context, reactivation_event(context))
    snapshot = updated.model_dump()
    with pytest.raises(ValueError, match="duplicado|Somente recomendação suspensa"):
        record_recommendation_reactivation(updated, context, reactivation_event(context))
    assert updated.model_dump() == snapshot


def test_e2e_failure_after_proposed_consumption_preserves_original(context):
    original = suspended_session(context)
    snapshot = original.model_dump()
    with patch.object(SessionState, "model_validate", side_effect=ValueError("falha final simulada")):
        with pytest.raises(ValueError, match="falha final"):
            record_recommendation_reactivation(original, context, reactivation_event(context))
    assert original.model_dump() == snapshot
