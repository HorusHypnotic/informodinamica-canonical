# ROUND 13 — MULTI-AGENT SYSTEMS + TEORIA ORGANIZACIONAL

**Status:** concluído
**Confiabilidade geral:** ALTA

## Proposições atacadas
TPC-L001, TPC-C003, TPC-C009, TPC-H003, TPC-C014.

## Ataques

### MA-1. MAS já tem formalismos completos de coordenação (D3, golpe central)
A literatura MAS compara: blackboards, contract nets (Smith, 1980), planejamento conjunto (Grosz & Kraus, 1996, *Collaborative Plans for Complex Group Action*), joint intentions (Cohen & Levesque, 1991), organizações (MOISE+, AGR), mecanismos (leilões, negociação), e ontologias de coordenação (TOMBIS/COORDINATION). A pergunta do prompt «compare TPC com formalismos existentes de coordenação artificial» revela: a TPC não formaliza nada que esses frameworks não formalizem com mais rigor — e não adota nenhuma de suas notações (KQML, FIPA-ACL, plan libraries). O OPERA (Register/Control/Flex) é um sistema de gestão com três módulos; os "formalismos" MAS têm semântica provável e protocolos de interação verificados.

**Dano: D3.**

### MA-2. Persistência, sensemaking e coordenação já cobertos pela teoria organizacional (D2)
O prompt pede: «testar se conceitos conhecidos já cobrem persistência, comunicação, sensemaking e coordenação». Cobrem: persistência = rotinas/rotinas organizacionais (Nelson & Winter, 1982) e memória organizacional (Walsh & Ungson, 1991); sensemaking = Weick (1995, citado pela TPC); coordenação = Okhuysen & Bechky (2009, *Coordination in Organizations: An Integrative Review* — os três mecanismos: accountability, predictability, common understanding); comunicação = literatura de CSCW (Schmidt & Simone, 1996, *Coordination Mechanisms*). Okhuysen & Bechky é especialmente danoso: seus três mecanismos cobrem exatamente o que LAW-001/LAW-002 descrevem, com base em 20 anos de estudos organizacionais — e não usam "estado operacional de representação" como construto.

**Dano: D2.**

### MA-3. HYP-003 e o efeito de visibilidade inversa (D1)
"Representações eficientes tornam-se invisíveis" é o fenômeno documentado como "transparência da ferramenta" em CSCW (Dourish, 2001) e "infraestrutura invisível" (Star & Ruhleder, 1996). Renomeado como "inércia representacional", sem mecanismo novo.

**Dano: D1.**

## Melhor defesa possível
A TPC integra num único programa conceitos que essas literaturas mantêm separados — se funcionar, a integração é o mérito. Mas integração sem formalismo e sem evidência é agenda, não teoria.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | MA-1: frameworks MAS (Cohen–Levesque, MOISE+, contract net) cobrem coordenação com mais rigor |
| Melhor defesa | Integração conceitual interdisciplinar (ainda não demonstrada) |
| Dano | D3 (8) + D2 (3) + D1 (1) = **12** |
| Confiança | 0.8 |
| Questões abertas | Revisão sistemática promised-by-author decidiria |

## Fontes
Cohen & Levesque (1991), *Teamwork* (Minds and Machines); Grosz & Kraus (1996); Okhuysen & Bechky (2009), *Coordination in Organizations: An Integrative Review* (AMR 34); Star & Ruhleder (1996), *Steps Toward an Ecology of Infrastructure*; Smith (1980), *Contract Net Protocol*.
