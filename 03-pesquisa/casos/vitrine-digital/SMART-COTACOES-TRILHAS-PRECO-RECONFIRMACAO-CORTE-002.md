# Smart Cotações — trilhas de preço e reconfirmação, corte 002

Data: 2026-09-20. Auditoria read-only de histórico Git.

## Descoberta
O Smart Cotações já possui uma segunda trilha econômica importante além de `price_observations`:

`price_movements`

Ela foi reconstruída no commit `f0039cb90c80cb7ddc76841643b11553e79962d3` e é append-only.

Campos:
- quotation_id
- supplier_quote_id
- quotation_item_id
- valor_anterior
- valor_novo
- rodada
- performed_by
- created_at
- sequence_number monotônico.

A escrita acontece atomicamente dentro de `set_supplier_quote_item_price`.

## Segurança/propriedades comprovadas pelo commit
- RPC SECURITY DEFINER;
- somente admin pode alterar preço;
- supplier quote precisa estar ativa;
- item precisa pertencer à mesma quotation;
- row locks com FOR UPDATE;
- preço igual ao atual é no-op;
- mudança efetiva gera movimento;
- DML direto foi revogado;
- UPDATE/DELETE em price_movements bloqueado por trigger;
- teste histórico cobre 0 → 100 → 92 → 87, no-op 87 → 87 e nova rodada → 80.

## Implicação para reconfirmação
Há três conceitos diferentes e não devem ser misturados:

1. `supplier_quote_items`
   Estado atual da proposta dentro de uma cotação.

2. `price_movements`
   Filme das mudanças/negociações de preço **dentro daquela cotação**.

3. `price_observations`
   Memória econômica transversal, capturada para reutilização/inteligência entre cotações.

Logo, “vendedor normalmente dá X%” deve vir principalmente de `price_movements`, agrupado por fornecedor/material/rodada, e não de diferenças arbitrárias entre `price_observations`.

Já “qual preço recente posso pedir para ele confirmar?” deve vir de `price_observations`.

## Reconfirmação semântica
Quando um preço recente é apresentado ao fornecedor num novo pedido:

- SAME_PRICE não é no-op econômico entre cotações.
- Dentro da nova supplier_quote, pode começar diretamente naquele preço.
- A memória econômica precisa registrar que houve nova confirmação/contexto.
- `price_movements` só deve registrar movimento se houver mudança efetiva dentro da nova cotação.

Isso evita fabricar uma negociação 31,50 → 31,50.

## Métricas deriváveis
Por fornecedor/material:
- desconto médio por negociação = distribuição de (valor_anterior - valor_novo) / valor_anterior nos movimentos elegíveis;
- número médio de rodadas;
- taxa de concessão;
- magnitude mediana da concessão;
- estabilidade entre cotações via price_observations;
- taxa de reconfirmação futura.

Não tratar o movimento inicial 0 → preço como “desconto”. Deve ser excluído do cálculo de concessão.

## Política de revelação já existente
O mesmo commit contém DEC-REVELACAO-001:
- fornecedor pode revisar sua própria proposta;
- não recebe preço, identidade, posição ou condição de concorrente;
- comparativos/BATNA ficam internos;
- sistema não automatiza revelação identificável de lance concorrente.

A reconfirmação encaixa perfeitamente nessa política: perguntar “mantém seu último preço?” sem revelar concorrência.

## Arquitetura resultante
`price_observations` = memória entre compras
→ sugere último preço
→ fan-out assistido pede confirmação
→ nova `supplier_quote`
→ `supplier_quote_items` recebe preço confirmado
→ se negociar, `price_movements` registra concessões
→ finalização alimenta nova `price_observation`.

É um ciclo fechado sem tabela semanal paralela.

## Próximo gate
Localizar o commit/migration que cria e alimenta `price_observations` na finalização para fechar:
- fingerprint;
- source_type;
- confidence_score;
- unique/dedup;
- correlation propagation.

Nenhuma mutação em produção.
