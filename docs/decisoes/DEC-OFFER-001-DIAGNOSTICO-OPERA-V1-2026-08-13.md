# DEC-OFFER-001 — Diagnóstico O.P.E.R.A. V1

**Data:** 2026-08-13
**Decisão:** GREEN para MM-01; `ACTIVE` somente para apresentação pública
**Contrato:** `commercial/offers/diagnostico-opera-v1.json`

## Decisão

Congelar `OFFER-OPERA-DIAGNOSTICO-V1`, versão `1.0.0`, pelo preço fixo publicado de R$ 197. O MM-01 pode representar a oferta publicamente, mas não cria Customer, Order, PaymentInstruction, PaymentEvidence, PaymentConfirmation, Fulfillment ou FinancialRecord.

## Auditoria de claims

| Claim | Fonte | Estado | Confiança |
|---|---|---|---|
| Diagnóstico/análise inicial por R$ 197 | storefront desde `c034eae` e publicação vigente auditada em `df35d71` | PUBLISHED | alta |
| R$ 197 abatível da implantação | mesmo histórico, com redação discricionária “pode” e sem condições | PUBLISHED, não contratual | alta |
| Relatório como entregável | formas de reporte e diagnóstico canônicas; contrato comercial inexistente antes desta decisão | PROPOSED e agora decidido | média-alta |
| Cinco pilares da hipótese | nenhuma definição metodológica encontrada na base versionada | UNSUPPORTED | alta |
| Separar fato, relato, inferência e ausência | agentes e protocolos operacionais vigentes | CANONICAL | alta |
| Prioridade/recomendação qualitativa | agentes operacionais vigentes, sempre sujeita à decisão humana | CANONICAL | alta |
| SLA, cancelamento e reembolso | nenhuma regra vigente localizada | UNKNOWN | alta |

## Racional

O contrato adota a menor promessa sustentável: organizar e analisar o contexto informado, registrar incerteza e recomendar apenas o que a evidência permite. A oferta não se apresenta como laudo ou auditoria e não incorpora os cinco pilares sem base metodológica.

O estado `ACTIVE` tem escopo `PUBLIC_PRESENTATION_ONLY`, porque o objetivo do MM-01 é tornar inequívoca a única oferta ativa sem fingir um fluxo transacional. `order_enabled=false` é vinculante. As decisões que interferem em uma contratação real ficam bloqueadas antes do MM-02, mas não impedem a apresentação honesta.

## Opções de SLA registradas, não escolhidas

| Opção | Esforço/capacidade | Valor percebido | Risco operacional |
|---|---|---|---|
| 24 horas | muito exigente | alto | muito alto |
| 48 horas | exigente | alto | alto |
| 3 dias úteis | equilibrado | bom | moderado |
| 5 dias úteis | conservador | moderado | baixo |

Nenhuma foi escolhida sem evidência de capacidade.

## Compatibilidade canônica

Não redefine a TPC, o glossário, o Structural Router ou o método O.P.E.R.A. A decisão cria um contrato comercial derivado, limitado pelas autoridades superiores e pela separação entre evidência e alegação. Nenhum novo ID teórico é criado; `OFFER-...` é identidade comercial no domínio Money Machine já documentado.

## Decisões antes do MM-02

- SLA público e capacidade;
- operador nominal;
- canal privado;
- janela de correção factual;
- cancelamento e reembolso.
