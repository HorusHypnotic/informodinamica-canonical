# ACCESS-003 — ION717 recruitment status resolution — 2026-08-23

## Question
Is ION717 / PrProfile NCT06153966 currently recruiting new participants?

## New evidence
1. Current mirrors of the ClinicalTrials.gov record processed/updated 2026-08-17 to 2026-08-20 report overall status `ACTIVE_NOT_RECRUITING` and enrollment 85.
2. Trials Today reproduces the internally inconsistent record: overall `Active, not recruiting`, while legacy detailed-description text still says listed sites are actively recruiting Regimen 3.
3. NYU has two conflicting institutional surfaces: the individual trial page says `Open`, while the Cognitive Neurology trials page places PrProfile under `Ongoing Clinical Trials (Not Actively Recruiting)`.
4. Ionis neurology pipeline says `Active, not recruiting`.

## Resolution
The previous state `RECRUITMENT_CONFLICT` can be narrowed. The strongest and freshest sponsor/registry-level signal is now `ACTIVE_NOT_RECRUITING`. Site-level `Open` and recruiting-location labels appear stale or internally inconsistent with the newer overall status and should not be used to claim enrollment availability.

## Operational state
ION717 = `ACTIVE_NOT_RECRUITING_WITH_STALE_SITE_SIGNALS`.

## What remains legitimate
A clinician/research-team contact may still ask whether any exception, waitlist, site-specific screening, protocol amendment, or future cohort exists. That is a request for authoritative clarification, not a claim that a slot exists.

## Safety / epistemic boundary
No patient-specific eligibility inference. No claim of access. No treatment recommendation.

## Sources checked
- ClinicalTrials.gov NCT06153966 and current derivatives reflecting Aug 2026 update
- NYU Langone individual trial page
- NYU Cognitive Neurology clinical trials page
- Ionis Neurology pipeline
