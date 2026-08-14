# Review — MM-02 Order V0

## Contexto e escopo

Context Gate `WARN` somente pela working tree preexistente do owner; nenhum conflito canônico. Revisados Money Machine V0, DEC-OFFER-001, contrato da oferta e MM-01. Não foram implementados pagamento, PIX, comprovante, fulfillment ou CRM.

## Evidência

- Customer mínimo e classes de privacidade definidos;
- Order ID não enumerável e independente do cliente;
- preço exclusivamente server-side;
- snapshot imutável embutido;
- criação Customer/Order/Event transacional;
- estados e eventos de cancelamento/expiração;
- idempotência com replay e restrição única;
- RLS/revokes, allowlist de origem, rate limiting com IP hasheado e honeypot;
- confirmação pública não contém PII;
- owner lookup por código exato e credencial privada;
- dogfood sintético: um retry, um pedido, um evento, preço histórico R$ 197 preservado após oferta simulada R$ 247.

## Limite material

Sem ambiente Supabase autorizado não foi possível aplicar migração, testar RLS/transação contra PostgreSQL real, implantar Edge Function ou validar E2E público. A implementação não foi enviada ao storefront, portanto produção permanece MM-01 segura e `order_enabled=false`.

O candidato foi commitado localmente no storefront como `86b6b30`, sem push. Isso mantém código e histórico revisáveis sem acionar o deploy automático do GitHub Pages.

## Revisão pré-commit

O staged scope deve conter somente implementação MM-02 no storefront e documentos/schema MM-02 no canônico. Nenhum arquivo preexistente do owner, PII real, secret ou dado financeiro pode entrar. O código contém somente nomes de variáveis de secrets, nunca valores.
