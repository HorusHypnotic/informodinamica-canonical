#!/usr/bin/env python3
"""Produce auditable structural evidence from controlled synthetic text sources."""

from __future__ import annotations

import copy
import json
import re
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator

from scripts.document_provenance import canonical_json, document_id, sha256_bytes
from scripts.textual_safe_route import validate_input

MODEL_VERSION = "0.1.0"
SCHEMA_PATH = Path(__file__).parents[1] / "schemas" / "textual-evidence-v0.schema.json"
EXPLICIT = {"PARAGRAPH", "HEADING", "LIST", "TABLE", "CHECKLIST", "FORM", "ASSET", "UNAVAILABLE"}


class EvidenceProducerError(ValueError):
    pass


def load_schema() -> dict[str, Any]:
    return json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


def _identifier(prefix: str, value: Any) -> str:
    return prefix + "-" + sha256_bytes(canonical_json(value))[:16]


def _empty_block(block_id: str, page: int, text: str | None) -> dict[str, Any]:
    return {"block_id": block_id, "page_number": page, "kind": "PLAIN_TEXT", "text": text,
            "content_status": "RECOVERED", "structure_status": "NOT_APPLICABLE", "level": None,
            "items": [], "rows": [], "fields": [], "asset_refs": [], "evidence": [], "notes": []}


def _observe(unit: dict[str, Any], syntax: str) -> tuple[str, Any]:
    signal = unit.get("signal")
    if syntax == "PLAIN" or signal not in EXPLICIT:
        return "TEXT_SEQUENCE", unit.get("text")
    return signal, unit.get("metadata", unit.get("text"))


def _explicit_signal_is_valid(unit: dict[str, Any], syntax: str, signal: str) -> bool:
    if syntax == "STRUCTURED_METADATA":
        return signal in EXPLICIT
    if syntax != "EXPLICIT_MARKUP":
        return False
    text = unit.get("text") or ""
    metadata = unit.get("metadata", {})
    if signal == "HEADING": return bool(re.match(r"^#{1,6}\s+\S", text)) and metadata.get("level") == len(text) - len(text.lstrip("#"))
    if signal == "LIST": return bool(metadata.get("items")) and bool(re.match(r"^(?:\s*[-*+]\s+|\s*\d+[.)]\s+)\S", text))
    if signal == "CHECKLIST": return bool(re.match(r"^\s*[-*+]\s+\[[ xX]\]\s+\S", text)) and metadata.get("state") in {"CHECKED", "UNCHECKED"}
    if signal == "TABLE": return bool(metadata.get("rows")) and "|" in text
    return signal == "PARAGRAPH"


def produce(source: dict[str, Any]) -> dict[str, Any]:
    required = {"source", "syntax", "order", "units", "assets"}
    if set(source) != required or source["syntax"] not in {"PLAIN", "EXPLICIT_MARKUP", "STRUCTURED_METADATA"}:
        raise EvidenceProducerError("invalid controlled source contract")
    identity = source["source"]
    if identity["doc_id"] != document_id(identity["source_sha256"]):
        raise EvidenceProducerError("doc_id contradicts source_sha256")
    observations, evidence, blocks = [], [], []
    for index, unit in enumerate(source["units"], 1):
        signal, observed = _observe(unit, source["syntax"])
        observation = {"observation_id": "", "unit_id": unit["unit_id"], "signal_type": signal, "observed_value": observed}
        observation["observation_id"] = _identifier("OBS", observation)
        conflicts = sorted(set(unit.get("conflicts", [])))
        explicit = _explicit_signal_is_valid(unit, source["syntax"], signal)
        status = "CONFLICTING" if conflicts else ("SUFFICIENT" if explicit else ("ABSENT" if observed is None else "INSUFFICIENT"))
        rule = ("EXPLICIT_SIGNAL" if explicit else "NO_STRUCTURAL_PROMOTION") + "@" + MODEL_VERSION
        record = {"evidence_id": "", "observation_id": observation["observation_id"], "rule": rule, "status": status,
                  "supports": [signal] if explicit and not conflicts else [], "conflicts": conflicts,
                  "uncertainty_reason": "conflicting structural signals" if conflicts else (None if status == "SUFFICIENT" else "no explicit structural evidence"),
                  "abstention_reason": "no observable content" if status == "ABSENT" else None}
        record["evidence_id"] = _identifier("EVD", record)
        observations.append(observation); evidence.append(record)
        block = _empty_block(f"B{index:04d}", unit.get("page_number", 1), unit.get("text"))
        if status == "SUFFICIENT":
            block["evidence"] = [record["evidence_id"]]
            meta = unit.get("metadata", {})
            if signal == "PARAGRAPH":
                block["kind"] = "PARAGRAPH"; block["structure_status"] = "PRESERVED"
                if meta.get("content_status") == "PARTIAL":
                    block["content_status"] = "PARTIAL"; block["notes"] = [meta.get("loss", "Content explicitly partial.")]
            elif signal == "HEADING": block.update(kind="HEADING", structure_status="PRESERVED", level=meta.get("level"))
            elif signal == "LIST":
                block.update(kind="LIST", structure_status="PRESERVED", text=None,
                             items=meta.get("items", []))
            elif signal == "TABLE": block.update(kind="TABLE", structure_status="PRESERVED", text=None, rows=meta.get("rows", []))
            elif signal == "CHECKLIST":
                block.update(kind="CHECKLIST", structure_status="PRESERVED", text=None,
                             items=[{"text": unit.get("text", ""), "level": meta.get("level", 1), "state": meta.get("state", "UNCERTAIN")}])
            elif signal == "FORM": block.update(kind="FORM", structure_status="PRESERVED", text=None, fields=meta.get("fields", []))
            elif signal == "ASSET": block.update(kind="ASSET", content_status="UNAVAILABLE", structure_status="NOT_APPLICABLE", text=None,
                                                   asset_refs=meta.get("asset_refs", []), notes=["Essential visual retained by reference."])
            elif signal == "UNAVAILABLE": block.update(kind="UNTRANSFORMED", content_status="UNAVAILABLE", structure_status="UNRECOVERABLE", text=None,
                                                         asset_refs=meta.get("asset_refs", []), notes=["Content explicitly unavailable."])
        elif status == "CONFLICTING":
            block.update(kind="PARAGRAPH", structure_status="UNCERTAIN", notes=["Conflicting structural signals; no promotion."])
        elif status == "ABSENT":
            continue
        blocks.append(block)
    order = copy.deepcopy(source["order"])
    if order["status"] == "PROVEN" and not order["evidence"]:
        order = {"status": "UNCERTAIN", "evidence": []}
    safe_input = {"schema_version": "1.0.0", "source": copy.deepcopy(identity), "order": order,
                  "blocks": blocks, "assets": copy.deepcopy(source["assets"])}
    validate_input(safe_input)
    result = {"model_version": MODEL_VERSION, "source_ref": {k: identity[k] for k in ("doc_id", "source_sha256")},
              "observations": observations, "evidence": evidence, "safe_input": safe_input}
    errors = list(Draft202012Validator(load_schema()).iter_errors(result))
    if errors: raise EvidenceProducerError(errors[0].message)
    return result
