# Remanufatura — ciclo fechado de suprimentos da obra

Data: 2026-09-20.

## Correção de mapa
A arqueologia existente já provava que Pedidos COD é predecessor direto do atual `HorusHypnotic/obra-flow` (Obra Flow), com Dexie local-first e fluxo executável:
obra → pedido → recebimento → movimentação de entrada → estoque → saída/ajuste.

Também já existe patrimônio separado no StockFlow para consumo, previsão, alertas, fornecedores e reposição.

As evidências operacionais fornecidas agora mostram que o produto Smart Cotações também existe funcionalmente, com comparação multi-fornecedor, melhor preço item-a-item, combinação econômica, BATNA, renegociação, processamento/finalização e superfície de timeline.

Portanto, o problema não é criar três produtos. É remanufaturar suas capacidades num ciclo único.

## Ciclo canônico candidato
MINHA OBRA
estoque + consumo diário + necessidade futura
↓
MOTOR DE REPOSIÇÃO
cobertura de estoque + lead time + margem de segurança
↓
DEMANDA
manual, avulsa, não encontrada na Vitrine ou prevista pela obra
↓
TELEGRAM / OPERAÇÃO HUMANA
operador recebe e aciona relacionamento real
↓
SMART COTAÇÕES
fornecedores → respostas → comparação → BATNA → renegociação → escolha
↓
PEDIDO / OBRA FLOW (linhagem Pedidos COD)
pedido → WhatsApp → recebimento → entrada
↓
MINHA OBRA
novo saldo → novo ritmo de consumo → nova previsão

Isso forma feedback operacional:
ESTOQUE → CONSUMO → PREVISÃO → COTAÇÃO → COMPRA → ENTREGA → ESTOQUE.

## Regra determinística de continuidade
Para um material:
- cobertura_dias = estoque_disponível / consumo_médio_diário
- consumo_durante_lead_time = consumo_médio_diário × lead_time_real
- ponto_de_pedido = consumo_durante_lead_time + estoque_de_segurança

Exemplo observado pelo owner:
50 sacos / 15 sacos-dia = ~3,33 dias de cobertura.
Com lead time médio de 3 dias, o estoque está praticamente no limite de reposição antes mesmo de considerar segurança.

O alerta útil não é “estoque baixo”; é “comprar agora para evitar ruptura”.

## Patrimônio a reutilizar
### Vitrine / Minha Obra
- porta de demanda;
- contexto de obra;
- futuro consumo/estoque integrado;
- ledger construction_demands já encontrado.

### Smart Cotações existente
- matriz item × fornecedor;
- preço por item;
- melhor geral;
- combinação econômica;
- cobertura integral;
- BATNA;
- renegociação;
- status de quote;
- finalização;
- timeline a auditar.

### Obra Flow / Pedidos COD
- obra;
- pedido e itens;
- fornecedor textual;
- datas/previsão;
- WhatsApp;
- recebimento;
- movimentação;
- estoque;
- NF;
- backup local.

### StockFlow
- consumo_obra;
- previsão;
- alertas;
- fornecedores;
- pedidos_compra;
- reposição;
- custos;
- trilha de auditoria/custódia.

## Princípio de remanufatura
Não copiar sistemas inteiros para dentro da Vitrine.

Extrair contratos/capabilities:
1. DemandSignal
2. ReplenishmentDecision
3. QuoteCase
4. QuoteObservation
5. SupplierSelection
6. PurchaseOrder
7. Receipt
8. StockMovement
9. ConsumptionObservation

Cada motor pode manter sua interface, mas a informação precisa atravessar o ciclo sem redigitação destrutiva.

## Nova hipótese Informodinâmica
**Continuidade por fechamento de ciclo**: uma ferramenta operacional gera mais valor quando a saída de uma etapa vira estado observável da etapa seguinte e retorna como sinal para a origem.

No caso:
pedido recebido não encerra o processo; ele altera estoque, que altera cobertura, que altera a próxima previsão.

## Não fazer
- não criar segundo Smart Cotações;
- não criar segundo estoque;
- não duplicar fornecedor apenas para integração;
- não transportar a implementação inteira de Obra Flow/StockFlow;
- não substituir operação humana/Telegram antes de provar ganho;
- não chamar clique/quote de compra;
- não usar média de consumo como previsão perfeita.

## Próxima auditoria
1. localizar repositório/fonte atual do Smart Cotações mostrado nas telas;
2. mapear schema e timeline;
3. mapear no Obra Flow o gerador/resumo WhatsApp e contrato Pedido;
4. mapear no StockFlow as funções exatas de consumo/previsão/reposição;
5. produzir matriz capability → fonte → contrato → destino na Vitrine;
6. só então decidir código a transplantar.

Nenhuma mutação em produção.
