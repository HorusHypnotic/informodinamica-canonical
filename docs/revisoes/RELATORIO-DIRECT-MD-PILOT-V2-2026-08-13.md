# Relatório sanitizado — DIRECT_MD Pilot V2 — 2026-08-13

## Escopo

O conversor experimental 0.2.0 foi testado exatamente nos sete `LINEAR_TEXT` do piloto V1. Foram
adicionados sinais de fonte, posição, espaçamento, indentação e retângulos, sem alterar o Structural
Router 0.2.0. Não houve OCR, API/LLM, acesso a `G:`, processamento dos outros 145 documentos ou
conteúdo documental no Git.

## Resultado

| doc_id | V1 | V2 revisado | Retenção V2 | Achado |
|---|---|---|---:|---|
| DOC-021bc4d2 | FAIL | FAIL | 1,0000 | headings multilinha permanecem fragmentados |
| DOC-2174cfd5 | FAIL | FAIL | 1,0000 | lista multinível mantém ordem material incorreta; checkbox incerto |
| DOC-b64b3849 | FAIL | FAIL | 1,0000 | sequência visual ainda é confundida com headings |
| DOC-6490c903 | PASS | PASS_WITH_WARNINGS | 1,0000 | headings recuperados, mas hierarquia permanece conservadoramente incerta |
| DOC-db11d875 | PASS | PASS_WITH_WARNINGS | 1,0000 | headings recuperados; item isolado preservado |
| DOC-8c414ef6 | PASS_WITH_WARNINGS | PASS_WITH_WARNINGS | 1,0000 | estrutura melhor, sem perda material nova |
| DOC-d9bd8d59 | PASS_WITH_WARNINGS | PASS_WITH_WARNINGS | 1,0000 | estrutura melhor, sem perda material nova |

Resultado humano: zero golden failure corrigido integralmente; dois golden passes sem perda de
texto, porém sem evidência suficiente para promover o lote. Warnings automáticos de
`CHECKLIST_STATE_UNCERTAIN` ocorreram nas páginas 1–3 de `DOC-2174cfd5`; nenhum estado foi inventado.

## Fixtures e regressão

Fixtures sintéticas cobrem heading visual e textual, parágrafo quebrado, dois parágrafos, listas
simples, numeradas e multinível, checklist Unicode e retângulo vetorial incerto, tabela ambígua,
UTF-8, multipágina, header/footer, ordem de emissão, determinismo e warnings. A suíte total passou
com 32 testes. Durante o piloto, uma ordenação inicial por coordenadas embaralhou texto; foi
substituída por ordem do parser anotada com geometria e recebeu teste de regressão.

## Benchmark V0.1 versus V0.2

- PDFs: 1.467.264 bytes e 116 páginas em ambas as versões.
- Markdown: 276.892 bytes no V0.1; 278.459 bytes no V0.2.
- Caracteres preservados V0.2: 218.342 de 218.345; retenção média 0,999997 e mínima 0,999982.
- V0.2: 38.993 palavras, 67.153 tokens estimados e 10,215 s na execução medida.
- V0.1: 38.799 palavras, 66.762 tokens estimados e 3,333 s na execução histórica.

Tokens são aproximações locais por comprimento e não representam custo de provedor.

## Determinismo, privacidade e decisão

O SHA-256 do Markdown foi idêntico em duas execuções para 7/7. Outputs, manifests e materiais de
revisão permanecem em `.local/`; a documentação usa somente `doc_id` e métricas sanitizadas.

**DIRECT_MD PILOT V2 = RED**

A versão 0.2.0 é evidência experimental reprovada e não autoriza expansão.
