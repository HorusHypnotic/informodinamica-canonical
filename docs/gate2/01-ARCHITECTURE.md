# 01-ARCHITECTURE — Runtime experimental v0.1

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Escopo:** arquitetura mínima e substituível; instrumento experimental, não produto.

## 1. Princípios de projeto

A arquitetura segue quatro restrições impostas pela missão. Primeira, o **RAW FIRST**: nada existe antes da mensagem bruta ser persistida de forma imutável. Segunda, o **contrato governa o modelo**: qualquer decisão normativa (impacto, confirmação, rota, veredito) é determinística e vive em código, nunca na resposta do LLM. Terceira, **fail-safe**: na dúvida, o runtime pergunta, bloqueia ou envia para triagem — jamais executa. Quarta, **isolamento total**: um tenant de teste, banco SQLite local replicado, credenciais fora do Git, nenhuma rota `candidate` ativa e zero escritas em produtos.

Não há microserviços, filas, dashboards nem abstrações para escala futura. O runtime é um único processo Python com dez módulos com fronteiras nítidas, orquestrados por um pipeline linear e audítavel.

## 2. Módulos

| # | Módulo (`runtime/operagw/`) | Responsabilidade |
|---|---|---|
| 1 | `telegram_bot.py` | Ingestão Telegram (polling/webhook); converte `Update` em entrada do pipeline |
| 2 | `envelope.py` | Criação do envelope canônico v0.1 (identidade, timestamps, estrutura) |
| 3 | `storage.py` | Persistência raw-first; tenants; aliases; idempotência; journal; banco replicado |
| 4 | `interpreter.py` | Interpretação LLM (OpenAI gpt-5-mini) com validação de schema e retry controlado |
| 5 | `entity_resolution.py` | Resolução de entidades com os 4 níveis do contrato, escopo de tenant |
| 6 | `assessment.py` | Matriz confidence×impact determinística + os cinco vereditos |
| 7 | `confirmation.py` | Máquina de estados SIMPLE/MANDATORY/BLOCKED_ASK; correção com lineage; simulação de rota |
| 8 | `pipeline.py` | Orquestração linear + auditoria (journal de cada transição) |
| 9 | `validation.py` | Validação JSON Schema 2020-12 contra os schemas congelados do Gate 1 |
| 10 | — (consumo do schema) | `docs/gate1/schemas/` como fonte da verdade; sem cópia normativa |

## 3. Fluxo de um pacote

```
Telegram Update
   ↓ telegram_bot.on_message (tenant check, idempotência)
   ↓ pipeline.ingest
   ├─ pre_interpretation_checks          → REJEITA SEM INTERPRETAR (tenant, contrato, source_message_id, duplicata)
   ├─ store_raw                          → RAW imutável + sha256  (antes de qualquer interpretação)
   ├─ new_capture_envelope               → envelope v0.1 com package_id
   ├─ resolver.resolve_one (obra hint)   → sender_binding/identidade
   ├─ interpret (LLM)                    → JSON + __model_ref/__retries/__raw_result/__ts
   ├─ validate_envelope                  → Draft202012 + regras normativas  → SCHEMA_REJECTED se inválido
   ├─ resolve_entities                   → PROVISIONAL/CONFLICTED/UNKNOWN/DETERMINISTIC
   ├─ assess                             → impact determinístico + veredito + confirmation_requirement
   ├─ request_confirmation               → pergunta SIMPLE/MANDATORY/BLOCKED_ASK
   ├─ simulate_routing                   → destinos calculados, TODOS status BLOCKED
   └─ journal (todas as transições)
```

O estado do pacote segue: `received → interpreted → needs_confirmation → confirmed|corrected|cancelled|expired|rejected`. Correções nunca apagam a interpretação anterior: criam um novo pacote `correcao` com `lineage.parent_package_id` apontando para o pacote original.

## 4. Onde moram as decisões determinísticas

| Decisão | Quem decide | Evidência no código |
|---|---|---|
| Impacto de um evento | `assessment.impact_of_event` (matriz por `event_type`) | `assessment.py` |
| Requisito de confirmação | `assessment.MATRIX[overall_confidence, impact]` | `assessment.py` |
| Veredito | regras do §10 do `assessment.py` (UNKNOWN→NAO_SEI, CONFLICTED+HIGH→NAO_POSSO_EXECUTAR) | `assessment.py` |
| Nível de entidade | alias verificado→DETERMINISTIC; fuzzy→PROVISIONAL; ≥2 candidatos→CONFLICTED | `entity_resolution.py` |
| Rota | `routing-rules-v0.1.json` + fallback R-TRI-999; status sempre `candidate`/`blocked` | `confirmation.py` |
| Entrega | **todas as linhas de delivery nascem `BLOCKED`** — inativável por configuração | `confirmation.py` |

O LLM pode apenas **propor** `event_type`, entidades, `confidence` e `payload`; se propuser algo fora do contrato (tipo inexistente, confiança >1, entidade DETERMINISTIC não verificada, HIGH-IMPACT como LOW), o pipeline rejeita com retry controlado ou descarta — nunca aceita por aproximação (doc 03).

## 5. Banco de dados

SQLite local (`runtime/data/*.db`), journal WAL, chaves estrangeiras ativas. Tabelas: `tenants` (com `is_test_tenant=1` obrigatório), `raw_messages` (`source_message_id` UNIQUE global + `raw_sha256`), `packages` (`envelope_json` integral), `package_journal` (journal imutável por transição), `confirmation_questions` e `entity_aliases` (chaves escopo-tenant, `verified_by` NULL indica alias aprendido/provisional). O schema vive em `storage.py` e não há migração para produção — o banco é descartável por definição.

## 6. Separabilidade do Gate 1

Nenhum arquivo de `docs/gate1/` foi editado. O runtime referencia os schemas por caminho relativo ao repositório e os valida por `$ref` (doc 03). A errata de taxonomia vive em `docs/gate2/` e é puramente documental (§errata).
