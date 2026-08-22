# REPLICATION-RESULT.md

## Resultado operacional

`REPLICATION_RESULT = REPRODUCED_WITH_LIMITATIONS`.

O pipeline foi executado em patrimônio independente, fora do domínio de equipes do PLOS, com reconstrução explícita de `REALITY → EVENT → TIMESTAMP → AVAILABLE AT TC → FEATURE → PREDICTION OF TY`. A aplicação foi executada sobre 42.663 linhas estudante–módulo–assessment, 12.952 estudantes, 34.149 linhas no treino e 8.514 no teste; estudantes foram separados entre os conjuntos.

## Métricas do teste

| Modelo | MAE | RMSE | R² |
|---|---:|---:|---:|
| BASE_MEAN | 17,297021 | 21,434760 | -0,000047 |
| M0 HISTORY | 11,746142 | 15,384422 | 0,484836 |
| M1 HISTORY + ACTIVITY | 11,700860 | 15,349057 | 0,487202 |
| M2 HISTORY + ACTIVITY + PROFILE | 11,633369 | 15,223728 | 0,495542 |

M2 melhorou MAE em aproximadamente 0,96% contra M0, RMSE em aproximadamente 1,04% e R² em 0,0107. O ganho está abaixo da região pré-especificada de 5% e não é promovido a claim robusto. O objetivo da missão era reproduzir o método, não o resultado `NO_INCREMENT`.

## Placebos e sensibilidade

A média dos 20 placebos com features de atividade embaralhadas foi MAE 11,776556, RMSE 15,414232 e R² 0,482837. O modelo real M2 foi modestamente melhor, mas a margem é pequena. Remover a última janela de 7 dias produziu M2 MAE 11,648077, ainda uma diferença pequena. A divisão cronológica de sensibilidade teve sobreposição de estudantes e, por isso, não foi usada para promover o resultado.

## Claim permitido

A capacidade temporal/prospectiva foi aplicada defensavelmente em um domínio educacional independente e produziu uma comparação prospectiva sem leakage detectável sob as regras implementadas. A força do resultado preditivo específico é limitada.

## Claims proibidos

Não se pode afirmar causalidade da atividade VLE, generalização para estudantes fora do OULAD, confirmação da TPC, equivalência de features ao PLOS ou que a atividade não importa em geral.

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — OULAD"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
[3]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0204547 "Amelkin et al. — Dynamics of collective performance in collaboration networks"
[4]: https://github.com/riiid/ednet "EdNet official repository"
[5]: https://www.gharchive.org/ "GH Archive official site"
