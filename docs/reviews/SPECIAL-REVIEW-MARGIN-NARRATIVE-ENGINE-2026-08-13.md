# Special Review — Margin Narrative Engine

**Data da revisão:** 2026-08-13

**Repositório-alvo:** `HorusHypnotic/margin-narrative-engine`

**Commit examinado:** `61a1bd8f96fe8e6d238af1b78f0ee5bbe75ed7cc` (`main`)

**Natureza:** arqueologia forense read-only; nenhuma promoção ou integração

**Estado recomendado:** `FROZEN`

## Executive Verdict

O ativo é um protótipo de **motor narrativo operacional orientado por eventos e evidências**, com interface de dossiê e score de atores. A classificação sustentada é `NARRATIVE_ENGINE + DECISION_SUPPORT + REPORT_GENERATOR + PROTOTYPE + RESEARCH_ARTIFACT`. Ele não é hoje um `PROOF_ENGINE`: calcula SHA-256 real no navegador e modela proveniência, disputa e timeline, mas não persiste os arquivos nem os registros, não autentica autores, não mantém log imutável e não permite verificar posteriormente os bytes originais.

“Fábrica de Provas” não é memória externa imposta ao código. O nome aparece explicitamente na mesma linhagem Git desde `fa39394` (2026-05-08), está na interface atual e foi consolidado em `.lovable/plan.md` como uma arquitetura de quatro camadas. A relação mais precisa é `RENAMED_SUCCESSOR`, com confiança `HIGH`: o Motor de Margem/Margin Navigator foi ampliado e reposicionado, na mesma árvore, como Fábrica de Provas; o slug técnico antigo permaneceu.

Seu patrimônio principal não é uma cadeia probatória operacional, e sim a combinação conceitual já codificada: evento operacional, evidência estruturada, fatores de confiança/integridade, score explicável, narrativa por persona e rastreabilidade parcial até eventos. Apagar o repositório destruiria um artefato de pesquisa valioso e uma formulação de produto difícil de reconstruir apenas a partir do nome.

## Evidence Boundary

### Fatos

- O alvo tem uma única branch remota relevante (`main`), nenhum tag e HEAD alinhado a `origin/main`.
- O histórico contém 73 commits entre o template de 2025-01-01 e o README de 2026-08-09.
- A análise cobriu Git, README, plano Lovable, código TypeScript/React, schemas tipados, regras, mocks, interface e exportador PDF.
- Não há backend, banco, migrations, storage persistente, autenticação, RLS, assinatura digital ou suíte de testes declarada.
- A pista privada foi excluída da base de evidência e não foi reproduzida ou versionada.

### Inferências controladas

- A relação de sucessão é inferida da continuidade Git, das mudanças de nome e da preservação do motor sob a nova capa.
- Potenciais consumidores e posições futuras no ecossistema são recomendações, não integrações existentes.

### Desconhecidos

- Não foi localizado contrato externo, implantação ou banco que complemente o repositório.
- Não é possível provar uso real, usuários, receita, validade jurídica ou operação em produção apenas pelo código.
- Não é possível saber se “Fábrica de Provas” teve uma existência anterior fora desta linhagem.

## Identity

**IDENTITY:** motor determinístico que transforma eventos de obra e evidências associadas em score, blocos narrativos por persona e relatório PDF.

**CLASSIFICATION:** `NARRATIVE_ENGINE`, `DECISION_SUPPORT`, `REPORT_GENERATOR`, `OPERATIONAL_MEMORY` (somente modelada), `INTERNAL_TOOL`, `PROTOTYPE`, `RESEARCH_ARTIFACT`.

**CONFIDENCE:** `HIGH`.

Não há base para classificá-lo como `PROOF_ENGINE`, `AUDIT_SYSTEM` operacional ou `CASE_BUILDER` completo.

## Genealogy

| Marco | Evidência Git | Leitura |
|---|---|---|
| T0 — origem | `ba20ba6`, 2025-01-01 | template TanStack, ainda sem identidade de domínio |
| T1 — primeiro problema | `a77b95e`, 2026-05-07, “Criou MVP do Motor de Margem” | explicar margem e ocorrências de obra a públicos diferentes |
| T2 — primeira narrativa | `6724835`, exportação PDF; `8701681`, arquitetura técnica | eventos viram blocos narrativos e relatório |
| T3 — Fábrica de Provas | `fa39394`, 2026-05-08 | primeira ocorrência Git comprovada do nome na interface |
| T4 — evidência e reputação | `2fd4401`, `2d94a3b`, `0a5578f`, 2026-05-11 a 13 | ator, score, evidência, sandbox e fatores de integridade |
| T5 — dossiê vivo | `d058367` e plano; `7b68f1b`, 2026-05-26 | quatro camadas: contexto, evidência, interpretação e materialização |
| T6 — estado atual | `85af258`, 2026-06-04; `61a1bd8`, 2026-08-09 | captura guiada, store em memória, dossiê e README conceitual |

Não há branches paralelas ou tags que indiquem produto independente. O histórico mostra expansão contínua, não incorporação posterior de outro repositório.

## Relationship to Fábrica de Provas

**Classificação:** `RENAMED_SUCCESSOR` — `HIGH`.

“Fábrica de Provas” é nome de produto/capa e conceito arquitetural explícito da linhagem. Em `fa39394`, a página já se intitula “Fábrica de Provas — Orquestrador de Obra”. O plano posterior chama o desenho de “Espinha dorsal da Fábrica de Provas” e preserva `FieldEvent`, `Signal`, `Score`, `Evidence`, `Timeline`, hash, GPS e disputa. O título atual do header continua “Fábrica de Provas”, enquanto README e PDF mantêm vestígios de Margin Navigator/Margin Engine. Isso evidencia identidade em transição, não dois sistemas autônomos.

## Original Problem

O problema original era transformar dados dispersos do canteiro — especialmente financeiro, cotações, chuva e diário de obra — em explicações contextualizadas da margem para dono, gestor e cliente. A evolução acrescentou a pergunta “por que acreditar nisso?” e passou a anexar evidência, proveniência declarada e score às ocorrências. O núcleo continua sendo comunicar e justificar a realidade operacional e seus impactos; provar juridicamente uma ocorrência não está implementado.

## Fundamental Unit

`FieldEvent` é a unidade fundamental. Pode existir com contexto, timestamp, origem, tipo e payload, sem evidência. `Evidence` é opcional e associada ao evento. `Signal` deriva do evento e da evidência; `Block` deriva de eventos e compõe a narrativa; score e dossiê dependem dessas derivações.

```text
Obra/Ator/Cidade
      ↓
FieldEvent ── optional Evidence ── Attachments/Timeline/Disputes
      ↓                         ↘ fatores de confiança/integridade
Signal / KPI / Score
      ↓
Block narrativo por persona
      ↓
Dashboard ou PDF
```

## Operational Pipeline

| Etapa real | Estado | Ator/transformação |
|---|---|---|
| cadastrar contexto | `IMPLEMENTED` em memória | operador cria obra e atores |
| selecionar/capturar anexo | `PARTIAL` | navegador lê `File`; não o armazena |
| calcular hash | `IMPLEMENTED` | WebCrypto SHA-256 sobre bytes locais |
| registrar evento/evidência | `IMPLEMENTED` em sessão | React state adiciona metadata e evento |
| validar integridade | `PARTIAL` | cálculo inicial é rotulado “verified”; não há reverificação |
| interpretar | `IMPLEMENTED` | regras e pesos determinísticos geram sinais/KPIs |
| montar narrativa | `IMPLEMENTED` | templates variam por persona e severidade |
| revisar/contestar | `PARTIAL` no modelo; apresentação majoritariamente read-only | status e threads existem, workflow não está completo |
| exportar | `IMPLEMENTED` | jsPDF produz relatório narrativo |
| persistir/reabrir/auditar | `ABSENT` | refresh encerra o estado criado pelo usuário |

## Fact / Evidence / Claim / Narrative

| Conceito | Entidade formal | Situação |
|---|---|---|
| Fact | nenhuma | `NONE`; evento é registro/asserção, não fato validado independente |
| Evidence | `Evidence` + `Attachment` | `STRUCTURED`; contém origem, hashes, GPS, confiança, estado, disputa e timeline |
| Claim | nenhuma | `IMPLICIT`; textos dos blocos fazem alegações sem objeto claim próprio |
| Interpretation | `Signal`, KPI, score | `EXPLICIT`; regras e fatores calculam impacto |
| Narrative | `Block[]` e templates | `EXPLICIT`; montagem determinística por persona |

O sistema não preserva a separação formal completa `FACT → EVIDENCE → CLAIM → NARRATIVE`. Um `FieldEvent.payload` pode alimentar diretamente uma alegação narrativa. `Evidence.state = validated` pode ser escolhido na captura e não equivale a fato comprovado.

## Evidence Model

**Classificação:** `STRUCTURED_EVIDENCE`.

O schema suporta foto, documento, log, nota fiscal, vídeo e áudio; label, MIME, tamanho e hash; origem, horários de captura/upload, autor declarado, device, GPS, hash agregado, confiança, estado, disputa, timeline, metadata e tags. Não há assinatura, identidade autenticada, bytes persistidos, versionamento de payload ou referência durável recuperável ao arquivo. Portanto, a estrutura excede `ATTACHMENT_ONLY`, mas não alcança `TRACEABLE_EVIDENCE` durável nem `VERIFIABLE_EVIDENCE`.

## Integrity

**INTEGRITY_MODEL:** `WEAK`.

O hash SHA-256 é tecnicamente real no fluxo de captura. Entretanto:

- o arquivo não é armazenado e sua URL não é registrada no fluxo principal;
- o hash e a evidência ficam em memória mutável;
- não existe operação de reverificação contra os bytes preservados;
- não existe assinatura, timestamp confiável, append-only ou snapshot assinado;
- mocks contêm hashes explicitamente sintéticos;
- “integrity verified” significa cálculo inicial, não prova posterior de identidade.

Assim, o sistema não consegue demonstrar após a sessão que “esta evidência é a mesma originalmente registrada”.

## Chain of Custody

**Classificação:** `AUDIT_ONLY`.

Há campos de quem registrou, quando, device, origem, timeline e disputa. Isso é um desenho de audit trail. Não há autenticação do agente, transferências de posse, recibos, armazenamento imutável, política de alteração ou verificação de cada transição. A timeline é um array mutável e não constitui cadeia de custódia.

## Claim Model

**CLAIM_MODEL:** `IMPLICIT`.

Blocos como margem drenada, gargalo, economia e justificativa de chuva são afirmações derivadas por regra e ligadas a `source_event_ids`. Não existe entidade `Claim`, autoria da alegação, status, escopo, conjunto explícito de suporte/contradição, revisão ou decisão. A confiança está na evidência/sinal, não na alegação.

## Contradictions

**Classificação:** `PARTIAL` no schema; `WEAK` no comportamento.

`DisputeStatus` e `DisputeThread` admitem disputa aberta, resolução favorável/contrária e rejeição, e o score reduz ou zera o impacto conforme o status. Porém não há grafo que mantenha evidências favoráveis e contrárias vinculadas ao mesmo claim, nem workflow completo de abertura/resolução demonstrado na interface atual. A narrativa pode continuar unilateral por persona.

## Narrative Model

A narrativa é `RULES_BASED + TEMPLATE_ASSEMBLY`, sem LLM. `engine.ts` calcula KPIs e percorre tipos de evento; `templates.ts` muda título e corpo por persona/severidade; uma ordem fixa seleciona a composição. O cliente pode receber uma seleção diferente do gestor, o que é útil para comunicação, mas cria risco de omissão não declarada.

**TRACEABILITY:** `PARTIAL_TRACEABILITY`.

Em sessão, é possível navegar de bloco para `source_event_ids`, e do evento para a evidência e sua referência. Não existe `Claim` intermediário. No PDF, a trilha termina nos IDs dos eventos: anexos, hashes, registros completos, timeline, validações e índice não são incorporados. Sem persistência, a reconstrução posterior é impossível.

## Timeline

Há duas cronologias: timestamps dos `FieldEvent` e `Evidence.timeline` com upload, metadata, disputa, confiança, integridade e validação. A ordenação é representável, mas gaps, intervalos, before/after formal e consistência temporal não são validados. Timeline é cronologia, não causalidade.

## Causality

**Classificação:** `RELATIONAL`.

Blocos ligam conclusões a eventos e algumas regras usam linguagem causal operacional. Não existem relações formais `caused_by`, `resulted_in` ou grafo causal. Sequência e cálculo não demonstram causa.

## Proof Package

**Classificação:** `REPORT_ONLY`.

O exportador jsPDF gera capa, KPIs, narrativa e, em cada bloco, IDs de eventos e EAP. Não empacota arquivos, registros completos de evidência, hashes verificáveis, timeline, claims, índice, manifesto, assinaturas ou validações. “Dossiê de provas” é hoje um relatório narrativo, não `EVIDENCE_BUNDLE` nem `PROOF_PACKAGE`.

## Closure

**CLOSURE MODEL:** `DECLARATIVE`.

Evidência pode nascer `raw`, `partial` ou `validated`, inclusive “Auto-validada na captura”. Disputas possuem estados, mas não há ciclo de caso nem critério de suficiência probatória, aprovador autenticado ou fechamento verificável. “Validated” é declaração de estado do protótipo.

## Interface

| Superfície | Estado |
|---|---|
| landing e diagrama das quatro camadas | `IMPLEMENTED` |
| bootstrap/nova obra | `IMPLEMENTED` em memória |
| upload/captura de evidência | `PARTIAL` — hash/metadata sem storage |
| obras e detalhe | `IMPLEMENTED` para estado da sessão |
| auditoria/score/narrativa | `IMPLEMENTED` com mocks ou runtime |
| timeline de evidência | `IMPLEMENTED` como visualização |
| disputes | `PARTIAL` |
| claims/cases | `ABSENT` |
| relatório PDF | `IMPLEMENTED`, report-only |
| busca/admin | `ABSENT` |
| mobile responsivo | `PARTIAL` por layout responsivo |
| PWA/offline instalável | `ABSENT` |

## Data Model

O “modelo de dados” é um conjunto de interfaces TypeScript, não schema persistente:

- território: `Cidade`, `Actor`, `ObraMeta`;
- ocorrência: `FieldEvent` com obra, ator, cidade, ativo, fonte, EAP, tipo e payload;
- evidência: `Evidence`, `Attachment`, `EvidenceTimelineEntry`, `DisputeThread`;
- interpretação: `Signal`, scorecards e KPIs;
- narrativa: `Block` e `source_event_ids`.

Não existem tabelas, constraints de banco, foreign keys, indexes, migrations, triggers, funções server-side, storage buckets ou RLS. As relações dependem de strings e disciplina do código cliente.

## Technological Assets

- SPA/server app React 19 + TypeScript + TanStack Start/Router/Query + Vite.
- Design system Tailwind/Radix e interface responsiva de quatro camadas.
- Hash SHA-256 client-side com WebCrypto.
- Engine determinístico e templates por persona.
- Score explicável `impacto × evidência × integridade`.
- Modelos tipados de território, evento, evidência, disputa e timeline.
- Exportador PDF com jsPDF.
- Separação sandbox/produção e aviso explícito de que o sandbox não tem valor probatório.

## Conceptual Assets

- passagem de “storytelling de margem” a “pipeline de confiança”;
- hierarquia `contexto → evidência → interpretação → materialização`;
- princípio codificado “score depende de evidência; evidência não depende de score”;
- narrativa adaptada por persona com referências a eventos;
- reputação amortecida por estado, confiança, disputa e integridade;
- dossiê vivo como superfície de operação, não apenas relatório final;
- separação explícita entre ambiente sintético e produção.

As fórmulas e pesos são patrimônio exploratório, não conhecimento validado: não há calibração documentada ou testes.

## Reusable Capabilities

| TEMP_CAP_ID | Capability | Evidência | Maturidade | Acoplamento | Custo de reconstrução | Consumidores possíveis |
|---|---|---|---|---|---|---|
| `TEMP-MNE-001` | event-to-narrative rules | engine + templates + source IDs | `PARTIAL` | médio ao domínio de obra | alto | Atlas, Vision, Copiloto |
| `TEMP-MNE-002` | evidence metadata ledger | schema + capture wizard | `EARLY` | médio | alto | Obra Flow, OPERA Control |
| `TEMP-MNE-003` | explainable evidence-weighted score | `score.ts` e UI “por que” | `PARTIAL` | alto aos eventos atuais | alto | reputação/qualidade operacional |
| `TEMP-MNE-004` | client-side file fingerprint | `hash.ts` | `NEAR` isoladamente | baixo | baixo | capturas documentais |
| `TEMP-MNE-005` | dispute-aware attenuation | schema + score | `EARLY` | médio | médio | auditoria e revisão |
| `TEMP-MNE-006` | persona-specific dossier assembly | engine + templates + PDF | `PARTIAL` | médio | alto | comunicação operacional |

Nenhuma capability é promovida pelo presente relatório.

## Relationship to QFD-OS

**Classificação:** `COMPLEMENTARY`, sem evidência de `DIRECT_LINEAGE`.

| Dimensão | QFD-OS | Margin Narrative Engine |
|---|---|---|
| unidade | evento/requisito/outcome | evento/evidência/bloco |
| finalidade | realidade → backlog → execução → aprendizado | realidade → interpretação → narrativa/dossiê |
| evidência | modelo probatório ausente | schema estruturado, porém efêmero |
| claim | ausente | implícito |
| integridade | ausente | hash inicial fraco |
| timeline | fluxo de ciclo | cronologia de evento/evidência |
| causalidade | outcome relacionado | relacional, não formal |
| auditabilidade | operacional | explicabilidade parcial em sessão |

QFD-OS decide e acompanha trabalho; MNE explica ocorrências e compõe narrativa. Um pode futuramente produzir eventos para o outro, mas isso não existe no código examinado.

## Relationship to Remanufacturing

| Contrato/capability | Relação | Justificativa |
|---|---|---|
| Provenance Contract V1 | `STRUCTURAL_SIMILARITY` | ambos ligam origem, evento, derivado e validação; MNE não possui identidade estável, hash de derivado, serialização canônica ou validador |
| Provenance Index V1 | `NO_RELATION` | não existe índice durável/reconstruível no MNE |
| Safe Document Representation V1 | `POSSIBLE_CONSUMER` | assets/representações seguras poderiam alimentar evidências, mas não há integração |
| Textual Evidence Producer V0 | `COMPLEMENTARY` / `POSSIBLE_CONSUMER` | ambos separam observação de interpretação; MNE poderia consumir ledger, mas hoje usa payload direto |

Não há antecedência documental comprovada nem equivalência. Os contratos canônicos são mais estritos em identidade, abstention, validação e persistência genealógica.

## Relationship to OPERA

O README e a UI tratam OPERA/Atlas como fonte financeira canônica para KPIs; isso é referência conceitual, não integração técnica. Relações conservadoras:

- **Atlas:** possível fonte de snapshots financeiros; `POSSIBLE_CONSUMER` do lado do MNE.
- **Vision/Copiloto:** possíveis consumidores da narrativa e alertas; nenhuma conexão implementada.
- **OPERA Control:** sobreposição em ocorrência, responsabilidade e fechamento; MNE é mais narrativo e menos transacional.
- **Obra Flow:** complementar para eventos, execução e aceite; MNE poderia materializar evidência/narrativa.
- **StockFlow:** complementar apenas em eventos de suprimento e impacto; sem linhagem.

Não há ECO formal, APIs, autenticação compartilhada ou contrato de eventos no alvo.

## Relationship to TPC/TDO

**Classificação:** `STRUCTURAL_RESEMBLANCE`.

Há semelhanças em estado, evento, evidência, degradação de confiança, memória e rastreabilidade. Não foram encontradas citações normativas, IDs canônicos ou prova de que MNE seja precursor documentado da TPC/TDO. A semelhança não autoriza incorporação teórica.

## Reconstruction Cost

**RECONSTRUCTION_COST:** `HIGH`.

O código utilitário isolado é reconstruível, mas a genealogia, o modelo de quatro camadas, as escolhas de persona, a fórmula explicável, o vocabulário de evidência/disputa e sua composição em UX representam muitas decisões acumuladas. Recriar apenas a interface teria custo médio; recriar o patrimônio conceitual e sua evolução teria custo alto.

## Maturity

| Dimensão | Estado |
|---|---|
| CODE | `PARTIAL` |
| UI | `NEAR` como protótipo demonstrável |
| DATA_MODEL | `PARTIAL` tipado; `NONE` persistente |
| EVIDENCE_MODEL | `PARTIAL` |
| INTEGRITY | `EARLY` |
| CLAIMS | `EARLY`/implícito |
| NARRATIVE | `NEAR` como engine determinístico |
| AUDITABILITY | `EARLY` |
| AUTH | `NONE` |
| RLS | `NONE` |
| TESTS | `NONE` localizado |
| BUILD | `UNKNOWN` neste ambiente |
| DEPLOYABILITY | `PARTIAL` pela configuração Cloudflare/Vite |
| OPERABILITY | `EARLY` |
| COMMERCIAL_READINESS | `EARLY` |

## Technical Validation

- `npm ci`: **FAIL de preparação**, pois não existe `package-lock.json`/`npm-shrinkwrap.json`; o lockfile versionado é `bun.lock`.
- Bun: **UNAVAILABLE** no ambiente, portanto não foi possível executar instalação congelada compatível.
- `node_modules`: ausente.
- build, TypeScript e lint: **NOT RUN**, por falta de dependências instaladas de forma reproduzível.
- testes: **ABSENT** — `package.json` não declara script de teste e não foi localizada suíte.
- code quality estática: modularização e tipagem são razoáveis, mas regras/pesos críticos não têm testes.
- security: sem segredos visíveis no inventário; ausência de auth, autorização, persistence e validação server-side impede avaliação de segurança operacional.
- deployability: configuração Vite/Cloudflare existe, mas deploy não foi executado.
- operability: não há observabilidade, backup, migrations ou procedimento de recuperação.

Essa validação não afirma falha de compilação do código; afirma que a build não pôde ser reproduzida com o gerenciador disponível sem alterar o alvo.

## Current Value

- `VALUE_AS_PRODUCT`: `MEDIUM` como hipótese/protótipo; baixo como produto operacional atual.
- `VALUE_AS_INTERNAL_TOOL`: `HIGH` para demonstração, descoberta e desenho de fluxos.
- `VALUE_AS_CAPABILITY_SOURCE`: `VERY_HIGH`.
- `VALUE_AS_RESEARCH_ARTIFACT`: `VERY_HIGH`.
- `VALUE_AS_IP_ASSET`: `HIGH`.
- `VALUE_AS_HISTORICAL_ASSET`: `HIGH`.
- `DISTANCE_TO_INTERNAL_VALUE`: `VERY_NEAR` para estudo/demonstração.
- `DISTANCE_TO_PRODUCT`: `FAR`.
- `DISTANCE_TO_FIRST_REVENUE`: `FAR`, sem inferir estratégia comercial.

## Risks

- linguagem de “prova auditável”, “integridade verificada” e “linha de custódia” acima das garantias efetivas;
- perda total do estado operacional ao recarregar a aplicação;
- hashes sem preservação dos bytes e sem reverificação;
- auto-validação por quem captura, sem segregação de funções;
- ausência de autenticação e autoria demonstrável;
- narrativa por persona pode omitir contexto sem registrar a omissão;
- claims causais implícitos podem parecer fatos validados;
- pesos e thresholds não calibrados podem produzir falsa precisão reputacional;
- PDF pode ser confundido com pacote probatório, embora contenha apenas IDs de eventos;
- dependência reprodutível exige Bun, mas isso não está explicado por script de validação;
- ausência de testes para regras de domínio e integridade.

## Ecosystem Map V2 Recommendation

Registrar futuramente, sem promoção automática, como:

- `NARRATIVE_ENGINE` — principal;
- `CAPABILITY_SOURCE`, `RESEARCH_ARTIFACT`, `IP_ASSET`, `HISTORICAL_ASSET`;
- `RECOVERABLE_PRODUCT` em estágio de protótipo;
- `EVIDENCE_INFRASTRUCTURE` apenas `PARTIAL/PROTOTYPE`;
- **não** classificar ainda como `PROOF_INFRASTRUCTURE`, `AUDIT_INFRASTRUCTURE` operacional ou cadeia de custódia.

**Prioridade recomendada:** `FROZEN`, preservado para estudo e eventual decisão arquitetural. Uma retomada deveria começar por um contrato de evidência/claim e critérios de integridade, não por expansão da interface.

## Unknowns

- existência de deploy histórico ou backend não versionado;
- usuários e uso real;
- validade dos pesos do score;
- intenção jurídica do termo “prova”;
- política de retenção, privacidade e titularidade planejada;
- origem externa anterior do nome, se houver;
- compatibilidade real da build com Bun no commit congelado.

## Evidence

### Repositório-alvo

- `README.md`: Margin Navigator, problema de storytelling da margem, fontes e personas.
- `.lovable/plan.md`: quatro camadas e declaração de store client-side em memória.
- `src/lib/storytelling/schema.ts`: entidades, enums e relações.
- `src/lib/storytelling/engine.ts` e `templates.ts`: regras narrativas determinísticas.
- `src/lib/storytelling/score.ts`: fatores de evidência e integridade.
- `src/lib/storytelling/hash.ts`: SHA-256 WebCrypto.
- `src/lib/storytelling/store.ts`: ausência explícita de persistência.
- `src/components/evidence/EvidenceCapture.tsx`: captura, provenance e auto-validação.
- `src/routes/auditoria.tsx`: visualização de score, evidência e timeline.
- `src/lib/generate-dossier.ts`: conteúdo efetivo do PDF.
- commits `a77b95e`, `fa39394`, `2fd4401`, `2d94a3b`, `0a5578f`, `d058367`, `7b68f1b`, `85af258`, `61a1bd8`.

### Repositório canônico

- `docs/ecosystem/ECOSYSTEM-MAP-V1.md` e registros estruturados do ecossistema.
- Special Review QFD-OS e demais reviews recentes como base comparativa.
- `docs/document-provenance-contract-v1.md`.
- `docs/document-provenance-index-v1.md`.
- `docs/safe-document-representation-v1.md`.
- `docs/textual-evidence-producer-v0.md`.

## Review Closure

O relatório não altera o alvo, o Ecosystem Map, a Remanufatura Documental, OPERA, TPC/TDO ou qualquer capability. As classificações são diagnósticas. Material privado e conteúdo real não foram incluídos.
