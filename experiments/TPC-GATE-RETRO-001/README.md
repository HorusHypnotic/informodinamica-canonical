# TPC-GATE-RETRO-001

**Tipo:** primeiro teste retrospectivo com dados públicos reais  
**Domínio:** operações de TI  
**Estado:** snapshot experimental congelado  
**Gate final:** `LOCAL SIGNAL`  
**Próximo Gate:** `TPC-GATE-RETRO-002 — LOCAL SIGNAL BREAKER`

## Objetivo

Testar se conhecer efeitos persistentes de perturbação (**X/EPP**) e estado de reserva (**C**) melhora a previsão da resposta ao próximo incidente além de conhecer apenas a perturbação (**P**), o output observado (**O**) e o estado inicial (**S₀**).

## Dataset e proveniência

Fonte: **UCI Machine Learning Repository**, dataset 498, *Incident management process enriched event log*, DOI [10.24432/C57S4H](https://doi.org/10.24432/C57S4H), [página oficial do UCI](https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log). O conjunto foi extraído do sistema de auditoria de uma instância ServiceNow usada por uma empresa de TI e enriquecido com dados relacionais. A licença é Creative Commons Attribution 4.0 International.

A amostra pública contém **141.712 eventos** e **23.362 incidentes agregados** após a preparação analítica. O arquivo original possui 36 atributos, incluindo identificador de incidente, estados, contagens de reatribuição e reabertura, timestamps de abertura/atualização/resolução/fechamento, impacto, urgência, prioridade, grupo de atendimento, SLA e atributos relacionados.

## Resultado congelado

| Modelo | MAE |
|---|---:|
| `P + O + S₀` | **185,32 h** |
| `P + O + X + C` | **180,85 h** |
| Ganho | **2,42%** |

O modelo com X/C produziu pequeno ganho preditivo fora da amostra neste dataset. O ganho é exploratório, baseado em proxies históricos de backlog e throughput, e não constitui demonstração de causalidade ou de uma variável universal.

## Interpretação permitida

É permitido afirmar que, neste dataset de operações de TI, variáveis históricas anteriores ao próximo incidente apresentaram pequeno ganho preditivo fora da amostra em relação ao baseline baseado em P, O e estado inicial.

## Interpretação proibida

O resultado **não** confirma a TPC, não demonstra causalidade, não demonstra transversalidade, não estabelece EPP como variável universal e não constitui `ROBUST LOCAL SIGNAL`.

Também não é permitido interpretar os proxies de backlog e throughput como medidas diretas de dano, dívida técnica ou capacidade latente. O teste `Δt < Tr` não foi confirmatório porque o dataset não fornece um Tr independente e defensável.

## Estrutura do pacote

```text
TPC-GATE-RETRO-001/
├── README.md
├── report/
│   └── TPC-GATE-EXPERIMENTAL.md
├── src/
│   └── analyze_tpc_gate.py
├── results/
│   ├── model_results.csv
│   ├── robustness_results.csv
│   └── delta_tr_summary.csv
└── data/
    └── tpc_analysis_rows.csv
```

O CSV bruto do UCI não é duplicado neste snapshot por tamanho e licenciamento; a proveniência e o URL oficial estão registrados no relatório e neste README. O script baixa e prepara o dataset por URL oficial quando executado em ambiente com acesso à internet.

## Preservação e genealogia

Este diretório é um snapshot congelado do primeiro Gate retrospectivo. Outputs não devem ser sobrescritos por experimentos posteriores. Correções futuras devem preservar a genealogia, registrar o motivo e gerar um novo identificador experimental. O próximo estudo deve produzir seus próprios arquivos em `TPC-GATE-RETRO-002`.

**NEXT_GATE:** `TPC-GATE-RETRO-002 — LOCAL SIGNAL BREAKER`
