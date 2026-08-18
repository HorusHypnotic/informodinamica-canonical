# CHECKPOINT GATE 0 RED TEAM — 18/08/2026

## Estado
- Missão: GATE 0 RED TEAM (prompt completo em /home/ubuntu/upload/pasted_content.txt, 827 linhas, 27 seções + ordem final de 14 passos).
- Branch adversarial: `redteam/gate0-instruments`, base = fd1accf (`origin/reconstruction/tpc-v0.9`). Nada mergeado. Canônico intocado.
- Diretório de trabalho: /home/ubuntu/gate0-redteam/

## Artefatos do Gate 0 já escritos (em /home/ubuntu/gate0-redteam/)
1. GATE0-ECO-CIRCULARITY-AUDIT.md — CONCLUÍDO. Achado: critério 6 do ECP-V0 (origem interna como pré-requisito) cria circularidade — célula "não|sim" da matriz impossível por definição → HYP-001-U imunizada por construção. Correção: separar Camada A = ECOA (falha coordenacional causalmente neutra, critérios 1–5) + Camada B = ECOB (atribuição mecanística, categorias candidatas + "indeterminado"). Todas as 4 células da matriz R×ECOA agora possíveis.
2. GATE0-REPRESENTATION-INSTRUMENT-AUDIT.md — CONCLUÍDO. P, U, R = PRE-OUTCOME OBSERVABLE; F, C = DEPENDS ON RESEARCHER JUDGMENT (exigem pré-registro de referente/inventário/emparelhamento); X = DEPENDS ON ECO. Decisão sobre X: C+D (remover X do vetor preditivo + dividir em X₁=covariável de uso pré-outcome; X₂=subclasse de ECOB). Vetor preditivo do piloto: P, U, F, C, R(+moderador), X₁.
3. GATE0-RIAECO-AUDIT.md — CONCLUÍDO. Cadeia R→I→A→ECO: linearidade causal tem contraexemplos reais (feedback A→R, loop I↔R, ECO→revisão). Reclasificada como modelo de desenho de medição (ordem de congelamento), com 3 modificações: R congelado em t0 inalterável; eventos internos como covariáveis; ECOA com ECOB separado permitindo atribuição onde R não participou.
4. GATE0-EPISODE-AUDIT.md — CONCLUÍDO. Episódio V0 falha (não registrável antes do outcome → selection bias). Reconstruído com: abertura pré-outcome (tarefa, agentes, inventário, janela, congelamento), fechamento por fim natural/horizonte fixo, amostragem de TODOS os episódios (denominador → verdadeiros negativos). 3 objeções registradas (granularidade, sobreposição, convenção).

## Próximos artefatos (faltam):
- GATE0-BLINDING-PROTOCOL-V0.md — 2 papéis (AVALIADOR R vê só t0; AVALIADOR ECO vê evidência sem EO); documentar onde cegamento é impossível
- GATE0-CLASSIFICATION-RULES-V0.md — regras REFUTATION / UNOBSERVED_PRECURSOR / MISSING_DATA / MEASUREMENT_FAILURE com critérios independentes
- GATE0-SYNTHETIC-CASES.md — ≥20 casos sintéticos (lista obrigatória da seção 16: representação perfeita+ECO; ruim+sem ECO; dados ausentes; múltiplas causas; erro humano sem doc; doc ruim compensado por experiência; doc perfeito interpretado incorretamente; falha externa; conflito entre representações; velha porém correta; nova porém errada; rastreabilidade perfeita de conteúdo falso; falha detectada antes de consequência; múltiplos ECOs de um incidente) + teste pesquisador verde × vermelho (seção 15)
- GATE0-ABANDONMENT-CRITERIA.md — EVIDÊNCIA FAVORÁVEL / CONTRÁRIA / ABANDONMENT por hipótese
- GATE0-REDTEAM-EXECUTIVE.md — resumo executivo
- GATE0-VERDICT.md — veredito entre {PASS, PASS_WITH_REVISIONS, FAIL, INDETERMINATE} + respostas às 10 perguntas do critério de sucesso (seção 27)
- GATE0-REDTEAM.html — página "CAN OUR RULER LIE TO US?" com blocos R/I/A/ECO, cadeia visual com circularidade/leakage/subjetividade/pontos cegáveis, matriz 2×2 R×ECO (4 quadrantes possíveis)
- Depois: copiar para branch, commit + push origin redteam/gate0-instruments, entregar

## Veredito antecipado (para consistência)
- ECP-V0 como está: CIRCULAR → FAIL do instrumento vigente; corrigido (ECOA/ECOB): PASS_WITH_REVISIONS.
- H-EO: PASS_WITH_REVISIONS (pré-registro de escolhas + remoção de X).
- Cadeia: PASS (como modelo de medição com 3 modificações).
- Episódio: PASS_WITH_REVISIONS (3 fixações).
- UNOBSERVED_PRECURSOR: regras fechadas em GATE0-CLASSIFICATION-RULES-V0.
- Veredito geral: **PASS_WITH_REVISIONS** — instrumentos aplicáveis APÓS patches antes do campo; nenhuma coleta autorizada sem patches aplicados.
- Teste de trivialidade (seção 17): registrado — após remover circularidade, a hipótese reduz-se a "estado documental medido antes associa-se com falhas futuras além dos dados brutos"; não trivial pois inclui teste B6 (incremento) e critérios de abandono.
- Regra de reporte independente: aplicável; nenhuma narrativa otimizada.
