"""Pipeline de estágios obrigatórios (doc 01 §4).

Estágios: INGESTÃO → TENANT_BINDING → OBRA_BINDING → INTERPRETAÇÃO →
ENTITY_RESOLUTION → ASSESSMENT → CONFIRMATION → ROUTING(simulado) →
DELIVERY(simulado/bloqueado) → AUDIT.

Nenhuma etapa apaga a genealogia da anterior. RAW permanece intacto em
qualquer ramo (incluso rejeição, que preserva o raw em record_type=rejeicao).
"""
from __future__ import annotations

import time
import uuid

from operagw import assessment as assessment_mod
from operagw.envelope import new_capture_envelope, utcnow_iso
from operagw.entity_resolution import EntityResolver
from operagw.confirmation import request_confirmation, simulate_routing
from operagw.validation import (pre_interpretation_checks, validate_envelope,
                                make_envelope_validator, route_for,
                                is_high_impact_type)


def _ts() -> float:
    return time.time()


class PipelineResult:
    def __init__(self, package_id: str | None, stage: str, verdict: str,
                 classification: str):
        self.package_id = package_id
        self.stage = stage                 # último estágio alcançado
        self.verdict = verdict             # 5 vereditos finais ou NONE
        self.classification = classification  # PASS | SAFE_FAIL | UNSAFE_FAIL
        self.times = {}                    # estágio → segundos
        self.validation = None             # ValidationResult
        self.interpreter_meta = {}         # model, retries, schema_valid
        self.questions_asked = []
        self.route = None
        self.duplicates_blocked = 0
        self.contract_violations_blocked = 0
        self.notes = []

    def to_record(self) -> dict:
        return {
            "package_id": self.package_id, "stage": self.stage,
            "verdict": self.verdict, "classification": self.classification,
            "times": self.times, "validation": self.validation,
            "interpreter_meta": self.interpreter_meta,
            "questions_asked": self.questions_asked,
            "route": self.route,
            "duplicates_blocked": self.duplicates_blocked,
            "contract_violations_blocked": self.contract_violations_blocked,
            "notes": self.notes,
        }


class GatewayPipeline:
    """Runtime mínimo do OPERA Gateway (Gate 2)."""

    def __init__(self, store):
        self.store = store
        self.resolver = EntityResolver(store)

    # -------------------------------------------------------------- ingest
    def ingest(self, tenant: str, transport: str, channel_account_id: str,
               channel_message_id: str, actor: str, raw_content: str,
               received_at: str | None = None,
               work_hint: str | None = None) -> PipelineResult:
        res = PipelineResult(None, "INGEST", "NONE", "SAFE_FAIL")
        received_at = received_at or utcnow_iso()
        t0 = _ts()
        # pré-checagens de rejeição (sem interpretação)
        pre = pre_interpretation_checks(tenant,
                                        f"{transport}:{channel_account_id}:{channel_message_id}",
                                        "opera-gateway-event-contract/0.1",
                                        self.store)
        res.times["pre_checks"] = _ts() - t0
        if not pre.valid:
            pid = self.store.rejection(
                tenant if self.store.tenant_exists(tenant) else None,
                f"{transport}:{channel_account_id}:{channel_message_id}",
                "; ".join(pre.errors), raw_content)
            res.package_id = pid
            res.duplicates_blocked = 1 if "duplicado" in "; ".join(pre.errors) else 0
            res.contract_violations_blocked = 1 - res.duplicates_blocked
            res.stage = "REJECTED_PRE_INTERPRETATION"
            res.notes.extend(pre.errors)
            return res
        t1 = _ts()
        smid, raw_sha = self.store.store_raw(
            tenant, transport, channel_account_id, channel_message_id,
            actor, raw_content, received_at)
        envelope = new_capture_envelope(
            tenant, transport, channel_account_id, channel_message_id,
            actor, raw_content, received_at)
        package_id = envelope["package_id"]
        self.store.new_package(package_id, "evento", tenant, smid, envelope)
        res.times["raw_storage"] = _ts() - t1
        envelope["raw"]["sha256_declared"] = raw_sha
        # tenant binding (tenant sempre existe aqui — pré-checagem garantiu)
        envelope["sender_binding"] = "bound"
        # obra binding (hint opcional do tenant experimental)
        if work_hint:
            wr = self.resolver.resolve_one("obra", work_hint, tenant)
            if wr["resolution_level"] == "DETERMINISTIC":
                envelope["canonical_obra_id"] = wr["resolved_id"]
                envelope["identity_status"] = "verified"
            elif wr["resolution_level"] == "PROVISIONAL":
                envelope["canonical_obra_id"] = (
                    wr["candidate_ids"][0] if wr["candidate_ids"] else "unresolved")
                envelope["identity_status"] = "provisional"
        self.store.update_package(package_id, envelope)
        self.store.journal(package_id, "raw_stored",
                           {"source_message_id": smid, "raw_sha256": raw_sha})
        # interpretação
        res2 = self.interpret(package_id, envelope, tenant)
        res.package_id = package_id
        res.stage = res2.stage
        res.verdict = res2.verdict
        res.classification = res2.classification
        res.times.update(res2.times)
        res.validation = res2.validation
        res.interpreter_meta = res2.interpreter_meta
        res.notes = res2.notes
        return res

    # ---------------------------------------------------------- interpret
    def interpret(self, package_id: str, envelope: dict, tenant: str
                  ) -> PipelineResult:
        from operagw.interpreter import interpret
        res = PipelineResult(package_id, "INTERPRET", "NONE", "SAFE_FAIL")
        t0 = _ts()
        from operagw.interpreter import MAX_CORRECTION_RETRIES
        try:
            interp = interpret(envelope["raw"]["content"], tenant)
        except RuntimeError as exc:
            res.stage = "INTERPRET_FAILED"
            res.notes.append(str(exc))
            self.store.journal(package_id, "schema_rejected",
                               {"reason": str(exc)})
            res.interpreter_meta = {"retries": MAX_CORRECTION_RETRIES}
            return res
        res.times["interpretation"] = _ts() - t0
        envelope["interpretation"]["model_ref"] = interp["__model_ref"]
        events = interp["events"]
        # event_id obrigatório no envelope (padrão uuid:N)
        for i, ev in enumerate(events):
            ev["event_id"] = f"{uuid.uuid4()}:{i + 1}"
        # limpeza de campos internos do interpretador que não pertencem ao
        # envelope canônico (candidate_names pertence ao event-types schema,
        # não ao envelope; hash do raw fica no storage, não no envelope)
        for ev in events:
            ev.pop("candidate_names", None)
            for e in ev.get("entities", []):
                e.pop("candidate_names", None)
        envelope["interpretation"]["events"] = events
        envelope["raw"].pop("sha256_declared", None)
        self.store.journal(package_id, "interpreted",
                           {"model_ref": interp["__model_ref"],
                            "n_events": len(events),
                            "retries": interp["__retries"]})
        res.interpreter_meta = {
            "model_ref": interp["__model_ref"],
            "retries": interp["__retries"],
            "ts": interp["__ts"],
        }
        # entity resolution determinística (antes da validação — o envelope
        # exige entities na estrutura canônica)
        t2 = _ts()
        interpreter_entities = [
            e for ev in events for e in ev.get("entities", [])]
        resolved = self.resolver.resolve_entities(interpreter_entities, tenant)
        obra_id, id_status = self.resolver.resolve_work(
            interpreter_entities, tenant, envelope.get("work_hint"))
        envelope["canonical_obra_id"] = obra_id
        envelope["identity_status"] = id_status
        # reescreve entities dos eventos com os resultados resolvidos
        idx = 0
        for ev in events:
            out_ents = []
            for e in ev.get("entities", []):
                if idx < len(resolved):
                    r = resolved[idx]
                    out_ents.append({k: v for k, v in r.items()
                                     if not k.startswith("_")})
                idx += 1
            ev["entities"] = out_ents
        res.times["entity_resolution"] = _ts() - t2
        conflicted = any(r["resolution_level"] == "CONFLICTED"
                         for r in resolved)
        # assessment determinístico (precisa para validação: assessment é
        # required no envelope)
        t3 = _ts()
        reasons = []
        ass = assessment_mod.assess(envelope, resolved, reasons)
        envelope["assessment"] = ass
        res.times["assessment"] = _ts() - t3
        # validação de schema governada (gate: nada prossegue sem conformidade
        # com o envelope congelado)
        t1 = _ts()
        v = validate_envelope(envelope)
        res.times["schema_validation"] = _ts() - t1
        res.validation = {"valid": v.valid,
                          "errors": v.errors[:20]}
        self.store.journal(package_id,
                           "schema_validated" if v.valid else "schema_rejected",
                           {"errors": v.errors[:20]})
        if not v.valid:
            res.stage = "SCHEMA_REJECTED"
            return res
        # conflito HIGH+CONFLICTED → NAO_POSSO_EXECUTAR (write proibido)
        if ass["verdict"] == "NAO_POSSO_EXECUTAR":
            res.classification = "SAFE_FAIL"
            res.notes.append("CONFLICTED+HIGH → NAO_POSSO_EXECUTAR")
        else:
            res.classification = "PASS"
        res.verdict = ass["verdict"]
        self.store.journal(package_id, "assessed", dict(ass))
        self.store.journal(package_id, "resolved",
                           {"entities": resolved,
                            "obra_id": obra_id, "identity_status": id_status})
        # confirmação (quando requerida)
        t4 = _ts()
        qid = request_confirmation(self.store, envelope)
        res.times["confirmation_request"] = _ts() - t4
        if qid:
            res.questions_asked.append(qid)
        # roteamento simulado (nenhuma rota ativa)
        t5 = _ts()
        dests = simulate_routing(envelope)
        res.times["routing_simulation"] = _ts() - t5
        res.route = dests
        self.store.update_package(
            package_id, envelope,
            status="confirmed" if ass["confirmation_requirement"]
            == "NOT_REQUIRED" else "needs_confirmation")
        return res



    # -------------------------------------------------------- confirmation
    def respond(self, question_id: str, answer: str, actor: str) -> dict:
        """Loop de resposta do remetente (Telegram: texto recebido)."""
        from operagw.confirmation import respond_confirmation
        return respond_confirmation(self.store, question_id, answer, actor)

    # ------------------------------------------------------------- pipeline
    def full_pipeline(self, *a, **kw):
        """Executa ingest + interpretação completa. (Conveniência para testes.)"""
        return self.ingest(*a, **kw)
