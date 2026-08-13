# Structural Router local

`scripts/archive_structural_router.py` cria uma camada determinística entre a classe
`TEXT_NATIVE` e qualquer futuro conversor. Ele não converte documentos: mede geometria de texto,
fragmentação, imagens e operadores vetoriais e produz uma rota operacional local.

## Rotas

- `LINEAR_TEXT`: candidato a um piloto `DIRECT_MD`; não constitui autorização para lote.
- `STRUCTURED_TEXT`: bloqueado para `DIRECT_MD` puro.
- `STRUCTURAL_REVIEW`: evidência insuficiente ou ambígua; requer revisão.

O roteador prefere revisão excessiva a liberar silenciosamente formulários, matrizes ou checklists.
Não usa nome de arquivo nem classificação temática. Texto transitório necessário à contagem é
descartado por página. O banco local registra a raiz de origem para proveniência operacional, mas
não persiste filenames, paths relativos nem texto; log e resumo também não guardam conteúdo.

## Uso

```powershell
python scripts/archive_structural_router.py `
  --classification .local/archive-pdf-classification/informodinamica-tudo/classification.sqlite3 `
  --output .local/archive-structural-router/informodinamica-tudo `
  --timeout-seconds 30
```

A saída é um índice de metadados local, não canônico, e está excluída do Git. Cada PDF é analisado
em processo isolado; falha ou timeout resulta em `STRUCTURAL_REVIEW` e não interrompe o corpus.

## Limitações

Os limiares são heurísticos e calibrados para segurança. Eles não provam fidelidade do Markdown,
não detectam toda semântica visual e não substituem novo piloto amostral. A rota `LINEAR_TEXT`
somente define uma população candidata mais restrita.
