# HYP-004 a HYP-008 - Dinâmica Probabilística

**Status:** Draft
**Linha:** Modelo probabilístico da degradação

- **HYP-004:** O estado futuro de uma representação operacional pode ser estimado probabilisticamente a partir de seu estado atual, histórico de alterações e ambiente operacional.
- **HYP-005:** Diferentes dimensões do estado operacional apresentam taxas de degradação distintas.
- **HYP-006:** A degradação de determinados atributos aumenta a probabilidade de degradação posterior de outros atributos.
- **HYP-007:** Intervenções de atualização, validação e rastreabilidade reduzem a probabilidade de representações transitarem para estados críticos, mantidas comparáveis as demais condições.
- **HYP-008:** O risco de perda crítica da capacidade coordenadora de uma representação depende da intensidade, persistência temporal, recorrência e conectividade de sua degradação.

## Observação e refutação

As hipóteses exigem dados longitudinais. HYP-004 é enfraquecida se modelos com estado, histórico e ambiente não superarem baselines ingênuos fora da amostra. HYP-005 e HYP-006 exigem taxas e dependências estimáveis com incerteza. HYP-007 requer comparação causal ou quase-experimental. HYP-008 requer medida prévia de conectividade e comparação com modelos sem esses termos.
