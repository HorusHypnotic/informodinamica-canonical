# GATE 1 — Contrato de Eventos OPERA Gateway v0.1 (congelado)

**Branch:** `gate1/opera-gateway-event-contract-v0.1` · **Base:** `main@aad9af9` · **Data do freeze:** 2026-08-18
**Status:** CONGELADO. Nenhum runtime. Nenhuma alteração em produtos. Nenhum write de produção.

## O que é o Gate 1

O Gate 1 é a entrega normativa que transforma o envelope canônico V0 (documento do informodinamica-canonical) no contrato executável **`opera-gateway-event-contract/0.1`** — a superfície de aceitação que qualquer runtime futuro (ingestor, interpretador, roteador, destinos) terá que satisfazer. Ele responde ao critério de aceite do Gate 0: *"o contrato de eventos existe, é testável sem runtime e cobre o corpus real e adversarial"*.

O princípio central do contrato é **RAW FIRST**: o relato humano original é preservado integralmente e nunca é substituído; toda interpretação, correção, supersessão ou rejeição é um novo pacote com genealogia explícita (`lineage.parent_package_id`). Os cinco vereditos canônicos (`SEI | NAO_SEI | PRECISO_CONFIRMAR | PRECISO_PERGUNTAR | NAO_POSSO_EXECUTAR`) fecham a porta para associação silenciosa de ambiguidade, e o fallback universal `R-TRI-999` garante que nenhum evento se perde nem é inventado.

## Índice dos documentos

| # | Documento | Conteúdo |
|---|---|---|
| 00 | GATE1-README | Este índice |
| 01 | EVENT-CONTRACT-V0.1 | Contrato normativo central: envelope, invariantes, vereditos, regras rígidas |
| 02 | EVENT-TAXONOMY-V0.1 | Taxonomia fechada de 15 event types, cada um com origem em enum/tabela de código existente |
| 03 | ENTITY-RESOLUTION-V0.1 | Regras de resolução (DETERMINISTIC/PROVISIONAL/CONFLICTED/UNKNOWN) e bloqueios ER-B1/B2 |
| 04 | CONFIDENCE-AND-CONFIRMATION-V0.1 | Matriz confidence × impact → requirement (SIMPLE/MANDATORY/BLOCKED_ASK) |
| 05 | ROUTING-AND-DELIVERY-V0.1 | Regras de rota, estados de delivery, fallback R-TRI-999 |
| 06 | IDEMPOTENCY-AND-LINEAGE-V0.1 | `source_message_id` único, `package_id` imutável, rejeição de duplicata, correção por descendente |
| 07 | DESTINATION-CONTRACT-DIRECIONE-V0.1 | Contrato candidato DIR-001 do 1º destino (Direcione), com pré-requisitos |
| 08 | GATE1-MANUAL-TESTS | Corpus real: 8 casos do Gate 0 com texto integral e estado esperado por caso |
| 09 | GATE1-ADVERSARIAL-TESTS | Red team A–J contra as hipóteses mais frágeis do contrato |
| 10 | GATE1-DECISION-RECORD | Decisão de freeze, alternativas, consequências e critérios de aceite |

## Schemas machine-readable

| Arquivo | Papel |
|---|---|
| `schemas/gateway-envelope-v0.1.schema.json` | JSON Schema Draft 2020-12 do envelope completo (referência cruzada ao event-types) |
| `schemas/event-types-v0.1.json` | Enum fechado de 15 event types + payload required por tipo |
| `schemas/routing-rules-v0.1.json` | Tabela fechada de rotas R-* com status (candidate/blocked/always) |
| `schemas/validate-contract.py` | Validador de fixtures contra o envelope (sem runtime — documento executável) |
| `schemas/build-corpus.py` | Gerador do corpus de fixtures (documental) |
| `schemas/corpus/real-cases/` | 6 fixtures executáveis dos casos reais (01–05, 08) |
| `schemas/corpus/adversarial/` | 10 fixtures da suíte adversarial (a–j) |

**Execução da validação:** `python3 docs/gate1/schemas/validate-contract.py docs/gate1/schemas/corpus/**/*.json` — resultado do Gate 1: **16/16 fixtures, 0 erros de schema**.

## Resultado do Gate 1

**APROVADO.** O contrato v0.1 cobre integralmente o corpus real do Gate 0 (8 casos, textos integrais), passa na suíte adversarial A–J com zero writes e zero rotas candidate ativadas, e expõe os cinco bloqueadores herdados (master de ativos ER-B1, webhook Direcione, preflight Copiloto, contratos SCQ, binding remetente↔obra) como pré-requisitos documentados dos gates seguintes. Casos 06 (foto) e 07 (áudio) estão fora do escopo v0.1 por desenho — o envelope define seu comportamento esperado, mas nenhum write de destino é permitido até os gates de mídia (G4/G5).

**Próximo passo autorizado:** Gate 2 (ingestão Telegram + interpretação + confirmação, 1 tenant de teste, banco replicado), sem ativar rotas candidate.
