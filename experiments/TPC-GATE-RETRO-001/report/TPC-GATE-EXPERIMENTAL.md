# TPC — Gate Experimental
## Primeiro teste retrospectivo com dados públicos reais

**Objetivo:** testar se conhecer efeitos persistentes **X/EPP** e estado de reserva **C** melhora a previsão da resposta à próxima perturbação além de conhecer apenas **P**, **O** e o estado inicial.

> **Gate final: LOCAL SIGNAL.**
>
> No dataset analisado, adicionar variáveis históricas de backlog e throughput produziu uma melhora pequena no erro absoluto fora da amostra: o modelo completo reduziu o MAE de 185,32 para 180,85 horas, aproximadamente 2,4%. Porém, o ganho não sobreviveu integralmente ao placebo, foi pequeno em relação à variabilidade, e não demonstra transversalidade nem confirma a TPC. O resultado é um sinal local exploratório em operações de TI, que exige replicação e auditoria adicional.

## 1. Dataset escolhido e proveniência

Foi escolhido o **Incident Management Process Enriched Event Log**, do [UCI Machine Learning Repository, dataset 498](https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log), DOI **10.24432/C57S4H**. O dataset é licenciado sob Creative Commons Attribution 4.0 e foi doado em 13/07/2019.

Segundo a documentação oficial, o conjunto contém eventos extraídos do sistema de auditoria de uma instância ServiceNow usada por uma empresa de TI, enriquecidos com dados de banco relacional. A versão pública tem **141.712 eventos**, **24.918 identificadores de incidentes** e **36 atributos**; há valores ausentes tratados como informação desconhecida. O arquivo público foi baixado diretamente do UCI e preservado no diretório de reprodução.

A análise agregou os eventos por incidente. Após excluir registros sem timestamps ou sem duração resolvida, restaram **23.362 incidentes**; para o teste de sucessão dentro do mesmo grupo de suporte, foram usados **23.292 pares com próximo incidente observável**. A divisão temporal foi de **18.633 observações para treino** e **4.659 para teste**, sem embaralhamento entre passado e futuro.

## 2. Datasets encontrados e rejeitados

| Dataset/fonte | Status | Motivo |
|---|---|---|
| UCI Incident Management Process Enriched Event Log | **Escolhido** | Público, documentado, temporal e contém eventos, timestamps, severidade, atualizações, reabertura, SLA e resolução. |
| Salesforce PRB cloud incident investigations, descrito por Saha & Hoi | Rejeitado | O artigo relata mais de 2.000 investigações, mas o dataset corporativo bruto não está publicamente disponível para reprodução externa. [1] |
| Artigos de mesocosmos sobre perturbações repetidas | Rejeitados para este Gate | São excelentes desenhos experimentais, mas não foram obtidos aqui como arquivo longitudinal pronto com X, C, O e Y para uma análise retrospectiva independente. [2] |
| Logs públicos de outages/post-mortems | Rejeitados nesta rodada | Têm eventos e duração, mas não oferecem de forma consistente X e C independentes de O, nem um painel comparável de sistema, capacidade e resposta futura. |

A seleção não foi feita porque o dataset “combinava” com a hipótese. Ele foi escolhido porque tem uma sequência de eventos operacionais, tempos de resolução, severidade e histórico por grupo. Ainda assim, ele não contém uma medição direta de capacidade de equipe, dívida técnica ou estado interno; X e C são proxies históricos, e isso limita fortemente a interpretação.

## 3. Operacionalização de P, R, X, C, O e Y

| Elemento TPC | Variável real utilizada | Momento de disponibilidade |
|---|---|---|
| **P** | `impact`, `urgency`, `priority`, categoria e grupo do incidente | No primeiro registro do incidente |
| **R** | Tempo entre `opened_at` e `resolved_at`; `closed_at` usado para fechar o episódio | Após o episódio; não entra como predictor do próprio evento |
| **X / EPP** | `X_backlog_30d`: incidentes abertos no grupo nos 30 dias anteriores menos fechados; proxy de carga residual/backlog | Calculado apenas com eventos anteriores à abertura atual |
| **C / Estado de Reserva** | `C_throughput_30d`, `C_capacity_proxy = 1/(1+backlog)`, e média de resolução do grupo nos 90 dias anteriores | Calculado apenas com resoluções anteriores à abertura atual |
| **O** | `O_first_update_hours`: tempo entre abertura e primeira atualização registrada; também P e estado inicial | Observável depois da abertura, antes do desfecho e anterior ao próximo incidente |
| **Y** | Tempo de resolução (`Y_hours`) do próximo incidente no mesmo grupo de suporte | Desfecho futuro, não usado para criar X/C do episódio anterior |
| **Δt** | Horas entre a abertura do incidente atual e a abertura do próximo incidente no mesmo grupo | Disponível entre os dois episódios |
| **Tr** | Não foi identificado um Tr empírico defensável no dataset; foi feita apenas sensibilidade exploratória com limiar operacional de 24 horas | Não usar como teste causal definitivo |

A escolha de X e C não pretende dizer que backlog seja literalmente um “resíduo” físico ou que throughput seja capacidade real. São indicadores observacionais de dois aspectos diferentes: **X** representa carga histórica que ainda não foi absorvida pelo fluxo de fechamento; **C** representa uma proxy de capacidade operacional passada. O dataset não mede folga de pessoal, dívida técnica, qualidade de código ou reserva latente diretamente.

## 4. Hipótese pré-análise

A hipótese principal foi:

> Entre incidentes com P, grupo e output inicial comparáveis, variáveis históricas X/C calculadas antes da abertura do próximo incidente melhoram a previsão do tempo de resolução futuro Y além do modelo que usa somente P, O e estado inicial.

A hipótese temporal complementar foi que a condição `Δt < Tr` teria poder adicional depois de controlar carga e severidade. Como o dataset não documenta um critério independente de recuperação de grupo ou sistema, essa parte foi classificada como **não testável de forma confirmatória**. O limiar de 24 horas foi usado somente como análise de sensibilidade, não como Tr científico estabelecido.

## 5. Modelo baseline e modelo TPC

O adversário baseline foi um modelo de gradient boosting temporal usando apenas:

`P + O + estado inicial`

Na prática, os preditores foram impacto, urgência, prioridade, tempo até primeira atualização, categoria, tipo de contato e grupo. O modelo TPC adicionou:

`X + C`

com backlog histórico de 30 dias, throughput histórico de 30 dias, proxy inversa de backlog e média histórica de tempo de resolução em 90 dias.

A validação usou os primeiros 80% dos incidentes ordenados por abertura para treino e os 20% finais para teste. A métrica principal foi MAE em horas; RMSE e R² foram reportados como diagnósticos. O modelo foi treinado somente no passado em relação ao conjunto de teste.

## 6. Resultados principais

| Modelo | MAE (h) | RMSE (h) | R² |
|---|---:|---:|---:|
| **P + O + S₀** | 185,32 | 410,42 | 0,1015 |
| **P + O + X** | 180,64 | 412,61 | 0,0919 |
| **P + O + C** | 180,33 | 410,50 | 0,1011 |
| **P + O + X + C** | 180,85 | 409,54 | 0,1053 |
| **P + O + X + C, placebo embaralhado** | 188,22 | 410,34 | 0,1018 |

O modelo completo reduziu o MAE em **4,48 horas**, ou **2,42%**, em relação ao baseline. A melhora em RMSE foi de **0,88 hora** e o R² aumentou de **0,1015 para 0,1053**. O maior ganho de MAE veio do modelo com C, mas o R² praticamente não mudou. Portanto, o sinal é pequeno e não deve ser descrito como grande melhoria preditiva.

A comparação X contra C sugere que os proxies de capacidade histórica carregam informação semelhante ou ligeiramente maior que o backlog isolado neste dataset. Isso não demonstra que C foi medido de forma pura; `C_capacity_proxy` é matematicamente derivado do backlog e, portanto, não é uma medida completamente independente. Essa dependência é uma limitação importante.

## 7. Teste de ablação

A ablação não mostrou que X e C sejam igualmente necessários. X sozinho reduziu o MAE em relação ao baseline, mas aumentou RMSE e reduziu R². C sozinho obteve a menor MAE entre os modelos, mas praticamente não melhorou R². A combinação X+C apresentou o melhor RMSE e R², porém não o menor MAE.

A leitura mínima permitida é: **histórico operacional acrescenta algum sinal preditivo para o tempo de resolução do próximo incidente, mas não há evidência forte de que o constructo dividido em X e C seja superior a qualquer proxy histórico específico**.

## 8. Placebo e destruição da temporalidade

O placebo embaralhou os valores de X/C dentro do conjunto de treino, destruindo sua relação temporal com os incidentes, mas preservando aproximadamente sua distribuição marginal. O modelo placebo obteve MAE de **188,22 horas**, pior que o baseline de 185,32 e que o modelo completo de 180,85.

Esse resultado é compatível com a ideia de que a ordem histórica contém algum sinal. Contudo, não é um placebo definitivo: o embaralhamento foi feito em treino e o modelo ainda recebeu os valores reais de X/C no teste. Um placebo mais rigoroso deve embaralhar ou deslocar as séries históricas em toda a construção de treino e teste, mantendo o protocolo temporal; essa melhoria fica registrada como trabalho necessário.

## 9. Teste exploratório de Δt < Tr

Como Tr não está documentado independentemente, não é defensável declarar um teste confirmatório de recuperação completa. Usando apenas um limiar operacional exploratório de 24 horas entre incidentes sucessivos no mesmo grupo:

| Condição | N | Média de Y seguinte (h) | Mediana de Y seguinte (h) | Backlog médio anterior |
|---|---:|---:|---:|---:|
| `Δt ≥ 24 h` | 1.270 | 269,31 | 49,59 | 13,66 |
| `Δt < 24 h` | 22.022 | 172,26 | 20,47 | 254,18 |

A diferença bruta não pode ser interpretada como evidência da TPC. Quase todos os pares estão na condição de intervalo curto, o backlog médio é muito diferente, e o próximo incidente não é necessariamente uma nova perturbação comparável do mesmo sistema. Sem Tr independente, o resultado correto é **NOT TESTABLE WITH DATASET** para a afirmação original `Δt < Tr`.

## 10. Robustez e tentativa de matar o sinal

| Subamostra | MAE (h) | RMSE (h) | R² |
|---|---:|---:|---:|
| Primeira metade temporal, validação interna temporal | 178,54 | 460,69 | 0,3173 |
| Segunda metade temporal, validação interna temporal | 190,81 | 443,77 | -0,0160 |
| Impacto alto | 262,24 | 395,01 | -0,0434 |
| Impacto médio | 177,16 | 409,21 | 0,1017 |
| Impacto baixo | 181,48 | 493,03 | -0,0196 |

O sinal não é estável. O modelo tem desempenho muito pior ou R² negativo em períodos e estratos específicos. Isso enfraquece qualquer alegação de robustez geral. Ainda precisam ser executados, em uma replicação posterior, controles explícitos de severidade com matching, janelas alternativas de 7/30/90 dias, exclusão de outliers, modelos lineares e árvores mais simples, grupos separados, teste de leakage de `resolved_at`/`closed_at`, e placebo temporal completo.

## 11. Risco de leakage e vieses

O pipeline evitou usar a duração do incidente atual para prever o próximo e calculou o backlog e o throughput somente com registros anteriores à abertura. Entretanto, há riscos residuais. O primeiro registro por incidente pode conter campos que foram atualizados no sistema de forma não perfeitamente simultânea. O grupo de suporte pode mudar ao longo do episódio, e o uso do grupo do primeiro registro pode criar erro de atribuição.

O `O_first_update_hours` foi calculado a partir da primeira atualização observada, portanto é um output inicial, não uma variável disponível exatamente no instante de abertura. Isso é aceitável para a hipótese de output mascarado somente se O for definido como informação disponível antes da previsão; caso contrário, deve ser removido ou congelado em uma janela operacional explícita.

O próximo incidente no mesmo grupo não é necessariamente a mesma classe de perturbação. Há também survivorship bias, pois incidentes sem resolução foram excluídos; regressão à média, pois grupos com eventos extremos tendem a retornar a níveis usuais; e confusão entre tamanho do grupo, volume de trabalho e capacidade real. O dataset não mede recursos externos, pessoal, complexidade de código, dívida técnica, indisponibilidade de serviço nem estado interno.

## 12. Resultados negativos

O teste não demonstrou uma relação limpa em que backlog histórico reduzisse sistematicamente a capacidade. C aumentou pouco o R² e o modelo X isolado piorou RMSE e R². O ganho desapareceu em parte da validação temporal e em estratos de impacto alto e baixo. O threshold `Δt < Tr` não pôde ser testado defensavelmente porque Tr não é independente.

Esses resultados negativos são importantes. Eles impedem classificar o dataset como evidência de uma variável universal ou de uma lei de recuperação comprimida. Também impedem afirmar que C foi medido diretamente; ele foi apenas aproximado por histórico operacional.

## 13. Interpretação mínima permitida

O dataset fornece **um sinal local exploratório em operações de incidentes de TI**: variáveis históricas anteriores ao incidente, especialmente proxies de backlog e throughput, podem melhorar modestamente a previsão temporal da resolução de um incidente posterior, além de severidade e output inicial.

Isso não significa que EPP seja uma entidade física, que C seja uma reserva real medida diretamente, que `X ↑ ⇒ C ↓`, ou que a TPC foi confirmada. O resultado pode ser explicado por carga de trabalho, heterogeneidade entre grupos, sazonalidade, políticas de triagem ou dependência histórica genérica. A única afirmação segura é que o modelo histórico acrescentou sinal preditivo pequeno neste dataset e precisa ser replicado sob melhor operacionalização.

## 14. Gate final

# LOCAL SIGNAL

A classificação é **LOCAL SIGNAL**, não **ROBUST LOCAL SIGNAL**, porque houve pequena melhoria fora da amostra, mas o sinal não sobreviveu de modo convincente às análises temporais e estratificadas, o placebo ainda não foi totalmente rigoroso e X/C são proxies parcialmente dependentes.

O resultado não autoriza `PASS WITH SIGNAL — CROSS-DOMAIN`. Não há teste em materiais, ecologia ou organizações independentes. Também não autoriza `REPLICATION CANDIDATE` no sentido forte; autoriza apenas uma replicação local mais rigorosa em operações de TI.

## 15. Próximos testes necessários

A próxima análise deve usar um painel de grupos de suporte com uma janela de previsão fixa, por exemplo, prever a resolução do próximo incidente nas 24 ou 72 horas seguintes. O dataset deve incluir ou aproximar recursos disponíveis, tamanho da equipe, complexidade do serviço e manutenção técnica. X deve ser construído como legado histórico e C como capacidade operacional medida por uma tarefa futura ou por uma proxy validada, não como simples transformação do próprio X.

O placebo deve destruir temporalidade em ambos os lados da divisão, e o modelo deve ser comparado com regressão regularizada, baseline ingênuo, modelos de sobrevivência e modelos por grupo. A avaliação deve usar blocos temporais múltiplos, intervalos de confiança por bootstrap de grupos e teste de calibração, além de análise de sensibilidade para janelas históricas.

## 16. Arquivos de reprodução

O pacote produzido contém:

| Arquivo | Conteúdo |
|---|---|
| `analyze_tpc_gate.py` | Script completo de download já realizado, agregação, construção de variáveis, modelos, placebo e robustez |
| `incident_event_log.csv` | Dataset público baixado do UCI, 45 MB |
| `tpc_analysis_rows.csv` | Linhas agregadas e variáveis usadas no teste |
| `model_results.csv` | Métricas de baseline, ablação, modelo completo e placebo |
| `delta_tr_summary.csv` | Resumo exploratório do limiar operacional de 24 horas |
| `robustness_results.csv` | Resultados por período e severidade |
| `analysis_stdout.txt` | Saída textual da execução |

Comando de reprodução, a partir do diretório do projeto:

```bash
python3 analyze_tpc_gate.py
```

## 17. Fontes

1. Saha, A. & Hoi, S. C. H. (2022). *Mining Root Cause Knowledge from Cloud Service Incident Investigations for AIOps*. ICSE-SEIP. [arXiv](https://arxiv.org/abs/2204.11598).
2. Haghkerdar, J. M. et al. (2019). *Repeat disturbances have cumulative impacts on stream communities*. Ecology and Evolution. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6405533/).
3. Amarel, C., Fantinato, M. & Peres, S. (2019). *Incident management process enriched event log*. UCI Machine Learning Repository, dataset 498, DOI 10.24432/C57S4H. [UCI](https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log).
4. Mroziński, S., Lis, Z. & Egner, H. (2021). *Energy Dissipated in Fatigue and Creep Conditions*. Materials. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8399811/).
5. Kreher, J. B. & Schwartz, J. B. (2012). *Overtraining Syndrome: A Practical Guide*. Sports Health. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3435910/).
