# Relatório sanitizado — Reading Order Arbiter V0.4 — 2026-08-13

## Context Gate e escopo

O Context Gate retornou `WARN` apenas pela working tree preexistente. Foram reprocessados exatamente
os mesmos sete `doc_id`; não houve expansão do corpus, OCR, MD_WITH_ASSETS, LLM/API, acesso a `G:`,
alteração de PDF, produto OPERA, Context Gate, pipeline documental ou Structural Router 0.2.0.

## Arquitetura e critérios

Para cada página, o arbiter 0.4.0 constrói `source_order` e `geometry_order`. A saída é uma decisão
explícita: `KEEP_SOURCE_ORDER`, `USE_GEOMETRY_ORDER` ou `ORDER_UNCERTAIN`. Tanto KEEP quanto UNCERTAIN
preservam fisicamente `source_order`; somente USE seleciona geometria. O classificador recebe apenas
a ordem escolhida e não foi modificado.

As métricas determinísticas são: razão de conflito entre hipóteses, inversões e saltos verticais,
alternâncias e retrocessos entre colunas, continuidade de indentação, overlap, qualidade de
progressão, ganho de qualidade, cobertura geométrica, transformação axis-aligned e estabilidade da
hipótese quando a entrada é apresentada em ordem inversa.

| Parâmetro versionado | Valor | Justificativa operacional |
|---|---:|---|
| tolerância de coordenada | 2 pt | absorver ruído de baseline sem ocultar salto de linha |
| gap mínimo entre colunas | 80 pt | impedir que indentação comum forme coluna |
| gap relativo à largura | 1,5× | exigir separação maior que o corpo do bloco |
| blocos mínimos por coluna | 2 | rejeitar outlier isolado como coluna |
| overlap máximo | 0,10 | geometria sobreposta não sustenta ordem forte |
| ganho mínimo de qualidade | 0,50 | exigir correção combinada, não melhoria marginal |
| violações admitidas na geometria | 0 | hipótese substituta deve ser internamente coerente |
| violações verticais mínimas na fonte | 0,50 | ao menos metade das transições deve falhar |
| salto anômalo mínimo | 1,25× | distinguir retorno forte de oscilação local |
| span máximo de indentação | 24 pt | proteger listas multinível e layouts desalinhados |

Geometria só vence quando todos os gates aplicáveis passam. Não há semântica, filename, path ou
`doc_id` na decisão.

## Revalidação dos sete

| doc_id | decisão predominante | KEEP | GEOMETRY | UNCERTAIN | Reading Order | Structure | Markdown |
|---|---|---:|---:|---:|---|---|---|
| DOC-021bc4d2 | ORDER_UNCERTAIN | 0 | 0 | 10 | WARN | FAIL | PASS_WITH_WARNINGS |
| DOC-2174cfd5 | ORDER_UNCERTAIN | 0 | 0 | 81 | WARN | FAIL | PASS_WITH_WARNINGS |
| DOC-b64b3849 | ORDER_UNCERTAIN | 0 | 0 | 5 | WARN | FAIL | PASS_WITH_WARNINGS |
| DOC-6490c903 | ORDER_UNCERTAIN | 0 | 0 | 2 | WARN | WARN | PASS_WITH_WARNINGS |
| DOC-db11d875 | ORDER_UNCERTAIN | 0 | 0 | 8 | WARN | WARN | PASS_WITH_WARNINGS |
| DOC-8c414ef6 | ORDER_UNCERTAIN | 0 | 0 | 4 | WARN | WARN | PASS_WITH_WARNINGS |
| DOC-d9bd8d59 | ORDER_UNCERTAIN | 0 | 0 | 6 | WARN | WARN | PASS_WITH_WARNINGS |

WARN em Reading Order significa conflito não comprovado: a ordem de origem foi preservada.
Structure conserva a avaliação do baseline sem atribuir ao arbiter correções que ele não fez.

## Antes e depois

No V3, 7/7 receberam geometria, 4/4 controles regrediram e 0/3 failures foram corrigidos. No V4,
0/116 páginas receberam geometria e 116/116 foram preservadas como `ORDER_UNCERTAIN`. Assim, 4/4
controles deixaram de sofrer regressão de ordem. Os três golden failures continuam não resolvidos,
mas foram corretamente encaminhados como incertos, sem reordenação agressiva.

## Fixtures, warnings e benchmark

Fixtures cobrem source correto/incorreto, duas colunas, transformação, rotação, escala/translação,
lista multinível, heading multilinha, overlap, ambiguidade, geometria vencedora e geometria atraente
que perde. Os warnings `READING_ORDER_SOURCE_PRESERVED`, `READING_ORDER_GEOMETRY_SELECTED` e
`READING_ORDER_UNCERTAIN` possuem testes e contrato de manifesto.

- suíte completa: 54/54 PASS;
- Markdown idêntico por SHA-256 em duas execuções: 7/7;
- PDFs: 1.467.264 bytes e 116 páginas;
- Markdown: 278.339 bytes;
- caracteres: 218.287 de 218.345; retenção mínima 0,996935;
- palavras: 38.902; tokens estimados: 67.122;
- tempo medido da execução final: 10,669 s;
- outputs e documentos permanecem em `.local/`; o Git recebe apenas IDs e métricas sanitizadas.

## Avaliação

**READING ORDER ARBITER V0.4 = YELLOW**

Os controles foram preservados e nenhum caso ambíguo foi reordenado, mas os golden failures ainda
não possuem solução objetiva. Recomenda-se calibrar critérios somente com fixtures sintéticas
adversariais, sem ampliar o corpus real, antes de revalidar novamente estes mesmos sete.
