# Ecosystem Map V2

**Data:** 13 de agosto de 2026

**Status:** ACTIVE — consolidação patrimonial baseada exclusivamente em evidência versionada

O V2 encerra a rodada de Special Reviews. O snapshot V1 permanece preservado. Este mapa não inicia sistemas, integrações ou sprints; o registro estruturado autoritativo desta versão é `ecosystem/systems-v2.json`.

## Regra de evidência

`FACT` é estado diretamente sustentado por código/documento revisado; `EVIDENCE` é a referência versionada; `INFERENCE` é comparação limitada; `HYPOTHESIS` exige teste; `UNKNOWN` permanece explícito. Similaridade não é genealogia, interface não prova operação, código não prova mercado e evidência estruturada não é prova verificável.

## Portfólio consolidado

| ID | Sistema | Identidade/função comprovada | Estado | Prioridade |
|---|---|---|---|---|
| SYS-001–004 | Informodinâmica, TPC, TDO, OPERA Research | programa teórico e pesquisa | CONCEPT/PROTOTYPE | NEXT |
| SYS-005 | Copiloto de Obras | assistente operacional | FROZEN | NOW condicionado |
| SYS-006 | OPERA Control | controle operacional | OPERATIONAL | NEXT |
| SYS-007 | OPERA Atlas | baseline, histórico e memória operacional | OPERATIONAL | LATER |
| SYS-008 | OPERA Vision | visão operacional compartilhável | RELEASE_GREEN | NOW |
| SYS-009 | Cofre de Memória Absoluta | protótipo de custódia | FROZEN | FROZEN |
| SYS-010 | Smart Cotações | serviço de cotação assistida | FUNCTIONAL_GREEN | NOW |
| SYS-011 | Obra Flow | suprimentos local-first; produto recuperável | FUNCTIONAL_GREEN | NOW |
| SYS-012 | PDIC | conceito de integração | FROZEN | FROZEN |
| SYS-013 | Radar/OPERA Territorial | família territorial não fundida | FROZEN | FROZEN |
| SYS-014 | Canteiro de Obras Digital | serviço/conceito e caso de pesquisa | CONCEPT | NEXT |
| SYS-015 | Remanufatura Documental | infraestrutura documental segura | BASELINE_ESTABLISHED | FROZEN |
| SYS-016 | StockFlow | gestão de recursos/custódia; produto recuperável | FROZEN | FROZEN |
| SYS-017 | Vaga Quente | vertical independente de matching | FROZEN | LATER |
| SYS-018 | Build Fast Delivery | não revisado | UNREVIEWED | FROZEN |
| SYS-019 | Vitrine Digital | software-serviço e geração de leads | FROZEN | NEXT |
| SYS-020 | Memória de Vendas | infraestrutura interna de conhecimento comercial | FROZEN | NEXT |
| SYS-021 | Direcione Operacional | coordenação, atenção e memória operacional | FROZEN | FROZEN |
| SYS-022 | QFD-OS | decisão, execução de campo e aprendizagem | FROZEN | FROZEN |
| SYS-023 | Margin Narrative / Fábrica de Provas | motor narrativo orientado por eventos/evidências | FROZEN | FROZEN |

## System Genealogies

Somente relações comprovadas:

```text
DIRECT LINEAGE / RENAMED SUCCESSOR
Canteiro Digital → Pedidos COD → Obra Flow
Motor de Margem → Margin Navigator → Fábrica de Provas / Dossiê Vivo

PREDECESSOR
GestãoCanteiro → StockFlow
```

Pedidos COD é fase/nome histórico da implementação tecnológica do Obra Flow. Uma identidade institucional futura separada permanece `DOCUMENTED_ONLY / UNKNOWN`. Direcione/QFD-OS e sistemas OPERA exibem similaridades e possíveis antecedentes, mas não `DIRECT_LINEAGE`.

## Perfis críticos

### Margin Narrative Engine

`FACT_MODEL=NONE`; `EVIDENCE_MODEL=STRUCTURED_EVIDENCE`; `INTEGRITY_MODEL=WEAK`; `CHAIN_OF_CUSTODY=AUDIT_ONLY`; `CLAIM_MODEL=IMPLICIT`; `PROOF_PACKAGE=REPORT_ONLY`; `TRACEABILITY=PARTIAL`. Portanto, é `NARRATIVE_ENGINE`, nunca `PROOF_INFRASTRUCTURE` no estado atual.

### Remanufatura Documental

`DOCUMENT REMANUFACTURING PIPELINE = BASELINE ESTABLISHED`. DIRECT_MD permanece `EXPERIMENTAL / RED / FROZEN`. Provenance Contract, Provenance Index, Safe Representation, Textual-Safe Route e Textual Evidence Producer estão GREEN em seus escopos documentados. O primeiro dogfood real foi `ABSTAINED`; `GAP-P13-001 — PDF Observation Admission Bridge` permanece aberto e não foi implementado.

## Overlap Map

| Relação | Classificação | Limite |
|---|---|---|
| Obra Flow × StockFlow | OVERLAP | pedido/recebimento/estoque versus recursos/custódia; não fundir |
| Memória de Vendas × CRM | DISTINCT + COMPLEMENTARY | extensão CRM leve, sem CRM completo comprovado |
| Vitrine Digital × Smart Cotações | COMPLEMENTARY | descoberta/lead pode anteceder cotação; sem integração |
| Direcione × QFD-OS | OVERLAP | priorização, coordenação e memória; sem genealogia direta |
| QFD-OS × OPERA | CAPABILITY_SOURCE | estruturas comparáveis; não evidence infrastructure |
| Margin Narrative × OPERA | POSSIBLE_INTEGRATION | eventos poderiam alimentar narrativa; não aprovado |
| Margin Narrative × Remanufatura | COMPLEMENTARY | possível consumo de provenance/representação, sem equivalência |
| Atlas × Cofre | OVERLAP | memória/snapshot versus custódia; ownership pendente |
| família territorial | UNKNOWN | implementações e schemas não consolidados |

`POSSIBLE_INTEGRATION` não constitui roadmap.

## Patrimônio

- **Technological assets:** aplicações React/PWA, modelos Postgres/Dexie, engines de matching, priorização, narrativa e pipelines documentais.
- **Intellectual assets:** TPC/TDO, modelos de coordenação, atenção, evidência, narrativa, aprendizagem e remanufatura segura.
- **Research assets:** Informodinâmica/TPC/TDO, OPERA Research, QFD-OS, Direcione, Margin Narrative e resultados negativos preservados.
- **Knowledge assets:** Memória de Vendas, Atlas, documentação canônica e histories Git.
- **Commercial assets:** Smart Cotações e Vitrine Digital mais próximos; Obra Flow/Vision próximos de uso; receita não comprovada.
- **Data-model assets:** schemas de campo, suprimento, território, matching, memória, evidência e provenance; dados reais não são presumidos.
- **Capability assets:** contratos canônicos e candidatas no Registry V2.
- **Historical assets:** aliases, predecessores, protótipos congelados e reviews forenses.

Não há valuation financeiro.

## Maturidade e valor

O JSON V2 registra separadamente `CODE`, `UI`, `DATA_MODEL`, `TESTS`, `SECURITY`, `OPERABILITY`, `DEPLOYABILITY`, `INTERNAL_VALUE` e `COMMERCIAL_READINESS`. Nenhum percentual único é usado. Valor como produto, ferramenta interna, fonte de capability, pesquisa e IP também é separado de custo de reconstrução.

Achados transversais: várias UIs e modelos estão `NEAR`; testes, segurança e operabilidade frequentemente estão `EARLY/PARTIAL`; nenhum desses estados prova receita. Os ativos mais caros de reconstruir conceitualmente são Informodinâmica/TPC, Direcione, QFD-OS, as genealogias e os contratos documentais.

## Unknowns preservados

Uso, usuários, bancos remotos, deploys, receita, demanda, qualidade de corpus, segurança efetiva e linhagens não documentadas continuam desconhecidos onde as reviews assim concluíram. CRM, Empreita OS, Urbano Logística, Estoque Oculto, Build Fast Delivery, Checklist Chuva e “institucional” permanecem `UNREVIEWED / DOCUMENTED_ONLY / UNKNOWN`; não foram pesquisados nesta consolidação.

## Evidência

Fontes: V1, registros estruturados V1, documentação/checkpoints canônicos e as oito Special Reviews de Obra Flow, StockFlow, Vaga Quente, Vitrine Digital, Memória de Vendas, Direcione, QFD-OS e Margin Narrative Engine. Nenhum repositório-alvo foi reaberto.
