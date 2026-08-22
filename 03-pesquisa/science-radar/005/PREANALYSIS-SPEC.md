# PREANALYSIS-SPEC.md

## Status

**FROZEN BEFORE MODELING — SCIENCE-RADAR-005.** Esta especificação foi escrita antes da execução de modelos e antes da abertura de resultados derivados relevantes do S1. Mudanças posteriores exigem `DEVIATION-XXX` com motivo e impacto.

## Pergunta

Determinar se informação histórica e eventos de colaboração observados antes de um cutoff acrescentam poder preditivo prospectivo para um outcome de tarefa futura, comparando **M0 HISTORY ONLY**, **M1 HISTORY + NETWORK** e **M2 HISTORY + NETWORK + COLLABORATION**. Esta não é uma análise da TPC, não cria variável TPC e não testa HYP-001.

## Unidade de análise

A unidade primária será **sessão/equipe–tarefa Matrix Solving**. Cada linha representa uma equipe/sessão com score de Matrix Solving observado no workbook e um log temporalmente vinculado pela coluna `session` e pelo campo `completed_task` contendo `Matrix Solving-1`. Uma sessão só entra se tiver linha no workbook, eventos Matrix identificáveis e uma tarefa subsequente identificável para marcar o fim observável da tarefa.

## Outcome

`Y = Matrix Solving`, o score da tarefa Matrix Solving no `team-data.xlsx`. O score é tratado como contínuo. Ele é observado no dataset exportado; o momento operacional em que se torna conhecido será aproximado pelo primeiro evento `Load Instructions` da tarefa subsequente, denominado `TY_proxy`. Se a tarefa subsequente não puder ser identificada, a sessão será excluída do outcome prospectivo.

## Cutoff e horizonte

`T0` é o primeiro timestamp do log da sessão. `TC` é o timestamp do primeiro `Load Instructions` da tarefa Matrix Solving, isto é, o início da tarefa alvo. `TY` é o timestamp do primeiro `Load Instructions` da próxima tarefa na mesma sessão, usado somente quando a transição é inequívoca. A condição obrigatória é `TC < TY`. O horizonte é **a duração da tarefa Matrix até o primeiro início de tarefa subsequente**; a previsão é feita no início da tarefa alvo, não durante sua execução.

## População e amostra

Todas as sessões/equipes presentes no S1 que satisfizerem simultaneamente: (i) vínculo `Session` workbook ↔ `session` do log; (ii) ocorrência `completed_task` de Matrix Solving; (iii) score Matrix Solving não ausente; (iv) próxima tarefa com `Load Instructions` identificável; (v) timestamps parseáveis e ordenáveis; (vi) pelo menos uma observação histórica elegível antes de `TC` para as features de histórico. A amostra final e exclusões serão contadas antes do ajuste.

## Exclusões

Excluir sessões sem vínculo inequívoco, sem score, com timestamps inválidos, sem transição de tarefa para `TY`, com duplicidade não resolvida, sem histórico mínimo para M0 ou com qualquer violação `TC >= TY`. Não usar as matrizes de correlação/regressão publicadas como entrada. Não usar linhas do mesmo grupo como independentes quando a identidade de equipe se repete; o split será agrupado por sessão/equipe.

## Features permitidas

### M0 — HISTORY ONLY

Somente informação PRE existente antes de `TC`: sequência/contagem de tarefas concluídas anteriormente; scores de tarefas anteriores disponíveis no workbook e cuja tarefa correspondente apareça antes de Matrix no log; desempenho médio/mediano anterior; número de tarefas anteriores; tempo decorrido desde o início da sessão; e atributos fixados antes da tarefa, como modalidade `Talking`, `Late`, `Subject Count`, composição demográfica e traços/atributos do workbook quando não forem derivados do outcome alvo.

### M1 — HISTORY + NETWORK

M0 mais features reconstruídas exclusivamente dos eventos `Chat` com timestamp `< TC`: número de mensagens/turnos; palavras/caracteres quando o payload permitir; número de emissores distintos; densidade da rede dirigida de comunicação; reciprocidade; grau médio e dispersão; e proporção de eventos distribuídos entre membros. A rede será construída somente com eventos anteriores ao cutoff e sem usar arquivos de features de rede já publicados.

### M2 — HISTORY + NETWORK + COLLABORATION

M1 mais features comportamentais diretamente derivadas de eventos `< TC`: volume de chat, participação por membro, concentração/entropia de participação, latência entre mensagens quando timestamps forem válidos, diversidade de emissores, eventos de edição e intensidade de colaboração. Se uma feature não puder ser derivada com fonte e cutoff prováveis, será excluída.

## Features proibidas

Qualquer feature derivada do score Matrix Solving ou de dados posteriores a `TC`; `last`, `mean`, `median`, variance ou trend da tarefa alvo; total da tarefa inteira; rede construída com mensagens após `TC`; qualquer correlação, p-value ou coeficiente publicado; `completed_task` posterior ao cutoff; identidade de grupo usada como preditor sem validação agrupada; EO, deformação, ECO, representação ou proxy TPC inventada.

## Missingness

Para features numéricas de eventos, ausência de evento será distinguida de missing estrutural quando possível. Campos sem observação serão marcados como missing e imputados **dentro do pipeline de treino**, usando mediana do treino. Não imputar outcome. Sessões sem timestamp necessário serão excluídas, não imputadas. A taxa de missing será reportada por feature e split.

## Split

O split primário será **grouped temporal split por sessão/equipe**, ordenando sessões pela data do primeiro log e reservando os 20% finais por sessão para teste; nenhuma sessão/equipe aparece simultaneamente em treino e teste. Se houver apenas uma observação por equipe, o agrupamento é trivial e a limitação será registrada. Uma análise de sensibilidade será feita com leave-groups-out ou blocos temporais somente se o tamanho permitir. O split não será escolhido por desempenho.

## Métricas

Reportar obrigatoriamente **MAE**, **RMSE** e **R²** no conjunto de teste, com número de observações e intervalo bootstrap agrupado por sessão quando tecnicamente possível. O critério primário de ganho será redução de MAE; RMSE e R² são critérios co-primários de confirmação, não serão ignorados quando discordarem.

## Baselines e modelos

Baseline estatístico simples: predição pela média do treino. Modelos M0, M1 e M2 usarão a mesma família pré-especificada, pipeline de imputação/escalonamento ajustado somente no treino e `HistGradientBoostingRegressor` com `max_iter=180`, `max_leaf_nodes=15`, `learning_rate=0.06`, `l2_regularization=1` e `random_state=2026`. Se o tamanho amostral impedir o ajuste, parar e classificar `INDETERMINATE`, sem trocar silenciosamente de modelo.

## Placebos e controles

Quando houver amostra suficiente, embaralhar as features adicionadas de M1/M2 dentro do treino e teste preservando marginais, repetir 20 vezes com seeds derivadas de 2026, e verificar se o ganho desaparece. Também executar controle de timestamps deslocando artificialmente eventos para testar se o pipeline detecta eventos posteriores; se o controle não puder ser implementado sem hipótese adicional, registrar como não executado.

## Critérios de comparação

`ROBUST_INCREMENT` exige que M1/M2 melhore M0 em MAE e pelo menos uma entre RMSE/R², sobreviva a split/sensibilidade defensível, não dependa de uma única equipe, não desapareça com pequenas mudanças de cutoff e supere placebos. `FRAGILE_INCREMENT` é ganho limitado a uma métrica/split ou dependente de poucas observações. `NO_INCREMENT` é ausência de ganho consistente. `INDETERMINATE` é qualquer falha de proveniência, amostra, split ou métrica que impeça comparação honesta.

## Critérios de parada

Parar sem modelar se `TASK ↔ TEAM ↔ LOG ↔ TIMESTAMP ↔ OUTCOME` não puder ser validado; se `TY` for apenas uma conjectura não verificável; se `TC < TY` falhar; se o outcome não puder ser separado temporalmente; se o split agrupado não puder ser construído; ou se as features pré-cutoff não puderem ser calculadas sem usar informação posterior. Nesse caso o resultado final será `REANALYSIS_BLOCKED`.

## Região inconclusiva

Se a diferença entre M0 e M1/M2 for menor que 5% em MAE, ou se MAE/RMSE/R² discordarem sem estabilidade em resampling, o resultado será tratado como **INCONCLUSIVE**, não como confirmação ou ausência de efeito. Esta região não altera a regra de parada nem autoriza linguagem causal.

## Seed e versionamento

Seed principal: `2026`. Dados: PLOS e0204547 S1 recuperado no Radar-004, hash `54c33ca5338d6cb2cbb8215a0010ab6251f690d1018069ea94fa048d4a6d5ecc`. Qualquer desvio será nomeado `DEVIATION-001`, `DEVIATION-002`, etc., com motivo, arquivos afetados e impacto.

## Interpretação permitida

Mesmo se M2 vencer, a interpretação máxima será: “informação de colaboração disponível até TC acrescentou poder preditivo prospectivo sobre o baseline histórico neste subconjunto do dataset”. Não será escrito que colaboração causa desempenho, que há mecanismo TPC ou que qualquer resultado testa HYP-001.
