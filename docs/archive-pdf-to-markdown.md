# Piloto local PDF para Markdown

`scripts/archive_pdf_to_markdown.py` converte somente identidades `TEXT_NATIVE` validadas. A versão
`0.1.0` usa o modo textual padrão do `pypdf`, preserva fronteiras como `<!-- source-page: N -->`, remove apenas margens
repetidas em pelo menos 60% das páginas e aplica reconhecimento conservador de headings e listas.
Tabelas/colunas ambíguas são preservadas como texto e recebem warning; células nunca são inventadas.

`text_retention_ratio` é a razão entre caracteres alfanuméricos no Markdown (sem marcadores de
página) e no texto bruto extraído pelo mesmo parser. Tokens são estimados por
`ceil(caracteres_totais_do_markdown / 4)`; essa métrica compara representações locais e não custos de
pipelines de provedores.

As saídas e manifestos ficam em `/.local/archive-markdown-pilot/`, fora do Git. O conteúdo Markdown,
filenames, paths e texto documental não são versionados.
