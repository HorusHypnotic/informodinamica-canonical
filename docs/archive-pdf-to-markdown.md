# Piloto local PDF para Markdown

`scripts/archive_pdf_to_markdown.py` converte somente identidades `TEXT_NATIVE` validadas. A versão
experimental `0.2.0` preserva a ordem canônica emitida pelo `pypdf` e anota linhas com tamanho de
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
warning. O piloto V2 reprovou a versão 0.2.0 por ordem incorreta em lista multinível e ambiguidade
entre sequência visual e heading; portanto, ela não está autorizada para expansão.
