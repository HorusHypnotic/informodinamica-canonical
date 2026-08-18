# ROUND 04 — TEORIA DE REDES

**Status:** concluído
**Confiabilidade geral:** ALTA

## Proposições atacadas
TPC-L003, TPC-P005, TPC-C014, TPC-F004.

## Ataques

### NT-1. Propagação de falhas já é fenômeno de rede conhecido (D2)
LAW-003 (deformação por perda, atraso, substituição, ambiguidade, fragmentação) e a pergunta de pesquisa registrada na própria FUNDAMENTOS_MATEMATICOS.md ("Como a deformação de uma representação afeta os nós vizinhos? Qual é o ponto crítico onde a rede colapsa?") descrevem cascatas de falha — objeto clássico da teoria de redes: cascatas de carga (Motter–Lai, 2002), percolação (Albert, Jeong & Barabási, 2000; Callaway et al., 2000), centralidade de.betweenness como preditor de pontos críticos. A "deformação que se propaga" não precisa de conceito TPC; precisa de grafo, pesos e modelo de cascata. A TPC hoje não oferece grafo nem pesos — D(S,t) é atributo por signo, não por rede.

**Dano: D2.**

### NT-2. Robustez e redundância explicam resiliência sem Fliflexação (D2)
IDR-0005/IDR-0007 (resiliência/fliflexação) mapeiam para robustez estrutural (grau médio, redundância de caminhos) e mecanismos conhecidos de tolerância a falhas. Se a "capacidade de restaurar" é propriedade do desenho da rede de comunicação, então Fliflexação é epifenômeno de redundância — e o IFX mede o que métricas de rede já medem. Sem estudo mostrando que IFX tem variância explicativa residual sobre robustez de rede, a métrica é duplicada.

**Dano: D2.**

### NT-3. ECO como falha de nó/aresta não adiciona informação (D1)
Se "o ECO pode ser visto como a falha de um nó ou aresta" (FUNDAMENTOS_MATEMATICOS.md §3.5), então a unidade básica de observação da TPC já é um conceito de teoria de grafos. O que a TPC acrescenta é a etiqueta "representação" no nó falho — mas a teoria de redes com atributos em nós (redes atribuídas) faz o mesmo com formalismo maduro.

**Dano: D1.**

## Melhor defesa possível
A TPC estuda deformação **semântica** de artefatos (ambiguidade, substituição de conteúdo), que não é capturada por topologia pura. Verdade parcial; mas hoje a teoria não tem modelo semântico próprio (B(S,t) indefinido), então a defesa é promessa, não conquista.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | NT-1 + NT-2: cascata/percolação e robustez já cobrem deformação e resiliência |
| Melhor defesa | Deformação semântica não-topológica (ainda sem modelo) |
| Dano | D2 + D2 + D1 = **7** |
| Confiança | 0.75 |
| Questões abertas | Um modelo de cascata semântica validado reverteria NT-1 |

## Fontes
Albert, Jeong & Barabási (2000), *Error and attack tolerance of complex networks* (Nature 406); Motter & Lai (2002), *Cascade-based attacks on complex networks* (PRE 66); FUNDAMENTOS_MATEMATICOS.md §3.5.
