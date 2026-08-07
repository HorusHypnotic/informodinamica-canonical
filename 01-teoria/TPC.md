# TPC — Teoria da Persistência da Coordenação

**Versão candidata:** 0.8.0
**Data da revisão:** 02/08/2026
**Autor:** Eduardo Martins
**Status:** Documento canônico em revisão fundacional candidata v0.8

---

## 1. Objeto e Postulado Fundamental

> **Em sistemas no domínio da TPC, a persistência da coordenação depende de representações operacionais persistentes e interpretáveis.**

A TPC investiga primariamente representações operacionais: como seu estado evolui e como elas mantêm ou perdem capacidade de sustentar interpretações compatíveis. Coordenação é o desfecho relacional observável, não uma propriedade automática ou intrínseca da representação.

No modelo candidato, `EO(S,t)` descreve o estado da representação; `K_R(S,t;A,T,Z)` descreve sua capacidade coordenadora condicionada a agentes, tarefa e ambiente; `K_C(A,S,t)` descreve coordenação observada. A primariedade da representação é analítica dentro do domínio, não uma tese metafísica universal.

**Nota empírica:** a dependência será enfraquecida se houver coordenação persistente no domínio declarado sem representação operacional identificável, ou se o estado representacional não acrescentar poder explicativo ou preditivo sobre coordenação após controles adequados.

**Referências:**

- Hutchins, E. (1995). *Cognition in the Wild*.
- Shannon, C. E. (1948). *A Mathematical Theory of Communication*.

---

## 2. Definições Fundamentais

### 2.1. Coordenação (IDR-0001)

Resultado relacional emergente no qual agentes ou mecanismos produzem ações compatíveis ao interpretar representações sob condições operacionais determinadas.

### 2.2. Representação Operacional (IDR-0002)

Estrutura portadora de estado que mantém relação especificável com um objeto, condição, regra ou ação e pode ser interpretada por agentes ou mecanismos.

**Critérios de representação:**

1. **Estado identificável** — admite descrição em um instante ou versão.
2. **Relação de referência** — relaciona-se a objeto, condição, regra ou ação especificável.
3. **Interpretabilidade** — pode produzir efeitos em agentes ou mecanismos sob condições declaradas.
4. **Continuidade potencial** — pode ser preservada, transmitida ou transformada ao longo do tempo.

Compartilhamento e sucesso coordenacional não são requisitos definicionais: uma representação pode existir sem ser compartilhada ou falhar em coordenar.

### 2.3. Estado coordenado (IDR-0003)

Condição em que agentes compartilham representações compatíveis para ação coerente sem retrabalho.

### 2.4. Deformação representacional (IDR-0004)

Alteração que reduz atributos do estado operacional ou a capacidade da representação sustentar interpretações compatíveis.

### 2.5. Resiliência representacional (IDR-0005)

Capacidade de restaurar ou preservar a integridade funcional da representação.

### 2.6. Persistência da coordenação (IDR-0006)

Propriedade secundária de um sistema de manter ações compatíveis ao longo do tempo sob dependência de representações persistentes e condições adequadas.

### 2.7. Fliflexação (IDR-0007)

Capacidade de restaurar atributos e relações de representações degradadas, com recuperação coordenacional tratada como desfecho separado.

### 2.8. Capital Preservado (IDR-0008)

Coordenação preservada que se traduziu em valor econômico.

### 2.9. Slektip (IDR-0009)

Mecanismo de transferência de coordenação entre ciclos operacionais.

### 2.10. ECO — Evento de Corrosão Operacional (IDR-0010)

Evento observável em que a coordenação necessária à ação falhou. É desfecho candidato de degradação representacional, não medida direta de toda degradação.

### 2.11. ICO — Índice de Corrosão Operacional (IDR-0011)

Medida da gravidade da falha de persistência (Impacto x Recorrência x Persistência).

### 2.12. IFX — Índice de Fliflexação (IDR-0012)

Medida da maturidade da Fliflexação (Sensibilidade + Precisão + Velocidade + Aprendizado).

---

## 3. Proposições (Leis)

### 3.1. LAW-001 — Mediação Representacional

> No domínio da TPC, coordenação persistente é mediada por representações operacionais.

A representação tem precedência analítica. A associação entre seu estado, sua capacidade coordenadora e a coordenação observada deve ser estimada, não presumida como identidade.

### 3.2. LAW-002 — Persistência Representacional

> Representações que mantêm integridade funcional podem sustentar coordenação persistente quando agentes, tarefa e ambiente permanecem compatíveis.

Coordenação não persiste por si só. Degradação representacional pode reduzir coordenação, mas a direção e a magnitude do efeito são hipóteses dependentes de contexto. Restaurar a representação pode ser insuficiente se outros condicionantes tiverem mudado.

### 3.3. LAW-003 — Deformação Representacional

> As representações se deformam por mecanismos que incluem perda, atraso, substituição, ambiguidade e fragmentação.

**Taxonomia provisória** (sujeita a validação empírica):

| Mecanismo | Descrição |
|-----------|-----------|
| Perda | Elementos da representação desaparecem. |
| Atraso | A representação chega depois do momento necessário. |
| Substituição | Um elemento é trocado por outro. |
| Ambiguidade | A representação permite múltiplas interpretações. |
| Fragmentação | A representação é dividida em partes desconectadas. |

**Justificativa empírica:** Os cinco mecanismos emergiram da observação em canteiros de obras (TDO) e conversam com fenômenos biológicos (comunicação química de insetos).

### 3.4. LAW-004 — Resiliência Representacional

> A capacidade coordenadora de representações pode ser restaurada por mecanismos que preservam ou reconstroem seu estado e suas relações operacionais.

A deformação não é necessariamente irreversível. Registro, evidência, rastreabilidade, correção e aprendizado podem restaurar atributos representacionais; a recuperação da coordenação deve ser observada separadamente.

---

## 4. Hipóteses de Pesquisa

### 4.1. HYP-001 — Consequência Fundamental (Proposição Teórica)

> No domínio da TPC, falhas internas de coordenação tendem a ser precedidas por perda não corrigida de atributos ou da capacidade coordenadora das representações relevantes.

**Domínio:** A teoria aplica-se a falhas internas ao sistema coordenado. Eventos exógenos (desastres naturais, lesões súbitas, terremotos) estão fora do escopo.

**Previsão candidata:** estados representacionais degradados devem acrescentar poder preditivo para ECOs em relação a baselines sem atributos representacionais. Não se presume inevitabilidade.

**Originalidade a investigar:** a contribuição incremental frente a CSCW, Cognição Distribuída, Resiliência e campos adjacentes exige revisão sistemática; não é afirmada por ausência de busca documentada.

### 4.2. HYP-002 — Pesquisa de Campo

> O grupo piloto (com OPERA) apresentará significativamente menos ECOs e maior Capital Preservado que o grupo controle, após a implementação de mecanismos de detecção e correção de deformações representacionais.

### 4.3. HYP-003 — Inércia Representacional

> Quanto maior a eficiência de uma representação na coordenação coletiva, maior a tendência de ela se tornar invisível e rígida, aumentando sua vulnerabilidade a deformações silenciosas.

**Mecanismos propostos:** Naturalização, dogmatismo funcional, cegueira sistêmica.

---

## 5. Métricas Operacionais

### 5.1. ECO (MET-001)

Evento observável de falha coordenacional. Cada ECO é unidade de desfecho; sua relação com o estado das representações deve ser registrada e testada.

### 5.2. ICO (MET-002)

Índice de Corrosão Operacional.

**Fórmula:** ICO = I x R x P

| Variável | Descrição | Escala |
|----------|-----------|--------|
| I | Impacto | 1 a 5 |
| R | Recorrência | Contagem |
| P | Persistência | Dias desde a primeira detecção |

**Versão analítica:** ICO_analítico = I x R x P^1.5

### 5.3. IFX (MET-003)

Índice de Fliflexação.

**Fórmula:** IFX = Sensibilidade + Precisão + Velocidade + Aprendizado

### 5.4. Capital Preservado (MET-004)

**Fórmula:** Capital Preservado = EPI - Corrosão Operacional Acumulada

| Variável | Descrição |
|----------|-----------|
| EPI | Economia Potencial Identificada (valor em cenário ideal) |
| Corrosão Acumulada | Soma dos custos de todos os ECOs |

### 5.5. Slektip (MET-005)

Representação persistente e acionável destinada a transferir contexto coordenador para outro ciclo.

**Propriedades:** Persistente, Acionável, Rastreável, Evolutivo.

---

## 6. Falseabilidade

A TPC é falseável sob três critérios:

| Critério | Enunciado |
|----------|-----------|
| 1 | Existir coordenação persistente sem qualquer representação persistente (incluindo regras locais codificadas). |
| 2 | O estado ou a capacidade representacional não acrescentar explicação ou previsão para falhas internas após controles adequados. |
| 3 | Intervenções representacionais não alterarem coordenação nos domínios e condições em que a teoria prevê efeito. |

---

## 7. Limitações Declaradas

- A teoria aplica-se exclusivamente a falhas internas ao sistema coordenado.
- Eventos exógenos (desastres naturais, lesões súbitas, terremotos) estão fora do escopo.
- Os cinco mecanismos de deformação são uma taxonomia provisória, sujeita a validação.
- As métricas (ICO, IFX, Capital Preservado) estão em calibração empírica.
- A pesquisa de campo (HYP-002) ainda não foi iniciada.

---

## 8. Referências

| Autor | Ano | Obra | Relação com a TPC |
|-------|-----|------|-------------------|
| Shannon, C. E. | 1948 | *A Mathematical Theory of Communication* | Base para coordenação como redução de incerteza. |
| Hutchins, E. | 1995 | *Cognition in the Wild* | Cognição distribuída e representações compartilhadas. |
| Kahneman, D. | 2011 | *Thinking, Fast and Slow* | Vieses cognitivos como fonte de deformação. |
| Weick, K. E. | 1979 | *The Social Psychology of Organizing* | Sensemaking e alinhamento de interpretações. |
| Hollnagel, E. | 2009 | *The ETTO Principle* | Resiliência e equilíbrio eficiência-robustez. |
| Nonaka, I. | 1995 | *The Knowledge-Creating Company* | Criação e compartilhamento de conhecimento tácito (Slektips). |

---

**Versão candidata:** 0.8.0
**Data da revisão:** 02/08/2026
**Autor:** Eduardo Martins
