# Auditoria de reuso comercial territorial — 2026-10-09

Estado: CANDIDATE / GIT-ONLY. Sem prova fresca de produção, SQL aplicado ou QA mobile.
Escopo: Redenção-PA, Barreirinhas-MA, Palmas-TO, Gurupi-TO. Territórios-alvo, não cobertura comprovada.

## Baseline
- Vitrine HEAD observado: b35d6104b686b219f9ccbf1cbe4d483b7c755057 (busca de commits; não prova runtime).
- Canônico HEAD observado: df36e3e0e1e0522adcbed9ed2c6f7292b85593ef.
- Registry V2: docs/ecosystem/CAPABILITY-REGISTRY-V2.md, 10 capacidades canônicas; CAP-010 candidata.
- Delta pós-V2: docs/ecosystem/CAPABILITY-REGISTRY-POST-V2-DELTA-2026-09-28.md. Ausência no registry não prova ausência no sistema.

## Inventário conservador
| Família | Evidência Git | Estado | Limite |
|---|---|---|---|
| Locações RSM/SOS | src/components/admin-rental-workspace.tsx; PR #457 merge b35d610 | PARCIAL | Código de agenda, ciclos e mensagens; runtime fresco UNKNOWN |
| Máquinas/ativos multiempresa | PR #465 9c4c810; migrations 20261008150000, 151500, 152500 | CANDIDATE | Migrations GIT-ONLY, PROD não comprovada |
| Recursos de obra | docs/product/WORK-RESOURCES-V0.md; src/routes/recursos-obra.tsx | PARCIAL | Não confundir recurso com demanda, compra ou recebimento |
| Agendamento externo | docs/GOOGLE-ACTIONS-BRIDGE-V0.md; src/lib/google-actions.ts | CANDIDATE | NOT APPLIED/NOT DEPLOYED; link Google válido não prova reserva |
| Agenda própria barbearia/estética | buscas appointment/agendamento | UNKNOWN/NOT LOCATED | Não afirmar ausência exaustiva; falta prova de slots, bloqueio e confirmação |
| Turismo | busca tourism sem resultado | UNKNOWN/NOT LOCATED | Ofertas e território reutilizáveis, sem prova de inventário de saídas e reservas |
| Mídia/atribuição | src/lib/attribution.ts; docs/QR-ROUTING-V0.md; docs/ECOSYSTEM-DISTRIBUTION-AND-ATTRIBUTION-V0.md | PARCIAL | Click não equivale a conversão ou postagem publicada |
| Campanhas de causas | src/routes/admin.causas.tsx; social_campaigns | SYSTEM_LOCAL | Não confundir campanhas de doação com calendário editorial comercial |
| Gestão multicanal de mídia | docs/canonical/ABSURDO-POSSIVEL-SOCIAL-FIRST-REMANUFACTURE-V0-2026-10-01.md | CANDIDATE | Publicação/insights automáticos não validados |

## Direção de remanufatura
1. Reutilizar tenant, vitrine, catálogo, ofertas, demanda, atribuição, auditoria e gates.
2. ADAPTAR contrato de disponibilidade, com especializações: SLOT (barbearia), DEPARTURE/CAPACITY (turismo), RENTAL_CYCLE (caçamba), ASSET_EVENT (máquinas). Não colapsar eventos distintos numa tabela sem contrato e testes.
3. Mídia: separar peça editorial, canal, aprovação, publicação comprovada, clique, resposta, negócio e evidência. Nada de inferir conversão de clique.
4. Antes de código: validar schema e ledger no Supabase canônico lyuzmfqfigvcajvetapq; RLS e GRANT mínimo explícito.
5. PÉTECO: job com SHA exato, aguardar START e PASS/FAIL, QA mobile e gate humano antes de qualquer produção.

## Próximos gates
- P0: comparar migrations de ativos/locações no Git com migration ledger PROD (READ-ONLY), classificar GIT_ONLY / OBJECT_PRESENT_UNLEDGERED / APPLIED_VERIFIED / DRIFT.
- P1: testes independentes de autorização tenant, transições, colisão de agenda, lotação, idempotência e evidência de publicação.
- P2: prova de um fluxo real por vertical antes de pacote comercial 'operacional'.

Esta nota é inventário CANDIDATE, não altera Registry V2 e não cria CAP IDs.
