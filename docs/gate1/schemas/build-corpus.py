#!/usr/bin/env python3
"""Gera os fixtures do corpus de teste do GATE 1 por construção (schema-valid
por design), a partir das tabelas de decisão documentadas em 08 e 09.

NÃO é runtime do gateway: é material de teste documental que representa o
estado esperado do envelope para cada caso, contra o qual o contrato é
verificado manualmente.
"""
import json
import uuid
from pathlib import Path

HERE = Path(__file__).parent
CONTRACT = "opera-gateway-event-contract/0.1"

def base_package(idx, raw, events, assessment, confirmation, routing, delivery,
                 lineage_transformation="captured", tenant="dirceu-engenharia",
                 canonical_obra_id="obra:dirceu-engenharia:galpao-quadruplo-domingos",
                 identity_status="provisional", actor="operador-alfa",
                 sender_binding="bound", channel="telegram", msgid=None,
                 record_type="evento", event_type_top="UNKNOWN_EVENT",
                 occurred_at=None, parent=None, audit_extras=None):
    pkg = str(uuid.UUID(int=idx))
    evs = []
    for i, e in enumerate(events, 1):
        evs.append({
            "event_id": f"{pkg}:{i}",
            "event_type": e.get("event_type", "UNKNOWN_EVENT"),
            "entities": [
                {**{"kind": ent["kind"], "display": ent["display"], "resolved_id": ent.get("resolved_id"),
                   "candidate_ids": ent.get("candidate_ids", []),
                   "resolution_level": ent["level"], "confidence": ent.get("confidence", 0.5)},
                 } for ent in e.get("entities", [])],
            "confidence": e.get("confidence", 0.5),
            "occurred_at_estimated": e.get("estimated", False),
            "location": e.get("location"),
            "occurred_at": e.get("occurred_at"),
            "payload": e["payload"],
        })
    return {
        "contract": CONTRACT, "package_id": pkg, "record_type": record_type,
        "tenant": tenant, "canonical_obra_id": canonical_obra_id, "identity_status": identity_status,
        "channel": {
            "transport": channel, "channel_account_id": "bot-gateway-test",
            "channel_message_id": msgid or f"msg-{idx}",
            "source_message_id": f"{channel}:bot-gateway-test:{msgid or f'msg-{idx}'}",
            "edited": False, "deleted": False, "edited_at": None,
        },
        "actor": actor, "sender_binding": sender_binding,
        "occurred_at": occurred_at, "recorded_at": "2026-08-18T14:00:00Z",
        "raw": {"content": raw, "derived_from_audio": False, "audio_locator": None,
                "audio_sha256": None, "attachments": [], "received_at": "2026-08-18T14:00:00Z"},
        "interpretation": {"version": 1, "model_ref": "openai/gpt-5-2026-06-01",
                           "interpretation_version": 1, "events": evs},
        "assessment": assessment, "confirmation": confirmation,
        "routing": {"rules_version": "0.1", "destinations": routing},
        "delivery": delivery,
        "lineage": {"parent_package_id": parent, "parent_external_id": None,
                    "transformation": lineage_transformation,
                    "superseded_by": [], "supercedes": []},
        "evidence": [], "integrity": {"serialization": "none", "sha256": None, "frozen_at": None},
        "audit": {"received_at": "2026-08-18T14:00:00Z", "parsed_at": None, "confirmed_at": None,
                  "routed_at": None, "corrections": [], "retries": []},
        "created_at": "2026-08-18T14:00:00Z", "updated_at": "2026-08-18T14:00:05Z",
    }

# ---------------- CASES REAIS (textos INTEGRAIS do doc 07) ----------------

cases = []

# CASE-01 (já tem fixture própria hand-written validada)
cases.append(("fixture-real-01.json", None))

# CASE-02
cases.append(("fixture-real-02.json", base_package(
    2, "Faltam 30 sacos de cimento para a concretagem de quinta.",
    [{"event_type": "MATERIAL_NEED", "confidence": 0.88, "estimated": True,
      "occurred_at": "2026-08-20T14:00:00Z", "payload": {
          "material": "cimento", "quantity": 30, "unit": "saco",
          "needed_by": "2026-08-20T14:00:00Z", "context": "concretagem de quinta"},
      "entities": [
          {"kind": "material", "display": "cimento", "candidate_ids": ["mat:copiloto:cimento-cpii"], "level": "PROVISIONAL", "confidence": 0.90},
          {"kind": "obra", "display": "obra do remetente (binding)", "candidate_ids": ["obra:dirceu-engenharia:galpao-quadruplo-domingos"], "level": "PROVISIONAL", "confidence": 0.75},
      ]}],
    {"overall_confidence": "HIGH", "impact": "MEDIUM", "high_impact_reasons": [],
     "confirmation_requirement": "SIMPLE", "verdict": "PRECISO_CONFIRMAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "copiloto", "rule_id": "R-COP-003", "write_spec": {}, "status": "blocked"}],
    [])))

# CASE-03
cases.append(("fixture-real-03.json", base_package(
    3, "João saiu da Domingos 14:20 e foi ajudar no Fábio.",
    [{"event_type": "PERSON_ALLOCATION", "confidence": 0.62,
      "occurred_at": "2026-08-18T14:20:00Z", "payload": {
          "person": "João", "from": "Domingos", "to": "Fábio",
          "departure_at": "2026-08-18T14:20:00Z", "duration_kind": "unknown"},
      "entities": [
          {"kind": "pessoa", "display": "João", "level": "UNKNOWN", "confidence": 0.35},
          {"kind": "obra", "display": "Domingos", "candidate_ids": ["obra:dirceu-engenharia:galpao-quadruplo-domingos"], "level": "PROVISIONAL", "confidence": 0.60},
          {"kind": "obra", "display": "Fábio", "candidate_ids": ["obra:dirceu-engenharia:obra-fabio"], "level": "PROVISIONAL", "confidence": 0.55},
      ]}],
    {"overall_confidence": "MEDIUM", "impact": "MEDIUM", "high_impact_reasons": ["mudança crítica de equipe — duração indefinida"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "copiloto", "rule_id": "R-COP-004", "write_spec": {}, "status": "blocked"}],
    [])))

# CASE-04
cases.append(("fixture-real-04.json", base_package(
    4, "Comprei 10kg de prego 17x27 por R$ 58,90.",
    [{"event_type": "MATERIAL_SALE", "confidence": 0.80,
      "occurred_at": "2026-08-18T13:50:00Z", "payload": {
          "material": "prego 17x27", "quantity": 10, "unit": "kg",
          "cost": {"amount": 5890, "currency": "BRL"}, "supplier": None, "receipt_ref": None},
      "entities": [
          {"kind": "material", "display": "prego 17x27", "candidate_ids": ["mat:scq:prego-17x27"], "level": "PROVISIONAL", "confidence": 0.85},
      ]}],
    {"overall_confidence": "MEDIUM", "impact": "HIGH", "high_impact_reasons": ["alteração financeira"],
     "confirmation_requirement": "MANDATORY", "verdict": "PRECISO_CONFIRMAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "smart_cotacoes", "rule_id": "R-SCQ-009c", "write_spec": {}, "status": "blocked"}],
    [])))

# CASE-05
cases.append(("fixture-real-05.json", base_package(
    5, "Precisamos pagar o fornecedor amanhã.",
    [{"event_type": "PAYMENT_NEED", "confidence": 0.30, "estimated": True,
      "occurred_at": "2026-08-19T14:00:00Z", "payload": {
          "payee": None, "amount": None, "due_at": "2026-08-19T14:00:00Z", "invoice_ref": None},
      "entities": [
          {"kind": "fornecedor", "display": "fornecedor (não identificado)", "level": "CONFLICTED", "confidence": 0.10},
      ]}],
    {"overall_confidence": "LOW", "impact": "HIGH", "high_impact_reasons": ["obrigação financeira", "compromisso externo"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "triagem", "rule_id": "R-TRI-999", "write_spec": {}, "status": "pending"}],
    [])))

# CASE-08 (bloqueio obrigatório)
cases.append(("fixture-real-08.json", base_package(
    8, "Manda mais 100 pra Domingos.",
    [{"event_type": "UNKNOWN_EVENT", "confidence": 0.20, "payload": {
        "ambiguities": ["unidade/material ausente ('100' de quê?)",
                        "Domingos = obra? empresa? pessoa?",
                        "ação: enviar material? dinheiro? pessoa?"]},
      "entities": [
          {"kind": "material", "display": "(unspecified 100)", "level": "UNKNOWN", "confidence": 0.10},
          {"kind": "obra", "display": "Domingos", "candidate_ids": ["obra:dirceu-engenharia:galpao-quadruplo-domingos"], "level": "PROVISIONAL", "confidence": 0.55},
      ]}],
    {"overall_confidence": "LOW", "impact": "LOW", "high_impact_reasons": [],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "triagem", "rule_id": "R-TRI-999", "write_spec": {}, "status": "pending"}],
    [])))

# ---------------- ADVERSARIAL ----------------
adv = []

adv.append(("fixture-adv-a.json", base_package(
    1001, "Manda mais 100 pra Domingos.",
    [{"event_type": "UNKNOWN_EVENT", "confidence": 0.20, "payload": {
        "ambiguities": ["unidade/material ausente", "Domingos = obra/empresa/pessoa?", "ação indeterminada"]},
      "entities": [
          {"kind": "material", "display": "(unspecified 100)", "level": "UNKNOWN", "confidence": 0.10},
          {"kind": "obra", "display": "Domingos", "candidate_ids": ["obra:dirceu-engenharia:galpao-quadruplo-domingos"], "level": "PROVISIONAL", "confidence": 0.55},
      ]}],
    {"overall_confidence": "LOW", "impact": "LOW", "high_impact_reasons": [],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "triagem", "rule_id": "R-TRI-999", "write_spec": {}, "status": "pending"}],
    [])))

adv.append(("fixture-adv-b.json", base_package(
    1002, "João foi pro Fábio.",
    [{"event_type": "PERSON_ALLOCATION", "confidence": 0.55,
      "occurred_at": None, "payload": {
          "person": "João", "from": None, "to": "Fábio", "departure_at": None,
          "duration_kind": "unknown"},
      "entities": [
          {"kind": "pessoa", "display": "João", "level": "UNKNOWN", "confidence": 0.35},
          {"kind": "obra", "display": "Fábio", "candidate_ids": ["obra:dirceu-engenharia:obra-fabio"], "level": "PROVISIONAL", "confidence": 0.55},
      ]}],
    {"overall_confidence": "MEDIUM", "impact": "HIGH", "high_impact_reasons": ["mudança crítica de equipe — origem e duração indefinidas"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "copiloto", "rule_id": "R-COP-004", "write_spec": {}, "status": "blocked"}],
    [])))

adv.append(("fixture-adv-c.json", base_package(
    1003, "Paga ele amanhã.",
    [{"event_type": "PAYMENT", "confidence": 0.25, "estimated": True,
      "occurred_at": "2026-08-19T14:00:00Z", "payload": {
          "payee": None, "cost": None, "method": None, "receipt_ref": None,
          "paid_at": None},
      "entities": [
          {"kind": "fornecedor", "display": "ele (anaphora sem referência)", "level": "CONFLICTED", "confidence": 0.05},
      ]}],
    {"overall_confidence": "LOW", "impact": "HIGH", "high_impact_reasons": ["pagamento", "obrigação financeira"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "NAO_POSSO_EXECUTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "triagem", "rule_id": "R-TRI-999", "write_spec": {}, "status": "pending"}],
    [])))

adv.append(("fixture-adv-d.json", base_package(
    1004, "Comprei cimento.",
    [{"event_type": "MATERIAL_SALE", "confidence": 0.60,
      "occurred_at": "2026-08-18T13:50:00Z", "payload": {
          "material": "cimento", "quantity": None, "unit": None,
          "cost": None, "supplier": None, "receipt_ref": None},
      "entities": [
          {"kind": "material", "display": "cimento", "candidate_ids": ["mat:scq:cimento"], "level": "PROVISIONAL", "confidence": 0.70},
      ]}],
    {"overall_confidence": "MEDIUM", "impact": "HIGH", "high_impact_reasons": ["alteração financeira (sem valor declarado)"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "smart_cotacoes", "rule_id": "R-SCQ-009c", "write_spec": {}, "status": "blocked"}],
    [])))

adv.append(("fixture-adv-e.json", base_package(
    1005, "Transfere os dois.",
    [{"event_type": "ASSET_TRANSFER", "confidence": 0.15, "payload": {
          "asset_class": "(não identificado — anaphora 'os dois')",
          "quantity": 2, "unit": "unidade", "from": None, "to": None,
          "responsible": None, "condition_note": None},
      "entities": [
          {"kind": "ativo", "display": "os dois (anaphora sem referência)", "level": "CONFLICTED", "confidence": 0.05},
      ]}],
    {"overall_confidence": "LOW", "impact": "MEDIUM", "high_impact_reasons": ["ativo sem master (ER-B1)"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "triagem", "rule_id": "R-DIR-002", "write_spec": {}, "status": "blocked"}],
    [])))

adv.append(("fixture-adv-f.json", base_package(
    2, "Faltam 30 sacos de cimento para a concretagem de quinta.",
    [{"event_type": "MATERIAL_NEED", "confidence": 0.88, "estimated": True,
      "occurred_at": "2026-08-20T14:00:00Z", "payload": {
          "material": "cimento", "quantity": 30, "unit": "saco",
          "needed_by": "2026-08-20T14:00:00Z", "context": "concretagem de quinta"},
      "entities": [
          {"kind": "material", "display": "cimento", "candidate_ids": ["mat:copiloto:cimento-cpii"], "level": "PROVISIONAL", "confidence": 0.90},
      ]}],
    {"overall_confidence": "HIGH", "impact": "MEDIUM", "high_impact_reasons": [],
     "confirmation_requirement": "SIMPLE", "verdict": "PRECISO_CONFIRMAR"},
    {"state": "NOT_REQUIRED", "requested_at": None,
     "responded_at": None, "responded_by": None, "expires_at": None},
    [{"system": "copiloto", "rule_id": "R-COP-003", "write_spec": {}, "status": "blocked"}],
    [],
    lineage_transformation="rejected",
    canonical_obra_id="obra:dirceu-engenharia:galpao-quadruplo-domingos",
    event_type_top="MATERIAL_NEED",
    identity_status="verified",
    actor="operador-alfa",
    msgid="msg-2")))

adv.append(("fixture-adv-g.json", base_package(
    1007, "Na verdade eram 3 marteletes.",
    [{"event_type": "ASSET_TRANSFER", "confidence": 0.80,
      "occurred_at": "2026-08-18T13:30:00Z", "payload": {
          "asset_class": "martelete", "quantity": 3, "unit": "unidade",
          "from": "Domingos", "to": "Bar do Índio", "responsible": "João",
          "condition_note": None},
      "entities": [
          {"kind": "ativo", "display": "martelete", "level": "PROVISIONAL", "confidence": 0.95},
      ]}],
    {"overall_confidence": "HIGH", "impact": "HIGH", "high_impact_reasons": ["baixa/dano relevante de ativo"],
     "confirmation_requirement": "MANDATORY", "verdict": "PRECISO_CONFIRMAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:10:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:10:05Z"},
    [{"system": "triagem", "rule_id": "R-DIR-002", "write_spec": {}, "status": "blocked"}],
    [],
    lineage_transformation="corrected",
    canonical_obra_id="obra:dirceu-engenharia:galpao-quadruplo-domingos",
    identity_status="provisional",
    actor="operador-alfa",
    msgid="msg-1007",
    record_type="correcao",
    event_type_top="ASSET_TRANSFER",
    parent="00000000-0000-0000-0000-000000000001")))

adv.append(("fixture-adv-h.json", base_package(
    1008, "João levou dois marteletes para Domingos e um está quebrado.",
    [
        {"event_type": "ASSET_TRANSFER", "confidence": 0.68,
         "occurred_at": "2026-08-18T13:30:00Z", "payload": {
             "asset_class": "martelete", "quantity": 2, "unit": "unidade",
             "from": None, "to": "Domingos", "responsible": "João", "condition_note": None},
         "entities": [
             {"kind": "ativo", "display": "martelete", "level": "PROVISIONAL", "confidence": 0.95},
             {"kind": "pessoa", "display": "João", "level": "UNKNOWN", "confidence": 0.35},
             {"kind": "obra", "display": "Domingos", "candidate_ids": ["obra:dirceu-engenharia:galpao-quadruplo-domingos"], "level": "PROVISIONAL", "confidence": 0.60},
         ]},
        {"event_type": "ASSET_DAMAGE", "confidence": 0.75,
         "occurred_at": "2026-08-18T13:30:00Z", "payload": {
             "asset_class": "martelete", "quantity": 1, "unit": "unidade",
             "damage_description": "quebrado", "disposal_implication": "unknown"},
         "entities": [
             {"kind": "ativo", "display": "martelete", "level": "PROVISIONAL", "confidence": 0.95},
         ]},
    ],
    {"overall_confidence": "MEDIUM", "impact": "HIGH", "high_impact_reasons": ["baixa/dano relevante de ativo", "ativo sem master (ER-B1)"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "PRECISO_PERGUNTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "triagem", "rule_id": "R-DIR-002", "write_spec": {}, "status": "blocked"},
     {"system": "triagem", "rule_id": "R-VIS-002b", "write_spec": {}, "status": "blocked"}],
    [],
    canonical_obra_id="obra:dirceu-engenharia:galpao-quadruplo-domingos",
    identity_status="provisional",
    actor="operador-alfa",
    msgid="msg-1008",
    event_type_top="ASSET_TRANSFER")))

adv.append(("fixture-adv-i.json", base_package(
    1009, "Faltam 30 sacos de cimento para a concretagem de quinta.",
    [{"event_type": "MATERIAL_NEED", "confidence": 0.75, "estimated": True,
      "occurred_at": "2026-08-20T14:00:00Z", "payload": {
          "material": "cimento", "quantity": 30, "unit": "saco",
          "needed_by": "2026-08-20T14:00:00Z", "context": "concretagem de quinta"},
      "entities": [
          {"kind": "material", "display": "cimento", "candidate_ids": ["mat:copiloto:cimento-cpii"], "level": "PROVISIONAL", "confidence": 0.90},
      ]}],
    {"overall_confidence": "MEDIUM", "impact": "MEDIUM", "high_impact_reasons": [],
     "confirmation_requirement": "SIMPLE", "verdict": "PRECISO_CONFIRMAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "copiloto", "rule_id": "R-COP-003", "write_spec": {}, "status": "blocked"}],
    [],
    canonical_obra_id=None,
    identity_status="unverified",
    actor="remetente-desconhecido",
    sender_binding="unbound",
    msgid="msg-1009",
    event_type_top="MATERIAL_NEED")))

adv.append(("fixture-adv-j.json", base_package(
    1010, "João saiu da Domingos e foi pro Fábio.",
    [{"event_type": "PERSON_ALLOCATION", "confidence": 0.50,
      "occurred_at": None, "payload": {
          "person": "João", "from": "Domingos", "to": "Fábio", "departure_at": None,
          "duration_kind": "unknown"},
      "entities": [
          {"kind": "pessoa", "display": "João",
           "candidate_ids": ["pessoa:domingos:joao-silva", "pessoa:fabio:joao-santos"],
           "level": "CONFLICTED", "confidence": 0.45},
          {"kind": "obra", "display": "Domingos", "candidate_ids": ["obra:dirceu-engenharia:galpao-quadruplo-domingos"], "level": "PROVISIONAL", "confidence": 0.60},
          {"kind": "obra", "display": "Fábio", "candidate_ids": ["obra:dirceu-engenharia:obra-fabio"], "level": "PROVISIONAL", "confidence": 0.55},
      ]}],
    {"overall_confidence": "MEDIUM", "impact": "HIGH", "high_impact_reasons": ["mudança crítica de equipe + pessoa CONFLICTED em duas equipes"],
     "confirmation_requirement": "BLOCKED_ASK", "verdict": "NAO_POSSO_EXECUTAR"},
    {"state": "NEEDS_CONFIRMATION", "requested_at": "2026-08-18T14:00:05Z",
     "responded_at": None, "responded_by": None, "expires_at": "2026-08-19T14:00:05Z"},
    [{"system": "copiloto", "rule_id": "R-COP-004", "write_spec": {}, "status": "blocked"}],
    [])))

def save(name, doc):
    if doc is None:
        return
    p = HERE / "corpus" / ("adversarial" if name.startswith("fixture-adv") else "real-cases") / name
    p.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n")
    print("written:", p)

for name, doc in cases + adv:
    save(name, doc)
print(f"{len(cases)-1 + len(adv)} fixtures gerados")
