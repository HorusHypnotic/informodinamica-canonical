# Obra Flow — handoff Smart Cotações → Pedido via WhatsApp V0

Data: 2026-09-20. Próxima trilha após bloqueio read-only do DB Smart Cotações.

## Evidência localizada
Repo: `HorusHypnotic/obra-flow`
Commit: `46dac11ca95c95bf21dc6dbc72762110a35b235b`

O Obra Flow já implementou o padrão de handoff humano que precisamos preservar:
- botão WhatsApp no acompanhamento do pedido;
- mensagem gerada a partir do pedido real;
- preview editável antes do envio;
- telefone opcional;
- se telefone vazio, usuário escolhe contato no WhatsApp;
- se informado, normaliza para +55;
- envio via `wa.me`, sem API oficial;
- fluxo de dados existente preservado.

## Conteúdo comprovado da mensagem de pedido
`formatPedidoMessage` inclui:
- obra;
- data;
- número do pedido, se houver;
- itens;
- quantidade/unidade;
- valor total por item;
- total do pedido;
- previsão de entrega ou urgência;
- solicitação de confirmação de disponibilidade.

Também há formatação equivalente para nota fiscal.

## Insight de remanufatura
Esse componente é o elo natural **Award → PurchaseOrderHandoff**.

Não precisamos começar com integração automática entre bancos.

V0 federado:
`Smart Cotações escolhe proposta`
→ produz um Award estruturado
→ operador abre/preenche Pedido
→ Obra Flow gera mensagem editável
→ operador escolhe/abre fornecedor no WhatsApp
→ fornecedor confirma
→ pedido segue para recebimento/estoque.

## O que remanufaturar
Extrair o padrão, não copiar a tela inteira:
1. objeto estruturado;
2. formatter puro;
3. preview humano editável;
4. destino opcional;
5. ação explícita do operador;
6. nenhuma mensagem enviada silenciosamente.

O mesmo padrão serve ao fan-out de cotação:
`QuoteRequest → formatter → preview → WhatsApp`.

E serve à reconfirmação:
`PriceReconfirmation → formatter → preview → WhatsApp`.

## Contrato candidato: Award
- correlation_id
- quotation_id
- supplier_id
- supplier_quote_id
- worksite/obra
- items[{material, qty, unit, unit_price, total}]
- total
- lead_time / expected_delivery
- freight/payment terms
- selected_at
- selected_by

## Contrato candidato: PurchaseOrderHandoff
- award
- purchase_order_ref opcional
- message_text
- supplier_phone opcional
- opened_at
- operator
- status: PREPARED | OPENED | CONFIRMED_EXTERNALLY

Não afirmar entrega pelo clique no WhatsApp. OPENED significa somente que o handoff foi aberto.

## Lacuna importante
O Obra Flow atual usa fornecedor como dado textual no pedido. Isso impede ligação forte automática com `supplier_id` do Smart Cotações.

Portanto o primeiro seam deve usar `correlation_id` + referência externa opcional, sem forçar unificação de cadastros agora.

## Direção
O WhatsApp não é ledger. É transporte humano.
O ledger continua nos sistemas:
- Smart Cotações: escolha/award;
- Obra Flow: pedido/recebimento;
- StockFlow/Minha Obra: estoque/consumo.

## Próxima trilha
Auditar no Obra Flow:
`pedido → recebimento → movimentação de entrada → saldo`
para desenhar ReceiptFeedback de volta ao ciclo.

Nenhuma mutação de produção.
