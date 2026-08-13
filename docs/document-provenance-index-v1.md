# Document Provenance Index V1

**Status:** ACTIVE — índice operacional local 1.0.0

## Arquitetura

`scripts/document_provenance_index.py` descobre manifests JSON, valida cada um pelo Document
Provenance Contract V1 e projeta relações em SQLite. Manifest e arquivos continuam sendo a fonte; o
banco é descartável e reconstruível. Ele não abre conteúdo documental nem procura originais ou
derivados fora dos manifests.

O build usa arquivo temporário e substituição atômica. Manifests inválidos entram em `manifests` e
`findings` como `BLOCKED`, sem reparo; dados inválidos não são promovidos às tabelas genealógicas.

## Schema interno

- `meta`: versão, status e digest lógico;
- `manifests`: referência relativa, hash do manifest, status e erro;
- `sources`: SHA-256, `doc_id`, tamanho, formato e inventário;
- `events`: fonte, operação, ferramenta/versão, parâmetros, tempos, status e abstention;
- `derivatives`: identidade, fonte/evento e validação;
- `warnings`: warnings por evento/derivado;
- `findings`: severidade, código, referência, entidade e mensagem.

Foreign keys protegem `events → sources` e `derivatives → sources/events`. O digest lógico usa JSON
canônico de relações e findings, não bytes físicos do SQLite.

## Build, rebuild e verificação

```powershell
python scripts/document_provenance_index.py build `
  --manifests .local/document-provenance/manifests `
  --output .local/document-provenance/index.sqlite3

python scripts/document_provenance_index.py verify `
  --index .local/document-provenance/index.sqlite3 `
  --manifests .local/document-provenance/manifests
```

Rebuild usa o mesmo comando `build`; o índice anterior pode ser apagado porque nenhuma genealogia
existe exclusivamente nele. `verify` executa `PRAGMA integrity_check`, foreign-key check e, quando
recebe a raiz de manifests, refaz a projeção em memória e compara o digest lógico.

## Consultas

```powershell
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type doc --value DOC-00000000
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type source --value <sha256>
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type events --value <sha256>
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type derivatives --value <sha256>
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type derivative --value DER-0000000000000000
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type validation --value DER-0000000000000000
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type abstained
python scripts/document_provenance_index.py query --index .local/document-provenance/index.sqlite3 --type findings
```

`doc` retorna identidades de conteúdo, não localizações privadas. A ligação a caminhos físicos
continua responsabilidade de índices locais separados.

## Matriz de integridade

| Resultado | Condições |
|---|---|
| `PASS` | manifests válidos, relações reconstruíveis, banco íntegro e digest equivalente |
| `WARN` | `ABSTAINED`, processamento `FAILED`, `NOT_VALIDATED`, `PASS_WITH_WARNINGS` ou validação `FAIL`, todos representados conforme V1 |
| `BLOCKED` | manifest/schema inválido, identidade conflitante, órfão, referência quebrada, corrupção SQLite ou divergência entre índice e manifests |

O comando retorna exit code 2 para `BLOCKED`. `WARN` é evidência operacional válida e retorna zero.

## Privacidade e limites

SQLite e outputs ficam em `.local/`. Manifests reais podem conter informação privada e não devem ser
versionados. O índice não verifica bytes de source/derivative porque esta missão proíbe abrir conteúdo
real; essa verificação permanece disponível no validador V1 quando bytes forem explicitamente
fornecidos. Não há watcher, scheduler, busca textual, RAG ou serviço residente: periodicidade é
responsabilidade de invocação externa futura.
