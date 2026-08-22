# PROSPECTIVE-REANALYSIS.md

## Desenho executado

A reconstrução usa 64 linhas sessão/equipe–tarefa válidas, com 51 no treino e 13 no teste. O target é `Matrix Solving`; `TC` é o início de Matrix; `TY_proxy` é o início da próxima tarefa. O split é 80/20 cronológico por sessão. Seed `2026`. A família de modelo é a mesma para M0/M1/M2: `HistGradientBoostingRegressor` com imputação e padronização ajustadas no treino.

## Resultados no teste

| Modelo | MAE | RMSE | R² | Leitura |
|---|---:|---:|---:|---|
| BASE_MEAN | 1,553544 | 1,947071 | -0,033377 | baseline ingênuo |
| M0 HISTORY | 1,496742 | 1,631221 | 0,274695 | baseline histórico |
| M1 HISTORY + NETWORK | 1,513082 | 1,622039 | 0,282838 | MAE pior; RMSE/R² levemente melhores |
| M2 HISTORY + NETWORK + COLLABORATION | 1,546141 | 1,627213 | 0,278255 | pior que M0 em MAE; ganho mínimo em RMSE/R² |

M1 não reduz MAE; M2 também não. A melhora de RMSE/R² de M1 é pequena e não atende ao critério pré-especificado de ganho em MAE mais confirmação em outra métrica. Não promover resultado por uma métrica favorável.

## Placebos, cutoff e estabilidade

Os 20 placebos adicionados têm médias MAE 1,503071, RMSE 1,658603 e R² 0,248274. Na sensibilidade de cutoff, M1 varia entre MAE 1,509676 e 1,513082; M2 varia entre 1,492815 e 1,546141. O melhor M2 aparece em `TC - 60 s`, mas o ganho de MAE sobre M0 é inferior a 1% e desaparece em outros cutoffs.

Nos blocos early/late, M0, M1 e M2 produziram as mesmas métricas em cada bloco: early MAE 1,994286/RMSE 2,512733/R² -0,381150; late MAE 1,800000/RMSE 2,441311/R² -0,553404. Cada bloco tem somente 7 observações de teste, portanto a estabilidade é informativa como alerta, não como validação forte.

## Separação de interpretações

**Observation:** 64 sessões possuíam score Matrix Solving e logs temporais vinculáveis; 51/13 foram usadas em treino/teste.

**Model result:** M0 teve menor MAE; M1 teve RMSE/R² ligeiramente melhores; M2 não melhorou de modo consistente.

**Statistical interpretation:** não foi demonstrado incremento preditivo robusto de rede ou colaboração sobre histórico neste subconjunto e desenho.

**Scientific interpretation:** informação de rede/colaboração reconstruída antes de TC não acrescentou ganho prospectivo consistente ao baseline histórico sob este protocolo.

**Unsupported interpretations:** não se pode dizer que colaboração causa desempenho, que rede é irrelevante em geral, que a TPC foi testada ou que qualquer variável representa EO/deformação.

## Referências

[1]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[2]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s001 "PLOS e0204547 S1 Dataset"
[3]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s002 "PLOS e0204547 S2 Text"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/2c9f67fbfedbf22c6c31919e3924ca136366cedc/03-pesquisa/science-radar/004 "SCIENCE-RADAR-004 observation audit"
