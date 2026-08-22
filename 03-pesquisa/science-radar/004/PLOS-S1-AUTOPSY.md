# PLOS-S1-AUTOPSY.md

## WHO

O pacote observa equipes pequenas participantes de estudos de desempenho coletivo, com sessões `XVal Session [ID]`, grupos e sujeitos. O `team-data.xlsx` registra atributos de equipe, demografia, personalidade Big Five, perceptividade social, modalidade face-to-face versus chat e scores de tarefas. Os logs identificam eventos por sujeito, alias/chat, sessão e grupo. Não há, no pacote auditado, observação direta de “estado representacional” ou de uma entidade TPC.

## WHAT

| Camada | Observação |
|---|---|
| Equipe | Sessão/grupo, modalidade, contagens de comunicação, composição e médias de traços |
| Participante | ID/alias de evento, sujeito e atividade registrada; atributos individuais aparecem agregados em algumas tabelas |
| Interação | Eventos `Chat`, `Edit pad`, `Edit Grid`, carregamento de instruções/workspace e outros eventos de aplicação |
| Comunicação | Texto/eventos em logs; `Chat` é usado no estudo para construir redes |
| Tarefa | Scores brutos para 15 tarefas no README, incluindo typing, detection, brainstorming, matrix, sudoku, judgement e memory |
| Desempenho | Scores e estatísticas dinâmicas: first/last/mean/median, variância, tendência e mudanças |

O que foi registrado diretamente é o evento do sistema, seu timestamp, tipo, identificadores e payload disponível; não é “coordenação” como constructo, nem conteúdo semântico completo de interpretação. O estudo publicado descreve como os logs foram convertidos em redes e modelos de previsão [1] [2] [4].

## WHEN

Os logs têm timestamps de evento, com amostras em julho de 2012. O pacote também contém ordem de sessão/tarefa e scores. A resolução temporal dos scores e o instante exato em que uma variável derivada se torna disponível não são uniformes em todos os arquivos.

## HOW

O instrumento é uma plataforma de estudo online/face-to-face com tarefas e logs de aplicação. O README define `Chat` como mensagem, `Edit pad` e `Edit Grid` como edição de tarefas, e descreve a construção de redes a partir dos eventos `Chat`. As tabelas de correlação/regressão já são produtos analíticos, não observações brutas [3] [4].

## UNIT

As unidades coexistem: evento de log, sujeito, sessão/grupo, tarefa e feature agregada por equipe/tarefa. Não se deve tratar uma linha de matriz de correlação como uma observação independente. A equipe é a unidade principal de desempenho; o log é a unidade principal de processo.

## RAWNESS

O S1 é misto. Os 65 CSVs de log são os itens mais próximos de observação bruta, embora já exportados pela plataforma e com IDs/eventos codificados. `team-data.xlsx` contém mistura de atributos registrados e scores brutos. CSVs de correlação, p-values e coeficientes são derivados/agregados.

## TRANSFORMATIONS

Transformações documentadas incluem: seleção de eventos `Chat`; contagem de caracteres/palavras/turnos; médias e dispersões de equipe; combinação dos pares do Big Five por `(positivo + (6 - negativo))/2`; construção de redes ponderadas e não ponderadas; janelas de 25/50/75%; densidade, grau, centralidade, clustering, reciprocidade e conectividade algébrica; estatísticas de trajetória dos scores; correlações e regressões. Os detalhes do algoritmo devem ser lidos no S2 e no código associado antes de qualquer reprodução [3] [4].

## OUTCOME

O desfecho publicado é desempenho/scores de tarefas, com modelos que predizem performance de equipe. Não há ECO, EO, HYP-001 ou métrica TPC registrada no pacote. O pacote observa desempenho e processo de colaboração, não uma causa representacional isolada.

## PRE_OUTCOME_DATA

Existem candidatos pré-desfecho: composição/traços medidos antes, modalidade, histórico de tarefas anteriores, timestamps de eventos anteriores e features de rede calculadas em uma janela anterior ao cutoff. Porém, as features originais “Amount of Comm.”, logs totais, scores `last`, `mean` e várias métricas de rede podem incorporar informação da própria tarefa ou posterior ao ponto de previsão. Sem um cutoff explícito, não são preditores prospectivos.

## MISSINGNESS E DEPENDENCIES

O pacote não documenta, em um esquema único, missingness por sujeito/evento/tarefa. Há logs por sessão e um conjunto de grupos; ausência de arquivo/evento pode significar não ocorrência, filtro de exportação ou dado ausente — **UNKNOWN**. Dependências são fortes: eventos pertencem ao mesmo sujeito, grupo, sessão e tarefa; múltiplas linhas de um log não são independentes; tarefas repetidas compartilham equipe; features de rede reutilizam os mesmos eventos.

## Limite da autópsia

Não foi executada a reanálise. O que foi estabelecido é o patrimônio observacional e sua transformação documentada, não uma nova estimativa causal.

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
