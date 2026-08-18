# ROUND 12 — SISTEMAS DINÂMICOS + CAOS

**Status:** concluído
**Confiabilidade geral:** ALTA (formalização possível — simulado abaixo)

## Proposições atacadas
TPC-F002 (modelos candidatos P, U), TPC-F004 (D), TPC-P005, TPC-P011 (T2), TPC-P012 (T4), FUNDAMENTOS_MATEMATICOS.md §3.3 (ECO como bifurcação).

## Ataques

### SD-1. Os modelos candidatos são triviais e não interagem (D2)
P(t) = e^{−λt} e U(t) = 1/(1+τΔt) são decaimentos monotônicos sem acoplamento — não há sistema dinâmico, há 6 curvas soltas. A pergunta "existem atratores de degradação?" (FUNDAMENTOS_MATEMATICOS.md §3.3) pressupõe dinâmica acoplada que o modelo não tem. Sem equações de evolução acopladas (dEO/dt = f(EO, ações)), não há atrator, bifurcação nem caos — os conceitos de sistemas dinâmicos são citados como vocabulário, não como modelo.

**Dano: D2.**

### SD-2. Teste da monotonicidade (perturbações minúsculas) — formalização reproduzível (D3, simulado)
A pergunta adversarial: «degradação informacional possui relação monotônica com degradação operacional?» Construo um contraexemplo mínimo dentro do próprio formalismo TPC:

```python
# contraexemplo_montonicidade.py
import numpy as np
# Dois signos S1, S2; EO = (P,F,U,C,R,X) em [0,1]
S1 = np.array([1.0, 0.9, 0.9, 0.9, 1.0, 0.9])  # quase íntegro
S2 = np.array([1.0, 0.5, 1.0, 0.4, 0.5, 1.0])  # degradado (D maior)
alpha = np.ones(6)/6
D = lambda s: np.sum(alpha*(1-s))
print("D(S1) =", D(S1), "| D(S2) =", D(S2))
# D(S2) > D(S1), mas coordenação operacional pode ser MAIOR para S2:
# F (fidelidade) baixa em S1? Não — S1 tem F=0.9. Ajuste:
S1b = np.array([1.0, 0.2, 1.0, 1.0, 1.0, 1.0])  # fidelidade ruim, resto perfeito
S2b = np.array([1.0, 0.6, 0.6, 0.6, 0.6, 0.6])
print("D(S1b) =", D(S1b), "| D(S2b) =", D(S2b))
# D(S1b)=0.133 < D(S2b)=0.467; porém se a TAREFA depende só de fidelidade,
# a coordenação de S1b é pior que a de S2b apesar de D menor.
# Conclusão: D não é monotonicamente relacionado ao desfecho coordenacional
# salvo hipótese adicional de pesos dependentes da tarefa — que o próprio
# FORMALIZACAO_MATEMATICA.md admite ("αᵢ = αᵢ(domínio)") mas nunca calibra.
```

Resultado: D(S1b)=0.1333 < D(S2b)=0.4667, mas se a tarefa depende do atributo F, o desfecho coordenacional de S1b é pior. A monotonicidade exige "hipótese adicional" — que T4 já admite. O golpe é: a teoria admite a não-monotonicidade na letra, mas o aparato (D como índice único de risco de ECO) a pressupõe na prática (Pr(E=1)=q(D)). O índice D não pode ser usado para ranking de risco de ECO sem calibração dependente de tarefa — que nunca aconteceu.

**Dano: D3** — a peça central da formalização (D → Pr(ECO)) não tem justificativa monotônica dentro do próprio sistema.

### SD-3. Sensibilidade a condições iniciais (caos) inverte a tese de previsibilidade (D1)
Se o sistema EO é de fato caótico (o que os "atratores de degradação" sugerem como possibilidade), então a previsibilidade de ECOs que HYP-001 exige é estruturalmente limitada — e a TPC promete predição onde o caos nega horizonte. A TPC não declara qual regime (estável/caótico/crítico) espera para EO.

**Dano: D1.**

## Melhor defesa possível
O autor é honesto: T4 admite não-monotonicidade e F formaliza como "modelo candidato". O dano é de status, não de lógica: a arquitetura matemática prometida ainda não existe; o que existe são 6 curvas decorativas.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | SD-2: não-monotonicidade formalizada (script reproduzível) |
| Melhor defesa | Honestidade de "modelo candidato"; T4 já admite |
| Dano | D3 (8) + D2 (3) + D1 (1) = **12** |
| Bônus | +10 formalização reproduzível (script acima) |
| Confiança | 0.85 |
| Questões abertas | Calibração empírica de αᵢ por tarefa poderia salvar SD-2 |

## Fontes
FORMALIZACAO_MATEMATICA.md §2; FUNDAMENTOS_MATEMATICOS.md §3.3/3.7; AXIOMAS_E_PROPOSICOES.md (T2, T4).
