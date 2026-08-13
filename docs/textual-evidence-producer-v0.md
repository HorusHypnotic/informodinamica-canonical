# Textual Evidence Producer V0

**Status:** EXPERIMENTAL — 0.1.0 GREEN somente em fontes sintéticas/controladas

## Arquitetura

O produtor ocupa a fronteira anterior ao Textual-Safe Input V1. Ele não interpreta documentos nem
opera sobre PDFs: recebe unidades textuais controladas com um contexto de sintaxe declarado, registra
observações, avalia evidência por regras versionadas e só então monta o input da rota segura.

```text
CONTROLLED SOURCE -> OBSERVATION -> EVIDENCE LEDGER -> TEXTUAL-SAFE INPUT V1
                  -> TEXTUAL-SAFE ROUTE V1 -> SAFE REPRESENTATION -> PROVENANCE
```

Observação é o sinal efetivamente recebido. Evidência é o resultado auditável da aplicação de uma
regra a essa observação. Interpretação estrutural só ocorre quando a evidência é `SUFFICIENT`.
Representação continua sendo responsabilidade da rota P1.1.

## Modelo de evidência e decisão de schema

Foi criado `schemas/textual-evidence-v0.schema.json`. Um schema próprio é necessário porque o ledger
é evidência auditável anterior ao Textual-Safe Input, não metadata de representação. Cada observação
tem ID determinístico, unidade, tipo de sinal e valor observado. Cada evidência liga-se à observação e
registra regra/versionamento, status `SUFFICIENT`, `INSUFFICIENT`, `CONFLICTING` ou `ABSENT`, sinais
favoráveis, conflitos, incerteza e abstention.

IDs `OBS-*` e `EVD-*` derivam do JSON canônico de seus registros. Evidências suficientes entram no
campo `evidence` do bloco seguro. O produtor não usa confidence numérica: no V0, uma probabilidade
sem calibração acrescentaria falsa precisão; status categórico e motivos explícitos são suficientes.

## Regras V0

- `PLAIN` nunca promove estrutura, mesmo diante de caixa alta, números, hífens, espaços, labels,
  checkboxes literais, linhas curtas, índices aparentes ou pipes.
- `EXPLICIT_MARKUP` exige concordância entre contexto declarado, marcador observável e metadata
  necessária: `#` e nível para heading; marcador e items para lista; delimitador e células para
  tabela; checkbox e estado para checklist.
- `STRUCTURED_METADATA` aceita apenas sinais explicitamente fornecidos pela fixture controlada; a
  Textual-Safe Route ainda valida níveis, células, nesting, estados, relações e assets.
- Conflitos nunca são promovidos: o texto vira parágrafo com estrutura `UNCERTAIN` e warning.
- Ordem sem evidência é degradada para `UNCERTAIN`; a sequência é mantida.
- Ausência total de conteúdo produz input vazio, representação `ABSTAINED` e provenance sem derivado.

## Resultados sintéticos

A matriz contém 20 cenários obrigatórios e 10 ataques de falso positivo. Casos explícitos suportados
são reconhecidos; casos ambíguos permanecem texto sem estrutura ou incerteza. O dogfood integrado
produz ledger, Textual-Safe Input, Safe Representation, Provenance e Markdown determinísticos.

## Limites

O V0 não descobre contexto de sintaxe, não extrai PDF, não usa geometria, não reconhece Markdown
arbitrário, não interpreta semântica, não verifica bytes de asset e não escolhe rota automaticamente.
Seu GREEN não autoriza corpus real ou processamento em massa e não altera o estado RED/FROZEN de
DIRECT_MD.
