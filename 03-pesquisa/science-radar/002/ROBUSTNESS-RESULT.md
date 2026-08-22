# ROBUSTNESS-RESULT.md

## Comparação

A reanálise sem O foi executada mantendo dataset, agregação, features históricas, split temporal, algoritmo, seed, placebos e estabilidade do RETRO-002. A única exclusão foi `O_first_update_hours`.

## Classificação

**ROBUSTNESS_CLASS: A — SOBREVIVE**, em nível de conclusão, com mudança de magnitude e de ranking métrico.

O resultado adverso contra a interpretação específica de X/C permanece porque, sem O, o modelo MH continua a oferecer a explicação histórica concorrente mais parcimoniosa em MAE, enquanto `NULL_HISTORY` oferece o melhor RMSE/R². M3 mantém alguma vantagem sobre o baseline simples em MAE, mas perde em RMSE/R² para modelos históricos e não mostra contribuição específica de X/C. Assim, o `SIGNAL KILLED` do relatório canônico sobrevive como conclusão sobre a necessidade demonstrada de X/C; não sobrevive como identidade numérica exata entre as tabelas.

## Mudanças observadas

| Dimensão | Resultado |
|---|---|
| Sinal | O sinal nominal de X/C contra M0 permanece em MAE; a interpretação específica não ganha força |
| Magnitude | M3 passa de MAE 180,846 para 181,504 e de RMSE 409,538 para 411,398 |
| Ranking | Sem O, MH tem melhor MAE; NULL_HISTORY tem melhor RMSE/R²; M3 não é dominante |
| Classificação | A — sobrevive em nível de conclusão adversa |
| Força | Não há incremento específico de X/C; a força contra a interpretação TPC continua limitada ao dataset e à operacionalização |
| M específico | O risco de O estar disponível tarde demais é removido; a ausência de medida EO permanece |

## Placebos e estabilidade

O placebo sem O teve MAE médio 190,147, RMSE médio 411,884 e R² médio 0,0950; o placebo original tinha 189,320, 411,622 e 0,0961. A remoção de O não transforma a ordenação histórica em evidência TPC: o placebo continua servindo apenas como ataque à temporalidade de X/C.

A instabilidade permanece. Sem O, M3 melhora M0 na metade inicial, mas piora na metade tardia; por impacto, melhora em 1 e 2, mas piora em 3. Isso impede uma leitura universal ou estável do efeito.

## O que a classificação não significa

A classificação A não significa que a TPC foi refutada globalmente, nem que a variável O era irrelevante para todas as perguntas. Significa que retirar O não muda substancialmente a conclusão adversa sobre X/C. Também não significa que a ausência de EO no dataset seja evidência de que EO não exista.

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
