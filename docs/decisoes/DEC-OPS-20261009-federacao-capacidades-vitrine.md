# DEC-OPS-20261009: Federação de capacidades por remanufatura
Data: 2026-10-09. Status: DECISÃO OPERACIONAL APROVADA PELO USUÁRIO; não altera a teoria TPC, os IDs ou a Constituição. Escopo: Control Tower / Canteiro de Obras Digital / Vitrine Digital / PÉTECO.

## Decisão
1. GitHub é centro de coordenação, versionamento, proveniência, fila de trabalho e evidência do ecossistema.
2. Canteiro de Obras Digital permanece empresa principal. Vitrine Digital é o produto/camada de integração territorial e captura de valor, não sinônimo da empresa.
3. Cada repositório elegível pode fornecer capacidades reutilizáveis à Vitrine e a outros consumidores mediante contrato explícito, preservando autonomia, origem, autoria, isolamento e reversibilidade.
4. PÉTECO continua executor compartilhado do Command Bus, atualmente ancorado na Vitrine. Não desconectar um projeto para atender outro; não adicionar targets ou comandos genéricos por conveniência.
5. Remanufatura: inventariar -> classificar -> reutilizar -> adaptar -> criar somente se ausente -> testar -> evidenciar -> integrar -> medir -> canonizar a versão aceita.
6. Crescimento potencial por composição não é prova de crescimento exponencial: medir capacidades únicas reutilizadas, integrações aceitas, retrabalho, horas líquidas poupadas e resultados comerciais.

## Contrato mínimo de capacidade
capability_id, repo_origem, commit_sha, owner, descrição, inputs, outputs, dependências, política de dados/tenant, permissões, side effects, critérios de aceite, testes, rollback, consumidores, status START/CANDIDATE/PASS/BLOCKED, evidências e métricas de valor.

## Critérios de integração
Preferir módulo puro ou adaptador fino. Nunca importar segredos, banco de outra conta, interface acoplada ou acesso privilegiado. Usar branch/PR e SHA fixo. QA no preview da main antes de publicação; aprovação humana para riscos irreversíveis. Não confundir build PASS com QA PASS. Proibir duplicação de capacidade sem inventário e análise de compatibilidade.

## Caso piloto
Direcione SOS/RSM: motor de estados de locação como CANDIDATE, commit de origem 3f694c222e40f536218616f59e65a71a2f475d3a, módulo src/lib/sos-rental-projection.ts. Vitrine: src/lib/whatsapp.ts já existente. PÉTECO: scripts/peteco-worker-v2.sh, Command Bus issue #338, capability vitrine-test-build. Documento de convergência Vitrine: docs/research/VITRINE-CAPABILITY-CONVERGENCE-2026-10-09.md, commit 18248b50927153d9da41d2431b30f8c1b9a2862f.

## Governança e limites
Esta decisão operacional tem autorização explícita do usuário. Este registro em branch é candidato à incorporação no índice canônico, sujeito ao Context Gate e revisão de compatibilidade com CONSTITUICAO.md/AGENTS.md; não declara alteração do núcleo teórico como CANONICAL. AGENT_MEMORY != CANONICAL_RECORD. Nunca inventar PASS ou FTE.

## Próxima execução
Inventariar repositórios e suas capacidades, identificar sobreposição e consumidores Vitrine; selecionar um fluxo de locações, adaptar com testes, entregar ao PÉTECO via target Vitrine somente após SHA imutável; medir valor comercial e utilização de executores.