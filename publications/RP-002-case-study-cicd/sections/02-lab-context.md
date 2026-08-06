# 2. Contexto do Laboratório (EXP-001)

O laboratório EXP-001 implementa um sistema de referência composto por uma API REST em FastAPI e um pipeline de CI/CD configurado no GitHub Actions. A arquitetura incorpora três níveis de calibração inspirados na Teoria da Persistência da Coordenação (TPC):
- **N1 (Coerência Sintática):** Linters, compiladores e testes unitários com cobertura mínima de 90%.
- **N2 (Acoplamento Semântico):** Testes de contrato, testes de integração em container e verificações smoke pós-deploy.
- **N3 (Meta-Acoplamento):** Alertas automáticos de queda de cobertura e validade temporal de contratos de API.

Antes de qualquer injeção de falha, o sistema foi avaliado em seu estado canônico, completando o ciclo baseline em 106 segundos.
