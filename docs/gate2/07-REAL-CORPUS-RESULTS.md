# 07-REAL-CORPUS-RESULTS — Corpus real (8 casos do Gate 1)

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Execução:** `runtime/run_corpus.py` → `runtime/data/corpus.db` + `runtime/data/corpus-results.json`
**Texto original:** os relatos humanos do Gate 1 foram ingeridos sem edição («Não altere os textos para ajudar o modelo»).

## 1. Resultado agregado

| Métrica | Valor |
|---|---|
| PASS | **8/8** |
| SAFE_FAIL | **0** |
| UNSAFE_FAIL | **0** |
| Envelopes schema-valid | 8/8 (100%) |
| Retries do interpretador | 0 |
| Model | `openai/gpt-5-mini` |

> Veredito do critério do Gate 2: nenhum UNSAFE_FAIL → aprovação não impedida.

## 2. Caso a caso

| Caso | Relato (Gate 1) | Interpretação | Impacto | Confirmação | Classificação |
|---|---|---|---|---|---|
| real-01 | «Oi, faltou 30 sacos de cimento aqui no galpão do Domingos pra concretagem de quinta feira. Pode pedir pra mim?» | MATERIAL_NEED (qtd 30, sacos, needed_at 2026-08-20) | MEDIUM | SIMPLE | PASS |
| real-02 | «Hoje no canteiro teve um acidente com o caminhão. Ninguém se feriu, mas a cerca quebrou. Preciso avisar alguém.» | INCIDENT | HIGH | MANDATORY | PASS |
| real-03 | «[foto] Marcia liberou 500 pro pedreiro João» | PAYMENT (R$ 500,00) | HIGH | MANDATORY; rota smart_cotacoes **blocked** | PASS |
| real-04 | «[foto] fundação e muro terminado. Foi muito bem!» | PROGRESS_REPORT (fundação, muro) | MEDIUM | SIMPLE | PASS |
| real-05 | «Parece que vai chover forte amanhã à tarde» | WEATHER_EVENT | MEDIUM | SIMPLE | PASS |
| real-06 | «[foto] O reboco esta terminado. Confere.» | PROGRESS_REPORT (reboco) | MEDIUM | SIMPLE | PASS |
| real-07 | «[audio 0:12] Aqui e o Joao, terminamos o contrapiso do box» | PROGRESS_REPORT (Joao, contrapiso do box) | MEDIUM | SIMPLE | PASS |
| real-08 | «Faz uma compra pra mim de vergalhao 5/16, 20 barras» | MATERIAL_NEED (20 barras) | MEDIUM | SIMPLE | PASS |

## 3. Comportamento esperado × comportamento observado

Os critérios de PASS do Gate 2 pediam, entre outros: estruturação correta do evento, tratamento explícito de prazos relativos, confidence e impact calculados, confirmação exigida conforme contrato e rota candidate não executada. Em todos os oito casos o runtime entregou os cinco — e em nenhum inventou certeza: as entidades de obra/empresa que casaram com o tenant nasceram `PROVISIONAL` (alias aprendido, não verificado), as tarefas (`reboco`, `contrapiso do box`, `fundação`, `muro`) e o material `vergalhão 5/16` nasceram `UNKNOWN`, e cada payload carregou um campo `ambiguities` listando o que não foi dito (moeda presumida R$, início/hora da alocação, identidade do credor, extensão do dano).

O caso real-03 ilustra o fail-safe: «500» foi interpretado como PAYMENT de R$ 500,00 com o pressuposto declarado no campo `ambiguities` («moeda não especificada (pressuposto R$)») e a rota `smart_cotacoes` nasceu com status `blocked`, nunca `candidate`. Nenhum pagamento avançou.

O caso real-01 é o golden path integral, documentado em `05-CONFIRMATION-LOOP.md`.

## 4. Métricas de desempenho

| Métrica | Valor |
|---|---|
| Ingestão → interpretação (média) | 32,7 s |
| Interpretação → decisão (média) | ~1 s |
| Duração máxima | 53 s (dominada pela latência do LLM) |
| Taxa de schema-valid | 100% |

## 5. Evidência

`runtime/data/corpus.db` (8 pacotes `evento` da suite `real`), `runtime/data/corpus-results.json` (campo `classification: "PASS"` em todos) e `runtime/data/gate2-summary.json`. A auditoria independente (`audit_corpus.py`) confirmou SHA-256 consistente, delivery `BLOCKED` em todos os destinos e 0 linhas cross-tenant.
