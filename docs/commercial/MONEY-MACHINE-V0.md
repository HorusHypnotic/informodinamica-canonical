# Money Machine V0

**Status:** arquitetura candidata V0 — não implementada

## Decisão arquitetural

O site atual pode evoluir para Money Machine e deve continuar como storefront estático no GitHub Pages. Não é necessário outro app de frontend no V0. É necessário um backend transacional mínimo, pois HTML/JavaScript público não pode ser autoridade sobre pedidos, comprovantes ou confirmação financeira.

Arquitetura mínima:

```text
GITHUB PAGES STOREFRONT
  → ACTIVE OFFER SNAPSHOT
  → SERVER-SIDE ORDER API + DATABASE
  → PIX_MANUAL INSTRUCTION ADAPTER
  → PRIVATE OBJECT STORAGE (untrusted receipt)
  → HUMAN PAYMENT REVIEW
  → FULFILLMENT HANDOFF
  → APPEND-ONLY EVENTS
  → CSV + JSON FINANCIAL EXPORT
```

Um stack serverless gerenciado com funções, banco relacional e bucket privado é suficiente. A integração Supabase já insinuada pelo storefront pode ser aproveitada somente após decisão de tenancy/projeto, segurança e ownership; o endpoint hoje configurado não prova backend disponível. Não criar servidor residente, gateway, ERP ou CRM.

## Domínio mínimo

O modelo inicial proposto era correto na direção, mas precisava separar oferta versionada, evidência não confiável e confirmação humana. Entidades:

1. `Offer`: promessa vendável versionada. Pedido preserva snapshot para mudanças futuras não reescreverem a venda.
2. `Customer`: identidade mínima, contato e consentimento.
3. `Order`: compromisso, valor e lifecycle. No V0, um único item pode permanecer no snapshot; `OrderItem` separado só quando houver carrinho real.
4. `PaymentInstruction`: instrução emitida por adapter; chave/dados financeiros ficam fora do Git.
5. `PaymentEvidence`: arquivo não confiável, privado, hasheado e vinculado ao pedido.
6. `PaymentConfirmation`: ato humano após conferir a conta por canal independente.
7. `Fulfillment`: owner, início, entrega e aceite.
8. `FinancialRecord`: projeção organizada da venda para exportação.
9. `Event`: transições append-only com ator, tempo, motivo e estados.

Responsabilidades, campos, classes de dados e mutabilidade estão em `commercial/money-machine-v0.json`.

## State machines

```text
ORDER
CREATED → AWAITING_PAYMENT → PAYMENT_REVIEW → PAID
      → FULFILLMENT_READY → IN_FULFILLMENT → COMPLETED

Terminais/saídas: CANCELLED, EXPIRED, PAYMENT_REJECTED
PAYMENT_REJECTED pode retornar a AWAITING_PAYMENT por novo evento e nova evidência;
o evento anterior não é apagado.
```

```text
PAYMENT EVIDENCE
NOT_SUBMITTED → SUBMITTED → UNDER_REVIEW
                            ├── ACCEPTED_AS_SUPPORT
                            ├── REJECTED
                            └── QUARANTINED

PAYMENT CONFIRMATION
UNCONFIRMED → CONFIRMED_BY_HUMAN
                    └── REVOKED_WITH_REASON (evento corretivo, nunca delete)
```

`ACCEPTED_AS_SUPPORT` não significa liquidação. Somente `PaymentConfirmation`, registrada por operador autorizado após inspeção independente da conta, libera `PAID`.

## PIX manual como adapter

`PAYMENT_METHOD=PIX_MANUAL`. A configuração privada fornece ao adapter instruções para valor/pedido. O comprador paga fora do sistema e envia comprovante. O sistema não consulta banco, não valida imagem automaticamente e não cria dinheiro. A instrução tem validade e referência próprias; trocar a chave não altera o domínio.

Fluxo:

```text
ORDER CREATED
→ PAYMENT INSTRUCTION ISSUED
→ CUSTOMER PAYS OUTSIDE SYSTEM
→ PAYMENT_EVIDENCE_SUBMITTED
→ OPERATOR CHECKS BANK ACCOUNT INDEPENDENTLY
→ PAYMENT_CONFIRMED
→ ORDER PAID
→ FULFILLMENT HANDOFF
```

## Comprovante e privacidade

O comprovante é `FINANCIAL_SENSITIVE`, potencialmente contendo nome, instituição, conta, identificadores e valores. Requisitos mínimos antes de implementação:

- allowlist de MIME e tamanho; rejeitar conteúdo executável e nomes como autoridade;
- upload direto para bucket privado com object key aleatória, sem URL pública;
- SHA-256, tamanho, MIME observado, timestamp, uploader e `order_id`;
- acesso apenas do cliente daquele pedido e operadores financeiros autorizados;
- malware/quarantine policy antes de visualização, ou restrição inicial conservadora;
- logs sem dados bancários; signed URLs curtas;
- retenção e exclusão definidas pelo owner com apoio jurídico/contábil; não inventadas aqui;
- evento de exclusão preserva metadata mínima permitida, não o arquivo;
- consentimento e aviso de finalidade separados do marketing.

Classes: `PUBLIC`, `CUSTOMER_PRIVATE`, `OPERATOR_PRIVATE`, `FINANCIAL_SENSITIVE`.

## Registro financeiro

Campos mínimos: `order_id`, customer reference, offer snapshot/name, amount/currency, method, payment status, confirmation date, fulfillment status, evidence reference, receipt/invoice status e notes. Isso organiza dados para contador; não define obrigação tributária.

Exportação mínima: CSV para leitura/contabilidade e JSON como pacote completo de eventos/referências. Markdown é view humana opcional, nunca autoridade.

## Reuso de capabilities

| Capability/sistema | Decisão | Uso/limite |
|---|---|---|
| CAP-001 Context Gate | REUSE | preflight por sprint |
| CAP-002 Document Provenance | ADAPT | genealogia de export/evidence; não copiar contrato documental cegamente |
| CAP-003 Provenance Index | REFERENCE_ONLY | índice reconstruível futuro, não necessário ao primeiro pedido |
| CAP-005 Evidence Ledger | ADAPT | separar submissão, evidência e interpretação/confirmação |
| CAP-010 Snapshot/Hash/Audit | ADAPT | padrão candidato; exigir contrato próprio |
| Obra Flow ledger/backup | REFERENCE_ONLY | estados e export; não reutilizar banco de suprimentos |
| Vitrine catálogo/lead | ADAPT | modelo de oferta/CTA, sem fundir sistemas |
| Memória de Vendas lead/outcome | REFERENCE_ONLY | não criar CRM nem mover PII |
| Margin Narrative hash/evidence | DO_NOT_REUSE | store efêmero e integridade fraca |
| Atlas/Cofre | REFERENCE_ONLY | não são storage automático da Money Machine |

Capabilities novas necessárias, ainda não promovidas: `Commercial Offer Contract`, `Order Lifecycle`, `Manual Payment Review`, `Private Payment Evidence Storage`, `Fulfillment Handoff` e `Financial Export`. São necessidades arquiteturais, não IDs canônicos.

## Smallest real sellable flow

Exemplo abstrato:

1. visitante abre a página exclusiva do Diagnóstico;
2. lê buyer, escopo, entrega, prazo, limites e preço congelados;
3. fornece contato mínimo e consente com a finalidade;
4. backend cria `order_id` com snapshot da oferta;
5. recebe instrução PIX manual privada;
6. paga fora do sistema e envia evidência vinculada;
7. operador confere o extrato/conta por canal independente;
8. operador registra confirmação, sem declarar que a imagem provou liquidação;
9. sistema cria handoff de fulfillment e envia confirmação do início;
10. evento e financial record permitem demonstrar recebimento e início da entrega.

## Dogfood #001

Recomendação: **Diagnóstico O.P.E.R.A. de R$197**, condicional à decisão do owner sobre um deliverable congelado e capacidade de entrega.

Razões: é a única oferta com preço unitário baixo explicitamente publicado, CTA próprio e problema de entrada. Smart Cotações está mais pronto como produto, mas sua unidade de cobrança é desconhecida e sua Compra Real #001 testa uma compra assistida, não a venda do serviço. Vitrine Digital possui deliverable assistido plausível, mas não tem preço aprovado e requer revisão de deploy/segurança.

A recomendação não declara `SELLABLE_NOW`. Antes de MM-01, o owner precisa definir exatamente o que R$197 entrega, em quanto tempo, com quais inputs, limites e aceite.

## Respostas arquiteturais

- **A:** sim, o site atual pode evoluir.
- **B:** não é necessário outro app de frontend no V0.
- **C:** sim, GitHub Pages pode permanecer storefront com backend mínimo.
- **D:** API serverless, banco relacional, storage privado e autorização de operador.
- **E:** pedidos vivem no banco transacional, não em Git/localStorage/form email.
- **F:** comprovantes vivem em bucket privado; database guarda metadata/hash/reference.
- **G:** confirmações vivem como registro e evento append-only no banco.
- **H:** CSV mínimo + JSON completo; Markdown apenas view.
- **I:** Diagnóstico R$197, condicionado ao contrato de oferta.
- **J:** congelar uma oferta e seu deliverable; depois implementar criação de pedido. Publicar PIX sem pedido não é a menor mudança segura.
