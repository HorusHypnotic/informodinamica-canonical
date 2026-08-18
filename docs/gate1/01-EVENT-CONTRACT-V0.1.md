# OPERA Gateway Event Contract — v0.1

**Estado:** `FROZEN — GATE 1` (contrato operacional para o GATE 2; não autoriza runtime)
**Versão:** `opera-gateway-event-contract/0.1`
**Data:** 18/08/2026
**Relação com o canônico:** extensão **estritamente aditiva** do `OPERA-CORE-INTEROPERABILITY-CONTRACT-V0.md` (0.0.1, DRAFT). Todos os invariantes do V0 permanecem obrigatórios; nenhum é relaxado, removido ou renomeado.
**Fontes normativas:** DEC-ARQ-002 (identidade operacional), docs de Gate 0 (03 — Evento/Taxonomia/Envelope, PRD V0, Decision Record).
**Machine-readable:** `schemas/gateway-envelope-v0.1.schema.json`, `schemas/event-types-v0.1.json`, `schemas/routing-rules-v0.1.json`.

## 1. Princípios inalteráveis (herdados do V0)

1. IDs locais permanecem imutáveis e autoritativos em sua origem.
2. `canonical_obra_id` é referência de correlação governada por manifesto — nunca chave primária global.
3. Nome legível nunca é chave.
4. Ausência, desconhecido, não aplicável e não ocorrência são estados distintos.
5. Fato, inferência, decisão e snapshot são tipos distintos.
6. Período sempre declara início, fim e timezone.
7. Toda transformação preserva origem e o ID do registro anterior.
8. Idempotência documental usa `package_id` e `external_id`; não pressupõe serviço.
9. Hash só é obrigatório quando o payload estiver congelado e a serialização estiver declarada.
10. Nenhum consumidor se torna owner por receber ou copiar dados.

## 2. Princípios novos do Gateway (regra de ouro RAW FIRST)

11. **RAW FIRST** — o relato humano original é preservado integralmente em `raw` e nunca é substituído pela interpretação. Interpretação, resolução e evento são **camadas derivadas**, cada uma com referência à camada anterior.
12. **SEPARAÇÃO DE ESTÁGIOS** — `raw → interpretação → entidade_resolvida → evento_proposto → confirmação → roteamento → write → auditoria`. Nenhuma etapa pode apagar a genealogia da anterior.
13. **CAPTURADOR, NÃO DONO** — o Gateway captura, interpreta, resolve, valida, roteia e audita entrega. Os domínios (missões, registros operacionais, evidências visuais, registros forenses, ECO, cotação/compra, fechamentos) permanecem dos seus produtos.
14. **TENANT EXPLÍCITO ANTES DE TUDO** — todo envelope tem `tenant` resolvido antes de qualquer interpretação ou roteamento; nenhum evento atravessa tenant por fuzzy matching.
15. **SEI / NÃO SEI / PRECISO CONFIRMAR / PRECISO PERGUNTAR / NÃO POSSO EXECUTAR** — todo processamento deve terminar em um desses cinco vereditos; interpretação tratada como fato silencioso é violação de contrato.

## 3. Envelope canônico v0.1

```jsonc
{
  // --- Identificação e contrato ---
  "contract": "opera-gateway-event-contract/0.1",   // valor exato; versão rígida
  "package_id": "uuid-v4",                          // imutável; idempotência documental
  "record_type": "evento|correcao|rejeicao|heartbeat",
  "event_type": "TASK_CREATED|...|UNKNOWN_EVENT",   // §4; taxonomia fechada

  // --- Contexto organizacional (DESPACHADO ANTES DE TUDO) ---
  "tenant": "identificador da construtora/organização",            // obrigatório, nunca inferido por fuzzy
  "canonical_obra_id": "string|unresolved",                        // manifesto V0; pode ser "unresolved"
  "identity_status": "verified|provisional|unverified|conflicted",

  // --- Canal ---
  "channel": {
    "transport": "telegram|whatsapp|discord|web",
    "channel_account_id": "opaque",                                // bot/conta de origem
    "channel_message_id": "string",                                // ID estável da mensagem no canal
    "source_message_id": "transport:channel_account_id:channel_message_id", // UNIQUE global na ingestão
    "edited": false, "deleted": false, "edited_at": null
  },

  // --- Atores e tempo ---
  "actor": "reference opaca (telefone, username, user_id)",        // nunca e-mail como identidade canônica
  "sender_binding": "bound|unbound",                               // authorized_sender
  "occurred_at": "RFC3339|null",                                   // quando o fato ocorreu (estimativa aceita, marcada)
  "recorded_at": "RFC3339",                                        // quando o relato chegou (server)

  // --- RAW — nunca atualizado ---
  "raw": {
    "content": "string (texto transcrito)",
    "derived_from_audio": false,
    "audio_locator": null, "audio_sha256": null,
    "attachments": [ {"kind": "photo|audio|document", "locator": "string", "sha256": "hex|null",
                       "sensitivity": "public|internal|restricted", "availability": "available|missing|inaccessible|not_collected"} ],
    "received_at": "RFC3339"
  },

  // --- Interpretação ---
  "interpretation": {
    "version": 1,
    "model_ref": "provider/model-YYYY-MM-DD",
    "interpretation_version": "int",                               // incrementa em cada reinterpretação
    "events": [
      {
        "event_id": "package_id:seq",                              // seq 1..N
        "event_type": "string",
        "entities": [ {"kind": "obra|pessoa|material|ativo|fornecedor|empresa|local|tarefa",
                        "display": "string", "resolved_id": "string|null",
                        "candidate_ids": ["string"],
                        "resolution_level": "DETERMINISTIC|PROVISIONAL|CONFLICTED|UNKNOWN",
                        "confidence": 0.0 } ],
        "confidence": 0.92,
        "location": "string|null",
        "occurred_at": "RFC3339|null",
        "payload": {}                                              // schema por event_type (§4)
      }
    ],
    "multi_event": true
  },

  // --- Confiança e impacto ---
  "assessment": {
    "overall_confidence": "HIGH|MEDIUM|LOW",
    "impact": "LOW|MEDIUM|HIGH",
    "high_impact_reasons": ["pagamento", ...],
    "confirmation_requirement": "NOT_REQUIRED|SIMPLE|MANDATORY|BLOCKED_ASK",
    "verdict": "SEI|NAO_SEI|PRECISO_CONFIRMAR|PRECISO_PERGUNTAR|NAO_POSSO_EXECUTAR"
  },

  // --- Confirmação ---
  "confirmation": {
    "state": "NOT_REQUIRED|NEEDS_CONFIRMATION|CONFIRMED|CORRECTED|CANCELLED|EXPIRED",
    "requested_at": null, "responded_at": null, "responded_by": null,
    "expires_at": "RFC3339|null"
  },

  // --- Roteamento ---
  "routing": {
    "rules_version": "0.1",
    "destinations": [ {"system": "direcione", "rule_id": "string",
                        "write_spec": {}, "status": "pending"} ]
  },

  // --- Entrega (por destino, independente) ---
  "delivery": [
    { "destination": "direcione", "package_id": "uuid",
      "status": "PENDING|DELIVERED|FAILED|RETRYING|EXPIRED|BLOCKED",
      "attempt": 1, "delivered_at": null, "error": null,
      "next_retry_at": null, "write_ref": null }
  ],

  // --- Genealogia ---
  "lineage": {
    "parent_package_id": "uuid|null",
    "parent_external_id": "string|null",
    "transformation": "captured|interpreted|confirmed|superseded|corrected|reconciled|rejected",
    "superseded_by": ["uuid"],
    "supercedes": ["uuid"]
  },

  // --- Evidência e integridade (V0, inalterados) ---
  "evidence": [],
  "integrity": {
    "serialization": "none|json-c14n",
    "sha256": "hex|null",
    "frozen_at": "RFC3339|null"
  },

  // --- Auditoria (respostas às 11 perguntas) ---
  "audit": {
    "received_at": "RFC3339", "parsed_at": "RFC3339|null",
    "confirmed_at": "RFC3339|null", "routed_at": "RFC3339|null",
    "corrections": [ {"correction_package_id": "uuid", "applied_at": "RFC3339"} ],
    "retries": [ {"destination": "string", "attempt": 1, "at": "RFC3339", "result": "string"} ]
  },

  "created_at": "RFC3339",
  "updated_at": "RFC3339"     // metadata de envelope, nunca altera raw nem eventos
}
```

### Invariantes de validação

Um pacote é **rejeitado antes de interpretação** (gera `record_type: rejeicao`, preservando o raw) quando: contrato/versão desconhecido; `source_message_id` duplicado; `tenant` ausente ou `unresolved` após binding; `package_id` ausente; período inválido; hash declarado não confere; `event_type` fora da taxonomia fechada. Um pacote é **bloqueado (PRECISO PERGUNTAR / NÃO POSSO EXECUTAR)** quando: `identity_status = conflicted`; entity_resolution `CONFLICTED` em evento HIGH-IMPACT; `confirmation_requirement = MANDATORY|BLOCKED_ASK` sem resposta.

## 4. Estágios obrigatórios (pipeline de genealogia)

| Estágio | Saída | Bloqueios |
|---|---|---|
| INGESTÃO | raw + source_message_id UNIQUE | duplicata exata → descartada com registro; sender unbound → processamento operacional bloqueado (apenas triagem) |
| TENANT_BINDING | tenant + actor bound/unbound | falha → pacote em `unresolved`; nenhum roteamento |
| OBRA_BINDING | canonical_obra_id + identity_status | ambíguo → `conflicted`; ausente → `unverified` |
| INTERPRETAÇÃO | interpretation.version N com events[] | nunca substitui raw; cada reinterpretação incrementa versão |
| ENTITY_RESOLUTION | resolution_level por entidade | CONFLICTED em HIGH-IMPACT → BLOCKED_ASK |
| ASSESSMENT | confidence + impact + verdict | HIGH-IMPACT → MANDATORY |
| CONFIRMATION | estado de confirmação | EXPIRED (24h default) → NEEDS_QUESTION manual, nunca auto-processa |
| ROUTING | destinations[] com rules_version | destino sem contrato v0.1 → BLOCKED |
| DELIVERY | delivery[] por destino | falha em B não afeta A nem C |
| AUDIT | respostas completas às 11 perguntas | qualquer lacuna = incidente de contrato |

## 5. O que este contrato NÃO define (mantido fora do escopo)

API, endpoint, fila física, retry scheduler, storage, LLM provider de runtime, autenticação do canal, MCP, e qualquer modificação nos schemas dos produtos. Isso é deliberado: o GATE 2 escolherá a implementação; o contrato só exige os **comportamentos observáveis** listados nos invariantes.
