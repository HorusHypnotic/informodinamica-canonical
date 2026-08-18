# GATE0-FORMAL-CORRECTION-DIFF — Diferenças formais aplicadas aos patches

**Data:** 18/08/2026 · **Escopo estrito:** duas contradições formais identificadas na revisão dos patches; sem conceitos, documentos ou fases novas. O diff abaixo é textual (formato unificado por bloco) e corresponde a arquivos já existentes na branch `redteam/gate0-instruments`.

## Correção 1 — Partição de categorias (GATE0-CLASSIFICATION-RULES-V0.md → V1; GATE0-PATCHES.md patch 5)

```diff
--- GATE0-CLASSIFICATION-RULES-V0.md (seção 2)
+++ GATE0-CLASSIFICATION-RULES-V1.md (seção 2)
@@
-| **UNOBSERVED_PRECURSOR** | ECOA-POSITIVE + cobertura >= limiar +
-|   nenhuma divergencia + busca ativa falhou
-| **REFUTATION**           | ECOA-POSITIVE + (UNOBSERVED descartado OU
-|   cobertura alta sem precursor) OU (ECOA + ECOB!=representacional/
-|   indeterminado)            <-- CONTRADICAO: UNOBSERVED e REFUTATION
-|                                 mutuamente satisfaziveis pelo mesmo dado;
-|                                 dupla definicao de REFUTATION conflita
+Ordem lexical de decisão (primeira regra satisfeita decide):
+  1. MISSING_DATA         - checklist de incompletude, antecedente ao outcome
+  2. MEASUREMENT_FAILURE  - evidencia tecnica datada na origem do snapshot
+  3. ECOA-NEGATIVE        - criterios 1-5 avaliados; 3 ou 4 nao atendidos
+  4. ECOA-POSITIVE        - criterios 1-5 atendidos (inclui crit. 3)
+  5. UNOBSERVED_PRECURSOR - 4 + cobertura>=limiar + sem divergencia +
+                            busca ativa negativa
+  6. ECOA-POSITIVE + ECOB - 4 com UNOBSERVED descartado; ECOB descritor
+
+REFUTATION deixa de ser categoria. Sua funcao anterior (celula de derrota
+somavel) e agora expressa pela composicao da regra 6 com ECOB nao
+representacional - sem rotulo que sobreponha com UNOBSERVED.
```

O diff correspondente no patch documentado (GATE0-PATCHES.md) substitui o patch 5 pela versão corrigida com a mesma estrutura ANTES/PROBLEMA/DEPOIS/POR QUE/EFEITO; o conteúdo permanece, a taxonomia muda.

## Correção 2 — Falhas externas sem incompatibilidade coordenacional (GATE0-CLASSIFICATION-RULES-V1.md §3; GATE0-SYNTHETIC-CASES.md caso #8; GATE0-ECO-CIRCULARITY-AUDIT.md §6 menção a "força maior")

```diff
--- GATE0-ECO-CIRCULARITY-AUDIT.md (secao 6, mencao a caso #8)
+++ (corrigido)
@@
-  "casos #1, #4, #8, #12, #22 dos sinteticos [admetem ECOA=1 sem
-   degradacao]"
-  "caso #8 forca maior pura: ECOA-POSITIVE + ECOB-externo"
+  "casos #1, #4, #12, #22 dos sinteticos [admetem ECOA=1 sem degradacao]"
+  "caso #8 forca maior SEM incompatibilidade coordenacional:
+   ECOA-NEGATIVE + marcador externo (criterio 3 falha) - fora do corpus
+   de desfechos coordenacionais, sem imunizacao"
```

Estatuto corrigido, em prosa: **um evento externo sem incompatibilidade coordenacional não satisfaz o critério 3 do ECOA e portanto não é ECOA**; não é classificado como desfecho coordenacional nem desviado para qualquer válvula (UNOBSERVED/MISSING) — simplesmente não entra no corpus. Um evento externo **com** incompatibilidade coordenacional permanece ECOA-POSITIVE com ECOB externo ou múltiplo. A força maior deixa de ser "ECOA com causa externa" e passa a ser "não-ECOA com marcador de causa" — o instrumento agora se alinha ao seu próprio critério 3.

## Reexecução dos 22 casos — mudanças de classificação registradas

A reexecução completa consta de GATE0-CLASSIFICATION-RULES-V1.md §4. Síntese do diff de classificação:

| Caso | Antes (V0) | Depois (V1) |
|------|-----------|-------------|
| #8 (queda de energia pura) | ECOA=1 + ECOB-externo | **ECOA-NEGATIVE + marcador externo** — mudança material |
| #22 (cobertura alta + busca ativa negativa + ECO) | REFUTATION | **ECOA-POSITIVE, UNOBSERVED descartado, ECOB≠representacional** — mudança apenas de rótulo, conteúdo de derrota idêntico |
| #1–#7, #9–#21 | inalterados | inalterados |

20 de 22 classificações preservadas; as duas mudanças são exatamente as que as contradições exigiam. A exclusividade da partição é verificável por dois avaliadores sem discricionariedade de escolha de categoria: a ordem lexical decide e as condições são checklist-driven.

## Consequências agregadas (sem novo conteúdo)

O caso #8 sai da contagem de ECOA=1 nos sintéticos (8 → 7 ECOA-POSITIVE com atribuição representacional ou candidata; o agregado da tabela do GATE0-SYNTHETIC-CASES §3 é recontado: 7 associação candidata, 6 exposição sem outcome, 2 derrota genuína somável (#1, #22), 3 não-representacional, 1 limitação de construto, 1 limite externo #8, 2 covariáveis/quase). O veredito geral permanece **PASS_WITH_REVISIONS** — a correção fortalece a partição sem alterar os vereditos por instrumento (a tabela do GATE0-VERDICT §2 é atualizada: "Regras de classificação: PASS" permanece; o conteúdo descrito muda para a partição V1).
