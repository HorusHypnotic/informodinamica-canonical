from unittest.mock import patch

import pytest

from copiloto_obras.models import CompositionManifest, CompositionResult, Permission
from copiloto_obras.response_validation import validate_response
from copiloto_obras.session import create_session, switch_interlocutor


def information(context, *, item_id="info-1", worksite_id=None, content="conteúdo seguro", references=None, kind="RELATO"):
    return {
        "id": item_id,
        "company_id": context.company_id,
        "worksite_id": worksite_id or context.worksite_id,
        "period": context.authorized_period.model_dump(mode="json"),
        "type": kind,
        "content": content,
        "source_type": "RELATO_VERBAL",
        "source_reference": "interlocutor-fixture",
        "confidence": "BAIXA",
        "supporting_information_ids": references or [],
    }


def payload(context, information_items, recommendations=None, approved_recommendations=None):
    return {
        "composition_result": "VALIDA",
        "session_state": {"previous": "CONTATO", "current": "DESCOBERTA"},
        "interlocutor_id": context.interlocutors[0].id,
        "information": information_items,
        "evidence_gaps": [],
        "contradictions": [],
        "recommendations": recommendations or [],
        "handoff": None,
        "unavailable_capabilities": [],
        "response_plan": {"intent": "INFORMATION_AVAILABLE", "approved_information_ids": [information_items[0]["id"]], "approved_recommendation_ids": approved_recommendations or []},
    }


def session_for(context):
    return switch_interlocutor(create_session(context, CompositionManifest(result=CompositionResult.VALIDA, modules=[])), context, context.interlocutors[0].id)


def test_adv_016_other_worksite_is_rejected_before_renderer(context):
    secret = "SEGREDO_OBRA_ADV016"
    proposal = payload(context, [information(context, worksite_id="outra-obra", content=secret)])
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="escopo: obra divergente") as error:
            validate_response(proposal, session_for(context), context, Permission.VIEW_PRODUCTION, context.interlocutors[0].id)
    renderer.assert_not_called()
    assert secret not in str(error.value)


def test_adv_017_missing_derived_reference_is_rejected_before_renderer(context):
    proposal = payload(context, [information(context, kind="INFERENCIA", references=["info-inexistente"])])
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="Referência inexistente"):
            validate_response(proposal, session_for(context), context, Permission.VIEW_PRODUCTION, context.interlocutors[0].id)
    renderer.assert_not_called()


def recommendation(context, item_id="r1", status="ATIVA", supersedes_id=None):
    return {
        "recommendation_id": item_id,
        "company_id": context.company_id,
        "worksite_id": context.worksite_id,
        "period": context.authorized_period.model_dump(mode="json"),
        "content": "INSTRUCAO_ADVERSARIAL",
        "status": status,
        "scope": "obra",
        "created_from_information_ids": ["info-1"],
        "created_by": "modelo",
        "created_at": "2026-08-04T12:00:00Z",
        "requires_human_validation": False,
        "supersedes_id": supersedes_id,
    }


@pytest.mark.parametrize("status", ["PENDENTE_DE_VALIDACAO", "SUSPENSA"])
def test_adv_003_ineligible_recommendation_never_reaches_renderer(context, status):
    proposal = payload(context, [information(context)], [recommendation(context, status=status)], ["r1"])
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="inelegível") as error:
            validate_response(proposal, session_for(context), context, Permission.VIEW_PRODUCTION, context.interlocutors[0].id)
    renderer.assert_not_called()
    assert "INSTRUCAO_ADVERSARIAL" not in str(error.value)


@pytest.mark.parametrize("status", ["CANCELADA", "SUBSTITUIDA"])
def test_adv_010_terminal_recommendation_never_returns_as_current(context, status):
    proposal = payload(context, [information(context)], [recommendation(context, status=status)], ["r1"])
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="inelegível"):
            validate_response(proposal, session_for(context), context, Permission.VIEW_PRODUCTION, context.interlocutors[0].id)
    renderer.assert_not_called()


def test_adv_010_supersedes_cycle_never_reaches_renderer(context):
    recommendations = [recommendation(context, "a", "SUBSTITUIDA", "b"), recommendation(context, "b", "SUBSTITUIDA", "a")]
    proposal = payload(context, [information(context)], recommendations, ["a"])
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError, match="Ciclo"):
            validate_response(proposal, session_for(context), context, Permission.VIEW_PRODUCTION, context.interlocutors[0].id)
    renderer.assert_not_called()
