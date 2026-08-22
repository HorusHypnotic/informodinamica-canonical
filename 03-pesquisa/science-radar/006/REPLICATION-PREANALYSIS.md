# REPLICATION-PREANALYSIS.md

## Status

**FROZEN BEFORE MODELING — SCIENCE-RADAR-006.** Esta especificação define a reprodução da capacidade `PROSPECTIVE-RECONSTRUCTION-FROM-EVENT-LOGS` em domínio educacional, antes da leitura de qualquer resultado analítico do OULAD e sem testar a TPC.

## Dataset selecionado

**Open University Learning Analytics Dataset (OULAD)**, UCI Machine Learning Repository dataset 349, DOI `10.24432/C5KK69`, CC BY 4.0. Fonte: [UCI OULAD][1] e artigo de descrição de dados [Kuzilek et al.][2]. O conjunto contém tabelas relacionais de estudantes, apresentações de módulos, avaliações e interações VLE.

A escolha foi feita por integridade temporal documentada, identificadores relacionais, assessment posterior, licença CC BY 4.0, documentação primária e independência de domínio em relação ao PLOS/Science Radar-005. Não foi feita por expectativa de resultado.

## Unidade de análise

A unidade é **estudante–módulo–apresentação–assessment**, identificado por `id_student`, `code_module`, `code_presentation` e `id_assessment`. Cada linha é uma avaliação que possui uma avaliação anterior do mesmo estudante no mesmo módulo/apresentação e um score observado.

## T0, TC e TY

`T0` é o início relativo da apresentação do módulo, representado por `date = 0` na tabela de assessments. `TC` é o primeiro instante em que features elegíveis podem ser calculadas para o assessment-alvo: o maior entre a data da avaliação anterior submetida e a data de início do assessment-alvo menos sete dias, conforme as regras de feature abaixo. Para evitar ambiguidade de disponibilidade, os eventos VLE usados devem ter `date < assessment_date` e, em análise estrita, `date <= date_previous_assessment` quando a feature se basear em histórico anterior.

`TY` é `date_submitted` do assessment-alvo, expressa em dias desde o início da apresentação. O outcome é conhecido quando o estudante submete a avaliação; o campo é explicitamente documentado em `studentAssessment.csv`. Não há necessidade de proxy de transição de tarefa.

## Outcome

`Y = score` do assessment-alvo, contínuo em escala 0–100. A avaliação-alvo deve ser posterior à avaliação histórica usada para features, com `date_submitted_target > date_submitted_previous` e assessment dates coerentes. Não usar `final_result` como feature nem como outcome principal.

## População e elegibilidade

Incluir estudantes com pelo menos duas avaliações submetidas no mesmo módulo/apresentação, score não ausente, datas de submission e assessment disponíveis, e pelo menos uma avaliação anterior. O alvo é a próxima avaliação submetida em ordem temporal dentro do mesmo estudante–módulo–apresentação. Empates de `date_submitted` entre histórico e alvo são excluídos para impedir ordenação artificial.

## Features

### M0 — HISTORY ONLY

Usar apenas scores e datas de assessments anteriores ao alvo: último score anterior, média e mediana anteriores, número de assessments anteriores, média ponderada anterior quando o peso é conhecido, dias desde a última submissão, e atributos pré-módulo de `studentInfo`/`studentRegistration` que não dependem de resultados futuros, incluindo idade, região, educação, disability, tentativas anteriores, créditos estudados e data de registro.

### M1 — HISTORY + VLE ACTIVITY

M0 mais eventos VLE agregados com `date < date_assessment_target`: número de cliques, número de dias ativos, número de sites distintos, cliques nos últimos 7/30 dias relativos ao assessment, intensidade por dia ativo e cobertura de atividades. Somente `studentVle.csv` e `vle.csv` são usados; não usar scores do alvo.

### M2 — HISTORY + VLE TEMPORAL PROFILE

M1 mais perfis temporais pré-alvo: tendência de cliques em janelas anteriores, concentração de atividade por semana, recência, razão entre atividade nas janelas 7/30 dias, diversidade de `activity_type` e inclinação de atividade em pelo menos duas janelas. Se uma feature exigir informação após o assessment date, ela é proibida.

## Features proibidas

`score` do alvo, `date_submitted` do alvo, `final_result`, qualquer assessment posterior ao alvo, qualquer `studentVle` com `date >= assessment_date`, variáveis calculadas usando todo o módulo/apresentação, tabelas de resultados publicados, features derivadas de outras análises e qualquer variável da TPC.

## Split

Split primário por estudante, não por linha: 80% dos estudantes para treino e 20% para teste, com permutação determinística de IDs usando seed 2026. Nenhum estudante aparece nos dois conjuntos. Como sensibilidade temporal, reportar uma divisão por apresentações 2013 versus 2014 somente se houver estudantes não sobrepostos; ela não substitui o split por identidade.

## Missingness

Não imputar outcome. Missingness de features numéricas será tratada dentro do pipeline de treino com mediana e indicador de missing. Missingness estrutural de atividade será representado por zero apenas quando o significado for “nenhum evento observado na janela”; campos desconhecidos permanecem missing. Reportar cobertura por modelo.

## Modelos e métricas

Usar média do treino como baseline e a mesma família de modelo para M0, M1 e M2: `HistGradientBoostingRegressor(max_iter=180, max_leaf_nodes=15, learning_rate=0.06, l2_regularization=1, random_state=2026)` dentro de pipeline ajustado apenas no treino. Reportar MAE, RMSE e R² no teste, com N de estudantes, N de linhas e intervalo bootstrap agrupado por estudante quando possível.

## Placebos e controles

Executar 20 placebos permutando, dentro de treino e teste, somente as features adicionadas de M1/M2, preservando suas marginais. Executar sensibilidade de janelas 7/30 dias. Verificar que features calculadas no cutoff não mudam quando eventos posteriores são removidos. Não ajustar hiperparâmetros pelo resultado.

## Critérios de sucesso

`REPRODUCED` exige que o pipeline opere em outro domínio, reconstrua genealogia de eventos para features e outcome, impeça informação futura, mantenha estudantes separados entre treino/teste, produza placebos e limite a interpretação ao desenho. O resultado científico particular pode ser qualquer um; não é necessário reproduzir `NO_INCREMENT`.

`REPRODUCED_WITH_LIMITATIONS` aplica-se se o método funcionar, mas houver limitações importantes de granularidade, outcome, missingness, escala ou distribuição. `EXECUTED_ONLY` aplica-se se a segunda aplicação falhar estruturalmente. `INVALIDATED` só se uma falha fundamental do método anterior for demonstrada.

## Região inconclusiva

Diferença menor que 5% em MAE, discordância entre métricas ou instabilidade entre janelas/sensibilidades será classificada como inconclusiva para magnitude. Não promover uma vantagem pontual a claim robusto.

## Critérios de parada

Parar sem modelar se não for possível ligar estudante–módulo–avaliação–timestamp–score; se `date_submitted` não puder ser ordenado; se o outcome não for posterior às features; se o split por estudante não puder ser construído; se a licença/documentação impedir análise; ou se qualquer variável essencial exigir informação futura.

## Interpretação

O claim máximo permitido é sobre transportabilidade operacional da capacidade temporal/prospectiva em OULAD. Nenhuma associação será descrita como causal. Nenhum resultado será interpretado como teste da TPC ou de HYP-001.

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — Open University Learning Analytics Dataset"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
