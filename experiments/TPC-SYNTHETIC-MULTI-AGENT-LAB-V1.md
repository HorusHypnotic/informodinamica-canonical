# TPC SYNTHETIC MULTI-AGENT LAB V1

Status: PREREGISTERED_DESIGN_ONLY
Branch: experiment/tpc-synthetic-multi-agent-lab-v1
Authority: experimental branch only; canonical theory remains untouched.

## Purpose

Use a controlled multi-agent environment as a cheap, repeatable laboratory for the surviving empirical TPC program. This experiment does not treat multi-agent systems, trading dashboards, social-media claims, or agent profits as evidence for TPC. They are architecture inspiration only.

The target is MST-2: test whether prospectively measured state of shared representational artifacts adds predictive information about coordination failures beyond simpler baselines.

## Epistemic order

1. Existing G1+G2 field instrumentation remains the logically prior validation gate for EO/ECO constructs.
2. Synthetic experiments are a complementary sandbox, not a substitute for field evidence.
3. Results may strengthen, weaken, refine, or refute operational claims. Negative results are first-class evidence.
4. No hypothesis or threshold may be repaired after outcome inspection without a new version and preregistration.

## Core design

Run repeated missions with multiple agents that have distinct roles, partial information and shared artifacts. Compare a clean baseline with controlled perturbation conditions.

Initial roles are deliberately generic: planner, estimator, scheduler, inventory observer, risk observer, evidence verifier, coordinator, critic, executor and auditor. Role count is a parameter, not a sacred constant.

Shared artifacts may include task state, requirements, schedule, quantities, evidence, decisions and handoff records.

## Perturbation families

- DELAY: stale or delayed artifact.
- LOSS: required attribute removed.
- AMBIGUITY: multiple plausible interpretations.
- SUBSTITUTION: content silently replaced while interface remains plausible.
- FRAGMENTATION: agents receive incompatible partial views.
- INCONSISTENCY: mutually conflicting artifacts coexist.

Every perturbation must have a deterministic seed or reproducible fixture when technically possible.

## Outcomes

Collect at minimum:

- mission success/failure;
- coordination error events (ECO candidate events, pending validated instrument);
- contradictory decisions;
- unnecessary retries/rework;
- handoff failures;
- recovery latency;
- total execution time;
- token/compute consumption where observable;
- human intervention minutes;
- artifact-state measurements available before the outcome.

The primary scientific question is incremental predictive value, not raw correlation: does artifact-state information improve prediction of coordination failure over declared baseline predictors?

## Controls

Required before interpreting results:

- clean baseline runs;
- identical task family across treatment/control where feasible;
- seeded repetitions;
- perturbation labels hidden from evaluator where feasible;
- baseline model that does not use TPC-specific artifact-state features;
- held-out runs or temporal holdout;
- explicit missing-data handling;
- record all failed runs, including infrastructure failures.

## Tower execution contract

Tower may autonomously perform GREEN work: generate fixtures, run deterministic batches, collect logs, calculate descriptive metrics, hash evidence, retry infrastructure failures within a declared limit, and produce comparison packages.

YELLOW work is prepared but not silently promoted: changes to measurement definitions, agent-role topology, perturbation semantics, statistical model or preregistered thresholds.

RED work requires explicit human authority: merge to canonical theory, reinterpret a failed hypothesis as success, delete adverse evidence, expose credentials, incur paid compute beyond an authorized budget, or perform irreversible external actions.

## Cheap-compute rule

Execution order: reuse existing evidence -> local/mobile zero-marginal compute -> available free remote compute -> paid compute only when explicitly justified and authorized. Model intelligence and mechanical compute are accounted separately.

## Blind Analyst

Where useful, create an evidence packet without the experimenter's preferred conclusion and submit it to the Blind Analyst. Its job is to identify contradictions, alternative explanations, leakage, measurement circularity and missing counterfactuals.

## Evidence record

Each run must preserve at least:

run_id, design_version, source_sha, task_fixture, seed, role_topology, treatment, perturbation, artifact_state_before_outcome, baseline_features, outcome, failures, retries, executor, runtime, cost_class, human_minutes, timestamps and evidence hashes.

Raw evidence must not be overwritten by summaries.

## Success and failure discipline

A pretty dashboard, emergent agent behavior, profit in a simulated/financial environment, or high agent count is not evidence for MST-2.

Evidence begins when preregistered artifact-state variables prospectively and reproducibly add predictive information over the baseline under valid measurement. Failure to add information weakens the claim and must remain in the ledger.

## First implementation lot

LAB-001 is intentionally small:

1. one synthetic coordination task;
2. 3-5 agents before scaling to 10+;
3. clean baseline plus one DELAY perturbation;
4. at least 20 seeded repetitions per condition if compute permits;
5. machine-readable JSONL evidence;
6. no external financial action and no production deploy;
7. descriptive analysis first; inferential claims blocked until measurement gates are adequate.

## Relationship to Tower Operator

This lab is also a workload for Tower Operator. The infrastructure is successful when it can queue repetitions, route them to cheap compatible executors, resume after ordinary failures, preserve evidence, stop at authority gates and summarize only decisions requiring human attention.

Operational metric: validated experimental work per minute of human attention.

## Explicit non-claims

- This document does not claim TPC is true.
- It does not claim informodynamics proves TPC.
- It does not claim synthetic agents are equivalent to construction teams.
- It does not claim agent profitability.
- It does not replace prospective field validation.

The lab exists to make the surviving claims cheaper to attack.