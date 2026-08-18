# GATE0-FINAL-HYGIENE-REPORT — Relatório da higiene documental final do Gate 0

**Data:** 18/08/2026 · **Missão:** GATE 0 FINAL HYGIENE — somente higiene documental; nenhuma decisão sobre patches; nenhum Gate 1; nenhum Ultimate Breaker.

## 1. Verificação dos três estados de governança (seção 1 da missão)

| Estado | Esperado | Verificado | Conformidade |
|--------|----------|------------|--------------|
| main (TPC v0.8 canonical) | UNTOUCHED | `aad9af9` — nenhum arquivo fora de `reconstruction/` e `redteam/` foi alterado; diff contra a branch adversarial lista apenas artefatos da própria Reconstrução (candidate por design) | ✅ |
| `reconstruction/tpc-v0.9` | CANDIDATE | `fd1accf` — idêntico à base histórica declarada; nada da Reconstruction foi alterado nesta missão | ✅ |
| `redteam/gate0-instruments` | ADVERSARIAL WORK | `acb2432` → (pós-commit desta missão) — HEAD esperado confirmado antes do trabalho | ✅ |

Três estados conformes; trabalho prosseguiu.

## 2. Correção textual #1 (GATE0-SYNTHETIC-CASES.md)

O teste verde×vermelho ainda trazia «REFUTATION obrigatória» para o caso #22 — incompatível com a V1. Substituído pelo estado formal vigente: «ECOA-POSITIVE + UNOBSERVED descartado + ECOB≠representacional (célula de derrota obrigatória)». Lógica do caso inalterada; condição de derrota somável preservada. Segunda ocorrência no mesmo arquivo (linha do caso #1, «REFUTATION (ecob não-representacional)») corrigida igualmente para a formulação V1, pois a coluna descreve o regime vigente pós-patches.

## 3. Correção textual #2 (GATE0-VERDICT.md)

Pergunta crítica #3 ainda listava o caso #8 entre exemplos de ECOA positivo. Removida apenas essa referência, com nota de que o caso #8 é ECOA-NEGATIVE + marcador externo após a correção V1. Demais exemplos (#1, #4, #12, #22) permanecem válidos.

## 4. Varredura de consistência (seção 4)

Sweep completo de todos os 15 artefatos por REFUTATION, caso #8, ECOA=1, ECOA-POSITIVE, UNOBSERVED_PRECURSOR e contagens agregadas. Classificação completa em GATE0-HYGIENE-CONSISTENCY-SWEEP.md. Síntese: **6 STALE_REFERENCE corrigidas** (caso #22 no teste verde×vermelho, caso #1 na tabela de sintéticos, pergunta #3 do veredito, taxa de REFUTATION no abandono, duas formulações do patch 5 e 5 trechos da página HTML com marcação histórica), **4 HISTORICAL_REFERENCE preservadas** (documentos V0, o diff, o registro do checkpoint e as descrições de motivação original dos patches, todas agora explicitamente marcadas como V0/históricas) e **13 ocorrências CURRENT** confirmadas sem necessidade de alteração. Nenhuma inconsistência produzida pelas duas correções formais permanece. A varredura não reinterpretou conteúdo nem melhorou documentos além das inconsistências identificadas.

## 5. Revalidação mecânica dos 10 invariantes

| # | Invariante | Verificação | Resultado |
|---|------------|-------------|-----------|
| 1 | Caso #8 = ECOA-NEGATIVE + marcador externo | GATE0-SYNTHETIC-CASES.md linha #8; GATE0-CLASSIFICATION-RULES-V1.md §3 | ✅ |
| 2 | Caso #22 = ECOA-POSITIVE + UNOBSERVED descartado + ECOB≠representacional | Linhas #22 da tabela e do teste verde×vermelho | ✅ |
| 3 | REFUTATION não existe como categoria vigente | V1 §2 (partição lexical, regra 6); nenhuma ocorrência vigente sem marcação | ✅ |
| 4 | Referências históricas a REFUTATION marcadas como V0 | Patches §5 ANTES, V0.md inteiro, DIFF, checkpoint, HTML (V0: REFUTATION) | ✅ |
| 5 | Classificações alteradas = 2/22 | Reexecução registrada: #8 (material) e #22 (rótulo) | ✅ |
| 6 | Conteúdo material de derrota do caso #22 preservado | «célula de derrota somável» mantida em todas as menções | ✅ |
| 7 | Veredito = PASS_WITH_REVISIONS | GATE0-VERDICT.md §1, header e executivo | ✅ |
| 8 | G1+G2 NÃO AUTORIZADO | Condição publicada no veredito (§1 e pergunta #10); nada executado | ✅ |
| 9 | Nenhum arquivo canônico alterado | main = aad9af9 intacto; diff só `reconstruction/` e `redteam/` | ✅ |
| 10 | Nenhum patch aplicado à Reconstruction automaticamente | reconstruction/tpc-v0.9 = fd1accf, sem alterações desde a base | ✅ |

Dez de dez conformes.

## 6. Pacote de decisão — os 7 patches

A tabela abaixo é **recomendação técnica do agente**. Não constitui aprovação; nenhum patch foi aplicado por causa dela. Os patches estão em GATE0-PATCHES.md.

| Patch | Problema que corrige | Efeito | Risco residual | Recomendação |
|-------|----------------------|--------|----------------|--------------|
| 1 — ECOA/ECOB | ECP-V0 circular: critério 6 exige causa representacional para o ECO existir (outcome contém a hipótese) | Habilita as 4 células da matriz R×ECOA; derrota observável pelo próprio corpus | ECOB é sempre julgamento humano — taxa de "indeterminado" pode ser alta e reduzir informação | **ACCEPT** |
| 2 — X removido do vetor | X (1−erros de interpretação) é outcome-derived: usava o desfecho como preditor | Elimina garantias artificiais de associação; teste só com informação pré-outcome | A perda de X reduz poder preditivo; se a hipótese dependia de X, será abatida (corretamente) | **ACCEPT** |
| 3 — Pré-registro de F/C | Referente, inventário e emparelhamento à escolha do avaliador (testado: casos manipuláveis) | Julgamento residual limitado e reportável; classificação única | Rubricas-âncora ainda não existem; exigirão refinamento no piloto de confiabilidade | **ACCEPT** |
| 4 — Episódio pré-outcome | Episódio só registrável após o outcome → selection bias total; sem verdadeiros negativos | Habilita denominador de P(ECOA) e o braço preditivo | Abertura por "objetos pré-outcome" depende do inventário documental; episódios sem dossiê serão invisíveis | **ACCEPT** |
| 5-corrigido — Partição lexical | UNOBSERVED_PRECURSOR/REFUTATION sobrepostos (válvula de imunização na classificação) | Partição exclusiva e exaustiva; célula de derrota somável; checklist de cobertura obrigatório | Checklist de cobertura requer inventários por tipo de episódio em t0 — custo operacional real | **ACCEPT** |
| 6 — Cegamento operacional | Cegamento declarado sem regra; common-method bias residual | Dois mundos separados; `BLINDING=IMPOSSIBLE` exclui braços preditivos pequenos | Limite prático: obras pequenas podem ficar apenas descritivas, reduzindo base preditiva | **ACCEPT** |
| 7 — Cadeia como medição | Linearidade R→I→A→ECO falsificada por feedback A→R, loop I↔R, ECO→revisão | Loops viram covariáveis testáveis; R congelado em t0 inalterável | A ontologia processual original (o fenômeno como fluxo) é parcialmente abandonada — rebaixa ambição | **ACCEPT** |

A recomendação uniforme de ACCEPT reflete que todos os sete patches aumentam a falseabilidade e nenhum foi desenhado para salvar a hipótese; três deles (1, 2, 7) criam caminhos de derrota que o instrumento vigente fechava. A decisão final pertence ao usuário, e patches podem ser aceitos individualmente com consequências diferentes (por exemplo, aplicar 1+5 sem 4 mantém o instrumento circular em parte — o braço preditivo só nasce com 1+3+4+5 em conjunto).

## 7. Conclusão da higiene

O registro agora diz exatamente o que aconteceu: as correções formais V1 estão aplicadas, as referências obsoletas foram corrigidas ou marcadas como históricas, os 10 invariantes estão confirmados, e o estado de decisão permanece pendente. **Limpe o registro. Preserve as derrotas. Pare.**

## HUMAN DECISION REQUIRED

Opções:

1. **ACCEPT ALL 7 PATCHES** — autoriza uma missão posterior específica de aplicação + pré-registro.
2. **ACCEPT SELECTED PATCHES** — informar quais patches; consequências documentadas acima.
3. **REJECT / RETURN** — mantém a Reconstruction inalterada.

Esta missão não toma a decisão. A próxima ação depende de decisão humana explícita.
