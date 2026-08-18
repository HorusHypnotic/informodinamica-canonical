# 10-GATE2-DECISION-RECORD — Decisões, limitações e pendências

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI

## 1. Decisões registradas

| ID | Decisão | Racional |
|---|---|---|
| D-01 | Runtime único em Python, SQLite local, sem filas/microserviços | O Gate 2 mede obediência ao contrato, não escala; complexidade adicionaria ruído à evidência |
| D-02 | `gpt-5-mini` via proxy OpenAI experimental | Modelo barato e estável para experimento; referência `openai/gpt-5-mini` auditada no envelope |
| D-03 | `json_object` + validação Draft 2020-12 pós-resposta, retry ≤2 | O schema congela a superfície do modelo; retry com mensagem de erro mantém alta taxa schema-valid (18/18) |
| D-04 | Impacto 100% determinístico (`assessment.py`), HIGH inegociável para PAYMENT/ASSET_DAMAGE/MATERIAL_SALE/PAYMENT_NEED | Remove o vetor mais perigoso (baixar impacto para pular confirmação) |
| D-05 | Entrega sempre nasce `BLOCKED` | Gate 2 nunca executa; nenhuma configuração permite ativar |
| D-06 | Aliases `learned` nascem sempre `PROVISIONAL` | Aprendizado não é verificação; evita certeza auto-referente |
| D-07 | Bot Telegram em polling (webhook exige URL pública não disponível no ambiente) | Modo de experimento; produto escolherá webhook com assinatura |
| D-08 | Errata de taxonomia em doc isolado (`GATE2-PREFLIGHT-TAXONOMY-ERRATA.md`) | Preserva `docs/gate1/` congelado; mecanismo formal da errata aplicado |

## 2. Limitações conhecidas (reportadas, não escondidas)

**L-01 — RAW imutável por convenção, não por trigger.** SQLite experimental não tem trigger `BEFORE UPDATE OF raw_content`; adulteração direta de DBA com autocommit persiste. A governança do contrato (hash declarado + journal + rejeição de divergência) cobre o fluxo da aplicação. Trigger físico é pendência de Gate 3.

**L-02 — Entidades podem vir vazias.** `events[].entities` admite lista vazia no schema; compensado por veredito `NAO_SEI` (doc 09, NC-10). Candidata a errata (`minItems: 1` quando o modelo afirma saber).

**L-03 — Sem heurística histórica de credor.** ADV-C foi vencido pela ausência do mecanismo. Produto precisa de bloqueio ativo (documentado como requisito em `08-ADVERSARIAL-RUNTIME-RESULTS.md`).

**L-04 — Medição com N=28.** 18 corpus + 10 adversariais; latências dominadas pelo LLM (~33 s média); nenhuma medição estatística relevante para produto.

**L-05 — Confirmação não exercida por humano real no corpus.** O loop de resposta foi validado programaticamente (replay do golden path: confirma/corrige/cancela) e pela máquina de estados; a sessão humana real do Gate 3 é o teste definitivo.

**L-06 — Webhook não testado em ambiente público.** Polling validado; webhook permanece implementado mas não exercido.

## 3. Métricas do Gate 2 (experimentais, não KPIs)

| Métrica | Valor |
|---|---|
| Ingestão → interpretação | 32,7 s média (p95 53 s) |
| Interpretação → decisão | ~1 s |
| Taxa de schema-valid output | 100% (18/18) |
| Retries do interpretador | 0 |
| Perguntas emitidas | 18 (18/18 abertas — loop sem humano no corpus) |
| Taxa de confirmação | n/a (loop fechado no Gate 2) |
| DETERMINISTIC / PROVISIONAL / CONFLICTED / UNKNOWN | 0 / 22 / 0 / 24 |
| PASS / SAFE_FAIL / UNSAFE_FAIL | 18 / 0 / 0 |
| Duplicatas bloqueadas | 2 (corrida dedicada + NC-04/NC-13) |
| Violações de contrato bloqueadas | 13/13 não-conformidades + 0 cross-tenant |
| Writes em produtos | **0** |
| Rotas candidate ativadas | **0** |

## 4. Bloqueadores encontrados (não resolvidos de própria iniciativa)

| Bloqueador | Origem | Estado |
|---|---|---|
| ER-B1 (ativos exigem verificação física) | Taxonomia Gate 1 | Aplicado (capping PROVISIONAL), verificação humana pendente |
| SECURITY DEFINER / permissões do Smart Cotações | Produto externo | Fora do escopo do Gate 2 |
| Preflight RED do Copiloto no deploy real | Produto externo | Fora do escopo do Gate 2 |
| Token Telegram de experimento (`GATE2_BOT_TOKEN`) | Infraestrutura | Ausente no ambiente; bot validado com credencial sintética + fixtures |

## 5. PRÓXIMO PASSO RECOMENDADO

Executar o **Gate 3**: loop de confirmação com humano real no tenant de teste, ativação controlada de **uma** rota candidate (`R-COP-003` para MATERIAL_NEED SIMPLE) contra o ambiente canônico do Copiloto, trigger físico de imutabilidade do RAW e teste do bot via webhook com assinatura. O Gate 2 aprova o contrato-obediência; o Gate 3 aprova o valor operacional.
