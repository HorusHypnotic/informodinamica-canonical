# Revisão pré-commit — Context Gate V1 — 2026-08-13

## Escopo revisado

Ponte curta em `AGENTS.md`, índice JSON por projeto, checkpoints estruturados, contrato de missão,
CLI Python padrão, testes, documentação e CI direcionada.

## Coerência e autoridade

- A Constituição permanece autoridade máxima para evolução canônica.
- O gate referencia as fontes existentes e não redefine conceitos, IDs ou estados epistemológicos.
- Estado Git verificável é usado apenas para fatos operacionais.
- Conflitos são expostos como `WARN` ou `BLOCKED`, nunca resolvidos silenciosamente.

## Duplicidade e impacto

O preflight experimental existente foi preservado porque governa um fixture congelado específico.
O novo gate é geral e reutiliza seu princípio de barreira, sem modificar o experimento. Nenhum
produto OPERA, schema, aplicação, teoria, glossário, lei, hipótese ou métrica foi alterado.

## Riscos e pendências

- O índice é curado manualmente; decisões não commitadas continuam invisíveis.
- O gate não consulta Lovable, banco ou APIs externas.
- A árvore contém arquivos não rastreados preexistentes do owner; eles não pertencem a esta entrega
  e não serão adicionados ao commit.
- Promoção para `main` depende de revisão canônica posterior.

## Resultado

Revisão favorável para commit na branch `feat/context-gate-v1`, condicionada à passagem dos testes,
dogfooding, validação JSON e `git diff --check`.

## Revisão adversarial pós-commit

Foram corrigidos riscos de falso resultado sem ampliar a arquitetura: branch permanente do projeto
ajustada para `main`, validação normalizada do remoto contra o projeto, indisponibilidade do commit
de checkpoint promovida de `WARN` para `BLOCKED`, confronto da metadata JSON do checkpoint com o
índice e escopo explícito (`repo` ou `index`) para cada regra. Branch divergente permanece `WARN`
com exit code zero, portanto o CI de pull request não bloqueia por detached HEAD; repositório,
checkpoint ou regra inválida retorna `BLOCKED` com exit code dois.
