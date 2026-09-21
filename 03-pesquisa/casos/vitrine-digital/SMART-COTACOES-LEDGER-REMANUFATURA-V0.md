# Smart Cotações — desenho mínimo do ledger de transições

Data: 2026-09-20. Desenho read-only. Não aplicado.

## Molde comprovado
`admin_transition_curated_business_axis` já usa o padrão correto:
1. bloqueia a entidade com `FOR UPDATE`;
2. lê o estado anterior;
3. valida;
4. atualiza o estado;
5. se houve mudança real, insere evento com from/to/provenance/changed_by;
6. tudo ocorre na mesma transação da RPC.

Esse padrão deve ser remanufaturado, não reinventado.

## V0 proposto
Tabela conceitual:

`construction_demand_state_events`
- id uuid PK
- demand_id uuid NOT NULL FK construction_demands(id) ON DELETE CASCADE
- from_state text
- to_state text NOT NULL
- provenance text NOT NULL
- changed_by uuid FK auth.users(id)
- changed_at timestamptz NOT NULL DEFAULT now()

Índice recomendado:
`(demand_id, changed_at desc)`

Não há necessidade inicial de JSON genérico.

## Pontos de emissão
### create_my_construction_demand
Após INSERT:
NULL → FORECASTED/ACTIVE
provenance = DEMAND_CREATED

### set_my_construction_demand_state
Na mesma transação:
current → next
provenance = USER_STATE_CHANGE
changed_by = auth.uid()

### admin_record_construction_quote_observation
Quando ocorrer transição automática:
QUOTE_DUE → QUOTED_RECENTLY
provenance = QUOTE_OBSERVATION_RECORDED
changed_by = admin atual

A gravação deve ser atômica com a alteração da demanda. Não usar frontend para gerar o evento.

## Retroatividade
Não fabricar eventos históricos para a demanda já existente. No momento só conhecemos o estado atual e timestamps parciais. Criar uma sequência fictícia contaminaria a inteligência.

Se a migration for aprovada, o ledger começa no momento da implantação. Opcionalmente pode existir um evento inicial explícito:
NULL → estado_atual, provenance = BASELINE_AT_MIGRATION
mas isso deve ser tratado como baseline, não como transição histórica.

## Compatibilidade
Nenhuma mudança de estado existente precisa ser adicionada.
Nenhum consumidor atual precisa mudar para a migration funcionar.
As RPCs existentes permanecem contratos públicos do domínio.

## Testes de contrato antes de merge
1. criar demanda gera exatamente 1 evento inicial;
2. transição válida gera exatamente 1 evento;
3. transição inválida gera 0 eventos e não altera demanda;
4. QUOTE_DUE + quote válida gera QUOTED_RECENTLY e exatamente 1 evento;
5. falha no insert do evento reverte também a mudança de estado;
6. usuário sem acesso ao projeto não gera evento;
7. anon não acessa ledger;
8. histórico ordena deterministicamente por changed_at/id.

## Ganho
Com uma tabela pequena e três pontos de emissão, o sistema passa de fotografia para trajetória sem alterar a máquina de estados.

## Gate
Este desenho está pronto para virar migration + testes em branch, PÉTECO e somente depois decisão de merge/aplicação. A execução em produção continua bloqueada até autorização explícita.

Nenhuma mutação em produção.
