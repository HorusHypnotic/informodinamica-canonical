# MEASUREMENT-INDEPENDENCE.md

## Pergunta

Existe no patrimônio experimental uma variável que represente o estado relevante da TPC sem ser derivada de O_first_update_hours, sem ser escolhida pós-hoc e sem confundir histórico operacional com estado representacional?

## Candidatas

| VARIABLE | WHAT_IT_MEASURES | WHY_INDEPENDENT | KNOWN_CONFOUNDERS | WAS_DEFINED_BEFORE_RESULT? |
|---|---|---|---|---|
| `H_prior_open_30d`, `H_prior_open_90d` | Volume histórico de incidentes abertos | Não usa O; foi construída antes do alvo do próximo incidente | Volume, sazonalidade, tamanho do grupo, regime operacional | Sim, presente no código e no desenho do RETRO-002 [2] |
| `H_prior_mean_impact_90d`, `H_prior_mean_urgency_90d` | Severidade/urgência históricas | Não usa O e é anterior ao desfecho | Mistura de composição de casos e política de classificação | Sim [2] |
| `H_prior_mean_duration_90d` | Duração média de incidentes anteriores | Não usa O; histórico anterior ao episódio-alvo | Seleção de incidentes resolvidos, cauda, regime e capacidade | Sim [2] |
| `H_prior_incident_rate_30d`, `H_hours_since_prior` | Ritmo e intervalo históricos | Não usa O e estava no modelo adversário | Dependência temporal, volume e autocorrelação | Sim [2] |
| `X_backlog_30d` e `C_throughput_30d` | Backlog/throughput históricos | Independentes de O, mas correlatos e proxies do mesmo histórico | C é parcialmente derivado de backlog; nenhum mede EO | Sim [2] |
| `impact_num`, `urgency_num`, `priority_num`, categoria, contato, grupo | Atributos do incidente atual e contexto | Não dependem de O | Codificação administrativa, confusão por tipo de caso | Sim [2] |
| `EO`, deformação, ambiguidade, fidelidade, atualidade, rastreabilidade | Estado representacional da TPC | Seriam o alvo conceitual correto | Não há variável observada no patrimônio RETRO-002 | Não existente |

## Decisão

**Medida independente encontrada: PARCIAL, mas não no sentido exigido.** Existem covariáveis históricas independentes de O e definidas antes do resultado. Elas são adequadas para testar se X/C acrescentam informação a um baseline convencional, e foi exatamente isso que o RETRO-002 fez. Não existe, porém, uma medida independente já existente do estado representacional canônico. Portanto, o patrimônio permite testar a dependência de O e a necessidade preditiva de X/C, mas não permite testar diretamente HYP-001 forte.

Não é permitido transformar H, X ou C em confirmação retrospectiva da TPC: o próprio relatório canônico afirma que os proxies não são medidas diretas de dano, dívida técnica ou capacidade latente [5].

## Referências
## Referências

[1]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/experiments/TPC-GATE-RETRO-002/README.md "RETRO-002 README"
[2]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/experiments/TPC-GATE-RETRO-002/src/analyze_retro002.py "RETRO-002 canonical analysis script"
[3]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/experiments/TPC-GATE-RETRO-002/results/model_results_retro002.csv "RETRO-002 original model results"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/experiments/TPC-GATE-RETRO-002/results/stability_results.csv "RETRO-002 original stability results"
[5]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/experiments/TPC-GATE-RETRO-002/report/TPC-GATE-LOCAL-SIGNAL-BREAKER.md "RETRO-002 local signal breaker report"
[6]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/01-teoria/TPC.md "TPC canonical synthesis"
[7]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/03-pesquisa/PROTOCOLO_EXPERIMENTAL.md "TPC experimental protocol"
[8]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/e48daac4a2ee1c67786ceb1a34af42585ff71b24/03-pesquisa/VALIDACAO_EMPIRICA.md "Empirical validation register"
[9]: https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log "UCI dataset 498"
[10]: https://doi.org/10.24432/C57S4H "UCI dataset DOI"
