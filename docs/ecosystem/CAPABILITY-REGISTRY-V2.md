# Capability Registry V2

**Data:** 13 de agosto de 2026

**Status:** ACTIVE — consolidação conservadora

O registro estruturado é `ecosystem/capabilities-v2.json`. O V1 permanece como snapshot. Uma capability canônica precisa ser reutilizável independentemente do produto, possuir contrato/limites e evidência versionada; código local interessante não basta.

## Canonical

| ID | Capability | Evidência |
|---|---|---|
| CAP-001 | Context Gate | `docs/context-gate.md` |
| CAP-002 | Document Provenance | `docs/document-provenance-contract-v1.md` |
| CAP-003 | Provenance Index | `docs/document-provenance-index-v1.md` |
| CAP-004 | Safe Document Representation | `docs/safe-document-representation-v1.md` |
| CAP-005 | Evidence Ledger | `docs/textual-evidence-producer-v0.md` |
| CAP-006 | Textual-Safe Route | `docs/textual-safe-route-v1.md` |
| CAP-007 | Corpus Inventory | `docs/archive-inventory.md` |
| CAP-008 | Binary Deduplication | `docs/archive-deduplication.md` |
| CAP-009 | Structural Classification and Routing | `docs/archive-structural-router.md` |
| CAP-011 | Research Governance and Falsifiability | `protocols/PRT-002-cartografia-epistemologica.md` |

GREEN sintético continua restrito ao escopo sintético. `CAP-010 — Snapshot, Hash and Audit Patterns` permanece `CANDIDATE`: há repetições locais, mas nenhum contrato compartilhado e independente.

## Candidate and System-local families

| Sistema | Classificação | Família avaliada | Motivo de não promoção |
|---|---|---|---|
| Obra Flow | CANDIDATE | ledger local-first, estoque derivado, backup atômico, PWA offline | falta contrato desacoplado |
| StockFlow | SYSTEM_LOCAL | recursos, custódia, movimentos e evidência | alto acoplamento ao domínio/schema |
| Vaga Quente | SYSTEM_LOCAL | `CAP-VQ-01..09`: matching, geografia, reputação, fairness, reserva, outcomes | segurança/calibração e banco real não validados |
| Vitrine Digital | CANDIDATE | `CAP-VD-01..07`: microsite, catálogo, ativação, mídia, carrinho e lead | testes/segurança e separação do domínio pendentes |
| Memória de Vendas | CANDIDATE | `CAP-MV-01..08`: memória contextual, scripts, lessons, outcomes, busca e follow-up | corpus/provenance/privacidade desconhecidos |
| Direcione | SYSTEM_LOCAL | `CAP-DIR-01..09`: score, Mesa, dependências, memória, decisão e reset | alto acoplamento e ausência de teste independente |
| QFD-OS | SYSTEM_LOCAL | `CAP-QFD-01..08`: decisão, backtest, learning loop, forecast e reconciliação | regras não validadas; evidence model ausente |
| Margin Narrative | CANDIDATE | `TEMP-MNE-001..006`: narrativa, ledger metadata, score, hash, disputa e dossiê | integridade fraca e store efêmero |

Todos os IDs temporários foram preservados como evidência das reviews, não convertidos em `CAP-*` canônicos. Variantes de evidence ledger se sobrepõem a CAP-005, mas não são duplicatas equivalentes. Padrões de snapshot/hash permanecem sobreposição sob CAP-010.

## Limites

- `CANONICAL` aqui classifica capability operacional/documental; não cria conceito teórico ou ID do Glossário.
- Reuso potencial não transfere ownership, dados ou autorização.
- Nenhuma promoção inicia extração, biblioteca compartilhada ou integração.
