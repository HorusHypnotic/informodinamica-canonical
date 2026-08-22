# TEMPORAL-PROVENANCE.md

## Gate 1: realidade observada

O S1 contém `team-data.xlsx` com uma linha por `Session` e 65 arquivos de log com coluna `session`, `completed_task` e `timestamp`. Foram encontrados 68 sessões no workbook, 65 sessões nos logs, 65 sessões com tarefa `Matrix Solving`, 64 com vínculo workbook–log e 64 com score e transição temporal válida. Uma sessão foi excluída por não possuir linha correspondente no workbook.

| Relação | Resultado | Evidência | Limitação |
|---|---|---|---|
| TASK ↔ TEAM | **VALIDATED** | `completed_task` identifica `Matrix Solving-1`; `Session` do workbook corresponde a `session` do log | Uma sessão sem workbook foi excluída |
| TEAM ↔ LOG | **VALIDATED** | 64 sessões-alvo têm linha no workbook e logs correspondentes | O workbook é export agregado |
| LOG ↔ TIMESTAMP | **VALIDATED** | 228.318 eventos; timestamps ISO parseáveis e ordenáveis; intervalo observado 2012-07-09 a 2012-11-28 | Timezone explícito não foi encontrado no export; tratado como ordem temporal intra-sessão |
| TASK ↔ TIMESTAMP | **VALIDATED** | `Load Instructions` e `completed_task` permitem identificar o início da tarefa | Início/fim são eventos de aplicação, não relógio de score |
| OUTCOME ↔ TIMESTAMP | **PROXY-VALIDATED** | Score `Matrix Solving` existe no workbook; `TY_proxy` é o primeiro `Load Instructions` da próxima tarefa | O export não contém evento explícito “score publicado”; `TY` é proxy operacional |
| DEPENDÊNCIA | **VALIDATED** | Eventos aninhados em sessão/equipe, sujeito e tarefa | Não tratar eventos como observações independentes |
| REPETIÇÃO | **VALIDATED** | Sessões contêm múltiplas tarefas e múltiplos eventos | Split agrupado por sessão e ordenado no tempo |

## T0, TC, TY

`T0` é o primeiro timestamp do log da sessão. `TC` é o primeiro `Load Instructions` da tarefa `Matrix Solving`. `TY_proxy` é o primeiro `Load Instructions` da tarefa subsequente; em todas as 64 linhas válidas, `TC < TY_proxy`. A próxima tarefa observada foi `Detection - Images Trial`.

A validade de `TY_proxy` é suficiente para um gate prospectivo operacional, mas não equivale a prova de quando o score foi calculado no servidor. Por isso, os resultados não recebem interpretação causal nem são generalizados além do subconjunto auditado.

## Decisão

**Gate 1 passou com ressalva explícita:** a cadeia TASK ↔ TEAM ↔ LOG ↔ TIMESTAMP ↔ OUTCOME pode ser reconstruída para 64 sessões, mas a disponibilidade do outcome é proxy. Não houve improvisação de tarefa, sessão ou timestamp.

## Referências

[1]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[2]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s001 "PLOS e0204547 S1 Dataset"
[3]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s002 "PLOS e0204547 S2 Text"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/2c9f67fbfedbf22c6c31919e3924ca136366cedc/03-pesquisa/science-radar/004 "SCIENCE-RADAR-004 observation audit"
