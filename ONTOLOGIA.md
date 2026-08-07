# Ontologia da TPC

## O que Existe e Como os Conceitos se Relacionam

**Versão candidata:** 0.8 (Agosto de 2026)
**Autor:** Eduardo Martins  
**Status:** Revisão ontológica fundacional — não consolidada

---

## 1. Domínio de Validade

A TPC aplica-se a sistemas nos quais ações dependem da interpretação de representações operacionais que podem persistir e mudar de estado.

**Onde a teoria vale:**

- Sistemas operacionais produtivos (construção, logística, saúde, educação).
- Sistemas digitais, agentes autônomos e arranjos híbridos, desde que representação, interpretação e ação sejam operacionalizáveis.
- Sistemas com múltiplos agentes ou mecanismos que dependem de representações para ações compatíveis.
- Sistemas onde as representações podem se degradar ao longo do tempo.

**Onde a teoria não vale:**

- Sistemas puramente instintivos ou reflexos (sem representação estável).
- Sistemas onde não seja possível identificar estrutura portadora de estado, relação de referência ou mecanismo de interpretação.
- Sistemas onde fatores externos (violência, sabotagem, restrições legais extremas) dominam a dinâmica.

---

## 2. Conceitos Primitivos

Os conceitos primitivos são aqueles que não são definidos por outros conceitos da teoria. Eles são os átomos da ontologia.

| Conceito | Símbolo | Definição |
|----------|---------|-----------|
| Agente | A | Qualquer entidade que interpreta signos e realiza ações. |
| Objeto Operacional | O | A realidade que o signo representa (uma parede, um diagnóstico, uma rota). |
| Representação Operacional | S | Estrutura portadora de estado relacionada a objeto, condição, regra ou ação e interpretável por agentes ou mecanismos. |
| Tempo | t | Dimensão ao longo da qual os signos evoluem e a coordenação ocorre. |

---

## 3. Conceitos Derivados

Os conceitos derivados são definidos a partir dos primitivos e de suas relações.

### 3.1. Estado Operacional (EO)

| Propriedade | Descrição |
|-------------|-----------|
| Definição | Vetor que representa o estado de um signo operacional em um instante t. |
| Símbolo | EO(S,t) |
| Composição | EO(S,t) = (P, F, U, C, R, X) |
| Explicação | O estado da representação é composto por seis atributos candidatos: persistência, fidelidade, atualidade, coerência, rastreabilidade e contexto. Ele não mede coordenação. |

### 3.2. Interpretação (I)

| Propriedade | Descrição |
|-------------|-----------|
| Definição | A ação que um agente realiza com base em um signo. |
| Símbolo | I(A, S, t) |
| Explicação | A interpretação é a tradução do signo em ação por um agente. Ela depende do estado operacional do signo e do agente. |

### 3.3. Capacidade Coordenadora da Representação (K_R)

| Propriedade | Descrição |
|-------------|-----------|
| Definição | Propriedade relacional candidata de uma representação sustentar interpretações compatíveis para uma tarefa. |
| Símbolo | K_R(S,t;A,T,Z) |
| Explicação | Depende do estado de S, dos agentes ou mecanismos A, da tarefa T e do ambiente Z; não é atributo intrínseco isolado. |

### 3.4. Coordenação Observada (K_C)

| Propriedade | Descrição |
|-------------|-----------|
| Definição | O alinhamento de ações entre agentes mediado por signos operacionais. |
| Símbolo | K_C(A_1, A_2, ..., A_n, S, t) |
| Explicação | A coordenação é o resultado emergente de interpretações e ações compatíveis, condicionado também por tarefa e ambiente. |

### 3.5. Degradação Representacional (D_R)

| Propriedade | Descrição |
|-------------|-----------|
| Definição | Fenômeno de perda de atributos do estado ou da capacidade coordenadora da representação. |
| Símbolo | D_R |
| Explicação | Não se confunde com D(S,t), índice matemático candidato usado para estimá-la. |

### 3.6. ECO — Evento de Corrosão da Coordenação (E)

| Propriedade | Descrição |
|-------------|-----------|
| Definição | O ponto em que a coordenação se quebra. |
| Símbolo | E(A_1, A_2, ..., A_n, S, t) |
| Explicação | O ECO é um desfecho coordenacional observável. Sua associação causal com degradação representacional deve ser testada. |

---

## 4. Diagrama da Ontologia

```
Domínio de Validade
        │
        ▼
┌───────────────────────────────────────────────┐
│                                               │
│  OBJETO (O) ─────┐                            │
│                   │                            │
│                   ▼                            │
│     REPRESENTAÇÃO OPERACIONAL (S)              │
│                   │                            │
│                   ▼                            │
│           ESTADO OPERACIONAL (EO)             │
│           ├── Persistência (P)                │
│           ├── Fidelidade (F)                  │
│           ├── Atualidade (U)                  │
│           ├── Coerência (C)                   │
│           ├── Rastreabilidade (R)             │
│           └── Contexto (X)                    │
│                                               │
│        AGENTE / TAREFA / AMBIENTE              │
│                   │                            │
│                   ▼                            │
│ CAPACIDADE COORDENADORA DA REPRESENTAÇÃO (K_R) │
│                   │                            │
│                   ▼                            │
│           INTERPRETAÇÃO (I)                    │
│                   │                            │
│                   ▼                            │
│      COORDENAÇÃO OBSERVADA (K_C)               │
│                   │                            │
│                   ▼                            │
│        ECO (E) — desfecho possível             │
│                                               │
│  TEMPO (t) — atravessa tudo                   │
│                                               │
└───────────────────────────────────────────────┘
```

---

## 5. Relações entre Conceitos

| Relação | De | Para | Descrição |
|---------|----|----|-----------|
| Representação | S | O | O signo representa o objeto. |
| Interpretação | A | S | O agente interpreta o signo. |
| Estado | S | EO | O signo possui um estado operacional. |
| Capacidade coordenadora | EO, A, T, Z | K_R | Estado, intérpretes, tarefa e ambiente condicionam a capacidade da representação. |
| Coordenação | I | K_C | Interpretações e ações compatíveis produzem coordenação observável. |
| Degradação | EO, K_R | D_R | A representação perde atributos ou capacidade relacional. |
| Índice candidato | EO | D(S,t) | Uma função estima degradação sem se confundir com o fenômeno. |
| ECO | K_C | E | O desfecho registra falha coordenacional observada. |

---

## A Frase que Define essa Arquitetura

> *"Ontologia pergunta: 'o que existe?' Axiomas perguntam: 'o que assumimos?' Proposições perguntam: 'o que decorre?' Formalização pergunta: 'como medir?' Juntas, elas transformam uma teoria em um programa de pesquisa."*
