# Formalização Matemática da TPC

## Como os Conceitos são Representados, Medidos e Testados

**Versão candidata:** 0.8 (Agosto de 2026)
**Autor:** Eduardo Martins  
**Status:** Revisão formal fundacional — não consolidada

---

## 1. Vocabulário Matemático

| Símbolo | Significado |
|---------|-------------|
| S | Signo operacional |
| A | Agente |
| O | Objeto operacional |
| t | Tempo |
| EO(S,t) | Estado operacional do signo S no instante t |
| P(S,t) | Persistência |
| F(S,t) | Fidelidade |
| U(S,t) | Atualidade |
| C(S,t) | Coerência |
| R(S,t) | Rastreabilidade |
| X(S,t) | Contexto |
| K_R(S,t;A,T,Z) | Capacidade coordenadora da representação condicionada a agentes, tarefa e ambiente |
| K_C(A,S,t) | Coordenação observada ou estimada no sistema |
| B(S,t) | Ambiguidade (entropia interpretativa) |
| D_R | Fenômeno de degradação representacional |
| D(S,t) | Índice candidato de degradação da representação no instante t |
| θ | Limiar de falha da coordenação |
| α_i | Peso do atributo i (pode depender do domínio) |
| E | ECO (0 ou 1) |

---

## 2. Definições Formais

### 2.1. Estado Operacional

```
EO(S,t) = (P(S,t), F(S,t), U(S,t), C(S,t), R(S,t), X(S,t))
```

Cada atributo é uma função do tempo e descreve a representação, não a coordenação. `X` permanece Contexto operacional.

### 2.1.1. Capacidade Coordenadora da Representação

```text
K_R(S,t;A,T,Z) = g(EO(S,t), A, T, Z)
```

`g` não está definida nem validada. Agentes ou mecanismos `A`, tarefa `T` e ambiente `Z` tornam a capacidade relacional, não intrínseca.

### 2.1.2. Coordenação Observada

```text
K_C(A,S,t) = h(K_R, I(A,S,t), T, Z)
```

Essa decomposição expressa uma hipótese causal candidata. `K_C` deve ser observado independentemente de `EO` para evitar tautologia.

### 2.2. Persistência

```
P(t) = e^{-λ_P · t}    (modelo candidato)
```

### 2.3. Fidelidade

```
F(S,t) = 1 - ‖S(t) - O(t)‖ / ‖O(t)‖
```

### 2.4. Atualidade

```
U(t) = 1 / (1 + τ · (t - t₀))
```

### 2.5. Coerência

```
C(S,t) = 1 - (1/n) · Σᵢⱼ ‖Sᵢ(t) - Sⱼ(t)‖
```

### 2.6. Rastreabilidade

```
R(S,t) = Metadados completos / Total de metadados exigidos
```

### 2.7. Contexto

```
X(S,t) = 1 - (Erros de interpretação / Total de consultas)
```

### 2.8. Ambiguidade

```
B(S,t) = -Σᵢ₌₁ⁿ pᵢ · log(pᵢ) + γ · Custo médio
```

### 2.9. Índice Candidato de Degradação

```
D(S,t) = Σᵢ₌₁⁶ αᵢ · (1 - atributoᵢ(t))
```

Onde atributoᵢ ∈ {P, F, U, C, R, X}.

Os pesos αᵢ podem variar com o domínio:

```
αᵢ = αᵢ(domínio)
```

`D_R` é o fenômeno de perda de atributos ou de capacidade representacional. `D(S,t)` é apenas uma entre várias operacionalizações possíveis. O modelo aditivo deve ser comparado com alternativas multiplicativas, geométricas, interativas e de limiar.

### 2.10. ECO

```
Pr(E=1) = q(D(S,t), A, T, Z)
```

A regra determinística `E=1` quando `D>θ` permanece apenas como modelo concorrente de limiar; não é assumida como lei.

---

## 3. Como os Modelos Serão Calibrados

| Parâmetro | Método de calibração |
|-----------|---------------------|
| λ_P | Regressão exponencial com dados de persistência ao longo do tempo. |
| τ | Regressão com dados de atualidade. |
| αᵢ | Estimação com separação entre atributos representacionais e desfechos de coordenação. |
| θ | Análise de pontos de ruptura (change point detection) em dados históricos de ECOs. |
| γ | Calibração com base no custo médio de erro em cada domínio. |

---

## 4. Métricas de Campo

| Conceito | Métrica | Fonte |
|----------|---------|-------|
| Persistência | Número de acessos bem-sucedidos / total de tentativas | Logs de acesso |
| Fidelidade | 1 - (erro de medição / valor nominal) | Inspeção |
| Atualidade | 1 / (1 + atraso médio) | Logs de atualização |
| Coerência | 1 - (número de conflitos / número de comparações) | Auditoria |
| Rastreabilidade | Metadados completos / total de metadados | Auditoria APMO |
| Contexto | Entendimento correto / total de consultas | Survey |
| Ambiguidade | Entropia das interpretações | Survey com múltiplos agentes |
| Degradação | Índices concorrentes de perda representacional | Combinado dos anteriores |
| ECO | Ocorrência de retrabalho, atraso, erro | Registros de produção |
