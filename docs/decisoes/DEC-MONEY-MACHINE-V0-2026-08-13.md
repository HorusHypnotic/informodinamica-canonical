# DEC — Money Machine V0 — 2026-08-13

## Status

`ARCHITECTURE PROPOSED / OWNER DECISION REQUIRED`. Esta decisão não autoriza implementação, pagamento ou coleta real.

## Contexto

O Ecosystem Consolidation V2 está GREEN. O storefront do Canteiro de Obras Digital foi localizado e comparado ao site publicado. Ele comunica patrimônio, publica preços e contém diagnóstico/formulário, mas não possui funil de venda completo. O formulário está bloqueado por configuração placeholder e o endpoint declarado respondeu 404 na verificação read-only.

## Decisão proposta

1. Manter GitHub Pages como storefront V0.
2. Não criar novo frontend, e-commerce, CRM, ERP ou gateway.
3. Criar futuramente backend transacional mínimo com banco, funções e storage privado.
4. Modelar PIX manual como adapter.
5. Separar obrigatoriamente `PAYMENT_EVIDENCE_SUBMITTED` de `PAYMENT_CONFIRMED`.
6. Usar confirmação humana após consulta independente da conta.
7. Preservar histórico por eventos append-only e exportar CSV + JSON.
8. Iniciar somente com uma oferta.

## Dogfood recomendado

Diagnóstico O.P.E.R.A. de R$197, por ser a única oferta de entrada com preço unitário publicado e CTA próprio. A recomendação é condicional: a publicação atual não define entregável, prazo, inputs, capacidade e aceite com precisão suficiente. Smart Cotações testa compra assistida, não uma unidade de receita definida; Vitrine Digital assistida não possui preço aprovado.

## Segurança

Comprovantes são `FINANCIAL_SENSITIVE`, não prova automática de liquidação. Não guardar em Git, Pages, localStorage, logs ou URL pública. Retenção/exclusão e obrigação fiscal exigem decisão competente posterior. Nenhuma chave PIX, dado fiscal, secret ou comprovante foi criado nesta missão.

## Impacto e limites

Foram criados apenas contratos, auditoria, matriz e plano. Ecosystem Map V2, produtos, Supabase, GitHub Pages e sistemas OPERA não foram alterados. O estado publicado permanece como encontrado.

## Condição para implementação

O owner deve escolher e congelar o contrato da primeira oferta. Após isso, MM-01 pode receber missão própria. Até a decisão, `MONEY MACHINE V0 = DESIGN GREEN / IMPLEMENTATION NOT STARTED`.

## Validação da missão

- Context Gate: WARN somente pela working tree preexistente do owner; nenhum erro.
- GitHub Pages API: source `main`/`/`, build legacy, HTTPS e deployment do commit auditado.
- Comparação publicada: cinco de cinco artefatos textuais com SHA-256 idêntico ao clone.
- JSON: dois documentos válidos; referências, nove entidades, state invariants e quatro entradas da matriz verificados.
- Suíte canônica: 131 testes e 28 subtests PASS.
- `git diff --check`: PASS.
- Privacy scan: nenhum valor de secret, chave financeira, identificador fiscal, comprovante ou PII real incluído.
- Repositório do storefront: limpo e inalterado ao final.
