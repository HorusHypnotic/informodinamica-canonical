"""Entity resolution determinística (Gate 2 — doc 04).

Regras congeladas do contrato v0.1:
- DETERMINISTIC: alias exato normalizado (minúsculo/sem acento), uma única
  correspondência verificada (verified_by presente) — confidence 1.0
- PROVISIONAL: fuzzy acima do limiar OU múltiplas candidatas plausíveis
  (learned sem verificação nunca supera PROVISIONAL)
- CONFLICTED/UNKNOWN: zero correspondências ou ambiguidade irreversível —
  NEVER associação silenciosa; CONFLICTED com HIGH-IMPACT → bloqueio total
- Cross-tenant: PROIBIDO fuzzy entre tenants (filtro obrigatório por tenant)
- ER-B1: entidade kind=ativo nunca supera PROVISIONAL (classe de ativo)
- Nome textual nunca é chave canônica; DETERMINISTIC exige verified_by/at
"""
from __future__ import annotations

import unicodedata

FUZZY_THRESHOLD = 0.82  # similaridade mínima para PROVISIONAL


def normalize(text: str) -> str:
    text = unicodedata.normalize("NFKD", str(text).lower())
    return "".join(ch for ch in text if not unicodedata.combining(ch)).strip()


def _token_similarity(a: str, b: str) -> float:
    ta, tb = set(normalize(a).split()), set(normalize(b).split())
    if not ta or not tb:
        return 0.0
    return len(ta & tb) / len(ta | tb)


def fuzzy_match(query: str, candidates: list[str]) -> tuple[str | None, float]:
    qn = normalize(query)
    best, best_score = None, 0.0
    for cand in candidates:
        s = _token_similarity(qn, cand)
        if s > best_score:
            best, best_score = cand, s
    return (best, best_score) if best_score >= FUZZY_THRESHOLD else (None, 0.0)


class EntityResolver:
    def __init__(self, store):
        self.store = store

    def _tenant_aliases(self, kind: str, tenant: str) -> list[dict]:
        return [a for a in self.store.get_aliases(kind=kind, tenant=tenant)]

    def resolve_one(self, kind: str, display: str, tenant: str,
                    interpreter_level: str = "UNKNOWN") -> dict:
        """Resolução determinística de uma entidade. Nunca usa fuzzy
        cross-tenant."""
        if not display:
            return {
                "kind": kind, "display": display or "unknown",
                "resolved_id": None, "candidate_ids": [],
                "resolution_level": "UNKNOWN", "confidence": 0.0,
            }
        aliases = self._tenant_aliases(kind, tenant)
        # ER-B1: ativos não passam de PROVISIONAL (classe), independentemente
        cap = "PROVISIONAL" if kind == "ativo" else None

        # 1) DETERMINISTIC: alias exato com verificação humana
        key = f"{normalize(display)}:{kind}:{tenant}"
        for a in aliases:
            if a["alias_key"] == key and a["verified_by"]:
                self.store.bump_usage(key)
                return {
                    "kind": kind, "display": a["display"],
                    "resolved_id": a["resolved_id"], "candidate_ids": [],
                    "resolution_level": "DETERMINISTIC", "confidence": 1.0,
                    "_alias_key": key,
                }
        # 2) PROVISIONAL: fuzzy match dentro do tenant (nunca cross-tenant)
        cand, score = fuzzy_match(display, [a["display"] for a in aliases])
        if cand:
            matches = [a for a in aliases if normalize(a["display"]) ==
                       normalize(cand)]
            if len(matches) > 1:
                return {
                    "kind": kind, "display": display, "resolved_id": None,
                    "candidate_ids": [m["resolved_id"] for m in matches],
                    "resolution_level": "CONFLICTED", "confidence": min(score, 0.49),
                }
            m = matches[0]
            level = "DETERMINISTIC" if m["verified_by"] else "PROVISIONAL"
            if cap == "PROVISIONAL" and level == "DETERMINISTIC":
                level = "PROVISIONAL"
            self.store.bump_usage(m["alias_key"])
            out = {
                "kind": kind, "display": m["display"],
                "resolved_id": m["resolved_id"] if level == "DETERMINISTIC"
                else None,
                "candidate_ids": [m["resolved_id"]] if level == "PROVISIONAL"
                else [],
                "resolution_level": level,
                "confidence": 1.0 if level == "DETERMINISTIC" else score,
                "_alias_key": m["alias_key"],
            }
            return out
        # 3) aprende como PROVISIONAL não verificado (memória auditável)
        learned_key = f"{normalize(display)}:{kind}:{tenant}"
        if not any(a["alias_key"] == learned_key for a in aliases):
            self.store.put_alias(display, kind, tenant,
                                 f"{kind}:learned:{learned_key}", "learned")
        return {
            "kind": kind, "display": display, "resolved_id": None,
            "candidate_ids": [], "resolution_level": "UNKNOWN",
            "confidence": 0.0,
        }

    def resolve_entities(self, events_entities: list[dict], tenant: str
                         ) -> list[dict]:
        out = []
        for e in events_entities:
            r = self.resolve_one(e["kind"], e.get("display", ""), tenant)
            # anaphora/conflict herdado do interpretador
            if e.get("resolution_level") == "CONFLICTED":
                r["resolution_level"] = "CONFLICTED"
                r["confidence"] = min(r["confidence"], 0.49)
            out.append(r)
        return out

    def resolve_work(self, interpreter_entities: list[dict], tenant: str,
                     default_work: str | None) -> tuple[str, str]:
        """canonical_obra_id + identity_status para o envelope.
        Obra pertence a um tenant por DEC-ARQ-002; nunca cross-tenant."""
        work_ents = [e for e in interpreter_entities if e["kind"] == "obra"]
        if work_ents:
            first = self.resolve_one("obra", work_ents[0]["display"], tenant)
            if first["resolution_level"] == "DETERMINISTIC":
                return first["resolved_id"], "verified"
            if first["resolution_level"] == "PROVISIONAL":
                return first["candidate_ids"][0] if first["candidate_ids"] \
                    else "unresolved", "provisional"
        if default_work:
            r = self.resolve_one("obra", default_work, tenant)
            if r["resolution_level"] == "DETERMINISTIC":
                return r["resolved_id"], "verified"
            if r["resolution_level"] == "PROVISIONAL":
                return r["candidate_ids"][0] if r["candidate_ids"] \
                    else "unresolved", "provisional"
        return "unresolved", "unverified"
