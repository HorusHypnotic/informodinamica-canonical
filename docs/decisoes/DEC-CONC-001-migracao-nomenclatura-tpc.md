# DEC-CONC-001 — Migração de nomenclatura da TPC

**Status:** Aceita
**Data:** 07/08/2026
**Escopo:** Informodinâmica — Núcleo Canônico

## Contexto

Durante a evolução do programa de pesquisa, a sigla **TPC** foi inicialmente utilizada para designar a **Teoria da Persistência da Coordenação**.

Essa formulação enfatizava um problema central da investigação: compreender como representações operacionais persistem, degradam ou recuperam sua capacidade de sustentar coordenação ao longo do tempo.

O desenvolvimento posterior do programa ampliou o objeto investigado. Persistência, degradação e restauração passaram a ser tratadas como fenômenos pertencentes a uma classe mais ampla de processos relacionados à coordenação.

Como consequência, a denominação anterior tornou-se estreita para representar o escopo atual da teoria.

## Decisão

A partir desta decisão, a sigla **TPC** passa a designar canonicamente:

> **Teoria dos Processos Coordenativos**

A denominação:

> **Teoria da Persistência da Coordenação**

passa a ser tratada como **formulação histórica anterior da TPC**.

Ela não deve ser utilizada como expansão atual da sigla em novos documentos canônicos.

## Relação conceitual

A mudança de nomenclatura não implica que o problema da persistência tenha sido abandonado.

Persistência continua sendo um fenômeno relevante para a investigação, juntamente com processos como:

* degradação;
* restauração;
* acoplamento;
* desacoplamento;
* transmissão;
* detecção;
* resposta;
* recalibração;
* sincronização entre representações e estados operacionais.

Assim, a mudança representa uma **ampliação de escopo**, e não simplesmente uma substituição terminológica.

## Estrutura atual

A relação conceitual adotada passa a ser representada provisoriamente como:

```text
Informodinâmica
        │
        ▼
Teoria dos Processos Coordenativos (TPC)
        │
        ├── persistência
        ├── degradação
        ├── restauração
        ├── acoplamento
        ├── sincronização
        └── outros processos coordenativos sob investigação
```

Essa estrutura permanece sujeita a revisão conforme o programa de pesquisa evolui.

## Consequências documentais

Documentos que ainda utilizam **Teoria da Persistência da Coordenação** não devem ser automaticamente considerados inválidos.

Eles podem representar:

1. estados históricos legítimos do desenvolvimento da teoria;
2. documentos ainda não migrados;
3. formulações cujo contexto histórico deve ser preservado.

A atualização desses documentos deverá ocorrer de forma controlada, verificando se a mudança é apenas terminológica ou se exige revisão conceitual do conteúdo.

Não deve ser realizada substituição global automática da expressão antiga pela nova.

## Regra para novos documentos

Novos documentos canônicos devem utilizar:

> **Informodinâmica — Teoria dos Processos Coordenativos (TPC)**

quando for necessário apresentar conjuntamente o programa e sua teoria central.

Quando utilizada isoladamente:

> **Teoria dos Processos Coordenativos (TPC)**

## Evidência da transição

No estado remoto analisado em 07/08/2026, a nova denominação já estava registrada em:

* `README.md`;
* `docs/experiments/EXP-001_CI-CD/protocol.md`.

A denominação histórica ainda permanecia em documentos de pesquisa, publicações, interfaces e Research Packages.

Essa coexistência foi identificada durante a recuperação e reunificação do repositório e motivou a formalização desta decisão.

## Princípio de preservação

A evolução conceitual do programa deve permanecer rastreável.

O objetivo da migração não é apagar a história da teoria, mas distinguir claramente:

> **o que a teoria foi, o que ela é atualmente e como ocorreu a transição entre esses estados.**
