# OULAD-FEATURE-GENEALOGY.md

## M0 — histórico

`prev_score`, `hist_mean_score`, `hist_median_score`, `hist_n`, `hist_weighted_mean`, `days_since_prev_submission` e `prev_assessment_date` vêm de `studentAssessment.csv` e `assessments.csv`, restritos a submissões anteriores ao target. Atributos de `studentInfo.csv` e `studentRegistration.csv` são tratados como pré-módulo.

## M1 — atividade

`clicks_pre`, `sites_pre` e `active_days_pre` são agregados de `studentVle.csv` com `date < TC` por estudante–módulo–apresentação.

## M2 — perfil temporal

`clicks_7`, `active_days_7`, `clicks_30`, `active_days_30`, `activity_rate_7`, `activity_rate_30` e `activity_ratio_7_30` são calculados apenas a partir de dias VLE anteriores ao assessment alvo, em janelas de 7 e 30 dias.

| Controle | Resultado |
|---|---|
| Outcome usado como feature | **NO** |
| Eventos posteriores a TC | **NO** |
| Imputação ajustada no treino | **YES** |
| Tabelas derivadas publicadas | **NO** |
| Identidade do estudante nos dois splits | **NO** |
| Variáveis TPC | **NO** |

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — OULAD"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
[3]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0204547 "Amelkin et al. — Dynamics of collective performance in collaboration networks"
[4]: https://github.com/riiid/ednet "EdNet official repository"
[5]: https://www.gharchive.org/ "GH Archive official site"
