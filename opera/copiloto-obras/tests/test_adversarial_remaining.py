import hashlib
from unittest.mock import patch

import pytest
from pydantic import ValidationError

from copiloto_obras.composition import validated_composition_bytes
from copiloto_obras.limits import validate_payload_limits
from copiloto_obras.models import CompositionManifest, CompositionResult, ModuleRecord, Permission
from copiloto_obras.response_validation import validate_response
from copiloto_obras.session import create_session, switch_interlocutor


def session_for(context):
    return switch_interlocutor(create_session(context, CompositionManifest(result=CompositionResult.VALIDA, modules=[])), context, "mariana-lopes")


def information(context, **changes):
    value = {"id": "i1", "company_id": context.company_id, "worksite_id": context.worksite_id, "period": context.authorized_period.model_dump(mode="json"), "type": "RELATO", "content": "seguro", "source_type": "RELATO_VERBAL", "source_reference": "fixture", "confidence": "BAIXA", "supporting_information_ids": []}
    value.update(changes)
    return value


def payload(context, **changes):
    value = {"composition_result": "VALIDA", "session_state": {"previous": "CONTATO", "current": "DESCOBERTA"}, "interlocutor_id": "mariana-lopes", "information": [information(context)], "evidence_gaps": [], "contradictions": [], "recommendations": [], "handoff": None, "unavailable_capabilities": [], "response_plan": {"intent": "INFORMATION_AVAILABLE", "approved_information_ids": ["i1"]}}
    value.update(changes)
    return value


def reject_before_renderer(context, proposal, match=None):
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises((ValueError, ValidationError), match=match):
            validate_response(proposal, session_for(context), context, Permission.VIEW_PRODUCTION, "mariana-lopes")
    renderer.assert_not_called()


def test_adv_001_free_text_response_rejected(context):
    reject_before_renderer(context, "INSTRUCAO_LIVRE")


def test_adv_002_extra_field_rejected(context):
    reject_before_renderer(context, {**payload(context), "free_text": "bypass"})


def test_adv_004_incomplete_response_rejected(context):
    proposal = payload(context)
    proposal.pop("response_plan")
    reject_before_renderer(context, proposal)


def test_adv_005_unauthorized_interlocutor_cannot_obtain_content(context):
    proposal = payload(context, interlocutor_id="intruso")
    reject_before_renderer(context, proposal, "Interlocutor")


def test_adv_006_cross_company_information_rejected(context):
    reject_before_renderer(context, payload(context, information=[information(context, company_id="outra")]), "empresa divergente")


def test_adv_007_duplicate_information_id_rejected(context):
    item = information(context)
    reject_before_renderer(context, payload(context, information=[item, item]), "duplicado")


def test_adv_008_excessive_references_rejected_by_schema(context):
    reject_before_renderer(context, payload(context, information=[information(context, supporting_information_ids=[str(i) for i in range(21)])]))


def test_adv_009_invalid_recommendation_support_rejected(context):
    recommendation = {"recommendation_id": "r1", "company_id": context.company_id, "worksite_id": context.worksite_id, "period": context.authorized_period.model_dump(mode="json"), "content": "ação", "status": "ATIVA", "scope": "obra", "created_from_information_ids": ["missing"], "created_by": "modelo", "created_at": "2026-08-04T00:00:00Z", "requires_human_validation": False}
    reject_before_renderer(context, payload(context, recommendations=[recommendation], response_plan={"intent": "RECOMMENDATION_ACTIVE", "approved_recommendation_ids": ["r1"]}), "suporte inexistente")


def test_adv_011_oversized_response_rejected():
    with pytest.raises(ValueError, match="bytes|Texto"):
        validate_payload_limits({"x": "A" * 300_000})


def test_adv_012_excessive_depth_rejected():
    root = cursor = {}
    for _ in range(14):
        cursor["x"] = {}
        cursor = cursor["x"]
    with pytest.raises(ValueError, match="profundidade"):
        validate_payload_limits(root)


def test_adv_014_interlocutor_switch_drops_previous_permissions(context):
    session = switch_interlocutor(session_for(context), context, "mariana-lopes")
    session = switch_interlocutor(session, context, "carlos-silva")
    assert Permission.VIEW_CONSOLIDATED_COSTS not in session.effective_permissions


def test_adv_015_tampered_composition_snapshot_rejected():
    record = ModuleRecord(path="x", sha256=hashlib.sha256(b"original").hexdigest(), snapshot_bytes=b"trocado")
    composition = CompositionManifest(result="VALIDA", modules=[record])
    with pytest.raises(ValueError, match="Snapshot"):
        validated_composition_bytes(composition)


def test_adv_018_secret_never_appears_in_validation_error(context):
    secret = "SEGREDO_ADV018_NUNCA_EXIBIR"
    proposal = payload(context, information=[information(context, company_id="outra", content=secret)])
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError) as error:
            validate_response(proposal, session_for(context), context, Permission.VIEW_PRODUCTION, "mariana-lopes")
    renderer.assert_not_called()
    assert secret not in str(error.value)
    with pytest.raises(ValueError) as schema_error:
        validate_response({**payload(context), "free_text": secret}, session_for(context), context, Permission.VIEW_PRODUCTION, "mariana-lopes")
    assert secret not in str(schema_error.value)
