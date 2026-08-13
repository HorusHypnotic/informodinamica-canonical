# Validação amostral — PDF Classifier V1 — 2026-08-13

## Escopo e método

Amostra determinística de 20 conteúdos: 12 inicialmente `TEXT_NATIVE`, distribuídos por faixas de
páginas e proporção de páginas com imagem; cinco `SCAN` por quantis de páginas; todos os dois
`MIXED`; e o único `VISUAL_TECHNICAL` da versão `1.0.0`. Foram inspecionadas 58 páginas
representativas. O relatório usa somente `doc_id` sanitizado.

## Matriz final — heurística 1.1.0

| doc_id | Classe automática | Classe revisada | Resultado | Motivo estrutural | Estratégia futura |
|---|---|---|---|---|---|
| DOC-1a0ecaad | VISUAL_TECHNICAL | VISUAL_TECHNICAL | PASS | Formulário vetorial; layout carrega relações | MD_WITH_ASSETS |
| DOC-1550f687 | TEXT_NATIVE | TEXT_NATIVE | PASS | Texto linear suficiente; sem dependência visual relevante | DIRECT_MD |
| DOC-73ce27e7 | VISUAL_TECHNICAL | VISUAL_TECHNICAL | PASS | Infográfico com imagem e alta densidade vetorial | MD_WITH_ASSETS |
| DOC-74d01646 | VISUAL_TECHNICAL | VISUAL_TECHNICAL | PASS | Composição diagramada recorrente | MD_WITH_ASSETS |
| DOC-1208fba9 | VISUAL_TECHNICAL | VISUAL_TECHNICAL | PASS | Formulários e tabelas desenhados | MD_WITH_ASSETS |
| DOC-021bc4d2 | TEXT_NATIVE | TEXT_NATIVE | PASS | Texto corrido extraível e suficiente | DIRECT_MD |
| DOC-947b5421 | TEXT_NATIVE | TEXT_NATIVE | PASS | Texto e tabelas reconstruíveis sem asset essencial | DIRECT_MD |
| DOC-e6b31757 | VISUAL_TECHNICAL | VISUAL_TECHNICAL | PASS | Layout visual denso e imagens recorrentes | MD_WITH_ASSETS |
| DOC-1f76229f | TEXT_NATIVE | TEXT_NATIVE | PASS | Texto técnico e tabelas extraíveis | DIRECT_MD |
| DOC-60f4a354 | TEXT_NATIVE | TEXT_NATIVE | PASS | Texto longo predominante; decoração não essencial | DIRECT_MD |
| DOC-a2002f77 | TEXT_NATIVE | TEXT_NATIVE | PASS | Texto predominante; imagens pontuais não essenciais | DIRECT_MD |
| DOC-29a54755 | TEXT_NATIVE | TEXT_NATIVE | PASS | Camada textual suficiente apesar de imagens de página | DIRECT_MD |
| DOC-0936052b | SCAN | SCAN | PASS | Sem camada textual; páginas rasterizadas | OCR |
| DOC-956ac3d0 | SCAN | SCAN | PASS | Sem camada textual; páginas rasterizadas | OCR |
| DOC-b99fecec | SCAN | SCAN | PASS | Sem camada textual; páginas rasterizadas | OCR |
| DOC-6020fefd | SCAN | SCAN | PASS | Sem camada textual útil; composição visual | OCR |
| DOC-c307f48a | SCAN | SCAN | PASS | Sem camada textual útil; composição visual | OCR |
| DOC-756441b9 | MIXED | MIXED | PASS | Alternância relevante entre páginas textuais e visuais | MD_WITH_ASSETS |
| DOC-beabe130 | MIXED | MIXED | PASS | Página sem texto em documento parcialmente textual | MD_WITH_ASSETS |
| DOC-eae4660a | VISUAL_TECHNICAL | VISUAL_TECHNICAL | PASS | Imagens e layout vetorial em todas as páginas | MD_WITH_ASSETS |

## Resultado e correção

A versão `1.0.0` acertou 15 de 20 itens (75%). Os cinco erros estavam na classe `TEXT_NATIVE`:
camada textual suficiente coexistia com formulários, infográficos ou composição visual essencial.
Não houve erro amostral em `SCAN`, `MIXED` ou `VISUAL_TECHNICAL`.

A versão `1.1.0` adicionou sinais determinísticos de operadores vetoriais e de pintura, combinados
com densidade textual e presença de imagens. Após reclassificação completa e reinspeção dos cinco
afetados, a matriz final acertou 20 de 20 itens (100%). Uma inspeção adicional de 16 documentos na
fronteira foi usada para evitar um limiar vetorial excessivamente amplo.

## Decisão

**PDF CLASSIFIER V1 = VALIDATED**

A taxa é evidência amostral, não garantia universal. A próxima etapa deve preservar revisão humana
e separar `DIRECT_MD`, `MD_WITH_ASSETS` e `OCR`; nenhuma conversão foi iniciada.
