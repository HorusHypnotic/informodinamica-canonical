# Special Review — Vitrine Digital COD

**Data:** 13 de agosto de 2026

**Repositório:** `HorusHypnotic/vitrinedigital-cod`
**Commit investigado:** `af134c8e1ac6d6d1308d60644c71f1360ba031cd` (`main`, alinhado a `origin/main`)

## Executive Verdict

**IDENTITY:** implementação direta da Vitrine Digital, criada a partir de um template TanStack/Lovable.

**CLASSIFICATION:** **A — SAME SYSTEM**. **CONFIDENCE: HIGH.**

O repositório contém um MVP full-stack recuperável de catálogo de fornecedores da construção, com descoberta por categoria, fase e região, páginas públicas, carrinho agrupado por fornecedor, conversão por WhatsApp, cadastro/autenticação, painel do fornecedor, mídia, lifecycle de ativação, ranking e registro de cliques. O primeiro commit explicitamente funcional já se chama “MVP da Vitrine Digital”. Não há evidência de predecessor ou sucessor distinto. “COD” aparece no nome do repositório, mas seu significado histórico não está documentado; não foi expandido por inferência.

O ativo não comprova operação, clientes, conversas, vendas ou receita. O README tardio intitulado “Obra Link” reúne análise estratégica e projeções, mas não prova renomeação nem monetização implementada. O código continua nomeando a experiência como Vitrine Digital.

**Papel comercial recomendado:** `SERVICE_ENABLED_SOFTWARE + LEAD_GENERATION_ENGINE + RECOVERABLE_PRODUCT + CAPABILITY_SOURCE`. A menor oferta coerente amanhã seria uma vitrine assistida de um fornecedor, publicada em slug próprio, com perfil, ofertas/mídia e CTAs rastreáveis para WhatsApp. **SERVICE_WRAPPER: PARTIALLY_VIABLE.**

O Ecosystem Map V1 registra a Vitrine como proposta conceitual sem aplicação/repositório. O código encontrado contradiz esse estado operacional. O mapa não foi alterado nesta missão; a divergência deve ser corrigida somente em V2 mediante decisão do owner.

## Evidence Boundary

O Context Gate inicial retornou `WARN` apenas pela working tree canônica preexistente `DIRTY`; branch, remote e checkpoint estavam válidos. Foram confrontados Constituição, Documento Canônico, Glossário, Ecosystem Map V1, Capability Registry V1, Systems Roadmap V1 e as reviews de Obra Flow/Pedidos COD, StockFlow e Vaga Quente.

Esta revisão usa Git e arquivos versionados. Não acessou deployment, Lovable, Supabase remoto, banco, usuários ou dados reais. A identidade histórica privada fornecida pelo owner não foi usada nem reproduzida. Convenções:

- **FATO/EVIDÊNCIA:** observável no repositório;
- **INFERÊNCIA:** conclusão sustentada por mais de uma evidência;
- **HIPÓTESE:** caminho plausível ainda não validado;
- **DESCONHECIDO:** ausência de fonte suficiente.

## Repository Identity

O clone foi criado fora do repositório canônico e preservado em `main`, HEAD `af134c8`, alinhado a `origin/main`, sem tags ou branches adicionais. O histórico é linear: template em `929a9a4` (1/1/2025), implementação concentrada em maio/2026 e README em agosto/2026. O repositório permaneceu sem alterações ao final.

Stack: React 19, TypeScript, TanStack Start/Router/Query, Vite, Tailwind/Radix, Supabase/Postgres/Auth/Storage, Cloudflare/Wrangler e Lovable. Existem `package-lock.json` e `bun.lockb`, mas o lock do npm está dessincronizado do manifesto.

## Genealogy

`template TanStack/Lovable → MVP Vitrine da Obra/Vitrine Digital → upload e fases flexíveis → carrinho e ranking → Vitrine Digital atual`

- `4a5ed4f` (1/5/2026): “Criou MVP da Vitrine Digital”; metadata inicial usa “Vitrine da Obra”, com o mesmo domínio e jornada.
- maio/2026: cadastro, catálogo, mídia, lifecycle, score, tracking, carrinho e ranking evoluem no mesmo histórico.
- `af134c8` (13/8/2026): adiciona README “Obra Link”; não altera a identidade exibida no produto.

**INFERÊNCIA:** “Vitrine da Obra” é uma variação nominal inicial do mesmo sistema, não predecessor autônomo. “Obra Link” é título documental tardio, não sucessor comprovado. Não há relação de código demonstrada com Canteiro Digital, Pedidos COD, Obra Flow, StockFlow ou Vaga Quente.

## What It Actually Does

Publica e organiza vitrines de pequenos fornecedores da construção. Visitantes filtram produtos/ofertas, consultam o fornecedor, agrupam itens por fornecedor e abrem uma conversa pré-preenchida no WhatsApp. Fornecedores autenticados criam perfil, slug, categoria, localização, WhatsApp, produtos, preços opcionais e mídia. O sistema calcula completude/status, ordena fornecedores e registra o clique de saída.

Ele não executa checkout, orçamento, pagamento, fechamento, atendimento ou confirmação de lead. “Clique no WhatsApp” é o último evento comprovadamente observável.

## User / Buyer / Beneficiary

- **Usuário público:** profissional de obra, contratante ou pessoa em reforma procurando fornecedor local.
- **Usuário operador:** fornecedor que mantém perfil e ofertas; um operador assistido também poderia fazê-lo.
- **Comprador mais plausível:** pequeno fornecedor/prestador da construção sem presença digital organizada.
- **Beneficiário:** fornecedor recebe exposição e contato; visitante reduz busca dispersa.
- **Objeto publicado:** vitrine do fornecedor e seus produtos/ofertas com mídia, preço opcional, categoria, fase e localização.

## Operational Chain

`cadastro/autenticação → configuração do fornecedor → publicação de ofertas e mídia → ativação/completude → exposição e filtros → página/carrinho → CTA por fornecedor → deep-link WhatsApp → registro do clique`

Persistência ocorre no Supabase; carrinho e preferência de fase usam `localStorage`. Atualização é feita no dashboard. Não foi encontrada administração global versionada.

## Job To Be Done

**ANTES:** fornecedor depende de indicação, redes sociais, grupos e envio manual de fotos; comprador pesquisa de forma fragmentada.

**DOR:** baixa encontrabilidade e comparação; material comercial disperso; contato sem contexto.

**VITRINE:** organiza presença, oferta, prova visual e contexto da obra em uma página pesquisável.

**DEPOIS:** visitante inicia contato direto já referenciando item ou conjunto de itens; fornecedor obtém um clique atribuível.

Valor predominante: **presença digital organizada orientada à geração de leads por WhatsApp**. Venda efetiva permanece fora do sistema.

## Product Surfaces

| Superfície | Estado | Evidência |
|---|---|---|
| Home/catálogo e filtros | IMPLEMENTED | produtos ativos; categoria, fase, região e busca |
| Página pública do fornecedor | IMPLEMENTED | rota por slug, perfil, produtos e CTA |
| Carrinho | IMPLEMENTED | local, agrupado por fornecedor, mensagem WhatsApp |
| Sobre | IMPLEMENTED | explicação da jornada |
| Auth | IMPLEMENTED | Supabase Auth e middleware SSR |
| Dashboard do fornecedor | IMPLEMENTED/PARTIAL | perfil, produtos, mídia, ativação e score |
| Upload/galeria | IMPLEMENTED | storage e mídia externa/local |
| Analytics | PARTIAL | cliques e ranking; sem conversa/venda confirmada |
| Administração global | UNKNOWN/NONE | nenhuma superfície localizada |
| Checkout/pagamento | NONE | ausência no código; README o exclui do core |
| PWA/QR/white-label/templates | NONE/UNKNOWN | não encontrados |
| Responsividade | IMPLEMENTED em código | classes responsivas; não houve ensaio visual humano |

## Data Model

Entidades: `profiles`, `suppliers`, `products`, `click_events`, mídia de fornecedor e view `supplier_ranking`. `suppliers` pertence a `auth.users`, tem slug, identificação comercial, WhatsApp, localização, mídia, categoria principal, estado, score e ativação. Produtos pertencem ao fornecedor e carregam oferta, imagem, categoria, fase, preço opcional e ativação. Eventos ligam fornecedor/produto a tipo, origem e timestamp.

O lifecycle do fornecedor vai de `draft` a `vitrine_optimized`. A completude usa categoria, produto, imagem e WhatsApp. O ranking combina completude, cliques recentes e recência, particionado por cidade. RLS existe para ownership e leitura pública de itens ativos; storage público restringe escrita à pasta do usuário.

Não há entidade de organização multiusuário, lead qualificado, conversa, orçamento, pedido, pagamento, assinatura ou comissão. Não foram encontrados arquivos de secret rastreados. **SENSITIVE MATERIAL DETECTED: não.**

## Architecture

Aplicação TanStack Start renderizada para client/SSR; frontend acessa Supabase, com clientes público e server-side e middleware de sessão. Postgres concentra schema, RLS, triggers de completude e ranking. Storage hospeda mídia. Cloudflare é alvo de execução declarado, mas deployment não foi validado. WhatsApp é deep-link `wa.me`, sem Business API. Não há servidor adicional, fila ou integração de pagamento versionada.

## Reusable Capabilities

IDs são temporários; não alteram o Capability Registry.

| CAP-ID | Nome | Evidência / maturidade | Acoplamento | Reutilização possível |
|---|---|---|---|---|
| `CAP-VD-01` | microsite público por slug | supplier route + RLS; PARTIAL/NEAR | médio | páginas de fornecedor/projeto |
| `CAP-VD-02` | catálogo contextual de obra | categoria, fase, região e busca; NEAR | médio | descoberta em Smart Cotações |
| `CAP-VD-03` | ativação por completude | enum, score, triggers e dashboard; PARTIAL | baixo/médio | onboarding de parceiros |
| `CAP-VD-04` | ingestão e galeria de mídia | storage, upload e URL externa; PARTIAL | baixo | catálogos e evidências visuais |
| `CAP-VD-05` | carrinho conversacional agrupado | estado local e uma mensagem por fornecedor; NEAR | baixo/médio | listas para cotação/contato |
| `CAP-VD-06` | CTA WhatsApp atribuível | mensagem contextual + evento/source; PARTIAL | baixo | geração de leads em verticais |
| `CAP-VD-07` | ranking leve de fornecedor | completude, recência e cliques/cidade; EARLY | médio | priorização de oferta local |

Nenhuma capability deve ser promovida sem testes próprios, revisão de segurança e separação do domínio.

## Technological Assets

- **COMMODITY:** CRUD, auth, componentes Radix, formulários e cards.
- **REUSABLE CAPABILITY:** microsite, catálogo contextual, ativação, mídia, carrinho conversacional e tracking.
- **PRODUCT-SPECIFIC ASSET:** taxonomia de fornecedores/fases e linguagem da construção.
- **DATA ASSET:** schema existe; nenhum conjunto de dados real foi comprovado.
- **WORKFLOW ASSET:** publicação assistida e progressão até vitrine ativa.
- **DESIGN/UX ASSET:** jornada responsiva de descoberta para WhatsApp.

O custo não trivial está na composição já integrada dessas peças e no workflow de ativação, não em algoritmo proprietário isolado.

## Maturity Matrix

| Eixo | Estado | Evidência |
|---|---|---|
| CODE | PARTIAL/NEAR | aplicação coerente; build/TS passam; lint e lock falham |
| UI | NEAR | jornadas públicas e privadas amplas |
| UX | PARTIAL/NEAR | fluxo simples; não validado com usuários |
| DATA MODEL | NEAR | schema, RLS, lifecycle, mídia e ranking |
| BACKEND | PARTIAL/NEAR | Supabase completo no código; banco real não ensaiado |
| AUTH | PARTIAL | implementado; ambiente e segurança operacional desconhecidos |
| PUBLIC EXPERIENCE | NEAR | catálogo, página, carrinho e CTA |
| ADMIN EXPERIENCE | NONE/UNKNOWN | painel de fornecedor não equivale a admin global |
| BUILD | PARTIAL | build passa após instalação não reprodutível |
| TESTS | NONE | nenhum script/suíte de teste |
| DEPLOYABILITY | PARTIAL | config existe; lock/env/deployment não validados |
| OPERABILITY | EARLY | sem evidência de dados, suporte ou rotina real |
| SECURITY | PARTIAL | RLS e segregação; auditoria e LGPD pendentes |
| ANALYTICS | EARLY/PARTIAL | clique/ranking, sem outcome comercial |
| COMMERCIAL READINESS | EARLY/PARTIAL | unidade assistida plausível; demanda e disposição a pagar desconhecidas |

## Technical Validation

- `npm ci`: **FAIL** — `package.json` e `package-lock.json` dessincronizados;
- instalação diagnóstica sem gravar lock: **PASS**, com warning de engine e 5 vulnerabilidades reportadas pelo npm (4 moderadas, 1 alta);
- Node local `22.12.0`: abaixo do requisito `22.13.0` de uma dependência de lint;
- build de produção: **PASS** (client e SSR);
- `tsc --noEmit`: **PASS**;
- lint: **FAIL**, principalmente conflito CRLF/Prettier em grande escala;
- testes: **NONE** — não há script nem suíte;
- deployment/banco: não acessados;
- `git diff --check`: PASS;
- repositório investigado: limpo e alinhado ao remote após a validação.

O build regenerou `routeTree.gen.ts`; o arquivo foi restaurado exatamente ao HEAD, conforme a obrigação de preservação. Nenhuma correção foi aplicada.

## Revenue Model Evidence

| Modelo | Classificação | Evidência |
|---|---|---|
| `ONE_TIME_SERVICE` / `SETUP_FEE` | SUPPORTED_BY_ARCHITECTURE | operador pode montar uma vitrine e cobrar fora do sistema |
| `PER_VITRINE` | SUPPORTED_BY_ARCHITECTURE | slug/perfil constitui unidade isolável |
| `AGENCY_SERVICE` | SUPPORTED_BY_ARCHITECTURE | onboarding e mídia podem ser operados manualmente |
| `LEAD_GENERATION` | SUPPORTED_BY_ARCHITECTURE | clique é registrado, mas lead/conversa não é confirmado |
| `SUBSCRIPTION` / `SELF_SERVICE_SAAS` | PLAUSIBLE_INFERENCE | defendidos no README, não implementados |
| `WHITE_LABEL` | PLAUSIBLE_INFERENCE | arquitetura adaptável, sem recurso próprio |
| `COMMISSION` | NO_EVIDENCE | não há transação nem checkout |
| pagamento/cobrança | NO_EVIDENCE | nenhuma integração localizada |

Preços, projeções, TAM, payback e metas no README são hipóteses documentais não validadas; não foram tratados como estado do produto.

## Service Wrapper Test

**SERVICE_WRAPPER: PARTIALLY_VIABLE.**

Fluxo possível: `fornecedor entrega identidade, WhatsApp, localização, ofertas e mídia → operador configura conta/vitrine → publica e revisa slug → entrega link → fornecedor divulga → sistema registra cliques → operador cobra setup/manutenção fora da plataforma`.

O código suporta a entrega central, mas faltam instalação/deploy reproduzíveis, ambiente/banco confirmado, procedimento de consentimento e conteúdo, operação administrativa, suporte, termos/LGPD, segurança revisada e comprovação de que clique gera conversa útil. Um piloto assistido pode reduzir esses riscos; não prova repetibilidade nem SaaS.

## Distance to First User

**NEAR.** Configurar ambiente, publicar uma vitrine consentida e entregar o link já permite uso público. O deployment declarado não foi verificado.

## Distance to First Value

**NEAR.** O valor inicial é presença organizada e contato contextual. Pode ocorrer antes de volume de marketplace, desde que o fornecedor distribua seu próprio link. Valor como canal de descoberta orgânica exige oferta e tráfego, portanto é mais distante.

## Distance to First Revenue

**NEAR para serviço assistido; MEDIUM para produto self-service.**

`estado atual → corrigir reprodutibilidade/configuração e revisar segurança → fornecedor piloto consentido → vitrine publicada → entrega e aceite → cobrança off-platform → primeiro pagamento`

Primeiro Pix não depende de checkout interno, mas depende de alguém aceitar pagar pelo setup/manutenção. Essa demanda não está comprovada.

## Smallest Plausible Sale

**BUYER:** pequeno fornecedor local da construção.

**PROBLEM:** não possui uma presença organizada e compartilhável para apresentar ofertas e receber contatos contextualizados.

**DELIVERABLE:** uma vitrine assistida publicada em slug próprio, com perfil, WhatsApp, localização, ao menos uma oferta e mídia, mais CTAs rastreáveis.

**CURRENT SYSTEM SUPPORT:** alto para configuração, publicação e clique; baixo para cobrança/outcome.

**MANUAL WORK REQUIRED:** coleta, consentimento, curadoria, cadastro, revisão, publicação, entrega, suporte e relatório simples.

**BLOCKERS:** ambiente reproduzível, segurança/LGPD, operação administrativa e validação de valor.

**PAYMENT MECHANISM REQUIRED:** cobrança legítima externa por setup ou pacote; não exige alteração do produto para um ensaio.

**REPEATABILITY:** plausível, não comprovada.

**EVIDENCE LEVEL:** MEDIUM para capacidade de entrega; LOW para demanda e receita.

## Build-vs-Recover Assessment

- **TECHNOLOGY_COMPLETION: HIGH** para a unidade assistida; **MEDIUM** para SaaS operacional.
- **OPERATIONAL_COMPLETION: LOW/PARTIAL** — infraestrutura e rotina reais são desconhecidas.
- **COMMERCIAL_COMPLETION: LOW** — oferta, aquisição, suporte, preço e disposição a pagar não foram testados.

Recuperar evita reconstruir catálogo, microsite, dashboard, mídia, auth, lifecycle, ranking e tracking. Não evita o trabalho comercial e operacional que determina receita.

## Ecosystem Position

Classificações: `SERVICE_ENABLED_SOFTWARE`, `LEAD_GENERATION_ENGINE`, `RECOVERABLE_PRODUCT` e `CAPABILITY_SOURCE`; `MICRO_SAAS` é hipótese futura, não estado atual.

Relação: `INDEPENDENT_VERTICAL + SPECIALIZED_DOMAIN + SHARED_CAPABILITY_SOURCE`. Pode ser uma camada de descoberta/conversão anterior a Smart Cotações, mas não há integração nem dependência implementada. Não deve ser fundida ao OPERA por conveniência nominal.

## Ecosystem Map V2 Recommendation

1. Corrigir “proposta sem aplicação” para **produto recuperável com repositório confirmado**, preservando a ausência de operação comprovada.
2. Associar o repositório e a genealogia direta; manter “COD” como significado desconhecido.
3. Catalogar as sete capabilities como candidatas, sem promoção automática.
4. Prioridade recomendada: **NEXT**, limitada a decisão/ensaio comercial assistido; não abrir sprint de features.
5. **REVENUE_PRIORITY: HIGH**, **TECHNOLOGY_PRIORITY: MEDIUM**, **RESEARCH_PRIORITY: LOW**.
6. Antes de retomar desenvolvimento, exigir um comprador hipotético específico, oferta de uma vitrine, critério de aceite e teste de disposição a pagar.
7. Tratar Smart Cotações como complementaridade possível, não como ownership ou integração existente.

## Risks

- catálogo vazio e descoberta sem massa crítica;
- clique confundido com lead, conversa ou venda;
- fornecedor não responder ou atender mal;
- exposição de WhatsApp, mídia e dados comerciais sem governança adequada;
- RLS/storage não auditados em ambiente real;
- lockfile quebrado, lint vermelho, vulnerabilidades de dependência e ausência de testes;
- dependência operacional de Supabase/Lovable/Cloudflare não comprovada;
- ranking com pesos codificados sem validação de eficácia/fairness;
- README mistura fatos, recomendações e projeções, elevando risco de claims indevidos;
- inexistência de pagamento, plano ou administração global implementados.

## Unknowns

Estado do deployment e banco; existência de fornecedores/produtos/cliques reais; ownership operacional; domínio e marca; significado de “COD”; clientes, demanda, tráfego, conversas, vendas e receita; custos; termos e conformidade LGPD; suporte; disponibilidade e resposta dos fornecedores; disposição a pagar; eventual sucessor externo não versionado.

## Evidence

Fontes principais: histórico Git completo; commits `4a5ed4f`, `27a18a5`, `13aa258` e `af134c8`; `package.json`; rotas públicas/privadas; componentes de catálogo; libs de carrinho/WhatsApp/mídia; clientes Supabase; tipos gerados; oito migrations de maio/2026; `wrangler.jsonc`; README e validações não destrutivas.

A revisão não altera produto, banco, Ecosystem Map V1 ou Capability Registry. É falseável por evidência futura de genealogia, ambiente, usuários, outcomes e receita.
