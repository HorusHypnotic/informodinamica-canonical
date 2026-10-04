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
13. executar `vitrine-qa-authz-proof` para prova estrutural;
14. preservar evidência; mutação autenticada real permanece UNKNOWN até execução segura.

## Autoridade
QA assignment NÃO concede platform-admin, owner_user_id ou membership OWNER/MANAGER. O contexto QA é read-only. `can_manage_curated_business()` e `can_operate_curated_rental_business()` continuam sendo as autoridades de escrita e não consultam a atribuição QA.

## Estado comprovado — 2026-10-04
- QA Actor e associação dinâmica de tenant operacionais.
- RSM Serviços e Locações abre em `/minha-loja` no modo QA somente leitura.
- limpeza visual principal PASS: Produtos, editor de capacidades e Salvar não aparecem no modo QA.
- PÉTECO main SHA `0cfb80a816864337e3e2c3933dd735d79aef37aa`.
- job `qa-authz-proof-main-20261004-024`: START → PASS → GC PASS.
- `PETECO_QA_AUTHZ_STRUCTURAL_PASS`.
- fronteira preservada: `live_authenticated_mutation=UNKNOWN secrets_consumed=false`.
- prova estrutural de não concessão de autoridade = PASS; tentativa autenticada real de escrita = UNKNOWN.

## Runtime / transporte
`STAGED ≠ ACTIVE`. `telegram-runtime-install` pode instalar/stagear o worker sem provar que o consumidor foi trocado.
Para atualizar worker, usar `runtime-maintenance` e depois exigir evidência operacional da capability nova.
Antes de continuar, exigir `PETECO_TELEGRAM_SINGLETON_PASS` e `PETECO_TELEGRAM_FRESH_WINDOW_PASS`.
Em 2026-10-04 houve 1 supervisor + 2 longpolls. O instalador existente restaurou singleton e `telegram-singleton-verify-20261004-023` passou.
Logs históricos de 409/502 não invalidam uma janela fresca PASS.

## Gates humanos
Somente: criação/entrada de segredo quando credencial nova for necessária; autorização de custo; ação externa irreversível não previamente autorizada. O restante segue Pau na máquina/no-handback.
