"""Interpretação governada por schema (Gate 2 — doc 03).

Governaça: o schema congelado do Gate 1 é a fonte da verdade. A geração do
LLM é validada contra o schema (Draft 2020-12) por `validate_interpretation`;
nenhum resultado entra no pipeline sem passar na validação.

Decisão operacional (§nota dec 2026-08-18, docs/gate2):
o proxy builtin recusa de forma não determinística o modo
`response_format: json_schema strict` para schemas de complexidade real
(erro "Invalid request format", choices=None — 0/8 repros). A geração
é feita em modo livre (`json_object` + system prompt com o schema
completo) e a conformidade é imposta por validação pós-hoc com retry
de correção (MAX_CORRECTION_RETRIES=2). Se persistir a não conformidade,
o pacote é marcado como AUDIT (recebido, sem write, sem interpretação).
"""
from __future__ import annotations

import datetime as _dt
import json
import sys

MODEL = "gpt-5-mini"
PROVIDER = "openai"
MODEL_REF = f"{PROVIDER}/{MODEL}"
MAX_CORRECTION_RETRIES = 2

SYSTEM_PROMPT = (
    "Você é o interpretador do OPERA Gateway — captura de relatos operacionais "
    "de construção civil em português brasileiro. Sua tarefa é transformar "
    "mensagens informais em eventos estruturados segundo a taxonomia fechada "
    "do schema fornecido.\n"
    "Regras duras:\n"
    "1. event_type DEVE vir do enum fechado. Se a mensagem não se encaixa em "
    "nenhum tipo, use UNKNOWN_EVENT e liste as ambiguidades.\n"
    "2. NUNCA invente fatos, entidades, quantidades ou valores não expressos.\n"
    "3. NUNCA invente identidade: pessoa/obra/empresa sem menção expressa deve "
    "ter resolution_level UNKNOWN (work=unknown, entity confidence 0.0).\n"
    "4. Identidade só é plausível (PROVISIONAL) quando a mensagem menciona um "
    "nome; nunca DETERMINISTIC (isso é papel do entity resolver).\n"
    "5. Quantidades sem unidade expressa: unidade = 'unknown'.\n"
    "6. Valores monetários: amount em CENTAVOS (ex: R$ 150,00 = 15000).\n"
    "7. Datas relativas ('quinta', 'amanhã') ficam como occurred_at no futuro "
    "mais próximo plausível com occurred_at_estimated true.\n"
    "8. Uma mensagem pode conter múltiplos eventos (multi_event=true).\n"
    "9. Se houver dúvida de intenção: classifique como UNKNOWN_EVENT em vez "
    "de forçar um tipo errado.\n"
    "10. Entities: kind ∈ {obra, pessoa, material, ativo, fornecedor, empresa, "
    "local, tarefa}. Sem menção → entities = [].\n"
    "Responda APENAS o JSON do schema, sem markdown, sem comentário."
)


def _build_event_schema():
    import pathlib
    et = json.loads((
        pathlib.Path(__file__).resolve().parents[2] /
        "docs" / "gate1" / "schemas" /
        "event-types-v0.1.json"
    ).read_text())
    enum = et["event_type"]["enum"]
    # payload é fechado com chaves conhecidas (todas nullable) — a validação
    # real (gateway-envelope-v0.1.schema.json) aceita chaves extras, mas
    # orientamos o LLM a usar apenas as conhecidas.
    known_payload_keys = [
        "material", "quantity", "unit", "needed_at", "for_task",
        "description", "material_description", "material_type",
        "person", "role", "allocated_to", "estimated_cost",
        "cost", "payee", "amount_cents", "due_at", "payment_ref",
        "progress_percent", "completed_tasks", "observation",
        "weather_type", "severity", "asset", "damage_description",
        "incident_type", "involved_parties", "affected_assets",
        "decision_subject", "decision_made", "decision_rationale",
        "buyer", "seller", "sale_amount_cents", "sale_material",
        "ambiguities", "raw_value", "payment_method",
    ]
    payload_schema = {
        "type": "object",
        "additionalProperties": False,
        "default": {},
        "properties": {k: {"type": ["string", "number", "boolean",
                                    "array", "null"]}
                       for k in known_payload_keys},
    }
    event_schema = {
        "type": "object",
        "required": ["event_type", "entities", "confidence", "payload"],
        "additionalProperties": False,
        "properties": {
            "event_type": {"type": "string", "enum": enum},
            "entities": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": ["kind", "display", "resolution_level",
                                 "confidence"],
                    "additionalProperties": False,
                    "properties": {
                        "kind": {"type": "string",
                                 "enum": ["obra", "pessoa", "material",
                                          "ativo", "fornecedor", "empresa",
                                          "local", "tarefa"]},
                        "display": {"type": "string"},
                        "resolution_level": {"type": "string",
                                             "enum": ["DETERMINISTIC",
                                                      "PROVISIONAL",
                                                      "CONFLICTED", "UNKNOWN"]},
                        "candidate_names": {"type": "array",
                                            "items": {"type": "string"},
                                            "default": []},
                        "confidence": {"type": "number", "minimum": 0,
                                       "maximum": 1},
                    },
                },
            },
            "confidence": {"type": "number", "minimum": 0, "maximum": 1},
            "location": {"type": ["string", "null"], "default": None},
            "occurred_at": {"type": ["string", "null"], "default": None},
            "occurred_at_estimated": {"type": "boolean", "default": False},
            "payload": payload_schema,
        },
    }
    return {
        "type": "object",
        "required": ["multi_event", "events", "questions"],
        "additionalProperties": False,
        "properties": {
            "multi_event": {"type": "boolean"},
            "events": {"type": "array", "items": event_schema},
            "questions": {
                "type": "array",
                "items": {"type": "string"},
                "default": [],
                "description": ("perguntas objetivas ao remetente quando "
                                "faltar informação"),
            },
        },
    }


def validate_interpretation(payload: dict) -> tuple[bool, list[str]]:
    """Valida o resultado do LLM contra o schema congelado do Gate 1."""
    from operagw.validation import ValidationResult
    schema = _build_event_schema()
    from jsonschema import Draft202012Validator
    validator = Draft202012Validator(schema)
    errs = list(validator.iter_errors(payload))
    msgs = []
    for e in errs:
        path = "/".join(str(p) for p in e.absolute_path) or "(root)"
        msgs.append(f"{path}: {e.message[:200]}")
    return (not msgs, msgs)


def interpret(raw_text: str, tenant: str, retries: int = 0,
              last_errors: list[str] | None = None) -> dict:
    """Gera com LLM em modo livre e valida contra o schema.

    Se a saída falhar na validação, reenvia o JSON inválido + erros ao LLM
    pedindo correção (até MAX_CORRECTION_RETRIES). Se persistir, lança
    (o pipeline registra AUDIT, sem write).
    """
    from openai import OpenAI
    from operagw.validation import ValidationResult
    client = OpenAI()
    schema = _build_event_schema()
    prompt = SYSTEM_PROMPT + "\n\nSCHEMA:\n" + json.dumps(
        schema, ensure_ascii=False, indent=1)
    if retries == 0:
        messages = [
            {"role": "system", "content": prompt},
            {"role": "user",
             "content": f"Tenant: {tenant}\nMensagem:\n{raw_text}"},
        ]
    else:
        messages = [
            {"role": "system", "content": prompt},
            {"role": "user",
             "content": f"Tenant: {tenant}\nMensagem:\n{raw_text}"},
            {"role": "assistant", "content": last_errors and
             json.dumps({"errors": last_errors}, ensure_ascii=False) or ""},
        ]
    try:
        resp = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            response_format={"type": "json_object"},
            max_completion_tokens=4000,
        )
    except Exception as exc:  # transport/provider failure
        if retries >= MAX_CORRECTION_RETRIES:
            raise RuntimeError(
                f"INTERPRETER_FAILED_AFTER_{MAX_CORRECTION_RETRIES}_RETRIES: "
                f"{exc}") from exc
        return interpret(raw_text, tenant, retries=retries + 1)

    choice = resp.choices[0]
    raw_result = choice.message.content or ""
    try:
        payload = json.loads(raw_result)
    except json.JSONDecodeError:
        if retries >= MAX_CORRECTION_RETRIES:
            raise RuntimeError("INTERPRETER_RAW_RESULT_NOT_JSON")
        return interpret(raw_text, tenant, retries=retries + 1,
                         last_errors=["resposta não é JSON válido"])

    valid, errs = validate_interpretation(payload)
    if valid:
        enum_vals = {"TASK_CREATED", "ASSET_TRANSFER", "ASSET_DAMAGE",
                     "MATERIAL_NEED", "MATERIAL_SALE", "PERSON_ALLOCATION",
                     "PROGRESS_REPORT", "FIELD_OBSERVATION", "WEATHER_EVENT",
                     "INCIDENT", "PAYMENT_NEED", "PAYMENT", "DECISION",
                     "UNKNOWN_EVENT"}
        for ev in payload.get("events", []):
            if ev["event_type"] not in enum_vals:
                raise RuntimeError(
                    "INTERPRETER_PRODUCED_UNKNOWN_EVENT_TYPE: "
                    f"{ev['event_type']!r}")
        for e in ev.get("entities", []):
            if not (0 <= (e.get("confidence") or 0) <= 1):
                raise RuntimeError("INTERPRETER_CONFIDENCE_OUT_OF_RANGE")
        payload["__model_ref"] = MODEL_REF
        payload["__raw_result"] = raw_result
        payload["__retries"] = retries
        payload["__ts"] = _dt.datetime.now(_dt.timezone.utc).isoformat()
        return payload

    if retries >= MAX_CORRECTION_RETRIES:
        raise RuntimeError(
            f"INTERPRETER_NONCONFORMANT_AFTER_{MAX_CORRECTION_RETRIES}_"
            f"CORRECTIONS: {errs}")
    return interpret(raw_text, tenant, retries=retries + 1,
                     last_errors=errs)
