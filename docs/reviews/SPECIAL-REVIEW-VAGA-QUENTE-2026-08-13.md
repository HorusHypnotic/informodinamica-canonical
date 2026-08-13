# Special Review — Vaga Quente

**Data:** 13 de agosto de 2026

**Repositório:** `HorusHypnotic/vaga-quente-connect`

**Commit investigado:** `db698b08e128badf871a51a0b921387dfff19b60` (`main`, alinhado a `origin/main`)

## Executive Verdict

**FATO:** `vaga-quente-connect` é uma implementação explícita do **Vaga Quente**, não apenas uma apresentação ou backlog. A identidade aparece no repositório, PWA, UI, schema e histórico.

**CLASSIFICATION:** **A — SAME SYSTEM**. **CONFIDENCE: HIGH.**

**Classificação patrimonial:** `RECOVERABLE_PRODUCT + MARKETPLACE PROTOTYPE + CAPABILITY_SOURCE`.

O produto implementa um marketplace bilateral vertical de mão de obra para construção: empregadores publicam vagas ou empreitas; trabalhadores mantêm perfil, disponibilidade e preço; o backend gera e ordena matches; contato, reserva, contratação, avaliação e métricas fecham parte relevante do funil. Isso contradiz o estado operacional do Ecosystem Map V1, que o registra como backlog sem software confirmado. O mapa não foi alterado nesta missão.

Ainda não é operacional/comercial comprovado. Não há evidência de oferta e demanda reais, pagamento automatizado ou WhatsApp Business API. Pix usa dados placeholder e aprovação manual; WhatsApp é deep-link. A distância até primeira receita é **MEDIUM**, dominada por segurança, configuração, ensaio real e aquisição bilateral — não pela ausência de software.

## Evidence Boundary

O Context Gate retornou `WARN` somente pela working tree canônica preexistente `DIRTY`; branch e remote estavam corretos, sem erros. Foram lidos os documentos de governança, Ecosystem Map V1, Capability Registry, Systems Roadmap e reviews recentes.

Esta revisão usa apenas Git e arquivos versionados. Não acessou deployment, Lovable, Supabase remoto, dados reais ou a identidade histórica privada fornecida pelo owner. Distinções usadas:

- **FATO/EVIDÊNCIA:** observável em código, migration, teste ou Git;
- **INFERÊNCIA:** interpretação sustentada pelos fatos;
- **HIPÓTESE:** caminho plausível ainda não validado;
- **DESCONHECIDO:** sem fonte suficiente.

## Repository Identity

O clone estava ausente e foi criado no diretório de projetos. Estado preservado: `main`, HEAD `db698b0`, alinhado a `origin/main`, sem tags ou branches divergentes e com working tree limpa. Stack: React 18, TypeScript, Vite, shadcn/Tailwind, TanStack Query, Supabase/Postgres e Lovable Cloud Auth. Há três lockfiles (`package-lock.json`, `bun.lock`, `bun.lockb`), sinal de disciplina de instalação ambígua.

README, HTML e manifesto PWA declaram Vaga Quente. O nome genérico do pacote é scaffolding, não identidade de produto.

## Genealogy

| Fase | Evidência |
|---|---|
| Template | `551ad2f`, 7/10/2025: scaffold Lovable/Vite |
| Conceito inicial | outubro/2025: schema de trabalhadores, vagas, candidaturas e mídia; storage e segurança |
| MVP público | abril/2026: auth/RLS e commits explícitos de “MVP Vaga Quente” |
| Contratação e matching | abril/2026: contratação completa, matching sugerido, score e rodízio |
| Empreitas | abril/2026: composição de múltiplas vagas, reservas e status agregados |
| Inteligência de mercado | maio/2026: disponibilidade, reputação bilateral, preço, geografia, matching reverso, tracking, agenda e relatórios |
| Estado atual | maio–agosto/2026: correções; README ampliado no HEAD |

Genealogia comprovada: `template Lovable → Vaga Quente MVP → Vaga Quente com matching/reputação/empreitas`. Não há predecessor ou sucessor com outro nome identificado.

## What It Actually Does

**Usuários:** trabalhador de construção, empregador/contratante e administrador.

**Dor:** reduzir tempo e incerteza para encontrar mão de obra disponível e compatível, dando ao trabalhador acesso a oportunidades e ao empregador uma lista priorizada.

**Mercado:** bilateral. Trabalhadores fornecem perfil, função, localização, disponibilidade, agenda, preço e interesse; empregadores fornecem vaga, local, data, diária, quantidade e contato.

**Unidade central:** o par `vaga × trabalhador`, materializado em candidatura, match, reserva ou contratação.

**Transação principal:** publicação de necessidade → seleção/priorização → contato/reserva → contratação → resultado/reputação.

Há persistência, autenticação, backend, banco, storage, RLS, ranking, geografia, histórico, avaliações e painel administrativo. Não foi encontrado chat interno: a comunicação é desviada para WhatsApp. Notificações automáticas externas permanecem promessa.

## Operational Chain

`cadastro/perfil → disponibilidade/preço/localização → publicação de vaga/empreita → geração de matches → ranking → contato/candidatura → reserva → contratação → avaliação/outcome → reputação/recorrência/relatório`

O motor também executa matching reverso, partindo do trabalhador para vagas compatíveis.

## Architecture

- SPA/PWA com 14 rotas funcionais;
- Supabase como autoridade de dados, auth e storage;
- regras centrais em funções/triggers Postgres;
- frontend consulta e muta dados diretamente via Supabase;
- RLS evoluiu de policies públicas amplas para regras por owner/role em domínios posteriores;
- error monitor local registra eventos no navegador, não observabilidade central;
- nenhuma Edge Function ou serviço versionado de pagamento/notificação foi localizado.

## Data Model

Entidades principais:

- `trabalhadores`, `vagas`, `candidaturas`, `contratacoes`, `avaliacoes`;
- `matches_sugeridos`, `match_outcomes`, `worker_stats`, `employer_stats`, `pair_history`;
- `empreitas`, `reservas`;
- `agenda_disponibilidade`, `vaga_interacoes`;
- `funcoes_canonicas`, `funcoes_alias`;
- `midias`, `user_roles`, `relatorios_mensais`.

Relações preservam trabalhador, empregador, vaga, par recorrente e resultados. Estados cobrem vaga, pagamento, match, contratação, empreita, reserva e disponibilidade. Triggers atualizam métricas, expiram reservas, aplicam decay e sincronizam empreitas.

## Product Surfaces

| Grupo | Superfícies |
|---|---|
| Aquisição | home, vitrine pública, vagas públicas e PWA |
| Identidade | auth, cadastro do trabalhador e perfil |
| Trabalhador | painel, vagas, candidaturas/contratações, agenda e disponibilidade |
| Empregador | publicar vaga, minhas vagas, candidatos, empreitas e detalhe |
| Operação | reserva, contratação, WhatsApp e avaliações |
| Governança | admin, pagamentos manuais, métricas e PDF |

Não há mapa visual ou chat interno. Geografia é modelada por coordenadas, cidades, raio e cálculo de distância.

## Reusable Capabilities

IDs abaixo são temporários e não alteram o Capability Registry.

| ID | Capability | Evidência/maturidade | Acoplamento | Potencial de reuso |
|---|---|---|---|---|
| `CAP-VQ-01` | matching bilateral explicável | RPC gera score e `motivos`; PARTIAL/NEAR | médio | alocação de equipes, fornecedores, serviços |
| `CAP-VQ-02` | disponibilidade temporal com decay | status, agenda e timestamps; PARTIAL | baixo/médio | Copiloto, logística, escalas |
| `CAP-VQ-03` | matching geográfico com fallback | distância, cidade, bairro e raio; PARTIAL | médio | Smart Cotações, Build Fast Delivery |
| `CAP-VQ-04` | reputação bilateral e do par | worker/employer stats e pair history; PARTIAL | médio | marketplaces e redes de fornecedores |
| `CAP-VQ-05` | fairness/rodízio de exposição | penalidade por contatos recentes; PARTIAL | médio | filas e distribuição de oportunidades |
| `CAP-VQ-06` | reserva com SLA e expiração | estados, métricas e funções; PARTIAL | baixo | alocação de recursos/agenda |
| `CAP-VQ-07` | normalização de função | catálogo canônico, aliases e unaccent; PARTIAL | baixo | cadastros ocupacionais |
| `CAP-VQ-08` | funil e outcomes | interação, contato, contratação e relatório; PARTIAL | médio | produto/analytics operacional |
| `CAP-VQ-09` | composição de empreita | múltiplas vagas e status agregado; PARTIAL | alto | planejamento de equipes de obra |

Nenhuma capability deve ser promovida sem teste independente contra o SQL real e revisão de segurança.

## Technological Assets

O ativo não trivial é o motor versionado de matching: hard gate de função; normalização/aliases; compatibilidade de preço; distância; cidade/raio; disponibilidade; agenda; recência; score do trabalhador e empregador; histórico do par; candidatura; tempo de resposta; e penalidade por sobre-exposição. Os motivos são preservados com o resultado.

Também têm valor o modelo de reputação bilateral, a memória do par, reservas/empreitas e o funil de outcomes. Esses mecanismos seriam mais caros de reconstruir do que CRUD/UI.

## Maturity Matrix

| Eixo | Estado | Evidência |
|---|---|---|
| CODE | PARTIAL | build/TS passam; lint falha |
| UI | NEAR | jornadas amplas e responsivas, sem validação humana real |
| DATA MODEL | NEAR | schema rico e migrations extensas; consistência em produção desconhecida |
| BACKEND | PARTIAL/NEAR | funções e triggers relevantes; não executados contra DB isolado |
| AUTH | PARTIAL | auth/roles/RLS existem; legado público e privacidade exigem auditoria |
| WORKFLOW | NEAR | funil completo codificado; transação real não provada |
| TESTS | EARLY | 14 testes passam, mas majoritariamente testam regras reimplementadas/mocks |
| BUILD | NEAR | build e `tsc --noEmit` passam; bundle de 789 kB gera warning |
| DEPLOYABILITY | PARTIAL | live URL declarada; `npm ci` falha e há múltiplos lockfiles |
| OPERABILITY | PARTIAL | configuração real, massa crítica e suporte desconhecidos |
| OBSERVABILITY | EARLY | monitor local; sem telemetria central comprovada |
| SECURITY | PARTIAL | RLS/roles existem; dados pessoais e policies históricas requerem revisão |
| COMMERCIAL READINESS | EARLY | preço aparece na UI, mas pagamento e mercado não estão validados |

## Technical Validation

- `npm ci`: **FAIL**, `package.json` e `package-lock.json` dessincronizados;
- instalação sem gravar lock: PASS, com warnings de engine no Node local;
- build de produção: **PASS**, warning de chunk acima de 500 kB;
- TypeScript `--noEmit`: **PASS**;
- Vitest: **14/14 PASS**;
- lint: **FAIL**, 67 erros e 19 warnings;
- repository status após validação: limpo.

Nada foi corrigido. Os testes não exercitam um Supabase real; “E2E” no nome é impreciso porque usa mocks e regras locais.

## Commercial Interpretation

**EVIDÊNCIA:** existe modelo freemium rudimentar: vaga normal grátis e vaga relâmpago destacada por R$ 30. O admin aprova comprovante manualmente. Há tracking de funil, disponibilidade e contratação.

**NÃO IMPLEMENTADO como prometido:** Mercado Pago/Pix dinâmico; WhatsApp Business API; disparos automáticos; backup diário comprovado; cobrança recorrente; comissão; assinatura.

**INFERÊNCIA estratégica:** papéis plausíveis são `STANDALONE_PRODUCT`, `MARKETPLACE`, `LEAD_GENERATION_ENGINE`, `VERTICAL_SAAS`, `RECOVERABLE_PRODUCT` e `CAPABILITY_SOURCE`. O pagador mais evidente é o empregador, por destaque/urgência ou acesso assistido a candidatos. Assinatura B2B e serviço assistido são hipóteses, não receita comprovada.

## Distance to First Revenue

**DISTANCE_TO_FIRST_REVENUE: MEDIUM.**

Barreiras objetivas:

1. eliminar placeholders e escolher processo de cobrança legítimo;
2. auditar privacidade, consentimento, exposição de telefone/mídia e RLS;
3. tornar instalação/deploy reproduzíveis e resolver falhas técnicas mínimas;
4. validar um funil controlado com empregador e trabalhadores reais;
5. operar aquisição e suporte nos dois lados;
6. provar que um destaque ou serviço produz valor antes de cobrar.

O primeiro pagamento assistido pode ser tecnicamente simples, mas sem oferta/demanda verificadas não constitui um produto repetível.

## Ecosystem Relationships

- `INDEPENDENT_VERTICAL`: recrutamento/alocação, fora da cadeia principal de suprimentos;
- `SPECIALIZED_DOMAIN`: mão de obra temporária para construção;
- `SHARED_CAPABILITY_SOURCE`: matching, disponibilidade, geografia, reputação e reservas;
- Copiloto pode consumir alocação/presença futuramente, mas não há integração;
- Smart Cotações e Build Fast Delivery podem reutilizar princípios de matching geográfico/fairness;
- Control/Atlas podem consumir outcomes, sem ownership atual.

Seu valor pode justamente vir da independência vertical. Não há justificativa para fundi-lo ao OPERA core.

## Risks and Gaps

- efeito de rede bilateral e demanda não provados;
- dados pessoais, telefone, foto/áudio, geolocalização e reputação elevam risco LGPD;
- claims de velocidade, justiça e transparência não foram validados;
- score possui pesos/thresholds codificados, sem calibração ou auditoria de viés documentada;
- migrations sucessivas redefinem funções; estado efetivo do banco remoto é desconhecido;
- cobrança placeholder e aprovação manual;
- WhatsApp sem automação oficial;
- lockfiles conflitantes, lint vermelho e testes superficiais;
- deployment declarado não foi acessado nem validado.

## Ecosystem Map V2 Recommendation

1. Reconhecer Vaga Quente como sistema independente existente e associar o repositório confirmado.
2. Classificar como `RECOVERABLE_PRODUCT + MARKETPLACE PROTOTYPE + CAPABILITY_SOURCE`, não como backlog documental.
3. Prioridade: **LATER**, não `NOW/NEXT`. Preservar o ativo e proibir expansão até haver caso bilateral real e revisão de privacidade.
4. Não iniciar sprint de features. Uma futura sprint de recuperação deve limitar-se a segurança, instalação reproduzível e um ensaio assistido pequeno.
5. Manter `FROZEN` operacionalmente até existir fonte legítima de ao menos uma vaga e um grupo consentido de trabalhadores; depois reavaliar, sem construir rede artificial.
6. Catalogar temporariamente as nove capabilities, mas só promover as que passarem teste desacoplado.

## Evidence

Evidências principais: Git linear desde `551ad2f`; commits de MVP, contratação, matching, empreitas, reputação, preço, geografia e matching reverso; `src/App.tsx`; páginas de jornada; tipos Supabase; migrations de outubro/2025 a maio/2026; teste de jornada; manifesto PWA; validações técnicas desta missão.

Context Gate e testes canônicos permanecem separados do produto. Nenhum arquivo do Ecosystem Map V1 foi modificado.

## Unknowns

Usuários, vagas, contratações e pagamentos reais; estado do banco/deployment; ownership operacional; suporte; métricas de aquisição/retenção; conformidade LGPD; eficácia/justiça do ranking; receita, mercado e disposição a pagar; eventual predecessor externo ou sucessor não versionado.

## Privacy and review

A identidade privada fornecida pelo owner não foi usada, reproduzida ou versionada. Não foram encontrados `.env` ou credenciais rastreados. Placeholders públicos de desenvolvimento foram descritos por categoria, sem copiá-los para este relatório. A review não cria IDs canônicos, não promove capabilities e é falseável por evidência operacional futura.
