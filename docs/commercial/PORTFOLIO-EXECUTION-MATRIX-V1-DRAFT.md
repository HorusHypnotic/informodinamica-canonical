# Portfolio Execution Matrix V1 — Draft

## Finalidade

Contrato entre Ecosystem Map e execução. Não substitui roadmap, checkpoint ou gate e não inicia sprint.

Campos mínimos: `SYSTEM`, `CURRENT_STATE`, `PRODUCT_COMPLETION`, `READINESS`, `CONFIDENCE`, `CURRENT_SPRINT`, `NEXT_SPRINT`, `NEXT_MILESTONE`, `BLOCKERS`, `DEPENDENCIES`, `DISTANCE_TO_VALUE`, `DISTANCE_TO_REVENUE`, `ROADMAP_STATE`.

## Método de score

Cada dimensão possui cinco checks binários previamente declarados. Score = checks comprovados ÷ checks aplicáveis × 100, restrito a 0/20/40/60/80/100. Se checks ou evidência não existirem, `UNKNOWN`. Isso não mede probabilidade de sucesso.

- `PRODUCT_COMPLETION`: buyer, problema, deliverable, preço/unidade e limites definidos.
- `TECHNICAL_READINESS`: superfície, lead, pedido, pagamento e fulfillment suportados.
- `OPERATIONAL_READINESS`: owner, SOP, capacidade, suporte e rollback.
- `COMMERCIAL_READINESS`: oferta, preço, CTA, termos e demanda observada.
- `PAYMENT_READINESS`: instrução, submissão, storage, conferência e confirmação.
- `FULFILLMENT_READINESS`: handoff, owner, execução, entrega e aceite.

Confiança `HIGH` exige evidência publicada/executável; `MEDIUM`, documentação canônica; `LOW`, inferência identificada.

## Baseline limitado

| Sistema/oferta | Product | Technical | Operational | Commercial | Payment | Fulfillment | Confiança |
|---|---:|---:|---:|---:|---:|---:|---|
| Storefront atual — MM-02 local | 80 | 60 | 40 | 60 | 0 | 0 | HIGH local/publicação MM-01 |
| Diagnóstico R$197 — candidata Order V0 | 100 | 60 | 40 | 80 | 0 | 20 | HIGH/MEDIUM |
| Smart Cotações | 80 | 80 | 60 | 20 | 0 | 60 | MEDIUM |
| Vitrine assistida | 80 | 60 | 20 | 40 | 0 | 60 | MEDIUM |

Os itens cumpridos, faltantes, blockers e marcos estão no JSON correspondente. Os 23 sistemas não foram pontuados porque a missão não oferece base uniforme e o contrato prefere `UNKNOWN` a precisão falsa.

Atualização limitada do MM-01: `CURRENT_SPRINT=MM-01_COMPLETE`, `NEXT_SPRINT=MM-02`, `NEXT_MILESTONE=FIRST ORDER`. A distância à receita permanece `MEDIUM`: existe oferta pública, mas ainda não existem Order nem pagamento. Nenhum percentual probabilístico foi inferido.

Atualização MM-02: implementação local validada, sem deploy. `CURRENT_SPRINT=MM-02_YELLOW`, `NEXT_SPRINT=MM-02_DEPLOYMENT_GATE`; `FIRST ORDER` permanece o marco. Os scores técnicos cresceram apenas pela evidência versionada/testada, não por capacidade produtiva presumida.
