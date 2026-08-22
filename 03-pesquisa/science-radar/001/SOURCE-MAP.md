# SOURCE-MAP.md

## Objetivo e regra de leitura

Este mapa descreve fontes candidatas para uma infraestrutura de investigação científica. Ele não declara que qualquer fonte seja completa, neutra ou suficiente isoladamente. **FATO** significa capacidade documentada pela própria fonte; **INFERÊNCIA** significa uma ligação que o futuro sistema teria de reconstruir; **NÃO ENCONTRADO** significa apenas que não foi localizado na busca desta missão.

## Camadas prioritárias

| Classe | Fontes candidatas | Identificadores e formatos | Acesso e integração | Limitações críticas |
|---|---|---|---|---|
| Literatura indexada | OpenAlex [1] [2], PubMed [3], Europe PMC [4], Crossref [5], Semantic Scholar [6] | DOI, PMID/PMCID, autores, afiliações, citações; JSON/XML/GraphQL conforme fonte | OpenAlex é aberto e oferece API/snapshot; PubMed/Europe PMC oferecem APIs; Crossref REST é público; Semantic Scholar tem API com limites e políticas próprias | Cobertura, atualização, desambiguação e texto completo variam; metadados não equivalem a validação metodológica |
| Revisões e meta-análises | PubMed, Europe PMC, Cochrane, Crossref, OpenAlex | DOI/PMID, tipo de publicação, referências, protocolos PROSPERO quando presentes | Descoberta automática por tipo, título, resumo e citações | “Systematic review” pode ter qualidade heterogênea; é preciso extrair protocolo, risco de viés e heterogeneidade |
| Preprints | OSF [9], arXiv [13], bioRxiv [14], medRxiv [15], PsyArXiv [16] | DOI/URL, versão, autor, data, repositório | APIs ou OAI/RSS conforme plataforma; texto geralmente acessível | Não passaram necessariamente por revisão por pares; versões podem divergir do artigo publicado |
| Registros de ensaios | ClinicalTrials.gov [7], WHO ICTRP [8] e registros nacionais | NCT/ClinicalTrials ID, IDs secundários, sponsor, protocolo, outcomes, datas, resultados | ClinicalTrials.gov oferece API, downloads e FHIR | Registro não garante execução, completude nem publicação; alterações pós-registro exigem versionamento |
| Datasets | Zenodo [10], Dryad [11], Figshare [12], OSF [9], repositórios disciplinares | DOI/DataCite, accession, versão, checksum, licença | APIs REST e downloads; acesso pode ser aberto, controlado ou condicionado | README, dicionário, proveniência, dados brutos e análise podem estar ausentes; IPD pode exigir aprovação |
| Protocolos | protocols.io [17], suplementos de artigos, OSF | DOI/URL, versão, autor, vínculo com estudo | API v3 documentada; full text pode requerer conta | Protocolo publicado pode não ser o protocolo executado; desvios precisam ser extraídos |
| Código científico | GitHub/GitLab, Zenodo, OSF, Code Ocean e links em artigos | URL, commit/tag, DOI de archive, licença, dependências | GitHub é altamente integrável; arquivo em repositório deve ser congelado por commit/release | Reprodutibilidade pode quebrar por dependências, dados indisponíveis ou código incompleto |
| Teses e dissertações | BDTD [28], repositórios institucionais, ProQuest quando licenciado | Handle, DOI, ISBN, autor, instituição, orientação | BDTD permite descoberta nacional; APIs variam | Indexação desigual, acesso restrito, duplicação com artigos posteriores |
| Financiamento | NIH RePORTER [19], CORDIS [20], Crossref funders [5], Grants.gov e agências nacionais | Award/grant ID, DOI, funder ID, ORCID, instituição | NIH RePORTER e CORDIS permitem descoberta programática/semiprogramática | A ligação grant→paper pode faltar; subprojetos e financiamento privado são incompletos |
| Regulação | FDA, EMA [22], ANVISA [23], documentos de avaliação e rótulos | produto, substância, procedimento, decisão, evento, lote | Portais e APIs variam; openFDA é máquina-legível | Documentos regulatórios têm escopo e jurisdição próprios; decisão regulatória não é sinônimo de eficácia universal |
| Eventos adversos | openFDA/FAERS [21], EudraVigilance/EMA, VigiBase quando acessível | case/report ID, produto, reação, data, país | openFDA oferece JSON e atualizações trimestrais | FAERS é notificação espontânea, subnotificada e não estabelece causalidade; um relatório pode listar vários produtos e reações |
| Correções e retratações | Retraction Watch [27], Crossref updates, PubMed/PMC [3] [18], editoras | DOI/PMID, tipo de atualização, data, relação | Relações podem ser consultadas e reconciliadas | Cobertura e atraso variam; ausência de marcação não prova ausência de problema |
| Replicações | PubMed/Europe PMC/OpenAlex, Registered Reports, StudySwap, repositórios | DOI/PMID, preregistration, protocolo, amostra, resultado | Descoberta exige busca semântica e extração de relações | “Replicação” raramente é um campo padronizado; exige inferência com revisão humana |
| Grafos de citação | OpenAlex, Semantic Scholar, Crossref, PubMed | DOI/PMID, cited-by, references, related works | Muito integrável; exportação por cursor/batch | Citações são sinais de relação, não de concordância; autocitação e cobertura enviesam o grafo |
| Autores e instituições | ORCID [29], ROR [30], OpenAlex, Crossref | ORCID, ROR, DOI, afiliação textual | ORCID/ROR são PIDs úteis; OpenAlex desambigua autores/instituições | Correspondência probabilística pode errar; nomes, afiliações e períodos mudam |
| Conflitos de interesse | Artigo, suplemento, registro, regulador, Crossref, Open Payments quando aplicável | declaração textual, sponsor, author, produto | Extração NLP + confirmação humana | Declaração ausente não significa ausência de conflito; categorias jurídicas variam |
| Resultados negativos | Artigos, preprints, registros com results, suplementos, teses, repositórios | DOI/PMID/NCT, outcome, estimativa, intervalo, p/CI, análise planejada | Parcialmente automatizável; requer busca de resultados não significativos e desfechos omitidos | “Não significativo” não é prova de ausência de efeito; viés de publicação e poder estatístico importam |
| Ensaios registrados sem publicação localizada | ClinicalTrials.gov/WHO ICTRP cruzados com DOI/PMID/OpenAlex | NCT/ID secundário, sponsor, título, amostra, datas, DOI/PMID | Automatizável como *candidate matching* | **NÃO ENCONTRADO ≠ NÃO EXISTE**; pode haver publicação com título, registro ou atraso diferentes |
| Patentes | WIPO PATENTSCOPE [24], Espacenet [25], Google Patents [26] | publicação, família, prioridade, CPC/IPC, inventor, applicant | Texto e metadados pesquisáveis; Espacenet informa cobertura ampla e atualização diária | Patente demonstra reivindicação, não eficácia; famílias e status legal precisam ser normalizados |
| Vocabulários e ontologias | MeSH, UMLS, SNOMED CT, RxNorm, ChEBI, FoodOn, OBI, EFO | concept IDs, synonyms, mappings | Fundamentais para expandir consultas e normalizar exposição/desfecho | Mapeamentos não são equivalências perfeitas e podem apagar contexto |

## Relações e identificadores mínimos

O núcleo deve armazenar `Work`, `Study`, `Intervention`, `Outcome`, `Dataset`, `Protocol`, `CodeArtifact`, `Person`, `Organization`, `Funder`, `RegulatoryAction`, `AdverseEvent`, `Correction`, `Patent` e `Claim`. Os PIDs preferenciais são DOI, PMID/PMCID, NCT ou registro equivalente, ORCID, ROR, grant ID, DataCite DOI e identificadores de patente. Relações fracas devem conservar a evidência do *match*: campo usado, valor original, algoritmo, score, data de consulta e revisão humana.

## Classes adicionais descobertas

Duas classes são necessárias além da lista inicial: **ontologias e terminologias**, para resolver sinônimos entre substâncias, exposições e desfechos; e **versionamento/proveniência**, para saber qual versão de artigo, protocolo, dataset, código ou registro foi observada. Também são necessários **instrumentos psicométricos e seus manuais**, pois “personalidade” não é um desfecho único.

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

