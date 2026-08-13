import sqlite3
import tempfile
import unittest
from contextlib import closing
from pathlib import Path
from unittest.mock import patch

from scripts.archive_deduplicate import deduplicate


class ArchiveDeduplicateTests(unittest.TestCase):
    def make_inventory(self, base: Path, files: dict[str, bytes]) -> tuple[Path, Path]:
        root = base / "source"; root.mkdir()
        inventory = base / "inventory.sqlite3"
        with closing(sqlite3.connect(inventory)) as database:
            database.execute("CREATE TABLE run(key TEXT PRIMARY KEY, value TEXT)")
            database.execute("CREATE TABLE files(relative_path TEXT PRIMARY KEY, size_bytes INTEGER, extension TEXT)")
            database.executemany("INSERT INTO run VALUES (?,?)", [("root", str(root)), ("status", "COMPLETE")])
            for name, content in files.items():
                path = root / name; path.write_bytes(content)
                database.execute("INSERT INTO files VALUES (?,?,?)", (name, len(content), path.suffix.lower() or "[sem extensão]"))
            database.commit()
        return root, inventory

    def test_duplicates_false_candidates_unique_sizes_and_empty_files(self):
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            _, inventory = self.make_inventory(base, {
                "same-a.pdf": b"same", "same-b.pdf": b"same",
                "false-a.txt": b"abcd", "false-b.txt": b"wxyz",
                "unique.bin": b"different length", "empty-a": b"", "empty-b": b"",
            })
            stats = deduplicate(inventory, base / "output", 2, 2)
            self.assertEqual(stats["duplicate_groups"], 2)
            self.assertEqual(stats["redundant_files"], 2)
            self.assertEqual(stats["redundant_bytes"], 4)
            self.assertEqual(stats["unique_files"], 5)
            with closing(sqlite3.connect(base / "output/dedup.sqlite3")) as database:
                self.assertEqual(database.execute("SELECT COUNT(*) FROM same_size_different_hash WHERE size_bytes=4").fetchone()[0], 4)
                self.assertIsNone(database.execute("SELECT relative_path FROM hashes WHERE relative_path='unique.bin'").fetchone())

    def test_read_error_is_recorded(self):
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            _, inventory = self.make_inventory(base, {"a.bin": b"x", "b.bin": b"x"})
            with patch("scripts.archive_deduplicate.hash_file", side_effect=OSError("denied")):
                stats = deduplicate(inventory, base / "output", 2, 1)
            self.assertEqual(stats["errors"], 2)
            with closing(sqlite3.connect(base / "output/dedup.sqlite3")) as database:
                self.assertEqual(database.execute("SELECT COUNT(*) FROM errors").fetchone()[0], 2)

    def test_interruption_is_safe(self):
        with tempfile.TemporaryDirectory() as temporary:
            base = Path(temporary)
            _, inventory = self.make_inventory(base, {"a.bin": b"x", "b.bin": b"x"})
            with patch("scripts.archive_deduplicate.hash_file", side_effect=KeyboardInterrupt()):
                stats = deduplicate(inventory, base / "output", 2, 1)
            self.assertEqual(stats["status"], "INTERRUPTED")
            with closing(sqlite3.connect(base / "output/dedup.sqlite3")) as database:
                self.assertEqual(database.execute("SELECT value FROM run WHERE key='status'").fetchone()[0], "INTERRUPTED")


if __name__ == "__main__":
    unittest.main()
