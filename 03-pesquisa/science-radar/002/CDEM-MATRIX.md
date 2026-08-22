# CDEM-MATRIX.md

## Legenda

**C** = previsão diferenciadora; **D** = conflito; **E** = não testado; **M** = possível falha de mensuração. A matriz não transforma compatibilidade em confirmação. Cada linha contém uma região inconclusiva obrigatória.

| ID | Claim | Classe | Evidência atual | Concorrente | Inconclusivo |
|---|---|---|---|---|---|
| CDEM-001 | X/C acrescenta previsão além de histórico convencional | D local + M | MH venceu/empatou M3; `SIGNAL KILLED` [4] | volume, severidade e duração históricas | ganho apenas contra M0 ou proxy não independente |
| CDEM-002 | Estado representacional acrescenta previsão para falhas internas | E | Não testado com medida independente; HYP-001 em investigação [1] [11] | histórico, carga, rotina, recursos | ausência de medida ou domínio inadequado |
| CDEM-003 | Coordenação persistente é mediada por representação | E | Literatura externa compatível, não exclusiva [15] [16] | rotinas, competências, regras locais | representação não observada não exclui existência |
| CDEM-004 | Deformação precede ECO | E + M | HYP-001-U é Draft; sem dados de campo [3] [11] | falhas exógenas, recursos, contexto | janela de detecção ou registro insuficiente |
| CDEM-005 | Restaurar representação restaura coordenação | E | LAW-004 em validação; nenhum teste causal suficiente [1] [9] | treinamento, mudança de rotina, recursos | intervenção altera vários fatores |
| CDEM-006 | Deformação tem taxonomia específica de cinco mecanismos | E | Taxonomia provisória, emergida de aplicação TDO [1] | falhas de comunicação/informação já classificadas | classificação e cobertura ainda não validadas |
| CDEM-007 | Alta eficiência gera invisibilidade/rigidez e falha silenciosa | E | HYP-003 é agenda de pesquisa [1] | dependência de caminho, rotinas, complacência | constructos não operacionalizados |
| CDEM-008 | Coordenação pode persistir sem qualquer representação persistente | D potencial, não observado | Critério de falseabilidade, sem caso válido identificado [1] [2] | regras locais podem contar como representação | ausência de evidência não prova impossibilidade |
| CDEM-009 | HYP-002: OPERA reduz ECO/ICO e aumenta Capital Preservado | E | Registro empírico sem dados; protocolo pendente [3] [11] | seleção, maturidade, recursos e intervenção Hawthorne | sem randomização/poder suficiente |
| CDEM-010 | Métricas ICO/IFX representam adequadamente corrosão/resiliência | M | Em calibração; fórmulas compostas [1] | outcomes diretos, séries temporais, custos auditados | mudança de métrica sem validação independente |

## Resultado do gate

Não foi encontrado C. Foram encontrados um D localizado, vários E e M condicionais. O D não deve ser inflado para uma refutação global. Os E representam o núcleo que ainda precisa de teste discriminante; os M indicam onde um resultado estranho pode ser consequência de instrumento, proxy, escala temporal, seleção ou contexto.

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

