# OPERA_CORE

> Constituição operacional do sistema Opera/Atlas.
> Este documento não descreve o que o sistema faz.
> Descreve o que o sistema **jamais pode violar**.
>
> Versão: 1.3 — 2026-05-30
> Status: vinculante. Toda decisão de arquitetura, RLS, schema, UI ou IA
> deve ser checada contra este documento antes de ser aceita.

---

## 1. Natureza

Opera é uma **infraestrutura operacional contextual** para operações físicas
(inicialmente construção civil), orientada por três princípios irredutíveis:

1. **Causalidade** — todo estado é consequência rastreável de eventos.
2. **Rastreabilidade** — toda ação relevante deixa trilha auditável.
3. **Soberania multi-tenant** — todo dado pertence a uma fronteira tenant; nada atravessa essa fronteira sem autorização explícita.

Não é ERP. Não é BI. Não é app de tarefas. Não é CRUD administrativo.
É o **motor de execução verificável** de operações físicas no tempo.

---

## 2. Invariantes Absolutas

Estas regras são **inegociáveis**. Qualquer código, migration, RPC, edge function,
política RLS ou feature que as viole deve ser rejeitado, independente de prazo.

### I1 — Fronteira de Tenant
Nenhum dado, função, RPC, storage object, log ou evento pode ser lido,
escrito ou inferido por usuário fora do `tenant_id` proprietário,
exceto por `is_super_admin = true` validado server-side.

### I2 — Autoridade Server-Side
O cliente nunca é fonte de autoridade. `tenant_id`, `role`, `permissão`,
`fechamento`, `valor financeiro consolidado` — todos derivam de validação
server-side (RLS, RPC SECURITY DEFINER ou Edge Function autenticada).

### I3 — Append-Only Histórico
Eventos operacionais (`audit_logs`, `audit_logs_db`, `registro_presencas`
após confirmação, `apontamento_diarias` após fechamento, `periodos_fechados`)
são **append-only**. Correção se faz por novo evento compensatório, nunca
por mutação destrutiva.

### I4 — Irreversibilidade Temporal
Após `periodos_fechados.fechado_em` para um (tenant, obra, mês), nenhuma
escrita retroativa em `registro_presencas` ou `apontamento_diarias` daquele
período é permitida, exceto via reabertura formal registrada
(`reaberto_em`, `reaberto_por`, `motivo_reabertura`).

### I5 — Lineage de Evidência
Toda evidência (foto, PDF, snapshot, anexo) carrega lineage:
`tenant_id`, `obra_id`, `criado_por`, `criado_em`, `evento_origem`.
Evidência sem lineage é inválida e deve ser rejeitada na entrada.

### I6 — Permissão Contextual
Role nunca implica acesso global. Toda checagem de permissão é a interseção
de `(user, role, tenant_id, obra_id, momento)`. Nunca apenas `(user, role)`.

### I7 — Reprodutibilidade de Estado
O estado financeiro e operacional consolidado de qualquer (tenant, obra, mês)
deve ser reconstruível a partir dos eventos primários armazenados. Cache,
RPC agregadora ou snapshot são **derivados**, nunca verdades.

### I8 — Falha Segura
Diante de erro, ambiguidade de tenant, sessão instável ou autorização
incerta: **negar acesso e logar**. Nunca degradar para acesso permissivo.

### I9 — Determinismo Financeiro
Cálculos que produzem valor monetário consolidado (folha, fechamento,
relatório) devem ser determinísticos: mesma entrada → mesma saída.
Nenhuma fonte de não-determinismo (ordem de array, `now()`, random) pode
afetar o número final.

### I10 — Diferenciação de Estado Operacional
Toda informação operacional carrega seu **estado de certeza**:
`prevista`, `confirmada`, `consolidada`, `fechada`. UI, exports e cálculos
devem distinguir explicitamente esses estados. Misturar é proibido.

### I11 — Reabertura é Evento, não Edição
Hashes de fechamento são **imortais**. Corrigir um período fechado nunca
pode ser uma edição silenciosa do hash anterior. Toda reabertura grava:
(a) cópia imutável do snapshot e hash anteriores em `periodos_reaberturas`,
(b) motivo textual obrigatório (≥ 20 caracteres), (c) autor, timestamp e
`correlation_id`. O refechamento gera **nova versão** (`versao = anterior + 1`)
e novo hash, encadeado via `causation_id` ao evento de reabertura. Apenas
uma versão pode estar ativa por (tenant, obra, mês); reabrir sem refechar
deixa o período em estado pendente, exibido como tal na UI.

---

## 3. Entidades Fundamentais

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

## 4. Modelo de Confiança

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

## 5. Modelo Temporal

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

## 6. Modelo de Causalidade

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

## 7. Limites Arquiteturais

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

## 8. Soberania Atual (estado honesto, 2026-05-14)

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

## 9. Critérios de Aceitação (toda mudança passa por aqui)

Antes de aceitar qualquer PR, migration ou feature, responder:

1. Viola alguma invariante de §2? → **Rejeitar.**
2. Quebra a fronteira de tenant em algum caminho? → **Rejeitar.**
3. Cria estado consolidado sem evento primário rastreável? → **Rejeitar.**
4. Mistura estados temporais (prevista/confirmada/consolidada) sem rótulo? → **Rejeitar.**
5. Confia no cliente para dado de autorização? → **Rejeitar.**
6. Adiciona feature fora dos limites de §7? → **Rejeitar ou mover para fora do core.**
7. Aumenta lock-in sem necessidade? → **Discutir antes.**

---

## 10. Manutenção deste documento

- Mudanças neste arquivo exigem versão incrementada e nota de mudança ao final.
- Toda invariante removida ou enfraquecida deve ter justificativa explícita.
- Novas invariantes podem ser adicionadas; remoção exige consenso.

### Histórico

- **1.0 — 2026-05-14** — Versão inicial. Codifica estado pós-hardening de segurança e introdução de `periodos_fechados` + `status_contabil`.
- **1.1 — 2026-05-14** — Observabilidade causal introduzida: `system_events`, `correlation_id`/`causation_id` em `audit_logs*`, RPC `log_system_event`, libs cliente/edge. Atualiza §8 (sistema nervoso observável passa a existir).
- **1.2 — 2026-05-30** — Conclusão da camada causal (Frente 1, parcial): todas as edge functions instrumentadas (entry, denials, falhas, sucessos); trigger `fn_audit_log_changes` agora lê `current_setting('opera.correlation_id', true)` opportunisticamente; helper `set_correlation_context(uuid, uuid)` disponível para RPCs herdarem lineage dentro da transação. Cliente ainda pendente — será amarrado em F1.5.

- **1.3 — 2026-05-30** — Frente 3 (Reabertura Formal). Nova invariante I11: hashes imortais e versionamento de `periodos_fechados` (`versao` + índice único parcial em `reaberto_em IS NULL`). Tabela append-only `periodos_reaberturas` (somente admin lê, mutação só via RPCs SECURITY DEFINER). RPCs `reabrir_periodo`, `refechar_periodo`, `listar_historico_periodo` com `_correlation_id` opcional, exigindo motivo ≥ 20 chars + role admin + acesso à obra; eventos `periodo.reaberto` e `periodo.refechado` em `system_events`+`audit_logs` com causation chaining. UI admin: tab "Períodos" com banner de pendência, dialog com keyword `REABRIR <MES>`, timeline de versões.
