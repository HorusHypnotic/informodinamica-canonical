# RSM/SOS | Homologation Gate | 2026-10-09

State: STRUCTURAL_READBACK_PASS / E2E_UNKNOWN / PROD_UNCHANGED.

## Fresh DB evidence (Lovable official Vitrine project)
- Two rental tables exist; both RLS enabled and have zero direct policies.
- No direct table privileges to `anon` or `authenticated` per `information_schema.role_table_grants` inspection.
- Rental RPCs inspected are SECURITY DEFINER with empty search_path and explicit business authorization guard. `return_my_rental_resource` is separate Minha Obra flow, not SOS.
- `anon` has no EXECUTE on inspected rental RPCs; `authenticated` does.
- `curated_business_rental_cycles_one_open_per_asset_idx` is UNIQUE and partial for status NOT IN ('CLOSED','CANCELLED'), confirmed with live indexdef.
- Snapshot aggregates: 1 rental asset, 1 business, 1 rental cycle, 1 finished, 0 open. No customer names/contacts were read or copied.
- Migration ledger lacks the three known rental versions despite object presence. Classify OBJECT_PRESENT_UNLEDGERED; do not reapply.

## Homologation gates
1. `STRUCTURE`: PASS read-only for main table/index/role properties; full function/constraint equivalence remains PARTIAL.
2. `TENANT_ISOLATION`: UNKNOWN until distinct authenticated actors exercise allow/deny on separate tenants. Database superuser SELECT does not substitute for auth-context test.
3. `LIFECYCLE`: UNKNOWN until QA asset completes reserve→deliver→renew→pickup→close, and forbidden transitions are rejected.
4. `MOBILE_QA`: UNKNOWN until mobile UI tested with real authorized QA actor.
5. `MIGRATION_LEDGER`: OBJECT_PRESENT_UNLEDGERED; do not mutate ledger without a separately authorized plan.
6. `COMMERCIAL`: BLOCKED until gates 2–4 PASS.

## PÉTECO orchestration
Use only versioned allowlisted Command Bus capability with pinned Vitrine SHA, Issue #145. Verify fresh START and terminal PASS/FAIL for that exact job. Do not treat historic issue comments or generic runner PASS as fresh functional proof. No arbitrary remote shell, secrets, AI credits, DB writes, or deploy.

## Next safe action
Prepare reproducible isolated QA test data/actor fixture and read-only comparisons in branch, then request human gate only if writing to production database is necessary. Prefer staging or transaction-rollback QA if supported and authorized. Never modify real customer data.
