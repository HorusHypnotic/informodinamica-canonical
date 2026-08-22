# TY-RADAR005-STATUS.md

## Status

`TY_PROXY_REMAINS`.

O artigo original do PLOS e0204547 declara que, para a conclusão de cada tarefa, cada grupo recebe um task score que reflete a qualidade da conclusão em escala específica.[3] Isso confirma a disponibilidade semântica do score no fim da tarefa. O material público consultado não fornece um evento separado, com timestamp, de publicação do score.

Nos logs, o primeiro `Load Instructions` da tarefa seguinte ocorre depois do início de Matrix Solving em todas as 64 sessões válidas auditadas no Radar-005. Portanto `TY_proxy` é defensável como limite observável posterior à conclusão operacional da tarefa, mas não como timestamp exato do score.

A pendência não invalida materialmente o Radar-005: o cutoff era o início de Matrix Solving e os eventos usados como features eram anteriores ao cutoff. O Radar-005 não foi refeito. A ressalva temporal foi carregada para a replicação OULAD.

## Referências

[1]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset "UCI Machine Learning Repository — OULAD"
[2]: https://www.nature.com/articles/sdata2017171 "Kuzilek, Hlosta & Zdrahal — Open University Learning Analytics dataset"
[3]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0204547 "Amelkin et al. — Dynamics of collective performance in collaboration networks"
[4]: https://github.com/riiid/ednet "EdNet official repository"
[5]: https://www.gharchive.org/ "GH Archive official site"
