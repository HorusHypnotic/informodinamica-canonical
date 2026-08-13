# Revisão pré-commit — deduplicação estrutural do acervo — 2026-08-13

## Escopo

Ferramenta local para selecionar candidatos por tamanho no inventário SQLite e confirmar duplicatas
binárias por SHA-256 streaming. Inclui testes, documentação curta e ignore específico das saídas.

## Coerência e segurança

- Nenhum documento canônico, conceito, ID, produto OPERA ou arquivo do acervo foi alterado.
- Arquivos de tamanho único não foram abertos; somente candidatos de tamanho repetido foram lidos
  como bytes, sem interpretação de formato.
- Não houve OCR, extração, conversão, cópia, movimentação, renomeação ou exclusão.
- Todos os caminhos são preservados: duplicata binária não é tratada como cópia descartável.
- SQLite, NDJSON, resumo e log são artefatos operacionais locais e estão fora do Git.

## Evidência

- Corpus: 392 arquivos e 854.434.332 bytes.
- Hashing: 118 candidatos, 303.356.563 bytes efetivamente lidos e zero erros.
- Resultado: 321 arquivos binariamente únicos, 44 grupos duplicados, 71 cópias redundantes e
  167.474.638 bytes redundantes.
- Testes cobrem igualdade, falso candidato por tamanho, tamanho único sem hashing, arquivo vazio,
  erro de leitura, bytes redundantes e interrupção segura.

## Limites e próxima fase

O resultado prova identidade binária, não autoridade, originalidade documental ou descartabilidade.
A próxima fase recomendada é a classificação estrutural dos PDFs únicos, em missão separada e sem
iniciá-la nesta revisão.
