# ROBUSTNESS.md

## Classificação

**ROBUSTNESS_CLASS = NO_INCREMENT.** A classificação segue a especificação congelada: M1/M2 precisariam melhorar MAE e pelo menos uma entre RMSE/R², sobreviver a cortes/splits defensáveis e superar placebos. Nenhum modelo adicional satisfaz esse conjunto.

| Teste | M1 | M2 | Conclusão |
|---|---:|---:|---|
| MAE no split principal contra M0 | +1,09% pior | +3,30% pior | não suporta incremento |
| RMSE no split principal | 0,56% melhor | 0,25% melhor | ganho pequeno isolado |
| R² no split principal | +0,00814 | +0,00356 | ganho pequeno isolado |
| Cutoff -300 s | pior em MAE | pior em MAE | não robusto |
| Cutoff -60 s | pior em MAE | 0,26% melhor em MAE | sensível e abaixo da região de 5% |
| Placebos | próximos de M0 | comparação não favorável | não suporta sinal específico |
| Early/late | igual a M0 | igual a M0 | sem evidência de generalização |

## Dependência de poucas observações

Com 13 observações no teste principal e 7 por bloco de estabilidade, pequenas mudanças individuais podem alterar métricas. Não foi feita seleção posterior de cutoff, split ou métrica. O resultado deve ser lido como uma aquisição de capacidade sob amostra pequena, não como estimativa estável do fenômeno.

## Região inconclusiva

Os resultados entram na região inconclusiva para magnitude: qualquer vantagem pontual é inferior a 5% e não permanece entre métricas/cutoffs. A etiqueta operacional, contudo, é `NO_INCREMENT`, porque o critério pré-especificado exige incremento consistente e ele não foi observado.

## Referências

[1]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[2]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s001 "PLOS e0204547 S1 Dataset"
[3]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s002 "PLOS e0204547 S2 Text"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/2c9f67fbfedbf22c6c31919e3924ca136366cedc/03-pesquisa/science-radar/004 "SCIENCE-RADAR-004 observation audit"
