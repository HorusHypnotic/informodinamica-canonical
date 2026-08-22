# TPC-CANONICAL-EXTRACT.md

## Proveniência e regra de escopo

Este extrato foi reconstruído diretamente do repositório `HorusHypnotic/informodinamica-canonical`, na revisão observada em **SHA `48000f3269e07e3c9d80b84de3cbcbff0ef77e5e`**. A fonte primária é `01-teoria/TPC.md` [1], complementada por `AXIOMAS_E_PROPOSICOES.md` [2], `03-pesquisa/PROTOCOLO_EXPERIMENTAL.md` [3] e `experiments/TPC-GATE-RETRO-002/report/TPC-GATE-LOCAL-SIGNAL-BREAKER.md` [4]. O status dos documentos é candidato, revisão fundacional ou Draft; portanto, “canônico” aqui significa **patrimônio canônico do repositório**, não teoria empiricamente validada.

## Núcleo sobrevivente

| Elemento | Formulação vigente | Estado | Testabilidade |
|---|---|---|---|
| Objeto | Persistência de representações operacionais em sistemas coordenados | Candidato em revisão | Requer definir representação, estado, agentes, tarefa e ambiente |
| Postulado | Persistência da coordenação depende de representações operacionais persistentes e interpretáveis | Candidato, condicional | Testável por comparação com baseline sem atributos representacionais |
| A1–A5 | Estado variável; atributos operacionais; interpretação condicionada; coordenação relacional; degradação/estabilidade/recuperação possíveis | Axiomas defeasible | Só geram previsões após domínio e operacionalização |
| LAW-001 | Coordenação persistente é mediada por representações operacionais no domínio da TPC | Em validação | Precisa identificar mediação e casos sem representação |
| LAW-002 | Integridade funcional pode sustentar coordenação persistente quando agentes, tarefa e ambiente são compatíveis | Em validação | Requer medir integridade e coordenação ao longo do tempo |
| LAW-003 | Deformação inclui perda, atraso, substituição, ambiguidade e fragmentação | Taxonomia provisória | Requer classificação independente, cobertura e validade de constructo |
| LAW-004 | Capacidade coordenadora pode ser restaurada por preservação/reconstrução das representações | Em validação | Exige intervenção, comparador e desfecho separado de recuperação |
| HYP-001 | Falhas internas tendem a ser precedidas por perda não corrigida de atributos/capacidade das representações relevantes | Proposição teórica em investigação | Incremento preditivo sobre baseline sem atributos representacionais |
| HYP-002 | Piloto com OPERA teria menos ECOs e maior Capital Preservado que controle | Não iniciada | Quase-experimento; amostra, randomização e métricas ainda são limitações |
| HYP-003 | Quanto mais eficiente a representação na coordenação coletiva, mais invisível/rígida e vulnerável a deformação silenciosa | Agenda de pesquisa | Precisa de medidas de eficiência, invisibilidade, rigidez e deformação |

## Definições operacionais relevantes

`IDR-0002 Representação Operacional` é uma estrutura portadora de estado com relação especificável a objeto, condição, regra ou ação, interpretável por agentes/mecanismos e potencialmente preservável, transmitida ou transformada. Compartilhamento e sucesso coordenacional não são requisitos definicionais [1]. `IDR-0004 Deformação` é alteração que reduz atributos do estado operacional ou a capacidade de sustentar interpretações compatíveis. `IDR-0006 Persistência da coordenação` é propriedade secundária de manter ações compatíveis ao longo do tempo sob dependência de representações persistentes e condições adequadas. `IDR-0010 ECO` é uma falha observável de coordenação necessária à ação, não uma medida direta de toda degradação [1] [10].

## Variáveis, métricas e seu estatuto

O modelo distingue `EO(S,t)` — estado da representação, `K_R(S,t;A,T,Z)` — capacidade coordenadora condicionada a agentes, tarefa e ambiente, e `K_C(A,S,t)` — coordenação observada. As métricas ECO, ICO, IFX, Capital Preservado e Slektip existem como instrumentos candidatos/em calibração, não como medidas validadas. Em particular, ICO = impacto × recorrência × persistência e IFX = sensibilidade + precisão + velocidade + aprendizado [1].

## Falseabilidade vigente

A fonte canônica declara três critérios: (1) coordenação persistente sem qualquer representação persistente, incluindo regras locais codificadas; (2) estado/capacidade representacional não acrescentar explicação ou previsão para falhas internas após controles adequados; (3) intervenções representacionais não alterarem coordenação nos domínios e condições em que a teoria prevê efeito [1]. O protocolo operacional exige ainda classificar exceções como `REFUTATION`, `UNOBSERVED_PRECURSOR`, `MISSING_DATA`, `MEASUREMENT_FAILURE` ou `OUT_OF_DOMAIN`, sem converter automaticamente evidência contrária em precursor não observado [3].

## Mortos, reclassificados ou não canônicos

Os antigos A6 e A7, que afirmavam acúmulo necessário e limiar determinístico, foram reclassificados como hipóteses de modelo; não são axiomas [2]. A formulação operacional HYP-001-U é explicitamente `DRAFT_EXPERIMENTAL`, não a hipótese canônica [3]. As extensões HYP-004 em diante e modelos exploratórios não devem ser usados como núcleo sobrevivente sem nova decisão canônica [1] [12].

## Questões abertas

Permanecem abertas a validade de constructo de `EO`, `D`, `K_R`, `K_C` e ECO; a contribuição incremental frente a cognição distribuída, cognição de equipes, resiliência e histórico operacional; a separação entre representação e seus correlatos; a estabilidade temporal; a generalização para outros domínios; e a existência de um teste que discrimine TPC de modelos históricos convencionais. O registro de validação empírica está sem dados coletados e marca HYP-001/HYP-002 como não testadas [11].

## Referências
## Referências externas e internas

[1]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/01-teoria/TPC.md "TPC.md — núcleo canônico em revisão fundacional"
[2]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/AXIOMAS_E_PROPOSICOES.md "Axiomas e Proposições da TPC"
[3]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/03-pesquisa/PROTOCOLO_EXPERIMENTAL.md "Protocolo Experimental — HYP-001-U e HYP-002"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/experiments/TPC-GATE-RETRO-002/report/TPC-GATE-LOCAL-SIGNAL-BREAKER.md "RETRO-002 — Local Signal Breaker"
[5]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/experiments/TPC-GATE-RETRO-001/report/TPC-GATE-EXPERIMENTAL.md "RETRO-001 — primeiro teste retrospectivo"
[6]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/laws/LAW-001-mediacao.md "LAW-001 — Mediação Representacional"
[7]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/laws/LAW-002-persistencia.md "LAW-002 — Persistência Representacional"
[8]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/laws/LAW-003-deformacao.md "LAW-003 — Deformação Representacional"
[9]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/laws/LAW-004-resiliencia.md "LAW-004 — Resiliência Representacional"
[10]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/metrics/MET-001-ECO.md "MET-001 — ECO"
[11]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/03-pesquisa/VALIDACAO_EMPIRICA.md "Registro de validação empírica"
[12]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/48000f3269e07e3c9d80b84de3cbcbff0ef77e5e/03-pesquisa/MATRIZ_CONCEITO_HIPOTESE_METRICA_TESTE.md "Matriz conceito–hipótese–métrica–teste"
[13]: https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log "UCI Dataset 498 — Incident Management Process Enriched Event Log"
[14]: https://doi.org/10.24432/C57S4H "DOI do UCI Dataset 498"
[15]: https://doi.org/10.3389/fpsyg.2016.01531 "Technology as Teammate: External Cognition and Team Cognitive Processes"
[16]: https://pmc.ncbi.nlm.nih.gov/articles/PMC5510246/ "Developing team cognition: A role for simulation"
[17]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6593277/ "What, When, and How to Measure Team Dynamics Over Time"
[18]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6149308/ "Internal, External, and Ecological Validity in Research Design"
[19]: https://pubmed.ncbi.nlm.nih.gov/34529945/ "Design of observational studies and target trial emulation"
[20]: https://clinicaltrials.gov/data-api "ClinicalTrials.gov Data and API"
[21]: https://openalex.org/ "OpenAlex"
[22]: https://europepmc.org/RestfulWebService "Europe PMC RESTful Web Service"
[23]: https://api.crossref.org/ "Crossref REST API"

