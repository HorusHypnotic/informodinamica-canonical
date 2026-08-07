# Revisão Fundacional Representacional - candidata v0.8

**Estado:** `ACTIVE` - proposta de mudança canônica, não consolidada
**Data:** 2 de agosto de 2026
**Escopo:** ontologia, teoria, formalização, hipóteses e posicionamento de produto

## Decisão proposta

No domínio da TPC, a representação operacional passa a ser o objeto analítico primário. Coordenação é um resultado relacional emergente da interpretação compatível de representações por agentes ou mecanismos. A teoria mantém o nome Teoria da Persistência da Coordenação, mas investiga primariamente como representações persistem e conservam ou perdem capacidade de sustentar coordenação.

## Formulação não circular

- **Representação operacional:** estrutura portadora de estado que mantém relação especificável com um objeto, condição, regra ou ação e pode ser interpretada por agentes ou mecanismos.
- **Capacidade coordenadora da representação:** propriedade relacional candidata que expressa quanto uma representação, em determinado ambiente, permite interpretações compatíveis para ação.
- **Coordenação:** padrão observável de compatibilidade entre ações produzido sob dependência de representações e condições operacionais.

A representação não é definida pela coordenação efetivamente produzida. Ela pode existir, persistir e falhar em coordenar. A capacidade coordenadora depende da representação, dos intérpretes, da tarefa e do ambiente; portanto não é uma propriedade intrínseca isolada.

## Hierarquia candidata

```text
Representação operacional e seu estado
        |
Capacidade coordenadora relacional da representação
        |
Interpretações compatíveis
        |
Coordenação observada
        |
Resultados operacionais
```

## Decisões formais

1. `EO(S,t)` descreve exclusivamente o estado da representação `S`.
2. `X(S,t)` permanece Contexto operacional.
3. `K_R(S,t;A,T,Z)` designa a capacidade coordenadora da representação, condicionada a agentes, tarefa e ambiente.
4. `K_C(A,S,t)` designa coordenação observada ou estimada no sistema.
5. Degradação é o fenômeno de perda de atributos ou de capacidade representacional.
6. `D(S,t)` é apenas um índice candidato dessa perda; fenômeno e índice não são equivalentes.
7. Um ECO continua sendo evento observável de falha coordenacional, usado como desfecho, não como medida direta de toda degradação.

## Impacto sobre artefatos existentes

| Artefato | Impacto |
|---|---|
| IDR-0001 | Coordenação passa a ser explicitamente emergente e relacional |
| IDR-0002 | Representação recebe definição independente do sucesso coordenacional |
| IDR-0004 | Deformação passa a incidir sobre estado e capacidade da representação |
| IDR-0006 | Mantido como fenômeno secundário do sistema |
| LAW-001 a LAW-004 | Reinterpretadas sob precedência analítica da representação |
| HYP-001 | Direção causal torna-se hipótese, não conclusão garantida |
| EO | Estado da representação, nunca sinônimo de coordenação |
| Produtos | Infraestrutura representacional; não “agentes que coordenam” |

## Riscos e pendências

- A primariedade é analítica dentro do domínio, não metafísica ou universal.
- A causalidade representação-coordenação permanece hipótese empírica.
- Sistemas humanos, digitais, autônomos e híbridos exigem definições operacionais distintas de agente e interpretação.
- Escopo ampliado não equivale a validação fora da construção civil.
- Alterações canônicas exigem revisão humana, estabilização textual e processo de versão antes de manifesto ou publicação.
