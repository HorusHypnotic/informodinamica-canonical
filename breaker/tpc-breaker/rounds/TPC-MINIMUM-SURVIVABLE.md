# TPC-MINIMUM-SURVIVABLE — A rapa do coco da mosca

**Método (Regra 16):** remover conceitualmente, em iterações, tudo que não seja necessário: metáforas, redundâncias, palavras intercambiáveis, leis deriváveis, hipóteses sem conteúdo, afirmações não falsificáveis, matemática ornamental, escopo universal indevido.

## Iteração 1 — Remoções óbvias

Removidos nesta iteração: todo o aparato metafórico ("corrosão", "deformação" como vocabulário — substituído por "perda de atributos"); o léxico histórico (Evento de Corrosão Operacional, "redução compartilhada de incertezas"); as "filosofias" matemáticas (Riemann, categorias); a geometria da informação candidata sem métrica validada; os conceitos draft IDR-0013 a IDR-0024; ECO de documentos históricos; Fliflexação/Slektip como conceitos separados (absorvidos por restauração e transferência de contexto); os dois casos reais como evidência (são ilustrações retrotivas, não dados).

Sobra: 4 leis, 5 axiomas, 3 hipóteses, EO de 6 atributos, D(S,t), protocolo experimental.

## Iteração 2 — Leis deriváveis e redundâncias

LAW-002 ("podem sustentar") e LAW-004 ("pode ser restaurada") são modais fracos que não fazem afirmação falsificável sobre direção ou magnitude — colapsam em "é possível", verdadeiro por observação de um caso. Deriváveis de A3+A5. ELIMINADAS como leis; rebaixadas a observações.
LAW-003 (taxonomia de 5 mecanismos) sobrevive? A taxonomia sobrepõe-se quase integralmente à classificação de falhas de sensor/transmissão (perda=dropout, atraso=latência, substituição=corrupção, ambiguidade=baixa identificabilidade, fragmentação=partição). A taxonomia TPC não foi validada empiricamente como distintiva. ELIMINADA como contribuição original; rebaixada a conjectura de vocabulário aplicado.
P1/P5/P6 derivam de A2+A3. P2/P3/P4 são notas metodológicas, não proposições. P7–P12: idem. ELIMINADAS as 12 proposições como corpo teórico independente.
HYP-003 (inércia) = ETTO + infraestrutura invisível (Hollnagel, Star/Ruhleder — ambos já citados pela TPC). ELIMINADA por redundância (R09-NC3, R13-MA3).

## Iteração 3 — O que resiste

Resiste **LAW-001 na forma condicional**: "No domínio de sistemas sócio-técnicos deliberativos, a coordenação persistente observada está associada a representações operacionais persistentes e interpretáveis — associação que deve ser estimada empiricamente, não presumida." Mais nada sobrevive como mecanismo novo.

Resta também a **agenda empírica**: a hipótese operacional HYP-001-U (falhas precedidas por deformação não corrigida, dentro da janela e dos mecanismos de detecção declarados, com a taxonomia de classificação de exceções REFUTATION/UNOBSERVED_PRECURSOR/MISSING_DATA/MEASUREMENT_FAILURE) — que é uma hipótese de pesquisa legítima, falsificável (critério: >20% de ECOs sem deformação identificável no controle), e empiricamente não testada.

## MINIMUM SURVIVABLE TPC (versão final)

> **(MST-1)** Existe uma classe de sistemas sócio-técnicos deliberativos em que a coordenação de ações depende, em grau mensurável, do estado de artefatos representacionais compartilhados.
>
> **(MST-2)** O estado desses artefatos pode ser descrito por atributos (persistência, fidelidade, atualidade, coerência, rastreabilidade, contexto) e degradar por processos identificáveis; medir esses atributos prospectivamente pode acrescentar poder preditivo para falhas de coordenação além dos baselines padrão de severidade×frequência (RPN) e do registro de rotinas organizacionais.
>
> **(MST-3)** MST-2 é uma hipótese empírica, testável por desenho quasi-experimental com critérios de refutação publicados (HYP-001-U e §5 do protocolo experimental).

## Verificação dos 5 critérios de sobrevivência

| Critério | MST atende? |
|----------|-------------|
| Coerente | Sim — três enunciados compatíveis, sem circularidade |
| Distinguível | MST-1 distingue-se de controle/jogos apenas pelo objeto (artefatos representacionais sociais); MST-2 distingue-se por ser empírica |
| Operacionalizável | Parcialmente — exige MUT-004/MUT-005 (funções teste e família de modelos) antes de campo |
| Potencialmente falsificável | Sim — MST-2 falseável pelo critério quantitativo do protocolo; MST-1 falseável por sistemas deliberativos sem dependência mensurável de artefatos |
| Não trivial | MST-1 é quase trivial (quase tautológica para a população definida); MST-2 é não trivial — e é onde reside todo o valor restante |

## Conclusão do pente-fino
A menor TPC defensável é **uma hipótese de pesquisa empírica** (MST-2), não uma teoria explicativa. O nome "Teoria dos Processos Coordenativos" descreve mais do que o conteúdo sobreviveu: o conteúdo é "artefatos representacionais degradam e isso pode predizer falhas de coordenação — vamos medir". Qualquer coisa acima disso é reconstruível por teorias existentes (Doppelgänger) ou imunização adaptativa (R16).
