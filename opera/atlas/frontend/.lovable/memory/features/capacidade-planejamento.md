---
name: Capacidade & Camada de Planejamento
description: Modelo de verdade único — RPCs como fonte oficial, producao_valor numérico, equipe_normalizada, dedup de presença, capacidade planejada vs real
type: feature
---

## Modelo de verdade único (consolidado)

**Regra:** RPC server-side é fonte oficial. Frontend apenas renderiza. Cálculo client-side só como fallback offline/guest.

### Tabelas / colunas

- `obras.tamanho_equipe_esperada` (int NOT NULL DEFAULT 0) — capacidade planejada.
- `registros_diarios.producao` (text) — descrição livre ("12 m²").
- `registros_diarios.producao_valor` (numeric) — extraído por trigger `extract_producao_valor` (regex). **Use SEMPRE este campo em cálculos.**
- `registros_diarios.equipe` (text) — input do usuário.
- `registros_diarios.equipe_normalizada` (text GENERATED ALWAYS AS) — `lower(trim(equipe))` com espaços → `_`. **Chave canônica de agrupamento.**
- `registro_presencas` — UNIQUE INDEX `uniq_presenca_colab_data_obra` em (colaborador_id, data, obra_id). DB bloqueia duplicata; UI mostra toast amigável (código 23505 capturado em `useTableData.insert`).

### RPCs oficiais

- `dashboard_aggregates(_obra_id, _start, _end)` → JSON unificado: financeiro, presença, consumo, incidentes, capacidade. Cache 60s no client.
- `eficiencia_presenca(_obra_id, _data)` → esperado, presente, eficiência %.
- `produtividade_por_equipe(_obra_id, _start, _end)` → ranking por `equipe_normalizada`, soma `producao_valor`.

### Hooks
- `useDashboardAggregates()` — wrapper de `dashboard_aggregates`.
- `useEficienciaPresenca(obraId, data)` — wrapper de `eficiencia_presenca`.
- `useProdutividadeEquipe(obraId, start, end)` — wrapper de `produtividade_por_equipe`. **Usar este, não `calculateProdutividadePorEquipe` (deprecated, mantido só para guest mode).**

### Status (semáforo)
Eficiência de presença: ≥90% ok, ≥70% warning, <70% critical. Sem dados = "indisponível" (NÃO pune o O.P.E.R.A. Score — regra do dual score).

### Helpers client
- `src/lib/normalize.ts`: `normalizeEquipe()` e `parseProducaoValor()` espelham a lógica do DB.
- `useTableData.insert` faz trim() em `equipe` para `registros_diarios` e captura erro 23505 em `registro_presencas`.

### Lacunas pendentes
- `colaborador_id` em `registros_diarios` (fase 2): habilita produtividade individual e fecha o ciclo presença → produção → eficiência real.
- Status semântico unificado (operacional vs confiabilidade) — ainda dois eixos paralelos.
