import json

import pytest
from pydantic import ValidationError

from copiloto_obras.limits import MAX_CONTEXT_BYTES, parse_context_bytes, validate_payload_limits
from copiloto_obras.models import AgentResponse, Contradiction, InformationItem, Recommendation


def test_context_byte_limit_is_explicit():
    with pytest.raises(ValueError, match="Contexto excede"):
        parse_context_bytes(b" " * (MAX_CONTEXT_BYTES + 1))


def test_information_text_and_reference_limits(context):
    base = dict(id="i", company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, type="RELATO", content="ok", source_type="RELATO_VERBAL", source_reference="fixture", confidence="BAIXA")
    with pytest.raises(ValidationError):
        InformationItem(**base, supporting_information_ids=[str(i) for i in range(21)])
    with pytest.raises(ValidationError):
        InformationItem(**{**base, "content": "x" * 4001})


def test_contradiction_and_recommendation_limits(context):
    with pytest.raises(ValidationError):
        Contradiction(id="c", company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, information_ids=[str(i) for i in range(21)], reason="x")
    with pytest.raises(ValidationError):
        Recommendation(recommendation_id="r", company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, content="x" * 2001, status="ATIVA", scope="obra", created_from_information_ids=["i"], created_by="modelo", created_at="2026-08-04T00:00:00Z", requires_human_validation=False)


def test_depth_and_volume_are_rejected():
    nested = value = {}
    for _ in range(14):
        value["x"] = {}
        value = value["x"]
    with pytest.raises(ValueError, match="profundidade"):
        validate_payload_limits(nested)
    with pytest.raises(ValueError, match="elementos"):
        validate_payload_limits([None] * 2_001)


def test_response_byte_limit_is_explicit():
    with pytest.raises(ValueError, match="bytes"):
        validate_payload_limits({"content": "x" * 262_145})


@pytest.mark.parametrize("field,count", [("information", 51), ("contradictions", 21), ("recommendations", 21)])
def test_collection_limits_are_enforced(context, field, count):
    info = {"id": "i", "company_id": context.company_id, "worksite_id": context.worksite_id, "period": context.authorized_period.model_dump(mode="json"), "type": "RELATO", "content": "x", "source_type": "RELATO_VERBAL", "source_reference": "fixture", "confidence": "BAIXA"}
    contradiction = {"id": "c", "company_id": context.company_id, "worksite_id": context.worksite_id, "period": context.authorized_period.model_dump(mode="json"), "information_ids": ["i", "j"], "reason": "x"}
    recommendation = {"recommendation_id": "r", "company_id": context.company_id, "worksite_id": context.worksite_id, "period": context.authorized_period.model_dump(mode="json"), "content": "x", "status": "ATIVA", "scope": "obra", "created_from_information_ids": ["i"], "created_by": "modelo", "created_at": "2026-08-04T00:00:00Z", "requires_human_validation": False}
    response = {"composition_result": "VALIDA", "session_state": {"previous": "CONTATO", "current": "DESCOBERTA"}, "interlocutor_id": "actor", "information": [], "evidence_gaps": [], "contradictions": [], "recommendations": [], "handoff": None, "unavailable_capabilities": [], "response_plan": {"intent": "INFORMATION_INCOMPLETE"}}
    response[field] = [{**{"information": info, "contradictions": contradiction, "recommendations": recommendation}[field], "id" if field != "recommendations" else "recommendation_id": str(index)} for index in range(count)]
    with pytest.raises(ValidationError):
        AgentResponse.model_validate(response)
