# DATASET-INVENTORY.md

## Escopo e regra de preservação

Esta missão auditou os dados antes de perguntar o que a TPC poderia explicar. Foram recuperados arquivos públicos e metadados; os datasets externos não foram copiados para o patrimônio canônico. Preservaram-se apenas documentação, identificadores, URLs, hashes e conclusões.

## Inventário de recuperação

| Candidato | Recuperação | Conteúdo efetivamente encontrado | Forma | Licença/status | Hashes locais |
|---|---|---|---|---|---|
| PLOS ONE e0204547 S1 | **DATASET_RECOVERED** | 78 CSVs; 65 logs de equipe; `team-data.xlsx`; READMEs; tabelas de correlação e coeficientes derivados | ZIP oficial, 26.495.477 bytes após extração; inclui entradas brutas e derivadas | Licença do artigo deve ser conferida no registro da publicação antes de redistribuir; não foi copiado ao repositório | S1 `54c33ca5338d6cb2cbb8215a0010ab6251f690d1018069ea94fa048d4a6d5ecc` |
| PLOS ONE e0204547 S2 | **SUPPLEMENT_RECOVERED** | Texto/metodologia suplementar | PDF, 72.941 bytes | Suplemento publicado; redistribuição não feita | `ba3d2b0e5ecd021488553167e57c31393918a999e989fb71c223c1666852336f` |
| PLOS artigo/metodologia | **ARTICLE_RECOVERED** | Artigo e descrição do desenho, tarefas, modelos, disponibilidade de dados | PDF/HTML | Publicação PLOS; licença a conferir para cópia | PDF `92e99b4c6896657b69f1d6b1f56245dda3c339e6a57a051fba7113b2d19375d1` |
| POGS | **CODE_RECOVERED** | Código da plataforma, Docker, Java/Maven, configuração de estudo demo e README | Git, branch `master`, commit `5d67d13294c62e5f3d4eb5c72de72bffa2962353` | `GPL-2.0` no arquivo LICENSE | LICENSE `8177f97513213526df2cf6184d8ff986c675afb514d4e68a404010521b880643` |
| OSF qwbaf | **DATA_RECOVERED_TEMPORARILY** | `CIGroup.main.csv` e `CIGroup.secondary.csv`, 29 linhas de dados cada mais cabeçalho | CSV agregado; 2.124 e 6.643 bytes no registro OSF | Projeto público; API retorna licença `null`; não redistribuir cópia | main `75a1f4f730a106f54cc6ecf81b9380348d7086b9bc0f69d768b687b243c6a067`; secondary `4ba11cab4a778adbba338082032fb58f67ec5c114e8c25ee50dadc3a3d1849f0` |

## Identificadores preservados

O PLOS foi identificado por DOI `10.1371/journal.pone.0204547`, suplementos `10.1371/journal.pone.0204547.s001` e `.s002`, PMCID `PMC6179230`. O POGS foi recuperado de `CCI-MIT/POGS`. O OSF é o nó `qwbaf`, “Exploring Collective Intelligence in Student Groups”, criado em 2023-04-06 e modificado em 2023-04-06; os arquivos possuem IDs `642eaf328f4a1c063bfc8d68` e `642eaf32c1760407a28ee8f5`, com downloads `mwfv7` e `ht7a2` [1]–[8].

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
