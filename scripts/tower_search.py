#!/usr/bin/env python3
"""Tower Search V0: rebuildable local full-text retrieval over canonical text assets."""
from __future__ import annotations
import argparse, json, sqlite3
from pathlib import Path

INCLUDE={".md",".txt",".json",".py",".ts",".tsx",".sql",".yml",".yaml"}
EXCLUDE={".git","node_modules","dist","build",".venv","workspace"}

def files(root):
    for p in sorted(root.rglob("*")):
        if p.is_file() and p.suffix.lower() in INCLUDE and not any(x in EXCLUDE for x in p.parts):
            yield p

def build(root,out):
    out.parent.mkdir(parents=True,exist_ok=True)
    tmp=out.with_suffix(out.suffix+".tmp")
    if tmp.exists(): tmp.unlink()
    con=sqlite3.connect(tmp)
    try:
        con.execute("CREATE VIRTUAL TABLE docs USING fts5(path UNINDEXED, title, body, tokenize='unicode61 remove_diacritics 2')")
        rows=[]
        for p in files(root):
            try: body=p.read_text(encoding="utf-8")
            except (UnicodeDecodeError,OSError): continue
            rel=p.relative_to(root).as_posix()
            title=next((ln.lstrip("# ").strip() for ln in body.splitlines() if ln.startswith("#")),p.stem)
            rows.append((rel,title,body))
        con.executemany("INSERT INTO docs(path,title,body) VALUES(?,?,?)",rows)
        con.commit()
    finally: con.close()
    tmp.replace(out)
    return len(rows)

def search(index,q,limit):
    con=sqlite3.connect(index); con.row_factory=sqlite3.Row
    try:
        rows=con.execute("""SELECT path,title,
          snippet(docs,2,'[',']',' … ',18) AS snippet,
          bm25(docs,8.0,4.0,1.0) AS score
          FROM docs WHERE docs MATCH ? ORDER BY score LIMIT ?""",(q,limit)).fetchall()
        return [dict(r) for r in rows]
    finally: con.close()

def main():
    ap=argparse.ArgumentParser(); sp=ap.add_subparsers(dest="cmd",required=True)
    b=sp.add_parser("build"); b.add_argument("--root",type=Path,default=Path(".")); b.add_argument("--output",type=Path,required=True)
    s=sp.add_parser("search"); s.add_argument("--index",type=Path,required=True); s.add_argument("query"); s.add_argument("--limit",type=int,default=10)
    a=ap.parse_args()
    if a.cmd=="build": print(json.dumps({"status":"PASS","documents":build(a.root,a.output)},ensure_ascii=False))
    else: print(json.dumps(search(a.index,a.query,a.limit),ensure_ascii=False,indent=2))
if __name__=="__main__": main()
