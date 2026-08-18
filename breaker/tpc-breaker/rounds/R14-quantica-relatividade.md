# ROUND 14 — MECÂNICA QUÂNTICA + RELATIVIDADE (round físico, rigor excepcional)

**Status:** concluído
**Confiabilidade geral:** ALTA — ataques contidos; sem saltos metafóricos de nenhum lado

## Proposições atacadas
TPC-C014 (domínio universal implícito), TPC-C015 (falseador 1), TPC-F001/F004.

## Ataques

### QM-1. Questão legítima: informação, medição e representação (D0/D1)
Investigo apenas a questão legítima: a TPC trata "interpretação" como ato que produz efeito (IDR-0002, critério 3). Na mecânica quântica, medição altera o estado do sistema — mas essa analogia é DECORATIVA e não é usada pelo repositório canônico v0.8 (Riemann e categorias são declarados "filosóficos"). A TPC passa no teste anti-pseudociência: nenhum salto quântico no texto canônico. Registro: o risco está nos documentos de ecossistema/OPERA que usam "informodinâmica" como marca — mas não fazem afirmação física.

**Dano: D0** (nenhum uso indevido encontrado no núcleo).

### QM-2. O limite operacional da acessibilidade da informação (D1)
Questão legítima sobre acessibilidade: princípios da física da informação (Holevo bound: quantidade máxima de informação clássica extraível de um estado quântico) mostram que "informação" tem limites físicos estritos de acesso. Isso não ataca a TPC diretamente, mas estabelece que qualquer teoria da informação deve respeitar limites operacionais de acessibilidade — e a TPC ainda não tem nenhum (nenhuma de suas métricas tem limite superior físico ou informacional declarado). Não é dano direto; é exigência de padrão que a TPC ainda não atende.

**Dano: D1** (metodológico).

### RL-1. Relatividade: simultaneidade global e causalidade (D2, golpe central deste round)
A TPC usa tempo global t em todas as fórmulas (EO(S,t), D(S,t)) e fala de "estado coordenado" como condição de agentes que "compartilham" representações. Relatividade especial: não existe simultaneidade global; ordem temporal de eventos espacialmente separados depende do referencial. Para a TPC, a consequência não é que a teoria esteja errada no domínio de obra (velocidades não-relativísticas), mas que o CONCEITO de "estado da representação no instante t" compartilhado entre agentes é uma idealização não-física mesmo em escala humana: atrasos de comunicação implicam que o "estado compartilhado" é sempre uma aproximação com janela de inconsistência (o que sistemas distribuídos já chamam de stale read). A TPC não modela essa janela; o formalismo assume snapshot global que não existe nem fisicamente, nem computacionalmente.

**Dano: D2** (a idealização de tempo global não é declarada como idealização).

### RL-2. Cosmologia preparatória (parcial, D1)
Horizonte cosmológico: regiões causalmente desconectadas não podem coordenar por princípio — a TPC não tem nada a dizer, o que é EXPECTÁVEL e não conta como dano (fronteira honesta de aplicabilidade). Registro para o round multiverso.

**Dano: D1** (apenas se a TPC algum dia reivindicar domínios além do horizonte; não reivindica).

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | RL-1: tempo global idealizado nunca declarado como idealização |
| Melhor defesa | Domínio não-relativístico torna o efeito desprezível (defesa forte) |
| Dano | D2 (3) + D1 (1) + D0 = **4** |
| Penalidade | Não aplica: ataque conduzido com rigor, sem "quântico" decorativo |
| Confiança | 0.9 |
| Questões abertas | Adicionar "janela de inconsistência" a EO como atributo 7º? (MUTAÇÃO CANDIDATA: MUT-007) |

## Fontes
Holevo (1973), *Bounds for the quantity of information transmitted by a quantum communication channel*; Einstein (1905); FORMALIZACAO_MATEMATICA.md (uso de t global).
