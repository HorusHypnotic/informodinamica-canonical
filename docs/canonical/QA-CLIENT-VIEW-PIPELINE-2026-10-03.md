# QA CLIENT VIEW PIPELINE — 2026-10-03

## Objetivo
Tirar da memória humana o QA da visão de cliente por empresa.

## Identidade
QA Actor canônico: `qa@vitrinedigital.com`.
Senha nunca entra em GitHub, chat, issue ou log. Segredo fica no PÉTECO em `$HOME/.tower/peteco/qa-client-view.env`, modo 600.

## Pipeline
1. baseline: main/SHA, banco e tenant;
2. mudança em branch;
3. PÉTECO `vitrine-test-build` no SHA exato;
4. só PASS permite promoção;
5. aplicar/verificar migration quando necessária;
6. PR ready + merge com expected head SHA;
7. confirmar Lovable `latest_commit_sha == merge SHA`;
8. publicar sem Lovable AI/créditos;
9. criar/confirmar QA Actor Auth pelo fluxo suportado;
10. platform admin atribui exatamente um tenant ao QA Actor;
11. QA Actor abre `/minha-loja` em contexto `QA_CLIENT_VIEW`;
12. validar mobile/responsividade e leitura;
13. validar negativamente que mutações reais são negadas;
14. preservar evidência e só então marcar E2E PASS.

## Autoridade
QA assignment NÃO concede platform-admin, owner_user_id ou membership OWNER/MANAGER. O contexto QA é read-only. `can_manage_curated_business()` e `can_operate_curated_rental_business()` continuam sendo as autoridades de escrita e não consultam a atribuição QA.

## Gates humanos
Somente: criação/entrada de segredo quando uma credencial nova for necessária; autorização de custo se surgir; ação externa irreversível não previamente autorizada. O restante deve seguir Pau na máquina/no-handback.

## Estado inicial
Vitrine PR #385: PÉTECO PASS, DB aplicado/verificado, merge SHA `1e6c0573b77a29df73817be15ea163688a76905c`, Lovable sincronizado e deploy solicitado. QA Auth e E2E ainda precisam de prova.
