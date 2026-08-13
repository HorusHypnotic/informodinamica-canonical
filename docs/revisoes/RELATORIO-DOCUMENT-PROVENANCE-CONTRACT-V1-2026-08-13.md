# Relatório — Document Provenance Contract V1 — 2026-08-13

## Context Gate e escopo

O Context Gate inicial retornou `WARN` somente pela working tree preexistente do owner. Não foi
encontrado conflito material com Constituição, Documento Canônico, Glossário, checkpoint vigente ou
baseline da remanufatura. Nenhum PDF real foi aberto, processado, movido ou alterado.

## Contratos encontrados e decisão

O pipeline já possuía peças compatíveis, mas não uma genealogia completa:

- deduplicação ancora conteúdo em SHA-256;
- classificação deriva `doc_id` como `DOC-` + oito caracteres do SHA-256 e mantém paths em SQLite
  local;
- o manifest DIRECT_MD registra, em formato plano, `doc_id`, source hash/tamanho, versões, hash do
  Markdown, validação e warnings;
- schemas JSON de experimentos existentes pertencem a outros domínios e não modelam documentos.

Decisão: reutilizar SHA-256, `doc_id` e os campos de manifest existentes; estender sua semântica para
eventos e derivados; criar um JSON Schema novo porque nenhum schema existente cobria a cadeia
`original → evento → derivado → validação`.

## Contrato V1

O manifesto 1.0.0 contém cinco registros ligados:

- `document.doc_id`: identificador operacional compatível;
- `source`: SHA-256 forte, tamanho, formato, descoberta e inventário/versão;
- `processing`: evento determinístico, operação, ferramenta/versão, parâmetros versionados, tempos,
  status e eventual motivo de abstention;
- `derivative`: identidade/hashes próprios e referências ao original e evento;
- `validation`: `PASS`, `PASS_WITH_WARNINGS`, `FAIL` ou `NOT_VALIDATED`, método, warnings e data.

`event_id` e `derivative_id` são derivados deterministicamente de conteúdo canônico. O hash completo,
e não filename ou `doc_id` curto, permanece âncora inequívoca. Um evento `ABSTAINED` exige motivo
estruturado e não pode produzir derivado. `FAIL` pode preservar um derivado experimental.

## Proteção e armazenamento

O contrato reafirma original `SOURCE / READ-ONLY`, derivados em árvore separada e deduplicação lógica
sem exclusão física. Paths e manifests privados permanecem locais. Schema, regras, fixtures e testes
são versionáveis.

Para armazenamento futuro, CAS por SHA-256 foi preferido conceitualmente como endereço primário;
`doc_id` deve funcionar como índice/alias. Nenhuma árvore foi criada e nenhuma reorganização ocorreu.

## Reconstrução, dogfood e casos inválidos

Fixtures sintéticas representam uma fonte, um derivado Markdown, um manifest completo e uma
abstenção. O CLI validou os bytes e reconstruiu do manifest do derivado:

- identidade operacional e SHA-256 do original;
- operação;
- ferramenta e versão;
- evento referenciado;
- resultado da validação.

O dogfood mapeou os nomes do manifest DIRECT_MD existente para o contrato sem conteúdo ou path real.
Foram testadas rejeições de source ausente/hash ausente, versão desconhecida, `doc_id` contraditório,
evento inexistente, identidade de derivado contraditória, bytes/hash/tamanho incompatíveis, derivado
órfão, abstention com derivado e validação incoerente.

## Validação

- testes específicos: 14/14 PASS;
- suíte total: 87/87 PASS;
- determinismo de ID e JSON canônico: 25/25 repetições PASS;
- bytes das fixtures preservados em LF por regra local e hashes do índice Git conferidos;
- JSON Schema Draft 2020-12: válido;
- sintaxe dos três JSON versionados: PASS;
- reconstrução via CLI e abstention via CLI: PASS;
- `git diff --check`: PASS;
- privacidade: PASS;
- corpus real, OCR, DIRECT_MD, MD_WITH_ASSETS, chunking, embeddings e busca: não executados.

## Resultado

**DOCUMENT PROVENANCE CONTRACT V1 = GREEN**

Dado qualquer derivado conforme V1, o manifest identifica inequivocamente o original por SHA-256,
o evento de transformação, a ferramenta/versão e o resultado de validação. Dados externos ao
manifest são necessários somente para verificar novamente os bytes declarados, não para reconstruir
a genealogia registrada.
