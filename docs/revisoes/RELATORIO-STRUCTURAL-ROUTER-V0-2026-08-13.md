# Relatório sanitizado — Structural Router V0 — 2026-08-13

## Escopo e método

Foram roteadas as 152 identidades `TEXT_NATIVE` do classificador 1.1.0 sem conversão, OCR, API,
LLM, acesso a `G:` ou alteração dos PDFs. Seleção e métricas excluíram filename e conteúdo
semântico. Resultados locais detalhados permanecem em `.local/`; este relatório usa apenas
`doc_id` sanitizado.

O router 0.2.0 combina fragmentação textual, proporção de blocos curtos, alinhamentos horizontais,
recorrência de páginas espacialmente complexas, presença de imagens, retângulos, linhas,
operadores pintados, marcas de checkbox e marcadores de lista. Sinais fortes bloqueiam; ausência de
sinais só libera quando todos os limites conservadores são satisfeitos; casos restantes vão para
revisão.

## Controles do piloto anterior

| Grupo | doc_id | Rota V0 | Resultado esperado |
|---|---|---|---|
| FAIL | DOC-7be23575 | STRUCTURED_TEXT | bloqueado |
| FAIL | DOC-1901cbee | STRUCTURED_TEXT | bloqueado |
| FAIL | DOC-800be6ec | STRUCTURED_TEXT | bloqueado |
| PASS | DOC-6490c903 | LINEAR_TEXT | elegível |
| PASS | DOC-db11d875 | LINEAR_TEXT | elegível |
| PASS_WITH_WARNINGS | DOC-bc0b8a66 | STRUCTURED_TEXT | bloqueado por grade/vetores/fragmentação |
| PASS_WITH_WARNINGS | DOC-f91f5fbb | STRUCTURAL_REVIEW | evidência ambígua |
| PASS_WITH_WARNINGS | DOC-401db163 | STRUCTURAL_REVIEW | evidência ambígua |
| PASS_WITH_WARNINGS | DOC-9daba885 | STRUCTURAL_REVIEW | imagens recorrentes |
| PASS_WITH_WARNINGS | DOC-13180c45 | STRUCTURED_TEXT | grade/vetores/fragmentação |

Nos dez controles: 3/3 falhas perigosas bloqueadas, 2/2 passes preservados e 5/5 casos com avisos
retidos fora da liberação silenciosa. Considerando FAIL como não linear e PASS como linear, a taxa
nos cinco controles inequívocos foi 100%, sem falso positivo nem falso negativo.

## Amostra adicional independente

A amostra foi escolhida somente pela distância numérica aos limiares e incluiu 12 identidades:
`DOC-9d24293f`, `DOC-67997119`, `DOC-d9bd8d59`, `DOC-f08aaa8e`, `DOC-176858e8`,
`DOC-645e1724`, `DOC-8ee8d6f1`, `DOC-d10608ea`, `DOC-10750e35`, `DOC-6ff5e39d`,
`DOC-344c4c4c` e `DOC-585cd5f3`.

Uma revisão independente com extração `layout` e amostragem raster da primeira, central e última
página encontrou dois candidatos inicialmente permissivos com sinal visual recorrente. O limiar foi
endurecido e a versão passou de 0.1.0 para 0.2.0: imagens em pelo menos 60% das páginas ou grade
espacial em mais de 75% deixam de ser elegíveis. Após reexecução, 1 caso da amostra ficou
`LINEAR_TEXT`, 7 ficaram `STRUCTURAL_REVIEW` e 4 ficaram `STRUCTURED_TEXT`. Nenhum caso com sinal
adversarial independente permaneceu elegível.

Como verificação final, as cinco identidades `LINEAR_TEXT` que não eram os passes históricos
(`DOC-021bc4d2`, `DOC-2174cfd5`, `DOC-8c414ef6`, `DOC-b64b3849`, `DOC-d9bd8d59`) tiveram primeira,
página central e última página verificadas por detector raster independente. Não houve grade longa
recorrente. Assim, na população linear revisada, foram 7/7 passes estruturais, zero falso positivo
observado; falsos negativos não são mensuráveis sem revisar os 145 bloqueados e são aceitos por
desenho conservador.

## Distribuição final

- `LINEAR_TEXT`: 7 (4,61%).
- `STRUCTURED_TEXT`: 84 (55,26%).
- `STRUCTURAL_REVIEW`: 61 (40,13%).
- Erros e timeouts: 0.
- Total: 152.

## Decisão

**STRUCTURAL ROUTER V0 = GREEN**

Há evidência suficiente para tratar os sete `LINEAR_TEXT` como população candidata a um segundo
piloto controlado. Este estado não autoriza conversão do corpus, OCR ou `MD_WITH_ASSETS`.
