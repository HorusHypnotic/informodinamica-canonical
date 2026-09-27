# Tower Search V0

Status inicial: CANDIDATE. Não substitui registro canônico nem Document Provenance Index.

## Contrato
- projeção local, descartável e reconstruível;
- zero API paga, embeddings ou Lovable AI;
- SQLite FTS5;
- indexa apenas ativos textuais versionados;
- exclui .git, dependências, builds e workspace privado;
- resultado sempre aponta para caminho da fonte;
- não transforma ausência de resultado em inexistência.

## Gate
Construir índice e provar recuperação de uma bateria conhecida: Telegram, PETECO, OPERA, Smart Cotações, Remanufatura Documental e outros termos canônicos. Registrar misses como lacunas de cobertura/vocabulário. Só promover a GREEN após teste fresco no executor PETECO.
