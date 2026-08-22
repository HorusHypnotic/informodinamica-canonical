# TPC-GATE-RETRO-002 — LOCAL SIGNAL BREAKER

**Base canônica:** `main @ a86832d756cb9ec73ced7dedb408c65e33700b71`  
**Objetivo:** tentar destruir o `LOCAL SIGNAL` do RETRO-001 com adversários históricos mais fortes e auditorias de robustez.  
**Gate final:** **SIGNAL KILLED**.

> O ganho de 2,42% não sobreviveu ao adversário decisivo: um baseline histórico convencional com variáveis de volume, severidade e duração passadas previu tão bem ou melhor que o modelo com X/C. O resultado mais parcimonioso é que o sinal original codificava informação histórica operacional, não uma contribuição específica demonstrada de EPP/Estado de Reserva.

## 1. Preservação e auditoria do RETRO-001

O branch verificado foi `main`, com `HEAD = a86832d756cb9ec73ced7dedb408c65e33700b71`, exatamente a base canônica informada no prompt. A working tree estava limpa antes da análise. Os sete checksums dos artefatos do RETRO-001 foram verificados com `sha256sum -c` e todos retornaram `OK`.

Nenhum arquivo dentro de `experiments/TPC-GATE-RETRO-001/` foi alterado. O RETRO-002 foi criado em diretório separado e não sobrescreve código, relatório, dados derivados ou resultados do fóssil experimental.

## 2. Dataset e reprodução do resultado original

Foi usado o mesmo CSV público do [UCI Machine Learning Repository, dataset 498](https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log), *Incident management process enriched event log*, DOI [10.24432/C57S4H](https://doi.org/10.24432/C57S4H). O conjunto tem 141.712 eventos e foi agregado em 23.292 incidentes válidos para a sucessão por grupo de suporte; a diferença em relação aos 23.362 incidentes agregados reportados no RETRO-001 decorre da filtragem final de pares sem próximo desfecho resolvido.

A reprodução aproximada foi bem-sucedida:

| Modelo | RETRO-001 | RETRO-002 | Diferença |
|---|---:|---:|---:|
| M0 `P + O + S₀` — MAE | 185,32 h | 185,32 h | arredondamento desprezível |
| M3 `P + O + X + C` — MAE | 180,85 h | 180,85 h | arredondamento desprezível |
| Ganho M3 contra M0 | 2,42% | 2,41% | arredondamento |

O resultado original é, portanto, reproduzível aproximadamente dentro do mesmo pipeline e split temporal.

## 3. Variáveis e desenho temporal

| Elemento | Operacionalização |
|---|---|
| **P** | impacto, urgência, prioridade, categoria, tipo de contato e grupo do incidente atual |
| **O** | tempo da abertura até a primeira atualização observada |
| **S₀** | atributos disponíveis no primeiro registro do incidente e grupo/categoria inicial |
| **X** | backlog histórico no grupo: incidentes abertos nos 30 dias anteriores menos fechados antes da abertura atual |
| **C** | throughput de fechamentos nos 30 dias anteriores, inversa do backlog e média histórica de resolução em 90 dias |
| **H** | histórico bruto convencional: contagens em 30/90 dias, severidade média, duração média, taxa de incidentes e tempo desde o evento anterior |
| **Y** | tempo de resolução do próximo incidente no mesmo grupo de suporte |
| **Δt** | intervalo entre abertura do incidente atual e abertura do próximo incidente do grupo |
| **Tr** | não definido independentemente; `Δt < 24 h` é somente sensibilidade exploratória, não teste confirmatório |

Todos os indicadores históricos foram construídos usando apenas incidentes anteriores à abertura atual. O alvo é o tempo de resolução do incidente seguinte. O split é temporal: 80% inicial para treino e 20% final para teste, com 18.633 observações de treino e 4.659 de teste.

## 4. Ataque 1 — ablação

| Modelo | Preditores adicionais | MAE (h) | RMSE (h) | R² |
|---|---|---:|---:|---:|
| **M0** | P + O + S₀ | 185,315 | 410,663 | 0,1004 |
| **M1** | M0 + X | 180,645 | 412,607 | 0,0919 |
| **M2** | M0 + C | 180,334 | 410,503 | 0,1011 |
| **M3** | M0 + X + C | 180,846 | 409,538 | 0,1053 |

X sozinho reduz MAE, mas piora RMSE e R². C sozinho obtém o menor MAE, mas quase não aumenta R². A combinação X+C melhora RMSE e R², mas não produz um ganho claro e independente de uma proxy específica. A ablação não autoriza dizer que EPP e Estado de Reserva são ambos necessários.

## 5. Ataque 2 — baseline histórico forte

O baseline histórico forte **MH** adicionou ao modelo convencional: número de incidentes anteriores em 30 e 90 dias, severidade e urgência históricas, duração média histórica, taxa de incidentes e tempo desde o incidente anterior. Nenhuma dessas variáveis foi nomeada como X ou C.

| Modelo | MAE (h) | RMSE (h) | R² |
|---|---:|---:|---:|
| **M0** — P + O + S₀ | 185,315 | 410,663 | 0,1004 |
| **M3** — P + O + S₀ + X + C | 180,846 | 409,538 | 0,1053 |
| **MH** — P + O + S₀ + histórico bruto | **180,828** | **406,845** | **0,1171** |
| **MHXC** — MH + X + C | 181,994 | 408,459 | 0,1101 |
| **NULL_HISTORY** — subset convencional de histórico | 182,228 | **406,348** | **0,1192** |

O adversário decisivo venceu M3 em MAE por 0,018 hora e em RMSE por 2,69 horas, além de obter R² maior. Adicionar X/C ao histórico forte piorou todas as métricas principais em relação a MH. Assim, os 2,42% são explicados de maneira parcimoniosa por informação histórica convencional.

## 6. Ataque 3 — placebos temporais

Foram executadas 20 permutações de X e C no treino e no teste, destruindo sua relação temporal, mas preservando distribuições marginais. O modelo TPC placebo apresentou:

| Estatística das 20 execuções | MAE (h) | RMSE (h) | R² |
|---|---:|---:|---:|
| Média | 189,320 | 411,622 | 0,0961 |
| Desvio-padrão | 2,270 | 3,994 | 0,0175 |
| Mínimo MAE | 184,242 | — | — |
| Máximo MAE | 192,062 | — | — |

O placebo destrói o ganho médio, o que mostra que a ordenação temporal carrega informação. Porém, esse resultado não salva X/C: o histórico bruto MH preserva a temporalidade e explica o ganho tão bem ou melhor sem a interpretação TPC. O placebo também não foi tratado como prova causal, pois uma permutação altera diversas propriedades conjuntas do conjunto.

## 7. Ataque 4 — estabilidade

Os resultados não são estáveis em todos os regimes. A primeira metade temporal favorece M3 contra M0, mas a segunda metade favorece M0 contra M3. Em estratos de impacto, o ganho aparece no grupo de impacto médio, mas desaparece ou inverte-se em impacto alto e baixo.

| Segmento | M0 MAE | M3 MAE | Diferença M3−M0 |
|---|---:|---:|---:|
| Primeira metade | 217,163 | 176,894 | **−40,269 h** |
| Segunda metade | 177,646 | 192,559 | **+14,913 h** |
| Impacto 1 | 285,155 | 262,243 | **−22,912 h** |
| Impacto 2 | 190,796 | 177,954 | **−12,842 h** |
| Impacto 3 | 202,101 | 181,482 | **−20,619 h** |

A tabela não deve ser lida como vitória por subamostra. Ela mostra que o desempenho muda substancialmente com regime temporal e severidade. O histórico forte também muda de comportamento, e MHXC não supera MH nos segmentos reportados. A direção do sinal não é minimamente estável o bastante para `ROBUST LOCAL SIGNAL`.

## 8. Ataque 5 — janelas temporais

O RETRO-001 usa uma janela principal de 30 dias para backlog/throughput e 90 dias para média de duração. O RETRO-002 preserva essa especificação para reprodução e adiciona janelas históricas brutas de 30/90 dias no MH. Não foi feita uma busca pós-hoc pela janela que maximizasse o efeito. Isso limita a conclusão, mas evita transformar sensibilidade em otimização retrospectiva.

A recomendação é que o próximo estudo pré-registre janelas curta, intermediária e longa e reporte todas. Com os resultados atuais, uma diferença entre X/C e histórico bruto não é identificável porque ambos dependem da escolha de janela.

## 9. Ataque 6 — leakage

A auditoria do código indica que a duração do incidente atual (`Y_hours`) é usada como alvo e não como preditor do próprio episódio. X, C e H são calculados a partir de incidentes com abertura ou fechamento anterior ao timestamp de abertura atual. O próximo tempo de resolução é deslocado por grupo e usado somente como desfecho.

Há, contudo, limitações de definição temporal. `O_first_update_hours` usa a primeira atualização registrada após abertura e só pode entrar em um cenário de previsão depois que essa janela de observação realmente terminou. O grupo inicial pode mudar ao longo do incidente. `C_capacity_proxy` é uma transformação do backlog, portanto não é uma medição independente de capacidade. Essas questões não foram ocultadas; elas reduzem a interpretação do ganho.

Não foi encontrado leakage explícito que invalide a reprodução. Foi encontrado **risco de leakage operacional** se O for interpretado como disponível no instante zero. Sob essa leitura, o modelo deve ser reexecutado sem O ou com uma janela de previsão claramente definida.

## 10. Ataque 7 — seleção e survivorship

O pipeline exclui incidentes sem timestamp de abertura ou sem duração resolvida e remove pares sem próximo incidente com desfecho. Isso gera seleção de casos encerrados e pode retirar incidentes ainda abertos ou muito difíceis. A agregação por primeiro registro elimina repetição de eventos dentro do incidente, enquanto o alvo é definido pelo próximo incidente do mesmo grupo; incidentes sem sucessor são necessariamente excluídos.

Esses filtros são coerentes com o objetivo de prever um tempo de resolução observável, mas tornam o Gate local ao subconjunto encerrado. Não há base para generalizar para todos os incidentes, serviços, organizações ou sistemas.

## 11. Ataque 8 — outliers e métricas

A duração de resolução tem cauda longa. Por isso foram reportados MAE, RMSE e R². O baseline e os modelos TPC apresentam R² baixo; a diferença de MAE é pequena em comparação com a dispersão indicada pelo RMSE. A análise não removeu outliers apenas porque prejudicavam o resultado.

A próxima replicação deve adicionar MAE mediano por grupo, erro logarítmico ou MAE sobre `log1p(Y)`, quantis, calibração e intervalos de confiança agrupados. O Gate atual permanece conservador porque a melhora de MAE não é acompanhada de melhoria consistente em todas as métricas.

## 12. Ataque 9 — null model

O modelo `NULL_HISTORY`, que usa um subconjunto de histórico bruto sem X/C, apresentou MAE de 182,228 horas, RMSE de 406,348 horas e R² de 0,1192. Esse resultado é melhor em RMSE e R² que M3. Portanto, não basta demonstrar que “alguma variável histórica” melhora; o histórico convencional simples já entrega desempenho comparável ou superior.

A explicação convencional mais forte é: volume recente, duração passada e composição de severidade capturam persistência e heterogeneidade operacional. O nome X/C não acrescenta informação demonstrada além desses correlatos históricos.

## 13. Resultados favoráveis ao sinal

O resultado favorável é que M3 reproduz aproximadamente o ganho do RETRO-001 e reduz MAE em relação a M0. O placebo temporal perde o ganho médio, sugerindo que a ordem dos eventos contém sinal. Em alguns segmentos, M3 supera M0 de modo material.

Esses fatos mantêm o fenômeno operacional interessante: histórico anterior ao incidente ajuda a prever o próximo tempo de resolução. Eles não isolam EPP, Estado de Reserva ou `Δt < Tr` como explicação necessária.

## 14. Resultados contrários

O baseline histórico forte MH supera M3 em RMSE e R² e empata praticamente em MAE. MHXC piora em relação a MH. A estabilidade por tempo e impacto é fraca. O teste `Δt < Tr` continua não confirmável porque Tr não é independente no dataset. X/C são proxies parcialmente colineares, e O pode não estar disponível no instante de previsão pretendido.

## 15. Gate final

# SIGNAL KILLED

O ganho específico atribuído à formulação X/C é eliminado pelo adversário histórico forte. O dataset mostra que informação sobre o passado importa, mas não mostra que a taxonomia TPC de EPP e Estado de Reserva melhora a previsão além de variáveis históricas convencionais.

Este Gate não afirma que a estrutura P–R–X–C–O seja falsa em todos os domínios. Afirma apenas que o primeiro sinal local de operações de TI não sobreviveu ao teste decisivo nesta base e nesta operacionalização.

## 16. Interpretação mínima permitida

É permitido afirmar que a previsão do próximo tempo de resolução se beneficia de histórico operacional e que o modelo RETRO-001 reproduz um ganho pequeno contra seu baseline simples. É permitido afirmar que MH elimina a necessidade preditiva demonstrada de X/C neste dataset.

É proibido afirmar confirmação da TPC, causalidade, transversalidade, existência de EPP como variável universal ou existência de reserva latente medida diretamente. Também é proibido afirmar que nenhum resíduo ou reserva exista em qualquer sistema.

## 17. Próxima ação

O próximo passo não é tentar salvar a nomenclatura. É construir, se houver interesse, um novo estudo que defina uma previsão que o histórico bruto não possa capturar trivialmente: por exemplo, uma medida independente de capacidade, uma perturbação-teste padronizada e um output mascarado com pareamento forte. Esse estudo deve ser novo e não pode sobrescrever o RETRO-001 ou o RETRO-002.

**NEXT_ACTION:** manter o RETRO-002 como breaker negativo do sinal local; qualquer novo teste deve ter novo ID, dados e genealogia.

## 18. Arquivos e reprodução

```text
experiments/TPC-GATE-RETRO-002/
├── README.md
├── SHA256SUMS.txt
├── report/TPC-GATE-LOCAL-SIGNAL-BREAKER.md
├── src/analyze_retro002.py
├── results/model_results_retro002.csv
├── results/placebo_results.csv
├── results/stability_results.csv
├── results/delta_24_summary.csv
└── data/analysis_rows_retro002.csv
```

O comando de reprodução é:

```bash
python3 src/analyze_retro002.py
```

A execução requer o CSV público do UCI, baixado pela URL oficial registrada no RETRO-001 e no código. O CSV bruto não é commitado neste snapshot por tamanho; os dados derivados e resultados estão preservados.

## 19. Fontes

1. Amarel, C., Fantinato, M. & Peres, S. (2019). *Incident management process enriched event log*. UCI Machine Learning Repository, dataset 498. [UCI](https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log).
2. Saha, A. & Hoi, S. C. H. (2022). *Mining Root Cause Knowledge from Cloud Service Incident Investigations for AIOps*. [arXiv](https://arxiv.org/abs/2204.11598).
3. Haghkerdar, J. M. et al. (2019). *Repeat disturbances have cumulative impacts on stream communities*. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6405533/).
