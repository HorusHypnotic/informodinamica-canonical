import copy
import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

from scripts.document_provenance import canonical_json, document_id, sha256_bytes, validate_manifest
from scripts.safe_document_representation import render_markdown
from scripts.textual_evidence_producer import load_schema, produce
from scripts.textual_safe_route import build_provenance, transform

CATALOG = Path(__file__).parent / "fixtures" / "textual_evidence_producer_v0" / "scenarios.json"
SOURCE_BYTES = b"Controlled synthetic evidence source.\n"
SOURCE_HASH = sha256_bytes(SOURCE_BYTES)
NOW = "2026-08-13T15:00:00Z"


def source(units, syntax="STRUCTURED_METADATA", order="PROVEN", assets=None):
    identity = {"doc_id": document_id(SOURCE_HASH), "source_sha256": SOURCE_HASH,
                "source_size_bytes": len(SOURCE_BYTES), "source_format": "txt", "discovered_at": NOW,
                "inventory_id": "synthetic-evidence", "inventory_version": "0.1.0"}
    return {"source": identity, "syntax": syntax,
            "order": {"status": order, "evidence": ["fixture-declared-sequence"] if order == "PROVEN" else []},
            "units": units, "assets": assets or []}


def unit(unit_id, text, signal=None, metadata=None, conflicts=None):
    value = {"unit_id": unit_id, "page_number": 1, "text": text}
    if signal is not None: value["signal"] = signal
    if metadata is not None: value["metadata"] = metadata
    if conflicts is not None: value["conflicts"] = conflicts
    return value


class TextualEvidenceProducerTests(unittest.TestCase):
    def test_schema_and_fixture_matrix(self):
        Draft202012Validator.check_schema(load_schema())
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
        self.assertEqual(len(catalog["scenarios"]), 20)
        self.assertEqual(len(catalog["adversarial"]), 10)

    def test_explicit_structures_are_recognized(self):
        rows = [["A", "B"], ["1", "2"]]
        cases = [
            unit("p", "Paragraph.", "PARAGRAPH"),
            unit("h", "# Heading", "HEADING", {"level": 1}),
            unit("l", "- Item", "LIST", {"items": [{"text": "Item", "level": 1, "state": "NOT_APPLICABLE"}]}),
            unit("n", "1. Item", "LIST", {"items": [{"text": "Item", "level": 1, "state": "NOT_APPLICABLE"}]}),
            unit("m", "- Parent", "LIST", {"items": [{"text": "Parent", "level": 1, "state": "NOT_APPLICABLE"}, {"text": "Child", "level": 2, "state": "NOT_APPLICABLE"}]}),
            unit("t", "A | B", "TABLE", {"rows": rows}),
            unit("c", "- [x] Done", "CHECKLIST", {"state": "CHECKED"}),
        ]
        ledger = produce(source(cases, syntax="EXPLICIT_MARKUP"))
        self.assertTrue(all(item["status"] == "SUFFICIENT" for item in ledger["evidence"]))
        representation = transform(ledger["safe_input"])
        self.assertEqual(representation["representation_status"], "REPRESENTED")
        self.assertEqual([b["kind"] for p in representation["pages"] for b in p["blocks"]],
                         ["PARAGRAPH", "HEADING", "LIST", "LIST", "LIST", "TABLE", "CHECKLIST"])

    def test_structured_form_partial_unavailable_and_asset(self):
        digest = "a" * 64; asset_id = "AST-" + digest[:16]
        asset = {"asset_id": asset_id, "sha256": digest, "format": "png", "role": "IMAGE", "essential": True,
                 "available": True, "description_status": "UNAVAILABLE", "description": None}
        units = [
            unit("f", None, "FORM", {"fields": [{"label": "Name", "value": "Synthetic", "relation_status": "PRESERVED"}]}),
            unit("p", "Fragment", "PARAGRAPH", {"content_status": "PARTIAL", "loss": "Tail unavailable."}),
            unit("a", None, "ASSET", {"asset_refs": [asset_id]}),
        ]
        result = transform(produce(source(units, assets=[asset]))["safe_input"])
        self.assertEqual(result["representation_status"], "PARTIAL")
        self.assertEqual(len(result["assets"]), 1); self.assertTrue(result["known_losses"])

    def test_plain_and_adversarial_text_never_gets_structural_promotion(self):
        texts = ["INTRODUCTION", "1. This is prose", "word - word", "A     B", "Name: maybe",
                 "[ ] literal", "Short", "1 .... 2 ....", "A | B", "# looks marked"]
        ledger = produce(source([unit(str(i), text, "HEADING") for i, text in enumerate(texts)], syntax="PLAIN"))
        self.assertTrue(all(e["status"] == "INSUFFICIENT" for e in ledger["evidence"]))
        result = transform(ledger["safe_input"])
        self.assertTrue(all(b["kind"] == "PARAGRAPH" for p in result["pages"] for b in p["blocks"]))

    def test_invalid_markup_and_conflicts_are_not_promoted(self):
        units = [unit("fake-heading", "INTRODUCTION", "HEADING", {"level": 1}),
                 unit("fake-table", "A | B", "TABLE", {"rows": []}),
                 unit("conflict", "# Heading", "HEADING", {"level": 1}, ["also-paragraph"])]
        ledger = produce(source(units, syntax="EXPLICIT_MARKUP"))
        self.assertEqual([e["status"] for e in ledger["evidence"]], ["INSUFFICIENT", "INSUFFICIENT", "CONFLICTING"])
        result = transform(ledger["safe_input"])
        self.assertNotIn("HEADING", [b["kind"] for p in result["pages"] for b in p["blocks"]])
        self.assertEqual(result["representation_status"], "PARTIAL")

    def test_known_and_unknown_order_remain_distinct(self):
        known = produce(source([unit("p", "Text", "PARAGRAPH")]))
        unknown = produce(source([unit("p", "Text", "PARAGRAPH")], order="UNCERTAIN"))
        self.assertEqual(known["safe_input"]["order"]["status"], "PROVEN")
        self.assertEqual(unknown["safe_input"]["order"]["status"], "UNCERTAIN")
        self.assertEqual(transform(unknown["safe_input"])["uncertainties"][0]["code"], "ORDER_UNCERTAIN")

    def test_absent_source_abstains_without_derivative(self):
        controlled = source([unit("missing", None)])
        ledger = produce(controlled); representation = transform(ledger["safe_input"])
        manifest, data = build_provenance(ledger["safe_input"], representation, started_at=NOW, completed_at=NOW)
        self.assertEqual(representation["representation_status"], "ABSTAINED")
        self.assertEqual(ledger["evidence"][0]["status"], "ABSENT")
        self.assertIsNone(data); self.assertIsNone(manifest["derivative"])

    def test_end_to_end_provenance_and_total_determinism(self):
        controlled = source([unit("h", "# Heading", "HEADING", {"level": 1}), unit("p", "Body", "PARAGRAPH")], syntax="EXPLICIT_MARKUP")
        expected = None
        for _ in range(25):
            ledger = produce(copy.deepcopy(controlled)); representation = transform(ledger["safe_input"])
            manifest, data = build_provenance(ledger["safe_input"], representation, started_at=NOW, completed_at=NOW)
            validate_manifest(manifest, SOURCE_BYTES, data)
            snapshot = (canonical_json(ledger), canonical_json(representation), canonical_json(manifest), render_markdown(representation))
            expected = snapshot if expected is None else expected
            self.assertEqual(snapshot, expected)


if __name__ == "__main__": unittest.main()
