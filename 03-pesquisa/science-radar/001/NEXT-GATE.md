# NEXT-GATE.md

## Decisão executiva

As primeiras integrações devem maximizar cobertura, interoperabilidade e capacidade de auditoria antes de adicionar fontes difíceis. A recomendação é começar por **OpenAlex + Europe PMC/PubMed**, **ClinicalTrials.gov**, **Crossref**, **OpenCitations/Semantic Scholar** e **ORCID/ROR/DataCite**, em uma sequência de quatro ou cinco blocos. O ponto não é coletar tudo: é conseguir responder uma pergunta pequena e rastrear cada ligação.

## Prioridades

| Prioridade | Capacidade adquirida | Fonte/API | Dificuldade | Dependências | Limitações | Primeiro teste |
|---|---|---|---|---|---|---|
| 1 | Descoberta ampla, metadados, autores, instituições e citações | OpenAlex API/snapshot [1] [2] + Europe PMC/PubMed [3] [4] | Baixa–média | normalização DOI/PMID/ORCID/ROR | cobertura e desambiguação não perfeitas; full text variável | construir um conjunto de 100 papers sobre uma intervenção e comparar deduplicação |
| 2 | Registro prévio, desenho, outcomes, status, sponsor e results | ClinicalTrials.gov API/FHIR [7] | Baixa–média | NCT/IDs secundários e matching | registro sem execução/publicação; alterações históricas | localizar registros de estudos sobre psicodélicos, cafeína, probióticos e personalidade e cruzar com PMID/DOI |
| 3 | DOI, relações, funding, licença, referências e atualizações | Crossref REST [5] | Baixa | DOI e cursor | depende do depósito dos membros; 429/403 e metadados incompletos | testar um lote de DOIs e recuperar `reference`, `relation`, `funder`, `license` e `update-to` |
| 4 | Identidade persistente de pessoas, organizações e datasets | ORCID [29], ROR [30], DataCite [31] | Média | reconciliação probabilística | perfis incompletos, afiliação histórica e IDs ausentes | medir taxa de resolução autor→ORCID→ROR em uma amostra de artigos |
| 5 | Sinais de segurança e documentação regulatória | openFDA [21], EMA [22], ANVISA [23] | Média | normalização de produto/substância e reação | notificação espontânea não prova causalidade; jurisdição | gerar apenas uma tabela de sinais candidatos, sempre com aviso de não causalidade |

## Por que não começar por tudo

Patentes, teses, protocolos, datasets e código são essenciais para o grafo completo, mas aumentam a heterogeneidade e exigem matching e licenciamento mais complexos. Eles devem entrar na segunda onda, depois de o núcleo DOI/PMID/NCT estar funcionando conceitualmente. Retraction Watch e fontes de correção entram cedo como camada de auditoria, ainda que a cobertura precise ser avaliada [27].

## Gate de aceitação

A decisão de implementar só deve ocorrer quando um protótipo de consulta conseguir: encontrar estudos favoráveis e contrários; separar RCT, longitudinal e observacional; ligar pelo menos alguns artigos a registros; identificar versões e correções; mostrar ausência de publicação como candidato, nunca como fato; e fornecer citação verificável para cada claim.

## Risco principal

O maior risco não é falta de fontes, mas **falsa conectividade**: ligar trabalhos parecidos, autores homônimos, datasets correlatos ou um registro a um artigo errado. O primeiro investimento deve ser em proveniência, matching conservador e revisão humana de arestas ambíguas.

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

