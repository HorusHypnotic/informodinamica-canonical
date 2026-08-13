#!/usr/bin/env python3
"""Build and validate deterministic Document Provenance Contract V1 manifests."""

from __future__ import annotations

import argparse
import hashlib
import json
from datetime import datetime
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker


SCHEMA_VERSION = "1.0.0"
SCHEMA_PATH = Path(__file__).parents[1] / "schemas" / "document-provenance-v1.schema.json"


class ProvenanceError(ValueError):
    """Manifest is structurally or genealogically invalid."""


def canonical_json(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def document_id(source_sha256: str) -> str:
    return f"DOC-{source_sha256[:8]}"


def derivative_id(derivative_sha256: str) -> str:
    return f"DER-{derivative_sha256[:16]}"


def event_id(processing: dict[str, Any]) -> str:
    identity = {key: processing[key] for key in (
        "doc_id", "source_sha256", "operation", "tool", "tool_version",
        "parameters_version", "parameters", "started_at",
    )}
    return f"EVT-{sha256_bytes(canonical_json(identity))[:16]}"


def load_schema() -> dict[str, Any]:
    return json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


def _parse_timestamp(value: str, field: str) -> datetime:
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ProvenanceError(f"invalid {field}") from exc


def validate_manifest(
    manifest: dict[str, Any], source_bytes: bytes | None = None, derivative_bytes: bytes | None = None
) -> None:
    errors = sorted(
        Draft202012Validator(load_schema(), format_checker=FormatChecker()).iter_errors(manifest),
        key=lambda error: list(error.absolute_path),
    )
    if errors:
        location = ".".join(str(part) for part in errors[0].absolute_path) or "$"
        raise ProvenanceError(f"schema violation at {location}: {errors[0].message}")

    source = manifest["source"]
    document = manifest["document"]
    processing = manifest["processing"]
    derivative = manifest["derivative"]
    validation = manifest["validation"]

    if document["doc_id"] != document_id(source["source_sha256"]):
        raise ProvenanceError("doc_id contradicts source_sha256")
    if processing["doc_id"] != document["doc_id"] or processing["source_sha256"] != source["source_sha256"]:
        raise ProvenanceError("processing event does not reference its source")
    if processing["event_id"] != event_id(processing):
        raise ProvenanceError("event_id is not deterministic for the processing identity")
    if _parse_timestamp(processing["completed_at"], "completed_at") < _parse_timestamp(processing["started_at"], "started_at"):
        raise ProvenanceError("completed_at precedes started_at")

    if source_bytes is not None:
        if sha256_bytes(source_bytes) != source["source_sha256"] or len(source_bytes) != source["source_size_bytes"]:
            raise ProvenanceError("source bytes contradict source identity")

    if derivative is not None:
        if derivative["source_doc_id"] != document["doc_id"] or derivative["source_sha256"] != source["source_sha256"]:
            raise ProvenanceError("derivative does not reference its source")
        if derivative["processing_event_id"] != processing["event_id"]:
            raise ProvenanceError("derivative references a nonexistent processing event")
        if derivative["derivative_id"] != derivative_id(derivative["derivative_sha256"]):
            raise ProvenanceError("derivative_id contradicts derivative_sha256")
        if derivative_bytes is not None:
            if sha256_bytes(derivative_bytes) != derivative["derivative_sha256"] or len(derivative_bytes) != derivative["derivative_size_bytes"]:
                raise ProvenanceError("derivative bytes contradict derivative identity")
    elif derivative_bytes is not None:
        raise ProvenanceError("derivative bytes supplied without derivative record")

    if validation["validation_status"] == "PASS_WITH_WARNINGS" and not validation["warnings"]:
        raise ProvenanceError("PASS_WITH_WARNINGS requires warnings")
    if validation["validation_status"] == "PASS" and validation["warnings"]:
        raise ProvenanceError("PASS cannot contain warnings")


def reconstruct_lineage(manifest: dict[str, Any]) -> dict[str, Any]:
    validate_manifest(manifest)
    if manifest["derivative"] is None:
        raise ProvenanceError("manifest has no derivative to reconstruct")
    return {
        "doc_id": manifest["document"]["doc_id"],
        "source_sha256": manifest["source"]["source_sha256"],
        "operation": manifest["processing"]["operation"],
        "tool": manifest["processing"]["tool"],
        "tool_version": manifest["processing"]["tool_version"],
        "validation_status": manifest["validation"]["validation_status"],
        "processing_event_id": manifest["derivative"]["processing_event_id"],
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--source", type=Path)
    parser.add_argument("--derivative", type=Path)
    args = parser.parse_args()
    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    validate_manifest(
        manifest,
        args.source.read_bytes() if args.source else None,
        args.derivative.read_bytes() if args.derivative else None,
    )
    result = reconstruct_lineage(manifest) if manifest["derivative"] else {
        "doc_id": manifest["document"]["doc_id"], "status": manifest["processing"]["status"]
    }
    print(json.dumps(result, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
