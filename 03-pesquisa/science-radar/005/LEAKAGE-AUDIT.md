# LEAKAGE-AUDIT.md

## Auditoria por regra

| Regra | Resultado | Verificação |
|---|---|---|
| Toda feature de evento tem timestamp `< TC` | **PASS** | O script filtra logs por `event['_dt'] < cutoff` antes de derivar rede/colaboração |
| Outcome não entra na feature | **PASS** | `Matrix Solving` é usado somente como `Y_Matrix_Solving` |
| Tabelas derivadas não entram | **PASS** | Não foram lidos CSVs de correlação/regressão |
| Imputação aprende no treino | **PASS** | `SimpleImputer` é ajustado dentro do pipeline em cada treino |
| Split não usa resultado | **PASS** | 80/20 cronológico pré-fixado por sessão |
| Identidade de equipe não vaza | **PASS-CONDITIONAL** | Uma linha por sessão e split temporal; equipes repetidas além de sessão exigem confirmação no protocolo |
| Timestamps e timezone | **PASS-INTRASESSION / LIMITATION** | Ordem intra-sessão válida; timezone absoluto não foi disponibilizado |
| TY | **PASS-PROXY** | `TY_proxy` é próxima instrução; não há evento explícito de score publicado |

## Riscos remanescentes

O maior risco residual é medir o outcome agregado no workbook sem um evento explícito de publicação do score. O desenho usa a transição para a tarefa seguinte como proxy de disponibilidade. Também há dependência de que os atributos do workbook tenham sido obtidos antes de Matrix; essa informação vem do desenho/protocolo, não do timestamp de cada célula.

Os eventos de chat e edição anteriores a TC são considerados observáveis, mas a semântica cognitiva da mensagem não é inferida. O número de observações é pequeno e o split deixa 13 sessões no teste; isto limita precisão e torna qualquer ganho frágil.

## Controles

Foram executados 20 placebos permutando features adicionadas no treino e teste, mantendo marginais. A média placebo foi MAE 1,503071, RMSE 1,658603 e R² 0,248274. Como os placebos permanecem próximos do M0 e o ganho de M1/M2 não é consistente, não há evidência de incremento robusto.

## Referências

[1]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[2]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s001 "PLOS e0204547 S1 Dataset"
[3]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s002 "PLOS e0204547 S2 Text"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/2c9f67fbfedbf22c6c31919e3924ca136366cedc/03-pesquisa/science-radar/004 "SCIENCE-RADAR-004 observation audit"
