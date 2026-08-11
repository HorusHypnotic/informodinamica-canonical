# Inventário de links do ecossistema OPERA

**Última verificação:** 11 de agosto de 2026

**Estado documental:** `ACTIVE` — inventário operacional datado, não normativo

Este documento reúne links públicos e fontes locais comprovadas. `ATIVA` significa somente que a URL respondeu HTTP 200 sem autenticação durante esta verificação; não certifica funcionalidade, segurança ou conteúdo atualizado. URLs não foram inferidas pelo nome do repositório.

## Links rápidos

### Aplicações públicas

- [OPERA Vision](https://opera-vision-app.lovable.app) — ATIVA
- [Smart Cotações](https://lovable-obra-magica.lovable.app) — ATIVA; slug histórico
- [Obra Flow](https://build-sync-notes.lovable.app) — ATIVA; slug histórico
- [Copiloto de Obras](https://copilotodeobras.lovable.app) — ATIVA
- [OPERA Control](https://teoriadegradaooperacional.lovable.app) — ATIVA; slug histórico
- [OPERA Atlas](https://opera-atlas.lovable.app) — ATIVA
- [Radar Territorial](https://horushypnotic.github.io/radar-territorial/) — ATIVA
- [Radar Urbano Operador](https://radarurbanooperador.lovable.app) — ATIVA
- [OPERA Territorial](https://operaterritorial.lovable.app) — ATIVA
- [PDIC / Market Compass](https://cabobanho.lovable.app) — ATIVA; slug histórico
- [Gestão OS / Orderly Flow](https://informodinmica-os.lovable.app) — ATIVA

### Repositórios

- [Informodinâmica / TPC](https://github.com/HorusHypnotic/informodinamica-canonical)
- [OPERA Vision](https://github.com/HorusHypnotic/opera-vision)
- [Smart Cotações](https://github.com/HorusHypnotic/smart-cotacoes)
- [Obra Flow](https://github.com/HorusHypnotic/obra-flow)
- [Copiloto de Obras](https://github.com/HorusHypnotic/copilotodeobras)
- [OPERA Control](https://github.com/HorusHypnotic/opera-control)
- [OPERA Atlas](https://github.com/HorusHypnotic/opera-atlas)
- [Radar Territorial](https://github.com/HorusHypnotic/radar-territorial)
- [Radar Urbano Operador](https://github.com/HorusHypnotic/radarurbanooperador)
- [OPERA Territorial](https://github.com/HorusHypnotic/operaterritorial)
- [PDIC](https://github.com/HorusHypnotic/pdic)
- [REO](https://github.com/HorusHypnotic/reo)
- [Canteiro de Obras Digital](https://github.com/HorusHypnotic/canteiro-de-obras-digital)
- [Gestão OS / Orderly Flow](https://github.com/HorusHypnotic/informodinmica-os)
- [Portfólio](https://github.com/HorusHypnotic/portfolio)

### Pesquisa e documentação

- [Repositório canônico da Informodinâmica/TPC](https://github.com/HorusHypnotic/informodinamica-canonical)
- [Mapa do OPERA Core](arquitetura/OPERA-CORE-SYSTEMS-MAP-2026-08-11.md)
- [Fronteiras do OPERA Core](arquitetura/OPERA-CORE-BOUNDARIES-2026-08-11.md)
- [Contrato de interoperabilidade V0](arquitetura/OPERA-CORE-INTEROPERABILITY-CONTRACT-V0.md)
- [Catálogo de produtos](../produtos/opera-produtos.md)
- [OPERA Research](../02-aplicacoes/OPERA_RESEARCH.md)

### Legados e históricos

- `cabobanho` → slug/clone histórico do PDIC; não é nome de produto.
- `lovable-obra-magica` → slug/clone histórico do Smart Cotações.
- `build-sync-notes` → slug e clone local histórico do Obra Flow.
- `rain-check-builder` → resíduo local histórico do REO.
- `opera-control-canonical-extract` → extração documental/canônica; não substitui `opera-control` oficial.
- Runtime `opera/copiloto-obras/` → experimento Python separado do produto web Copiloto.

## Tabela principal

| Sistema | Tipo | GitHub | Aplicação | Deploy | Estado | Observação |
|---|---|---|---|---|---|---|
| OPERA Ecosystem Hub | INDETERMINADO | não encontrado como repositório autônomo | não encontrada | — | NÃO ENCONTRADA | O papel de apresentação aparece no Canteiro de Obras Digital e no catálogo canônico; o nome não possui fonte executável própria confirmada. |
| Informodinâmica / TPC | PESQUISA | [confirmado](https://github.com/HorusHypnotic/informodinamica-canonical) | não aplicável | GitHub | ATIVO | Fonte canônica documental; diretório `informodinamica-canonical`, branch principal `main`. |
| OPERA Vision | PRODUTO | [confirmado](https://github.com/HorusHypnotic/opera-vision) | [abrir](https://opera-vision-app.lovable.app) | Lovable | ATIVA | V0.2 validada com ressalva e V0.2.1 documentada; PWA não encontrada. |
| Smart Cotações | PRODUTO | [confirmado](https://github.com/HorusHypnotic/smart-cotacoes) | [abrir](https://lovable-obra-magica.lovable.app) | Lovable | ATIVA / GREEN | PWA com manifest; slug público preserva nome histórico. |
| Obra Flow | PRODUTO | [confirmado](https://github.com/HorusHypnotic/obra-flow) | [abrir](https://build-sync-notes.lovable.app) | Lovable | ATIVA / PASS COM RESSALVA | PWA/offline; local-first. Pedidos COD é produto distinto. |
| Pedidos COD | INDETERMINADO | não encontrado | não encontrada | — | NÃO ENCONTRADA | Produto institucional identificado, sem repositório ou deploy próprios confirmados. Não equivale a Obra Flow. |
| Copiloto de Obras | PRODUTO | [confirmado](https://github.com/HorusHypnotic/copilotodeobras) | [abrir](https://copilotodeobras.lovable.app) | Lovable | ATIVA / RED | Manifest presente, sem service worker encontrado; Quinzena Real #001 bloqueada. |
| OPERA Control | PRODUTO | [confirmado](https://github.com/HorusHypnotic/opera-control) | [abrir](https://teoriadegradaooperacional.lovable.app) | Lovable | ATIVA | Fonte oficial local `opera-control-official`; manifest presente. |
| OPERA Atlas | PRODUTO | [confirmado](https://github.com/HorusHypnotic/opera-atlas) | [abrir](https://opera-atlas.lovable.app) | Lovable | ATIVA | Produto operacional isolado; PWA não confirmada. |
| Cofre de Memória Absoluta | PROTÓTIPO | não possui remote | não encontrada | local/Git/Drive | SEM URL | Diretório `D:\slektips`, branch `master`; ferramenta local, não banco central nem pipeline obrigatório. |
| Radar Territorial | PRODUTO | [confirmado](https://github.com/HorusHypnotic/radar-territorial) | [abrir](https://horushypnotic.github.io/radar-territorial/) | GitHub Pages | ATIVA | Repositório oficial GIS, branch principal `master`; contém também snapshot/cópia da interface web. |
| Radar Urbano Operador | PROTÓTIPO | [confirmado](https://github.com/HorusHypnotic/radarurbanooperador) | [abrir](https://radarurbanooperador.lovable.app) | Lovable | ATIVA | Interface operacional separada; manifest presente. |
| OPERA Territorial | PROTÓTIPO | [confirmado](https://github.com/HorusHypnotic/operaterritorial) | [abrir](https://operaterritorial.lovable.app) | Lovable | ATIVA | Terceira implementação territorial; integração seletiva pendente. |
| PDIC / Market Compass | PROTÓTIPO | [confirmado](https://github.com/HorusHypnotic/pdic) | [abrir](https://cabobanho.lovable.app) | Lovable | ATIVA | Nome vigente: Painel Diário de Inteligência da Construção e Imobiliário; `cabobanho` é slug histórico. |
| REO | PRODUTO | [confirmado](https://github.com/HorusHypnotic/reo) | não encontrada | Lovable informado, URL ausente | NÃO VERIFICADA | Registro de Evidências Operacionais; evolução do antigo Checklist Chuva; manifest presente. |
| Canteiro de Obras Digital | PRODUTO | [confirmado](https://github.com/HorusHypnotic/canteiro-de-obras-digital) | não encontrada | publicação informada, URL ausente | NÃO VERIFICADA | Site institucional do ecossistema; não confundir com o conjunto inteiro de produtos. |
| Gestão OS / Orderly Flow | PRODUTO | [confirmado](https://github.com/HorusHypnotic/informodinmica-os) | [abrir](https://informodinmica-os.lovable.app) | Lovable | ATIVA | Nome histórico genérico “Gestão OS”; manifest presente. |
| StockFlow | INDETERMINADO | não encontrado | não encontrada | — | NÃO ENCONTRADA | Ideia/backlog; não há implementação confirmada. |
| Direcione | INDETERMINADO | não encontrado | não encontrada | — | NÃO ENCONTRADA | Especificação histórica no material Atlas; não há implementação confirmada. |
| Vaga Quente | INDETERMINADO | não encontrado | não encontrada | — | CONGELADO | Backlog sem software/repositório confirmado. |
| Build Fast Delivery | INDETERMINADO | não encontrado | não encontrada | — | CONGELADO | Proposta documental; sem aplicação ou repositório confirmado. |
| Vitrine Digital | INDETERMINADO | não encontrado | não encontrada | — | CONCEITUAL | Proposta documental; sem aplicação, backend ou repositório confirmado. |
| Inspection | INDETERMINADO | não encontrado | não encontrada | — | NÃO ENCONTRADA | Nenhuma evidência suficiente localizada no acervo ativo ou nos diretórios Git examinados. |
| QFD-OS | PROTÓTIPO | não encontrado | não encontrada | — | ESPECIFICAÇÃO | Descrito no documento consolidado do Atlas; explicitamente sem implementação em código na fonte consultada. |
| Compras Local | INDETERMINADO | não encontrado | não encontrada | — | NÃO ENCONTRADA | Nenhuma evidência suficiente localizada. Pode ser rótulo informal, não produto confirmado. |
| Portfólio | PRODUTO | [confirmado](https://github.com/HorusHypnotic/portfolio) | não encontrada como URL própria | GitHub Pages informado | NÃO VERIFICADA | Site/portfólio separado; a fonte local aponta para a demonstração pública do Radar, mas não registra seu próprio endereço. |
| OPERA Research | PESQUISA | [no canônico](https://github.com/HorusHypnotic/informodinamica-canonical) | não aplicável | documentação | ATIVO | Braço de pesquisa documentado em `02-aplicacoes/OPERA_RESEARCH.md`; não é app autônomo. |

## Diretórios e branches confirmados

Todos os remotes abaixo foram lidos diretamente dos clones locais em `D:\Projetos Github`.

| Diretório local | Remote origin | Branch principal remota |
|---|---|---|
| `informodinamica-canonical` | `HorusHypnotic/informodinamica-canonical` | `main` |
| `opera-vision` | `HorusHypnotic/opera-vision` | `main` |
| `smart-cotacoes` | `HorusHypnotic/smart-cotacoes` | `main` |
| `obra-flow` | `HorusHypnotic/obra-flow` | `main` |
| `copilotodeobras` | `HorusHypnotic/copilotodeobras` | `main` |
| `opera-control-official` | `HorusHypnotic/opera-control` | `main` |
| `opera-control` | `HorusHypnotic/opera-control-canonical-extract` | `main` |
| `opera-atlas` | `HorusHypnotic/opera-atlas` | `main` |
| `radar-territorial` | `HorusHypnotic/radar-territorial` | `master` |
| `radarurbanooperador` | `HorusHypnotic/radarurbanooperador` | `main` |
| `operaterritorial` | `HorusHypnotic/operaterritorial` | `main` |
| `pdic` | `HorusHypnotic/pdic` | `main` |
| `reo` | `HorusHypnotic/reo` | `main` |
| `canteiro-de-obras-digital` | `HorusHypnotic/canteiro-de-obras-digital` | `main` |
| `informodinmica-os` | `HorusHypnotic/informodinmica-os` | `main` |
| `portfolio` | `HorusHypnotic/portfolio` | `main` |

## Genealogias e duplicidades

### Nomes e sucessões

- Checklist Chuva → REO (evolução documentada).
- `rain-check-builder` → `reo` (resíduo/nome de repositório histórico).
- `cabobanho` → PDIC / Market Compass (slug histórico, não identidade atual).
- `lovable-obra-magica` → Smart Cotações (slug histórico).
- `build-sync-notes` → Obra Flow (slug e clone histórico).
- Pedidos COD **não** é Obra Flow; a implementação teve identidade histórica ambígua, mas a decisão institucional os mantém distintos.

### Fontes duplicadas ou sobrepostas

- OPERA Control: `opera-control-official` aponta para o produto; `opera-control` aponta para `opera-control-canonical-extract` e deve ser lido como extração.
- Radar: `radar-territorial/apps/web` e `radarurbanooperador` compartilham a interface, enquanto `operaterritorial` é uma terceira implementação com outro schema e governança.
- Obra Flow: `build-sync-notes` é clone local do mesmo remote `obra-flow`, não produto adicional.
- Os diretórios `cabobanho`, `lovable-obra-magica` e `rain-check-builder` são resíduos locais sem remote utilizável na verificação; não foram contados como repositórios confirmados.
- Copiloto: produto web oficial e runtime Python experimental canônico são artefatos diferentes.

## PWA

| Sistema | Evidência | Classificação |
|---|---|---|
| Obra Flow | manifest + service worker + teste offline | SIM |
| Smart Cotações | manifest e identidade PWA documentada | SIM, sem offline prometido |
| Copiloto | manifest sem service worker encontrado | PARCIAL |
| OPERA Control | manifest encontrado | INCERTO |
| Radar Urbano Operador | manifest encontrado | INCERTO |
| Gestão OS | manifest encontrado | INCERTO |
| REO | manifest encontrado | INCERTO |
| demais | ausência de evidência suficiente nesta auditoria | NÃO/INCERTO |

## Método e evidências

- Remotes e branches: `git remote get-url origin` e `git remote show origin` nos clones locais.
- URLs: apenas endereços explícitos em README, manuais, relatórios ou código versionado.
- Disponibilidade: requisição HTTP com redirecionamento, sem login e sem escrita, em 11/08/2026.
- Estado de produto: diário/checkpoint de 11/08, Product Scout, mapa do Core e relatórios dos produtos.
- Genealogia: `docs/ecossistema-projetos-2026-08-03.md` e decisões de 11/08.

Nenhuma chave, token, senha, connection string ou conteúdo de `.env` foi lido ou registrado.
