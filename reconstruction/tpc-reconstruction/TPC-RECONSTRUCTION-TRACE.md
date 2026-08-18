# TPC-RECONSTRUCTION-TRACE — Linha de sobrevivência proposição a proposição

**Proveniência por proposição:** CLAIM → ORIGINAL SOURCE → BREAKER JUDGMENT → AUDIT JUDGMENT → CURRENT JUDGMENT. Confiança (0–1) e questão aberta registradas por linha.

## Conceitos (C001–C014)

| Proposição | Claim original (fonte) | Breaker | Auditoria | ESTADO ATUAL |
|-------------|------------------------|---------|-----------|--------------|
| C001 Coordenação (IDR-0001) | Resultado relacional emergente de ações compatíveis interpretando representações (GLOSSARIO) | D2–D3 (jogos, Bayes, Hutchins) | Precedência+demonstrada; equivalência não; reconstrução parcial | **REDUNDÂNCIA PROVÁVEL** no explanandum; conceito não falsificado, mas sem exclusividade. Conf. 0.75. QA: existe medida operacional própria? Não. |
| C002 Representação operacional (IDR-0002) | 4 critérios, interpretação por agentes OU mecanismos | D1 (exigência do observador, R07-EV-3) | Os 4 critérios sobrevivem como definição; o problema é validade de construto, não a definição | **SOBREVIVE como definição, REBAIXADA como construto mensurável** (precisa Gate 1). Conf. 0.7. QA: validação empírica dos critérios. |
| C003 Estado coordenado | Interpretações compatíveis para ação coerente | D2 (Aumann, Clark) | Sobreposição com common ground; circularidade potencial na medição (NC-3) | **REBAIXADA** — definição útil, medição circular se inferida da ação. Conf. 0.7. |
| C004 Deformação | Alteração que reduz atributos/interpretações compatíveis | D2 (falhas de sensor) | Taxonomia sobreposta a classificação de falhas de canal, porém com componente semântico-social sem contraparte madura | **REBAIXADA a taxonomia candidata** — validação cega necessária. Conf. 0.65. |
| C005 Resiliência | Capacidade de restaurar/preservar integridade | D2 (manutenção, robustez de rede) | Sem novidade adicional encontrada | **REDUNDÂNCIA PROVÁVEL** com manutenção/robustez. Conf. 0.7. |
| C006 Persistência da coordenação | Propriedade de manter ações compatíveis no tempo | D1–D2 (rotinas, consistência eventual) | "Persistência como substantivo" atacada no boss; distinção das 4 noções (CS-2) mantida | **REBAIXADA** — persistência deve ser tratada como processo com manutenção ativa. Conf. 0.7. |
| C007 Fliflexação | Restauração de atributos/relações | D2 (manutenção de sensores) | Sem novidade conceitual; reclassificada como caso de LAW-004 | **REBAIXADA a rótulo aplicado** (não conceito teórico). Conf. 0.8. |
| C008 Capital Preservado | Coordenação preservada em valor econômico | D2 (não reprodutível, EPI indefinido) | Mantido o achado; MUT-003 proposta | **INDETERMINADA até método contrafactual** (EPI). Conf. 0.6. |
| C009 Slektip | Representação persistente e acionável para transferência de contexto | D1–D2 (lessons learned, rotinas) | Sobreposição com SECI/rotinas confirmada; MUT-006 propõe objeto operacional | **REDUNDÂNCIA PROVÁVEL**; sobrevive só como objeto operacional SLK. Conf. 0.75. |
| C010 ECO | Evento observável de falha coordenacional | D1–D2 (Reason, ICAO) | Confirmado precedência; agora exige instrumento (ECP-V0) e cegamento | **SOBREVIVE como construto de desfecho, PRECISA DE EXPERIMENTO** para virar instrumento. Conf. 0.8. |
| C011 ICO | I×R×P | D2 (RPN) | Confirmado: análogo a RPN, admitido pelo próprio repositório | **REDUNDÂNCIA DEMONSTRADA** com RPN; mantém uso se calibrado. Conf. 0.9. |
| C012 IFX | 4 componentes, 2 escalas possíveis | D2 (duas escalas, não mensurável) | Mantido; MUT-002 | **REBAIXADA até escala única fixada**. Conf. 0.8. |
| C013 Postulado fundamental | Persistência depende de representações operacionais persistentes | D4 (contraexemplos naturais) — mitigado a D2 no v0.8 pelo domínio declarado | O postulado v0.8 é analítico dentro do domínio; os contraexemplos falsificam a versão histórica (v0.7) e qualquer leitura universalista | **SOBREVIVE condicionada ao domínio** — com a ressalva de que "depende de" precisa virar associação mensurável (TPC-F) para ter conteúdo. Conf. 0.7. |
| C014 Domínio | Sistemas produtivos/digitais/híbridos; exclui instintivos e fatores externos | D2 (Paxos dentro do domínio; exclusão ad hoc de sabotagem) | Paxos reclassificado como teste estrutural; exclusão de sabotagem mantida como imunização suspeita (AUD-10) | **REBAIXADA** — domínio válido, mas a exclusão de sabotagem deve cair (MUT-009). Conf. 0.75. |

## Axiomas (A001–A005)

| Proposição | Claim | Breaker | Auditoria | ESTADO ATUAL |
|-------------|-------|---------|-----------|--------------|
| A001 Signo possui estado variável | Axioma | D1 (trivial) | Mantido como inócuo | **SOBREVIVE (trivial, inofensivo)** |
| A002 EO composto por P,F,U,C,R,X | Axioma | D1 | **AUD-02: rebaixado a H-EO** — hipótese taxonômica candidata até validação fatorial | **REBAIXADA → H-EO (hipótese/taxonomia candidata)**. Conf. 0.85. |
| A003 Interpretação depende do estado+condições | Axioma | D1–D2 | Mantido; coerente com cognição situada | **SOBREVIVE** (fraco) |
| A004 Coordenação = resultado relacional | Axioma | D1–D2 | Sobreposto com DiffCog mas não falsificado | **REDUNDÂNCIA PROVÁVEL** |
| A005 Estado pode degradar/permanecer/recuperar | Axioma | D1 | Tautologicamente verdadeiro | **SOBREVIVE (trivial)** |

## Leis (L001–L004)

| Lei | Claim | Breaker | Auditoria | ESTADO ATUAL |
|-----|-------|---------|-----------|--------------|
| LAW-001 Mediação representacional | Coordenação persistente mediada por representações | D3 (reconstrução 1:1) | Núcleo: sobreposição substancial confirmada (Hutchins); residual empírico = TPC-F | **REBAIXADA a modelo candidato** "R→I→A→ECO" (seção 9 da missão). Conf. 0.8. |
| LAW-002 Persistência→coordenação | "Podem sustentar" | D2 (modal fraco) | Modal "podem" não informativos; persistência ≠ processo | **REBAIXADA a observação** |
| LAW-003 Taxonomia de deformação | 5 mecanismos | D2 (mapeável a falhas de sensor) | Sem validação; fragmentação=partição, etc. | **REBAIXADA a taxonomia candidata** — Gate 2. Conf. 0.7. |
| LAW-004 Restaurabilidade | "Pode ser restaurada" | D2 | Modal fraco; Paxos como caso-limite de teste | **REBAIXADA a observação** + caso de teste (redundância/quorum) |

## Proposições P1–P6 / T1–T4

Todas rebaixadas por derivação (P do pente-fino) ou por exigirem hipóteses adicionais admitidas (T2/T4). **REBAIXADAS a notas metodológicas** — nenhuma falsificada, nenhuma independente.

## Hipóteses

| Hipótese | Claim | Breaker | Auditoria | ESTADO ATUAL |
|----------|-------|---------|-----------|--------------|
| HYP-001/HYP-001-U | Falhas precedidas por deformação não corrigida | D3 (válvula + zero dados) | Validada como aposta empírica legítima; critérios de refutação (20%, UNOBSERVED_PRECURSOR) fragilizados (AUD-03, AUD-14) | **PRECISA DE EXPERIMENTO** — pré-registro com critérios independentes obrigatório. Conf. 0.7. |
| HYP-002 | Intervenções OPERA alteram coordenação | D2 (viés de medição) | **AUD-04: confounding intervenção/instrumentação — o desenho atual não infere causalidade**; a régua precisa ser equivalente | **PRECISA DE EXPERIMENTO com desenho corrigido** (instrumentação equivalente entre braços). Conf. 0.75. |
| HYP-003 | Inércia representacional | D2 (ETTO + infraestrutura invisível) | Redundância mantida | **REDUNDÂNCIA DEMONSTRADA** (Hollnagel + Star/Ruhleder). Conf. 0.9. |

## Métricas (M001–M005)

| Métrica | ESTADO ATUAL |
|---------|--------------|
| MET-001 ECO | **PRECISA DE EXPERIMENTO** (instrumento ECP-V0; cegamento; heterogeneidade) |
| MET-002 ICO | **REDUNDÂNCIA DEMONSTRADA** (RPN) — usar com calibração local |
| MET-003 IFX | **REBAIXADA** (escala única, rubricas) |
| MET-004 Capital Preservado | **INDETERMINADA** (método contrafactual ausente) |
| MET-005 Slektip | **REDUNDÂNCIA PROVÁVEL** — rebaixar a objeto operacional SLK |

## Formalização (F001–F006)

| Elemento | ESTADO ATUAL |
|----------|--------------|
| F001 EO(S,t) | **PRECISA DE EXPERIMENTO** — validade de construto (AUD-02): dimensões candidatas, estrutura a determinar empiricamente (1/2/3/6 fatores ou checklist) |
| F002 Modelos candidatos P/F/U/C/R/X | **REBAIXADA a parametrizações locais** — cada curva é escolha não validada; P(t)=e^{−λt} não tem λ calibrado |
| F003 B(S,t) | **DESTRUÍDA como formalização vigente** (adimensional) — manter como direção de pesquisa (informação semântica) com teoria própria |
| F004 D(S,t) | **REBAIXADA a família de índices candidatos** — validade dimensional, double counting e monotonicidade em aberto; nunca calibrado |
| F005 Pr(E=1)=q(D,...) | **INDETERMINADA** — sem q, sem D calibrado; depende de Gate 1 e Gate 4 |
| F006 K_R=g(...), K_C=h(...) | **INDETERMINADA** — g/h indefinidas; MUT-004 (função teste) é o caminho |

## Falseadores (C015–C019)

| Falseador | ESTADO ATUAL |
|-----------|--------------|
| C015 (sem representação) | **REBAIXADA a condição quase insatisfazível no domínio vigente** — manter como teste de fronteira (casos biológicos/naturais documentam o limite) |
| C016 (sem incremento explanatório) | **SOBREVIVE** — é o critério de sobrevivência mais honesto do corpus (o residual é exatamente TPC-P/TPC-I) |
| C017 (intervenções sem efeito) | **SOBREVIVE** — mapeia para TPC-C/HYP-002 corrigida |
| C018/C019 (versões categóricas antigas) | **ATAQUE INVALIDADO no domínio vigente** — derivas históricas; unificar via MUT-010 |

## Golpes do Breaker — estado após auditoria (síntese)

| Golpe | Estado |
|-------|--------|
| Imunização adaptativa (R16-I-1) | **CONFIRMADO com nuance** (2 casos suspeitos; 3 legítimos) |
| Válvula UNOBSERVED_PRECURSOR (R16-I-2) | **CONFIRMADO + AMPLIADO** (buraco negro classificatório; exige pré-registro) |
| Exclusão de sabotagem (R16-I-3) | **CONFIRMADO** (imunização suspeita; MUT-009) |
| Paxos/Raft (R03-DS-2) | **ATACADO — reclassificado**: não é falsificador; é caso-limite de teste |
| D(S,t) não-monotonicidade (R12-SD-2) | **ATACADO — escopo corrigido**: falsifica parametrização, não família; objeções dimensionais permanecem |
| Doppelgänger 81–99% | **ATACADO — cardinal invalidada**: sobreposição conceitual substancial, redundância integral não demonstrada |
| Hutchins (R09-NC-1) | **PARCIALMENTE ATACADO**: precedência+ sobreposição confirmadas; equivalência/redundância integral não demonstradas |
| Coordenação natural sem representação (R07/R08) | **ATACADO no baseline vigente**: domínio declarado protege; válida contra TPC histórica v0.7 |
| "Sobrevive sse HYP-001-U" | **ATACADO — removido** |
| N≥20 / p<0.05 como selo | **ATACADO — removidos do desenho** |
| Leakage em X (AUD-01) | **NOVO GOLPE — confirmado**: atributo outcome-derived |
| Validade de construto EO (AUD-02) | **NOVO GOLPE — confirmado** |
| Limiar 20% arbitrário (AUD-03) | **NOVO GOLPE — confirmado** |
| Confounding HYP-002 (AUD-04) | **NOVO GOLPE — confirmado** |
