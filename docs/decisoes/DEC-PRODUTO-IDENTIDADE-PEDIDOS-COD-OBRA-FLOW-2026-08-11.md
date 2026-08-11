# Decisão de produto — Pedidos COD e Obra Flow

**Estado documental:** `ACTIVE` — decisão operacional de produto; não altera TPC, TDO, glossário ou protocolos

**Data:** 11 de agosto de 2026

**Escopo:** identidade institucional dos produtos Pedidos COD e Obra Flow e seleção do produto responsável pelo ciclo pedido → acompanhamento → recebimento → nota → estoque → pendências

## Problema

O repositório hoje denominado `HorusHypnotic/obra-flow` contém uma aplicação local-first cujo bundle ainda usa o nome “Pedidos COD”. Em 3 de agosto de 2026, o repositório foi consolidado institucionalmente como Obra Flow e sua revisão declarou que Obra Flow não substitui Pedidos COD. O catálogo ativo, por sua vez, registra Obra Flow como produto operacional para notas fiscais, pedidos e recebimento, enquanto Pedidos COD permanece identificado sem repositório confirmado.

A coincidência entre nome antigo no bundle e domínio funcional não é suficiente para declarar equivalência entre produtos.

## Genealogia comprovada

1. Em março de 2026, o repositório implementou o Canteiro Digital/Controle de Materiais de Obra com IndexedDB, PWA e operação offline.
2. Em 12 de abril de 2026, o commit `280e3fb` registrou o rename da aplicação para “Pedidos COD”, preservando Dexie, CRUD, relatórios e backup.
3. O desenvolvimento posterior ampliou WhatsApp, edição de pedidos, estoque, autenticação e ownership local no mesmo histórico Git.
4. Em 3 de agosto de 2026, o commit `743599f` consolidou o repositório como `obra-flow`, registrou Obra Flow como nome oficial e declarou explicitamente sua independência em relação a Pedidos COD.
5. Os inventários ativos do ecossistema passaram a ligar Obra Flow ao repositório `HorusHypnotic/obra-flow` e mantiveram Pedidos COD sem fonte operacional confirmada.
6. O bundle não acompanhou integralmente a consolidação: título, manifesto, cabeçalho, login e cache ainda preservam “Pedidos COD”; relatórios ainda preservam “Canteiro Digital”.

## Matriz de identidade

| Dimensão | Pedidos COD | Obra Flow |
|---|---|---|
| Problema resolvido | Identificado como produto de pedidos; escopo institucional detalhado ainda não confirmado | Controle local de obras, pedidos, recebimentos, notas, vencimentos e estoque derivado |
| Usuário | Não confirmado documentalmente | Operador de obra em um dispositivo, com autenticação usada para vincular o banco local |
| Domínio | Pedidos, por nome; demais fronteiras indeterminadas | Pedido → recebimento → nota → estoque → pendências |
| Fluxo | Não há fonte executável confirmada fora do rótulo histórico | Fluxo executável presente no repositório `obra-flow` |
| Dados | Schema próprio não identificado | Dexie `canteiro-digital`, versões 1–3, sete tabelas incluindo `meta` |
| Interface | Nome histórico ainda exibido no bundle do Obra Flow | Interface executável do repositório, com branding incompleto |
| Histórico Git | Rename aplicado ao antecessor do código em abril | Consolidação institucional do mesmo repositório em agosto |
| Documentação | Backlog; ID e repositório pendentes | Produto independente e fonte operacional confirmada |
| Branding | Resíduo visual ainda ativo; marca institucional sem fonte confirmada | Nome oficial do produto e repositório; aplicação ainda não alinhada |
| Arquitetura | Indeterminada fora do resíduo histórico | React/Vite, Dexie/IndexedDB, PWA e autenticação Lovable/Supabase |
| Futuro previsto | Pode integrar-se ao Obra Flow; fronteira futura pendente | Pode integrar-se futuramente a Pedidos COD e StockFlow, sem substituí-los |

## Classificação das relações

| Relação observada | Classificação |
|---|---|
| Código histórico rotulado “Pedidos COD” → atual repositório Obra Flow | **SUCESSOR de repositório/implementação**, não sucessão institucional comprovada de produto |
| Produto institucional Pedidos COD ↔ produto institucional Obra Flow | **PRODUTOS DISTINTOS** |
| Domínio funcional conhecido | **SOBREPOSIÇÃO** potencial em pedidos |
| Integração futura | **INDETERMINADO** |

## Decisão

Adota-se a opção **C: Obra Flow e Pedidos COD são produtos distintos**.

O produto canônico selecionado para o ciclo pedido → acompanhamento → recebimento → nota → estoque → pendências é **Obra Flow**, porque:

- possui repositório e histórico confirmados;
- é o produto atribuído a esse ciclo pelo catálogo operacional ativo;
- contém a implementação executável correspondente;
- foi explicitamente consolidado como produto independente;
- Pedidos COD continua sem repositório e escopo institucional suficientes para absorver essa fonte por inferência.

## Evidências contrárias e limite da decisão

A principal evidência contrária é que o bundle e um commit de abril nomeiam a própria aplicação como Pedidos COD. Isso comprova uma identidade histórica da implementação, mas não supera a decisão institucional posterior e os inventários ativos. A divergência deve ser corrigida como branding e documentação do Obra Flow, sem reescrever o histórico.

## Consequências

- `HorusHypnotic/obra-flow` permanece fonte operacional do Obra Flow.
- A interface, PWA, relatórios e metadados desse repositório devem convergir para Obra Flow.
- “Pedidos COD” permanece preservado no histórico Git e nesta genealogia.
- Pedidos COD continua no backlog até ter escopo, ID e fonte operacional próprios confirmados.
- Funcionalidades futuras não devem ser atribuídas automaticamente a Pedidos COD por semelhança nominal.
- O pre-flight local-first de uma obra e um dispositivo prossegue sob o nome Obra Flow.

## Compatibilidade futura

Uma integração futura pode relacionar os produtos por contratos explícitos, mas não deve pressupor banco compartilhado, identidade comum ou substituição. Obra Flow deve evitar decisões que impeçam mapeamento futuro de `source_system`, `external_obra_id` e `canonical_obra_id`; esta decisão não autoriza alterações de schema para esses campos.

## O que esta decisão não significa

- não declara que Pedidos COD foi descontinuado;
- não declara que todo conteúdo histórico “Pedidos COD” sempre foi Obra Flow;
- não cria módulo, integração ou sincronização;
- não promove Obra Flow ao núcleo teórico da Informodinâmica;
- não altera TPC, TDO, definições, métricas ou IDs;
- não apaga nem reescreve commits, inventários ou documentos históricos.
