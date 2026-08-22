# POGS-OSF-AUTOPSY.md

## POGS: plataforma/código, não dataset de estudo

O repositório `CCI-MIT/POGS` é uma plataforma para estudos online de aprendizagem coletiva, com código público, README, Docker, configuração de estudo demo e licença GPL-2.0. O commit recuperado é `5d67d13294c62e5f3d4eb5c72de72bffa2962353` [5]. O repositório permite produzir observações, mas não contém automaticamente o dataset do estudo PNAS ou todos os logs históricos. Portanto, POGS é **instrumento/código**, não observação pronta.

| Campo | POGS |
|---|---|
| WHO | Participantes de estudos configurados pelo operador; a população concreta depende da sessão |
| WHAT | Eventos e respostas produzidos durante tarefas colaborativas configuradas |
| WHEN | Timestamps de sessão/eventos podem ser registrados pela aplicação; nenhum dataset histórico foi assumido do código |
| HOW | Plataforma web/colaborativa, tarefas, chat/edição e banco de dados |
| UNIT | Participante, grupo, tarefa, evento e sessão, dependendo da exportação |
| RAWNESS | Código e configuração; dados só existem após execução/extração de uma sessão |
| OUTCOME | Depende da bateria configurada; não fixado pelo repositório sozinho |
| PRE_OUTCOME | Só pode ser definido depois de conhecer a tarefa, o cutoff e o export |
| MISSINGNESS | Desconhecida sem uma execução/export específico |
| DEPENDENCIES | Participantes aninhados em grupos/sessões e eventos dependentes no tempo |

## OSF qwbaf: tabelas agregadas

O projeto público `qwbaf`, “Exploring Collective Intelligence in Student Groups”, expõe dois CSVs: `CIGroup.main.csv` e `CIGroup.secondary.csv`, com 29 linhas de dados cada. O primeiro inclui `Moon_Landing`, `Woolleys_cFactor`, `cFluid`, `cCrystal`, `Group_IQ`, tarefas de atenção/memória, brainstorming, matrizes, vocabulário, `Average_IQ`, `Highest_IQ`, `Average_ToM`, `Conversational_TurnTaking_SD` e `Percentage_Female`. O segundo inclui `GroupID`, idade média, percentual feminino, escalas de personalidade/emoção, tamanho, amizade, métricas de comunicação/conversa, scores de tarefas e fatores compostos [6]–[8].

Esses CSVs são **derivados/agregados**. Não contêm chat bruto, eventos, timestamps por mensagem, sequência temporal de tarefa, conteúdo de conhecimento distribuído ou reconstrução de quem informou o quê. A API retorna `public: true` e `license: null`; por isso a cópia temporária foi usada somente para inspeção e não foi preservada no repositório.

## O que o OSF permite afirmar

Pode-se comparar, em nível de grupo, medidas agregadas de composição, traços, comunicação resumida e desempenho/fatores de CI, desde que a unidade de análise seja grupo e as dependências sejam respeitadas. Não se pode reconstruir processo temporal, leakage, conteúdo informacional ou direção causal a partir dos dois CSVs isolados.

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
