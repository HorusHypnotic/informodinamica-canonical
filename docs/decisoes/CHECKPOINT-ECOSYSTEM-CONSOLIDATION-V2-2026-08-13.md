# Checkpoint — Ecosystem Consolidation V2 — 2026-08-13

## Decisão

A rodada de Special Reviews está formalmente encerrada. O estado patrimonial consolidado está em:

- `docs/ecosystem/ECOSYSTEM-MAP-V2.md` e `ecosystem/systems-v2.json`;
- `docs/ecosystem/CAPABILITY-REGISTRY-V2.md` e `ecosystem/capabilities-v2.json`;
- `docs/ecosystem/SYSTEMS-ROADMAP-V2.md` e `ecosystem/roadmap-v2.json`.

Os artefatos V1 permanecem snapshots históricos íntegros.

## Sistemas e genealogias consolidados

Foram incorporadas as evidências das reviews de Obra Flow/Pedidos COD, StockFlow, Vaga Quente, Vitrine Digital, Memória de Vendas, Direcione, QFD-OS e Margin Narrative Engine. Genealogias confirmadas:

- `Canteiro Digital → Pedidos COD → Obra Flow` (`RENAMED_SUCCESSOR`);
- `GestãoCanteiro → StockFlow` (`PREDECESSOR`);
- `Motor de Margem → Margin Navigator → Fábrica de Provas / Dossiê Vivo` (`RENAMED_SUCCESSOR`).

Nenhuma semelhança entre Direcione, QFD-OS, OPERA ou TPC/TDO foi promovida a linhagem.

## Capabilities

CAP-001–009 e CAP-011 permanecem `CANONICAL` em seus escopos. CAP-010 permanece `CANDIDATE`, sem contrato compartilhado. Capabilities temporárias das reviews foram avaliadas e mantidas `CANDIDATE` ou `SYSTEM_LOCAL`; nenhuma foi promovida automaticamente.

## Patrimônio congelado

Cofre, PDIC, família territorial, Remanufatura Documental, StockFlow, Build Fast Delivery, Direcione, QFD-OS e Margin Narrative/Fábrica de Provas permanecem `FROZEN`. Vaga Quente permanece `LATER` e operacionalmente congelado até evidência bilateral consentida. Congelamento preserva código, conhecimento, história e opções futuras sem criar backlog.

## Próximos de uso, valor e receita

- `NEAR_TO_USE`: Vision, Obra Flow e Smart Cotações.
- `NEAR_TO_VALUE`: Memória de Vendas para uso interno; Direcione, QFD-OS e Margin Narrative como estudo/capability source.
- `NEAR_TO_REVENUE`: Smart Cotações; Vitrine Digital para serviço assistido. Não há receita comprovada.

## Overlaps principais

Obra Flow/StockFlow, Direcione/QFD-OS e Atlas/Cofre têm overlap sem autorização de fusão. Vitrine/Smart Cotações e Margin Narrative/Remanufatura são complementares. Margin Narrative/OPERA é somente `POSSIBLE_INTEGRATION`. QFD-OS não é `EVIDENCE_INFRASTRUCTURE`; Margin Narrative não é `PROOF_INFRASTRUCTURE`.

## Remanufatura Documental

`DOCUMENT REMANUFACTURING PIPELINE = BASELINE ESTABLISHED`. DIRECT_MD permanece `EXPERIMENTAL / RED / FROZEN`. Provenance Contract V1, Provenance Index V1, Safe Document Representation V1, Textual-Safe Route V1 e Textual Evidence Producer V0 permanecem GREEN nos escopos publicados. Real Document Dogfood permanece `ABSTAINED`. `GAP-P13-001 — PDF Observation Admission Bridge` permanece aberto e não foi implementado.

## UNKNOWNs preservados

Uso real, usuários, deployments, bancos, receita, demanda, qualidade de corpus, segurança e genealogias não documentadas permanecem desconhecidos onde as reviews determinaram. CRM, Empreita OS, Urbano Logística, Estoque Oculto, Build Fast Delivery, Checklist Chuva e “institucional” permanecem `UNREVIEWED / DOCUMENTED_ONLY / UNKNOWN`.

## Regra futura

Não iniciar nova arqueologia, procurar candidatos, desenvolver, integrar ou reativar ativo por consequência deste checkpoint. Nova investigação exige decisão futura explícita do owner e missão limitada. Este checkpoint encerra pesquisa; não inicia a próxima fase.

## Revisão de governança

Esta consolidação não altera Constituição, Documento Canônico, Glossário, TPC/TDO, produtos OPERA ou contratos de Remanufatura. Não cria IDs teóricos. Classificações são proporcionais às Special Reviews e falseáveis por nova evidência versionada.

## Validação e pendências

- JSON V2: parse válido; 23 IDs de sistema únicos e sequenciais; 11 IDs de capability únicos; referências de evidência, genealogia, overlap e roadmap resolvidas.
- Validador V1 preservado: PASS para 18 sistemas, 11 capabilities e nove sprints do snapshot histórico.
- Suíte canônica `tests/`: 131 testes e 28 subtests PASS.
- Coleta global de `pytest`: interrompida por erro preexistente de import em `lab/ci-cd-reference-system/tests/test_main.py` (`app` fora do path); o laboratório não foi alterado e não integra o contrato V2.
- `git diff --check`: PASS.
- Varredura dos sete artefatos por padrões de secrets/PII: nenhum achado.
- Pendências: validators dedicados ao schema V2 ainda não são artefatos permanentes; a checagem cruzada desta consolidação foi executada offline. UNKNOWNs operacionais permanecem no mapa.
