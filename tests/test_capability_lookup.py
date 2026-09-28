#!/usr/bin/env python3
import json, subprocess, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
CLI=ROOT/"tools"/"capability_lookup.py"
cases=[
 ("context gate","CAP-001"),
 ("price reconfirmation","POSTV2-007"),
 ("correlation id idempotency","POSTV2-008"),
 ("whatsapp handoff","POSTV2-009"),
 ("credential compute token","POSTV2-005"),
 ("attention telegram ack","POSTV2-003")
]
bad=[]
for q,want in cases:
 p=subprocess.run([sys.executable,str(CLI),q,"--json"],capture_output=True,text=True)
 if p.returncode: bad.append([q,"EXEC",p.stderr]); continue
 got=json.loads(p.stdout)
 ids=[x["id"] for x in got["results"]]
 if want not in ids: bad.append([q,want,ids])
print(json.dumps({"cases":len(cases),"failures":bad,"state":"PASS" if not bad else "FAIL"},ensure_ascii=False))
raise SystemExit(1 if bad else 0)
