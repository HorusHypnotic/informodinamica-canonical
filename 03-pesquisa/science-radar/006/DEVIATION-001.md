# DEVIATION-001.md

## Momento

Registrada antes da execução dos modelos e antes da abertura de resultados analíticos.

## Motivo

A redação inicial de `REPLICATION-PREANALYSIS.md` definia `TC` como o maior entre a submissão anterior e `assessment_date - 7 dias`, mas também determinava que as features VLE fossem calculadas com `date < assessment_date`. Essas duas regras não determinavam um único cutoff observacional.

## Clarificação congelada

Para o OULAD, `TC` operacional será o `date` do assessment-alvo, expresso em dias desde o início da apresentação. Features VLE entram somente quando `studentVle.date < TC`. Scores históricos entram somente quando `date_submitted < TC` e pertencem a assessments anteriores. `TY` continua sendo `date_submitted` do assessment-alvo.

## Impacto

Nenhum outcome, resultado ou métrica foi consultado para tomar esta decisão. A clarificação torna explícita a regra já presente de disponibilidade de eventos antes da data do assessment e evita usar atividade da semana do próprio assessment após seu início. A pré-análise e esta divergência serão preservadas juntas; futuros resultados devem citar ambas.
