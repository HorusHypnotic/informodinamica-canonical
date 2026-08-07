from .models import AuthorizedContext, CompositionManifest, SessionState


def create_session(context: AuthorizedContext, composition: CompositionManifest) -> SessionState:
    return SessionState(
        composition_id=composition.composition_id,
        composition_result=composition.result,
        composition_manifest_sha256=composition.manifest_sha256,
        company_id=context.company_id,
        worksite_id=context.worksite_id,
        authorized_period=context.authorized_period,
        unavailable_capabilities=context.unavailable_capabilities,
    )

def switch_interlocutor(session: SessionState, context: AuthorizedContext, new_interlocutor_id: str) -> SessionState:
    actor = next((item for item in context.interlocutors if item.id == new_interlocutor_id), None)
    if actor is None:
        raise ValueError("Interlocutor não autorizado; sessão preservada.")
    old = session.current_interlocutor.id if session.current_interlocutor else None
    return session.model_copy(update={
        "current_interlocutor": actor, "authorized_roles": {actor.role},
        "effective_permissions": set(actor.permissions), "pending_action": None,
        "pending_authorization": False, "pending_handoffs": [],
        "interlocutor_history": [*session.interlocutor_history, *([old] if old else []), actor.id],
    })


def suspend_recommendation(session: SessionState, recommendation_id: str, reason: str) -> None:
    matching = [item for item in session.active_recommendations if item.recommendation_id == recommendation_id]
    if not matching:
        raise ValueError("Recomendação inexistente não pode ser suspensa.")
    session.active_recommendations = [item for item in session.active_recommendations if item.recommendation_id != recommendation_id]
    for item in matching:
        session.suspended_recommendations.append(item.model_copy(update={"status": "SUSPENSA"}))
