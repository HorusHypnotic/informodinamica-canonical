# TPC-GATE-RETRO-002 — LOCAL SIGNAL BREAKER

**Base:** `main @ a86832d756cb9ec73ced7dedb408c65e33700b71`  
**Tipo:** adversário do primeiro Gate retrospectivo  
**Domínio:** operações de TI  
**Gate final:** `SIGNAL KILLED`

## Objetivo

Tentar destruir o `LOCAL SIGNAL` do `TPC-GATE-RETRO-001`, sem alterar o snapshot congelado. O teste pergunta se o ganho de 2,42% de X/C permanece quando comparado com um baseline histórico convencional mais forte.

## Reprodução

O resultado do RETRO-001 foi reproduzido aproximadamente:

| Modelo | MAE |
|---|---:|
| M0 `P + O + S₀` | 185,32 h |
| M3 `P + O + X + C` | 180,85 h |

A mesma divisão temporal e a mesma base UCI foram usadas.

## Ataque decisivo

O baseline histórico **MH**, sem nomenclatura TPC, recebeu contagens históricas, severidade passada, duração média, taxa de incidentes e tempo desde o evento anterior. Resultado:

| Modelo | MAE | RMSE | R² |
|---|---:|---:|---:|
| M0 | 185,315 h | 410,663 h | 0,1004 |
| M3 | 180,846 h | 409,538 h | 0,1053 |
| MH | **180,828 h** | **406,845 h** | **0,1171** |
| MHXC | 181,994 h | 408,459 h | 0,1101 |
| Null history | 182,228 h | **406,348 h** | **0,1192** |

Depois que o histórico convencional é conhecido, adicionar X/C piora o modelo. A explicação mais parcimoniosa é que o sinal original codifica path dependence e volume histórico, não uma contribuição específica de EPP/Estado de Reserva.

## Placebos e estabilidade

Foram executadas 20 permutações de X/C. O placebo teve MAE médio de 189,320 horas, contra 180,846 horas do M3; o ganho temporal desaparece quando a relação histórica é destruída. Isso confirma que há informação temporal, mas não que ela seja específica da TPC.

O sinal também foi instável. Na primeira metade temporal, M3 superou M0; na segunda metade, M3 foi pior. O ganho concentrou-se em alguns estratos de impacto e não foi consistente em todas as métricas.

## Leakage e limitações

Não foi encontrado leakage explícito na construção de X/C/H: as agregações históricas usam eventos anteriores à abertura do incidente. Há risco operacional na variável O, pois o primeiro update ocorre após a abertura, e `C_capacity_proxy` é uma transformação do backlog, não uma medida direta de capacidade. Incidentes sem encerramento e sem próximo desfecho foram excluídos, gerando survivorship bias.

O teste `Δt < Tr` permaneceu não testável de forma confirmatória porque o dataset não fornece Tr independente e defensável.

## Gate

# SIGNAL KILLED

O `LOCAL SIGNAL` é morto como sinal específico de X/C nesta base. O resultado não refuta a possibilidade de efeitos persistentes ou estados de reserva em outros domínios; apenas mostra que este ganho não sobrevive ao baseline histórico forte.

## Preservação

`TPC-GATE-RETRO-001/` é um fóssil experimental e não foi modificado. O RETRO-002 é um snapshot separado. Qualquer estudo futuro deve usar novo ID e não sobrescrever estes outputs.

## Proveniência

Dataset: UCI Machine Learning Repository, dataset 498, *Incident management process enriched event log*, DOI [10.24432/C57S4H](https://doi.org/10.24432/C57S4H), [página oficial](https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log).

## Reprodução

O código está em `src/analyze_retro002.py`. Os outputs derivados estão em `results/` e `data/`. O CSV bruto não está commitado por tamanho; o código e a documentação apontam para a fonte oficial.
