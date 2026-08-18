"""Assessment determinístico (Gate 2 — doc 05).

Matriz confidence × impact congelada (doc 04 §1):
| conf x impact | LOW        | MEDIUM     | HIGH        |
| HIGH        | NOT_REQUIRED| SIMPLE    | MANDATORY   |
| MEDIUM      | SIMPLE     | SIMPLE     | MANDATORY   |
| LOW         | MANDATORY  | MANDATORY  | BLOCKED_ASK |
Entity CONFLICTED agrava +1 degrau; HIGH+CONFLICTED → write proibido
(NAO_POSSO_EXECUTAR). HIGH-IMPACT nunca escapa (lista fechada).
"""
from __future__ import annotations

from operagw.validation import is_high_impact_type

VERDICTS = ("SEI", "NAO_SEI", "PRECISO_CONFIRMAR", "PRECISO_PERGUNTAR",
            "NAO_POSSO_EXECUTAR")
CONF_LEVELS = ("HIGH", "MEDIUM", "LOW")
IMPACT_LEVELS = ("LOW", "MEDIUM", "HIGH")

MATRIX = {
    ("HIGH", "LOW"): "NOT_REQUIRED",
    ("HIGH", "MEDIUM"): "SIMPLE",
    ("HIGH", "HIGH"): "MANDATORY",
    ("MEDIUM", "LOW"): "SIMPLE",
    ("MEDIUM", "MEDIUM"): "SIMPLE",
    ("MEDIUM", "HIGH"): "MANDATORY",
    ("LOW", "LOW"): "MANDATORY",
    ("LOW", "MEDIUM"): "MANDATORY",
    ("LOW", "HIGH"): "BLOCKED_ASK",
}
REQUIRE_ORDER = ["NOT_REQUIRED", "SIMPLE", "MANDATORY", "BLOCKED_ASK"]


def _level_requirement(level: int) -> str:
    return REQUIRE_ORDER[min(level, len(REQUIRE_ORDER) - 1)]


def impact_of_event(event_type: str, payload: dict) -> str:
    """Impacto de um evento: tipos HIGH-IMPACT por definição (lista fechada);
    HIGH-IMPACT nunca escapa mesmo com payload benigno."""
    if is_high_impact_type(event_type):
        return "HIGH"
    # comprometimento financeiro explícito mesmo fora dos tipos
    if payload.get("cost") or payload.get("estimated_cost") or \
       payload.get("due_at") or payload.get("payee"):
        return "HIGH"
    return "MEDIUM"


def overall_confidence(events_conf: list[float]) -> str:
    if not events_conf:
        return "LOW"
    lo = min(events_conf)
    if lo >= 0.85:
        return "HIGH"
    if lo >= 0.5:
        return "MEDIUM"
    return "LOW"


def assess(envelope: dict, resolved_entities: list[dict],
           high_impact_reasons: list[str]) -> dict:
    """Assessment completo: confidence, impact, requirement, verdict."""
    confs = [e.get("confidence", 0)
             for e in envelope["interpretation"]["events"]]
    conf_level = overall_confidence(confs)

    impacts = []
    for ev in envelope["interpretation"]["events"]:
        impacts.append(impact_of_event(ev["event_type"], ev.get("payload") or {}))
    impact = max(impacts, key=lambda i: IMPACT_LEVELS.index(i)) \
        if impacts else "LOW"
    reasons = list(high_impact_reasons)
    for et in envelope["interpretation"]["events"]:
        if is_high_impact_type(et["event_type"]):
            reasons.append(et["event_type"])
    reasons = sorted(set(reasons))

    idx = IMPACT_LEVELS.index(impact)
    req = MATRIX[(conf_level, impact)]
    # entity CONFLICTED agrava +1
    conflicted = any(r["resolution_level"] == "CONFLICTED"
                     for r in resolved_entities)
    if conflicted:
        req = _level_requirement(REQUIRE_ORDER.index(req) + 1)

    # veredito
    any_unknown = any(
        ev["event_type"] == "UNKNOWN_EVENT"
        for ev in envelope["interpretation"]["events"])
    if conflicted and impact == "HIGH":
        verdict = "NAO_POSSO_EXECUTAR"
    elif any_unknown:
        verdict = "NAO_SEI"
    elif req in ("MANDATORY", "BLOCKED_ASK"):
        verdict = "PRECISO_PERGUNTAR" if req == "BLOCKED_ASK" \
            else "PRECISO_CONFIRMAR"
    elif req == "SIMPLE":
        verdict = "PRECISO_CONFIRMAR"
    else:
        verdict = "SEI"

    return {
        "overall_confidence": conf_level,
        "impact": impact,
        "high_impact_reasons": reasons,
        "confirmation_requirement": req,
        "verdict": verdict,
    }
