import sqlite3
from pathlib import Path
from scripts.tower_search import build, search

def test_build_and_retrieve(tmp_path: Path):
    root=tmp_path/"repo"; root.mkdir()
    (root/"telegram.md").write_text("# Telegram PETECO\nAUTH_RPC_ERROR singleton longpoll Whisper",encoding="utf-8")
    (root/"bezerrao.md").write_text("# Bezerrão\nGás água gelo Vitrine Digital",encoding="utf-8")
    idx=tmp_path/"tower.db"
    assert build(root,idx)==2
    assert search(idx,"Telegram",10)[0]["path"]=="telegram.md"
    assert search(idx,"Bezerrão",10)[0]["path"]=="bezerrao.md"

def test_excludes_workspace(tmp_path: Path):
    root=tmp_path/"repo"; (root/"workspace").mkdir(parents=True)
    (root/"workspace"/"secret.md").write_text("SEGREDO_UNICO",encoding="utf-8")
    (root/"public.md").write_text("PUBLICO_UNICO",encoding="utf-8")
    idx=tmp_path/"tower.db"; build(root,idx)
    assert search(idx,"PUBLICO_UNICO",10)
    assert search(idx,"SEGREDO_UNICO",10)==[]
