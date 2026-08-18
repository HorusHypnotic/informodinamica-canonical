# Destination Contract — Direcione v0.1 (candidato)

**Estado:** `FROZEN — GATE 1 — CANDIDATE` (contrato de escrita especificado; não implementado; não altera o Direcione)
**Fonte primária:** Direcione v0.8 conceitual §11.2 (webhook `/api/public/hooks/<sistema>` com contrato de entrada), v0.9 auditoria (lacunas de captura/retorno), schemas `missoes` e `missao_eventos`.
**Flow:** `Gateway Event → Adapter → Direcione write contract`.

## 1. Fluxo e componentes

```text
envelope (package pkg-0001, event TASK_CREATED)
   → ADAPTER-DIRECIONE (componente do opera-gateway; traduz envelope → payload DIR-001)
   → POST /api/public/hooks/gateway  (endpoint a ser criado no Direcione — fora desta missão)
   → Direcione: missoes + missao_eventos
   ← ACK {accepted: bool, missao_id, dedupe_state}
```

O adapter vive no opera-gateway; o endpoint vive no Direcione. Nesta missão **nenhum dos dois é implementado** — apenas o contrato entre eles.

## 2. Payload de escrita DIR-001 (Gateway → Direcione)

Campos obrigatórios:

| Campo | Tipo | Origem no envelope |
|---|---|---|
| `tipo` | `"missao"` | fixo (TASK_CREATED→missao) |
| `origem_externa` | `"opera-gateway"` | sistema de origem |
| `origem_externa_id` | `package_id` | idempotência documental |
| `dedupe_key` | `"gateway:package_id:event_id"` | UNIQUE; protege double write |
| `obra_id` | `uuid da obra no Direcione` | resolvido via `canonical_obra_id`→alias local (o alias manifest deve ser preenchido; sem alias local → write BLOCKED) |
| `titulo` | string ≤ 120 | `events[].payload.description` resumida |
| `descricao` | string | raw + interpretação (com marcação do que é inferência) |
| `score_base` | 0–100 | derivado de `assessment` (confidence×100, penalizado por estimation) |
| `prazo_em` | ISO timestamp | `events[].payload.occurred_at`/`needed_by` |
| `payload.raw_snapshot` | JSON | `{source_message_id, interpretation_version, model_ref, evidence_locators}` |
| `payload.gateway_audit_ref` | string | referência ao audit record do gateway |

Campos opcionais: `alerta_origem` (se derivado de rotina/alerta), `recursos` (para ASSET_TRANSFER quando houver master), `stakeholders` (responsável resolvido em DETERMINISTIC; PROVISIONAL → campo `responsavel_sugerido` marcado).

## 3. Dedupe e idempotência no Direcione

O endpoint deve usar `dedupe_key` como chave de idempotência (o contrato exige comportamento, não implementação): reenvio com mesma chave → `accepted: true` + `missao_id` existente + `dedupe_state: duplicate`; jamais nova missão. `origem_externa_id` registra a proveniência documental.

## 4. Proveniência e audit no destino

A missão criada carrega origem externa visível (operador do Direcione vê "gerado por opera-gateway, ref pkg-0001"); o `missao_eventos` imutável registra a criação com `autor_id` do gateway (service identity) e o payload com `raw_snapshot`. O gateway mantém `delivery[].write_ref = missao_id` no ack — sem `write_ref` não há `DELIVERED`.

## 5. Resposta esperada (ACK)

```json
{ "accepted": true, "missao_id": "uuid", "dedupe_state": "new|duplicate", "write_ref": "missao_id" }
{ "accepted": false, "error": { "code": "missing_obra_alias|schema_mismatch|rls_denied|validation", "message": "string" } }
```

Erros: `missing_obra_alias` (sem correspondência local da obra → BLOCKED no gateway, não retry); `schema_mismatch`/`validation` (retry com backoff; após 3 erros de validação → EXPIRED + triagem, pois indica drift de schema do destino); `rls_denied` (incidente de segurança — alerta imediato); timeout → FAILED/retry.

## 6. Retry e resiliência

Retry exclusivo do gateway (adapter), conforme doc 05: backoff exponencial+jitter, budget 5, circuito aberto por destino. O Direcione não conhece retry — apenas recebe `dedupe_key` estável. Partial delivery: falha DIR-001 não afeta rotas de outros destinos.

## 7. Pré-requisitos do Direcione (registrados, não alterados)

(p) o endpoint `/api/public/hooks/gateway` precisa ser criado (fora desta missão); (q) alias local da obra precisa existir na visão do Direcione (manifest deve ser preenchido — hoje vazio, o que BLOCKA este contrato na prática até o primeiro alias verificado); (r) contrato pressupõe `missao_eventos` imutável e políticas RLS existentes — sem mudanças de schema.
