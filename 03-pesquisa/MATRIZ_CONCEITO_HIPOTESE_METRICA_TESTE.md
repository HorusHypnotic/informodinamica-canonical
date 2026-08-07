# Matriz Conceito-Hipótese-Métrica-Teste

**Status:** Draft - instrumento de rastreabilidade científica

| Conceito | Status | Variável | Hipóteses | Métrica candidata | Evidência necessária | Modelo concorrente |
|---|---|---|---|---|---|---|
| Transição operacional | Hipótese probabilística | (P_{ij}) | HYP-004 a HYP-008 | Frequência ou risco de transição | Séries longitudinais | Sobrevivência, regressão, baseline histórico |
| Identidade operacional | Conceito exploratório | (I(S,t)) | HYP-009 a HYP-013 | Índice de continuidade ainda não definido | Histórico de versões e decisões | Identidade binária, grafo de proveniência |
| Capacidade coordenadora | Hipótese de composição | (K(S,t)) | HYP-014 a HYP-018 | Produto, média ou função calibrada | Atributos e resultados operacionais | Modelo aditivo, interativo ou de limiar |
| Escolha coordenada | Linha exploratória | \(\Pr(E)\) | HYP-019 a HYP-023 | Taxa de decisão adequada ao critério declarado | Alternativas, decisão, execução e resultado | Modelo qualitativo, utilidade, racionalidade limitada |

## Regras de leitura

1. Variável não significa métrica validada.
2. Métrica candidata não significa instrumento calibrado.
3. Associação observada não demonstra causalidade.
4. Cada teste deve declarar domínio, amostra, baseline, variáveis de confusão e critério de falha.
5. Resultados devem apontar para a versão exata do enunciado testado.

## Agenda mínima de validação

| Fase | Entrega | Critério mínimo |
|---|---|---|
| 1. Consolidação conceitual | Definições não redundantes | Revisão contra Glossário e TPC |
| 2. Operacionalização | Protocolo de codificação | Concordância entre avaliadores |
| 3. Coleta longitudinal | Dados versionados | Proveniência e tratamento de ausência |
| 4. Comparação de modelos | Baselines e concorrentes | Validação cruzada ou temporal |
| 5. Validação preditiva | Previsões pré-registradas | Desempenho fora da amostra |
| 6. Implementação | Protótipo auditável | Separação entre cálculo e decisão humana |
| 7. Replicação | Outro domínio | Invariância ou limites documentados |
