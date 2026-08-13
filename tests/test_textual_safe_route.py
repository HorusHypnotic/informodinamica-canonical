import copy
import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

from scripts.document_provenance import canonical_json, document_id, sha256_bytes, validate_manifest
from scripts.safe_document_representation import render_markdown, validate_representation
from scripts.textual_safe_route import TextualSafeRouteError, build_provenance, load_schema, transform, validate_input


CATALOG = Path(__file__).parent / "fixtures" / "textual_safe_route_v1" / "scenarios.json"
SOURCE_BYTES = b"Synthetic source for Textual-Safe Route V1.\n"
SOURCE_HASH = sha256_bytes(SOURCE_BYTES)
TIMESTAMP = "2026-08-13T12:00:00Z"


def empty_block(block_id="B0001", kind="PARAGRAPH", **changes):
    value = {"block_id": block_id, "page_number": 1, "kind": kind, "text": "Synthetic text.",
             "content_status": "RECOVERED", "structure_status": "PRESERVED", "level": None,
             "items": [], "rows": [], "fields": [], "asset_refs": [], "evidence": ["synthetic-explicit-tag"], "notes": []}
    value.update(changes)
    return value


def safe_input(blocks=None, assets=None, order="PROVEN"):
    return {"schema_version": "1.0.0", "source": {"doc_id": document_id(SOURCE_HASH),
            "source_sha256": SOURCE_HASH, "source_size_bytes": len(SOURCE_BYTES), "source_format": "txt",
            "discovered_at": TIMESTAMP, "inventory_id": "synthetic-fixture", "inventory_version": "1.0.0"},
            "order": {"status": order, "evidence": ["synthetic-explicit-sequence"] if order == "PROVEN" else []},
            "blocks": [empty_block()] if blocks is None else blocks, "assets": assets or []}


class TextualSafeRouteTests(unittest.TestCase):
    def test_contract_schema_and_twenty_synthetic_scenarios_are_declared(self):
        Draft202012Validator.check_schema(load_schema())
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
        self.assertEqual(catalog["fixture_policy"], "synthetic-only")
        self.assertEqual(len(catalog["scenarios"]), 20)
        self.assertEqual(len(set(catalog["scenarios"])), 20)

    def test_safe_textual_structures_transform_without_inference(self):
        cases = [
            [empty_block(kind="PLAIN_TEXT", structure_status="NOT_APPLICABLE", evidence=[])],
            [empty_block("B0001"), empty_block("B0002", page_number=2)],
            [empty_block(kind="HEADING", level=2)],
            [empty_block("B0001", kind="HEADING", level=1), empty_block("B0002", kind="HEADING", level=2)],
            [empty_block(kind="LIST", items=[{"text": "One", "level": 1, "state": "NOT_APPLICABLE"}])],
            [empty_block(kind="LIST", items=[{"text": "One", "level": 1, "state": "NOT_APPLICABLE"}, {"text": "Nested", "level": 2, "state": "NOT_APPLICABLE"}])],
            [empty_block(kind="TABLE", rows=[["A", "B"], ["1", "2"]])],
            [empty_block(kind="CHECKLIST", items=[{"text": "Done", "level": 1, "state": "CHECKED"}])],
            [empty_block(kind="FORM", fields=[{"label": "Name", "value": "Synthetic", "relation_status": "PRESERVED"}])],
        ]
        for blocks in cases:
            result = transform(safe_input(blocks))
            validate_representation(result)
            self.assertEqual(result["representation_status"], "REPRESENTED")
        plain = transform(safe_input(cases[0]))["pages"][0]["blocks"][0]
        self.assertEqual((plain["kind"], plain["structure_status"]), ("PARAGRAPH", "NOT_APPLICABLE"))

    def test_partial_uncertain_unavailable_asset_and_mixed_are_explicit(self):
        partial = transform(safe_input([empty_block(content_status="PARTIAL", text="Fragment", notes=["Tail unavailable."])]))
        self.assertEqual(partial["representation_status"], "PARTIAL"); self.assertTrue(partial["known_losses"])
        uncertain = transform(safe_input([empty_block(structure_status="UNCERTAIN", evidence=[], notes=["Relation not proven."])]))
        self.assertEqual(uncertain["representation_status"], "PARTIAL"); self.assertTrue(uncertain["uncertainties"])
        digest = "a" * 64
        asset = {"asset_id": "AST-" + digest[:16], "sha256": digest, "format": "png", "role": "IMAGE", "essential": True,
                 "available": True, "description_status": "UNAVAILABLE", "description": None}
        visual = empty_block("B0002", kind="ASSET", content_status="UNAVAILABLE", structure_status="NOT_APPLICABLE", text=None,
                             asset_refs=[asset["asset_id"]], notes=["Visual meaning not interpreted."])
        mixed = transform(safe_input([empty_block(), visual], [asset]))
        self.assertEqual(mixed["representation_status"], "PARTIAL"); self.assertEqual(len(mixed["assets"]), 1)

    def test_abstention_has_coherent_provenance_and_no_false_derivative(self):
        value = safe_input([])
        representation = transform(value)
        manifest, derivative = build_provenance(value, representation, started_at=TIMESTAMP, completed_at=TIMESTAMP)
        self.assertEqual(representation["representation_status"], "ABSTAINED")
        self.assertEqual(manifest["processing"]["status"], "ABSTAINED")
        self.assertIsNone(manifest["derivative"]); self.assertIsNone(derivative)
        validate_manifest(manifest, source_bytes=SOURCE_BYTES)

    def test_adversarial_evidence_is_rejected_or_conservatively_degraded(self):
        invalid = [
            safe_input([empty_block(kind="HEADING", level=None)]),
            safe_input([empty_block(kind="TABLE", rows=[])]),
            safe_input([empty_block(kind="LIST", items=[{"text": "Bad", "level": 2, "state": "NOT_APPLICABLE"}])]),
            safe_input([empty_block(kind="CHECKLIST", items=[{"text": "Maybe", "level": 1, "state": "UNCERTAIN"}])]),
        ]
        for value in invalid:
            with self.assertRaises(TextualSafeRouteError): transform(value)
        bad_asset = "b" * 64
        asset = {"asset_id": "AST-" + bad_asset[:16], "sha256": bad_asset, "format": "png", "role": "IMAGE", "essential": True,
                 "available": False, "description_status": "UNAVAILABLE", "description": None}
        with self.assertRaisesRegex(TextualSafeRouteError, "unavailable"):
            transform(safe_input([empty_block(kind="ASSET", content_status="UNAVAILABLE", structure_status="NOT_APPLICABLE", text=None,
                                                  asset_refs=[asset["asset_id"]], notes=["Missing."])], [asset]))
        no_order_evidence = safe_input(); no_order_evidence["order"]["evidence"] = []
        with self.assertRaisesRegex(TextualSafeRouteError, "order requires evidence"): validate_input(no_order_evidence)
        uncertain = safe_input([empty_block(structure_status="UNCERTAIN", evidence=[], notes=[])])
        with self.assertRaisesRegex(TextualSafeRouteError, "justification"): transform(uncertain)
        partial = safe_input([empty_block(content_status="PARTIAL", notes=[])])
        with self.assertRaisesRegex(TextualSafeRouteError, "known loss"): transform(partial)
        identity = safe_input(); identity["source"]["doc_id"] = "DOC-00000000"
        with self.assertRaisesRegex(TextualSafeRouteError, "contradicts"): transform(identity)

    def test_plain_text_cannot_be_promoted_to_heading_table_or_list(self):
        source = safe_input([empty_block(kind="PLAIN_TEXT", text="# Heading | A | B", structure_status="NOT_APPLICABLE", evidence=[])])
        block = transform(source)["pages"][0]["blocks"][0]
        self.assertEqual(block["kind"], "PARAGRAPH")
        self.assertIsNone(block["level"]); self.assertEqual(block["rows"], []); self.assertEqual(block["items"], [])

    def test_dogfood_pass_warning_fail_and_determinism(self):
        value = safe_input([empty_block(kind="HEADING", level=1), empty_block("B0002", text="Body.")])
        representation = transform(value)
        expected = None
        for status in ("PASS", "PASS_WITH_WARNINGS", "FAIL"):
            manifest, data = build_provenance(value, representation, started_at=TIMESTAMP, completed_at=TIMESTAMP, validation_status=status)
            validate_manifest(manifest, SOURCE_BYTES, data)
            self.assertEqual(manifest["validation"]["validation_status"], status)
            if status == "FAIL": self.assertIsNotNone(manifest["derivative"])
        for _ in range(25):
            current = transform(copy.deepcopy(value))
            manifest, data = build_provenance(value, current, started_at=TIMESTAMP, completed_at=TIMESTAMP)
            snapshot = (canonical_json(current), data, canonical_json(manifest), render_markdown(current))
            expected = snapshot if expected is None else expected
            self.assertEqual(snapshot, expected)

    def test_uncertain_order_is_retained_and_exposed(self):
        result = transform(safe_input([empty_block("B0001"), empty_block("B0002")], order="UNCERTAIN"))
        self.assertEqual([b["block_id"] for b in result["pages"][0]["blocks"]], ["B0001", "B0002"])
        self.assertEqual(result["uncertainties"][0]["code"], "ORDER_UNCERTAIN")
        self.assertIn("UNCERTAINTY", render_markdown(result))


if __name__ == "__main__":
    unittest.main()
