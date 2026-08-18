# ROUND 06 — TEORIA DOS JOGOS

**Status:** concluído
**Confiabilidade geral:** ALTA

## Proposições atacadas
TPC-C001, TPC-C003, TPC-L001, TPC-L002, TPC-C014 (domínio declarado).

## Ataques

### GT-1. Coordenação sem objetivos compartilhados já tem teoria (D3, golpe central)
A definição vigente de coordenação (IDR-0001) não exige objetivos compartilhados — exige apenas "ações compatíveis ao interpretar representações". A teoria dos jogos estuda exatamente isso há 70 anos: jogos de coordenação (Schelling, 1960), equilíbrios focais, jogos com comunicação (cheap talk — Crawford & Sobel, 1982), coordenação sob conflito parcial (battle of the sexes), cooperação repetida (Axelrod, 1984). A distinção TPC "coordenação é desfecho relacional observável, não propriedade intrínseca" é literalmente a definição de equilíbrio: ninguém "tem" equilíbrio; ele emerge das ações. A TPC não possui conceito equivalente a Nash/schelling/focal point para explicar POR QUE um conjunto de representações estabiliza um desfecho coordenado e outro não.

**Dano: D3.**

### GT-2. O domínio declarado não isola nada (D2)
A ONTOLOGIA.md exclui "fatores externos" e "sistemas instintivos", mas jogos cobrem todos os arranjos restantes: cooperativos, parcialmente alinhados, competitivos, adversariais. Cada mecanismo TPC de deformação tem contrapartida de jogo: substituição = envio de sinal falso (cheap talk mentiroso); ambiguidade = ruído no canal de sinalização (Crawford–Sobel); atraso = jogo sequencial com informação imperfeita; perda = ausência de canal. Os dois casos reais do repositório são jogos: o caso da betoneira é um problema de credenciamento de sinal (quem "autorizou"?); o caso da pausa é cheap talk sem conhecimento comum. Ambos analisáveis sem IDR-0002.

**Dano: D2.**

### GT-3. HYP-003 (inércia representacional) tem ancestral direto (D1)
"Quanto maior a eficiência de uma representação na coordenação, maior sua naturalização e menor a detecção de deformações silenciosas" é quase-equivalente à tensão eficiência-robustez de Hollnagel (ETTO, já citado nas referências da TPC) e ao custo de exploração em sistemas que otimizam exploração (a exploração decai quando a exploração parece desnecessária — exploração–exploitation tradeoff). HYP-003 não acrescenta mecanismo além dos que Hollnagel já formalizou qualitativamente.

**Dano: D1.**

## Melhor defesa possível
Jogos assumem agentes com preferências conhecidas e representações exógenas; a TPC endogeniza a evolução da representação (degrada, restaura, evolui Slektips) — objeto que a teoria dos jogos clássica não modela dinamicamente. Defesa parcialmente forte, mas hoje especulativa.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | GT-1: coordenação emergente sem objetivos comuns já é teoria madura de jogos |
| Melhor defesa | Endogenização da dinâmica da representação |
| Dano | D3 + D2 + D1 = **12** |
| Confiança | 0.75 |
| Questões abertas | Modelos de sinalização evolutiva com canais degradáveis poderiam absorver também a defesa |

## Fontes
Schelling (1960), *The Strategy of Conflict*; Crawford & Sobel (1982), *Strategic Information Transmission* (Econometrica); Axelrod (1984), *The Evolution of Cooperation*; Hollnagel (2009), ETTO.
