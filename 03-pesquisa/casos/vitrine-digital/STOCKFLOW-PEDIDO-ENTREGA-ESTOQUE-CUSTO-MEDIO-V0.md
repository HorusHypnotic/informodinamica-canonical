# StockFlow — pedido → entrega → estoque → custo médio V0

Data: 2026-09-21. Auditoria read-only do `HorusHypnotic/lovable-blueprint-bot`.

## FATO — o StockFlow fecha o recebimento internamente

No `src/hooks/useOrders.ts`, `advanceStatus(id, novoStatus)` trata `entregue` como evento operacional.

Quando um pedido passa para `entregue`:
1. grava `data_entrega_real`;
2. percorre `itens_pedido`;
3. cria `movimentacoes` tipo `entrada`, com quantidade, destino, custo unitário/total, `pedido_id` e observação `Recebimento PC #N`;
4. lê a quantidade atual do recurso e soma a quantidade recebida;
5. marca recurso `disponivel`;
6. grava `custos_recursos` com fornecedor, custo unitário, quantidade e origem `pedido_compra`;
7. chama RPC `atualizar_custo_medio`;
8. marca o item `recebido = true`.

Portanto, diferente do Obra Flow auditado no corte anterior, o StockFlow possui ligação explícita pedido → entrada → saldo → histórico de custo.

## FATO — reposição cria pedido, não recebimento

`useReplenishment.ts` cria `pedidos_compra` + `itens_pedido` com origem `auto_reposicao` e status inicial `solicitado`. O estoque só muda posteriormente quando o pedido é marcado `entregue`.

Isso é uma separação de responsabilidades correta: decisão de comprar não deve fabricar estoque.

## FATO — automação diária não compra sozinha

A migration `20260428000137...sql` mostra `executar_automacoes()` recalculando consumo, criando alertas e auto-aprovando pedidos já existentes abaixo do limite do fornecedor. Ela não cria pedido nem marca entrega.

## RISCO COMPROVADO PELO CÓDIGO — idempotência fraca na entrega

`advanceStatus` não demonstra guarda contra executar `entregue` mais de uma vez para o mesmo pedido/item. A cada execução do bloco de entrega, o código insere nova movimentação, soma novamente a quantidade, grava novo custo histórico e chama novamente `atualizar_custo_medio`.

Embora `itens_pedido.recebido` seja marcado true, o loop mostrado não filtra `recebido = false` antes de processar.

Portanto existe risco arquitetural de duplicação caso a transição `entregue` seja reexecutada/reprocessada.

Não afirmar que isso ocorre em produção sem teste do banco/UI. É uma propriedade observável do caminho de código atual.

## INFERÊNCIA — StockFlow é melhor referência para ReceiptFeedback

O StockFlow já contém quase todo o efeito que o contrato federado `ReceiptFeedback` precisa representar:
- pedido;
- item;
- recurso/material;
- quantidade;
- destino;
- custo unitário/total;
- fornecedor;
- timestamp de entrega;
- movimento de entrada;
- atualização de saldo;
- atualização de custo médio.

Logo, para integração federada, o `ReceiptFeedback` não deve mandar outro sistema recalcular estoque. Deve relatar um fato já confirmado pelo sistema que possui o recebimento.

## Contrato candidato refinado: ReceiptFeedback

- `event_id` idempotente
- `correlation_id`
- `source_system`
- `purchase_order_ref`
- `purchase_order_item_ref`
- `supplier_ref` opcional
- `destination_ref`
- `material_ref` / descrição normalizada
- `ordered_qty`
- `received_qty`
- `unit`
- `unit_cost`
- `total_cost`
- `received_at`
- `stock_movement_ref`
- `receipt_status`: PARTIAL | COMPLETE
- `evidence_ref` opcional

### Invariantes
1. `event_id` não pode produzir efeito duas vezes.
2. `stock_movement_ref` deve ser único para o recebimento lógico.
3. consumidor do evento não deve somar estoque novamente se StockFlow já é o ledger proprietário.
4. recebimento parcial deve ser item/quantidade, não apenas status global do pedido.

## HIPÓTESE

O menor hardening futuro do StockFlow é tornar a entrega idempotente por item, idealmente em RPC/transação no banco, em vez de uma sequência de inserts/updates no cliente.

Isso não foi implementado nesta rodada por freeze/read-only.

## Consequência para Informodinâmica

Temos dois padrões úteis:
- Obra Flow: recebimento e estoque existem, mas o seam automático não foi comprovado.
- StockFlow: seam explícito existe, porém merece idempotência mais forte.

Para `Minha Obra`, remanufaturar a semântica do StockFlow e a simplicidade de campo do Obra Flow, sem copiar integralmente nenhum dos dois.

## Próximo corte

Formalizar `ReplenishmentDecision` como contrato de saída do motor de previsão para Smart Cotações, separando claramente:
`SUGGESTED → QUOTE_REQUESTED → AWARDED → ORDERED → RECEIVED`.

Nenhuma mutação em produção.