#!/usr/bin/env python3
"""Build, verify and query a rebuildable local index of provenance V1 manifests."""

from __future__ import annotations

import argparse
import json
import os
import sqlite3
from contextlib import closing
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

from scripts.document_provenance import ProvenanceError, canonical_json, sha256_bytes, validate_manifest


INDEX_VERSION = "1.0.0"
STATUS_ORDER = {"PASS": 0, "WARN": 1, "BLOCKED": 2}


@dataclass(frozen=True)
class Finding:
    severity: str
    code: str
    manifest_ref: str
    entity_id: str | None
    message: str


@dataclass
class Projection:
    manifests: list[tuple]
    sources: dict[str, tuple]
    events: dict[str, tuple]
    derivatives: dict[str, tuple]
    warnings: set[tuple]
    findings: list[Finding]

    @property
    def status(self) -> str:
        return max((item.severity for item in self.findings), key=STATUS_ORDER.get, default="PASS")

    def logical_digest(self) -> str:
        value = {
            "sources": sorted(self.sources.values()),
            "events": sorted(self.events.values()),
            "derivatives": sorted(self.derivatives.values()),
            "warnings": sorted(self.warnings),
            "findings": sorted((f.severity, f.code, f.entity_id, f.message) for f in self.findings),
        }
        return sha256_bytes(canonical_json(value))


def discover_manifests(root: Path, pattern: str = "*.json") -> list[Path]:
    return sorted((path for path in root.rglob(pattern) if path.is_file()), key=lambda path: path.as_posix())


def _finding_code(error: str) -> str:
    mappings = (
        ("schema violation", "INVALID_SCHEMA"),
        ("source", "SOURCE_INVALID"),
        ("processing event", "EVENT_INVALID"),
        ("event_id", "EVENT_ID_CONFLICT"),
        ("derivative", "DERIVATIVE_INVALID"),
        ("doc_id", "IDENTITY_CONFLICT"),
    )
    return next((code for text, code in mappings if text in error), "MANIFEST_INVALID")


def _warn_conditions(manifest: dict[str, Any], ref: str) -> list[Finding]:
    findings = []
    processing = manifest["processing"]
    validation = manifest["validation"]
    if processing["status"] == "ABSTAINED":
        findings.append(Finding("WARN", "ABSTAINED", ref, processing["event_id"], processing["abstention_reason"]["code"]))
    elif processing["status"] == "FAILED":
        findings.append(Finding("WARN", "PROCESSING_FAILED", ref, processing["event_id"], "processing event failed"))
    if validation["validation_status"] == "NOT_VALIDATED":
        findings.append(Finding("WARN", "NOT_VALIDATED", ref, processing["event_id"], "derivative not validated"))
    elif validation["validation_status"] == "PASS_WITH_WARNINGS":
        findings.append(Finding("WARN", "PASS_WITH_WARNINGS", ref, processing["event_id"], "validation passed with warnings"))
    elif validation["validation_status"] == "FAIL":
        findings.append(Finding("WARN", "VALIDATION_FAILED", ref, processing["event_id"], "derivative failed validation"))
    return findings


def project_manifests(root: Path, pattern: str = "*.json") -> Projection:
    projection = Projection([], {}, {}, {}, set(), [])
    paths = discover_manifests(root, pattern)
    if not paths:
        projection.findings.append(Finding("BLOCKED", "NO_MANIFESTS", ".", None, "no manifests discovered"))
        return projection

    for path in paths:
        ref = path.relative_to(root).as_posix()
        raw = b""
        try:
            raw = path.read_bytes()
            manifest = json.loads(raw.decode("utf-8"))
            validate_manifest(manifest)
        except (OSError, UnicodeDecodeError, json.JSONDecodeError, ProvenanceError) as exc:
            message = str(exc)
            projection.manifests.append((ref, sha256_bytes(raw) if raw else None, "BLOCKED", message))
            projection.findings.append(Finding("BLOCKED", _finding_code(message), ref, None, message))
            continue

        document = manifest["document"]
        source = manifest["source"]
        processing = manifest["processing"]
        derivative = manifest["derivative"]
        validation = manifest["validation"]
        manifest_status = "WARN" if _warn_conditions(manifest, ref) else "PASS"
        projection.manifests.append((ref, sha256_bytes(raw), manifest_status, None))
        projection.findings.extend(_warn_conditions(manifest, ref))

        source_row = (
            source["source_sha256"], document["doc_id"], source["source_size_bytes"], source["source_format"],
            source["discovered_at"], source["inventory_id"], source["inventory_version"],
        )
        existing_source = projection.sources.get(source["source_sha256"])
        if existing_source and existing_source != source_row:
            projection.findings.append(Finding("BLOCKED", "SOURCE_IDENTITY_CONFLICT", ref, document["doc_id"], "same source hash has contradictory metadata"))
        projection.sources[source["source_sha256"]] = existing_source or source_row

        event_row = (
            processing["event_id"], processing["source_sha256"], processing["doc_id"], processing["operation"],
            processing["tool"], processing["tool_version"], processing["parameters_version"],
            canonical_json(processing["parameters"]).decode("utf-8"), processing["started_at"],
            processing["completed_at"], processing["status"],
            processing["abstention_reason"]["code"] if processing["abstention_reason"] else None,
        )
        existing_event = projection.events.get(processing["event_id"])
        if existing_event and existing_event != event_row:
            projection.findings.append(Finding("BLOCKED", "EVENT_IDENTITY_CONFLICT", ref, processing["event_id"], "same event_id has contradictory data"))
        projection.events[processing["event_id"]] = existing_event or event_row

        for warning in validation["warnings"]:
            projection.warnings.add((processing["event_id"], derivative["derivative_id"] if derivative else None, warning))
        if derivative:
            derivative_row = (
                derivative["derivative_id"], derivative["derivative_sha256"], derivative["derivative_size_bytes"],
                derivative["derivative_format"], derivative["source_sha256"], derivative["source_doc_id"],
                derivative["processing_event_id"], validation["validation_status"],
                validation["validation_method"], validation["validated_at"],
            )
            existing_derivative = projection.derivatives.get(derivative["derivative_id"])
            if existing_derivative and existing_derivative != derivative_row:
                projection.findings.append(Finding("BLOCKED", "DERIVATIVE_IDENTITY_CONFLICT", ref, derivative["derivative_id"], "same derivative_id has contradictory data"))
            projection.derivatives[derivative["derivative_id"]] = existing_derivative or derivative_row

    by_doc: dict[str, set[str]] = {}
    for source_hash, doc_id, *_ in projection.sources.values():
        by_doc.setdefault(doc_id, set()).add(source_hash)
    for doc_id, hashes in by_doc.items():
        if len(hashes) > 1:
            projection.findings.append(Finding("BLOCKED", "DOC_ID_COLLISION", ".", doc_id, "doc_id maps to multiple source hashes"))
    for event_id_value, source_hash, *_ in projection.events.values():
        if source_hash not in projection.sources:
            projection.findings.append(Finding("BLOCKED", "ORPHAN_EVENT", ".", event_id_value, "event source is absent"))
    for derivative_id_value, _, _, _, source_hash, _, event_id_value, *_ in projection.derivatives.values():
        if source_hash not in projection.sources or event_id_value not in projection.events:
            projection.findings.append(Finding("BLOCKED", "ORPHAN_DERIVATIVE", ".", derivative_id_value, "derivative source or event is absent"))
    return projection


DDL = """
PRAGMA foreign_keys=ON;
CREATE TABLE meta(key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE manifests(manifest_ref TEXT PRIMARY KEY,manifest_sha256 TEXT,status TEXT NOT NULL,error TEXT);
CREATE TABLE sources(source_sha256 TEXT PRIMARY KEY,doc_id TEXT NOT NULL,source_size_bytes INTEGER NOT NULL,source_format TEXT NOT NULL,discovered_at TEXT NOT NULL,inventory_id TEXT NOT NULL,inventory_version TEXT NOT NULL);
CREATE INDEX sources_doc_id ON sources(doc_id);
CREATE TABLE events(event_id TEXT PRIMARY KEY,source_sha256 TEXT NOT NULL,doc_id TEXT NOT NULL,operation TEXT NOT NULL,tool TEXT NOT NULL,tool_version TEXT NOT NULL,parameters_version TEXT NOT NULL,parameters_json TEXT NOT NULL,started_at TEXT NOT NULL,completed_at TEXT NOT NULL,status TEXT NOT NULL,abstention_code TEXT,FOREIGN KEY(source_sha256) REFERENCES sources(source_sha256));
CREATE INDEX events_source ON events(source_sha256);
CREATE TABLE derivatives(derivative_id TEXT PRIMARY KEY,derivative_sha256 TEXT NOT NULL UNIQUE,derivative_size_bytes INTEGER NOT NULL,derivative_format TEXT NOT NULL,source_sha256 TEXT NOT NULL,source_doc_id TEXT NOT NULL,processing_event_id TEXT NOT NULL,validation_status TEXT NOT NULL,validation_method TEXT,validated_at TEXT,FOREIGN KEY(source_sha256) REFERENCES sources(source_sha256),FOREIGN KEY(processing_event_id) REFERENCES events(event_id));
CREATE INDEX derivatives_source ON derivatives(source_sha256);
CREATE TABLE warnings(processing_event_id TEXT NOT NULL,derivative_id TEXT,warning TEXT NOT NULL,PRIMARY KEY(processing_event_id,derivative_id,warning));
CREATE TABLE findings(id INTEGER PRIMARY KEY,severity TEXT NOT NULL,code TEXT NOT NULL,manifest_ref TEXT NOT NULL,entity_id TEXT,message TEXT NOT NULL);
"""


def _populate(connection: sqlite3.Connection, projection: Projection) -> None:
    connection.executescript(DDL)
    connection.executemany("INSERT INTO manifests VALUES(?,?,?,?)", projection.manifests)
    connection.executemany("INSERT INTO sources VALUES(?,?,?,?,?,?,?)", sorted(projection.sources.values()))
    connection.executemany("INSERT INTO events VALUES(?,?,?,?,?,?,?,?,?,?,?,?)", sorted(projection.events.values()))
    connection.executemany("INSERT INTO derivatives VALUES(?,?,?,?,?,?,?,?,?,?)", sorted(projection.derivatives.values()))
    connection.executemany("INSERT INTO warnings VALUES(?,?,?)", sorted(projection.warnings, key=lambda row: tuple(value or "" for value in row)))
    connection.executemany(
        "INSERT INTO findings(severity,code,manifest_ref,entity_id,message) VALUES(?,?,?,?,?)",
        [(f.severity, f.code, f.manifest_ref, f.entity_id, f.message) for f in sorted(projection.findings, key=lambda f: (STATUS_ORDER[f.severity], f.code, f.manifest_ref, f.entity_id or "", f.message))],
    )
    connection.executemany("INSERT INTO meta VALUES(?,?)", [
        ("index_version", INDEX_VERSION), ("logical_digest", projection.logical_digest()), ("status", projection.status)
    ])


def build_index(manifests: Path, output: Path, pattern: str = "*.json") -> Projection:
    projection = project_manifests(manifests, pattern)
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_name(output.name + ".tmp")
    if temporary.exists():
        temporary.unlink()
    try:
        with closing(sqlite3.connect(temporary)) as connection:
            with connection:
                _populate(connection, projection)
        os.replace(temporary, output)
    finally:
        if temporary.exists():
            temporary.unlink()
    return projection


def index_snapshot(connection: sqlite3.Connection) -> dict[str, list[tuple]]:
    tables = {
        "sources": "SELECT * FROM sources ORDER BY source_sha256",
        "events": "SELECT * FROM events ORDER BY event_id",
        "derivatives": "SELECT * FROM derivatives ORDER BY derivative_id",
        "warnings": "SELECT * FROM warnings ORDER BY processing_event_id,derivative_id,warning",
        "findings": "SELECT severity,code,entity_id,message FROM findings ORDER BY severity,code,entity_id,message",
    }
    return {name: connection.execute(query).fetchall() for name, query in tables.items()}


def verify_index(index: Path, manifests: Path | None = None, pattern: str = "*.json") -> dict[str, Any]:
    with closing(sqlite3.connect(index)) as connection:
        integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
        foreign_keys = connection.execute("PRAGMA foreign_key_check").fetchall()
        meta = dict(connection.execute("SELECT key,value FROM meta"))
        counts = {table: connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0] for table in ("manifests", "sources", "events", "derivatives", "findings")}
        status = "BLOCKED" if integrity != "ok" or foreign_keys else meta["status"]
        result = {"status": status, "integrity": integrity, "foreign_key_errors": len(foreign_keys), "logical_digest": meta["logical_digest"], **counts}
    if manifests is not None:
        projection = project_manifests(manifests, pattern)
        result["manifest_digest"] = projection.logical_digest()
        result["projection_matches"] = result["logical_digest"] == result["manifest_digest"]
        if not result["projection_matches"] or projection.status == "BLOCKED":
            result["status"] = "BLOCKED"
        elif projection.status == "WARN" and result["status"] == "PASS":
            result["status"] = "WARN"
    return result


QUERY_SQL = {
    "doc": "SELECT * FROM sources WHERE doc_id=? ORDER BY source_sha256",
    "source": "SELECT * FROM sources WHERE source_sha256=?",
    "events": "SELECT * FROM events WHERE source_sha256=? ORDER BY event_id",
    "derivatives": "SELECT * FROM derivatives WHERE source_sha256=? ORDER BY derivative_id",
    "derivative": "SELECT * FROM derivatives WHERE derivative_id=?",
    "validation": "SELECT derivative_id,validation_status,validation_method,validated_at FROM derivatives WHERE derivative_id=?",
    "abstained": "SELECT * FROM events WHERE status='ABSTAINED' ORDER BY event_id",
    "findings": "SELECT severity,code,manifest_ref,entity_id,message FROM findings ORDER BY severity,code,manifest_ref,entity_id",
}


def query_index(index: Path, query: str, value: str | None = None) -> list[dict[str, Any]]:
    if query not in QUERY_SQL:
        raise ValueError(f"unknown query: {query}")
    if query not in {"abstained", "findings"} and value is None:
        raise ValueError(f"query {query} requires a value")
    with closing(sqlite3.connect(index)) as connection:
        connection.row_factory = sqlite3.Row
        rows = connection.execute(QUERY_SQL[query], () if query in {"abstained", "findings"} else (value,)).fetchall()
    return [dict(row) for row in rows]


def _print(value: Any) -> None:
    print(json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    build = subparsers.add_parser("build")
    build.add_argument("--manifests", type=Path, required=True); build.add_argument("--output", type=Path, required=True); build.add_argument("--pattern", default="*.json")
    verify = subparsers.add_parser("verify")
    verify.add_argument("--index", type=Path, required=True); verify.add_argument("--manifests", type=Path); verify.add_argument("--pattern", default="*.json")
    query = subparsers.add_parser("query")
    query.add_argument("--index", type=Path, required=True); query.add_argument("--type", choices=sorted(QUERY_SQL), required=True); query.add_argument("--value")
    args = parser.parse_args()
    if args.command == "build":
        projection = build_index(args.manifests, args.output, args.pattern)
        _print({"status": projection.status, "logical_digest": projection.logical_digest(), "manifests": len(projection.manifests), "sources": len(projection.sources), "events": len(projection.events), "derivatives": len(projection.derivatives), "findings": len(projection.findings)})
        return 2 if projection.status == "BLOCKED" else 0
    if args.command == "verify":
        result = verify_index(args.index, args.manifests, args.pattern); _print(result)
        return 2 if result["status"] == "BLOCKED" else 0
    _print(query_index(args.index, args.type, args.value))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
