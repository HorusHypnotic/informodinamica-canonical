import sqlite3
import tempfile
import unittest
from contextlib import closing
from pathlib import Path
from unittest.mock import patch

from scripts.archive_inventory import inventory, main


class ArchiveInventoryTests(unittest.TestCase):
    def test_inventory_collects_metadata_and_honors_limit(self):
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            root = base / "source"
            output = base / "output"
            (root / "nested").mkdir(parents=True)
            (root / "one.pdf").write_bytes(b"not opened by inventory")
            (root / "nested" / "two.txt").write_bytes(b"metadata only")
            stats = inventory(root, output, max_files=1, progress_every=1)
            self.assertEqual(stats["status"], "LIMIT_REACHED")
            self.assertEqual(stats["files"], 1)
            with closing(sqlite3.connect(output / "inventory.sqlite3")) as database:
                self.assertEqual(database.execute("SELECT COUNT(*) FROM files").fetchone()[0], 1)

    def test_dry_run_does_not_create_output(self):
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            root = base / "source"
            output = base / "output"
            root.mkdir()
            self.assertEqual(main(["--root", str(root), "--output", str(output), "--dry-run"]), 0)
            self.assertFalse(output.exists())

    def test_keyboard_interrupt_leaves_valid_partial_database(self):
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            root = base / "source"
            output = base / "output"
            root.mkdir()
            with patch("scripts.archive_inventory.os.scandir", side_effect=[KeyboardInterrupt()]):
                stats = inventory(root, output, max_files=None, progress_every=1)
            self.assertEqual(stats["status"], "INTERRUPTED")
            with closing(sqlite3.connect(output / "inventory.sqlite3")) as database:
                self.assertEqual(database.execute("SELECT value FROM run WHERE key='status'").fetchone()[0], "INTERRUPTED")


if __name__ == "__main__":
    unittest.main()
