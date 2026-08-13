# Relatório sanitizado — Reading Order Arbiter V0.6 — 2026-08-13

## Context Gate e escopo

O Context Gate retornou `WARN` apenas pela working tree preexistente do owner. A missão usou somente
fixtures sintéticas. Os sete PDFs out-of-sample, seus manifests e outputs não foram abertos ou
reprocessados. Não houve OCR, API/LLM, MD_WITH_ASSETS ou acesso a `G:`.

Versão anterior: `0.5.0`. Versão final: `0.6.0`.

## Desenho width-invariant

O arbiter preserva os seis gates externos e a preferência KEEP → UNCERTAIN → GEOMETRY. O sétimo gate
continua sendo `strong_vertical OR strong_columns`, mas seus sinais horizontais mudam:

```text
strong_vertical :=
    NOT columns_detected
    AND source_vertical_inversions > 0
    AND source_violation_ratio >= 0,50
    AND anomalous_jump_ratio >= 1,25
    AND left_edge_span / page_width <= 0,04

columns_detected :=
    largest_x0_cluster_gap / page_width >= 0,15
    AND region_gap / page_width >= 0,03
    AND left_cluster_size >= 2
    AND right_cluster_size >= 2

strong_columns :=
    columns_detected
    AND source_column_switches > 1
    AND geometry_column_switches == 1
```

`x0` é a borda esquerda do bbox transformado. `region_gap` é a distância entre a borda direita
máxima da região esquerda e a borda esquerda mínima da região direita. Comprimento ou largura
mediana das linhas não participa dos thresholds.

O mesmo particionamento por `x0` alimenta `geometry_order`. Isso é necessidade arquitetural: o gate
não pode validar clusters diferentes daqueles usados pela ordem que seria aplicada. Fórmulas dos
outros seis gates não foram modificadas.

`TextBlock` passa a aceitar `page_width`; quando ausente, o arbiter usa a extensão horizontal
observada como fallback conservador. O conversor não foi alterado nesta missão.

## Comparação V0.5 × V0.6

| Aspecto | V0.5 | V0.6 |
|---|---|---|
| proxy de indentação | span de centros X, 24 pt | span de x0 / page width, 0,04 |
| clusters | centros X | bordas esquerdas x0 |
| escala de coluna | `max(80 pt, 1,5× largura textual)` | gap x0 / page width, 0,15 |
| separação regional | implícita | region gap / page width, 0,03 |
| suporte | 2 blocos por cluster | preservado e explicitamente medido |
| dependência de comprimento | alta | removida do sinal primário |
| telemetria | centro/span e gap absoluto | ratios, suporte, tamanhos e page width |

## Thresholds normalizados

| Parâmetro | Valor | Justificativa sintética |
|---|---:|---|
| `max_left_edge_span_ratio` | 0,04 | admite pequena variação de x0, rejeita indentações/regiões distintas |
| `column_gap_page_ratio` | 0,15 | clusters precisam separar 15% da página |
| `column_region_gap_ratio` | 0,03 | regiões precisam de espaço horizontal positivo material |
| `min_blocks_per_column` | 2 | outlier/callout isolado não forma coluna |

Os thresholds antigos de inversão, severidade e salto foram preservados. Nenhum valor foi derivado
dos sete PDFs reais.

## Fixtures V0.6

Foram adicionadas 12 fixtures com ground truth explícito:

1. mesma borda esquerda, larguras extremas — KEEP;
2. duas colunas reais com larguras variadas — GEOMETRY;
3. corpo largo e callout estreito — UNCERTAIN;
4. lista multinível com larguras variadas — KEEP;
5. heading centralizado conflitante — UNCERTAIN;
6. falsas colunas geradas apenas por centros — KEEP;
7. evidência vertical em escala pequena — GEOMETRY;
8. equivalente em escala 3× — GEOMETRY;
9. colunas em página estreita — GEOMETRY;
10. equivalente em página larga — GEOMETRY;
11. regressão por overlap — UNCERTAIN;
12. regiões aparentes com overlap horizontal — UNCERTAIN.

As 13 fixtures V0.5 foram preservadas integralmente como regressão, totalizando 25 fixtures.

## Matriz de confusão

### Fixtures novas V0.6

| Ground truth \ Predito | KEEP | GEOMETRY | UNCERTAIN |
|---|---:|---:|---:|
| KEEP | 3 | 0 | 0 |
| GEOMETRY | 0 | 5 | 0 |
| UNCERTAIN | 0 | 0 | 4 |

### Regressão V0.5

| Ground truth \ Predito | KEEP | GEOMETRY | UNCERTAIN |
|---|---:|---:|---:|
| KEEP | 6 | 0 | 0 |
| GEOMETRY | 0 | 2 | 0 |
| UNCERTAIN | 0 | 0 | 5 |

Falsos `USE_GEOMETRY_ORDER`: zero. Casos claramente geométricos novos: 5/5. Ambíguos novos: 4/4.

## Ablação

Partindo da fixture clara de duas colunas ou da fixture vertical clara:

| Sinal removido individualmente | Resultado |
|---|---|
| gap de clusters x0 suficiente | deixa de selecionar GEOMETRY |
| separação positiva entre regiões | deixa de selecionar GEOMETRY |
| suporte mínimo por cluster | deixa de selecionar GEOMETRY |
| alinhamento de borda esquerda no ramo vertical | deixa de selecionar GEOMETRY |

Escala de página foi testada por pares geometricamente equivalentes: pequena/grande e
estreita/larga produziram decisões e ordens idênticas.

## Testes, determinismo e segurança

- suíte anterior preservada: 61/61;
- testes V0.6 adicionados: 8;
- suíte total: 69/69 PASS;
- determinismo novo: 10 repetições × 12 fixtures = 120/120;
- determinismo acumulado com V0.5: 185/185;
- `git diff --check`: PASS;
- Structural Router, StructureClassifier, conversor e renderer sem diff;
- privacidade: somente dados sintéticos versionados.

## Avaliação

**READING ORDER ARBITER V0.6 = GREEN**

GREEN limita-se à validação sintética. Próxima missão recomendada: integrar `page_width` na criação
de `TextBlock` sem mudar a lógica do arbiter, congelar o novo hash e só então revalidar exatamente os
sete PDFs out-of-sample, sem recalibração na mesma missão.
