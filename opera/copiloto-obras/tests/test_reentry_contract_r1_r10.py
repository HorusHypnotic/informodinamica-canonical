"""COPILOTO-OBRAS-REENTRY-001: behavioral reconciliation contract R1-R10 + audit regressions."""
from datetime import datetime, timezone
from pathlib import Path

import pytest
from pydantic import ValidationError

from copiloto_obras.interoperability import (
    AuthorityState,
    EvidenceVerdict,
    GuidanceEligibility,
    KnowledgeState,
    ProvenanceReference,
    SemanticInteropState,
    SpecializedProducer,
    SpecializedResultEnvelope,
    SpecializedResultType,
    can_advance_authority,
    preserve_evidence_verdict,
    validate_specialized_result,
)
from copiloto_obras.models import InformationType, RecommendationStatus, ResponseIntent

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "copiloto_obras"
AUTH = (SRC / "authorization.py").read_text(encoding="utf-8")
COMPOSITION = (SRC / "composition.py").read_text(encoding="utf-8")
MODELS = (SRC / "models.py").read_text(encoding="utf-8")


def _evidence_envelope(**overrides):
    data = dict(
        producer=SpecializedProducer.OPERA_EVIDENCE,
        schema_version="v0",
        result_type=SpecializedResultType.EVIDENCE_VERDICT,
        result_value=EvidenceVerdict.INSUFFICIENT_EVIDENCE,
        worksite_id="obra-1",
        created_at=datetime.now(timezone.utc),
        provenance=ProvenanceReference(scheme="evidence-pack", reference_id="abc"),
        limitations=["missing T1"],
    )
    data.update(overrides)
    return SpecializedResultEnvelope(**data)


def test_r1_unknown_essential_blocks_dependent_guidance():
    with pytest.raises(ValueError, match="UNKNOWN"):
        SemanticInteropState(knowledge_state=KnowledgeState.UNKNOWN, guidance_eligibility=GuidanceEligibility.ELIGIBLE)
    state = SemanticInteropState(knowledge_state=KnowledgeState.UNKNOWN, guidance_eligibility=GuidanceEligibility.BLOCKED)
    assert state.guidance_eligibility is GuidanceEligibility.BLOCKED


def test_r2_unknown_nonessential_is_not_silently_defaulted():
    state = SemanticInteropState(knowledge_state=KnowledgeState.UNKNOWN)
    assert state.knowledge_state is KnowledgeState.UNKNOWN
    assert state.guidance_eligibility is None


def test_r3_partial_guidance_is_not_a_decision():
    state = SemanticInteropState(knowledge_state=KnowledgeState.KNOWN, guidance_eligibility=GuidanceEligibility.ELIGIBLE_FOR_PARTIAL_GUIDANCE)
    assert state.guidance_eligibility is GuidanceEligibility.ELIGIBLE_FOR_PARTIAL_GUIDANCE
    assert state.authority_state is AuthorityState.UNDECIDED


def test_r4_decision_does_not_imply_authorization_or_release():
    assert can_advance_authority(AuthorityState.UNDECIDED, AuthorityState.DECIDED, explicit_external_event=True)
    assert not can_advance_authority(AuthorityState.DECIDED, AuthorityState.AUTHORIZED, explicit_external_event=False)
    assert not can_advance_authority(AuthorityState.DECIDED, AuthorityState.RELEASED, explicit_external_event=True)
    assert can_advance_authority(AuthorityState.DECIDED, AuthorityState.AUTHORIZED, explicit_external_event=True)
    assert can_advance_authority(AuthorityState.AUTHORIZED, AuthorityState.RELEASED, explicit_external_event=True)


def test_r5_insufficient_evidence_cannot_be_promoted_to_supported():
    validated = validate_specialized_result(_evidence_envelope(), "obra-1")
    verdict = preserve_evidence_verdict(EvidenceVerdict(validated.result_value))
    assert verdict is EvidenceVerdict.INSUFFICIENT_EVIDENCE
    assert verdict is not EvidenceVerdict.SUPPORTED


def test_r6_cross_worksite_access_fails_closed():
    assert "worksite_id != context.worksite_id" in AUTH
    assert "Acesso entre obras não é autorizado" in AUTH


def test_r7_missing_required_module_keeps_composition_incomplete():
    assert "INCOMPLETA" in MODELS
    assert "missing_modules" in COMPOSITION
    assert "required" in COMPOSITION


def test_r8_manifest_snapshot_integrity_is_verified():
    assert "sha256" in COMPOSITION.lower()
    assert "snapshot" in COMPOSITION.lower()


def test_r9_material_recommendation_requires_provenance_or_limitation():
    assert "created_from_information_ids" in MODELS
    assert "limitations" in MODELS
    assert InformationType.INFERENCIA.value == "INFERENCIA"


def test_r10_guardrail_handoff_can_preempt_conflicting_instruction():
    assert ResponseIntent.HANDOFF.value == "HANDOFF"
    assert RecommendationStatus.PENDENTE_DE_VALIDACAO.value == "PENDENTE_DE_VALIDACAO"
    assert "Handoff" in MODELS


# Independent reaudit regressions: these were found only after R1-R10 were green.
def test_audit_h1_authority_cannot_reverse_silently():
    assert not can_advance_authority(AuthorityState.RELEASED, AuthorityState.AUTHORIZED, explicit_external_event=True)
    assert not can_advance_authority(AuthorityState.AUTHORIZED, AuthorityState.DECIDED, explicit_external_event=True)
    assert not can_advance_authority(AuthorityState.DECIDED, AuthorityState.UNDECIDED, explicit_external_event=True)


def test_audit_h2_specialized_producer_cannot_claim_privileged_or_foreign_semantics():
    with pytest.raises(ValidationError):
        _evidence_envelope(result_type="AUTHORIZED", result_value="AUTHORIZED")
    with pytest.raises(ValueError, match="ownership"):
        _evidence_envelope(result_type=SpecializedResultType.GUIDANCE_ELIGIBILITY, result_value=GuidanceEligibility.ELIGIBLE)


def test_audit_m1_provenance_must_use_recognized_typed_reference():
    with pytest.raises(ValidationError):
        ProvenanceReference(scheme="whatever", reference_id="abc")
    with pytest.raises(ValidationError):
        ProvenanceReference(scheme="evidence-pack", reference_id="   ")


def test_audit_m2_producer_is_typed_and_bound_to_result_type():
    with pytest.raises(ValidationError):
        _evidence_envelope(producer="ANYBODY")
    pocket = SpecializedResultEnvelope(
        producer=SpecializedProducer.POCKET_ENGINE,
        schema_version="v0",
        result_type=SpecializedResultType.GUIDANCE_ELIGIBILITY,
        result_value=GuidanceEligibility.ELIGIBLE_FOR_PARTIAL_GUIDANCE,
        worksite_id="obra-1",
        created_at=datetime.now(timezone.utc),
        provenance=ProvenanceReference(scheme="engine-result", reference_id="pocket:1"),
    )
    assert validate_specialized_result(pocket, "obra-1").producer is SpecializedProducer.POCKET_ENGINE
