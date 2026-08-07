# Checkpoint de Recanonização — 07/08/2026 — Parte 2

## 1. Finalidade

Este documento registra o segundo checkpoint da operação de recuperação e recanonização do repositório:

`HorusHypnotic/informodinamica-canonical`

Ele complementa, sem substituir:

`docs/decisoes/CHECKPOINT-RECANONIZACAO-2026-08-07.md`

O checkpoint anterior registra a reconstrução inicial da branch, recuperação dos sistemas e recanonização do README.

Este segundo checkpoint registra principalmente:

- auditoria da relação entre `origin/main` e `recanonizacao-v0.9`;
- confirmação da preservação da Field Collection V2;
- confirmação da natureza predominantemente aditiva da recuperação;
- validação estrutural do README;
- auditoria inicial da nomenclatura TPC;
- identificação da fronteira conceitual entre a formulação v0.8 e a nova TPC;
- estado de versionamento e governança documental;
- criação da auditoria formal da recanonização;
- ponto exato em que a investigação deve ser retomada.

---

# 2. Regra operacional

Continuar trabalhando incrementalmente no VS Code/PowerShell:

> objetivo → 1 a 3 comandos → execução humana → análise → próximo passo.

Se ocorrer erro:

> parar → compreender → corrigir → validar → somente então continuar.

Não executar sem decisão explícita:

- merge;
- reset;
- rebase;
- force push;
- exclusões em massa;
- substituição global de nomenclatura;
- modernização automática;
- `npm audit fix`;
- upgrades de dependências;
- refatorações oportunistas.

Textos longos devem preferencialmente ser escritos no VS Code.

PowerShell deve ser utilizado principalmente para inspeção, Git e orquestração.

---

# 3. Estado atual do Git

Branch:

`recanonizacao-v0.9`

Último commit confirmado:

`04ffc49 — docs: registra auditoria da recanonizacao`

Histórico imediatamente anterior:

`e566460 — docs: registra checkpoint da recanonizacao v0.9`

`73809fa — docs: recanoniza readme da informodinamica e ecossistema opera`

`861763e — rescue: restaura e valida copiloto de obras`

`6e54e3e — rescue: restaura e valida opera control`

`ae3ad93 — chore: sincroniza gitignore com estado publico atual`

`5529403 — docs: formaliza TPC como Teoria dos Processos Coordenativos`

No último estado verificado antes da criação deste arquivo:

`git status --short`

retornou vazio.

Portanto, o working tree estava limpo imediatamente antes da criação deste checkpoint.

Este próprio arquivo ainda deverá ser salvo, inspecionado e commitado isoladamente.

Nenhum push da nova auditoria/checkpoint havia sido realizado até este momento.

---

# 4. Relação entre origin/main e recanonizacao-v0.9

Esta foi uma das descobertas mais importantes da nova sessão.

Foi executado:

`git rev-list --left-right --count origin/main...recanonizacao-v0.9`

Resultado:

`0 50`

Interpretação:

- `origin/main` possuía 0 commits exclusivos;
- `recanonizacao-v0.9` possuía 50 commits exclusivos naquele momento.

Foi identificado como ancestral comum:

`9e6777669182c8f4286560edc575b27f3e5fbe0c`

Também foi executado:

`git merge-base --is-ancestor origin/main recanonizacao-v0.9`

Resultado:

`0`

## Conclusão

`origin/main` é ancestral de `recanonizacao-v0.9`.

Isso significa que os avanços da `origin/main` já estão incorporados à história da recanonização.

A preocupação registrada no checkpoint anterior de que avanços recentes da `origin/main` talvez precisassem ser recuperados seletivamente foi resolvida pela inspeção do grafo.

Não existe, no estado auditado, razão para executar merge de `origin/main` para `recanonizacao-v0.9`.

Não fazer merge apenas para "sincronizar" essas branches.

---

# 5. Natureza da diferença contra origin/main

Foi auditado:

`git diff --name-status origin/main..recanonizacao-v0.9`

A diferença contém centenas de caminhos adicionados pela recuperação histórica.

Foram recuperadas ou reincorporadas estruturas como:

- `01-teoria/`;
- `02-aplicacoes/`;
- `03-pesquisa/`;
- `agents/`;
- `hypotheses/`;
- `laws/`;
- `metrics/`;
- `ontology/`;
- `protocols/`;
- `publications/`;
- `references/`;
- `scripts/`;
- `produtos/`;
- `opera/`;
- documentos institucionais e históricos.

Foi executado filtro específico para arquivos modificados, deletados ou renomeados.

Resultado relevante:

`README.md`

foi o único arquivo previamente existente identificado como modificado no conjunto auditado.

Não foram identificados arquivos deletados ou renomeados em relação à `origin/main`.

Também foi observado:

`A .github/workflows/auditoria-documental-diaria.yml`

como nova adição.

## Conclusão

A recuperação apresenta comportamento predominantemente aditivo.

Ela preservou a base pública recente e reincorporou patrimônio histórico/científico ao redor dela.

---

# 6. Aplicação pública recente

Foram comparados especificamente:

- `client/`;
- `server/`;
- `shared/`;
- `package.json`;
- `vite.config.ts`.

O comando:

`git diff --name-status origin/main..recanonizacao-v0.9 -- client server shared package.json vite.config.ts`

não produziu saída.

## Conclusão

Nos caminhos auditados, a aplicação pública existente na `origin/main` permaneceu sem divergência na recanonização.

Isso é particularmente importante porque demonstra coexistência entre:

1. a arquitetura Canonical recente;
2. o patrimônio histórico recuperado;
3. os sistemas OPERA recuperados.

---

# 7. Field Collection V2

A preservação da Field Collection V2 foi verificada explicitamente.

O histórico de:

`client/src/pages/NewObservation.tsx`

incluiu:

`72f54c1 — feat(field-form): add local observation draft flow`

`e714e0b — feat(field-form): register and list local observations`

`4666448 — feat(field-form): improve mobile observation flow`

`747673e — feat(field-v2): add multi-local observations, organizations, corpus JSON/CSV export/import and enrichment`

Também foi identificado:

`041424e — feat(field-v2): add persistent backup on import and separate analysisNotes/hypotheses`

seguido de:

`9e67776 — Merge pull request: Sprint Field Collection V2`

Foi executado:

`git merge-base --is-ancestor 747673e recanonizacao-v0.9`

Resultado:

`0`

Arquivos centrais confirmados:

- `client/src/lib/observationStorage.ts`
- `client/src/pages/LocalObservationDetail.tsx`
- `client/src/pages/LocalObservations.tsx`
- `client/src/pages/NewObservation.tsx`
- `client/src/types/observation.ts`

## Conclusão

A Field Collection V2 efetivamente integrada à `origin/main` está preservada na recanonização.

Não é necessária recuperação separada dessa funcionalidade.

---

# 8. OPERA Atlas

O OPERA Atlas continua preservado em:

`opera/atlas/`

Sua arquitetura permanece separada da aplicação Canonical localizada principalmente em:

`client/`

A decisão relevante continua sendo:

`docs/decisoes/DEC-ARQ-001-separacao-atlas-canonico.md`

Essa decisão identificou duas arquiteturas diferentes:

## Atlas

Orientado a:

- dashboard operacional;
- analytics;
- gestão de obras;
- Supabase próprio;
- componentes administrativos.

## Canonical

Orientado a:

- coleta de observações;
- pesquisa informodinâmica;
- validação experimental;
- estrutura `client/server`.

Não realizar fusão automática entre Atlas e Canonical.

A coexistência atual é deliberada.

---

# 9. OPERA Control

Commit confirmado:

`6e54e3e — rescue: restaura e valida opera control`

Origem da recuperação:

`rescue/pre-force-2026-08-03`

Destino:

`opera/control/`

Integridade registrada:

`137 arquivos fonte = 137 arquivos restaurados`

Validação:

`npm ci` → sucesso

`npm run build` → sucesso

Estado:

> recuperado estruturalmente e compilável, mas não modernizado nem corrigido.

Não executar modernização automática durante a recanonização.

---

# 10. Copiloto de Obras

A dúvida existente no checkpoint anterior sobre a existência do commit foi resolvida.

Commit confirmado:

`861763e — rescue: restaura e valida copiloto de obras`

Destino:

`opera/copiloto-obras/`

Integridade:

`45 arquivos fonte = 45 arquivos restaurados`

Instalação:

`python -m pip install -e ".[dev]"`

Resultado:

sucesso.

Testes:

`pytest`

Resultado:

`118 passed in 2.36s`

## Conclusão

O Copiloto está:

- recuperado;
- commitado;
- instalável;
- validado por 118 testes.

---

# 11. README recanonizado

Commit:

`73809fa — docs: recanoniza readme da informodinamica e ecossistema opera`

O README foi reconstruído para representar simultaneamente:

- Informodinâmica;
- Teoria dos Processos Coordenativos;
- genealogia teórica;
- pesquisa;
- hipóteses;
- leis;
- métricas;
- ontologia;
- protocolos;
- laboratório;
- publicações;
- produtos;
- OPERA;
- software;
- agentes;
- governança.

O README diferencia explicitamente:

**Teoria dos Processos Coordenativos**

como denominação atual e:

**Teoria da Persistência da Coordenação**

como formulação histórica.

Também preserva cautela epistemológica, evitando apresentar produto, software ou observação como prova automática da teoria.

---

# 12. Validação estrutural do README

Foram testados os seguintes caminhos apresentados pela navegação:

- `01-teoria`
- `ontology`
- `03-pesquisa`
- `docs`
- `hypotheses`
- `lab`
- `publications`
- `produtos/README.md`
- `produtos/opera-produtos.md`
- `opera`
- `client`
- `server`
- `shared`
- `scripts`
- `protocols`
- `docs/decisoes`

Todos retornaram:

`True`

## Conclusão

Os principais caminhos apresentados pelo README existem efetivamente na árvore recuperada.

Isso ainda não substitui uma futura validação automatizada de todos os links Markdown.

---

# 13. Auditoria formal criada nesta sessão

Foi criado:

`AUDITORIA_RECANONIZACAO_2026-08-07.md`

Commit:

`04ffc49 — docs: registra auditoria da recanonizacao`

Conteúdo:

- relação com `origin/main`;
- preservação da aplicação pública;
- Field Collection V2;
- Atlas;
- Control;
- Copiloto;
- README;
- nomenclatura TPC;
- fronteira conceitual;
- versionamento;
- próximos passos.

Natureza:

> relatório diagnóstico não normativo.

O nome `AUDITORIA_v0.9.md` foi deliberadamente evitado porque a existência da branch `recanonizacao-v0.9` não equivale a uma release canônica v0.9.

---

# 14. Estado de versionamento observado

Manifestos existentes:

- `manifest/v0.2.0.manifest.md`
- `manifest/v0.6.0.manifest.md`
- `manifest/v0.7.1.manifest.md`

O `CHANGELOG.md` registra:

`v0.7.0 — 31 de julho de 2026`

O `ROADMAP.md` menciona:

`revisão fundacional candidata v0.8`

O `DOCUMENTO_CANONICO.md` identifica-se como:

`Versão candidata: 0.8`

A `CONSTITUICAO.md` identifica-se como:

`Revisão candidata 1.2 — não consolidada`

## Regra

Não interpretar automaticamente:

`recanonizacao-v0.9`

como:

`release canônica v0.9`

A promoção para nova versão pública ainda precisa ser deliberadamente decidida.

---

# 15. Governança documental recuperada

Foi lido:

`docs/governanca_documental_v0.7.1.md`

Estados documentais definidos:

- `CANONICAL`
- `ACTIVE`
- `HISTORICAL`
- `DEPRECATED`
- `WORKSPACE`

Classificação relevante:

## CANONICAL

- `CONSTITUICAO.md`
- `DOCUMENTO_CANONICO.md`
- `GLOSSARIO_CANONICO.md`
- `01-teoria/TPC.md`
- `01-teoria/FUNDAMENTOS*.md`
- `AXIOMAS_E_PROPOSICOES.md`
- `protocols/PRT-*.md`
- `MANUAL_ECO.md`

## ACTIVE

- `README.md`
- `ROADMAP.md`
- `CHANGELOG.md`
- `AGENTS.md`
- `PROJECT_MEMORY.md`
- `docs/`
- `agents/`
- `02-aplicacoes/`
- `03-pesquisa/`
- `produtos/`
- `opera/`

## HISTORICAL

Inclui, segundo aquela consolidação:

- `ontology/`
- `laws/`
- `hypotheses/`
- `metrics/`
- manifestos anteriores;
- outros artefatos legados classificados.

## Observação

Essa governança é anterior à decisão conceitual mais recente da TPC e também deve ser interpretada genealogicamente.

Não usar sua classificação como justificativa para reescrever silenciosamente documentos canônicos anteriores.

---

# 16. Mudança conceitual da TPC

Decisão:

`docs/decisoes/DEC-CONC-001-migracao-nomenclatura-tpc.md`

Commit:

`5529403 — docs: formaliza TPC como Teoria dos Processos Coordenativos`

A partir dessa decisão:

**TPC = Teoria dos Processos Coordenativos**

A denominação:

**Teoria da Persistência da Coordenação**

passa a ser formulação histórica anterior.

A mudança não abandona persistência.

Persistência passa a integrar uma classe mais ampla de processos, juntamente com:

- degradação;
- restauração;
- acoplamento;
- desacoplamento;
- transmissão;
- detecção;
- resposta;
- recalibração;
- sincronização;
- outros processos coordenativos ainda sob investigação.

Não realizar substituição global.

---

# 17. Contagem inicial da nomenclatura

Foram auditados arquivos `.md` e `.tex`.

Resultado:

`Teoria da Persistência da Coordenação`

aparece em:

`32 arquivos`

`Teoria dos Processos Coordenativos`

aparece explicitamente em:

`4 arquivos`

Os quatro arquivos identificados com a nova denominação foram:

- `README.md`
- `docs/decisoes/CHECKPOINT-RECANONIZACAO-2026-08-07.md`
- `docs/decisoes/DEC-CONC-001-migracao-nomenclatura-tpc.md`
- `docs/experiments/EXP-001_CI-CD/protocol.md`

## Interpretação

Isso não significa que existam 32 erros.

As ocorrências devem ser classificadas individualmente como:

- históricas;
- canônicas anteriores;
- documentos ativos defasados;
- publicações;
- experimentos;
- produto/interface;
- outras categorias.

---

# 18. Documentos inicialmente auditados

Foram examinadas ocorrências antigas em:

- `AGENTS.md`
- `DOCUMENTO_CANONICO.md`
- `RP-ARCHITECTURE.md`
- `docs/context.md`
- `publications/PUBLICATION_STRATEGY.md`
- `publications/RP-001-methodology/README.md`
- `publications/RP-001-methodology/paper.md`

Também foi analisada:

`CONSTITUICAO.md`

Todos os commits mais recentes desses artefatos auditados foram confirmados como ancestrais de:

`5529403`

Portanto, eles representam estados anteriores à formalização da nova nomenclatura.

---

# 19. Publicações históricas

Research Packages e estratégia de publicação produzidos em 06/08/2026 ainda utilizam:

**Teoria da Persistência da Coordenação**

Esses documentos antecedem a decisão `DEC-CONC-001`.

Não considerar automaticamente essa nomenclatura um erro.

Quando esses artefatos representarem corretamente o estado intelectual da pesquisa naquele momento, preservar a formulação original pode ser necessário para manter a genealogia científica.

---

# 20. AGENTS.md

O arquivo começa com missão equivalente a:

> Preservar e evoluir, com rastreabilidade, o Núcleo Canônico da Informodinâmica Aplicada e da Teoria da Persistência da Coordenação (TPC).

Ele também estabelece uma ordem de autoridade documental.

O documento é operacional e classificado anteriormente como `ACTIVE`.

## Diagnóstico provisório

`AGENTS.md` é forte candidato a atualização futura porque orienta agentes no presente e ainda apresenta a expansão histórica como vigente.

Entretanto, não foi alterado nesta sessão.

A atualização deve considerar a relação entre:

- nova decisão `DEC-CONC-001`;
- Constituição anterior;
- Documento Canônico anterior;
- TPC v0.8 anterior.

---

# 21. docs/context.md

O documento foi lido integralmente.

Metadados:

`Versão: 1.0 (31 de julho de 2026)`

Propósito:

> Dar contexto operacional rápido a agentes e colaboradores.

Ele ainda apresenta como pergunta central:

> Como uma coordenação continua existindo depois que quem a iniciou já não está presente?

E afirma:

> A resposta investigada pela TPC é: por meio de representações persistentes, compartilhadas e transmissíveis.

Na estrutura do conhecimento declara:

`Teoria central | Teoria da Persistência da Coordenação (TPC)`

Também declara:

`Versões: SemVer; referência atual v0.7.0.`

## Diagnóstico

O arquivo não possui apenas uma expansão antiga da sigla.

Ele organiza o contexto da pesquisa em torno do problema histórico da persistência.

Esse problema continua relevante, mas após `DEC-CONC-001` passou a integrar uma classe conceitual mais ampla.

Portanto, `docs/context.md` não deve receber simples substituição terminológica.

Ele é candidato a recanonização controlada depois que o novo núcleo teórico estiver suficientemente delimitado.

---

# 22. DOCUMENTO_CANONICO.md

Cabeçalho:

`Informodinâmica Aplicada — Documento Canônico`

Metadados:

`Versão candidata: 0.8 (Agosto de 2026)`

`Status: revisão fundacional não consolidada`

O documento ainda apresenta a antiga TPC em sua arquitetura.

## Diagnóstico

Esse arquivo representa explicitamente uma formulação candidata v0.8.

Não deve ser silenciosamente transformado em documento v0.9 por troca de nomenclatura.

Qualquer atualização deverá distinguir:

- preservação do estado v0.8;
- eventual sucessor contemporâneo;
- mudança terminológica;
- mudança conceitual.

---

# 23. CONSTITUICAO.md

Cabeçalho:

`Constituição da Informodinâmica Aplicada`

Estado:

`Revisão candidata 1.2 — não consolidada`

Data de adoção:

`24 de julho de 2026`

Última proposta de emenda:

`2 de agosto de 2026`

A Constituição declara que a Informodinâmica é dedicada ao estudo:

> da persistência de representações operacionais e de sua capacidade de sustentar coordenação.

Também define:

> O objeto de estudo da disciplina é a persistência representacional em sistemas coordenados.

## Descoberta importante

A Constituição não está apenas com uma expansão antiga da sigla TPC.

Ela contém uma formulação teórica anterior na qual a persistência representacional ocupa o centro do próprio objeto da disciplina.

Portanto, a migração para **Teoria dos Processos Coordenativos** pode exigir revisão conceitual e de governança, e não mera correção textual.

Não alterar a Constituição como efeito colateral da migração de nomenclatura.

---

# 24. 01-teoria/TPC.md

Este foi o último documento analisado antes da solicitação deste checkpoint.

Cabeçalho atual:

`TPC — Teoria da Persistência da Coordenação`

Metadados:

`Versão candidata: 0.8.0`

`Data da revisão: 02/08/2026`

`Status: Documento canônico em revisão fundacional candidata v0.8`

O documento começa com o postulado:

> Em sistemas no domínio da TPC, a persistência da coordenação depende de representações operacionais persistentes e interpretáveis.

Em seguida afirma que:

> A TPC investiga primariamente representações operacionais: como seu estado evolui e como elas mantêm ou perdem capacidade de sustentar interpretações compatíveis.

A seção de definições inclui:

- Coordenação;
- Representação Operacional;
- Estado coordenado;
- Deformação representacional;
- Resiliência representacional;
- Persistência da coordenação;
- Fliflexação;
- Capital Preservado;
- Slektip;
- ECO;
- ICO;
- IFX.

As proposições iniciais incluem:

`LAW-001 — Mediação Representacional`

e:

`LAW-002 — Persistência Representacional`

## Descoberta central

`01-teoria/TPC.md` também é um artefato conceitual v0.8 anterior à ampliação da TPC.

Não basta alterar:

`Teoria da Persistência da Coordenação`

para:

`Teoria dos Processos Coordenativos`

no título.

O corpo da teoria continua estruturado em torno da persistência representacional.

Uma substituição nominal produziria uma falsa recanonização: o rótulo seria novo, mas a teoria formal continuaria representando o estado anterior.

---

# 25. Fronteira conceitual v0.8 → nova TPC

Esta é a descoberta mais importante ainda não resolvida.

A decisão:

`5529403`

formalizou que TPC passa a significar:

**Teoria dos Processos Coordenativos**

Entretanto, documentos fundamentais ainda representam a formulação candidata v0.8:

- `CONSTITUICAO.md`
- `DOCUMENTO_CANONICO.md`
- `01-teoria/TPC.md`
- `docs/context.md`
- `AGENTS.md`
- diversos documentos derivados.

Isso indica que existe uma fronteira entre:

## Estado conceitual anterior

TPC centrada em:

- persistência;
- persistência representacional;
- capacidade coordenadora das representações;
- degradação/restauração associadas à persistência.

## Estado conceitual novo

TPC entendida como:

**Teoria dos Processos Coordenativos**

na qual persistência é um processo relevante entre outros possíveis processos coordenativos.

## Cuidado epistemológico

Ainda não foi demonstrado que todo o conteúdo da TPC v0.8 possa simplesmente ser incorporado sem alteração à nova teoria.

Também não foi decidido:

- qual é o objeto primário da nova TPC;
- se representação continua sendo objeto analítico primário;
- qual é a relação formal entre processos coordenativos e representações;
- se as leis atuais permanecem leis da teoria ampliada;
- se passam a representar um subconjunto ou regime específico;
- como a antiga Teoria da Persistência da Coordenação será preservada formalmente;
- se a nova teoria será uma generalização, superestrutura, sucessora ou reformulação;
- quais documentos devem ser versionados como históricos e quais devem receber sucessores.

Não preencher essas lacunas automaticamente.

---

# 26. Ponto exato de parada da investigação

Imediatamente antes da solicitação deste backup, o próximo passo proposto era investigar o commit:

`5529403 — docs: formaliza TPC como Teoria dos Processos Coordenativos`

Os comandos ainda NÃO haviam sido executados:

`git --no-pager show --stat --oneline 5529403`

`git --no-pager show --name-status --format="" 5529403`

## Objetivo dessa próxima investigação

Descobrir exatamente o que o commit `5529403` alterou.

Pergunta:

> A mudança para Teoria dos Processos Coordenativos foi formalizada apenas como decisão de nomenclatura e ampliação de escopo, ou algum núcleo teórico também foi migrado naquele commit?

Não editar `docs/context.md`, `AGENTS.md`, `01-teoria/TPC.md`, `DOCUMENTO_CANONICO.md` ou `CONSTITUICAO.md` antes de responder essa pergunta.

---

# 27. Próxima sequência recomendada

Após salvar e commitar este checkpoint isoladamente:

1. confirmar working tree limpa;
2. inspecionar `5529403`;
3. identificar todos os artefatos efetivamente pós-`5529403`;
4. determinar se já existe alguma formulação teórica da nova TPC além de `DEC-CONC-001` e README;
5. somente então decidir se o próximo passo é:
   - atualizar documentos `ACTIVE`;
   - criar um documento de transição conceitual;
   - produzir uma nova formulação candidata da TPC;
   - propor emenda de governança;
   - ou preservar explicitamente a v0.8 antes de qualquer sucessão.

Não começar pela Constituição.

Não realizar substituição global.

---

# 28. Estado científico da recuperação

A própria operação de recanonização permanece um caso observacional potencialmente relevante para a TPC.

Foi observado que:

- diferentes branches preservaram estados distintos;
- `origin/main` preservou a aplicação pública recente;
- a linha Atlas preservou arquitetura histórica extensa;
- branches de rescue preservaram Control e Copiloto;
- commits preservaram proveniência;
- testes permitiram distinguir presença estrutural de capacidade operacional;
- decisões documentadas reduziram dependência da memória da sessão;
- README passou a funcionar como representação navegacional;
- redundância parcial entre representações permitiu reconstrução de um estado que nenhuma representação isolada continha integralmente.

Questão científica preservada:

> A resiliência coordenativa depende menos da existência de uma representação perfeita e mais da arquitetura de relações entre representações parcialmente redundantes?

Esse episódio poderá futuramente ser documentado como estudo de caso científico/narrativo.

Não tratá-lo como prova da TPC.

---

# 29. Estado final esperado deste checkpoint

Após salvar este arquivo:

- branch esperada: `recanonizacao-v0.9`;
- HEAD anterior à criação: `04ffc49`;
- auditoria da recanonização: commitada;
- README recanonizado: commitado;
- origin/main: confirmada como ancestral;
- Field Collection V2: preservada;
- Atlas: preservado;
- Control: recuperado e build validado;
- Copiloto: recuperado e 118 testes aprovados;
- TPC atual nominalmente: Teoria dos Processos Coordenativos;
- núcleo teórico v0.8: ainda não migrado conceitualmente;
- Constituição: não alterada;
- Documento Canônico: não alterado;
- `01-teoria/TPC.md`: não alterado;
- `docs/context.md`: não alterado;
- `AGENTS.md`: não alterado;
- push: não realizado nesta etapa.

---

# 30. Regra para retomada por outro agente

Antes de qualquer alteração:

1. ler este checkpoint;
2. ler o checkpoint Parte 1;
3. ler `AUDITORIA_RECANONIZACAO_2026-08-07.md`;
4. ler `README.md`;
5. ler `DEC-ARQ-001`;
6. ler `DEC-CONC-001`;
7. confirmar branch;
8. confirmar working tree;
9. confirmar HEAD;
10. retomar pela inspeção do commit `5529403`.

A prioridade imediata não é modernizar software nem publicar a branch.

A prioridade é compreender corretamente a transição:

**Teoria da Persistência da Coordenação → Teoria dos Processos Coordenativos**

sem apagar a genealogia e sem atribuir retroativamente à formulação v0.8 conceitos que ainda não foram formalizados.

---

## Estado de parada

A recuperação técnica principal está preservada.

A integração com `origin/main` deixou de ser um problema porque a `main` já está ancestralmente incorporada.

O novo problema identificado é mais profundo:

> a representação pública e a decisão conceitual avançaram para uma TPC ampliada, enquanto parte relevante do núcleo teórico e da governança ainda representa explicitamente o estado candidato v0.8.

Essa divergência não deve ser escondida.

Ela deve ser tratada como o próximo objeto da recanonização.