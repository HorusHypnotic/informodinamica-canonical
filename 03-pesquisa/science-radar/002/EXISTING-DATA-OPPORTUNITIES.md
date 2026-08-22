# EXISTING-DATA-OPPORTUNITIES.md

## Regra de prioridade

Antes de nova coleta humana, reutilizar dados e experimentos existentes. Uma oportunidade só é tratada como capacidade real se tiver identificador, dados/código/protocolo suficiente e um teste que possa alterar a classificação da TPC.

## Oportunidades encontradas

| Oportunidade | Patrimônio | O que permite testar | Reutilização | Limitação |
|---|---|---|---|---|
| RETRO-002 | `experiments/TPC-GATE-RETRO-002/`, código, resultados e dados derivados [4] | Reanalisar X/C contra histórico forte, auditoria de leakage, estabilidade e placebos | Imediata; reexecução documentada | Não mede diretamente EO, deformação, ECO ou capacidade independente |
| RETRO-001 | `experiments/TPC-GATE-RETRO-001/`, UCI 498, DOI 10.24432/C57S4H [5] [13] [14] | Reproduzir o sinal original e comparar genealogia analítica | Imediata | Sinal já foi quebrado pelo RETRO-002 |
| UCI Dataset 498 | 141.712 eventos, agregados em incidentes no pipeline RETRO-002 [4] | Testar previsibilidade histórica, janelas, sucessão por grupo e modelos nulos | Download público, licença CC BY 4.0 conforme registro interno | Incidentes resolvidos, proxies, seleção e ausência de estado representacional direto |
| Protocolos internos | `03-pesquisa/PROTOCOLO_EXPERIMENTAL.md` [3] | Transformar HYP-001 em HYP-001-U com classificação de exceções | Reutilização conceitual; ainda não execução | HYP-001-U é Draft; campo não iniciado; amostra e randomização pendentes |
| Registro de validação | `03-pesquisa/VALIDACAO_EMPIRICA.md` [11] | Verificar formalmente ausência de dados e não confundir plano com resultado | Imediata como controle negativo documental | Não oferece evidência positiva |
| Literatura sobre team cognition | External cognition, team mental models, transactive memory [15] [16] | Formular variáveis e concorrentes para representação, coordenação e intervenção | Reanálise conceitual e busca de instrumentos | Não é dataset TPC e não prova exclusividade |
| Literatura sobre dinâmica temporal | Revisão de métodos para equipes ao longo do tempo [17] | Desenhar medições longitudinais, multimétodo e não estáticas | Base metodológica para teste futuro | Não testa diretamente a TPC |

## Reanálises de maior valor

A primeira reanálise recomendada é reproduzir RETRO-002 sem `O_first_update_hours`, pois o próprio relatório identifica risco de leakage operacional se essa variável for interpretada como disponível no instante zero [4]. A segunda é comparar modelos com janelas históricas pré-registradas, métricas robustas e intervalos agrupados. A terceira é tentar uma representação explícita: extrair versões, timestamps, atualidade, rastreabilidade, ambiguidade e fragmentação dos artefatos operacionais, sem derivá-los do próprio desfecho.

## O que não foi encontrado

Não foi encontrado, na cartografia executada, um dataset público que contenha simultaneamente uma medida independente de estado representacional, deformação tipada, coordenação observada, intervenção de restauração e desfecho longitudinal. Isso é **NÃO ENCONTRADO**, não inexistência. Também não foi encontrado registro de campo concluído para HYP-002; o arquivo de validação marca as fases como não iniciadas [11].

## Critério para avançar

Só vale nova coleta se a reanálise não puder separar TPC de histórico/rotina e se houver desenho que manipule ou observe a representação sem alterar simultaneamente treinamento, recursos, atenção e contexto. Caso contrário, o experimento seria apenas uma repetição nominal do teste fraco.

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

