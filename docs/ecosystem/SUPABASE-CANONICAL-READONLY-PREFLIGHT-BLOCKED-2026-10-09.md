# Supabase canônico — preflight read-only bloqueado — 2026-10-09

Estado: BLOCKED_EXTERNAL / NO PROD MUTATION.

## Alvo
Projeto canônico Vitrine: `lyuzmfqfigvcajvetapq`. Nenhum outro projeto é substituto.

## Prova fresca
A ferramenta Supabase `list_projects` retornou apenas `opera-infrastructure`, ref `cpmuobplnefltxdmoqzj`, status `INACTIVE`. O projeto Vitrine não foi listado. Portanto NÃO foi possível consultar schema/ledger remoto via esta conexão. Nenhuma SQL foi executada.

## Evidência histórica do repositório
`vitrinedigital-cod/docs/canonical/SOS-RENTAL-DEMO-CHECKPOINT-2026-10-01.md` registra:
- objetos `curated_business_rental_assets`, `curated_business_rental_cycles` e RPCs presentes via bridge oficial em 2026-10-01;
- ledger `20260930213000` e `20260930224500` ausentes;
- classificação histórica `OBJECT_PRESENT_UNLEDGERED`;
- jobs PETECO 013/016 PASS em SHAs anteriores, sem transferência automática para HEAD atual.

Git atual observado: Vitrine `b35d6104b686b219f9ccbf1cbe4d483b7c755057`, canonical `df36e3e0e1e0522adcbed9ed2c6f7292b85593ef`.

## Classificação
- Rental schema/ledger: `OBJECT_PRESENT_UNLEDGERED` HISTÓRICO (01/10), estado fresco `UNKNOWN`.
- Private assets migrations `20261008150000`, `151500`, `152500`: `GIT_ONLY` conforme comentários no Git, estado remoto `UNKNOWN`.
- Reaplicar migrations sem reconciliação é proibido.
- Não usar o projeto `cpmuobplnefltxdmoqzj`.

## Próximo gate
Obter acesso read-only comprovado ao projeto canônico pela ponte oficial previamente utilizada ou pela conta Supabase correta. Executar somente inspeção de `pg_namespace`, `pg_class`, `pg_proc`, `information_schema` e `supabase_migrations.schema_migrations`, comparar definições, grants e RLS com Git; registrar diferenças sem mutação. Antes de SQL, confirmar project_ref exato.

Sem gasto, sem Lovable AI, sem merge, sem produção.
