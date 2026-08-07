# OPERA Atlas — Documentação Consolidada

> **Versão do consolidado:** 1.0 · **Data:** 01/08/2026 · **Base normativa:** OPERA_CORE v1.3
> **Escopo:** OPERA Atlas (núcleo). QFD-OS e Direcione aparecem apenas como especificação em D04.
> **Natureza:** compilação fiel. O conteúdo de cada documento é reproduzido como foi publicado — sem reescrita, correção ou atualização.

## Como ler este documento

Cada capítulo abre com um bloco de **Status · Camada · Conceito · Contexto · Origem**. O bloco é a leitura mínima; o corpo é a leitura completa.

**Convenção de status**

| Status | Significado |
| --- | --- |
| **Vigente** | Descreve o sistema como ele é hoje e é vinculante para decisões. |
| **Parcial** | Estrutura descrita existe, mas o uso real ou a validação em campo estão pendentes. |
| **Histórico** | Snapshot de um momento; já foi substituído por versão posterior. Mantido por rastreabilidade. |
| **Aspiracional** | Planejamento, meta ou modelo desejado. Não descreve o estado atual do código. |

**Hierarquia de autoridade** — em caso de conflito entre documentos, prevalece nesta ordem:
1. `.lovable/OPERA_CORE.md` (D01) — invariantes absolutas
2. Constituição Arquitetural (D02) — leis de evolução do produto
3. Diagnóstico Objetivo (D06) e APMO (D09) — estado real, evidence-based
4. Demais documentos

## 1. Painel de Status Geral

| ID | Documento | Versão | Data | Status | Camada | Conceito em uma linha |
| --- | --- | --- | --- | --- | --- | --- |
| D01 | [OPERA_CORE — Constituição Operacional](#d01) | 1.3 | 30/05/2026 | **Vigente** | Técnica / Governança | Documento vinculante que define as 11 invariantes absolutas do sistema — não o que o sistema faz, mas o que ele jamais pode violar |
| D02 | [Constituição Arquitetural v1.0](#d02) | 1.0 | 06/07/2026 | **Vigente** | Governança de produto | Leis permanentes da arquitetura do produto (P1–P10), contratos públicos imutáveis, processo de RFC e matriz de impacto Patch/Minor/Major |
| D03 | [Handover Técnico para Equipe de Desenvolvimento](#d03) | 1.0 | 30/05/2026 | **Parcial** | Técnica | Documentação de continuidade: stack, invariantes, inventário de tabelas, RPCs críticas, guia de migração de backend e checklists |
| D04 | [Mapeamento Funcional para Migração (Atlas · QFD-OS · Direcione)](#d04) | 1.0 | 10/06/2026 | **Parcial** | Técnica / Negócio | Para cada um dos três motores: problema resolvido, informações consumidas e produzidas, invariantes críticas, dependência do Core e risco de impacto |
| D05 | [Modelo Empresarial, Governança LGPD e Mapa do Ecossistema](#d05) | 2.0 | 15/06/2026 | **Aspiracional** | Negócio / Jurídico | Taxonomia de stakeholders, RoPA e bases legais LGPD, classificação de dados, matriz de permissões e mapa de integração com produtos futuros |
| D06 | [Diagnóstico Objetivo — construído, faltante, arriscado](#d06) | 1.0 | 06/07/2026 | **Vigente** | Auditoria | Leitura evidence-based do que existe em código: RLS e exportação CSV como OK; baseline, hash e Gantt como Parciais; Copiloto e prova jurídica como Ausentes |
| D07 | [Roadmap de Maturidade Empresarial (M0–M4)](#d07) | 1.0 | 06/07/2026 | **Histórico** | Governança | Cinco marcos — Fundação Técnica, Pré-piloto Pago, Cliente Enterprise, Due Diligence, Certificações — com prazos estimados de 4 a 36 semanas |
| D08 | [Governança de Maturidade Empresarial v1.1](#d08) | 1.1 | 06/07/2026 | **Vigente** | Governança | Roadmap transformado em instrumento vivo: painel executivo, 28 critérios com ID, 18 evidências normalizadas, regra formal de promoção de marco e histórico versionado |
| D09 | [APMO v1.0 — Auditoria de Preservação da Memória Operacional](#d09) | 1.0 | 10/07/2026 | **Vigente** | Auditoria | Avalia se o ecossistema preserva, reconstrói e audita a memória operacional de uma obra |
| D10 | [Manual do Sistema](#d10) | — | — | **Vigente** | Operacional | Guia funcional de uso das telas, fluxos e regras operacionais do Atlas |
| D11 | [Relatório de Teste do Sistema](#d11) | — | — | **Parcial** | Auditoria | Registro dos testes executados sobre o sistema e das lacunas de cobertura |
| D12 | [README do Repositório](#d12) | — | — | **Vigente** | Técnica | Porta de entrada do repositório: stack, execução local e convenções |

### Distribuição por status

| Status | Documentos |
| --- | --- |
| Vigente | D01, D02, D06, D08, D09, D10, D12 |
| Parcial | D03, D04, D11 |
| Histórico | D07 |
| Aspiracional | D05 |

## 2. Sumário

- [1. Painel de Status Geral](#1-painel-de-status-geral)
- [2. Sumário](#2-sumário)
- [3. Contradições e leituras concorrentes](#3-contradições-e-leituras-concorrentes)
- [4. OPERA_CORE — Constituição Operacional](#d01)
- [5. Constituição Arquitetural v1.0](#d02)
- [6. Handover Técnico para Equipe de Desenvolvimento](#d03)
- [7. Mapeamento Funcional para Migração (Atlas · QFD-OS · Direcione)](#d04)
- [8. Modelo Empresarial, Governança LGPD e Mapa do Ecossistema](#d05)
- [9. Diagnóstico Objetivo — construído, faltante, arriscado](#d06)
- [10. Roadmap de Maturidade Empresarial (M0–M4)](#d07)
- [11. Governança de Maturidade Empresarial v1.1](#d08)
- [12. APMO v1.0 — Auditoria de Preservação da Memória Operacional](#d09)
- [13. Manual do Sistema](#d10)
- [14. Relatório de Teste do Sistema](#d11)
- [15. README do Repositório](#d12)
- [Anexo A — Memórias de projeto](#anexo-a--memórias-de-projeto)
- [Anexo B — Glossário e índice de invariantes](#anexo-b--glossário-e-índice-de-invariantes)

## 3. Contradições e leituras concorrentes

Reunir os documentos torna visíveis divergências que, isoladas, passavam despercebidas. Não são erros a corrigir — são leituras produzidas em momentos e com propósitos diferentes. A coluna "Prevalece" indica qual fonte usar ao decidir.

| # | Tensão | Documentos em conflito | Prevalece |
| --- | --- | --- | --- |
| C1 | O hash SHA-256 de fechamento é apresentado ora como prova jurídica consolidada, ora como campo nunca reproduzido por terceiro. | D03/D05 (narrativa de prova) × D06/D08 (bloqueador M1-02) | **D06/D08** — a capacidade existe em estrutura, não em evidência. Não vender como prova até haver reprodução verificada. |
| C2 | Governança LGPD descrita com RoPA, bases legais e direitos do titular, sem contrapartida em código. | D05 (Aspiracional) × D06 (§2 "AUSENTE") | **D06** — D05 é modelo-alvo, não estado. |
| C3 | Prazos otimistas de maturidade vs. leitura evidence-based do que está pronto. | D07 (4–6 semanas para M1) × D06 ("não vendável autônomo hoje") | **D08** — que já reformula os prazos como condicionados a existir 1 piloto ativo. |
| C4 | Preservação de memória tratada como resolvida pela invariante I11. | D01/D02 (I11, hashes imortais) × D09 (IPMO 44/100, NC-01 a NC-08) | **D09** — I11 cobre apenas `periodos_fechados`; cronograma, estoque, evidências e entidades-mestre seguem sem snapshot ou versionamento. |
| C5 | Evidência fotográfica citada como rastreável, mas o bucket `obra-fotos` é público e sem hash. | D01 §8 (risco reconhecido) × D05 (evidência como ativo probatório) | **D01 §8 + D09 NC-01** — a evidência hoje não tem cadeia de custódia. |
| C6 | Inventário de tabelas e módulos do Handover não inclui entregas posteriores (export CSV, aba Períodos, módulo de pesquisa). | D03 (Mai/2026) × código atual | **Código atual** — D03 é snapshot e está marcado Parcial por isso. |

<a id="d01"></a>

## 4. OPERA_CORE — Constituição Operacional

> **Status:** Vigente  
> **Camada:** Técnica / Governança  
> **Conceito:** Documento vinculante que define as 11 invariantes absolutas do sistema — não o que o sistema faz, mas o que ele jamais pode violar.  
> **Contexto:** Criado após o hardening de segurança e a introdução de periodos_fechados. É a autoridade máxima: em qualquer conflito entre documentos, prevalece este. Toda migration, RPC, RLS ou feature é checada contra ele antes de ser aceita.  
> **Origem:** `.lovable/OPERA_CORE.md` · **Versão:** 1.3 · **Data:** 30/05/2026

### OPERA_CORE

> Constituição operacional do sistema Opera/Atlas.
> Este documento não descreve o que o sistema faz.
> Descreve o que o sistema **jamais pode violar**.
>
> Versão: 1.3 — 2026-05-30
> Status: vinculante. Toda decisão de arquitetura, RLS, schema, UI ou IA
> deve ser checada contra este documento antes de ser aceita.

---

#### 1. Natureza

Opera é uma **infraestrutura operacional contextual** para operações físicas
(inicialmente construção civil), orientada por três princípios irredutíveis:

1. **Causalidade** — todo estado é consequência rastreável de eventos.
2. **Rastreabilidade** — toda ação relevante deixa trilha auditável.
3. **Soberania multi-tenant** — todo dado pertence a uma fronteira tenant; nada atravessa essa fronteira sem autorização explícita.

Não é ERP. Não é BI. Não é app de tarefas. Não é CRUD administrativo.
É o **motor de execução verificável** de operações físicas no tempo.

---

#### 2. Invariantes Absolutas

Estas regras são **inegociáveis**. Qualquer código, migration, RPC, edge function,
política RLS ou feature que as viole deve ser rejeitado, independente de prazo.

##### I1 — Fronteira de Tenant
Nenhum dado, função, RPC, storage object, log ou evento pode ser lido,
escrito ou inferido por usuário fora do `tenant_id` proprietário,
exceto por `is_super_admin = true` validado server-side.

##### I2 — Autoridade Server-Side
O cliente nunca é fonte de autoridade. `tenant_id`, `role`, `permissão`,
`fechamento`, `valor financeiro consolidado` — todos derivam de validação
server-side (RLS, RPC SECURITY DEFINER ou Edge Function autenticada).

##### I3 — Append-Only Histórico
Eventos operacionais (`audit_logs`, `audit_logs_db`, `registro_presencas`
após confirmação, `apontamento_diarias` após fechamento, `periodos_fechados`)
são **append-only**. Correção se faz por novo evento compensatório, nunca
por mutação destrutiva.

##### I4 — Irreversibilidade Temporal
Após `periodos_fechados.fechado_em` para um (tenant, obra, mês), nenhuma
escrita retroativa em `registro_presencas` ou `apontamento_diarias` daquele
período é permitida, exceto via reabertura formal registrada
(`reaberto_em`, `reaberto_por`, `motivo_reabertura`).

##### I5 — Lineage de Evidência
Toda evidência (foto, PDF, snapshot, anexo) carrega lineage:
`tenant_id`, `obra_id`, `criado_por`, `criado_em`, `evento_origem`.
Evidência sem lineage é inválida e deve ser rejeitada na entrada.

##### I6 — Permissão Contextual
Role nunca implica acesso global. Toda checagem de permissão é a interseção
de `(user, role, tenant_id, obra_id, momento)`. Nunca apenas `(user, role)`.

##### I7 — Reprodutibilidade de Estado
O estado financeiro e operacional consolidado de qualquer (tenant, obra, mês)
deve ser reconstruível a partir dos eventos primários armazenados. Cache,
RPC agregadora ou snapshot são **derivados**, nunca verdades.

##### I8 — Falha Segura
Diante de erro, ambiguidade de tenant, sessão instável ou autorização
incerta: **negar acesso e logar**. Nunca degradar para acesso permissivo.

##### I9 — Determinismo Financeiro
Cálculos que produzem valor monetário consolidado (folha, fechamento,
relatório) devem ser determinísticos: mesma entrada → mesma saída.
Nenhuma fonte de não-determinismo (ordem de array, `now()`, random) pode
afetar o número final.

##### I10 — Diferenciação de Estado Operacional
Toda informação operacional carrega seu **estado de certeza**:
`prevista`, `confirmada`, `consolidada`, `fechada`. UI, exports e cálculos
devem distinguir explicitamente esses estados. Misturar é proibido.

##### I11 — Reabertura é Evento, não Edição
Hashes de fechamento são **imortais**. Corrigir um período fechado nunca
pode ser uma edição silenciosa do hash anterior. Toda reabertura grava:
(a) cópia imutável do snapshot e hash anteriores em `periodos_reaberturas`,
(b) motivo textual obrigatório (≥ 20 caracteres), (c) autor, timestamp e
`correlation_id`. O refechamento gera **nova versão** (`versao = anterior + 1`)
e novo hash, encadeado via `causation_id` ao evento de reabertura. Apenas
uma versão pode estar ativa por (tenant, obra, mês); reabrir sem refechar
deixa o período em estado pendente, exibido como tal na UI.

---

#### 3. Entidades Fundamentais

Conceitos soberanos. Schema é implementação; isto é semântica.

| Entidade | Significado |
|---|---|
| **tenant** | Fronteira soberana de dados, identidade e governança. Unidade indivisível de isolamento. |
| **obra** | Contexto operacional físico. Pertence a exatamente um tenant. |
| **colaborador** | Sujeito da operação. Global ao tenant, vinculável a múltiplas obras. |
| **role** | Capacidade contextual `(user, tenant)`. Nunca global. |
| **registro de presença** | Evento operacional primário com estado de certeza (`prevista`/`confirmada`). |
| **apontamento de diária** | Ajuste contábil fracionário sobre presença. |
| **período fechado** | Barreira temporal irreversível por (tenant, obra, mês). |
| **evidência** | Prova rastreável (foto, anexo, snapshot) com lineage obrigatório. |
| **evento de auditoria** | Registro append-only de ação relevante. |
| **workflow** | Transição governada de estado entre eventos. |
| **snapshot de fechamento** | Materialização determinística do estado consolidado. |

---

#### 4. Modelo de Confiança

| Sujeito | Confiança | Quando | Validação |
|---|---|---|---|
| Cliente (browser) | Zero | Nunca | Toda asserção é re-validada server-side |
| `auth.uid()` | Total | Após JWT verificado pelo Supabase | Implícita |
| `tenant_id` do JWT | **Não confiar** | — | Sempre derivar via `get_user_tenant_id(auth.uid())` |
| Role declarada pelo cliente | Zero | Nunca | Sempre via `has_role(auth.uid(), …)` |
| Storage público (`obra-fotos`) | Leitura sim, autorização **não** | Nunca para escrita/delete | DELETE/UPDATE exigem owner ou admin do tenant |
| Edge function sem JWT verificado | Zero | Nunca | `verify_jwt = false` exige validação manual no corpo |
| `is_super_admin` | Total | Após `is_super_admin(auth.uid())` server-side | Nunca a partir de profile lido pelo cliente |

**Regra de ouro:** se a checagem pode ser feita no banco, é feita no banco.
RLS é a primeira linha. Código é a segunda. UI é cosmética.

---

#### 5. Modelo Temporal

Tempo no Opera não é `timestamp`. É **estado de certeza** sobre um instante.

```
prevista ──confirmação──► confirmada ──fechamento──► consolidada ──reabertura──► confirmada
   │                          │                          │
   │                          │                          └─► imutável até reabertura formal
   │                          └─► editável dentro do período aberto
   └─► substituível livremente
```

Regras:
- `prevista` nunca aparece em valor financeiro consolidado sem rótulo explícito.
- `confirmada` é a única base válida para folha em período aberto.
- `consolidada` (dentro de `periodos_fechados`) é imutável; só reabertura registrada permite edição.
- Relatórios e PDFs devem sempre exibir o estado temporal do dado.

---

#### 6. Modelo de Causalidade

| Ação | Gera evento? | Reversível? | Exige evidência? | Exige trilha? |
|---|---|---|---|---|
| Registrar presença | Sim | Sim (até fechamento) | Não | Sim (audit_logs_db) |
| Confirmar presença prevista | Sim | Sim (até fechamento) | Não | Sim |
| Apontar diária (ajuste) | Sim | Sim (até fechamento) | Recomendado | Sim |
| Fechar período | Sim | Apenas via reabertura formal | Sim (snapshot_json + hash) | Sim |
| Reabrir período | Sim | Não (fica no histórico) | Sim (motivo) | Sim |
| Excluir obra | Sim (soft delete) | Sim (restaurar) | Não | Sim |
| Adicionar/remover role | Sim | Sim | Não | Sim (audit_logs) |
| Gerar reset de senha | Sim | — | — | Sim |

Toda ação que altera estado financeiro ou de autorização **deve** gerar
evento auditável. Ação sem trilha é bug de arquitetura, não de feature.

---

#### 7. Limites Arquiteturais

Opera **não é** e **não deve se tornar**:

- ERP financeiro genérico (contas a pagar/receber não relacionados a obra).
- Rede social corporativa (chat, feed, reações).
- BI genérico (dashboards de métricas arbitrárias sem causalidade operacional).
- App de tarefas (todo-list desacoplado de workflow operacional).
- CRM.
- Plataforma de automação genérica sem causalidade rastreável.
- CRUD administrativo sem invariante operacional por trás.

Toda feature proposta deve responder: **qual invariante operacional ela
serve?** Se a resposta for "nenhuma, é só conveniência", a feature não
pertence ao núcleo — pode virar plugin, extensão ou nada.

---

#### 8. Soberania Atual (estado honesto, 2026-05-14)

| Camada | Controle atual | Risco | Mitigação futura |
|---|---|---|---|
| Auth | Supabase (gerenciado via Lovable Cloud) | Lock-in alto | Abstrair via interface; manter export de usuários |
| Banco (Postgres) | Supabase | Lock-in médio (Postgres é portável; RLS específico) | Migrations versionadas em git permitem rebuild |
| Storage (`obra-fotos`) | Supabase, bucket público de leitura | Evidência exposta por URL adivinhável | Mover para signed URLs ou bucket privado |
| Edge Functions | Lovable/Supabase | Acoplamento Deno + ambiente proprietário | Manter funções pequenas e portáveis |
| Logs aplicacionais | `system_events` + `audit_logs` com `correlation_id`/`causation_id`; libs `src/lib/observability.ts` e `supabase/functions/_shared/observability.ts`. Todas as edge functions (`accept-invite`, `beta-signup`, `data-retention`, `session-transfer`, `generate-reset-link`, `gantt-list`, `gantt-update-task`) propagam `x-correlation-id` e logam transições/denials/falhas. | Mutações financeiras feitas direto do cliente (`registro_presencas`, `apontamento_diarias`, atividades Gantt) ainda não estão sistematicamente envolvidas por `traced()` | Próximo: retrofit das chamadas cliente em F1.5 (junto com Frente 3) |
| Logs DB | `audit_logs_db` via triggers, com `correlation_id`/`causation_id` lidos opportunisticamente de `current_setting('opera.correlation_id', true)`. Helper `set_correlation_context(uuid,uuid)` disponível para RPCs propagarem lineage. | Sem helper invocado, triggers gravam `NULL` — sem fallback inventado (preserva I8). | RPCs financeiras (`folha_pagamento`, futura `reabrir_periodo`, futura `congelar_baseline`) devem aceitar `_correlation_id` e chamar `set_correlation_context` no topo. |
| Backups | Supabase automático | Sem teste de restore | Testar restore trimestral |
| Deploy | Lovable | Lock-in de pipeline | Aceitável nesta fase |
| Domínio | `opera-atlas.lovable.app` | Sem domínio próprio | Migrar para domínio próprio antes do piloto pago |

---

#### 9. Critérios de Aceitação (toda mudança passa por aqui)

Antes de aceitar qualquer PR, migration ou feature, responder:

1. Viola alguma invariante de §2? → **Rejeitar.**
2. Quebra a fronteira de tenant em algum caminho? → **Rejeitar.**
3. Cria estado consolidado sem evento primário rastreável? → **Rejeitar.**
4. Mistura estados temporais (prevista/confirmada/consolidada) sem rótulo? → **Rejeitar.**
5. Confia no cliente para dado de autorização? → **Rejeitar.**
6. Adiciona feature fora dos limites de §7? → **Rejeitar ou mover para fora do core.**
7. Aumenta lock-in sem necessidade? → **Discutir antes.**

---

#### 10. Manutenção deste documento

- Mudanças neste arquivo exigem versão incrementada e nota de mudança ao final.
- Toda invariante removida ou enfraquecida deve ter justificativa explícita.
- Novas invariantes podem ser adicionadas; remoção exige consenso.

##### Histórico

- **1.0 — 2026-05-14** — Versão inicial. Codifica estado pós-hardening de segurança e introdução de `periodos_fechados` + `status_contabil`.
- **1.1 — 2026-05-14** — Observabilidade causal introduzida: `system_events`, `correlation_id`/`causation_id` em `audit_logs*`, RPC `log_system_event`, libs cliente/edge. Atualiza §8 (sistema nervoso observável passa a existir).
- **1.2 — 2026-05-30** — Conclusão da camada causal (Frente 1, parcial): todas as edge functions instrumentadas (entry, denials, falhas, sucessos); trigger `fn_audit_log_changes` agora lê `current_setting('opera.correlation_id', true)` opportunisticamente; helper `set_correlation_context(uuid, uuid)` disponível para RPCs herdarem lineage dentro da transação. Cliente ainda pendente — será amarrado em F1.5.

- **1.3 — 2026-05-30** — Frente 3 (Reabertura Formal). Nova invariante I11: hashes imortais e versionamento de `periodos_fechados` (`versao` + índice único parcial em `reaberto_em IS NULL`). Tabela append-only `periodos_reaberturas` (somente admin lê, mutação só via RPCs SECURITY DEFINER). RPCs `reabrir_periodo`, `refechar_periodo`, `listar_historico_periodo` com `_correlation_id` opcional, exigindo motivo ≥ 20 chars + role admin + acesso à obra; eventos `periodo.reaberto` e `periodo.refechado` em `system_events`+`audit_logs` com causation chaining. UI admin: tab "Períodos" com banner de pendência, dialog com keyword `REABRIR <MES>`, timeline de versões.

<a id="d02"></a>

## 5. Constituição Arquitetural v1.0

> **Status:** Vigente  
> **Camada:** Governança de produto  
> **Conceito:** Leis permanentes da arquitetura do produto (P1–P10), contratos públicos imutáveis, processo de RFC e matriz de impacto Patch/Minor/Major.  
> **Contexto:** Nasceu da constatação de que o OPERA_CORE governa o sistema, mas nada governava a evolução do produto. Define o que só muda com versão Major e qual checklist precede qualquer release.  
> **Origem:** `OPERA_Atlas_Constituicao_Arquitetural_v1.0.pdf` · **Versão:** 1.0 · **Data:** 06/07/2026

| Versão | 1.0 |
| --- | --- |
| Data | 06/07/2026 |
| Autoridade | Documento supremo — rege OPERA_CORE, Governança, Roadmap, Diagn |
| Alteração | Somente via RFC aprovada (§19) |
| Escopo | OPERA Atlas — arquitetura, contratos e política de evolução |

### 1. Preâmbulo

Esta Constituição define as leis permanentes do OPERA Atlas. Ela separa o que pode evoluir livremente daquilo que não pode ser quebrado sem autorização explícita. Sua autoridade prevalece sobre qualquer outro documento do projeto. Ordem de precedência em caso de conflito: 1. Constituição Arquitetural (este documento) 2. OPERA_CORE v1.3 (invariantes de domínio) 3. Governança de Maturidade v1.1 (critérios de promoção) 4. Roadmap de Maturidade v1.0 (marcos) 5. Diagnóstico Objetivo (estado observado) 6. Modelo Empresarial (definição de negócio) Alteração desta Constituição só ocorre por emenda constitucional aprovada pelo processo formal de RFC (§19). Qualquer código, migration, decisão de produto ou release que viole esta Constituição é considerado defeituoso, independentemente de funcionar em produção.

### 2. Arquitetura em Camadas

O Atlas se organiza em quatro camadas com dependência estritamente descendente. +-----------------------------------------------------------+ | INTERFACE React 18 + Vite 5 + Tailwind + shadcn | +-----------------------------------------------------------+ | APLICACAO hooks, services, react-query, forms | +-----------------------------------------------------------+ | DOMINIO invariantes I1-I11, regras, tipos | +-----------------------------------------------------------+ | INFRAESTRUTURA Supabase: Postgres, RLS, RPC, Edge, Auth | +-----------------------------------------------------------+ Regra da dependência descendente: Domínio nunca conhece Aplicação. Aplicação nunca conhece Interface. Nenhuma camada superior acessa Infraestrutura sem passar pelo cliente Supabase encapsulado em src/integrations/supabase/client.ts. Violar esta regra é motivo automático de rejeição de código (§18).

### 3. Princípios Arquiteturais Obrigatórios

Os princípios P1–P10 são cláusulas pétreas. Quebra de qualquer princípio exige emenda constitucional (§19) — não RFC comum.

| ID | Princípio | Regra |
| --- | --- | --- |
| P1 | Tenant-isolation por RLS | Nenhuma consulta cliente confia em filtros locais para separar tenants. RLS é a única fronteira legítima. |
| P2 | Soft-delete padrão | Entidades de domínio usam deleted_at. Nunca DELETE físico em obras, colaboradores, presenças, financeiro. |
| P3 | Server-derived truth | tenant_id, user_id e role derivam de auth.uid() no server via SECURITY DEFINER — nunca do payload do cliente. |
| P4 | Hash determinístico | Fatos financeiros consolidados produzem SHA-256 sobre payload canonicalizado. Mesmo input, mesmo hash, sempre. |
| P5 | Causalidade rastreável | Toda mutação com efeito jurídico/financeiro grava correlation_id e causation_id em system_events. |
| P6 | Presenças imutáveis com estado contábil | registro_presencas usa status_contabil (prevista/confirmada/ajustada). Alteração material após a data promove para ajustada, nunca sobrescreve. |

| ID | Princípio | Regra |
| --- | --- | --- |
| P7 | Sessão apenas via Supabase Auth nativo | Zero IndexedDB/localforage para sessão. Histórico: causou refresh loops em mobile. |
| P8 | Zero Service Worker / PWA | Vetados por histórico de stale cache. Novos service workers registrados devem ser proativamente desregistrados. |
| P9 | Roles em tabela separada | user_roles é a única fonte de papéis. Nunca em profiles. Verificação sempre via has_role() SECURITY DEFINER. |
| P10 | Design tokens semânticos | Cores, gradientes e sombras vivem em index.css como tokens. Nenhuma cor hex hardcoded em componente. |

### 4. Regras de Evolução do Banco de Dados

- Toda mudança de schema ocorre por migration versionada. Não existe DDL manual em produção.

- CREATE TABLE public.* é sempre acompanhado, na mesma migration, de: GRANT por role → ENABLE ROW

→ LEVEL SECURITY CREATE POLICY.

- Colunas obrigatórias em tabelas de domínio: id, tenant_id, created_at, updated_at. deleted_at

quando aplicável (P2).

- Migrations não removem colunas sem cumprir a política de depreciação (§12).

→ → → →

- Renames de coluna seguem o padrão add backfill dual-write read-switch drop.

- Vedado ALTER DATABASE postgres.

- Validações dependentes de tempo (ex. expire_at > now()) vivem em trigger, nunca em CHECK constraint.

- Toda migration executa em transação. Falha parcial não deixa schema inconsistente.

### 5. Regras de Versionamento

Atlas adota SemVer (Major.Minor.Patch) tanto para o produto quanto para cada contrato público.

| Nível | Significado | Exige RFC? |
| --- | --- | --- |
| Major | Quebra de contrato público (RPC, edge, schema PostgREST, hash de fechamento). | Sim, obrigatório |
| Minor | Adição retrocompatível: nova coluna nullable, novo parâmetro opcional, nova rota, nova RPC. | Opcional (recomendado se toca contrato) |
| Patch | Correção sem mudar contrato: bugfix, otimização, ajuste de estilo. | Não |

Documentos regidos por esta Constituição versionam separadamente mas seguem a mesma classificação. Exemplo: OPERA_CORE v1.3 → v2.0 exige emenda; Governança v1.1 → v1.2 aceita RFC comum.

### 6. Política de Breaking Changes

Uma mudança é breaking quando qualquer uma destas condições ocorre:

- Remove ou renomeia campo em resposta de RPC ou edge function pública.

- Muda tipo de campo de forma não-coerciva.

- Altera semântica de invariante existente (I1–I11 do OPERA_CORE).

- Remove policy RLS que outros contratos assumem ativa.

- Faz folha_pagamento retornar hash diferente para o mesmo input canônico.

- Muda ordem ou nome de coluna em CSV público exportado.

Toda breaking change exige, cumulativamente: 1. RFC aprovada conforme §19. 2. Incremento de versão Major. 3. Janela de depreciação mínima de 90 dias com contrato antigo ativo em paralelo. 4. Migration path documentado e testado. 5. Notificação a clientes ativos em produção antes do prazo final.

### 7. Contratos Públicos Entre Módulos

Contratos públicos só mudam segundo §6. Contratos privados mudam livremente em Patch/Minor.

| Tipo | Contratos considerados públicos |
| --- | --- |
| Funções DB | folha_pagamento · verificar_hash_periodo · reabrir_periodo · refechar_periodo · validar_fechamento · promover_previsoes · dashboard_aggregates · has_role · has_any_role · user_has_obra_access · get_user_tenant_id · is_super_admin · setup_tenant · listar_historico_periodo · eficiencia_presenca · produtividade_por_equipe · log_system_event |
| Edge functions | export-csv · data-retention · toda edge com URL pública documentada |
| Tabelas PostgREST | Todas as tabelas em schema public com policies observáveis pelo cliente autenticado |
| Eventos | Formato de linhas em system_events: event_type · source · payload · severity · correlation_id · causation_id |
| Hash de fechamento | Payload canonicalizado + algoritmo SHA-256 + campos incluídos no hash |
| Design tokens | Nomes de tokens semânticos em index.css consumidos por shadcn (ex. --primary, --destructive, --muted) |

Contratos privados (mudam em Minor sem RFC): componentes React internos, hooks, tabelas sem exposição PostgREST, colunas com prefixo _internal , memórias em .lovable/memory/* , documentação e conteúdo de landing pages.

### 8. Modelo Oficial de Eventos

Padrão único, gravado em system_events: event_type verbo.entidade.qualificador (ex. periodo.reaberto) source rpc.<nome> | edge.<nome> | trigger.<nome> | client.<area> correlation_id uuid da transacao logica (mesmo em multiplos passos) causation_id evento que causou este (encadeamento causal) tenant_id derivado no server via get_user_tenant_id(auth.uid()) actor_id auth.uid() ou NULL para system-level payload jsonb canonicalizado (chaves ordenadas) severity info | warn | error status success | failure | partial duration_ms integer opcional Toda mutação de estado com efeito jurídico ou financeiro obrigatoriamente emite pelo menos um evento. RPCs de fechamento (reabertura, refechamento) emitem eventos em cascata com causation_id apontando ao evento pai. A ausência de evento correspondente a uma mutação registrada em audit_logs_db é um bug de observabilidade (§13).

### 9. Modelo Oficial de Snapshots

Snapshot = fotografia imutável de um fato consolidado em um período. É a unidade de prova jurídica do Atlas.

- folha_pagamento(obra, ini, fim) é o gerador canônico de snapshot.

- Ao fechar período, periodos_fechados guarda snapshot_json + hash_snapshot (SHA-256).

- Reabertura preserva a versão anterior em periodos_reaberturas — append-only, jamais UPDATE.

- Refechamento gera nova versão (versao + 1), nunca sobrescreve a anterior.

⇒

- Regra do hash reproduzível: mesmo input canônico mesmo SHA-256, indefinidamente. Quebrar essa

garantia exige §6.

- A função verificar_hash_periodo(id) reexecuta e compara — retorno integro=true é a prova de

integridade.

### 10. Modelo Oficial de Identidade das Entidades

- Toda entidade primária: id uuid PRIMARY KEY DEFAULT gen_random_uuid().

- Toda entidade multi-tenant: tenant_id uuid NOT NULL.

- Identificadores de negócio (CNPJ, matrícula, código interno) nunca servem como PK — apenas como coluna

indexada.

- Referências entre entidades: sempre UUID + FK explícita com ON DELETE deliberado.

- IDs de artefatos de governança seguem prefixo estável: critérios M0-01…M4-XX, evidências E-01…E-XX, RFCs

RFC-XXXX, invariantes I1…I11, princípios P1…P10.

- IDs uma vez atribuídos nunca são reciclados, mesmo após revogação.

### 11. Política de Compatibilidade Retroativa

- Aditividade preferida: campos novos opcionais nunca quebram cliente.

- Respostas de RPC aceitam campos extras — clientes ignoram o desconhecido.

- Cliente tolera qualquer versão dentro do mesmo Major sem falhar em runtime.

- Cliente falha explicitamente apenas ao encontrar Major diferente do esperado.

- Testes de contrato validam retrocompatibilidade antes de release Minor.

### 12. Política de Depreciação

- Contrato depreciado é marcado com @deprecated na documentação + sinal em runtime: header

X-Deprecated: <motivo> para edge functions, evento rpc.deprecated_call em system_events para RPCs DB.

- Janela mínima: 90 dias para contratos públicos · 30 dias para privados.

- Remoção só após: prazo cumprido + zero uso no período (verificado em system_events) + RFC de remoção

aprovada.

- Contrato depreciado permanece funcional durante toda a janela — sinalização não é desativação.

### 13. Política de Observabilidade

- Todo RPC público loga em audit_logs (efeito de negócio) e/ou system_events (evento causal). Efeito

jurídico/financeiro exige ambos.

- correlation_id é propagado do cliente ao DB via set_correlation_context() no início da transação.

- Erros server-side registram stack + payload sanitizado (sem PII).

- Métricas mínimas monitoradas: latência p95 de RPCs críticas (fechamento, folha), taxa de erro, volume por tipo

de evento, hash mismatches em verificar_hash_periodo.

- Débito reconhecido: monitoramento Sentry ainda não ativo (M2-02). Governa §7 do Roadmap.

### 14. Política de Auditoria

- Toda tabela de domínio com efeito financeiro/jurídico carrega trigger fn_audit_log_changes gravando em

audit_logs_db (INSERT/UPDATE/DELETE + old_data + new_data).

- Reabertura de período registra: motivo (mín. 20 caracteres), autor, correlation_id, snapshot anterior íntegro.

- Alteração de valor_diaria_usado bloqueada após 7 dias exceto admin (fn_protect_snapshot).

- Período fechado + reaberto = registros lado a lado. Nunca sobrescrita, nunca UPDATE destrutivo.

- Log de auditoria é append-only. Trigger de proteção impede DELETE em audit_logs_db.

### 15. Política de Performance

Limites duros. Violação = bug, não trade-off.

| Área | Limite | Ação em caso de violação |
| --- | --- | --- |
| Dashboard | ≤ 15 queries por render | Consolidar em RPC (ex. dashboard_aggregates) |
| Fechamento | ≤ 3s para 1 obra × 1 mês | Otimizar folha_pagamento ou dividir período |
| N+1 | Zero N+1 sobre colaboradores, obras, presenças | Substituir por join server-side |
| Bulk | Operações em lote via RPC dedicada | Nunca loops de INSERT/DELETE no cliente |
| Payload | Respostas ≤ 2MB por request | Paginar ou filtrar server-side |

### 16. Política de Segurança

- RLS obrigatório em toda tabela public.*. Migration que criar tabela sem policy é inválida.

- Verificação de role administrativa sempre via has_role() ou is_super_admin() — SECURITY DEFINER.

- Nunca checar admin em localStorage, sessionStorage ou payload cliente.

- Secrets vivem em env de edge function. Nunca no bundle cliente.

- publishable_key / anon_key podem viver em código.

- service_role_key jamais é referenciado no cliente e jamais é logado.

- Toda edge function pública valida JWT antes de qualquer efeito colateral.

- Auth exclusivamente via Supabase Auth nativo. Nenhum fluxo paralelo de sessão.

### 17. Critérios de Aceitação de Nova Funcionalidade

Uma funcionalidade só entra em main quando cumpre todos os critérios: 1. Encaixa em uma única camada (§2) sem violar a dependência descendente. 2. Não viola nenhum princípio P1–P10. 3. Traz teste ou justificativa registrada por que não trouxe. 4. Se toca DB: migration + GRANT + RLS + policies na mesma migration. 5. Se toca contrato público (§7): RFC aprovada (§19). 6. Sem cor hex hardcoded; usa design tokens (P10). 7. Se toca fluxo com efeito jurídico: emite evento em system_events (P5).

### 18. Critérios de Rejeição Automática

Qualquer código com uma destas características é rejeitado sem discussão:

| Sintoma | Princípio violado |
| --- | --- |
| localStorage/IndexedDB usado para sessão | P7 |
| Registro de Service Worker ou plugin PWA | P8 |
| Coluna nova sem tenant_id em tabela multi-tenant | P1 · §4 |
| Filtro de tenant apenas no client | P1 · P3 |
| Cor hex ou classe de cor genérica em componente | P10 |
| Campo role em profiles ou users em vez de user_roles | P9 |
| Check de admin sem has_role() ou is_super_admin() | P9 · §16 |
| UPDATE que sobrescreve fato financeiro fechado | §9 · §14 |
| CREATE TABLE sem GRANT + RLS + policy | §4 · §16 |
| ALTER DATABASE postgres em migration | §4 |

### 19. Processo Formal de RFC (Request for Change)

Toda mudança em contrato público ou princípio arquitetural passa por RFC. Estrutura mínima: RFC-XXXX Titulo curto imperativo Autor <nome> Data AAAA-MM-DD Status draft | review | approved | rejected | superseded 1. Motivacao por que agora, o que dor especifica resolve 2. Proposta contrato antes / depois (schema, RPC, endpoint) 3. Alternativas consideradas e por que descartadas 4. Impacto preencher matriz do §21 5. Migration path passos ordenados, reversiveis quando possivel 6. Compatibilidade conforme §11 7. Depreciacao janela + sinalizacao conforme §12 8. Aprovacao minimo 1 admin + 1 revisor arquitetural

RFCs vivem em .lovable/rfcs/RFC-XXXX.md. Diretório a criar em pedido futuro.

### 20. Fluxo Oficial de Evolução Arquitetural

Ideia | v Discussao (issue / conversa) | v RFC draft -----------> Rejeitada (fim) | v Review (admin + arquiteto) | v Aprovacao | v Implementacao (migration + codigo + teste) | v Checklist pre-release §23 | v Release (Patch / Minor / Major) | v Registro em Governanca §7 (historico de evolucao)

### 21. Matriz de Impacto Arquitetural

Cada mudança encontra-se em uma célula. Em caso de dúvida, escalar para a direita (§22).

| Dimensão | Patch | Minor | Major |
| --- | --- | --- | --- |
| Schema | Índice, comentário, backfill de dados | Nova coluna nullable, nova tabela | Remove/rename coluna, muda tipo, quebra FK |
| RPC pública | Bugfix sem mudar shape do retorno | Novo parâmetro opcional, novo campo no retorno | Remove função, muda tipo/shape de retorno |
| Edge pública | Bugfix interno, ajuste de log | Novo endpoint, novo header opcional | Muda contrato de request/response existente |
| RLS | Ajuste equivalente semanticamente | Nova policy permissiva adicional | Restringir acesso previamente concedido |
| UI | Ajuste de estilo, texto, ícone | Nova tela, novo card, novo card KPI | Remove rota, muda URL, remove funcionalidade |
| Invariante (I1–I11) | — | — | Sempre Major. Exige emenda constitucional |
| Princípio (P1–P10) | — | — | Sempre Major. Exige emenda constitucional |
| Hash de fechamento | — | — | Sempre Major. Exige plano de re-verificação de todos os fechamentos existentes |

### 22. Classificação de Mudanças

Regra prática de bolso: → →

- Em caso de dúvida, escalar (Patch Minor, Minor Major). Nunca escalar para baixo.

- Se o cliente precisa mudar código para continuar funcionando, é Major.

- Se o cliente pode ignorar a mudança sem consequência, é Patch ou Minor.

- Se você não sabe classificar, é Major até prova em contrário.

### 23. Checklist Obrigatório Pré-Release

Um release não sai sem todos os itens marcados. Itens não aplicáveis são justificados na mensagem de release.

| # | Item | Como validar |
| --- | --- | --- |
| 1 | Migrations aplicadas em staging | Ambiente espelho + smoke test |
| 2 | bun run build sem erros | Log do build limpo |
| 3 | Testes existentes verdes | bunx vitest run |
| 4 | Se toca DB: supabase linter sem avisos novos | supabase--linter |
| 5 | Se toca contrato público: RFC linkada no PR | Link RFC-XXXX no corpo do PR |
| 6 | Histórico da Governança §7 atualizado | Nova linha em v1.x |
| 7 | Sem console.error novo no fluxo principal | QA em preview |
| 8 | Design tokens respeitados (sem hex hardcoded) | grep por padrão hex fora de index.css |
| 9 | Se toca fluxo financeiro: hash reproduzido em ambiente de teste | verificar_hash_periodo() = integro=true |
| 10 | Eventos causais emitidos onde esperado (P5) | SELECT em system_events do fluxo |

### 24. Critérios para Congelamento Arquitetural

Áreas podem ser declaradas congeladas: nenhuma mudança sem emenda constitucional (não bastam RFC comum + Major). Congelamento existe para proteger prova jurídica e integridade histórica.

| Área congelada | Gatilho de congelamento | Estado atual |
| --- | --- | --- |
| Hash de fechamento | Primeira execução em cliente pago (M1-01) | Não congelado ainda |
| Estrutura de periodos_fechados | Idem | Não congelado ainda |
| Estrutura de periodos_reaberturas | Idem | Não congelado ainda |
| Contrato de folha_pagamento | Idem | Não congelado ainda |
| Modelo de eventos em system_events | Após 90 dias de estabilidade em produção | Não congelado ainda |
| Invariantes I1–I11 | Este documento (v1.0) | Congeladas — mudança exige emenda |

Congelamento é ato formal: exige RFC que altere esta seção da Constituição.

### 25. Relação Entre Documentos

| Documento | O que governa | Sujeito a |
| --- | --- | --- |
| Constituição Arquitetural v1.0 | Como o Atlas pode mudar | Emenda via RFC (§19) |
| OPERA_CORE v1.3 | Invariantes de domínio (I1–I11) | Constituição §3, §24 |
| Modelo Empresarial | O que o Atlas é (definição de negócio) | Constituição §17 |
| Diagnóstico Objetivo | Onde o Atlas está hoje | Reflete estado real, evidence-based |
| Roadmap de Maturidade v1.0 | Marcos M0–M4 | Constituição §21 |

| Documento | O que governa | Sujeito a |
| --- | --- | --- |
| Governança de Maturidade v1.1 | Como medir evolução continuamente | Constituição §20 |
| RFCs | Propostas individuais de mudança | Constituição §19 |

### 26. Assinatura Constitucional

Esta Constituição é a única fonte de autoridade sobre a arquitetura do OPERA Atlas. Qualquer código, migration, decisão de produto ou release que a viole é considerado defeituoso, independentemente de funcionar em produção. Sua alteração exige emenda formal aprovada por RFC. Sua interpretação, em caso de conflito com qualquer outro documento do projeto, prevalece.

<a id="d03"></a>

## 6. Handover Técnico para Equipe de Desenvolvimento

> **Status:** Parcial  
> **Camada:** Técnica  
> **Conceito:** Documentação de continuidade: stack, invariantes, inventário de tabelas, RPCs críticas, guia de migração de backend e checklists.  
> **Contexto:** Produzido para permitir que uma equipe externa assuma a operação, inclusive em cenário de migração de backend. Status Parcial: descreve o estado de Mai/2026 — export CSV, aba Períodos e módulo de pesquisa foram adicionados depois.  
> **Origem:** `Atlas_OPERA_Handover_v1.pdf` · **Versão:** 1.0 · **Data:** 30/05/2026

Versão 1.0 · OPERA_CORE v1.3 · Maio/2026

### 1. Sumário Executivo

Atlas (codinome interno: Opera) é uma infraestrutura operacional contextual para operações físicas — inicialmente construção civil — cujo propósito é transformar eventos de campo em estado financeiro auditável e juridicamente defensável. Não é ERP, não é BI, não é app de tarefas: é a camada de verdade que alimenta esses sistemas. Stack atual: Frontend: React 18 + Vite 5 + TypeScript 5 + Tailwind CSS v3 + shadcn/ui •

- Backend gerenciado: Supabase (via Lovable Cloud) — Postgres 15, GoTrue Auth, Edge Functions

(Deno), Storage

- Observabilidade: tabela append-only system_events + audit logs em DB

→

- Pipeline: Lovable deploy preview e produção (opera-atlas.lovable.app)

Estado de maturidade (Mai/2026): OPERA_CORE v1.3 vigente. Frente 1 (camada causal) e Frente 3 (reabertura formal) concluídas. Frente 2 (baseline temporal de cronograma) pendente.

### 2. Constituição OPERA_CORE — Invariantes

### Absolutas

Estas 11 invariantes são vinculantes. Qualquer migração de backend deve preservá-las textualmente — não como diretrizes, mas como contratos. O documento canônico vive em .lovable/OPERA_CORE.md.

| # | Nome | Síntese |
| --- | --- | --- |
| I1 | Fronteira de Tenant | Nenhum dado atravessa tenant_id sem autorização server-side. |
| I2 | Autoridade Server-Side | Cliente é zero-confiança. Tudo re-validado via RLS/RPC. |
| I3 | Append-Only Histórico | Eventos não mutam. Correção é evento compensatório. |
| I4 | Irreversibilidade Temporal | Período fechado bloqueia escrita exceto via reabertura formal. |
| I5 | Lineage de Evidência | Toda evidência carrega tenant/obra/autor/origem ou é rejeitada. |
| I6 | Permissão Contextual | Role é (user, tenant, obra, momento). Nunca global. |
| I7 | Reprodutibilidade de Estado | Estado consolidado deve ser reconstruível dos eventos primários. |
| I8 | Falha Segura | Ambiguidade ⇒ negar e logar. Nunca degradar permissivamente. |
| I9 | Determinismo Financeiro | Mesma entrada ⇒ mesma saída. Hash SHA-256 é prova. |
| I10 | Diferenciação de Estado | prevista/confirmada/consolidada/fechada nunca se misturam. |
| I11 | Reabertura é Evento | Hashes são imortais. Reabrir grava snapshot anterior + versão nova. |

Não-negociáveis em qualquer migração: I1, I2, I4, I9, I11.

### 3. Arquitetura Macro

Três camadas, uma regra: se a checagem pode ser feita no banco, é feita no banco. → → Frontend (zero confiança) Edge Functions (validação + side-effects) Postgres (RLS + RPCs SECURITY DEFINER + triggers). Toda chamada propaga x-correlation-id e gera evento causal em system_events.

#### Mapa de pastas

| Caminho | Conteúdo |
| --- | --- |
| src/ | App React. Componentes em components/, páginas em pages/, libs em lib/. |
| src/lib/observability.ts | Helper cliente para propagar correlation_id. |
| src/lib/payrollRules.ts | Regras determinísticas de cálculo de folha (espelho do DB). |
| src/integrations/supabase/ | Client e tipos auto-gerados. NUNCA editar manualmente. |
| supabase/migrations/ | Histórico cronológico de toda mudança de schema (verdade do DB). |
| supabase/functions/ | Edge Functions Deno. _shared/ contém observability comum. |
| .lovable/OPERA_CORE.md | Constituição. Lei suprema do sistema. |
| .lovable/memory/ | Notas arquiteturais por domínio (auth, payroll, multi-tenancy...). |

Diagrama Mermaid completo disponível como artefato anexo (Atlas_Architecture.mmd).

### 4. Modelo de Dados — Núcleo

Apenas as tabelas com peso semântico. Schema completo em src/integrations/supabase/types.ts.

| Tabela | Função | Estratégias |
| --- | --- | --- |
| tenants | Fronteira soberana de dados. | PK uuid. Trial 30d. |
| profiles | Perfil do usuário ligado a auth.users. | FK user_id. Global ao tenant. |
| user_roles | Roles contextuais (user, tenant, role). | Enum app_role. Lido via has_role(). |
| obras | Contexto operacional físico. | Soft delete (deleted_at). FK tenant. |
| colaboradores | Sujeitos da operação. | Global ao tenant. Soft delete. |
| registro_presencas | Evento primário de presença. | status_contabil + snapshot_valor. Bloqueio por período fechado. |
| apontamento_diarias | Ajuste fracionário sobre presença. | Mesmas regras de presença. |
| periodos_fechados | Barreira temporal por (tenant, obra, mês). | Coluna versao + snapshot_json + hash SHA-256. |
| periodos_reaberturas | Histórico append-only de reaberturas. | Snapshot+hash anteriores. Imutável. |
| atividades | Tarefas do cronograma (Gantt). | FK obra. Bloqueio por período fechado. |
| atividade_dependencias | Arestas do grafo de dependência. | Validação de ciclo via trigger. |
| cronograma_baseline | Linha de base congelada. | Para Frente 2 — evidência de prazo. |
| system_events | Trilha causal append-only. | correlation_id + causation_id. |
| audit_logs / audit_logs_db | Trilha de auditoria DB e app. | Triggers em tabelas críticas. |

### 5. RLS e Autorização

Modelo de roles armazenado em tabela separada (user_roles) — nunca em profiles. Checagem via função SECURITY DEFINER, evitando recursão de RLS. Roles disponíveis: super_admin, admin_tenant, gestor_obra, operador, leitor. Padrões de política: Tabelas de tenant: tenant_id = get_user_tenant_id(auth.uid()) •

- Tabelas auth-only: auth.uid() = user_id

- Tabelas de roles: leitura via has_role(auth.uid(), 'X')

Tabelas com período: bloqueio adicional via JOIN com periodos_fechados em • INSERT/UPDATE/DELETE Grants obrigatórios em toda nova tabela pública (sem isso PostgREST nega): GRANT SELECT, INSERT, UPDATE, DELETE ON public.<tabela> TO authenticated; GRANT ALL ON public.<tabela> TO service_role;

### 6. RPCs Críticas — Contrato Funcional

| Assinatura | Propósito | Invariante |
| --- | --- | --- |
| folha_pagamento(_tenant, _obra, _mes, _correlation_id?) | Calcula folha determinística do período. Retorna linhas + hash SHA-256. | Determinismo I9. Hash baseado em (colaborador_id, valor, data) ordenado. |
| validar_fechamento(_tenant, _obra, _mes) | Checa pré-condições para fechar período (sem 'prevista', sem ajustes pendentes). | Bloqueia fechamento se houver registros futuros (I10). |
| fechar_periodo(_tenant, _obra, _mes) | Persiste snapshot + hash em periodos_fechados. Ativa bloqueio I4. | Versao = 1. Apenas admin do tenant. |
| reabrir_periodo(_tenant, _obra, _mes, _motivo, _correlation_id?) | Copia snapshot/hash atual para periodos_reaberturas e marca período como reaberto. | Motivo ↔ 20 chars. Causation: gera evento periodo.reaberto. |
| refechar_periodo(_tenant, _obra, _mes, _correlation_id?) | Recalcula folha, incrementa versao, gera novo hash, encadeia via causation_id. | Versao = anterior + 1. Hashes anteriores permanecem imortais (I11). |
| listar_historico_periodo(_tenant, _obra, _mes) | Timeline de versões: quem fechou/reabriu, quando, hash e motivo. | Apenas admin do tenant. |
| has_role(_user_id, _role) / has_any_role(_user_id, roles[]) | Checagem SECURITY DEFINER de role contextual ao tenant atual. | Usado em RLS sem causar recursão. |
| log_system_event(...) / set_correlation_context(corr, caus) | Persiste evento causal e injeta lineage na transação para triggers. | Base da observabilidade v1.2. |

### 7. Observabilidade Causal (v1.2)

Toda ação relevante gera um evento em system_events com correlation_id (ID da operação macro do usuário) e causation_id (evento imediatamente anterior na cadeia). Propagação: Cliente: src/lib/observability.ts injeta header x-correlation-id em todas as chamadas • fetch. Edge: supabase/functions/_shared/observability.ts recebe e re-propaga o header em • chamadas internas.

- DB: trigger fn_audit_log_changes lê current_setting('opera.correlation_id',

true).

- RPCs: chamam set_correlation_context(corr, caus) no topo para alimentar a transação.

Reprodução de incidente: a partir de um correlation_id, uma query em system_events reconstrói toda a cadeia causal — do clique inicial até o último write em DB.

### 8. Domínios Funcionais

#### 8.1 Folha de Pagamento

Estados contábeis (I10) — exibidos com cor distinta na UI e em exports:

| Estado | Cor | Significado |
| --- | --- | --- |
| prevista | ■ amarelo | Registro futuro ou não confirmado. Nunca entra em consolidado. |
| confirmada | ■ azul | Confirmada em período aberto. Base válida para folha. |
| ajustada | ■ laranja | Alterada após data original. Requer trilha. |
| fechada | ■ verde | Dentro de período fechado. Imutável. |

≠ Breakdown financeiro obrigatório: Base Presença + Ajuste + Legado = Total. Se total soma simples, ■ UI exibe badge ajuste com tooltip do delta.

#### 8.2 Cronograma — Gantt como Evidência

Tabelas atividades, atividade_dependencias e cronograma_baseline. RLS bloqueia edição de atividades que caem em mês presente em periodos_fechados. Edge Functions gantt-list e gantt-update-task validam server-side e devolvem flag readonly.

#### 8.3 Multi-Tenant

Setup via RPC dedicada (cria tenant + admin + obra inicial). Sistema de convites com token e expiração. Trial 30 dias. Retenção pós-trial executada por data-retention edge function.

### 9. Edge Functions — Inventário

| Função | Auth | Função |
| --- | --- | --- |
| accept-invite | JWT | Aceita convite e vincula usuário ao tenant. |
| beta-signup | Anon (rate-limited) | Inscrição na waitlist + WhatsApp. |
| data-retention | Service role | Job de limpeza pós-trial e soft delete. |
| session-transfer | JWT | QR code de transferência de sessão entre dispositivos. |
| gantt-list | JWT | Lista atividades + dependências com flag readonly por mês fechado. |
| gantt-update-task | JWT | Atualiza atividade respeitando bloqueio temporal. |
| generate-reset-link | Service role | Gera link de reset de senha (admin). |

Todas instrumentadas com createEdgeObservability() — logam entry, denial, erro e sucesso em system_events.

### 10. Guia de Migração de Backend

#### 10.1 Requisitos mínimos do novo backend

Banco: Postgres-compatível (preferível) ou DB com triggers + função SHA-256 determinística • disponível. Auth: JWT-based, com claim de user_id e sessão verificável server-side. •

- Autorização: mecanismo equivalente a RLS (row-level policies) que permita JOIN com tabela de

períodos.

- Funções: equivalente a SECURITY DEFINER — execução com privilégios do owner, isolando RLS.

- Logs: capacidade de tabela append-only com índice em correlation_id.

Storage: buckets com policies por path/tenant. •

#### 10.2 Ordem de migração sugerida

| Fase | Escopo | Validação |
| --- | --- | --- |
| 1. Schema + Grants | Replicar migrations cronologicamente. Garantir GRANTs. | psql \dt deve listar todas as tabelas. |
| 2. RLS | Aplicar políticas por tenant + período fechado. | Teste cross-tenant deve negar. |
| 3. RPCs financeiras | folha_pagamento + validar/fechar/reabrir/refechar. | Hash idêntico ao ambiente atual com mesmos dados. |
| 4. Triggers | snapshot_valor + status_contabil + audit_logs_db. | INSERT em presença gera snapshot. |
| 5. Edge Functions | Portar Deno para runtime equivalente (Bun, Node, Workers). | Headers x-correlation-id devem persistir. |
| 6. Frontend client | Substituir src/integrations/supabase/client.ts. | Build + smoke tests passam. |

#### 10.3 Pontos de risco críticos

- Determinismo do hash (I9): ordering (ORDER BY explícito), encoding UTF-8, locale numérico,

formato de data ISO-8601. Qualquer divergência invalida prova jurídica.

- SECURITY DEFINER: garantir que function owner tem privilégios mínimos e search_path explícito.

current_setting('opera.correlation_id', true): equivalente em outros DBs (variáveis de sessão). •

- Append-only enforcement (I3, I11): revogar UPDATE/DELETE em periodos_reaberturas e

system_events para roles regulares.

- Cross-tenant leakage: auditar TODA query nova com EXPLAIN — JOIN sem filtro de tenant é

catástrofe.

#### 10.4 Testes de aceitação obrigatórios

- Forense: alterar R$ 0,01 num registro fechado e provar que hash invalida.

→

- Temporal: tentar UPDATE em registro de mês fechado erro de RLS.

Tenant: usuário do tenant A tentando SELECT em obra do tenant B → 0 linhas. •

- Causal: uma ação macro produz cadeia rastreável em system_events do início ao fim.

- Reabertura: reabrir + refechar produz nova versão sem apagar a anterior.

### 11. Operação Diária

#### Fechamento mensal

Admin acessa Admin → Períodos. • →

- Executa validar_fechamento corrige pendências (registros 'prevista' devem ser confirmados

ou removidos). →

- Executa fechar_periodo snapshot + hash persistidos.

- Hash exibido na UI deve ser conferido contra export PDF.

#### Reabertura formal

Aba Períodos → identifica período fechado → clica em Reabrir. •

- Preenche motivo (mínimo 20 caracteres) e confirma via keyword REABRIR <MES>.

- Banner laranja sinaliza pendência de refechamento até admin executar refechar_periodo.

Timeline mostra todas as versões com hash e autor. •

### 12. Riscos Conhecidos e Débitos Técnicos

| Item | Risco | Mitigação |
| --- | --- | --- |
| Frente 2 (baseline temporal) | Cronograma ainda não tem evidência de prazo congelada. | Implementar congelamento de baseline + diff vs realizado. |
| Mutações cliente sem traced() | registro_presencas e apontamento_diarias direto do cliente. | Retrofit F1.5: envolver mutações em traced(). |
| Storage obra-fotos público de leitura | URL adivinhável expõe evidência. | Migrar para signed URLs. |
| Sem domínio próprio em produção | opera-atlas.lovable.app dificulta sair do Lovable. | Adquirir e configurar domínio antes de piloto pago. |
| Sem teste trimestral de restore | Backups Supabase nunca foram restaurados de fato. | Agendar restore drill. |

### 13. Apêndices

#### A. Índice de arquivos-chave

.lovable/OPERA_CORE.md — Constituição (v1.3) •

- .lovable/memory/index.md — Índice de notas por domínio

- .lovable/memory/architecture/period-reopening.md — Reabertura formal

.lovable/memory/architecture/causal-observability.md — Padrões de propagação •

- .lovable/memory/architecture/workforce-financial-logic.md — Lógica de folha

- supabase/migrations/ — Verdade do schema (51 migrations)

src/components/admin/PeriodosFechadosTab.tsx — UI de fechamento/reabertura •

- src/components/cronograma/GanttBoard.tsx — Gantt como evidência

#### B. Glossário

| Termo | Significado |
| --- | --- |
| Snapshot | Materialização determinística do estado consolidado de um período. |
| Hash imortal | SHA-256 de um período fechado que nunca é sobrescrito — versão nova gera novo hash. |
| Status contábil | Estado de certeza de um registro: prevista, confirmada, ajustada, fechada. |
| Correlation ID | Identificador da operação macro do usuário, propagado ponta-a-ponta. |
| Causation ID | Evento imediatamente anterior na cadeia causal — forma o DAG transacional. |
| Lineage | Conjunto de metadados (tenant/obra/autor/origem) obrigatório em toda evidência. |
| Soft delete | Marcação via deleted_at em vez de DELETE físico. |
| RLS | Row-Level Security do Postgres — políticas por linha aplicadas pelo DB. |

#### C. Checklist de Handover

DevOps

- Acesso ao Supabase project (ou backend equivalente)

Acesso ao repositório Git com histórico completo •

- Secrets/env vars documentados (rodar compgen -e na infra atual)

- Pipeline de deploy reproduzível fora do Lovable

Segurança

- Lista de roles e usuários super_admin auditada

Buckets de Storage e suas policies revisados •

- Rotação de chaves JWT planejada

Dados

- Dump completo do DB com schema + dados

- Restore drill executado em ambiente isolado

Verificação de hashes de fechamentos pós-restore • Frontend Build local funcional sem Lovable •

- Testes manuais dos fluxos críticos (login, presença, folha, fechamento, reabertura, Gantt)

- src/integrations/supabase/types.ts regenerado contra novo backend

— FIM DO DOCUMENTO —

<a id="d04"></a>

## 7. Mapeamento Funcional para Migração (Atlas · QFD-OS · Direcione)

> **Status:** Parcial  
> **Camada:** Técnica / Negócio  
> **Conceito:** Para cada um dos três motores: problema resolvido, informações consumidas e produzidas, invariantes críticas, dependência do Core e risco de impacto.  
> **Contexto:** Base para decidir a ordem de migração do ecossistema (Atlas → QFD-OS → Direcione). Status Parcial: apenas o Atlas existe em código; QFD-OS e Direcione são especificação, não implementação.  
> **Origem:** `OPERA_Atlas_Mapeamento_Migracao_v1.pdf` · **Versão:** 1.0 · **Data:** 10/06/2026

Versão 1 · 10 de junho de 2026 · Documento técnico interno Camada de verdade operacional do Canteiro de Obras Digital. Livro-razão imutável regido pelas 11 invariantes do OPERA_CORE v1.3.

### Sumário Executivo

Este documento mapeia os três motores incluídos na migração imediata do ecossistema Canteiro de Obras Digital. Cada motor é descrito por seu problema, entradas, saídas, regras críticas, acoplamento ao OPERA Core e risco operacional. O objetivo é permitir que uma equipe de desenvolvimento externa execute a migração preservando integralmente as invariantes do OPERA_CORE v1.3. Escopo desta migração

- OPERA Atlas (core) — cronograma, folha, fechamento e reabertura de períodos.

- QFD-OS — motor de detecção de incoerências entre plano e realidade.

- Direcione Operacional — orquestrador de missões, integração futura com Atlas.

Fora deste escopo (migração posterior)

- Smart Cotações, Vaga Quente, Stockflow e demais motores satélites.

- Camada comercial (landing, waitlist, billing) — não afeta a verdade operacional.

Contrato não-negociável: as 11 invariantes OPERA_CORE Qualquer migração que viole uma destas invariantes deve ser rejeitada, independente de prazo. Destaque para as que regem a integridade do Atlas:

- I1 — Fronteira de Tenant: nenhum dado atravessa tenant sem autorização server-side.

- I2 — Autoridade Server-Side: cliente nunca é fonte de verdade (RLS/RPC/Edge).

- I4 — Irreversibilidade Temporal: períodos fechados só mudam via reabertura formal.

- I9 — Determinismo Financeiro: mesma entrada produz mesmo hash SHA-256.

- I11 — Reabertura é Evento: hashes são imortais; correção gera nova versão encadeada.

OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 2

### Parte I — Mapeamento dos Motores

#### 1. OPERA Atlas (Core)

Problema que resolve Transformar a execução física de uma obra em evidência operacional auditável: registrar quem trabalhou, quando, quanto custou, e congelar essa verdade em períodos imutáveis que sustentam folha, contabilidade e disputas jurídicas. Informações que consome

| Fonte | Tipo de dado |
| --- | --- |
| Registro de presença (UI/mobile) | Eventos primários por colaborador/obra/dia, com estado prevista→confirmada. |
| Apontamento de diárias | Ajustes fracionários (ex.: 0,5 diária) sobre presença. |
| Cronograma (Gantt) | Atividades, dependências, datas planejadas e baseline congelada. |
| Solicitações de fechamento | Trigger administrativo mensal por (tenant, obra, mês). |
| Solicitações de reabertura | Motivo textual ↔20 chars + role admin + keyword de confirmação. |

Informações que produz

| Saída | Consumidor |
| --- | --- |
| Folha de pagamento (RPC folha_pagamento) | UI financeira, relatórios PDF/XLSX, contabilidade externa. |
| Snapshot + hash SHA-256 de fechamento | Tabela periodos_fechados; prova jurídica de determinismo. |
| Histórico de versões (periodos_reaberturas) | Auditoria, timeline admin, motores downstream. |
| Eventos causais (system_events) | Observabilidade, QFD-OS, Direcione, BI futuro. |
| Audit log append-only (audit_logs_db) | Compliance, forensics, reconstrução de estado. |

Regras de negócio críticas

- I1 (Fronteira de Tenant): toda RPC valida get_user_tenant_id(auth.uid()); nada do cliente

é confiável.

- I2 (Autoridade Server-Side): folha e fechamento são SECURITY DEFINER — UI apenas exibe.

- I4 (Irreversibilidade Temporal): após periodos_fechados.fechado_em,

INSERT/UPDATE/DELETE em presença daquele mês é bloqueado por RLS.

- I9 (Determinismo Financeiro): cálculo da folha é puro; ordering, locale e timestamps não entram no

hash.

- I11 (Reabertura como Evento): reabrir grava snapshot+hash antigos em

periodos_reaberturas; refechar gera versao+1, encadeado por causation_id.

- Apenas uma versão ativa por (tenant, obra, mês) — garantido por índice único parcial em

reaberto_em IS NULL. Dependência do OPERA Core: N/A — é o próprio core. Risco de impacto na migração OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 3

Crítico / total. Se o Atlas quebrar: folha para de fechar, períodos perdem garantia de imutabilidade, QFD-OS perde baseline, Direcione perde marcos, e toda evidência operacional fica indisponível. Migração de Atlas é condição necessária para tudo o mais. → Abas de UI relacionadas: Organização (mão de obra), Análise Contínua (financeiro), Cronograma, Admin Períodos. OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 4

#### 2. QFD-OS — Quality Function Deployment Operacional

Problema que resolve Detectar em tempo de execução incoerências entre o plano (baseline do Atlas) e a realidade do canteiro — por exemplo, uma etapa-gatilho iniciada sem que o pré-requisito tenha sido confirmado — antes que o desvio vire custo ou retrabalho. Informações que consome

| Fonte | Tipo de dado |
| --- | --- |
| Atlas — cronograma_baseline | Plano congelado: sequência prevista, dependências, marcos. |
| Atlas — atividades + atividade_dependencias | Estado corrente das atividades e arestas do grafo. |
| Atlas — system_events | Stream causal de transições operacionais. |
| Regras configuráveis (por tenant) | Ex.: 'etapa X não pode iniciar sem Y confirmada'. |
| site_activity_log | Eventos brutos de campo (apontamentos, fotos, check-ins). |

Informações que produz

| Saída | Consumidor |
| --- | --- |
| field_events com severidade (info/warn/critical) | UI Análise Contínua, Ações Corretivas, notificações. |
| Alertas de incoerência plano×real | Direcione (priorização), gestor de obra. |
| Indicadores de aderência ao baseline | Dashboard OPERA Score, relatórios executivos. |

Regras de negócio críticas

- I1 (Fronteira de Tenant): regras e eventos sempre escopados por tenant_id.

- Invariante própria: site_activity_log é append-only e imutável — espelha a filosofia I3 do

Atlas.

- Regras são dados, não código — versionadas por tenant para auditoria.

- QFD-OS não escreve em tabelas do Atlas; apenas lê baseline e emite eventos próprios.

- Severidade critical deve referenciar o evento causal de origem (correlation_id) para

forense. Dependência do OPERA Core: Alta. Sem cronograma_baseline e system_events do Atlas, o QFD-OS perde sua referência de plano e seu stream causal — vira heurística cega. Risco de impacto na migração Médio-alto. Se o QFD-OS cair: a operação continua (Atlas mantém verdade financeira), mas perde-se a capacidade preditiva — desvios só são detectados no fechamento mensal, tarde demais para corrigir. Recomenda-se manter um modo degradado de regras estáticas durante a janela de migração. Abas de UI relacionadas: Análise Contínua, Ações Corretivas, Padronização, Eficiência. OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 5

#### 3. Direcione Operacional

Problema que resolve Transformar alertas, marcos e desvios em missões priorizadas entregues à pessoa certa, no momento certo — eliminando a lacuna entre 'o sistema sabe que há um problema' e 'alguém está agindo sobre ele'. Informações que consome

| Fonte | Tipo de dado |
| --- | --- |
| Missões basais (catálogo interno) | Rotinas recorrentes por papel (encarregado, almoxarife, gestor). |
| Missões críticas (eventos externos) | Geradas a partir de alertas QFD-OS e marcos Atlas. |
| Atlas — marcos próximos (futuro) | Atividades com data planejada ≤ N dias e ainda não iniciadas. |
| QFD-OS — eventos critical (futuro) | Incoerências que exigem ação imediata. |
| Contexto do usuário (papel, obra, turno) | Filtro de elegibilidade da missão. |

Informações que produz

| Saída | Consumidor |
| --- | --- |
| Fila de missões priorizadas por usuário | App mobile do operador, painel do gestor. |
| Score de priorização (propagação) | UI Direcione, métricas de execução. |
| Trilha de aceite/execução/conclusão | Auditoria, indicadores de engajamento, OPERA Score. |

Regras de negócio críticas

- I1 (Fronteira de Tenant): missões e fila sempre por tenant_id.

- I6 (Permissão Contextual): elegibilidade = (usuário, papel, obra, momento) — nunca apenas papel.

- Score de priorização é determinístico por entrada — facilita debug e auditoria.

- Hoje opera independente do Atlas; migração deve preservar a interface (contrato de eventos) para

integração futura sem retrabalho.

- Conclusão de missão é evento auditável — não pode ser apagada, apenas substituída por

compensação. Dependência do OPERA Core: Baixa hoje · Média no roadmap. Atualmente Direcione roda com catálogo próprio e contexto de usuário. A dependência cresce quando passar a consumir marcos do Atlas e alertas do QFD-OS — daí a importância de migrar preservando o contrato de eventos. Risco de impacto na migração Baixo no curto prazo. Se o Direcione cair: operadores perdem a fila guiada, mas Atlas e QFD-OS continuam intactos; a operação opera em modo manual com checklists. Médio no médio prazo: sem Direcione, o valor preditivo do QFD-OS não chega ao operador de campo, reduzindo o ROI dos demais motores. Abas de UI relacionadas: Ações Corretivas, Segurança & Qualidade, Checklist Semanal. OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 6

### Parte II — Síntese e Ordem de Migração

#### Tabela-resumo: dependências e riscos

| Motor | Dep. Atlas | Risco se cair | Orde m | Pré-requisitos técnicos |
| --- | --- | --- | --- | --- |
| OPERA Atlas | N/A (core) | Crítico — para tudo | 1º | Postgres-compatible, RLS, JWT, SHA-256 determinístico, SECURITY DEFINER, append-only logs. |
| QFD-OS | Alta | Médio-alto — perde predição | 2º | Acesso de leitura ao baseline e a system_events; tabela própria append-only. |
| Direcione | Baixa hoje / Média futuro | Baixo curto / médio médio | 3º | Contrato de eventos preservado; catálogo de missões versionado por tenant. |

#### Recomendação de ordem

→ → Atlas QFD-OS Direcione. A ordem segue o acoplamento real, não o valor percebido:

- Atlas primeiro porque é a fonte de verdade. Sem hashes imortais e RLS funcionando, qualquer

dado downstream é especulação.

- QFD-OS em seguida porque consome o baseline do Atlas. Migrar antes do Atlas estar estável

produziria falsos positivos em massa.

- Direcione por último porque hoje é independente — pode rodar em paralelo durante toda a

migração e só absorve a integração com Atlas/QFD-OS após estabilização. Congelamento arquitetural durante a janela de migração Durante a migração, aplicar a regra: apenas correções, apenas observabilidade, apenas uso real, apenas coleta de evidências. Nenhuma expansão de escopo até que os três motores estejam validados no novo backend com os testes de aceitação abaixo passando. Testes de aceitação mínimos (qualquer backend) →

- Adulteração de R$ 0,01 em presença de período fechado bloqueada por RLS.

- Tentativa de leitura cross-tenant → bloqueada e logada em audit_logs.

→

- Recálculo de folha sobre o mesmo input hash SHA-256 idêntico.

↔20 →

- Reabertura sem motivo chars rejeitada com erro explícito.

- QFD-OS gera critical com correlation_id rastreável até evento Atlas de origem.

OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 7

### Parte III — OPERA Atlas como Estrutura

### Empresarial

#### 1. Conceito e proposta de valor

OPERA Atlas é a infraestrutura de evidência operacional do canteiro digital. Não é ERP, não é BI, não é app de tarefas: é o livro-razão imutável que transforma execução física em fato auditável. Sua proposta de valor é converter operação em dado defensável — em folha, em disputa trabalhista, em seguro, em financiamento.

#### 2. Direção estratégica

Atlas é a condição de existência dos demais motores do ecossistema Canteiro de Obras Digital. Qualquer camada de IA, BI, cotação inteligente ou orquestração só tem valor se consumir dados que não podem ter sido adulterados depois do fato. O posicionamento estratégico é claro: Atlas é a spinal cord; tudo o mais é músculo.

#### 3. Objetivos mensuráveis

| Indicador | Meta operacional |
| --- | --- |
| % de períodos fechados sem reabertura | ↔ 95% |
| Tempo médio entre evento e gravação em audit_logs | < 1s (p95) |
| Determinismo de hash em recálculo idempotente | 100% |
| Taxa de detecção QFD-OS sobre desvios reais (recall) | ↔ 80% após 90d de regras maduras |
| Cobertura causal (eventos com correlation_id) | 100% das mutações financeiras (meta F1.5) |

#### 4. Processos operacionais

→ → → → O ciclo canônico do Atlas é Registrar Fechar Rastrear Corrigir Refechar:

- Registrar: presença e apontamentos entram como eventos com estado de certeza.

- Fechar: RPC determinística calcula folha, gera snapshot+hash, marca período imutável.

- Rastrear: system_events e audit_logs_db permitem reconstruir qualquer estado.

- Corrigir: reabertura formal exige motivo, role admin e keyword de confirmação.

- Refechar: nova versão encadeada via causation_id; hash antigo permanece imortal.

#### 5. Critérios de decisão, priorização e controle

Toda decisão de produto, arquitetura ou feature é filtrada pelas 7 perguntas de aceitação do OPERA_CORE §9: viola invariante? quebra fronteira de tenant? cria consolidado sem evento primário? mistura estados temporais? confia no cliente? está fora dos limites? aumenta lock-in? Qualquer 'sim' = rejeitar, independente de prazo comercial.

#### 6. Pontos de integração com outros sistemas

- Header x-correlation-id: propagado por todas as Edge Functions; permite tracing fim-a-fim.

- RPCs SECURITY DEFINER: única superfície de escrita autorizada para dados financeiros.

OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 8

- Tabela system_events: contrato append-only com qualquer motor downstream (QFD-OS,

Direcione, futuro BI).

- Helper set_correlation_context: permite RPCs herdarem lineage causal dentro da transação.

- Storage com policy por tenant: evidências (fotos, anexos) com lineage obrigatório (I5).

#### 7. Potencial de escala, automação e monetização

- Escala: multi-tenant nativo; isolamento por RLS escala horizontalmente sem refator.

- Automação: stream causal habilita IA preditiva (próximos desvios, próximos custos) sem

comprometer determinismo do core.

- Monetização B2B: fechamentos imutáveis viabilizam produtos de evidência jurídica (disputas

trabalhistas), seguro paramétrico (atrasos comprovados) e crédito de obra (progresso auditável). Cada um desses verticais paga pela camada de verdade que o Atlas já produz.

- Lock-in invertido: como o Atlas produz evidência exportável, o cliente fica preso ao valor, não à

plataforma — ativo comercial. OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 9

### Apêndices

#### A. Glossário

| Termo | Definição |
| --- | --- |
| Invariante | Regra inegociável do OPERA_CORE. Violação = rejeitar PR/migração. |
| Snapshot de fechamento | Materialização determinística do estado consolidado de (tenant, obra, mês). |
| Hash imortal | SHA-256 do snapshot; preservado mesmo após reabertura (I11). |
| correlation_id | ID único que amarra todos os eventos de uma mesma intenção do usuário. |
| causation_id | ID do evento que causou o evento atual; forma a cadeia causal. |
| Estado de certeza | Rótulo temporal: prevista / confirmada / consolidada / fechada (I10). |
| SECURITY DEFINER | Função Postgres que roda com privilégios do dono — bypassa RLS controladamente. |

#### B. Checklist mínimo de migração por motor

OPERA Atlas

- Schema + GRANTs + RLS replicados e testados.

- RPCs financeiras com hash SHA-256 produzindo output idêntico ao backend atual.

- Triggers de audit_logs_db com leitura de current_setting('opera.correlation_id',

true).

- Bloqueio de escrita em períodos fechados validado por teste de aceitação.

↔20

- Reabertura formal exigindo motivo chars + role admin.

QFD-OS

- Acesso de leitura ao baseline do Atlas configurado e isolado por tenant.

- Tabela site_activity_log imutável (append-only) replicada.

- Regras configuráveis versionadas por tenant.

- Eventos critical carregando correlation_id de origem.

Direcione Operacional

- Catálogo de missões basais migrado e versionado.

- Contrato de eventos com Atlas/QFD-OS documentado (mesmo que ainda não consumido).

- Score de priorização determinístico validado.

- Trilha de aceite/conclusão append-only.

— Fim do documento — OPERA Atlas — Mapeamento Funcional para Migração · v1 · 2026-06-10 Página 10

<a id="d05"></a>

## 8. Modelo Empresarial, Governança LGPD e Mapa do Ecossistema

> **Status:** Aspiracional  
> **Camada:** Negócio / Jurídico  
> **Conceito:** Taxonomia de stakeholders, RoPA e bases legais LGPD, classificação de dados, matriz de permissões e mapa de integração com produtos futuros.  
> **Contexto:** Fecha a lacuna de negócio/governança das versões técnicas anteriores. Status Aspiracional: o Diagnóstico Objetivo (D06) confirma que a governança LGPD descrita aqui não tem contrapartida em código — sem tabela de classificação, sem RoPA, sem função de titular.  
> **Origem:** `OPERA_Atlas_Modelo_Empresarial_v2.pdf` · **Versão:** 2.0 · **Data:** 15/06/2026

Documento complementar ao Mapeamento Tecnico de Migracao (v1). Cobre as camadas de negocio, stakeholders, hierarquia organizacional, permissoes, LGPD operacional, classificacao de dados e arquitetura de produtos do ecossistema.

| Versao | v2.0 - 2026-06-15 |
| --- | --- |
| Status | Vinculante para decisoes de produto e contratuais |
| Documento base | OPERA_CORE v1.3 (constituicao operacional) |
| Audiencia | Arquiteto, Investidor, Juridico/DPO, Cliente Enterprise |
| Autor | Eduardo Martins / OPERA Atlas |

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 1

### 1. Sumario Executivo

O PDF v1 (Mapeamento de Migracao) descreve como migrar o backend do OPERA Atlas preservando suas invariantes. Este documento v2 descreve o que o Atlas e como produto empresarial: quem sao os atores, como o dado e classificado e governado, qual a matriz de permissoes formal, como a LGPD se materializa operacionalmente e onde o Atlas se encaixa no ecossistema OPERA (Control, Stockflow, Smart Cotacoes, QFD-OS, Direcione, Vaga Quente, PDIC). Para quem e cada secao

| Audiencia | Secoes prioritarias |
| --- | --- |
| Arquiteto / Eng. Senior | §2 Stakeholders · §4 Entidades · §5 Permissoes · §8 Eventos Humanos |
| Investidor | §1 Sumario · §3 Hierarquia · §9 Ecossistema · §10 Roadmap |
| Juridico / DPO | §6 LGPD · §7 Classificacao · §10 Roadmap (LGPD) |
| Cliente Enterprise / Comprador | §2 Stakeholders · §5 Permissoes · §6 LGPD · §10 Roadmap |
| Equipe Dev OPERA | Todas. v2 deve ser lida em conjunto com OPERA_CORE.md e PDF v1. |

Principio orientador O Atlas e a camada de verdade operacional do Canteiro de Obras Digital. Toda decisao de produto, RLS, contrato ou integracao deve poder ser justificada por uma invariante de OPERA_CORE e por uma figura desta v2 (stakeholder, papel LGPD, entidade canonica). Quando os dois nao conversam, e o produto que esta errado

- nao o modelo.

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 2

### 2. Modelo Canonico de Stakeholders

Stakeholder e qualquer ator com expectativa legitima sobre o estado de uma obra ou tenant. A arvore abaixo e normativa: todo papel novo proposto deve ser localizavel como folha ou variante de uma destas categorias. 2.1 Arvore por Tenant Tenant (fronteira soberana - Invariante I1) | +-- Cliente Final (contrata a obra; futuro acesso "guest") +-- Construtora (controlador tipico; opera o tenant) +-- Empreiteira (executa escopo; tenant proprio ou convidado) +-- Fornecedor (entrega insumos; via Stockflow / Smart Cotacoes) +-- Prestador / Terceirizado (mao-de-obra eventual; presenca registrada) +-- Equipe OPERA (suporte e super_admin; acesso auditado) 2.2 Arvore por Obra Obra (contexto operacional fisico - pertence a exatamente 1 tenant) | +-- Contratos (escopo, aditivos, valor - aditivos_contratuais) +-- Equipes (agrupamento produtivo - equipe_normalizada) +-- Colaboradores (sujeitos da operacao - colaboradores + colaborador_obras) +-- Terceirizados (subset de colaboradores com vinculo distinto) +-- Fornecedores (lote_materiais, consumo_materiais, compras_emergenciais) +-- Equipamentos (ativos) +-- Insumos (lote_materiais, lotes_consumo) +-- Evidencias (fotos, anexos - lineage obrigatorio I5) 2.3 Mapa de stakeholder x dado x RLS

| Stakeholder | Dado primario | Dono logico | Politica RLS atual |
| --- | --- | --- | --- |
| Cliente Final | Visao de obra, relatorios | Construtora (tenant) | Nao implementado - futuro: guest read-only |
| Construtora | Tenant inteiro | Propria | tenant_id + role admin/gestor |
| Empreiteira | Subset de obras | Construtora ou propria | obra_membros (acesso por obra) |
| Fornecedor | Cotacoes, entregas | Construtora | Nao exposto - entra via Smart Cotacoes |
| Prestador | Presencas, diarias | Construtora | colaborador_obras + role operacional |
| Equipe OPERA | Suporte cross-tenant | OPERA Ltda | is_super_admin server-side |

Implicacao para o backend: qualquer novo stakeholder exige (a) decisao sobre isolamento (mesmo tenant, sub-tenant, convidado) e (b) policy RLS escrita antes do primeiro insert. Stakeholder sem RLS = vazamento por design. OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 3

### 3. Hierarquia Organizacional

Hoje o conceito de tenant e plano: 1 tenant = 1 organizacao operando 1 ou N obras. Empresas reais raramente sao planas. Esta secao formaliza dois cenarios canonicos que o Atlas deve suportar (atual ou evolutivamente) e o gap ate la. 3.1 Cenario A - Construtora Verticalizada Grupo Empresarial +-- Construtora (entidade juridica) +-- Filial / Regional +-- Obra +-- Frentes / Etapas 3.2 Cenario B - Cliente contrata Empreiteira Cliente Contratante (incorporadora, industria, etc.) +-- Empreiteira (executora) +-- Obra +-- Subempreiteiros 3.3 Mapeamento atual x alvo

| Camada logica | Hoje | Alvo (Fase Enterprise) |
| --- | --- | --- |
| Grupo / Holding | Nao modelado | Tabela organizations + tenant.parent_id |
| Construtora / Empreiteira | = tenant | = tenant (mantem) |
| Filial / Regional | Nao modelado | Atributo opcional em obras ou sub-tenant |
| Obra | obras (1:N com tenant) | Mantem - chave operacional |
| Etapa / Frente | atividades (Gantt) | Mantem - ciclos_tarefa + atividades |

3.4 Plano de evolucao (sem quebrar I1) Sub-tenants e holdings devem ser introduzidos preservando a Invariante I1 (fronteira de tenant). Recomendacao:

| 1. | Criar tabela organizations (holding) com FK opcional em tenants.organization_id. |
| --- | --- |
| 2. | Funcao get_user_org_id(uuid) SECURITY DEFINER, analoga a get_user_tenant_id. |
| 3. | Visoes consolidadas (BI) so para role org_admin; nunca dado bruto cross-tenant. |
| 4. | Migracao progressiva: tenants sem org_id continuam funcionando identicos a hoje. |

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 4

### 4. Modelo Canonico de Entidades Empresariais

Modelo compartilhavel entre todos os produtos do ecossistema OPERA. Cada entidade tem dono definido (qual produto e a fonte de verdade) e consumidores (quais produtos leem). Mesmo nome em todo o ecossistema = integracao natural. 4.1 Entidades canonicas

| Entidade | Definicao | Tabela Atlas |
| --- | --- | --- |
| Organizacao | Holding ou grupo (camada acima do tenant - futuro) | organizations (planejada) |
| Tenant | Fronteira juridica e de isolamento de dados | tenants |
| Cliente | Quem contrata a obra (pode ser o proprio tenant) | Atributo em obras (cliente_nome) |
| Contrato | Escopo formal entre cliente e tenant | obras + aditivos_contratuais |
| Obra | Contexto operacional fisico | obras |
| Etapa | Subdivisao temporal de obra (Gantt) | atividades, ciclos_tarefa |
| Equipe | Agrupamento produtivo | equipe_normalizada (GENERATED) |
| Colaborador | Sujeito da operacao (CLT, terceirizado, prestador) | colaboradores |
| Fornecedor | Origem de insumo ou servico | lote_materiais.fornecedor |
| Equipamento | Ativo fisico utilizado na obra | ativos |
| Insumo | Material consumivel | lote_materiais, lotes_consumo |
| Evidencia | Prova rastreavel (foto, anexo, snapshot) | obra-fotos + lineage I5 |
| Periodo Fechado | Barreira temporal (mes x obra) | periodos_fechados + periodos_reaberturas |

4.2 Quem produz x quem consome

| Entidade | Produz | Consome |
| --- | --- | --- |
| Colaborador | Atlas | Control, Direcione, Vaga Quente, PDIC |
| Presenca / Diaria | Atlas (via Control mobile) | Atlas (folha), PDIC, Direcione |
| Periodo Fechado | Atlas | PDIC, BI externo, Power BI |
| Insumo / Estoque | Stockflow | Atlas (consumo), Smart Cotacoes |
| Cotacao | Smart Cotacoes | Stockflow, Atlas |
| Cronograma (Gantt) | Atlas | Direcione, PDIC, QFD-OS |
| Indicador de Qualidade | QFD-OS | Atlas (checklist), PDIC |
| Decisao / Plano | Direcione | Atlas (workflow), Equipe operacional |

Regra de ouro de integracao: nenhum produto consumidor deve replicar a logica do produtor. Quem precisa de folha consome o snapshot consolidado do Atlas - nao recalcula. Recalcular fora viola I7 (Reprodutibilidade) e I9 (Determinismo). OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 5

### 5. Matriz Formal de Permissoes

Expansao explicita da Invariante I6 (Permissao Contextual). Cada papel e definido pela intersecao (user, role, tenant_id, obra_id, momento) - nunca apenas (user, role). 5.1 Matriz canonica (alvo)

| Papel | Ver | Editar | Aprovar | Fechar | Reabrir |
| --- | --- | --- | --- | --- | --- |
| Operador | Proprios dados | Nao | Nao | Nao | Nao |
| Encarregado | Equipe | Sim | Nao | Nao | Nao |
| Engenheiro | Obra | Sim | Sim | Nao | Nao |
| Gestor | Multiplas obras | Sim | Sim | Sim | Sim |
| Admin Tenant | Tudo no tenant | Sim | Sim | Sim | Sim |
| Admin OPERA | Suporte (auditado) | Restrito | Restrito | Nao | Nao |

5.2 Cruzamento com roles atuais

| Papel canonico (alvo) | Role atual no banco | Gap |
| --- | --- | --- |
| Operador | operacional | OK - alinhado |
| Encarregado | Nao existe | Criar role; hoje cai em operacional ou gestor |
| Engenheiro | Nao existe | Criar role; hoje cai em gestor |
| Gestor | gestor | OK - alinhado |
| Admin Tenant | admin | OK - alinhado |
| Admin OPERA | super_admin | OK - exige is_super_admin server-side |
| Visualizador | visualizador | Sem papel canonico equivalente - manter para guest/trial |

5.3 Principios nao-negociaveis

| P1 | Toda checagem de permissao tem obra_id e momento no input (nao so user+role). |
| --- | --- |
| P2 | Admin OPERA nunca grava silenciosamente em dado de tenant; toda acao cross-tenant gera evento. |
| P3 | Admin Tenant nao pode rebaixar a si mesmo (protecao contra auto-lockout). |
| P4 | Reabertura de periodo exige role com bit 'Reabrir' + keyword forte (REABRIR <MES>) + motivo >= 20 chars. |
| P5 | Trial expirado degrada qualquer role para visualizador (read-only) - server-side, nao UI. |

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 6

### 6. Governanca LGPD Operacional

Esta secao materializa a LGPD dentro do Atlas. Hoje o documento tecnico fala de tenant, obra e usuario. A LGPD fala em titular, controlador, operador, suboperador e encarregado. Esta secao mapeia um sobre o outro. 6.1 Papeis LGPD no ecossistema OPERA

| Papel LGPD | Quem e no Atlas | Responsabilidade |
| --- | --- | --- |
| Titular | Colaborador, gestor, admin (pessoa fisica) | Direitos do art. 18 (acesso, correcao, exclusao, portabilidade) |
| Controlador | Construtora / Empreiteira (= tenant) | Define finalidade e meios do tratamento |
| Operador | OPERA Atlas Ltda | Trata dados em nome do Controlador, sob DPA |
| Suboperador | Lovable Cloud (Supabase, hosting) | Trata dados em nome do Operador, sob contrato encadeado |
| Encarregado (DPO) | Eduardo Martins (ate nomeacao formal) | Canal com titulares e ANPD |

6.2 RoPA minimo (Registro de Operacoes de Tratamento)

| Finalidade | Base legal | Dados | Retencao |
| --- | --- | --- | --- |
| Folha / pagamento de diaria | Execucao de contrato + obrig. legal trabalhista | Nome, CPF, valor | 5 anos (FGTS) / 30 anos (INSS) |
| Controle de presenca | Execucao de contrato + legitimo interesse | Nome, data, obra, foto opcional | Periodo + 5 anos |
| Cronograma de obra | Execucao de contrato | Atividades, responsaveis | Vida da obra + 5 anos |
| Auditoria e seguranca | Cumprimento de obrigacao legal (LGPD art. 16) | Logs de acesso, acoes | Minimo 6 meses; alvo 5 anos |
| Comunicacao comercial (waitlist) | Consentimento | Email, telefone, empresa | Ate revogacao |
| Suporte tecnico | Legitimo interesse | Email, screenshots, logs | 2 anos apos encerramento |

6.3 Direitos do titular - como o Atlas atende

| Direito | Mecanismo no produto |
| --- | --- |
| Acesso aos dados | Export CSV universal (Admin > Dados > Tenant Full) |
| Portabilidade | Mesmo export CSV; formato aberto, UTF-8 BOM, FK como UUID literal |
| Correcao | Edicao via UI dentro do periodo aberto; apos fechamento, reabertura formal |
| Eliminacao | Soft delete (deleted_at) + job de purga apos 30 dias (data-retention) |
| Informacao sobre compartilhamento | Esta secao 6 + politica de privacidade publica |
| Revogacao de consentimento | Beta waitlist: unsubscribe; titular operacional: via Controlador |

6.4 DPA - Data Processing Agreement Todo Controlador (tenant) deve assinar DPA com o Operador (OPERA) antes de subir a producao. O DPA deve referenciar: (a) este v2 §6 como anexo tecnico, (b) OPERA_CORE.md como anexo de invariantes, (c) lista de suboperadores (Lovable Cloud) com clausula de notificacao para troca de suboperador. Modelo padrao: clausulas art. 39 LGPD + ANPD Guia de Boas Praticas para Operadores. OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 7

### 7. Classificacao de Dados

Cada coluna sensivel recebe uma classe. A classe determina politicas de mascaramento, retencao, export e auditoria. Base para DLP (Microsoft Purview ou equivalente) numa fase posterior. 7.1 Escala canonica

| Classe | Definicao | Exemplo de regra |
| --- | --- | --- |
| Publico | Pode aparecer fora do tenant sem dano | Landing page, nome do produto |
| Interno | Restrito ao tenant; sem dano grave se vazar | Cronograma, descricao de etapa |
| Confidencial | Restrito ao tenant; vazamento gera dano reputacional/comercial | Nome de colaborador, valor de obra |
| Sensivel (PII) | Dado pessoal protegido por LGPD; vazamento = incidente reportavel | CPF, salario, foto identificavel |

7.2 Inventario por tabela (extrato - nao exaustivo)

| Dado | Tabela.Coluna | Classe | Mascaramento |
| --- | --- | --- | --- |
| Nome colaborador | colaboradores.nome | Confidencial | Iniciais em export publico |
| CPF | colaboradores.cpf | Sensivel | Hash + ultimos 3 digitos |
| Valor da diaria | colaboradores.valor_diaria | Sensivel | Agregado por equipe em BI |
| Foto da obra | storage obra-fotos | Interno (Sensivel se identifica pessoa) | Signed URL + lineage I5 |
| Cronograma | atividades.* | Interno | Sem mascaramento; restrito por RLS |
| Valor de aditivo | aditivos_contratuais.valor | Confidencial | Restrito a gestor+ |
| Hash de fechamento | periodos_fechados.snapsh ot_hash | Confidencial (integridade) | Nunca mascarar; imutavel I11 |
| Logs de auditoria | audit_logs, audit_logs_db | Confidencial | Acesso apenas admin tenant + super_admin |
| Eventos sistema | system_events | Interno | Visivel para admin + suporte OPERA auditado |
| Email convidado | invites.email | Sensivel | Self-read pelo email do JWT apenas |
| Token de transferencia | session_transfers.token | Sensivel | Nunca exportar; uso unico |
| Waitlist | beta_waitlist.email/whatsa pp | Sensivel | Acesso so via edge function service-role |

Implicacao para o export CSV: a feature 'Exportar Dados' ja honra esta tabela - colunas como invites.token e session_transfers.token estao na allowlist negativa. Nova coluna sensivel adicionada ao schema deve atualizar simultaneamente: (a) §7 deste documento, (b) allowlist do edge export-csv, (c) politica RLS, (d) regra de mascaramento em PDF/BI. OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 8

### 8. Modelo de Eventos Humanos

Eventos tecnicos (system_events) precisam ter explicacao humana. Toda acao relevante deve ser narravel como Pessoa -> Acao -> Evento -> Consequencia. E essa cadeia que torna o sistema auditavel para terceiros (cliente, ANPD, investidor, pericia trabalhista). 8.1 Cadeia canonica Pessoa Acao Evento (system_events) Consequencia ----------- ----------------- --------------------------- ------------------------- Encarregado Confirma presenca presenca.confirmada Entra na folha do mes Gestor Fecha periodo periodo.fechado (hash v1) Folha imutavel; PDIC consome Gestor Reabre periodo periodo.reaberto (motivo,v1) UI marca pendente Gestor Refecha periodo periodo.refechado (hash v2) Hash v1 preservado Admin Convida usuario invite.created Email enviado; expira em 7d Operador Sobe foto evidencia.criada (I5) Disponivel no relatorio Admin OPERA Acessa tenant X super_admin.access (audit) Visivel no audit log do tenant 8.2 Encadeamento causal (correlation_id / causation_id) Cada evento carrega correlation_id (sessao logica do usuario) e causation_id (ID do evento que o causou). Isso permite reconstruir a narrativa completa de uma decisao - por exemplo, ligar uma reabertura a confirmacao tardia de uma presenca que ela compensou. 8.3 Por que isso importa para o negocio

| Cenario | Pergunta que o sistema responde sem ambiguidade |
| --- | --- |
| Auditoria trabalhista | Quem confirmou a presenca de Joao no dia X e em qual sessao? |
| Investigacao interna | Quem reabriu o mes de marco e por que (motivo >= 20 chars)? |
| Cliente final desconfia da folha | Quais eventos compoem o hash deste mes e nesta ordem? |
| ANPD pede comprovacao de acesso | Quem acessou os dados do titular Y, quando, com qual role? |
| Investidor faz due diligence | Qualquer estado financeiro e reconstruivel a partir dos eventos primarios (I7). |

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 9

### 9. Mapa do Ecossistema OPERA

O Atlas nao e um produto isolado - e a camada de verdade de um conjunto de produtos especializados. O mapa abaixo e a visao alvo do ecossistema. Produtos em italico ainda sao visao (nao implementados em codigo). 9.1 Arquitetura empresarial alvo PDIC (BI Estrategico) ^ | +-----+-----+ | Power BI | +-----+-----+ | (snapshots deterministicos - I7/I9) +-----------------+-----------------+ | | | +-----+-----+ +-----+-----+ +-----+------+ | Atlas | | QFD-OS | | Direcione | | (verdade) | | (qualid.) | | (decisao) | +-----+-----+ +-----+-----+ +-----+------+ ^ ^ ^ | | | +------+------+ +------+------+ +------+------+ | | | | | | Stockflow Smart QFD Score Direcoes Plano Cotacoes checklist humano +-------------+ +-------------+ +-------------+ ^ ^ ^ +-----------------+-----------------+ | Control + Mobile (captura no canteiro) 9.2 Papel de cada produto

| Produto | Papel | Entrada do Atlas | Saida para o Atlas |
| --- | --- | --- | --- |
| Atlas | Verdade operacional, folha, periodos | - | - |
| Control | Captura mobile (presenca, foto, ocorrencia) | Cronograma, equipes, contexto | Eventos primarios (presenca, evidencia) |
| QFD-OS | Qualidade e checklist tecnico | Atividades, ciclos | Indicadores, nao-conformidades |
| Direcione | Apoio a decisao e plano de acao | Snapshot fechado, KPIs | Acoes corretivas, workflows |
| Stockflow | Estoque e consumo de insumos | Obra, etapa | Consumo real para custo na folha |
| Smart Cotacoes | Cotacao e selecao de fornecedor | Demanda de insumo | Preco base, fornecedor escolhido |
| Vaga Quente | Recrutamento e alocacao | Demanda por equipe | Colaborador alocado |
| PDIC | BI estrategico do grupo (via Power BI) | Snapshots consolidados | - |

9.3 Contratos de integracao (nao-negociaveis)

| C1 | Produto consumidor nunca recalcula folha ou hash de periodo - so le do Atlas. |
| --- | --- |
| C2 | Produto produtor entrega eventos primarios com lineage (tenant, obra, autor, momento, correlation_id). |
| C3 | Integracao cross-produto passa por contrato de evento versionado; quebra = breaking change que exige bump major. |

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 10

- C4
- Nenhum produto pode atravessar a fronteira de tenant (I1); mesmo para BI consolidado exige role org_admin com sub-tenant explicito.

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 11

### 10. Roadmap de Maturidade Empresarial

Checklist priorizado por marco. Cada item referenciado a uma secao deste documento ou a uma invariante de OPERA_CORE. 10.1 Pre-piloto pago (proximas 2 sprints)

| # | Item | Referencia |
| --- | --- | --- |
| 1 | Dominio proprio (atlas.opera.com.br) + SSL | OPERA_CORE §8 |
| 2 | DPA modelo assinado por todo tenant antes de producao | v2 §6.4 |
| 3 | Politica de privacidade publica refletindo §6 e §7 | v2 §6, §7 |
| 4 | Inventario completo do RoPA carregado no Encarregado | v2 §6.2 |
| 5 | Export CSV universal entregue (ja implementado) | feature csv-export |

10.2 Cliente Enterprise / Construtora grande

| # | Item | Referencia |
| --- | --- | --- |
| 1 | Roles canonicas Encarregado + Engenheiro implementadas | v2 §5.2 |
| 2 | Sub-tenants (filial / regional) sem quebrar I1 | v2 §3.4 |
| 3 | Mascaramento por classe de dado em exports e BI | v2 §7.2 |
| 4 | SSO corporativo (SAML/OIDC) por tenant | novo |
| 5 | SLA documentado (uptime, RTO, RPO) | novo |

10.3 Investidor / due diligence

| # | Item | Referencia |
| --- | --- | --- |
| 1 | Mapa do ecossistema visualizado + produtos com responsavel | v2 §9 |
| 2 | Metricas de uso por tenant (MRR potencial, retencao) | novo |
| 3 | Politica de seguranca documentada (este doc + OPERA_CORE) | OPERA_CORE §2 |
| 4 | Historico de incidentes (zero ou plano de resposta) | novo |
| 5 | Roadmap de produto com 4 trimestres | novo |

10.4 Certificacoes (ISO 27001 / LGPD ANPD)

| # | Item | Referencia |
| --- | --- | --- |
| 1 | Encarregado (DPO) formalmente nomeado e publicado | v2 §6.1 |
| 2 | Politica de gestao de chaves e secrets | OPERA_CORE §8 |
| 3 | Teste de restore de backup trimestral documentado | OPERA_CORE §8 |
| 4 | Analise de Impacto a Protecao de Dados (RIPD) por finalidade | v2 §6.2 |
| 5 | Plano de resposta a incidente com prazo ANPD (2 dias uteis) | novo |

OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 12

### 11. Anexos

11.1 Glossario

| Termo | Definicao |
| --- | --- |
| Tenant | Fronteira soberana de dados; unidade indivisivel de isolamento (I1) |
| Obra | Contexto operacional fisico; pertence a exatamente 1 tenant |
| Controlador (LGPD) | Quem decide finalidade e meios do tratamento - aqui, a Construtora |
| Operador (LGPD) | Quem trata dados em nome do Controlador - aqui, OPERA Atlas Ltda |
| Suboperador | Operador contratado pelo Operador - aqui, Lovable Cloud / Supabase |
| Encarregado (DPO) | Pessoa indicada pelo Controlador para canal com titulares e ANPD |
| RoPA | Registro de Operacoes de Tratamento de Dados (art. 37 LGPD) |
| DPA | Data Processing Agreement - contrato Controlador / Operador |
| RIPD | Relatorio de Impacto a Protecao de Dados Pessoais |
| RLS | Row-Level Security do Postgres - primeira linha de defesa do Atlas |
| Hash imortal | Snapshot SHA-256 de periodo fechado, preservado mesmo apos reabertura (I11) |
| Lineage | Metadados (tenant, obra, autor, momento, origem) anexados a evidencia (I5) |
| correlation_id | Identificador de sessao logica do usuario atraves dos eventos |
| causation_id | Identificador do evento que causou o evento atual (cadeia narrativa) |
| Periodo Fechado | Barreira temporal imutavel por (tenant, obra, mes) - I4 |
| super_admin | Role da equipe OPERA; acesso cross-tenant sempre auditado |

11.2 Referencia cruzada

| Documento | Conteudo |
| --- | --- |
| OPERA_CORE.md (v1.3) | Invariantes I1-I11, modelo de confianca, soberania atual |
| PDF v1 - Mapeamento de Migracao | Como migrar backend preservando invariantes |
| PDF v2 - este documento | O que o Atlas e como produto empresarial |
| MANUAL_SISTEMA.md | Manual operacional para usuario final |
| mem://features/csv-export | Especificacao da feature de export universal |
| mem://architecture/causal-observabilit y | system_events, correlation_id, causation_id |
| mem://architecture/period-reopening | Implementacao da invariante I11 |

Fim - OPERA Atlas Modelo Empresarial v2.0 OPERA Atlas - Modelo Empresarial v2.0 - Confidencial Pagina 13

<a id="d06"></a>

## 9. Diagnóstico Objetivo — construído, faltante, arriscado

> **Status:** Vigente  
> **Camada:** Auditoria  
> **Conceito:** Leitura evidence-based do que existe em código: RLS e exportação CSV como OK; baseline, hash e Gantt como Parciais; Copiloto e prova jurídica como Ausentes.  
> **Contexto:** Documento de referência para status real. Deliberadamente pessimista: apenas o que é rastreável a arquivo, migration ou memória entra. Veredito: produto não vendável de forma autônoma na data, 4–6 semanas de distância.  
> **Origem:** `OPERA_Atlas_Diagnostico_Objetivo.pdf` · **Versão:** 1.0 · **Data:** 06/07/2026

| Data | 06 de julho de 2026 |
| --- | --- |
| Versão base | OPERA_CORE v1.3 |
| Método | Evidence-based — apenas o que existe em código, migrations e memórias do repositório |
| Escopo | Atlas (núcleo operacional). Não avalia Copiloto, Control, Stockflow, Smart Cotações. |

Legenda de status

- OK Implementado e verificável no repositório
- PARCIAL Estrutura existe, sem prova em produção
- AUSENTE Nenhum artefato encontrado

Este relatório responde diretamente às 6 seções do diagnóstico solicitado. Cada afirmação é rastreável a um arquivo, migration ou memória do projeto — não a intenções ou promessas de roadmap.

### §1 — O que já está construído (e em produção)

Situação atual das capacidades críticas do Atlas. "Em produção" aqui significa código publicado no branch principal, não necessariamente com uso real por cliente pagante.

| Capacidade | Status | Evidência no repositório |
| --- | --- | --- |
| Baseline (cronograma congelado) | PARCIAL | Tabela cronograma_baseline existe (schema Supabase). Nenhuma evidência de baseline gerado para obra real. Não há edge function ou fluxo de UI que congele e assine o baseline. Falta caso de uso end-to-end. |
| Fechamento mensal com hash SHA-256 | PARCIAL | Tabelas periodos_fechados e periodos_reaberturas implementadas. Componente admin PeriodosFechadosTab presente. Coluna de hash prevista, mas não há teste de reprodutibilidade executado (mesmo input → mesmo hash) nem snapshot arquivado. |
| Exportação CSV | OK | Edge function supabase/functions/export-csv/index.ts implementada com escopos tenant_full / obra / período. UI ExportarDadosTab integrada ao Admin. Respeita RLS via userClient, gera ZIP com manifest, signed URL 15min, eventos exportacao_csv.* em system_events. Limite conhecido: ~100k linhas por chamada. |
| Integração com Copiloto | AUSENTE | Nenhum arquivo, edge function, webhook, tabela de ingestão ou contrato de dados referenciando "Copiloto" foi encontrado no repositório. Equipes, produção e custos são coletados diretamente no Atlas via UI/CRUD; não há canal de entrada externo. |
| RLS multi-tenant | OK | RLS ativo em todas as 22+ tabelas. Helpers get_user_tenant_id, has_role, user_has_obra_access como SECURITY DEFINER tenant-scoped. Hardening documentado em memory/security/rls-access-validation. Ressalva: não há suíte de testes automatizados cross-tenant — validação é por revisão de policy. |
| Invariantes OPERA_CORE (I1, I2, I4, I9, I11) | OK | I1 Fronteira de tenant: derivada server-side, nunca do cliente. I2 Autoridade server-side: RLS + RPC + edge. I4 Irreversibilidade temporal: periodos_fechados + reabertura formal. I9 Determinismo financeiro: cálculos em funções puras (src/analytics/*) sem now()/random. I11 (append-only observabilidade): tabela system_events com correlation_id. Codificadas — não auditadas por terceiro. |

### §2 — O que está em construção (não finalizado)

| Item | Status | Onde está |
| --- | --- | --- |
| Apontamento de diárias / Relatório de mão de obra | PARCIAL | Página RelatorioMaoObraPage em iteração ativa (default de quantidade ajustado nesta sprint). Regras de folha em src/lib/payrollRules.ts. Falta consolidação mensal automatizada. |
| Bulk delete de presenças/faltas | OK | Entregue na sprint atual em ColaboradoresPage. Já em produção. |
| Capacidade & planejamento (staffing) | PARCIAL | Memória features/capacidade-planejamento registra conceito; componentes CapacidadePresencaCard e ProdutividadeEquipeCard existem. Não há motor de simulação prospectivo. |
| Gantt / Cronograma físico | PARCIAL | Página CronogramaPage + GanttBoard + edges gantt-list / gantt-update-task. Tabelas atividades e atividade_dependencias. Ainda sem baseline congelado nem cálculo de SPI persistido. |
| Governança LGPD (RoPA, DPO, classificação de dados) | AUSENTE | Descrito em OPERA Atlas Modelo Empresarial v2 (PDF) mas não implementado em código: sem tabela de classificação de coluna, sem registro de operações de tratamento, sem função de titular (export/erase). |
| Prova jurídica do fechamento | AUSENTE | Nenhum teste de auditoria simulada. Nenhum documento de cadeia de custódia. Hash existe como campo mas não como evidência publicamente verificável. |

### §3 — O que falta para o MVP do Atlas

| Área | O que falta concretamente |
| --- | --- |
| Integração com Copiloto | Não há contrato de dados definido. Ao menos precisa: (a) endpoint de ingestão autenticado por tenant, (b) mapeamento equipes→colaboradores, produção→registros_diarios, custos→lancamentos_financeiros, (c) idempotência por correlation_id, (d) evento ingestao_copiloto.* em system_events. |
| Fechamento mensal funcional | Falta: (a) função server-side que serialize o estado consolidado em ordem determinística, (b) cálculo do SHA-256 sobre esse blob, (c) armazenamento do snapshot bruto (não só do hash) em storage privado, (d) fluxo de UI "Fechar mês" com dupla confirmação, (e) validação de re-execução gerar hash idêntico. |
| Exportação CSV — completude | Cobertura atual boa. Faltam: verificação de cobertura de todas as tabelas allowlist × tabelas reais; export incremental (delta) para tenants grandes; job assíncrono acima de ~100k linhas. |
| Prova jurídica | Nenhum cenário de auditoria foi rodado. Precisa: (a) simulação com terceiro re-executando o hash, (b) parecer jurídico sobre valor probatório, (c) política de retenção do snapshot bruto. |
| Documentação | Existem MANUAL_SISTEMA.md, RELATORIO_TESTE_SISTEMA.md, OPERA_CORE.md. Faltam: contrato comercial, termo de uso, política de privacidade, guia de onboarding do cliente, runbook de incidentes. |

### §4 — Riscos e débitos técnicos conhecidos

| Risco / Débito | Severidade | Impacto |
| --- | --- | --- |
| Hash de fechamento não testado | ALTO | Vender "prova jurídica" sem uma execução verificada é risco reputacional grave. Uma única falha em produção destrói a narrativa de imutabilidade. |
| Ausência de testes automatizados de isolamento tenant | ALTO | RLS é revisada manualmente. Um regressão em qualquer policy passa despercebida. Ver RELATORIO_TESTE_SISTEMA.md: apenas 1 test file existe. |
| 15 queries paralelas no DashboardOverview | MÉDIO | Aceitável hoje com React Query. Escala mal acima de dezenas de obras / centenas de colaboradores por tenant. Views agregadas ou dashboard_aggregates RPC devem substituir. |
| Sem monitoramento de erros (Sentry etc.) | MÉDIO | Bugs em produção só aparecem por relato do cliente. system_events cobre eventos de domínio, não crashes de UI. |
| Bundle sem lazy-loading de rotas | BAIXO | First load pesado. Impacta primeira impressão comercial em mobile. |
| LGPD operacional inexistente | ALTO (jurídico) | Sem controle de titular, sem RoPA, sem base legal registrada por tratamento. Bloqueador para contratos com construtoras grandes. |
| Copiloto não integrado | ALTO (produto) | Discurso comercial cita ecossistema; Atlas sozinho é "mais um painel". Sem Copiloto o valor percebido cai. |

### §5 — Próximo passo (7 dias)

Ação mais crítica: rodar 1 (um) fechamento mensal real, com hash reproduzível, em 1 obra piloto, e provar o hash de forma independente. Sem isso, todo o resto do discurso Atlas fica em suspenso.

| Quando | O quê | Quem |
| --- | --- | --- |
| D+1 a D+2 | Implementar função server-side gerar_snapshot_periodo(tenant, obra, mes) que retorna JSON determinístico + SHA-256. | Dev backend |
| D+3 | Rodar em obra piloto. Salvar snapshot bruto em bucket privado. Registrar evento periodo.fechado em system_events. | Dev + Cliente piloto |
| D+4 | Terceiro re-executa a função com os mesmos inputs e compara o hash. Documenta o resultado. | Auditor externo (pode ser o próprio Eduardo M.) |
| D+5 | Definir contrato de dados Copiloto→Atlas (payload, autenticação, idempotência). Escrever OpenAPI/JSON schema. | Product + Dev |
| D+6 | Rodar exportação CSV completa do tenant piloto. Validar cobertura de tabelas × dados reais. | Dev + Cliente piloto |
| D+7 | Revisão: o que passou, o que quebrou. Ir/Não-ir para próxima sprint de MVP vendável. | Todos |

Decisões a tomar antes: (1) quem é a obra piloto e assina termo de participação; (2) quem é o terceiro que valida o hash; (3) se o Copiloto entra como pré-requisito do MVP ou como fase 2.

### §6 — Critério de prontidão para venda

Veredicto: o Atlas NÃO está pronto para ser vendido como produto autônomo hoje. O que falta para estar vendável:

- 1 fechamento mensal executado com hash reproduzível e validado por terceiro (§5).

- Integração com Copiloto OU decisão explícita de vender Atlas standalone sem o discurso de ecossistema.

- LGPD operacional mínima: termo de uso, política de privacidade, RoPA básica, contato de DPO.

- 1 caso jurídico simulado documentando o valor probatório do hash.

- Contrato comercial + SLA + política de retenção assinados.

- Onboarding auto-serviço testado com cliente que não é o fundador.

Prazo estimado 4 a 6 semanas, condicionado a: (a) fechamento com hash validado em até 2 semanas, (b) LGPD operacional em 3 semanas, (c) documentação comercial em 2 semanas em paralelo. Se a integração com Copiloto for pré-requisito, somar +4 a 6 semanas (total 8–12).

### Anexo A — Matriz-resumo (atualizada com evidência)

| Seção | Status | Observação |
| --- | --- | --- |
| Baseline | PARCIAL | Tabela existe. Sem obra real. |
| Fechamento com hash | PARCIAL | Estrutura pronta. Não testado. |
| Exportação CSV | OK | Edge + UI + eventos. Em produção. |
| Integração com Copiloto | AUSENTE | Não iniciada. |
| RLS | OK | Ativo. Sem teste cross-tenant automatizado. |
| Prova jurídica | AUSENTE | Não validada. |
| MVP vendável | AUSENTE | Falta Copiloto (ou decisão) + fechamento validado + LGPD + docs. |
| Próximo passo | — | Rodar 1 fechamento real com hash validado por terceiro em 7 dias. |

### Anexo B — Referências no repositório

- .lovable/OPERA_CORE.md — constituição operacional v1.3

- .lovable/memory/architecture/opera-core-constitution.md — invariantes I1–I10

- .lovable/memory/architecture/period-reopening.md — modelo de reabertura formal

- .lovable/memory/architecture/causal-observability.md — correlation_id / causation_id

- .lovable/memory/features/csv-export.md — arquitetura da exportação CSV

- .lovable/memory/security/rls-access-validation.md — hardening RLS pré-piloto

- supabase/functions/export-csv/index.ts — edge function de exportação

- supabase/functions/gantt-list/index.ts + gantt-update-task/index.ts — cronograma

- src/components/admin/ExportarDadosTab.tsx — UI de exportação

- src/components/admin/PeriodosFechadosTab.tsx — UI de fechamento

- src/analytics/*.ts — funções puras determinísticas (I9)

- src/lib/observability.ts + supabase/functions/_shared/observability.ts — headers causais

- Tabelas: periodos_fechados, periodos_reaberturas, cronograma_baseline, system_events, audit_logs_db, user_roles.

- RELATORIO_TESTE_SISTEMA.md — última auditoria interna (09/03/2026).

Documento gerado em modo evidence-based. Cada linha marcada como OK foi verificada contra o repositório na data acima. Cada linha marcada como AUSENTE significa que uma busca no código não encontrou artefato — não é opinião.

<a id="d07"></a>

## 10. Roadmap de Maturidade Empresarial (M0–M4)

> **Status:** Histórico  
> **Camada:** Governança  
> **Conceito:** Cinco marcos — Fundação Técnica, Pré-piloto Pago, Cliente Enterprise, Due Diligence, Certificações — com prazos estimados de 4 a 36 semanas.  
> **Contexto:** Substituído pelo documento de Governança de Maturidade v1.1 (D08), que adiciona IDs, dependências, evidências e regra formal de promoção. Mantido aqui como registro da leitura original.  
> **Origem:** `OPERA_Atlas_Roadmap_Maturidade.pdf` · **Versão:** 1.0 · **Data:** 06/07/2026

Cronograma por marcos de maturidade, não por features isoladas.

| Data | 06 de julho de 2026 |
| --- | --- |
| Versão OPERA_CORE | v1.3 |
| Escopo | OPERA Atlas (não inclui Copiloto / Compass / demais módulos) |
| Metodologia | Evidence-based — cada critério rastreável a arquivo, migration ou memória do repositório |
| Uso | Apresentação empresarial, auditoria e planejamento de investimento |

### Sumário Executivo

Este documento organiza a evolução do OPERA Atlas em cinco marcos de maturidade empresarial, não em backlog de funcionalidades. Cada marco tem critérios objetivos de prontidão, evidência atual no repositório e gaps mensuráveis. A posição atual do produto é entre M0 e M1: a fundação técnica está codificada (invariantes, RLS, append-only, hash), mas nenhum piloto pago rodou com fechamento reproduzível e domínio próprio.

#### Modelo de Maturidade

- M0 Fundação Técnica
- >
- M1 Pré-piloto Pago
- >
- M2 Cliente Enterprise
- >
- M3 Due Diligence Investidor
- >
- M4 Certificaçõe s LGPD / ISO

Legenda: verde = atingido · âmbar = em curso · cinza = futuro. Uma frase por marco

| M0 | Fundação técnica auditável — invariantes codificadas, RLS ativa, hash estruturado. |
| --- | --- |
| M1 | Pré-piloto pago — 1 obra real com fechamento reproduzido e contrato mínimo assinado. |
| M2 | Cliente enterprise — testes automatizados, monitoramento, DPA e role de auditor. |
| M3 | Due diligence para investidor — pentest, métricas de negócio auditáveis, plano de lock-in. |
| M4 | Certificações — LGPD operacional e ISO 27001 com evidências de 6–12 meses de operação. |

- M0 — Fundação Técnica
- ATINGIDO

Definição. Base arquitetural verificável — o sistema tem invariantes escritas, banco isolado por tenant e trilha causal capaz de reconstruir qualquer estado consolidado.

| Bloco | Conteúdo |
| --- | --- |
| Critérios de prontidão | • OPERA_CORE v1.3 codificado com 11 invariantes (I1–I11). • RLS ativa em todas as tabelas públicas com GRANTs explícitos. • Append-only para eventos históricos (audit_logs, audit_logs_db, system_events). • Fechamento mensal com SHA-256 estruturado (periodos_fechados.hash_snapshot). • Observabilidade causal (correlation_id, causation_id) em edges e triggers. |
| Evidência atual | .lovable/OPERA_CORE.md v1.3 · migrations de periodos_fechados, periodos_reaberturas, cronograma_baseline, system_events · .lovable/memory/security/rls-access-validation.md · libs src/lib/observability.ts e supabase/functions/_shared/observability.ts. |
| Gaps para atingir o marco | Fechamento nunca rodou em obra real; hash SHA-256 nunca foi reproduzido por terceiro independente. Isolamento cross-tenant não coberto por teste automatizado. |

- M1 — Pré-piloto Pago
- EM CURSO

Definição. Um cliente pagante operando em produção com fechamento auditável e contrato de piloto formal.

| Bloco | Conteúdo |
| --- | --- |
| Critérios de prontidão | • 1 fechamento mensal real executado, hash reproduzido por auditor externo. • CSV exportado, conferido e assinado pelo cliente piloto. • 1 obra piloto em produção com dados reais por ↔ 30 dias corridos. • Contrato de piloto assinado + SLA mínimo (uptime declarado, RPO/RTO). • Domínio próprio no ar (sair de .lovable.app). • Runbook de onboarding documentado e testado. |
| Evidência atual | Edge export-csv funcional (supabase/functions/export-csv/index.ts). Estrutura de fechamento e reabertura formal pronta (RPCs reabrir_periodo, refechar_periodo). UI admin com tab "Períodos" implementada. Domínio ainda em opera-atlas.lovable.app. |
| Gaps para atingir o marco | Rodar fechamento real; migrar para domínio próprio; escrever contrato de piloto, SLA e runbook de onboarding; validar exportação CSV com cliente real. |

- M2 — Cliente Enterprise
- FUTURO

Definição. Produto pronto para vender a clientes com exigências corporativas de segurança, auditoria e SLA.

| Bloco | Conteúdo |
| --- | --- |
| Critérios de prontidão | • Testes automatizados de isolamento cross-tenant (RLS) em CI. • Monitoramento de erros em produção (Sentry ou equivalente). • Backup com restore testado trimestralmente e documentado. • Segregação de funções: admin ≠ operador ≠ auditor, validada por matriz de permissões. • Exportação CSV incremental / delta por período. • Trilha de auditoria consultável por role auditor dedicada. • SLA formal com cláusula de penalidade e DPA (Data Processing Agreement) padrão. |
| Evidência atual | Roles atuais cobrem admin/operador via has_role + get_user_tenant_id. Auditoria de banco existe em audit_logs_db mas sem role auditor com view dedicada. Sem monitoramento externo, sem restore validado, sem DPA formal. |
| Gaps para atingir o marco | Introduzir role auditor; contratar/ativar Sentry; escrever suite de testes RLS cross-tenant; executar restore de backup trimestral e documentar; redigir DPA + SLA enterprise. |

- M3 — Due Diligence para Investidor
- FUTURO

Definição. Sistema em condições de sustentar auditoria externa técnica e financeira em processo de investimento.

| Bloco | Conteúdo |
| --- | --- |
| Critérios de prontidão | • Code review externo por consultoria independente. • Pentest com relatório e remediation plan documentados. • Documentação de arquitetura completa e versionada. • Roadmap de produto público e mantido. • Métricas de negócio auditáveis (MRR, churn, NPS) rastreáveis ao sistema. • Contratos com fornecedores críticos (Supabase, Lovable) formalizados. • Plano de contingência de lock-in (referência: §8 do OPERA_CORE). |
| Evidência atual | OPERA_CORE §8 já lista soberania atual honestamente (auth, banco, storage, edge, backup, deploy, domínio) com riscos e mitigações. Roadmap interno existe em .lovable/plan.md. Sem pentest, sem métricas de negócio operacionalizadas, sem plano de exit formal. |
| Gaps para atingir o marco | Contratar pentest; expor roadmap público; instrumentar MRR/churn/NPS; formalizar contratos com fornecedores críticos; escrever plano de exit de lock-in em documento versionado. |

- M4 — Certificações — LGPD e ISO 27001
- FUTURO

Definição. Conformidade formal reconhecida — LGPD operacional auditada e ISO 27001 com SGSI implantado.

| Bloco | Conteúdo |
| --- | --- |
| Critérios de prontidão | LGPD: RIPD (Relatório de Impacto), DPO nomeado, base legal por tratamento documentada, canal do titular funcional, política de retenção implementada e auditada, termo de uso + política de privacidade revisados por jurídico. ISO 27001: SGSI implantado, análise de riscos formal, controles do Anexo A mapeados, auditoria interna aprovada, auditoria externa de certificação concluída. |
| Evidência atual | Edge data-retention existe e é observável (memória architecture/causal-observability). OPERA_CORE codifica princípios (I1, I5, I6, I8) alinhados a LGPD e ISO 27001. Sem DPO, sem RIPD, sem SGSI, sem canal do titular. |
| Gaps para atingir o marco | LGPD operacional inexistente hoje — apenas conceito. ISO 27001 exige 6–12 meses de operação com evidências antes da auditoria externa. Marco maduro apenas após M2 + M3 concluídos. |

#### Cronograma Temporal Consolidado

| Marco | Status | Pré-requisitos | Estimativa | Riscos bloqueantes |
| --- | --- | --- | --- | --- |
| M0 | OK | — | Concluído | Nenhum estrutural. |
| M1 | PARCIAL | M0 | 4–6 semanas | Hash não reproduzido; sem domínio próprio; sem contrato-modelo. |
| M2 | FUTURO | M1 | 8–12 semanas após M1 | Sem testes RLS; sem monitoramento; sem role auditor; sem DPA. |
| M3 | FUTURO | M2 | 12–16 semanas após M2 | Sem pentest; sem métricas de negócio; sem plano de lock-in. |
| M4 | FUTURO | M2 + M3 | 24–36 semanas | LGPD conceitual; ISO exige histórico operacional. |

#### Matriz de Riscos e Débitos Técnicos

| Risco | Sev. | Marc o | Mitigação | Evidência |
| --- | --- | --- | --- | --- |
| Hash de fechamento nunca reproduzido em obra real | ALTO | M1 | Rodar 1 fechamento real e re-executar hash com terceiro independente. | periodos_fechados.ha sh_snapshot |
| Sem testes automatizados de isolamento cross-tenant | ALTO | M2 | Suite Vitest + fixtures com dois tenants; falha se qualquer query cruzar fronteira. | src/test/, RLS policies |
| Sem monitoramento de erros em produção | MÉDIO | M2 | Integrar Sentry (ou equivalente) no cliente e nas edge functions. | supabase/functions/* |
| 15 queries no Dashboard degradam TTFB | MÉDIO | M2 | Consolidar via RPC agregadora derivada de eventos primários (I7). | src/hooks/useDashboa rdAggregates.ts |
| LGPD apenas conceitual — sem DPO, RIPD ou canal do titular | ALTO | M4 | Nomear DPO, escrever RIPD, expor canal, exercitar edge data-retention. | supabase/functions/da ta-retention/ |
| Lock-in em Supabase / Lovable | MÉDIO | M3 | Migrations versionadas + plano de exit documentado; abstrair auth. | .lovable/OPERA_COR E.md §8 |
| Sem restore de backup validado | MÉDIO | M2 | Executar restore trimestral em ambiente isolado; documentar RPO/RTO reais. | Supabase backups |

#### Próximos Passos (7 / 30 / 90 dias)

| Horizonte | Ação | Marco |
| --- | --- | --- |
| 7 dias | Rodar 1 fechamento mensal real; terceiro re-executa hash SHA-256; iniciar migração de domínio próprio. | M1 |
| 30 dias | Piloto pago em obra real; contrato de piloto + SLA mínimo + runbook de onboarding documentados. Fecha M1. | M1 |
| 90 dias | Suite de testes RLS cross-tenant em CI; Sentry ativo; role auditor introduzida; primeiro restore trimestral executado. | M2 |

#### Anexo A — Rastreabilidade de Critérios

Cada critério de prontidão aponta para o artefato que o comprova ou para a lacuna explícita.

| Marco | Critério | Evidência / Lacuna |
| --- | --- | --- |
| M0 | Invariantes codificadas | .lovable/OPERA_CORE.md v1.3 (I1–I11) |
| M0 | RLS ativa + GRANTs | .lovable/memory/security/rls-access-validation.md |
| M0 | Append-only histórico | system_events, audit_logs_db, periodos_reaberturas |
| M0 | Hash SHA-256 estruturado | periodos_fechados.hash_snapshot (estrutura, sem prova real) |
| M0 | Observabilidade causal | src/lib/observability.ts, correlation_id em edges |
| M1 | Fechamento real com hash | ■ não executado |
| M1 | CSV validado por cliente | ■ edge export-csv pronto, sem cliente |
| M1 | Piloto ↔ 30 dias em produção | ■ não iniciado |
| M1 | Contrato + SLA + onboarding | ■ não escrito |
| M1 | Domínio próprio | ■ ainda opera-atlas.lovable.app |
| M2 | Testes RLS cross-tenant | ■ src/test/ não cobre isolamento |
| M2 | Monitoramento de erros | ■ sem Sentry |
| M2 | Restore de backup validado | ■ nunca testado |
| M2 | Role auditor | ■ não existe |
| M2 | CSV incremental | ■ export-csv exporta full, sem delta |
| M2 | DPA padrão | ■ não redigido |
| M3 | Pentest externo | ■ não realizado |
| M3 | Métricas de negócio | ■ MRR/churn/NPS não instrumentados |
| M3 | Plano de exit lock-in | ■ OPERA_CORE §8 lista riscos, sem plano formal |
| M4 | DPO nomeado + RIPD | ■ não existe |
| M4 | Canal do titular | ■ não implementado |
| M4 | Retenção auditada | ■ edge data-retention existe, não certificada |
| M4 | SGSI ISO 27001 | ■ não iniciado |

#### Anexo B — Por que Marcos, e não Features

O Diagnóstico Objetivo (documento anterior) organiza o estado do Atlas por feature (baseline, hash, CSV, Copiloto, RLS, invariantes). Isso responde bem à pergunta "o que existe?", mas não responde "o que precisa existir para vender / captar / certificar?". Este roadmap reorganiza os mesmos fatos por marco de maturidade empresarial. Uma feature só importa na medida em que destrava um marco. O critério deixa de ser "a funcionalidade X está pronta" e passa a ser "o estágio X do negócio é sustentável".

| Diagnóstico Objetivo | Roadmap de Maturidade |
| --- | --- |
| Organizado por feature (baseline, hash, CSV, RLS…) | Organizado por marco (M0…M4) |
| Responde: o que já existe? | Responde: o que destrava a próxima fase comercial? |
| Critério: implementado / não implementado | Critério: marco atingido / em curso / futuro |
| Público: arquiteto, tech lead | Público: investidor, cliente enterprise, DPO, auditor |
| Alinhado a OPERA_CORE §2 (invariantes) | Alinhado a OPERA_CORE §8 (soberania) + §9 (aceitação) |

Conclusão Os dois documentos são complementares: o Diagnóstico responde "qual é o estado técnico?"; este Roadmap responde "qual é a próxima barreira empresarial e o que ela custa?". Ambos devem ser lidos juntos em qualquer conversa de piloto pago, investimento ou certificação.

<a id="d08"></a>

## 11. Governança de Maturidade Empresarial v1.1

> **Status:** Vigente  
> **Camada:** Governança  
> **Conceito:** Roadmap transformado em instrumento vivo: painel executivo, 28 critérios com ID, 18 evidências normalizadas, regra formal de promoção de marco e histórico versionado.  
> **Contexto:** É o instrumento de acompanhamento executivo em uso. Posição registrada: M0 concluído, M1 em curso, maturidade global ~32%, bloqueador principal = hash de fechamento nunca reproduzido por terceiro.  
> **Origem:** `OPERA_Atlas_Governanca_Maturidade_v1.1.pdf` · **Versão:** 1.1 · **Data:** 06/07/2026

| Versão | 1.1 |
| --- | --- |
| Data | 06/07/2026 |
| Base | OPERA_CORE v1.3 · Roadmap de Maturidade v1.0 |
| Tipo | Instrumento de governança contínua, evidence-based |
| Escopo | OPERA Atlas (não inclui Copiloto/Compass) |

### 1. Painel Executivo

Leitura de 30 segundos. Cada linha responde à pergunta central: onde o Atlas está, o que impede o próximo marco e qual a evidência disso?

| Posição atual | M0 concluído · M1 em curso |
| --- | --- |
| Maturidade global | ~32% (M0 100% + M1 ~60%, ponderado por peso equivalente entre marcos) |
| Próximo marco | M1 — Pré-piloto Pago |
| Bloqueador principal | Hash SHA-256 de fechamento nunca reproduzido em obra real por terceiro (critério M1-02) |
| Previsão de conclusão de M1 | 4–6 semanas, condicionada a existir 1 cliente piloto ativo |
| Risco geral | MÉDIO-ALTO — estrutura pronta, execução real ausente |
| Tendência | > ascendente — invariante I11 e função verificar_hash_periodo entregues após v1.0 |

Indicadores executivos

| Marcos concluídos | Critérios concluídos | Critérios bloqueados | Riscos críticos (Alto) |
| --- | --- | --- | --- |
| 1 / 5 | 9 / 28 (~32%) | 3 | 3 |
| Débitos técnicos críticos | Evidências auditadas | Evidências pendentes |  |
| 2 | 6 | 12 |  |

### 2. Índice de Maturidade por Marco

Cada marco expõe: percentual de conclusão, critérios OK / parcial / aberto, bloqueadores, nível de risco e evidência-chave. Percentual = critérios concluídos ÷ critérios totais do marco.

#### M0 — Fundação Técnica 100%

| Concluídos | ✔ Invariantes I1–I11 codificadas ✔ RLS em 22+ tabelas ✔ Estrutura de hash SHA-256 ✔ Eventos causais (system_events) ✔ Soft-delete padrão |
| --- | --- |
| Parciais | — |
| Abertos | — |
| Bloqueador | Nenhum |
| Risco | BAIXO |
| Evidência-chave | OPERA_CORE.md v1.3 · migrations aplicadas |

#### M1 — Pré-piloto Pago 60%

| Concluídos | ✔ Export CSV funcional ✔ Estrutura de fechamento (periodos_fechados + hash) ✔ UI administrativa de fechamento |
| --- | --- |
| Parciais | ! Domínio próprio ! Onboarding documentado |
| Abertos | ✖ Hash reproduzido em obra real ✖ Piloto 30 dias executado ✖ Contrato piloto assinado |
| Bloqueador | Ausência de cliente piloto ativo com fechamento real |
| Risco | MÉDIO-ALTO |
| Evidência-chave | periodos_fechados · verificar_hash_periodo · export-csv |

#### M2 — Cliente Enterprise 8%

| Concluídos | — |
| --- | --- |
| Parciais | ! CSV incremental (parcial via export-csv) |
| Abertos | ✖ Testes RLS cross-tenant em CI ✖ Monitoramento Sentry ✖ Role auditor ✖ DPA assinado ✖ Restore de backup testado |
| Bloqueador | M1 não concluído |
| Risco | ALTO |
| Evidência-chave | rls-access-validation.md (não testado) |

10%

#### M3 — Due Diligence Investidor

| Concluídos | ✔ §8 OPERA_CORE (débitos técnicos catalogados) |
| --- | --- |
| Parciais | — |
| Abertos | ✖ Revisão externa de código ✖ Pentest ✖ Métricas de negócio (MRR/churn/NPS) ✖ Plano de contingência lock-in |
| Bloqueador | Base enterprise (M2) inexistente |
| Risco | ALTO |
| Evidência-chave | OPERA_CORE §8 |

#### M4 — Certificações (LGPD / ISO 27001) 0%

| Concluídos | — |
| --- | --- |
| Parciais | — |
| Abertos | ✖ RIPD ✖ DPO nomeado ✖ Política de retenção auditada ✖ SGSI ISO 27001 ✖ Auditoria externa |
| Bloqueador | LGPD operacional inexistente |
| Risco | ALTO |
| Evidência-chave | data-retention/index.ts (estrutura, não auditada) |

### 3. Critérios Mensuráveis

Cada requisito passa a ter ID único, prioridade, responsável, validação objetiva, dependências e status. Só critérios de prioridade Alta bloqueiam a promoção de marco (§7).

| ID | Critério | Prio | Responsável | Validação objetiva | Dep. | Status |
| --- | --- | --- | --- | --- | --- | --- |
| M0-01 | Invariantes I1–I11 codificadas | Alta | Backend | Presente em OPERA_CORE.md v1.3 §3 | — | Concluído |
| M0-02 | RLS habilitado em todas tabelas públicas | Alta | Backend | SELECT sem sessão retorna vazio para 22+ tabelas | — | Concluído |
| M0-03 | Export CSV funcional | Alta | Backend | Edge export-csv retorna 200 + arquivo válido | — | Concluído |
| M0-04 | Estrutura de hash SHA-256 | Alta | Backend | folha_pagamento() retorna campo hash determinístico | — | Concluído |
| M0-05 | Eventos causais rastreáveis | Médi a | Backend | system_events grava correlation_id + causation_id | — | Concluído |
| M1-01 | Fechamento real executado em obra | Alta | Backend + Cliente piloto | 1 registro em periodos_fechados com hash_snapshot para obra real | M0-04 | Aberto |
| M1-02 | Hash reproduzido por terceiro | Alta | Backend + Auditor | verificar_hash_periodo(id) integro=true em 2 sessões distintas | M1-01 | Aberto |
| M1-03 | CSV conferido pelo cliente | Médi a | Produto | Assinatura do cliente piloto no CSV exportado | M0-03 | Pronto p/ execução |
| M1-04 | Domínio próprio | Médi a | DevOps | DNS apontado + certificado TLS ativo | — | Aberto |
| M1-05 | Onboarding documentado | Médi a | Produto | Passo-a-passo publicado + testado com 1 usuário externo | — | Parcial |
| M1-06 | Contrato piloto assinado | Alta | Comercial | PDF assinado por cliente + Atlas | — | Aberto |
| M2-01 | Testes RLS cross-tenant em CI | Alta | Backend | bun vitest run verde com fixture de 2 tenants | M1 | Aberto |
| M2-02 | Monitoramento Sentry ativo | Alta | DevOps | Dashboard Sentry recebendo erros em produção | — | Aberto |
| M2-03 | Role auditor implementada | Alta | Backend | app_role='auditor' + policies read-only cross-obra | — | Aberto |
| M2-04 | CSV incremental (delta) | Médi a | Backend | export-csv aceita since=timestamp e retorna delta | M0-03 | Parcial |
| M2-05 | DPA assinado com cliente enterprise | Alta | Jurídico | Contrato de processamento de dados registrado | — | Aberto |
| M2-06 | Restore de backup testado | Alta | DevOps | Restore em ambiente staging + hash íntegro pós-restore | — | Aberto |
| M3-01 | Revisão externa de código | Alta | Auditor externo | Relatório assinado por terceiro independente | M2 | Aberto |
| M3-02 | Pentest executado | Alta | Segurança | Laudo de pentest com CVEs corrigidos ou aceitos | M2 | Aberto |
| M3-03 | Métricas de negócio (MRR/churn/NPS) | Alta | Produto | Dashboard interno com séries mensais de 3 meses | M1 | Aberto |
| M3-04 | Plano de contingência lock-in | Médi a | Arquitetura | Documento com estratégia de saída Supabase + estimativa | — | Aberto |
| M3-05 | Contratos críticos formalizados | Alta | Jurídico | MSA, SLA e termos publicados e assinados | M1-06 | Aberto |
| M4-01 | RIPD publicado | Alta | DPO | Relatório de Impacto à Proteção de Dados aprovado | M3 | Aberto |

| ID | Critério | Prio | Responsável | Validação objetiva | Dep. | Status |
| --- | --- | --- | --- | --- | --- | --- |
| M4-02 | DPO nomeado | Alta | Jurídico | Portaria + contato público publicado | — | Aberto |
| M4-03 | Política de retenção auditada | Alta | Auditor | data-retention/index.ts auditado + logs de execução | M2-06 | Aberto |
| M4-04 | SGSI ISO 27001 implantado | Alta | Segurança | Manual do SGSI + matriz de riscos aprovada | M3 | Aberto |
| M4-05 | Auditoria externa ISO 27001 | Alta | Auditor certificador | Certificado emitido por organismo credenciado | M4-04 | Aberto |

### 4. Mapa de Dependências

A sequência linear entre marcos é apenas parte da história. Existe uma cadeia crítica de destravamento que atravessa marcos e determina o ritmo real de evolução. 4.1 Sequência entre marcos M0 > M1 > M2 > M3 > M4 4.2 Cadeia crítica de destravamento

| Hash reproduzido (M1-02) | > | Piloto Pago (M1) | > | Cliente Enterprise (M2) | > | Due Dilig enc e (M3) |
| --- | --- | --- | --- | --- | --- | --- |
| Testes RLS cross-tenant (M2-01) | > | Cliente Enterprise (M2) |  |  |  |  |
| Retenção auditada (M4-03) | > | Certificações (M4) |  |  |  |  |
| Restore backup (M2-06) | > | Retenção auditada (M4-03) | > | Certificações (M4) |  |  |

### 5. Evidências Normalizadas

Toda evidência segue um padrão único: tipo · origem · localização · comprova · data · validade. Evidências sem localização rastreável não valem promoção de marco.

| ID | Tipo | Origem | Localização / Descrição | Comprova | Data | Validad e |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 | Migration | Supabas e | periodos_fechados (hash_snapshot, versao, reaberto_em) | M0-04 · M1-01 | 2026-05 | Perene |
| E-02 | Função DB | Supabas e | folha_pagamento() retorna hash SHA-256 determinístico | M0-04 | 2026-05 | Perene |
| E-03 | Função DB | Supabas e | verificar_hash_periodo() reexecuta e compara | M1-02 (mecanismo) | 2026-05 | A auditar |
| E-04 | Edge Function | Supabas e | supabase/functions/export-csv/i ndex.ts | M0-03 · M1-03 | Ativa | Perene |
| E-05 | Constitucio nal | Repo | .lovable/OPERA_CORE.md v1.3 (I1–I11) | M0-01 | 2026-05 -30 | Perene |
| E-06 | Migration | Supabas e | system_events (correlation_id, causation_id) | M0-05 | 2026-04 | Perene |
| E-07 | Função DB | Supabas e | reabrir_periodo() + refechar_periodo() | M0-04 estrutural | 2026-06 | Perene |
| E-08 | Edge Function | Supabas e | supabase/functions/data-retenti on/index.ts | M4-03 (mecanismo) | Ativa | A auditar |
| E-09 | Memória | Repo | .lovable/memory/security/rls-ac cess-validation.md | M0-02 · M2-01 | 2026-05 | A auditar |
| E-10 | Document o | /mnt/docu ments/ | OPERA_Atlas_Roadmap_Maturidade. pdf (v1.0) | todos | 2026-07 -06 | Perene |
| E-11 | Document o | /mnt/docu ments/ | OPERA_Atlas_Diagnostico_Objetiv o.pdf | M0 · M1 | 2026-07 -06 | Perene |
| E-12 | Pendente | — | Hash reproduzido em obra real por terceiro | M1-02 | — | Penden te |

| ID | Tipo | Origem | Localização / Descrição | Comprova | Data | Validad e |
| --- | --- | --- | --- | --- | --- | --- |
| E-13 | Pendente | — | Contrato piloto assinado | M1-06 | — | Penden te |
| E-14 | Pendente | — | Suite Vitest RLS cross-tenant | M2-01 | — | Penden te |
| E-15 | Pendente | — | Laudo de pentest | M3-02 | — | Penden te |
| E-16 | Pendente | — | RIPD assinado por DPO | M4-01 · M4-02 | — | Penden te |
| E-17 | Pendente | — | Certificado ISO 27001 | M4-05 | — | Penden te |
| E-18 | Pendente | — | Log de restore de backup validado | M2-06 · M4-03 | — | Penden te |

### 6. Critério Formal de Mudança de Marco

Um marco só transita para "atingido" quando todas as condições abaixo são satisfeitas simultaneamente: (a) Todos os critérios de prioridade Alta deste marco estão com status Concluído e possuem evidência auditada (validade = Perene ou A auditar concluída). (b) Nenhuma dependência crítica listada em §4 permanece aberta. (c) Todas as evidências obrigatórias existem em §5 com localização rastreável (não "Pendente"). (d) Nenhum bloqueador classificado como Alto permanece registrado no índice §2. Critérios de prioridade Média ou Baixa podem transitar para "débito técnico documentado" sem impedir a promoção do marco — desde que registrados no histórico §7 e no §8 do OPERA_CORE.

### 7. Histórico de Evolução

Log incremental. Cada versão registra apenas o que mudou. Acompanhamento sem releitura integral.

| Versão | Data | Mudança | Status |
| --- | --- | --- | --- |
| v1.0 | 2026-07-06 | Roadmap inicial publicado. M0 declarado concluído. Marcos M1–M4 com critérios textuais e gaps identificados. | publicado |
| v1.1 | 2026-07-06 | Governança contínua ativada: IDs de critério (M0-01 … M4-05), evidências normalizadas (E-01 … E-18), painel executivo, critério formal §6, cadeia crítica de dependências. | publicado |
| v1.2 | — | + Hash reproduzido em obra real (M1-02) · E-12 promovida a auditada. | reservado |
| v1.3 | — | + Domínio próprio (M1-04) · + Onboarding validado (M1-05). | reservado |
| v1.4 | — | + Contrato piloto assinado (M1-06) · E-13 promovida. | reservado |
| v1.5 | — | → M1 atingido conforme §6. | reservado |

### 8. Como Atualizar Este Documento

- Cada avanço real gera: (1) uma linha nova em §7, (2) atualização de status do critério em §3, (3) promoção da

evidência correspondente em §5, (4) revisão do painel executivo em §1.

- Nenhuma mudança de status de marco pode ocorrer sem passar pelas quatro condições do §6.

- Novas evidências recebem o próximo ID sequencial (E-19, E-20, …). IDs não são reciclados.

- Novos critérios recebem o próximo ID do marco (ex. M1-07).

- Este PDF é regerado, não editado à mão. Script versionado em /tmp/gen_gov.py .

- A cadência mínima recomendada de atualização é semanal enquanto M1 estiver aberto, e mensal a partir de

M2.

#### Anexo — Diferença v1.0 v1.1

| Aspecto | Roadmap v1.0 | Governança v1.1 |
| --- | --- | --- |
| Natureza | Documento estático | Instrumento vivo |
| Critérios | Texto livre por marco | ID único, prioridade, validação objetiva, dependências, status |
| Evidências | Menções pontuais no corpo | Tabela E-01 … E-18 com localização, data e validade |
| Progresso | Descritivo | Percentual por marco + barra + KPIs executivos |

| Promoção de marco | Implícita | Regra formal §6 com 4 condições obrigatórias |
| --- | --- | --- |
| Rastreabilidade | Anexo A textual | Cadeia crítica §4 + evidências rastreáveis §5 |
| Histórico | Não existe | §7 versionado, incremental |
| Público-alvo | Leitura interna | Investidor, cliente enterprise, auditor, equipe |

<a id="d09"></a>

## 12. APMO v1.0 — Auditoria de Preservação da Memória Operacional

> **Status:** Vigente  
> **Camada:** Auditoria  
> **Conceito:** Avalia se o ecossistema preserva, reconstrói e audita a memória operacional de uma obra. IPMO global 44/100 — faixa "gestão operacional", não "memória preservada".  
> **Contexto:** Protocolo de 12 etapas com 8 não-conformidades (NC-01 a NC-08). Aponta que a preservação é alta no domínio financeiro e baixa em evidências, cronograma, estoque e contexto semântico.  
> **Origem:** `OPERA_APMO_v1.0.pdf` · **Versão:** 1.0 · **Data:** 10/07/2026

Documento OPERA_APMO_v1.0 Escopo OPERA Atlas (módulo existente no repositório) Método Protocolo APMO — 12 etapas + IPMO Base de evidência Repositório, schema Postgres, RLS, edge functions Natureza Somente leitura — nenhuma alteração de código ou schema Referência normativa OPERA_CORE v1.3 (Constituição Arquitetural)

### Sumário Executivo

Esta auditoria avalia se o OPERA Atlas — hoje o único módulo do ecossistema OPERA implementado no repositório — possui arquitetura capaz de preservar, reconstruir e auditar a memória operacional de uma obra ao longo de seu ciclo de vida. A avaliação é evidence-based: cada afirmação é rastreável a um artefato do repositório (função de banco, tabela, RLS, edge function ou componente). O Atlas nasceu como sistema de registro de mão de obra e evoluiu para uma arquitetura de eventos com fechamento imutável (invariante I11 do OPERA_CORE). A preservação de memória, portanto, é alta no domínio financeiro/folha e baixa nos demais domínios (cronograma, evidências, riscos, contexto semântico). IPMO Global consolidado Gestão operacional Faixa 41–70. O sistema registra e gerencia o estado corrente, mas ainda não constitui memória operacional preservada por completo. /100 Três principais bloqueios de preservação

| B1 | Evidências fotográficas sem hash, sem assinatura e sem lineage semântico Bucket obra-fotos é público e não carrega hash por arquivo, EXIF preservado, assinatura digital ou vínculo obrigatório com atividade/ECO/REO. Fere I5 (Lineage de Evidência) e inviabiliza uso probatório. |
| --- | --- |
| B2 | Ausência de snapshot operacional fora do domínio folha Apenas periodos_fechados.snapshot_json materializa estado consolidado (folha do mês). Cronograma, estoque, riscos, dashboards e decisões não têm snapshot temporal — impossível reconstruir 'estado da obra em 12/03'. |
| B3 | Retificação formal existe apenas para fechamentos financeiros I11 (hashes imortais + reabertura versionada) cobre apenas periodos_fechados. Edição de obra, atividade, colaborador, risco e registro diário faz UPDATE destrutivo — o rastro sobrevive só em audit_logs_db, sem versionamento navegável. |

### 1. Premissa e método

A memória operacional de uma obra é um ativo. Sua perda antecede a perda econômica, jurídica e reputacional. Um sistema que apenas armazena dados correntes gerencia operação; um sistema que preserva memória permite, em qualquer instante futuro, responder:

- O que aconteceu, quando, quem registrou e em que contexto?

- Qual era o estado consolidado da obra naquele instante?

- Como esse estado evoluiu até o presente?

- Existe comprovação de não-adulteração?

- Caso tenha sido retificado, o registro original permanece acessível?

Escala de classificação por requisito

| Classificação | Significado |
| --- | --- |
| Implementado | Requisito atendido integralmente, com evidência no repositório. |
| Implementado com limitações | Atendido, mas com restrições de cobertura, escala ou completude. |
| Parcialmente implementado | Atendido em parte do domínio; lacunas materiais permanecem. |
| Não implementado | Requisito ausente do repositório atual. |
| Necessita revisão conceitual | O modelo atual não pode satisfazer o requisito sem redesenho. |

Escala IPMO (0–100) por domínio

| Faixa | Nível | Significado |
| --- | --- | --- |
| 0–40 | Registro operacional | O sistema armazena dados; não preserva estado. |
| 41–70 | Gestão operacional | O sistema gerencia o estado corrente; memória fragmentada. |
| 71–90 | Memória operacional preservada | É possível reconstruir estados passados com integridade. |
| 91–100 | Arquitetura de preservação verificável | Reconstrução com prova independente do banco. |

### Etapa 1 — Inventário da Informação

Mapeamento dos objetos que o Atlas produz hoje e seu grau de preservação estrutural. Colunas: ID (identificador único), Ver (versionamento), Hist (histórico navegável), Del.F (exclusão física), Del.L (exclusão lógica/soft), Trilha (audit_logs_db ou equivalente).

| Objeto | ID | Ver | Hist | Del.F | Del.L | Trilha |
| --- | --- | --- | --- | --- | --- | --- |
| obras | sim | nao | parc | nao | sim | sim |
| atividades (Gantt) | sim | nao | parc | sim | nao | sim |
| atividade_dependencias | sim | nao | nao | sim | nao | sim |
| cronograma_baseline | sim | nao | nao | sim | nao | parc |
| colaboradores | sim | nao | parc | nao | sim | sim |
| colaborador_obras | sim | nao | nao | sim | nao | sim |
| registro_presencas | sim | parc | parc | parc | nao | sim |
| apontamento_diarias | sim | nao | parc | nao | sim | sim |
| periodos_fechados | sim | sim | sim | nao | sim | sim |
| periodos_reaberturas | sim | sim | sim | nao | nao | sim |
| registros_diarios (produção) | sim | nao | nao | sim | nao | sim |
| consumo_materiais | sim | nao | nao | sim | nao | sim |
| lote_materiais | sim | nao | nao | sim | nao | sim |
| retrabalhos | sim | nao | nao | sim | nao | sim |
| riscos | sim | nao | nao | sim | nao | sim |
| incidentes_seguranca | sim | nao | nao | sim | nao | sim |
| checklist_semanal | sim | nao | nao | sim | nao | sim |
| acoes_corretivas | sim | nao | nao | sim | nao | sim |
| lancamentos_financeiros | sim | nao | parc | nao | sim | sim |
| evidências (obra-fotos) | parc | nao | nao | sim | nao | nao |
| audit_logs (app) | sim | - | - | nao | - | proprio |
| audit_logs_db (triggers) | sim | - | - | nao | - | proprio |
| system_events (causal) | sim | - | - | nao | - | proprio |
| profiles / user_roles | sim | nao | nao | sim | nao | sim |
| tenants | sim | nao | nao | sim | nao | parc |

Leitura: apenas periodos_fechados e periodos_reaberturas apresentam versionamento e histórico navegáveis por design. Todos os demais objetos operacionais dependem de audit_logs_db (registro de diff via trigger), que é trilha, não versão. Evidências fotográficas são o objeto menos preservado do inventário.

### Etapa 2 — Estado Operacional Verificável (EOV)

Avaliação da capacidade de reconstruir integralmente um instante passado da obra por domínio.

| Domínio | Reconstrução | Mecanismo / lacuna |
| --- | --- | --- |
| Custos / folha | Implementado | folha_pagamento() é determinística (I9); snapshot_json + hash S |
| Produção | Parcialmente implementado | registros_diarios armazena produção corrente; sem snapshot me |
| Planejamento | Parcialmente implementado | cronograma_baseline existe como tabela; sem versionamento fo |
| Equipes | Parcialmente implementado | colaborador_obras registra vínculos correntes; presença em uma |
| Estoque / materiais | Não implementado | consumo_materiais e lote_materiais mantêm estado corrente; se |
| Evidências (fotos) | Não implementado | Bucket público; sem hash, sem manifesto, sem vínculo formal co |
| Clima / ambiente | Não implementado | Dado não capturado pelo sistema. |
| Responsáveis / decisões | Parcialmente implementado | audit_logs registra ator (user_id) por ação; sem 'decisão' como e |
| Uso de IA | Não implementado | Nenhum evento em system_events marca uso de IA na decisão |
| Contexto causal | Implementado com limitações | system_events + correlation_id/causation_id existem (I11, log_sy |

### Etapa 3 — Cadeia de Integridade

O único subsistema com prova criptográfica é o fechamento de folha. A função folha_pagamento() retorna rule_version='v2', incluindo status_contabil no input do hash, e computa SHA-256 via extensions.digest() sobre o JSON canônico da folha. O hash é armazenado em periodos_fechados.hash_snapshot junto ao snapshot_json completo. A RPC verificar_hash_periodo() reprocessa a folha e compara o hash — retornando integro=true/false.

| Aspecto | Cobertura atual |
| --- | --- |
| Algoritmo | SHA-256 (extensions.digest) |
| Cobre snapshot financeiro | Sim — folha inteira, canonizada como JSON |
| Cobre arquivos (fotos, PDFs) | Não — bucket obra-fotos não gera hash por objeto |
| Cobre cronograma / baseline | Não |
| Cobre contexto (decisão, aprovação) | Não |
| Encadeamento entre versões | Parcial — periodos_reaberturas carrega hash_anterior e causation_id |
| Assinatura digital | Não — sem chave privada, sem PKI |
| Timestamp externo (RFC 3161 / TSA) | Não — timestamp interno via now() |
| Prova independente do banco | Não — auditor precisa acessar o Postgres para verificar |

### Etapa 4 — Versionamento

O Atlas trata versionamento como invariante local, não como padrão arquitetural. O único objeto versionado por design é o fechamento de período:

- periodos_fechados.versao (inteiro) + índice único parcial sobre reaberto_em IS NULL garantem apenas uma

versão ativa por (tenant, obra, mês). (↔

- periodos_reaberturas armazena, append-only, o snapshot e hash anteriores, motivo 20 chars), autor,

correlation_id e causation_id. → →

- RPCs reabrir_periodo e refechar_periodo encadeiam versões (v1 reabertura v2) com trilha causal em

system_events. Todos os demais objetos — obra, atividade Gantt, colaborador, risco, registro diário, incidente, aditivo — sofrem UPDATE destrutivo. O único rastro é audit_logs_db, que grava old_data/new_data via trigger fn_audit_log_changes. Isso permite auditar a mudança, mas não permite consultar, restaurar ou comparar versões dentro do domínio operacional sem replay manual.

### Etapa 5 — Cadeia de Custódia de Evidências

Bucket obra-fotos é público (§8 do OPERA_CORE já reconhece o risco). Cada objeto carrega apenas caminho e metadados nativos do Storage. Não há:

- Hash SHA-256 por arquivo armazenado no banco

- Manifesto assinado agrupando fotos de uma jornada

- EXIF preservado como coluna estruturada (dispositivo, GPS, horário original)

- Assinatura digital do uploader

- Vínculo obrigatório com atividade, ECO, REO ou indicador (I5 — Lineage de Evidência)

- Histórico de acessos ao objeto (quem leu, quando)

- Proteção contra substituição por mesmo path

Classificação: Necessita revisão conceitual. A arquitetura atual não pode satisfazer o requisito probatório sem mudança de modelo (bucket privado + tabela evidencias com hash, signatário, referências operacionais e política de retenção).

### Etapa 6 — Preservação do Contexto

Uma evidência ou registro só constitui memória operacional se puder ser posicionada dentro do tecido causal da obra. A cobertura contextual atual do Atlas:

| Relação | Cobertura |
| --- | --- |
| Registro ≥ obra | Implementado — FK obrigatória em quase todas as tabelas. |
| Registro ≥ tenant | Implementado — invariante I1, coberto por RLS. |
| Registro ≥ ator (user) | Implementado — created_by / updated_by / audit_logs.user_id. |
| Registro ≥ correlation_id causal | Parcialmente implementado — completo nas edge functions e RPCs d |
| Evidência ≥ atividade (Gantt) | Não implementado. |
| Evidência ≥ ECO / REO / ICO | Não implementado — entidades ausentes do schema. |
| Registro ≥ indicador / dashboard | Não implementado. |
| Registro ≥ contrato / aditivo | Parcialmente implementado — aditivos_contratuais existe, sem víncul |
| Registro ≥ decisão / aprovação | Não implementado — decisão não é entidade de primeira classe. |

### Etapa 7 — Preservação Semântica

Pergunta central: em cinco anos, será possível compreender o significado de um registro sem seu autor original? Para o domínio financeiro, sim — folha, presença, tipo e valor unitário são explícitos. Para evidências e produção, não:

- Foto sem descrição textual, sem classificação, sem motivo de captura.

- Produção como string livre em registros_diarios.producao — extração numérica via trigger heurística.

- Risco sem taxonomia normalizada além de severidade (alta/média/baixa).

- Ação corretiva sem vínculo forte ao evento que a originou.

Consequência: os arquivos sobrevivem, o significado não. O Atlas tem integridade física sem preservação semântica no domínio de campo.

### ∆

### Etapa 8 — Delta Operacional (O)

Não implementado como conceito. Existe diff bruto em audit_logs_db (old_data vs new_data), mas nenhuma ∆O função computa por domínio — variação de produção, cronograma, custo, estoque, equipes ou riscos entre dois ∆O, instantes arbitrários. Sem o sistema não responde 'o que mudou desde a última visita à obra?' de forma consolidada.

### Etapa 9 — Retificação Operacional

Retificação como evento formal com preservação do registro original existe exclusivamente para fechamentos de período (invariante I11):

| Requisito | Fechamento | Demais objetos |
| --- | --- | --- |
| Conceito de retificação | sim (reabertura) | nao (edit direto) |
| Histórico navegável | sim (periodos_reaberturas + periodos_fechados.versao) | audit_logs_db apenas |
| Justificativa obrigatória | sim (motivo ↔ 20 chars) | nao |
| Aprovação | papel admin obrigatório | nao |
| Registro original preservado | sim (snapshot_anterior_json imortal) | nao |
| Gera novo estado (não sobrescreve) | sim (versao + 1) | nao (UPDATE) |
| Causation chain (correlation_id) | sim (system_events) | parcial |

### Etapa 10 — Inteligência Temporal

Para o mês fechado: sim — snapshot_json + hash reconstroem folha, presenças e ajustes. Para qualquer outra pergunta temporal — cronograma vigente em 12/03, equipe presente em 07/06, estoque em 01/09, riscos ativos em 15/10 — o Atlas depende de replay manual de audit_logs_db, sem RPC dedicada, sem UI e sem garantia de determinismo (audit_logs_db não cobre 100% das tabelas com trigger). Classificação: Parcialmente implementado.

### Etapa 11 — Robustez da Arquitetura

| Cenário | Estado atual |
| --- | --- |
| Perda de servidor de aplicação | Baixo risco — Lovable/Vite serve estático; sem estado no servidor. |
| Perda de banco | Depende de backup gerenciado do Supabase; sem teste de restore documen |
| Falha de sincronização | Não aplicável — Atlas é online-first, sem replicação cliente. |
| Falha offline | Não coberto — sem modo offline; perda de captura no campo. |
| Duplicidade / concorrência | Controlada por RLS + triggers + índice único parcial (periodos_fechados). |
| Alterações simultâneas | Última escrita vence; sem locking otimista explícito fora de fechamento. |
| Backups externos ao provedor | Não implementado. |
| Auditoria externa independente | Não viável — hash exige acesso ao Postgres para reprocessamento. |

### Etapa 12 — IPMO por Domínio

Avaliação 0–100 por domínio de preservação, com justificativa e evidência. Integridade —

Evidência: folha_pagamento(), verificar_hash_periodo(), periodos_fechados.hash_snapshot Temporalidade — 55

domínio folha. Evidência: fn_set_status_contabil, fn_check_periodo_fechado, OPERA_CORE §5 Contexto — 40

Evidência: system_events, log_system_event, set_correlation_context Versionamento —

Evidência: periodos_fechados.versao, periodos_reaberturas, ausência em outras tabelas Cadeia de Custódia —

Evidência: storage/obra-fotos (público), OPERA_CORE §8 Auditabilidade — 65

Evidência: audit_logs, audit_logs_db, system_events, fn_audit_log_changes Reconstrução Histórica —

Evidência: snapshot_json, listar_historico_periodo, ausência de RPCs equivalentes Preservação Semântica —

Evidência: obra-fotos, registros_diarios.producao (trigger heurística), riscos Assinaturas — 5

Evidência: ausente do repositório

Evidência: listar_historico_periodo, verificar_hash_periodo Média aritmética simples dos 10 domínios: 37/100 — faixa Gestão operacional. O IPMO Global reportado no sumário (44) pondera domínios probatórios (Integridade, Custódia, Assinaturas) com peso maior por sua criticidade jurídica.

### Matriz de Não-Conformidades

Para cada requisito não plenamente atendido, ficha compacta com os 12 campos exigidos pelo protocolo APMO: diagnóstico técnico, riscos (operacional / rastreabilidade / decisão / jurídico), conceito arquitetural, modelo de dados, fluxo, critérios de validação, dependências no ecossistema e prioridade.

| NC-01 Cadeia de Custódia de Evidências (Etapa 5) |  | Prioridade: Crítica |
| --- | --- | --- |
| Diagnóstico técnico | Bucket obra-fotos é público; sem tabela evidencias com hash, assinatura, EXIF ou lineage operacional obrigatório. |  |
| Risco operacional | Foto substituível, apagável ou plantada sem detecção. |  |
| Impacto em rastreabilidade | Perda de I5 (Lineage de Evidência). |  |
| Impacto em decisão | Evidência não confiável para aprovação de medição ou aditivo. |  |
| Impacto jurídico / probatório | Fotos inadmissíveis em juízo por ausência de custódia. |  |
| Conceito arquitetural | Bucket privado + signed URLs; tabela evidencias imutável com hash SHA-256, uploader, dispositivo, GPS, timestamp original e FKs obrigatórias para atividade/ECO. |  |
| Contexto operacional | Captação em campo (futuro Copiloto); auditoria de qualidade e segurança. |  |
| Modelo de dados | evidencias(id, tenant_id, obra_id, atividade_id, hash, storage_path, uploader_id, device_hash, geo, captured_at, tipo, descricao_obrigatoria, hash_manifesto). |  |
| Fluxo recomendado | Upload → edge function calcula hash → grava evidencia → gera signed URL curta → bloqueia sobrescrita por path. |  |
| Critérios de validação | 100% das fotos com hash; 0 fotos sem FK operacional; verificação amostral reproduz hash. |  |
| Dependências | Atlas: schema + edge function. Copiloto: captura mobile com hash local. Control: gera atividade de referência. |  |
| Prioridade | Crítica — pré-requisito jurídico. |  |

| NC-02 Snapshot Operacional fora do domínio folha (Etapas 2, 10) |  | Prioridade: Alta |
| --- | --- | --- |
| Diagnóstico técnico | Apenas periodos_fechados materializa estado consolidado. Cronograma, estoque, riscos, dashboards não têm snapshot temporal. |  |
| Risco operacional | Impossível responder 'estado da obra em X' fora do escopo financeiro. |  |
| Impacto em rastreabilidade | Reconstrução por replay de audit_logs_db é frágil e não auditável. |  |
| Impacto em decisão | Análise pós-fato de decisões perde base factual. |  |
| Impacto jurídico / probatório | Ausência de fotografia periódica do estado global reduz valor probatório do sistema. |  |
| Conceito arquitetural | Snapshot semanal por obra: hash + JSON canônico de cronograma, estoque, equipes, riscos, indicadores. |  |
| Contexto operacional | Auditoria de contrato, due diligence, reconstituição pós-incidente. |  |
| Modelo de dados | snapshots_operacionais(id, tenant_id, obra_id, tipo, semana, snapshot_json, hash, gerado_em, gerado_por). |  |
| Fluxo recomendado | Cron semanal por obra → função geradora determinística por domínio → grava snapshot + hash. |  |
| Critérios de validação | Todo (obra, semana) tem snapshot; hash reprocessável; UI permite navegar linha do tempo. |  |
| Dependências | Atlas: funções geradoras. Control: fornece estado corrente confiável. Copiloto: sem dependência direta. |  |
| Prioridade | Alta |  |

| NC-03 Versionamento genérico de entidades (Etapa 4) |  | Prioridade: Alta |
| --- | --- | --- |
| Diagnóstico técnico | Apenas fechamentos são versionados. UPDATE em obra/atividade/risco/colaborador é destrutivo. |  |
| Risco operacional | Alterações silenciosas em dados-mestre passam despercebidas. |  |
| Impacto em rastreabilidade | Necessário replay manual de audit_logs_db para reconstruir uma entidade. |  |
| Impacto em decisão | Decisão baseada em versão anterior não recuperável de forma canônica. |  |
| Impacto jurídico / probatório | Edição de contrato/atividade sem versão navegável é fragilidade em juízo. |  |
| Conceito arquitetural | Padrão temporal (system-versioned): tabela _hist com valid_from/valid_to; views expõem versão ativa. |  |
| Contexto operacional | Aditivos contratuais, replanejamento de cronograma, mudança de escopo. |  |
| Modelo de dados | Por entidade crítica: atividades_hist, obras_hist, riscos_hist. Trigger BEFORE UPDATE grava versão anterior. |  |
| Fluxo recomendado | UPDATE → trigger arquiva versão anterior com motivo obrigatório → RPC restaura_versao(id, v). |  |
| Critérios de validação | Toda entidade crítica tem histórico navegável; UI de comparação; restauração via RPC auditada. |  |
| Dependências | Atlas: migrações + UI. Control: alimenta atividades. Copiloto: sem dependência direta. |  |
| Prioridade | Alta |  |

| NC-04 Delta Operacional (∆O) automatizado (Etapa 8) |  | Prioridade: Média |
| --- | --- | --- |
| Diagnóstico técnico | Conceito ausente. Existe apenas diff bruto em audit_logs_db, não ∆O consolidado por domínio. |  |
| Risco operacional | Gestor não recebe resumo do que mudou entre visitas ou reuniões. |  |
| Impacto em rastreabilidade | Mudanças materiais só emergem por leitura manual. |  |
| Impacto em decisão | Perda de janela para reação a desvios de cronograma, estoque ou risco. |  |
| Impacto jurídico / probatório | Baixo direto — indireto via alertas não emitidos. |  |
| Conceito arquitetural | Função delta_operacional(obra_id, t0, t1) que compara snapshots (NC-02) e produz ∆O por domínio. |  |
| Contexto operacional | Relatório semanal, reunião de obra, alerta de investidor. |  |
| Modelo de dados | Dependente de NC-02. Saída: jsonb com delta por domínio + severidade. |  |
| Fluxo recomendado | Semanal: gerar ∆O(t-7, t0) por obra → dispara notificações se severidade > limiar. |  |
| Critérios de validação | ∆O reproduzível; cobertura de todos os domínios do snapshot; latência ≤ 5s. |  |
| Dependências | Depende de NC-02. Atlas: função + UI. Copiloto: consome via chat. |  |
| Prioridade | Média |  |

| NC-05 Assinatura digital e timestamp externo (Etapas 3, 5) |  | Prioridade: Média |
| --- | --- | --- |
| Diagnóstico técnico | Hash SHA-256 forte, mas sem chave privada, sem PKI, sem timestamp externo (RFC 3161). |  |
| Risco operacional | Prova de integridade depende exclusivamente do acesso ao Postgres do provedor. |  |
| Impacto em rastreabilidade | Auditor externo não consegue verificar sem credenciais internas. |  |
| Impacto em decisão | Baixo direto. |  |
| Impacto jurídico / probatório | Alto — sem timestamp externo, momento de fechamento é auto-declarado. |  |
| Conceito arquitetural | Assinatura do hash de fechamento por chave gerenciada; carimbo do tempo em TSA pública (RFC 3161); publicação periódica de merkle root em ledger externo. |  |
| Contexto operacional | Auditoria independente, due diligence, disputa contratual. |  |
| Modelo de dados | periodos_fechados.assinatura_pkcs7, .tsr_bytes, .merkle_batch_id. |  |
| Fluxo recomendado | Refechamento → hash → assinar → obter TSR → arquivar → batch semanal de merkle root. |  |
| Critérios de validação | Verificação offline por terceiro apenas com chave pública e TSR. |  |
| Dependências | Atlas: edge function + secret PKI. Independente de Control/Copiloto. |  |
| Prioridade | Média |  |

| NC-06 Cobertura causal em mutações cliente (Etapas 6, 10) |  | Prioridade: Média |
| --- | --- | --- |
| Diagnóstico técnico | correlation_id/causation_id existem e são propagados em edge functions e RPCs financeiras. Mutações cliente diretas (registro_presencas, apontamento_diarias, atividades Gantt) ainda não estão sistematicamente envolvidas. |  |
| Risco operacional | Trilha causal com buracos; difícil correlacionar UI → banco → evento em cadeia. |  |
| Impacto em rastreabilidade | Média — audit_logs_db grava tudo; falta o fio condutor. |  |
| Impacto em decisão | Investigação de incidente demanda reconciliação manual. |  |
| Impacto jurídico / probatório | Baixo direto. |  |
| Conceito arquitetural | Wrapper cliente traced() aplicado a todas mutações; correlation_id derivado de sessão/UI action. |  |
| Contexto operacional | Toda edição feita por usuário fora de RPC. |  |
| Modelo de dados | Reuso de src/lib/observability.ts + set_correlation_context no início de cada mutação. |  |
| Fluxo recomendado | Retrofit progressivo por página (Presenças, Diárias, Gantt, Riscos). |  |
| Critérios de validação | ↔ 95% dos eventos de audit_logs_db com correlation_id não-nulo. |  |
| Dependências | Atlas apenas. Já previsto em F1.5 do OPERA_CORE §8. |  |
| Prioridade | Média |  |

| NC-07 Preservação semântica de campo (Etapa 7) |  | Prioridade: Alta |
| --- | --- | --- |
| Diagnóstico técnico | Foto sem descrição/classificação obrigatória; produção como texto livre; riscos sem taxonomia. |  |
| Risco operacional | Registros sem significado extraível por terceiro. |  |
| Impacto em rastreabilidade | Impossível recuperar intenção do registrador. |  |
| Impacto em decisão | IA e dashboards operam sobre sinal ruidoso. |  |
| Impacto jurídico / probatório | Foto sem descrição não sustenta narrativa em disputa. |  |
| Conceito arquitetural | Taxonomia normalizada por domínio + campo descricao obrigatório em evidências + captação estruturada de produção (unidade + valor). |  |
| Contexto operacional | Toda captação em campo (Control e Copiloto assumem esse papel no ecossistema). |  |
| Modelo de dados | Tabelas de referência: tipos_evidencia, unidades_producao, categorias_risco. |  |
| Fluxo recomendado | UI de captação força seleção de taxonomia; Copiloto oferece descrição sugerida. |  |
| Critérios de validação | 100% das novas evidências com descrição e classificação. |  |
| Dependências | Atlas: schema. Control: UI mobile. Copiloto: sugestão semântica. |  |
| Prioridade | Alta |  |

| NC-08 Robustez e recuperação verificada (Etapa 11) |  | Prioridade: Alta |
| --- | --- | --- |
| Diagnóstico técnico | Backup gerenciado do provedor sem teste de restore documentado; sem modo offline; sem backup externo. |  |
| Risco operacional | Indisponibilidade prolongada ou perda de janela crítica em campo. |  |
| Impacto em rastreabilidade | Perda catastrófica é possível. |  |
| Impacto em decisão | Operação para sem acesso ao Atlas. |  |
| Impacto jurídico / probatório | Sem prova de que restauração funciona, hash imortal não protege contra perda física. |  |
| Conceito arquitetural | Teste trimestral de restore; backup externo cifrado; modo offline no Control com sincronização causal. |  |
| Contexto operacional | Piloto pago, cliente corporativo, obras remotas. |  |
| Modelo de dados | Log de testes de restore em system_events; hash de backup externo em tabela dedicada. |  |
| Fluxo recomendado | Cron trimestral → restore em staging → validação de contagens e hashes → registro em system_events. |  |
| Critérios de validação | Último teste de restore ≤ 90 dias; backup externo ≤ 24h de defasagem. |  |
| Dependências | Atlas: procedimento. Control: modo offline. Copiloto: sem dependência. |  |
| Prioridade | Alta |  |

### Veredito Final

IPMO Global: /100 — faixa Gestão Operacional. O OPERA Atlas preserva memória operacional plena no domínio financeiro (folha, fechamento, reabertura) e gerencia estado corrente nos demais domínios sem constituir memória preservada. As lacunas críticas — cadeia de custódia de evidências, snapshots operacionais fora da folha, versionamento genérico e assinatura externa — não são defeitos de execução: são limites arquiteturais que exigem ampliação do modelo, não correção de código. Este diagnóstico não propõe alteração da Constituição Arquitetural. As não-conformidades listadas conversam com §7 (Contratos), §9 (Snapshots), §13 (Observabilidade) e §24 (Congelamento Arquitetural), servindo como pauta permanente de RFCs para os próximos ciclos de evolução do ecossistema OPERA.

OPERA_APMO_v1.0 — Documento evidence-based gerado a partir do repositório OPERA Atlas. Referências: OPERA_CORE v1.3, Governança de Maturidade v1.1, Constituição Arquitetural v1.0.

<a id="d10"></a>

## 13. Manual do Sistema

> **Status:** Vigente  
> **Camada:** Operacional  
> **Conceito:** Guia funcional de uso das telas, fluxos e regras operacionais do Atlas.  
> **Contexto:** Documento vivo do repositório, voltado ao usuário e ao operador — não à arquitetura.  
> **Origem:** `MANUAL_SISTEMA.md` · **Versão:** — · **Data:** —

### Documentação Técnica Completa — Método O.P.E.R.A.

#### Plataforma SaaS Multi-Tenant de Gestão de Obras

**Versão:** 1.0 Beta  
**Data:** Março 2026  
**URL Produção:** https://opera-atlas.lovable.app  
**Stack:** React 18 + TypeScript + Vite + Supabase (Lovable Cloud)

---

#### Sumário

1. [Objetivo do Sistema](#1-objetivo-do-sistema)
2. [Arquitetura Geral](#2-arquitetura-geral)
3. [Modelo de Dados](#3-modelo-de-dados)
4. [Autenticação e Controle de Acesso (RBAC)](#4-autenticação-e-controle-de-acesso-rbac)
5. [Multi-Tenancy e Isolamento de Dados](#5-multi-tenancy-e-isolamento-de-dados)
6. [Módulos Operacionais](#6-módulos-operacionais)
7. [Dashboard e OPERA Score](#7-dashboard-e-opera-score)
8. [Edge Functions (Backend Serverless)](#8-edge-functions-backend-serverless)
9. [Sistema Beta e Onboarding](#9-sistema-beta-e-onboarding)
10. [Política de Retenção de Dados](#10-política-de-retenção-de-dados)
11. [Super Admin — Modelo de Acesso](#11-super-admin--modelo-de-acesso)
12. [Segurança e Boas Práticas](#12-segurança-e-boas-práticas)
13. [Padrões de Código e Arquitetura Frontend](#13-padrões-de-código-e-arquitetura-frontend)
14. [Fluxos Completos](#14-fluxos-completos)
15. [Capacidade e Limites](#15-capacidade-e-limites)
16. [Roadmap e Itens Pendentes](#16-roadmap-e-itens-pendentes)
17. [Proposta Comercial vs. Estado Atual](#17-proposta-comercial-vs-estado-atual)
18. [Glossário Técnico](#18-glossário-técnico)

---

#### 1. Objetivo do Sistema

O **Método O.P.E.R.A.** é uma plataforma SaaS de gestão de obras civis que dá visibilidade operacional e financeira em tempo real a construtoras, incorporadoras e empreiteiras.

##### Acrônimo O.P.E.R.A.

| Pilar | Nome | Foco | Tabelas Relacionadas |
|-------|------|------|---------------------|
| **O** | Organização | Mão de obra, folha de ponto, produtividade, custo/m² | `registros_diarios` |
| **P** | Padronização | Consumo de insumos, desperdício real vs. previsto, ranking por material | `consumo_materiais`, `compras_emergenciais` |
| **E** | Eficiência | Gestão de ativos/equipamentos, ciclos de tarefa, logística interna | `ativos`, `ciclos_tarefa`, `logistica_interna` |
| **R** | Redução de Perdas | Linha de Balanço, mapa de riscos, retrabalhos | `sequenciamento_equipes`, `riscos`, `retrabalhos` |
| **A** | Análise Contínua | Fluxo de caixa, aditivos contratuais, margem de lucro | `lancamentos_financeiros`, `aditivos_contratuais` |

##### Módulos Transversais

| Módulo | Tabela | Descrição |
|--------|--------|-----------|
| Segurança & Qualidade | `incidentes_seguranca` | Acidentes, NCs, inspeções, dias sem acidente |
| Ações Corretivas | `acoes_corretivas` | Registro com foto, responsável, prazo, prioridade |
| Checklist Semanal | `checklist_semanal` | 20 itens do método O.P.E.R.A. por semana |

---

#### 2. Arquitetura Geral

##### Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Frontend** | React 18 + TypeScript + Vite | SPA rápido, type-safe, HMR |
| **UI** | Tailwind CSS + shadcn/ui + Recharts | Design system consistente, componentes acessíveis |
| **Estado** | TanStack React Query v5 | Cache, refetch, invalidação automática |
| **Roteamento** | React Router v6 | Rotas aninhadas, guards |
| **Backend** | Supabase (Lovable Cloud) | PostgreSQL + Auth + Storage + Edge Functions |
| **Banco** | PostgreSQL 15 com RLS | Isolamento por tenant via Row Level Security |
| **Auth** | Supabase Auth | Email/senha + Google OAuth |
| **Functions** | Supabase Edge Functions (Deno) | Serverless, deploy automático |
| **Storage** | Supabase Storage | Bucket `obra-fotos` (público) |
| **PDF** | jsPDF + jspdf-autotable | Relatórios exportáveis |
| **PWA** | vite-plugin-pwa | Instalável como app, ícones 192/512 |

##### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (Vite)                    │
│                                                       │
│  BrowserRouter                                        │
│  ├── AuthProvider (useAuth.tsx)                       │
│  │   ├── /landing, /login, /beta → Públicas           │
│  │   └── ProtectedRoute                              │
│  │       ├── ObraProvider (useObra.tsx)               │
│  │       │   └── AppLayout (Sidebar + Content)       │
│  │       │       ├── DashboardOverview               │
│  │       │       ├── OrganizacaoPage                 │
│  │       │       ├── PadronizacaoPage                │
│  │       │       ├── EficienciaPage                  │
│  │       │       ├── ReducaoPerdasPage               │
│  │       │       ├── AnaliseContinuaPage             │
│  │       │       ├── SegurancaQualidadePage          │
│  │       │       ├── AcoesCorretivasPage             │
│  │       │       ├── ChecklistSemanalPage            │
│  │       │       └── AdminPage                       │
│  │       └── /setup → SetupPage                      │
│  │                                                    │
│  └── Hooks Compartilhados                            │
│      ├── useTableData (CRUD genérico)                │
│      ├── usePermissions (visibilidade por role)      │
│      └── useObra (contexto de obra selecionada)      │
│                                                       │
├───────────────────────────────────────────────────────┤
│                   SUPABASE (Backend)                  │
│                                                       │
│  ┌── Auth ──────────────────────────────────────┐    │
│  │  Email/Senha + Google OAuth                   │    │
│  │  Trigger: handle_new_user → cria profile      │    │
│  └───────────────────────────────────────────────┘    │
│                                                       │
│  ┌── Database (PostgreSQL + RLS) ────────────────┐   │
│  │  21 tabelas com RLS por tenant_id             │   │
│  │  Funções: has_role, get_user_tenant_id,       │   │
│  │           is_super_admin, setup_tenant,        │   │
│  │           check_obra_limit                     │   │
│  └───────────────────────────────────────────────┘   │
│                                                       │
│  ┌── Edge Functions ─────────────────────────────┐   │
│  │  accept-invite    → onboarding por convite     │   │
│  │  beta-signup      → inscrição beta + CAPTCHA   │   │
│  │  generate-reset-link → reset de senha          │   │
│  │  data-retention   → limpeza automática (cron)  │   │
│  └───────────────────────────────────────────────┘   │
│                                                       │
│  ┌── Storage ────────────────────────────────────┐   │
│  │  Bucket: obra-fotos (público)                 │   │
│  │  Uso: fotos de ações corretivas               │   │
│  └───────────────────────────────────────────────┘   │
│                                                       │
│  ┌── Cron (pg_cron + pg_net) ────────────────────┐   │
│  │  data-retention-daily → 3h AM diário          │   │
│  └───────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

#### 3. Modelo de Dados

##### 3.1 Tabelas de Infraestrutura (Protegidas)

Estas tabelas **nunca** são afetadas pela política de retenção:

| Tabela | Propósito | Colunas Chave |
|--------|-----------|---------------|
| `tenants` | Empresas/clientes | `id`, `nome`, `cnpj`, `limite_obras` |
| `profiles` | Perfis de usuário | `id` (= auth.uid), `email`, `full_name`, `tenant_id`, `is_super_admin`, `beta_status`, `beta_approved_at` |
| `user_roles` | Papéis RBAC | `user_id`, `role` (enum), `tenant_id` |
| `obras` | Obras/projetos | `id`, `nome`, `tenant_id`, `status`, `custo_orcado_m2` |
| `obra_membros` | Vínculo usuário↔obra | `user_id`, `obra_id`, `tenant_id` |
| `invites` | Convites de equipe | `token`, `email`, `role`, `tenant_id`, `used`, `expires_at` |
| `beta_waitlist` | Lista de espera beta | `email`, `nome`, `status`, `influencer_code` |
| `beta_config` | Config global do beta | `beta_ativo`, `limite_vagas`, `tempo_teste_dias` |
| `influencer_codes` | Códigos de referência | `codigo`, `nome`, `total_cadastros`, `total_convertidos` |

##### 3.2 Tabelas Operacionais (Sujeitas a Retenção)

Todas possuem `tenant_id`, `obra_id` e `created_at`:

| Tabela | Pilar | Campos Específicos |
|--------|-------|-------------------|
| `registros_diarios` | O | `nome`, `entrada`, `saida`, `atividade`, `producao`, `status` |
| `consumo_materiais` | P | `material`, `previsto`, `real_consumo`, `unidade` |
| `compras_emergenciais` | P | `material`, `qtd`, `motivo` |
| `ativos` | E | `nome`, `status` (ativo/ocioso/manutencao), `valor`, `local_atual` |
| `ciclos_tarefa` | E | `tarefa`, `tempo_medio_min`, `tempo_alvo_min`, `qtd_medicoes` |
| `logistica_interna` | E | `equipe`, `origem`, `destino`, `tempo_deslocamento_min` |
| `sequenciamento_equipes` | R | `equipe`, `semana_inicio`, `semana_fim`, `status` |
| `riscos` | R | `risco`, `severidade`, `impacto`, `prazo` |
| `retrabalhos` | R | `etapa`, `quantidade`, `descricao` |
| `lancamentos_financeiros` | A | `tipo` (receita/custo), `valor`, `fornecedor`, `status_pagamento` |
| `aditivos_contratuais` | A | `descricao`, `valor`, `tipo`, `aprovado` |
| `incidentes_seguranca` | Seg | `tipo` (acidente/inspecao/nc), `severidade`, `status` |
| `acoes_corretivas` | Trans | `descricao`, `pilar`, `prioridade`, `status`, `responsavel`, `foto_url` |
| `checklist_semanal` | Trans | `item_key`, `semana`, `verificado`, `verificado_por` |

##### 3.3 Enum de Roles

```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'gestor', 'operacional', 'visualizador');
```

---

#### 4. Autenticação e Controle de Acesso (RBAC)

##### 4.1 Métodos de Login

| Método | Implementação | Status |
|--------|--------------|--------|
| Email/Senha | Supabase Auth nativo | ✅ Ativo |
| Google OAuth | Supabase Social Auth | ✅ Ativo |
| Modo Convidado | sessionStorage + dados demo | ✅ Ativo |
| Recuperação de Senha | Edge Function `generate-reset-link` | ✅ Ativo |

##### 4.2 Hierarquia de Papéis

```
Super Admin (is_super_admin = true no profiles)
  │
  └── Acesso TOTAL a todos os tenants (debugging, suporte, gestão)
      ├── Aprovar/rejeitar betas
      ├── Gerenciar todos os tenants
      ├── Ajustar limites de obras
      └── Ver métricas globais

Admin (role = 'admin' na user_roles)
  │
  └── Acesso COMPLETO dentro do próprio tenant
      ├── CRUD completo + DELETE
      ├── Gerenciar equipe (convites, roles)
      ├── Criar/editar/excluir obras
      └── Ver todos os dados do tenant

Gestor (role = 'gestor')
  │
  └── INSERT + UPDATE + SELECT
      ├── Criar e editar registros
      ├── Criar/editar obras
      └── NÃO pode excluir nem gerenciar equipe

Operacional (role = 'operacional')
  │
  └── INSERT + SELECT
      ├── Apenas inserir registros
      └── NÃO pode editar nem excluir

Visualizador (role = 'visualizador')
  │
  └── SELECT only
      └── Somente leitura
```

##### 4.3 Implementação no Frontend

**Hook `useAuth`** (`src/hooks/useAuth.tsx`):
- Gerencia `AuthContext` com user, session, profile, roles
- Busca profile + roles do banco no login
- Suporta modo convidado (sessionStorage)
- Calcula `isTrialExpired` (30 dias após `beta_approved_at`)

**Hook `usePermissions`** (`src/hooks/usePermissions.ts`):
- Retorna flags: `canInsert`, `canUpdate`, `canDelete`, `canManageRoles`, `canManageObras`, `isViewOnly`
- Quando `isTrialExpired = true`, tudo vira read-only
- Usado pelos componentes para ocultar/exibir botões de CRUD

**Componente `ProtectedRoute`** (`src/components/auth/ProtectedRoute.tsx`):
- Redireciona para `/landing` se não autenticado
- Redireciona para `/beta-status` se beta não aprovado
- Redireciona para `/setup` se sem tenant_id
- Exibe banner de trial expirado
- Exibe aviso de transparência sobre acesso administrativo

##### 4.4 Implementação no Backend (RLS)

Funções `SECURITY DEFINER` (evitam recursão nas policies):

```sql
-- Verifica se usuário tem um role específico
has_role(_user_id uuid, _role app_role) → boolean

-- Verifica se usuário tem QUALQUER dos roles listados
has_any_role(_user_id uuid, _roles app_role[]) → boolean

-- Retorna o tenant_id do usuário
get_user_tenant_id(_user_id uuid) → uuid

-- Verifica se é super admin
is_super_admin(_user_id uuid) → boolean
```

Padrão de RLS por tabela operacional:

```sql
-- SELECT: qualquer membro do tenant
USING (tenant_id = get_user_tenant_id(auth.uid()))

-- INSERT: admin, gestor ou operacional do tenant
WITH CHECK (tenant_id = get_user_tenant_id(auth.uid())
  AND has_any_role(auth.uid(), ARRAY['admin', 'gestor', 'operacional']))

-- UPDATE: admin ou gestor do tenant
USING (tenant_id = get_user_tenant_id(auth.uid())
  AND has_any_role(auth.uid(), ARRAY['admin', 'gestor']))

-- DELETE: somente admin do tenant
USING (tenant_id = get_user_tenant_id(auth.uid())
  AND has_role(auth.uid(), 'admin'))

-- SUPER ADMIN: acesso total (policy separada)
USING (is_super_admin(auth.uid()))
```

---

#### 5. Multi-Tenancy e Isolamento de Dados

##### 5.1 Modelo de Isolamento

```
Tenant A (Construtora ABC)          Tenant B (Engenharia XYZ)
├── obras: [Obra 1, Obra 2]        ├── obras: [Obra 3]
├── users: [admin, gestor1]         ├── users: [admin, op1, op2]
├── registros_diarios: [...]        ├── registros_diarios: [...]
└── lancamentos: [...]              └── lancamentos: [...]

⚠️ Tenant A NUNCA vê dados do Tenant B (RLS garante)
⚠️ Super Admin vê TUDO (policy separada com is_super_admin)
```

##### 5.2 Criação de Tenant (`setup_tenant`)

```sql
-- Função chamada no /setup (primeiro acesso)
setup_tenant(_nome text, _cnpj text)
  1. Verifica se está autenticado
  2. Verifica se já não tem tenant
  3. Cria registro em tenants
  4. Atualiza profiles.tenant_id
  5. Atribui role 'admin' ao criador
  6. Retorna tenant_id
```

##### 5.3 Limite de Obras por Tenant

```sql
-- Trigger check_obra_limit (BEFORE INSERT em obras)
-- Compara COUNT(obras) com tenants.limite_obras
-- Default: 3 obras (ajustável pelo Super Admin)
```

##### 5.4 Hook `useObra`

- Busca obras do tenant (via `profiles.tenant_id`)
- Mantém `selectedObraId` em state
- Todos os hooks de dados filtram por `obra_id` selecionada
- Em modo convidado, usa `DEMO_OBRAS`

##### 5.5 Hook `useTableData` (CRUD Genérico)

```typescript
// src/hooks/useTableData.ts
const { data, isLoading, insert, update, remove } = useTableData<T>("nome_tabela");

// Automaticamente:
// - Filtra por tenant_id e obra_id
// - Em modo convidado, usa DEMO_DATA
// - Invalida cache após mutations
// - Ordena por created_at DESC
```

---

#### 6. Módulos Operacionais

##### 6.1 Organização (O) — `OrganizacaoPage`

**Tabela:** `registros_diarios`  
**KPIs:** Total de registros, custo real/m², atraso médio  
**Analytics:** `src/analytics/atraso.ts` — calcula atraso médio com base em entrada/saída  
**Campos:** nome, data_registro, entrada, saída, atividade, produção, status

##### 6.2 Padronização (P) — `PadronizacaoPage`

**Tabela:** `consumo_materiais`, `compras_emergenciais`  
**KPIs:** Desperdício % ((real - previsto) / previsto × 100), ranking por material  
**Analytics:** `src/analytics/desperdicio.ts` — ranking de materiais por desperdício  
**Campos:** material, previsto, real_consumo, unidade, data_registro

##### 6.3 Eficiência (E) — `EficienciaPage`

**Tabelas:** `ativos`, `ciclos_tarefa`, `logistica_interna`  
**KPIs:** % ativos em uso, tempo médio vs. alvo, tempo médio deslocamento  
**Campos ativos:** nome, status (ativo/ocioso/manutencao), valor, local_atual  
**Campos ciclos:** tarefa, tempo_medio_min, tempo_alvo_min, qtd_medicoes

##### 6.4 Redução de Perdas (R) — `ReducaoPerdasPage`

**Tabelas:** `riscos`, `retrabalhos`, `sequenciamento_equipes`  
**KPIs:** Total riscos por severidade, retrabalhos por etapa, Linha de Balanço  
**Analytics:** `src/analytics/retrabalho.ts` — identifica etapas recorrentes  
**Linha de Balanço:** Visualização Gantt do sequenciamento de equipes

##### 6.5 Análise Contínua (A) — `AnaliseContinuaPage`

**Tabelas:** `lancamentos_financeiros`, `aditivos_contratuais`, `compras_emergenciais`  
**KPIs:** Saldo (receitas - custos), margem %, aditivos aprovados vs. pendentes  
**Campos financeiros:** tipo (receita/custo), valor, fornecedor, status_pagamento

##### 6.6 Segurança & Qualidade — `SegurancaQualidadePage`

**Tabela:** `incidentes_seguranca`  
**KPIs:** Dias sem acidente, inspeções aprovadas %, NCs abertas/resolvidas  
**Tipos:** acidente, inspecao, nc  
**Status:** aberto, resolvido, aprovado, reprovado

##### 6.7 Ações Corretivas — `AcoesCorretivasPage`

**Tabela:** `acoes_corretivas`  
**Campos:** descrição, pilar, prioridade, status (pendente/em_andamento/concluida), responsável, prazo, foto_url  
**Storage:** Upload de fotos para bucket `obra-fotos`

##### 6.8 Checklist Semanal — `ChecklistSemanalPage`

**Tabela:** `checklist_semanal`  
**20 itens** fixos baseados no método O.P.E.R.A.  
**Campos:** item_key, semana, verificado, verificado_por, observação  
**Histórico:** Gráfico de evolução semanal

---

#### 7. Dashboard e OPERA Score

##### 7.1 OPERA Score (`src/analytics/operaScore.ts`)

Nota de 0 a 100, calculada em 5 sub-scores de 20 pontos cada:

```
OPERA Score = O (20) + P (20) + E (20) + R (20) + A (20)
```

| Pilar | Cálculo | Max |
|-------|---------|-----|
| O — Organização | % de registros com status "ok" × 20 | 20 |
| P — Padronização | 20 - (desperdício_médio / 15 × 20), mín 0 | 20 |
| E — Eficiência | % de ativos com status "ativo" × 20 | 20 |
| R — Redução de Perdas | 20 - (riscos × 2, max 10) - (retrabalhos, max 10) | 20 |
| A — Análise Contínua | margem_score (max 10) + segurança_score (max 10) | 20 |

##### 7.2 Dashboard Overview

- **DataRetentionBanner** — Aviso de retenção beta + alertas de dados próximos da exclusão
- **OperaScoreCard** — Gauge visual com breakdown por pilar
- **KPIs globais** — Saldo financeiro, obras cadastradas, dias sem acidente, inspeções aprovadas
- **DashboardCharts** — Frequência diária, consumo por material, fluxo financeiro, incidentes por tipo
- **AnalyticsAlerts** — Alertas inteligentes automáticos:
  - `src/analytics/atraso.ts` — Atraso médio > 30 min
  - `src/analytics/desperdicio.ts` — Materiais com >5% desperdício
  - `src/analytics/retrabalho.ts` — Etapas com retrabalho recorrente
  - `src/analytics/ranking.ts` — Ranking geral de eficiência
- **Módulos O.P.E.R.A.** — Cards navegáveis com status (ok/warning/critical)
- **Exportação PDF** — Relatório completo via `src/utils/exportOperaReport.ts`

##### 7.3 Filtros Globais (`GlobalFilters`)

- Seletor de obra (dropdown com todas do tenant)
- Afeta todos os hooks via `useObra().selectedObraId`

---

#### 8. Edge Functions (Backend Serverless)

##### 8.1 `accept-invite` — Aceitar Convite

**Endpoint:** `POST /functions/v1/accept-invite`  
**Auth:** Público (sem JWT)  
**Input:** `{ token, email, password, full_name }`

**Fluxo:**
1. Valida convite (token, usado, expirado, email)
2. Verifica se usuário já existe
3. Se novo: cria via `admin.createUser()` com email confirmado
4. Aguarda trigger `handle_new_user` criar profile (retry com backoff)
5. Se trigger falha: cria profile via upsert (fallback)
6. Atualiza `profiles.tenant_id`
7. Atribui role via `user_roles` (upsert)
8. Se convite tem `obra_id`: vincula em `obra_membros`
9. Marca convite como usado
10. Retorna `{ success: true, auto_login: true }`

##### 8.2 `beta-signup` — Inscrição Beta

**Endpoint:** `POST /functions/v1/beta-signup`  
**Auth:** Público (sem JWT)  
**Proteções:** Rate limit por IP (15s) + Cloudflare Turnstile CAPTCHA

**Fluxo:**
1. Valida CAPTCHA Turnstile
2. Sanitiza inputs (nome, email, telefone, empresa, código)
3. Verifica duplicata
4. Verifica se beta está ativo (`beta_config`)
5. Conta vagas disponíveis
6. Se tem código de influenciador + vaga + senha → **auto-aprova** + cria conta
7. Se tem vaga → `aguardando_aprovacao`
8. Se sem vaga → `lista_de_espera`
9. Rastreia conversão do influenciador

##### 8.3 `generate-reset-link` — Reset de Senha

**Endpoint:** `POST /functions/v1/generate-reset-link`  
**Auth:** Requer Bearer token (admin ou super_admin)  
**Input:** `{ email, redirect_to? }`

**Fluxo:**
1. Valida token do chamador
2. Verifica se é admin ou super_admin
3. Gera link de recuperação via `admin.generateLink({ type: 'recovery' })`
4. Retorna `{ link }`

##### 8.4 `data-retention` — Limpeza Automática

**Endpoint:** `POST /functions/v1/data-retention`  
**Auth:** Via cron (anon key)  
**Frequência:** Diário às 3h AM (pg_cron)

**Fluxo:**
1. Calcula data de corte: `now() - 3 meses`
2. Itera 14 tabelas operacionais
3. Valida que tabela não é protegida (double-check)
4. Deleta registros com `created_at < cutoff`
5. Loga quantidade deletada por tabela
6. Retorna relatório completo

---

#### 9. Sistema Beta e Onboarding

##### 9.1 Fluxo Completo de Novo Cliente

```
1. Landing Page (/landing)
   └── Conhece o sistema, planos, CTA para beta

2. Inscrição Beta (/beta)
   └── Formulário: nome, email, telefone, empresa, código influenciador
   └── CAPTCHA Turnstile obrigatório
   └── Edge Function: beta-signup
   └── Status: aguardando_aprovacao | lista_de_espera | aprovado (auto)

3. Acompanhamento (/beta-status)
   └── Usuário acompanha status pela interface

4. Aprovação (Admin Panel → Super Admin)
   └── Super Admin aprova/rejeita na aba Beta
   └── Trigger sync_beta_approval:
       - Atualiza profiles.beta_status = 'aprovado'
       - Define profiles.beta_approved_at = now()

5. Primeiro Login (/login)
   └── Email/senha ou Google
   └── ProtectedRoute verifica beta_status

6. Setup Tenant (/setup)
   └── Nome da empresa + CNPJ
   └── Função setup_tenant:
       - Cria tenant
       - Vincula profile
       - Atribui role admin
   └── Trigger track_influencer_conversion (se veio de código)

7. Dashboard (/)
   └── Sistema pronto para uso
   └── Trial de 30 dias inicia em beta_approved_at
```

##### 9.2 Fluxo de Convite (Equipe)

```
1. Admin → Painel Admin → Aba Convites
2. Cria convite: email + role + obra (opcional)
3. Copia link: /invite?token=xxx
4. Envia manualmente para colaborador
5. Colaborador acessa link → preenche nome + senha
6. Edge Function accept-invite:
   - Cria conta com email confirmado
   - Vincula ao tenant + obra
   - Atribui role
7. Auto-login → Dashboard
```

##### 9.3 Expiração de Trial

```
beta_approved_at + 30 dias = data de expiração

Se expirado:
- isTrialExpired = true (useAuth)
- usePermissions: canInsert/canUpdate/canDelete = false
- Banner: "Período de teste expirou"
- Sistema: modo somente leitura

Exceções:
- Super Admin: isento
- Modo convidado: isento (demo)
```

##### 9.4 Códigos de Influenciador

| Campo | Descrição |
|-------|-----------|
| `codigo` | Código único (ex: ENGENHEIRO10) |
| `nome` | Nome do influenciador |
| `ativo` | Se o código está ativo |
| `total_cadastros` | Incrementa no beta-signup |
| `total_convertidos` | Incrementa quando profile ganha tenant_id (trigger) |

---

#### 10. Política de Retenção de Dados

##### 10.1 Regra (Beta)

- **Retenção:** 3 meses de dados operacionais
- **Limpeza:** Diária às 3h AM (pg_cron → Edge Function)
- **Critério:** `created_at < NOW() - INTERVAL '3 months'`
- **Escopo:** 14 tabelas operacionais apenas

##### 10.2 Tabelas Afetadas

`registros_diarios`, `consumo_materiais`, `incidentes_seguranca`, `lancamentos_financeiros`, `retrabalhos`, `ativos`, `riscos`, `ciclos_tarefa`, `logistica_interna`, `sequenciamento_equipes`, `compras_emergenciais`, `aditivos_contratuais`, `checklist_semanal`, `acoes_corretivas`

##### 10.3 Tabelas Protegidas (NUNCA limpas)

`profiles`, `tenants`, `user_roles`, `invites`, `beta_waitlist`, `beta_config`, `influencer_codes`, `obras`, `obra_membros`

##### 10.4 Avisos no Dashboard

| Tempo Restante | Tipo de Aviso | Cor |
|----------------|---------------|-----|
| Sempre | Informativo (política beta) | Azul (primary) |
| ≤ 30 dias | Dados próximos da retenção | Azul claro |
| ≤ 7 dias | Exclusão próxima | Âmbar |
| ≤ 1 dia | Exclusão iminente | Vermelho (destructive) |

##### 10.5 Futuro (Pós-Beta)

A Edge Function aceita `retentionMonths` como parâmetro:
- Essencial: 3 meses
- Profissional: 6 meses
- Enterprise: 12 meses ou ilimitado

---

#### 11. Super Admin — Modelo de Acesso

##### 11.1 Modelo Atual: Acesso Total + Transparência

**Justificativa:** Em fase beta, o Super Admin precisa de acesso completo para debugging, suporte e melhoria do sistema.

**Implementação RLS:**
```sql
-- Policy em TODAS as tabelas operacionais e de gestão
CREATE POLICY "super_admin_all" ON tabela FOR ALL TO authenticated
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));
```

**Aviso de Transparência (LGPD):**
- Banner fixo no `ProtectedRoute` para todos os usuários logados:
- > "Durante o período beta, administradores do sistema podem acessar dados operacionais de forma limitada para diagnóstico e melhoria da plataforma."

##### 11.2 Painel Super Admin

| Aba | Funcionalidade |
|-----|---------------|
| **Beta** | Aprovar/rejeitar inscrições, ver lista de espera |
| **Influenciadores** | Criar/gerenciar códigos, ver conversões |
| **Config Beta** | Ativar/desativar beta, ajustar vagas e prazo |
| **Métricas** | KPIs consolidados do beta (total inscritos, aprovados, etc.) |
| **Super Admin** | Listar TODOS os tenants, ajustar `limite_obras` por tenant |
| **Usuários** | Gerenciar membros do próprio tenant |
| **Convites** | Criar/copiar/deletar convites |
| **Equipe por Obra** | Vincular membros a obras |

##### 11.3 Dados que NUNCA são Expostos

Mesmo com acesso total, o sistema não exibe:
- Senhas ou hashes
- Tokens de convite em texto
- Service role keys
- Dados bancários completos

##### 11.4 Evolução Planejada

| Fase | Modelo |
|------|--------|
| **Beta (atual)** | Acesso total + aviso transparência |
| **Produção** | Acesso a métricas agregadas + acesso temporário para suporte |
| **Enterprise** | Tabela `support_access` com `granted_by`, `expires_at`, `reason` |

---

#### 12. Segurança e Boas Práticas

##### 12.1 Row Level Security (RLS)

- ✅ **Habilitado** em todas as 21 tabelas
- ✅ Policies separadas por **comando** (SELECT, INSERT, UPDATE, DELETE)
- ✅ Policies separadas por **role** (admin, gestor, operacional, visualizador)
- ✅ Super Admin com policy `FOR ALL` separada
- ✅ Funções `SECURITY DEFINER` para evitar recursão
- ✅ Isolamento por `tenant_id` em todas as queries

##### 12.2 Proteções Ativas

| Proteção | Implementação |
|----------|--------------|
| CAPTCHA | Cloudflare Turnstile no beta-signup |
| Rate Limiting | 15s por IP no beta-signup |
| Email Confirmação | `email_confirm: true` no createUser |
| Convites com Expiração | `expires_at = now() + 7 days` |
| Limite de Obras | Trigger `check_obra_limit` |
| Trial Expiration | 30 dias → read-only |
| Sanitização de Input | Edge Functions validam/sanitizam todos os campos |

##### 12.3 Boas Práticas de Desenvolvimento

###### Frontend
- **Nunca** confie apenas no frontend para segurança — RLS é a garantia real
- Use `usePermissions()` apenas para UX (ocultar botões), não para segurança
- Nunca armazene secrets no código — use variáveis de ambiente
- Use `as any` com moderação — preferir tipos do Supabase

###### Backend
- **Nunca** modifique schemas reservados (auth, storage, realtime)
- **Nunca** execute SQL raw de input do usuário
- Use `SECURITY DEFINER` com `SET search_path = public`
- Validate inputs no Edge Function ANTES de qualquer operação

###### Banco de Dados
- Roles em tabela separada (`user_roles`), nunca no `profiles`
- `is_super_admin` é a ÚNICA exceção (flag booleana em profiles)
- Foreign keys para `auth.users` somente via `profiles.id`
- Defaults sensíveis em todas as colunas (evita erros de insert)

##### 12.4 Pontos de Atenção

| Item | Status | Ação Necessária |
|------|--------|----------------|
| Turnstile CAPTCHA | 🟡 Modo teste | Ativar chave de produção |
| Leaked Password Protection | 🟡 Desabilitado | Ativar no Supabase |
| Audit Trail | ❌ Não implementado | Criar tabela de logs |
| LGPD / Termos de Uso | ❌ Não implementado | Criar página |

---

#### 13. Padrões de Código e Arquitetura Frontend

##### 13.1 Estrutura de Diretórios

```
src/
├── analytics/          # Cálculos de KPIs e alertas
│   ├── atraso.ts
│   ├── desperdicio.ts
│   ├── operaScore.ts
│   ├── ranking.ts
│   └── retrabalho.ts
├── components/
│   ├── auth/           # ProtectedRoute
│   ├── admin/          # Abas do painel admin
│   ├── dashboard/      # KPICard, Charts, Filters, Score, Alerts
│   ├── layout/         # AppLayout, AppSidebar
│   └── ui/             # shadcn/ui components
├── data/
│   ├── demoData.ts     # Dados fictícios para modo convidado
│   └── mockData.ts     # (legacy)
├── hooks/
│   ├── useAuth.tsx     # Contexto de autenticação
│   ├── useObra.tsx     # Contexto de obra selecionada
│   ├── usePermissions.ts # Flags de permissão por role
│   └── useTableData.ts   # CRUD genérico para tabelas
├── integrations/
│   └── supabase/
│       ├── client.ts   # Auto-gerado (NÃO editar)
│       └── types.ts    # Auto-gerado (NÃO editar)
├── pages/              # Uma página por módulo
├── utils/
│   └── exportOperaReport.ts  # Geração de PDF
└── main.tsx
```

##### 13.2 Padrão de Página

Toda página operacional segue o mesmo padrão:

```tsx
export default function ModuloPage() {
  // 1. Hooks de dados
  const { data, isLoading, insert, update, remove } = useTableData<T>("tabela");
  
  // 2. Cálculos de KPIs (useMemo quando complexo)
  const kpi = useMemo(() => calcular(data), [data]);
  
  // 3. Definição de campos do formulário
  const fields = [
    { name: "campo", label: "Label", type: "text", required: true },
  ];
  
  return (
    <div>
      {/* Filtros globais */}
      <GlobalFilters />
      
      {/* Header do módulo */}
      <SectionHeader title="..." subtitle="..." icon={<Icon />} />
      
      {/* Botão de adicionar (condicionado por usePermissions) */}
      <AddRecordDialog fields={fields} onSubmit={insert} />
      
      {/* KPIs em grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard ... />
      </div>
      
      {/* Tabela de dados */}
      <table>
        {data.map(row => (
          <tr>
            {/* Dados */}
            <EditRecordDialog ... onSubmit={update} />
            <DeleteRecordButton onConfirm={() => remove(id)} />
          </tr>
        ))}
      </table>
    </div>
  );
}
```

##### 13.3 Design System

- **Cores:** Sempre via tokens CSS (`--primary`, `--background`, `--muted`, etc.)
- **Status:** `status-ok` (verde), `status-warning` (âmbar), `status-critical` (vermelho)
- **Cards:** Classe `glass-card` para cards com glassmorphism
- **Responsividade:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- **Dark Mode:** Suportado via CSS variables (sem toggle manual ainda)

##### 13.4 Arquivos Auto-Gerados (NÃO EDITAR)

| Arquivo | Motivo |
|---------|--------|
| `src/integrations/supabase/client.ts` | Gerado pelo Lovable Cloud |
| `src/integrations/supabase/types.ts` | Gerado pelo Lovable Cloud |
| `supabase/config.toml` | Configuração do projeto |
| `.env` | Variáveis de ambiente |

---

#### 14. Fluxos Completos

##### 14.1 Fluxo de Dados — Da UI ao Banco

```
Usuário clica "Adicionar" no módulo
  → AddRecordDialog abre form com campos definidos
  → Usuário preenche e submete
  → onSubmit chama insert() do useTableData
  → insert() adiciona tenant_id e obra_id automaticamente
  → Supabase client faz INSERT via API
  → RLS verifica: tenant_id + role do usuário
  → Se OK → dado persistido
  → Se FALHA → erro retornado
  → useTableData invalida cache (queryClient)
  → React Query refetcha dados automaticamente
  → UI atualiza com novo registro
```

##### 14.2 Fluxo de Autenticação

```
Usuário acessa qualquer rota protegida
  → ProtectedRoute verifica useAuth()
  → Se loading → spinner
  → Se !user && !isGuest → redirect /landing
  → Se isGuest → libera (dados demo)
  → Se beta_status !== "aprovado" → redirect /beta-status
  → Se !tenant_id → redirect /setup
  → Se isTrialExpired → banner + read-only
  → Renderiza children
```

##### 14.3 Fluxo de Limpeza de Dados (Cron)

```
3h AM (diário)
  → pg_cron dispara HTTP POST via pg_net
  → Edge Function data-retention recebe request
  → Calcula cutoff = now() - 3 meses
  → Loop em 14 tabelas operacionais
  → DELETE WHERE created_at < cutoff (usa service_role_key)
  → Loga resultados
  → Retorna relatório JSON
```

---

#### 15. Capacidade e Limites

##### 15.1 Limites do Banco

| Recurso | Limite | Uso Atual |
|---------|--------|-----------|
| Banco de dados | ~500 MB | ~12 MB (2.4%) |
| Storage (fotos) | 1 GB | Mínimo |
| Edge Functions | Sem limite prático | 4 funções |
| Rows por query | 1.000 (padrão Supabase) | OK |

##### 15.2 Estimativa de Capacidade

| Cenário | Clientes | Dados/mês | Duração | Espaço |
|---------|----------|-----------|---------|--------|
| **Seguro** | 10-15 | ~5 MB/mês | 12 meses | 50-80 MB |
| **Confortável** | 20-30 | ~8 MB/mês | 12 meses | 100-200 MB |
| **Limite** | 50+ | ~12 MB/mês | 12 meses | 300+ MB |

**Com política de retenção (3 meses):** capacidade efetiva ~3x maior.

##### 15.3 Premissas por Obra Ativa

| Tabela | Registros/mês | Bytes/registro |
|--------|--------------|----------------|
| registros_diarios | 500-800 | ~200 |
| consumo_materiais | 50-100 | ~150 |
| lancamentos_financeiros | 30-50 | ~180 |
| incidentes_seguranca | 5-15 | ~150 |
| Outras | 20-50 cada | ~150 |

---

#### 16. Roadmap e Itens Pendentes

##### 16.1 Alta Prioridade

| Item | Descrição | Complexidade |
|------|-----------|-------------|
| **Envio de email nos convites** | Automático ao criar convite (hoje é manual) | Média |
| **Integração Stripe** | Converter trial → plano pago | Alta |
| **Extensão manual de trial** | Super Admin estender prazo por tenant | Baixa |
| **Turnstile produção** | Ativar chave real do CAPTCHA | Baixa |
| **Leaked Password Protection** | Ativar verificação de senhas comprometidas | Baixa |

##### 16.2 Média Prioridade

| Item | Descrição | Complexidade |
|------|-----------|-------------|
| **Relatórios agendados por email** | PDF quinzenal/mensal automático | Alta |
| **Edição de perfil** | Nome, foto, senha | Baixa |
| **Auditoria / Log de ações** | Registrar quem alterou o quê | Média |
| **Filtros por data** | Semana, mês, trimestre em todos os módulos | Média |
| **Import CSV/Excel** | Upload em massa | Média |
| **Export CSV** | Backup de dados do tenant | Baixa |

##### 16.3 Baixa Prioridade / Futuro

| Item | Descrição |
|------|-----------|
| App nativo (React Native) | Uso offline em canteiro |
| Integração ERP | Sienge, UAU, etc. |
| IA para previsões | ML para atrasos e desperdícios |
| Fotos com GPS | Geolocalização em ações corretivas |
| Comparativo entre obras | Dashboard comparativo |
| Notificações push (PWA) | Service Worker |
| Multi-idioma | EN/ES |
| Toggle Dark/Light mode | Preferência do usuário |
| LGPD / Termos de uso | Página de política |

---

#### 17. Proposta Comercial vs. Estado Atual

##### 17.1 Pacote Essencial (R$ 497/mês)

| Promessa | Status | Observação |
|----------|--------|------------|
| Controle de frequência | ✅ | `registros_diarios` |
| KPI real vs. orçado | ✅ | Cálculos no dashboard |
| Controle de materiais | ✅ | `consumo_materiais` |
| Gestão de ativos | ✅ | `ativos` |
| Checklist semanal | ✅ | `checklist_semanal` |
| Dashboard consolidado | ✅ | OPERA Score + KPIs |
| Exportação PDF | ✅ | `exportOperaReport` |
| Até 3 obras | ✅ | `limite_obras = 3` |
| Até 10 usuários | 🟡 | Sem limite técnico (implementar) |

##### 17.2 Pacote Profissional (R$ 997/mês)

| Promessa | Status |
|----------|--------|
| Tudo do Essencial | ✅ |
| Fluxo de caixa | ✅ |
| Linha de Balanço | ✅ |
| Alertas inteligentes | ✅ |
| Ações corretivas com foto | ✅ |
| Relatório quinzenal por email | ❌ Pendente |
| Até 10 obras | ✅ (ajustar `limite_obras`) |
| Até 30 usuários | 🟡 |

##### 17.3 Pacote Estratégico (R$ 1.997/mês)

| Promessa | Status |
|----------|--------|
| Tudo do Profissional | ✅/🟡 |
| Previsão de prazo com IA | ❌ Pendente |
| Comparativo entre obras | ❌ Pendente |
| Importação de dados | ❌ Pendente |
| Dashboard de economia real | 🟡 Parcial |
| Relatório mensal premium | ❌ Pendente |
| Obras ilimitadas | ✅ (ajustar `limite_obras`) |
| Usuários ilimitados | 🟡 |

##### 17.4 Resumo de Cobertura

- **Essencial:** ~90% pronto
- **Profissional:** ~75% pronto
- **Estratégico:** ~55% pronto

---

#### 18. Glossário Técnico

| Termo | Definição |
|-------|-----------|
| **Tenant** | Empresa/cliente isolado no sistema |
| **RLS** | Row Level Security — isolamento de dados no PostgreSQL |
| **RBAC** | Role-Based Access Control — controle por papel |
| **OPERA Score** | Nota de 0-100 dos 5 pilares do método |
| **Edge Function** | Função serverless executada no Deno (Supabase) |
| **Linha de Balanço** | Técnica de planejamento visual (Gantt de equipes) |
| **NC** | Não Conformidade — desvio de qualidade |
| **KPI** | Key Performance Indicator — indicador chave |
| **Trial** | Período de teste de 30 dias pós-aprovação beta |
| **Retenção** | Política de manter dados por tempo limitado |
| **PWA** | Progressive Web App — app instalável via navegador |
| **CAPTCHA** | Verificação anti-bot (Cloudflare Turnstile) |
| **LGPD** | Lei Geral de Proteção de Dados |

---

*Documento gerado em Março de 2026 — Método O.P.E.R.A. v1.0 Beta*  
*Atualização automática recomendada a cada sprint.*

<a id="d11"></a>

## 14. Relatório de Teste do Sistema

> **Status:** Parcial  
> **Camada:** Auditoria  
> **Conceito:** Registro dos testes executados sobre o sistema e das lacunas de cobertura.  
> **Contexto:** Citado pelo Diagnóstico Objetivo como evidência do débito de testes: a suíte automatizada é mínima e não cobre isolamento cross-tenant.  
> **Origem:** `RELATORIO_TESTE_SISTEMA.md` · **Versão:** — · **Data:** —

### 📊 RELATÓRIO COMPLETO DO SISTEMA O.P.E.R.A.
**Data:** 09/03/2026  
**Versão:** MVP Beta v2  
**Modo de Teste:** Análise de Código + Console + Arquitetura

---

#### ✅ STATUS GERAL: **APROVADO PARA BETA COM CLIENTES**

O sistema está funcional, seguro e pronto para testes com clientes beta.

---

#### 📐 ARQUITETURA GERAL

##### Stack Tecnológica
| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Frontend | React + TypeScript | ^18.3.1 |
| Build | Vite | — |
| Estilização | Tailwind CSS + shadcn/ui | — |
| State Management | React Query (TanStack) | ^5.83.0 |
| Roteamento | React Router DOM | ^6.30.1 |
| Backend | Lovable Cloud (Supabase) | ^2.98.0 |
| Gráficos | Recharts | ^2.15.4 |
| PDF | jsPDF + jsPDF-AutoTable | ^4.2.0 / ^5.0.7 |
| PWA | vite-plugin-pwa | ^1.2.0 |
| Validação | Zod + React Hook Form | ^3.25.76 / ^7.61.1 |

##### Padrão Arquitetural
- **Multi-tenant SaaS** com isolamento via RLS (Row Level Security)
- **Hierarquia:** Tenant → Obras → Dados operacionais
- **Autenticação:** Supabase Auth com modo convidado (demo)
- **Roles:** `admin` | `gestor` | `operacional` | `visualizador`
- **Super Admin:** Flag `is_super_admin` no profile (verificado via função `SECURITY DEFINER`)

---

#### 🗂️ ESTRUTURA DE ARQUIVOS

##### Páginas (20 rotas)
| Rota | Arquivo | Função |
|------|---------|--------|
| `/landing` | LandingPage.tsx (489 linhas) | Landing comercial com pricing |
| `/login` | LoginPage.tsx | Autenticação + modo convidado |
| `/reset-password` | ResetPasswordPage.tsx | Recuperação de senha |
| `/invite` | InvitePage.tsx | Aceitar convites de equipe |
| `/beta` | BetaSignupPage.tsx | Cadastro na lista de espera |
| `/beta-status` | BetaStatusPage.tsx | Status do cadastro beta |
| `/setup` | SetupPage.tsx | Criação de tenant/empresa |
| `/` | DashboardOverview.tsx (290 linhas) | Dashboard consolidado |
| `/organizacao` | OrganizacaoPage.tsx | O — Mão de obra |
| `/padronizacao` | PadronizacaoPage.tsx | P — Insumos/materiais |
| `/eficiencia` | EficienciaPage.tsx | E — Ativos e logística |
| `/reducao-perdas` | ReducaoPerdasPage.tsx | R — Riscos e retrabalhos |
| `/analise-continua` | AnaliseContinuaPage.tsx | A — Financeiro e aditivos |
| `/seguranca-qualidade` | SegurancaQualidadePage.tsx | Segurança e incidentes |
| `/acoes-corretivas` | AcoesCorretivasPage.tsx | Ações corretivas com fotos |
| `/checklist` | ChecklistSemanalPage.tsx | Checklist O.P.E.R.A. |
| `/colaboradores` | ColaboradoresPage.tsx | Gestão de colaboradores |
| `/obras` | ObrasPage.tsx | Gestão de obras |
| `/economia` | EconomiaPage.tsx | Visão financeira consolidada |
| `/admin` | AdminPage.tsx | Painel administrativo |

##### Componentes de Dashboard (30+)
| Componente | Função |
|-----------|--------|
| `OperaScoreCard` | Score O.P.E.R.A. (0-100) |
| `OperaRadarChart` | Gráfico radar dos 5 pilares |
| `EconomyHeroCard` | Economia identificada em R$ |
| `DailySummary` | Resumo diário com estatísticas |
| `SafetyHeroCard` | Dias sem acidente + indicadores |
| `ScheduleCard` | SPI e progresso temporal |
| `StockSemaphoreCard` | Semáforo de estoque |
| `AnomalyCard` | Detecção de anomalias financeiras |
| `SimulatorCard` | Simulador de economias |
| `ProductivityCard` | Métricas de produtividade |
| `RiskMatrixCard` | Matriz de riscos |
| `FinancialCharts` | Burn rate e custo/m² |
| `WasteRankingCard` | Ranking de desperdício |
| `FornecedorRankingCard` | Ranking de fornecedores |
| `CustoPorCategoriaCard` | Custo por categoria |
| `ObraComparisonCard` | Comparativo entre obras |
| `KPICard` | Card de KPI reutilizável |
| `GlobalFilters` | Filtros de obra e período |
| `EmptyStateGuide` | Onboarding em 6 passos |
| `NotificationBadge` | Alertas e notificações |
| `AddRecordDialog` | Modal de inserção de dados |
| `GaugeChart` | Gráfico gauge |
| `StatusBadge` | Badge de status (ok/warning/critical) |
| `ShareButton` | Compartilhamento de dados |
| `DataRetentionBanner` | Banner de retenção de dados |
| `ComparisonCard` | Comparativo genérico |
| `SectionHeader` | Header de seção reutilizável |

##### Camada Analítica (10 módulos)
| Módulo | Arquivo | Funções Exportadas |
|--------|---------|-------------------|
| Score O.P.E.R.A. | `operaScore.ts` | `calculateOperaScore()` |
| Financeiro | `financeiro.ts` | `calculateFinancials()`, `calculateBurnRate()` |
| Produtividade | `produtividade.ts` | `calculateProductivity()`, `calculateColaboradorRanking()` |
| Estoque | `estoque.ts` | `calculateStockSemaphore()`, `detectAnomalies()`, `calculatePadronizacaoIndex()` |
| Cronograma | `cronograma.ts` | `calculateScheduleMetrics()`, `getMilestones()` |
| Segurança | `seguranca.ts` | `calculateSafetyMetrics()` |
| Desperdício | `desperdicio.ts` | `calculateDesperdicio()` |
| Atraso | `atraso.ts` | `calculateAtrasos()`, `getCurrentWeek()` |
| Ranking | `ranking.ts` | `calculateRanking()` |
| Retrabalho | `retrabalho.ts` | `calculateRetrabalho()` |

##### Hooks Customizados (5)
| Hook | Função |
|------|--------|
| `useAuth` | Autenticação, roles, guest mode, trial |
| `useObra` | Seleção de obra ativa, lista de obras |
| `useTableData` | CRUD genérico com suporte a demo |
| `usePermissions` | Permissões de UI por role |
| `useMobile` | Detecção de tela mobile |

---

#### 🗄️ BANCO DE DADOS

##### Tabelas (22 tabelas)
| Tabela | Função | RLS |
|--------|--------|-----|
| `tenants` | Empresas/clientes | ✅ |
| `profiles` | Perfis de usuário | ✅ |
| `user_roles` | Roles (admin/gestor/operacional/visualizador) | ✅ |
| `obras` | Obras de construção | ✅ |
| `obra_membros` | Membros por obra | ✅ |
| `registros_diarios` | Registro de produção diária | ✅ |
| `consumo_materiais` | Consumo real vs. previsto | ✅ |
| `ativos` | Equipamentos e ativos | ✅ |
| `riscos` | Mapeamento de riscos | ✅ |
| `retrabalhos` | Ocorrências de retrabalho | ✅ |
| `lancamentos_financeiros` | Receitas e custos | ✅ |
| `incidentes_seguranca` | Incidentes e NCs | ✅ |
| `sequenciamento_equipes` | Linha de balanço | ✅ |
| `logistica_interna` | Tempos de deslocamento | ✅ |
| `ciclos_tarefa` | Tempo médio por tarefa | ✅ |
| `aditivos_contratuais` | Aditivos e desvios | ✅ |
| `acoes_corretivas` | Ações com fotos | ✅ |
| `checklist_semanal` | Checklist O.P.E.R.A. | ✅ |
| `colaboradores` | Cadastro de colaboradores | ✅ |
| `colaborador_obras` | Vínculo colaborador-obra | ✅ |
| `registro_presencas` | Presença/falta/atraso | ✅ |
| `compras_emergenciais` | Compras não planejadas | ✅ |
| `invites` | Convites de equipe | ✅ |
| `beta_waitlist` | Lista de espera beta | ✅ |
| `beta_config` | Configuração do beta | ✅ |
| `influencer_codes` | Códigos de influenciadores | ✅ |

##### Funções de Banco (9)
| Função | Tipo | Propósito |
|--------|------|-----------|
| `has_role()` | SECURITY DEFINER | Verificar role de usuário |
| `has_any_role()` | SECURITY DEFINER | Verificar múltiplos roles |
| `is_super_admin()` | SECURITY DEFINER | Verificar super admin |
| `get_user_tenant_id()` | SECURITY DEFINER | Obter tenant do usuário |
| `setup_tenant()` | SECURITY DEFINER | Criar empresa + admin |
| `handle_new_user()` | Trigger | Auto-criar profile no signup |
| `check_obra_limit()` | Trigger | Validar limite de obras |
| `sync_beta_approval()` | Trigger | Sincronizar aprovação beta |
| `track_influencer_conversion()` | Trigger | Rastrear conversões |

##### Edge Functions (4)
| Função | Propósito |
|--------|-----------|
| `accept-invite` | Processar aceite de convite |
| `beta-signup` | Cadastro na lista de espera |
| `data-retention` | Limpeza de dados expirados |
| `generate-reset-link` | Gerar link de reset de senha |

##### Storage
| Bucket | Público | Uso |
|--------|---------|-----|
| `obra-fotos` | Sim | Fotos de ações corretivas |

---

#### 🔒 ANÁLISE DE SEGURANÇA

##### ✅ Aprovado
- ✅ RLS habilitado em **todas as 22+ tabelas**
- ✅ Isolamento de tenant via `get_user_tenant_id()` (SECURITY DEFINER)
- ✅ Roles verificados via `has_role()` / `has_any_role()` (SECURITY DEFINER)
- ✅ `is_super_admin` verificado via função SECURITY DEFINER (não client-side)
- ✅ Queries parametrizadas (sem SQL injection)
- ✅ Convites com expiração (7 dias) e flag `used`
- ✅ Limite de obras por tenant (`check_obra_limit`)
- ✅ Modo convidado isolado (dados demo, sem escrita real)
- ✅ Trial expiration calculado no backend (30 dias)

##### Padrão de RLS Consistente
Todas as tabelas operacionais seguem o mesmo padrão:
- `SELECT`: tenant_id = user's tenant
- `INSERT`: tenant + role ∈ {admin, gestor, operacional}
- `UPDATE`: tenant + role ∈ {admin, gestor}
- `DELETE`: tenant + role = admin
- `ALL` (super_admin): is_super_admin()

##### ⚠️ Pontos de Atenção
- ⚠️ `usePermissions.ts` concede permissões completas ao guest (`isGuest || isAdmin...`) — correto para demo, mas deve ser monitorado
- ⚠️ `profiles.is_super_admin` tem WITH CHECK para impedir auto-promoção — ✅ OK

---

#### 🎯 FUNCIONALIDADES TESTADAS

##### ✅ Autenticação & Onboarding
- ✅ Login com email/senha (Supabase Auth)
- ✅ Modo convidado com dados demo
- ✅ Fluxo de setup (criação de tenant)
- ✅ Convites de equipe com roles
- ✅ Reset de senha
- ✅ Beta waitlist com códigos de influenciador
- ✅ Trial expiration (30 dias pós-aprovação)

##### ✅ Dashboard Principal
- ✅ Score O.P.E.R.A. (0-100) com 5 pilares de 20pts cada
- ✅ Radar chart dos pilares
- ✅ Economy Hero Card (economia em R$)
- ✅ 6 KPIs (Saldo, Obras, Dias s/ Acidente, Inspeções, Absenteísmo, Colaboradores)
- ✅ Financial Charts (burn rate, custo/m², projeção)
- ✅ Productivity + Safety cards
- ✅ Schedule + Risk Matrix + Stock Semaphore + Simulator
- ✅ Rankings (desperdício, fornecedor, categoria)
- ✅ Comparativo entre obras
- ✅ Detecção de anomalias financeiras
- ✅ Notificações (ações vencidas, riscos, checklist, materiais críticos)
- ✅ Resumo diário com estatísticas
- ✅ Exportação PDF completa (406 linhas de geração)

##### ✅ Módulos O.P.E.R.A.
- ✅ **O** — Organização: Registros diários com CRUD completo
- ✅ **P** — Padronização: Consumo materiais + compras emergenciais
- ✅ **E** — Eficiência: Ativos + logística interna + ciclos de tarefa
- ✅ **R** — Redução de Perdas: Riscos + retrabalhos
- ✅ **A** — Análise Contínua: Lançamentos financeiros + aditivos contratuais

##### ✅ Módulos Complementares
- ✅ Segurança & Qualidade: Incidentes com severidade
- ✅ Ações Corretivas: Com fotos (Storage) e prazos
- ✅ Checklist Semanal: 12 itens O.P.E.R.A.
- ✅ Colaboradores: Cadastro com PIX, diárias, turnos
- ✅ Obras: CRUD com orçamento, área, fase, tipo
- ✅ Economia: Visão financeira consolidada

##### ✅ Painel Admin
- ✅ Gestão de membros de obras
- ✅ Configuração do beta (vagas, tempo de teste)
- ✅ Métricas do beta (KPIs, conversões)
- ✅ Gestão de usuários beta (aprovar/rejeitar)
- ✅ Códigos de influenciadores
- ✅ Super admin (gestão global)

---

#### 🐛 BUGS IDENTIFICADOS

##### 🔴 CRÍTICOS (0)
Nenhum bug crítico encontrado.

##### 🟡 MÉDIOS (1)

###### 1. Warning de React Ref (Recharts CartesianGrid)
- **Console:** `Function components cannot be given refs` no `DashboardCharts`
- **Causa:** Recharts v2.15.4 passa ref para CartesianGrid que é function component
- **Impacto:** Warning no console, sem impacto funcional
- **Solução:** Atualizar Recharts quando fix disponível, ou suprimir warning

##### 🟢 BAIXOS (1)

###### 2. DashboardOverview.tsx monolítico (290 linhas)
- **Problema:** 15 queries `useTableData` + 8 `useMemo` + 290 linhas em um arquivo
- **Impacto:** Manutenibilidade reduzida
- **Solução:** Extrair para `useDashboardMetrics()` hook (planejado)

---

#### ⚡ ANÁLISE DE PERFORMANCE

##### Dados de Carregamento
- **15 queries simultâneas** no DashboardOverview (uma por tabela)
- **8 useMemo** para cálculos analíticos (recalculam apenas quando deps mudam)
- **React Query** com cache automático (staleTime padrão)

##### Bundle Size Estimado
| Pacote | Tamanho | Uso |
|--------|---------|-----|
| Recharts | ~220KB | Gráficos |
| jsPDF + AutoTable | ~165KB | Exportação PDF |
| Lucide React | ~158KB | Ícones |
| React Core | ~139KB | Framework |
| Supabase SDK | ~85KB | Backend |
| Radix UI (total) | ~200KB | Componentes UI |

##### 🐌 Oportunidades de Otimização

###### 1. **Sem Lazy Loading de Rotas**
- Todas as 20 páginas carregadas no bundle inicial
- **Impacto:** Bundle grande para first load
- **Solução:** `React.lazy()` para rotas não-críticas

###### 2. **15 Queries Paralelas no Dashboard**
- Cada tabela gera uma query separada
- **Impacto:** Muitas conexões simultâneas
- **Solução:** Aceitável com React Query cache; considerar views agregadas no futuro

###### 3. **LandingPage.tsx (489 linhas)**
- Maior arquivo de página
- **Solução:** Extrair seções em componentes separados

---

#### 📊 MÉTRICAS DE QUALIDADE

##### Arquitetura
| Critério | Score | Detalhe |
|----------|-------|---------|
| Separação de concerns | 9/10 | Analytics isolado, hooks centralizados |
| Reutilização | 9/10 | 30+ componentes granulares |
| Type safety | 7/10 | Uso de `any` em vários pontos |
| Segurança | 9.5/10 | RLS completo, SECURITY DEFINER |
| Testabilidade | 5/10 | Apenas 1 test file (`example.test.ts`) |
| Manutenibilidade | 7/10 | Alguns arquivos grandes |

##### Cobertura de Funcionalidades
| Pilar | Tabelas | Analytics | UI | Status |
|-------|---------|-----------|-----|--------|
| Organização | ✅ registros_diarios | ✅ ranking, produtividade | ✅ | Completo |
| Padronização | ✅ consumo_materiais, compras | ✅ desperdício, estoque | ✅ | Completo |
| Eficiência | ✅ ativos, logística, ciclos | ✅ padronização index | ✅ | Completo |
| Redução Perdas | ✅ riscos, retrabalhos | ✅ retrabalho index | ✅ | Completo |
| Análise Contínua | ✅ lançamentos, aditivos | ✅ financeiro completo | ✅ | Completo |
| Segurança | ✅ incidentes | ✅ safety metrics | ✅ | Completo |
| Colaboradores | ✅ colaboradores, presencas | ✅ absenteísmo | ✅ | Completo |
| Checklist | ✅ checklist_semanal | ✅ compliance | ✅ | Completo |

---

#### 🚀 MELHORIAS RECOMENDADAS

##### 🔥 Prioridade Alta
1. **Implementar lazy loading** em rotas (`React.lazy` + `Suspense`)
2. **Criar `useDashboardMetrics()` hook** para extrair lógica do Dashboard
3. **Adicionar testes** (ao menos fluxos críticos: auth, CRUD, cálculos)
4. **Testar em mobile** (iOS Safari, Android Chrome)

##### 🟡 Prioridade Média
5. **Reduzir uso de `any`** nos tipos (especialmente `useTableData`)
6. **Quebrar LandingPage.tsx** em componentes menores
7. **Implementar error monitoring** (Sentry ou similar)
8. **Adicionar skeleton loading** para melhor UX

##### 🟢 Prioridade Baixa
9. **Migrar jsPDF para PDF-Lib** (50KB vs 165KB)
10. **Implementar Service Worker** completo para PWA offline
11. **Virtual scrolling** para tabelas grandes
12. **Cache de queries** com `staleTime: 5min`

---

#### 🏁 CONCLUSÃO

##### Score Técnico Final: **8.5/10**

| Critério | Score |
|----------|-------|
| Funcionalidade | 9.5/10 |
| Segurança | 9.5/10 |
| Arquitetura | 8.5/10 |
| Performance | 7.0/10 |
| UX/Design | 8.5/10 |
| Testabilidade | 5.0/10 |
| Manutenibilidade | 8.0/10 |

##### ✅ Aprovado Para
- Testes com clientes beta
- Demo para investidores/stakeholders
- Validação do modelo O.P.E.R.A.
- Coleta de feedback de UX

##### 💪 Pontos Fortes
1. **Camada analítica robusta** (10 módulos especializados com funções puras)
2. **Segurança exemplar** (RLS em todas as tabelas + SECURITY DEFINER)
3. **Multi-tenancy completo** com isolamento de dados
4. **30+ componentes visuais** de dashboard
5. **Sistema de roles** granular (4 níveis + super admin)
6. **Exportação PDF profissional** (406 linhas)
7. **Modo convidado** com dados demo realistas
8. **Beta management** completo (waitlist, códigos, métricas)

##### ⚠️ Antes de Escalar
1. Implementar lazy loading (reduzir bundle inicial)
2. Adicionar testes automatizados
3. Configurar error monitoring
4. Testar em múltiplos dispositivos/browsers

---

**Recomendação Final:** ✅ **LIBERAR PARA BETA** com plano de otimização pós-feedback.

---

*Relatório gerado via análise completa de código, console, banco de dados e arquitetura*  
*Sistema: Método O.P.E.R.A. — Gestão Inteligente de Obras*  
*Data: 09/03/2026*

<a id="d12"></a>

## 15. README do Repositório

> **Status:** Vigente  
> **Camada:** Técnica  
> **Conceito:** Porta de entrada do repositório: stack, execução local e convenções.  
> **Contexto:** Primeiro arquivo lido por qualquer desenvolvedor que assuma o projeto.  
> **Origem:** `README.md` · **Versão:** — · **Data:** —

### Welcome to your Lovable project

#### Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

#### How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
### Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

### Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

### Step 3: Install the necessary dependencies.
npm i

### Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

#### What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

#### How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

#### Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

<a id="anexo-a"></a>

## Anexo A — Memórias de projeto

> **Status:** Vigente  
> **Camada:** Técnica / Operacional  
> **Conceito:** Regras persistentes que orientam toda decisão do agente sobre este projeto — design, arquitetura, restrições e regras de negócio.  
> **Contexto:** Vive em `.lovable/memory/`. É a camada mais próxima da operação diária: o que não pode ser reintroduzido, o que já foi decidido e por quê.  
> **Origem:** `.lovable/memory/**` · **Versão:** — · **Data:** —

### `.lovable/memory/index.md`

```markdown
### Memory: index.md
Updated: now

### Project Memory

#### Core
- **CONSTITUIÇÃO**: `.lovable/OPERA_CORE.md` é vinculante. Checar invariantes antes de qualquer mudança arquitetural, RLS, schema ou feature.
- SaaS O.P.E.R.A Method Dashboard. Dark theme, orange (#F97316) accents. Status: green/yellow/red.
- Supabase native Auth only. NO IndexedDB/localforage for sessions (prevents mobile refresh loops).
- Mobile boot: 1.5s lock (`sessionStable`) ignoring initial null sessions to prevent crashes.
- DO NOT use vite-plugin-pwa or Service Worker (stale cache issues). Unregister old SWs.
- Soft delete (`deleted_at`) strategy for core tables (`obras`, `colaboradores`, etc).
- Global tables (`colaboradores`, `profiles`, `tenants`) lack `obra_id`. DO NOT filter them by obra.
- Admin actions: cannot self-demote. Critical actions need strong keyword confirmation.
- Responsive UI: Adaptive cards and horizontal scroll tabs for mobile. Tooltips on all KPIs.
- **Single source of truth**: KPIs vêm de RPCs (dashboard_aggregates, eficiencia_presenca, produtividade_por_equipe). Client apenas renderiza.
- **Produção**: usar `producao_valor` (numérico, derivado por trigger). Texto `producao` é só descrição.
- **Equipe**: `equipe_normalizada` (GENERATED) é a chave canônica. Insert no client deve trim() antes de enviar.
- **Presença**: UNIQUE INDEX (colaborador_id, data, obra_id) — duplicidade bloqueada no DB.

#### Memories
- [OPERA_CORE Constitution](mem://architecture/opera-core-constitution) — 10 invariantes absolutas, modelo de confiança, limites arquiteturais, soberania atual
- [Causal Observability](mem://architecture/causal-observability) — correlation_id/causation_id, structured logging, tabela system_events, RPC log_system_event, libs cliente/edge
- [Reabertura Formal de Períodos](mem://architecture/period-reopening) — versionamento periodos_fechados, tabela append-only periodos_reaberturas, RPCs reabrir/refechar/listar_historico, invariante I11
- [O.P.E.R.A. Method](mem://features/opera-score) — Dashboard structure, 5 pillars, KPI logic, checklist, intelligence layer
- [Capacidade & Planejamento](mem://features/capacidade-planejamento) — RPCs eficiencia_presenca + produtividade_por_equipe, producao_valor, equipe_normalizada, uniq_presenca
- [Auth & RBAC](mem://auth/access-control) — 5 roles, read-only logic, global transparency, QR session sync
- [Beta & Waitlist](mem://features/beta-tester-module) — Waitlist status, WhatsApp notifications, influencer tracking & bypass
- [Multi-Tenancy](mem://architecture/multi-tenancy) — Setup RPC, invite system, tenant limits, 30-day trial & retention
- [Workforce & Payroll](mem://architecture/workforce-financial-logic) — Manual fractional diárias vs presence, multi-project assignment
- [Reporting](mem://features/reporting) — jsPDF/xlsx exports, dual-mode workforce reports, guest mode
- [Commercial](mem://features/commercial-landing) — Landing page, packages, contact info (Eduardo Martins)
- [Security & Audit](mem://security/rls-access-validation) — RLS policies, access expiration, audit_logs
- [CSV Export](mem://features/csv-export) — Edge export-csv: zip por tabela, RLS via userClient, signed URL 15min, eventos exportacao_csv.*
```

### `.lovable/memory/architecture/causal-observability.md`

```markdown
---
name: Causal observability
description: Correlation/causation IDs + structured logging spanning client, edge functions, RPC, audit. Use src/lib/observability.ts and supabase/functions/_shared/observability.ts. Logs go to system_events via log_system_event RPC.
type: feature
---

### Observabilidade causal — passo #2 pós OPERA_CORE

#### O contrato

Toda transição de estado, decisão crítica, autorização, falha ou mutação relevante deve gerar um evento na tabela `system_events`, carregando:

- `correlation_id` — a história inteira de uma cadeia causal (mesmo valor em todos os eventos da operação).
- `causation_id` — o evento pai direto que originou este (forma a árvore causal).
- `actor_id`, `tenant_id`, `obra_id` — derivados server-side via `log_system_event` RPC (cumpre I1/I2).
- `event_type` — nome semântico (ex: `auth.reset_link.issued`, `presenca.confirmar`, `periodo.fechar`).
- `source` — origem técnica (ex: `client.RegistroPage`, `edge.generate-reset-link`).
- `status` — `success`/`failure`/`warning`/`info`/`denied`.
- `severity` — `debug`/`info`/`warning`/`error`/`critical`.

#### Como usar

##### Cliente (`src/lib/observability.ts`)

```ts
import { startCausalContext, logEvent, traced, causalHeaders } from "@/lib/observability";

// Início de uma ação do usuário
const ctx = startCausalContext("client.PresencaPage", { obraId });

// Loga evento simples
const eventId = await logEvent({ ctx, eventType: "presenca.iniciar" });

// Mede + loga sucesso/falha
await traced({ ctx, eventType: "presenca.confirmar" }, async () => {
  await supabase.from("registro_presencas").update(...);
});

// Propaga a edge functions
await supabase.functions.invoke("nome", {
  body: {...},
  headers: causalHeaders(ctx),
});
```

##### Edge function (`supabase/functions/_shared/observability.ts`)

```ts
import { createEdgeObservability, correlationResponseHeaders } from "../_shared/observability.ts";

const obs = createEdgeObservability(req, "edge.minha-funcao");
const headers = { ...corsHeaders, ...correlationResponseHeaders(obs), "Content-Type": "application/json" };

await obs.log({ event_type: "minha.acao", status: "success", payload: {...} });
// ou
await obs.traced({ event_type: "minha.acao" }, async () => { ... });
```

A função recolhe `x-correlation-id` / `x-causation-id` do request automaticamente. Se não vier, gera novo.

#### Regras de logging (não negociáveis)

**Logar:**
- Transições de estado (`prevista→confirmada`, `aberto→fechado`)
- Decisões de autorização (deny, escalação)
- Mutações financeiras / de fechamento
- Falhas e exceções
- Ações administrativas (criar convite, alterar role, gerar reset)
- Edge function entry/exit

**NÃO logar:**
- Renders, polling, hover, scroll
- Operações triviais de leitura
- Mudança de filtro / paginação

Logging excessivo destrói sinal. Falha de logging NUNCA derruba fluxo de negócio (todas as funções fazem `try/catch` e retornam null em erro).

#### Schema

`system_events` é append-only. RLS:
- SELECT: admin do tenant ou super admin.
- INSERT: apenas via `log_system_event` RPC (SECURITY DEFINER que valida tenant).

Colunas adicionadas em `audit_logs` e `audit_logs_db`: `correlation_id`, `causation_id` (amarra trilha existente à nova narrativa).

#### Propagação para triggers de DB

O trigger `fn_audit_log_changes` lê `current_setting('opera.correlation_id', true)` e `opera.causation_id` opportunisticamente. Sem setting presente, grava `NULL` (sem fallback inventado — preserva I8).

Para propagar lineage dentro de uma RPC SECURITY DEFINER:

```sql
CREATE OR REPLACE FUNCTION public.minha_rpc(_correlation_id uuid, ...)
RETURNS ... AS $$
BEGIN
  PERFORM public.set_correlation_context(_correlation_id, NULL);
  -- toda mutação subsequente nesta transação propaga para audit_logs_db
  UPDATE ...;
END;
$$ ...;
```

O helper `set_correlation_context(_corr uuid, _caus uuid DEFAULT NULL)` usa `set_config(..., is_local=true)`, então o valor vive só dentro da transação corrente.

#### Status de adoção (2026-05-30, OPERA_CORE v1.2)

- ✅ Todas as edge functions instrumentadas: `accept-invite`, `beta-signup`, `data-retention`, `session-transfer`, `generate-reset-link`, `gantt-list`, `gantt-update-task`.
- ✅ Trigger DB lê correlation opportunisticamente.
- ⏳ Cliente: mutações financeiras (presença, apontamento, fechamento, atividades Gantt) ainda não envolvidas sistematicamente por `traced()`. Próxima passada (F1.5).
- ⏳ RPCs financeiras (`folha_pagamento`, etc.) devem aceitar `_correlation_id` e chamar `set_correlation_context` — a fazer quando forem tocadas.

#### Referência rápida — convenções de event_type

Padrão: `<dominio>.<acao>[.<resultado>]`

- `auth.reset_link.issued` / `.denied` / `.failed`
- `auth.invite.accepted` / `.denied` / `.failed`
- `beta.signup.queued` / `.approved` / `.denied` / `.failed` / `.duplicate`
- `session.transfer.issued` / `.consumed` / `.denied` / `.failed`
- `retention.run.started` / `.completed` / `.failed` / `retention.table.failed`
- `presenca.confirmar` / `presenca.ajustar`
- `periodo.fechar` / `periodo.reabrir`
- `obra.criar` / `obra.excluir` / `obra.restaurar`
- `tenant.setup` / `tenant.invite_member`
- `gantt.task.update` / `.denied` / `.failed`
```

### `.lovable/memory/architecture/opera-core-constitution.md`

```markdown
---
name: OPERA_CORE constitution
description: Constitutional document at .lovable/OPERA_CORE.md — invariants, trust model, temporal model, causality, sovereignty. Check before any architectural change.
type: constraint
---

### OPERA_CORE — leitura obrigatória antes de mudanças arquiteturais

Arquivo: `.lovable/OPERA_CORE.md` (v1.0).

É a **constituição operacional** do sistema. Não descreve o que faz; descreve o que **não pode ser violado**.

#### 10 invariantes absolutas (resumo)

1. **I1 Fronteira de Tenant** — nada atravessa tenant sem `is_super_admin` server-side.
2. **I2 Autoridade Server-Side** — cliente nunca é fonte; sempre RLS/RPC/Edge.
3. **I3 Append-Only** — eventos históricos não mutam; correção via evento compensatório.
4. **I4 Irreversibilidade Temporal** — após `periodos_fechados`, escrita só via reabertura formal.
5. **I5 Lineage de Evidência** — toda foto/anexo carrega tenant_id, obra_id, autor, momento, origem.
6. **I6 Permissão Contextual** — `(user, role, tenant_id, obra_id, momento)`, nunca só `(user, role)`.
7. **I7 Reprodutibilidade** — estado consolidado deve ser reconstruível dos eventos primários.
8. **I8 Falha Segura** — em dúvida, negar e logar. Nunca degradar para permissivo.
9. **I9 Determinismo Financeiro** — mesmo input → mesmo output. Sem `now()`/random no cálculo final.
10. **I10 Estado de Certeza** — sempre rotular `prevista`/`confirmada`/`consolidada`/`fechada`.

#### Modelo de confiança (regra de ouro)
Se a checagem pode ser feita no banco, é feita no banco. RLS é primeira linha. Código é segunda. UI é cosmética.
**Nunca confiar em** `tenant_id` ou `role` vindos do cliente — sempre derivar via `get_user_tenant_id(auth.uid())` / `has_role(...)`.

#### Limites — Opera NÃO é
ERP genérico, BI genérico, rede social, app de tarefas, CRM, automação sem causalidade, CRUD administrativo sem invariante.

#### Antes de qualquer feature/migration, perguntar
1. Viola alguma invariante? 2. Quebra fronteira de tenant? 3. Cria consolidado sem evento primário? 4. Mistura estados temporais? 5. Confia no cliente para autorização? 6. Está fora dos limites? 7. Aumenta lock-in?

#### Quando atualizar
- Nova invariante codificada → adicionar em §2 do OPERA_CORE.md e bumpar versão.
- Mudança de soberania (nova camada controlada/desacoplada) → atualizar §8.
- Remoção/enfraquecimento de invariante → exige justificativa explícita no histórico.
```

### `.lovable/memory/architecture/period-reopening.md`

```markdown
---
name: Reabertura Formal de Períodos (v1.3)
description: Como reabrir/refechar periodos_fechados preservando hash imortal e cadeia causal
type: feature
---

### Reabertura Formal de Períodos — OPERA_CORE v1.3

#### Princípio (I11)
Hash de fechamento é imortal. Toda correção em período fechado vira evento:
reabertura grava snapshot+hash anteriores em `periodos_reaberturas`; refechamento
cria nova versão em `periodos_fechados`.

#### Schema
- `periodos_fechados.versao INT` (default 1). Apenas uma versão ativa por
  (tenant, obra, mes), garantida por índice único parcial em `reaberto_em IS NULL`.
- `periodos_reaberturas` (append-only, sem policies de INSERT/UPDATE/DELETE para
  authenticated — só RPCs SECURITY DEFINER escrevem). Admin do tenant + super
  admin podem ler.

#### RPCs
- `reabrir_periodo(_obra_id, _mes, _motivo, _correlation_id?)`
  - Exige admin + motivo ≥ 20 chars + acesso à obra.
  - Copia versão ativa para `periodos_reaberturas`.
  - Marca versão como reaberta. Loga `periodo.reaberto`.
- `refechar_periodo(_obra_id, _mes, _reabertura_id, _correlation_id?)`
  - Roda `validar_fechamento` (bloqueia se há previsões pendentes).
  - Recalcula folha via `folha_pagamento` → novo hash determinístico.
  - INSERT em `periodos_fechados` com `versao = anterior + 1`.
  - Atualiza `periodos_reaberturas` com `versao_nova`/`hash_novo`.
  - Loga `periodo.refechado` com `causation_id = reabertura.correlation_id`.
- `listar_historico_periodo(_obra_id, _mes)`
  - Retorna `{ versoes[], reaberturas[] }` ordenado para timeline.

#### Cliente
- `src/components/admin/PeriodosFechadosTab.tsx` (tab "Períodos" em AdminPage).
- Reabertura exige keyword digitado: `REABRIR <MÊS>`.
- Propaga `correlation_id` via `startCausalContext` + `traced()` de
  `src/lib/observability.ts`.

#### Invariantes a preservar
- NUNCA fazer UPDATE/DELETE direto em `periodos_reaberturas`.
- NUNCA reescrever `hash_snapshot` em uma linha existente de `periodos_fechados`.
- Toda nova policy RLS em tabelas operacionais deve consultar **versão ativa**
  (`reaberto_em IS NULL`) — não apenas existência da linha.
```

### `.lovable/memory/features/capacidade-planejamento.md`

```markdown
---
name: Capacidade & Camada de Planejamento
description: Modelo de verdade único — RPCs como fonte oficial, producao_valor numérico, equipe_normalizada, dedup de presença, capacidade planejada vs real
type: feature
---

#### Modelo de verdade único (consolidado)

**Regra:** RPC server-side é fonte oficial. Frontend apenas renderiza. Cálculo client-side só como fallback offline/guest.

##### Tabelas / colunas

- `obras.tamanho_equipe_esperada` (int NOT NULL DEFAULT 0) — capacidade planejada.
- `registros_diarios.producao` (text) — descrição livre ("12 m²").
- `registros_diarios.producao_valor` (numeric) — extraído por trigger `extract_producao_valor` (regex). **Use SEMPRE este campo em cálculos.**
- `registros_diarios.equipe` (text) — input do usuário.
- `registros_diarios.equipe_normalizada` (text GENERATED ALWAYS AS) — `lower(trim(equipe))` com espaços → `_`. **Chave canônica de agrupamento.**
- `registro_presencas` — UNIQUE INDEX `uniq_presenca_colab_data_obra` em (colaborador_id, data, obra_id). DB bloqueia duplicata; UI mostra toast amigável (código 23505 capturado em `useTableData.insert`).

##### RPCs oficiais

- `dashboard_aggregates(_obra_id, _start, _end)` → JSON unificado: financeiro, presença, consumo, incidentes, capacidade. Cache 60s no client.
- `eficiencia_presenca(_obra_id, _data)` → esperado, presente, eficiência %.
- `produtividade_por_equipe(_obra_id, _start, _end)` → ranking por `equipe_normalizada`, soma `producao_valor`.

##### Hooks
- `useDashboardAggregates()` — wrapper de `dashboard_aggregates`.
- `useEficienciaPresenca(obraId, data)` — wrapper de `eficiencia_presenca`.
- `useProdutividadeEquipe(obraId, start, end)` — wrapper de `produtividade_por_equipe`. **Usar este, não `calculateProdutividadePorEquipe` (deprecated, mantido só para guest mode).**

##### Status (semáforo)
Eficiência de presença: ≥90% ok, ≥70% warning, <70% critical. Sem dados = "indisponível" (NÃO pune o O.P.E.R.A. Score — regra do dual score).

##### Helpers client
- `src/lib/normalize.ts`: `normalizeEquipe()` e `parseProducaoValor()` espelham a lógica do DB.
- `useTableData.insert` faz trim() em `equipe` para `registros_diarios` e captura erro 23505 em `registro_presencas`.

##### Lacunas pendentes
- `colaborador_id` em `registros_diarios` (fase 2): habilita produtividade individual e fecha o ciclo presença → produção → eficiência real.
- Status semântico unificado (operacional vs confiabilidade) — ainda dois eixos paralelos.
```

### `.lovable/memory/features/csv-export.md`

```markdown
---
name: Exportação CSV universal
description: Edge function export-csv zipa CSVs (1 por tabela) respeitando RLS via userClient, sobe em bucket privado exports/{tenant_id}, retorna signed URL 15min. Escopos tenant_full | obra | periodo. Loga exportacao_csv.* em system_events com correlation_id.
type: feature
---

#### Arquitetura

- Edge function `supabase/functions/export-csv/index.ts`.
- Auth: exige JWT + `has_role(uid,'admin')`.
- Lê tabelas via `userClient` (Authorization header) → RLS automática (I1/I5).
- Tabelas listadas em `TABLES` (allowlist server-side). Tokens removidos (`invites.token`, `session_transfers.token`).
- Cada linha CSV recebe `exportado_em` e `exportado_por` (E4).
- CSV: UTF-8 BOM, `,` delimiter, escape `"` duplicando, CRLF.
- Pagina em chunks de 5000 linhas. Zipa com JSZip nível 6.
- Upload em bucket privado `exports` em `{tenant_id}/{ts}-{scope}.zip`. Signed URL 15min.
- `_manifest.json` incluído no ZIP com escopo, totais, correlation_id.

#### Eventos em system_events

- `exportacao_csv.requested` (client.ExportarDadosTab)
- `exportacao_csv.started` (edge)
- `exportacao_csv.completed` (edge) — payload: scope, tables, rows_total, file_bytes, path
- `exportacao_csv.denied` / `.failed` / `.client_failed`

Toda a cadeia compartilha mesmo `correlation_id` propagado via headers `x-correlation-id` / `x-causation-id` (causalHeaders).

#### RLS Storage

Policy `Admins read own tenant exports` em `storage.objects`:
admin do tenant lê apenas paths cuja primeira pasta = seu `tenant_id`. Edge function usa service_role para upload.

#### UI

`src/components/admin/ExportarDadosTab.tsx` (tab "Dados" em Admin). 3 cards: tenant_full / obra / período (seletor obra + input month). Mostra manifest e link de download.

#### Limites conhecidos

- Edge timeout 150s — cobre ~100k linhas.
- ZIP em memória — tenants muito grandes precisarão de job assíncrono futuramente.
- Ordenação determinística por `orderBy` da spec garante reprodutibilidade entre admins do mesmo tenant (E7).
- CSV não substitui hash do snapshot (I9) — documentado na UI.
```

### `.lovable/memory/features/opera-score.md`

```markdown
---
name: O.P.E.R.A. Score
description: Dashboard structure, 5 pillars, KPI logic, dual score (performance + consistency), no penalties
type: feature
---

#### Opera Score — Dual Model

Score = Performance (0-100) + Consistency Index (confiável/parcial/indisponível)

**Rule**: Missing data never reduces score — it reduces visibility/confidence.

##### Pillars (20 pts each)
- **O (Organização)**: 60% registros_diarios status OK + 40% taxa de presença. Taxa de presença = SUM(fracao_diaria) / total registros (presente=1, meio_periodo=0.5, falta=0). Se fracao_diaria for null, deriva do tipo. Sem presencas → usa só registros.
- **P (Padronização)**: Mean material deviation (consumo_materiais real vs previsto)
- **E (Eficiência)**: % ativos with status "ativo". Defaults to 0 when no ativos (not 1).
- **R (Redução de Perdas)**: 20 minus risk/rework penalties
- **A (Análise Contínua)**: Margin score + safety score (NCs abertas)

##### Consistency
- Three levels: ✅ confiável, ⚠️ parcial, ❌ indisponível
- Each pillar has its own level + items array
- Items sorted by severity (indisponível first)
- Overall = worst of all pillars

##### Source-of-truth rules
- "Presença não é inferida. É declarada." → registro_presencas é fonte única
- `fracao_diaria` (0, 0.5, 1) é a verdade financeira/operacional. Trigger sync_presenca_fracao mantém `tipo` e `fracao_diaria` consistentes.
- apontamento_diarias (manual) só é usado como fallback financeiro quando NÃO há presença registrada para o colaborador no período.
- Botões rápidos [+1] [½] [✕] no Relatório de Mão de Obra criam registro_presencas com fracao_diaria correspondente em 1 clique (data = hoje).
```

### `.lovable/memory/security/rls-access-validation.md`

```markdown
---
name: Security & RLS hardening
description: Tenant scoping, session token isolation, storage ownership, invite self-read, reset-link cross-tenant guard
type: feature
---

### Security hardening (pré-piloto)

#### Funções de permissão (SECURITY DEFINER, tenant-scoped)
- `has_role(user, role)` e `has_any_role(user, roles[])` exigem `tenant_id = get_user_tenant_id(user)` ou tenant NULL (legacy).
- `user_has_obra_access(user, obra)` valida que `obras.tenant_id = get_user_tenant_id(user)` E (role adequada OU `obra_membros`).
- EXECUTE revogado de `anon` e `public` nessas helpers; mantido para `authenticated`.

#### RLS aplicado
- `session_transfers`: SELECT/INSERT/UPDATE/DELETE só `user_id = auth.uid()` (DELETE também super_admin).
- `invites`: além das policies de admin, convidado pode SELECT próprio invite via `email = auth.jwt()->>'email'` quando `used=false AND expires_at > now()`.
- `storage.objects` bucket `obra-fotos`: DELETE/UPDATE exigem `owner = auth.uid()` OU foldername prefix = uid OU admin do tenant OU super_admin. INSERT continua livre para authenticated.
- `mobile_debug_logs`: INSERT restrito a authenticated.
- `beta_waitlist`: INSERT público removido — fluxo só via edge function `beta-signup` (service role + rate limit).
- `beta_config`: SELECT restrito a authenticated.

#### Edge function `generate-reset-link`
- Verifica role do caller via `user_roles` (tenant-aware).
- Tenant admin: só pode gerar reset para email cujo profile tem mesmo `tenant_id` E não seja super_admin.
- Super_admin: pode gerar para qualquer email.
- Resposta 403 genérica (não revela existência de email).

#### Auth config
- Leaked Password Protection (HIBP) habilitado.
- Auto-confirm email: false (usuários precisam verificar email).

#### Warnings residuais aceitos
SECURITY DEFINER functions chamáveis por authenticated (ex: `folha_pagamento`, `dashboard_aggregates`, `setup_tenant`) — design intencional, cada uma valida tenant/auth internamente.
```

<a id="anexo-b"></a>

## Anexo B — Glossário e índice de invariantes

### B.1 Invariantes OPERA_CORE (referência rápida)

| ID | Nome | Essência |
| --- | --- | --- |
| I1 | Fronteira de Tenant | Nada atravessa o tenant sem `is_super_admin` validado server-side. |
| I2 | Autoridade Server-Side | O cliente nunca é fonte de autoridade. |
| I3 | Append-Only Histórico | Correção por evento compensatório, nunca por mutação destrutiva. |
| I4 | Irreversibilidade Temporal | Após fechamento, escrita só via reabertura formal registrada. |
| I5 | Lineage de Evidência | Evidência sem tenant/obra/autor/momento/origem é inválida. |
| I6 | Permissão Contextual | `(user, role, tenant, obra, momento)` — nunca só `(user, role)`. |
| I7 | Reprodutibilidade de Estado | Consolidado deve ser reconstruível dos eventos primários. |
| I8 | Falha Segura | Em dúvida: negar e logar. Nunca degradar para permissivo. |
| I9 | Determinismo Financeiro | Mesma entrada → mesma saída. Sem `now()`/random no cálculo final. |
| I10 | Diferenciação de Estado Operacional | `prevista` / `confirmada` / `consolidada` / `fechada`, sempre rotulado. |
| I11 | Reabertura é Evento, não Edição | Hashes de fechamento são imortais; refechar gera nova versão. |

### B.2 Glossário

| Termo | Significado |
| --- | --- |
| **Tenant** | Fronteira soberana de dados, identidade e governança. Unidade indivisível de isolamento. |
| **Obra** | Contexto operacional físico. Pertence a exatamente um tenant. |
| **Colaborador** | Sujeito da operação. Global ao tenant, vinculável a múltiplas obras. |
| **Registro de presença** | Evento operacional primário, com estado de certeza. |
| **Apontamento de diária** | Ajuste contábil fracionário sobre a presença. |
| **Período fechado** | Barreira temporal irreversível por (tenant, obra, mês). |
| **Snapshot de fechamento** | Materialização determinística do estado consolidado, com hash SHA-256. |
| **Correlation ID** | Identificador que amarra todos os eventos de uma mesma intenção do usuário. |
| **Causation ID** | Identificador do evento que causou diretamente o evento atual. |
| **IPMO** | Índice de Preservação da Memória Operacional (0–100), definido no APMO. |
| **Marco (M0–M4)** | Estágio de maturidade empresarial, definido em D07/D08. |
| **RFC** | Request for Change — processo formal de alteração arquitetural (D02). |

### B.3 Índice de identificadores usados nos documentos

| Prefixo | Onde é definido | O que identifica |
| --- | --- | --- |
| `I1`–`I11` | D01 §2 | Invariantes absolutas |
| `P1`–`P10` | D02 | Princípios arquiteturais permanentes |
| `M0`–`M4` | D07, D08 | Marcos de maturidade |
| `M1-01`… | D08 | Critérios de promoção de marco, com responsável e validação |
| `E-01`–`E-18` | D08 | Evidências normalizadas, com localização e validade |
| `NC-01`–`NC-08` | D09 | Não-conformidades de preservação de memória |
| `B1`–`B3` | D09 | Bloqueios principais de preservação |

---

_Fim do consolidado. Revisões futuras devem ser publicadas como `OPERA_Atlas_Documentacao_Consolidada_v2.md`, preservando esta versão._
