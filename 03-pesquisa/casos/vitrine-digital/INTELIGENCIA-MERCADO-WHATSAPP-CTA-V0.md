# Auditoria CTA WhatsApp — Inteligência de Mercado V0

## Código
`src/lib/whatsapp.ts` implementa `trackWhatsappClick` via RPC `record_whatsapp_click`. A telemetria é fail-open: falha de tracking não bloqueia WhatsApp.

A página pública `/empresa/$slug` importa e chama `trackWhatsappClick`. Antes do tracking, resolve `commercial_business_links.supplier_id` a partir do candidate_id. Quando existe vínculo comercial, registra source `supplier_page`.

Portanto o CTA público da página de empresa já possui instrumentação de intenção de contato, condicionada à existência do vínculo candidate→supplier.

## Produção
[{"event_type":"whatsapp_click","first_at":"2026-05-06 22:03:17.182583+00","last_at":"2026-08-31 11:11:30.155076+00","n":3,"source":"list","suppliers":1,"with_product":3}]

## Interpretação
Há eventos reais na tabela, mas volume ainda é insuficiente para inferência de mercado. O fato de haver registros prova atividade do pipeline, não conversão ou venda.

## Lacuna
Empresas curatoriais sem `commercial_business_links.supplier_id` podem abrir WhatsApp sem gerar click_event. Isso cria cobertura analítica desigual entre empresas.

## Decisão
Não criar novo `contact_intent` no V0. Reutilizar `record_whatsapp_click` e, antes de monetizar métricas, medir cobertura do vínculo candidate→supplier.

## Próximo teste
Auditar quantas empresas públicas possuem commercial_business_links e quais superfícies adicionais chamam `trackWhatsappClick`. Depois definir denominador de cobertura.

Nenhuma mutação em produção.
