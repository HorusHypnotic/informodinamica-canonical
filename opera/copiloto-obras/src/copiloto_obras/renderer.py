from .models import AccessDecision, Capability, Handoff, Recommendation, RecommendationStatus, SessionState


def render(session: SessionState, access: AccessDecision, information: dict, recommendations: dict, approved_information_ids: list[str], approved_recommendation_ids: list[str], handoff: Handoff | None = None, capability: Capability | None = None) -> str:
    """Gera a única saída exibível e revalida todo objeto selecionado."""
    try:
        chosen = [information[item_id] for item_id in approved_information_ids]
        active: list[Recommendation] = [recommendations[item_id] for item_id in approved_recommendation_ids]
    except (KeyError, TypeError):
        raise ValueError("Seleção aprovada inválida.") from None

    if any(item.company_id != session.company_id or item.worksite_id != session.worksite_id or item.period != session.authorized_period for item in chosen):
        raise ValueError("Informação fora do escopo da sessão.")
    for item in active:
        if item.company_id != session.company_id or item.worksite_id != session.worksite_id or item.period != session.authorized_period:
            raise ValueError("Recomendação fora do escopo da sessão.")
        if item.status is not RecommendationStatus.ATIVA or item.requires_human_validation:
            raise ValueError("Recomendação não aplicável.")

    if not access.allowed:
        return "Acesso negado. A solicitação exige contexto ou autorização adicional."
    if capability is not None and capability in session.unavailable_capabilities:
        return "Essa capacidade não está disponível neste runtime."
    if handoff is not None:
        return f"Encaminhamento humano obrigatório: {handoff.category.value}. Não foi tomada decisão operacional."

    lines = ["Informações validadas:"] + [f"- {item.content}" for item in chosen]
    if active:
        lines += ["Próximas ações aprovadas:"] + [f"- {item.content}" for item in active]
    return "\n".join(lines)
