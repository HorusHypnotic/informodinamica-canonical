# 10 — DECISION RECORD — GATE 1: CONTRATO DE EVENTOS CONGELADO v0.1

**Data:** 2026-08-18 · **Branch:** `gate1/opera-gateway-event-contract-v0.1` · **Repositório:** `informodinamica-canonical`
**Decisão:** CONGELAR o contrato de eventos `opera-gateway-event-contract/0.1` como contrato normativo do GATE 1, autorizando a progressão para o GATE 2 (ingestão Telegram + interpretação) exclusivamente contra este contrato e seus schemas.

## 1. Contexto

O Gate 0 concluiu que a hipótese central ("uma pessoa alimenta múltiplos sistemas por um canal único") é viável e barata de testar, mas que **não existe infraestrutura de eventos compartilhada em código** — nove event models isolados e um envelope canônico V0 apenas em documento. O GATE 1 tinha uma única entrega: transformar o envelope V0 em contrato executável (schema + regras + vereditos), testá-lo manualmente contra o corpus real e a suíte adversarial, e congelá-lo sem runtime.

## 2. Alternativas consideradas

| Alternativa | Motivo de rejeição |
|---|---|
| Adotar um envelope aberto (CloudEvents genérico) | Perde os campos de genealogia, confirmação e veredito que os 5 invariantes do Gate 0 exigem; custo de aderência futuro maior que o de extensão |
| Congelar schema por sistema-destino em vez de um envelope único | Repetiria a fragmentação atual (9 models isolados); viola o contrato de fronteira §18 |
| Pular o freeze e partir direto para a ingestão | Sem contrato congelado, o experimento mediria o LLM e o canal, não a hipótese estrutural; qualquer mudança de schema no meio invalidaria a baseline |
| v0.1 com tipos abertos (`any`) para payloads | Adiado: tipo aberto esvazia a promessa de roteamento determinístico; a taxonomia fechada de 15 tipos cobre o corpus real inteiro |

## 3. Decisão

Congelar o conjunto de 10 documentos + 3 schemas como **contrato v0.1 imutável**: qualquer mudança posterior exige novo número de versão semântica do contrato (`contract` field rígido rejeita valores diferentes) e decisão registrada. O runtime do MVP é proibido de gravar qualquer envelope com `contract` divergente.

## 4. Consequências e compromissos assumidos

1. **RAW FIRST é lei:** `raw` nunca é atualizado; interpretação, correção e supersessão são sempre novos pacotes com lineage. Este é o compromisso estrutural que sustenta a imutabilidade dos destinos (missao_eventos, audit_logs_db, hash chain REO).
2. **Vereditos canônicos:** toda interpretação termina em `SEI | NAO_SEI | PRECISO_CONFIRMAR | PRECISO_PERGUNTAR | NAO_POSSO_EXECUTAR`; ambiguidade nunca vira write.
3. **Confirmação antes de write HIGH-IMPACT:** dinheiro, dano de ativo e alocação crítica exigem `MANDATORY` ou `BLOCKED_ASK`.
4. **Fallback universal:** rota `R-TRI-999` (triagem) é o único destino sempre ativo; nenhum evento se perde nem é inventado.
5. **Idempotência documental:** `source_message_id` globalmente único + `package_id` imutável; duplicata é `record_type: rejeicao`.
6. **Resolução de entidade explícita:** `DETERMINISTIC | PROVISIONAL | CONFLICTED | UNKNOWN`; PROVISIONAL fraca + impact HIGH força `BLOCKED_ASK`.

## 5. Evidências do red team (aprovação do Gate 1)

O contrato foi executado manualmente sobre o corpus do Gate 0 e a suíte adversarial, com 16 fixtures gerados por construção e validados por `schemas/validate-contract.py`:

| Evidência | Resultado |
|---|---|
| Validação de schema dos 16 fixtures (6 reais + 10 adversarial) | **0 erros** |
| Casos reais com texto integral | 8 executados (06/07 fora de escopo v0.1 por desenho, comportamento definido no envelope) |
| Suíte adversarial A–J | 10 casos; vereditos no conjunto canônico; **zero writes**; zero rotas candidate ativadas |
| Genealogia multi-evento (§17 Gate 0) | Fixture ADV-H materializa `1 RAW → 2 EVENTS` com lineage vertical |
| Correção pós-confirmação | Fixture ADV-G materializa `correcao` com `parent_package_id`, original intacto |
| Duplicidade de ingestão | Fixture ADV-F materializa `rejeicao` com lineage `rejected` |

## 6. Critérios de aceitação do Gate 1 (todos satisfeitos)

1. Contrato v0.1 existente como documento normativo com schema JSON Draft 2020-12 validável — ✅
2. Taxonomia de eventos fechada, derivada exclusivamente de enums/tabelas em código existente — ✅ (15 tipos, origem documentada por tipo)
3. Corpus real executado com textos integrais e estado esperado materializado em fixtures — ✅
4. Suíte adversarial A–J com veredito canônico em todos os casos — ✅
5. Nenhum runtime, nenhuma alteração em produtos, nenhum write de produção — ✅
6. Bloqueadores expostos documentados como pré-requisitos dos gates seguintes — ✅ (ER-B1, webhook Direcione, preflight Copiloto, contratos SCQ/CTRL)

## 7. Bloqueadores herdados pelo GATE 2+

| Bloqueador | Origem | Gate que resolve |
|---|---|---|
| ER-B1: falta master de ativos (CASE-01/08/ADV-E/H) | Ecossistema (gap C27) | G6 ou decisão de master externo |
| Webhook Direcione `/api/public/hooks/gateway` não implementado | Direcione v0.9 §11.2 | G2 (pré-requisito p do contrato DIR-001) |
| Preflight RED do Copiloto (CASE-03, rotas COP-001..004) | Copiloto C5 | G2 — decisão Copiloto vs REO como 2º destino |
| Blocker SECURITY DEFINER do Smart Cotações (rotas SCQ) | Smart Cotações | G4+ (fora do MVP) |
| Binding remetente↔obra inexistente (CASE-02/05/ADV-I) | Operação | G2 (cadastro mínimo de 1 tenant) |

## 8. Próximos passos autorizados

Progressão ao **GATE 2** (ingestão Telegram + interpretação + confirmação, 1 tenant de teste, banco replicado), **sem** ativar nenhuma rota candidate e **sem** escrever em qualquer destino até que os pré-requisitos da tabela acima sejam destravados por decisão humana. O contrato v0.1 é o oracle de aceite de cada fixture do experimento.
