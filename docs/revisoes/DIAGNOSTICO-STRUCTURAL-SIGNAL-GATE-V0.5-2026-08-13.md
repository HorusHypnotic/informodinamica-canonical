# Diagnóstico sanitizado — Structural Signal Gate V0.5 — 2026-08-13

## Context Gate e congelamento

O Context Gate retornou `WARN` somente pela working tree preexistente do owner. O diagnóstico observa
o arbiter versionado em `5c5b8691c1fdb70579e2744a800bc6a294956f55` e as fixtures em
`4c069b3b8eb4ad12c8aabaf29839638519f63f7d`. Não houve alteração comportamental, recalibração,
reprocessamento de PDF ou modificação de código, thresholds, gates, pesos, fixtures ou ground truth.

Foram lidos somente os manifests locais congelados das 116 páginas e calculadas novamente, offline,
as métricas das 13 fixtures sintéticas. Nenhum conteúdo textual foi comparado ou versionado.

## Definição completa

O sétimo elemento de `evidence_gates` é:

```text
strong_structural_signal := strong_vertical OR strong_columns

strong_vertical :=
    NOT columns_detected
    AND source_vertical_inversions > 0
    AND source_violation_ratio >= 0.50
    AND anomalous_jump_ratio >= 1.25
    AND indentation_span <= 24 pt

strong_columns :=
    columns_detected
    AND source_column_switches > 1
    AND geometry_column_switches == 1
```

Origens e unidades:

- `columns_detected`: dois clusters separados pelo maior gap de centros X, cada um com pelo menos
  dois blocos; o gap deve ser `>= max(80 pt, 1,5 × largura mediana dos bboxes)`;
- `source_vertical_inversions`: quantidade de transições source dentro do mesmo cluster cujo próximo
  centro Y sobe mais de 2 pt;
- `source_violation_ratio`: inversões, retrocessos e alternâncias excedentes divididos por `n-1`;
- `anomalous_jump_ratio`: maior salto ascendente dividido pela mediana dos módulos de todos os saltos
  verticais, com denominador mínimo de 2 pt;
- `indentation_span`: `max(center_x) - min(center_x)`, em pontos;
- switches: transições entre os dois clusters na ordem source ou geometry.

Dependências: `visual_bbox`, centros dos bboxes transformados, source order, geometry order e os
parâmetros 2 pt, 80 pt, 1,5×, dois blocos, 0,50, 1,25 e 24 pt.

## Distribuições sintético × real

Cada célula numérica apresenta `mínimo / P25 / mediana / P75 / máximo / média`.

| Variável | Sintético, n=13 | Real, n=116 | Threshold |
|---|---|---|---|
| inversões verticais source | 0 / 0 / 0 / 1 / 1 / 0,308 | 1 / 28 / 31 / 35 / 39 / 30,940 | `> 0` |
| violation ratio | 0 / 0 / 0 / 0,5 / 1 / 0,231 | 0,167 / 1 / 1 / 1 / 1 / 0,985 | `>= 0,50` |
| anomalous jump ratio | 0 / 0 / 0 / 0,667 / 1,333 / 0,385 | 0,450 / 1,917 / 2,387 / 3,083 / 2568,388 / 29,606 | `>= 1,25` |
| indentation span, pt | 0 / 0 / 10 / 48 / 200 / 54,615 | 69,12 / 276,40 / 300,88 / 322,56 / 475,06 / 294,06 | `<= 24` |
| source column switches | 0 / 0 / 0 / 0 / 3 / 0,308 | 0 / 0 / 0 / 0 / 0 / 0 | `> 1` |
| geometry column switches | 0 / 0 / 0 / 0 / 1 / 0,154 | 0 / 0 / 0 / 0 / 0 / 0 | `== 1` |
| columns detected | 0 / 0 / 0 / 0 / 1 / 0,154 | 0 / 0 / 0 / 0 / 0 / 0 | verdadeiro |
| column gap, pt | 0 / 0 / 5 / 24 / 200 / 50,385 | 15,36 / 57,60 / 72,96 / 107,52 / 188,16 / 82,56 | variável |
| column threshold, pt | 80 / 80 / 80 / 80 / 120 / 83,08 | 230,40 / 846,72 / 918 / 990,72 / 1025,28 / 855,74 | `max(80, 1,5×width)` |
| conflict/reordering cost | 0 / 0 / 0 / 0,667 / 1 / 0,372 | 0,286 / 0,968 / 0,973 / 1 / 1 / 0,973 | `> 0` fora do signal |
| quality improvement | 0 / 0 / 0 / 0,5 / 1 / 0,231 | 0,167 / 1 / 1 / 1 / 1 / 0,985 | `>= 0,50` fora do signal |

Há distribution shift extremo: as fixtures usam bboxes de largura fixa de 40 pt, enquanto a
extração real estima largura com o comprimento da linha. Essa diferença contamina duas variáveis que
pareciam puramente estruturais.

## Subcondições que eliminam o gate

| Predicado | Sintético PASS | Real PASS |
|---|---:|---:|
| não detectou colunas | 11/13 | 116/116 |
| existe inversão vertical | 4/13 | 116/116 |
| violation ratio >= 0,50 | 5/13 | 114/116 |
| anomalous jump >= 1,25 | 2/13 | 113/116 |
| indentation span <= 24 pt | 8/13 | **0/116** |
| columns detected | 2/13 | **0/116** |
| source switches > 1 | 1/13 | 0/116 |
| geometry switches == 1 | 2/13 | 0/116 |
| strong vertical completo | 2/13 | 0/116 |
| strong columns completo | 1/13 | 0/116 |

### Causa evidenciada do 0/116

1. O ramo vertical morre universalmente em `indentation_span <= 24`.
   `indentation_span` não mede apenas indentação: usa centro X. Para linhas com o mesmo início X,
   larguras diferentes deslocam seus centros e aumentam o span. Nas fixtures, a largura fixa torna
   centro X um proxy aceitável; nos PDFs reais, não.
2. O ramo de colunas nunca é iniciado. O threshold de coluna multiplica a largura mediana da linha
   por 1,5. No real, sua mediana foi 918 pt, contra gap mediano de 72,96 pt e máximo de 188,16 pt.
   Nas fixtures, bboxes de 40 pt deixam prevalecer o piso de 80 pt.
3. Portanto o gate combina sinais cuja escala depende da largura textual, e essa dependência não foi
   representada nas fixtures V0.5. Não é ausência demonstrada de inversão ou ganho: 113 páginas
   passam inversão, severidade, salto e os seis gates externos relevantes.

## Contrafactual: remover somente o structural signal

Sem aplicar qualquer mudança, foram reavaliados offline os outros seis gates e o conflito:

| doc_id | Candidatas / páginas | Grupo |
|---|---:|---|
| DOC-021bc4d2 | 10/10 | golden failure |
| DOC-2174cfd5 | 80/81 | golden failure |
| DOC-b64b3849 | 5/5 | golden failure |
| DOC-6490c903 | 0/2 | controle |
| DOC-db11d875 | 8/8 | controle |
| DOC-8c414ef6 | 4/4 | controle |
| DOC-d9bd8d59 | 6/6 | controle |

Total: 113/116 candidatas, incluindo 95/96 páginas adversariais e **18/20 páginas de controle**.
Como o V3 já demonstrou regressão dos quatro controles sob reordenação geométrica ampla, remover o
gate seria inseguro. O gate não é redundante, embora sua implementação atual não transfira.

## Classificação A/B/C/D/E

- **B — sustentada parcialmente:** a intenção conservadora é válida, mas os thresholds atuam sobre
  proxies cuja escala real diverge radicalmente da calibração sintética.
- **C — sustentada fortemente:** largura fixa nas fixtures não representa a variação de largura dos
  bboxes reais; `indentation_span` e `column_gap_threshold` não transferem.
- **E — sustentada para as duas medições:** centro X não é medida pura de indentação, e largura
  mediana da linha não é escala robusta para separação de colunas neste extrator.
- **D — rejeitada:** sem o gate, 18/20 páginas de controle virariam candidatas geométricas.
- **A — não decidível com estes dados:** pode haver páginas sem evidência suficiente, mas a falha
  universal decorre de proxies não transferíveis; este ensaio não possui ground truth por página para
  provar ausência real de sinal.

## Riscos e proposta conceitual para V0.6

Simplesmente relaxar 24 pt ou remover o gate converteria controles em candidatos e otimizaria pelos
sete documentos. Aumentar o threshold de forma derivada desta distribuição violaria o caráter
out-of-sample. Remover o fator de largura sem novo ground truth também poderia ressuscitar os falsos
positivos do V3.

Uma futura V0.6, ainda não implementada, deveria testar sinais invariantes à largura textual:

- indentação baseada na borda esquerda transformada (`x0`) ou em clusters de bordas, não centros;
- separação de colunas baseada em gap entre regiões/bordas e overlap horizontal, normalizada pela
  página ou altura/tamanho tipográfico, não pela largura da linha textual;
- suporte mínimo e estabilidade de clusters explícitos;
- sinal vertical separado de variação de comprimento da linha.

Novas fixtures necessárias antes de qualquer código:

1. mesma borda esquerda com larguras de linha extremamente diferentes;
2. duas colunas com linhas longas e curtas misturadas;
3. corpo largo com callout estreito lateral;
4. lista multinível com larguras variáveis;
5. heading multilinha centralizado e comprimentos distintos;
6. colunas aparentes criadas apenas por centros deslocados;
7. páginas com dimensões e escalas tipográficas distintas;
8. controles sintéticos equivalentes às quatro famílias de regressão, sem conteúdo real;
9. ablação adversarial de cada novo sinal, exigindo zero falso GEOMETRY.

## Validação e resultado

- suíte congelada: 61/61 PASS;
- `git diff --check`: PASS;
- hashes de arbiter e fixtures inalterados;
- código, testes e fixtures sem diff;
- privacidade: PASS; apenas métricas agregadas e `doc_id` foram versionados.

**STRUCTURAL SIGNAL DIAGNOSIS = CONCLUSIVE**
