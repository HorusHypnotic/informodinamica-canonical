# Smart Cotações — Award derivado de finalize_quotation V0

Data: 2026-09-21. Auditoria read-only do Git. Nenhuma mutação em produção.

## FATO
A migration `20260528110525_d1fb84b2-b8f1-4e9c-891d-3767fa2e4fc7.sql` define `finalize_quotation(_quotation_id, _winning_supplier_quote_id, _correlation_id)`.

A função:
- exige admin;
- aceita cotação em `quoted` ou `approved`;
- valida que `winning_supplier_quote_id` pertence à cotação;
- percorre itens ativos da proposta vencedora e chama `record_price_observation`;
- calcula menor preço, maior preço, economia e taxa de serviço;
- faz upsert de `quotation_results` com `melhor_fornecedor_id = supplier_id` da proposta vencedora;
- atualiza o header da cotação;
- grava `quotation.finalize` em `quotation_audit` com `winning_supplier_quote_id`, observações gravadas, menor/maior preço e economia.

`execute_quotation_command` fornece idempotência por `command_id`, persiste `causation_id`, `correlation_id` e `actor_type`, e para `quotation.finalize` lê `winning_supplier_quote_id` do payload. Porém ele passa `_command_id` para `finalize_quotation` como terceiro argumento, em vez de `_correlation_id`.

## INFERÊNCIA
O Award não precisa necessariamente de tabela nova para existir semanticamente.

Ele pode ser projetado/derivado dos fatos já persistidos:
- `quotation_id` = quotation_audit.quotation_id;
- `winning_supplier_quote_id` = quotation_audit.field_changes;
- `supplier_id` = supplier_quote / quotation_results.melhor_fornecedor_id;
- `selected_at` = timestamp do audit/command;
- `selected_by` = quotation_audit.performed_by;
- valores/itens/condições = snapshot consultado da supplier_quote vencedora;
- command_id/causation/correlation = quotation_command_log.

O evento canônico candidato é `AwardProjected`, não uma segunda escrita de decisão comercial.

## ACHADO DE CORRELAÇÃO
Existe uma quebra potencial de propagação: `execute_quotation_command` registra `_correlation_id` no command log, mas chama `finalize_quotation(..., _command_id)`. Assim, as `price_observations` produzidas pela finalização tendem a receber o command_id como correlação, mesmo quando uma correlação externa foi fornecida.

Isso NÃO autoriza correção agora. Primeiro deve ser confrontado com a implementação corrente do DB real, ainda indisponível na conexão Supabase.

## HIPÓTESE
Para o circuito federado, o melhor seam inicial pode ser um projetor read-only:

`quotation_command_log(completed, quotation.finalize)` + `quotation_audit(quotation.finalize)` + `supplier_quotes/items` → `Award`.

O consumidor então cria `PurchaseOrderHandoff` usando o mesmo correlation/decision context, sem pedir ao Smart Cotações para duplicar a decisão numa nova tabela.

## Invariante
Um `quotation.finalize` completado deve produzir no máximo um Award lógico por `command_id`.

Reprocessar leitura/projeção não pode gerar novo pedido automaticamente. A criação do pedido permanece uma ação separada e idempotente no sistema proprietário do pedido.

## Gate seguinte
Auditar se `quotation_results` tem unicidade por quotation_id e se `quotation_audit`/`quotation_command_log` preservam dados suficientes para reconstrução determinística do Award. Depois desenhar o `PurchaseOrderHandoff` mínimo a partir dessa projeção.
