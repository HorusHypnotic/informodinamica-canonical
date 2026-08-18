# P0-PRE-REGISTRY — Pré-registro da coleta piloto (G1+G2, instrumentação)

**Data:** 18/08/2026 · **Status:** documento de pré-registro da coleta piloto. **NÃO canonizar.** **NENHUM DADO COLETADO NESTA MISSÃO — PARADA ANTES DO CAMPO.** O campo (G1+G2) só pode ser iniciado após assinatura deste documento por decisão humana, com as escolhas abaixo fixadas; qualquer alteração posterior precisa de justificativa pública de desvio.

**Proveniência de autoridade:** este pré-registro materializa os patches 1–7 aceitos por decisão explícita (HUMAN DECISION REQUIRED → ACCEPT ALL 7 PATCHES) e o registro de higiene do Gate 0 (partição V1, 10 invariantes). Instrumentos base: ECP-V0 pós-patches, TPC-CONSTRUCT-VALIDITY, TPC-STATISTICAL-ARCHITECTURE-V0, GATE0-CLASSIFICATION-RULES-V1, GATE0-BLINDING-PROTOCOL-V0, GATE0-ABANDONMENT-CRITERIA.

## 1. Escopo e desenho

O piloto é um estudo de **instrumentação** (2–3 obras), coorte prospectiva por episódio coordenacional, **sem pretensão preditiva confirmatória**. Unidades: episódios abertos pré-outcome (seção 3), aninhados em obras, aninhados em empresa. Saídas esperadas: confiabilidade interavaliador, primeira estimativa de ICC e incidência de ECOA, primeira base de verdadeiros negativos — que dimensionam G3–G5.

## 2. Escolhas de julgamento pré-registradas (Patch 3)

| Escolha | Regra pré-registrada | Onde está fixada |
|---------|----------------------|------------------|
| Referente de F por tipo de artefato | Declarado **antes** do snapshot t₀ de cada tipo (plantas→projeto aprovado de referência; cronogramas→linha de base contratual; especificações→norma/edital de origem) | Anexo A do dossiê de cada tipo, antes da coleta |
| Inventário de artefatos | Por tipo de episódio: todos os artefatos com endereço documental que a tarefa interdependente exige (lista fechada na abertura, editável apenas com marca de adição datada) | Anexo B na abertura do episódio |
| Emparelhamento de pares C | Grafo de artefatos declarado na abertura: pares (artefato A, artefato B) com obrigação de compatibilidade; sem pares declarados, sem C | Anexo B |
| Rubricas-âncora de divergência F/C | Três níveis por tipo: "mesmo conteúdo substantivo", "diferença nominal sem efeito", "divergência com efeito coordenacional" — usadas por avaliadores cegos antes de arbitragem | Anexo C |
| Escolha da unidade por episódio aninhado | Granularidade fixada na abertura (regra: a menor tarefa com interdependência e inventário próprio) | Anexo B |

Essas escolhas são variância reportada se divergirem entre avaliadores — não são corrigidas durante a coleta.

## 3. Episódio: abertura pré-outcome e amostragem universal (Patch 4)

Um episódio **abre** quando todos os objetos existem e são observáveis em t₀: tarefa/decisão interdependente com agentes identificáveis; inventário documental vinculado (Anexo B); snapshot R congelado (seção 4); janela declarada. **Fecha** por fim natural da tarefa ou horizonte fixo declarado (sugestão inicial: 30 dias, ajustável por tipo de episódio com justificativa). **Amostragem:** todos os episódios abertos na janela de coleta entram — amostragem universal, sem seleção por falha; episódios descobertos retrospectivamente não abrem.

## 4. Snapshot R congelado em t₀ (Patch 7)

O snapshot (medidas de P, U, F, C + R moderador, covariável X₁) é registrado na abertura e é **inalterável dentro da janela**. Edições, revisões ou loops R↔I↔A durante a janela são registrados como **covariáveis de processo** (timestamp, autor, artefato afetado) — nunca reclassificam o snapshot e nunca contam como deformação adicional que "explique" o desfecho depois do fato.

## 5. Vetor preditivo e outcome (Patches 1 e 2)

O outcome da hipótese é **ECOA** (5 critérios, causalmente neutro), seguido da **ECOB** descritiva (nunca preditiva). O vetor preditivo do piloto é **(P, U, F, C + R moderador) + X₁** (logs de consulta/acesso). **X₂ não é medido como preditor** — julgamentos de erro de interpretação são subclasse de ECOB. O instrumento de interpretação I permanece adiado.

## 6. Partição de classificação do episódio (Patch 5 corrigido — V1)

Ordem lexical, primeira regra satisfeita decide: (1) MISSING_DATA — checklist de completude com incompletude antecedente; (2) MEASUREMENT_FAILURE — evidência técnica da falha do snapshot datada antes/na origem; (3) ECOA-NEGATIVE — critério 3 ou 4 não atendido (inclui evento externo sem componente coordenacional); (4) ECOA-POSITIVE; (5) UNOBSERVED_PRECURSOR — ECOA-POSITIVE + checklist de cobertura ≥ limiar (abaixo) + busca ativa documentada e negativa; (6) ECOA-POSITIVE + ECOB (ECOB ≠ representacional é a **célula de derrota**, somável). REFUTATION não é categoria.

## 7. Parâmetros de medição pré-registrados

| Parâmetro | Valor pré-registrado |
|-----------|----------------------|
| Limiar do checklist de cobertura (UNOBSERVED_PRECURSOR) | escore ≥ 80% dos documentos-alvo do inventário presentes e legíveis; justificativa: acima da maioria das obras com documentação mínima funcional; qualquer outro limiar exige justificativa no anexo |
| Checklist de completude | 5 itens obrigatórios na abertura: tarefa/agente, inventário, snapshot, janela, evidência mínima do critério 1–2 |
| Checklists exigem registro antecedente | incompletude detectada ANTES da classificação do outcome |
| Meta de confiabilidade | kappa ≥ 0.7 (ocorrência); kappa por classe nominal reportado; taxa de DISPUTED pública |
| Cegamento | Dois mundos: avaliador R nunca vê ECOA/ECOB da janela; avaliador ECOA nunca vê snapshot R; arbitragem cega |
| BLINDING=IMPOSSIBLE | equipe ≤ 2 → braço apenas descritivo, excluído do estimando principal |

## 8. Métricas primárias e secundárias

Primárias: kappa de ocorrência (ECOA); incidência de ECOA por episódio; taxa da célula de derrota (regra 6, ECOB ≠ representacional); taxa de DISPUTED. Secundárias: kappa por classe nominal; taxa de indeterminado na ECOB; distribuição das 6 categorias da partição; covariáveis de processo registradas.

## 9. Condições de abandono (herdadas, publicadas)

H-EO: estrutura fatorial 1–2 fatores explica tão bem quanto 6, ou itens não carregam em dimensões estáveis. ECO como construto: kappa de ocorrência < 0.4 mesmo com cegamento; classes indistinguíveis após fusões. HYP-001-U: em coorte, EO em t₀ não associa com ECOA (OR ≈ 1, IC estreito). Incremento (TPC-I): B6 (dados brutos sem EO) alcança o mesmo AUC com IC sobreposto. Causalidade (TPC-C): intervenções padronizadas não alteram ECOs vs. controle equivalente. Mecanismo: falha em 2 empresas independentes com protocolos cegos. Estas condições **não podem ser alteradas durante a coleta**; são a razão pela qual este pré-registro existe.

## 10. O que este documento NÃO faz (limites explícitos)

Este pré-registro não autoriza campo — a autorização é a etapa final (seção 11). Não dimensiona o estudo preditivo (isso é G3, após ICC/incidência estimados). Não define empresa, obras ou datas (decisão operacional do piloto). Não prevê análise causal (G6). Não cobre HYP-002 (régua equivalente entre braços — redesenho separado, AUD-04).

## 11. Autorização de campo — condição final

A coleta G1+G2 inicia somente com: (i) decisão humana explícita de aceitação deste pré-registro; (ii) assinatura/data de fixação das seções 2–7; (iii) piloto de confiabilidade interno (≥ 20 episódios sintéticos ou retrospectivos classificados em duplicata, kappa ≥ 0.7) aprovado. Qualquer coleta iniciada sem essas três condições é **coleta não autorizada** e seus dados não entram no corpus formal. Esta missão entrega o instrumento pronto e o pré-registro fixado — **e para antes do campo**.

**HUMAN DECISION REQUIRED: aceitar este pré-registro e autorizar campo, ou reter.**
