from .models import AuthorizedContext, HumanDecision, Permission, SessionState

def record_human_decision(session: SessionState, context: AuthorizedContext, decision: HumanDecision) -> SessionState:
    actor=session.current_interlocutor
    if actor is None or decision.human_actor_id != actor.id: raise ValueError("Decisão exige o interlocutor humano atual.")
    if decision.role != actor.role or decision.worksite_id != session.worksite_id: raise ValueError("Escopo humano inválido.")
    if Permission.REGISTER_HUMAN_TECHNICAL_DECISION not in actor.permissions: raise ValueError("Permissão humana ausente.")
    if not session.authorized_period.start <= decision.timestamp.date() <= session.authorized_period.end: raise ValueError("Decisão fora do período.")
    if any(item.decision_id == decision.decision_id for item in session.human_decisions): raise ValueError("Decisão duplicada.")
    return session.model_copy(update={"human_decisions":[*session.human_decisions,decision]})
