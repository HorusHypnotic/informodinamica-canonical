# Textual-Safe Route V1

**Status:** ACTIVE — rota 1.0.0 validada exclusivamente em fixtures sintéticas

## Escopo e arquitetura

A rota começa depois da extração e da identificação estrutural. Ela recebe o contrato fechado
`schemas/textual-safe-input-v1.schema.json`, preserva somente relações acompanhadas de evidência
explícita e produz `Safe Document Representation V1`. O JSON seguro é o derivado autoritativo;
Markdown continua sendo apenas uma view determinística.

```text
SAFE TEXTUAL INPUT
  -> schema e invariantes de evidência
  -> transformação conservadora ou abstention
  -> SAFE DOCUMENT REPRESENTATION V1
  -> DOCUMENT PROVENANCE V1
  -> validação
  -> Markdown opcional
```

## Contrato de entrada mínimo

A identidade da fonte contém `doc_id`, SHA-256 completo e metadata mínima exigida pelo Provenance
V1. A ordem é `PROVEN` com evidência ou `UNCERTAIN`. Cada bloco registra página, tipo declarado,
texto, estados de conteúdo e estrutura, relações estruturais aplicáveis, referências a assets,
evidências e notas. Assets têm identidade por hash, papel, essencialidade e disponibilidade.

O contrato deliberadamente não contém geometria de PDF, heurísticas de reading order, OCR,
classificação de rota ou semântica inferida. `PLAIN_TEXT` é mapeado somente para `PARAGRAPH` com
estrutura `NOT_APPLICABLE`; marcas presentes no texto não o promovem a heading, tabela ou lista.

## Regras conservadoras

- `PRESERVED` exige evidência explícita.
- Heading preservado exige nível; tabela preservada exige células; checklist preservado exige estado
  comprovado; formulário preservado exige relações comprovadas; nesting de lista não pode começar
  abaixo do nível 1 nem saltar níveis.
- Ordem comprovada exige evidência. Ordem incerta mantém a sequência recebida e gera
  `ORDER_UNCERTAIN`; a rota não reordena.
- Conteúdo parcial exige perda conhecida. Estrutura incerta ou irrecuperável exige justificativa.
- Asset essencial ausente e identidade contraditória invalidam a entrada.
- Entrada sem bloco produz `ABSTAINED`, perda explícita, evento de provenance sem derivado e
  validação `NOT_VALIDATED`.
- Derivado com validação `FAIL` é preservado como evidência; não é promovido a resultado aprovado.

## Provenance e consumo

`TEXTUAL_SAFE_TRANSFORMATION` produz um evento determinístico para parâmetros e timestamp fixados.
O JSON canônico da representação fornece SHA-256, tamanho e `derivative_id`; o manifesto liga o
derivado ao evento e à fonte. `PASS`, `PASS_WITH_WARNINGS` e `FAIL` continuam estados distintos.

O renderer existente só aceita uma Safe Representation válida e expõe incertezas, perdas, páginas
e referências a assets. Ele não é fonte autoritativa e não reconstrói relações ausentes.

## Validação sintética e limites

As fixtures enumeram 20 cenários: parágrafos, headings, listas, tabela, checklist, formulário,
conteúdo parcial/incerto/indisponível, asset essencial, documento misto, abstention, entrada inválida,
três estados de validação e cadeia completa de provenance. Testes adversariais verificam ausência de
nível/células/estado/evidência/perda, nesting contraditório, asset ausente, identidade contraditória e
tentativa de inferência a partir de texto plano.

Não foram processados PDFs ou corpus real. Não foram alterados DIRECT_MD, Reading Order, Structural
Router, StructureClassifier ou renderer Markdown. A rota não resolve extração, escolha automática de
rota, storage de assets, OCR, interpretação visual ou processamento em massa.
