import copy
import json
import unittest
from pathlib import Path

from scripts.document_provenance import (
    ProvenanceError,
    canonical_json,
    event_id,
    load_schema,
    reconstruct_lineage,
    validate_manifest,
)


FIXTURES = Path(__file__).parent / "fixtures" / "document_provenance_v1"


class DocumentProvenanceTests(unittest.TestCase):
    def manifest(self, name="valid-manifest.json"):
        return json.loads((FIXTURES / name).read_text(encoding="utf-8"))

    def test_schema_is_valid_draft_2020_12(self):
        from jsonschema import Draft202012Validator

        Draft202012Validator.check_schema(load_schema())

    def test_reconstructs_complete_lineage_from_derivative_manifest(self):
        manifest = self.manifest()
        validate_manifest(
            manifest,
            (FIXTURES / "source.txt").read_bytes(),
            (FIXTURES / "derivative.md").read_bytes(),
        )
        self.assertEqual(reconstruct_lineage(manifest), {
            "doc_id": "DOC-c6dc82ad",
            "source_sha256": manifest["source"]["source_sha256"],
            "operation": "DIRECT_TEXT_EXTRACTION",
            "tool": "synthetic-pipeline",
            "tool_version": "1.0.0",
            "validation_status": "PASS",
            "processing_event_id": "EVT-fcd0119b26ea5e90",
        })

    def test_abstention_is_evidence_without_derivative(self):
        manifest = self.manifest("abstained-manifest.json")
        validate_manifest(manifest, (FIXTURES / "source.txt").read_bytes())
        self.assertEqual(manifest["processing"]["status"], "ABSTAINED")
        self.assertIsNone(manifest["derivative"])

    def test_deterministic_event_and_serialization(self):
        manifest = self.manifest()
        for _ in range(25):
            self.assertEqual(event_id(manifest["processing"]), "EVT-fcd0119b26ea5e90")
            self.assertEqual(canonical_json(manifest), canonical_json(copy.deepcopy(manifest)))

    def test_failed_validation_preserves_experimental_derivative(self):
        manifest = self.manifest()
        manifest["processing"]["status"] = "FAILED"
        manifest["validation"].update(
            validation_status="FAIL",
            validation_method="synthetic-structural-review",
            warnings=["STRUCTURE_NOT_PRESERVED"],
        )
        validate_manifest(manifest)
        self.assertIsNotNone(manifest["derivative"])

    def test_dogfood_maps_existing_direct_md_fields_without_private_data(self):
        manifest = self.manifest()
        legacy = {
            "doc_id": manifest["document"]["doc_id"],
            "source_sha256": manifest["source"]["source_sha256"],
            "source_size_bytes": manifest["source"]["source_size_bytes"],
            "converter_version": manifest["processing"]["tool_version"],
            "markdown_sha256": manifest["derivative"]["derivative_sha256"],
            "validation_status": manifest["validation"]["validation_status"],
            "warnings": manifest["validation"]["warnings"],
        }
        self.assertEqual(legacy["doc_id"], manifest["processing"]["doc_id"])
        self.assertEqual(legacy["source_sha256"], manifest["derivative"]["source_sha256"])
        self.assertEqual(legacy["markdown_sha256"], manifest["derivative"]["derivative_sha256"])
        validate_manifest(manifest)

    def assert_invalid(self, mutate, message):
        manifest = self.manifest()
        mutate(manifest)
        with self.assertRaisesRegex(ProvenanceError, message):
            validate_manifest(manifest)

    def test_rejects_missing_source_hash(self):
        self.assert_invalid(lambda m: m["source"].pop("source_sha256"), "schema violation")

    def test_rejects_unknown_schema_version(self):
        self.assert_invalid(lambda m: m.update(schema_version="2.0.0"), "schema violation")

    def test_rejects_contradictory_document_identity(self):
        self.assert_invalid(lambda m: m["document"].update(doc_id="DOC-00000000"), "doc_id contradicts")

    def test_rejects_missing_processing_event_reference(self):
        self.assert_invalid(lambda m: m["derivative"].update(processing_event_id="EVT-0000000000000000"), "nonexistent processing event")

    def test_rejects_contradictory_derivative_identity(self):
        self.assert_invalid(lambda m: m["derivative"].update(derivative_id="DER-0000000000000000"), "derivative_id contradicts")

    def test_rejects_incompatible_source_and_derivative_hashes(self):
        manifest = self.manifest()
        with self.assertRaisesRegex(ProvenanceError, "source bytes contradict"):
            validate_manifest(manifest, b"wrong source", (FIXTURES / "derivative.md").read_bytes())
        with self.assertRaisesRegex(ProvenanceError, "derivative bytes contradict"):
            validate_manifest(manifest, (FIXTURES / "source.txt").read_bytes(), b"wrong derivative")

    def test_rejects_orphan_derivative_and_invalid_abstention(self):
        self.assert_invalid(lambda m: m.pop("source"), "schema violation")
        manifest = self.manifest("abstained-manifest.json")
        manifest["derivative"] = self.manifest()["derivative"]
        with self.assertRaisesRegex(ProvenanceError, "schema violation"):
            validate_manifest(manifest)

    def test_rejects_validation_contradictions(self):
        self.assert_invalid(lambda m: m["validation"].update(warnings=["unexpected"]), "PASS cannot contain warnings")


if __name__ == "__main__":
    unittest.main()
