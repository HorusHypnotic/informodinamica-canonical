# 05-CONFIRMATION-LOOP — Pergunta, confirmação e correção com lineage

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Código:** `runtime/operagw/confirmation.py` · **Banco:** `runtime/data/corpus.db` (`confirmation_questions`), `gate2.db`

## 1. Golden path obrigatório

O caso «Faltam 30 sacos de cimento para a concretagem de quinta.» foi executado end-to-end (`gate2.db`, caso `real-01`):

| # | Critério | Evidência |
|---|---|---|
| 1 | Mensagem recebida | `received` no journal, `recorded_at` 2026-08-18 |
| 2 | RAW preservado | `raw_messages` com SHA-256; conteúdo íntegro até o fim |
| 3 | Tenant identificado | `tenant:manus-qa:dirceu-engenharia:galpao-quadruplo-domingos` (binding do bot de QA) |
| 4 | Sender binding avaliado | `sender_binding=bound` via tenant do canal |
| 5 | Event type | `MATERIAL_NEED` (interpretação v0.1, modelo gpt-5-mini) |
| 6 | Quantidade | `quantity = 30` |
| 7 | Unidade | `unit = sacos` |
| 8 | Prazo relativo | `needed_at = 2026-08-20` com `ambiguities`: «"quinta feira" interpretada como 2026-08-20» — prazo tratado explicitamente, não silenciosamente |
| 9 | Confidence | `confidence_level` 0.8 calculado pelo modelo |
| 10 | Impact | `MEDIUM` (matriz determinística de `MATERIAL_NEED`) |
| 11 | Confirmação exigida | `MATRIX[0.8, MEDIUM] = SIMPLE` → estado `NEEDS_CONFIRMATION`, pergunta SIMPLE emitida |
| 12 | Resposta humana | `reply_to_question` aceita `confirma`/`corrige`/`cancela` + texto livre |
| 13 | Estado final | `updated` no journal (54 transições no corpus); estados `confirmed|corrected|cancelled|expired` implementados |
| 14 | Routing calculado | `R-COP-003` → `copiloto` |
| 15 | Rota NÃO executada | `delivery[0].status = BLOCKED` |
| 16 | Audit completo | `python3 runtime/gateway_inspect.py runtime/data/gate2.db <package_id>` |

## 2. Máquina de estados

O estado do pacote segue `received → interpreted → needs_confirmation → confirmed|corrected|cancelled|expired|rejected`. Três tipos de pergunta, conforme o contrato:

| Tipo | Quando | Comportamento no runtime |
|---|---|---|
| SIMPLE | Confiança adequada + impacto baixo/médio | Mensagem curta «Entendi: faltam 30 sacos de cimento para quinta na obra X. Confirmar?», estados `CONFIRMED`/`CANCELLED` |
| MANDATORY | Alto impacto (PAYMENT, ASSET_DAMAGE, MATERIAL_SALE) | Resumo completo exigido antes de qualquer encaminhamento; estado final só via resposta explícita |
| BLOCKED_ASK | Informação ausente impede estruturação | Pergunta exata sobre o dado faltante (ex.: adv-e «Consertou ele hoje» → «quem foi consertado? o que?») |

## 3. Correção com continuidade auditável

Uma correção de texto livre gera um novo pacote `record_type=correcao` com `lineage.parent_package_id` apontando para o pacote original; a interpretação anterior permanece intacta (nunca apagada), `answered_by`/`answer_at` são registrados e o estado do pacote anterior transita para `corrected`. Isso foi executado no replay do golden path (correção de quantidade de 30→25 sacos) e no caso adversarial adv-g («Correção: nao foi 30 sacos, foi 25»), onde o runtime classificou como `UNKNOWN_EVENT`/`NAO_SEI` porque não pôde ancorar a correção — comportamento seguro por padrão.

## 4. Expiração

Perguntas nascem com `expires_at`; após expiração, o estado transita para `expired` e o pacote fica inerte — nenhuma rota é calculada após expiração. O expiry não foi acionado no corpus (execução contínua), mas os estados e journal `expired` estão implementados.

## 5. Resultado do loop no corpus

Das 18 perguntas emitidas, todas estão em `NEEDS_CONFIRMATION` (o corpus é de ingestão, sem loop humano real). **Nenhum pacote deixou o estado `NEEDS_CONFIRMATION` sem resposta humana.** Todas as 18 rotas calculadas permaneceram `BLOCKED` — confirmação nunca virou encaminhamento no Gate 2.
