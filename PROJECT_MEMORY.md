# Memória Operacional do Projeto

## Estado atual

- **Versão documentada no README:** v0.7.0 — 31 de julho de 2026.
- **Base publicada anterior:** `e3acd7b`, identificada no histórico como consolidação v0.7.1.
- **Publicação experimental atual:** candidata a `v0.7.2-experimental`; o identificador comunica maturidade, mas nenhuma tag Git foi criada.
- **Estado do programa:** pesquisa ativa; consolidação teórica concluída e validação empírica em andamento.
- **Mudança recente:** reorganização estrutural, glossário canônico unificado, protocolos PRT, fundamentos matemáticos e documentação de aplicações/produtos.

## Runtime experimental `copiloto-obras`

- Lotes técnicos 1, 2 e 3 concluídos; rodada corretiva 4 concluída.
- 118 testes automatizados aprovados e dry-run local válido.
- Nenhuma chamada real à API foi executada.
- `AUDITORIA_FORMAL_3.md` decidiu `NAO_APTO`; os bloqueadores foram tratados em `RELATORIO_CORRETIVO_4.md`.
- Reauditoria formal independente permanece pendente; uso em produção, comercial ou em decisões reais não está autorizado.
- Framework de agentes, runtime, testes e auditorias atuais foram selecionados para versionamento; `workspace/`, documentos históricos desatualizados e placeholders fora do runtime permanecem excluídos.

## Visão geral

O repositório é o núcleo canônico da Informodinâmica Aplicada. A TPC estuda como representações compartilhadas sustentam a coordenação ao longo do tempo, como se deformam e como podem ser restauradas. A TDO é a aplicação inicial no contexto operacional; OPERA é o ecossistema de produtos e instrumentos de aplicação.

## Documentos oficiais e autoridade

1. `CONSTITUICAO.md` — autoridade máxima de governança.
2. `DOCUMENTO_CANONICO.md` — escopo, visão geral e arquitetura.
3. `GLOSSARIO_CANONICO.md` — fonte única de definições e IDs.
4. `01-teoria/TPC.md` e `AXIOMAS_E_PROPOSICOES.md` — teoria e formalização conceitual.
5. `protocols/PRT-001-ciclo-de-vida.md` e `protocols/PRT-002-cartografia-epistemologica.md` — governança operacional.
6. `ROADMAP.md` e `CHANGELOG.md` — direção e histórico.

## Fundamentos canônicos

- **TPC:** teoria em revisão fundacional candidata v0.8; investiga primariamente a persistência e a capacidade coordenadora de representações, tratando coordenação como desfecho relacional.
- **TDO:** aplicação inicial da TPC em operações de construção civil.
- **Informodinâmica Aplicada:** programa de pesquisa que integra teoria, pesquisa empírica, aplicações e educação.
- **Fundamentos matemáticos:** 11 áreas mapeadas em `01-teoria/FUNDAMENTOS_MATEMATICOS.md`; são ferramentas adaptadas ao problema, não uma matemática nova já estabelecida.

## Protocolos vigentes

- **PRT-001:** ciclo de vida de IDs e artefatos — Draft, Experimental, Canônico e Obsoleto.
- **PRT-002:** cartografia epistemológica para incorporar fundamentos externos sem apropriação conceitual indevida.
- **Pesquisa experimental:** `03-pesquisa/PROTOCOLO_EXPERIMENTAL.md` define a validação de HYP-001 e HYP-002.

## Arquitetura OPERA

- **Copiloto:** interface de operação e registro.
- **Atlas:** camada territorial/estratégica.
- **Control:** acompanhamento e controle operacional.
- **OPERA Flex e Library:** mecanismos de Fliflexação e biblioteca de Slektips, conforme as aplicações documentadas.

## Decisões históricas vigentes

- Markdown é a fonte primária; PDFs são artefatos ou evidências, não autoridade normativa.
- O repositório Git é a única fonte oficial da disciplina.
- A Constituição governa a evolução; o Glossário Canônico governa as definições.
- IDs são permanentes e devem seguir PRT-001.
- Novos fundamentos externos exigem PRT-002.
- Toda sessão com alterações exige revisão de coerência, duplicidades, órfãos e relatório pré-commit.

## Pendências prioritárias

1. Concluir a consolidação documental candidata v0.7.1, revisar o escopo e completar `manifest/v0.7.1.manifest.md` somente após estabilização textual.
2. Registrar a ausência de manifesto final da v0.7.0 como dívida histórica de governança; não reconstruí-lo com arquivos locais posteriores.
3. Executar e documentar a validação empírica planejada: seleção das obras, coleta, análise e relatório.
4. Consolidar e versionar os casos reais em `03-pesquisa/CASOS_REAIS.md`.
5. Calibrar empiricamente ICO, IFX e Capital Preservado, conforme as limitações declaradas na TPC.
6. Resolver referências e caminhos históricos que possam permanecer duplicados após a reorganização.
7. Avaliar a coerência entre a taxonomia histórica `MET-003`/`MET-005` e a apresentação operacional atual de IFX e Slektip.

## Como retomar o trabalho

1. Ler `AGENTS.md`, `CONSTITUICAO.md`, `DOCUMENTO_CANONICO.md` e `GLOSSARIO_CANONICO.md`.
2. Consultar `ROADMAP.md`, `CHANGELOG.md` e a auditoria mais recente.
3. Conferir `git status` e a versão indicada no README.
4. Antes de editar, identificar a autoridade do documento, os IDs envolvidos e as dependências.
