# Relatório Corretivo 4 — Fronteiras de Sessão e Saída

Data: 2026-07-31  
Origem: bloqueadores `AF3-001` a `AF3-006` e inconsistência de reativação  
Decisão desta rodada: `CANDIDATO_A_REAUDITORIA_FORMAL`

## Correções executadas

1. `validate_response()` exige interlocutor atual e verifica identidade, papel e permissões contra o contexto.
2. Empresa, obra e período da sessão precisam coincidir exatamente com o contexto; composição e manifesto permanecem vinculados no cliente externo.
3. Transições usam enum e tabela fechada. O novo estado é construído e validado em memória, o renderer é executado e somente então `current_state` é efetivado.
4. Falhas de schema, referências, transição ou renderer preservam a sessão anterior.
5. Exceções do transporte são convertidas em `ExternalTransportError`, com categoria e código fixos e metadados opcionais estritamente sanitizados.
6. `output_text` é medido em bytes antes da criação de `RawModelResponse` e antes de `json.loads()`.
7. O renderer revalida empresa, obra, período, existência dos IDs selecionados e elegibilidade das recomendações antes de qualquer ramo de saída.
8. Reativação humana exige papel coerente, consome ID único, remove a recomendação de suspensas e a adiciona como ativa em uma nova sessão validada.
9. Replay e falha durante a construção do estado de reativação preservam o estado anterior.

## Testes integrados adicionados

- sessão sem interlocutor;
- empresa divergente;
- falha referencial após proposta de transição;
- transição válida efetivada somente após renderização;
- falha do renderer preservando o estado;
- transição proibida;
- transporte contendo sentinela sensível;
- resposta bruta excessiva sem chamada ao parser;
- renderer com mesma obra e outra empresa;
- reativação válida e consumível;
- replay de evento;
- falha posterior à proposta de consumo.

## Resultado executado

- 118 testes aprovados.
- Dry-run aprovado com `composition_result=VALIDA` e `api_called=false`.
- Nenhuma chamada externa real realizada.
- Nenhum stage, commit ou push realizado.

## Limitações e próximo gate

- Este relatório não altera a decisão histórica de `AUDITORIA_FORMAL_3.md`.
- A aptidão para API não é declarada por esta rodada corretiva.
- É obrigatória reauditoria formal independente dos novos contratos e testes.
- O runtime permanece não rastreado no repositório pai até revisão Git deliberada.
