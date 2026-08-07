# Checkpoint de Recanonização — 07/08/2026

## Contexto

Durante a reconstrução do repositório `informodinamica-canonical`, foi identificado que diferentes branches preservavam estados distintos do programa.

A `origin/main` continha a versão pública mais recente da pesquisa, incluindo a mudança conceitual de TPC para **Teoria dos Processos Coordenativos**, mas havia perdido centenas de arquivos existentes em estados anteriores.

A branch `atlas-restaurado-v1`, por outro lado, preservava uma árvore substancialmente mais completa, contendo teoria, pesquisa, produtos, agentes, métricas, protocolos, publicações, laboratório e implementações do ecossistema OPERA.

A estratégia adotada deixou de ser simplesmente sincronizar branches e passou a ser uma **recanonização controlada**: reconstruir deliberadamente o estado canônico a partir das representações sobreviventes, preservando proveniência e validando os sistemas recuperados.

---

## Branch atual

```text
recanonizacao-v0.9
```

A branch foi criada a partir de:

```text
atlas-restaurado-v1
```

Base histórica relevante:

```text
af0245a
rescue: restaura entrypoint do frontend opera atlas
```

Tag associada:

```text
rescue-atlas-restored-v1
```

---

## Decisões preservadas

### Separação arquitetural Atlas × Canônico

Commit:

```text
9b4f7c3
docs: registra separacao arquitetural atlas e canonico
```

Documento:

```text
docs/decisoes/DEC-ARQ-001-separacao-atlas-canonico.md
```

### Snapshot do README anterior

Commit:

```text
bb18854
chore: preserva snapshot do README antes da reconstrução arquitetural
```

Arquivo:

```text
README-backup-antes-reconstrucao.md
```

### Mudança conceitual da TPC

Foi formalizada a migração de:

```text
Teoria da Persistência da Coordenação
```

para:

```text
Teoria dos Processos Coordenativos
```

A sigla TPC permanece.

Commit:

```text
5529403
docs: formaliza TPC como Teoria dos Processos Coordenativos
```

Documento:

```text
docs/decisoes/DEC-CONC-001-migracao-nomenclatura-tpc.md
```

Importante: documentos históricos ainda podem usar a nomenclatura anterior. Não realizar substituição global automática. A migração conceitual deve preservar contexto histórico e proveniência.

### `.gitignore`

O `.gitignore` foi sincronizado com o estado público mais recente.

Commit:

```text
ae3ad93
chore: sincroniza gitignore com estado publico atual
```

---

# Estado estrutural recuperado

A árvore da `recanonizacao-v0.9` voltou a conter simultaneamente:

```text
01-teoria/
02-aplicacoes/
03-pesquisa/
agents/
docs/
hypotheses/
lab/
laws/
manifest/
metrics/
ontology/
opera/
produtos/
protocols/
publications/
references/
scripts/
client/
server/
shared/
drizzle/
```

Isso recuperou a coexistência das principais camadas do programa:

1. teoria;
2. aplicações;
3. pesquisa;
4. métricas e ontologia;
5. protocolos;
6. agentes;
7. produtos;
8. software;
9. laboratório experimental;
10. publicações científicas.

---

# OPERA Atlas

O Atlas já estava preservado na base `atlas-restaurado-v1`.

Estrutura principal:

```text
opera/atlas/
```

Inclui frontend, documentação arquitetural, memória do projeto, analytics, componentes e demais artefatos recuperados durante a restauração anterior.

Não alterar o Atlas durante a recanonização sem uma tarefa específica de validação.

---

# OPERA Control

O OPERA Control foi recuperado de:

```text
rescue/pre-force-2026-08-03
```

Origem e destino foram comparados.

Resultado:

```text
137 arquivos na fonte
137 arquivos restaurados
```

O frontend foi instalado e submetido a build.

Resultado da validação:

```text
npm ci
SUCESSO

npm run build
SUCESSO
```

Foram observados avisos de dependências, depreciações e tamanho de chunks, mas nenhuma falha impeditiva de compilação.

Um arquivo gerado durante o build:

```text
opera/control/frontend/src/routeTree.gen.ts
```

foi restaurado ao estado recuperado antes do commit para evitar incorporar mutação produzida pela validação.

Commit da restauração:

```text
6e54e3e
rescue: restaura e valida opera control
```

Resultado:

```text
137 arquivos
23.836 linhas adicionadas
```

O Control deve ser considerado neste momento:

**recuperado estruturalmente e compilável, mas não modernizado nem corrigido.**

Não executar `npm audit fix`, upgrades ou refatorações durante a recanonização.

---

# Copiloto de Obras

O runtime do Copiloto de Obras foi recuperado de:

```text
rescue/pre-force-2026-08-03
```

Destino:

```text
opera/copiloto-obras/
```

Integridade estrutural:

```text
45 arquivos na fonte
45 arquivos restaurados
```

Configuração:

```text
Python >= 3.11
setuptools
openai
pydantic
python-dotenv
pytest
```

Foi instalado localmente com:

```text
python -m pip install -e ".[dev]"
```

Resultado:

```text
instalação concluída com sucesso
```

A suíte completa foi executada:

```text
pytest
```

Resultado:

```text
118 passed in 2.36s
```

Artefatos produzidos pela instalação e pelos testes foram removidos antes do commit:

```text
__pycache__/
*.egg-info/
```

O Copiloto deve ser considerado:

**recuperado, instalável e validado pela suíte de 118 testes.**

---

# README canônico v0.9

O README anterior era curto e refletia apenas parcialmente o estado real do repositório.

Durante a recanonização foi construída uma nova arquitetura de navegação que apresenta:

* Informodinâmica;
* Teoria dos Processos Coordenativos;
* arquitetura do conhecimento;
* teoria;
* pesquisa;
* hipóteses;
* leis;
* métricas;
* ontologia;
* protocolos;
* laboratório;
* publicações;
* produtos;
* ecossistema OPERA;
* software;
* agentes;
* governança;
* caminhos de navegação para pesquisadores, desenvolvedores e parceiros.

A proposta foi revisada contra a árvore efetivamente recuperada antes de substituir o README principal.

Commit:

```text
73809fa
docs: recanoniza readme da informodinamica e ecossistema opera
```

Alterações:

```text
356 inserções
13 remoções
```

Após o commit:

```text
git status --short
```

retornou vazio.

Portanto, o working tree estava limpo ao final desta etapa.

---

# Princípio operacional da recanonização

Durante todo o processo foi adotada a regra:

> Recuperar primeiro. Verificar depois. Modernizar somente em uma etapa futura e explicitamente separada.

Não confundir:

```text
restauração
```

com:

```text
refatoração
modernização
correção de dívida técnica
migração de dependências
```

O objetivo atual é reconstruir uma representação canônica confiável do patrimônio existente.

---

# Próximas tarefas

## 1. Confirmar o commit do Copiloto de Obras

Antes de qualquer nova operação, executar:

```text
git log --oneline --decorate -10
```

Confirmar que existe o commit:

```text
rescue: restaura e valida copiloto de obras
```

Caso ele não exista, verificar o estado do Git antes de qualquer outra alteração e commitar `opera/copiloto-obras` isoladamente.

Não assumir que o commit foi realizado apenas porque os testes passaram.

---

## 2. Auditar a branch inteira

Executar:

```text
git status
git log --oneline --decorate -15
```

Confirmar:

* branch `recanonizacao-v0.9`;
* working tree limpa;
* commits de decisões presentes;
* Control presente;
* Copiloto presente;
* README v0.9 presente.

---

## 3. Comparar recanonização com `origin/main`

Não fazer merge imediatamente.

Primeiro medir diferenças:

```text
git diff --stat origin/main..recanonizacao-v0.9
```

Depois analisar especialmente o que existe na `origin/main` e ainda não está incorporado à recanonização.

A `origin/main` possuía ativos públicos recentes relacionados a:

```text
docs/theory/
docs/experiments/
docs/cross-domain-validation/
lab/
publications/
client/
server/
shared/
drizzle/
```

A existência dos diretórios na recanonização não prova que seus conteúdos mais recentes da `origin/main` estejam presentes.

Comparar conteúdo, não apenas nomes de diretórios.

---

## 4. Recuperar avanços recentes da `origin/main`

Identificar arquivos/commits recentes que devem ser incorporados sem destruir o patrimônio recuperado.

Prioridade científica:

```text
docs/theory/
docs/experiments/
docs/cross-domain-validation/
publications/
lab/
```

Prioridade de aplicação pública:

```text
client/
server/
shared/
drizzle/
```

Fazer integração seletiva e em commits pequenos.

Não executar merge cego de `origin/main`.

---

## 5. Auditar nomenclatura TPC

Mapear ocorrências de:

```text
Teoria da Persistência da Coordenação
```

e:

```text
Teoria dos Processos Coordenativos
```

Classificar cada ocorrência como:

* histórica;
* canônica atual;
* publicação;
* experimento;
* documentação de produto;
* código/interface.

Não fazer substituição global.

A decisão `DEC-CONC-001` governa essa migração.

---

## 6. Validar links do README v0.9

Após a integração dos ativos recentes, verificar todos os caminhos citados no README.

O README deve representar a árvore real, não uma arquitetura desejada.

---

## 7. Registrar a própria recanonização como caso informodinâmico

Produzir posteriormente um documento científico/narrativo sobre este episódio.

Tema:

**A reconstrução do repositório como observação empírica de um processo coordenativo.**

Elementos do caso:

* um sistema perdeu coerência entre suas representações;
* diferentes branches preservaram fragmentos distintos do estado anterior;
* nenhuma representação isolada continha o sistema completo;
* Git, commits, tags, branches, testes, arquivos, logs e memória humana funcionaram como representações parcialmente redundantes;
* a recuperação ocorreu pela recomposição das relações entre essas representações;
* testes permitiram distinguir mera presença de arquivos de capacidade operacional preservada;
* decisões documentadas passaram a funcionar como memória institucional;
* o README reconstruído tornou-se representação navegacional do sistema restaurado.

Questão científica especialmente relevante:

> A resiliência coordenativa depende menos da existência de uma representação perfeita e mais da arquitetura de relações entre representações parcialmente redundantes?

Esse episódio deve ser analisado posteriormente à luz da TPC, sem tratá-lo prematuramente como prova da teoria.

A narrativa desejada deve combinar rigor científico com capacidade de transmitir escala, tempo, perda, reconstrução e descoberta, inspirada pela tradição de divulgação científica que transforma fenômenos cotidianos em perguntas fundamentais.

---

# Regra para o próximo agente

Antes de alterar qualquer arquivo:

1. ler este checkpoint;
2. ler `README.md`;
3. ler `docs/decisoes/DEC-ARQ-001-separacao-atlas-canonico.md`;
4. ler `docs/decisoes/DEC-CONC-001-migracao-nomenclatura-tpc.md`;
5. executar `git status`;
6. executar `git log --oneline --decorate -15`;
7. confirmar a branch atual.

Não realizar merge, rebase, force push, exclusão em massa, atualização automática de dependências ou substituição global de nomenclatura sem nova decisão explícita.

---

## Estado de parada

Ao final da sessão de 07/08/2026:

```text
Branch esperada: recanonizacao-v0.9
README v0.9: commitado
OPERA Atlas: preservado
OPERA Control: restaurado e build validado
Copiloto de Obras: restaurado e 118 testes aprovados
Working tree: limpa após commit do README
Main pública: ainda não deve ser alterada
```

A recanonização ainda não terminou.

Mas existe agora um estado intermediário coerente, recuperável e documentado a partir do qual o trabalho pode continuar sem depender da memória da sessão.
