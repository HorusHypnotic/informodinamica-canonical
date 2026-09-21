# ReplenishmentDecision — máquina de estados federada V0

Data: 2026-09-21.

## Objetivo
Formalizar o seam StockFlow/Minha Obra → Smart Cotações → pedido/recebimento sem duplicar ledger, pedido ou estoque.

## Fatos já comprovados
- StockFlow já calcula consumo médio, ponto de reposição, forecast e sugestão de reposição.
- `reporAgora` pode criar `pedidos_compra` + `itens_pedido`, origem `auto_reposicao`.
- Smart Cotações possui domínio próprio de cotação, proposta, negociação e memória econômica.
- StockFlow possui caminho explícito `pedido entregue → movimento entrada → saldo → custo médio`.
- Obra Flow possui pedido/recebimento/estoque, mas o vínculo automático recebimento→entrada ainda não foi comprovado.
- WhatsApp é transporte humano, não ledger.

## Problema
Se `reporAgora` criar pedido antes da cotação e Smart Cotações também gerar pedido após Award, a mesma necessidade pode virar dois pedidos. A fronteira precisa distinguir intenção de repor de ordem de compra.

## Contrato candidato
`ReplenishmentDecision`

Campos mínimos:
- `decision_id` — idempotency key global da necessidade de reposição;
- `correlation_id` — costura entre sistemas;
- `owner_system` — sistema proprietário do estado;
- `worksite_ref`;
- `material_ref` + descrição normalizada;
- `qty` + `unit`;
- `stock_on_hand`;
- `avg_daily_consumption`;
- `lead_time_days`;
- `reorder_point`;
- `days_to_stockout`;
- `suggested_at`;
- `reason_code`;
- `status`;
- refs opcionais: `quotation_id`, `award_id`, `purchase_order_id`, `receipt_event_id`.

## Máquina de estados
`SUGGESTED`
→ `QUOTE_REQUESTED`
→ `AWARDED`
→ `ORDERED`
→ `PARTIALLY_RECEIVED` opcional
→ `RECEIVED`

Saídas laterais:
- `DISMISSED`: operador decidiu não repor;
- `EXPIRED`: necessidade ficou obsoleta antes da cotação/pedido;
- `CANCELLED`: processo iniciado e depois cancelado.

## Ownership por estado
- SUGGESTED: StockFlow/Minha Obra é fonte do sinal de estoque/consumo.
- QUOTE_REQUESTED: Smart Cotações é fonte da cotação, sem criar pedido de compra ainda.
- AWARDED: Smart Cotações é fonte da escolha comercial.
- ORDERED: exatamente um ledger de pedido é escolhido como proprietário por implantação. V0 recomendado: StockFlow quando a finalidade é Minha Obra, pois já fecha entrega→estoque→custo médio.
- RECEIVED: ledger proprietário do recebimento emite `ReceiptFeedback`; demais sistemas apenas refletem status.

## Regra anti-duplicação
`decision_id` acompanha toda a cadeia.

Invariantes:
1. Uma decisão ativa só pode ter uma cotação ativa canônica por rodada.
2. `AWARDED` não cria automaticamente dois pedidos em sistemas diferentes.
3. `purchase_order_id` só pode ser associado uma vez ao `decision_id` para a mesma rodada.
4. `ReceiptFeedback.event_id` deve ser idempotente.
5. Consumidor de `ReceiptFeedback` não soma estoque se não for dono do ledger.

## Remanufatura do reporAgora
No contexto federado, `reporAgora` não deve ser reutilizado semanticamente como primeira ação quando houver Smart Cotações.

CTA V0 recomendado:
`Cotar reposição`

Efeito conceitual:
`SUGGESTED → QUOTE_REQUESTED`

Somente após Award:
`AWARDED → criar/associar pedido no ledger escolhido → ORDERED`.

O `reporAgora` original continua sendo patrimônio útil para operação sem cotação, mas representa um atalho `SUGGESTED → ORDERED` e precisa ser tratado como rota explícita, não misturada à rota cotada.

## Award mínimo
- `award_id`;
- `decision_id`/`correlation_id`;
- `quotation_id`;
- `supplier_id/ref`;
- itens + preço unitário + total;
- condições de frete/pagamento;
- prazo;
- `selected_at`/`selected_by`.

Award é decisão comercial, não confirmação de compra nem entrada de estoque.

## PurchaseOrderHandoff
Recebe Award e prepara a ação humana/sistêmica para criar o pedido no ledger proprietário. Abrir WhatsApp = `OPENED`, nunca `ORDERED` sem persistência do pedido.

## ReceiptFeedback
Confirma fato logístico do ledger proprietário e fecha `ORDERED/PARTIALLY_RECEIVED → RECEIVED` sem repetir movimentação.

## Inferência
Essa máquina permite que Minha Obra pareça uma experiência única para o usuário sem exigir um banco único. A unidade vem do contrato e da correlação, não da fusão física dos sistemas.

## Hipótese a testar
É provável que a menor implementação V0 precise apenas de referências externas/correlation_id nos pontos de handoff, não de sincronização bidirecional completa.

## Próximo corte
Auditar os identificadores e estados reais de Smart Cotações (`quotation`, supplier quote/award equivalente) e StockFlow (`pedidos_compra`, `itens_pedido`) para mapear o contrato conceitual para campos existentes, marcando quais refs já existem e quais seriam extensões futuras.

Nenhuma mutação em produção. Freeze funcional da Vitrine preservado.