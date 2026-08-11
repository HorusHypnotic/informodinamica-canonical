# Checkpoint OPERA — 11 de agosto de 2026

**Status:** ACTIVE — checkpoint documental

## Estado consolidado

| Produto | Gate atual | Experimento seguinte |
|---|---|---|
| OPERA Vision | VALIDADO COM RESSALVA; V0.2.1 tecnicamente pronta | validação visual curta, sem V0.3 |
| Smart Cotações | GREEN | Compra Real #001 preparada, não iniciada |
| Obra Flow | PASS COM RESSALVA local-first | Operação Real #001 preparada, não iniciada |
| Copiloto | RED | corrigir fechamento/integridade e repetir preflight |
| Control | OPERACIONAL isoladamente | sem integração automática |
| Atlas | OPERACIONAL isoladamente | preservar fechamento próprio |
| Cofre | CONCEITUAL/LOCAL | provar custódia curada |

## Fronteira arquitetural

Copiloto, Control, Atlas, Vision e Cofre são capacidades com responsabilidades próprias. A relação entre elas é uma topologia possível e condicionada, não a sequência obrigatória `Copiloto → Control → Atlas → Cofre`. Qualquer troca futura deve obedecer ao contrato mínimo de interoperabilidade V0 e preservar identidade, proveniência e semântica temporal.

## Decisões preservadas

1. Pedidos COD e Obra Flow são produtos distintos.
2. Smart Cotações é o campeão da frente comercial/compra.
3. Copiloto é o próximo campeão do core, mas seu primeiro preflight terminou RED.
4. Produtos provam ciclos mínimos isolados antes de integração.
5. Git é a fonte de verdade do código; Lovable executa/publica e Google Drive não é fonte canônica.

## Condição de continuidade

- Não iniciar Compra Real #001 nem Operação Real #001 sem missão explícita.
- Não preparar Quinzena Real #001 enquanto o Copiloto estiver RED.
- Não iniciar integração entre produtos.
- Preservar os estados históricos RED/FAIL nos relatórios mesmo após correções posteriores.

## Revisão documental

Este checkpoint registra aplicações e decisões operacionais; não altera Constituição, Glossário, TPC, axiomas, leis, hipóteses, métricas ou IDs. Não promove o contrato V0 a fundamento teórico e não cria autoridade canônica nova. As fontes e limitações completas estão no diário `docs/diarios/2026-08-11-evolucao-ecossistema-opera.md`.
