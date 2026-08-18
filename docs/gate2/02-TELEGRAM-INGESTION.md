# 02-TELEGRAM-INGESTION — Ingestão real e identidade estável

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Código:** `runtime/operagw/telegram_bot.py`, `runtime/operagw/pipeline.py`, `runtime/operagw/storage.py`

## 1. Modo experimental

O bot utiliza exclusivamente credenciais experimentais carregadas da variável `GATE2_BOT_TOKEN` (nunca no Git). O módulo opera em modo **polling** por padrão e suporta webhook apenas quando `GATE2_WEBHOOK_URL` é fornecida — não há webhook de produção criado. A credencial real não estava disponível durante a execução do Gate 2 (`GATE2_BOT_TOKEN` ausente), portanto o comportamento do transporte foi validado de duas formas complementares: verificação do handshake com a API do Telegram usando credencial deliberadamente inválida (tratamento limpo de `InvalidToken`, sem stack trace) e teste direto da lógica de ingestão injetando objetos `Update` sintéticos no `on_message`. Todas as afirmações de idempotência e cross-tenant abaixo foram demonstradas com a pipeline completa.

## 2. Identidade estável

Cada mensagem Telegram gera um identificador estável e determinístico conforme o contrato:

> `source_message_id = transport:channel_account_id:channel_message_id`

No runtime experimental: `telegram:bot6012345678:{update.message_id}`. Os campos `channel`, `channel_account_id`, `channel_message_id`, `source_message_id`, `actor`, `recorded_at`, `raw.content`, `raw.received_at` e o flag `edited/deleted` são preservados no envelope e na tabela `raw_messages` antes de qualquer interpretação (RAW FIRST).

## 3. Raw-first e imutabilidade

`store_raw` insere o relato humano integral com SHA-256 declarado; a tabela `raw_messages` é INSERT-only por convenção de código e re-inserções com conteúdo divergente lançam `DUPLICATE_ID_CONTENT_MISMATCH`. A validação do envelope recomputa o hash do `raw.content` e compara com `raw.sha256_declared` — qualquer divergência (inclusive adulteração manual do banco) é rejeitada com registro `schema_rejected` no journal. **Limitação conhecida:** o SQLite experimental não possui trigger físico `BEFORE UPDATE`; um UPDATE direto de DBA com autocommit persistiria. A governança do contrato (hash declarado + journal) cobre esse caso, e o trigger físico está documentado como pendência do Gate 3 (doc 10, §limitações).

## 4. Idempotência demonstrada

O teste obrigatório — enviar duas vezes o mesmo `update/message_id` — foi executado no replay do golden path (`runtime/data/gate2.db`, caso `real-01` ingerido duas vezes) e nos testes NC-04/NC-13:

| Ingestão | Resultado |
|---|---|
| 1ª (`real-01`) | Pacote `evento` criado, interpretado, confirmação exigida |
| 2ª (mesmo ID) | `REJECTED_PRE_INTERPRETATION`, `package_id=pkg-rej-*`, `duplicatas_blocked=1`, **nenhum segundo evento operacional** |

O pacote de rejeição permanece auditável (journal `rejection_recorded`) e referenciável. Idempotência é **demonstrável por query**: `SELECT source_message_id, COUNT(*) FROM raw_messages GROUP BY 1 HAVING COUNT(*)>1` retorna zero linhas.

## 5. Segurança de ingestão

O pré-check de rejeição (`pre_interpretation_checks`) executa antes da interpretação: tenant deve existir no binding, contrato deve ser `opera-gateway-event-contract/0.1`, `source_message_id` deve casar com a expressão `^[a-z0-9]+:[^:]+:[^:]+$` e não pode já existir no banco. Nenhum fuzzy match cross-tenant é permitido — o teste dedicado (tenant `obra-diferente`, mensagem nova) resultou em entidades `UNKNOWN`, zero resoluções para o tenant novo e `sender_binding` não inferido silenciosamente. Logs não imprimem o token (a variável é consumida em memória; em caso de erro, o módulo reporta apenas o tipo da falha).

## 6. UX mínima de resposta

`on_message` responde à mensagem de origem com o estado do pacote (`NEEDS_CONFIRMATION` → pergunta de confirmação; `REJECTED_PRE_INTERPRETATION` → motivo da rejeição). `reply_to_question` resolve a pergunta de confirmação mais recente do tenant via resposta textual (`confirma`/`corrige`/`cancela` ou texto livre para BLOCKED_ASK), preservando o pacote anterior e criando continuidade auditável (doc 05).
