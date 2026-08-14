# Money Machine — Customer + Order V0

## Estado

Implementação validada localmente e **não implantada**. A oferta pública V1.0.0 continua `ACTIVE` para apresentação e `order_enabled=false`. A candidata V1.1.0 permanece `APPROVED` até o Deployment Gate.

## Arquitetura mínima

```text
GitHub Pages order form
  -> Supabase Edge Function POST create-order
  -> validação server-side + origin allowlist + rate limit por hash
  -> função PostgreSQL transacional
  -> Customer + Order com Offer Snapshot + ORDER_CREATED
  -> confirmação pública sem PII

Owner CLI + service role privada
  -> lookup de um order_code exato
```

Supabase foi escolhido como candidato porque o storefront já referencia uma Edge Function nesse serviço e Money Machine V0 permite seu reuso após decisão de tenancy, segurança e ownership. A evidência atual não confirma essas três condições; por isso nenhum deploy foi realizado.

## Customer V0

Nome do responsável, email ou telefone, organização opcional, consentimento e timestamps. Não há CPF, CNPJ, endereço, documento, dado bancário ou conteúdo do diagnóstico. Classe `CUSTOMER_PRIVATE`.

## Order V0

Identidade interna UUID e código público aleatório `ORD-YYYYMMDD-<32 HEX>`, sem nome do cliente e sem sequência enumerável. Estados: `CREATED`, `AWAITING_PAYMENT`, `CANCELLED`, `EXPIRED`. A criação atômica persiste diretamente `AWAITING_PAYMENT` e um `ORDER_CREATED`; `CREATED` permanece no contrato para evolução controlada, sem estado parcial persistido.

O snapshot embutido congela Offer ID/versão, nome, preço/currency, entregável, SLA, limites e timestamp. O cliente envia apenas `offer_id`; preço e versão vêm da oferta ativa no banco.

## Integridade e segurança

- transação única para Customer, Order e Event;
- chave de idempotência armazenada somente como SHA-256 e protegida por `UNIQUE`;
- retry retorna o mesmo pedido; corrida não cria duplicata;
- RLS em todas as tabelas e nenhum grant para `anon`/`authenticated`;
- Edge usa service role somente server-side;
- origem permitida explícita, sem wildcard;
- no máximo cinco tentativas/hora por hash de IP com salt privado;
- honeypot complementar e validação server-side;
- falha nunca retorna confirmação de pedido;
- não existe endpoint público de listagem ou consulta de pedido;
- owner lookup exige `SUPABASE_SERVICE_ROLE_KEY` e código exato.

## Decisões operacionais congeladas

- SLA: três dias úteis depois de todos os inputs necessários estarem disponíveis;
- correção factual: três dias úteis após entrega, apenas contra entradas originais;
- canal privado: definido por pedido, sem fornecedor obrigatório;
- operador inicial: owner;
- capacidade: não medida e não publicada;
- cancelamento: transição humana possível, sem efeito financeiro automático;
- reembolso: não definido antes da sprint de pagamento.

## Deployment Gate

Antes de ativar `order_enabled=true`: confirmar projeto/tenancy/ownership; revisar/aplicar migração; configurar secrets; implantar função; executar dogfood sintético no banco real; testar owner lookup; configurar URL pública; verificar RLS, rate limit e logs; então publicar o storefront. Aplicar a migração é a transição operacional explícita da candidata V1.1.0.
