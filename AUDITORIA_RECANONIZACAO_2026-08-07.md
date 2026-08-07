# Auditoria da Recanonização — 07/08/2026

**Branch auditada:** `recanonizacao-v0.9`  
**Data:** 07/08/2026  
**Natureza:** relatório diagnóstico  
**Status:** não normativo  
**Escopo:** integridade histórica, estrutural e conceitual da recanonização do repositório `informodinamica-canonical`.

## 1. Objetivo

Registrar as verificações realizadas após a recuperação estrutural do repositório e antes de qualquer alteração da representação pública.

Esta auditoria não constitui uma nova versão canônica, não promove a branch `recanonizacao-v0.9` a release e não substitui decisões arquiteturais ou conceituais existentes.

O princípio operacional permanece:

> Recuperar primeiro. Verificar depois. Modernizar somente em etapa futura e explicitamente separada.

## 2. Estado do Git verificado

Branch:

`recanonizacao-v0.9`

HEAD no início e ao final da auditoria:

`e566460 — docs: registra checkpoint da recanonizacao v0.9`

O `git status --short` permaneceu vazio durante as verificações.

Portanto, a auditoria foi realizada em modo somente leitura e não produziu alterações no working tree.

## 3. Relação com origin/main

Foi executada comparação de ancestralidade entre:

- `origin/main`
- `recanonizacao-v0.9`

Resultado:

`git rev-list --left-right --count origin/main...recanonizacao-v0.9`

retornou:

`0 50`

O ancestral comum identificado foi:

`9e6777669182c8f4286560edc575b27f3e5fbe0c`

A verificação:

`git merge-base --is-ancestor origin/main recanonizacao-v0.9`

retornou código:

`0`

### Conclusão

`origin/main` é ancestral de `recanonizacao-v0.9`.

Portanto, os avanços existentes na `origin/main` já estão incorporados à história da recanonização.

Não foi identificada necessidade de merge de `origin/main` para `recanonizacao-v0.9`.

## 4. Preservação da aplicação pública

Foi comparado o conteúdo dos caminhos:

- `client/`
- `server/`
- `shared/`
- `package.json`
- `vite.config.ts`

O comando de diff entre `origin/main` e `recanonizacao-v0.9` não apresentou diferenças nesses caminhos.

Também não foram identificados arquivos deletados ou renomeados em relação à `origin/main`.

A alteração deliberada sobre arquivo previamente existente identificada durante a comparação foi:

`README.md`

Além disso, novos arquivos e estruturas foram adicionados pela recuperação.

### Conclusão

A recanonização preserva a aplicação pública herdada da `origin/main` enquanto reincorpora estruturas históricas e científicas recuperadas.

## 5. Field Collection V2

O histórico de `client/src/pages/NewObservation.tsx` confirmou a presença da cadeia de desenvolvimento da coleta local, incluindo:

- `72f54c1 — feat(field-form): add local observation draft flow`
- `e714e0b — feat(field-form): register and list local observations`
- `4666448 — feat(field-form): improve mobile observation flow`
- `747673e — feat(field-v2): add multi-local observations, organizations, corpus JSON/CSV export/import and enrichment`
- `041424e — feat(field-v2): add persistent backup on import and separate analysisNotes/hypotheses`
- `9e67776 — Merge pull request: Sprint Field Collection V2`

A verificação de ancestralidade de `747673e` em relação à recanonização retornou código `0`.

Arquivos centrais localizados:

- `client/src/lib/observationStorage.ts`
- `client/src/pages/LocalObservationDetail.tsx`
- `client/src/pages/LocalObservations.tsx`
- `client/src/pages/NewObservation.tsx`
- `client/src/types/observation.ts`

### Conclusão

A Field Collection V2 integrada à `origin/main` está preservada na `recanonizacao-v0.9`.

## 6. Sistemas recuperados

### OPERA Atlas

Permanece preservado em:

`opera/atlas/`

Sua arquitetura é distinta da aplicação Canonical localizada em `client/`, conforme registrado em:

`docs/decisoes/DEC-ARQ-001-separacao-atlas-canonico.md`

Não foi realizada tentativa de fusão entre as duas arquiteturas.

### OPERA Control

Commit de recuperação confirmado:

`6e54e3e — rescue: restaura e valida opera control`

Estado herdado do checkpoint:

- 137 arquivos recuperados;
- `npm ci` concluído;
- `npm run build` concluído;
- sem modernização automática.

### Copiloto de Obras

Commit de recuperação confirmado:

`861763e — rescue: restaura e valida copiloto de obras`

Estado herdado do checkpoint:

- 45 arquivos recuperados;
- instalação editável concluída;
- 118 testes aprovados.

## 7. README recanonizado

Commit confirmado:

`73809fa — docs: recanoniza readme da informodinamica e ecossistema opera`

Foram verificados os principais caminhos apresentados pela navegação do README.

Todos os caminhos amostrados existiam na árvore:

- `01-teoria/`
- `ontology/`
- `03-pesquisa/`
- `docs/`
- `hypotheses/`
- `lab/`
- `publications/`
- `produtos/README.md`
- `produtos/opera-produtos.md`
- `opera/`
- `client/`
- `server/`
- `shared/`
- `scripts/`
- `protocols/`
- `docs/decisoes/`

### Conclusão

O README v0.9 representa caminhos efetivamente existentes na árvore recuperada para o conjunto verificado.

Esta verificação não equivale ainda a uma auditoria automatizada de todos os links Markdown.

## 8. Migração conceitual da TPC

A decisão vigente é:

`docs/decisoes/DEC-CONC-001-migracao-nomenclatura-tpc.md`

TPC passa a significar canonicamente:

**Teoria dos Processos Coordenativos**

A formulação:

**Teoria da Persistência da Coordenação**

é preservada como formulação histórica anterior.

A auditoria encontrou:

- 32 arquivos `.md` ou `.tex` contendo a formulação histórica;
- 4 arquivos `.md` ou `.tex` contendo explicitamente a formulação atual.

Esses números não representam automaticamente 32 inconsistências.

A própria decisão `DEC-CONC-001` determina classificação contextual e proíbe substituição global automática.

## 9. Fronteira conceitual identificada

Foram identificadas ocorrências da formulação histórica em documentos com diferentes funções.

Entre os documentos ativos ou de autoridade estão:

- `AGENTS.md`
- `DOCUMENTO_CANONICO.md`
- `docs/context.md`
- `CONSTITUICAO.md`

A análise mostrou que esses documentos antecedem o commit:

`5529403 — docs: formaliza TPC como Teoria dos Processos Coordenativos`

### AGENTS.md

É documento operacional ativo e ainda apresenta como missão a preservação e evolução da antiga “Teoria da Persistência da Coordenação”.

Por ser documento vivo de orientação de agentes, constitui candidato a atualização controlada.

### docs/context.md

É documento ativo destinado a fornecer contexto operacional rápido.

Ainda identifica a teoria central como “Teoria da Persistência da Coordenação” e contém referências de versionamento anteriores ao estado atual.

Constitui candidato a atualização controlada.

### DOCUMENTO_CANONICO.md

Identifica-se como:

- versão candidata 0.8;
- revisão fundacional não consolidada.

Sua formulação pertence a um estado conceitual anterior à decisão `DEC-CONC-001`.

Por possuir autoridade documental e valor genealógico, não deve sofrer simples substituição terminológica sem decisão específica.

### CONSTITUICAO.md

Identifica-se como:

- revisão candidata 1.2;
- não consolidada;
- adotada antes da decisão `DEC-CONC-001`.

Seu conteúdo não apresenta apenas uma expansão antiga da sigla TPC.

A Constituição define a persistência representacional como objeto central da disciplina e, portanto, representa uma formulação teórica anterior cuja eventual atualização pode exigir revisão conceitual e de governança.

Não deve ser modificada como simples correção de nomenclatura.

## 10. Publicações e genealogia

Foram encontradas ocorrências da formulação histórica em Research Packages e documentos de publicação produzidos antes da decisão `DEC-CONC-001`.

Essas ocorrências podem constituir estados históricos legítimos do programa de pesquisa.

Não devem ser atualizadas automaticamente.

A preservação da nomenclatura original pode ser necessária para manter rastreabilidade da evolução intelectual da teoria.

## 11. Estado de versionamento observado

O nome da branch:

`recanonizacao-v0.9`

não foi interpretado como declaração de release canônica v0.9.

Manifestos existentes:

- `manifest/v0.2.0.manifest.md`
- `manifest/v0.6.0.manifest.md`
- `manifest/v0.7.1.manifest.md`

O `CHANGELOG.md` registra v0.7.0 como versão publicada, enquanto documentos posteriores registram estados candidatos e consolidações locais.

Portanto, esta auditoria é denominada pela operação e pela data, não como `AUDITORIA_v0.9.md`.

## 12. Achados principais

### A-01 — origin/main já está incorporada

A `origin/main` é ancestral da branch de recanonização.

**Consequência:** não realizar merge da `origin/main` apenas para recuperar seus avanços.

### A-02 — aplicação pública foi preservada

Os caminhos centrais da aplicação pública comparados não apresentam divergência em relação à `origin/main`.

**Consequência:** a recuperação histórica coexistiu com a aplicação pública recente sem substituí-la nos caminhos auditados.

### A-03 — Field Collection V2 está preservada

A cadeia de commits e os arquivos centrais da Field Collection V2 estão presentes.

**Consequência:** não é necessária recuperação separada dessa funcionalidade.

### A-04 — existe dívida de sincronização conceitual

Documentos ativos e documentos de autoridade ainda representam estados anteriores à ampliação conceitual da TPC.

**Consequência:** classificar cada documento antes de qualquer atualização.

### A-05 — mudança da Constituição não é meramente terminológica

A Constituição candidata anterior define o próprio objeto da disciplina em torno da persistência representacional.

**Consequência:** eventual atualização exige revisão conceitual/governamental própria, não busca e substituição.

## 13. Próximos passos recomendados

1. Classificar as 32 ocorrências da formulação histórica da TPC por função documental.
2. Atualizar primeiro apenas documentos claramente `ACTIVE` e operacionais, mediante revisão explícita.
3. Não alterar `CONSTITUICAO.md` ou `DOCUMENTO_CANONICO.md` sem decisão específica.
4. Preservar Research Packages e publicações históricas quando a nomenclatura antiga representar corretamente o estado intelectual da época.
5. Realizar posteriormente verificação completa dos links Markdown.
6. Validar novamente builds e testes apenas quando houver necessidade técnica ou antes da promoção pública.
7. Somente após estabilização documental decidir o processo de promoção da recanonização para nova representação pública.

## 14. Observação informodinâmica

A própria recuperação produziu um caso observacional relevante para a TPC.

Branches, commits, tags, código, testes, documentos e memória humana preservaram partes diferentes do estado anterior. A reconstrução tornou-se possível pela recomposição dessas representações parcialmente redundantes.

Esse episódio pode sustentar um estudo de caso sobre resiliência coordenativa e recuperação de coerência entre representações.

Ele não deve ser tratado, neste estágio, como prova da TPC.

A análise científica do episódio deverá ser realizada separadamente da operação técnica de recanonização.