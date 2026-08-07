# Inventário operacional do ecossistema OPERA — 3 de agosto de 2026

**Estado documental:** `ACTIVE`
**Natureza:** inventário operacional datado, não normativo
**Escopo:** repositórios, integrações Lovable e decisões de organização
**Limite:** não altera a TPC, a TDO, o glossário canônico ou o estado epistemológico de qualquer conceito.

## Fronteira de autoridade

Os repositórios de produto são fontes operacionais de código, banco, integração e deploy. O `informodinamica-canonical` preserva a autoridade teórica e documental, além de contratos e snapshots submetidos a revisão explícita. Estados externos registrados abaixo são fatos operacionais datados; não representam certificação de produção, segurança ou validação empírica.

## Consolidados e sincronizados

| Projeto | GitHub | Lovable ou publicação | Estado em 3/8/2026 |
|---|---|---|---|
| PDIC | `HorusHypnotic/pdic` | Sincronização confirmada; ID não registrado | Consolidado |
| OPERA Control | `HorusHypnotic/opera-control` | `f07282fa-cd06-4234-a1b5-7d8965300c60`; `teoriadegradaooperacional.lovable.app` | Consolidado |
| OPERA Atlas | `HorusHypnotic/opera-atlas` | Lovable confirmado; `opera-atlas.lovable.app` | Consolidado |
| Obra Flow | `HorusHypnotic/obra-flow` | Lovable confirmado; ID não registrado | Consolidado |
| REO | `HorusHypnotic/reo` | Lovable confirmado; ID não registrado | Consolidado |
| Smart Cotações | `HorusHypnotic/smart-cotacoes` | `f0a550c0-42f4-46dc-9f99-2bcffc7b3228`; `lovable-obra-magica.lovable.app` | Consolidado e publicado |
| Canteiro de Obras Digital | `HorusHypnotic/canteiro-de-obras-digital` | Lovable confirmado; ID não registrado | Consolidado |
| Portfólio | `HorusHypnotic/portfolio` | GitHub Pages | Publicado; fora do Lovable |

## Em andamento

| Projeto | Fonte | Estado |
|---|---|---|
| Radar Territorial | `HorusHypnotic/radar-territorial` | Repositório oficial; fusão não promovida |
| Radar Urbano Operador | `HorusHypnotic/radarurbanooperador` | Fonte Lovable saneada |
| OPERA Territorial | `HorusHypnotic/operaterritorial`; Lovable `11df8185-36f2-4f46-a8c1-ff4fe3aebbe7` | Fonte auditada; integração seletiva pendente |
| Copiloto de Obras | `opera/copiloto-obras/` | Runtime Python experimental no canônico; sem repositório independente |

## Identificados e backlog

| Projeto | Estado |
|---|---|
| Gestão OS | Existe no Lovable; faltam ID e repositório confirmados |
| Pedidos COD | Identificado; faltam ID e repositório confirmados |
| StockFlow | Ideia; escopo a definir |
| Direcione | Ideia; escopo a definir |
| VagaQuente | Backlog |
| BuildFast Delivery | Backlog |

## Definição operacional ativa do PDIC

**PDIC = Plataforma Digital de Integração e Colaboração.**

O PDIC é a camada integradora do ecossistema OPERA. Seu escopo é estabelecer contratos de eventos, APIs, mensageria e sincronização entre módulos. Essa definição não declara que todas essas integrações já estejam implementadas.

### Separação de responsabilidades

| Componente | Responsabilidade |
|---|---|
| PDIC | Integração e colaboração entre módulos |
| Radar Territorial | Inteligência territorial, GIS, zoneamento e indicadores geográficos |
| OPERA Data Lake, quando formalizado | Persistência central ou analítica de dados; não é função do PDIC |

Formulações históricas que tratem PDIC como inteligência territorial, terminal macroeconômico ou BI estratégico permanecem preservadas como evidência de evolução nominal. Elas não substituem esta definição operacional ativa e também não alteram o glossário canônico sem o processo de governança aplicável.

## Arquitetura das três implementações territoriais

| Fonte | Capacidade a preservar | Limites atuais |
|---|---|---|
| `radar-territorial` | Python/GIS/QGIS, GeoJSON, dados, manifestos, API, integridade e testes | Interface integrada ainda em validação |
| `radarurbanooperador` | Interface TanStack/React, mapa, feed, eventos, indicadores, ingestão e Supabase | Não substitui o pipeline GIS ou os manifestos oficiais |
| `operaterritorial` | Allowlist, papéis, importações, versionamento otimista e auditoria SHA-256 encadeada | `.env` histórico, lockfile divergente, ausência de testes e dívidas de lint/dependências |

### Decisão de integração

A integração deve selecionar contratos e capacidades, não sobrepor integralmente um repositório ao outro. Os schemas `zonas`, `obras`, papéis e auditoria têm semânticas distintas e precisam de mapeamento explícito.

### Bloqueio formal de promoção

A branch `integration/lovable-fusion` do Radar Territorial não deve ser promovida para `master` enquanto qualquer gate abaixo permanecer aberto:

- [ ] contrato versionado entre o pipeline Python/GIS e a interface web;
- [ ] mapeamento dos três schemas Supabase e estratégia de migração;
- [ ] saneamento e avaliação de rotação das credenciais presentes em históricos;
- [ ] revisão de RLS, bootstrap administrativo e funções `SECURITY DEFINER`;
- [ ] testes web de autenticação, papéis, RLS, mapa, feed, importação e auditoria;
- [ ] ressalvas legais obrigatórias presentes e testadas na interface candidata;
- [ ] estratégia de deploy, rollback e observabilidade;
- [ ] revisão humana final e autorização explícita de promoção.

## Repositórios renomeados

| Nome anterior | Nome atual | Regra de leitura |
|---|---|---|
| `cabobanho` | `pdic` | Nome anterior é histórico |
| `build-sync-notes` | `obra-flow` | Nome anterior é histórico |
| `rain-check-builder` | `reo` | Nome anterior é histórico |
| `lovable-obra-magica` | `smart-cotacoes` | Nome anterior é histórico |

Redirecionamentos ou resíduos locais não devem ser tratados como produtos adicionais.

## Documentos históricos com terminologia superada

Os seguintes conjuntos podem conter nomes, escopos ou estados anteriores e devem ser lidos como evidência datada:

- `archive/`;
- relatórios de extração do acervo;
- `extracted_md_remaining/`;
- PDFs e documentos consolidados anteriores à decisão de 3 de agosto de 2026;
- a seção original do inventário executável de 2 de agosto de 2026.

Eles não serão reescritos silenciosamente. Quando houver conflito operacional, prevalecem este inventário datado e o catálogo ativo de produtos, sempre subordinados à Constituição, ao Documento Canônico e ao Glossário Canônico.
