# GATE0-CLASSIFICATION-RULES-V1 — Regras de classificação corrigidas (correção formal dos patches)

**Data:** 18/08/2026 · **Natureza:** correção de contradições formais identificadas na revisão dos patches (GATE0-CLASSIFICATION-RULES-V0 e GATE0-PATCHES patch 5). **Não cria conceitos, documentos ou fases novas** — é a versão corrigida do mesmo documento de regras. V1 substitui V0 na branch adversarial; o patch 5 é substituído pelo patch 5-corrigido no diff.

## 1. As contradições corrigidas

Duas contradições formais foram identificadas na revisão dos patches. **Primeira:** V0 definia UNOBSERVED_PRECURSOR e REFUTATION com definições sobrepostas — a linha de UNOBSERVED exigia "ECOA-POSITIVE + cobertura ≥ limiar + nenhuma divergência detectada + busca ativa negativa", enquanto a linha de REFUTATION incluía "cobertura excelente com busca ativa que não encontrou precursor", o que é exatamente a mesma condição; as duas categorias ficavam mutuamente satisfazíveis pelo mesmo dado, e a definição alternativa de REFUTATION ("ECOA-POSITIVE + ECOB≠representacional/indeterminado") conflitava com a primeira por não exigir checklist. O par não era uma partição. **Segunda:** V0 não declarava o estatuto de eventos externos sem incompatibilidade coordenacional — o ECOA exige o critério 3 (incompatibilidade observável entre ações/representações), mas a auditoria ECO admitia força maior como "ECOA positivo" (caso #8), contradizendo o próprio critério 3: queda de energia paralisa obra **sem** que haja duas versões incompatíveis de artefato.

## 2. A partição corrigida — categorias mutuamente exclusivas e exaustivas

As categorias classificam o **episódio** (nunca o evento isoladamente) e obedecem à hierarquia de decisão a seguir, na ordem exata. A primeira regra satisfeita determina a categoria; as demais tornam-se inacessíveis. Esta ordem elimina a sobreposição.

| Ordem | Categoria | Condições necessárias E suficientes (fechadas) |
|-------|-----------|-----------------------------------------------|
| 1 | **MISSING_DATA** | Checklist de completude aplicado ao dossiê registra incompletude identificável (tarefa, inventário, congelamento ou registros da janela ausentes) **que antecede a classificação do outcome** |
| 2 | **MEASUREMENT_FAILURE** | Evidência técnica objetiva da falha do snapshot R (timestamp ausente, arquivo corrompido) com registro da falha **datado antes ou na origem do snapshot** |
| 3 | **ECOA-NEGATIVE** | Nenhuma das regras 1–2; dossiê completo; critérios 1–5 do ECOA avaliados; critério 3 (incompatibilidade verificável) **não** atendido OU critério 4 (consequência operacional) não atendido |
| 4 | **ECOA-POSITIVE** | Nenhuma das regras 1–3; critérios 1–5 atendidos com evidência documental independente (inclui o critério 3: incompatibilidade verificável entre ações/representações) |
| 5 | **UNOBSERVED_PRECURSOR** | ECOA-POSITIVE + checklist de cobertura da janela com escore ≥ limiar pré-registrado + divergência R/F/C/C não detectada nos dados disponíveis + busca ativa documentada de précursores falhou |
| 6 | **ECOA-POSITIVE + ECOB** | ECOA-POSITIVE e UNOBSERVED_PRECURSOR descartado; atribuição ECOB é registrada como sub-categoria descritiva (representacional, capacidade, incentivo, recurso, restrição física, planejamento, competência, externo, múltiplo, indeterminado) — ECOB **nunca** altera a categoria da regra 4–6; apenas descreve |

**Exclusividade provada:** cada regra exige a negação das anteriores (ordem lexical) e condições próprias não redutíveis às demais; REFUTATION deixa de ser categoria própria — era sinônimo parcial de ECOA-POSITIVE com ECOB não-representacional ou cobertura alta sem precursor, e essa dupla função era a origem da sobreposição. O conteúdo da antiga REFUTATION é agora expresso como **(ECOA-POSITIVE, UNOBSERVED descartado, ECOB ≠ representacional)** — uma célula da matriz observável e somável, sem rótulo que conflite com UNOBSERVED. **Exaustividade:** todo episódio com dossiê é classificável pela regra 1–6; não há estado residual.

## 3. Falhas externas sem incompatibilidade coordenacional

Correção do segundo conflito, alinhando o instrumento aos seus próprios critérios: o ECOA exige cinco critérios, e o critério 3 (incompatibilidade verificável entre representações/ações de agentes interdependentes) é parte da definição do desfecho coordenacional neutro. Portanto:

- **Evento externo sem incompatibilidade coordenacional (queda de energia, chuva, catástrofe, força maior pura): NÃO é ECOA.** É ECOA-NEGATIVE para o episódio (a consequência operacional existe, mas o critério 3 falha). A causa é registrada como "externo, sem componente coordenacional" — fora do escopo do instrumento, sem imunização: não vira UNOBSERVED nem REFUTATION; simplesmente não entra no corpus de desfechos coordenacionais.
- **Evento externo COM incompatibilidade coordenacional (a queda de energia é consequência de duas equipes trabalhando com cronogramas incompatíveis sobre o mesmo circuito): É ECOA-POSITIVE**, com ECOB externo ou múltiplo. A força externa participa do episódio sem definir o desfecho.
- Essa correção retira o caso #8 da contagem de ECOA-POSITIVE e reposiciona-o como ECOA-NEGATIVE com marcador externo — sem alterar o número de classes nem criar categoria nova: apenas aplica o critério 3 como escrito.

## 4. Reexecução dos 22 casos sintéticos contra as regras V1

| # | Caso | V0 | V1 | Mudança? | Justificação |
|---|------|----|----|----------|--------------|
| 1 | Desvio de conduta combinado verbalmente | ECOA=1 (ecob não-representacional) | ECOA-POSITIVE, UNOBSERVED descartado, ECOB-competência | Não | Critérios 1–5 atendidos; cobertura alta elimina UNOBSERVED |
| 2 | Representação ruim + nenhum ECO | ECOA=0 | ECOA-NEGATIVE | Não | Sem critério 3/4 |
| 3 | Dados ausentes | MISSING_DATA | MISSING_DATA | Não | Checklist de incompletude |
| 4 | Múltiplas causas | ECOA=1 + ECOB-múltiplo | ECOA-POSITIVE + ECOB-múltiplo | Não | Critérios 1–5; ECOB descritor |
| 5 | Leitura errada de documento perfeito | ECOA=1 | ECOA-POSITIVE + ECOB-competência/interpretação | Não | Critérios 1–5 atendidos pela consequência; divergência detectada elimina UNOBSERVED |
| 6 | Documento ruim compensado por experiência | ECOA=0 | ECOA-NEGATIVE | Não | Sem consequência |
| 7 | Documento perfeito interpretado incorretamente | ECOA=1 | ECOA-POSITIVE + ECOB-representacional | Não | Consequência operacional + incompatibilidade entre ação e documento |
| 8 | Queda de energia paralisa obra | ECOA-POSITIVE + ECOB-externo | **ECOA-NEGATIVE + marcador externo (sem componente coordenacional)** | **SIM** | Critério 3 falha: nenhuma incompatibilidade entre representações; correção formal aplicada |
| 9 | Duas plantas atualizadas e divergentes | ECOA=1 ou 0 conforme desfecho | ECOA conforme consequência: se houve, ECOA-POSITIVE + ECOB-representacional | Não | C é divergência observável (critério 3 atendido por registro) |
| 10 | Plano antigo ainda fiel | ECOA=0 | ECOA-NEGATIVE | Não | Critério 3/4 falham |
| 11 | Revisão nova com erro | ECOA=1 | ECOA-POSITIVE + ECOB-representacional | Não | Critérios 1–5 |
| 12 | Rastreabilidade perfeita de conteúdo falso | ECOA=1 + ECOB-competência | ECOA-POSITIVE + ECOB-competência (desinformação) | Não | Critérios 1–5; MUT-009 mantém desinformação como deformação |
| 13 | Falha pega a tempo | ECOA=0 (quase-ECO) | ECOA-NEGATIVE + covariável de detecção | Não | Critério 4 falha (sem consequência) |
| 14 | Múltiplos ECOs de um incidente | ECOA=1 (evento único) | ECOA-POSITIVE + ECOB-múltiplo; severidade acumulada | Não | Sem mudança material |
| 15 | Documento inexistente | ECOA=1 | ECOA-POSITIVE + ECOB-representacional | Não | Ausência total = incompatibilidade com o espelho esperado; divergência detectada |
| 16 | Equipe muda no meio da janela | ECOA=0 | ECOA-NEGATIVE + covariável de quebra | Não | Sem consequência coordenacional |
| 17 | Divergência sutil sem consequência | ECOA=0 | ECOA-NEGATIVE | Não | Critério 4 falha |
| 18 | Divergência entre avaliadores R | DISPUTED | DISPUTED | Não | Métrica pública de divergência |
| 19 | Evidência destruída por incêndio | ECOA=1 + ECOB-indeterminado | ECOA-POSITIVE + ECOB-indeterminado | Não | Critérios 1–5 atendidos por registro datado |
| 20 | Ação fiel a documento errado | ECOA=1 | ECOA-POSITIVE + ECOB-representacional | Não | Critérios 1–5; R congelado em t0 captura a deformação |
| 21 | Dois episódios aninhados | ECOA=0 ambos | ECOA-NEGATIVE ambos | Não | Granularidade fixada antes |
| 22 | Cobertura alta + busca ativa negativa + ECO | REFUTATION | **ECOA-POSITIVE, UNOBSERVED descartado, ECOB ≠ representacional (célula de derrota)** | **SIM (formal)** | Materialmente o mesmo resultado — derrota somável —, mas o rótulo REFUTATION foi removido por sobreposição com UNOBSERVED; a célula agora é descrita pela composição das regras 4–6 |

## 5. Registro de mudanças

Duas mudanças de classificação: o caso #8 muda de ECOA-POSITIVE para ECOA-NEGATIVE (o instrumento agora não registra força maior pura como desfecho coordenacional — coerente com o critério 3); o caso #22 muda de rótulo (REFUTATION → ECOA-POSITIVE com UNOBSERVED descartado e ECOB não-representacional), sem mudança material no conteúdo de derrota — a célula continua somável e é expressa sem conflito com UNOBSERVED. Nenhuma outra classificação mudou: 20 de 22 preservados. A exclusividade da partição passa a ser testável por dois avaliadores sem discricionariedade residual de escolha de categoria: a ordem lexical decide, e as condições de cada regra são checklist-driven (não julgamento).

## 6. Efeito sobre os outros artefatos (registrado, não alterado nesta correção)

GATE0-SYNTHETIC-CASES.md: casos #8 e #22 atualizados pela tabela acima. GATE0-VERDICT.md e GATE0-PATCHES.md: o patch 5 é substituído pela versão corrigida (partição lexical); o conteúdo de REFUTATION sobrevive como célula descrita pela composição das regras 4–6. GATE0-ECO-CIRCULARITY-AUDIT.md: a menção a "REFUTATION observável" passa a referir-se à célula ECOA-POSITIVE/UNOBSERVED-descartado/ECOB não-representacional. GATE0-ABANDONMENT-CRITERIA.md: "taxa de REFUTATION" passa a ser "taxa da célula de derrota (regra 6 com ECOB≠representacional)". GATE0-REDTEAM-EXECUTIVE.md: caso #8 deixa de contar como ECOA=1. Nenhum outro artefato muda de conteúdo.
