# Rental DB readback | 2026-10-09

State: PARTIAL / READ_ONLY. No production write, no migration reapplication.

## Identity
Lovable project `65f165e1-d08d-48ed-bcc4-fd9ef820f8cd`, official Lovable database bridge, database enabled=true / supabase. Vitrine project ref in canonical config `lyuzmfqfigvcajvetapq`. Do not use `opera-infrastructure`.

## Fresh SELECT evidence
- `public.curated_business_rental_assets` and `public.curated_business_rental_cycles` present, with expected column names and types inspected.
- RLS enabled on both; zero direct policies on either. Inspecting RLS alone does not prove functional tenant isolation.
- Index names: assets pkey, business_id_asset_code_key, business_state_idx; cycles pkey, asset_idx, business_status_due_idx, one_open_per_asset_idx. Seven indexes, matching named core migration objects.
- Constraints: assets 6, cycles 10, including primary/foreign/check/unique constraints. Names align with core migration intent, but full definition equivalence remains to be proved.
- 12 rental/asset-related RPC names were returned, including can_operate_curated_rental_business, list_my_rental_history and return_my_rental_resource (last belongs to Minha Obra, not SOS).
- All 12 returned RPCs: anon EXECUTE=false, authenticated EXECUTE=true. This is role permission only, not end-to-end authorization proof.
- Readbacks of can_operate_curated_rental_business, create_my_rental_cycle, close_my_rental_cycle align in inspected text with `20260930224500_sos_rental_admin_authority_v1.sql`. The guard calls is_platform_admin() OR can_manage_curated_business(business_id).
- Ledger SELECT found no rows for versions 20260930213000, 20260930224500, 20261003103000, 20261008150000, 20261008151500, 20261008152500.
- Private asset tables by queried names absent. Exact names must be confirmed from migration files before final absence classification.

## Classification
Rental: OBJECT_PRESENT_UNLEDGERED, **not** safe to reapply migrations blindly. Private assets: GIT_ONLY candidate pending exact-name readback. Runtime tenant isolation: UNKNOWN, requires authenticated actor tests and state transition evidence.

## Next QA gates
1. Compare all SQL definitions for core constraints, indexes, RPCs and GRANTs to current Git migration snapshots.
2. Validate RSM/SOS tenant IDs and authenticated actor permissions without leaking PII or credentials.
3. Exercise reversible authorized rental lifecycle on dedicated QA data, only with an explicit production-data gate if PROD write required.
4. Reconcile migration ledger only after structural equivalence and approved method; do not fabricate APPLIED_VERIFIED.
5. PÉTECO test/build via Issue #145 allowlisted capability and SHA-specific START/PASS; no arbitrary shell or secrets.

## Constraints
No Lovable AI/credits, no migration apply, no merge/deploy/production mutation, no spend. This document is an audit artifact, not proof of E2E completion.
