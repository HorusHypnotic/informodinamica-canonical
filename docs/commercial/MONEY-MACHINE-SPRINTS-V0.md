# Money Machine Sprints V0

**Status:** MM-00 e MM-01 concluídas; MM-02 não iniciada

## MM-00 — Baseline

- **Objective:** congelar auditoria, origem do storefront e arquitetura.
- **Input:** site publicado, canônico V2, reviews.
- **Output:** documentos desta missão.
- **Files/components:** somente canônico.
- **Tests:** links, JSON, referências, privacidade.
- **Acceptance:** fonte/deploy/funil/gaps/dogfood documentados.
- **Stop:** decisão do owner pendente.
- **Dependencies:** nenhuma.
- **Risk/complexity:** baixo / S.

## MM-01 — One Active Offer

**Resultado em 2026-08-13:** concluída. `OFFER-OPERA-DIAGNOSTICO-V1` V1.0.0 é a única oferta `ACTIVE`, com escopo de ativação limitado à apresentação pública e `order_enabled=false`.

- **Objective:** definir uma única oferta ativa, provavelmente Diagnóstico R$197.
- **Input:** decisão do owner.
- **Output:** contrato versionado com buyer, inputs, deliverable, prazo, preço, capacidade, limites, cancelamento e aceite.
- **Files/components:** contrato/schema/fixture sintética; futura página de oferta.
- **Tests:** schema, snapshot/versionamento, estados ACTIVE/PAUSED.
- **Acceptance:** operador consegue cumprir e explicar exatamente o prometido.
- **Stop:** oferta congelada; sem pedido ainda.
- **Dependencies:** owner define deliverable.
- **Risk/complexity:** promessa comercial ambígua / S.

## MM-02 — Order + Customer

**Resultado em 2026-08-13:** YELLOW. Domínio, schema, migração, Edge Function, formulário, confirmação, owner lookup e dogfood sintético foram implementados e validados localmente. Deploy retido por ausência de tenancy/ownership/credenciais verificáveis; produção continua MM-01 com `order_enabled=false`.

- **Objective:** criar pedido rastreável com snapshot da oferta.
- **Input:** Offer ACTIVE.
- **Output:** `customer_id`, `order_id`, lifecycle e painel mínimo de consulta.
- **Files/components:** API, schema/migrations, validação, tela de criação/status.
- **Tests:** idempotência, transitions, autorização, expiração, PII.
- **Acceptance:** pedido nasce sem dinheiro e não pode ter preço reescrito pela oferta.
- **Stop:** `AWAITING_PAYMENT` reproduzível.
- **Dependencies:** MM-01, decisão de backend/tenancy.
- **Risk/complexity:** PII e duplicate submit / M.

## MM-03 — Manual PIX + Private Evidence

- **Objective:** emitir instrução e receber comprovante sem afirmar pagamento.
- **Input:** order awaiting payment; configuração privada.
- **Output:** instruction snapshot e evidence metadata/object privado.
- **Files/components:** adapter, signed upload, bucket policy, quarantine/retention configuration.
- **Tests:** MIME/size, cross-customer denial, private URL, hash, expiry, malicious names, retries.
- **Acceptance:** `PAYMENT_EVIDENCE_SUBMITTED` nunca muda order para PAID.
- **Stop:** evidência acessível somente por partes autorizadas.
- **Dependencies:** MM-02, decisão de retenção/segurança.
- **Risk/complexity:** dados financeiros e malware / M.

## MM-04 — Human Confirmation + Handoff

- **Objective:** registrar conferência independente e liberar fulfillment.
- **Input:** submitted evidence plus bank observation outside system.
- **Output:** confirmation event, order PAID and fulfillment READY.
- **Files/components:** operator authorization, review screen, transition service, notification.
- **Tests:** separation of roles, double confirmation, reject/resubmit, correction/revocation, audit.
- **Acceptance:** somente operador autorizado confirma; toda decisão tem ator/tempo/motivo.
- **Stop:** handoff criado uma vez.
- **Dependencies:** MM-03, operador financeiro designado.
- **Risk/complexity:** fraude/erro humano / M.

## MM-05 — Fulfillment + Financial Export

- **Objective:** iniciar/encerrar entrega e exportar venda organizada.
- **Input:** paid order.
- **Output:** fulfillment lifecycle, acceptance, CSV and JSON export.
- **Files/components:** fulfillment view, financial projection, exporter.
- **Tests:** reconciliation totals, CSV injection protection, deterministic JSON, correction events, access.
- **Acceptance:** um terceiro autorizado reconcilia order, confirmation, fulfillment and export.
- **Stop:** synthetic sale closes end-to-end.
- **Dependencies:** MM-04, definição de invoice/receipt status pelo operador/contador.
- **Risk/complexity:** confundir registro com obrigação fiscal / M.

## MM-06 — First Real Sale

- **Objective:** executar exatamente uma venda real controlada.
- **Input:** synthetic E2E PASS, privacy/security review, owner authorization.
- **Output:** one closed or safely aborted order and postmortem sanitized.
- **Files/components:** no new features during experiment.
- **Tests:** preflight, backup/restore, operator rehearsal, rollback, reconciliation.
- **Acceptance:** receipt confirmed independently, fulfillment started and financial export reconciled; or safe abstention.
- **Stop:** after one order; no expansion.
- **Dependencies:** MM-01–05 and explicit real-money mission.
- **Risk/complexity:** money, PII, delivery / M.

MM-01 foi encerrada sem criar pedido ou capacidade de pagamento. A próxima sprint é exclusivamente MM-02 — Order + Customer. A hipótese original de nove etapas permanece consolidada em sete sprints para não separar evidência/confirmação e fulfillment/export em incrementos cosméticos.
