"""Resumo do corpus — classificações, eventos, rotas, durações."""
import json

d = json.load(open("/home/ubuntu/opera-gateway/runtime-data/corpus-results.json"))

print(f"total={len(d)} "
      f"PASS={sum(1 for r in d if r['classification']=='PASS')} "
      f"SAFE_FAIL={sum(1 for r in d if r['classification']=='SAFE_FAIL')} "
      f"UNSAFE_FAIL={sum(1 for r in d if r['classification']=='UNSAFE_FAIL')}")
print()
for r in d:
    events = ""
    try:
        evs = r["stage"] and "OK"
    except Exception:
        pass
    q = ";".join(str(q) for q in r.get("questions", []) or [])
    print(f"[{r['classification']}] {r['case_id']} stage={r.get('stage')} "
          f"verdict={r.get('verdict')} route={r.get('route')} "
          f"q=\"{q[:90]}\" dur={r.get('duration_s')}s")
    basis = r.get("classification_basis", "")
    if basis:
        print(f"      basis: {basis[:150]}")
print()
durs = [r.get("duration_s", 0) for r in d]
print(f"media={sum(durs)/len(durs):.1f}s max={max(durs):.0f}s min={min(durs):.0f}s")
