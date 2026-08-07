---
name: Exportação CSV universal
description: Edge function export-csv zipa CSVs (1 por tabela) respeitando RLS via userClient, sobe em bucket privado exports/{tenant_id}, retorna signed URL 15min. Escopos tenant_full | obra | periodo. Loga exportacao_csv.* em system_events com correlation_id.
type: feature
---

## Arquitetura

- Edge function `supabase/functions/export-csv/index.ts`.
- Auth: exige JWT + `has_role(uid,'admin')`.
- Lê tabelas via `userClient` (Authorization header) → RLS automática (I1/I5).
- Tabelas listadas em `TABLES` (allowlist server-side). Tokens removidos (`invites.token`, `session_transfers.token`).
- Cada linha CSV recebe `exportado_em` e `exportado_por` (E4).
- CSV: UTF-8 BOM, `,` delimiter, escape `"` duplicando, CRLF.
- Pagina em chunks de 5000 linhas. Zipa com JSZip nível 6.
- Upload em bucket privado `exports` em `{tenant_id}/{ts}-{scope}.zip`. Signed URL 15min.
- `_manifest.json` incluído no ZIP com escopo, totais, correlation_id.

## Eventos em system_events

- `exportacao_csv.requested` (client.ExportarDadosTab)
- `exportacao_csv.started` (edge)
- `exportacao_csv.completed` (edge) — payload: scope, tables, rows_total, file_bytes, path
- `exportacao_csv.denied` / `.failed` / `.client_failed`

Toda a cadeia compartilha mesmo `correlation_id` propagado via headers `x-correlation-id` / `x-causation-id` (causalHeaders).

## RLS Storage

Policy `Admins read own tenant exports` em `storage.objects`:
admin do tenant lê apenas paths cuja primeira pasta = seu `tenant_id`. Edge function usa service_role para upload.

## UI

`src/components/admin/ExportarDadosTab.tsx` (tab "Dados" em Admin). 3 cards: tenant_full / obra / período (seletor obra + input month). Mostra manifest e link de download.

## Limites conhecidos

- Edge timeout 150s — cobre ~100k linhas.
- ZIP em memória — tenants muito grandes precisarão de job assíncrono futuramente.
- Ordenação determinística por `orderBy` da spec garante reprodutibilidade entre admins do mesmo tenant (E7).
- CSV não substitui hash do snapshot (I9) — documentado na UI.
