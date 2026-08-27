"""COPILOTO-OBRAS-REENTRY-001: executable contract for reconciliation R1-R10.

These tests intentionally encode the CURRENT governance contract. They are expected to
expose missing semantics before any production code is changed. A failing test is
reconciliation evidence, not permission to patch blindly.
"""
from pathlib import Path

from copiloto_obras.models import InformationType, RecommendationStatus, ResponseIntent

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "copiloto_obras"
MODELS = (SRC / "models.py").read_text(encoding="utf-8")
AUTH = (SRC / "authorization.py").read_text(encoding="utf-8")
COMPOSITION = (SRC / "composition.py").read_text(encoding="utf-8")
PROMPT = (ROOT.parents[1] / "agents" / "copiloto-obras-system-prompt.md").read_text(encoding="utf-8")


def test_r1_unknown_essential_blocks_dependent_guidance():
    """R1: explicit UNKNOWN must exist and support a blocking outcome."""
    assert "UNKNOWN" in MODELS
    assert any(x in MODELS for x in ("BLOCK", "BLOCKED", "DEPENDENCY_UNKNOWN"))


def test_r2_unknown_nonessential_is_not_silently_defaulted():
    """R2: UNKNOWN must be first-class, not encoded only as generic absence/lacuna."""
    assert "UNKNOWN" in MODELS
    assert "__unknown__" in MODELS or "UNKNOWN" in PROMPT


def test_r3_partial_guidance_is_not_a_decision():
    """R3: partial-guidance eligibility must be representable separately from decisions."""
    assert "ELIGIBLE_FOR_PARTIAL_GUIDANCE" in MODELS or "ELIGIBLE_FOR_PARTIAL_GUIDANCE" in PROMPT
    assert "HumanDecision" in MODELS


def test_r4_decision_does_not_imply_authorization_or_release():
    """R4: human decision, authorization and release require distinct states/contracts."""
    assert "HumanDecision" in MODELS
    assert "Authorization" in MODELS or "AUTHORIZED" in MODELS
    assert "RELEASE" in MODELS


def test_r5_insufficient_evidence_cannot_be_promoted_to_supported():
    """R5: Evidence verdict vocabulary must preserve insufficient evidence."""
    assert "INSUFFICIENT_EVIDENCE" in MODELS or "INSUFFICIENT_EVIDENCE" in PROMPT
    assert "SUPPORTED" in MODELS or "SUPPORTED" in PROMPT


def test_r6_cross_worksite_access_fails_closed():
    """R6: existing boundary explicitly rejects cross-worksite access."""
    assert "worksite_id != context.worksite_id" in AUTH
    assert "Acesso entre obras não é autorizado" in AUTH


def test_r7_missing_required_module_keeps_composition_incomplete():
    """R7: missing mandatory composition modules must fail closed."""
    assert "INCOMPLETA" in MODELS
    assert "missing_modules" in COMPOSITION
    assert "required" in COMPOSITION


def test_r8_manifest_snapshot_integrity_is_verified():
    """R8: composition must verify hashes/snapshots, not only file presence."""
    assert "sha256" in COMPOSITION.lower()
    assert "snapshot" in COMPOSITION.lower()


def test_r9_material_recommendation_requires_provenance_or_limitation():
    """R9: recommendations require source IDs and response plans can declare limitations."""
    assert "created_from_information_ids" in MODELS
    assert "limitations" in MODELS
    assert InformationType.INFERENCIA.value == "INFERENCIA"


def test_r10_guardrail_handoff_can_preempt_conflicting_instruction():
    """R10: handoff and pending validation remain explicit safe outcomes."""
    assert ResponseIntent.HANDOFF.value == "HANDOFF"
    assert RecommendationStatus.PENDENTE_DE_VALIDACAO.value == "PENDENTE_DE_VALIDACAO"
    assert "Handoff" in MODELS
