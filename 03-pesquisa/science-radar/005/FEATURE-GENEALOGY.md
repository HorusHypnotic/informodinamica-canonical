# FEATURE-GENEALOGY.md

## Regra de inclusão

Somente features calculadas a partir do workbook e dos eventos cujo timestamp é anterior a `TC` entraram. Tabelas publicadas de correlação/regressão e features derivadas prontas do S1 foram excluídas.

| FEATURE SET | FEATURE | SOURCE_EVENT | EARLIEST_AVAILABLE | CUTOFF_SAFE | DERIVATION | OUTCOME_DEPENDENCE | LEAKAGE_RISK |
|---|---|---|---|---|---|---|---|
| M0 | `H_Typing_Text`, `H_Typing_Numbers`, `H_Combined_Typing` | scores de tarefas anteriores no workbook | antes de Matrix, por ordem observada no log | YES | valor bruto do workbook; tarefas precedentes | NO para `Matrix Solving` | baixo |
| M0 | `n_pre_tasks` | `Load Instructions` anteriores a Matrix | antes de TC | YES | contagem de tarefas iniciadas antes de TC | NO | baixo |
| M0 | `S_Talking`, `S_Late`, `S_Subject_Count` | atributos de sessão no workbook | pré-tarefa/atributo de desenho | YES | cópia numérica do workbook | NO | baixo-médio |
| M0 | `S_Age`, `S_Is_Female`, `S_Mind_in_the_Eyes`, `S_Team_Cohesion`, Big Five | questionário/atributos do workbook | tratado como pré-tarefa | YES | cópia de média/atributos | NO | médio; momento de aplicação não está no log |
| M1 | `N_sender_pre`, `N_edge_handoff_pre` | eventos `Chat` `< TC` | primeiro chat anterior a TC | YES | emissores distintos e arestas entre emissores consecutivos | NO | baixo |
| M1 | `Network_density_pre`, reciprocity, mean degree | eventos `Chat` `< TC` | primeiro chat anterior a TC | YES | grafo dirigido agregado antes de TC | NO | baixo-médio |
| M2 | `N_chat_pre`, `Collab_total_words_pre`, `Collab_total_chars_pre` | eventos `Chat` `< TC` | primeiro chat anterior a TC | YES | contagens do payload anterior a TC | NO | baixo-médio |
| M2 | entropy, balance, interchat delay, event count | `Chat` e eventos da aplicação `< TC` | primeiro evento anterior a TC | YES | participação, atraso e volume pré-cutoff | NO | médio; dependência da exportação |

## Features proibidas e não usadas

Foram excluídos `last`, `mean`, `median`, variância e tendência da tarefa alvo; comunicação da tarefa inteira; rede pós-TC; correlações, p-values e coeficientes derivados; EO, deformação, ECO e qualquer proxy TPC. O script preservado registra que os inputs são somente `team-data.xlsx` e `team-chat-logs/*.csv`.

## Referências

[1]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[2]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s001 "PLOS e0204547 S1 Dataset"
[3]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s002 "PLOS e0204547 S2 Text"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/2c9f67fbfedbf22c6c31919e3924ca136366cedc/03-pesquisa/science-radar/004 "SCIENCE-RADAR-004 observation audit"
