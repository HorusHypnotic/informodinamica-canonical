# Smart Cotações — implementação localizada e primeira engenharia reversa

Data: 2026-09-20. Auditoria Git read-only.

## Fonte localizada
Repositório privado: `HorusHypnotic/smart-cotacoes`, branch `main`.

A interface mostrada pelo owner corresponde à implementação encontrada. Não é hipótese documental.

## Capacidades comprovadas no código
### Cotação
- `quotations`
- `quotation_items`
- `supplier_quotes`
- view `vw_supplier_quotes_current`
- `quotation_results`
- `quotation_logs`

### Fornecedor
- tabela `suppliers`
- cadastro/edição no Admin
- telefone/cidade
- integração em evolução com estado da Vitrine.

### Negociação
- `request_renegotiation`
- histórico `negotiation_history`
- versionamento de supplier quote
- arquivamento de quote.

### Máquina de estado
UI declara:
draft → received → analyzing → processing → quoted → approved → paid.
As transições são executadas por command bus `quotation.transition`, com validação de domínio.

### Finalização
`quotation.finalize` exige pelo menos duas supplier quotes na UI.
O frontend ordena por valor_total e envia a menor como winning_supplier_quote_id.
O retorno informa `observations_recorded`.

### Memória Econômica
A finalização alimenta `price_observations`.
Campos comprovados incluem:
- supplier_id
- supplier_quote_id/item_id
- quotation_id
- material bruto/canônico
- preço unitário
- quantidade/unidade
- lead_time_days
- freight_included
- payment_terms
- negotiated
- urgency_level
- region_code
- confidence_score
- captured_at
- expiração auditável.

Existe painel de saúde/expiração da memória econômica. Observações antigas não são apagadas; podem ser expiradas com autor/motivo.

### Notificação
Admin consulta `notifications` por `quotation_created` a cada 30 s.
A origem da quotation distingue ao menos `whatsapp` e `app`.

### WhatsApp
Há abertura direta de WhatsApp no Admin para contato relacionado à cotação. O fluxo exato de fan-out para fornecedores ainda precisa ser localizado.

## Descoberta crítica
O Smart Cotações já possui **memória econômica própria e muito mais rica** do que `construction_quote_observations` da Vitrine.

Portanto, não é seguro transformar o ledger simplificado da Vitrine em fonte canônica de preços sem decidir autoridade de domínio.

Risco atual: dois registros de preço concorrentes:
1. Vitrine: `construction_quote_observations`;
2. Smart Cotações: `price_observations`.

A remanufatura deve resolver autoridade antes de sincronizar.

## Timeline
A tela possui `quotation_logs` e componentes específicos `NegotiationHistory` e `QuotationAuditTrail`. Logo, a timeline vazia mostrada pelo owner não significa ausência arquitetural de histórico. Pode significar ausência de eventos naquele caso, diferença entre log/audit ou wiring parcial. Precisa de auditoria específica.

## Relação com o ciclo fechado
O Smart Cotações ocupa claramente:
DEMANDA → ITENS → FORNECEDORES → QUOTES → NEGOCIAÇÃO → COMPARAÇÃO → SELEÇÃO → MEMÓRIA ECONÔMICA.

Obra Flow/Pedidos COD deve assumir depois:
SELEÇÃO → PEDIDO → RECEBIMENTO → ESTOQUE.

Minha Obra/StockFlow:
ESTOQUE → CONSUMO → PREVISÃO → NOVA DEMANDA.

## Decisão provisória
Congelar expansão do `construction_quote_observations` como núcleo comercial até terminar o mapeamento de autoridade. O state ledger de construction demand continua conceitualmente útil para trajetória da necessidade, mas não deve duplicar a memória de preços do Smart Cotações.

## Próximo gate
1. auditar migrations/schema/RPCs do smart-cotacoes;
2. localizar ComparisonMatrix, NegotiationHistory, QuotationAuditTrail e command bus;
3. localizar fan-out/WhatsApp para fornecedores;
4. definir autoridade:
   - Demand authority
   - Quote authority
   - Price-memory authority
   - Order authority
   - Stock/consumption authority;
5. desenhar contrato de integração, não fusão de tabelas.

Nenhuma mutação em produção.
