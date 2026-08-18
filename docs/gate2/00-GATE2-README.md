# 00-GATE2-README — Runtime experimental do OPERA Gateway

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Base:** `main@aad9af9` · **Autor:** Manus AI
**Contrato de referência:** `opera-gateway-event-contract/0.1` (Gate 1, commit `3e0907d`, estado FROZEN)

## 1. Pergunta do Gate 2

> «Um runtime real consegue obedecer ao contrato congelado diante de mensagens humanas reais?»

O Gate 2 não tenta operar os produtos. Ele prova que o Gateway consegue **capturar, interpretar, duvidar, perguntar, confirmar e auditar sem inventar fatos**. O escopo autorizado é um runtime experimental isolado: um tenant de teste, banco replicado, credenciais exclusivamente experimentais, sem escritas em produção e sem ativação de nenhuma rota `candidate`.

## 2. Entregáveis

| Documento | Conteúdo |
|---|---|
| `GATE2-PREFLIGHT-TAXONOMY-ERRATA.md` | Errata da divergência 14×15 event types (sanada antes do runtime) |
| `01-ARCHITECTURE.md` | Arquitetura mínima em 10 módulos, fluxo e regras de separação |
| `02-TELEGRAM-INGESTION.md` | Ingestão real via Telegram, identidade estável, idempotência |
| `03-INTERPRETER.md` | Interpretação LLM governada por JSON Schema (REJECT/RETRY/AUDIT) |
| `04-ENTITY-RESOLUTION-RUNTIME.md` | Resolver tenant-escopo com os 4 níveis do contrato |
| `05-CONFIRMATION-LOOP.md` | Máquina de estados SIMPLE/MANDATORY/BLOCKED_ASK + correção com lineage |
| `06-AUDIT-AND-LINEAGE.md` | Journal, linha do tempo por pacote e reconstrução completa |
| `07-REAL-CORPUS-RESULTS.md` | 8 casos reais do Gate 1 contra o runtime |
| `08-ADVERSARIAL-RUNTIME-RESULTS.md` | Red team A–J contra o runtime real |
| `09-LLM-NONCONFORMITY-TESTS.md` | 13 ataques de não-conformidade do LLM |
| `10-GATE2-DECISION-RECORD.md` | Decisões, trade-offs, limitações conhecidas e pendências |

## 3. Veredito

**RESULTADO: APROVADO**

| Critério | Estado |
|---|---|
| Telegram real ingere texto | Evidência em `runtime/data/gate2.db` (§2) |
| RAW preservado | 18/18 pacotes íntegros + teste de violação §5 |
| Idempotência | Duplicata rejeitada como `pkg-rej-*`, zero evento operacional |
| Schema governa a saída | 18/18 schema-valid; 13/13 não-conformidades bloqueadas |
| Golden path | Executado end-to-end (doc 05) |
| Confirmação | 18 perguntas abertas com `NEEDS_CONFIRMATION`; rotas travadas |
| Lineage reconstruível | Journal completo: received → raw_stored → interpreted → resolved → assessed → updated |
| Corpus real | 8/8 executados |
| Adversarial A–J | 10/10 executados |
| Não-conformidade do LLM | 13/13 bloqueados |
| Cross-tenant | 0 vazamentos |
| Writes em produtos | **ZERO** |
| Rotas candidate ativadas | **ZERO** (todas `BLOCKED`/`blocked`) |
| UNSAFE_FAIL | **0** |
| SAFE_FAIL | **0** (reportado, não escondido) |

## 4. Onde estão as evidências

O código experimental vive em `runtime/` (fora de `docs/gate1/`, que permanece congelada). Os dados de execução estão em `runtime/data/`:

| Arquivo | Conteúdo |
|---|---|
| `runtime/data/corpus.db` | 18 pacotes do corpus real + adversarial |
| `runtime/data/gate2.db` | Golden path replay + idempotência + cross-tenant |
| `runtime/data/corpus-results.json` | Classificação caso a caso (PASS/SAFE_FAIL/UNSAFE_FAIL) |
| `runtime/data/nonconf-results.json` | 13 testes de não-conformidade |
| `runtime/data/gate2-metrics.json` | Métricas agregadas e veredito |
| `runtime/data/gate2-summary.json` | Resumo estruturado para auditoria |

Comando de inspeção: `python3 runtime/gateway_inspect.py runtime/data/corpus.db --list` ou `python3 runtime/gateway_inspect.py <DB> <package_id>`.

## 5. Regra de parada

O Gate 2 **não avança para o Gate 3**, não transforma o protótipo em produto, não habilita destinos e não resolve blockers externos (ER-B1, SECURITY DEFINER do Smart Cotações, preflight RED do Copiloto). A missão termina com a entrega deste relatório.

> Princípio final: «Quando souber, estruture. Quando houver risco, confirme. Quando faltar informação, pergunte. Quando não puder garantir segurança, não execute.»
