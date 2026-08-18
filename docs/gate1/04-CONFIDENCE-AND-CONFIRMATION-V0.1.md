# OPERA Gateway Confidence & Confirmation — v0.1

**Estado:** `FROZEN — GATE 1` · **Versão:** `confidence-confirmation/0.1`
**Fontes normativas:** doc 03 §5 e §8 (Gate 0); PRD V0 §CONFIDENCE MODEL / §CONFIRMATION UX; §14 da missão Gate 1 (segurança).

## 1. Matriz confidence × impact

`confirmation_requirement` é **semipre calculado** por esta matriz e reavaliado após entity resolution (entidade `CONFLICTED` agrava o requisito em um degrau; `PROVISIONAL` sem confirmação mantém o requisito atual).

| | Impact LOW | Impact MEDIUM | Impact HIGH |
|---|---|---|---|
| **Confidence HIGH** | `NOT_REQUIRED` (auto-write permitido) | `SIMPLE` | `MANDATORY` (com entidade DETERMINISTIC) |
| **Confidence MEDIUM** | `SIMPLE` | `SIMPLE` | `MANDATORY` |
| **Confidence LOW** | `MANDATORY` | `MANDATORY` | `BLOCKED_ASK` |
| **Entity CONFLICTED** | agrava +1 | agrava +1 | `NAO_POSSO_EXECUTAR` (write proibido) |
| **Sem tipo conhecido** | — | — | `UNKNOWN_EVENT` → triagem (veredito: PRECISO_PERGUNTAR) |

Graus de `confirmation_requirement`: `NOT_REQUIRED` (write direto após ingestão, com auditoria); `SIMPLE` (aprovação de 1 clique/toque, sem pergunta aberta); `MANDATORY` (aprovação explícita com resumo completo do evento); `BLOCKED_ASK` (pergunta conversacional obrigatória, write impossível sem resposta).

## 2. Vereditos obrigatórios

Todo envelope termina o `assessment` com exatamente um veredito: **SEI** (write possível), **NAO_SEI** (UNKNOWN_EVENT/triagem), **PRECISO_CONFIRMAR** (SIMPLE/MANDATORY pendente), **PRECISO_PERGUNTAR** (BLOCKED_ASK pendente), **NAO_POSSO_EXECUTAR** (bloqueio definitivo no estágio atual). Interpretação tratada como fato silencioso é violação grave do contrato.

## 3. Lista fechada de HIGH-IMPACT (v0.1)

`PAYMENT`, `PAYMENT_NEED`, `MATERIAL_SALE` com valor relevante, `ASSET_DAMAGE` com baixa relevante de ativo, qualquer **obrigação/alteração financeira**, **compromisso externo** (mensagem endereçada a cliente/fornecedor/empreiteira), **mudança crítica de equipe** (realocação que altera frente ativa) e **qualquer ação irreversível**. A lista é fechada por decisão — expansão exige nova versão do contrato, nunca decisão de modelo em runtime. Em dúvida sobre o impacto: classificar `HIGH`. Quando houver dúvida sobre a intenção: **CONFIRMAR**. Quando houver ambiguidade estrutural: **PERGUNTAR**. Quando não houver tipo: **UNKNOWN_EVENT**.

## 4. Estados de confirmação (formalizados)

`NOT_REQUIRED | NEEDS_CONFIRMATION | CONFIRMED | CORRECTED | CANCELLED | EXPIRED` — nomes consistentes com o envelope canônico (`correcao`, `supersession`, `transformation` do V0/V0.1). Transições válidas:

```text
NOT_REQUIRED → (final)
NEEDS_CONFIRMATION → CONFIRMED | CORRECTED | CANCELLED | EXPIRED
CORRECTED → (pacote novo de correção criado, state = CORRECTED)
EXPIRED → triagem manual (jamais auto-processa)
CANCELLED → (pacote original preservado com state CANCELLED; nada apagado)
```

Expiração default: 24h (`confirmation.expires_at`). Confirmação carrega `responded_by` (opaque actor ref) — o loop de confirmação em ausência do fundador é **open question** do PRD; no v0.1 o estado EXPIRED escapa para a fila de triagem do gestor, explicitamente sem autoprocessamento.

## 5. Correção e supersession (seção normativa)

Uma correção **nunca reescreve silenciosamente** o evento anterior. O usuário dizendo "na verdade eram 3 marteletes" gera um **novo pacote** com `record_type: correcao`, `lineage.parent_package_id` = pacote original, `lineage.transformation = corrected`, `lineage.supercedes = [original_package_id]`, e o original recebe `lineage.superseded_by = [novo]` e `confirmation.state = CORRECTED`. O raw do original permanece intacto; os estados de `delivery` do original são reavaliados por destino (cada destino aplica a correção pelo seu write normal, referenciando o write anterior). Reversal e amendment são variações do mesmo padrão. Qualquer operação que implicaria UPDATE/DELETE de evento entregue é proibida pelo contrato — coerente com `missao_eventos` imutável, `audit_logs_db` append-only e hash chain do REO.

## 6. Camada extra de incerteza (mídia)

Quando `raw` é derivado de áudio ou imagem, a confiança do evento herda uma penalização composta: `confidence ≤ min(confiança_da_interpretação, confiança_da_transcrição/classificação)`. O áudio original nunca é descartado enquanto o pacote não estiver congelado e auditado; a UX de confirmação oferece "ouvir original".
