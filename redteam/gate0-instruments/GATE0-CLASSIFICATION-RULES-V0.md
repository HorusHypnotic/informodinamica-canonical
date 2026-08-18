# GATE0-CLASSIFICATION-RULES-V0 — Regras de classificação de evidência adversarial

**Data:** 18/08/2026 · **Adversário E** · **SHA-base:** fd1accf · **Objeto:** válvula UNOBSERVED_PRECURSOR e regras de classificação (seção 14 da missão).

## 1. O problema atacado

O instrumento anterior permitia que dois avaliadores razoáveis classificassem o mesmo evento como REFUTATION ou como UNOBSERVED_PRECURSOR/MISSING_DATA sem violar o protocolo. Essa liberdade é a antiga válvula de imunização operando na fase de classificação: ela transforma potencial falsificação em dado faltante ou dado perdido, categorias que não contam contra a hipótese. As regras a seguir fecham essa liberdade por **hierarquia rígida de evidência** — a categoria é determinada pelo dado observável, não pela conveniência narrativa.

## 2. As quatro categorias — definição fechada

| Categoria | Condições necessárias e suficientes |
|-----------|--------------------------------------|
| **ECOA-POSITIVE** | ECOA classificado pelos critérios 1–5 com evidência documental independente; qualquer ECOB atribuído depois |
| **ECOA-NEGATIVE** | Janela encerrada, dossiê verificado com esforço padrão de documentação, nenhum critério 1–5 atendido |
| **MISSING_DATA** | O dossiê do episódio **não existe ou está incompleto** por falha de registro identificável, definida ANTES do outcome: checklist de completude aplicado ao dossiê (tarefa, inventário, congelamento, registros da janela); incompletude é registrada pelo checklist, não pelo avaliador |
| **MEASUREMENT_FAILURE** | O snapshot R de t0 falhou objetivamente (sensor quebrado, log corrompido, datas ausentes) **com evidência técnica da falha** (timestamp ausente, arquivo corrompido) — não por julgamento de que "a medição não capturaria a deformação" |
| **UNOBSERVED_PRECURSOR** | **Única condição:** ECOA-POSITIVE + checklist de cobertura observacional aplicado à JANELA inteira com escore ≥ limiar pré-registrado (ex.: ≥ 80% dos documentos-alvo do episódio com snapshot válido) + **nenhuma divergência R≥U≥C detectada nos dados disponíveis** + busca ativa documentada de précursores falhou |
| **REFUTATION** | ECOA-POSITIVE + (UNOBSERVED_PRECURSOR descartado por escore de cobertura insuficiente **OU** cobertura excelente com busca ativa que não encontrou precursor) — nas regras V0 a REFUTATION é simplesmente a célula "ECOA-POSITIVE + ECOB≠representacional/indeterminado com evidência" OU "cobertura alta + sem precursor detectado" |

## 3. Casos adversariais da seção 14 — classificação forçada

| Caso | Dados | Categoria obrigatória | Quem tentaria desviar |
|------|-------|------------------------|------------------------|
| 1 | ECO + cobertura excelente + sem divergência detectada | **REFUTATION** (ecob ≠ representacional ou cobertura alta sem precursor) — não pode virar UNOBSERVED, pois a condição de cobertura alta é objetiva | Pesquisador Verde (tentaria MISSING_DATA) — rejeitado: dossiê completo por checklist |
| 2 | ECO + dados anteriores incompletos | **MISSING_DATA** — se a incompletude antecede o outcome e é registrada pelo checklist | Ambos; a regra fecha: incompletude checklist = MISSING_DATA independentemente do outcome |
| 3 | ECO + sensor/log falhou | **MEASUREMENT_FAILURE** — exige evidência técnica da falha (timestamp ausente), não relato | Verde (tentaria reclassificar como cobertura ruim → MISSING); falha técnica com evidência = MEASUREMENT_FAILURE |
| 4 | ECO + depois apareceu evidência independente de degradação anterior | **ECOA-POSITIVE + ECOB-representacional** — a evidência independente muda o dossiê; se a evidência for anterior à janela e o snapshot a ignorou, o caso expõe limitação do instrumento (reportada), não exoneração | Vermelho (tentaria REFUTATION) — rejeitado: evidência independente documental entra no dossiê |

O teste de dois avaliadores razoáveis: com essas regras, os quatro casos têm classificação única e obrigatória. O único ponto residual de discricionariedade é o **escore de cobertura** — fechado por checklist pré-registrado de documentos-alvo por tipo de episódio (o inventário do episódio define os documentos-alvo em t0; cobertura = fração com snapshot válido). Sem checklist, o escore volta a ser manipulável; **o checklist é condição de uso da categoria UNOBSERVED_PRECURSOR**.

## 4. Consequência para a hipótese

Com as regras fechadas, REFUTATION torna-se observável e contável. A hipótese aceita publicamente sua célula de derrota: episódios com cobertura alta, busca ativa negativa e ECO não-representacional são **REFUTATION, somam no denominador e enfraquecem a hipótese**. A taxa de REFUTATION é métrica primária do estudo, reportada ao lado da taxa de associação. Se a taxa de REFUTATION for alta, o programa tem resposta explícita (abandonment, ver GATE0-ABANDONMENT-CRITERIA).
