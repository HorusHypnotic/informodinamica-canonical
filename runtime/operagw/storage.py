"""Armazenamento experimental do OPERA Gateway (Gate 2).

Princípios do contrato v0.1 implementados aqui:
- RAW FIRST: raw é inserido antes de qualquer interpretação e é imutável
  (INSERT-only; UPDATE de raw rejeitado por trigger/verificação)
- Idempotência documental: source_message_id UNIQUE global; duplicata gera
  rejeição registrada (record_type=rejeicao), nunca erro silencioso
- Banco exclusivamente experimental/replicado (SQLite local)
- Journal de auditoria: toda transição de estado de pacote fica registrada
"""
from __future__ import annotations

import datetime as _dt
import hashlib
import json
import sqlite3
import threading
import uuid
from pathlib import Path

DB_VERSION = "gate2/0.1"

SCHEMA = """
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS tenants (
    tenant TEXT PRIMARY KEY,
    display_name TEXT,
    is_test_tenant INTEGER NOT NULL DEFAULT 1,  -- Gate 2: apenas tenants de teste
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS entity_aliases (
    alias_key TEXT PRIMARY KEY,  -- normalize(display) || ':' || kind || ':' || tenant
    display TEXT NOT NULL,
    kind TEXT NOT NULL,          -- obra|pessoa|material|ativo|fornecedor|empresa|local|tarefa
    tenant TEXT NOT NULL,
    resolved_id TEXT NOT NULL,   -- resolved: ex. obra:dirceu-engenharia:galpao-quadruplo-domingos
    source TEXT NOT NULL,        -- canonical_manifest|learned
    verified_by TEXT,            -- NULL => PROVISIONAL (learned sem verificação humana)
    verified_at TEXT,
    usage_count INTEGER NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_aliases_resolved ON entity_aliases(resolved_id, kind);

CREATE TABLE IF NOT EXISTS raw_messages (
    source_message_id TEXT PRIMARY KEY,  -- transport:channel_account_id:channel_message_id
    tenant TEXT,
    transport TEXT NOT NULL,
    channel_account_id TEXT NOT NULL,
    channel_message_id TEXT NOT NULL,
    actor TEXT,
    raw_content TEXT NOT NULL,           -- relato humano integral; NUNCA alterado
    raw_sha256 TEXT NOT NULL,
    received_at TEXT NOT NULL,
    edited INTEGER NOT NULL DEFAULT 0,
    deleted INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS packages (
    package_id TEXT PRIMARY KEY,         -- uuid-v4 imutável
    contract TEXT NOT NULL DEFAULT 'opera-gateway-event-contract/0.1',
    record_type TEXT NOT NULL,           -- evento|correcao|rejeicao|heartbeat
    tenant TEXT,
    canonical_obra_id TEXT,
    identity_status TEXT,                -- verified|provisional|unverified|conflicted
    sender_binding TEXT,                 -- bound|unbound
    source_message_id TEXT,
    envelope_json TEXT NOT NULL,         -- envelope completo v0.1 (estado atual)
    status TEXT NOT NULL DEFAULT 'received',  -- received|interpreted|needs_confirmation|confirmed|corrected|cancelled|expired|rejected
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS package_journal (
    seq INTEGER PRIMARY KEY AUTOINCREMENT,
    package_id TEXT NOT NULL REFERENCES packages(package_id),
    ts TEXT NOT NULL,
    event TEXT NOT NULL,                 -- received|raw_stored|interpreted|schema_validated|schema_rejected|
                                         -- resolved|assessed|confirm_requested|confirm_responded|
                                         -- confirmed|corrected|cancelled|expired|rejection_recorded|
                                         -- routed_simulated|inspected|retried
    detail TEXT,                         -- JSON com evidência (hashes, tempos, decisões)
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_journal_pkg ON package_journal(package_id);

CREATE TABLE IF NOT EXISTS confirmation_questions (
    question_id TEXT PRIMARY KEY,
    package_id TEXT NOT NULL REFERENCES packages(package_id),
    asked_at TEXT NOT NULL,
    expires_at TEXT,
    question_kind TEXT NOT NULL,         -- SIMPLE|MANDATORY|BLOCKED_ASK
    question_text TEXT NOT NULL,
    answer_actor TEXT,
    answer_at TEXT,
    answer TEXT                          -- 'confirm'|'correct'|'cancel'|texto livre (BLOCKED_ASK)
);
"""


def _utcnow() -> str:
    return _dt.datetime.now(_dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")


def _sha256_hex(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


class Store:
    """Banco experimental de tenant único. Conexão serializada (thread-local)."""

    def __init__(self, db_path: str):
        self.db_path = db_path
        self._local = threading.local()
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        self._conn().executescript(SCHEMA)

    def _conn(self) -> sqlite3.Connection:
        c = getattr(self._local, "conn", None)
        if c is None:
            c = sqlite3.connect(self.db_path)
            c.execute("PRAGMA journal_mode=WAL")
            c.execute("PRAGMA foreign_keys=ON")
            c.row_factory = sqlite3.Row
            self._local.conn = c
        return c

    # ---------------------------------------------------------------- tenant
    def ensure_tenant(self, tenant: str, display_name: str = "") -> None:
        self._conn().execute(
            "INSERT INTO tenants (tenant, display_name, is_test_tenant, created_at) "
            "VALUES (?, ?, 1, ?) ON CONFLICT(tenant) DO NOTHING",
            (tenant, display_name or tenant, _utcnow()),
        )
        self._conn().commit()

    def tenant_exists(self, tenant: str) -> bool:
        row = self._conn().execute(
            "SELECT 1 FROM tenants WHERE tenant = ?", (tenant,)
        ).fetchone()
        return row is not None

    # ------------------------------------------------------------- raw first
    def store_raw(self, tenant: str, transport: str, channel_account_id: str,
                  channel_message_id: str, actor: str, raw_content: str,
                  received_at: str) -> tuple[str, str]:
        """Insere RAW; retorna (source_message_id, raw_sha256). Idempotente no
        par id: re-inserção com mesmo conteúdo retorna o mesmo registro."""
        source_message_id = f"{transport}:{channel_account_id}:{channel_message_id}"
        raw_sha = _sha256_hex(raw_content)
        cur = self._conn()
        existing = cur.execute(
            "SELECT raw_sha256 FROM raw_messages WHERE source_message_id = ?",
            (source_message_id,),
        ).fetchone()
        if existing is not None:
            if existing["raw_sha256"] != raw_sha:
                raise RuntimeError(
                    "DUPLICATE_ID_CONTENT_MISMATCH: mesmo source_message_id com "
                    "raw diferente — rejeição de integridade"
                )
            return source_message_id, raw_sha
        cur.execute(
            "INSERT INTO raw_messages "
            "(source_message_id, tenant, transport, channel_account_id, channel_message_id, "
            " actor, raw_content, raw_sha256, received_at, edited, deleted) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)",
            (source_message_id, tenant, transport, channel_account_id,
             channel_message_id, actor, raw_content, raw_sha, received_at),
        )
        self._conn().commit()
        return source_message_id, raw_sha

    def get_raw(self, source_message_id: str) -> dict | None:
        row = self._conn().execute(
            "SELECT * FROM raw_messages WHERE source_message_id = ?",
            (source_message_id,),
        ).fetchone()
        return dict(row) if row else None

    def raw_immutable_check(self, package_id: str, expected_sha: str) -> bool:
        """Verifica que o raw referenciado pelo pacote permanece íntegro."""
        row = self._conn().execute(
            "SELECT r.raw_sha256 FROM packages p "
            "JOIN raw_messages r ON r.source_message_id = p.source_message_id "
            "WHERE p.package_id = ?", (package_id,)
        ).fetchone()
        return row is not None and row["raw_sha256"] == expected_sha

    # ------------------------------------------------------------ packages
    def new_package(self, package_id: str, record_type: str, tenant: str,
                    source_message_id: str | None, envelope: dict) -> None:
        now = _utcnow()
        obra_id = envelope.get("canonical_obra_id")
        self._conn().execute(
            "INSERT INTO packages "
            "(package_id, contract, record_type, tenant, canonical_obra_id, "
            " identity_status, sender_binding, source_message_id, envelope_json, "
            " status, created_at, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'received', ?, ?)",
            (package_id, envelope.get("contract", "opera-gateway-event-contract/0.1"),
             record_type, tenant,
             obra_id if obra_id not in (None, "unresolved") else None,
             envelope.get("identity_status"), envelope.get("sender_binding"),
             source_message_id, json.dumps(envelope, ensure_ascii=False),
             now, now),
        )
        self.journal(package_id, "received", {
            "tenant": tenant, "record_type": record_type,
            "source_message_id": source_message_id,
        })
        self._conn().commit()

    def update_package(self, package_id: str, envelope: dict,
                       status: str | None = None) -> None:
        row = self._conn().execute(
            "SELECT status FROM packages WHERE package_id = ?", (package_id,)
        ).fetchone()
        if row is None:
            raise KeyError(package_id)
        prev = row["status"]
        now = _utcnow()
        cur = self._conn().execute(
            "UPDATE packages SET envelope_json = ?, updated_at = ?"
            + (", status = ?" if status else "") + " WHERE package_id = ?",
            [json.dumps(envelope, ensure_ascii=False), now]
            + ([status] if status else []) + [package_id],
        )
        assert cur.rowcount == 1
        self.journal(package_id, "updated", {"from": prev, "to": status or prev})
        self._conn().commit()

    def get_package(self, package_id: str) -> dict | None:
        row = self._conn().execute(
            "SELECT * FROM packages WHERE package_id = ?", (package_id,)
        ).fetchone()
        if row is None:
            return None
        return {**dict(row), "envelope": json.loads(row["envelope_json"])}

    def source_message_used(self, source_message_id: str) -> bool:
        row = self._conn().execute(
            "SELECT 1 FROM packages WHERE source_message_id = ?",
            (source_message_id,),
        ).fetchone()
        return row is not None

    def rejection(self, tenant: str, source_message_id: str | None,
                  reason: str, raw_content: str | None) -> str:
        """Duplicata/violação: pacote record_type=rejeicao que preserva o raw."""
        pid = f"pkg-rej-{uuid.uuid4().hex[:12]}"
        envelope = {
            "contract": "opera-gateway-event-contract/0.1",
            "package_id": pid,
            "record_type": "rejeicao",
            "tenant": tenant or "unresolved",
            "rejection_reason": reason,
            "raw": {"content": raw_content, "derived_from_audio": False}
            if raw_content is not None else None,
            "lineage": {"transformation": "rejected"},
            "created_at": _utcnow(),
            "updated_at": _utcnow(),
        }
        self.new_package(pid, "rejeicao", tenant or "unresolved",
                         source_message_id, envelope)
        self.journal(pid, "rejection_recorded", {"reason": reason})
        return pid

    # ------------------------------------------------------------- journal
    def journal(self, package_id: str, event: str, detail: dict | None) -> int:
        cur = self._conn().execute(
            "INSERT INTO package_journal (package_id, ts, event, detail, created_at) "
            "VALUES (?, ?, ?, ?, ?)",
            (package_id, _utcnow(), event,
             json.dumps(detail, ensure_ascii=False) if detail else None, _utcnow()),
        )
        self._conn().commit()
        return cur.lastrowid

    def lineage(self, package_id: str) -> list[dict]:
        return [dict(r) for r in self._conn().execute(
            "SELECT seq, ts, event, detail FROM package_journal "
            "WHERE package_id = ? ORDER BY seq", (package_id,)
        )]

    def all_lineage(self) -> list[dict]:
        return [dict(r) for r in self._conn().execute(
            "SELECT seq, package_id, ts, event, detail FROM package_journal "
            "ORDER BY seq")]

    # -------------------------------------------------------------- aliases
    def put_alias(self, display: str, kind: str, tenant: str, resolved_id: str,
                  source: str, verified_by: str | None = None) -> str:
        key = f"{_normalize(display)}:{kind}:{tenant}"
        self._conn().execute(
            "INSERT INTO entity_aliases (alias_key, display, kind, tenant, "
            "resolved_id, source, verified_by, verified_at, usage_count) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0) "
            "ON CONFLICT(alias_key) DO UPDATE SET resolved_id = excluded.resolved_id, "
            "source = excluded.source, verified_by = excluded.verified_by, "
            "verified_at = excluded.verified_at",
            (key, display, kind, tenant, resolved_id, source, verified_by,
             _utcnow() if verified_by else None),
        )
        self._conn().commit()
        return key

    def get_aliases(self, kind: str | None = None, tenant: str | None = None
                    ) -> list[dict]:
        where, args = [], []
        if kind:
            where.append("kind = ?"); args.append(kind)
        if tenant:
            where.append("tenant = ?"); args.append(tenant)
        q = "SELECT * FROM entity_aliases" + (
            " WHERE " + " AND ".join(where) if where else "")
        return [dict(r) for r in self._conn().execute(q, args)]

    def bump_usage(self, alias_key: str) -> None:
        self._conn().execute(
            "UPDATE entity_aliases SET usage_count = usage_count + 1 "
            "WHERE alias_key = ?", (alias_key,))
        self._conn().commit()

    # ----------------------------------------------------------- questions
    def ask(self, question_id: str, package_id: str, kind: str,
            question_text: str, expires_at: str | None) -> None:
        self._conn().execute(
            "INSERT INTO confirmation_questions "
            "(question_id, package_id, asked_at, expires_at, question_kind, question_text) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (question_id, package_id, _utcnow(), expires_at, kind, question_text),
        )
        self._conn().commit()

    def answer_question(self, question_id: str, answer_actor: str,
                        answer: str) -> dict | None:
        row = self._conn().execute(
            "SELECT * FROM confirmation_questions WHERE question_id = ?",
            (question_id,),
        ).fetchone()
        if row is None or row["answer"] is not None:
            return None
        self._conn().execute(
            "UPDATE confirmation_questions SET answer_actor = ?, answer_at = ?, "
            "answer = ? WHERE question_id = ?",
            (answer_actor, _utcnow(), answer, question_id),
        )
        self._conn().commit()
        return dict(row)

    def get_question(self, question_id: str) -> dict | None:
        row = self._conn().execute(
            "SELECT * FROM confirmation_questions WHERE question_id = ?",
            (question_id,),
        ).fetchone()
        return dict(row) if row else None

    def open_questions(self) -> list[dict]:
        return [dict(r) for r in self._conn().execute(
            "SELECT * FROM confirmation_questions WHERE answer IS NULL "
            "ORDER BY asked_at")]


def _normalize(text: str) -> str:
    import unicodedata
    text = unicodedata.normalize("NFKD", text.lower())
    return "".join(ch for ch in text if not unicodedata.combining(ch)).strip()
