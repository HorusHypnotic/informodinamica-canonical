from datetime import datetime
from enum import StrEnum
from typing import Any

from pydantic import Field, model_validator

from .models import StrictModel


class KnowledgeState(StrEnum):
    KNOWN = "KNOWN"
    UNKNOWN = "UNKNOWN"


class GuidanceEligibility(StrEnum):
    BLOCKED = "BLOCKED"
    ELIGIBLE_FOR_PARTIAL_GUIDANCE = "ELIGIBLE_FOR_PARTIAL_GUIDANCE"
    ELIGIBLE = "ELIGIBLE"


class AuthorityState(StrEnum):
    UNDECIDED = "UNDECIDED"
    DECIDED = "DECIDED"
    AUTHORIZED = "AUTHORIZED"
    RELEASED = "RELEASED"


class EvidenceVerdict(StrEnum):
    SUPPORTED = "SUPPORTED"
    SUPPORTED_WITH_EXCEPTION = "SUPPORTED_WITH_EXCEPTION"
    INSUFFICIENT_EVIDENCE = "INSUFFICIENT_EVIDENCE"
    CONFLICTING_EVIDENCE = "CONFLICTING_EVIDENCE"
    NOT_VERIFIABLE = "NOT_VERIFIABLE"


class SpecializedProducer(StrEnum):
    POCKET_ENGINE = "POCKET_ENGINE"
    OPERA_EVIDENCE = "OPERA_EVIDENCE"


class SpecializedResultType(StrEnum):
    GUIDANCE_ELIGIBILITY = "GUIDANCE_ELIGIBILITY"
    EVIDENCE_VERDICT = "EVIDENCE_VERDICT"


PRODUCER_RESULT_OWNERSHIP: dict[SpecializedProducer, frozenset[SpecializedResultType]] = {
    SpecializedProducer.POCKET_ENGINE: frozenset({SpecializedResultType.GUIDANCE_ELIGIBILITY}),
    SpecializedProducer.OPERA_EVIDENCE: frozenset({SpecializedResultType.EVIDENCE_VERDICT}),
}


class ProvenanceReference(StrictModel):
    scheme: str = Field(min_length=1, max_length=40)
    reference_id: str = Field(min_length=1, max_length=200)

    @model_validator(mode="after")
    def validate_supported_scheme(self):
        if self.scheme not in {"claim", "evidence-pack", "engine-result"}:
            raise ValueError("Esquema de proveniência não reconhecido.")
        if not self.reference_id.strip():
            raise ValueError("Referência de proveniência vazia.")
        return self


class SpecializedResultEnvelope(StrictModel):
    producer: SpecializedProducer
    schema_version: str = Field(min_length=1, max_length=40)
    result_type: SpecializedResultType
    result_value: Any
    worksite_id: str = Field(min_length=1, max_length=120)
    created_at: datetime
    provenance: ProvenanceReference
    limitations: list[str] = Field(default_factory=list, max_length=20)

    @model_validator(mode="after")
    def validate_semantic_ownership(self):
        if self.result_type not in PRODUCER_RESULT_OWNERSHIP[self.producer]:
            raise ValueError("Produtor não possui ownership para este tipo de resultado.")
        if self.result_type is SpecializedResultType.GUIDANCE_ELIGIBILITY:
            GuidanceEligibility(self.result_value)
        elif self.result_type is SpecializedResultType.EVIDENCE_VERDICT:
            EvidenceVerdict(self.result_value)
        return self


class SemanticInteropState(StrictModel):
    knowledge_state: KnowledgeState = KnowledgeState.KNOWN
    guidance_eligibility: GuidanceEligibility | None = None
    evidence_verdict: EvidenceVerdict | None = None
    authority_state: AuthorityState = AuthorityState.UNDECIDED

    @model_validator(mode="after")
    def preserve_unknown_and_authority_boundaries(self):
        if self.knowledge_state is KnowledgeState.UNKNOWN and self.guidance_eligibility is GuidanceEligibility.ELIGIBLE:
            raise ValueError("UNKNOWN não pode ser promovido silenciosamente a ELIGIBLE.")
        return self


def validate_specialized_result(envelope: SpecializedResultEnvelope, expected_worksite_id: str) -> SpecializedResultEnvelope:
    if envelope.worksite_id != expected_worksite_id:
        raise ValueError("Resultado especializado pertence a outra obra.")
    return envelope


def can_advance_authority(current: AuthorityState, target: AuthorityState, *, explicit_external_event: bool) -> bool:
    if target is current:
        return True
    allowed_forward = {
        AuthorityState.UNDECIDED: AuthorityState.DECIDED,
        AuthorityState.DECIDED: AuthorityState.AUTHORIZED,
        AuthorityState.AUTHORIZED: AuthorityState.RELEASED,
        AuthorityState.RELEASED: None,
    }
    return explicit_external_event and allowed_forward[current] is target


def preserve_evidence_verdict(verdict: EvidenceVerdict) -> EvidenceVerdict:
    """Transport an Evidence verdict without recalculating or promoting it."""
    return verdict
