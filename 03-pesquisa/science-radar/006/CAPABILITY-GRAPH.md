# CAPABILITY-GRAPH.md

| Campo | Valor |
|---|---|
| CAPABILITY_ID | `PROSPECTIVE-RECONSTRUCTION-FROM-EVENT-LOGS` |
| NAME | Reconstrução prospectiva a partir de logs de eventos |
| VERSION | `1.1-reproduced-oulad` |
| INPUT_REQUIREMENTS | unidade identificável; evento/atividade temporal; cutoff; outcome posterior; documentação e licença |
| SUPPORTED_DOMAINS | equipes/colaboração (PLOS); educação online/VLE (OULAD) |
| EXECUTIONS | Radar-005: PLOS, `EXECUTED`; Radar-006: OULAD, `REPRODUCED_WITH_LIMITATIONS` |
| FAILURES | outcome sem timestamp exato no PLOS; granularidade diária no OULAD; dois defeitos de script corrigidos antes da execução final |
| KNOWN_LIMITATIONS | não mede causalidade; exige separação de entidades; sensível a granularidade, proxy de disponibilidade e qualidade do outcome |
| VALIDATION_LEVEL | `REPRODUCED_WITH_LIMITATIONS`; não promover a `ADVERSARIALLY_TESTED` |
| DEPENDENCIES | Python, pandas, NumPy, scikit-learn, openpyxl; CSVs brutos conforme licença |
| ARTIFACTS | preanalysis, deviation, audit, genealogy, leakage/transport audit, results, scripts, preservation record |
| PROVENANCE | OULAD UCI 349, DOI 10.24432/C5KK69, SHA do ZIP `f2ed1902616c1fe8d2824d872c0b7d2d72be435bf0124d077044fe4be2c6d3e4`; scripts preservados na missão |

## Regra de atualização futura

Uma missão futura pode acrescentar uma execução somente se preservar a pré-análise correspondente, declarar dataset e hash, registrar falhas e não misturar resultados de domínios. A promoção para `REPRODUCED` exige resolver as limitações principais ou demonstrar que não afetam o claim operacional.

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — OULAD"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
[3]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0204547 "Amelkin et al. — Dynamics of collective performance in collaboration networks"
[4]: https://github.com/riiid/ednet "EdNet official repository"
[5]: https://www.gharchive.org/ "GH Archive official site"
