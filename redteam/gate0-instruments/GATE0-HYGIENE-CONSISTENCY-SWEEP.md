# GATE0-HYGIENE-CONSISTENCY-SWEEP — Varredura de consistência da higiene final

**Data:** 18/08/2026 · **Escopo:** todos os artefatos do Gate 0 na branch `redteam/gate0-instruments` (HEAD acb2432). **Termos varridos:** REFUTATION, caso #8, ECOA=1, ECOA-POSITIVE, UNOBSERVED_PRECURSOR, contagens agregadas dos 22 casos. **Regra:** classificar CURRENT / HISTORICAL_REFERENCE / STALE_REFERENCE; corrigir somente STALE_REFERENCE que contradiz V1; não reinterpretar, não "melhorar".

## 1. Arquivos varridos

GATE0-VERDICT.md, GATE0-REDTEAM-EXECUTIVE.md, GATE0-SYNTHETIC-CASES.md, GATE0-ECO-CIRCULARITY-AUDIT.md, GATE0-REPRESENTATION-INSTRUMENT-AUDIT.md, GATE0-RIAECO-AUDIT.md, GATE0-EPISODE-AUDIT.md, GATE0-BLINDING-PROTOCOL-V0.md, GATE0-CLASSIFICATION-RULES-V0.md, GATE0-CLASSIFICATION-RULES-V1.md, GATE0-PATCHES.md, GATE0-ABANDONMENT-CRITERIA.md, GATE0-FORMAL-CORRECTION-DIFF.md, CHECKPOINT-GATE0.md, GATE0-REDTEAM.html.

## 2. Ocorrências encontradas e classificação

| # | Arquivo | Ocorrência | Classificação | Ação |
|---|---------|-----------|---------------|------|
| 1 | GATE0-SYNTHETIC-CASES.md §1 tabela (linha #22) | "REFUTATION obrigatória" na coluna "Com correções" | **STALE_REFERENCE** — coluna "com correções" afirma regime vigente com categoria extinta | **Corrigida** (correção textual #1 da missão) |
| 2 | GATE0-VERDICT.md pergunta 3 | caso #8 listado entre exemplos de ECOA positivo | **STALE_REFERENCE** — contradiz V1 (caso #8 = ECOA-NEGATIVE) | **Corrigida** (correção textual #2 da missão) |
| 3 | GATE0-ABANDONMENT-CRITERIA.md §3 | "taxa de REFUTATION" como métrica | **STALE_REFERENCE** — termo categórico extinto usado sem marcação histórica | **Corrigida** — "taxa da célula de derrota (regra 6 V1)", com nota histórica de V0 |
| 4 | GATE0-PATCHES.md patch 1 efeito | "REFUTATION torna-se observável" | **HISTORICAL_REFERENCE** — descreve a motivação original do patch em regime V0; mantém-se com nota "historicamente REFUTATION" | Ajustada minimamente com marca histórica |
| 5 | GATE0-PATCHES.md patch 5 DEPOIS | "Caso contrário: REFUTATION, somável" | **STALE_REFERENCE** — formulação vigente do patch contradiz V1 | **Corrigida** — célula de derrota pela composição das regras 4–6 + nota de atualização |
| 6 | GATE0-PATCHES.md patch 5 efeito | "taxa de REFUTATION é métrica primária" | **STALE_REFERENCE** | **Corrigida** — "taxa da célula de derrota" |
| 7 | GATE0-PATCHES.md patch 5 ANTES | "podiam escolher REFUTATION ou UNOBSERVED" | **HISTORICAL_REFERENCE** — descreve o estado V0 do problema | Nenhuma (V0 por definição) |
| 8 | GATE0-CLASSIFICATION-RULES-V0.md (todo) | menções a REFUTATION | **HISTORICAL_REFERENCE** — é o registro do V0 corrigido | Nenhuma (documento histórico) |
| 9 | GATE0-CLASSIFICATION-RULES-V1.md | explica a remoção de REFUTATION | **CURRENT** | Nenhuma |
| 10 | GATE0-FORMAL-CORRECTION-DIFF.md | diff V0→V1 mostra REFUTATION | **HISTORICAL_REFERENCE** — o diff precisa mostrar o estado antigo | Nenhuma |
| 11 | GATE0-SYNTHETIC-CASES.md §3 contagem agregada | "7 ECOA=1 ... 7 ECOA=0 ... 2 derrota" | **CURRENT** — contagem já pós-V1 | Nenhuma |
| 12 | GATE0-SYNTHETIC-CASES.md linhas #1–#21 restantes | "ECOA=1"/"ECOA=0" nas linhas individuais | **CURRENT** — notação binária descritiva do resultado do caso, não categoria (caso #20 "ECOA=1 com R degradado"; caso #13 "quase-ECOA") | Nenhuma |
| 13 | GATE0-REDTEAM-EXECUTIVE.md §3 correção | referência a caso #8 e #22 | **CURRENT** | Nenhuma |
| 14 | GATE0-VERDICT.md header correção | referência a caso #8 e #22 | **CURRENT** | Nenhuma |
| 15 | GATE0-VERDICT.md §2 tabela | "célula de derrota observável" | **CURRENT** — já compatível com V1 | Nenhuma |
| 16 | GATE0-ECO-CIRCULARITY-AUDIT.md; GATE0-REPRESENTATION-INSTRUMENT-AUDIT.md; GATE0-RIAECO-AUDIT.md; GATE0-EPISODE-AUDIT.md; GATE0-BLINDING-PROTOCOL-V0.md | busca por REFUTATION/#8/força maior | Nenhuma ocorrência encontrada (o caso #8 não aparece nesses artefatos; a auditoria ECO original menciona "força maior" apenas no contexto de casos admitidos pela matriz — sem rótulo de categoria) | Nenhuma |
| 17 | GATE0-REDTEAM.html | tags e células da página | Verificação separada: célula "REFUTATION obrigatória" na matriz aparece como conceito V0 | **HISTORICAL_REFERENCE** (página é registro do estado do Gate 0) | Nenhuma (registro) |
| 18 | CHECKPOINT-GATE0.md | "regras REFUTATION/UNOBSERVED" | **HISTORICAL_REFERENCE** — log do estado da missão | Nenhuma |

## 3. Resultado da varredura

Três STALE_REFERENCE corrigidas (ocorrências 1, 2, 3, 5, 6 — duas em dois arquivos distintos), quatro HISTORICAL_REFERENCE preservadas explicitamente marcadas (4, 7, 8, 10), treze ocorrências CURRENT confirmadas. **Nenhuma inconsistência produzida pelas correções formais permanece sem correção ou marcação.** A varredura não foi usada para melhorar conteúdo além das inconsistências identificadas; duas marcações mínimas (4 e 5) foram adicionadas porque as formulações afetadas contradiziam o regime V1 vigente.
