# Obra Flow — ReceiptFeedback e ruptura do loop V0

Data: 2026-09-21. Auditoria read-only.

## Evidência
No main atual, `src/db/database.ts` possui:
- pedidos;
- itensPedido;
- recebimentos;
- movimentacoes;
- estoque derivado de movimentações.

`Recebimento` guarda pedidoId, itemId, dataRecebimento, quantidadeRecebida e observação.
`Movimentacao` guarda obraId, material, tipo entrada/saida/ajuste, quantidade, data, origem pedido/manual/inventario, observação.

O estoque é calculado por soma de entradas menos saídas por obra/material.

## Achado crítico
A arqueologia do commit `e539d4f...` mostra que recebimento e estoque nasceram como capacidades próximas, mas o modelo atual mantém tabelas separadas.

A busca no main não provou um vínculo automático `Recebimento → Movimentacao entrada`.

Logo, **não declarar o loop pedido→recebimento→estoque como fechado**.

Hoje há matéria-prima para fechar, mas o seam precisa ser comprovado/implementado de forma atômica ou idempotente.

## ReceiptFeedback candidato
- correlation_id/external_ref
- purchase_order_ref
- pedido_id
- item_ref
- obra
- material
- ordered_qty
- received_qty
- received_at
- receipt_status PARTIAL|COMPLETE
- stock_movement_ref
- evidence/notes

## Invariante desejável
Um recebimento confirmado deve gerar no máximo uma entrada de estoque correspondente.

Reprocessar o mesmo recebimento não pode duplicar saldo.

## Próximo corte
Auditar StockFlow/lovable-blueprint-bot para:
- consumo_obra;
- movimentações;
- pedidos_compra/itens;
- forecast;
- alertas;
- ponto de reposição.

Objetivo: descobrir quanto do motor `saldo → consumo → cobertura → reposição` já existe e qual é a menor peça a remanufaturar para Minha Obra.

Nenhuma mutação em produção.
