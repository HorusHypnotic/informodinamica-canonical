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
