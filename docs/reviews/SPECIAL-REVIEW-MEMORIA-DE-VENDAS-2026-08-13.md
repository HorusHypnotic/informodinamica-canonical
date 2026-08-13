# Special Review — Memória de Vendas / Slektips

**Data:** 13 de agosto de 2026

**Repositório:** `HorusHypnotic/memoriadevendas`

**Commit investigado:** `7913fd627187080e6260d84f03751a2bf8e9bdb6` (`main`, alinhado a `origin/main`)

## Executive Verdict

**IDENTITY:** Memória de Venda, uma aplicação de inteligência comercial que captura conhecimento por produto, contexto, script, evidência, caso, aprendizado transversal e resultado de uso; posteriormente recebeu um módulo leve de leads.

**CLASSIFICATION:** **C — KNOWLEDGE SYSTEM + SOFTWARE** e **E — INTERNAL COMMERCIAL INFRASTRUCTURE**. Como patrimônio potencial, também é `KNOWLEDGE_INFRASTRUCTURE + CAPABILITY_SOURCE`. **CONFIDENCE: HIGH** quanto ao software e modelo; **LOW** quanto ao volume e qualidade do conteúdo real, pois o banco remoto não foi acessado.

O ativo não é apenas corpus nem apenas SaaS. O Git contém uma aplicação full-stack, schema e método explícito para transformar experiência comercial em registros pesquisáveis e reutilizáveis. O conteúdo operacional não está versionado no repositório; portanto não há evidência para afirmar quantidade de Slektips, scripts, casos, leads ou uso real.

**Slektips** são aprendizados transversais persistidos como `lessons`: título, categoria, princípio, corpo e escopos de aplicação. Diferem dos scripts, que são respostas situacionais vinculadas a um produto. A interface os descreve como padrões, princípios e descobertas que sobrevivem ao caso individual.

O principal valor comprovado hoje está na **estrutura e no método implementado**. Se existir corpus real no banco, o conteúdo e a história de aplicação podem superar o software em custo de reconstrução; isso permanece hipótese não verificada.

## Evidence Boundary

O Context Gate inicial retornou `WARN` somente pela working tree canônica preexistente `DIRTY`; branch, remote e checkpoint estavam válidos, sem erros. Foram confrontados Constituição, Documento Canônico, Glossário, Ecosystem Map V1, Capability Registry V1, Systems Roadmap V1 e as reviews de Obra Flow/Pedidos COD, StockFlow, Vaga Quente e Vitrine Digital.

Esta revisão usa Git e arquivos versionados. Não acessou a aplicação publicada, Lovable, Supabase remoto, banco, usuários, leads ou conteúdo privado. A pista histórica privada fornecida pelo owner não foi reproduzida nem versionada. Não houve leitura do conteúdo do `.env`.

Distinções:

- **FACT/EVIDENCE:** observável no código, schema ou histórico Git;
- **INFERENCE:** conclusão sustentada por evidências convergentes;
- **HYPOTHESIS:** possibilidade ainda não validada;
- **UNKNOWN:** ausência de fonte suficiente.

## Identity

O nome funcional atual é **Memória de Venda**; metadata anterior usa “Memória de Vendas”. O README tardio chama o conceito de “Commercio Inteligente Central” e “ScriptHub”, mas a aplicação desde seu primeiro commit funcional se identifica como Memória de Vendas. Esses nomes descrevem a mesma linha conceitual, sem evidência de produtos separados.

O Ecosystem Map V1 não lista Memória de Venda como sistema próprio. Ele registra `D:\slektips` como **Cofre de Memória Absoluta**, ferramenta local sem remote. O repositório investigado não referencia esse caminho, não exporta para ele e não prova ser o mesmo sistema. A coincidência do termo Slektips sustenta afinidade conceitual, não identidade ou genealogia.

Estado preservado: branch `main`, HEAD alinhado a `origin/main`, nenhuma tag e nenhuma branch adicional. Stack: React 19, TypeScript, TanStack Start/Router/Query, Tailwind/Radix, Supabase/Postgres/Auth, Lovable e Nitro/Vite. Existem `package-lock.json` e `bun.lock`.

## Genealogy

| Fase | Data / evidência | Resultado |
|---|---|---|
| T0 — template | `f319173`, 1/1/2025 | scaffold TanStack Start |
| T1 — primeira memória | `d158ebe`, 3/6/2026 | “Criou app Memory de Vendas”: produtos, scripts, busca e uso |
| T2 — estruturação | `65a66a1`, 4/6/2026 | contextos, relações N:N, evidências, casos e lessons |
| T3 — Slektips | 4–6/6/2026 | lessons passam a ser exibidas como aprendizados/Slektips |
| T4 — segurança e CRM leve | `a8e4939`, 6/6/2026 | auth, ownership/RLS, leads, outcomes e follow-up |
| T5 — refinamento | junho–julho/2026 | board, tags, triagem, ordenação e modo noturno |
| Estado atual | `7913fd6`, 13/8/2026 | README conceitual acrescentado; aplicação preservada |

Genealogia comprovada: `template → Memória de Vendas/ScriptHub → modelo contextual e Slektips → autenticação e leads → estado atual`. Não há predecessor externo, importação do Cofre ou sucessor comprovado.

## What Slektips Are

**FACT:** Slektips correspondem à entidade `lessons`, apresentada na UI como “Aprendizados”. Cada registro pode conter:

- título, inclusive com numeração opcional extraída pela interface;
- categoria;
- princípio curto;
- corpo explicativo;
- `applies_to`, uma lista de escopos/tags;
- timestamps e owner.

A listagem permite busca textual local em título, princípio e corpo; filtro por categoria e tags; ordenação por número ou data; detalhe, criação, edição e exclusão. A busca global também inclui lessons.

**INFERENCE:** são unidades de aprendizado generalizável, não simples notas nem respostas prontas. Podem registrar decisão, padrão ou princípio derivado de experiências, mas o schema não exige origem, caso gerador, evidência, autor explícito, revisão, confiança ou outcome. Portanto “evidence-backed” é uma capacidade parcial, não garantia.

**UNKNOWN:** quantidade, distribuição, autoria efetiva, duplicações, qualidade, sensibilidade, uso e proveniência do corpus real.

## Software vs Knowledge

**Dominância atual comprovada:** `STRUCTURE + SOFTWARE`. O método está codificado; o conhecimento real não está no Git.

- Se o software desaparecesse e o conteúdo real fosse exportado com relações: **VALUE REMAINING: HIGH**, porque scripts, casos, evidências, aprendizados e histórico de outcomes preservariam conhecimento comercial. Essa avaliação é condicional à existência e integridade do conteúdo.
- Se o conteúdo desaparecesse e apenas o software permanecesse: **VALUE REMAINING: MEDIUM**, pois o modelo e as jornadas são reutilizáveis, mas a memória estaria vazia e teria de ser reconstruída por uso humano.
- Se ambos existirem no banco atual, o ativo combinado é mais valioso que cada parte isolada porque liga conhecimento a aplicação e resultado.

## Knowledge Structure

O modelo real é:

`PRODUCT/ASSET → CONTEXT → SCRIPT → USAGE/OUTCOME`

com trilhas complementares:

`PRODUCT → EVIDENCE → CASE/OUTCOME`

e:

`LESSON/SLEKTIP → APPLIES_TO[]`

Um contexto registra situação, estágio comercial, próximo passo, detalhe e tags. Scripts podem ser ordenados dentro de contextos. O uso liga opcionalmente script, contexto e lead, mais outcome, observação, próxima data e timestamp. Casos referenciam evidências por array de UUIDs.

O modelo conceitual proposto pela missão `TIP → CONTEXT → PROBLEM → ACTION → OUTCOME → LESSON` existe apenas parcialmente: contexto/situação, resposta/ação, outcome e lesson existem, mas não há ligação obrigatória entre uma Slektip e o caso/uso que a originou.

## Intellectual Assets

| Classe | Evidência | Avaliação |
|---|---|---|
| RAW NOTES | campo livre em vários registros | estrutura suporta; conteúdo UNKNOWN |
| STRUCTURED KNOWLEDGE | produtos, contextos, scripts, evidências, casos e lessons | STRONG no modelo |
| REUSABLE METHOD | capturar → estruturar → usar → medir → aprender | STRONG conceitualmente; PARTIAL em fechamento |
| COMMERCIAL PLAYBOOK | estágios, scripts, próximos passos e Slektips | PARTIAL |
| COPY ASSET | `response_text` copiável | SUPPORTED; corpus UNKNOWN |
| DECISION RULE | próximo passo e princípio | PARTIAL; sem motor formal |
| EXPERIMENTAL LEARNING | outcomes de uso e casos | PARTIAL; lesson não exige derivação |
| HISTORICAL MEMORY | timestamps, uso, leads e casos | PARTIAL; sem versionamento de conteúdo |

## Commercial Knowledge Coverage

Avaliação baseada em estruturas e estágios, não na qualidade de textos ausentes:

| Domínio | Cobertura | Evidência |
|---|---|---|
| Prospecção | PARTIAL | leads novos, fila e contextos de descoberta |
| Abordagem | STRONG | scripts, contexto, copiar e registrar uso |
| Follow-up | STRONG | estágio, próxima data, fila e outcome |
| Objeções | STRONG | estágio explícito, categorias/tags e scripts |
| Proposta | PARTIAL | contexto/comparação/prova; sem gerador ou documento |
| Negociação | PARTIAL | scripts, casos e outcomes; sem negociação transacional |
| Fechamento | STRONG estruturalmente | estágio e outcomes `fechou/perdeu` |
| Conteúdo/posicionamento | WEAK/PARTIAL | conhecimento reutilizável, sem workflow editorial |
| Treinamento/onboarding | PARTIAL | biblioteca consultável; sem currículo ou avaliação |
| Geração de oferta | PARTIAL | produtos, benefícios e scripts; sem composer |

## Software Surfaces

| Superfície | Estado |
|---|---|
| Auth e segregação por usuário | IMPLEMENTED |
| Triagem/home contextual | IMPLEMENTED |
| Produtos/ativos CRUD | IMPLEMENTED |
| Contextos por estágio, tags e próximo passo | IMPLEMENTED |
| Scripts CRUD, tags, vínculo e copiar | IMPLEMENTED |
| Evidências por URL | IMPLEMENTED/PARTIAL |
| Casos e outcomes | IMPLEMENTED |
| Aprendizados/Slektips CRUD, busca e filtros | IMPLEMENTED |
| Busca global textual | IMPLEMENTED |
| Registro de uso/outcome | IMPLEMENTED |
| Leads, follow-up e board | IMPLEMENTED/PARTIAL |
| Importação/exportação | NONE |
| Versionamento/revisão/aprovação | NONE |
| Busca semântica/RAG | NONE; somente roadmap textual |
| Geração automática de conteúdo | NONE |
| API/integração externa de CRM | NONE |
| Administração organizacional/multiusuário | NONE/UNKNOWN |

## Data/Knowledge Model

Entidades: `products`, `scripts`, `usage_logs`, `contexts`, `context_scripts`, `evidences`, `cases`, `lessons` e `leads`. Todos os domínios foram posteriormente associados a `user_id` e protegidos por policies de owner. Estágios comerciais são uma enumeração validada na aplicação; lead e usage outcome são enums Postgres.

Pontos fortes: relações produto-contexto-script; tags; outcome e próxima ação; evidências e casos; Slektips transversais; timestamps; busca unificada; índices por categoria, produto, tags e follow-up.

Limites: sem organização/equipe; sem versionamento imutável; sem proveniência formal; evidência é URL/caption e caso usa array não normalizado; lessons não ligam à fonte; `usage_count` e logs coexistem; não há exclusão lógica, confiança, status editorial, validade ou histórico de mudanças.

**SENSITIVE MATERIAL DETECTED:** arquivo `.env` está rastreado no histórico e presente no clone. Categoria: configuração/credenciais potenciais. Nenhum valor foi lido ou reproduzido. Leads podem conter nome, contato e notas; nenhum dado remoto foi acessado.

## Reusable Capabilities

IDs temporários, sem promoção ao Capability Registry:

| TEMP_CAP_ID | Name | Evidence / maturity | Coupling | Possible consumers |
|---|---|---|---|---|
| `CAP-MV-01` | captura de memória comercial contextual | product/context/script; NEAR | médio | CRM, OPERA, agentes comerciais |
| `CAP-MV-02` | biblioteca de scripts acionáveis | tags, busca, copiar e uso; NEAR | baixo/médio | Vitrine, Smart Cotações, propostas |
| `CAP-MV-03` | Slektips/aprendizado transversal | lesson + applies_to; PARTIAL/NEAR | baixo | institucional, treinamento, conteúdo |
| `CAP-MV-04` | outcome de aplicação do conhecimento | usage log + lead + outcome; PARTIAL | médio | CRM, experimentação comercial |
| `CAP-MV-05` | contexto comercial e próximo passo | estágio, situação e ação; NEAR | baixo | copilotos e CRM |
| `CAP-MV-06` | caso ligado a evidência | case + evidence IDs; PARTIAL | médio | propostas, prova comercial, remanufatura |
| `CAP-MV-07` | busca federada estrutural | consulta em seis entidades; PARTIAL | médio | knowledge base interna |
| `CAP-MV-08` | fila de follow-up assistida | lead, data, status e board; PARTIAL | alto | operação comercial pequena |

Não há recomendação de RAG. Antes de qualquer consumo, seria necessário contrato de privacidade, provenance, exportação e avaliação do corpus.

## Relationship to CRM

**COMPLEMENT OF CRM + LIGHTWEIGHT CRM EXTENSION.** O conceito original declara não gerenciar clientes/oportunidades/funis. Depois, o código adicionou leads, status, board, próxima data e histórico de uso. Isso cobre um CRM individual mínimo, mas não pipeline comercial completo, contas, organizações, atividades multicanal, permissões de equipe, importação, deduplicação ou integrações.

O diferencial continua sendo conhecimento aplicado ao contexto; leads funcionam como superfície para registrar uso e outcome. Não há relação comprovada com outro CRM do ecossistema.

## Relationship to Document Remanufacturing

**PARTIALLY_COMPATIBLE.** A Memória de Venda pode ser destino de conhecimento já estruturado, especialmente produtos, scripts, evidências, casos e lessons. Porém não atende por si ao Provenance Contract V1, Safe Representation ou Evidence Producer: falta identidade da fonte, hash, transformação, validação, abstention, fidelity, loss declaration e ligação obrigatória entre claim e evidência.

Ela não é “memória já remanufaturada” comprovada, pois a origem dos registros é desconhecida. Pode ser um consumidor futuro de derivados seguros, mas nenhuma integração foi implementada ou autorizada.

## Internal Value

**SUPPORTED / VERY_NEAR.** O menor valor interno é recuperar uma resposta ou princípio já registrado para um contexto comercial e registrar seu uso. Isso requer conteúdo existente e acesso legítimo; ambos são desconhecidos operacionalmente.

Papéis:

- `INTERNAL_KNOWLEDGE_INFRASTRUCTURE`: SUPPORTED;
- `KNOWLEDGE_BASE`: SUPPORTED;
- `CAPABILITY_SOURCE`: SUPPORTED;
- `SALES_COPILOT`: PLAUSIBLE, sem recomendação automática;
- `CONTENT_ENGINE`: PLAUSIBLE;
- `CONSULTING_ASSET` / `TRAINING_ASSET`: PLAUSIBLE;
- `PLAYBOOK_PRODUCT`: PLAUSIBLE;
- `RAG_SOURCE`: tecnicamente PLAUSIBLE, mas proibido e sem contrato de privacidade/provenance;
- `STANDALONE_PRODUCT`: PLAUSIBLE, não comprovado comercialmente.

## Client Value

**PLAUSIBLE / MEDIUM distance.** Uma equipe pode reduzir perda de conhecimento, inconsistência de resposta e tempo de busca. Isso depende de captura disciplinada, curadoria, volume suficiente, conteúdo correto, governança e feedback confiável. Nenhum cliente ou resultado real foi observado.

## Revenue Potential

**DISTANCE_TO_INTERNAL_VALUE: VERY_NEAR.**

**DISTANCE_TO_CLIENT_VALUE: MEDIUM.**

**DISTANCE_TO_FIRST_REVENUE: MEDIUM.**

Ofertas plausíveis, ainda não validadas: implantação assistida de memória comercial; workshop de captura + biblioteca inicial; playbook estruturado; treinamento apoiado em casos; software como ferramenta de entrega. SaaS autônomo é mais distante por segurança, multiusuário, import/export, governança e aquisição.

## Smallest Real Use

**USER:** owner ou vendedor autorizado.

**QUESTION/NEED:** “Qual resposta ou próximo passo já funcionou para este tipo de objeção/contexto?”

**INPUT:** termo de busca, produto, estágio ou tag — sem colar conteúdo privado em serviço externo.

**KNOWLEDGE USED:** contexto, script, caso/evidência e Slektip existentes.

**OUTPUT:** resposta recuperada para revisão humana, mais registro de uso/outcome.

**MANUAL WORK:** selecionar, verificar atualidade e adequação, aplicar e registrar resultado.

**BLOCKERS:** existência/qualidade do corpus, acesso seguro, ambiente reproduzível e revisão de credenciais/privacidade.

## Reconstruction Cost

**RECONSTRUCTION_COST: HIGH condicionalmente; MEDIUM com a evidência atual.**

- `SOFTWARE`: MEDIUM — CRUD e UI são reconstruíveis, mas a integração completa demanda trabalho.
- `STRUCTURE/METHOD`: HIGH — modelo contextual, outcomes, casos, evidence e lessons codificam decisões acumuladas de design.
- `CONTENT/HISTORY/DATA/RELATIONSHIPS`: potencialmente VERY_HIGH se houver corpus e usos reais; UNKNOWN sem banco.
- `TAXONOMY`: MEDIUM — estágios existem; categorias/tags são abertas e o corpus é desconhecido.

A parte mais difícil de reconstruir seria a história validada de abordagens, resultados e aprendizados, não os componentes React. Sua existência ainda não foi comprovada.

## Maturity

| Eixo | Estado | Evidência |
|---|---|---|
| Conceito/método | NEAR | modelo explícito e jornadas coerentes |
| Código/UI | PARTIAL/NEAR | build e TypeScript passam; lint falha |
| Modelo de dados | NEAR | nove entidades, relações, RLS e índices |
| Auth/segurança | PARTIAL | owner policies; `.env` histórico exige resposta |
| Busca/retrieval | PARTIAL | busca textual; sem ranking semântico |
| Provenance/versionamento | EARLY/NONE | timestamps sem fonte ou revisões |
| Conteúdo | UNKNOWN | banco não acessado; nenhum corpus no Git |
| Testes | NONE | nenhum script/suíte |
| Deployability | PARTIAL | config/live URL declarada; `npm ci` falha |
| Operabilidade | EARLY/UNKNOWN | ambiente, backup, suporte e usuários desconhecidos |
| Prontidão comercial | EARLY | valor plausível; oferta e demanda não testadas |

## Risks

- `.env` rastreado no histórico, exigindo auditoria e possível rotação fora desta missão;
- leads, contatos, notas e conhecimento comercial podem ser sensíveis;
- corpus real, backups, retenção e ownership desconhecidos;
- conteúdo sem provenance, revisão, confiança, validade ou versionamento;
- outcome pode ser correlacionado a script sem provar causalidade;
- Slektips podem ser opiniões não verificadas, pois evidência não é obrigatória;
- ausência de exportação cria risco de lock-in/perda do patrimônio;
- lockfile quebrado, lint vermelho, bundle grande e ausência de testes;
- nomes ScriptHub, Commercio Inteligente, Memória de Venda e Slektips podem confundir identidade;
- extensão para leads aproxima CRM e pode diluir o foco de conhecimento.

## Unknowns

Quantidade e conteúdo de produtos, contextos, scripts, evidências, casos, Slektips, usos e leads; usuários; clientes; receita; qualidade e atualidade; autoria; consentimento; origem; backups; deployment; estado do banco; credenciais; relação real com `D:\slektips`; integrações externas; propriedade de conteúdo; disposição a pagar; eficácia comercial.

## Ecosystem Map V2 Recommendation

1. Registrar Memória de Venda como ativo distinto: `KNOWLEDGE_INFRASTRUCTURE + INTERNAL_COMMERCIAL_INFRASTRUCTURE + CAPABILITY_SOURCE`.
2. Não fundir com o Cofre de Memória Absoluta sem evidência de identidade ou fluxo de dados.
3. Prioridade **NEXT** somente para preservação/avaliação: segurança do `.env`, inventário agregado do banco, exportação sanitizada e prova de um uso interno. Não abrir sprint de features.
4. Reconhecer Slektips como unidade de aprendizado transversal do produto, sem torná-la conceito canônico.
5. Catalogar as oito capabilities apenas como candidatas.
6. Antes de RAG, IA ou consumo por outros sistemas, exigir provenance, privacidade, versionamento, validação e escopo de acesso.
7. Reavaliar produto/serviço somente após comprovar corpus útil e um ciclo `consulta → aplicação → outcome → aprendizado`.

## Evidence

Fontes: histórico Git completo; commits `d158ebe`, `65a66a1`, `a8e4939`, `a588464`, `efa479e` e `7913fd6`; `package.json`; manifesto; rotas; funções server-side; tipos Supabase; cinco migrations; README e validações locais.

Validação: `npm ci` **FAIL** por lockfile dessincronizado; instalação diagnóstica sem alterar lock **PASS**, com warning de engine; build **PASS**; TypeScript `--noEmit` **PASS**; lint **FAIL** em larga escala, predominantemente CRLF/Prettier; testes **NONE**. O build regenerou `routeTree.gen.ts`, restaurado ao HEAD. O repositório investigado terminou limpo e alinhado ao remote.

Esta review não altera Ecosystem Map V1, produto, banco ou corpus. Não promove capabilities e é falseável por evidência futura de conteúdo, uso, genealogia, segurança e outcomes.
