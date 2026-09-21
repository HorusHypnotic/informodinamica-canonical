# Smart Cotações — arqueologia da Memória Econômica e alerta de drift

Data: 2026-09-20. Auditoria read-only do histórico Git.

## Achado 1 — existe evidência histórica de record_price_observation
O commit `403274543aec3a4302665f4331acb608c4c01c24` contém uma missão operacional que explicitamente manda verificar autorização de `record_price_observation`.

Isso prova que a função fez parte do domínio operacional, mas o diff recuperado não expõe sua implementação SQL. Portanto não atribuir semântica interna ainda.

## Achado 2 — drift/reconstrução real no histórico
O mesmo commit de 25/08 remove do arquivo tipado:
- `price_movements`;
- `set_supplier_quote_item_price`.

Entretanto o estado atual de `main` que auditamos anteriormente contém novamente ambos.

Conclusão: o Smart Cotações passou por reconstruções/sincronizações de schema/código. Histórico Git isolado não é suficiente para declarar o estado do banco produtivo.

## Consequência metodológica
Para qualquer remanufatura:
`Git atual → migration atual → DB atual → teste read-only → só então mudança`.

Não assumir que migration histórica está aplicada, nem que remoção em types significou DROP real.

## Achado 3 — COMPRA REAL #001 já era objetivo canônico
O commit 4032745 registra explicitamente:
`necessidade/pedido → estoque → fornecedores → propostas → comparação → negociação → decisão → compra → entrega/recebimento → histórico`.

Isto converge quase exatamente com o ciclo fechado que estamos reconstruindo agora.

A diferença é que agora identificamos patrimônio distribuído:
- Smart Cotações: cotação/negociação/memória;
- Obra Flow: pedido/recebimento;
- StockFlow: estoque/consumo/previsão;
- Vitrine/Minha Obra: demanda/contexto;
- Telegram: canal operacional.

Logo, o antigo objetivo de “loop fechado” não exige que um único app possua todas as etapas.

## Hipótese de reconfirmação atualizada
Antes de criar `price.reconfirm_observation`, precisamos descobrir a implementação corrente de:
- record_price_observation, se ainda existe;
- finalize quotation;
- execute_price_command;
- constraints/triggers de price_observations.

Se a implementação SQL não estiver recuperável pelo Git connector, a próxima fonte deve ser o banco conectado em modo read-only, não uma migration inventada.

## Gate
Não alterar Smart Cotações nesta rodada.
Primeiro comparar schema Git tipado com banco real e verificar funções por catálogo PostgreSQL.

Nenhuma mutação em produção.
