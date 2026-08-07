from datetime import datetime, timezone

import pytest

from copiloto_obras.models import (
    CompositionManifest,
    CompositionResult,
    InformationItem,
    Recommendation,
    RecommendationReactivation,
    RecommendationStatus,
)
from copiloto_obras.recommendations import record_recommendation_reactivation, validate_recommendations
from copiloto_obras.session import create_session, switch_interlocutor


def session_for(context):
    return create_session(context, CompositionManifest(result=CompositionResult.VALIDA, modules=[]))


def evidence(context):
    item = InformationItem(id="i1", company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, type="RELATO", content="base", source_type="RELATO_VERBAL", source_reference="fixture", confidence="BAIXA")
    return {item.id: item}


def recommendation(context, item_id="r1", status=RecommendationStatus.ATIVA, supersedes_id=None, **changes):
    values = dict(recommendation_id=item_id, company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, content="ação controlada", status=status, scope="obra", created_from_information_ids=["i1"], created_by="modelo", created_at=datetime(2026, 8, 4, tzinfo=timezone.utc), requires_human_validation=False, supersedes_id=supersedes_id)
    values.update(changes)
    return Recommendation(**values)


def validate(context, items, session=None):
    return validate_recommendations(items, information=evidence(context), session=session or session_for(context))


def test_active_recommendation_is_valid(context):
    assert validate(context, [recommendation(context)])["r1"].status is RecommendationStatus.ATIVA


def test_duplicate_id_rejected(context):
    with pytest.raises(ValueError, match="duplicado"):
        validate(context, [recommendation(context), recommendation(context)])


@pytest.mark.parametrize("field,value,message", [("company_id", "other", "empresa"), ("worksite_id", "other", "obra"), ("period", {"start": "2026-09-01", "end": "2026-09-30"}, "período")])
def test_scope_divergence_rejected(context, field, value, message):
    with pytest.raises(ValueError, match=message):
        validate(context, [recommendation(context, **{field: value})])


def test_missing_support_rejected(context):
    with pytest.raises(ValueError, match="suporte inexistente"):
        validate(context, [recommendation(context, created_from_information_ids=["missing"])])


def test_created_at_outside_period_rejected(context):
    with pytest.raises(ValueError, match="Criação.*fora do período"):
        validate(context, [recommendation(context, created_at=datetime(2026, 9, 1, tzinfo=timezone.utc))])


def test_duplicate_support_rejected_by_schema(context):
    with pytest.raises(ValueError, match="suporte duplicada"):
        recommendation(context, created_from_information_ids=["i1", "i1"])


def test_missing_supersedes_rejected(context):
    with pytest.raises(ValueError, match="supersedes_id inexistente"):
        validate(context, [recommendation(context, supersedes_id="missing")])


def test_self_reference_rejected(context):
    with pytest.raises(ValueError, match="Ciclo"):
        validate(context, [recommendation(context, supersedes_id="r1")])


@pytest.mark.parametrize("edges", [[("a", "b"), ("b", "a")], [("a", "b"), ("b", "c"), ("c", "a")]])
def test_cycles_rejected(context, edges):
    items = [recommendation(context, item_id, status="SUBSTITUIDA", supersedes_id=target) for item_id, target in edges]
    with pytest.raises(ValueError, match="Ciclo"):
        validate(context, items)


def event(context, actor="renata-alves"):
    role = next(item.role for item in context.interlocutors if item.id == actor)
    return RecommendationReactivation(event_id="ev1", recommendation_id="r1", human_actor_id=actor, role=role, company_id=context.company_id, worksite_id=context.worksite_id, period=context.authorized_period, timestamp=datetime(2026, 8, 5, tzinfo=timezone.utc), origin="HUMAN")


def suspended_session(context):
    session = switch_interlocutor(session_for(context), context, "renata-alves")
    return session.model_copy(update={"suspended_recommendations": [recommendation(context, status="SUSPENSA")]})


def test_authorized_human_reactivation(context):
    session = record_recommendation_reactivation(suspended_session(context), context, event(context))
    assert not session.suspended_recommendations
    assert session.active_recommendations[0].status is RecommendationStatus.ATIVA
    assert "ev1" in session.consumed_reactivation_event_ids


def test_model_cannot_reactivate_without_event(context):
    with pytest.raises(ValueError, match="evento humano"):
        validate(context, [recommendation(context)], suspended_session(context))


def test_different_actor_cannot_record_reactivation(context):
    with pytest.raises(ValueError, match="interlocutor humano atual"):
        record_recommendation_reactivation(suspended_session(context), context, event(context, actor="carlos-silva"))


def test_actor_without_permission_cannot_reactivate(context):
    session = switch_interlocutor(session_for(context), context, "carlos-silva")
    session = session.model_copy(update={"suspended_recommendations": [recommendation(context, status="SUSPENSA")]})
    with pytest.raises(ValueError, match="Permissão humana"):
        record_recommendation_reactivation(session, context, event(context, actor="carlos-silva"))


def test_reactivation_invalid_after_interlocutor_switch(context):
    session = switch_interlocutor(suspended_session(context), context, "carlos-silva")
    with pytest.raises(ValueError, match="interlocutor humano atual"):
        record_recommendation_reactivation(session, context, event(context))


@pytest.mark.parametrize("status,list_name", [("CANCELADA", "cancelled_recommendations"), ("SUBSTITUIDA", "replaced_recommendations")])
def test_terminal_recommendation_cannot_reactivate(context, status, list_name):
    session = session_for(context).model_copy(update={list_name: [recommendation(context, status=status)]})
    with pytest.raises(ValueError, match="não pode ser reativada"):
        validate(context, [recommendation(context)], session)
