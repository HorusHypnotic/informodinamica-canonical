# Relatório sanitizado — Reading Order Arbiter V0.5 — out-of-sample — 2026-08-13

## Context Gate e congelamento

O Context Gate retornou `WARN` apenas pela working tree preexistente do owner. O artefato testado foi
o commit `1fc25b17c551182692151d4a5a034fa2a2b63b1f`, com hashes Git
`5c5b8691c1fdb70579e2744a800bc6a294956f55` para o arbiter e
`613a00023833e00c08c1ca1d47df7e771b567e00` para o conversor.

Não houve alteração de thresholds, gates, pesos, heurísticas, Structural Router,
StructureClassifier, Markdown Renderer ou testes. Os sete PDFs permaneceram fora da calibração e
foram usados somente como conjunto out-of-sample nesta missão.

## Escopo

Foram processados exatamente os sete `doc_id` congelados, duas vezes, totalizando 116 páginas por
execução. Nenhum outro PDF foi resolvido ou convertido. Não houve OCR, MD_WITH_ASSETS, API/LLM,
acesso a `G:` ou modificação de PDF. Outputs e manifests reais permanecem em `.local/`.

## Resultado agregado por documento

| doc_id | páginas | KEEP | GEOMETRY | UNCERTAIN | confiança | custo/divergência | overlap | Reading Order | Structure | Markdown |
|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|
| DOC-021bc4d2 | 10 | 0 | 0 | 10 | 0,857 | 0,966–1,000 | 0 | WARN | FAIL | PASS_WITH_WARNINGS |
| DOC-2174cfd5 | 81 | 0 | 0 | 81 | 0,714–0,857 | 0,949–1,000 | 0–0,004 | WARN | FAIL | PASS_WITH_WARNINGS |
| DOC-b64b3849 | 5 | 0 | 0 | 5 | 0,857 | 0,857–1,000 | 0 | WARN | FAIL | PASS_WITH_WARNINGS |
| DOC-6490c903 | 2 | 0 | 0 | 2 | 0,714 | 0,286–1,000 | 0–0,058 | WARN | WARN | PASS_WITH_WARNINGS |
| DOC-db11d875 | 8 | 0 | 0 | 8 | 0,857 | 0,963–1,000 | 0 | WARN | WARN | PASS_WITH_WARNINGS |
| DOC-8c414ef6 | 4 | 0 | 0 | 4 | 0,857 | 0,966–0,971 | 0 | WARN | WARN | PASS_WITH_WARNINGS |
| DOC-d9bd8d59 | 6 | 0 | 0 | 6 | 0,857 | 0,966–1,000 | 0 | WARN | WARN | PASS_WITH_WARNINGS |

`reordering_cost` e `conflict_ratio` são a mesma métrica versionada nesta versão, portanto os
intervalos de custo e divergência coincidem. Todas as 116 páginas produziram
`READING_ORDER_UNCERTAIN` e preservaram fisicamente `source_order`.

## Gates por página

Os manifests locais registram, para cada página, as duas ordens, decisão, confiança, custo,
divergência, overlap e sinais dos gates. Agregado das 116 páginas:

| Gate | PASS | FAIL |
|---|---:|---:|
| transformação axis-aligned | 116 | 0 |
| geometria disponível | 115 | 1 |
| hipótese estável | 116 | 0 |
| overlap aceitável | 116 | 0 |
| geometria internamente coerente | 116 | 0 |
| ganho mínimo de qualidade | 114 | 2 |
| sinal estrutural forte | 0 | 116 |

Padrões de falha: 113 páginas falharam somente o sinal estrutural; duas falharam ganho e sinal;
uma falhou disponibilidade geométrica e sinal. Como USE exige sete de sete gates, nenhuma geometria
foi selecionada com confiança indevida.

## Controles e golden failures

Os quatro controles tiveram 20/20 páginas preservadas como incertas, sem reordenação geométrica.
Logo, 4/4 não regrediram e não houve falso `USE_GEOMETRY_ORDER`.

Os três golden failures tiveram 96/96 páginas encaminhadas como `ORDER_UNCERTAIN`. Eles não foram
corrigidos, mas também não receberam ordem geométrica confiante incorreta. A avaliação estrutural
anterior permanece FAIL para esses documentos.

## Determinismo, testes e privacidade

- decisões e métricas por página idênticas entre duas execuções: 116/116;
- SHA-256 do Markdown idêntico entre duas execuções: 7/7;
- suíte congelada executada sem alteração: 61/61 PASS;
- `git diff --check`: PASS;
- código e testes permaneceram sem diff;
- nenhum texto, filename ou path documental foi versionado.

## Avaliações separadas

**READING ORDER ARBITER V0.5 = OUT-OF-SAMPLE YELLOW**

O arbiter foi seguro e conservador, com zero falso geométrico e controles preservados, mas ficou
incerto em 116/116 páginas. Isso caracteriza incerteza excessiva, não falha de segurança.

**DIRECT_MD permanece RED / não promovido.**

Reading Order seguro não corrige as falhas estruturais dos três adversariais nem torna automaticamente
o Markdown final fiel. O resultado desta missão não autoriza expansão do corpus.

Próxima recomendação: análise diagnóstica, sem calibração, da ausência universal de sinal estrutural
forte, comparando a definição desse gate com as métricas já capturadas. Qualquer proposta de V0.6
deve voltar primeiro a fixtures sintéticas e só depois a novo teste out-of-sample congelado.
