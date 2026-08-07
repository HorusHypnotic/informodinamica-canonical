---
name: Security & RLS hardening
description: Tenant scoping, session token isolation, storage ownership, invite self-read, reset-link cross-tenant guard
type: feature
---

# Security hardening (pré-piloto)

## Funções de permissão (SECURITY DEFINER, tenant-scoped)
- `has_role(user, role)` e `has_any_role(user, roles[])` exigem `tenant_id = get_user_tenant_id(user)` ou tenant NULL (legacy).
- `user_has_obra_access(user, obra)` valida que `obras.tenant_id = get_user_tenant_id(user)` E (role adequada OU `obra_membros`).
- EXECUTE revogado de `anon` e `public` nessas helpers; mantido para `authenticated`.

## RLS aplicado
- `session_transfers`: SELECT/INSERT/UPDATE/DELETE só `user_id = auth.uid()` (DELETE também super_admin).
- `invites`: além das policies de admin, convidado pode SELECT próprio invite via `email = auth.jwt()->>'email'` quando `used=false AND expires_at > now()`.
- `storage.objects` bucket `obra-fotos`: DELETE/UPDATE exigem `owner = auth.uid()` OU foldername prefix = uid OU admin do tenant OU super_admin. INSERT continua livre para authenticated.
- `mobile_debug_logs`: INSERT restrito a authenticated.
- `beta_waitlist`: INSERT público removido — fluxo só via edge function `beta-signup` (service role + rate limit).
- `beta_config`: SELECT restrito a authenticated.

## Edge function `generate-reset-link`
- Verifica role do caller via `user_roles` (tenant-aware).
- Tenant admin: só pode gerar reset para email cujo profile tem mesmo `tenant_id` E não seja super_admin.
- Super_admin: pode gerar para qualquer email.
- Resposta 403 genérica (não revela existência de email).

## Auth config
- Leaked Password Protection (HIBP) habilitado.
- Auto-confirm email: false (usuários precisam verificar email).

## Warnings residuais aceitos
SECURITY DEFINER functions chamáveis por authenticated (ex: `folha_pagamento`, `dashboard_aggregates`, `setup_tenant`) — design intencional, cada uma valida tenant/auth internamente.
