# Special Review — Direcione Operacional

**Data da revisão:** 2026-08-13

**Natureza:** investigação histórica, arquitetural e estratégica, sem alteração do ativo

**Repositório examinado:** `HorusHypnotic/direcione-operacional`

**Baseline examinado:** `main` em `382ed7740628de01d65b71720b34f43e492e61ce`

## Executive Verdict

O Direcione é uma combinação de **personal coordination engine**, **sistema de priorização**, **memória operacional**, **decision support system**, aplicação de produtividade verticalizada para obras e protótipo histórico recuperável. Não é apenas uma lista de tarefas: há modelo multi-tenant, missões, eventos informacionais, dependências, score, horizonte de atenção, Mesa de Operações, decisões, rotinas, histórico e memória seletiva. Tampouco é ainda um sistema operacional completo de coordenação: a auditoria interna v0.9 registra como ausentes ou parciais a captura bruta, o estado físico dos recursos, a detecção de conflitos, o retorno do executor, critérios condicionais e evidência de conclusão.

A descrição do owner como “controlador pessoal” é **SUPPORTED** no sentido de que o software controla a fila de atenção, prioridades, missões, decisões, execução declarada e memória operacional de um operador. A qualificação não é mais forte porque o domínio codificado é organizacional e multiobra, e não há evidência versionada de uso pessoal efetivo ou de cobertura universal da vida do owner.

O ativo está **PAUSED + INCOMPLETE + RECOVERABLE**. O último commit funcional identificado é `f5efcf9` (2026-07-16); o commit final `382ed77` (2026-08-13) adiciona somente README. Build e TypeScript passam após instalação diagnóstica; a instalação reproduzível por lockfile e o lint não passam. Não há suíte automatizada declarada.

## Evidence Boundary

- **FACT:** conclusão diretamente sustentada por Git, código, schema, documentação ou comando reproduzível.
- **EVIDENCE:** caminho, migration, commit ou resultado técnico que sustenta o fato.
- **INFERENCE:** interpretação limitada derivada de mais de uma evidência.
- **HYPOTHESIS:** possibilidade não demonstrada; não tratada como genealogia.
- **UNKNOWN:** não verificável no repositório.

A base canônica foi usada apenas para comparação. Não foram projetados conceitos posteriores sobre o ativo. Não houve acesso a produção, Supabase remoto, dados pessoais ou conteúdo de configuração. A pista histórica privada informada pelo owner não foi reproduzida nem versionada.

Context Gate inicial: **WARN**, sem erro canônico; `main` alinhada a `origin/main`, HEAD `8557829443edb3ef1139fe676921152629c1f2b3`, checkpoint canônico verde. O WARN decorreu exclusivamente de arquivos locais preexistentes e não relacionados. A busca canônica não encontrou referência nominal anterior ao Direcione.

## Identity

**IDENTITY:** controlador de atenção e coordenação operacional orientado a missões, originalmente verticalizado para múltiplas obras.

**CLASSIFICATION:** C — Personal Coordination Engine; D — Prioritization System; E — Operational Memory System; F — Decision Support System; G — Productivity Application; I — Historical Prototype; portanto J — Combination.

**CONFIDENCE:** HIGH para a combinação funcional; MEDIUM para o adjetivo “personal”.

O README conserva vestígios de “Construct Flow”, enquanto o histórico registra “Prumo” na fundação multi-tenant e a documentação v0.8 consolida “Direcione”. Essa sequência indica mudança de nome e aprofundamento do modelo, não três produtos comprovadamente independentes.

## Genealogy

| Marco | Data | Evidência | Leitura limitada |
|---|---:|---|---|
| T0 — origem | 2025-01-01 / 2026-05-15 | template `86becaa`; fundação “Prumo” `15c3f66` | template seguido de aplicação multi-tenant para construção |
| T1 — modelo operacional | 2026-05-15 a 2026-05-19 | obras, equipes, missões e CRUDs; `df84d86` | missão torna-se unidade executável dentro de obra/equipe |
| T2 — priorização | 2026-05-15 a 2026-05-20 | score V2 `b3ddcc3`; alertas/estado `97f882c`; saúde/rotinas `ef19638` | prioridade deixa de ser apenas campo e passa a cálculo/estado |
| T3 — memória e histórico | 2026-05-21 a 2026-07-01 | timeline `02afadf`; remoção motivada `78c9cd4`; reset `cb9d962`; checklist/histórico `de002cf` | trilha, soft-retire, snapshots e preservação de decisões |
| T4 — coordenação de atenção | 2026-06-08 a 2026-07-13 | horizonte `7755f8c`; documentação v0.8 `98629e3`; Mesa v0.9 `11ccd19`; auditoria `06655c7` | fila limitada, foco, decisões e memória seletiva |
| T5 — estado atual | 2026-07-16 a 2026-08-13 | correção funcional `f5efcf9`; README `382ed77` | desenvolvimento funcional cessou; ativo permanece recuperável |

Não há tag ou release. Existe apenas a branch `main` no remoto examinado. O histórico contém muitos commits genéricos “Changes”, o que limita a atribuição fina de intenção.

## Original Problem

O problema codificado é a escassez de atenção do gestor diante de múltiplas obras, missões, alertas, dependências e rotinas: decidir o que merece atenção agora, agir ou delegar, e não perder o motivo da decisão. A documentação explicita o afunilamento do horizonte e a preservação de decisões de agir, arquivar ou ignorar.

Não há evidência suficiente para psicologizar o owner ou afirmar que o problema original era pessoal. A arquitetura inicial e vigente é de organização/construtora multi-tenant; a utilidade pessoal é uma aplicação plausível da camada de controle.

## Fundamental Unit

Há duas unidades complementares:

- **EVENT** é a unidade informacional de entrada na camada mais recente: registra origem, conteúdo bruto estruturável, interpretação humana, confiança e desdobramentos.
- **MISSION** é a unidade fundamental de trabalho executável: recebe estado, responsável, prazo, risco, impacto, dependências, recursos, score e histórico.

Assim, a resposta operacional é **MISSION**, com **EVENT** como unidade upstream de proveniência informacional. Projeto/obra fornece contexto; decisão e ação operam sobre a missão ou sobre itens da fila.

## Operational Cycle

O menor ciclo suportado pelo modelo é:

`evento ou cadastro manual` → `interpretação/classificação humana` → `missão/alerta/direcionamento` → `score e gravidade` → `Hoje/Mesa` → `agir, delegar, adiar, ignorar ou arquivar` → `mudança de estado/status` → `conclusão/validação declarada` → `eventos, histórico e memória`.

Etapas incompletas: captura bruta externa, confirmação de retorno, evidência objetiva da conclusão e aprendizado causal-narrativo.

**Menor coisa útil hoje, sem nova feature:** cadastrar uma missão operacional, calcular seu score, colocá-la no horizonte/Mesa, registrar uma decisão e preservar a transição no histórico.

## Prioritization Engine

Existe motor real, determinístico e parcialmente distribuído entre banco e cliente.

| RULE_ID | Input | Lógica | Output | Status / evidência |
|---|---|---|---|---|
| DIR-R01 | urgência 1–10 | `urgência × 10` | componente 0–100 | IMPLEMENTED; funções SQL de score |
| DIR-R02 | impacto financeiro | normalização logarítmica, limitada a 100 | componente financeiro | IMPLEMENTED |
| DIR-R03 | dependências não resolvidas | `quantidade × 15`, limitada a 100 | componente de bloqueio | IMPLEMENTED |
| DIR-R04 | risco | baixo/moderado/alto/crítico → 10/40/70/100 | componente de risco | IMPLEMENTED |
| DIR-R05 | distância | proporcional até 50 km, limitada a 100 | componente de deslocamento | IMPLEMENTED |
| DIR-R06 | cinco componentes | `0,30U + 0,20F + 0,20D + 0,20R + 0,10L` | `score_operacional` | IMPLEMENTED; trigger recalcula e historiza |
| DIR-R07 | score | `<30`, `30–49`, `50–69`, `70–84`, `≥85` | estável/atenção/risco/crítico/colapso | IMPLEMENTED |
| DIR-R08 | score, prazo, janela, dependentes, estabilidade temporal | bônus +25 vencido, +10 janela vencida, +5 por dependente até +20, −10 se estável/atenção sem mudança há 7 dias; clamp 0–150 | `gravidade_efetiva` | IMPLEMENTED; `v_missoes_horizonte` |
| DIR-R09 | itens da Mesa | missões por gravidade; alertas 90/75/55; direcionamentos por relevância; corte mínimo 50/55 e ordenação descendente | fila de decisão | IMPLEMENTED; `src/lib/mesa-fila.ts` |
| DIR-R10 | itens antigos/rejeitados | arquiva alertas informativos/atenção após 14 dias, expira sugestões após 7 dias, atenua templates estáveis ociosos | redução de ruído | IMPLEMENTED; `aplicar_decaimento_relevancia()` |
| DIR-R11 | histórico de remoção | penalização/impedimento de sugestão recorrente | anti-sugestão | PARTIAL; schema/view e documentação, sem validação comportamental em dados reais |
| DIR-R12 | item priorizado | estimativa de impacto usa impacto declarado, custo parado ou valores fixos heurísticos | economia potencial da Mesa | IMPLEMENTED como heurística; não é prova econômica |

Há uma divergência documental relevante: a fórmula v0.8 descreve alguns bônus e decaimentos de modo diferente do SQL vigente. Para arqueologia técnica, o SQL no HEAD prevalece como comportamento implementado; o texto permanece evidência da intenção histórica.

## Operational Memory

**Classificação: PARTIAL, próxima de STRONG na camada de trilha operacional.**

O sistema preserva `missao_eventos`, histórico de score, diffs de entidades, decisões da Mesa, decisões de remoção, calibrações, timestamps, archive/ignore com motivo, memória compactada e snapshots de reset. Há proteção de imutabilidade para partes da trilha e distinção deliberada entre arquivar e ignorar.

Ele responde razoavelmente “por que isto apareceu e que decisões/estados ocorreram?”, mas não responde integralmente “qual causa produziu o resultado e o que aprendemos depois?”. A auditoria v0.9 caracteriza o aprendizado como estatístico, não causal-narrativo. A máxima documental de que nenhuma entidade é deletada não é universal no schema: há relações com `ON DELETE CASCADE` e operações destrutivas controladas. Portanto, preservação é uma política forte, não uma garantia total do banco.

## Causality

**Classificação: PARTIAL_CAUSAL.**

Há mais do que sequência temporal:

- dependências explícitas missão→missão, inclusive desbloqueio e recálculo após conclusão;
- evento informacional→desdobramento→artefato gerado;
- campos de origem para missões produzidas por alerta/rotina;
- rastros de direcionamento e decisões.

Faltam cadeias de consequência, atraso proporcional, resultado/causa/solução e narrativa causal reutilizável. Logo não é `EXPLICIT_CAUSAL` no sentido completo proposto pela missão.

## Closure Model

Há estados distintos para execução, conclusão, validação, retrabalho, cancelamento e preservação fora do horizonte (arquivado/ignorado). Timestamps como `concluida_em` e `validada_em`, eventos e histórico permitem o ciclo `OPEN → EXECUTION → CLOSURE → MEMORY` em nível de estado.

**Classificação: PARTIAL.** A conclusão é predominantemente declarativa: não exige resultado esperado, critério de sucesso, evidência, lição aprendida ou consequência. O ciclo existe, mas não constitui protocolo de fechamento probatório.

## Interface

| Superfície | Estado | Evidência funcional |
|---|---|---|
| login, onboarding, perfil | IMPLEMENTED | rotas e autenticação Supabase |
| dashboard / Hoje | IMPLEMENTED | visão cross-obra e horizonte priorizado |
| missões (lista, nova, detalhe, arquivadas) | IMPLEMENTED | CRUD, estados, checklist, histórico |
| eventos informacionais | IMPLEMENTED | lista, criação, detalhe, interpretação/desdobramento |
| alertas e direcionamentos | IMPLEMENTED | filas, conversão e decisão |
| obras, equipes, stakeholders | IMPLEMENTED | CRUD multi-tenant |
| rotinas e saúde operacional | IMPLEMENTED | regras, execução, estabilidade e visão de saúde |
| Mesa / foco / encerramento | IMPLEMENTED | sessão de decisão e fila heterogênea |
| memória | IMPLEMENTED | estados, compactação e recuperação |
| relatórios | PARTIAL | indicadores e relatório mensal; cobertura operacional incompleta |
| reset e snapshots | IMPLEMENTED | modos de reset com preservação |
| calendário/recursos/conflitos | NOT IMPLEMENTED | declarado como lacuna na auditoria v0.9 |
| retorno externo e evidência de conclusão | NOT IMPLEMENTED | loop de WhatsApp é de saída, sem confirmação completa |

## Data Model

Mapa sanitizado:

`construtora/usuários` → `obras` → `missões` ↔ `dependências/recursos/checklists/eventos/histórico`; `equipes` e `stakeholders` contextualizam responsabilidade e direcionamento; `rotinas` geram ou modulam missões; `alertas` e `eventos informacionais` podem originar artefatos; `Mesa` agrega itens e decisões; `memória/remoções/snapshots` preservam estado e rastros.

O banco usa PostgreSQL/Supabase com UUIDs, enums, constraints, índices, triggers, views, RPCs e RLS. Foram identificadas 16 migrations. O modelo é multi-tenant por `construtora_id`; políticas RLS restringem acesso autenticado conforme associação. Não foi feita auditoria formal de segurança das políticas nem execução remota.

## Software Reality

| Camada | Maturidade | Base da avaliação |
|---|---|---|
| UI | NEAR | grande conjunto de rotas e componentes, buildável |
| data model | NEAR | migrations extensas, relações, RLS, funções e triggers |
| business logic | NEAR | score, estados, rotinas, Mesa, memória e reset |
| auth | PARTIAL/NEAR | Supabase Auth e guardas presentes; não testado end-to-end |
| persistence | NEAR | Supabase/Postgres; ambiente remoto não acessado |
| automation | PARTIAL | triggers/RPCs/hooks; operação agendada não comprovada |
| prioritization | NEAR | lógica concreta e várias superfícies consumidoras |
| history | NEAR | múltiplas trilhas; memória causal completa ausente |
| reporting | PARTIAL | métricas existentes, indicadores de campo ausentes |
| tests | EARLY | nenhum script/suíte automatizada encontrado |
| deployability | PARTIAL | build passa; locks inconsistentes e configuração sensível rastreada |

Stack: React 19, TypeScript, TanStack Start/Router/Query, Vite/Nitro, Supabase/PostgreSQL/Auth, Tailwind/Radix, PWA, Cloudflare/Wrangler e artefatos Lovable.

## Reusable Capabilities

| TEMP_CAP_ID | Capability | Evidência / maturidade | Coupling | Custo de reconstrução | Consumidores possíveis (não promovidos) |
|---|---|---|---|---|---|
| CAP-DIR-01 | score operacional de missão | SQL, triggers, histórico; NEAR | médio | HIGH | controladores operacionais |
| CAP-DIR-02 | horizonte de atenção e Mesa | views, fila e sessões; NEAR | médio | HIGH | command center / decision support |
| CAP-DIR-03 | dependências e propagação de desbloqueio | relações e trigger; PARTIAL | médio | MEDIUM | planejamento e execução |
| CAP-DIR-04 | evento interpretado e desdobramento rastreável | schema/UI; PARTIAL/NEAR | médio | HIGH | inbox operacional |
| CAP-DIR-05 | memória seletiva e anti-sugestão | remoções, estados, compactação; PARTIAL/NEAR | alto | HIGH | memória operacional |
| CAP-DIR-06 | trilha de decisão e transição | eventos, diffs, Mesa; NEAR | médio | HIGH | auditoria e coordenação |
| CAP-DIR-07 | delegação humana rastreável | composição, hash, `wa.me`, rastros; PARTIAL | médio | MEDIUM | execução assistida |
| CAP-DIR-08 | rotinas com degradação/calibração | migrations e UI; PARTIAL/NEAR | alto | HIGH | saúde operacional |
| CAP-DIR-09 | reset seguro com snapshot | RPCs/UI; NEAR | alto | MEDIUM | ferramentas internas |

Os IDs são temporários desta revisão e não alteram o Capability Registry.

## Relationship to Later Systems

| Sistema posterior | Classificação | Evidência e limite |
|---|---|---|
| Context Gate | STRUCTURAL_SIMILARITY | ambos põem estado/contexto antes da ação; não há referência ou transferência histórica demonstrada |
| OPERA | POSSIBLE_ANTECEDENT | cronologia e vocabulário de coordenação/atenção sugerem antecedência possível; não há prova de linhagem direta |
| OPERA Vision | STRUCTURAL_SIMILARITY | painéis e roteamento de atenção; sem evidência de derivação |
| Copiloto | STRUCTURAL_SIMILARITY | domínio de obra, missões e assistência operacional; sem prova de linhagem |
| Atlas | STRUCTURAL_SIMILARITY | memória, snapshots e trilhas; implementações e autoridade distintas |
| Cofre | STRUCTURAL_SIMILARITY | preservação e recuperação; sem evidência histórica direta |
| Memória de Vendas | STRUCTURAL_SIMILARITY | contexto, decisão e memória; domínios e modelos distintos |
| TPC | STRUCTURAL_SIMILARITY | estados, transições, dependências, memória e coordenação aparecem tecnicamente; nenhum vínculo nominal ou documental encontrado |

`DIRECT_LINEAGE` não é atribuído a nenhum caso. A cronologia, isoladamente, não prova genealogia.

## Relationship to TPC

**Resultado: STRUCTURAL_RESEMBLANCE.**

O Direcione materializa representações de entidades operacionais, estados, transições, dependências, propagação limitada, incerteza/confiança e memória. Isso torna o ativo interessante como artefato comparativo. Não foram encontrados “TPC” ou “Informodinâmica” como fundamento do repositório examinado, nem documento que o declare precursor. A revisão não altera a genealogia, definições ou status epistemológico da TPC.

## Paused State

**PAUSED + INCOMPLETE + RECOVERABLE.**

- último commit funcional: `f5efcf9`, 2026-07-16;
- commit posterior: README apenas, `382ed77`, 2026-08-13;
- branch única e ausência de tags/releases;
- documentação conceitual v0.8 e auditoria v0.9 registram arquitetura e lacunas;
- código buildável, mas instalação congelada por lockfile falha e não há testes;
- backlog conceitual existe, porém esta revisão não o transforma em sprint.

Não há evidência para `ABANDONED` ou `SUPERSEDED`.

## Reconstruction Cost

| Dimensão | Custo | Motivo |
|---|---|---|
| CODE | HIGH | aplicação ampla, rotas, banco e integrações |
| DATA_MODEL | HIGH | migrations acumuladas, RLS, triggers, views e estados |
| PRIORITIZATION_LOGIC | HIGH | combinação de score, gravidade, horizonte, Mesa e história |
| OPERATIONAL_MODEL | VERY_HIGH | decisões de domínio e interações entre missões, obras, rotinas e memória |
| HISTORY | VERY_HIGH/UNKNOWN | Git é recuperável; dados operacionais reais não foram examinados |
| UX | MEDIUM | superfícies podem ser refeitas, mas o fluxo de foco encerra escolhas acumuladas |
| KNOWLEDGE | HIGH | intenção está espalhada em migrations, UI e documentação |
| CONCEPTUAL_MODEL | HIGH | camada de atenção/memória é mais cara que componentes isolados |

A parte mais cara de perder é o conjunto **modelo operacional + lógica de priorização + decisões de memória**, não um componente visual específico.

## Current Value

- **VALUE_AS_INTERNAL_TOOL: HIGH** — forte adequação para triagem e controle de atenção, condicionada à operação e segurança.
- **VALUE_AS_PRODUCT: MEDIUM** — produto substantivo, porém com lacunas críticas de campo, testes, configuração e comprovação comercial.
- **VALUE_AS_CAPABILITY_SOURCE: HIGH** — regras e modelos extraíveis conceitualmente, sem promoção automática.
- **VALUE_AS_RESEARCH_ARTIFACT: HIGH** — registro anterior de experimentação em coordenação assistida.
- **VALUE_AS_HISTORICAL_ARTIFACT: HIGH** — história rica e documentação de mudanças de paradigma.

## Distance to Use

- **DISTANCE_TO_OWNER_USE: MEDIUM** — build existe, mas seria necessário validar ambiente/dados, corrigir reprodutibilidade, revisar segurança e confirmar o fluxo pessoal sem criar features.
- **DISTANCE_TO_INTERNAL_VALUE: NEAR** — o código e o modelo já oferecem valor de estudo e recuperação.
- **DISTANCE_TO_PRODUCT: FAR** — faltam robustez, testes, ciclo externo fechado e validação operacional.
- **DISTANCE_TO_FIRST_REVENUE: FAR** — nenhuma evidência de oferta, cliente, distribuição ou operação comercial foi encontrada.

## Personal Controller Assessment

**SUPPORTED.** Controla diretamente:

- atenção, por horizonte limitado e Mesa de foco;
- prioridades, por score, gravidade, filtros e estados;
- contexto operacional, por obra, missão, evento, risco, prazo e relações;
- compromissos e execução declarada, por responsável, status, checklist e direcionamento;
- decisões, por agir/adiar/ignorar/arquivar e respectivos rastros;
- memória, por eventos, histórico, remoções, compactação e snapshots.

Não controla de forma comprovada calendário pessoal universal, recursos físicos em tempo real, conversas de retorno, autonomia condicional ou resultado probatório. O termo “pessoal” descreve melhor o papel do operador central do que o desenho de tenancy.

## Risks

**SENSITIVE MATERIAL DETECTED.** Existe arquivo de configuração potencialmente sensível rastreado no repositório. Seu conteúdo não foi lido nem reproduzido. Requer revisão de secrets e histórico antes de qualquer operacionalização.

Outros riscos:

- lockfile npm inconsistente com `package.json`; `npm ci` falha;
- requisito de engine observado em dependência excede o Node 22.12 usado na validação;
- lint falha amplamente, principalmente por formatação/line endings;
- ausência de testes automatizados declarados;
- cinco vulnerabilidades reportadas na instalação diagnóstica (quatro moderadas e uma alta), sem atualização nesta missão;
- RLS existe, mas não recebeu auditoria formal;
- automações e deploy remoto não foram comprovados;
- documentação conceitual e SQL vigente divergem em detalhes da gravidade;
- dados históricos reais e qualidade operacional permanecem UNKNOWN;
- integrações externas de WhatsApp são manuais; retorno não fecha o loop.

## Unknowns

- uso real pelo owner, volume e qualidade de dados;
- estado do projeto Supabase e do deploy histórico;
- validade atual das credenciais/configurações;
- desempenho e segurança sob carga;
- eficácia do score em operação real;
- intenção exata nos commits genéricos;
- existência de lineage direta não documentada com sistemas posteriores;
- demanda comercial e disposição de pagamento.

## Ecosystem Map V2 Recommendation

Posição futura recomendada, sem alterar o mapa atual:

**PERSONAL_INFRASTRUCTURE + COORDINATION_ENGINE + OPERATIONAL_MEMORY + CAPABILITY_SOURCE + RESEARCH_ARTIFACT + RECOVERABLE_PRODUCT.**

Estado recomendado: **FROZEN**, preservado como ativo recuperável e fonte de capacidades. “FROZEN” não significa descartado: evita reativação implícita enquanto mantém o patrimônio técnico e conceitual disponível para decisão explícita posterior.

## Evidence

### Repositório e histórico

- HEAD auditado: `382ed7740628de01d65b71720b34f43e492e61ce`, `main`, alinhado a `origin/main` no início e no fim.
- primeiros marcos: `15c3f66`, `b3ddcc3`, `97f882c`, `e0eca4a`, `df84d86`.
- memória/coordenação: `02afadf`, `78c9cd4`, `7755f8c`, `cb9d962`, `de002cf`, `11ccd19`.
- documentação/auditoria: `98629e3`, `06655c7`.
- último funcional/final: `f5efcf9`, `382ed77`.

### Código e documentos do ativo

- `README.md`, `package.json`, `src/routes`, `src/lib/mesa-fila.ts`.
- `docs/direcione-v0.8-conceitual.md` e `docs/direcione-v0.9-auditoria.md`.
- `supabase/migrations/`, especialmente migrations de score/estado, horizonte/memória, Mesa, reset/snapshots, auditoria e eventos informacionais.
- `src/integrations/supabase/types.ts` como inventário gerado do contrato de dados.

### Base comparativa canônica

- `AGENTS.md`, `CONSTITUICAO.md`, `DOCUMENTO_CANONICO.md`, `GLOSSARIO_CANONICO.md`.
- `docs/ecosystem/ECOSYSTEM-MAP-V1.md`, `CAPABILITY-REGISTRY-V1.md`, `SYSTEMS-ROADMAP-V1.md`.
- documentação vigente de Context Gate, TPC, checkpoints e Special Reviews existentes.

### Validação técnica read-only

- `npm ci`: **FAIL**, lockfile incompatível com o manifesto.
- instalação diagnóstica sem atualizar lockfile e sem scripts: **PASS**, com aviso de engine e 5 vulnerabilidades reportadas.
- `npm run build`: **PASS**.
- `npx tsc --noEmit`: **PASS**.
- lint: **FAIL**, predominantemente Prettier/CRLF; não corrigido.
- testes: **NONE FOUND** — não há script de teste no manifesto.
- o arquivo gerado pelo build foi restaurado; `direcione-operacional` terminou limpo e sem commits.

Esta revisão não implementa, corrige, reativa, integra ou promove qualquer parte do Direcione.
