#!/usr/bin/env python3
"""Deterministic post-extraction Textual-Safe Route V1."""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker

from scripts.document_provenance import canonical_json, derivative_id, document_id, event_id, sha256_bytes, validate_manifest
from scripts.safe_document_representation import RepresentationError, validate_provenance_link, validate_representation

SCHEMA_PATH = Path(__file__).parents[1] / "schemas" / "textual-safe-input-v1.schema.json"
ROUTE_VERSION = "1.0.0"


class TextualSafeRouteError(ValueError):
    pass


def load_schema() -> dict[str, Any]:
    return json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


def validate_input(value: dict[str, Any]) -> None:
    errors = sorted(Draft202012Validator(load_schema(), format_checker=FormatChecker()).iter_errors(value), key=lambda e: list(e.absolute_path))
    if errors:
        location = ".".join(str(x) for x in errors[0].absolute_path) or "$"
        raise TextualSafeRouteError(f"schema violation at {location}: {errors[0].message}")
    source = value["source"]
    if source["doc_id"] != document_id(source["source_sha256"]):
        raise TextualSafeRouteError("doc_id contradicts source_sha256")
    if value["order"]["status"] == "PROVEN" and not value["order"]["evidence"]:
        raise TextualSafeRouteError("proven order requires evidence")
    ids = [b["block_id"] for b in value["blocks"]]
    if len(ids) != len(set(ids)):
        raise TextualSafeRouteError("duplicate block_id")
    assets = {a["asset_id"]: a for a in value["assets"]}
    for block in value["blocks"]:
        if block["structure_status"] == "PRESERVED" and not block["evidence"]:
            raise TextualSafeRouteError("preserved structure requires evidence")
        if block["structure_status"] in {"UNCERTAIN", "UNRECOVERABLE"} and not block["notes"]:
            raise TextualSafeRouteError("uncertain structure requires justification")
        if block["content_status"] == "PARTIAL" and not block["notes"]:
            raise TextualSafeRouteError("partial content requires known loss")
        if block["kind"] == "HEADING" and block["structure_status"] == "PRESERVED" and block["level"] is None:
            raise TextualSafeRouteError("preserved heading requires level")
        if block["kind"] == "TABLE" and block["structure_status"] == "PRESERVED" and not block["rows"]:
            raise TextualSafeRouteError("preserved table requires cells")
        if block["kind"] == "CHECKLIST" and block["structure_status"] == "PRESERVED" and any(i["state"] not in {"CHECKED", "UNCHECKED"} for i in block["items"]):
            raise TextualSafeRouteError("preserved checklist requires proven state")
        if block["kind"] == "FORM" and block["structure_status"] == "PRESERVED" and (not block["fields"] or any(f["relation_status"] != "PRESERVED" for f in block["fields"])):
            raise TextualSafeRouteError("preserved form requires proven relations")
        if block["kind"] == "LIST" and block["structure_status"] == "PRESERVED":
            levels = [i["level"] for i in block["items"]]
            if not levels or levels[0] != 1 or any(levels[i] > levels[i - 1] + 1 for i in range(1, len(levels))):
                raise TextualSafeRouteError("contradictory list nesting")
        for ref in block["asset_refs"]:
            if ref not in assets:
                raise TextualSafeRouteError("unknown asset reference")
            if assets[ref]["essential"] and not assets[ref]["available"]:
                raise TextualSafeRouteError("essential asset is unavailable")


def transform(value: dict[str, Any]) -> dict[str, Any]:
    validate_input(value)
    source_ref = {key: value["source"][key] for key in ("doc_id", "source_sha256")}
    if not value["blocks"]:
        result = {"schema_version": "1.0.0", "representation_status": "ABSTAINED", "source_ref": source_ref,
                  "pages": [], "assets": [], "uncertainties": [], "known_losses": [
                      {"code": "TRANSFORMATION_ABSTAINED", "scope": "document", "message": "No safely representable block was supplied."}]}
        validate_representation(result)
        return result
    uncertainties, losses, pages = [], [], {}
    if value["order"]["status"] == "UNCERTAIN":
        uncertainties.append({"code": "ORDER_UNCERTAIN", "scope": "document", "message": "Input block order is not proven; source sequence retained."})
    for original in value["blocks"]:
        block = copy.deepcopy(original)
        block.pop("page_number"); block.pop("evidence")
        if block["kind"] == "PLAIN_TEXT":
            block["kind"] = "PARAGRAPH"
            block["structure_status"] = "NOT_APPLICABLE"
            block["level"] = None; block["items"] = []; block["rows"] = []; block["fields"] = []
        if block["content_status"] == "PARTIAL":
            losses.append({"code": "CONTENT_PARTIAL", "scope": block["block_id"], "message": "; ".join(block["notes"])})
        if block["content_status"] == "UNAVAILABLE":
            losses.append({"code": "CONTENT_UNAVAILABLE", "scope": block["block_id"], "message": "; ".join(block["notes"]) or "Content unavailable; asset reference retained."})
        if block["structure_status"] in {"UNCERTAIN", "UNRECOVERABLE"}:
            uncertainties.append({"code": "STRUCTURE_" + block["structure_status"], "scope": block["block_id"], "message": "; ".join(block["notes"])})
        pages.setdefault(original["page_number"], []).append(block)
    referenced = {ref for block in value["blocks"] for ref in block["asset_refs"]}
    output_assets = [{k: a[k] for k in ("asset_id", "sha256", "format", "role", "essential", "description_status", "description")} for a in value["assets"] if a["available"] and a["asset_id"] in referenced]
    status = "PARTIAL" if uncertainties or losses else "REPRESENTED"
    result = {"schema_version": "1.0.0", "representation_status": status, "source_ref": source_ref,
              "pages": [{"page_number": n, "blocks": pages[n]} for n in sorted(pages)], "assets": output_assets,
              "uncertainties": uncertainties, "known_losses": losses}
    validate_representation(result)
    return result


def build_provenance(value: dict[str, Any], representation: dict[str, Any], *, started_at: str, completed_at: str,
                     validation_status: str = "PASS") -> tuple[dict[str, Any], bytes | None]:
    source = value["source"]
    processing = {"event_id": "", "doc_id": source["doc_id"], "source_sha256": source["source_sha256"],
                  "operation": "TEXTUAL_SAFE_TRANSFORMATION", "tool": "textual-safe-route", "tool_version": ROUTE_VERSION,
                  "parameters_version": "1.0.0", "parameters": {"input_schema": "textual-safe-input-v1", "output_schema": "safe-document-representation-v1"},
                  "started_at": started_at, "completed_at": completed_at, "status": "COMPLETED", "abstention_reason": None}
    processing["event_id"] = event_id(processing)
    derivative = None
    data = None
    validation = {"validation_status": validation_status, "validation_method": "textual-safe-route-contract-validation",
                  "warnings": [] if validation_status == "PASS" else ["SAFE_REPRESENTATION_REQUIRES_REVIEW"], "validated_at": completed_at}
    if representation["representation_status"] == "ABSTAINED":
        processing["status"] = "ABSTAINED"
        processing["abstention_reason"] = {"code": "INSUFFICIENT_SAFE_INPUT", "message": "No derivative was produced.", "details": {}}
        derivative = None
        validation = {"validation_status": "NOT_VALIDATED", "validation_method": None, "warnings": [], "validated_at": None}
    else:
        data = canonical_json(representation); digest = sha256_bytes(data)
        derivative = {"derivative_id": derivative_id(digest), "derivative_sha256": digest, "derivative_size_bytes": len(data),
                      "derivative_format": "safe-document+json", "source_doc_id": source["doc_id"], "source_sha256": source["source_sha256"],
                      "processing_event_id": processing["event_id"]}
        if validation_status == "FAIL": processing["status"] = "FAILED"
    manifest = {"schema_version": "1.0.0", "document": {"doc_id": source["doc_id"]},
                "source": {k: source[k] for k in ("source_sha256", "source_size_bytes", "source_format", "discovered_at", "inventory_id", "inventory_version")},
                "processing": processing, "derivative": derivative, "validation": validation}
    validate_manifest(manifest, derivative_bytes=data)
    if data is not None:
        validate_provenance_link(representation, manifest, data)
    return manifest, data
