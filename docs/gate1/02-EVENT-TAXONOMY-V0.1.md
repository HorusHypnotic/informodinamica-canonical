# OPERA Gateway Event Taxonomy — v0.1

**Estado:** `FROZEN — GATE 1` · **Versão:** `event-types/0.1`
**Fontes normativas:** doc 03 (Gate 0) — taxonomia derivada exclusivamente de enums e tabelas existentes em código; PRD V0 §EVENT MODEL.
**Regra de extensão (inviolável):** novo `event_type` só entra com (1) semântica operacional distinguível, (2) evidência de necessidade em código/arqueologia, (3) destino atual ou justificativa explícita de triagem. `UNKNOWN_EVENT` é obrigatório e permanente.

## 1. Taxonomia fechada v0.1

14 tipos em 5 famílias. Nenhum tipo foi acrescentado por elegância; cada linha tem origem na arqueologia (docs 01/03 do Gate 0).

| # | event_type | Família | Semântica distinguível | Origem (código) | Destino natural | Triagem se sem destino |
|---|---|---|---|---|---|---|
| 1 | `TASK_CREATED` | Direcionamento | criação de missão/comissão/direcionamento com responsável e prazo | direcione `missoes` (status `capturada`) | Direcione | — |
| 2 | `ASSET_TRANSFER` | Ativos | movimento físico de ativo/ferramenta entre locais ou para responsável | direcione `missao_recursos` (reservado/alocado/devolvido — direção sem master) | Direcione (missão) / StockFlow futuro | sim |
| 3 | `ASSET_DAMAGE` | Ativos | dano/perda relevante de ativo, com descrição e evidência | direcione `missao_impacto_tipo`; reo perda_material | Vision (evidência) + destino de ativo | sim |
| 4 | `MATERIAL_NEED` | Suprimento | déficit de material quantitativo com prazo de necessidade | copiloto `materiais`+`movimentacoes_estoque`; smart-cotacoes quotations | Copiloto (estoque) / Smart Cotações | sim |
| 5 | `MATERIAL_SALE` | Suprimento | compra realizada (qtd, unidade, valor, fornecedor) | smart-cotacoes `quotations`+`cashback_ledger` | Smart Cotações | sim |
| 6 | `PERSON_ALLOCATION` | Pessoas | alocação/deslocamento de pessoa entre obras ou frentes | copiloto `alocacoes`/`equipes`; direcione evento alocação | Copiloto | sim |
| 7 | `PROGRESS_REPORT` | Progresso | atualização de frente: produção, avanço físico, status | copiloto `producoes`; atlas `registros_diarios` | Copiloto / Atlas | sim |
| 8 | `FIELD_OBSERVATION` | Campo | fato/observação de campo não coberto por outro tipo (bloqueio, observação, risco) | copiloto `ocorrencias`; qfd-os `field_events` | Copiloto (ocorrência) / REO | — (catch-all de campo) |
| 9 | `WEATHER_EVENT` | Campo | evento climático com efeito operacional (chuva, paralisão) | reo `registros` (choveu/intensidade/paralisou) | REO | — |
| 10 | `INCIDENT` | Campo | incidente com consequência mensurável: segurança, retrabalho, custo adicional, atraso | atlas `incidentes_seguranca`/`retrabalhos`; reo consequência | Atlas + Control (ECO) | sim |
| 11 | `PAYMENT_NEED` | Financeiro | necessidade de pagamento (obrigação, prazo, credor) | smart-cotacoes `payments`; atlas `lancamentos_financeiros` | Smart Cotações / Atlas | sim |
| 12 | `PAYMENT` | Financeiro | pagamento realizado (comprovante) | smart-cotacoes `payments` (pix, comprovante) | Smart Cotações / Atlas | sim |
| 13 | `DECISION` | Decisão | decisão registrada (econômica ou operacional) com justificativa | control `decisoes_economicas` | Control | — |
| 14 | `UNKNOWN_EVENT` | Triagem | relato sem tipo conhecido — **nunca associado silenciosamente** | — | fila de triagem humana | — |

## 2. Payload mínimo por tipo

Cada `interpretation.events[].payload` segue o schema de `schemas/event-types-v0.1.json`. Regras transversais: quantidade sempre como `quantity`+`unit` (nunca "100" solto); valores monetários como `amount` em centavos + `currency` (BRL); datas relativas ("quinta", "amanhã") viram `occurred_at` RFC3339 com `occurred_at_estimated: true`; descrição observável obrigatória (`description`); evidências apontadas em `evidence[]` do envelope, nunca embutidas como texto interpretado.

## 3. Matriz evento → destino → write (v0.1)

| event_type | Destino v0.1 | Write esperado (produto) | Write no MVP (banco de teste) |
|---|---|---|---|
| TASK_CREATED | Direcione | `missoes` + `missao_eventos` (criação, imutável) | réplica em banco de teste |
| ASSET_TRANSFER | triagem → Direcione/StockFlow | missão com recursos ou tabela futura de ativos | triagem + write de teste |
| ASSET_DAMAGE | Vision + destino de ativo | `evidencias` (url_externa) | triagem + write de teste |
| MATERIAL_NEED | Copiloto / Smart Cotações | `movimentacoes_estoque` | write de teste |
| MATERIAL_SALE | Smart Cotações | `supplier_quotes`/`cashback_ledger` | write de teste (fora do MVP por HIGH-IMPACT financeiro) |
| PERSON_ALLOCATION | Copiloto | `alocacoes`/`presencas` | write de teste (condicionado à correção do preflight RED) |
| PROGRESS_REPORT | Copiloto / Atlas | `producoes` / `registros_diarios` | write de teste |
| FIELD_OBSERVATION | Copiloto / REO | `ocorrencias` / `eventos_operacionais` | write de teste |
| WEATHER_EVENT | REO | `registros`/`eventos_operacionais` (climático) | write de teste |
| INCIDENT | Atlas (+ Control) | `incidentes_seguranca`/`retrabalhos` (+ `ecos`) | write de teste |
| PAYMENT_NEED / PAYMENT | Smart Cotações / Atlas | `payments` / `lancamentos_financeiros` | FORA do MVP (HIGH-IMPACT) |
| DECISION | Control | `decisoes_economicas` | write de teste |
| UNKNOWN_EVENT | triagem humana | nenhum | nenhum |

## 4. Classificação de impacto por tipo (v0.1)

`PAYMENT`, `PAYMENT_NEED`, `MATERIAL_SALE` (valor relevante), `ASSET_DAMAGE` (baixa relevante), `PERSON_ALLOCATION` quando for mudança crítica de equipe e qualquer ação irreversível são **HIGH-IMPACT por definição** — confirmado na matriz do doc 04. Os demais são classificados no `assessment` por contexto, nunca pelo tipo sozinho.
