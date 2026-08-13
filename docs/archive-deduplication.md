# Deduplicação estrutural local do acervo

`scripts/archive_deduplicate.py` consome o SQLite produzido pelo inventariador, seleciona somente
grupos com tamanho repetido e calcula SHA-256 em streaming. Arquivos de tamanho único não são lidos.
O processo não interpreta PDFs ou outros formatos e não modifica a árvore de origem.

As saídas (`dedup.sqlite3`, `duplicate-summary.md`, `duplicate-groups.ndjson` e `dedup.log`) são
índices operacionais locais, não artefatos canônicos. Duplicata binária não significa cópia
descartável: todos os caminhos são preservados para análise posterior de proveniência.

```powershell
python scripts/archive_deduplicate.py --inventory ".local/archive-inventory/informodinamica-tudo/inventory.sqlite3" --output ".local/archive-dedup/informodinamica-tudo" --progress-every 10
```

Os relatórios são UTF-8. No Windows PowerShell legado, use `Get-Content -Encoding UTF8` para evitar
mojibake ao exibi-los.
