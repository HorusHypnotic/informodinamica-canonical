# GATE2-PREFLIGHT-TAXONOMY-ERRATA — divergência 14 × 15 event types

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Escopo desta errata:** investigar e sanear a divergência numérica encontrada no Gate 1 (resumo menciona 15 event types; doc 02 declara e enumera 14 tipos). **A semântica congelada do Gate 1 NÃO é alterada** — esta errata é puramente documental e rastreável.

## 1. Investigação de fontes (comparação obrigatória executada)

| Fonte | Contagem de event types | Observação |
|---|---|---|
| `docs/gate1/02-EVENT-TAXONOMY-V0.1.md` (corpo e §1) | **14** (tabela numerada 1–14, "14 tipos em 5 famílias") | Fonte textual primária — consistente |
| `docs/gate1/schemas/event-types-v0.1.json` (`$properties/event_type.enum`) | **14** (enum fechado, validável) | **Fonte machine-readable canônica** |
| `docs/gate1/schemas/routing-rules-v0.1.json` | **14** event types referenciados | Consistente com o enum |
| `docs/gate1/schemas/gateway-envelope-v0.1.schema.json` | referência cruzada ao event-types; valida contra enum de **14** | Consistente |
| `docs/gate1/schemas/corpus/**/*.json` (16 fixtures) | **8** tipos usados (subconjunto do corpus), todos ∈ enum de 14 | Consistente |
| `docs/gate1/00-GATE1-README.md` §índice (docs 00, entradas 01 e 02) e tabela de schemas | "15 event types" (2 ocorrências) | **Inconsistência textual** |
| `docs/gate1/10-GATE1-DECISION-RECORD.md` §2 (alternativa rejeitada) e §6 AC-2 | "15 tipos" (2 ocorrências) | **Inconsistência textual** |
| `docs/gate1/01-EVENT-CONTRACT-V0.1.md` | não declara quantidade numérica | — |

## 2. Diagnóstico — fonte da divergência

A divergência é **exclusivamente textual/documental**. A fonte machine-readable canônica (`event-types-v0.1.json`, enum fechado + validador do contrato) declara **14 tipos**, e todos os artefatos que dependem dela por referência cruzada (routing-rules, envelope, fixtures) estão consistentes com 14. Os únicos lugares que dizem "15" são quatro frases de dois documentos de sumário (README e Decision Record), redigidas durante a fase de escrita do Gate 1 — um resíduo de contagem intermediária que nunca se materializou em código, enum ou fixture.

**Não existe 15º tipo normativo.** Não há nenhuma evidência (linha de enum, linha de tabela no doc 02, fixture, rota, payload) de um décimo quinto tipo. A regra do Gate 2 é obedecida: nenhum tipo foi inventado para a contagem fechar.

## 3. Resolução declarada (sem tocar o Gate 1 congelado)

Por regra de imutabilidade do Gate 1, os arquivos `docs/gate1/00` e `docs/gate1/10` na branch `gate1/...` permanecem como foram congelados (commit `3e0907d`). A errata é registrada **no Gate 2**, em documento próprio e rastreável, declarando:

> A taxonomia canônica de `opera-gateway-event-contract/0.1` possui **14 event types**, conforme `schemas/event-types-v0.1.json`. As referências a "15 event types" no README e no Decision Record do Gate 1 são erro de redação do sumário e estão expressamente anuladas por esta errata. A contagem autoritativa para todos os gates seguintes é **14**.

O mecanismo formal que preserva o original é a própria regra do contrato congelado (§6/§10 do Decision Record do Gate 1): mudança normativa exigiria bump semântico de contrato — como esta errata **não muda semântica** (apenas corrige um numeral de sumário que nunca existiu em forma normativa), nenhuma bump de contrato é necessária; a correção vive nesta errata e será consolidada no documento equivalente do Gate 2.

## 4. Uso no Gate 2

O runtime do Gate 2 valida contra o enum de **14 tipos** e o corpus adversarial usa o enum canônico. A métrica "violações de contrato bloqueadas" (§13 do Gate 2) inclui `event_type` fora do enum de 14.

**Estado da errata:** CONCLUÍDA. Sanitação aprovada. Prosseguir para o runtime.
