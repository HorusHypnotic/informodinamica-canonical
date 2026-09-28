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


## Varredura diferencial — lote 2 / patrimônio 20–25 set

Evidência canônica adicional localizada. Novas famílias candidatas ou extensões de famílias já conhecidas:

6. Market Signal Audit / Information-Loss Detection
   - fonte: `INTELIGENCIA-MERCADO-AUDITORIA-SINAIS-V0.md`
   - distingue sinal persistido de sinal efêmero e explicita viés causado por perda de informação;
   - decisão: ADAPT de CAP-005/CAP-011 antes de considerar CAP nova;
   - classificação: CANDIDATE_PATTERN.

7. Economic Memory / Price Reconfirmation
   - fonte: `SMART-COTACOES-MEMORIA-RECONFIRMACAO-PRECO-V0.md`
   - observação histórica imutável + reconfirmação com nova evidência + freshness separada de validade estatística;
   - decisão: família local de Smart Cotações; possível reuso comercial;
   - classificação: CANDIDATE_FAMILY.

8. Federated State Machine / Cross-System Correlation
   - fonte: `REPLENISHMENT-DECISION-FEDERATED-STATE-MACHINE-V0.md`
   - decision_id/correlation_id, ownership por estado, anti-duplicação, handoffs sem fusão de bancos;
   - decisão: candidato forte a contrato reutilizável, mas ainda sem teste independente;
   - classificação: CANDIDATE_FAMILY.

9. Human-Gated External Handoff
   - fonte: `OBRA-FLOW-HANDOFF-SMART-COTACOES-WHATSAPP-V0.md`
   - objeto estruturado -> formatter puro -> preview editável -> destino -> ação explícita;
   - WhatsApp é transporte, não ledger; OPENED != ORDERED/DELIVERED;
   - decisão: candidato de baixo acoplamento, ainda sem extração independente;
   - classificação: CANDIDATE_PATTERN.

10. External API Adapter Guard Rails
   - fonte: `google-business/INVESTIGACAO-GBP-API-MCP-REMANUFATURA-2026-09-25.md`
   - READ/PREPARE/WRITE, mutations off by default, allowlist, expected fingerprint, dry-run, human gate, before/after ledger;
   - aplicação inicial GBP, padrão potencialmente reutilizável para APIs externas;
   - estado real GBP continua BLOCKED externo enquanto aprovação/quota não forem comprovadas;
   - classificação: CANDIDATE_FAMILY.

## Deduplicação lote 2

- Market Signal Audit sobrepõe CAP-005 Evidence Ledger e CAP-011 Research Governance; não criar CAP agora.
- Price Reconfirmation reutiliza princípios de CAP-005 e patrimônio Smart Cotações; permanece família de domínio.
- Federated State Machine não equivale a CAP-010: correlation/ownership/idempotência entre sistemas é contrato diferente de snapshot/hash/audit.
- Human-Gated Handoff não equivale a integração automática e não autoriza tratar transporte como estado canônico.
- External API Adapter Guard Rails se relaciona ao Credential/Compute Abuse Gate, mas um governa borda de integração/mutação e o outro abuso de credencial/compute. OVERLAP_PARTIAL, não duplicata.

## Cobertura após lote 2

A varredura provou que o patrimônio pós-V2 é maior que o primeiro delta. Ainda não declarar cobertura exaustiva: buscas por termos podem não recuperar artefatos recentes não nomeados de forma consistente. Estado = PARTIAL / CANDIDATE INVENTORY.
