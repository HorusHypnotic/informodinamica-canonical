"""Loop de confirmação (Gate 2 — doc 05) + roteamento simulado.

Transições válidas:
NOT_REQUIRED → (final)
NEEDS_CONFIRMATION → CONFIRMED | CORRECTED | CANCELLED | EXPIRED
EXPIRED → triagem manual (jamais autoprocessa)
Correção gera pacote NOVO (record_type=correcao, lineage supercedes).
NENHUMA rota candidate é ativada no Gate 2: routing é apenas cálculo
determinístico com status preservado (simulation).
"""
from __future__ import annotations

import uuid
from datetime import datetime, timedelta, timezone

from operagw.envelope import new_correction_envelope, utcnow_iso
from operagw.validation import route_for, load_routing_rules

CONFIRMATION_EXPIRY_HOURS = 24


def question_prompt(envelope: dict) -> str:
    """Pergunta ao remetente, adaptada ao requirement."""
    req = envelope["assessment"]["confirmation_requirement"]
    ev = (envelope["interpretation"]["events"] or [{}])[0]
    etype = ev.get("event_type", "?")
    base = (f"[OPERA Gateway] Confirmação para {envelope['package_id']}\n"
            f"Evento: {etype} · Impacto: {envelope['assessment']['impact']}\n")
    if req == "SIMPLE":
        return base + "Responda: confirma | corrige | cancela"
    if req == "MANDATORY":
        import json as _json
        return base + "Resumo: " + _json.dumps(
            ev.get("payload"), ensure_ascii=False, default=str)[:300] + \
            "\nResponda: confirma | corrige | cancela"
    if req == "BLOCKED_ASK":
        qs = ev.get("payload", {}).get("ambiguities", [])
        return base + "Falta para classificar: " + ", ".join(qs or
            ["informação essencial"]) + "\nResponda livremente:"
    return ""


def request_confirmation(store, envelope: dict) -> str | None:
    req = envelope["assessment"]["confirmation_requirement"]
    if req == "NOT_REQUIRED":
        envelope["confirmation"]["state"] = "NOT_REQUIRED"
        return None
    envelope["confirmation"]["state"] = "NEEDS_CONFIRMATION"
    envelope["confirmation"]["requested_at"] = utcnow_iso()
    envelope["confirmation"]["expires_at"] = (
        datetime.now(timezone.utc) +
        timedelta(hours=CONFIRMATION_EXPIRY_HOURS)).strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    qid = f"q-{uuid.uuid4().hex[:12]}"
    store.ask(qid, envelope["package_id"], req, question_prompt(envelope),
              envelope["confirmation"]["expires_at"])
    envelope["confirmation"]["question_id"] = qid
    store.update_package(envelope["package_id"], envelope,
                         status="needs_confirmation")
    return qid


def respond_confirmation(store, question_id: str, answer: str,
                         actor: str) -> dict:
    """Responde uma pergunta. Retorna dict com ação tomada."""
    q = store.get_question(question_id)
    if q is None:
        return {"action": "UNKNOWN_QUESTION"}
    pkg = store.get_package(q["package_id"])
    if pkg is None:
        return {"action": "PACKAGE_GONE"}
    env = pkg["envelope"]
    now = utcnow_iso()
    ans = answer.strip().lower()

    if q["expires_at"] and now > q["expires_at"]:
        env["confirmation"]["state"] = "EXPIRED"
        store.update_package(pkg["package_id"], env, status="expired")
        store.answer_question(question_id, "system:expiry",
                              "expired_before_answer")
        return {"action": "EXPIRED",
                "note": "EXPIRED → triagem manual; nunca autoprocessa"}

    store.answer_question(question_id, actor, answer)
    if ans == "confirma":
        env["confirmation"]["state"] = "CONFIRMED"
        env["confirmation"]["responded_at"] = now
        env["confirmation"]["responded_by"] = actor
        env["audit"]["confirmed_at"] = now
        store.update_package(pkg["package_id"], env, status="confirmed")
        store.journal(pkg["package_id"], "confirm_responded",
                      {"answer": "confirm", "by": actor})
        return {"action": "CONFIRMED"}
    if ans == "cancela":
        env["confirmation"]["state"] = "CANCELLED"
        store.update_package(pkg["package_id"], env, status="cancelled")
        return {"action": "CANCELLED"}
    # qualquer outra resposta = correção
    corr = new_correction_envelope(
        store, pkg["package_id"], env["tenant"], answer, now,
        f"telegram:{env['channel']['channel_account_id']}:"
        f"_correction_{pkg['package_id']}")
    corr_id = corr["package_id"]
    store.new_package(corr_id, "correcao", env["tenant"],
                      corr["channel"]["source_message_id"], corr)
    env["confirmation"]["state"] = "CORRECTED"
    env["lineage"]["superseded_by"] = [corr_id]
    store.update_package(pkg["package_id"], env, status="corrected")
    store.journal(pkg["package_id"], "corrected",
                  {"correction_package_id": corr_id})
    return {"action": "CORRECTED", "correction_package_id": corr_id}


def simulate_routing(envelope: dict) -> list[dict]:
    """Calcula as rotas esperadas SEM ativar nenhuma rota candidate.
    Todas as rotas v0.1 têm status candidate/blocked/always; nenhuma está
    ativa — os destinos calculados ficam em status 'pending' com entrega
    'BLOCKED' (não habilitada no Gate 2)."""
    rules = load_routing_rules()
    destinations = []
    for ev in envelope["interpretation"]["events"]:
        rule = route_for(ev["event_type"])
        destinations.append({
            "system": rule["destination"],
            "rule_id": rule["rule_id"],
            "write_spec": {},
            "status": "candidate" if rule["status"] == "candidate"
            else ("blocked" if rule["status"] == "blocked" else "candidate"),
        })
    if not destinations:
        destinations.append({
            "system": "triagem", "rule_id": "R-TRI-999",
            "write_spec": {}, "status": "candidate",
        })
    delivery = [
        {"destination": d["system"], "package_id": envelope["package_id"],
         "status": "BLOCKED",   # Gate 2: rotas NÃO habilitadas
         "attempt": 0, "delivered_at": None, "error": None,
         "next_retry_at": None, "write_ref": None,
         "note": "delivery desabilitado no Gate 2 (simulação only)"}
        for d in destinations
    ]
    envelope["routing"]["destinations"] = destinations
    envelope["audit"]["routed_at"] = utcnow_iso()
    envelope["delivery"] = delivery
    return destinations
