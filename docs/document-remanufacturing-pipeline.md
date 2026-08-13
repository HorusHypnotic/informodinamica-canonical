# Pipeline de remanufatura documental — baseline operacional

**Data:** 13 de agosto de 2026

**Status:** ACTIVE — baseline operacional; nenhuma conversão em massa autorizada

## Objetivo e arquitetura

O objetivo é transformar o acervo local em representações mais leves, pesquisáveis, rastreáveis e
adequadas ao uso computacional, preservando informação e proveniência. O pipeline é uma arquitetura
de múltiplas estratégias e admite abstenção:

```text
CORPUS
  → INVENTORY
  → DEDUPLICATION
  → STRUCTURAL CLASSIFICATION
  → ROUTING
      ├── textual-safe
      ├── structured-text
      ├── visual/technical
      ├── mixed
      ├── scan/OCR
      └── manual/review
  → REPRESENTATION
  → VALIDATION
  → PROVENANCE
  → SEARCH / RETRIEVAL / AI CONSUMPTION
```

As etapas posteriores a routing são alvos arquiteturais, não componentes declarados prontos.
`DIRECT_MD` foi somente uma rota experimental e seu RED não torna o pipeline inteiro RED.

## Estado confirmado do corpus

Os valores abaixo foram reconferidos nos índices locais completos e nas revisões sanitizadas:

| Camada | Estado confirmado |
|---|---:|
| arquivos inventariados | 392 |
| conteúdos binariamente únicos | 321 |
| PDFs originais | 314 |
| PDFs binariamente únicos e classificados | 245 |
| grupos de duplicatas | 44 |
| cópias binárias redundantes | 71 |
| erros de inventário, deduplicação ou classificação | 0 |

Classificação PDF V1.1.0 dos 245 conteúdos únicos:

| Classe | Quantidade | Estado de rota |
|---|---:|---|
| `TEXT_NATIVE` | 152 | requer novo roteamento; não equivale a conversão automática |
| `VISUAL_TECHNICAL` | 66 | `MD_WITH_ASSETS` candidato; NOT IMPLEMENTED / NOT VALIDATED |
| `MIXED` | 2 | `MD_WITH_ASSETS` candidato; NOT IMPLEMENTED / NOT VALIDATED |
| `SCAN` | 25 | OCR candidato; NOT IMPLEMENTED / NOT VALIDATED |
| `FAILED` | 0 | `MANUAL_REVIEW`; população atual zero |
| `ENCRYPTED_OR_RESTRICTED` | 0 | `MANUAL_REVIEW`; população atual zero |

O resumo operacional histórico do classificador rotulou 152 itens como “conversão automática”. Essa
expressão descrevia uma hipótese de conversibilidade futura, não autorização. Os pilotos posteriores
falsificaram a equivalência `TEXT_NATIVE → DIRECT_MD`.

## Mapa operacional das rotas

| Entrada | Subestado/estratégia | Estado atual | Próximo requisito |
|---|---|---|---|
| `TEXT_NATIVE` | estruturalmente simples / `textual-safe` | rota a definir; `DIRECT_MD` congelado | representação segura e validação independente |
| `TEXT_NATIVE` | estruturado | não autorizado para Markdown puro | contrato que preserve relações estruturais |
| `TEXT_NATIVE` | revisão necessária | ABSTAIN / manual review | evidência adicional sem forçar decisão |
| `TEXT_NATIVE` | experimental | artefatos DIRECT_MD preservados e FROZEN | missão explícita para eventual reabertura |
| `VISUAL_TECHNICAL` | `MD_WITH_ASSETS` | NOT IMPLEMENTED / NOT VALIDATED | piloto separado e provenance de assets |
| `MIXED` | `MD_WITH_ASSETS` | NOT IMPLEMENTED / NOT VALIDATED | contrato texto–asset e validação |
| `SCAN` | OCR | NOT IMPLEMENTED / NOT VALIDATED | política de OCR, confiança e revisão |
| `FAILED` / `RESTRICTED` | `MANUAL_REVIEW` | população zero | preservar rota para futuras ocorrências |

O Structural Router 0.2.0 permanece GREEN no escopo histórico de separar sete candidatos
`LINEAR_TEXT`, 84 `STRUCTURED_TEXT` e 61 `STRUCTURAL_REVIEW`. Ele não foi alterado. Seus sete
candidatos não constituem população autorizada para conversão, pois o experimento downstream foi
reprovado.

## Backlog priorizado

### P0 — Governança e corpus

- manter este checkpoint consolidado e o mapa de classes;
- aplicar o `Document Provenance Contract V1` a qualquer nova rota, sem retroagir sobre conteúdo
  privado;
- formalizar política de preservação do corpus original e de outputs derivados;
- distinguir deduplicação lógica de qualquer futura decisão física;
- definir critérios de abstenção e revisão humana por rota.

### P1 — Rotas úteis

- definir uma representação textual segura sem presumir `DIRECT_MD` geral;
- experimentar `MD_WITH_ASSETS` em corpus sintético/controlado;
- definir rota OCR com confiança, provenance e revisão;
- criar mecanismo de validação separado da transformação;
- avaliar representação estruturada que preserve relações que Markdown plano perde.

### P2 — Retrieval e IA

- definir Markdown/representação normalizada somente após validação da rota;
- especificar metadata e chunks com ligação ao original;
- construir índices e busca sem apagar a fonte;
- definir montagem de contexto para agentes/LLMs com provenance explícita.

### P3 — Hipótese futura de produto

Avaliar, sem promover nesta fase, um pipeline reutilizável de ingestão, deduplicação, classificação,
roteamento, transformação, validação, proveniência e otimização de representações para consumo
computacional.

## Invariantes de segurança

- abstenção é resultado válido;
- nenhum PDF original é excluído, movido ou sobrescrito;
- outputs derivados ficam separados do corpus;
- deduplicação lógica não autoriza exclusão física;
- nenhuma operação em `G:` sem missão explícita;
- `.local/` é operacional e não canônico;
- nenhum lote começa sem rota e validação próprias;
- resultados experimentais negativos permanecem preservados.

## Fontes

- `docs/archive-inventory.md` e revisão de inventário;
- `docs/archive-deduplication.md` e revisão de deduplicação;
- `docs/archive-pdf-classification.md` e revisão da classificação V1.1.0;
- `docs/archive-structural-router.md` e relatório V0;
- `docs/archive-pdf-to-markdown.md` e relatórios DIRECT_MD/Reading Order V0–V0.6;
- `docs/decisoes/CHECKPOINT-REMANUFATURA-DOCUMENTAL-2026-08-13.md`.
