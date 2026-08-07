# Informodinâmica — Teoria dos Processos Coordenativos (TPC)

**Repositório canônico do programa de pesquisa em Informodinâmica, da Teoria dos Processos Coordenativos e de suas aplicações experimentais e operacionais.**

A **Informodinâmica** investiga como sistemas coordenados mantêm, perdem e recuperam capacidade de coordenação ao longo do tempo, com atenção especial às relações entre acontecimentos, representações, decisões e ação.

Seu núcleo teórico atual é a **Teoria dos Processos Coordenativos (TPC)**.

A TPC investiga processos como persistência, degradação, restauração, acoplamento, desacoplamento, transmissão, detecção, resposta, recalibração e sincronização.

A denominação **Teoria da Persistência da Coordenação**, presente em documentos anteriores deste repositório, corresponde a uma formulação histórica da TPC. A transição conceitual está registrada em `docs/decisoes/DEC-CONC-001-migracao-nomenclatura-tpc.md`.

Este é um programa de pesquisa em desenvolvimento. Suas proposições permanecem abertas à crítica, comparação, teste, falsificação, revisão e substituição.

---

## O problema

Sistemas coordenados não dependem apenas daquilo que acontece.

Dependem também das representações utilizadas para perceber, registrar, comunicar e orientar ação sobre aquilo que acontece.

Essas representações podem assumir muitas formas:

* documentos;
* desenhos;
* cronogramas;
* registros;
* mensagens;
* interfaces;
* bancos de dados;
* sensores;
* logs;
* modelos;
* memória organizacional.

Uma representação pode continuar existindo e ainda assim perder capacidade de orientar adequadamente a ação.

Pode ficar desatualizada.

Pode divergir do estado operacional.

Pode circular sem transmitir aquilo que deveria.

Pode desaparecer enquanto outras representações preservam parte da coordenação.

Pode ser restaurada, substituída ou reconstruída.

A Informodinâmica procura transformar esses fenômenos em problemas observáveis e investigáveis.

---

# Arquitetura do conhecimento

Este repositório preserva diferentes gerações da Informodinâmica.

A coexistência dessas camadas é deliberada. A história conceitual não é tratada como lixo a ser apagado, mas como evidência da trajetória pela qual o programa chegou ao seu estado atual.

## `01-teoria/`

Fundamentos conceituais e matemáticos da Informodinâmica.

Inclui materiais produzidos durante formulações anteriores da TPC.

Esses documentos preservam a genealogia intelectual do programa e não devem ser interpretados automaticamente como a formulação canônica atual.

## `02-aplicacoes/`

Aplicações da Informodinâmica a domínios específicos.

Inclui materiais relacionados à **Teoria da Degradação Operacional (TDO)** e à investigação de sistemas operacionais no domínio da construção civil.

## `03-pesquisa/`

Programa de pesquisa, protocolos experimentais, validação empírica, modelos exploratórios e casos reais.

## `hypotheses/`

Hipóteses formalizadas durante o desenvolvimento do programa.

## `laws/`

Proposições e formulações candidatas a regularidades ou leis do domínio investigado.

## `metrics/`

Instrumentos desenvolvidos para transformar conceitos em observáveis.

Entre os artefatos preservados estão:

* ECO;
* ICO;
* Fliflexação;
* Capital Preservado;
* Slektip.

A existência de uma métrica no repositório não implica que ela esteja universalmente validada.

## `ontology/`

Vocabulário e relações conceituais utilizados para organizar o domínio.

## `protocols/`

Protocolos de ciclo de vida, classificação, pesquisa e governança do conhecimento.

## `references/`

Referências e materiais utilizados na construção do programa.

---

# Pesquisa experimental

A evolução mais recente da Informodinâmica introduziu uma arquitetura orientada a experimentação, comparação entre domínios e rastreabilidade de evidências.

## `docs/`

Documentação científica, metodológica e de governança.

A estrutura inclui materiais teóricos, experimentais, validação interdomínios e decisões tomadas durante a evolução do programa.

## `lab/`

Sistemas de referência, código experimental, sensores e simulações utilizados para transformar proposições teóricas em situações observáveis.

Entre os experimentos desenvolvidos está a investigação de sistemas de **CI/CD** como domínio artificial controlável para observar degradação, detecção e restauração de coordenação.

## `publications/`

Research Packages e materiais destinados à organização de contribuições científicas.

A arquitetura de **Research Packages (RP)** permite separar:

* metodologia;
* experimentos;
* estudos de caso;
* revisão de literatura;
* validação observacional;
* limitações;
* hipóteses concorrentes.

Isso permite que diferentes contribuições sejam avaliadas independentemente, sem exigir que todas dependam da confirmação integral da TPC.

---

# Ecossistema OPERA

A Informodinâmica possui também uma camada aplicada.

O **OPERA** reúne métodos, instrumentos e sistemas desenvolvidos para observar ou intervir sobre problemas reais de coordenação operacional.

Pesquisa e produto são relacionados, mas não equivalentes.

> O funcionamento de uma aplicação pode constituir evidência relevante, mas não confirma por si só uma teoria científica.

## `produtos/`

Representações conceituais e documentais das aplicações.

Entre os sistemas documentados estão:

* **OPERA Copiloto**;
* **OPERA Atlas**;
* **OPERA Control**.

A pasta também preserva estudos e registros derivados de aplicações em campo.

## `opera/`

Implementações de software do ecossistema.

A arquitetura recuperada contém:

- `atlas/`;
- `control/`;
- `copiloto-obras/`.

Esses componentes possuem histórias, arquiteturas e níveis de maturidade diferentes.

Sua presença conjunta no repositório não significa que constituam uma aplicação monolítica.

---

# Software e infraestrutura

O repositório contém ainda infraestrutura executável associada à pesquisa e às aplicações.

## `client/`

Interfaces e aplicações cliente do estado contemporâneo do programa.

## `server/`

Componentes de servidor e serviços associados.

## `shared/`

Estruturas compartilhadas entre componentes.

## `drizzle/`

Schemas, migrações e artefatos relacionados à persistência de dados.

## `scripts/`

Automações e utilitários utilizados na manutenção e operação do repositório.

---

# Agentes e coordenação humano-IA

## `agents/`

Arquiteturas e instruções para agentes especializados.

O repositório preserva papéis relacionados a:

* pesquisa;
* matemática;
* programação;
* arquitetura;
* revisão;
* edição;
* marketing;
* domínio de obras.

Essa camada também funciona como campo de experimentação sobre preservação de contexto, divisão de trabalho cognitivo, handoff e coordenação entre humanos e agentes artificiais.

---

# Governança e rastreabilidade

## `docs/decisoes/`

Decisões conceituais e arquiteturais relevantes são registradas explicitamente.

Entre as decisões preservadas estão:

* a separação arquitetural entre o núcleo canônico e o OPERA Atlas;
* a mudança da expansão da sigla TPC para **Teoria dos Processos Coordenativos**.

A política adotada é simples:

> mudanças conceituais importantes devem permanecer reconstruíveis.

Uma formulação histórica não deve ser silenciosamente reescrita para parecer contemporânea.

Quando um conceito muda, sua trajetória também constitui informação.

---

# Como navegar

### Quero entender a teoria

Comece por:

1. `01-teoria/`
2. `ontology/`
3. `03-pesquisa/`
4. `docs/`

Materiais históricos podem utilizar nomenclaturas anteriores. Consulte `docs/decisoes/` para decisões conceituais posteriores.

### Quero examinar hipóteses e evidências

Explore:

1. `03-pesquisa/`
2. `hypotheses/`
3. `docs/`
4. `lab/`
5. `publications/`

### Quero conhecer as aplicações

Explore:

1. `produtos/README.md`
2. `produtos/opera-produtos.md`
3. `opera/`

### Quero examinar o software

Explore:

1. `client/`
2. `server/`
3. `shared/`
4. `opera/`
5. `scripts/`

### Quero entender a governança

Explore:

1. `protocols/`
2. `ontology/`
3. `docs/decisoes/`

---

# Evolução da TPC

A sigla **TPC** designou inicialmente a:

> **Teoria da Persistência da Coordenação**

Essa formulação colocou no centro da investigação a pergunta sobre como representações mantêm ou perdem capacidade de sustentar coordenação ao longo do tempo.

O desenvolvimento posterior ampliou o problema.

Persistência passou a ser compreendida como uma classe de fenômenos dentro de um espaço maior que também inclui degradação, restauração, acoplamento, desacoplamento, transmissão, detecção, resposta e recalibração.

A denominação canônica atual é:

> **Teoria dos Processos Coordenativos (TPC)**

A formulação anterior permanece preservada como parte da história intelectual da teoria.

---

# Estado do programa

Este repositório é simultaneamente:

* arquivo histórico;
* núcleo teórico;
* laboratório experimental;
* infraestrutura de pesquisa;
* registro de aplicações;
* ambiente de desenvolvimento.

Essa coexistência não representa necessariamente uma arquitetura final.

Ela registra um programa em evolução.

Partes do repositório possuem diferentes níveis de maturidade, evidência e estabilidade. Documentação histórica, hipótese, experimento, métrica, aplicação e produto não devem ser tratados como categorias epistemicamente equivalentes.

---

# Postura científica

A TPC não é apresentada neste repositório como teoria comprovada ou explicação universal da coordenação.

O programa procura construir condições para que suas proposições possam ser:

* definidas;
* operacionalizadas;
* observadas;
* comparadas;
* testadas;
* contestadas;
* refinadas;
* ou rejeitadas.

Isso exige procurar não apenas evidências compatíveis com a teoria, mas também explicações concorrentes, casos negativos, condições de falha e limites de generalização.

Uma teoria que não pode perder também não pode aprender.

---

> **A Informodinâmica investiga não apenas a informação que um sistema possui, mas o que acontece com sua capacidade de agir em conjunto quando as representações que sustentam essa coordenação atravessam o tempo.**
