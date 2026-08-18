# OPERA Gateway Idempotência & Lineage — v0.1

**Estado:** `FROZEN — GATE 1` · **Versão:** `idempotency-lineage/0.1`
**Fontes normativas:** doc 03 §6 (Gate 0); invariantes 1, 7 e 8 do contrato canônico V0; §10 da missão Gate 0 (delivery model).

## 1. Chaves de idempotência (três camadas)

| Camada | Chave | Escopo | Garante |
|---|---|---|---|
| Ingestão | `source_message_id` = `transport:channel_account_id:channel_message_id` | UNIQUE global na ingestão | webhook duplicado e mensagem reenviada pelo canal não geram novo processamento |
| Documental | `package_id` (UUID, reenvio mantém o mesmo valor) | único por envelope | idempotência documental na entrega; reprocessamento idempotente |
| Destino | `dedupe_key` + `idempotency_key` = `package_id:event_id` | por destino | **double write** proibido no destino |

**Mensagem editada:** mesma `source_message_id` com flag `edited: true` → novo pacote de **correção** (`record_type: correcao`, lineage `corrected`), nunca novo evento paralelo. **Mensagem apagada:** flag `deleted: true` → marcador; raw preservado, nenhum write executado retroativamente.

**Duplicata semântica** (conteúdo semelhante reenviado minutos depois com message_id diferente): heurística de janela (5 min, mesmo sender, similaridade de texto) dispara **confirmação do autor** ("já registrei isso há X: duplicado?") — nunca descarte automático, nunca write duplicado.

**Partial delivery:** o retry repete somente o estado `FAILED/RETRYING` do destino; delivery states dos demais destinos permanecem.

## 2. Lineage (genealogia completa)

Cadeia obrigatória: cada transformação gera `lineage.transformation ∈ {captured, interpreted, confirmed, superseded, corrected, reconciled, rejected}` e, quando derivado, `parent_package_id`. Regras:

1. **Raw → interpretação:** a interpretação é camada derivada, referenciada por `interpretation.version`. Reinterpretações (nova resolução, correção de transcrição) incrementam a versão; versões anteriores permanecem acessíveis no audit.
2. **1 raw → N eventos:** eventos herdam o mesmo `package_id` e recebem `event_id = package_id:seq`. A genealogia vertical é 1:N no envelope; a entrega é N×M por destino — `delivery` carrega per-destination per-event state quando necessário (o GATE 2 pode normalizar delivery em tabela própria; o contrato exige apenas que o estado seja recuperável por (package, destination, event)).
3. **Correção:** `correcao` com `parent_package_id`; original `superseded_by`; destino aplica write de correção referenciando o write anterior. Histórico nunca é destruído.
4. **Rejeição:** `record_type: rejeicao` preserva o pacote rejeitado intacto (invariante do V0).
5. **Evidência:** cada anexo com `locator`+`sha256`+`availability` (V0); hash do pacote obrigatório ao congelar.

## 3. Casos protegidos (matriz de proteção)

| Ameaça | Proteção do contrato | Onde testada |
|---|---|---|
| Webhook duplicado | `source_message_id` UNIQUE na ingestão | ADV-F |
| Mensagem reenviada pelo usuário | idem | ADV-F |
| Retry do adapter | `package_id` + `dedupe_key` no destino | doc 07 (DIR) |
| Partial delivery | delivery state por destino | ADV-F, doc 05 |
| Double write | idempotency key no contrato do destino; write só com ack | doc 07 (DIR) |
| Mensagem editada | flag `edited` + pacote de correção | §11.2 do V0.8 Direcione (fonte), corpus caso G |
| Correção destruindo histórico | supersession, raw intacto | corpus caso G |

## 4. Auditoria mínima exigida (respostas às 11 perguntas)

O envelope + tabelas derivadas devem responder, sem exceção: quem disse (`actor`+`sender_binding`), quando disse (`recorded_at`), por qual canal (`channel`), conteúdo original (`raw`), qual modelo interpretou (`model_ref`), qual interpretação (`interpretation`+versão), o usuário confirmou (`confirmation`), quais sistemas receberam (`routing`+`delivery`), qual escrita ocorreu (`delivery.write_ref`), houve correção (`lineage`/`audit.corrections`), houve retry (`audit.retries`). Qualquer lacuna é incidente de contrato reportado no decision record.
