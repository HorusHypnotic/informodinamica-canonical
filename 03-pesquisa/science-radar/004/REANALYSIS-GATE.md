# REANALYSIS-GATE.md

## Decisão

**REANALYSIS_READY**, mas somente para uma reanálise estritamente pré-especificada e temporalmente honesta do PLOS S1. O dataset contém logs, timestamps, histórico de tarefas, atributos de equipe, scores e transformações documentadas suficientes para comparar modelos de histórico versus rede/processo, desde que as features sejam reconstruídas com cutoff e sem usar os CSVs derivados como preditores. O OSF é **REANALYSIS_BLOCKED** para análise temporal/causal isolada, porque seus CSVs são agregados e sem timestamps/eventos.

## Comparações defensáveis

| Comparação | Status | Condição |
|---|---|---|
| **HISTORY ONLY** | READY | Usar apenas scores anteriores e atributos PRE; separar equipes/sessões e tarefas conforme desenho |
| **HISTORY + NETWORK** | READY-CONDITIONAL | Reconstruir rede dos logs até cutoff; não usar `log-*` da tarefa completa para prever o mesmo score |
| **HISTORY + COLLABORATION** | READY-CONDITIONAL | Definir colaboração por eventos/turn-taking disponíveis antes do cutoff; auditar missingness |
| História + PLOS S1 derivados originais | BLOCKED | Features derivadas podem incluir informação contemporânea/posterior e não são prospectivas por padrão |
| OSF agregado como teste temporal | BLOCKED | Sem timestamps, eventos, instrumento original e distribuição de informação |
| HYP-001/TPC | NOT IN SCOPE | Esta missão não testa hipótese nem cria variável TPC |

## O que pode ser testado sem inventar variável

Pode-se testar se scores anteriores, composição/atributos PRE, rede temporal e intensidade de colaboração acrescentam previsão para um score futuro ou para uma tarefa posterior; se métricas de rede melhoram sobre histórico; se a contribuição é estável sob split por equipe; e se resultados mudam sob janelas temporais. Também é possível fazer análise descritiva de associação entre rede e desempenho, sem linguagem causal.

## O que não pode ser testado

Não se pode testar diretamente estado representacional, deformação, persistência representacional, capacidade coordenadora da representação, compreensão, acurácia semântica, causa da falha ou qualquer interpretação retrospectiva que dependa de variável ausente. Não se pode transformar `network`, `communication` ou `CI` em EO por renomeação.

## Gate operacional antes de executar

1. Ler integralmente o código/protocolo e mapear a disponibilidade temporal de cada feature.
2. Definir outcome futuro e cutoff antes de abrir resultados derivados.
3. Excluir ou separar tarefas/equipes compartilhadas entre treino e teste.
4. Recalcular features a partir dos logs permitidos, documentando parsing e missingness.
5. Comparar HISTORY ONLY, HISTORY + NETWORK e HISTORY + COLLABORATION com métricas e intervalos, sem claim causal.
6. Parar se o timestamp do outcome, o vínculo tarefa–log ou a regra de split não puderem ser recuperados.

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
