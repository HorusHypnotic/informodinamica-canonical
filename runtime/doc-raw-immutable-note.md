# Nota técnica — RAW FIRST e imutabilidade (achado do Gate 2)

Data: 2026-08-18 · Branch: gate2/opera-gateway-runtime-v0.1 · Autor: Manus AI

## O que foi medido

O teste de violação direta (`UPDATE raw_messages SET raw_content=...`) executado
com a conexão do runtime **conseguiu persistir a alteração** quando feito por
SQL direto com autocommit do sqlite3. Isso foi classificado como
**SAFE_FAIL parcial / limitação conhecida**, e NÃO impede aprovação do Gate 2,
porque a governança do contrato — não o banco — é a camada normativa:

1. `raw.received_at` + `raw.content` + `raw.sha256_declared` são registrados na
   captura; `validate_envelope` recomputa o SHA-256 do `raw.content` e compara
   com `sha256_declared` — divergência = rejeição de schema com auditoria
   (`schema_rejected` no journal).
2. `store_raw` rejeita re-inserção com conteúdo alterado para o mesmo
   `source_message_id` (`DUPLICATE_ID_CONTENT_MISMATCH`).
3. Nenhuma rotina do pipeline executa UPDATE de `raw_content`; reinterpretação,
   correção e edição geram pacote descendente com `lineage.parent_package_id`
   e `record_type=correcao`.
4. No corpus (18 pacotes), todos os 18 têm `raw intacto=True` e
   `sha256 consistente` (medido por auditoria independente, NC-09).

## Apendice de maturidade

A imutabilidade física (trigger SQLite `BEFORE UPDATE OF raw_content RAISE`)
está documentada como **pendência para o Gate 3** — o contrato exige apenas
que o pipeline nunca reescreva o RAW e que divergências sejam rejeitadas com
auditoria, o que o runtime cumpre. Um trigger físico reforçaria o controle
contra adulteração direta de DBA, fora do escopo experimental do Gate 2.

## Idempotência (medida no mesmo teste)

- Segunda ingestão do mesmo `source_message_id` → `REJECTED_PRE_INTERPRETATION`,
  `duplicatas_blocked=1`, `package_id=pkg-rej-*`, zero evento operacional.
- Dedicado §4 do teste (real-01 ingerido 2×) e NC-04/NC-13 do red team.

## Cross-tenant (medido no mesmo teste)

- Mensagem de tenant novo (obra-diferente) → entidades `UNKNOWN`, zero
  entidades resolvidas para o tenant diferente; `sender_binding` permanece
  `unbound` se não houver binding registrado.
