# Current Commercial Funnel V0

**Data:** 13 de agosto de 2026

**Escopo:** estado publicado do Canteiro de Obras Digital; auditoria read-only

## Origem e deploy

O storefront oficial é gerado pelo repositório `HorusHypnotic/canteiro-de-obras-digital`, branch `main`, raiz `/`. GitHub Pages está configurado em modo `legacy`, HTTPS, sem CNAME. O deployment consultado aponta para `df35d71fcb3afa9bc3fa6a2caa957b2160afc46e`. `index.html`, os dois CSS e os dois JavaScript públicos possuem SHA-256 idêntico aos arquivos do clone local.

Stack: HTML/CSS/JavaScript estático, sem build/package manager; GitHub Pages; formulário com Cloudflare Turnstile pretendido; chamada a uma Supabase Edge Function configurada no cliente. Não há storage ou banco no repositório. O endpoint configurado respondeu HTTP 404 a GET, embora o frontend espere esse GET para métricas. A chave pública de Turnstile permanece placeholder; por código, o botão de envio fica desabilitado.

## Funil real

| Etapa | Estado | Evidência/limite |
|---|---|---|
| A. Descoberta | IMPLEMENTED | home pública, hero, navegação e presença institucional |
| B. Compreensão | PARTIAL | problema e arquitetura explicados; mistura patrimônio, pesquisa e ofertas |
| C. Seleção | PARTIAL | 12 checkboxes de produtos, muitos indisponíveis/congelados |
| D. Preço | IMPLEMENTED/PARTIAL | R$197, faixas de implantação/acompanhamento/performance e core; condições completas ausentes |
| E. CTA | IMPLEMENTED | diagnóstico local, solicitação e contato Instagram |
| F. Identificação | BLOCKED | formulário existe; Turnstile placeholder impede envio |
| G. Qualificação | PARTIAL | diagnóstico de cinco eixos ocorre no navegador; regra não é validação comercial |
| H. Pedido | MISSING | manifestação não é pedido; não há `order_id` |
| I. Pagamento | MISSING | nenhum método/instrução/transação |
| J. Evidência de pagamento | MISSING | nenhum upload ou storage |
| K. Conferência | MISSING | nenhum papel ou ato de confirmação |
| L. Confirmação | MISSING | nenhum estado/recibo de confirmação |
| M. Registro financeiro | MISSING | nenhum ledger/export contábil |
| N. Onboarding | DOCUMENTED_ONLY/UNKNOWN | implantação é descrita, não contratada pelo site |
| O. Fulfillment | MISSING | sem owner, SLA, entrega ou aceite |
| P. Pós-venda | MISSING | sem canal/ciclo registrado |
| Q. Histórico | PARTIAL/BLOCKED | session ID local; backend declarado, não comprovado; nenhum order history |
| R. Métricas | BLOCKED | cards e GET existem no JS; endpoint observado respondeu 404 |

Fluxo observável:

```text
VISITA → CONTEÚDO/PORTFÓLIO → DIAGNÓSTICO LOCAL → FORMULÁRIO DESABILITADO
                                                  ↘ Instagram externo
```

Não existe hoje caminho comprovado `lead → pedido → pagamento → entrega`.

## Interface comercial versus portfólio

O site tenta simultaneamente ser institucional, portfólio, publicação de pesquisa e superfície comercial. Ele publica quatro preços, mas oferece 12 seleções de interesse e expõe ativos em estados muito diferentes. O aviso de que portfólio não implica disponibilidade é correto, porém não elimina a carga cognitiva nem cria uma oferta comprável.

Classificação para exposição comercial:

- `ASSISTED_SALE`: Diagnóstico O.P.E.R.A. de R$197, condicionado a contrato de entrega; Vitrine Digital assistida, ainda sem preço.
- `LEAD_ONLY`: implantação e acompanhamento O.P.E.R.A.; Smart Cotações até existir unidade de cobrança.
- `DEMO_ONLY`: Atlas público e Vision, quando apresentados apenas como demonstração.
- `RESEARCH`: Informodinâmica, TPC/TDO, OPERA Research e Canteiro de Obras Digital como estudo.
- `INTERNAL`: Memória de Vendas, Direcione e outros instrumentos internos.
- `FROZEN`: Cofre, PDIC, família territorial, Remanufatura, StockFlow, QFD-OS e Margin Narrative.
- `DO_NOT_EXPOSE` como oferta: Pedidos COD separado, Canteiro CRM, Gestão de OS e demais `UNREVIEWED/UNKNOWN`; não devem parecer compráveis.

Não há `SELLABLE_NOW`: o diagnóstico tem preço, mas não possui pedido, pagamento nem deliverable congelado.

## Ofertas candidatas

| Oferta | Buyer/User | Problema e deliverable | Preço | Readiness/risco | Distância |
|---|---|---|---|---|---|
| Diagnóstico O.P.E.R.A. | responsável por obra | análise inicial; entregável exato ainda ausente | R$197 publicado | melhor superfície comercial, fulfillment indefinido | MEDIUM até primeira venda |
| Smart Cotações | comprador/gestor | necessidade → propostas → comparação/decisão | UNKNOWN | produto GREEN; cobrança não definida; Compra Real #001 não é venda do produto | UNKNOWN para receita |
| Vitrine Digital assistida | pequeno fornecedor | vitrine publicada com slug, ofertas e CTA | UNKNOWN | unidade assistida plausível; segurança/deploy/demanda pendentes | NEAR tecnicamente, MEDIUM comercialmente |
| Implantação O.P.E.R.A. | organização/obra | estruturação de sistema, indicadores e rotina | R$3 mil–8 mil de referência | exige diagnóstico, proposta e escopo | FAR para compra imediata |
| Acompanhamento | organização/obra | acompanhamento periódico | a partir de R$1,5 mil/mês | capacidade, SLA e contrato desconhecidos | FAR para compra imediata |

Faixas e preço acima são evidência publicada no commit auditado, não validação de demanda nem decisão de preço definitiva.
