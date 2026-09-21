# Dependências supplier — lista, carrinho e cotação

## Carrinho
`src/lib/cart.ts` define CartSupplier com campo genérico `id`, e o estado é agrupado por esse id. O carrinho é localStorage (`vd_cart_v1`) e não exige semanticamente que o id pertença à tabela suppliers.

Na página curatorial, produtos são adicionados ao carrinho usando `directory.id` (candidate_id) e productId prefixado `curated:`. Portanto o carrinho moderno já aceita candidate como identidade de agrupamento.

## Solicitação pelo carrinho
`/carrinho` chama `trackWhatsappClick(supplier.id, ..., "cart")`. Como o bucket curatorial pode carregar candidate_id no campo chamado supplier.id, existe risco de mismatch: a RPC `record_whatsapp_click` espera supplier_id do domínio suppliers.

Isso revela uma dívida semântica: o tipo `CartSupplier` chama tudo de supplier embora o fluxo curatorial possa inserir candidate.

## Página de empresa
A página curatorial evita esse mismatch resolvendo candidate→supplier antes de chamar tracking. Por isso empresas sem ponte não geram evento.

## Leitura arquitetural
O domínio de UI já começou a migrar de supplier para business/candidate, mas nomes e telemetria preservam a ontologia antiga. Isso explica parte da cobertura desigual.

## Smart Cotações
No recorte inspecionado, a “Lista para cotar” é um fluxo client-side agrupado por empresa e envia solicitação via WhatsApp. Não há evidência suficiente neste lote para declarar que todo Smart Cotações depende de supplier. Tratar Smart Cotações como motor mais amplo e auditar separadamente.

## Recomendação de contrato, ainda sem implementação
Renomear conceitualmente a identidade do carrinho para `business_subject`:
- kind: CANDIDATE | SUPPLIER
- id
- candidate_id opcional
- supplier_id opcional

Analytics resolve a chave sem alterar o domínio operacional. Não executar refactor agora.

## Novo achado TPC
**Dívida ontológica:** o sistema muda de modelo de mundo, mas nomes/tipos antigos continuam transportando significados anteriores. O código funciona em parte, porém observabilidade e interpretação começam a divergir.

## Testes futuros
- item curatorial no carrinho não deve ser enviado como supplier_id inválido à telemetria;
- clique de empresa com candidate-only deve ser observável por contrato apropriado;
- falha de telemetria continua fail-open;
- agrupamento do carrinho preserva empresa correta independentemente da origem da identidade.

Nenhuma mutação em produção.
