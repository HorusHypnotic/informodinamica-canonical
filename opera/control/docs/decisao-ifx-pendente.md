# IFX - decisão teórica e operacional pendente

**Estado documental:** `ACTIVE` - bloqueador de implementação
**Data:** 2 de agosto de 2026

## Fórmulas concorrentes

### Formulação registrada na candidata teórica

\[
IFX_0=Sensibilidade+Precisão+Velocidade+Aprendizado
\]

### Formulação recebida no inventário

\[
IFX_1=0{,}15IS+0{,}20IP+0{,}40IV+0{,}25IA
\]

onde foram informados Sensibilidade, Persistência, Vulnerabilidade e Adaptabilidade.

## Conflitos

1. Precisão, Velocidade e Aprendizado são removidos sem justificativa ou relação de substituição.
2. Persistência pode significar duração da degradação, continuidade da representação ou estabilidade da recuperação.
3. Vulnerabilidade normalmente cresce quando a condição piora; somá-la positivamente pode inverter a direção do índice.
4. Adaptabilidade não possui instrumento ou escala definidos.
5. Pesos somam 1, mas não há método de elicitação, estimação ou calibração.
6. Nenhuma das fórmulas está validada como medida de restauração representacional na candidata v0.8.

## Decisão de engenharia

Não implementar IFX no dashboard ou banco até existir uma especificação aprovada contendo:

- construto e unidade de análise;
- direção de cada componente;
- escala, instrumento e tratamento de ausência;
- regra temporal de coleta;
- fórmula e interpretação;
- dados de calibração e análise de sensibilidade;
- relação com `EO`, `K_R`, `K_C` e ECO;
- versionamento que impeça comparar fórmulas diferentes como a mesma métrica.

## Experimento recomendado

Implementar ambas as fórmulas apenas em notebook ou módulo experimental, sob nomes `IFX_0` e `IFX_1`, depois comparar consistência, sensibilidade, estabilidade e associação com recuperação observada. Nenhuma deve receber o nome público IFX sem decisão humana conforme PRT-001.
