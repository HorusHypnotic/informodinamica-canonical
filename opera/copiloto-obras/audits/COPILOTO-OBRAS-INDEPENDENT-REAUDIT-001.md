# COPILOTO-OBRAS-INDEPENDENT-REAUDIT-001

## Papel do auditor

Auditor independente. Não implementar, corrigir, reinterpretar para obter PASS nem reutilizar a conclusão do autor do delta como premissa.

## Escopo congelado

- Repositório: `HorusHypnotic/informodinamica-canonical`
- Baseline: `89edebf7dbc6d6ee0267f57c1f03cf234da18950`
- Head a auditar: `7ecafaa5b6b431ff381634c4d94ee673002f1653`
- Branch: `copiloto-obras-reentry-001`
- Diff observado: head está 7 commits à frente e 0 atrás do baseline.
- Arquivos materiais adicionados no diff: workflow isolado; matriz REENTRY; desenho SEMANTIC-DELTA; `interoperability.py`; R1–R10; verificador de reentrada.

## Evidência de bancada declarada

Execução externa controlada no HEAD acima reportou:

- Python 3.12.3
- pytest 9.1.1
- worktree limpa antes/depois
- suíte completa: 128 coletados, 128 PASS, 0 FAIL/ERROR/SKIP, exit code 0
- R1–R10 isolados: 10/10 PASS, exit code 0
- custo R$ 0
- nenhuma API real, dado real, merge ou promoção de produção

A reauditoria deve tratar isso como evidência a verificar, não como conclusão obrigatória.

## Perguntas obrigatórias

1. O delta é realmente mínimo ou introduz autoridade/julgamento que deveria permanecer fora do Copiloto?
2. `KnowledgeState.UNKNOWN` preserva incerteza ou permite promoção silenciosa por algum caminho não testado?
3. `GuidanceEligibility` é somente envelope interoperável ou duplica julgamento do Pocket Engine?
4. `EvidenceVerdict` é somente vocabulário de transporte ou duplica julgamento do OPERA Evidence?
5. `AuthorityState` impede que decisão implique autorização/release sem evento externo explícito?
6. Há transições reversas, saltos, defaults ou coerções que criem loopholes?
7. `SpecializedResultEnvelope` protege escopo de obra e proveniência de forma suficiente para esta fase?
8. R1–R5 agora provam comportamento relevante ou apenas happy paths?
9. R6–R10 continuam válidos após o delta?
10. Os 118 testes históricos permaneceram semanticamente preservados, não apenas verdes por acidente?
11. O diff toca qualquer superfície além do necessário para REENTRY-001?
12. Existe motivo técnico para impedir `COPILOTO_REENTRY_READY_WITH_LIMITS` mesmo mantendo produção bloqueada?

## Testes adversariais mínimos solicitados

- A1: UNKNOWN + ELIGIBLE deve falhar.
- A2: UNKNOWN sem eligibility deve permanecer UNKNOWN e não gerar decisão.
- A3: DECIDED → RELEASED em salto deve falhar mesmo com evento externo.
- A4: DECIDED → AUTHORIZED sem evento externo deve falhar.
- A5: AUTHORIZED → RELEASED sem evento externo deve falhar.
- A6: Evidence `INSUFFICIENT_EVIDENCE` deve sair inalterado.
- A7: envelope de outra obra deve ser rejeitado.
- A8: envelope sem proveniência válida deve ser rejeitado.
- A9: resultado especializado não deve criar `HumanDecision` implicitamente.
- A10: ausência de integração Pocket/Evidence deve continuar explícita; nenhuma chamada real é permitida.

## Gates permitidos ao auditor

- `INDEPENDENT_REAUDIT_PASS`
- `INDEPENDENT_REAUDIT_PASS_WITH_LIMITS`
- `INDEPENDENT_REAUDIT_FAIL`
- `INDEPENDENT_REAUDIT_BLOCKED`

O auditor NÃO pode declarar `PRODUCTION_READY`.

## Condição para gate de reentrada

`COPILOTO_REENTRY_READY_WITH_LIMITS` só pode ser considerado se a reauditoria for PASS/PASS_WITH_LIMITS, não houver conflito semântico crítico aberto e a evidência de 128/128 for reproduzível no HEAD congelado.

Mesmo assim permanecem fora do escopo e não autorizados: API real, dados reais, integração operacional real, decisão autônoma, autorização autônoma, release autônomo e produção.

## Formato de saída

O auditor deve devolver: HEAD verificado; diff revisado; testes executados; resultado A1–A10; achados por severidade; conflitos de ownership semântico; limitações; gate independente; justificativa; e confirmação explícita de que não alterou código/testes durante a auditoria.
