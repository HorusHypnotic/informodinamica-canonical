# INVESTIGAÇÃO — Google Business Profile sem intermediário pago
Data: 2026-09-25
Status: CANDIDATE / pesquisa para remanufatura
Caso-zero: Canteiro de Obras Digital

## Objetivo
Investigar uma capacidade própria, auditável e de baixo custo para conectar a Torre ao Google Business Profile, evitando dependência obrigatória de SaaS pago e preservando o ciclo: observar → decidir → executar com gate → medir → registrar → aprender.

## Evidência oficial Google
- Google Business Profile API é disponibilizada sem cobrança de uso para usuários registrados.
- A API exige projeto Google Cloud e aprovação de acesso. Projeto sem acesso aprovado pode ficar com quota 0.
- Quotas padrão documentadas incluem 300 QPM para Business Information, Account Management e Performance, com limites específicos para criação/pesquisa/edição.
- Escopo OAuth documentado: business.manage.
- Não existe sandbox geral para GBP; algumas chamadas suportam validateOnly.
- APIs permitem gerenciar dados do perfil e superfícies como posts, fotos/reviews conforme endpoint disponível.

## Lago aberto encontrado
### jie8357IOII/google-my-business-mcp
Projeto comunitário open source que expõe métodos REST do GBP como ferramentas MCP. Cobre contas/localizações, business information, posts, mídia, reviews/respostas, performance e outras superfícies. Declara não incluir orquestração/SEO/agentes, o que o torna interessante como camada fina para remanufatura.

### A1-x-Tech/mcp-google-business
MCP open source com 20 ferramentas: localização/conta, performance, reviews, posts, categorias e atributos. Tem separação explícita entre preparação e escrita pública. Requer aprovação Basic API Access.

### amirjahfar1/Google-Business-Profile-GBP-MCP
MCP open source com cerca de 40 ferramentas, incluindo performance diária, impressões, chamadas, cliques, direções e palavras-chave. Também depende do gate de acesso do Google.

## Arquitetura candidata
Google GBP APIs
  ↓ OAuth + projeto aprovado
GBP ADAPTER / MCP próprio
  ↓
CONTROL TOWER
  ├── READ: perfil, categorias, serviços, performance, reviews
  ├── PLAN: hipóteses/intervenções
  ├── HUMAN GATE: qualquer escrita pública sensível
  ├── WRITE: posts, respostas, alterações permitidas
  ├── MEASURE: T0/T1/T2
  └── CANONICAL: evidência + aprendizado versionado

## Remanufatura
Não copiar cegamente um servidor inteiro. Extrair padrões:
1. autenticação OAuth;
2. catálogo mínimo de endpoints;
3. schemas e máscaras;
4. tratamento de quota/erro;
5. separação READ/WRITE;
6. confirmação antes de mutação;
7. métricas normalizadas;
8. evidência antes/depois.

A camada cognitiva, política operacional, experimentos e retroalimentação permanecem nossas.

## MVP proposto
READ-FIRST:
- listar conta/localização;
- obter perfil;
- categorias/atributos;
- performance;
- keywords quando disponíveis;
- reviews.

Somente depois abrir WRITE:
- resposta a review;
- post;
- atualização de campos previamente permitidos.

## Gate crítico
O maior bloqueio não é preço. É aprovação do Google para GBP API no projeto Cloud. Portanto, antes de construir integração, solicitar/validar Basic API Access e confirmar quota > 0.

## Segurança
Client secret e refresh token são segredos. Nunca versionar no GitHub. PETECO/ambiente local deve recebê-los por variáveis de ambiente/secret store. Toda mutação deve deixar evidência e respeitar gate humano conforme criticidade.

## Classificação
- API oficial sem taxa de uso: PASS documental.
- MCPs open source existentes: PASS documental.
- Uso no Canteiro hoje: UNKNOWN até autorização Google + OAuth + prova real.
- Windsor/SaaS pago como requisito: REJEITADO como dependência obrigatória; pode continuar alternativa opcional.
- Remanufatura própria: CANDIDATE de alta aderência.

## Próximo experimento
E0: criar projeto Google Cloud dedicado, solicitar Basic API Access e provar chamada read-only de accounts/locations. Nenhuma alteração pública no perfil durante E0.


---

## Lote 02 — Arquitetura de referência e gate E0

### Correções após confronto com documentação oficial
1. O acesso GBP é concedido **no nível do projeto Google Cloud**.
2. Quota 0 significa **acesso ainda não concedido**; não pedir aumento de quota nesse estado.
3. A documentação oficial informa revisão do pedido de acesso em até cerca de **14 dias**.
4. Para o pedido, Google exige conta válida, razão comercial válida, projeto Cloud e website comercial válido.
5. O teste oficial mínimo sugerido usa OAuth Playground + escopo `business.manage` +:
   `GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts`
   Resultado esperado: `200 OK`.
6. Não há sandbox GBP. Mock e `validateOnly` quando suportado são as proteções antes de escrita real.
7. O Performance API atual expõe séries temporais e impressões mensais de palavras-chave; baixo volume pode retornar limiar em vez de contagem exata.
8. Posts continuam documentados oficialmente em v4, mas **Product Posts não podem ser criados pela API**.

### Remanufatura: padrões selecionados

#### Padrão A — release boundary
Do projeto A1-x-Tech:
- leitura separada de mutação;
- preparar/draftar antes de publicar;
- confirmação explícita na borda de escrita.

**ADOTAR.**

#### Padrão B — mutation allowlist + dry-run
Do projeto google-clarity-mcp-codex:
- mutações desligadas por padrão;
- allowlist explícita de alvo;
- `confirm=true`;
- `dry_run` para prévia.

**ADOTAR E ENDURECER** com locationId canônico e ledger before/after.

#### Padrão C — before/after record
Do mewcp-google-business:
- registrar estado antes/depois em atualização.

**ADOTAR.**

#### Padrão D — credenciais locais
Projetos abertos convergem em OAuth `business.manage`, refresh token e segredos fora do repositório.

**ADOTAR**, preferindo armazenamento local no PETECO e variáveis de ambiente; nunca Git.

### Padrões rejeitados
- SaaS hospedado como dependência obrigatória: rejeitado para núcleo.
- Telemetria de terceiros por padrão: rejeitada para núcleo.
- Escrita automática sem gate: rejeitada.
- Clonar servidor amplo com dezenas/centenas de ferramentas: rejeitado no MVP.
- scraping de Maps pago por crédito para dados que o GBP oficial fornece ao proprietário: rejeitado como caminho principal.

### MVP GBP-ADAPTER V0
Ferramentas mínimas:

**READ**
- `gbp_preflight`
- `gbp_list_accounts`
- `gbp_list_locations`
- `gbp_get_location`
- `gbp_get_categories_attributes`
- `gbp_get_daily_metrics`
- `gbp_get_search_keywords`
- `gbp_list_reviews`
- `gbp_list_posts`

**PREPARE**
- `gbp_prepare_location_patch`
- `gbp_prepare_review_reply`
- `gbp_prepare_post`

**WRITE — disabled by default**
- `gbp_apply_location_patch`
- `gbp_publish_review_reply`
- `gbp_publish_post`

### Guard rails V0
Toda escrita exige simultaneamente:
- `GBP_ENABLE_MUTATIONS=true`;
- account/location allowlist;
- expected current fingerprint;
- payload preparado;
- confirmação humana;
- registro before;
- execução;
- leitura after;
- ledger versionado.

Falha em qualquer item = STOP.

### Retroalimentação
O adaptador não decide estratégia. A Torre compara:
`T0 → intervenção → observação → delta → classificação → canônico`.

Classificações:
- `PASS`: mudança executada e evidência preservada;
- `FAIL`: execução/efeito esperado falhou;
- `UNKNOWN`: dados insuficientes;
- `CANDIDATE`: hipótese para próximo experimento.

### E0 — checklist de desbloqueio
**Automatizável agora:** arquitetura, schemas, testes mock, ledger, documentação.

**Exige ação humana Google:** criação/seleção do projeto Cloud, submissão do Application for Basic API Access, consentimento OAuth.

Gate E0:
1. projeto Cloud dedicado conhecido;
2. pedido Basic API Access submetido;
3. quota > 0 / aprovação;
4. APIs necessárias habilitadas;
5. OAuth client criado;
6. consentimento do proprietário;
7. `GET /v1/accounts` = 200;
8. location do Canteiro identificada;
9. primeira leitura preservada no ledger.

Nenhuma escrita pública antes de 1–9.

### Status
- Investigação oficial: PASS.
- Padrões open source comparados: PASS.
- Arquitetura V0: CANDIDATE pronta para implementação mock.
- Acesso Google real: BLOCKED por ação humana externa ainda não comprovada.
- Custo obrigatório de SaaS: R$ 0 identificado até este estágio.
