# ROUND 03 — SISTEMAS DISTRIBUÍDOS

**Status:** concluído
**Confiabilidade geral:** ALTA (conceitual) — contraexemplo computacional formalizado abaixo

## Proposições atacadas
TPC-L001, TPC-L002, TPC-P006, TPC-P008, TPC-C014, TPC-C015 (falseador), TPC-F005.

## Ataques

### DS-1. A TPC ignora o teorema central do seu próprio domínio (D3)
Em sistemas onde ações dependem de representações compartilhadas e estas podem se degradar, a ciência dos sistemas distribuídos já mapeou os fenômenos com precisão matemática: impossibilidade de consenso com falhas (FLP, Fischer–Lynch–Paterson, 1985), trade-offs de partição (CAP, Brewer; Gilbert–Lynch, 2002), Byzantine faults (Lamport, Shostak & Pease, 1982). Nenhum desses teoremas menciona "estado operacional de representação"; todos tratam exatamente do que ECO/K_C tratam — falha de coordenação sob degradação de canais. A TPC não formaliza por que um canteiro "consente" ou "particiona"; apenas descreve o sintoma.

**Dano: D3** sobre LAW-001/LAW-002 no subdomínio de sistemas digitais/híbridos.

### DS-2. Contraexemplo reproduzível: consenso sem representação operacional identificável em degradação (D4 potencial, mitigado a D3)
Construção (canônica dentro do domínio declarado, ONTOLOGIA.md: "sistemas digitais, agentes autônomos e arranjos híbridos, desde que representação, interpretação e ação sejam operacionalizáveis"):

> Protocolo Paxos/Raft num cluster: três réplicas de um registro de serviço em obra. Réplica A sofre crash parcial (stale replica). As réplicas B e C continuam a alcançar consenso sobre o valor correto via majority quorum, sem que nenhum agente humano interprete nenhuma "representação operacional". A "representação" (log) se degrada localmente (replica A), mas a coordenação (consenso sobre o próximo comando) persiste com degradação local não corrigida — e o sistema se auto-restaura por replicação, mecanismo que a TPC chamaria de Fliflexação, mas que aqui é dedutível de quorum + replicação log, sem nenhum atributo P/F/U/C/R/X.

A TPC pode responder "as regras do protocolo são a representação" — mas isso expande "representação" até incluir qualquer regularidade do sistema, tornando TPC-C015 (coordenação sem representação) quase impossível de satisfazer e a teoria imune por redefinição (violação da Regra 3 do campeonato; registrado como MUT-016 candidata, não usado).

**Dano: D3** (D4 mitigado: o contraexemplo ataca a extensão da definição, não o núcleo de forma limpa).

### DS-3. Eventual consistency como teoria da persistência (D2)
LAW-002 ("representações íntegras **podem** sustentar coordenação persistente quando intérpretes, tarefa e ambiente permanecem compatíveis") é fraca a ponto de ser a tese de consistência eventual dos bancos de dados: estados locais divergentes convergem quando a comunicação se restabelece — sem exigência de integridade contínua. Se a TPC não distingue "persistência de coordenação sob partição" de "restauração pós-partição", sua lei não diferencia nada que CAP/CRDTs já diferenciam.

**Dano: D2.**

## Melhor defesa possível
A TPC pode declarar que seu domínio de interesse são sistemas sócio-técnicos onde os "nós" são humanos interpretando artefatos — e aí FLP/CAP não se aplicam diretamente (agentes não são réplicas determinísticas). É uma defesa legítima, mas obriga a teoria a admitir que seu domínio "sistemas digitais e híbridos" (ONTOLOGIA.md) é retórico: o caso Paxos acima está dentro do domínio declarado.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | DS-2: consenso persiste com degradação local não corrigida e sem interpretação humana |
| Melhor defesa | Restringir domínio a sistemas sócio-técnicos (mas conflita com ONTOLOGIA.md §1) |
| Dano | D3 (8) + D3 (8) + D2 (3) = **19** |
| Bônus | +10 contraexemplo reproduzível (Paxos/raft) +10 formalização (FLP/CAP citados com precisão) = **+20** |
| Confiança | 0.8 |
| Questões abertas | A redefinição defensiva de "representação" decidirá se D4 ocorre |

## Fontes
Fischer, Lynch & Paterson (1985), *Impossibility of Distributed Consensus with One Faulty Process*; Gilbert & Lynch (2002), *Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services*; Lamport, Shostak & Pease (1982), *The Byzantine Generals Problem*; ONTOLOGIA.md §1.
