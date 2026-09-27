import tempfile
import unittest
from pathlib import Path

from scripts.tower_search import build, search


class TowerSearchTests(unittest.TestCase):
    def test_build_and_retrieve(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td) / "repo"
            root.mkdir()
            (root / "telegram.md").write_text(
                "# Telegram PETECO\nAUTH_RPC_ERROR singleton longpoll Whisper",
                encoding="utf-8",
            )
            (root / "bezerrao.md").write_text(
                "# Bezerrão\nGás água gelo Vitrine Digital",
                encoding="utf-8",
            )
            idx = Path(td) / "tower.db"
            self.assertEqual(build(root, idx), 2)
            self.assertEqual(search(idx, "Telegram", 10)[0]["path"], "telegram.md")
            self.assertEqual(search(idx, "Bezerrão", 10)[0]["path"], "bezerrao.md")

    def test_excludes_workspace(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td) / "repo"
            (root / "workspace").mkdir(parents=True)
            (root / "workspace" / "secret.md").write_text("SEGREDO_UNICO", encoding="utf-8")
            (root / "public.md").write_text("PUBLICO_UNICO", encoding="utf-8")
            idx = Path(td) / "tower.db"
            build(root, idx)
            self.assertTrue(search(idx, "PUBLICO_UNICO", 10))
            self.assertEqual(search(idx, "SEGREDO_UNICO", 10), [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
