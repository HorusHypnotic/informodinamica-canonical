#!/usr/bin/env python3
"""Deterministic local capability lookup. No network, embeddings, LLM or paid API."""
import argparse, json, re, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CAPS = ROOT / "ecosystem" / "capabilities-v2.json"
POST = ROOT / "ecosystem" / "capability-search-index-post-v2.json"

def norm(s):
    s = unicodedata.normalize("NFKD", str(s)).encode("ascii","ignore").decode().lower()
    return re.sub(r"[^a-z0-9_]+"," ",s).strip()

def tokens(s): return {x for x in norm(s).split() if len(x)>1}

def load():
    caps=json.loads(CAPS.read_text())
    post=json.loads(POST.read_text())
    rows=[]
    for c in caps["capabilities"]:
        rows.append({**c,"aliases":[],"tags":[],"tier":"CANONICAL_REGISTRY"})
    for c in post["entries"]:
        rows.append({**c,"tier":"POST_V2"})
    return rows

def score(q,row):
    qn=norm(q); qt=tokens(q)
    fields={
      "name": norm(row.get("name","")),
      "aliases": norm(" ".join(row.get("aliases",[]))),
      "tags": norm(" ".join(row.get("tags",[]))),
      "id": norm(row.get("id",""))
    }
    s=0; why=[]
    if qn and qn in fields["name"]: s+=100; why.append("name_phrase")
    if qn and qn in fields["aliases"]: s+=80; why.append("alias_phrase")
    if qn and qn in fields["tags"]: s+=60; why.append("tag_phrase")
    for key,w in [("name",12),("aliases",9),("tags",6),("id",15)]:
        hit=qt & tokens(fields[key])
        if hit:
            s+=w*len(hit); why.append(f"{key}:{','.join(sorted(hit))}")
    return s,why

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("query")
    ap.add_argument("--limit",type=int,default=5)
    ap.add_argument("--json",action="store_true")
    a=ap.parse_args()
    out=[]
    for row in load():
        s,why=score(a.query,row)
        if s:
            out.append({"id":row["id"],"name":row["name"],"classification":row["classification"],"tier":row["tier"],"score":s,"why":why,"evidence":row.get("evidence",row.get("evidence_reference"))})
    out.sort(key=lambda x:(-x["score"],0 if x["tier"]=="CANONICAL_REGISTRY" else 1,x["id"]))
    out=out[:a.limit]
    payload={"query":a.query,"state":"MATCH" if out else "UNKNOWN","results":out}
    print(json.dumps(payload,ensure_ascii=False,indent=2) if a.json else "\n".join([f'{x["id"]}\t{x["classification"]}\t{x["score"]}\t{x["name"]}' for x in out]) or "UNKNOWN")

if __name__=="__main__": main()
