# RETRO-002R-REANALYSIS.md

## Objetivo e proveniência

Esta reanálise foi executada exclusivamente sobre os artefatos canônicos do RETRO-002 preservados em `HorusHypnotic/informodinamica-canonical`, na base **`e48daac4a2ee1c67786ceb1a34af42585ff71b24`**. Foram usados o README [1], o código [2], os resultados originais [3] [4] e o relatório adversarial [5]. O dataset foi baixado da fonte oficial UCI indicada pelo próprio patrimônio [9] [10], porque o CSV bruto não está commitado no repositório por tamanho/licenciamento.

O script canônico foi copiado para um diretório de trabalho isolado. A única alteração da reexecução foi: remover `O_first_update_hours` de `base_num` e da exportação das linhas analíticas; não foi introduzida variável substituta. A cópia modificada foi `analyze_retro002_without_o.py`, com SHA-256 `04f4759935b4d19c9c797848fcbacffdf739f96ac53d975864d052da642aa4aa`. O script canônico original permaneceu inalterado, SHA-256 `2eed60de3ef5a9b84b7eee35854ad5fb130b226577f9da3bceec5b12a8072602`.

## Dados e transformação preservados

O dataset produziu 141.712 eventos. O pipeline canônico agregou e filtrou 23.292 observações válidas para a sucessão por grupo, com 18.633 no treino e 4.659 no teste. A transformação manteve as variáveis de prioridade, impacto, urgência, categoria, tipo de contato e grupo; calculou `X_backlog_30d`, `C_throughput_30d`, `C_capacity_proxy`, `C_prior_mean_resolution` e o histórico convencional `H_*`; ordenou temporalmente; usou o próximo incidente do mesmo grupo como alvo; e aplicou split temporal 80/20.

A comparação é, portanto, entre a análise original e a mesma análise sem O, não entre dois desenhos novos. Os placebos continuam permutando X/C; a estabilidade continua dividida por metades temporais e estratos de impacto. Nenhum resultado original foi sobrescrito.

## Resultados principais

| Modelo | Original MAE | Sem O MAE | Original RMSE | Sem O RMSE | Original R² | Sem O R² |
|---|---:|---:|---:|---:|---:|---:|
| M0 — P+O+S0 / P+S0 | 185,315 | 186,772 | 410,663 | 408,859 | 0,1004 | 0,1083 |
| M1 — P+O+X / P+X | 180,645 | 179,566 | 412,607 | 421,022 | 0,0919 | 0,0545 |
| M2 — P+O+C / P+C | 180,334 | 181,742 | 410,503 | 410,336 | 0,1011 | 0,1019 |
| M3 — P+O+X+C / P+X+C | 180,846 | 181,504 | 409,538 | 411,398 | 0,1053 | 0,0972 |
| MH — P+O+HIST / P+HIST | 180,828 | 177,661 | 406,845 | 413,457 | 0,1171 | 0,0881 |
| MHXC — histórico+X+C | 181,994 | 182,207 | 408,459 | 408,870 | 0,1100 | 0,1083 |
| NULL_HISTORY | 182,228 | 182,103 | 406,348 | 407,630 | 0,1192 | 0,1137 |

## DATA / RESULT / INTERPRETATION

**DATA.** Remover O altera os números, mas não elimina o sinal nominal de X/C contra o baseline simples: M3 sem O tem MAE 181,504 versus M0 sem O 186,772. Porém, M3 sem O não é o melhor modelo em todas as métricas: `NULL_HISTORY` tem o melhor RMSE e R² entre os modelos sem O, enquanto MH tem o menor MAE.

**RESULT.** A conclusão adversa local permanece: X/C não demonstram contribuição necessária ou exclusiva além de histórico convencional. A análise sem O não transforma X/C em medida independente de representação.

**INTERPRETATION.** O RETRO-002 não dependia exclusivamente de O para produzir a conclusão `SIGNAL KILLED`; a retirada de O muda magnitude e ranking, mas não remove a explicação histórica concorrente. O resultado não testa diretamente EO, deformação ou coordenação.

**TPC CONSEQUENCE.** O resultado adverso contra a interpretação específica de X/C sobrevive em nível de conclusão. Ele não refuta o núcleo forte da TPC, porque a variável-alvo representacional não foi medida de modo independente.

## Limitações

O código original identifica `C_capacity_proxy` como transformação do backlog, portanto C não é uma medida independente de capacidade. O dataset também não contém medida direta de estado representacional, deformação, rastreabilidade, ambiguidade ou coordenação observada. A população analítica é restrita a incidentes com resolução e sucessor no mesmo grupo. Essas limitações já constavam do RETRO-002 e permanecem; retirar O resolve apenas a dúvida específica sobre a disponibilidade dessa variável no instante zero.

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
