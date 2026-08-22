# PUBLIC-DATA-CANDIDATES.md

## Candidatos priorizados

| Candidato | Estrutura de equipe | Comunicação/interação | Conhecimento distribuído | Histórico | Desempenho/desfecho | Acesso público | Status |
|---|---:|---:|---:|---:|---:|---|---|
| PLOS e0204547 S1 Dataset | Sim | Sim, logs de chat | Parcial; conteúdo limitado | Sim, histórico de performance | Sim | S1 Dataset declarado no artigo [6] [7] | **REANALYSIS_CANDIDATE** |
| PNAS CI / POGS | Sim | Sim, interação granular em plataforma | Parcial; tarefas e processo, não necessariamente conteúdo semântico | Parcial, tarefas repetidas | Sim, tarefas critério fora da amostra | Artigo/SI e plataforma POGS; dados brutos requerem conferir acesso [8] [9] | Candidato condicionado à confirmação do pacote de dados |
| UCI Dataset 498 / RETRO | Grupos operacionais | Não contém comunicação de equipe no sentido necessário | Não | Sim | Sim, resolução de incidentes | Dataset público UCI [12]; cópia não commitada nos experimentos | Já explorado; não discrimina TPC |
| TSAGAT/trauma studies | Sim | Parcial, simulação e performance | Sim, respostas de SA por papel | Parcial | Sim | Artigos e alguns datasets anônimos conforme estudo [10] [11] | Reutilização depende de acesso aos suplementos/dados |
| OSF The Structure of Collective Intelligence | Sim | Dados de POGS/processo | Parcial | Parcial | Sim | Preprint e página OSF [9] | **REANALYSIS_CANDIDATE** após inspeção de arquivos |
| Hidden-profile datasets | Sim | Discussão codificada | Sim, distribuição controlada de informação | Geralmente curto | Sim, decisão ótima | Estudos e suplementos variáveis | Candidato conceitual; acesso caso a caso |

## Melhor oportunidade imediata

O melhor candidato aberto identificado é o **PLOS e0204547 S1 Dataset**, porque combina membros, logs de comunicação, redes de colaboração, histórico e desempenho, e declara que os dados relevantes estão no artigo e nos arquivos de Supporting Information [6] [7]. Ele permite testar se estrutura/dinâmica de colaboração e histórico predizem o desfecho sem introduzir uma régua TPC.

## O que o dataset não resolve

O PLOS S1 não parece conter, pela descrição acessível, uma medida independente de conteúdo representacional, deformação tipada, acurácia do modelo mental, especialização TMS ou consciência situacional sondada. Assim, ele é candidato a reanálise de concorrentes, não teste completo de HYP-001. Uma reanálise poderia comparar histórico, rede temporal, participação/reciprocidade e desempenho; não poderia afirmar que ausência de associação de rede é refutação de EO.

## Critérios de acesso antes de reanálise

Antes de executar qualquer análise, devem ser baixados e checados os arquivos suplementares, licença, dicionário, unidade de identificação, timestamps, regras de anonimização, separação entre treino e teste e possibilidade de reconstruir histórico anterior ao desfecho. Sem isso, o status permanece **REANALYSIS_CANDIDATE**, não resultado.

## Referências

[1]: https://psychiatry.ucsd.edu/research/programs-centers/instep/tools-resource/definitions/emergent-states/cognitive-emergent-states/tms.html "UCSD IN STEP — Transactive Memory System"
[2]: https://psychiatry.ucsd.edu/research/programs-centers/instep/tools-resource/definitions/emergent-states/cognitive-emergent-states/shared-mental-model.html "UCSD IN STEP — Shared Mental Models"
[3]: https://psychiatry.ucsd.edu/research/programs-centers/instep/tools-resource/definitions/emergent-states/cognitive-emergent-states/situational-awareness.html "UCSD IN STEP — Situational Awareness"
[4]: https://doi.org/10.1037/0021-9010.88.4.587 "Lewis (2003), Measuring transactive memory systems in the field"
[5]: https://doi.org/10.1037/a0017455 "DeChurch & Mesmer-Magnus (2010), Measuring shared team mental models"
[6]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[7]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6179230/ "PMC full text and supplementary-data record for Amelkin et al."
[8]: https://doi.org/10.1073/pnas.2005737118 "Riedl et al. (2021), Quantifying collective intelligence in human groups"
[9]: https://osf.io/preprints/psyarxiv/4sqfx "OSF/PsyArXiv, The Structure of Collective Intelligence"
[10]: https://pubmed.ncbi.nlm.nih.gov/25441262/ "Crozier et al. (2015), TSAGAT"
[11]: https://bmjopen.bmj.com/content/9/9/e029412 "Hultin et al. (2019), reliability of SA/team/task instruments"
[12]: https://archive.ics.uci.edu/dataset/498/incident+management+process+enriched+event+log "UCI Dataset 498"
[13]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/7029833a8f9cf15771824a9f60fa552ffe18fb9e/01-teoria/TPC.md "TPC canonical synthesis at current repository SHA"
[14]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/7029833a8f9cf15771824a9f60fa552ffe18fb9e/03-pesquisa/science-radar/002/PRESERVATION-RECORD.md "Science Radar-002 preservation record"
[15]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/7029833a8f9cf15771824a9f60fa552ffe18fb9e/experiments/TPC-GATE-RETRO-002/report/TPC-GATE-LOCAL-SIGNAL-BREAKER.md "RETRO-002 report"
