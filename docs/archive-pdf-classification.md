# Classificação estrutural local de PDFs

`scripts/archive_pdf_classifier.py` usa `pypdf` localmente para classificar conteúdos PDF únicos
por sinais estruturais. Texto extraído existe apenas transitoriamente em memória para contagem de
caracteres; nenhum trecho é persistido, enviado ou interpretado semanticamente.

A heurística `1.1.0` considera página textual aquela com pelo menos 40 caracteres. Proporção textual
de 80% ou mais indica `TEXT_NATIVE`; entre 20% e 80%, `MIXED`; abaixo de 20%, `SCAN`. Um documento
textual com imagens em pelo menos 60% das páginas e média inferior a 800 caracteres por página é
`VISUAL_TECHNICAL`; documentos com imagem também entram nessa classe quando possuem pelo menos 100
operadores vetoriais por página. Sem imagem, são usados dois sinais de layout: pelo menos 60
operadores vetoriais e menos de 500 caracteres por página; ou pelo menos 50 operadores vetoriais,
30 operadores de pintura e menos de 1.600 caracteres por página. Essas combinações capturam
formulários e composições diagramadas sem tornar toda decoração vetorial decisiva. Proteção sem
senha vazia gera `ENCRYPTED_OR_RESTRICTED`; falha de parsing ou PDF
sem páginas gera `FAILED`.

Cada PDF é analisado em processo isolado com timeout padrão de 30 segundos. Exceder o limite gera
`FAILED` e revisão manual, permitindo concluir o restante do corpus sem processo preso.

`pypdf` foi escolhido por já estar disponível no ambiente, ser uma biblioteca madura e permitir
parsing e extração textual local sem OCR. A faixa reproduzível está em `requirements-archive.txt`.

Os resultados ficam em `/.local/archive-pdf-classification/`, são operacionais e não canônicos.
Documentos são referenciados publicamente somente por `DOC-` seguido dos oito primeiros caracteres
do SHA-256. A classificação não implica interpretação temática nem autorização para conversão.
