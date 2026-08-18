"""Testes adicionais Gate 2 (referência de execução): golden path replay,
idempotência duplicada dedicada, RAW imutável e isolamento cross-tenant."""
import sys
import json

sys.path.append("/home/ubuntu/opera-gateway/runtime")

from operagw.storage import Store
from operagw.pipeline import GatewayPipeline

DB = "/home/ubuntu/opera-gateway/runtime-data/gate2.db"
TENANT = "tenant:manus-qa:dirceu-engenharia:galpao-quadruplo-domingos"

store = Store(DB)
store.ensure_tenant(TENANT, "QA")
gw = GatewayPipeline(store)

MSG = ("Oi, faltou 30 sacos de cimento aqui no galpão do Domingos "
       "pra concretagem de quinta feira. Pode pedir pra mim?")

# 1. Golden path
r1 = gw.ingest(TENANT, "telegram", "bot6012345678", "real-01", "user:qa",
               MSG, work_hint="galpao-quadruplo-domingos")
print("INGEST stage:", r1.stage, "| verdict:", r1.verdict,
      "| notes:", r1.notes[:3])
pkg = store.get_package(r1.package_id)
env1 = pkg["envelope"]
if "interpretation" in env1:
    ev1 = env1["interpretation"]["events"][0]
    print("GOLDEN_PATH:", ev1["event_type"],
          "qty:", ev1["payload"].get("quantity"),
          "unit:", ev1["payload"].get("unit"),
          "needed_at:", ev1["payload"].get("needed_at"),
          "| impact:", env1["assessment"]["impact"],
          "| conf_req:", env1["assessment"]["confirmation_requirement"],
          "| verdict:", env1["assessment"]["verdict"],
          "| delivery:", [(d["destination"], d["status"])
                          for d in env1["delivery"]],
          "| retries:", env1["interpretation"].get("__retries"))
else:
    print("SEM INTERPRETAÇÃO — pacote rejeitado pre-interpretation")

# 2. Idempotência: mesma mensagem duas vezes
r2 = gw.ingest(TENANT, "telegram", "bot6012345678", "real-01", "user:qa",
               MSG, work_hint="galpao-quadruplo-domingos")
print("IDEMPOTENCY:", r2.stage, "| duplicatas bloqueadas:",
      r2.duplicates_blocked, "| rejeição package:", r2.package_id)

# 3. RAW imutável: tentativa de UPDATE direto no banco
conn = store._conn()
conn.execute("UPDATE raw_messages SET raw_content='TENTATIVA DE MUDAR RAW' "
             "WHERE source_message_id='telegram:bot6012345678:real-01'")
try:
    conn.commit()
except Exception as e:
    conn.rollback()
    print("RAW_IMMUTABLE: UPDATE rejeitado pelo banco →", str(e)[:80])
after = conn.execute(
    "SELECT raw_content FROM raw_messages WHERE "
    "source_message_id='telegram:bot6012345678:real-01'").fetchone()
print("RAW_IMMUTABLE: conteúdo após tentativa =", after[0][:40])

# 4. Cross-tenant: segunda obra sem binding — mensagem de outra obra
TENANT2 = "tenant:manus-qa:dirceu-engenharia:obra-diferente"
store.ensure_tenant(TENANT2, "QA")
r3 = gw.ingest(TENANT2, "telegram", "bot6012345678", "ct-01", "user:qa",
               "Falta areia na obra nova.")
env3 = store.get_package(r3.package_id)["envelope"]
ents = env3["interpretation"]["events"][0]["entities"] if \
    "interpretation" in env3 else []
cross = [e for e in ents
         if "obra-diferente" in (e.get("resolved_id") or "")
         or any("obra-diferente" in (c or "")
                for c in e.get("candidate_ids") or [])]
print("CROSS_TENANT: entidades ligadas à obra-diferente:", len(cross),
      "| stage:", r3.stage)
for e in ents:
    print("   ent:", e["display"], e["resolution_level"], "→",
          e.get("resolved_id") or e.get("candidate_ids") or "-")
