# Smart Cotações — comparador, negociação, auditoria e autoridade V0

Data: 2026-09-20. Auditoria Git read-only do repo `HorusHypnotic/smart-cotacoes`.

## Comparador confirmado
`ComparisonMatrix.tsx` prova que o cálculo visto na tela é determinístico no cliente sobre dados persistidos:
- matriz item × supplier_quote;
- preço unitário por célula;
- total por fornecedor;
- cobertura de itens por fornecedor;
- ranking apenas entre fornecedores com cobertura integral;
- melhor cenário item-a-item;
- pior cenário item-a-item;
- economia por combinação = pior cenário - melhor cenário;
- segunda melhor condição completa usada como BATNA mínima;
- vencedor geral = menor total entre fornecedores completos;
- auto-save de preço por RPC `set_supplier_quote_item_price`.

Logo, “BATNA mínima” é uma heurística operacional concreta, não IA.

## Negociação confirmada
`NegotiationHistory.tsx` lê `negotiation_history`.
Tipos previstos:
request_discount, counter_offer, accepted, rejected, renegotiated, archived.
Registra valor anterior, valor novo, economia, motivo, autor e timestamp.

## Auditoria confirmada
`QuotationAuditTrail.tsx` lê `quotation_audit`, separado do histórico de negociação.
Ações de domínio incluem:
quotation.update, transition, archive, restore, reopen, destroy e quotation_item.delete.
Mantém `field_changes`, razão, entidade e timestamp.

Conclusão: existem ao menos três trilhas diferentes:
1. `quotation_logs`: log operacional;
2. `negotiation_history`: negociação econômica;
3. `quotation_audit`: mutações/auditoria de domínio.
Uma timeline vazia isolada não prova falta de rastreabilidade.

## Command bus
`quotation-domain.ts` define contrato v4 e porta única `execute_quotation_command`.
Características:
- capability-first;
- permission_level admin/owner/none;
- comandos tipados;
- command_id idempotente;
- causation_id;
- correlation_id;
- actor_type human/ai/webhook/scheduler/system;
- status pending/processing/completed/failed/rolled_back;
- risco/auditoria/confirmation/reason declarativos.

Isso é patrimônio arquitetural importante para integração. A Vitrine não deve reimplementar esse domínio em React.

## WhatsApp
O código já prova contato WhatsApp entre admin e solicitante em `QuotationDetail`, mas a busca Git não encontrou ainda fan-out estruturado para vários fornecedores. Portanto:
- WhatsApp com solicitante: comprovado;
- fan-out automático/semiautomático para fornecedores: **não comprovado nesta rodada**.
Não assumir que existe.

## Matriz de autoridade proposta
Com evidência atual:

| Domínio | Autoridade candidata |
|---|---|
| Descoberta/demanda pública | Vitrine |
| Necessidade da obra | Minha Obra / construction demand |
| Caso de cotação | Smart Cotações / quotation |
| Respostas e versões de fornecedor | Smart Cotações / supplier_quotes |
| Comparação e negociação | Smart Cotações |
| Memória econômica de preço | Smart Cotações / price_observations |
| Pedido de compra | Obra Flow / linhagem Pedidos COD |
| Recebimento/movimentação | Obra Flow |
| Estoque/consumo/previsão | Minha Obra, remanufaturando patrimônio StockFlow |
| Alerta operacional | Telegram como canal, não fonte canônica |

## Consequência para branch experimental da Vitrine
A migration experimental `construction_demand_state_events` continua útil somente para trajetória da **necessidade**.
Ela não deve crescer para duplicar:
- supplier quote;
- negociação;
- price observation;
- resultado de cotação;
- audit trail do Smart Cotações.

Antes de qualquer merge, seus nomes/proveniência devem ser confrontados com o contrato de integração final.

## Contrato mínimo de passagem candidato
Não fundir bancos nesta etapa. Integrar por IDs/correlação:

DemandSignal
- source
- source_id
- project_id opcional
- items
- need_by
- correlation_id

QuoteCase
- quotation_id
- source_demand_id
- correlation_id

Award
- quotation_id
- winning_supplier_quote_id
- selected_total
- correlation_id

PurchaseOrderHandoff
- source_quotation_id
- supplier
- items
- agreed_prices
- expected_delivery
- correlation_id

ReceiptFeedback
- purchase_order_id
- received_at
- quantities
- stock_movements
- correlation_id

O `correlation_id` já existe no command bus do Smart Cotações e é candidato natural para costurar o ciclo sem colapsar domínios.

## Próximo gate
Auditar migrations/RPCs do Smart Cotações para confirmar atomicidade, RLS, finalização e criação de price_observations; depois mapear Obra Flow/Pedidos COD e StockFlow nos pontos exatos de handoff.

Nenhuma mutação em produção.
