# ROUND 05 — BAYES (INFERÊNCIA DISTRIBUÍDA)

**Status:** concluído
**Confiabilidade geral:** ALTA

## Proposições atacadas
TPC-C001, TPC-P006, TPC-P010, TPC-L001, TPC-H001.

## Ataques

### BY-1. "Interpretações compatíveis" é convergência de crenças (D2)
TPC-C003 (estado coordenado = agentes compartilham representações compatíveis para ação coerente) é formalizável como concordância de distribuições posteriores entre agentes que recebem evidências comuns: agentes com priors distintos, atualizando sobre o mesmo sinal (documento de obra), convergem assintoticamente (Aumann, 1976, *Agreeing to Disagree* — concordância de posteriors em conhecimento comum). A coordenação "sem retrabalho" é o estado em que posteriors são suficientemente próximos para a ação conjunta maximizar utilidade esperada. Nada nessa reconstrução exige "estado operacional de representação" como conceito separado: o "sinal" de Bayes É a representação.

**Dano: D2.**

### BY-2. Deformação é ruído de canal na atualização (D2)
LAW-003 mapeia: perda = dropout de evidência; atraso = evidência dessincronizada (agente atualiza com dado antigo); substituição = evidência corrompida; ambiguidade = função de verossimilhança de alta entropia; fragmentação = evidência parcial (cada agente vê subconjunto). A "deformação representacional" é então ruído estruturado no processo de atualização bayesiana — já estudada como aprendizado com dados corrompidos/atrasados. HYP-001 ("falhas precedidas por deformação não corrigida") vira: "falhas precedidas por não-correção de ruído de evidência" — que é truismo para qualquer agente racional: agir sobre evidência degradada aumenta a probabilidade de erro. A hipótese fica verdadeira por construção em agentes racionais e não testa nada específico da TPC.

**Dano: D2.**

### BY-3. A ambiguidade como mecanismo é redundante (D1)
TPC-P010 (ambiguidade eleva divergência interpretativa) é caso especial de: posteriors divergem quando a verossimilhança é vaga — resultado padrão de aprendizado estatístico (identificabilidade). Se múltiplos agentes têm funções de verossimilhança diferentes sobre a mesma representação ambígua, divergem — sem precisar de "mecanismos de interpretação" TPC.

**Dano: D1.**

## Melhor defesa possível
Bayes descreve agentes que já sabem o que querem e apenas atualizam crenças; a TPC modela agentes com objetivos parcialmente misalignados, linguagem natural e artefatos institucionais — onde "evidência" não é um dado limpo. Defesa válida: a inferência bayesiana distribuída assume o problema resolvido no nível de semântica. Mas, de novo, a TPC não oferece o modelo semântico prometido.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | BY-1 + BY-2: estado coordenado = convergência de posteriors; deformação = ruído de evidência |
| Melhor defesa | Semântica de artefatos institucionais fora do escopo bayesiano padrão |
| Dano | D2 + D2 + D1 = **7** |
| Confiança | 0.7 |
| Questões abertas | Se HYP-001 mostrar valor preditivo residual sobre um modelo bayesiano de ruído, BY-2 se dissolve |

## Fontes
Aumann (1976), *Agreeing to Disagree* (Annals of Statistics); FUNDAMENTOS_MATEMATICOS.md §3.7 (agenda probabilística).
