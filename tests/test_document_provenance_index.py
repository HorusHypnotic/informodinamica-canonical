import copy
import json
import sqlite3
import tempfile
import unittest
from contextlib import closing
from pathlib import Path

from scripts.document_provenance import event_id
from scripts.document_provenance_index import (
    build_index,
    index_snapshot,
    project_manifests,
    query_index,
    verify_index,
)


FIXTURES = Path(__file__).parent / "fixtures"
BASE = FIXTURES / "document_provenance_v1" / "valid-manifest.json"
SCENARIOS = FIXTURES / "document_provenance_index_v1" / "scenario-contract.json"


class DocumentProvenanceIndexTests(unittest.TestCase):
    def base(self):
        return json.loads(BASE.read_text(encoding="utf-8"))

    def write(self, directory, name, manifest):
        (directory / name).write_text(json.dumps(manifest, ensure_ascii=False, sort_keys=True), encoding="utf-8")

    def variant(self, operation, started_at, digest_char, status="COMPLETED", validation="PASS"):
        manifest = self.base()
        processing = manifest["processing"]
        processing.update(operation=operation, started_at=started_at, completed_at=started_at, status=status)
        processing["event_id"] = event_id(processing)
        derivative = manifest["derivative"]
        digest = digest_char * 64
        derivative.update(
            derivative_id=f"DER-{digest[:16]}", derivative_sha256=digest,
            processing_event_id=processing["event_id"],
        )
        manifest["validation"].update(
            validation_status=validation,
            validation_method=None if validation == "NOT_VALIDATED" else "synthetic-review",
            warnings=["SYNTHETIC_WARNING"] if validation in {"FAIL", "PASS_WITH_WARNINGS"} else [],
            validated_at=None if validation == "NOT_VALIDATED" else started_at,
        )
        return manifest

    def valid_set(self, directory):
        self.write(directory, "01-valid.json", self.base())
        self.write(directory, "02-failed.json", self.variant("STRUCTURAL_CLASSIFICATION", "2026-08-13T17:00:00Z", "b", "FAILED", "FAIL"))
        self.write(directory, "03-not-validated.json", self.variant("CHUNKING", "2026-08-13T18:00:00Z", "c", validation="NOT_VALIDATED"))
        abstained = json.loads((FIXTURES / "document_provenance_v1" / "abstained-manifest.json").read_text(encoding="utf-8"))
        self.write(directory, "04-abstained.json", abstained)

    def test_fixture_declares_all_required_scenarios(self):
        fixture = json.loads(SCENARIOS.read_text(encoding="utf-8"))
        self.assertEqual(len(fixture["scenarios"]), 11)

    def test_build_indexes_one_source_multiple_events_derivatives_and_abstention(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary); manifests = root / "manifests"; manifests.mkdir(); self.valid_set(manifests)
            projection = build_index(manifests, root / "index.sqlite3")
            self.assertEqual(projection.status, "WARN")
            self.assertEqual((len(projection.sources), len(projection.events), len(projection.derivatives)), (1, 4, 3))
            self.assertEqual(len(query_index(root / "index.sqlite3", "abstained")), 1)

    def test_all_operational_queries_are_stable(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary); manifests = root / "manifests"; manifests.mkdir(); self.valid_set(manifests); index = root / "index.sqlite3"
            build_index(manifests, index)
            source_hash = self.base()["source"]["source_sha256"]
            derivative_id = self.base()["derivative"]["derivative_id"]
            expected = {
                "doc": 1, "source": 1, "events": 4, "derivatives": 3,
                "derivative": 1, "validation": 1, "abstained": 1,
            }
            values = {"doc": "DOC-c6dc82ad", "source": source_hash, "events": source_hash,
                      "derivatives": source_hash, "derivative": derivative_id, "validation": derivative_id,
                      "abstained": None}
            for query, count in expected.items():
                first = query_index(index, query, values[query]); second = query_index(index, query, values[query])
                self.assertEqual(first, second); self.assertEqual(len(first), count)

    def test_reconstructs_derivative_to_event_to_source(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary); manifests = root / "manifests"; manifests.mkdir(); self.valid_set(manifests); index = root / "index.sqlite3"
            build_index(manifests, index)
            derivative = query_index(index, "derivative", self.base()["derivative"]["derivative_id"])[0]
            events = query_index(index, "events", derivative["source_sha256"])
            event = next(row for row in events if row["event_id"] == derivative["processing_event_id"])
            source = query_index(index, "source", event["source_sha256"])[0]
            self.assertEqual(source["doc_id"], derivative["source_doc_id"])

    def test_verify_distinguishes_pass_warn_and_blocked(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            passing = root / "pass"; passing.mkdir(); self.write(passing, "valid.json", self.base())
            pass_index = root / "pass.sqlite3"; build_index(passing, pass_index)
            self.assertEqual(verify_index(pass_index, passing)["status"], "PASS")
            warning = root / "warn"; warning.mkdir(); self.valid_set(warning)
            warn_index = root / "warn.sqlite3"; build_index(warning, warn_index)
            self.assertEqual(verify_index(warn_index, warning)["status"], "WARN")
            (warning / "04-abstained.json").write_text("{}", encoding="utf-8")
            self.assertEqual(verify_index(warn_index, warning)["status"], "BLOCKED")

    def test_invalid_manifests_are_blocked_without_silent_repair(self):
        mutations = {
            "orphan-event": lambda m: m["processing"].update(source_sha256="0" * 64),
            "orphan-derivative": lambda m: m["derivative"].update(processing_event_id="EVT-0000000000000000"),
            "contradictory-identity": lambda m: m["document"].update(doc_id="DOC-00000000"),
            "invalid-schema": lambda m: m.update(schema_version="999.0.0"),
        }
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            for name, mutation in mutations.items():
                manifest = self.base(); mutation(manifest); self.write(root, name + ".json", manifest)
            projection = project_manifests(root)
            self.assertEqual(projection.status, "BLOCKED")
            self.assertEqual(len(projection.manifests), 4)
            self.assertTrue(all(row[2] == "BLOCKED" for row in projection.manifests))

    def test_delete_index_and_rebuild_has_same_logical_genealogy(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary); manifests = root / "manifests"; manifests.mkdir(); self.valid_set(manifests); index = root / "index.sqlite3"
            first = build_index(manifests, index)
            with closing(sqlite3.connect(index)) as connection: first_snapshot = index_snapshot(connection)
            first_digest = first.logical_digest(); index.unlink()
            second = build_index(manifests, index)
            with closing(sqlite3.connect(index)) as connection: second_snapshot = index_snapshot(connection)
            self.assertEqual(first_digest, second.logical_digest())
            self.assertEqual(first_snapshot, second_snapshot)

    def test_rebuild_is_deterministic_across_20_repetitions(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary); manifests = root / "manifests"; manifests.mkdir(); self.valid_set(manifests); index = root / "index.sqlite3"
            digests = [build_index(manifests, index).logical_digest() for _ in range(20)]
            self.assertEqual(len(set(digests)), 1)


if __name__ == "__main__":
    unittest.main()
