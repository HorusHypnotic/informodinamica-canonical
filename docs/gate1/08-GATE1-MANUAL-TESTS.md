# 08 — TESTES MANUAIS DO GATE 1: CASOS REAIS

**Proveniência:** textos integrais do Corpus A do Gate 0 (`07-MVP-EXPERIMENT.md`, seção 2). Execução manual contra o contrato `opera-gateway-event-contract/0.1`. Nenhum runtime.

**Método de execução:** para cada caso, o texto original é alimentado mentalmente ao pipeline contratual (raw → interpretation → assessment → confirmation → routing → delivery → lineage), e o estado final esperado do envelope é materializado em `schemas/corpus/real-cases/fixture-real-XX.json`. A validação de schema foi executada com `schemas/validate-contract.py` e **todos os fixtures passam com 0 erros**.

**Critério de aprovação do Gate 1 por caso:** o veredito de assessment deve pertencer ao conjunto `{SEI, NAO_SEI, PRECISO_CONFIRMAR, PRECISO_PERGUNTAR, NAO_POSSO_EXECUTAR}` e o estado de confirmação deve ser consistente com ele. Ambiguidade não resolvida → `PRECISO_PERGUNTAR` + `BLOCKED_ASK` + rota `R-TRI-999` (triagem), **nunca** associação silenciosa.

---

## CASE-01 — `Levei dois marteletes da Domingos para o Bar do Índio. João ficou responsável. Um está com o cabo danificado.`

| Campo | Resultado esperado (executado) |
|---|---|
| RAW | Preservado integral; hash do texto registrado; `received_at` imutável |
| ENTITIES | martelete (ativo, classe sem ID — ER-B1, 0.95); obra "Domingos" (PROVISIONAL, candidate obra:dirceu-engenharia:galpao-quadruplo-domingos, 0.60); "Bar do Índio" (obra, UNKNOWN, 0.40); pessoa "João" (pessoa, UNKNOWN, 0.35) |
| ENTITY_STATUS | 1 PROVISIONAL fraca + 2 UNKNOWN → **entidades não resolvem determinísticamente** |
| EVENT(S) | 1) ASSET_TRANSFER (qtd 2, Domingos→Bar do Índio, responsável João, conf 0.55); 2) ASSET_DAMAGE (qtd 1, cabo danificado, disposal repair, conf 0.70). Genealogia `1 RAW → 2 EVENTS` via `package_id` comum e `event_id` `pkg:i` |
| CONFIDENCE | 0.55 / 0.70 (penalizadas por entidade UNKNOWN) |
| IMPACT | **HIGH** (baixa/dano relevante de ativo + gap ER-B1) |
| CONFIRMATION | `BLOCKED_ASK` → state `NEEDS_CONFIRMATION` com expiry 24h; pergunta explícita: "para qual local exatamente? o segundo martelete está danificado ou intacto?" |
| ROUTING | R-DIR-002 e R-VIS-002b — ambas **blocked** (sem master de ativos; contrato DIR-001 candidato). Fallback efetivo: triagem humana |
| EXPECTED_WRITE | Nenhum em produção. Em banco de teste replicado: registro `ocorrencias`-like com state pending-human |
| BLOCKERS | **ER-B1** (falta master de ativos no ecossistema); endpoint webhook Direcione não implementado; alias "Bar do Índio" fora do dicionário |
| AUDIT EXPECTATION | 1 raw → 2 events; lineage `transformation: captured`; confirmação registrada com `responded_by`/`responded_at`; nenhum write; delivery vazio |
| FINAL STATE | `NEEDS_CONFIRMATION` + rota blocked → triagem. Caso resolve o gap C27 do Gate 0 (master de ativos) |

## CASE-02 — `Faltam 30 sacos de cimento para a concretagem de quinta.`

| Campo | Resultado esperado (executado) |
|---|---|
| RAW | Preservado integral |
| ENTITIES | "cimento" → alias do dicionário (candidate `mat:copiloto:cimento-cpii`, PROVISIONAL 0.90); obra inferida por **binding remetente↔obra** (PROVISIONAL 0.75) |
| ENTITY_STATUS | Ambiguidade residual aceitável — quantidade, unidade e prazo explícitos |
| EVENT(S) | MATERIAL_NEED (30 sacos, needed_by quinta-feira, context "concretagem de quinta", conf 0.88; `occurred_at_estimated: true`) |
| CONFIDENCE | **HIGH** (0.88) — caso com maior chance de sucesso end-to-end |
| IMPACT | MEDIUM |
| CONFIRMATION | `SIMPLE` → 1 clique de confirmação; state `NEEDS_CONFIRMATION` |
| ROUTING | R-COP-003 (copiloto) — **candidate, não ativada** (preflight RED do Copiloto; alternativa REO) |
| EXPECTED_WRITE | `movimentacoes_estoque` em banco de teste replicado, somente pós-confirmação |
| BLOCKERS | Decisão de destino pendente (Copiloto RED vs REO) |
| AUDIT EXPECTATION | 1 raw → 1 event; confirmação em 1 clique; delivery state `PENDING` até entrega |
| FINAL STATE | `NEEDS_CONFIRMATION`; bom caso para calibrar STRUCTURING_TIME do experimento |

## CASE-03 — `João saiu da Domingos 14:20 e foi ajudar no Fábio.`

| Campo | Resultado esperado (executado) |
|---|---|
| RAW | Preservado integral |
| ENTITIES | João (pessoa, UNKNOWN 0.35); "Domingos" (PROVISIONAL 0.60); "Fábio" (PROVISIONAL 0.55) |
| ENTITY_STATUS | Pessoa nova sem dicionário → resolução indeterminada |
| EVENT(S) | PERSON_ALLOCATION (saída 14:20, destino Fábio, `duration_kind: unknown`, conf 0.62) |
| CONFIDENCE | MEDIUM (0.62) |
| IMPACT | **HIGH** — mudança crítica de equipe com duração indefinida |
| CONFIRMATION | `BLOCKED_ASK`: qualificar "ajudar" — visita? turno? diária? permanente? |
| ROUTING | R-COP-004 (copiloto) — **candidate** (mesmo bloqueio do Copiloto RED) |
| EXPECTED_WRITE | `alocacoes`/`presencas` em replica, somente após resposta |
| BLOCKERS | Taxonomia de presença do Copiloto quebrada (preflight RED, C5 do Gate 0); risco de redirecionar o MVP para Direcione como destino único |
| AUDIT EXPECTATION | raw + event + correção de escopo registrada em `audit.corrections` |
| FINAL STATE | `NEEDS_CONFIRMATION` + blocked — expõe o destino Copiloto como fragilidade sistêmica |

## CASE-04 — `Comprei 10kg de prego 17x27 por R$ 58,90.`

| Campo | Resultado esperado (executado) |
|---|---|
| RAW | Preservado integral; parsing de moeda `R$ 58,90` → `amount: 5890, currency: BRL` |
| ENTITIES | "prego 17x27" → alias canonical (candidate `mat:scq:prego-17x27`, PROVISIONAL 0.85); fornecedor **implícito, não declarado** → parte não criada silenciosamente |
| ENTITY_STATUS | Material resolve; fornecedor ausente é admissível (parte implícita) |
| EVENT(S) | MATERIAL_SALE (10 kg, R$ 58,90, conf 0.80) |
| CONFIDENCE | MEDIUM |
| IMPACT | **HIGH** — alteração financeira |
| CONFIRMATION | `MANDATORY`: valor confirmado por humano antes de qualquer write |
| ROUTING | R-SCQ-009c (smart_cotacoes) — **blocked** (HIGH-IMPACT financeiro; contratos SCQ-001 instáveis; blocker SECURITY DEFINER) |
| EXPECTED_WRITE | Nenhum no MVP (escrever apenas `supplier_quotes`/`cashback_ledger` em replica pós-confirmação quando destravado) |
| BLOCKERS | Fronteira HIGH-IMPACT financeiro não autorizada no MVP |
| AUDIT EXPECTATION | Evento financeiro classificado HIGH-IMPACT; sem write até confirmação humana |
| FINAL STATE | `NEEDS_CONFIRMATION` + blocked; valida a regra "dinheiro sempre confirma antes de escrever" |

## CASE-05 — `Precisamos pagar o fornecedor amanhã.`

| Campo | Resultado esperado (executado) |
|---|---|
| RAW | Preservado integral |
| ENTITIES | Fornecedor **não identificado** (CONFLICTED, confidence 0.10) |
| ENTITY_STATUS | Crédito crítico: anaphora "o fornecedor" sem referência resolvível |
| EVENT(S) | PAYMENT_NEED (due_at amanhã, payee/amount null, conf 0.30, `occurred_at_estimated: true`) |
| CONFIDENCE | **LOW** (0.30) |
| IMPACT | **HIGH** — obrigação financeira + compromisso externo |
| CONFIRMATION | **Obrigatória + conversa**: o gateway PERGUNTA "quem, quanto, qual fatura/nota"; state `NEEDS_CONFIRMATION` |
| ROUTING | `R-TRI-999` (triagem) — nenhum destino antes da resposta |
| EXPECTED_WRITE | **Nenhum**; permanece `NEEDS_CONFIRMATION` |
| BLOCKERS | Identificação do credor é bloqueio funcional, não técnico |
| AUDIT EXPECTATION | `raw → event LOW → pergunta → resposta do usuário → upgrade` registrado em lineage (`transformation: corrected`) |
| FINAL STATE | `NEEDS_CONFIRMATION`; prova do loop de conversação — evento incompleto não é "chutado" |

## CASE-06 — foto de ferramenta + legenda curta

**Fora do escopo do contrato v0.1 para escrita de destino** (foto entra no G4/G5), porém o envelope **define o comportamento esperado** que o contrato deve suportar: `raw.attachments[]` com `kind: photo`, `locator` + `sha256`; `interpretation` pode carregar visão como segundo signal com `model_ref` próprio; `evidence[]` referencia o anexo; `sensitivity` restrita quando houver rostos; confirmação exibe foto + legenda + classificação. Nenhum fixture no corpus — sem interpretação visual no v0.1.

## CASE-07 — áudio com múltiplos fatos

**Fora do escopo do contrato v0.1** (entra com o canal WhatsApp/áudio). Comportamento esperado pelo envelope: áudio original preservado em `raw.audio_locator` + `raw.audio_sha256`; transcrição gravada em `raw.content` com `derived_from_audio: true` — **marcado como derived, nunca substituto**; cada fato vira event com confidence penalizada pela camada de transcrição ("segunda camada de incerteza"); UX de confirmação com botão "ouvir original". Nenhum fixture no corpus — sem pipeline de áudio no v0.1.

## CASE-08 — `Manda mais 100 pra Domingos.` (ambíguo)

| Campo | Resultado esperado (executado) |
|---|---|
| RAW | Preservado integral |
| ENTITIES | "100" sem unidade/material (UNKNOWN 0.10); "Domingos" (PROVISIONAL 0.55 — obra? empresa? pessoa?) |
| ENTITY_STATUS | Ambiguidade estrutural tripla |
| EVENT(S) | `UNKNOWN_EVENT` (conf 0.20) com `payload.ambiguities`: "unidade/material ausente", "Domingos = obra? empresa? pessoa?", "ação: enviar material? dinheiro? pessoa?" |
| CONFIDENCE | LOW (0.20) |
| IMPACT | LOW (sem evento materializado) |
| CONFIRMATION | **Bloqueado** — `BLOCKED_ASK`; pergunta explícita "100 o quê? pra qual obra? pra quem?" |
| ROUTING | `R-TRI-999` (triagem); nenhum write |
| EXPECTED_WRITE | Nenhum |
| BLOCKERS | Nenhum — o bloqueio é comportamental proposital |
| AUDIT EXPECTATION | `raw → UNKNOWN_EVENT → pergunta → resposta → reinterpretação` com novo `package_id` e `parent_package_id` (linhagem `corrected`) |
| FINAL STATE | `NEEDS_CONFIRMATION`; **caso que define a credibilidade do sistema** — ambiguidade nunca é completada por inferência |

---

## Resultado agregado do corpus real

| Caso | Veredito | Confirmação | Write autorizado | Bloqueios expostos |
|---|---|---|---|---|
| 01 | PRECISO_PERGUNTAR* | BLOCKED_ASK | Não | ER-B1 (master de ativos), webhook Direcione ausente |
| 02 | PRECISO_CONFIRMAR* | SIMPLE | Réplica pós-confirmação | Decisão Copiloto RED vs REO |
| 03 | PRECISO_PERGUNTAR* | BLOCKED_ASK | Não | Preflight RED do Copiloto |
| 04 | PRECISO_CONFIRMAR* | MANDATORY | Não (HIGH-IMPACT) | Fronteira financeira do MVP |
| 05 | PRECISO_PERGUNTAR* | BLOCKED_ASK | Não | Credor não identificável |
| 06 | fora de escopo | — | — | Sem pipeline de visão no v0.1 |
| 07 | fora de escopo | — | — | Sem pipeline de áudio no v0.1 |
| 08 | PRECISO_PERGUNTAR* | BLOCKED_ASK | Não | Ambiguidade estrutural (intencional) |

**Verificação de schema:** todos os 6 fixtures executáveis do corpus real passaram no validador do contrato com **0 erros**.

**Aprovação do Gate 1 para o corpus real:** APROVADO, com três condições documentadas — (1) nenhum write de destino será ativado até destravar os bloqueios acima; (2) CASE-06 e 07 ficam fora do escopo v0.1 por desenho, não por omissão; (3) a credibilidade do sistema depende de o CASE-08 ser tratado como `UNKNOWN_EVENT` com pergunta obrigatória, o que o contrato v0.1 exige explicitamente.
