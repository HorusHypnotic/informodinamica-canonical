# Memory: index.md
Updated: now

# Project Memory

## Core
- **CONSTITUIÇÃO**: `.lovable/OPERA_CORE.md` é vinculante. Checar invariantes antes de qualquer mudança arquitetural, RLS, schema ou feature.
- SaaS O.P.E.R.A Method Dashboard. Dark theme, orange (#F97316) accents. Status: green/yellow/red.
- Supabase native Auth only. NO IndexedDB/localforage for sessions (prevents mobile refresh loops).
- Mobile boot: 1.5s lock (`sessionStable`) ignoring initial null sessions to prevent crashes.
- DO NOT use vite-plugin-pwa or Service Worker (stale cache issues). Unregister old SWs.
- Soft delete (`deleted_at`) strategy for core tables (`obras`, `colaboradores`, etc).
- Global tables (`colaboradores`, `profiles`, `tenants`) lack `obra_id`. DO NOT filter them by obra.
- Admin actions: cannot self-demote. Critical actions need strong keyword confirmation.
- Responsive UI: Adaptive cards and horizontal scroll tabs for mobile. Tooltips on all KPIs.
- **Single source of truth**: KPIs vêm de RPCs (dashboard_aggregates, eficiencia_presenca, produtividade_por_equipe). Client apenas renderiza.
- **Produção**: usar `producao_valor` (numérico, derivado por trigger). Texto `producao` é só descrição.
- **Equipe**: `equipe_normalizada` (GENERATED) é a chave canônica. Insert no client deve trim() antes de enviar.
- **Presença**: UNIQUE INDEX (colaborador_id, data, obra_id) — duplicidade bloqueada no DB.

## Memories
- [OPERA_CORE Constitution](mem://architecture/opera-core-constitution) — 10 invariantes absolutas, modelo de confiança, limites arquiteturais, soberania atual
- [Causal Observability](mem://architecture/causal-observability) — correlation_id/causation_id, structured logging, tabela system_events, RPC log_system_event, libs cliente/edge
- [Reabertura Formal de Períodos](mem://architecture/period-reopening) — versionamento periodos_fechados, tabela append-only periodos_reaberturas, RPCs reabrir/refechar/listar_historico, invariante I11
- [O.P.E.R.A. Method](mem://features/opera-score) — Dashboard structure, 5 pillars, KPI logic, checklist, intelligence layer
- [Capacidade & Planejamento](mem://features/capacidade-planejamento) — RPCs eficiencia_presenca + produtividade_por_equipe, producao_valor, equipe_normalizada, uniq_presenca
- [Auth & RBAC](mem://auth/access-control) — 5 roles, read-only logic, global transparency, QR session sync
- [Beta & Waitlist](mem://features/beta-tester-module) — Waitlist status, WhatsApp notifications, influencer tracking & bypass
- [Multi-Tenancy](mem://architecture/multi-tenancy) — Setup RPC, invite system, tenant limits, 30-day trial & retention
- [Workforce & Payroll](mem://architecture/workforce-financial-logic) — Manual fractional diárias vs presence, multi-project assignment
- [Reporting](mem://features/reporting) — jsPDF/xlsx exports, dual-mode workforce reports, guest mode
- [Commercial](mem://features/commercial-landing) — Landing page, packages, contact info (Eduardo Martins)
- [Security & Audit](mem://security/rls-access-validation) — RLS policies, access expiration, audit_logs
- [CSV Export](mem://features/csv-export) — Edge export-csv: zip por tabela, RLS via userClient, signed URL 15min, eventos exportacao_csv.*
