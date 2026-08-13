import copy
import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

from scripts.document_provenance import canonical_json, derivative_id, sha256_bytes
from scripts.safe_document_representation import (
    RepresentationError,
    load_schema,
    render_markdown,
    validate_provenance_link,
    validate_representation,
)


FIXTURE = Path(__file__).parent / "fixtures" / "safe_document_representation_v1" / "scenarios.json"
PROVENANCE = Path(__file__).parent / "fixtures" / "document_provenance_v1" / "valid-manifest.json"
EMPTY = {"text": None, "level": None, "items": [], "rows": [], "fields": [], "asset_refs": [], "notes": []}


def block(block_id, kind, content="RECOVERED", structure="PRESERVED", **values):
    return {"block_id": block_id, "kind": kind, "content_status": content, "structure_status": structure, **EMPTY, **values}


class SafeDocumentRepresentationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalog = json.loads(FIXTURE.read_text(encoding="utf-8"))
        cls.source = cls.catalog["source"]

    def representation(self, scenario):
        pages, assets, uncertainties, losses, status = [], [], [], [], "REPRESENTED"
        asset_hash = "a" * 64
        asset = {"asset_id": "AST-" + asset_hash[:16], "sha256": asset_hash, "format": "png", "role": "IMAGE",
                 "essential": True, "description_status": "OBSERVED", "description": "Synthetic essential visual."}
        if scenario == "linear-text":
            blocks = [block("B0001", "PARAGRAPH", text="Synthetic linear paragraph.")]
        elif scenario == "headings":
            blocks = [block("B0001", "HEADING", text="Synthetic heading", level=2)]
        elif scenario == "multilevel-list":
            blocks = [block("B0001", "LIST", items=[
                {"text": "Parent", "level": 1, "state": "NOT_APPLICABLE"},
                {"text": "Child", "level": 2, "state": "NOT_APPLICABLE"}])]
        elif scenario == "known-table":
            blocks = [block("B0001", "TABLE", rows=[["Column A", "Column B"], ["One", "Two"]])]
        elif scenario == "uncertain-table":
            status = "PARTIAL"; blocks = [block("B0001", "TABLE", structure="UNCERTAIN", text="A B One Two", notes=["Cell relations not proven."])]
            uncertainties = [{"code": "TABLE_RELATIONS_UNCERTAIN", "scope": "B0001", "message": "Text recovered without inventing cells."}]
        elif scenario == "checklist":
            status = "PARTIAL"; blocks = [block("B0001", "CHECKLIST", structure="UNCERTAIN", items=[
                {"text": "Synthetic task", "level": 1, "state": "UNCERTAIN"}], notes=["Checkbox state not proven."])]
            uncertainties = [{"code": "CHECKBOX_STATE_UNCERTAIN", "scope": "B0001", "message": "Item retained with uncertain state."}]
        elif scenario == "form":
            status = "PARTIAL"; blocks = [block("B0001", "FORM", structure="UNCERTAIN", fields=[
                {"label": "Synthetic label", "value": None, "relation_status": "UNCERTAIN"}], notes=["Label/value relation uncertain."])]
            uncertainties = [{"code": "FORM_RELATION_UNCERTAIN", "scope": "B0001", "message": "No value association invented."}]
        elif scenario in {"essential-image", "diagram"}:
            asset["role"] = "DIAGRAM" if scenario == "diagram" else "IMAGE"; assets = [asset]
            blocks = [block("B0001", "ASSET", content="UNAVAILABLE", structure="NOT_APPLICABLE", asset_refs=[asset["asset_id"]])]
        elif scenario == "mixed-document":
            status = "PARTIAL"; assets = [asset]
            blocks = [block("B0001", "PARAGRAPH", text="Recovered synthetic text."),
                      block("B0002", "ASSET", content="UNAVAILABLE", structure="NOT_APPLICABLE", asset_refs=[asset["asset_id"]])]
            losses = [{"code": "VISUAL_SEMANTICS_NOT_INTERPRETED", "scope": "B0002", "message": "Asset preserved; semantics not asserted."}]
        elif scenario == "scan-without-text":
            status = "PARTIAL"; asset["role"] = "PAGE_RENDER"; asset["description_status"] = "UNAVAILABLE"; asset["description"] = None; assets = [asset]
            blocks = [block("B0001", "UNTRANSFORMED", content="UNAVAILABLE", structure="UNRECOVERABLE", asset_refs=[asset["asset_id"]], notes=["No recoverable text; page retained as asset."])]
            losses = [{"code": "TEXT_UNAVAILABLE", "scope": "B0001", "message": "No textual representation produced."}]
        elif scenario == "partially-recoverable":
            status = "PARTIAL"; blocks = [block("B0001", "PARAGRAPH", content="PARTIAL", structure="UNCERTAIN", text="Recovered fragment", notes=["Continuation unavailable."])]
            losses = [{"code": "CONTENT_PARTIAL", "scope": "B0001", "message": "Only a fragment is recoverable."}]
            uncertainties = [{"code": "BOUNDARY_UNCERTAIN", "scope": "B0001", "message": "Paragraph boundary is not proven."}]
        elif scenario == "abstention":
            status = "ABSTAINED"; blocks = []
            losses = [{"code": "TRANSFORMATION_ABSTAINED", "scope": "document", "message": "No safe representation could be produced."}]
        elif scenario == "failed-derivative":
            status = "PARTIAL"; blocks = [block("B0001", "PARAGRAPH", content="PARTIAL", structure="UNCERTAIN", text="Experimental fragment", notes=["Validation failed."])]
            losses = [{"code": "VALIDATION_FAILED", "scope": "document", "message": "Experimental representation retained as evidence."}]
        elif scenario == "provenance-link":
            blocks = [block("B0001", "PARAGRAPH", text="Provenance-linked synthetic paragraph.")]
        else:
            raise AssertionError(scenario)
        if blocks:
            pages = [{"page_number": 1, "blocks": blocks}]
        return {"schema_version": "1.0.0", "representation_status": status, "source_ref": copy.deepcopy(self.source),
                "pages": pages, "assets": assets, "uncertainties": uncertainties, "known_losses": losses}

    def provenance(self, representation, validation_status="PASS"):
        data = canonical_json(representation)
        provenance = json.loads(PROVENANCE.read_text(encoding="utf-8"))
        digest = sha256_bytes(data)
        provenance["derivative"].update(
            derivative_id=derivative_id(digest), derivative_sha256=digest,
            derivative_size_bytes=len(data), derivative_format="safe-document+json")
        provenance["validation"].update(
            validation_status=validation_status,
            validation_method="synthetic-safe-representation-review",
            warnings=[] if validation_status == "PASS" else ["SYNTHETIC_VALIDATION_FAILURE"])
        return provenance, data

    def test_schema_and_all_15_required_scenarios(self):
        Draft202012Validator.check_schema(load_schema())
        self.assertEqual(len(self.catalog["scenarios"]), 15)
        for fixture in self.catalog["scenarios"]:
            value = self.representation(fixture["id"])
            validate_representation(value)
            self.assertEqual(value["representation_status"], fixture["expected_status"])

    def test_renderer_is_deterministic_and_exposes_uncertainty_assets_and_loss(self):
        for scenario in ("uncertain-table", "essential-image", "scan-without-text", "abstention"):
            value = self.representation(scenario)
            first = render_markdown(value)
            self.assertEqual(first, render_markdown(copy.deepcopy(value)))
            if value["uncertainties"]: self.assertIn("UNCERTAINTY", first)
            if value["known_losses"]: self.assertIn("KNOWN LOSS", first)
            if value["assets"]: self.assertIn("AST-", first)

    def test_complete_provenance_link_and_failed_derivative_preservation(self):
        for scenario, validation in (("provenance-link", "PASS"), ("failed-derivative", "FAIL")):
            value = self.representation(scenario); provenance, data = self.provenance(value, validation)
            validate_provenance_link(value, provenance, data)
            self.assertIsNotNone(provenance["derivative"])
            self.assertEqual(provenance["validation"]["validation_status"], validation)

    def test_rejects_unproven_structure_and_silent_asset_loss(self):
        value = self.representation("uncertain-table"); value["pages"][0]["blocks"][0]["notes"] = []
        with self.assertRaisesRegex(RepresentationError, "requires notes"): validate_representation(value)
        value = self.representation("essential-image"); value["pages"][0]["blocks"] = []
        with self.assertRaisesRegex(RepresentationError, "essential asset"): validate_representation(value)

    def test_rejects_invented_heading_table_and_unknown_asset(self):
        value = self.representation("headings"); value["pages"][0]["blocks"][0]["level"] = None
        with self.assertRaisesRegex(RepresentationError, "heading requires level"): validate_representation(value)
        value = self.representation("known-table"); value["pages"][0]["blocks"][0]["rows"] = []
        with self.assertRaisesRegex(RepresentationError, "table requires rows"): validate_representation(value)
        value = self.representation("essential-image"); value["pages"][0]["blocks"][0]["asset_refs"] = ["AST-0000000000000000"]
        with self.assertRaisesRegex(RepresentationError, "unknown asset"): validate_representation(value)

    def test_rejects_invalid_abstention_and_provenance_mismatch(self):
        value = self.representation("abstention"); value["pages"] = [{"page_number": 1, "blocks": [block("B0001", "PARAGRAPH", text="unsafe")]}]
        with self.assertRaisesRegex(RepresentationError, "abstention"): validate_representation(value)
        value = self.representation("provenance-link"); provenance, data = self.provenance(value)
        provenance["document"]["doc_id"] = "DOC-00000000"
        with self.assertRaises(RepresentationError): validate_provenance_link(value, provenance, data)


if __name__ == "__main__":
    unittest.main()
