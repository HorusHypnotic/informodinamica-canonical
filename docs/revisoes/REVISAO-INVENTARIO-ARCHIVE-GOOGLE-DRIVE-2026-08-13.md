# Revisão pré-commit — inventário de metadados do acervo — 2026-08-13

## Escopo

Ferramenta local de Fase 1 para inventariar exclusivamente metadados do filesystem sob uma raiz
informada pelo operador. Inclui script Python stdlib, testes, documentação e ignore específico para
as saídas locais.

## Coerência e autoridade

- Nenhum documento canônico, definição, ID, teoria ou produto OPERA foi alterado.
- O SQLite é explicitamente classificado como índice operacional local, não banco canônico.
- A ferramenta não abre conteúdo dos arquivos-fonte, não segue links simbólicos e não modifica a
  árvore de origem.
- Não há extração, OCR, contagem de páginas, hash de conteúdo, resumo ou conversão documental.

## Validação e achados

- Testes cobrem limite de arquivos, dry-run sem traversal e interrupção segura com SQLite parcial.
- A raiz local `archive/google-drive` existe, mas contém somente dez subdiretórios e zero arquivos
  nesta checkout; o acervo massivo esperado não está materializado localmente.
- Saídas de execução ficam em `/.local/archive-inventory/`, fora do Git.

## Riscos e condição de parada

- Antes da execução completa, o owner deve confirmar que o acervo está montado/hidratado na raiz
  escolhida e que há espaço para o índice SQLite.
- Nomes e caminhos podem conter dados sensíveis; banco, log e resumo devem permanecer locais.
- A missão para no inventariador testado e no comando completo preparado. PDF para Markdown está
  fora do escopo.
