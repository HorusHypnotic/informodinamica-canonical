---
name: O.P.E.R.A. Score
description: Dashboard structure, 5 pillars, KPI logic, dual score (performance + consistency), no penalties
type: feature
---

## Opera Score — Dual Model

Score = Performance (0-100) + Consistency Index (confiável/parcial/indisponível)

**Rule**: Missing data never reduces score — it reduces visibility/confidence.

### Pillars (20 pts each)
- **O (Organização)**: 60% registros_diarios status OK + 40% taxa de presença. Taxa de presença = SUM(fracao_diaria) / total registros (presente=1, meio_periodo=0.5, falta=0). Se fracao_diaria for null, deriva do tipo. Sem presencas → usa só registros.
- **P (Padronização)**: Mean material deviation (consumo_materiais real vs previsto)
- **E (Eficiência)**: % ativos with status "ativo". Defaults to 0 when no ativos (not 1).
- **R (Redução de Perdas)**: 20 minus risk/rework penalties
- **A (Análise Contínua)**: Margin score + safety score (NCs abertas)

### Consistency
- Three levels: ✅ confiável, ⚠️ parcial, ❌ indisponível
- Each pillar has its own level + items array
- Items sorted by severity (indisponível first)
- Overall = worst of all pillars

### Source-of-truth rules
- "Presença não é inferida. É declarada." → registro_presencas é fonte única
- `fracao_diaria` (0, 0.5, 1) é a verdade financeira/operacional. Trigger sync_presenca_fracao mantém `tipo` e `fracao_diaria` consistentes.
- apontamento_diarias (manual) só é usado como fallback financeiro quando NÃO há presença registrada para o colaborador no período.
- Botões rápidos [+1] [½] [✕] no Relatório de Mão de Obra criam registro_presencas com fracao_diaria correspondente em 1 clique (data = hoje).
