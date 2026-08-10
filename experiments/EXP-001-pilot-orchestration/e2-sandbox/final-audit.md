# Auditoria final E2

| Controle | Resultado | Fundamentação |
|---|---|---|
| E2-1 — impede repositório | PASS na camada Docker / FAIL para receptor | repo não montado, mas receptor gerenciado não roda no container |
| E2-2 — traversal bloqueado | PASS na camada Docker | IT-004 não encontrou sentinel externo |
| E2-3 — absoluto bloqueado | PASS na camada Docker | IT-005 não encontrou sentinel externo |
| E2-4 — persistência bloqueada | PASS na camada Docker | IT-007 confirmou `SESSION_B_CLEAN` |
| E2-5 — tool calls observáveis | FAIL para receptor | Docker registra comandos do operador, não controla chamadas do receptor gerenciado |
| E2-6 — aquisição detectável | FAIL para receptor | não há proxy exclusivo entre receptor e ferramentas hospedeiras |
| E2-7 — rede controlada | PASS na camada Docker / não herdada | IT-009 falhou com `network=none` |
| E2-8 — ambiente recriável | PASS na camada Docker | imagem pinada e flags registradas |
| E2-9 — fixture intacto | PASS | nenhum diff no fixture frozen; executions=0 |

## Decisão

**E2-F0 — FALHA**

O sandbox é tecnicamente válido para processos containerizados, mas não materializa o isolamento do receptor experimental disponível. A emenda não será congelada, nenhum commit será criado e RUN-001R1 não será preparado.
