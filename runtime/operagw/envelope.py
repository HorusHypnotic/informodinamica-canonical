"""Criação de envelope canônico v0.1 (Genealogia: captura → interpretação).

Responsabilidades: gerar package_id imutável (uuid-v4), preservar o raw
integral, montar channel/source_message_id e lineage inicial.
"""
from __future__ import annotations

import hashlib
import uuid
from datetime import datetime, timedelta, timezone

CONTRACT = "opera-gateway-event-contract/0.1"


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")


def new_capture_envelope(tenant: str, transport: str, channel_account_id: str,
                         channel_message_id: str, actor: str,
                         raw_content: str, received_at: str) -> dict:
    """Envelope de captura (stágio INGESTÃO do pipeline de genealogia)."""
    if not actor:
        actor = "anonymous"
    return {
        "contract": CONTRACT,
        "package_id": str(uuid.uuid4()),
        "record_type": "evento",
        "tenant": tenant,
        "canonical_obra_id": "unresolved",
        "identity_status": "unverified",
        "channel": {
            "transport": transport,
            "channel_account_id": channel_account_id,
            "channel_message_id": str(channel_message_id),
            "source_message_id":
                f"{transport}:{channel_account_id}:{channel_message_id}",
            "edited": False,
            "deleted": False,
            "edited_at": None,
        },
        "actor": actor,
        "sender_binding": "bound",
        "occurred_at": None,
        "recorded_at": utcnow_iso(),
        "raw": {
            "content": raw_content,
            "derived_from_audio": False,
            "audio_locator": None,
            "audio_sha256": None,
            "attachments": [],
            "received_at": received_at,
        },
        "interpretation": {
            "version": 1,
            "model_ref": None,
            "interpretation_version": 1,
            "events": [],
        },
        "assessment": {
            "overall_confidence": None,
            "impact": None,
            "high_impact_reasons": [],
            "confirmation_requirement": None,
            "verdict": None,
        },
        "confirmation": {
            "state": "NOT_REQUIRED",
            "requested_at": None,
            "responded_at": None,
            "responded_by": None,
            "expires_at": None,
        },
        "routing": {
            "rules_version": "0.1",
            "destinations": [],
        },
        "delivery": [],
        "lineage": {
            "parent_package_id": None,
            "parent_external_id": None,
            "transformation": "captured",
            "superseded_by": [],
            "supercedes": [],
        },
        "evidence": [],
        "integrity": {
            "serialization": "none",
            "sha256": None,
            "frozen_at": None,
        },
        "audit": {
            "received_at": received_at,
            "parsed_at": None,
            "confirmed_at": None,
            "routed_at": None,
            "corrections": [],
            "retries": [],
        },
        "created_at": utcnow_iso(),
        "updated_at": utcnow_iso(),
    }


def new_correction_envelope(store, original_package_id: str, tenant: str,
                            raw_content: str, received_at: str,
                            source_message_id: str) -> dict:
    """Pacote de correção: nunca reescreve o original (doc 04 §5)."""
    envelope = new_capture_envelope(
        tenant, *("telegram", "OPRA_GATE2_QA_BOT", "_correction_"),
        actor="_", raw_content=raw_content, received_at=received_at)
    envelope["channel"]["source_message_id"] = source_message_id
    envelope["record_type"] = "correcao"
    envelope["lineage"]["parent_package_id"] = original_package_id
    envelope["lineage"]["transformation"] = "corrected"
    envelope["lineage"]["supercedes"] = [original_package_id]
    return envelope
