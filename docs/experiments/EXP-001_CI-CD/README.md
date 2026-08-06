# EXP-001 — Dinâmica de Desacoplamento em Sistemas de Integração Contínua

**Domínio:** Engenharia de Software (CI/CD)  
**Status:** Protocolo definido / Aguardando execução  

## Justificativa

O CI/CD foi escolhido como primeiro caso experimental por ser:
- **Observável** — todos os eventos geram logs e timestamps.
- **Reproduzível** — o experimento pode ser repetido inúmeras vezes com baixo custo.
- **Seguro** — falhas controladas não causam danos físicos ou éticos.

## Hipótese Central

> Sistemas coordenativos podem manter elevada coerência interna aparente (builds verdes) enquanto perdem progressivamente o acoplamento com o fenômeno real que representam (requisitos de usuário, estabilidade em produção). A capacidade de detectar e corrigir esse desacoplamento depende da independência, observabilidade e revisão contínua dos canais de realimentação.

## Protocolo

Consulte o arquivo [`protocol.md`](./protocol.md) para detalhes dos 7 experimentos de degradação controlada, definição das latências e critérios de validação.

## Resultados

*(A ser preenchido após execução)*
