# Revisão pré-commit — Safe Document Representation V1 — 2026-08-13

## Escopo e coerência

Schema, validador/renderer demonstrativo, fixtures sintéticas, testes e documentação. Nenhuma rota
produtiva foi implementada. O contrato é compatível com original read-only, abstention, Provenance V1
e índice reconstruível. DIRECT_MD, ReadingOrderEngine, Structural Router e StructureClassifier não
foram alterados.

Não há redefinição de Constituição, Documento Canônico, Glossário, TPC, IDs ou protocolos; PRT-002
não se aplica. Não há duplicidade: o novo schema descreve o derivado, enquanto Provenance V1 descreve
sua genealogia.

## Privacidade e limites

- fixtures, conteúdo, hashes, IDs e assets são sintéticos;
- nenhum PDF, manifest real, filename/path privado ou texto do corpus entrou no Git;
- nenhum acesso a G:, OCR, API/LLM, conversão, storage, interface ou reorganização;
- renderer é demonstração e não reabre DIRECT_MD;
- arquivos preexistentes do owner permanecem fora do commit.

## Verificações e risco

Os 6 testes e 15 cenários passaram, assim como schema/JSON/Python, integração Provenance V1 e a suíte
total 101/101. Context Gate, privacidade e git diff --check passaram; staged scope será conferido
antes do commit.

O contrato prova consistência das declarações, não fidelidade de extração futura. Cada rota deverá
provar PRESERVED; sem evidência, deve usar UNCERTAIN, UNRECOVERABLE, PARTIAL ou ABSTAINED.
