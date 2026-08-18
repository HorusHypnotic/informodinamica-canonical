# GATE0-RIAECO-AUDIT — Ataque à arquitetura R → I → A → ECO

**Data:** 18/08/2026 · **Adversário C** · **SHA-base:** fd1accf · **Objeto:** cadeia candidata R(t0)→I(t1)→A(t2)→ECO(t3) (TPC-V0.9-CANDIDATE).

## 1. Teste de independência por estágio

| Pergunta | Resposta após ataque | Consequência |
|----------|----------------------|--------------|
| R pode ser medido independentemente de I? | **Sim, parcialmente** — P, U, R são registros do artefato; mas F e C exigem julgamento interpretativo (o que "conta" como divergência é um ato de interpretação do próprio avaliador). R puro (metadados) é neutro; F/C são interpretativos | A medição de R não é livre de I em todos os componentes — Gate 0 exige reportar isso como risco metodológico, não como falha |
| I pode ser medido sem usar A? | **Sim** — X₁ (consultas, acessos, tempo de exposição) é pré-ação; julgamento de erro (X₂) pós-ação pertence ao desfecho | Coerente com a decisão C+D do Adversário B |
| A pode ser medido sem usar ECO? | **Sim** — registro da ação efetiva (o que foi feito, quando, por quem) é anterior e independente da consequência | Sem objeção |
| ECO acrescenta algo além de A? | **Sim** — ECO é a consequência, não a ação: duas ações incompatíveis (A) podem ou não gerar consequência operacional (ECOA); ações individuais sem interdependência não geram ECO por definição | Distinção real; ECO não é redundante com A |

## 2. Eventos que pulam etapas

O ataque encontrou **três padrões reais que violam a linearidade**, todos com precedência documentada na literatura de incidentes:

1. **A → alteração de R (feedback):** a ação corrige ou contamina o artefato (uma decisão errada atualiza o cronograma com o erro). A cadeia linear esconderia isso; na prática R(t0) é o estado *antes* da janela, e mudanças de R dentro da janela são eventos próprios (registráveis como R(t') — a própria TPC já chama isso de "correção" vs. "deformação").
2. **I ↔ R (loop):** o intérprete interpreta, age, e a ação altera R, que muda a interpretação seguinte (spiral documental bem documentada em sociologia da informação). O modelo linear de um passo não captura; o modelo de **episódio com múltiplos estágios R→I→A→R→...** é a generalização necessária.
3. **ECO → revisão documental:** a falha gera reescrita de documentos (lições aprendidas, reprocessos). Isso não contamina R(t0) se o congelamento for em t0, mas contamina medidas *dentro* da janela; exige que o protocolo declare: **R é congelado em t0 e nunca remedido após ECO dentro da mesma janela**.

## 3. A sequência temporal: necessária ou possível?

O ataque sustenta: **a precedência R→I→A→ECO é possível, não necessária**. Contraexemplos observáveis: (i) falha causada primeiro por ação (decisão errada sem deformação prévia do artefato — ECO sem degradação, célula que o instrumento corrigido agora admite); (ii) simultaneidade (interpretação e ação no mesmo ato, como leitura de plano durante a execução); (iii) ação que cria a deformação (feedback). Consequência honesta: a cadeia R→I→A→ECO não é uma "arquitetura do fenômeno", é **um modelo candidato de desenho de medição** — descreve a ordem em que as medições devem ser tomadas para preservar independência, não a ordem ontológica dos eventos. Esta reclassificação é essencial: se a cadeia fosse afirmada como fato, os loops descobertos a falsificariam; como modelo de medição, ela sobrevive e explica por que t0, t1, t2, t3 são definidos assim.

## 4. Revisão do modelo

O modelo de medição sobrevive com três modificações: (i) **R congelado em t0, inalterável por design dentro da janela**; (ii) **eventos internos R↔I↔A registrados como covariáveis de processo, não como medições do estado inicial**; (iii) **ECOA como desfecho com ECOB (atribuição mecanística) separado, permitindo inclusive a atribuição "capacidade/planejamento/externo" em que R não participou** — o que torna a hipótese testável de verdade, pois agora pode perder.

## 5. Veredito parcial do Adversário C

**A cadeia como descrição causal linear é falsificável e possui contraexemplos reais (feedback, loops, ação sem deformação prévia). A cadeia como protocolo de medição (ordem de congelamento e independência) sobrevive**, condicionada às três modificações acima. Gate 0 não exige que o fenômeno seja linear; exige que o desenho de medição preserve independência — e isso é atendido após as revisões.
