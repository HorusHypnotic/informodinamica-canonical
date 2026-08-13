# Revisão pré-commit — Reading Order Arbiter V0.4 — 2026-08-13

## Escopo e autoridade

- Context Gate executado; `WARN` somente pela árvore suja preexistente.
- Constituição, Documento Canônico, Glossário e TPC não foram redefinidos.
- Structural Router 0.2.0 e `StructureClassifier` não foram alterados.
- PRT-002 não é exigido: mecanismo experimental local, sem fonte externa ou promoção epistemológica.

## Revisão das alterações

- `ReadingOrderEngine` passou de reordenador automático para árbitro versionado.
- Decisão, métricas, parâmetros, ordens concorrentes e contagens são persistidos no manifesto local.
- Incerteza preserva a fonte e nunca seleciona geometria silenciosamente.
- Não existem condições por semântica, `doc_id`, filename ou path.
- Fixtures e suíte completa passaram; determinismo foi confirmado em 7/7.

## Integridade, privacidade e riscos

Não foram encontrados conceitos canônicos, IDs, relações ou referências órfãs introduzidos. Nenhum
conteúdo documental, path real ou PDF entrou no diff. Os arquivos não rastreados do owner foram
preservados e devem permanecer fora do commit.

116/116 páginas reais ficaram `ORDER_UNCERTAIN`; isso é seguro, mas indica baixa capacidade de
seleção geométrica no corpus atual. Os três golden failures permanecem estruturalmente não
resolvidos. A versão é YELLOW e não autoriza expansão.
