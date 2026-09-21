# Contratos federados — mapeamento de IDs e estados existentes, corte 004

Data: 2026-09-21. Auditoria read-only do `main` tipado de Smart Cotações e StockFlow.

## FATO — Smart Cotações já tem quase toda a identidade comercial

No `src/integrations/supabase/types.ts` atual existem:
- `quotations.id` e `quotation_status`;
- `quotation_items.id` + `quotation_id`;
- `supplier_quotes.id` + `quotation_id` + `supplier_id` + `status` + `prazo_entrega` + `valor_total` + rodada/versionamento;
- `supplier_quote_items.id` + `quotation_item_id` + `supplier_quote_id` + preços;
- `quotation_results.melhor_fornecedor_id`;
- `finalize_quotation(_quotation_id, _winning_supplier_quote_id, _correlation_id?)`;
- `quotation_command_log.command_id`, `correlation_id`, `causation_id`, `quotation_id`;
- `record_price_observation(..., _correlation_id?)`;
- `price_observations.correlation_id`.

Conclusão factual: Smart Cotações já possui `correlation_id` em pontos de comando/finalização/memória econômica. Não há justificativa para criar uma identidade paralela de cotação apenas para integração.

## FATO — StockFlow já tem identidade operacional da compra

No types atual existem:
- `pedidos_compra.id`, `numero`, `status`, `fornecedor_id`, `destino_id`, `origem`, datas e `valor_total`;
- `itens_pedido.id`, `pedido_id`, `recurso_id`, quantidade, preço, subtotal, `recebido`;
- `movimentacoes.id`, `pedido_id`, `recurso_id`, quantidade, custo e origem/destino;
- `consumo_obra.movimentacao_id`;
- fornecedor e recurso têm IDs próprios do StockFlow.

Conclusão factual: StockFlow já consegue ser dono de `purchase_order_id`, `purchase_order_item_id` e `stock_movement_id` sem importar IDs internos do Smart Cotações como chaves primárias.

## FATO — estados não são isomórficos

Smart Cotações usa estados de cotação:
`draft | received | analyzing | processing | quoted | approved | rejected | paid | in_review | archived`.

StockFlow usa `status` textual em pedidos, com semântica operacional própria.

Logo, `ReplenishmentDecision.status` NÃO deve ser implementado como alias de `quotation.status` nem de `pedido.status`.

Ele é estado de processo federado, derivado de fatos dos dois lados.

## INFERÊNCIA — IDs mínimos do contrato

Podemos iniciar sem tabela global compartilhada se preservarmos um envelope de correlação:

- `decision_id`: UUID criado no nascimento da necessidade/reposição;
- `correlation_id`: inicialmente igual ao decision_id e propagado para Smart Cotações;
- `quotation_id`: ID nativo Smart Cotações;
- `winning_supplier_quote_id`: ID nativo Smart Cotações;
- `purchase_order_id`: ID nativo StockFlow;
- `purchase_order_item_ids[]`: IDs nativos StockFlow;
- `stock_movement_ids[]`: IDs nativos StockFlow no recebimento.

Cada sistema continua dono dos próprios IDs.

## INFERÊNCIA — mapeamento da máquina federada

`SUGGESTED`
- existe necessidade calculada, sem quotation_id nem purchase_order_id.

`QUOTE_REQUESTED`
- quotation_id existe no Smart Cotações.
- correlation_id = decision_id é propagado nos comandos quando possível.

`AWARDED`
- `finalize_quotation` foi concluído com `winning_supplier_quote_id`.
- Award carrega quotation_id + supplier_quote_id + supplier_id + itens/preços.

`ORDERED`
- StockFlow criou exatamente um `pedidos_compra.id` para o decision_id.
- supplier IDs NÃO precisam ser iguais entre bancos; vínculo inicial pode ser referência externa/telefone/nome + evidência humana.

`PARTIALLY_RECEIVED`
- ao menos um item/movimento recebido e ainda há quantidade pendente.

`RECEIVED`
- recebimento completo no ledger proprietário.

## ALERTA — supplier_id não é portátil

Smart Cotações tem `suppliers.id`.
StockFlow tem `fornecedores.id`.
São domínios distintos.

Não usar igualdade de UUID entre eles e não criar FK cruzada.

Para V0, Award deve transportar dados suficientes para resolução humana/determinística do fornecedor, preservando `smart_supplier_id` como referência externa. Uma futura tabela de identidade federada só deve nascer após evidência de necessidade repetida.

## ALERTA — material_id também não é portátil

Smart Cotações possui `canonical_materials`/`quotation_items`.
StockFlow possui `recursos`.

Portanto o seam de item precisa transportar:
- `quotation_item_id`;
- `canonical_material_id` quando houver;
- `raw/name`;
- quantidade/unidade;
- `stockflow_resource_id` somente depois da resolução local.

Não forçar UUID comum.

## HIPÓTESE mínima de persistência

Antes de criar nova tabela, testar se o `decision_id` pode viajar por:
1. `quotation_command_log.correlation_id` / finalização no Smart Cotações;
2. referência externa no handoff para StockFlow;
3. campo existente `pedidos_compra.origem` ou metadado auditável, SEM sobrecarregar semanticamente produção até revisão.

Como `pedidos_compra` não expõe `correlation_id`/`external_ref` tipado, uma integração robusta futura provavelmente exigirá um campo explícito ou ledger de integração. Isso é hipótese de schema, não mudança autorizada.

## Resultado

A arquitetura não precisa de um “super-ID” que substitua IDs locais.
Precisa de uma **corrente de custódia de IDs**:

`decision_id`
→ `quotation_id`
→ `winning_supplier_quote_id`
→ `purchase_order_id`
→ `stock_movement_id(s)`.

Isso reduz acoplamento e permite auditoria ponta a ponta.

## Próximo corte

Auditar o comportamento real de `finalize_quotation` e do `quotation_command_log` nas migrations do Git para descobrir:
- o que `finalize_quotation` efetivamente grava;
- se `correlation_id` chega às price observations;
- se o vencedor fica materializado além do parâmetro;
- qual evento mínimo pode produzir um Award sem schema novo.

Nenhuma mutação em produção. Freeze da Vitrine preservado.