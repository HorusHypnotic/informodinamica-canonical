# Special Review — QFD-OS

**Data:** 13 de agosto de 2026

**Natureza:** arqueologia forense sanitizada, read-only; não altera produto, teoria, Capability Registry ou Ecosystem Map V1

**Repositório investigado:** `HorusHypnotic/qfd-os`

**Commit investigado:** `3795f54c8e0b291ad746b299fc61dedfd46c9ff0` (`main`, alinhado a `origin/main`)

## Executive Verdict

O QFD-OS não é um sistema de Ordem de Serviço. É um **sistema operacional de produto orientado por QFD**, implementado como pipeline contínuo entre sinais do campo, tradução WHAT→HOW, priorização econômica, backlog executável, telemetria, outcomes e recalibração. Em uma segunda fase, recebeu um domínio de obra que compara a sequência observada das etapas com regras esperadas, gera ocorrências e mantém timeline.

Sua identidade mais sustentada é a combinação de **DECISION_SUPPORT**, **PROCESS_CONTROL**, **FIELD_OPERATIONS_SYSTEM**, **OPERATIONAL_MEMORY**, **INTERNAL_TOOL**, **PROTOTYPE** e **RECOVERABLE_PRODUCT**. Há elementos de quality management, mas não um sistema completo de inspeção, aceite ou conformidade. Há registros e trilhas, mas não captura de evidência verificável nem prova.

O maior patrimônio está no encadeamento conceitual e técnico:

`evento real → sinal normalizado → requisito WHAT/HOW → score versionado → backlog → outcome → padrão preditivo → risco → repriorização`

e, no domínio de obra:

`estado observado da etapa → reconciliação com precedências → incoerência → evento de campo → timeline`.

O ativo é mais complexo que um CRUD e contém mecanismos raros nos demais protótipos examinados: versão do motor decisório, backtest antes de ativação, outcomes real×esperado, mineração de padrões e reconciliação de sequência física. Entretanto, o fluxo completo descrito no README não é automático de ponta a ponta: várias ligações dependem de inserção humana, algumas tabelas não têm UI e o fechamento é declarativo.

## Evidence Boundary

Esta revisão distingue:

- **FACT:** observação direta de Git, código, schema ou execução local;
- **EVIDENCE:** caminho, commit, migration ou resultado que sustenta o fato;
- **INFERENCE:** interpretação limitada de evidências combinadas;
- **HYPOTHESIS:** possibilidade não comprovada;
- **UNKNOWN:** não demonstrável pelo repositório.

O Context Gate inicial retornou **WARN**, sem erro canônico: checkpoint `CANONICAL GREEN`, branch `main`, HEAD canônico `7bf1adf6972c1c75295b5af1eac606fa0853da7b`; o aviso decorreu apenas de arquivos locais preexistentes e não relacionados.

A base canônica foi usada somente para comparação. Não foi encontrada ocorrência nominal de “Fábrica de Provas”, “Factory of Proof” ou “Proof Factory” nas fontes versionadas pesquisadas. Existem conceitos posteriores de pacote evidenciário, hash, proveniência e reconstrução no OPERA/Atlas/Cofre, mas eles não foram projetados retroativamente sobre o QFD-OS.

A pista histórica privada do owner não foi reproduzida, consultada como dado de aplicação ou versionada. Não houve acesso a Supabase remoto, deploy, dados reais ou conteúdo do arquivo de configuração.

## Identity

**IDENTITY:** motor contínuo de decisão e evolução de produto, com extensão para reconciliação operacional de obra.

**CLASSIFICATION:** DECISION_SUPPORT + PROCESS_CONTROL + FIELD_OPERATIONS_SYSTEM + OPERATIONAL_MEMORY + INTERNAL_TOOL + PROTOTYPE + RECOVERABLE_PRODUCT; QUALITY_MANAGEMENT_SYSTEM apenas de forma PARTIAL; não é WORK_ORDER_SYSTEM comprovado.

**CONFIDENCE:** HIGH.

O README, adicionado ao fim da história mas coerente com o schema fundacional, chama o QFD-OS de “sistema operacional de produto” e descreve QFD como tradução de valor/demanda em requisito técnico. A landing posterior o reposiciona como reconciliação operacional para obras reais. São duas camadas na mesma linhagem, não dois repositórios ou produtos comprovadamente separados.

### Significado das siglas

- **QFD:** a expansão literal da sigla não aparece no material versionado examinado. Portanto, **UNKNOWN** como expansão formal. O significado operacional é explícito: tradução WHAT→HOW, valor/demanda do campo→técnica, inspirada no QFD clássico e em uma Casa da Qualidade reduzida.
- **OS:** **Sistema Operacional de Produto**, explicitamente documentado. Não significa Ordem de Serviço neste repositório.

## Genealogy

| Fase | Data / commit | Evidência | Evolução comprovada |
|---|---:|---|---|
| T0 — template | 2025-01-01, `c50d4b1` | template Vite/React/shadcn | nenhuma identidade de domínio ainda |
| T1 — primeira implementação | 2026-04-27, culminando em `4de308c` | “Criou QFD-OS com DB e cockpit” | evento, semântica, requisitos, matriz, score, backlog, telemetria, feedback e regras |
| T2 — decisão versionada | 2026-04-27, `2e8999f` | “Added versioned backtest system” | versões, outcomes, backtest, recomputação e sugestão de pesos |
| T3 — padrões e risco | 2026-05-05/06, `d26430b`, `2501b3c` | padrões preditivos e integração do motor | mineração por evento/domínio e risk forecast |
| T4 — campo e reconciliação | 2026-05-10, `1b9f8a8` | “Criou EAP, tabelas e engine” | obra, etapas, estados, confiança e regras de precedência |
| T5 — memória operacional | 2026-05-10, `d8094e6` | “Adicionou timeline e logs” | log de alterações e reconciliações por obra |
| T6 — superfície e handoff | maio–junho | PWA `379769a`, landing `2be8dd1`, mobile `b145415`, plano PDF `b12fb83` | produto demonstrável e documentação de transferência |
| Estado atual | 2026-08-13, `3795f54` | README conceitual | documentação adicionada; nenhuma evolução funcional depois de junho |

O repositório possui apenas `main`, sem tags. O histórico contém muitos commits genéricos “Changes”, o que impede atribuir intenção fina a cada alteração. Não foi encontrado nome anterior explícito além do título atual do README, “Field Focus”, e descrições de “runtime operacional adaptativo”; estes termos foram tratados como posicionamentos, não como produtos independentes.

## Original Problem

O problema fundacional codificado é a fratura entre demanda real e decisão de engenharia: sinais de obra, software, finanças ou suporte entram dispersos, não são traduzidos de modo consistente em requisitos técnicos e competem por prioridade sem conexão com resultado observado.

A extensão de obra adiciona um problema mais específico: divergência entre o plano/sequência esperada e a realidade do canteiro, capaz de produzir retrabalho silencioso. O reconciliador detecta, por exemplo, uma etapa avançada sem predecessora necessária e transforma a incoerência em evento operacional.

Não há evidência de que o problema original fosse gestão de OS, fiscalização formal, aceite contratual ou produção de prova.

## Fundamental Unit

**Unidade fundamental: FIELD_EVENT.**

O evento é a observação inicial que alimenta o pipeline. Ele pode ser ligado a um mapa semântico, convertido manualmente em requisito e, depois, em score e backlog. No módulo de obra, `WORK_STAGE` representa o estado observado da execução física; uma incompatibilidade entre etapas gera novo `FIELD_EVENT`.

As demais unidades cumprem papéis derivados:

- `qfd_requirement`: tradução WHAT→HOW;
- `priority_score`: hipótese quantitativa de prioridade;
- `execution_backlog`: unidade executável;
- `execution_outcome`: resultado observado da entrega;
- `predictive_pattern`: padrão agregado;
- `work_stage`: representação do estado de uma etapa física.

Não há entidade `service_order` ou equivalente.

## Operational Workflow

### Pipeline de produto

| Etapa | Ator | Entrada → ação | Estado/saída | Evidência implementada |
|---|---|---|---|---|
| ORIGIN | usuário autenticado | observa sinal real | evento potencial | nenhuma captura externa automática |
| CREATION | usuário | registra origem, tipo, domínio, descrição, impacto e frequência | `field_event` | registro com autor lógico e timestamp |
| NORMALIZATION | usuário/sistema de dados | associa categoria, severidade, sinal e tags | `semantic_map` | tabela existe; UI não encontrada |
| TRANSLATION | usuário | formula WHAT, HOW, métrica e alvo | `qfd_requirement` | requisito persistido |
| PRIORITIZATION | trigger SQL + usuário | informa impacto, frequência, financeiro e complexidade | score P0–P3 versionado | fórmula e versão persistidas |
| ASSIGNMENT | usuário | cria item, tipo, owner e SLA opcional | `execution_backlog` | owner é texto, não identidade autorizativa |
| EXECUTION | usuário | move livremente todo/doing/done/blocked | status do backlog | sem guard ou prova de execução |
| REVIEW | usuário | registra esperado, real, atraso, custo e notas | `execution_outcome` | resultado declarativo |
| LEARNING | RPC | agrega outcomes/eventos, sugere pesos e calcula risco | versão candidata/padrão/forecast | backtest e histórico de versão |
| CLOSURE | usuário | marca `done` e/ou registra outcome | item encerrado de fato | não há aprovação ou verificação obrigatória |

### Reconciliação de obra

`obra → etapas esperadas → observação manual de status/confiança → regra de precedência → incoerência → field_event automático → log/timeline`.

O pipeline é implementado em peças, mas não existe orquestração obrigatória que garanta que todo evento vire requisito, todo requisito vire backlog, todo `done` tenha outcome ou todo outcome recalibre o motor.

## State Machine

**STATE_MACHINE: PARTIAL.**

Há enums explícitos, porém poucas transições são protegidas:

- backlog: `todo`, `doing`, `done`, `blocked`; a UI permite mover diretamente entre colunas, sem guards;
- etapa de obra: `nao_iniciada`, `em_andamento`, `parcial`, `improvisada`, `incompativel`, `concluida_validada`; a UI permite seleção direta;
- confiança da etapa: `alta`, `parcial`, `visual`, `nao_validada`;
- prioridade: P0, P1, P2, P3, calculada automaticamente;
- versões de score/risco: ativa ou inativa, com índice que limita uma ativa por usuário.

Não foram encontrados fluxo de aprovação, bloqueio transacional de transições inválidas, cancelamento/reabertura formal, segregação de ator ou transição obrigatória de retrabalho.

## Quality Model

**QUALITY_MODEL: PARTIAL.**

Há componentes reais de qualidade:

- requisito WHAT/HOW, métrica técnica, alvo e unidade;
- matriz QFD com força de relação e dependência;
- `acceptance_criteria` no backlog;
- comparação esperado×real em outcomes;
- estado `concluida_validada` e nível de confiança nas etapas;
- regras de precedência física que detectam incoerências.

Limites materiais:

- critérios de aceite não são preenchidos pela UI examinada nem avaliados por função;
- não existe entidade de inspeção, não conformidade, tolerância ou plano de inspeção;
- `concluida_validada` é selecionável manualmente, sem aprovador ou evidência;
- não há identidade do fiscal, assinatura, checklist de verificação ou rejeição formal.

Portanto, há **modelo de requisito e reconciliação**, não um Quality Management System completo.

## Evidence Model

**EVIDENCE_MODEL: NONE**, no sentido probatório exigido pela missão.

O sistema guarda registros estruturados, timestamps, `user_id`, contexto JSON, timeline e outcomes. Isso constitui **operational record**, não evidência verificada. Não foram encontrados:

- foto, arquivo, documento ou storage bucket;
- localização/georreferência;
- assinatura humana ou criptográfica;
- hash de artefato;
- antes/depois;
- autor de observação separado do dono da linha;
- evidência de execução, aceite, falha ou retrabalho;
- integridade encadeada ou pacote probatório.

O campo `signature` de `predictive_patterns` é uma chave MD5 de `event_type|domain` para deduplicar padrões agregados; não é assinatura de evidência. A timeline pode ser alterada pelo próprio usuário sob política `FOR ALL` e não é ledger imutável.

## Closure

**CLOSURE MODEL: DECLARATIVE.**

Um item pode ser movido para `done` diretamente. Um outcome registra impacto real, atraso, variação de custo, score de sucesso e notas, mas não é obrigatório para `done`, não contém aprovador e não verifica `acceptance_criteria`. Nas etapas de obra, `concluida_validada` também é uma escolha direta.

Não existe distinção formal entre executed, submitted, verified, approved e closed. O sistema mede resultado posterior, mas não prova fechamento.

## Rework / Nonconformity

Retrabalho aparece como risco previsto e consequência de sequência incoerente. Estados `improvisada` e `incompativel` representam anomalias; regras geram eventos com categorias como risco de retrabalho.

**REWORK MODEL: WEAK / NOT FIRST-CLASS.** Não há entidade de não conformidade, rejeição, ação corretiva, reabertura, nova execução, nova evidência e novo aceite. O ciclo `falha → rejeição → retrabalho → reinspeção → aceite` não está implementado.

## Roles and Responsibility

O modelo efetivo é single-owner por usuário autenticado:

- Auth Supabase identifica o usuário;
- quase todas as tabelas têm `user_id` e RLS “own row”;
- `owner` do backlog é texto livre;
- não há vínculo entre owner e usuário autenticado;
- não há criador, executor, fiscal, aprovador, cliente ou equipe como papéis autorizativos;
- não há delegação ou segregação de funções.

O plano de handoff menciona `user_roles` e `has_role`, mas essas estruturas não existem nas migrations ou tipos do HEAD. Isso é conflito **DOCUMENTED_ONLY vs IMPLEMENTED**.

## Time / SLA

O sistema registra criação/atualização, observação da etapa, telemetria, cálculo de score/risco, outcomes e timeline. O backlog possui `sla_deadline`; outcomes possuem `delay_days`; padrões calculam tempo médio até efeito; risco tem janela recente e horizonte.

Contudo, SLA não gera alerta nem bloqueia fechamento, e a UI de criação do backlog não expõe prazo ou critérios de aceite. Tempo influencia mineração e forecast, mas não o score QFD básico. Não há aging operacional geral.

## Prioritization

Há motor de decisão real e versionado.

| TEMP_RULE | Entrada | Lógica | Saída | Status |
|---|---|---|---|---|
| QFD-R01 | impacto, frequência, valor financeiro, complexidade | `(I×F×V)/max(C,0,1)` | `final_score` | IMPLEMENTED |
| QFD-R02 | score + thresholds da versão ativa | ≥P0, ≥P1, ≥P2, senão P3 | classe de prioridade | IMPLEMENTED |
| QFD-R03 | pesos versionados | multiplica cada dimensão antes da razão | score vinculado à versão | IMPLEMENTED |
| QFD-R04 | versão candidata | simula score/classe sem persistir | backtest | IMPLEMENTED |
| QFD-R05 | outcomes | ajusta pesos por faixas do sucesso médio | versão sugerida, não ativada | IMPLEMENTED, heurístico |
| QFD-R06 | evento/domínio + outcomes | suporte, confiança, lift, custo, atraso e tempo até efeito | padrão preditivo | IMPLEMENTED, associação aproximada |
| QFD-R07 | padrões + eventos recentes + versão de risco | soma confiança×hits×impacto ponderado | risco e horizonte do requisito | IMPLEMENTED, experimental |
| QFD-R08 | estados de etapas | sete regras fixas de precedência | incoerências, custos e eventos | IMPLEMENTED, domínio restrito |

Limites:

- os quatro scores são inseridos/editados manualmente;
- `decision_rules` existe, mas não foi encontrado executor genérico dessas regras;
- associação evento→outcome na mineração é ampla por usuário e janela temporal, não causalidade individual;
- valores de custo/impacto das regras de obra são constantes codificadas e sem proveniência documentada;
- backtest mede mudança de classe, não acurácia contra ground truth.

## Operational Memory

**OPERATIONAL MEMORY: PARTIAL.**

São preservados eventos, traduções, scores, versões, outcomes, telemetria, padrões e timeline de etapas/reconciliações. O histórico permite reconstrução parcial do raciocínio e comparação entre esperado e real.

Não é `STRONG` ou `AUDITABLE` porque:

- políticas RLS permitem alteração/remoção pelo próprio dono;
- não há histórico geral de mudanças do backlog, requisitos, scores ou outcomes;
- a timeline registra somente criação/alteração de etapa e reconciliação;
- ligações entre as camadas são opcionais e incompletas;
- não há hash, imutabilidade ou cadeia de custódia.

## Interface

| Superfície | Estado | Limite principal |
|---|---|---|
| landing, auth, instalação PWA | IMPLEMENTED | deployment atual não validado |
| Cockpit/dashboard | IMPLEMENTED | consolidação visual, não controle transacional |
| Campo/EAP | IMPLEMENTED | estados e confiança manuais |
| Timeline de obra | IMPLEMENTED | parcial, não imutável |
| Voz do Campo | IMPLEMENTED | entrada manual, sem mídia |
| Requisitos WHAT/HOW | IMPLEMENTED | associação ao evento não exposta na UI |
| Prioridades | IMPLEMENTED | scores editáveis manualmente |
| Backlog kanban | IMPLEMENTED | sem SLA/aceite na UI e sem guards |
| Outcomes | IMPLEMENTED | declarativos |
| Padrões e Risk Forecast | IMPLEMENTED | modelos heurísticos/experimentais |
| Telemetria | IMPLEMENTED | entrada manual |
| Versões/backtest | IMPLEMENTED | não constitui validação estatística |
| inspeção/aceite/evidência | NOT IMPLEMENTED | sem superfícies próprias |
| administração/papéis | NOT IMPLEMENTED | single-owner por RLS |

## Data Model

Modelo conceitual sanitizado:

`auth.user → profile`

`field_event → semantic_map → qfd_requirement → qfd_matrix / priority_score(version) → execution_backlog → telemetry / feedback_loop / execution_outcome`

`execution_outcome → suggested score version`

`field_event + execution_outcome → predictive_pattern → requirement risk`

`work_site → work_stage → site_activity_log`; reconciliação de etapas produz `field_event`.

Entidades adicionais: `decision_rules`, `qfd_score_versions`, `risk_model_versions`. São 8 migrations, com enums, constraints, índices, triggers, RPCs e RLS. Não foram encontrados views, storage buckets ou funções Edge versionadas.

RLS está habilitada nas tabelas examinadas e predominantemente limita linhas por `auth.uid() = user_id`. Isso sustenta isolamento individual básico, não auditoria completa de segurança ou multi-tenancy organizacional.

## Technological Assets

- React 18, TypeScript, Vite, React Router e TanStack Query;
- Tailwind, shadcn/Radix e Recharts;
- Supabase/PostgreSQL/Auth com RLS, triggers e RPCs;
- PWA responsiva e instalável;
- modelo de score versionado e backtest read-only;
- mineração SQL de padrões e forecast de risco;
- reconciliador determinístico de sequência de obra;
- timeline de atividade;
- Vitest configurado, embora com apenas um teste-placeholder.

## Conceptual Assets

| Categoria | Conhecimento preservado |
|---|---|
| DOMAIN_MODEL | evento, sinal, WHAT/HOW, backlog, outcome, padrão e etapa de obra |
| WORKFLOW | realidade→tradução→decisão→execução→telemetria→aprendizado |
| DECISION_RULE | score econômico, classes, versões e backtest |
| QUALITY_RULE | métrica/alvo, critérios de aceite não aplicados e precedências de obra |
| EVIDENCE_RULE | nenhuma regra probatória implementada |
| CLOSURE_RULE | done/outcome declarativos; ausência de aceite verificado |
| AUDIT_RULE | log parcial de mudanças de etapa e reconciliação |
| UX_PATTERN | cockpit, próxima ação, kanban, campo e comparação de versões |
| DATA_MODEL | pipeline relacional multi-domínio e extensão de EAP/reconciliação |

Se o código desaparecesse, a perda mais cara seria a combinação entre **modelo decisório versionado**, **feedback por outcomes**, **mineração de padrões** e **reconciliação plano×realidade**.

## Reusable Capabilities

| TEMP_CAP_ID | Nome | Evidência / maturidade | Coupling | Reconstruction cost | Possible consumers, sem promoção |
|---|---|---|---|---|---|
| CAP-QFD-01 | pipeline event→WHAT/HOW→backlog | schema + UI; PARTIAL/NEAR | alto | HIGH | Control, discovery/produto |
| CAP-QFD-02 | priority scoring versionado | trigger, versões e UI; NEAR | médio | HIGH | motores de decisão |
| CAP-QFD-03 | backtest de versão | RPC estável + UI; NEAR | médio | MEDIUM | governança de regras |
| CAP-QFD-04 | learning loop por outcomes | outcome + sugestão; PARTIAL | alto | HIGH | priorização adaptativa |
| CAP-QFD-05 | pattern mining e risk forecast | RPCs + UI; PARTIAL | alto | HIGH | Control/Vision, com validação |
| CAP-QFD-06 | reconciliação de sequência física | regras + RPC; PARTIAL/NEAR | médio | HIGH | Copiloto/field operations |
| CAP-QFD-07 | timeline de estado observado | trigger + UI; PARTIAL | médio | MEDIUM | memória operacional |
| CAP-QFD-08 | representação de confiança da observação | enum/UI; EARLY | baixo | LOW | captura de campo |

Os IDs são temporários desta revisão e não alteram o Capability Registry.

## Relationship to Fábrica de Provas

**Classificação global: DISTINCT, com STRUCTURAL_SIMILARITY limitada em registro e timeline. NO_EVIDENCE de genealogia.**

| Eixo | QFD-OS | Arquitetura probatória posterior documentada | Relação |
|---|---|---|---|
| origem | entrada manual ou reconciliação | fonte identificada e preservável | OVERLAP parcial |
| captura | texto/números/estado | artefato e proveniência | DISTINCT |
| identidade/autoria | `user_id` dono | identidade do produtor e cadeia | PARTIAL / DISTINCT |
| tempo | timestamps de banco | tempo com proveniência | STRUCTURAL_SIMILARITY |
| localização | ausente | atributo possível da evidência | DISTINCT |
| integridade | ausente | hash/serialização/custódia | DISTINCT |
| aceite/verificação | declarativo | decisão verificável | DISTINCT |
| fechamento | `done`/outcome | pacote reconstruível | DISTINCT |
| auditoria | timeline parcial e mutável | reconstrução e histórico | STRUCTURAL_SIMILARITY limitada |
| pacote probatório | ausente | requisito explícito posterior | DISTINCT |

QFD-OS pode produzir sinais ou registros que futuramente sejam objeto de preservação, mas não fabrica prova. Não foi encontrada entidade canônica formal chamada “Fábrica de Provas”; a comparação usa apenas capacidades probatórias documentadas posteriormente em Atlas/Cofre/checkpoints.

## Relationship to OPERA

| Sistema | Classificação | Evidência e limite |
|---|---|---|
| Copiloto | STRUCTURAL_SIMILARITY + CAPABILITY_OVERLAP | campo, etapas, ocorrências e fechamento; sem lineage documentada |
| Control | POSSIBLE_ANTECEDENT | evento→classificação→priorização→padrão/risco antecede cronologicamente mecanismos de diagnóstico; sem transferência comprovada |
| Atlas | STRUCTURAL_SIMILARITY | timeline, versões e memória; QFD não tem integridade/reconstrução equivalentes |
| Vision | CAPABILITY_OVERLAP | cockpit, risco e sinalização visual; sem implementação compartilhada |
| Obra Flow | STRUCTURAL_SIMILARITY | operação de obra e estado; unidades e fluxos distintos |
| StockFlow | STRUCTURAL_SIMILARITY | eventos de campo, risco e retrabalho; StockFlow possui evidência/custódia mais fortes em domínio próprio |
| Direcione | POSSIBLE_ANTECEDENT / STRUCTURAL_SIMILARITY | QFD-OS antecede o score, horizonte decisório e memória do Direcione; nenhum vínculo Git ou transferência direta comprovado |

Nenhuma relação foi classificada como `DIRECT_LINEAGE`.

## Relationship to TPC/TDO

**Resultado: STRUCTURAL_RESEMBLANCE.**

O QFD-OS representa observações, estados, transições, confiança, dependências sequenciais, memória e divergência plano×realidade. Essas estruturas são comparáveis a preocupações posteriores da TPC/TDO, mas não foram encontrados “TPC”, “TDO” ou “Informodinâmica” como fundamento do repositório. O software não constitui validação da teoria nem precursor documentado.

## Reconstruction Cost

| Dimensão | Custo | Justificativa |
|---|---|---|
| CODE | HIGH | UI ampla, banco, triggers e RPCs |
| DATA_MODEL | HIGH | pipeline relacional e dois domínios conectados |
| WORKFLOW | VERY_HIGH | encadeamento decisão→resultado→aprendizado |
| QUALITY_MODEL | MEDIUM | componentes existem, mas são incompletos |
| EVIDENCE_MODEL | LOW | modelo probatório não existe |
| STATE_MACHINE | MEDIUM | enums e estados, poucos guards |
| AUDIT_HISTORY | MEDIUM | timeline parcial, simples de entender mas integrada ao campo |
| DOMAIN_KNOWLEDGE | HIGH | precedências, risco, score e tradução WHAT/HOW |
| UX | MEDIUM | muitas superfícies, padrões convencionais |

## Maturity

| Dimensão | Estado |
|---|---|
| CODE | NEAR |
| UI | NEAR |
| DATA_MODEL | NEAR |
| BUSINESS_LOGIC | NEAR |
| QUALITY_MODEL | PARTIAL |
| EVIDENCE_MODEL | NONE |
| AUTH | NEAR |
| RLS | NEAR, não auditada formalmente |
| TESTS | EARLY |
| BUILD | NEAR |
| DEPLOYABILITY | PARTIAL |
| OPERABILITY | PARTIAL |
| SECURITY | PARTIAL |
| COMMERCIAL_READINESS | EARLY/PARTIAL |

## Technical Validation

- `npm ci`: **FAIL** — `package.json` e `package-lock.json` não estão sincronizados.
- instalação diagnóstica `npm install --package-lock=false --ignore-scripts`: **PASS**; 4 vulnerabilidades reportadas (3 moderadas, 1 alta) e aviso de engine Node.
- `npm run build`: **PASS**; bundle principal ~1,10 MB, com warning de chunk >500 kB.
- `npx tsc --noEmit`: **PASS**.
- `npm test`: **PASS, 1/1**; é apenas teste-placeholder aritmético, não cobre domínio.
- `npm run lint`: **FAIL**, 48 errors e 9 warnings, sobretudo `any` explícito e regras de componentes.
- migrations não foram executadas; deploy não foi acessado.

## Risks

**SENSITIVE MATERIAL DETECTED.** Um arquivo `.env` está rastreado no Git. Seu conteúdo não foi lido nem reproduzido. Antes de qualquer operacionalização, secrets e histórico precisariam de revisão independente.

Outros riscos:

- lockfiles npm/bun coexistem e o lock npm está divergente;
- cobertura de teste efetiva é praticamente nula;
- funções preditivas podem sugerir causalidade onde existe apenas associação temporal ampla;
- valores fixos de custo/impacto da reconciliação não têm proveniência documentada;
- `done` e `concluida_validada` não exigem aceite ou evidência;
- owner textual não garante identidade ou responsabilidade;
- timeline é mutável sob política ampla;
- plano de handoff afirma roles que não existem no schema;
- UI e schema expõem apenas parte um do outro;
- segurança, deploy e operação real permanecem não comprovados;
- o live app documentado não foi usado como evidência de estado atual.

## Current Value

- **VALUE_AS_PRODUCT: MEDIUM** — conceito e software substantivos, porém sem prova operacional, modelo probatório ou robustez de produção.
- **VALUE_AS_INTERNAL_TOOL: HIGH** — útil para estruturar sinais, hipóteses de prioridade e reconciliação controlada.
- **VALUE_AS_CAPABILITY_SOURCE: VERY_HIGH** — contém mecanismos decisórios e de aprendizagem pouco triviais.
- **VALUE_AS_RESEARCH_ARTIFACT: HIGH** — experimento técnico anterior sobre realidade, decisão e feedback.
- **VALUE_AS_HISTORICAL_ASSET: HIGH** — antecede cronologicamente vários ativos e preserva uma linha conceitual rica.

Distâncias:

- **DISTANCE_TO_INTERNAL_VALUE: VERY_NEAR** — o valor arqueológico e conceitual já está disponível.
- **DISTANCE_TO_PRODUCT: FAR** — exige reprodutibilidade, segurança, testes e validação do modelo.
- **DISTANCE_TO_FIRST_REVENUE: FAR** — não há evidência de cliente, pricing, operação ou canal comercial.

## Ecosystem Map V2 Recommendation

Posição futura recomendada, sem alterar o mapa atual:

**COORDINATION_ENGINE + FIELD_EXECUTION_SYSTEM + CAPABILITY_SOURCE + RECOVERABLE_PRODUCT + HISTORICAL_ASSET + RESEARCH_ARTIFACT.**

`QUALITY_INFRASTRUCTURE` deve aparecer apenas como **PARTIAL**; `EVIDENCE_INFRASTRUCTURE` não deve ser atribuído.

Estado recomendado: **FROZEN**, preservado para decisão explícita e extração conceitual futura. A classificação evita tanto abandono quanto reativação automática.

## Unknowns

- expansão literal originalmente pretendida para QFD;
- uso real, usuários, dados, métricas e eficácia do score;
- estado do Supabase e deployment histórico;
- origem empírica das regras/custos de obra;
- existência de documentação privada não versionada;
- intenção por trás dos muitos commits genéricos;
- lineage direta com produtos posteriores;
- adequação comercial e disposição de pagamento;
- eventual PDF de handoff produzido fora do Git.

## Evidence

### Git e documentação do ativo

- HEAD `3795f54c8e0b291ad746b299fc61dedfd46c9ff0`; `main`; `origin/main`; sem tags.
- commits-chave: `4de308c`, `2e8999f`, `d26430b`, `2501b3c`, `1b9f8a8`, `d8094e6`, `379769a`, `2be8dd1`, `b145415`, `b12fb83`, `3795f54`.
- `README.md` e `.lovable/plan.md`, tratados com distinção entre descrição e implementação.

### Implementação

- `supabase/migrations/`: 8 migrations de 2026-04-27 a 2026-05-10.
- `src/App.tsx`, `src/lib/qfd.ts`, `src/integrations/supabase/types.ts`.
- páginas `Dashboard`, `Events`, `Requirements`, `Scores`, `Backlog`, `Outcomes`, `Patterns`, `Risk`, `Telemetry`, `Versions`, `Site` e `SiteTimeline`.
- stack e scripts em `package.json`; PWA em `public/`.

### Base comparativa

- `AGENTS.md`, `CONSTITUICAO.md`, `DOCUMENTO_CANONICO.md`, `GLOSSARIO_CANONICO.md`.
- Ecosystem Map V1, Capability Registry V1 e Systems Roadmap V1.
- Special Reviews de Obra Flow, StockFlow, Vaga Quente, Vitrine Digital, Memória de Vendas e Direcione.
- checkpoints arquiteturais do OPERA e documentação vigente de TPC/TDO.

### Preservação

Nenhum arquivo de produto, migration, configuração ou dado foi alterado. Dependências e `dist/` gerados localmente são ignorados pelo Git. O repositório-alvo encerrou a revisão no mesmo branch, HEAD e remote, sem diff versionado.
