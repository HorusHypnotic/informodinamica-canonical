# Supabase access routing — 2026-10-03

## Decision
For Vitrine Digital, the canonical Supabase project remains `lyuzmfqfigvcajvetapq`.

When direct Supabase connector access is unavailable or PÉTECO classification fails only because its local `SUPABASE_ACCESS_TOKEN` is absent/legacy/rejected by the local format guard, do not loop on the same credential path and do not create another Supabase project.

Reuse the already-authorized official Lovable project `65f165e1-d08d-48ed-bcc4-fd9ef820f8cd` as the Direct DB bridge for read-only PostgreSQL/Supabase inspection when available. This route does not authorize Lovable AI or credit spend.

## Evidence 2026-10-03
- PÉTECO Command Bus accepted `vitrine-supabase-classify` at exact ref `97e3fbb5267a0fa8c3f1439f8c6e701fa586ea5a`, then failed before DB access with `SUPABASE_ACCESS_TOKEN-invalid-format`.
- Official Lovable Direct DB bridge reported database enabled with stack `supabase`.
- Read-only inspection confirmed `public.curated_business_rental_cycles` exists.
- Read-only inspection confirmed `public.list_my_rental_history(uuid,integer)` does not exist.
- No ledger row was returned for migration version `20261003103000` in that inspection.
- Therefore `20261003103000_sos_rental_history_v1.sql` remains `GIT_ONLY` until an authorized production mutation applies it and post-apply evidence verifies it.

## Routing rule
1. Baseline exact repo/SHA/migration and canonical project.
2. Prefer a working read-only route already available.
3. Direct Supabase connector PASS: use it.
4. Otherwise PÉTECO classify PASS: use it.
5. If PÉTECO fails only on local PAT/token validation, use official Lovable Direct DB read-only bridge instead of retrying the same token path.
6. Never expose secrets in chat/logs/comments.
7. Read-only bridge PASS is evidence for DB state, not authorization to mutate.
8. Production mutation remains a human gate. After authorization, apply the smallest migration, verify object + ledger/behavior, preserve evidence, then promote state.
9. Never use Lovable AI or spend Lovable credits for this route.

## State semantics
`RUN != START != PASS`; connector/PAT failure != database failure; bridge read PASS != migration applied; migration applied != behavior validated.
