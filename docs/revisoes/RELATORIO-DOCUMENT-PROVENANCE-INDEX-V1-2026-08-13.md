# Relatório — Document Provenance Index V1 — 2026-08-13

## Context Gate e decisão

O Context Gate inicial retornou `WARN` somente pela working tree preexistente. Nenhum conflito
material foi encontrado. Foi escolhido SQLite local porque oferece relações, foreign keys e consultas
determinísticas com Python stdlib. Manifests V1 permanecem fonte; o índice é projeção reconstruível.

## Implementação

O comando implementa descoberta recursiva ordenada, validação V1, build/rebuild atômico, projeção de
sources/events/derivatives/validation, findings, digest lógico, verificação e oito consultas. O
verificador distingue `PASS`, `WARN` e `BLOCKED`; não corrige manifests.

Consultas cobrem `doc_id → identidades`, `SHA-256 → source`, source → eventos/derivados,
`derivative_id → source/evento`, validação, abstentions e findings. Orfandade, colisões de `doc_id`,
identidades repetidas contraditórias, manifests inválidos, integridade SQLite, foreign keys e drift de
digest são detectados.

## Fixtures e demonstração

Fixtures exclusivamente sintéticas declaram e exercitam 11 cenários: cadeia válida, múltiplos eventos
por original, derivado válido, derivado FAIL preservado, abstention, NOT_VALIDATED, evento e derivado
órfãos, identidade contraditória, schema inválido e delete/rebuild.

Após apagar somente o SQLite, o rebuild produziu o mesmo digest e snapshot lógico. Vinte rebuilds
adicionais produziram um único digest. Consultas repetidas retornaram a mesma ordem e conteúdo.

## Resultados

- testes do índice: 8/8 PASS;
- testes do contrato V1 preservados: 14/14 PASS;
- suíte total: 95/95 PASS;
- determinismo de rebuild: 20/20 PASS;
- delete + rebuild: mesma genealogia lógica;
- sintaxe Python/JSON e `git diff --check`: PASS;
- nenhum PDF, manifest real, path privado ou conteúdo documental usado.

## Limitações

O índice não contém localização física de originais, não verifica bytes automaticamente, não é fonte
canônica e não executa periodicamente sozinho. `WARN` agrega estados válidos que merecem atenção; uma
evolução futura pode oferecer filtros por código sem mudar a semântica de integridade.

## Resultado

**DOCUMENT PROVENANCE INDEX V1 = GREEN**

Foi demonstrada a sequência `manifest → validação → indexação → consulta → genealogia → integridade →
destruição do índice → rebuild → mesma genealogia lógica`, somente com fixtures sintéticas.
