# SCIENCE-RADAR-BLUEPRINT.md

## Visão

O Science Radar deve receber uma pergunta do tipo **“Existe evidência de que X altera Y?”** e produzir um mapa auditável de hipóteses, mecanismos, estudos, dados, contradições, incerteza e lacunas. O produto não é uma lista de links nem um veredito binário.

## Arquitetura de informação

| Camada | Função | Saída |
|---|---|---|
| 1. Normalização | Expandir X/Y por ontologias, sinônimos, doses, vias e instrumentos | consulta versionada |
| 2. Descoberta | Consultar literatura, registros, preprints, datasets, código, patentes e regulação | candidatos com PIDs |
| 3. Reconciliação | Deduplicar versões e ligar DOI/PMID/NCT/ORCID/ROR/DataCite | entidades canônicas + evidência do match |
| 4. Extração | Extrair população, intervenção, comparador, outcome, tempo, estimativa e limitações | alegações atômicas |
| 5. Grafo | Conectar paper–experimento–protocolo–dados–código–financiamento–replicação | grafo versionado |
| 6. Auditoria | Buscar resultados contrários, atualizações, retratações, conflitos e ensaios não publicados | pacote adversarial |
| 7. Síntese | Separar fato, evidência, inferência, hipótese, especulação e não encontrado | resposta com rastreabilidade |
| 8. Gate humano | Enviar matches ambíguos e claims críticos para revisão | decisões registradas |

## Modelo de resposta

1. **Pergunta e escopo:** exposição, população, comparador, desfecho e horizonte temporal.
2. **Hipóteses:** mecanismos candidatos e previsões diferenciadoras.
3. **Evidência favorável:** estudos por desenho, estimativa e precisão.
4. **Evidência contrária:** não replicações, efeitos nulos, resultados adversos e explicações concorrentes.
5. **Força da evidência:** matriz por causalidade, risco de viés, consistência, precisão, temporalidade e aplicabilidade; não um número único.
6. **Experimentos registrados:** status, outcomes, alterações e publicações encontradas.
7. **Dados e código:** disponibilidade, licença, versão, reprodutibilidade e acesso.
8. **Conflitos e financiamento:** sponsor, grants, autores e declarações.
9. **Lacunas:** explicitamente marcadas como não encontradas.
10. **Próximos testes:** experimentos possíveis, com resultado que diferenciaria hipóteses.

## Regras de segurança epistemológica

O sistema deve bloquear linguagem causal quando a fonte é observacional, marcar estado agudo versus traço, não usar FAERS para inferir causalidade [21], não interpretar ausência de publicação como resultado negativo e nunca canonizar TPC. Toda síntese deve mostrar as fontes primárias e os trechos que sustentam as alegações.

## Métrica de qualidade

A avaliação deve medir precisão de entidades, recall de ligações, taxa de falsos matches, cobertura de resultados contrários, completude de proveniência, proporção de claims com citação e concordância entre revisores. A arquitetura só é bem-sucedida quando torna fácil encontrar por que uma conclusão pode estar errada.

## Fora do escopo desta missão

Não implementar crawler, API, banco, agente ou interface. O blueprint descreve entidades, relações, fluxos e gates para decidir integrações futuras.

## Referências
## Referências selecionadas

[1]: https://openalex.org/ "OpenAlex — The open catalog to the global research system"
[2]: https://docs.openalex.org/ "OpenAlex API documentation"
[3]: https://pubmed.ncbi.nlm.nih.gov/ "PubMed — NLM"
[4]: https://europepmc.org/RestfulWebService "Europe PMC RESTful Web Service"
[5]: https://api.crossref.org/ "Crossref REST API"
[6]: https://www.semanticscholar.org/product/api "Semantic Scholar API"
[7]: https://clinicaltrials.gov/data-api "ClinicalTrials.gov Data and API"
[8]: https://www.who.int/clinical-trials-registry-platform "WHO ICTRP"
[9]: https://www.cos.io/products/osf "OSF"
[10]: https://developers.zenodo.org/ "Zenodo REST API"
[11]: https://datadryad.org/api "Dryad API"
[12]: https://api.figshare.com/ "Figshare API"
[13]: https://arxiv.org/help/api "arXiv API"
[14]: https://www.biorxiv.org/ "bioRxiv"
[15]: https://www.medrxiv.org/ "medRxiv"
[16]: https://psyarxiv.com/ "PsyArXiv"
[17]: https://apidoc.protocols.io/ "protocols.io API"
[18]: https://www.ncbi.nlm.nih.gov/research/bionlp/APIs/ "NCBI Web APIs and PubTator"
[19]: https://reporter.nih.gov/ "NIH RePORTER"
[20]: https://cordis.europa.eu/ "CORDIS"
[21]: https://open.fda.gov/apis/drug/event/ "openFDA Drug Adverse Event API"
[22]: https://www.ema.europa.eu/en/medicines "EMA medicines"
[23]: https://www.gov.br/anvisa/pt-br "ANVISA"
[24]: https://www.wipo.int/en/web/patentscope "WIPO PATENTSCOPE"
[25]: https://www.epo.org/en/searching-for-patents/technical/espacenet "Espacenet"
[26]: https://patents.google.com/ "Google Patents"
[27]: https://retractionwatch.com/ "Retraction Watch"
[28]: https://bdtd.ibict.br/vufind/ "BDTD"
[29]: https://orcid.org/ "ORCID"
[30]: https://ror.org/ "Research Organization Registry"
[31]: https://datacite.org/ "DataCite"
[32]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8321831/ "The Association Between Personality Traits and Dietary Choices: A Systematic Review"
[33]: https://pubmed.ncbi.nlm.nih.gov/42218644/ "Classic psychedelics and personality: An updated systematic review"
[34]: https://pmc.ncbi.nlm.nih.gov/articles/PMC5736032/ "Sharing and reuse of individual participant data from clinical trials"

