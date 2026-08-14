# Review — MM-02 Deployment Gate

**Data:** 2026-08-14
**Resultado:** `BLOCKED`

## Context Gate e Git

O Context Gate retornou `WARN` exclusivamente pela working tree canônica já suja com arquivos locais preexistentes do owner. Não houve conflito de autoridade. O canônico iniciou em `f00a7b4`, alinhado com `origin/main`. O storefront iniciou em `86b6b30`, limpo e um commit à frente de `origin/main`; esse commit não foi enviado.

## Autoridade do backend

O host configurado no storefront responde como projeto Supabase existente: REST sem credencial retorna 401. A função legada e `create-order` retornam 404. Isso prova existência do host, não ownership, tenancy ou autoridade de deploy.

Não foram encontradas:

- Supabase CLI instalada;
- credencial Supabase local;
- variável de ambiente Supabase/Lovable;
- vínculo versionado do repositório a um projeto;
- migration ou função histórica do backend no baseline publicado;
- secret ou variable de GitHub Actions para deployment;
- evidência de que o projeto é Supabase próprio ou Lovable Cloud;
- identidade de quem pode aplicar SQL, configurar secrets, implantar função e consultar dados.

A autenticação GitHub do owner permite operar os repositórios, mas não concede autoridade sobre o backend externo.

## Static migration review

Elementos adequados no candidato:

- somente `commercial_offers`, `customers`, `orders`, `order_events` e controle de rate limit;
- Offer Snapshot embutido e preço resolvido server-side;
- constraints de identidade, contato, estado, moeda e idempotência;
- criação Customer/Order/ORDER_CREATED dentro de uma função transacional;
- RLS habilitada e grants de `anon`/`authenticated` revogados;
- funções `SECURITY DEFINER` com `search_path=public`, grants somente para `service_role` e transições limitadas;
- código público de pedido aleatório, não sequencial;
- repetição de idempotency key retorna o mesmo Order;
- Edge Function com origin allowlist, payload server-side, honeypot e rate limit por IP hasheado com salt privado;
- resposta pública sem PII.

Risco material que impede aplicar a migration atual:

- o mesmo arquivo que cria o schema insere a candidata V1.1.0 como `ACTIVE/order_enabled=true`. A missão exige ativação somente depois de migration, Edge Function, secrets, RLS, dogfood, owner lookup e E2E passarem. A ativação deve ser separada em uma etapa/migration final, reversível e executada somente após esses gates.

Pontos que só podem ser comprovados no ambiente real:

- comportamento efetivo de RLS para `anon` e usuário autenticado comum;
- owner real das funções e tabelas;
- disponibilidade de `pgcrypto`;
- atomicidade e concorrência da idempotência em PostgreSQL implantado;
- confiança no header de IP fornecido pela plataforma;
- ausência de PII em logs da Edge Function;
- consulta administrativa e preservação do dogfood sintético.

## Estado dos gates

| Gate | Resultado |
|---|---|
| Backend authority/tenancy | BLOCKED |
| Migration static review | FAIL para aplicação; ativação prematura |
| Database/RLS real | NOT_RUN |
| Edge Function deploy | NOT_RUN |
| Secrets | NOT_CONFIGURED / autoridade desconhecida |
| Dogfood real sintético | NOT_RUN |
| Owner lookup real | NOT_RUN |
| Storefront config/push | RETIDO |
| Production E2E | NOT_RUN |
| `order_enabled` público | false, preservado |

## Consulta precisa para o owner ou agente interno Lovable

Sem revelar credenciais ou valores de secrets, responder com evidência verificável:

1. O backend referenciado por `js/portfolio-config.js` pertence a Lovable Cloud, Supabase próprio ou terceiro?
2. Qual ambiente é esse (produção/teste), região e tenancy? Registrar a identidade do projeto apenas em canal privado se considerada sensível.
3. A conta do owner controla o projeto e autoriza aplicar migrations, configurar Edge Function secrets, implantar `create-order` e executar consultas administrativas?
4. Qual mecanismo autorizado deve ser usado: agente interno Lovable/Database/SQL Editor ou Supabase CLI/painel próprio?
5. Quais tabelas, policies, funções e Edge Functions já existem? Retornar nomes/schema, nunca dados ou secrets.
6. Os secrets server-side necessários podem ser configurados? Confirmar somente presença/capacidade, nunca valores.
7. Existe ambiente de teste isolado? Caso não exista, autoriza-se um único dogfood `.invalid` marcado/preservado em produção?
8. Qual é o procedimento de desativação da função e quem pode executá-lo?

Depois dessas respostas, a menor correção necessária é separar schema e offer activation, revalidar o SQL, e só então executar os gates reais na ordem definida.

## Produção e rollback

Produção permanece MM-01: storefront no commit `49cce7f`, sem Order público e com `order_enabled=false`. Nenhum Customer/Order foi criado. O rollback atual é simplesmente manter o commit local sem push. Após futura implantação, o rollback previsto deve desativar a oferta, desativar a função e restaurar o CTA não transacional, preservando banco e eventos.

## Conclusão

`MM-02 DEPLOYMENT GATE = BLOCKED`. Não está `READY FOR FIRST REAL ORDER`. Não iniciar MM-03.
