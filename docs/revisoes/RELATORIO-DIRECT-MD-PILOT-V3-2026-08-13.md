# Relatório sanitizado — DIRECT_MD Pilot V3 — 2026-08-13

## Arquitetura experimental

O conversor 0.3.0 separa `TextBlock → ReadingOrderEngine → OrderedBlock` de
`OrderedBlock → StructureClassifier → ClassifiedBlock → Markdown`. A Fase A não atribui semântica;
a Fase B não altera ordem. O motor preserva `source_order`, exceto diante de colunas claras ou forte
inversão vertical alinhada. O piloto demonstrou que o critério de “colunas claras” ainda é amplo
demais para PDFs reais.

## Validação dos sete

| doc_id | Reading Order | Structure | Markdown final | V2 → V3 |
|---|---|---|---|---|
| DOC-021bc4d2 | FAIL | FAIL | FAIL | heading multilinha agrupado em ordem incorreta |
| DOC-2174cfd5 | FAIL | FAIL | FAIL | lista multinível permanece fora de ordem |
| DOC-b64b3849 | FAIL | FAIL | FAIL | sequência reordenada e ainda mal classificada |
| DOC-6490c903 | FAIL | WARN | FAIL | controle regrediu por reordenação |
| DOC-db11d875 | FAIL | WARN | FAIL | controle regrediu por reordenação |
| DOC-8c414ef6 | FAIL | WARN | FAIL | intervenção geométrica não confiável |
| DOC-d9bd8d59 | FAIL | WARN | FAIL | intervenção geométrica não confiável |

O warning `READING_ORDER_GEOMETRY_APPLIED` apareceu nos sete documentos. Em `DOC-2174cfd5`, também
permaneceu `CHECKLIST_STATE_UNCERTAIN`; nenhum estado foi inventado. Os três golden failures não
foram corrigidos e os quatro controles não foram preservados.

## Fixtures e testes

Reading Order possui fixtures para uma e duas colunas, transformação, translação, escala, rotação,
source order coerente/incoerente, lista indentada, heading multilinha e sobreposição. Structure
cobre heading simples/multilinha, parágrafo, listas simples/multinível, checklist incerto, falso
heading e sequência visual. Todos os testes anteriores foram preservados: 47 testes passaram.

## Benchmark

- PDF: 1.467.264 bytes; 116 páginas.
- Markdown: 279.025 bytes.
- Caracteres: 218.287 preservados de 218.345.
- Retenção média: 0,999187; mínima: 0,996935.
- Markdown: 38.894 palavras; 67.294 tokens estimados.
- Tempo medido: 9,932 s.

Tokens são estimativas locais, não custo de provedor. O SHA-256 do Markdown foi idêntico em duas
execuções para 7/7.

## Decisão

**DIRECT_MD PILOT V3 = RED**

A separação arquitetural torna a origem das falhas observável, mas a política de confiança do
Reading Order Engine não é segura. Não expandir.
