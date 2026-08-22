# DATASET-CANDIDATES.md

## Regra de seleção

Os candidatos foram avaliados por integridade temporal, documentação, reprodutibilidade, qualidade do outcome, licença e independência de domínio. A seleção não usou desempenho esperado nem tentou reproduzir o resultado `NO_INCREMENT`.

| Candidato | Domínio | Temporalidade | Outcome | Documentação | Licença | Decisão |
|---|---|---|---|---|---|---|
| **OULAD** | educação online | assessments e VLE em dias relativos | score de assessment submetido posteriormente | artigo de dados + UCI + dicionário | CC BY 4.0 | **SELECTED** |
| EdNet | educação online | Unix ms por interação | correção/resposta posterior | README + artigo | CC BY-NC 4.0 | rejeitado: escala/download e licença menos flexíveis |
| GH Archive | software | eventos horários JSON | outcome exige construir coorte/censura | site + BigQuery | código MIT; dados com custódia heterogênea | rejeitado: outcome não curado e custo de reconstrução |

### OULAD selecionado

O UCI descreve OULAD como multivariado, sequencial e time-series, com tabelas conectadas por identificadores. O artigo de dados descreve estudantes, assessments e logs de interação VLE resumidos diariamente, com datas relativas ao início da apresentação. A licença CC BY 4.0 é compatível com análise e referência reproduzível.[1][2]

A independência é substantiva: o PLOS anterior estudava equipes e redes de colaboração; OULAD observa estudantes individuais, módulos educacionais, assessments e atividade de VLE. O método temporal é o objeto de reprodução, não as features nem o claim do PLOS.

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — OULAD"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
[3]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0204547 "Amelkin et al. — Dynamics of collective performance in collaboration networks"
[4]: https://github.com/riiid/ednet "EdNet official repository"
[5]: https://www.gharchive.org/ "GH Archive official site"
