# Revisão pré-commit — Document Provenance Index V1 — 2026-08-13

## Escopo

Índice SQLite reconstruível, fixtures sintéticas, testes e documentação. Nenhum componente de
transformação, classificação, routing, produto, interface ou busca foi alterado.

## Governança e coerência

- compatível com o contrato V1 e o checkpoint de remanufatura;
- mantém manifests e arquivos como fonte, nunca SQLite isolado;
- não altera conceitos, IDs, Constituição, Glossário, TPC ou protocolos;
- PRT-002 não se aplica;
- não duplica o validador: importa e aplica `validate_manifest`.

Não foram encontradas redefinições, duplicidades ou referências canônicas órfãs. Findings de fixtures
inválidas são evidência de teste e não estados do corpus real.

## Segurança e privacidade

- nenhum PDF ou manifest real foi aberto;
- nenhum acesso a `G:`, transformação, OCR, MD_WITH_ASSETS, LLM/API ou reorganização ocorreu;
- fixtures, hashes, IDs, operações e paths são sintéticos;
- outputs SQLite de execução são temporários ou `.local/` e não entram no Git;
- arquivos preexistentes do owner permanecem fora do commit.

## Verificações

- índice e contrato testados isoladamente e na suíte total;
- delete/rebuild e 20 repetições determinísticas: PASS;
- PASS/WARN/BLOCKED e casos inválidos: PASS;
- Context Gate inicial: `WARN` somente pela árvore preexistente;
- JSON, Python, privacidade e `git diff --check`: PASS;
- revisão staged deve conter apenas artefatos desta missão.

## Risco residual

O índice valida declarações e relações dos manifests. Verificação dos bytes declarados exige acesso
explícito aos arquivos e permanece fora desta missão. Nenhum watcher ou processo residente foi
criado.
