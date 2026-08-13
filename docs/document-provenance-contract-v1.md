# Document Provenance Contract V1

**Status:** ACTIVE — contrato operacional 1.0.0

## Finalidade

O contrato registra a genealogia `original → identidade de conteúdo → evento → derivado →
validação` sem depender de filename, localização atual ou memória conversacional. O schema normativo
é `schemas/document-provenance-v1.schema.json`; o validador de referências cruzadas é
`scripts/document_provenance.py`.

## Identidade e genealogia

- `source_sha256` é a âncora forte da identidade binária original.
- `doc_id` preserva o contrato existente: `DOC-` + oito primeiros caracteres do SHA-256. É um
  identificador operacional conveniente, não substituto do hash completo.
- `event_id` é `EVT-` + 16 caracteres do SHA-256 da serialização JSON canônica dos campos imutáveis
  do evento: fonte, operação, ferramenta/versão, versão/parâmetros e início.
- `derivative_sha256` ancora o conteúdo derivado; `derivative_id` é `DER-` + seus 16 primeiros
  caracteres.

O manifesto liga o derivado ao `processing_event_id`, e o evento ao `doc_id` e `source_sha256`.
Assim, a navegação é inequívoca nos dois sentidos quando os manifests são indexados:
`derivado → evento → original` e `original → eventos → derivados`.

## Registros mínimos

`source` contém hash, tamanho, formato, descoberta e identidade/versão do inventário. Localizações
físicas ficam em índices locais. `processing` contém operação, ferramenta, versões, parâmetros,
tempos e estado. `derivative` contém identidade própria e todas as referências genealógicas.
`validation` admite `PASS`, `PASS_WITH_WARNINGS`, `FAIL` e `NOT_VALIDATED`.

`FAILED` preserva qualquer derivado experimental registrado e nunca altera o original. Um evento
`ABSTAINED` exige motivo estruturado, não pode conter derivado e permanece `NOT_VALIDATED`; isso cria
evidência da decisão sem fabricar representação.

## Invariantes e rejeições

O schema fecha propriedades desconhecidas no núcleo V1 e o validador rejeita:

- derivado sem fonte ou sem evento existente;
- source hash ausente ou incompatível com bytes fornecidos;
- schema version desconhecida;
- `doc_id`, `event_id` ou `derivative_id` contraditórios;
- hash/tamanho incompatível do derivado;
- referências cruzadas divergentes;
- conclusão anterior ao início;
- `PASS_WITH_WARNINGS` sem warning ou `PASS` com warning;
- abstention com derivado ou sem motivo estruturado.

Extensões incompatíveis exigem nova versão do schema; metadata específica de uma operação deve ficar
em `processing.parameters`, identificada por `parameters_version`.

## Imutabilidade e separação

O original é `SOURCE / READ-ONLY`. Ferramentas não podem sobrescrever, renomear, mover, excluir,
alterar deliberadamente metadata ou substituir original por derivado. Derivados nascem em árvore
separada. Deduplicação lógica não autoriza exclusão física.

São versionáveis: schema, contrato, código do validador, fixtures sintéticas e testes. Permanecem
locais: paths reais, documentos, derivados reais, SQLite, logs com paths e manifests que contenham
informação privada.

## Organização futura dos derivados

Content-addressable storage por hash oferece deduplicação natural, verificação direta e identidade
independente de nome. Organização primária por `doc_id` é mais legível, mas o prefixo curto pode
colidir e mistura identidade conveniente com armazenamento. A decisão conceitual é preferir CAS por
SHA-256 como endereço primário futuro e manter `doc_id` como índice/alias. A árvore física e a política
de colisões não são implementadas nesta missão.

## Compatibilidade e dogfood

O contrato estende os campos já usados por classificação e DIRECT_MD (`doc_id`, `source_sha256`,
`source_size_bytes`, versão de ferramenta, hash do Markdown, validação e warnings). Um manifest local
existente pode ser adaptado para V1 sem copiar texto ou path: seus campos são mapeados para `source`,
`processing`, `derivative` e `validation`. As fixtures demonstram esse formato com bytes fictícios;
nenhum artefato real foi incorporado.
