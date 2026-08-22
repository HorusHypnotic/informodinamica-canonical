# PRESERVATION-RECORD.md

| Campo | Valor |
|---|---|
| ID | `SCIENCE-RADAR-004` |
| Data | 2026-08-22 |
| Agente executor | Manus AI |
| Repositório alvo | `HorusHypnotic/informodinamica-canonical` |
| Objetivo | Auditar o patrimônio observacional de PLOS e0204547, POGS e OSF antes de qualquer reanálise |
| Não executado | HYP-001, criação de variável TPC, nova coleta e reanálise estatística |
| Entregáveis | `DATASET-INVENTORY.md`, `PLOS-S1-AUTOPSY.md`, `POGS-OSF-AUTOPSY.md`, `OBSERVATION-GRAPH.md`, `TEMPORAL-AUDIT.md`, `UNOBSERVABLE-WITH-THIS-DATASET.md`, `REANALYSIS-GATE.md` e este registro |
| Dados externos | Não redistribuídos; usados temporariamente para inspeção, com hashes registrados |
| PLOS | DOI `10.1371/journal.pone.0204547`; S1/S2 recuperados por endpoints oficiais; S1 contém 78 CSVs, 65 logs e `team-data.xlsx` |
| POGS | `CCI-MIT/POGS`, commit `5d67d13294c62e5f3d4eb5c72de72bffa2962353`, GPL-2.0 |
| OSF | Nó `qwbaf`, público, licença API `null`; dois CSVs agregados, 29 linhas cada |
| Decisão | PLOS: `REANALYSIS_READY` condicional a cutoff; OSF: `REANALYSIS_BLOCKED` para temporalidade/causalidade |
| Próximo gate | Reproduzir somente uma comparação prospectiva HISTORY ONLY vs HISTORY+NETWORK vs HISTORY+COLLABORATION usando logs brutos e split temporal, depois de validar código e protocolo |

> Princípio aplicado: perguntar primeiro que pedaço da realidade cada dataset conseguiu enxergar; só depois decidir o que vale calcular.
