# TEMPORAL-AUDIT.md

## Classificação dos dados PLOS

| Variável/camada | Classificação | Justificativa | Risco de leakage |
|---|---|---|---|
| Demografia, composição, modalidade face-to-face/chat | PRE | Medidas de grupo/cadastro anteriores ou fixadas antes da tarefa | Baixo, salvo uso de variável pós-seleção |
| Big Five, social perceptiveness, IQ/atributos individuais | PRE | Questionários/atributos tratados como team features | Baixo para previsão; dependência e agregação permanecem |
| Score de tarefa anterior | PRE para tarefa seguinte | Histórico temporal anterior pode ser usado com cutoff | Baixo se o cutoff for respeitado |
| Timestamp de evento e ordem de chat | DURING | Observado durante a sessão | Médio; precisa de cutoff |
| Rede construída até um cutoff anterior | DURING/PRE prospectivo | Válida apenas se nenhum evento posterior entrar | Baixo sob construção temporal correta |
| `Amount of Comm.`, `Word Counter`, `Speaking Count` do “whole task” | DURING/POST relativo ao score final | Resume comunicação de toda a tarefa | Alto para prever score da mesma tarefa |
| `log-nturns`, palavras, caracteres e delays totais | DURING/POST relativo ao score final | Derivado do log completo da tarefa | Alto se outcome é o score final da mesma tarefa |
| `first score` | DURING | Primeiro score ainda é informação da tarefa | Médio; depende do alvo |
| `last score`, `mean score`, `median`, variance e trend da bateria | POST para prever score final da mesma bateria | Incorporam pontos posteriores ou o próprio alvo/trajectory | Muito alto |
| `score-end`, `score-start`, `score-growth-diff` | DURING/POST | São construídos a partir da série do desfecho | Muito alto para outcome final |
| Coeficientes/correlações do S1 | POST/DERIVED | Calculados depois com os dados e outcomes | Não são preditores observacionais individuais |
| OSF `Moon_Landing`, fatores CI e task scores | UNKNOWN temporalmente; agregados | CSV não fornece timestamps nem desenho completo | Não usar como prospectivo sem protocolo externo |

## Decisão temporal

A existência de timestamp nos logs não torna toda feature temporalmente íntegra. Para uma análise prospectiva, o dataset precisa ser reindexado por tarefa/sessão, com cutoff pré-especificado e features calculadas apenas com informação disponível até esse instante. As tabelas derivadas do S1 não devem ser reutilizadas como se fossem variáveis PRE.

## Leakage mínimo a auditar

Há risco de leakage por usar o log completo da mesma tarefa para explicar o score dessa tarefa, por usar `last`/`mean`/trajectory do próprio desfecho, por misturar tarefas repetidas da mesma equipe entre treino e teste e por calcular rede com mensagens posteriores ao momento de previsão. A auditoria não converte esses riscos em refutação nem em evidência positiva; apenas impede a leitura prospectiva indevida.

## Referências

[1]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6179230/ "PMC full text and supplementary-data record for e0204547"
[3]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s001 "PLOS e0204547 S1 Dataset"
[4]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s002 "PLOS e0204547 S2 Text"
[5]: https://github.com/CCI-MIT/POGS "CCI-MIT/POGS repository"
[6]: https://osf.io/qwbaf/overview "OSF qwbaf — Exploring Collective Intelligence in Student Groups"
[7]: https://api.osf.io/v2/nodes/qwbaf/ "OSF API node metadata qwbaf"
[8]: https://api.osf.io/v2/nodes/qwbaf/files/osfstorage/ "OSF API file listing qwbaf"
[9]: https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log "UCI Dataset 498 — Incident Management Process Enriched Event Log"
[10]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/113faf4db219e28b901cba61e61d99402c7183b1/03-pesquisa/science-radar/003 "SCIENCE-RADAR-003 preserved context"
