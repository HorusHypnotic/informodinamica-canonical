"""Validação de contrato — o schema governa a saída (Gate 2 §3, item 4).

Regras de rejeição PRÉ-interpretação (doc 01 §Invariantes):
- contrato/versão desconhecido; source_message_id duplicado; tenant ausente;
  package_id ausente; event_type fora da taxonomia fechada (14 tipos)
"""
from __future__ import annotations

import json
import re
import uuid
from pathlib import Path

from jsonschema import Draft202012Validator, RefResolver

GATE1_SCHEMAS = (Path(__file__).resolve().parents[2] /
                 "docs" / "gate1" / "schemas")
ENVELOPE_SCHEMA_PATH = GATE1_SCHEMAS / "gateway-envelope-v0.1.schema.json"
EVENT_TYPES_PATH = GATE1_SCHEMAS / "event-types-v0.1.json"
ROUTING_RULES_PATH = GATE1_SCHEMAS / "routing-rules-v0.1.json"

ALLOWED_CONTRACTS = {"opera-gateway-event-contract/0.1"}
ALLOWED_VERDICTS = {"SEI", "NAO_SEI", "PRECISO_CONFIRMAR", "PRECISO_PERGUNTAR",
                    "NAO_POSSO_EXECUTAR"}
ALLOWED_VEREDICTS = ALLOWED_VERDICTS
ALLOWED_VERDICTS_PT = ALLOWED_VERDICTS
SOURCE_MSG_RE = re.compile(r"^[a-z0-9]+:[^:]+:[^:]+$")


def load_envelope_schema() -> dict:
    return json.loads(ENVELOPE_SCHEMA_PATH.read_text())


def load_event_types_schema() -> dict:
    return json.loads(EVENT_TYPES_PATH.read_text())


def event_type_enum() -> list[str]:
    return load_event_types_schema()["event_type"]["enum"]


def load_routing_rules() -> dict:
    return json.loads(ROUTING_RULES_PATH.read_text())


def make_envelope_validator() -> Draft202012Validator:
    schema = load_envelope_schema()
    et = load_event_types_schema()
    # o envelope usa $ref com nome de arquivo relativo (event-types-v0.1.json)
    # sem base_uri declarada; resolve pré-carregando o target no store sob o
    # caminho relativo esperado e registrando base_uri no root schema
    store = {
        "event-types-v0.1.json": et,
        et["$id"]: et,
        schema["$id"]: schema,
    }
    resolver = RefResolver("", schema, store=store)
    return Draft202012Validator(schema, resolver=resolver)


class ValidationResult:
    def __init__(self):
        self.valid: bool = True
        self.errors: list[str] = []

    def fail(self, msg: str) -> None:
        self.valid = False
        self.errors.append(msg)


def pre_interpretation_checks(tenant: str | None,
                              source_message_id: str | None,
                              contract: str | None,
                              store) -> ValidationResult:
    """Rejeição ANTES de interpretação (doc 01). Retorna ValidationResult."""
    r = ValidationResult()
    if not contract or contract not in ALLOWED_CONTRACTS:
        r.fail(f"contrato desconhecido: {contract!r}")
    if not source_message_id:
        r.fail("source_message_id ausente")
    elif not SOURCE_MSG_RE.match(source_message_id):
        r.fail("source_message_id malformado")
    elif store.source_message_used(source_message_id):
        r.fail("source_message_id duplicado")
    if not tenant:
        r.fail("tenant ausente")
    elif not store.tenant_exists(tenant):
        r.fail("tenant inexistente no binding")
    return r


def validate_envelope(envelope: dict) -> ValidationResult:
    """Validação de schema (2020-12) contra o envelope canônico congelado."""
    r = ValidationResult()
    validator = make_envelope_validator()
    errs = sorted(validator.iter_errors(envelope),
                  key=lambda e: "/".join(str(p) for p in e.absolute_path))
    for e in errs:
        path = "/".join(str(p) for p in e.absolute_path) or "(root)"
        r.fail(f"{path}: {e.message[:200]}")
    # regras normativas além do schema (procedural)
    p = envelope.get("interpretation", {})
    event_type_enum_vals = event_type_enum()
    for ev in p.get("events", []):
        et = ev.get("event_type")
        if et not in event_type_enum_vals:
            r.fail(f"event_type fora da taxonomia: {et!r}")
        for ent in ev.get("entities", []):
            rl = ent.get("resolution_level")
            if rl == "DETERMINISTIC" and not ent.get("resolved_id"):
                r.fail("DETERMINISTIC sem resolved_id")
            if rl in ("PROVISIONAL", "CONFLICTED") and ent.get("resolved_id"):
                r.fail(f"{rl} não pode ter resolved_id preenchido")
            if rl == "CONFLICTED" and ent.get("candidate_ids") is None:
                r.fail("CONFLICTED sem candidate_ids")
            if rl == "DETERMINISTIC" and ent.get("confidence") != 1.0:
                r.fail("DETERMINISTIC com confidence != 1.0")
            c = ent.get("confidence")
            if not (0.0 <= (c or 0) <= 1.0):
                r.fail(f"confidence fora de [0,1]: {c}")
    a = envelope.get("assessment", {})
    if a.get("verdict") not in ALLOWED_VERDICTS:
        r.fail(f"verdict fora da lista fechada: {a.get('verdict')!r}")
    # RAW imutável: hash declarado deve conferir com raw registrado
    raw = envelope.get("raw", {})
    if raw.get("sha256_declared"):
        import hashlib
        actual = hashlib.sha256((raw.get("content") or "").encode()).hexdigest()
        if actual != raw["sha256_declared"]:
            r.fail("hash do raw não confere com conteúdo declarado")
    return r


def is_high_impact_type(event_type: str) -> bool:
    return event_type in {"PAYMENT", "PAYMENT_NEED", "MATERIAL_SALE",
                          "ASSET_DAMAGE"}


def route_for(event_type: str) -> dict:
    """Retorna a rota canônica v0.1 (simulation-only; nunca ativa)."""
    rules = load_routing_rules()
    for rule in rules["rules"]:
        if rule["event_type"] == event_type:
            return rule
    return next(r for r in rules["rules"] if r["rule_id"] == "R-TRI-999")
