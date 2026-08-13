# Relatório sanitizado — Reading Order Arbiter V0.5 — 2026-08-13

## Context Gate e escopo

O Context Gate retornou `WARN` somente pela working tree preexistente do owner. A calibração usou
exclusivamente fixtures sintéticas. Nenhum PDF ou `doc_id` real foi resolvido, aberto ou processado.
Não houve acesso a `G:`, expansão de corpus, OCR, MD_WITH_ASSETS ou API/LLM.

Versão anterior: `0.4.0`. Versão final: `0.5.0`.

## Changelog e arquitetura

- preservado `TextBlock → ReadingOrderEngine → OrderedBlock → StructureClassifier`;
- `source_order` continua baseline e saída de `ORDER_UNCERTAIN`;
- overlap acima do limite agora produz incerteza mesmo quando as hipóteses coincidem;
- custo de reordenação é exposto como razão de posições divergentes;
- confiança geométrica é a fração de sete gates objetivos satisfeitos;
- seleção geométrica requer conflito e aprovação dos sete gates;
- Structural Router, StructureClassifier e Markdown Renderer não foram alterados.

## Métricas e thresholds

| Parâmetro | Valor | Justificativa |
|---|---:|---|
| coordinate tolerance | 2 pt | absorve ruído de baseline sem ocultar salto de linha |
| column gap mínimo | 80 pt | distingue colunas de indentação comum |
| column gap / largura | 1,5× | separação deve superar a largura típica do bloco |
| blocos mínimos/coluna | 2 | outlier lateral isolado não forma coluna |
| overlap máximo | 0,10 | sobreposição material invalida sequência geométrica |
| ganho mínimo | 0,50 | rejeita melhoria marginal |
| violações geométricas máximas | 0 | hipótese substituta deve ser internamente coerente |
| violações verticais source | 0,50 | exige conflito vertical material |
| salto anômalo | 1,25× | diferencia retorno forte de oscilação local |
| span de indentação | 24 pt | protege listas e elementos laterais |

Os sete gates de confiança possuem peso igual e são: transformação axis-aligned, geometria
disponível, estabilidade, overlap aceitável, progressão geométrica sem violação, ganho mínimo e sinal
estrutural forte de coluna ou inversão vertical. USE exige confiança 1,0; não há score compensatório.

## Ground truth sintético

| Fixture | Cenário | Ground truth | Sinais determinantes |
|---|---|---|---|
| A | source correto | KEEP | uma coluna, monotônico, conflito zero |
| B | source claramente errado | GEOMETRY | inversão e salto anômalo alinhados |
| C | duas colunas reais | GEOMETRY | dois clusters e alternância incoerente |
| D | colunas aparentes, source linear | KEEP | source coincide com hipótese conservadora |
| E | rotação | UNCERTAIN | transformação não axis-aligned |
| F | scale + translation | KEEP | transformação coerente e conflito zero |
| G | matriz adversarial | UNCERTAIN | shear e risco de falso rearranjo |
| H | sobreposição | UNCERTAIN | sequência espacial insuficiente |
| I | heading multilinha | KEEP | continuidade vertical; sem classificação semântica |
| J | lista multinível | KEEP | indentação contínua e source monotônico |
| K | callout lateral | UNCERTAIN | outlier único não sustenta coluna |
| L | header/footer extremos | KEEP | source já preserva progressão principal |
| M | genuinamente ambíguo | UNCERTAIN | oscilação local e ganho insuficiente |

Cada fixture versiona ordem esperada, decisão, justificativa e sinais em
`tests/fixtures/reading_order_arbiter_v05.json`.

## Matriz de confusão

| Ground truth \ Predito | KEEP | GEOMETRY | UNCERTAIN |
|---|---:|---:|---:|
| KEEP | 6 | 0 | 0 |
| GEOMETRY | 0 | 2 | 0 |
| UNCERTAIN | 0 | 0 | 5 |

- falsos `USE_GEOMETRY_ORDER`: 0;
- falsos `KEEP_SOURCE_ORDER`: 0;
- excesso de `ORDER_UNCERTAIN`: 0;
- casos claramente geométricos reconhecidos: 2/2;
- casos ambíguos mantidos incertos: 5/5.

## Testes, determinismo e privacidade

- suíte anterior preservada: 54/54;
- suíte adversarial adicionada: 7 testes agregados sobre 13 fixtures;
- suíte total: 61/61 PASS;
- cinco repetições por fixture: 65/65 resultados idênticos;
- decisões, ordem final, thresholds, métricas, transformação e warnings permanecem cobertos;
- somente conteúdo sintético está presente nos fixtures e no relatório.

## Avaliação

**READING ORDER ARBITER V0.5 = GREEN**

Próxima missão recomendada: revalidar, sem recalibrar, exatamente os sete PDFs congelados como teste
fora da amostra e comparar V0.5 com o baseline V0.4. Não expandir o corpus antes dessa decisão.
