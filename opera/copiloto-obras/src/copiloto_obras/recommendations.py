from .evidence_validation import validate_item_scope
from .indexes import build_unique_index
from .models import (
    AuthorizedContext,
    Permission,
    Recommendation,
    RecommendationReactivation,
    RecommendationStatus,
    SessionState,
)


def _reject_cycles(recommendations: dict[str, Recommendation]) -> None:
    state: dict[str, int] = {}

    def visit(item_id: str) -> None:
        marker = state.get(item_id, 0)
        if marker == 1:
            raise ValueError("Ciclo no grafo de substituição.")
        if marker == 2:
            return
        state[item_id] = 1
        target = recommendations[item_id].supersedes_id
        if target is not None:
            visit(target)
        state[item_id] = 2

    for item_id in recommendations:
        visit(item_id)


def validate_recommendations(
    items: list[Recommendation],
    *,
    information: dict,
    session: SessionState,
) -> dict[str, Recommendation]:
    for item in items:
        validate_item_scope(item, company_id=session.company_id, worksite_id=session.worksite_id, period=session.authorized_period)
    recommendations = build_unique_index(items, entity_name="recomendação")

    for item in recommendations.values():
        if not item.period.start <= item.created_at.date() <= item.period.end:
            raise ValueError("Criação da recomendação fora do período declarado.")
        if any(reference not in information for reference in item.created_from_information_ids):
            raise ValueError("Referência de suporte inexistente.")
        if item.supersedes_id is not None and item.supersedes_id not in recommendations:
            raise ValueError("supersedes_id inexistente.")

    _reject_cycles(recommendations)

    for item in recommendations.values():
        if item.supersedes_id is not None:
            target = recommendations[item.supersedes_id]
            if target.status is not RecommendationStatus.SUBSTITUIDA:
                raise ValueError("Relação de substituição incoerente.")
            if item.status in {RecommendationStatus.CANCELADA, RecommendationStatus.SUBSTITUIDA}:
                raise ValueError("Estado da recomendação substituta incoerente.")

    historical = {
        item.recommendation_id: item
        for item in [
            *session.suspended_recommendations,
            *session.cancelled_recommendations,
            *session.replaced_recommendations,
        ]
    }
    for item in recommendations.values():
        previous = historical.get(item.recommendation_id)
        if previous is None or item.status is not RecommendationStatus.ATIVA:
            continue
        if previous.status is RecommendationStatus.CANCELADA:
            raise ValueError("Recomendação cancelada não pode ser reativada.")
        if previous.status is RecommendationStatus.SUBSTITUIDA:
            raise ValueError("Recomendação substituída não pode ser reativada.")
        actor_id = session.current_interlocutor.id if session.current_interlocutor else None
        authorized = any(
            event.recommendation_id == item.recommendation_id
            and event.human_actor_id == actor_id
            and event.event_id not in session.consumed_reactivation_event_ids
            for event in session.recommendation_reactivations
        )
        if not authorized:
            raise ValueError("Reativação exige evento humano autorizado.")
    return recommendations


def record_recommendation_reactivation(
    session: SessionState,
    context: AuthorizedContext,
    event: RecommendationReactivation,
) -> SessionState:
    actor = session.current_interlocutor
    if actor is None or event.human_actor_id != actor.id:
        raise ValueError("Reativação exige o interlocutor humano atual.")
    contextual_actor = next((item for item in context.interlocutors if item.id == actor.id), None)
    if contextual_actor is None or contextual_actor != actor or event.role is not actor.role:
        raise ValueError("Papel humano ou contexto da reativação inválido.")
    if session.company_id != context.company_id or session.worksite_id != context.worksite_id or session.authorized_period != context.authorized_period:
        raise ValueError("Contexto e sessão divergentes na reativação.")
    if Permission.REGISTER_HUMAN_TECHNICAL_DECISION not in actor.permissions:
        raise ValueError("Permissão humana ausente para reativação.")
    validate_item_scope(event, company_id=session.company_id, worksite_id=session.worksite_id, period=session.authorized_period)
    if not session.authorized_period.start <= event.timestamp.date() <= session.authorized_period.end:
        raise ValueError("Evento humano fora do período.")
    if event.event_id in session.consumed_reactivation_event_ids or any(item.event_id == event.event_id for item in session.recommendation_reactivations):
        raise ValueError("Evento humano duplicado.")
    suspended = next((item for item in session.suspended_recommendations if item.recommendation_id == event.recommendation_id), None)
    if suspended is None:
        raise ValueError("Somente recomendação suspensa existente pode ser reativada.")
    if any(item.recommendation_id == suspended.recommendation_id for item in session.active_recommendations):
        raise ValueError("Recomendação já está ativa.")
    activated = suspended.model_copy(update={"status": RecommendationStatus.ATIVA})
    proposed = session.model_copy(update={
        "suspended_recommendations": [item for item in session.suspended_recommendations if item.recommendation_id != suspended.recommendation_id],
        "active_recommendations": [*session.active_recommendations, activated],
        "recommendation_reactivations": [*session.recommendation_reactivations, event],
        "consumed_reactivation_event_ids": {*session.consumed_reactivation_event_ids, event.event_id},
    })
    return SessionState.model_validate(proposed.model_dump())
