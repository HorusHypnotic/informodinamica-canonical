# ROUND 07 — EVOLUÇÃO DARWINIANA

**Status:** concluído
**Confiabilidade geral:** ALTA

## Proposições atacadas
TPC-L001 (mediação representacional), TPC-C002 (representação como necessária), TPC-C015 (falseador 1).

## Ataques

### EV-1. Coordenação persistente sem representação identificável (golpe ao falseador TPC-C015) (D4)
O falseador nº 1 da TPC é: "existir coordenação persistente sem qualquer representação persistente (incluindo regras locais codificadas)". A biologia evolutiva contém exemplos canônicos:

1. **Formigueiros/floresta de termiteiros:** coordenação construtiva de décadas, sem gestor, sem linguagem, sem representação simbólica; cada operária segue regras locais reativas a feromônios. O repositório TPC exclui esses casos pela ONTOLOGIA.md ("sistemas puramente instintivos"), mas essa exclusão é um MOVIMENTO DE TRAVE, não um argumento: o fenômeno — coordenação persistente de ações compatíveis sem representação identificável — existe na natureza exatamente como a TPC diz ser impossível. Para se proteger, a TPC precisou definir seu domínio de modo a não conter o contraexemplo.
2. **Padrões de migração de aves sem liderança:** coordenação de voo (flocking, Reynolds 1987 — regras locais: separação, alinhamento, coesão) sem nenhuma representação compartilhada; persiste por gerações sem qualquer estrutura portadora de estado além do genoma (que a cláusula "incluindo regras locais codificadas" tenta absorver — mas o genoma não "representa" a rota migratória no sentido IDR-0002: não mantém "relação especificável com objeto/condição/regra" interpretável por agentes; é programa embutido).
3. **Sincronização de vagalumes (Mirollo–Strogatz, 1990):** coordenação temporal global emergente de acoplamento local, sem representação.

A cláusula "incluindo regras locais codificadas" foi claramente adicionada para blindar o falseador contra exatamente estes casos — o que torna o falseador praticamente insatisfazível no mundo natural e esvazia TPC-L001 de conteúdo fora dos sistemas sócio-técnicos.

**Dano: D4** — atinge o postulado fundamental (TPC-C013) fora do domínio sócio-técnico, e força a teoria a admitir que sua universalidade implícita é falsa.

### EV-2. A seleção de Slektips é variação+cópia+seleção (D2)
"Fliflexação" e evolução de Slektips entre ciclos operacionais são formalizáveis como replicadores meméticos ou como herança cultural dual (Boyd & Richerson, 1985): Slektips que funcionam são retidos, os que falham, descartados. A "evolução representacional" não precisa de teoria própria.

**Dano: D2.**

### EV-3. Pergunta do prompt: onde reside a coordenação quando se remove intenção, planejamento, linguagem, gestor e símbolo? (D1)
Reside no ambiente e nas regras reativas. A TPC responde "fora do domínio" — mas essa resposta mostra que "representação" é uma exigência analítica do observador, não uma propriedade do fenômeno. O mesmo sistema (tráfego de obras numa vila) pode ser descrito com ou sem representações, dependendo do nível de descrição escolhido pelo analista.

**Dano: D1.**

## Melhor defesa possível
Dentro do domínio sócio-técnico (obras com humanos, documentos e sistemas), a TPC-C015 é testável e não trivial. A teoria sempre se declarou "analítica dentro do domínio, não tese metafísica universal" (TPC.md §1). O ataque biológico prova os limites do domínio, não a falsidade interna.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | EV-1: coordenação natural persistente sem representação; blindagem do falseador |
| Melhor defesa | Domínio declarado sócio-técnico; universalidade nunca afirmada |
| Dano | D4 (20) + D2 (3) + D1 (1) = **24** |
| Penalidade | Não aplicável: EV-1 é contraexemplo genuíno, não analogia |
| Confiança | 0.85 |
| Questões abertas | Redefinir domínio como "só sistemas com representação verificável" converte EV-1 em não-ataque |

## Fontes
Mirollo & Strogatz (1990), *Synchronization of Pulse-Coupled Biological Oscillators* (SIAM); Reynolds (1987), *Flocks, Herds, and Schools: A Distributed Behavioral Model*; Boyd & Richerson (1985), *Culture and the Evolutionary Process*; ONTOLOGIA.md §1; TPC.md §6.
