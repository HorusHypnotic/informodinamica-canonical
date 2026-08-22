# NEGATIVE-SPACE.md

## Regra de interpretação

**NÃO ENCONTRADO ≠ NÃO EXISTE.** A ausência de um DOI, publicação, dataset ou ligação em uma busca é um resultado sobre a cobertura e a estratégia de busca, não sobre o mundo científico.

## Espaços negativos relevantes

| Alvo | Como procurar | Sinal que pode ser extraído | Risco de falso negativo |
|---|---|---|---|
| Ensaio registrado sem artigo | Cruzar NCT/ICTRP com DOI, PMID, título, sponsor e autores | Registro com resultados ou completado sem publicação localizada | atraso, mudança de título, publicação secundária, registro incompleto |
| Outcome registrado não publicado | Comparar versões do registro com artigo/suplemento | Outcome primário ausente ou alterado | acesso restrito, terminologia diferente |
| Resultado negativo | Procurar estimativas, IC, tabelas suplementares e preprints | Efeito pequeno/inconclusivo ou adverso | “não significativo” não significa equivalência |
| Dataset sem análise | Buscar DOI/DataCite/Zenodo/Figshare/OSF por study ID e citações | arquivo com README e nenhum paper localizado | dataset não indexado ou acesso controlado |
| Código sem artigo | Buscar DOI de release, URL em suplemento e dependências | código reexecutável ou abandonado | repositório apagado, licença ausente |
| Replicação falhada | Procurar Registered Reports, preregistros e estudos com protocolo semelhante | não replicação ou efeito menor | “replicação” não é campo padronizado |
| Efeito que some em amostra maior | Comparar estudos por tamanho, precisão e preregistro | heterogeneidade por poder/amostra | diferenças de população e dose |
| Paper pouco citado | busca por conceito, não apenas citações | sinal relevante subindexado | citações não medem validade |
| Hipótese abandonada | citações negativas, correções, retratações e revisões | mudança de consenso ou falha de mecanismo | silêncio pode refletir desinteresse |

## Achados de infraestrutura

ClinicalTrials.gov expõe campos úteis para a caça de registros, incluindo NCT, IDs secundários, status, desenho, outcomes, sponsor, documentos e resultados [7]. Crossref permite buscar atualizações e relações de works, além de referências e financiamento [5]. O openFDA é valioso para geração de sinais de segurança, porém declara que seus relatórios espontâneos não validam causalidade, não cobrem todos os eventos e não permitem atribuir uma reação a um produto quando há múltiplos produtos/reacções [21].

## Achados científicos provisórios

A revisão de escolhas alimentares mostra uma lacuna conceitual recorrente: muitos estudos informam associação personalidade→dieta, enquanto a pergunta de estresse requer dieta→traço e persistência [32]. A revisão de psicodélicos oferece uma área onde a pergunta distal foi explicitamente medida, mas inclui mistura de estudos experimentais e observacionais, exigindo estratificação [33]. Não foi realizada nesta missão uma auditoria record-level que permita listar ensaios individuais sem publicação; portanto, esse inventário permanece **não executado**, não “vazio”.

## Busca operacional futura

Para cada registro, gerar um pacote de busca com título original, acrônimo, NCT/ID, sponsor, PI, intervenção normalizada, outcome, amostra, datas e palavras raras. Fazer matching em quatro camadas: PID explícito; combinação exata de título/autores; similaridade de metadados; busca semântica com confirmação humana. Armazenar também candidatos rejeitados e motivo da rejeição.

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

