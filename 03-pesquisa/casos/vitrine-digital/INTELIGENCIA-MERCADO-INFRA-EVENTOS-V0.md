# Auditoria de infraestrutura de eventos — reutilizar ou separar?

Data: 2026-09-20. Produção inspecionada apenas com SELECT.

## Estruturas existentes

### click_events
Foi desenhada para eventos vinculados a fornecedor/produto e já possui campos de atribuição: supplier_id obrigatório, product_id, event_type, source, source_type, source_id, campaign_id, channel, entry_path, session_id, page_path, referrer e metadata.

RLS está ativa. A política SELECT observada permite ao fornecedor consultar seus próprios eventos. Existe RPC `record_whatsapp_click(...)` executável por anon/authenticated.

**Conclusão:** infraestrutura valiosa para o estágio CONTACT/WHATSAPP, mas inadequada como armazenamento direto de `search_outcome`, porque `supplier_id` é obrigatório e uma busca pode ocorrer antes de existir fornecedor selecionado.

### attention_events
É um ledger operacional de atenção: kind, source, source_entity_id, priority, summary, route, payload, causation/correlation e estados de acknowledge/resolve. Possui pipeline próprio de captura/roteamento.

**Conclusão:** não reutilizar para analytics de busca. Misturar telemetria comercial com fila operacional de atenção degradaria a semântica dos dois sistemas.

## Decisão arquitetural provisória

**Não encaixar search_outcome à força em tabela existente.**

Reutilização correta:
- `public_demand_leads`: lado UNMATCHED que virou demanda explícita;
- `click_events` / `record_whatsapp_click`: futuro sinal de intenção de contato ligado a fornecedor/produto;
- `attention_events`: manter exclusivamente operacional;
- `search_outcome`: precisa de contrato próprio ou agregação específica, caso o experimento seja aprovado.

Isso evita criar tabela agora, mas também evita contaminar tabelas existentes só para “reaproveitar”.

## Novo mapa do funil com ativos existentes

SEARCH_OUTCOME (lacuna) → oferta apresentada → WHATSAPP_CLICK (infra já existe) → PUBLIC_DEMAND_LEAD quando não resolvido → resposta/resolução futura.

## Achado adicional

A infraestrutura de `click_events` é mais rica do que o atlas inicial assumia. Antes de criar `contact_intent`, devemos investigar se `record_whatsapp_click` já cobre o CTA público das páginas/ofertas e se está efetivamente conectado no frontend.

## Próximo gate
Auditar chamadas a `record_whatsapp_click` no código e medir os 3 registros existentes sem expor user_agent/session/referrer. Se o CTA já estiver instrumentado, o V0 precisa criar apenas o sinal de busca, não o sinal de contato.

Nenhuma alteração em produção.
