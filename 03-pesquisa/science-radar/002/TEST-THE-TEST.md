# TEST-THE-TEST.md

## Regra

Uma falha de teste não é confirmação da TPC. A classe M só pode ser usada quando há uma característica inadequada do teste, uma razão de por que isso importa e um desenho alternativo capaz de reduzir a dúvida. Validade interna, externa e ecológica são dimensões distintas; instrumentos e estudos podem ser confiáveis sem responder ao construto causal pretendido [18].

## Fichas C/D/E/M

### Ficha 1 — Incremento de estado representacional

| Campo | Conteúdo |
|---|---|
| **CLAIM** | Um estado representacional acrescenta previsão de falhas internas além de baselines convencionais. |
| **TPC_PREDICTION** | HYP-001 prevê que falhas internas tendem a ser precedidas por perda não corrigida de atributos/capacidade e que o estado representacional deve acrescentar poder preditivo [1]. |
| **COMPETING_PREDICTION** | Histórico de volume, severidade, duração, carga, rotina e contexto pode prever o desfecho sem um construto TPC adicional. |
| **CURRENT_EVIDENCE** | RETRO-002 mostrou que o baseline histórico `MH` superou ou empatou M3; o sinal específico `X/C` foi morto [4]. |
| **CURRENT_TEST** | Dataset UCI 498, predição temporal do próximo tempo de resolução, comparação M0/M3/MH/MHXC/NULL_HISTORY. |
| **WHAT_IT_ACTUALLY_MEASURES** | Informação histórica operacional disponível para prever duração de incidentes em um subconjunto de incidentes resolvidos e emparelhados. |
| **POSSIBLE_MEASUREMENT_FAILURE** | `C_capacity_proxy` é derivado do backlog; `O_first_update_hours` pode não estar disponível no instante zero; não há medida independente direta de representação, capacidade, dívida técnica ou estado interno [4]. |
| **ALTERNATIVE_TEST** | Definir representação e estado antes do desfecho; medir independentemente conteúdo, atualidade, rastreabilidade e interpretabilidade; comparar contra histórico forte pré-registrado; usar output mascarado e perturbação padronizada. |
| **WHAT_RESULT_FAVORS_TPC** | Incremento fora da amostra, estável por regime, que persiste contra histórico forte e placebos, com medida independente e intervenção representacional. |
| **WHAT_RESULT_HURTS_TPC** | Ausência de incremento após controles adequados ou coordenação persistente sem representação identificável no domínio. |
| **WHAT_RESULT_IS_INCONCLUSIVE** | Qualquer ganho em relação apenas a M0; melhoria instável; ganho baseado em proxy colinear; ou falha em que o estado não foi medido adequadamente. |
| **CLASS** | D localizado para X/C; E para o núcleo forte; M para a operacionalização atual. |

### Ficha 2 — Mediação representacional

| Campo | Conteúdo |
|---|---|
| **CLAIM** | Coordenação persistente é mediada por representações operacionais. |
| **TPC_PREDICTION** | No domínio declarado, remover/deformar a representação relevante deve alterar coordenação quando agentes, tarefa e ambiente permanecem comparáveis [1] [6]. |
| **COMPETING_PREDICTION** | Coordenação pode emergir de rotinas, acoplamento direto, competências incorporadas, regras locais ou dinâmica social sem um artefato representacional identificável. |
| **CURRENT_EVIDENCE** | Literatura de external cognition e team cognition apoia a importância de artefatos e estruturas de conhecimento, mas não estabelece exclusividade TPC [15] [16]. |
| **CURRENT_TEST** | Não foi encontrado teste canônico que compare sistematicamente presença/ausência de representação com controles de rotina, competência e contexto. |
| **WHAT_IT_ACTUALLY_MEASURES** | Compatibilidade entre artefatos/estruturas cognitivas e desempenho de equipe em estudos externos; não a necessidade universal de representação TPC. |
| **POSSIBLE_MEASUREMENT_FAILURE** | “Sem representação” pode ocultar regras locais, memória incorporada ou representações não observadas; coordenação pode ser medida por resultado final e perder a dinâmica intermediária. |
| **ALTERNATIVE_TEST** | Protocolo de ablação que remova apenas o artefato mantendo regras locais, competência e tarefa; observação multimétodo de traços representacionais, interações e resultados ao longo do tempo. |
| **WHAT_RESULT_FAVORS_TPC** | Degradação controlada da representação, com demais fatores estáveis, produz perda coordenacional replicável e restauração produz recuperação específica. |
| **WHAT_RESULT_HURTS_TPC** | Coordenação persistente sob ablação validada da representação e ausência de efeito de restauração no domínio previsto. |
| **WHAT_RESULT_IS_INCONCLUSIVE** | Não encontrar um artefato explícito sem excluir regras, memória ou representação distribuída; mudanças de desempenho acompanhadas por mudança de contexto. |
| **CLASS** | E. |

### Ficha 3 — Deformação e ECO

| Campo | Conteúdo |
|---|---|
| **CLAIM** | Falhas internas de coordenação são precedidas por deformação representacional não corrigida. |
| **TPC_PREDICTION** | HYP-001/HYP-001-U exigem precursor dentro do domínio e da janela declarada [1] [3]. |
| **COMPETING_PREDICTION** | Falhas podem surgir de recursos, dependências, eventos exógenos, conflito, carga, erro humano, mudanças de prioridade ou dinâmica de sistema sem deformação do artefato relevante. |
| **CURRENT_EVIDENCE** | O protocolo de campo não tem dados coletados; RETRO-002 não mede diretamente deformação nem ECO como constructo independente [3] [4] [11]. |
| **CURRENT_TEST** | Registro observacional de incidentes e tempo de resolução; não teste da precedência causal de deformação. |
| **WHAT_IT_ACTUALLY_MEASURES** | Associação histórica entre atributos de incidentes/grupos e um desfecho de duração. |
| **POSSIBLE_MEASUREMENT_FAILURE** | ECO é resultado candidato, não medida de toda degradação; a taxonomia perda/atraso/substituição/ambiguidade/fragmentação ainda é provisória; a janela de detecção pode perder precursores. |
| **ALTERNATIVE_TEST** | Registrar versões e estados da representação antes de cada ECO, definir janela de detecção, cegamento de avaliadores, classificação independente e análise de exceções pré-especificada. |
| **WHAT_RESULT_FAVORS_TPC** | Alta proporção de ECOs com deformação observável anterior, relação temporal consistente e redução após correção, replicada em domínios. |
| **WHAT_RESULT_HURTS_TPC** | Proporção relevante de ECOs com deformação ausente após auditoria adequada, ou ausência de incremento sobre baselines. |
| **WHAT_RESULT_IS_INCONCLUSIVE** | ECO sem registro suficiente, precursor fora da janela, classificação sem confiabilidade ou domínio exógeno. |
| **CLASS** | E, com M provável nos testes atuais. |

### Ficha 4 — Inércia representacional

| Campo | Conteúdo |
|---|---|
| **CLAIM** | Representações muito eficientes tendem a tornar-se invisíveis/rígidas e vulneráveis a deformações silenciosas. |
| **TPC_PREDICTION** | Eficiência coordenacional anterior deve moderar invisibilidade, rigidez e falhas silenciosas ao longo do tempo [1]. |
| **COMPETING_PREDICTION** | Rotinas, complacência, dependência de caminho, normas e adaptação podem produzir o mesmo padrão sem o mecanismo TPC. |
| **CURRENT_EVIDENCE** | A fonte canônica classifica HYP-003 como agenda de pesquisa; não foi localizado teste adequado [1]. |
| **CURRENT_TEST** | Nenhum teste suficiente identificado. |
| **WHAT_IT_ACTUALLY_MEASURES** | Não aplicável; a previsão ainda não está operacionalizada. |
| **POSSIBLE_MEASUREMENT_FAILURE** | “Invisibilidade”, “rigidez” e “eficiência” podem ser confundidas com desempenho, ausência de incidentes ou baixa observação. |
| **ALTERNATIVE_TEST** | Estudo longitudinal de mudanças representacionais, auditorias surpresa, perturbações e recuperação, com medidas independentes de adaptação e rigidez. |
| **WHAT_RESULT_FAVORS_TPC** | Maior eficiência prévia prediz perda de detecção e recuperação sob perturbação, além de modelos de rotina e competência. |
| **WHAT_RESULT_HURTS_TPC** | Ausência de moderação ou melhor explicação por variáveis externas pré-registradas. |
| **WHAT_RESULT_IS_INCONCLUSIVE** | Correlação entre eficiência e falha sem medidas de invisibilidade/rigidez ou sem janela temporal. |
| **CLASS** | E. |

## Conclusão da auditoria do teste

A principal falha atual não é simplesmente tamanho amostral: é desalinhamento entre o constructo e a observação. O RETRO-002 é um breaker válido para a alegação específica de incremento X/C, mas não mede o estado representacional como definido em `TPC.md`. A resposta correta é dupla: aceitar o `SIGNAL KILLED` para aquele claim e não transformar a lacuna de medição em confirmação da TPC. A literatura sobre dinâmica de equipes recomenda medições ao longo do tempo e múltiplos métodos, pois medidas estáticas e autorrelato podem representar mal processos emergentes [17].

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

