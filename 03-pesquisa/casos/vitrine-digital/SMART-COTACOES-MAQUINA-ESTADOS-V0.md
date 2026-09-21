# Smart Cotações — máquina de estados existente

Data: 2026-09-20. Produção inspecionada read-only.

## Estados canônicos encontrados
FORECASTED → ACTIVE → QUOTE_DUE → QUOTED_RECENTLY → AWAITING_CONFIRMATION → READY_TO_BUY → ORDERED → RECEIVED

Estados laterais:
- PAUSED
- CANCELLED

## Transições efetivamente autorizadas pela RPC

FORECASTED → ACTIVE | PAUSED | CANCELLED
ACTIVE → PAUSED | QUOTE_DUE | CANCELLED
PAUSED → ACTIVE | CANCELLED
QUOTE_DUE → PAUSED | QUOTED_RECENTLY | CANCELLED
QUOTED_RECENTLY → PAUSED | QUOTE_DUE | AWAITING_CONFIRMATION | CANCELLED
AWAITING_CONFIRMATION → PAUSED | QUOTE_DUE | READY_TO_BUY | CANCELLED
READY_TO_BUY → PAUSED | QUOTE_DUE | ORDERED | CANCELLED
ORDERED → RECEIVED | CANCELLED
RECEIVED e CANCELLED são terminais na RPC atual.

## Automação já existente
Ao registrar uma quote observation administrativa, se a demanda estiver QUOTE_DUE ela muda automaticamente para QUOTED_RECENTLY.

A lista semanal já seleciona demandas ACTIVE ou QUOTE_DUE dentro da janela temporal.

## Tradução de produto
FORECASTED = necessidade prevista
ACTIVE = necessidade ativa
QUOTE_DUE = precisa cotar
QUOTED_RECENTLY = cotação recente registrada
AWAITING_CONFIRMATION = aguardando confirmação/decisão
READY_TO_BUY = pronta para comprar
ORDERED = pedido realizado
RECEIVED = recebido
PAUSED = suspensa
CANCELLED = cancelada

## Comparação com ciclo desejado
O ciclo solicitado “preciso → cotando → respostas → comparação → escolhido → pedido → recebido” já está quase inteiro representado por estados.

Lacuna semântica principal: não há estado explícito de “COMPARING” nem registro de qual quote foi escolhida. AWAITING_CONFIRMATION e READY_TO_BUY cobrem decisão operacional, mas não preservam adjudicação a uma observação específica.

## Estado real
No momento da inspeção há 1 construction_demand em produção e ela está PAUSED. Isso prova estrutura/uso, não maturidade estatística.

## Recomendação
Não criar novos estados agora. Primeiro tratar:
- QUOTED_RECENTLY como “tem evidência de cotação”;
- AWAITING_CONFIRMATION como “em decisão/comparação”;
- READY_TO_BUY como “decisão de comprar tomada”.

Se o V0 precisar saber **qual fornecedor/cotação venceu**, adicionar posteriormente uma referência de adjudicação/selection, em vez de inflar a máquina de estados.

## Métricas futuras deriváveis
- tempo FORECASTED→ACTIVE;
- tempo ACTIVE→QUOTE_DUE;
- tempo QUOTE_DUE→QUOTED_RECENTLY;
- tempo até decisão;
- tempo ORDERED→RECEIVED;
- taxa de cancelamento;
- recotações QUOTED_RECENTLY→QUOTE_DUE.

Para medir tempos historicamente será necessário confirmar se existe ledger de transições; estado atual sozinho não reconstrói a jornada.

## Próximo gate
Auditar se existe histórico/event ledger de mudanças de estado. Se não houver, essa será uma lacuna informacional mais importante do que criar novos estados.

Nenhuma mutação em produção.
