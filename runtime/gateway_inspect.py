"""Inspector de observabilidade (Gate 2, §14): inspeciona um package_id
completo — raw, envelope, journal, confirmação, delivery — a partir do banco.

Uso: python3 gateway_inspect.py <DB_PATH> <package_id>
     python3 gateway_inspect.py <DB_PATH> --list
"""
import json
import sys

sys.path.insert(0, "/home/ubuntu/opera-gateway/runtime")
sys.path.insert(0, "/home/ubuntu/opera-gateway/runtime/operagw")

from operagw.storage import Store


def fmt(obj, indent=0):
    txt = json.dumps(obj, ensure_ascii=False, indent=2)
    return "\n".join("  " * indent + ln for ln in txt.splitlines())


def inspect(db_path: str, package_id: str):
    store = Store(db_path)
    pkg = store.get_package(package_id)
    if not pkg:
        print(f"package_id não encontrado: {package_id}")
        sys.exit(1)
    env = pkg["envelope"]
    print(f"=== PACKAGE {package_id} ===")
    print(f"record_type : {pkg['record_type']}")
    print(f"tenant      : {pkg['tenant']}")
    print(f"status      : {pkg['status']}")
    print(f"obra        : {pkg['canonical_obra_id']} ({pkg['identity_status']})")
    print()
    print("--- raw (imutável) ---")
    print("  " + env["raw"]["content"][:200])
    print(f"  received_at: {env['raw']['received_at']}")
    smid = env.get("raw", {}).get("source_message_id")
    raw_row = store._conn().execute(
        "SELECT raw_content, raw_sha256 FROM raw_messages WHERE "
        "source_message_id=?", (smid,)).fetchone() if smid else None
    if raw_row:
        print(f"  storage: intacto={raw_row[0] == env['raw']['content']}, "
              f"sha256={raw_row[1][:16]}…")
    print()
    it = env.get("interpretation", {})
    print("--- interpretação ---")
    print(f"  model_ref: {it.get('model_ref')}")
    for ev in it.get("events", []):
        print(f"  event: {ev['event_type']} conf={ev['confidence']}")
        for e in ev.get("entities", []):
            print(f"    ent: {e['display']} [{e['resolution_level']}] "
                  f"→ {e.get('resolved_id') or '-'}")
    print()
    a = env.get("assessment", {})
    print("--- assessment ---")
    print(f"  verdict={a.get('verdict')} impact={a.get('impact')} "
          f"ov_conf={a.get('overall_confidence')} "
          f"conf_req={a.get('confirmation_requirement')}")
    print()
    c = env.get("confirmation", {})
    print("--- confirmação ---")
    print(f"  state={c.get('state')} requested_at={c.get('requested_at')}")
    if c.get("question_id"):
        print(f"  question_id={c['question_id']}")
    qrows = store._conn().execute(
        "SELECT question_id, question_text, answer, answer_actor FROM "
        "confirmation_questions WHERE question_id=?",
        (c.get("question_id"),)).fetchall()
    for q in qrows:
        print(f"  pergunta: {q[1]} resposta={q[2] or '(pendente)'} "
              f"respondido_por={q[3] or '-'}")
    print()
    print("--- routing (simulado) ---")
    for d in env.get("routing", {}).get("destinations", []):
        print(f"  {d['system']} rule={d['rule_id']} status={d['status']}")
    print()
    print("--- delivery ---")
    for d in env.get("delivery", []):
        print(f"  {d['destination']} pkg={d['package_id']} status={d['status']}")
    print()
    print("--- lineage ---")
    li = env.get("lineage", {})
    print(f"  transformation={li.get('transformation')} "
          f"parent={li.get('parent_package_id')} "
          f"supercedes={env.get('supercedes_by')}")
    print()
    print("--- journal ---")
    for row in store._conn().execute(
            "SELECT event, ts, detail FROM package_journal WHERE "
            "package_id=? ORDER BY ts", (package_id,)).fetchall():
        det = row[2][:100] if row[2] else ""
        print(f"  {row[0]:22} {row[1]} {det}")


def list_packages(db_path: str):
    store = Store(db_path)
    rows = store._conn().execute(
        "SELECT package_id, record_type, status, created_at FROM packages "
        "ORDER BY created_at").fetchall()
    print(f"{'package_id':36} {'record':10} {'status':16} created_at")
    for r in rows:
        print(f"{r[0]:36} {r[1]:10} {r[2]:16} {r[3]}")
    print(f"\ntotal: {len(rows)}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    if sys.argv[2] == "--list":
        list_packages(sys.argv[1])
    else:
        inspect(sys.argv[1], sys.argv[2])
