# Inventário local de metadados do acervo

`scripts/archive_inventory.py` cria um índice operacional local da árvore histórica sem abrir o
conteúdo dos arquivos. Ele coleta somente nome, caminho relativo, extensão, tamanho, modificação,
diretório pai e profundidade por meio de `os.scandir()` e `stat()`.

O SQLite produzido é um índice local de metadata, não um banco canônico. A origem é tratada como
somente leitura; links simbólicos não são seguidos. PDFs não são abertos, contados por página,
convertidos, resumidos ou submetidos a OCR/hash.

## Teste limitado

```powershell
python scripts/archive_inventory.py --root archive/google-drive --output .local/archive-inventory/sample-1000 --max-files 1000 --progress-every 100
```

## Execução completa pelo owner

```powershell
python scripts/archive_inventory.py --root archive/google-drive --output .local/archive-inventory/full --progress-every 10000
```

Interromper com `Ctrl+C` fecha iteradores e transação, registra `INTERRUPTED` no SQLite e produz um
resumo parcial. Uma nova execução no mesmo destino reinicia o índice para evitar misturar snapshots.
Use `--dry-run` para validar raiz e destino sem percorrer a árvore.
