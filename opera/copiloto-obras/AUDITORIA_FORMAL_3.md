# Terceira Auditoria Formal — Runtime `copiloto-obras`

Data: 2026-07-31  
Escopo: runtime local em `opera/copiloto-obras`  
Decisão: `NAO_APTO`

## Síntese

Os 106 testes existentes passam e comprovam controles relevantes de integridade referencial, recomendações, limites estruturais, snapshot de composição e isolamento do dry-run. Entretanto, provas end-to-end adicionais encontraram caminhos que violam invariantes declaradas de sessão, saída, limites e confidencialidade. A suíte verde não é suficiente para autorizar smoke test com chamada externa.

## Evidências positivas

- Suíte completa: 106 testes aprovados, sem `skip` ou `xfail`.
- Dry-run: `composition_result=VALIDA` e `api_called=false`.
- Apenas `OpenAIClient.respond()` contém chamada a `responses.create()`.
- O CLI não oferece rota de chamada externa.
- `RawModelResponse` não é retornado no caminho nominal de `respond()`.
- Snapshot canônico preserva bytes, valida hashes individuais e recalcula o manifesto.
- Campos extras, respostas incompletas e referências inválidas são rejeitados antes do renderer no caminho nominal.
- ADV-001 a ADV-018 possuem casos nomeados na suíte.

## Achados bloqueadores

### AF3-001 — `validate_response()` não vincula autorização ao interlocutor da sessão

Severidade: crítica.

Uma sessão com `current_interlocutor=None` aceitou resposta atribuída a `mariana-lopes` e produziu saída renderizada. A função autoriza apenas contra o contexto e o argumento recebido, sem exigir igualdade com `session.current_interlocutor` nem com `session.effective_permissions`.

Impacto: um chamador interno que use diretamente `validate_response()` contorna a garantia aplicada por `OpenAIClient.respond()`.

### AF3-002 — Coerência incompleta entre contexto, sessão e transição

Severidade: alta.

Foram aceitos:

- contexto com `company_id` diferente da sessão;
- transição proposta `CONTATO -> ENCERRAMENTO` sem validação por tabela normativa;
- resposta sem atualização atômica de `session.current_state`.

A validação compara somente o estado anterior e deixa o estado seguinte sem regra ou persistência.

### AF3-003 — Exceções do transporte externo não são sanitizadas

Severidade: crítica.

Uma exceção produzida por `responses.create()` propagou integralmente sua mensagem. SDKs e proxies podem incluir trechos de requisição, cabeçalhos ou conteúdo operacional em exceções.

Impacto: possível vazamento de entrada do usuário, composição ou metadados por erro.

### AF3-004 — Limite da resposta bruta ocorre depois do parse JSON

Severidade: alta.

Uma resposta bruta de 300.014 caracteres chegou a `json.loads()` antes de `validate_payload_limits()`. O limite de 262.144 bytes protege o objeto já parseado, mas não protege memória e CPU durante a desserialização.

### AF3-005 — Renderer público não revalida o escopo completo

Severidade: alta.

Uma informação de outra empresa, com a mesma obra, foi aceita por chamada direta a `render()` e seu conteúdo foi exibido. O renderer verifica obra, mas não empresa, período ou proveniência da validação.

Impacto: a propriedade “objetos inválidos nunca alcançam o renderer” depende de disciplina de chamada, não de uma fronteira técnica única.

### AF3-006 — Evento de reativação pode ser reutilizado

Severidade: alta.

O mesmo evento humano autorizou repetidamente a mesma reativação e a recomendação permaneceu simultaneamente registrada como suspensa. Não há consumo do evento nem transição atômica do registro entre coleções.

## Qualidade e independência dos testes

- Os testes do cliente externo usam transporte local simulado e não fazem rede, o que é apropriado nesta fase.
- ADV-003, ADV-010, ADV-016 e ADV-017 exercitam o fluxo principal e verificam que o renderer não foi chamado.
- Parte da matriz restante é unitária: ADV-011 e ADV-012 chamam o validador de limites diretamente; ADV-014 verifica o conjunto de permissões; ADV-015 chama o verificador do snapshot. Esses testes são úteis, mas não substituem provas end-to-end.
- A busca no repositório não encontrou uma especificação histórica que associe formalmente cada número ADV à intenção do ataque. A cobertura nominal não prova preservação da intenção histórica sem esse catálogo.
- Não há medição de cobertura instalada no ambiente; a auditoria não atribui percentual de cobertura.

## TOCTOU

O fechamento baseado em snapshot foi considerado consistente no caminho nominal:

1. cada módulo é lido uma vez;
2. o hash é calculado sobre os bytes preservados;
3. o manifesto é recalculado sobre os registros;
4. os mesmos bytes preservados formam a entrada do cliente.

Não foi encontrado bypass funcional nessa cadeia durante esta auditoria.

## Caminhos de saída e chamada externa

- Chamada externa encontrada: somente `OpenAIClient.respond() -> client.responses.create()`.
- Saída conversacional nominal: `OpenAIClient.respond() -> validate_response() -> render()`.
- Saída operacional separada: CLI imprime exclusivamente o relatório de dry-run.
- `RawModelResponse` não chega ao usuário no caminho nominal.
- A exportação pública de `render()` e `validate_response()` mantém caminhos internos alternativos que não preservam todas as invariantes do cliente.

## Critérios para nova submissão

1. Vincular `validate_response()` ao interlocutor, permissões, empresa, obra, período e manifesto da sessão.
2. Validar e aplicar transições de estado atomicamente.
3. Limitar bytes de `output_text` antes de `json.loads()`.
4. Sanitizar exceções do transporte sem incluir conteúdo bruto ou credenciais.
5. Tornar impossível ou seguro o uso direto do renderer com objetos não validados.
6. Consumir eventos humanos e mover recomendações entre estados atomicamente.
7. Adicionar regressões end-to-end para AF3-001 a AF3-006.
8. Formalizar o catálogo ADV-001–018 com intenção, pré-condição, ataque e oráculo independente.

## Estado Git observado

- Runtime: `?? opera/` no repositório pai.
- Stage: vazio.
- Duas imagens continuam excluídas no estado de trabalho preexistente.
- Nenhum commit ou push foi realizado durante a auditoria.
