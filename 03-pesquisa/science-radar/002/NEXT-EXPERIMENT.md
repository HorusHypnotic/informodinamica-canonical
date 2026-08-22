# NEXT-EXPERIMENT.md

## Status

Há um candidato de experimento **suficientemente discriminante em princípio**, mas ele não deve ser executado como coleta humana imediata. Primeiro deve passar por uma reanálise do UCI 498 sem `O_first_update_hours` e por um piloto de mensuração de artefatos. Se esses gates falharem, o experimento deve ser abandonado, não ajustado ad hoc.

## Pergunta

Quando uma perturbação interna é aplicada a um sistema coordenado, uma medida independente do estado de sua representação operacional prevê e modula a recuperação da coordenação além de histórico operacional, recursos, competência e rotinas?

## Desenho candidato

O desenho é um estudo longitudinal, multimétodo e pré-registrado em equipes/sistemas sociotécnicos com tarefas repetíveis. Cada unidade teria um artefato operacional identificável, versões e timestamps. A representação seria auditada antes da perturbação em atributos de persistência, fidelidade, atualidade, coerência, rastreabilidade, contexto, ambiguidade e fragmentação. A perturbação seria padronizada e não exógena ao domínio, enquanto agentes, tarefa e ambiente seriam mantidos comparáveis entre condições. O resultado seria coordenação observada, tempo de recuperação, ECO validado por avaliadores cegos e custos registrados separadamente.

O modelo TPC seria comparado a pelo menos três concorrentes: (1) histórico operacional bruto; (2) modelos de team cognition/shared mental models/transactive memory; (3) recursos, carga, competência e rotina. O teste deveria usar split temporal e por unidade, registrar todas as janelas, incluir placebos de ordem temporal e medir a confiabilidade da classificação de deformação. A análise deve estimar incremento fora da amostra e interação entre estado representacional e perturbação, sem transformar uma correlação em mediação causal.

## O que favoreceria TPC

A TPC ganharia suporte se, antes da perturbação, uma medida independente de estado/deformação predissesse recuperação e ECOs com incremento estável sobre todos os concorrentes; se a manipulação de restauração alterasse coordenação; e se o efeito se replicasse em outro sistema, com o mesmo constructo e uma janela temporal pré-declarada.

## O que prejudicaria TPC

A TPC seria ameaçada se a coordenação persistisse sob ablação validada da representação persistente; se deformação validamente medida não precedesse ECOs em condições internas; se a restauração não mudasse coordenação quando os demais fatores fossem mantidos; ou se o estado representacional não acrescentasse previsão após controles adequados, conforme os critérios canônicos [1] [2].

## O que seria inconclusivo

Seria inconclusivo: uma falha sem auditoria de representação; um efeito apenas contra baseline fraco; uma melhoria acompanhada de treinamento ou recursos adicionais; um resultado em uma única equipe; um teste com proxy derivado do desfecho; uma medida estática de fenômeno dinâmico; ou uma ausência de sinal quando o instrumento não tiver validade de constructo, temporal ou ecológica. A região inconclusiva é obrigatória e impede que M funcione como imunização.

## Gate de decisão

O experimento só deve avançar se: a reanálise sem O não deixar leakage; a medida de representação demonstrar confiabilidade e validade de constructo; o protocolo pré-registrar concorrentes, janelas e critérios; o tamanho amostral for calculado; e existir um resultado que realmente possa favorecer uma teoria em detrimento das outras. Caso contrário, a decisão correta é **não coletar**.

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

