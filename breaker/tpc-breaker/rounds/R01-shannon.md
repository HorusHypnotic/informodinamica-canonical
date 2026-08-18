# ROUND 01 — SHANNON / TEORIA DA INFORMAÇÃO

**Status:** concluído
**Confiabilidade geral:** ALTA

## Proposições atacadas
TPC-C001 (definição histórica de coordenação), TPC-F003 (B(S,t)), TPC-F004 (D(S,t)), TPC-P005 (degradação → K_R), TPC-C015 (falseador).

## Ataques

### SH-1. A teoria histórica já morreu por redução Shannon (D1, documentado pelo autor)
A definição "coordenação é redução compartilhada de incertezas" foi explicitamente rebaixada pelo próprio repositório (IDR-0001, nota; FUNDAMENTOS_MATEMATICOS.md §3.2, SHANNON_FORMALIZATION_PENDING) porque carecia de variável, espaço de estados, distribuição e medida. O ataque Shannon contra a versão vigente é, portanto, parcialmente autoinfligido: a TPC moveu a trave antes do campeonato. O golpe é anotado, mas a versão atual já se defendeu. Penaliza-se o ataque se insistir apenas na versão histórica (−10, ataque a caricatura). Não aplico a penalidade aqui porque registro a genealogia.

**Dano: D0 para a versão vigente.**

### SH-2. A entropia interpretativa B(S,t) é uma pseudo-formalização (D2)
B(S,t) = −Σpᵢ log pᵢ + γ·custo médio mistura dois tipos de objeto: uma entropia de Shannon sobre uma distribuição de interpretações (que exige que "interpretações" sejam eventos exaustivos e mutuamente exclusivos de um espaço amostral especificado — nunca especificado) e um termo de custo com unidade não declarada. Somar bits a unidades monetárias ou de esforço é adimensionalmente ilegítimo sem γ em unidades compatíveis. Isso contamina D(S,t), que integra (1 − atributos) sem peso dimensional declarado, e Pr(E=1)=q(D,…) herda a mesma ilegitimidade.

**Dano: D2** — atinge o aparato matemático candidato que sustenta a pretensão quantitativa.

### SH-3. A exigência de operacionalização expõe g e h (D2)
Shannon obriga: variável, distribuição, medida, unidade, operacionalização. K_R = g(EO, A, T, Z) não possui g definida; K_C = h(K_R, I, T, Z) não possui h. Sem canais, sem código e sem ruído especificados, não há como medir "redução de incerteza compartilhada" entre agentes. A teoria não pode sequer formular sua própria lei central (LAW-001) como desigualdade de entropia condicional verificável — porque o vocabulário informacional está suspenso.

**Dano: D2** sobre TPC-L001 (versão quantitativa).

### SH-4. Informação de Shannon não é semântica (golpe forte, mas parcialmente neutralizado)
Se "informação" na TPC é apenas metáfora da informação semântica/pragmática (efetiva, útil), então o aparato Shannon é decorativo; se é literal, então a TPC precisa de uma teoria da informação semântica (Bar-Hillel & Carnap; Dretske) que não possui. O próprio FUNDAMENTOS_MATEMATICOS.md trata Shannon como "inspiração", o que converte o golpe em dano documentacional: o aparato matemático anuncia formalismo que o texto recusa.

**Dano: D1** (decoração matemática), com potencial D3 se o autor quiser manter a pretensão quantitativa.

## Melhor defesa possível
A TPC vigente nunca reivindicou identidade com Shannon; a formalização informacional é candidada e sujeita a validação (status declarado). g e h indefinidas são uma escolha falibilista honesta, não um defeito lógico: uma teoria não pode ser falsificada por funções ainda não especificadas, pois não afirmou nada falsificável sobre elas.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | SH-2 + SH-3: formalismo adimensional + funções indefinidas |
| Melhor defesa | Distância declarada de Shannon; indefinição como honestidade metodológica |
| Dano | D2×2 + D1 = **7** |
| Confiança | 0.8 |
| Questões abertas | Se B(S,t) for abandonada, o índice D(S,t) volta a ser puramente ordinal/arbitrário |

## Fontes
FUNDAMENTOS_MATEMATICOS.md §3.2; FORMALIZACAO_MATEMATICA.md §2.8; GLOSSARIO_CANONICO.md IDR-0001.
