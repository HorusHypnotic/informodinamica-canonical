# TPC-CONSTRUCT-VALIDITY — Análise de validade de construto do EO

**Data:** 18/08/2026 · **Fonte do objeto:** baseline congelado TPC-F001/F002 (commit aad9af9); achado da auditoria AUD-02.

## 1. Advertência de status

O vetor EO(S,t) = (P, F, U, C, R, X) foi congelado como **axioma A2** ("o estado operacional é composto por atributos: P, F, U, C, R, X"). Esta análise sustenta que **nenhum instrumento de medida pode começar medindo EO como seis dimensões**. A2 é rebaixado a **H-EO**: hipótese taxonômica candidata cuja estrutura dimensional deve ser determinada empiricamente. Isso não é conservadorismo excessivo: toda a cadeia preditiva da TPC (HYP-001-U, D(S,t), Pr(E=1)) depende de EO medido; se EO não for um construto válido, nada acima dele é mensurável.

## 2. Análise atributo a atributo

### 2.1 P — Persistência

Persistência é definida como propriedade temporal do artefato (existência continuada). O problema conceitual é que **P é medida em unidade temporal e definida em termos da própria noção que a teoria estuda** (persistência da coordenação): risco de circularidade nominal entre P(t) e o explanandum. Além disso, P é empiricamente quase indiscernível de U (atualidade): um artefato que persiste mas nunca é atualizado perde atualidade por definição (U(t) = 1/(1+τ(t−t₀)) decai com τ), e a taxa de decaimento de P, P(t)=e^{−λt}, também decai com t. **P e U são, na formulação congelada, monotonicamente acoplados no tempo** — o que na prática produz colinearidade extrema entre os dois atributos. Sugestão estrutural: considerar P e U como manifestações de um único fator "estado temporal do artefato" (persistência-envelhecimento), testável contra o modelo de 6 fatores.

### 2.2 F — Fidelidade

F = 1 − ‖S(t)−O(t)‖/‖O(t)‖ exige um **objeto de referência O(t) observável**. Em muitos canteiros O(t) não é observável diretamente (a realidade física da obra muda continuamente); o que se mede é a comparação entre **versões do artefato** (S(t) vs. S(t−1) ou S(t) vs. "versão aprovada"). F medida assim desliza para a mesma operação que R (rastreabilidade de versões) e para C (consistência entre representações). **F e C são empiricamente distinguíveis em princípio** (fidelidade artefato↔referente vs. consistência artefato↔artefato), mas na operação de campo o referente ausente força a substituição por inter-artefato, colapsando F→C. O instrumento deve declarar explicitamente qual é o referente de F em cada tipo de artefato, ou admitir F como inobservável para artefatos sem referente estável.

### 2.3 U — Atualidade

Ver 2.1: acoplada a P. Independentemente de P, U é bem comportada conceitualmente (idade da última atualização); a questão é se deve existir como dimensão separada ou como função de P e do tipo de artefato (um cronograma envelhece por dias corridos; uma lista de materiais envelhece por eventos).

### 2.4 C — Coerência

C = 1 − (1/n)Σ‖Sᵢ−Sⱼ‖ compara pares de representações. Dois problemas: (i) é **relacional, não intrínseca** — C não é propriedade de S mas de um conjunto {Sᵢ}; o "estado do artefato" passa a depender do inventário de artefatos conectados, violando a interpretação ingênua de EO(S,t); (ii) a mesma operação (distância semântica entre versões) mede F (quando o segundo membro é o referente) e C (quando é outro artefato) e parcialmente R (divergência de versões rastreáveis). Risco real de **double counting**: um mesmo evento de divergência entre documentos contribui simultaneamente para C baixa e R baixa.

### 2.5 R — Rastreabilidade

R = metadados completos / total exigido. A auditoria sustenta que **R não é uma dimensão do estado, é infraestrutura que sustenta as demais**: metadados são o que permite medir F (qual versão?), U (quando?), C (contra qual?) e X (quem interpretou?). Tratar R como atributo independente do mesmo plano de P/F/U/C infla a contagem dimensional: a "deformação por perda" (LAW-003) que atinge R atinge, por construção, as medições de todos os outros atributos. Sugestão estrutural: R como **moderador/metadata layer** (variável de qualidade da medida), não como sexto atributo.

### 2.6 X — Erros de interpretação

X = 1 − erros de interpretação/consultas. É o caso mais grave (ver TPC-LEAKAGE-AUDIT.md): **X não é propriedade do artefato, é propriedade da interação agente-artefato**, e sua definição usa o próprio desfecho (erros de interpretação ≈ ECOs) como medida. Mesmo em uso não contaminado, X pertence ao nível I (interpretação), não ao nível R (estado da representação), na arquitetura R→I→A→ECO da missão (seção 9). Deve ser retirado do vetor EO ou movido para um instrumento próprio de interpretação.

## 3. Síntese estrutural

| Atributo | Propriedade do artefato? | Dimensão independente? | Risco principal | Recomendação |
|----------|--------------------------|------------------------|------------------|--------------|
| P | Sim | Não — acoplado a U | Circularidade nominal, colinearidade com U | Fundir P+U em fator temporal |
| F | Sim (com referente) | Em princípio sim | Referente inobservável → colapsa em C | Definir referente por tipo de artefato |
| U | Sim | Não — acoplada a P | — | Fundir com P |
| C | Não — relacional | Depende do inventário | Double counting com R e F | Medir sobre grafo de artefatos declarado |
| R | Sim (metadados) | Não — infraestrutura | Infla dimensionalidade; media as demais medidas | Rebaixar a metadata layer |
| X | Não — interação | Não | **Leakage de desfecho** | Mover ao nível I ou instrumento próprio |

**Estrutura candidata resultante:** três dimensões de artefato (fator temporal P+U; fidelidade F com referente declarado; coerência C sobre grafo), uma camada de rastreabilidade (R) como moderador da qualidade de medida, e um instrumento de interpretação separado (I, incluindo X). Essa é uma **hipótese de dimensionalidade** a ser comparada no Gate 1 contra 1 fator, 2 fatores, 3 fatores, 6 fatores, estrutura hierárquica e checklist sem latente — conforme seção 8 da missão.

## 4. Consequência para a cadeia causal

A cadeia R(t0)→I(t1)→A(t2)→ECO(t3) fica então operacionalizada como: medir (P+U, F, C, + R como moderador) em t0 no artefato; medir interpretação/agente em t1 (novo instrumento, incluindo X); registrar ação e desfecho ECO em t2–t3 com classificação cega. A cadeia é **modelo candidato**, não fato (seção 9 da missão).
