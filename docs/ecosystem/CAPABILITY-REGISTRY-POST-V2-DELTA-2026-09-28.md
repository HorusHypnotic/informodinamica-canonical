# Delta de Biblioteca de Capacidades — Pós-Registry V2 — 2026-09-28

## Estado de origem

Fonte ativa encontrada: `docs/ecosystem/CAPABILITY-REGISTRY-V2.md` + `ecosystem/capabilities-v2.json`, checkpoint 2026-08-13.

Baseline:
- 10 capabilities classificadas CANONICAL: CAP-001..009 e CAP-011;
- CAP-010 permanece CANDIDATE;
- famílias locais/candidatas preservadas sem promoção automática;
- SYS-007 OPERA Atlas existe como OPERATIONAL, com restore independente ainda UNKNOWN.

## Delta observado

A operação de setembro descreve mecanismos posteriores ao Registry V2 que ainda não foram encontrados indexados no registro por busca canônica:

1. Motor de Demanda Territorial
   - external_signal -> normalização -> deduplicação/recorrência -> COVERED | GAP | UNKNOWN
   - DEMAND separado de OFFER/ADVERTISING
   - privacy-by-minimization para sinais externos
   - classificação: CANDIDATE_FAMILY

2. Recorrência de Demanda Externa
   - recurrenceKey, occurrence_count, first_observed_at, last_observed_at
   - somente DEMAND incrementa recorrência
   - classificação: CANDIDATE_FAMILY

3. Attention Bus / Delivery
   - producer -> attention_events -> attention_deliveries -> PÉTECO -> Telegram -> VI -> ACK
   - transporte direto não prova pipeline completo
   - classificação: CANDIDATE_FAMILY

4. PÉTECO / Command Bus executor pattern
   - GitHub -> Command Bus -> PÉTECO -> teste/build/evidência
   - RUN != START != PASS/FAIL
   - jobs vinculados a SHA quando a prova depende da versão
   - classificação: CANDIDATE_FAMILY

5. Credential/Compute Abuse Gate
   - rastreado na issue #23
   - secret leak, privilege, execution, compute/cost, token lifecycle, MCP/router, incident evidence, fail-closed
   - classificação: CANDIDATE

## Regra de promoção

Nenhum item acima recebe novo CAP-* nesta atualização.

Para entrar no registry compartilhado precisa provar:
1. contrato independente de produto;
2. limites explícitos;
3. evidência versionada;
4. pelo menos um teste independente;
5. ausência de duplicação funcional com CAP existente;
6. quando aplicável, reuso real suficiente para justificar extração.

Aplicar: REUSE -> ADAPT -> CREATE ONLY IF ABSENT.

## Busca

Até atualização formal do Registry, consultas de remanufatura devem pesquisar:
1. `ecosystem/capabilities-v2.json`;
2. `ecosystem/systems-v2.json`;
3. este delta;
4. documentação/evidência específica mais recente;
5. código do sistema fonte quando a prova documental for insuficiente.

Ausência no Registry V2 não prova ausência no ecossistema.

## UNKNOWNs

- cobertura exaustiva de todas as capacidades criadas após 2026-08-13;
- estado fresco do código Vitrine/PÉTECO para cada família;
- teste independente das famílias acima;
- necessidade de novos CAP IDs;
- integração de busca semântica/RAG;
- restore independente do OPERA Atlas.

## Estado

CANDIDATE INVENTORY DELTA. Não altera o Registry V2 nem promove capability.
