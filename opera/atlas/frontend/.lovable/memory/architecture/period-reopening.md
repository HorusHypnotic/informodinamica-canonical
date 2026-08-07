---
name: Reabertura Formal de Períodos (v1.3)
description: Como reabrir/refechar periodos_fechados preservando hash imortal e cadeia causal
type: feature
---

# Reabertura Formal de Períodos — OPERA_CORE v1.3

## Princípio (I11)
Hash de fechamento é imortal. Toda correção em período fechado vira evento:
reabertura grava snapshot+hash anteriores em `periodos_reaberturas`; refechamento
cria nova versão em `periodos_fechados`.

## Schema
- `periodos_fechados.versao INT` (default 1). Apenas uma versão ativa por
  (tenant, obra, mes), garantida por índice único parcial em `reaberto_em IS NULL`.
- `periodos_reaberturas` (append-only, sem policies de INSERT/UPDATE/DELETE para
  authenticated — só RPCs SECURITY DEFINER escrevem). Admin do tenant + super
  admin podem ler.

## RPCs
- `reabrir_periodo(_obra_id, _mes, _motivo, _correlation_id?)`
  - Exige admin + motivo ≥ 20 chars + acesso à obra.
  - Copia versão ativa para `periodos_reaberturas`.
  - Marca versão como reaberta. Loga `periodo.reaberto`.
- `refechar_periodo(_obra_id, _mes, _reabertura_id, _correlation_id?)`
  - Roda `validar_fechamento` (bloqueia se há previsões pendentes).
  - Recalcula folha via `folha_pagamento` → novo hash determinístico.
  - INSERT em `periodos_fechados` com `versao = anterior + 1`.
  - Atualiza `periodos_reaberturas` com `versao_nova`/`hash_novo`.
  - Loga `periodo.refechado` com `causation_id = reabertura.correlation_id`.
- `listar_historico_periodo(_obra_id, _mes)`
  - Retorna `{ versoes[], reaberturas[] }` ordenado para timeline.

## Cliente
- `src/components/admin/PeriodosFechadosTab.tsx` (tab "Períodos" em AdminPage).
- Reabertura exige keyword digitado: `REABRIR <MÊS>`.
- Propaga `correlation_id` via `startCausalContext` + `traced()` de
  `src/lib/observability.ts`.

## Invariantes a preservar
- NUNCA fazer UPDATE/DELETE direto em `periodos_reaberturas`.
- NUNCA reescrever `hash_snapshot` em uma linha existente de `periodos_fechados`.
- Toda nova policy RLS em tabelas operacionais deve consultar **versão ativa**
  (`reaberto_em IS NULL`) — não apenas existência da linha.
