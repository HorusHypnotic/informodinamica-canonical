# Teste Adversarial de Correspondência Teórica — TPC v0.8 × Modelo Experimental Posterior

**Data:** 08/08/2026
**Estado documental:** ACTIVE — análise científica provisória
**Status epistemológico:** teste adversarial documental; não canônico
**Objetivo:** tentar refutar separadamente três interpretações da relação entre a Teoria da Persistência da Coordenação v0.8 e o modelo experimental introduzido em 6583864.

## Aviso de autoridade

Este documento não decide a sucessão da TPC, não altera a v0.8 e não formaliza a Teoria dos Processos Coordenativos. “Compatível” não significa “confirmado”. Contraexemplos são testes conceituais permitidos pelas definições, não resultados empíricos.

Nenhuma fonte histórica foi alterada para produzir esta análise.

## Proveniência e fontes

Foram examinados:

- núcleo v0.8: Constituição, Documento Canônico, Glossário, TPC.md, ontologia, axiomas, formalização, LAW-001–004, HYP-001–003 e MET-001–005;
- desenvolvimento posterior: DEC-CONC-001, MET-006–009, EXP-001 e matriz de invariantes;
- 6583864, 5529403 e 3dd8460;
- README, auditorias e checkpoints apenas como metadocumentação.

## Hipóteses concorrentes

### H1 — Operacionalização

O modelo posterior apenas torna observáveis relações já presentes na v0.8.

### H2 — Ampliação compatível

O posterior preserva parte da v0.8, mas introduz entidades, níveis e processos necessários para fenômenos insuficientemente modelados antes.

### H3 — Modelo concorrente parcialmente incompatível

O posterior altera entidades, relações causais, unidades de análise ou critérios de observação de modo que impede incorporação simples.

## Resultado executivo

H1 foi refutada em sua forma forte. EO não é estado do fenômeno; K_R não é acoplamento; K_C não é T₄; degradação não é desacoplamento; Fliflexação não é recalibração; persistência não é sincronização.

H2 é a interpretação que melhor sobrevive, com ressalvas: ainda não existe a ponte formal necessária.

H3 permanece possível em pontos de unidade de análise e causalidade, mas não há rejeição documental explícita do núcleo v0.8.

O resultado conservador é:

> O modelo posterior é uma ampliação metodológica e experimental potencialmente compatível com a v0.8, mas essa compatibilidade depende de uma ponte formal inexistente. Em alguns pontos os modelos são parcialmente ortogonais; em outros podem tornar-se concorrentes.

## Teste 1 — EO × estado do fenômeno

Na v0.8:

EO(S,t) = (P, F, U, C, R, X)

EO descreve o estado da representação S, não o fenômeno O. Alguns atributos são relacionais: fidelidade compara S e O. Assim, EO é ontologicamente representacional, mas parcialmente dependente do fenômeno.

Casos adversariais:

- O muda e S não muda: conteúdo de S permanece, mas fidelidade/atualidade podem cair.
- O muda e EO observado não muda: possível sem detector ou recálculo.
- EO muda e O não muda: metadados, contexto, rastreabilidade, acessibilidade ou ambiguidade podem variar.

Separação necessária:

- estado do fenômeno O(t);
- estado da representação S(t);
- relação de acoplamento A(O,S,t);
- estado real e estado estimado/observado.

## Teste 2 — K_R × acoplamento

K_R é a capacidade de uma representação sustentar interpretações compatíveis para agentes, tarefa e ambiente. Acoplamento é o alinhamento entre fenômeno e representação.

| Estado | Possível? | Razão |
|---|---:|---|
| K_R alto + acoplamento alto | Sim | Representação atual e interpretável |
| K_R alto + acoplamento baixo | Sim | Agentes interpretam de forma compatível uma representação obsoleta; falso verde |
| K_R baixo + acoplamento alto | Sim | Representação fiel, mas ambígua, inacessível ou inadequada |
| K_R baixo + acoplamento baixo | Sim | Representação desatualizada e incapaz de orientar |

K_R e acoplamento não são equivalentes. A função g de K_R permanece indefinida.

## Teste 3 — K_C × T₄

T₄ é restauração do acoplamento. K_C é coordenação observada.

Contraexemplos possíveis:

- reacoplamento sem coordenação, por falta de acesso, interpretação ou condições;
- coordenação sem reacoplamento completo, por memória, improviso ou canal alternativo;
- métrica normalizada sem coordenação, como falso verde;
- coordenação compensatória apesar de representação degradada.

T₄ mede no máximo restauração do acoplamento segundo um indicador. Não implica restauração integral de EO, K_R ou K_C.

## Teste 4 — degradação × desacoplamento

Degradação sem desacoplamento é possível se o atributo perdido for irrelevante, permanecer dentro da tolerância ou for compensado por redundância.

Desacoplamento sem degradação interna ocorre quando a representação continua íntegra em relação ao estado antigo e o fenômeno muda. Pela v0.8, a fidelidade relacional pode cair mesmo sem mudança interna de S.

Relações provisórias:

- degradação → desacoplamento: contingente;
- desacoplamento → degradação interna: falso;
- desacoplamento → perda relacional de fidelidade/atualidade: plausível sob a v0.8.

## Teste 5 — deformação × desacoplamento

| Mecanismo v0.8 | Relação possível |
|---|---|
| Perda | Pode causar desacoplamento se eliminar conteúdo relevante |
| Atraso | Pode produzir desacoplamento temporal |
| Substituição | Pode causar ou corrigir desacoplamento |
| Ambiguidade | Pode reduzir K_R sem alterar alinhamento factual |
| Fragmentação | Pode reduzir interpretação mesmo com fragmentos corretos |

Desacoplamento também pode surgir quando O muda e S permanece intacta. Deformação e desacoplamento são parcialmente sobrepostos; não equivalentes.

## Teste 6 — Fliflexação × recalibração

| Dimensão | Fliflexação | Recalibração |
|---|---|---|
| Objeto | Atributos e relações da representação | Acoplamento representação–fenômeno |
| Entrada | Deformação/ECO | Sinal de desacoplamento e nova observação |
| Mecanismo | Detectar, decidir, corrigir e aprender | Observar, detectar, responder, atualizar e registrar |
| Saída | Representação restaurada; coordenação separada | Acoplamento restaurado em T₄ |
| Tempo | Velocidade no IFX | T₀–T₄ e latências explícitas |
| Detector | Sensibilidade | T₁/T₂, canais e meta-acoplamento |
| Aprendizado | Componente explícito | Registro, sem teoria desenvolvida de aprendizado |

São sobrepostos e potencialmente complementares. Recalibração pode operacionalizar parte da Fliflexação, mas não é equivalente.

## Teste 7 — persistência × sincronização

- Persistência sem sincronização: documento antigo permanece íntegro e rastreável, mas diverge do fenômeno atual.
- Sincronização sem longa persistência: sinal instantâneo acompanha o fenômeno e desaparece.

São dimensões distintas. Esta é uma das evidências mais fortes contra H1.

## Teste 8 — resiliência representacional × sistêmica

Coordenação pode persistir após perda de uma representação específica por redundância, canal alternativo, memória humana, correção independente, automação ou ação compensatória.

A representação individual não é unidade suficiente da resiliência sistêmica. Sua primariedade pode sobreviver no nível de um feixe representacional, mas isso não está formalizado na v0.8.

## Teste 9 — LAW-001–004

| Lei | Relação provisória | Razão |
|---|---|---|
| LAW-001 | Permanece sob domínio restrito | Posterior continua representacional; teoria geral pode pretender outros regimes |
| LAW-002 | Permanece sob domínio restrito | Pode reger coordenação persistente mediada por representações |
| LAW-003 | Precisa ser reformulada | Não cobre claramente mudança externa, detector e meta-acoplamento |
| LAW-004 | Precisa ser reformulada | Posterior desloca foco para canais, redundância e recalibração sistêmica |

Essas classificações não são decisões canônicas.

## Teste 10 — axiomas A1–A5

| Axioma | O posterior pode existir sem ele? | Avaliação |
|---|---:|---|
| A1 — todo signo tem estado variável | Parcialmente | EXP exige estados, não universalidade sobre signos |
| A2 — EO possui seis atributos | Sim | Posterior opera com canais e acoplamento |
| A3 — interpretação depende de representação e condições | Sim, se sistema automático não exigir interpretação ampliada | Pode pertencer ao regime v0.8 |
| A4 — coordenação resulta de ações compatíveis | Parcialmente | Posterior pode estudar acoplamento antes de K_C |
| A5 — estado pode degradar/recuperar | Dificilmente, mas o objeto pode mudar | Posterior pressupõe mudança sem assumir EO |

A1–A5 não podem ser promovidos automaticamente a axiomas de uma teoria geral.

## Teste de subteoria

Arquitetura candidata:

- Teoria geral dos Processos Coordenativos;
  - regime mediado por representações persistentes;
    - Teoria da Persistência da Coordenação v0.8.

Evidências favoráveis:

- a v0.8 delimita seu domínio;
- primariedade da representação é analítica, não metafísica;
- LAW-001 fala em coordenação persistente no domínio;
- persistência pode ser um processo particular.

Evidências adversas:

- não existe domínio geral formal;
- o posterior também é fortemente representacional;
- EO/K_R/K_C não foram ligados ao novo vocabulário;
- acoplamento e recalibração podem competir com degradação e Fliflexação;
- enunciados históricos fortes não sobreviveriam intactos;
- não foi demonstrada coordenação sem representação.

A arquitetura é plausível, não demonstrada. A v0.8 não sobreviveria intacta.

## Necessidade da representação

| Caso | Avaliação |
|---|---|
| Coordenação efêmera | Coberta apenas mediante extensão |
| Sinal transitório | Indecidido; pode satisfazer representação sem longa persistência |
| Feedback físico direto | Potencial contraexemplo se não houver estrutura referencial |
| Coordenação incorporada no ambiente | Exige critérios para evitar trivialização |
| Memória distribuída | Coberta quando operacionalizável como representação |
| Redundância entre agentes | Indecidida |
| Automação sem artefato persistente | Potencial contraexemplo |
| Reflexos/instintos | Fora do domínio v0.8 |
| Regras locais codificadas | Admitidas como representação |

O posterior não demonstra que consiga modelar coordenação sem representação.

## Matriz de correspondência

| v0.8 | Posterior | Relação candidata | Evidência favorável | Contraexemplo | Compatibilidade |
|---|---|---|---|---|---|
| EO | Estado da representação | Parcial | Ambos descrevem condição representacional | EXP separa físico e simbólico | Compatível |
| EO | Estado do fenômeno | Não equivalente | Fidelidade depende de O | O muda sem alteração material de S | Incompatível como identidade |
| K_R | Acoplamento | Determinante possível | Alinhamento pode favorecer interpretação | Falso verde | Parcial |
| K_C | T₄ | Relação causal possível | Reacoplamento pode favorecer coordenação | Condições impedem K_C | Não equivalente |
| D_R | Degradação de canal | Sobreposição | Canal degradado pode reduzir EO/K_R | Redundância compensa | Parcial |
| D_R | Desacoplamento | Sobreposição relacional | Fidelidade pode expressá-lo | S íntegra fica obsoleta | Parcial |
| Deformação | Desacoplamento | Causa possível | Perda/atraso geram divergência | O muda sem deformação interna | Parcial |
| Resiliência | Redundância/recalibração | Componente sistêmico | Preservação e correção | Sistema resiste à perda de S | Ampliação |
| Fliflexação | Recalibração | Sobreposição complementar | Ambas detectam/corrigem | Objetos e componentes distintos | Parcial |
| Persistência | Sincronização | Dimensões ortogonais | Ambas afetam utilidade | Persistente obsoleta; efêmera sincronizada | Não equivalente |
| ECO | Colapso M7 | Desfecho possível | Ambos observam falha | Desacoplamento pode preceder ECO | Parcial |
| IFX | Latências | Operacionalização parcial | Velocidade usa T₀–T₄ | Precisão/aprendizado ausentes | Parcial |
| LAW-003 | Falhas EXP | Taxonomias sobrepostas | Perda/atraso reaparecem | Meta-falha não cabe | Parcial |
| S individual | Feixe/canais | Parte–todo | M6 mapeia representações | Feixe possui propriedades emergentes | Ampliação |
| Interpretação | Detecção automática | Analogia | Mecanismos processam sinais | Causalidade sem semântica | Indecidido |

## Matriz adversarial

| Critério | H1 — Operacionalização | H2 — Ampliação compatível | H3 — Concorrência parcial |
|---|---|---|---|
| Favorável | T₀–T₄ tornam detecção/correção observáveis | Preserva representação/degradação e acrescenta canais | Muda unidade de representação para relação/arquitetura |
| Contrário | Novas entidades não existiam substantivamente | Ponte formal inexistente | Nenhuma rejeição explícita |
| Pressuposto | Acoplamento teria de ser função de EO e T₄ predizer K_C | Mapear entidades e restringir leis v0.8 | Novos termos teriam de substituir os antigos |
| Contraexemplo forte | Persistência sem sincronização; K_R alto com baixo acoplamento | Coordenação sem representação explicada pelo posterior | Posterior pode ser arquitetura de observação da v0.8 |
| Problema | Não explica redundância e meta-acoplamento | Não demonstra relação parte–todo | Não identifica proposições rejeitadas |
| Poder explicativo | Baixo para falso verde/detector | Potencialmente maior | Possível apenas localmente |
| Parcimônia | Alta por equivalências falsas | Moderada | Baixa sem núcleo próprio |
| Compatibilidade documental | Fraca | Parcial | Parcial nos pontos de tensão |
| Status | REFUTADA PELA DOCUMENTAÇÃO, em forma forte | SOBREVIVE COM RESSALVAS | SOBREVIVE COM RESSALVAS |

## Respostas centrais

### O posterior precisa da v0.8?

Não precisa formalmente de EO/K_R/K_C para executar EXP-001, mas possui dependência genealógica e conceitual de representação, degradação e restauração.

### A v0.8 precisa do posterior?

Não. O posterior melhora observabilidade, mas não é logicamente necessário à formulação histórica.

### Há fenômenos posteriores que exigem extensão?

Sim: sincronização independente de persistência, falha de detector, falso verde, meta-acoplamento, independência/redundância, T₀–T₄ e resiliência sistêmica.

### Conceitos v0.8 desaparecem no posterior?

EO, K_R, K_C, D, Fliflexação, IFX, ECO, ICO, Capital Preservado, Slektip, axiomas e proposições não são incorporados. Ausência não significa rejeição.

### A v0.8 pode sobreviver intacta?

Não intacta. Exigiria restrição de domínio, redução de universalidade, arquitetura de canais e relação formal com acoplamento/sincronização.

### Existe teoria mais geral?

Não demonstrada. Há intenção e metodologia, mas faltam domínio, ontologia, axiomas, leis, modelos e falseabilidade próprios.

## Descobertas que poderiam mudar o resultado

- caso reproduzível de coordenação sem representação persistente;
- derivação de T₀–T₄ e acoplamento a partir de EO/K_R/K_C;
- dados mostrando independência entre K_R e acoplamento;
- reacoplamento sem K_C, ou K_C sem reacoplamento;
- domínio geral que contenha rigorosamente a v0.8;
- demonstração de que redundância/meta-acoplamento exigem abandonar proposição v0.8;
- resultados interdomínios sobre invariantes.

## Veredito

> O modelo posterior não é mera operacionalização da v0.8. A melhor hipótese atual é uma ampliação compatível ainda não formalizada, com pontos de possível concorrência parcial.

## Limitações

- Análise documental, não validação empírica.
- Contraexemplos são possibilidades lógicas.
- A compatibilidade não foi demonstrada por modelo formal.
- Os materiais posteriores possuem autoridade inferior ao núcleo v0.8.
- Funcionamento de software não foi usado como evidência.
