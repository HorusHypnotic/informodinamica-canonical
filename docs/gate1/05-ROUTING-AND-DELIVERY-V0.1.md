# OPERA Gateway Routing & Delivery — v0.1

**Estado:** `FROZEN — GATE 1` · **Versão:** `routing-delivery/0.1`
**Fontes normativas:** doc 03 §6–7 (Gate 0); PRD V0 §ROUTING / §DESTINATION CONTRACT; contrato webhook §11.2 do Direcione v0.8 (documento fonte, não implementado).

## 1. Routing rules v0.1

Tabela fechada de rotas (machine-readable em `schemas/routing-rules-v0.1.json`). Regras de governança: rota nova só entra com contrato de escrita declarado do destino; rota inativa é marcada `inactive` (nunca deletada, para auditoria); versão de regras é semver (`0.1`).

| rule_id | event_type | destination | write_spec_ref | status | Observação |
|---|---|---|---|---|---|
| R-DIR-001 | TASK_CREATED | direcione | DIR-001 (doc 07) | `candidate` | candidata do MVP |
| R-DIR-002 | ASSET_TRANSFER | triagem | — | `candidate` | até existir master/StockFlow |
| R-COP-003 | MATERIAL_NEED | copiloto | COP-001 | `candidate` | condicionada à correção do preflight RED |
| R-COP-004 | PERSON_ALLOCATION | copiloto | COP-002 | `candidate` | idem |
| R-COP-005 | PROGRESS_REPORT | copiloto | COP-003 | `candidate` | idem |
| R-REO-006 | WEATHER_EVENT | reo | REO-001 | `candidate` | alternativa de 2º destino do MVP |
| R-COP-007 | FIELD_OBSERVATION | copiloto | COP-004 | `candidate` | |
| R-ATL-008 | INCIDENT | atlas | ATL-001 | `candidate` | + Control para ECO |
| R-SCQ-009 | PAYMENT_NEED, PAYMENT, MATERIAL_SALE | smart_cotacoes | SCQ-001 | `blocked` | HIGH-IMPACT financeiro; fora do MVP |
| R-CTRL-010 | DECISION | control | CTRL-001 | `candidate` | |
| R-TRI-999 | UNKNOWN_EVENT, qualquer sem rota | triagem | — | `always` | fallback universal |

Status `candidate` significa: contrato de escrita especificado neste Gate 1, não habilitado em runtime. O MVP habilita no máximo `R-DIR-001` + uma rota Copiloto ou REO, conforme decisão humana do PRD (open question e).

## 2. Estados de delivery (por destino, independentes)

| Estado | Significado | Transições |
|---|---|---|
| `PENDING` | pacote confirmado, write ainda não tentado | → DELIVERED, FAILED, BLOCKED |
| `DELIVERED` | write aceito pelo destino, `write_ref` registrado | (final; correção reabre via novo pacote) |
| `FAILED` | write recusado/erro de entrega | → RETRYING |
| `RETRYING` | em backoff; `next_retry_at` definido | → DELIVERED, FAILED, EXPIRED |
| `EXPIRED` | esgotado o retry budget | → triagem manual |
| `BLOCKED` | contrato do destino ausente/versão incompatível, ou write proibido por política | → (apenas por mudança de contrato) |

**Entrega parcial é estado de primeiro cidadão:** 1 raw → N eventos → M destinos; cada (package, destination, event) tem estado próprio; falha em B não apaga nem retrabalha A nem C; o envelope `delivery[]` sempre representa a verdade por destino, e o pacote global nunca fica `FAILED` globalmente enquanto houver destino `DELIVERED`. Retry: backoff exponencial com jitter, budget de 5 tentativas, sem retry storm (contagem por destino com circuito aberto). **Double write é proibido:** write só é reexecutado se o destino não tiver idempotência nativa, e então somente via idempotency key (`package_id` + `event_id`) declarada no contrato do destino.

## 3. Destino offline e partial delivery (comportamento normativo)

Destino indisponível: `FAILED` → `RETRYING`; eventos permanecem `CONFIRMED` no gateway; o usuário é informado do estado se perguntar. Se o destino estiver offline além do retry budget, `EXPIRED` e o pacote entra na fila de triagem com destaque `PARTIALLY_DELIVERED` no dashboard de auditoria. O evento original continua preservado em todos os casos (invariante do §10 da missão Gate 0).

## 4. O que o gateway nunca faz no roteamento

Nunca deduz destino de texto livre sem `event_type` classificado; nunca roteia envelope com `tenant` não vinculado; nunca roteia evento com entity `CONFLICTED` + HIGH-IMPACT; nunca marca `DELIVERED` sem `write_ref` do destino (ou ack explícito do adapter).
