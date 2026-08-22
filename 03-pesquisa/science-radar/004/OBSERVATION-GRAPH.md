# OBSERVATION-GRAPH.md

## PLOS e0204547 — cadeia observacional

| REAL-WORLD PHENOMENON | INSTRUMENT / COLLECTION METHOD | RAW OBSERVATION | TRANSFORMATION | STORED VARIABLE | PUBLISHED INTERPRETATION |
|---|---|---|---|---|---|
| Participante envia mensagem/edita tarefa | Plataforma de estudo e logger | Evento com tipo, sujeito/alias, sessão, payload e timestamp | Filtro por tipo; contagem/ordenação; eventual anonimização/export | Log CSV; `log-nturns`, palavras, caracteres, delays | Comunicação/processo de equipe |
| Membros interagem em uma tarefa | Chat e eventos de aplicação | Sequência temporal de eventos | Grafo por janela/relacionamentos, agregação por equipe | Densidade, grau, centralidade, reciprocidade, conectividade | Collaboration network |
| Equipe tem composição e atributos | Cadastro/questionários/tarefa | Respostas, modalidade, demografia, traços e scores | Médias, dispersões, recodificação Big Five | Features de equipe | Baseline/team features |
| Equipe executa tarefas | Tarefas padronizadas da plataforma | Resposta/score por tarefa | Estatísticas de trajetória e agregação | first/last/mean/median/variance/trend | Performance dynamics |
| Modelo estatístico relaciona features e score | Script/analysis pipeline | Matrizes e coeficientes derivados | Correlação, p-value, regressão, seleção de features | CSVs em `correlation-regression` | Predictive relationship |
| “Coordenação” | **UNKNOWN** como observação direta | Não há campo com constructo independente | Não reconstruir | **UNKNOWN** | Não pode ser inferida apenas do log |

## OSF qwbaf — cadeia observacional

| REAL-WORLD PHENOMENON | INSTRUMENT / COLLECTION METHOD | RAW OBSERVATION | TRANSFORMATION | STORED VARIABLE | PUBLISHED INTERPRETATION |
|---|---|---|---|---|---|
| Grupo realiza tarefas coletivas | Instrumento original não presente nos CSVs | **UNKNOWN** | **UNKNOWN** | Scores agregados por grupo | Collective intelligence/performance |
| Grupo possui composição/traços | Questionários e cadastro, instrumento original não presente | **UNKNOWN** em nível de item | Média/agregação | `Average_IQ`, traços, percentual feminino, tamanho | Team composition |
| Grupo conversa/coordena | Processo original não presente | **UNKNOWN** | Agregação | `Conversational_TurnTaking_SD`, `GC_Tt`, `GWC`, etc. | Collaboration/process proxy |
| Estado representacional | Nenhum campo direto | **ABSENT** no export auditado | — | **ABSENT** | Não pode ser usado para explicação retrospectiva |

## Regra de leitura

O grafo mostra que “network”, “communication”, “collaboration” e “collective intelligence” são nomes de variáveis/constructos após instrumentação e transformação. Eles não são a realidade inteira. Onde a cadeia perde o elo — especialmente conteúdo semântico, acurácia da representação, intenção, interpretação e significado de uma mensagem — o rótulo correto é **UNKNOWN**, não uma narrativa preenchida.

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
