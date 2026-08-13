#!/usr/bin/env python3
"""Validate and render Safe Document Representation V1 synthetic contracts."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator

from scripts.document_provenance import ProvenanceError, document_id, validate_manifest


SCHEMA_PATH = Path(__file__).parents[1] / "schemas" / "safe-document-representation-v1.schema.json"


class RepresentationError(ValueError):
    pass


def load_schema() -> dict[str, Any]:
    return json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


def validate_representation(value: dict[str, Any]) -> None:
    errors = sorted(Draft202012Validator(load_schema()).iter_errors(value), key=lambda error: list(error.absolute_path))
    if errors:
        location = ".".join(str(item) for item in errors[0].absolute_path) or "$"
        raise RepresentationError(f"schema violation at {location}: {errors[0].message}")
    source = value["source_ref"]
    if source["doc_id"] != document_id(source["source_sha256"]):
        raise RepresentationError("doc_id contradicts source_sha256")
    blocks = [block for page in value["pages"] for block in page["blocks"]]
    block_ids = [block["block_id"] for block in blocks]
    if len(block_ids) != len(set(block_ids)):
        raise RepresentationError("duplicate block_id")
    asset_ids = [asset["asset_id"] for asset in value["assets"]]
    if len(asset_ids) != len(set(asset_ids)):
        raise RepresentationError("duplicate asset_id")
    known_assets = set(asset_ids)
    for block in blocks:
        if set(block["asset_refs"]) - known_assets:
            raise RepresentationError("block references unknown asset")
        if block["structure_status"] in {"UNCERTAIN", "UNRECOVERABLE"} and not block["notes"]:
            raise RepresentationError("uncertain or unrecoverable block requires notes")
        if block["kind"] == "HEADING" and block["level"] is None:
            raise RepresentationError("heading requires level")
        if block["kind"] != "HEADING" and block["level"] is not None:
            raise RepresentationError("only heading may declare level")
        if block["kind"] == "TABLE" and block["structure_status"] == "PRESERVED" and not block["rows"]:
            raise RepresentationError("preserved table requires rows")
        if block["kind"] in {"ASSET", "UNTRANSFORMED"} and not block["asset_refs"]:
            raise RepresentationError("asset or untransformed block requires asset reference")
    if value["representation_status"] == "ABSTAINED":
        if blocks or value["assets"] or not value["known_losses"]:
            raise RepresentationError("abstention must contain no representation and declare loss/reason")
    if value["representation_status"] == "REPRESENTED" and value["known_losses"]:
        raise RepresentationError("represented status cannot declare known losses")
    essential = {asset["asset_id"] for asset in value["assets"] if asset["essential"]}
    referenced = {ref for block in blocks for ref in block["asset_refs"]}
    if essential - referenced:
        raise RepresentationError("essential asset is not referenced")


def validate_provenance_link(value: dict[str, Any], provenance: dict[str, Any], derivative_bytes: bytes) -> None:
    validate_representation(value)
    try:
        validate_manifest(provenance, derivative_bytes=derivative_bytes)
    except ProvenanceError as exc:
        raise RepresentationError(str(exc)) from exc
    if provenance["document"]["doc_id"] != value["source_ref"]["doc_id"]:
        raise RepresentationError("provenance doc_id does not match representation")
    if provenance["source"]["source_sha256"] != value["source_ref"]["source_sha256"]:
        raise RepresentationError("provenance source hash does not match representation")
    if provenance["derivative"] and provenance["derivative"]["derivative_format"] != "safe-document+json":
        raise RepresentationError("provenance derivative format is not safe-document+json")


def render_markdown(value: dict[str, Any]) -> str:
    validate_representation(value)
    lines = [
        f"<!-- source: {value['source_ref']['doc_id']} -->",
        f"<!-- representation-status: {value['representation_status']} -->",
        "",
    ]
    if value["representation_status"] == "ABSTAINED":
        lines.extend(["> [!WARNING] Transformation abstained.", ""])
    for page in value["pages"]:
        lines.extend([f"<!-- source-page: {page['page_number']} -->", ""])
        for block in page["blocks"]:
            if block["structure_status"] in {"UNCERTAIN", "UNRECOVERABLE"}:
                lines.append(f"> [!WARNING] {block['structure_status']}: {'; '.join(block['notes'])}")
            if block["kind"] == "HEADING":
                lines.append("#" * block["level"] + " " + (block["text"] or ""))
            elif block["kind"] == "PARAGRAPH":
                lines.append(block["text"] or "[text unavailable]")
            elif block["kind"] in {"LIST", "CHECKLIST"}:
                for item in block["items"]:
                    marker = {"CHECKED": "[x]", "UNCHECKED": "[ ]", "UNCERTAIN": "[?]", "NOT_APPLICABLE": "-"}[item["state"]]
                    lines.append("  " * (item["level"] - 1) + f"- {marker} {item['text']}")
            elif block["kind"] == "TABLE" and block["structure_status"] == "PRESERVED":
                for row in block["rows"]:
                    lines.append("| " + " | ".join(row) + " |")
            elif block["kind"] == "FORM":
                for field in block["fields"]:
                    lines.append(f"- {field['label'] or '[label uncertain]'}: {field['value'] or '[value unavailable]'}")
            elif block["kind"] in {"ASSET", "UNTRANSFORMED"}:
                lines.append("[essential asset: " + ", ".join(block["asset_refs"]) + "]")
            lines.append("")
    for issue in value["uncertainties"]:
        lines.append(f"> UNCERTAINTY {issue['code']} ({issue['scope']}): {issue['message']}")
    for issue in value["known_losses"]:
        lines.append(f"> KNOWN LOSS {issue['code']} ({issue['scope']}): {issue['message']}")
    return "\n".join(lines).rstrip() + "\n"
