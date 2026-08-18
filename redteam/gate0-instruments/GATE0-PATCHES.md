# GATE0-PATCHES — Patches propostos aos instrumentos da Reconstruction V1

**Data:** 18/08/2026 · **SHA-base:** fd1accf · **Regra (seção 22 da missão):** patches separados, formato ANTES/PROBLEMA/DEPOIS PROPOSTO/POR QUE/ EFEITO SOBRE FALSEABILIDADE; só aplicados após decisão explícita.

## PATCH 1 — ECO: separação Camada A / Camada B

| Campo | Conteúdo |
|-------|----------|
| **ANTES** | ECP-V0 critério 6: "Origem interna — a causa primária é representação/comunicação interna, com evidência documental" como pré-requisito de classificação do ECO |
| **PROBLEMA** | Circularidade: o desfecho só existe quando a hipótese (falha com origem representacional) é satisfeita. A célula "degradação não + ECO sim" torna-se impossível por definição; HYP-001-U imunizada por construção (mesmo defeito da válvula UNOBSERVED_PRECURSOR, transplantado para o outcome) |
| **DEPOIS PROPOSTO** | ECOA: ocorrência de falha coordenacional pelos critérios 1–5 apenas, causalmente neutra, sem atribuição. ECOB: atribuição mecanística posterior, separada, com categorias candidatas (representacional, capacidade, incentivo, recurso, restrição física, planejamento, competência, externo, múltiplo, indeterminado) e taxa de "indeterminado" reportada. ECOB nunca entra no modelo preditivo |
| **POR QUE** | Único arranjo que permite as quatro células da matriz R×ECOA e separa outcome de hipótese causal |
| **EFEITO SOBRE FALSEABILIDADE** | Aumenta radicalmente: REFUTATION torna-se observável (casos #1, #22 dos sintéticos); a hipótese passa a poder perder pelo próprio corpus de desfechos |

## PATCH 2 — Vetor R: remoção de X (C+D)

| Campo | Conteúdo |
|-------|----------|
| **ANTES** | EO = (P, F, U, C, R, X), com X = "1 − erros de interpretação" |
| **PROBLEMA** | Outcome-derived: "erros de interpretação" são falhas classificadas retroativamente; usar X para prever ECO é usar o desfecho como preditor do desfecho (AUD-01/leakage audit) |
| **DEPOIS PROPOSTO** | Vetor preditivo do piloto = (P, U, F, C, R com moderador) + X₁ (registro de consultas/acessos, covariável de uso). X₂ (julgamento de erro) reclassificado como subclasse de ECOB. Instrumento de interpretação I adiado para fase futura |
| **POR QUE** | O componente X₁ é objetivamente pre-outcome (logs); o componente X₂ é parte do outcome; divisão é obrigatória, não estética |
| **EFEITO SOBRE FALSEABILIDADE** | Aumenta: elimina o preditor que garantia falsos positivos; o teste agora depende apenas de informação genuinamente anterior |

## PATCH 3 — Pré-registro das escolhas de julgamento (F e C)

| Campo | Conteúdo |
|-------|----------|
| **ANTES** | F medido contra "o referente O(t)"; C sobre "inventário {Sᵢ} e pares" — sem regra de seleção |
| **PROBLEMA** | DEPENDS ON RESEARCHER JUDGMENT: dois avaliadores com mesmos dados produzem medidas diferentes (teste verde×vermelho, caso #10); liberdade suficiente para manipulação narrativa |
| **DEPOIS PROPOSTO** | Anexo de seleção: referente declarado por tipo de artefato (pré-registrado); inventário e emparelhamento declarados por tipo de episódio (pré-registrados); rubricas-âncora para julgamento de divergência |
| **POR QUE** | Sem pré-registro, a medida não é replicável; com pré-registro, o julgamento residual é limitado e reportável |
| **EFEITO SOBRE FALSEABILIDADE** | Converte julgamento discricionário em variância reportada; os casos manipuláveis (#10) ganham classificação única |

## PATCH 4 — Episódio: abertura e fechamento pré-outcome + amostragem universal

| Campo | Conteúdo |
|-------|----------|
| **ANTES** | Episódio definido com condição "o desfecho pode ou não ocorrer dentro da janela", sem regra operacional de abertura |
| **PROBLEMA** | Delimitação implicitamente retrospectiva (abre-se quando ECO acontece) → selection bias total; impossibilidade de verdadeiros negativos |
| **DEPOIS PROPOSTO** | Abertura por objetos observáveis em t0 (tarefa/decisão interdependente, agentes, inventário documental vinculado, janela declarada, snapshot congelado). Fechamento por fim natural da tarefa ou horizonte fixo. Amostragem de TODOS os episódios abertos na janela de coleta |
| **POR QUE** | Só a amostragem universal dá denominador para P(ECOA) e permite a célula "não/não" |
| **EFEITO SOBRE FALSEABILIDADE** | Habilita o teste preditivo; sem isso o estudo só poderia narrar associações em amostra selecionada por falha |

## PATCH 5 — Fechamento da válvula UNOBSERVED_PRECURSOR

| Campo | Conteúdo |
|-------|----------|
| **ANTES** | Categoria disponível sem condições objetivas; dois avaliadores podiam escolher REFUTATION ou UNOBSERVED sem violar o protocolo |
| **PROBLEMA** | Válvula de imunização operando na fase de classificação; potencial falsificação convertida em dado ausente |
| **DEPOIS PROPOSTO** | UNOBSERVED_PRECURSOR exige: ECOA=1 + checklist de cobertura ≥ limiar pré-registrado + busca ativa documentada e negativa. MISSING_DATA exige checklist de incompletude antecedente. MEASUREMENT_FAILURE exige evidência técnica. Caso contrário: REFUTATION, somável |
| **POR QUE** | As condições de evidência fecham a liberdade classificatória (testado nos casos #1, #22) |
| **EFEITO SOBRE FALSEABILIDADE** | Aumenta: derrota torna-se contável; taxa de REFUTATION é métrica primária |

## PATCH 6 — Cegamento: mundos separados + marca BLINDING=IMPOSSIBLE

| Campo | Conteúdo |
|-------|----------|
| **ANTES** | Cegamento exigido sem regra operacional; comum-method bias (AUD-07) mitigado apenas por declaração |
| **PROBLEMA** | "Não fingir cegamento" exigia explicitar os limites; equipes pequenas tornavam o duplo avaliador impraticável sem regra |
| **DEPOIS PROPOSTO** | Dois mundos com fluxos de informação proibidos (R nunca vê outcome; ECO nunca vê vetor R); arbitragem cega de divergências; marca `BLINDING=IMPOSSIBLE` para equipes ≤2 pessoas → braço apenas descritivo; registro público de onde cegamento causal (ECOB) é impossível |
| **POR QUE** | Registro honesto dos limites; exclusão estrutural do braço preditivo onde cegamento falha |
| **EFEITO SOBRE FALSEABILIDADE** | Protege o estimando principal do bias de método comum; honestidade preservada nos braços descritivos |

## PATCH 7 — Cadeia R→I→A→ECO: reclassificação como modelo de medição

| Campo | Conteúdo |
|-------|----------|
| **ANTES** | Arquitetura candidata apresentada como cadeia causal temporal do fenômeno |
| **PROBLEMA** | Falsificada por padrões reais: feedback A→R, loop I↔R, ação sem deformação prévia (caso #20), ECO → revisão documental |
| **DEPOIS PROPOSTO** | Reclasse como protocolo de medição: R congelado em t0 e inalterável dentro da janela; eventos internos R↔I↔A registrados como covariáveis de processo; sequência temporal é ordem de medição, não ontologia |
| **POR QUE** | Preserva a utilidade do desenho sem afirmar linearidade falsa |
| **EFEITO SOBRE FALSEABILIDADE** | Aumenta: o modelo deixa de poder "explicar" loops como deformações adicionais (imunização); loops viram covariáveis testáveis |

## Síntese

Sete patches, todos com efeito líquido de **aumento de falseabilidade**, nenhum desenhado para salvar a hipótese — três deles (patches 1, 2, 7) criam caminhos explícitos de derrota que o instrumento V0 fechava. Aplicação automática: proibida (seção 22 da missão). Pendência para decisão explícita do programa.
