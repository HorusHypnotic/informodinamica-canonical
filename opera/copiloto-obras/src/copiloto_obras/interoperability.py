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


class SpecializedResultEnvelope(StrictModel):
    producer: str = Field(min_length=1, max_length=120)
    schema_version: str = Field(min_length=1, max_length=40)
    result_type: str = Field(min_length=1, max_length=120)
    result_value: Any
    worksite_id: str = Field(min_length=1, max_length=120)
    created_at: datetime
    provenance_reference: str = Field(min_length=1, max_length=240)
    limitations: list[str] = Field(default_factory=list, max_length=20)


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
    if not envelope.provenance_reference.strip():
        raise ValueError("Resultado especializado exige proveniência.")
    return envelope


def can_advance_authority(current: AuthorityState, target: AuthorityState, *, explicit_external_event: bool) -> bool:
    order = {
        AuthorityState.UNDECIDED: 0,
        AuthorityState.DECIDED: 1,
        AuthorityState.AUTHORIZED: 2,
        AuthorityState.RELEASED: 3,
    }
    if order[target] <= order[current]:
        return True
    return explicit_external_event and order[target] == order[current] + 1


def preserve_evidence_verdict(verdict: EvidenceVerdict) -> EvidenceVerdict:
    """Transport an Evidence verdict without recalculating or promoting it."""
    return verdict
