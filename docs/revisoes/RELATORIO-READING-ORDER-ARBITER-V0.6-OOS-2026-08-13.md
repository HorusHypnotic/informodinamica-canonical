# Relatório sanitizado — Reading Order Arbiter V0.6 — out-of-sample — 2026-08-13

## Context Gate e congelamento

O Context Gate retornou `WARN` somente pela working tree preexistente do owner. A validação partiu do
commit `89f9e02221bedc69c0da44a7ea45259120da2e56`, com o arbiter congelado em
`b8abb3ccbf2f1589c5c50f9d7e53ec39097f2c8e` e o conversor 0.5.1 em
`237380492481c55bddbe8b71cc7a23099885d049`.

Não houve recalibração nem alteração de código, thresholds, gates, pesos, fórmulas, fixtures, ground
truth, Structural Router, StructureClassifier, Markdown Renderer ou conversor. Quando a falha foi
observada, ela foi registrada sem correção.

## Escopo e privacidade

Foram processados exatamente os sete `doc_id` congelados, duas vezes, totalizando 116 páginas por
execução. Nenhum outro PDF foi resolvido ou convertido. Não houve OCR, MD_WITH_ASSETS, API/LLM,
acesso a `G:` ou modificação de PDF. Outputs, manifests e imagens auxiliares de inspeção permaneceram
em `.local/`; nenhum texto, filename ou path documental foi versionado.

## Page width

As 116 páginas receberam largura real do `CropBox`, no mesmo sistema de coordenadas dos bboxes.
Não houve uso de `MediaBox` nem fallback. Agregado por documento:

| doc_id | páginas | page_width | CropBox | MediaBox | fallback |
|---|---:|---:|---:|---:|---:|
| DOC-021bc4d2 | 10 | 594,959960 | 10 | 0 | 0 |
| DOC-2174cfd5 | 81 | 595,919980 | 81 | 0 | 0 |
| DOC-b64b3849 | 5 | 595,919980 | 5 | 0 | 0 |
| DOC-6490c903 | 2 | 595,280000 | 2 | 0 | 0 |
| DOC-db11d875 | 8 | 595,280000 | 8 | 0 | 0 |
| DOC-8c414ef6 | 4 | 595,280000 | 4 | 0 | 0 |
| DOC-d9bd8d59 | 6 | 595,919980 | 6 | 0 | 0 |

Distribuição global de `page_width` (mínimo/P25/mediana/P75/máximo):
594,959960 / 595,919980 / 595,919980 / 595,919980 / 595,919980.

## Resultado por documento e por página agregado

| doc_id | páginas | KEEP | GEOMETRY | UNCERTAIN | páginas GEOMETRY | confiança | custo/divergência | overlap | Reading Order | Structure | Markdown |
|---|---:|---:|---:|---:|---|---:|---:|---:|---|---|---|
| DOC-021bc4d2 | 10 | 0 | 6 | 4 | 1, 4–8 | 0,857–1,000 | 0,966–1,000 | 0 | FAIL | FAIL | FAIL |
| DOC-2174cfd5 | 81 | 0 | 44 | 37 | 28, 29, 31, 32, 34–56, 58–60, 63, 67, 68, 70–78, 80, 81 | 0,714–1,000 | 0,949–1,000 | 0–0,004 | FAIL | FAIL | FAIL |
| DOC-b64b3849 | 5 | 0 | 2 | 3 | 3, 5 | 0,857–1,000 | 0,857–1,000 | 0 | FAIL | FAIL | FAIL |
| DOC-6490c903 | 2 | 0 | 0 | 2 | — | 0,714 | 0,286–1,000 | 0–0,058 | WARN | WARN | PASS_WITH_WARNINGS |
| DOC-db11d875 | 8 | 0 | 8 | 0 | 1–8 | 1,000 | 0,963–1,000 | 0 | FAIL | WARN | FAIL |
| DOC-8c414ef6 | 4 | 0 | 4 | 0 | 1–4 | 1,000 | 0,966–0,971 | 0 | FAIL | WARN | FAIL |
| DOC-d9bd8d59 | 6 | 0 | 0 | 6 | — | 0,857 | 0,966–1,000 | 0 | WARN | WARN | PASS_WITH_WARNINGS |
| **Total** | **116** | **0** | **64** | **52** | — | — | — | — | — | — | — |

`reordering_cost` e divergência source versus geometry são a mesma métrica versionada. Páginas não
listadas na coluna GEOMETRY foram `ORDER_UNCERTAIN`. Os warnings correspondentes foram
`READING_ORDER_GEOMETRY_SELECTED` em 64 páginas e `READING_ORDER_UNCERTAIN` em 52; nenhuma página
produziu `READING_ORDER_SOURCE_PRESERVED`.

## Gates e métricas width-invariant

| Gate | PASS | FAIL |
|---|---:|---:|
| transformação axis-aligned | 116 | 0 |
| geometria disponível | 115 | 1 |
| hipótese estável | 116 | 0 |
| overlap aceitável | 116 | 0 |
| geometria internamente coerente | 116 | 0 |
| ganho mínimo de qualidade | 114 | 2 |
| sinal estrutural forte | 64 | 52 |

Das 64 páginas com sinal forte, 64 passaram pelo ramo vertical e zero pelo ramo de colunas. Padrões
de falha: 64 páginas passaram todos os gates; 49 falharam somente sinal estrutural; duas falharam
ganho e sinal; uma falhou disponibilidade geométrica e sinal.

| Métrica | mínimo | P25 | mediana | P75 | máximo |
|---|---:|---:|---:|---:|---:|
| left_edge_span_ratio | 0 | 0 | 0 | 0,046986 | 0,628309 |
| left_edge_gap_ratio | 0 | 0 | 0 | 0,046986 | 0,603872 |
| region_gap_ratio | -1,301651 | -1,211438 | -1,168613 | -1,135340 | -0,308391 |
| geometry_confidence | 0,714286 | 0,857143 | 1,000000 | 1,000000 | 1,000000 |
| overlap | 0 | 0 | 0 | 0 | 0,058321 |
| reordering_cost | 0,285714 | 0,967742 | 0,972973 | 1,000000 | 1,000000 |

O `region_gap_ratio` foi negativo em toda a amostra, coerente com ausência de regiões horizontais
separadas. Mesmo assim, o ramo vertical selecionou 64 páginas. A comparação ordinal revelou razão de
inversão de Kendall igual a 1,000 em todas as 64 seleções: a ordem geométrica era a reversão completa
da ordem de origem. Inspeção visual local dos dois controles afetados confirmou fluxo normal de cima
para baixo, tornando essas seleções falsos `USE_GEOMETRY_ORDER`, não correções reais.

## Controles e golden failures

Nos controles, DOC-6490c903 e DOC-d9bd8d59 preservaram a ordem de origem como incerta. DOC-db11d875
e DOC-8c414ef6 regrediram em todas as páginas: 12/20 páginas de controle receberam geometria falsa e
completamente invertida. Resultado: somente 2/4 controles preservados e 12 falsos GEOMETRY graves.

Nos golden failures, 44/96 páginas foram encaminhadas conservadoramente como `ORDER_UNCERTAIN`, mas
52/96 receberam a mesma reversão geométrica completa. Portanto, os três documentos adversariais não
foram corrigidos nem tratados integralmente como incertos.

No total do corpus houve **64 falsos USE_GEOMETRY_ORDER**, dos quais 12 em controles e 52 em golden
failures.

## Determinismo, testes e integridade

- decisões, gates e métricas por página idênticos entre duas execuções: 116/116;
- SHA-256 do Markdown idêntico entre duas execuções: 7/7;
- suíte congelada executada sem alteração: 73/73 PASS;
- hashes congelados do arbiter e conversor: preservados;
- `git diff --check`: PASS;
- nenhum código ou teste alterado.

O fato de os testes sintéticos continuarem verdes não invalida a falha out-of-sample; evidencia que a
condição de reversão completa não estava protegida pelo contrato sintético congelado.

## Avaliações separadas

**READING ORDER ARBITER V0.6 = OUT-OF-SAMPLE RED**

Houve regressão em dois dos quatro controles e 64 seleções geométricas falsas. A missão foi encerrada
sem recalibração ou correção, conforme a regra absoluta.

**DIRECT_MD = RED / NÃO PROMOVIDO**

Cinco documentos tiveram Markdown produzido a partir de páginas falsamente invertidas. Os dois
controles preservados permanecem apenas `PASS_WITH_WARNINGS`; fidelidade estrutural e fidelidade final
continuam critérios separados.

Próxima recomendação: abrir missão diagnóstica isolada para verificar convenção/direção do eixo Y,
orientação da hipótese vertical e ausência de um bloqueio determinístico para reversão total. Qualquer
mudança deve nascer em novas fixtures sintéticas adversariais e só depois retornar a um novo OOS; os
sete PDFs não devem ser usados para calibrar thresholds.
