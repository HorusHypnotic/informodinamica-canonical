# 06-AUDIT-AND-LINEAGE — Reconstrução completa por package_id

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Ferramenta:** `runtime/gateway_inspect.py` (CLI mínima) · `runtime/inspect-corpus.sh` não existe; inspeção via SQL + CLI

## 1. O que o contrato exige reconstruir

Para qualquer `package_id`, o runtime consegue reconstruir todos os dezoito itens do requisito de observabilidade: remetente (`actor`), momento (`recorded_at`/`created_at`), canal (objeto `channel`), mensagem original (`raw.content`), modelo utilizado (`interpretation.__model_ref`), interpretação (`interpretation.events`), versão (`__interpretation_version`), entidades propostas (`events[].entities`), confidence (`events[].confidence`), impact (`assessment.impact`), veredito (`assessment.verdict`), confirmação (estado + pergunta em `confirmation_questions`), correções (`lineage.parent_package_id`, `record_type=correcao`), routing calculado (`routing.destinations`), delivery simulado (`delivery[].status = BLOCKED`), retries (`__retries`) e lineage completa.

## 2. Journal

Cada transição de estado é registrada em `package_journal` com timestamp e evidência JSON:

| Evento | Significado | Ocorrências no corpus (18 pacotes) |
|---|---|---|
| `received` | Ingestão | 18 |
| `raw_stored` | RAW persistido + SHA-256 | 18 |
| `interpreted` | LLM devolveu proposta | 18 |
| `schema_validated` | Validação Draft 2020-12 aprovada | 18 |
| `resolved` | Entidades resolvidas | 18 |
| `assessed` | Impacto + veredito + confirmação | 18 |
| `updated` | Transição de estado adicional | 54 |
| `rejection_recorded` | Rejeição pré-interpretation (idempotência) | 1 (dedicado) |

## 3. Lineage

Pacotes de correção e rejeição carregam `lineage.parent_package_id`, reconstruível por JOIN:

```sql
SELECT p1.package_id, p1.record_type, p1.lineage
FROM packages p1
WHERE p1.lineage->>'parent_package_id' IS NOT NULL;
```

No corpus real não houve correção humana (loop fechado), mas a genealogia multi-evento foi validada no adv-h (uma mensagem → PROGRESS_REPORT + PAYMENT, mesmo `source_message_id`, dois eventos com `event_id` distintos `package:…:1` e `package:…:2`).

## 4. Ferramenta de inspeção

CLI de 100 linhas: `python3 runtime/gateway_inspect.py <DB> --list` (tabela de pacotes) e `python3 runtime/gateway_inspect.py <DB> <package_id>` (visão completa: captura, RAW, interpretação, entidades, assessment, pergunta, rotas, delivery, lineage e journal). O mesmo resultado pode ser obtido por SQL puro sobre as seis tabelas — a CLI existe apenas para conveniência. Nenhum dashboard foi construído, por decisão deliberada do Gate 2.

## 5. Integridade criptográfica

Cada pacote carrega `raw.sha256_declared`; a auditoria independente (script `audit_corpus.py`, reexecutável) verificou SHA-256 recalculado contra o declarado em 18/18 pacotes — todos consistentes, mesmo após as tentativas de adulteração dos testes de não-conformidade (NC-08, NC-09).
