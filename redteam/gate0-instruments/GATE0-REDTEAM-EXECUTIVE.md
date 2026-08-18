# GATE0-REDTEAM-EXECUTIVE — Resumo executivo do ataque ao Gate 0

**Data:** 18/08/2026 · **Missão:** "Can our ruler lie to us?" — ataque aos instrumentos antes do campo. · **SHA-base:** fd1accf (`reconstruction/tpc-v0.9`) · **Branch:** `redteam/gate0-instruments` · **Governança:** canônico intocado; nada mergeado; nada canonizado; nenhum campo iniciado.

## 1. A pergunta da missão e a resposta

A missão perguntou se os instrumentos da Reconstruction conseguem testar a hipótese sem presumir que ela é verdadeira. A resposta é dupla e honesta. **A régua vigente mente:** o ECP-V0 classifica desfecho apenas quando a causa é representacional (critério 6), o que embute a hipótese dentro do outcome e torna a célula "degradação ausente + falha presente" impossível por definição — imunizando HYP-001-U por construção, exatamente como a válvula UNOBSERVED_PRECURSOR fazia na geração anterior. O episódio coordenacional, lido literalmente, não é registrável antes do outcome, o que tornaria qualquer amostra selecionada por falha. E o teste do pesquisador verde contra o vermelho mostrou que, com o instrumento vigente, **ambos podem obter resultados opostos nos mesmos casos apenas escolhendo classificações convenientes**.

**A régua corrigida não mente:** sete patches especificados (GATE0-PATCHES.md) removem as circularidades e fecham as válvulas. O desfecho é dividido em **ECOA** (falha coordenacional causalmente neutra, verificável sem conhecer nada de R) e **ECOB** (atribuição mecanística separada, jamais usada no modelo preditivo). O vetor de preditores perde X (que era outcome-derived) e ganha um anexo de pré-registro para as escolhas de julgamento de F e C. O episódio passa a ser aberto por objetos pré-outcome e amostrado universalmente — garantindo os verdadeiros negativos. A válvula UNOBSERVED_PRECURSOR é fechada por checklist de cobertura e busca ativa obrigatória, tornando a **REFUTATION observável e somável**. Aplicados os patches a 22 casos sintéticos, cada caso tem **classificação única obrigatória** — incluindo dois casos (#1 desvio de conduta oral, #22 cobertura alta sem precursor) que são derrota genuína da hipótese no campo.

## 2. Veredito

**PASS_WITH_REVISIONS.** Os instrumentos na forma vigente falhariam (o ECO é circular); os problemas são corrigíveis pelos patches especificados; e a autorização para iniciar o piloto G1+G2 só existe **depois** da aplicação explícita dos patches e do pré-registro das escolhas de julgamento. Das dez perguntas do critério de sucesso, nove respondem SIM após os patches; a décima (autorização para campo) responde NÃO ainda — condição que esta missão deliberadamente manteve.

## 3. O que foi reportado porque tinha que ser reportado

Circularidade confirmada no ECP-V0; X outcome-derived (removido do vetor; dividido em covariável de uso + subclasse de ECOB); cadeia R→I→A→ECO reclassificada de descrição causal linear (falsificada por feedback, loops e ações sem deformação prévia) para **protocolo de medição** com R congelado em t0; dois limites inegáveis de cegamento (escolha de referente; atribuição causal em episódios de documentação visivelmente defeituosa); e um gap de construto descoberto no caso sintético #7 (F/C não capturam ambiguidade intrínseca de documento perfeito). O teste de trivialidade foi honesto: após remover a circularidade, a ambição remanescente vive inteira no teste B6 (incremento sobre os mesmos dados brutos) — e se B6 empatar, o programa colapsa em trivialidade e é abandonado por condição publicada.

## 4. Artefatos

| Artefato | Conteúdo |
|----------|----------|
| GATE0-VERDICT.md | Veredito geral e por instrumento + 10 perguntas respondidas |
| GATE0-ECO-CIRCULARITY-AUDIT.md | Adversário A: circularidade do critério 6, separação ECOA/ECOB, matriz 2×2 completa |
| GATE0-REPRESENTATION-INSTRUMENT-AUDIT.md | Adversário B: classificação informacional de P/F/U/C/R/X; decisão C+D sobre X |
| GATE0-RIAECO-AUDIT.md | Adversário C: contraexemplos à linearidade; reclassificação como modelo de medição |
| GATE0-EPISODE-AUDIT.md | Adversário D: abertura/fechamento pré-outcome; verdadeiros negativos |
| GATE0-BLINDING-PROTOCOL-V0.md | Dois papéis, fluxos proibidos, limites honestos, desenho de confiabilidade |
| GATE0-CLASSIFICATION-RULES-V0.md | Patch 5: categorias fechadas por evidência objetiva |
| GATE0-SYNTHETIC-CASES.md | 22 casos + teste verde×vermelho antes/depois dos patches |
| GATE0-ABANDONMENT-CRITERIA.md | 6 hipóteses com as três colunas preenchidas + teste de trivialidade |
| GATE0-PATCHES.md | 7 patches no formato ANTES/PROBLEMA/DEPOIS/POR QUE/EFEITO |
| GATE0-REDTEAM.html | Página visual "CAN OUR RULER LIE TO US?" |

## 5. Estado de governança

TPC v0.8 canonical = **untouched**. reconstruction/tpc-v0.9 = **candidate** (inalterada por esta missão; patches não aplicados automaticamente). redteam/gate0-instruments = **adversarial work**. Nenhum artefato desta missão é canônico. A próxima autorização possível é: decisão explícita de aplicar patches → pré-registro → piloto G1+G2. O Ultimate Breaker permanece preparado e não executado.
