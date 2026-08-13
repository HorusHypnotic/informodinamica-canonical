# Relatório sanitizado — DIRECT_MD Pilot V1 — 2026-08-13

## Escopo

Foram convertidas exatamente as sete identidades `LINEAR_TEXT` produzidas pelo Structural Router
0.2.0. Não houve expansão para as outras 145 identidades, OCR, API/LLM externa, acesso a `G:`,
alteração dos PDFs ou promoção do corpus. Markdown, manifests, imagens de validação, paths e texto
documental permanecem exclusivamente em `.local/`.

## Matriz

| doc_id | Páginas | Resultado | Retenção | Achado estrutural | Tempo | PDF | Markdown | Palavras | Tokens estimados |
|---|---:|---|---:|---|---:|---:|---:|---:|---:|
| DOC-021bc4d2 | 10 | FAIL | 1,0000 | headings visuais e parágrafos achatados | 0,629 s | 346.102 B | 21.322 B | 3.155 | 5.153 |
| DOC-2174cfd5 | 81 | FAIL | 1,0000 | hierarquia de lista multinível e parágrafos achatados | 1,823 s | 375.271 B | 206.644 B | 29.011 | 49.812 |
| DOC-6490c903 | 2 | PASS | 1,0000 | nenhum | 0,023 s | 4.408 B | 3.263 B | 453 | 791 |
| DOC-8c414ef6 | 4 | PASS_WITH_WARNINGS | 1,0000 | título visual não promovido; ordem preservada | 0,149 s | 294.578 B | 9.573 B | 1.317 | 2.315 |
| DOC-b64b3849 | 5 | FAIL | 1,0000 | lista visual achatada em texto corrido | 0,167 s | 64.302 B | 7.766 B | 1.083 | 1.865 |
| DOC-d9bd8d59 | 6 | PASS_WITH_WARNINGS | 1,0000 | ênfase inline perdida sem alterar relações | 0,261 s | 77.313 B | 11.591 B | 1.459 | 2.789 |
| DOC-db11d875 | 8 | PASS | 1,0000 | nenhum | 0,281 s | 305.290 B | 16.733 B | 2.321 | 4.037 |

Resultados: 2 `PASS`, 2 `PASS_WITH_WARNINGS` não materiais e 3 `FAIL` materiais. A checagem
monotônica confirmou a ordem de todas as linhas-fonte significativas nos sete documentos, mas
ordem e retenção integral não compensam perda de hierarquia.

## Benchmark agregado

- PDFs: 1.467.264 bytes em 116 páginas.
- Markdown: 276.892 bytes; redução local de bytes: 81,13%.
- Caracteres extraíveis e preservados: 218.345; retenção média, mediana, mínima e máxima: 1,0000.
- Markdown: 38.799 palavras e 66.762 tokens estimados.
- Conversão: 3,333 s no total; média 0,476 s; mediana 0,261 s; mínimo 0,023 s; máximo 1,823 s.

Tokens são estimados por `ceil(caracteres_totais_do_markdown / 4)` e não representam custo real de
qualquer provedor.

## Determinismo e privacidade

Uma segunda execução dos sete documentos produziu SHA-256 de Markdown idêntico em 7/7. Somente
timestamps e tempos de execução dos manifests podem variar. Nenhum hash, filename, path, texto ou
imagem documental é versionado; este relatório registra apenas `doc_id` e métricas sanitizadas.

## Decisão

**DIRECT_MD PILOT V1 = RED**

O Structural Router 0.2.0 eliminou formulários, matrizes e checklists conhecidos, mas `LINEAR_TEXT`
ainda não implica compatibilidade com o conversor 0.1.0. Três dos sete candidatos perderam
estrutura material de headings, parágrafos ou listas. A expansão permanece proibida.
