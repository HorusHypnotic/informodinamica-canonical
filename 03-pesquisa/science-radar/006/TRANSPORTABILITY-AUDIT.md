# TRANSPORTABILITY-AUDIT.md

| Dimensão | Resultado | Evidência | Limitação |
|---|---|---|---|
| PIPELINE | **PASS** | pipeline operou fora de equipes, em educação online | não é prova de universalidade |
| PROVENANCE | **PASS** | genealogia reconstruída dos CSVs brutos até features | VLE já é resumo diário |
| TEMPORALITY | **PASS-CONDITIONAL** | features filtradas por `date < TC`, outcome por `date_submitted > TC` | datas são relativas e diárias |
| SPLIT | **PASS** | split por estudante; 10.361 train e 2.591 test students | análise cronológica sensível tem overlap, não promovida |
| PLACEBOS | **PASS** | 20 embaralhamentos; real M2 modestamente superior | margem pequena |
| INTERPRETATION | **PASS** | resultado limitado a previsão, sem causalidade/TPC | outcome e atividade têm escala própria |

## Falhas encontradas

Foram encontrados dois defeitos de implementação no primeiro script: conversão de valores vazios na coluna `date` e colisão de nomes na agregação da janela de 7 dias. Ambos foram corrigidos antes da execução final e não alteraram a especificação, o dataset ou critérios; o script final é o artefato preservado. Foi registrada uma clarificação pré-modelo sobre TC em `DEVIATION-001.md`.

Não foi encontrada falha fundamental do método Radar-005. A principal limitação transportada é a perda de granularidade: OULAD tem atividade VLE diária, enquanto o PLOS tinha logs de eventos mais finos.

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — OULAD"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
[3]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0204547 "Amelkin et al. — Dynamics of collective performance in collaboration networks"
[4]: https://github.com/riiid/ednet "EdNet official repository"
[5]: https://www.gharchive.org/ "GH Archive official site"
