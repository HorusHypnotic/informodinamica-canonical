# Piloto local PDF para Markdown

`scripts/archive_pdf_to_markdown.py` converte somente identidades `TEXT_NATIVE` validadas. A versão
experimental `0.5.0` mantém separados `ReadingOrderEngine` e `StructureClassifier`. O primeiro
constrói `source_order` e `geometry_order`, arbitra explicitamente as hipóteses e devolve apenas a
ordem escolhida; o segundo recebe blocos já ordenados e não pode
reordená-los. Linhas mantêm tamanho de
fonte, coordenadas, espaçamento e retângulos vetoriais. Preserva fronteiras como
`<!-- source-page: N -->`, remove apenas margens repetidas em pelo menos 60% das páginas e aplica
reconhecimento conservador de headings, parágrafos, listas e checklists.
Tabelas/colunas ambíguas são preservadas como texto e recebem warning; células nunca são inventadas.

`text_retention_ratio` é a razão entre caracteres alfanuméricos no Markdown (sem marcadores de
página) e no texto bruto extraído pelo mesmo parser. Tokens são estimados por
`ceil(caracteres_totais_do_markdown / 4)`; essa métrica compara representações locais e não custos de
pipelines de provedores.

As saídas e manifestos ficam em `/.local/archive-markdown-pilot/`, fora do Git. O conteúdo Markdown,
filenames, paths e texto documental não são versionados.

Checklists vetoriais sem estado objetivamente identificável são preservados como itens e geram
`CHECKLIST_STATE_UNCERTAIN`; nenhum estado é inventado. Tabelas/colunas ambíguas também geram
warning. O arbiter 0.5.0 usa `source_order` como baseline. Cada página recebe
`KEEP_SOURCE_ORDER`, `USE_GEOMETRY_ORDER` ou `ORDER_UNCERTAIN`; incerteza preserva fisicamente a
ordem de origem. Parâmetros e métricas ficam no manifesto local. Os warnings são
`READING_ORDER_SOURCE_PRESERVED`, `READING_ORDER_GEOMETRY_SELECTED` e `READING_ORDER_UNCERTAIN`.
O V0.5 foi calibrado somente em 13 fixtures sintéticas adversariais: 6 KEEP, 2 GEOMETRY e 5
UNCERTAIN, com matriz de confusão diagonal e zero falso `USE_GEOMETRY_ORDER`. PDFs reais permaneceram
congelados e ainda não há autorização para expansão.
