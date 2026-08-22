# OULAD-AUTOPSY.md

## Inventário

| Arquivo | Linhas | Papel |
|---|---:|---|
| `assessments.csv` | 206 | calendário, tipo, data e peso dos assessments |
| `studentAssessment.csv` | 173.912 | submissões, `date_submitted` e score |
| `studentInfo.csv` | 32.593 | atributos do estudante/módulo |
| `studentRegistration.csv` | 32.593 | registro e datas de matrícula |
| `studentVle.csv` | 10.655.280 | eventos VLE agregados por dia/site/estudante |
| `vle.csv` | 6.364 | materiais e tipos de atividade |

O ZIP oficial UCI foi recuperado com SHA-256 `f2ed1902616c1fe8d2824d872c0b7d2d72be435bf0124d077044fe4be2c6d3e4`. Foram usados somente os CSVs brutos; nenhuma tabela de resultado de terceiros entrou no pipeline.

## Relações observáveis

A cadeia `STUDENT ↔ MODULE/PRESENTATION ↔ ASSESSMENT ↔ SUBMISSION ↔ VLE` é reconstruível por `id_student`, `code_module`, `code_presentation`, `id_assessment`, `id_site` e datas. O join de `studentAssessment` com `assessments` teve cobertura 100% no inventário.

## Temporalidade

`assessments.date`, `studentAssessment.date_submitted` e `studentVle.date` são dias relativos ao início da apresentação. O score-alvo é posterior ao assessment date em todas as linhas elegíveis. A atividade VLE usada satisfaz `date < TC`; scores históricos satisfazem `date_submitted < target date_submitted`. A granularidade é diária, não event-level.

## Limitações

Há submissões antes da data planejada do assessment; elas foram excluídas do target prospectivo. 98.875 linhas foram excluídas por `date_submitted <= assessment date` e 3.517 por não possuírem submissão histórica estritamente anterior. O dataset é observacional e não registra semântica das ações, apenas agregados diários.

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — OULAD"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
[3]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0204547 "Amelkin et al. — Dynamics of collective performance in collaboration networks"
[4]: https://github.com/riiid/ednet "EdNet official repository"
[5]: https://www.gharchive.org/ "GH Archive official site"
