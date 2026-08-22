# COMPETING-THEORIES.md

## Concorrentes fortes

| Teoria/constructo externo | Mecanismo | Medida típica | Predição concorrente | Força contra TPC |
|---|---|---|---|---|
| Transactive Memory System | A equipe distribui especialização, credibilidade e coordenação de recuperação | Lewis TMS, desempenho, treinamento, comunicação | Equipes com melhor “quem sabe o quê” coordenam e performam melhor | Alta para distribuição de conhecimento; não resolve deformação/artefato diretamente [1] [4] |
| Shared Mental Models | Convergência e acurácia em modelos de tarefa/equipe/equipamento/interação | Pathfinder, concept mapping, pairwise comparison, MDS, SMM scales | Maior similaridade/acurácia melhora antecipação e processo | Alta; oferece medida estrutural externa, mas similaridade não é persistência [2] [5] |
| Shared/team Situation Awareness | Conhecimento atual e projeção futura do ambiente | SAGAT/TSAGAT, SPAM, SART | Melhor SA antes do resultado prevê melhor decisão/desempenho | Alta para estado pré-desfecho; menor para história de artefatos [3] [10] [11] |
| Collective Intelligence | Processo de colaboração e capacidade geral da equipe | Bateria de tarefas, fator CI, POGS, process logs | Processo de colaboração e interação predizem desempenho fora da amostra | Alta para substituir explicações por capacidade/interação, sem TPC [8] [9] |
| Collaboration-network dynamics | Estrutura e dinâmica de links de comunicação | Grafos de chat, densidade, reciprocidade, conectividade | Redes bem conectadas e robustas predizem desempenho | Alta para processo relacional e resiliência de rede; não mede semântica [6] [7] |
| Hidden-profile / information sharing | Informação única não compartilhada impede decisão ótima | Manipulação de informação, codificação de discussão | Compartilhamento de informação única aumenta decisão correta | Alta para informação assimétrica; baixa ecologia e pouca persistência [meta-análise do paradigma] |
| Histórico operacional e rotinas | Carga, volume, duração, competência e rotina geram persistência estatística | Features históricas, desempenho anterior, incident logs | O passado do sistema prevê o próximo desfecho sem estado representacional adicional | Muito alta no RETRO-002/002R; baseline histórico superou/empatou X/C [14] [15] |

## Crueldade necessária

Há pelo menos quatro explicações externas que podem produzir “coordenação melhor” sem a TPC: conhecimento distribuído recuperado por TMS; convergência/acurácia de SMM; consciência situacional objetiva; e estrutura/dinâmica de colaboração. O histórico operacional fornece uma quinta explicação parcimoniosa para previsão de desfechos. Portanto, a tese “representações influenciam coordenação” não distingue TPC, porque SMM, TMS e external cognition fazem afirmações funcionalmente próximas.

A TPC só se separaria se previsse um padrão que essas medidas não previssem: por exemplo, um tipo de deformação tipado, observado antes do desfecho, que alterasse a relação entre estado do artefato e coordenação mesmo quando TMS, SMM, SA, rede, histórico, recursos e competência permanecessem semelhantes.

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
