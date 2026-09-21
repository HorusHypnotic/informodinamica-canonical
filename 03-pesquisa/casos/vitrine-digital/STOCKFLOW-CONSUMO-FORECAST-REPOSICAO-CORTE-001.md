# StockFlow — consumo → forecast → reposição, corte 001

Data: 2026-09-21. Auditoria read-only do Git.

## FATO — motor já existe
No histórico do repo `HorusHypnotic/lovable-blueprint-bot`, o StockFlow já contém um motor econômico-operacional bem mais maduro do que uma simples tela de estoque.

Migration `20260427235137...` adiciona aos recursos:
- estoque_minimo;
- estoque_maximo;
- ponto_reposicao;
- lead_time_dias;
- custo_medio;
- fornecedor_preferido_id;
- consumo_medio_diario.

A função `atualizar_consumo_medio(recurso)` calcula consumo diário pelas saídas dos últimos 30 dias e recalcula:
`ponto_reposicao = max(estoque_minimo, consumo_medio_diario × lead_time_dias)`.

A função `sugerir_reposicao()` retorna somente recursos abaixo do ponto de reposição e calcula:
- quantidade atual;
- ponto de reposição;
- quantidade sugerida;
- fornecedor preferido;
- custo estimado;
- dias até acabar.

A quantidade sugerida busca recompor até estoque_maximo, ou 3× estoque_minimo quando máximo não existe.

## FATO — forecast separado
Migration `20260428000137...` implementa `prever_consumo(p_dias=30)`.

Ela deriva:
- consumo médio diário;
- consumo previsto no horizonte;
- saldo previsto;
- dias até acabar;
- booleano vai_faltar.

Logo StockFlow já distingue previsão de consumo de decisão de reposição.

## FATO — consumo por obra e desvio
Migration `20260427235635...` cria `consumo_obra` e `detectar_desvio_consumo()`.

O detector compara média dos últimos 7 dias com `consumo_medio_diario` e classifica razões >=2 como alto e >=3 como crítico.

Isso permite separar:
- tendência normal de consumo;
- aceleração anormal;
- risco de ruptura.

## FATO — já existe ação de compra
`src/hooks/useReplenishment.ts` chama `sugerir_reposicao()` e expõe `reporAgora`.

`reporAgora` cria diretamente:
1. `pedidos_compra`, origem `auto_reposicao`, status `solicitado`;
2. `itens_pedido` com quantidade sugerida e preço unitário derivado do custo estimado.

O comentário do código é explícito: `1 clique = pedido criado`.

## FATO — automação existente, mas não cria compra nesse corte
`executar_automacoes()` recalcula consumo médio, gera alertas e auto-aprova pedidos já solicitados quando abaixo do limite configurado do fornecedor.

Apesar da variável `v_pedidos_auto`, a versão auditada não cria pedidos automaticamente dentro dessa função.

Portanto não afirmar que o cron diário compra sozinho.

## INFERÊNCIA — patrimônio ideal para Minha Obra
A promessa do Minha Obra “informo o consumo diário e o sistema estima quando comprar novamente” já tem quase todo o motor pronto no StockFlow.

A menor remanufatura não é copiar StockFlow inteiro. É extrair o contrato de decisão:

`StockSnapshot + ConsumptionSignal → ReplenishmentDecision`

## Contrato candidato: ReplenishmentDecision
- correlation_id
- worksite_ref
- material_ref / canonical_material_key
- quantity_on_hand
- avg_daily_consumption
- forecast_horizon_days
- forecast_consumption
- projected_balance
- days_to_stockout
- reorder_point
- suggested_quantity
- estimated_cost opcional
- preferred_supplier_ref opcional
- reason: BELOW_REORDER_POINT | FORECAST_SHORTAGE | CONSUMPTION_SPIKE
- evidence_window
- generated_at
- status: SUGGESTED | ACCEPTED | DISMISSED | EXPIRED

## INFERÊNCIA — seam com Smart Cotações
Não é desejável que `reporAgora` da remanufatura escolha silenciosamente fornecedor/preço para a Vitrine.

Para o ecossistema federado:
`ReplenishmentDecision`
→ gera necessidade de compra
→ Smart Cotações reconfirma preço/cota fornecedores
→ Award
→ PurchaseOrderHandoff
→ recebimento
→ ReceiptFeedback
→ estoque/consumo novamente.

StockFlow continua sendo cérebro de necessidade; Smart Cotações continua cérebro de mercado/preço.

## HIPÓTESE — V0 Minha Obra
Para cimento, por exemplo:
- usuário registra saída diária;
- média móvel de 30 dias é calculada;
- cobertura = saldo / consumo médio;
- ponto de reposição incorpora lead time;
- UI mostra “no ritmo atual, este estoque dura ~X dias”;
- quando cruza o ponto, CTA: `Cotar reposição` em vez de `Comprar automaticamente`.

Isso preserva decisão humana e alimenta Smart Cotações.

## Risco encontrado
As policies históricas das tabelas auditadas são amplas (`USING (true)` / `WITH CHECK (true)`). Isso é evidência histórica, não confirmação do banco atual. Não remanufaturar políticas de acesso sem auditoria do DB real.

## Próximo corte
Auditar `useOrders`, recebimento de pedido no StockFlow e movimentação correspondente para descobrir se o StockFlow já fecha compra → entrada → custo médio, e comparar esse seam com o ReceiptFeedback desenhado no Obra Flow.

Nenhuma mutação em produção. Freeze da Vitrine preservado.