from .authorization import authorize_access
from .evidence_validation import validate_item_scope
from .indexes import build_unique_index
from .limits import validate_payload_limits
from .models import AccessDecision, AgentResponse, AuthorizedContext, CompositionResult, Permission, RecommendationStatus, SessionState
from .recommendations import validate_recommendations
from .renderer import render
from .transitions import validate_transition
from pydantic import ValidationError


def validate_response(payload: dict, session: SessionState, context: AuthorizedContext, requested_action: Permission, current_interlocutor_id: str) -> str:
    """Valida proposta não confiável e retorna somente texto renderizado localmente."""
    validate_payload_limits(payload)
    try:
        response = AgentResponse.model_validate(payload)
    except ValidationError:
        raise ValueError("Resposta rejeitada pelo schema estrutural.") from None
    if session.current_interlocutor is None:
        raise ValueError("Sessão sem interlocutor atual.")
    if session.company_id != context.company_id or session.worksite_id != context.worksite_id or session.authorized_period != context.authorized_period:
        raise ValueError("Contexto e sessão divergentes.")
    actor = next((item for item in context.interlocutors if item.id == current_interlocutor_id), None)
    if actor is None or actor != session.current_interlocutor:
        raise ValueError("Interlocutor da sessão não pertence ao contexto autorizado.")
    if session.authorized_roles != {actor.role} or session.effective_permissions != actor.permissions:
        raise ValueError("Papel ou permissões da sessão divergentes.")
    allowed, reason, authorized_actor = authorize_access(context, current_interlocutor_id, session.worksite_id, session.authorized_period.start, requested_action)
    if session.composition_result is not CompositionResult.VALIDA or response.composition_result is not CompositionResult.VALIDA:
        raise ValueError("Composição inválida.")
    if authorized_actor is None or response.interlocutor_id != authorized_actor.id:
        raise ValueError("Interlocutor não validado.")
    if response.session_state.previous is not session.current_state:
        raise ValueError("Estado anterior divergente.")
    validate_transition(response.session_state.previous, response.session_state.current)

    for item in [*response.information, *response.contradictions]:
        validate_item_scope(item, company_id=session.company_id, worksite_id=session.worksite_id, period=session.authorized_period)

    information_index = build_unique_index(response.information, entity_name="informação")
    build_unique_index(response.contradictions, entity_name="contradição")
    derived_references = [
        *(reference for item in response.information for reference in item.supporting_information_ids),
        *(reference for item in response.contradictions for reference in item.information_ids),
    ]
    if any(reference not in information_index for reference in derived_references):
        raise ValueError("Referência inexistente.")
    if any(item_id not in information_index for item_id in response.response_plan.approved_information_ids):
        raise ValueError("ResponsePlan referencia informação inexistente.")

    recommendations = validate_recommendations(response.recommendations, information=information_index, session=session)
    if any(item_id not in recommendations for item_id in response.response_plan.approved_recommendation_ids):
        raise ValueError("ResponsePlan referencia recomendação inexistente.")
    approved_recommendations = {
        item_id: recommendations[item_id]
        for item_id in response.response_plan.approved_recommendation_ids
    }
    if any(
        item.status is not RecommendationStatus.ATIVA or item.requires_human_validation
        for item in approved_recommendations.values()
    ):
        raise ValueError("ResponsePlan aprovou recomendação inelegível.")

    if not allowed:
        return render(
            session,
            AccessDecision(allowed=False, reason=reason),
            information_index,
            approved_recommendations,
            response.response_plan.approved_information_ids,
            response.response_plan.approved_recommendation_ids,
            response.handoff,
        )

    proposed_session = SessionState.model_validate(
        session.model_copy(update={"current_state": response.session_state.current}).model_dump()
    )
    rendered = render(
        proposed_session,
        AccessDecision(allowed=allowed, reason=reason),
        information_index,
        approved_recommendations,
        response.response_plan.approved_information_ids,
        response.response_plan.approved_recommendation_ids,
        response.handoff,
    )
    session.current_state = proposed_session.current_state
    return rendered
