# TPC-BASELINE — Proposições Congeladas para o Campeonato Adversarial

**Autor:** Manus AI (TPC BREAKER — Investigação Adversarial)
**Data do congelamento:** 17/08/2026
**Fonte canônica:** repositório `informodinamica-canonical`, commit `aad9af9` (main), branch de investigação isolada `breaker/tpc-breaker-championship`
**Versão canônica de referência:** v0.8 (DEC-CONC-001, 07/08/2026: TPC = Teoria dos Processos Coordenativos; "Teoria da Persistência da Coordenação" = formulação histórica)
**Hierarquia de autoridade documental (docs/governanca_documental_v0.7.1.md):** CONSTITUICAO.md > DOCUMENTO_CANONICO.md > GLOSSARIO_CANONICO.md (fonte única de definições) > 01-teoria/TPC.md > formalizações > protocolos > legado. Arquivos em `ontology/`, `laws/`, `hypotheses/`, `metrics/` = referência HISTÓRICA.

> **Estatuto deste documento:** snapshot investigativo congelado. Nenhuma proposição foi alterada. O campeonato é proibido de mover a trave (Regra 3 do prompt TPC BREAKER); toda correção entra depois, como MUTAÇÃO CANDIDATA.

---

## 0. Registro de arqueologia (o que mudou ao longo do tempo)

| Evento | Evidência |
|--------|-----------|
| Nome original da teoria: "Teoria da Persistência da Coordenação" | DEC-CONC-001, linhas 9–30 |
| Definição histórica de coordenação: "redução compartilhada de incertezas" — explicitamente rebaixada a "interpretação quantitativa candidata" (SHANNON_FORMALIZATION_PENDING) | GLOSSARIO_CANONICO.md, IDR-0001, nota |
| Redação anterior de HYP-001 ("elevam o risco") substituída pela redação de precedência temporal ("tendem a ser precedidas") | GLOSSARIO_CANONICO.md, nota HYP-001 |
| Axiomas A6 e A7 (acúmulo necessário, limiar determinístico) rebaixados de axiomas a "hipóteses de modelo" | AXIOMAS_E_PROPOSICOES.md, seção 1 |
| C1–C3 de falseabilidade no DOCUMENTO_CANONICO.md (linhas 118–125) são formulação anterior, mais forte que a de 01-teoria/TPC.md §6 — ver TPC-P022 |
| Auditoria interna v0.2.4 (C-01, A-01…A-04) e v0.7.0 documentam vulnerabilidades metodológicas conhecidas pelo próprio autor | AUDITORIA_v0.2.4.md; AUDITORIA_v0.7.0.md |

## 1. Conceitos congelados (IDR)

| ID baseline | Conceito | Definição congelada | Fonte |
|-------------|----------|---------------------|-------|
| TPC-C001 | Coordenação (IDR-0001) | Resultado relacional emergente em que agentes ou mecanismos produzem ações compatíveis ao interpretar representações sob condições operacionais determinadas | GLOSSARIO_CANONICO.md |
| TPC-C002 | Representação Operacional (IDR-0002) | Estrutura portadora de estado com relação especificável a objeto/condição/regra/ação, interpretável por agentes ou mecanismos; 4 critérios (estado identificável, relação de referência, interpretabilidade, continuidade potencial) | GLOSSARIO_CANONICO.md; TPC.md §2.2 |
| TPC-C003 | Estado Coordenado (IDR-0003) | Condição em que agentes compartilham representações compatíveis para ação coerente sem retrabalho | GLOSSARIO_CANONICO.md |
| TPC-C004 | Deformação Representacional (IDR-0004) | Alteração que reduz atributos do estado ou a capacidade de sustentar interpretações compatíveis | GLOSSARIO_CANONICO.md |
| TPC-C005 | Resiliência Representacional (IDR-0005) | Capacidade de restaurar ou preservar integridade funcional da representação | GLOSSARIO_CANONICO.md |
| TPC-C006 | Persistência da Coordenação (IDR-0006) | Propriedade secundária de manter ações compatíveis ao longo do tempo sob dependência de representações persistentes | GLOSSARIO_CANONICO.md |
| TPC-C007 | Fliflexação (IDR-0007) | Capacidade de restaurar atributos e relações de representações degradadas; recuperação coordenacional é desfecho separado | GLOSSARIO_CANONICO.md |
| TPC-C008 | Capital Preservado (IDR-0008) | Coordenação preservada que se traduziu em valor econômico | GLOSSARIO_CANONICO.md |
| TPC-C009 | Slektip (IDR-0009) | Representação persistente e acionável destinada a transferir contexto coordenador entre ciclos | GLOSSARIO_CANONICO.md |
| TPC-C010 | ECO (IDR-0010) | Evento observável em que a coordenação necessária à ação falhou; desfecho candidato, não medida direta de toda degradação | GLOSSARIO_CANONICO.md |
| TPC-C011 | ICO (IDR-0011) | Impacto × Recorrência × Persistência | GLOSSARIO_CANONICO.md |
| TPC-C012 | IFX (IDR-0012) | Sensibilidade + Precisão + Velocidade + Aprendizado | GLOSSARIO_CANONICO.md |

## 2. Postulado e domínio declarado

| ID baseline | Conteúdo |
|-------------|----------|
| TPC-C013 | **Postulado Fundamental (TPC.md §1):** "Em sistemas no domínio da TPC, a persistência da coordenação depende de representações operacionais persistentes e interpretáveis." A primariedade da representação é analítica dentro do domínio, "não uma tese metafísica universal" |
| TPC-C014 | **Domínio de validade (ONTOLOGIA.md §1):** sistemas operacionais produtivos, sistemas digitais/híbridos, múltiplos agentes dependentes de representações, representações que podem degradar. Exclui: sistemas puramente instintivos/reflexos; sistemas sem estrutura portadora de estado/relação de referência/interpretação; sistemas dominados por fatores externos (violência, sabotagem) |

## 3. Axiomas congelados (A1–A5)

| ID baseline | Enunciado |
|-------------|-----------|
| TPC-A001 (A1) | Todo signo operacional possui um estado operacional que pode variar no tempo |
| TPC-A002 (A2) | O estado operacional é composto por atributos: persistência, fidelidade, atualidade, coerência, rastreabilidade e contexto (P, F, U, C, R, X) |
| TPC-A003 (A3) | A interpretação depende do estado operacional da representação e das condições do intérprete, da tarefa e do ambiente |
| TPC-A004 (A4) | Coordenação observada é resultado relacional de interpretações e ações compatíveis |
| TPC-A005 (A5) | O estado operacional pode degradar, permanecer estável ou recuperar-se conforme processos e intervenções |

## 4. Leis congeladas (LAW-001 a LAW-004)

| ID baseline | Lei | Enunciado congelado |
|-------------|-----|---------------------|
| TPC-L001 | LAW-001 Mediação Representacional | No domínio da TPC, coordenação persistente é mediada por representações operacionais |
| TPC-L002 | LAW-002 Persistência Representacional | Representações que mantêm integridade funcional **podem** sustentar coordenação persistente quando agentes, tarefa e ambiente permanecem compatíveis |
| TPC-L003 | LAW-003 Deformação Representacional | As representações se deformam por mecanismos que incluem perda, atraso, substituição, ambiguidade e fragmentação (taxonomia provisória) |
| TPC-L004 | LAW-004 Resiliência Representacional | A capacidade coordenadora de representações **pode** ser restaurada por mecanismos que preservam ou reconstroem seu estado e suas relações operacionais |

## 5. Proposições e consequências congeladas (P1–P6, T1–T4)

| ID baseline | Conteúdo | Derivado de |
|-------------|----------|-------------|
| TPC-P005 (P1) | Degradação de EO deve reduzir K_R em condições especificadas; magnitude e forma são empíricas | A2, A3 |
| TPC-P006 (P2) | Estados operacionais idênticos não garantem coordenação idêntica | A3, A4 |
| TPC-P007 (P3) | O efeito isolado de persistência requer controle dos demais atributos | A2, A3 |
| TPC-P008 (P4) | Limiar em D(S,t) é modelo concorrente testável para ECO, não consequência necessária | A4, A5 |
| TPC-P009 (P5) | Restaurar EO deve elevar K_R; redução de ECO é hipótese adicional | A3, A4, A5 |
| TPC-P010 (P6) | Ambiguidade pode elevar divergência interpretativa; efeito depende dos mecanismos de interpretação | A3, A4 |
| TPC-P011 (T2) | Persistência alta isoladamente não implica degradação zero nem ausência de ECO | — |
| TPC-P012 (T4) | Monotonicidade de D(t) exige hipótese adicional; recuperação é permitida | — |

## 6. Hipóteses congeladas (HYP-001 a HYP-003)

| ID baseline | Hipótese | Enunciado congelado |
|-------------|----------|---------------------|
| TPC-H001 | HYP-001 Consequência Fundamental | "No domínio da TPC, falhas internas de coordenação tendem a ser precedidas por perda não corrigida de atributos ou da capacidade coordenadora das representações relevantes" — versão operacional HYP-001-U ("toda falha observável na janela de detecção foi precedida por deformação não corrigida, dentro dos mecanismos de detecção declarados") é DRAFT_EXPERIMENTAL |
| TPC-H002 | HYP-002 Pesquisa de Campo | Intervenções OPERA que preservem atributos representacionais produzirão diferenças mensuráveis em capacidade coordenadora, ECOs e valor vs. controle |
| TPC-H003 | HYP-003 Inércia Representacional | Quanto maior a capacidade coordenadora observada de uma representação, maior pode ser sua naturalização e menor a detecção de deformações silenciosas |

## 7. Métricas congeladas (MET-001 a MET-005)

| ID baseline | Métrica | Congelado |
|-------------|---------|-----------|
| TPC-M001 | MET-001 ECO | Unidade de observação de falha coordenacional |
| TPC-M002 | MET-002 ICO | ICO = I × R × P; versão analítica ICO = I × R × P^1.5; escalas: I 1–5, R contagem, P dias |
| TPC-M003 | MET-003 IFX | IFX = Sensibilidade + Precisão + Velocidade + Aprendizado (0–4 ou 0–10, sem regra de normalização) |
| TPC-M004 | MET-004 Capital Preservado | CP = EPI − Corrosão Acumulada (EPI = cenário ideal) |
| TPC-M005 | MET-005 Slektip | Representação persistente, acionável, rastreável, evolutiva para transferência de contexto entre ciclos |

## 8. Formalização congelada

| ID baseline | Elemento |
|-------------|----------|
| TPC-F001 | EO(S,t) = (P, F, U, C, R, X) — vetor de 6 atributos |
| TPC-F002 | P(t) = e^{−λ_P·t} (modelo candidato); F = 1 − ‖S(t)−O(t)‖/‖O(t)‖; U(t) = 1/(1+τ(t−t₀)); C = 1 − (1/n)Σ‖Sᵢ−Sⱼ‖; R = metadados completos/total exigido; X = 1 − erros de interpretação/consultas |
| TPC-F003 | B(S,t) = −Σpᵢlog pᵢ + γ·custo médio (entropia interpretativa candidata) |
| TPC-F004 | D(S,t) = Σᵢ αᵢ·(1 − atributoᵢ(t)), pesos αᵢ(domínio), modelo aditivo sujeito a comparação com alternativas |
| TPC-F005 | Pr(E=1) = q(D(S,t), A, T, Z); regra determinística E=1 se D>θ é apenas modelo concorrente |
| TPC-F006 | K_R(S,t;A,T,Z) = g(EO, A, T, Z) — g NÃO definida nem validada; K_C = h(K_R, I, T, Z) — decomposição causal candidata |

## 9. Falseadores congelados (critérios C1–C3 das duas versões)

| ID baseline | Enunciado | Fonte |
|-------------|-----------|-------|
| TPC-C015 | Coordenação persistente demonstrada sem qualquer representação persistente (incluindo regras locais codificadas) | TPC.md §6; GLOSSARIO § "Critérios de Falseabilidade" |
| TPC-C016 | Estado/capacidade representacional não acrescenta explicação ou previsão para falhas internas após controles adequados | TPC.md §6 |
| TPC-C017 | Intervenções representacionais não alteram coordenação nos domínios e condições em que a teoria prevê efeito | TPC.md §6 |
| TPC-C018 | Falha de coordenação não precedida por deformação representacional (versão anterior, mais forte: DOCUMENTO_CANONICO.md C2) | DOCUMENTO_CANONICO.md |
| TPC-C019 | Restaurar a representação não restaura a coordenação (versão anterior: DOCUMENTO_CANONICO.md C3) | DOCUMENTO_CANONICO.md |

## 10. Notas de congelamento (pontos já frágeis antes do combate)

1. **Dualidade de falseadores (TPC-C015 vs TPC-C018/C019):** a formulação v0.8 de TPC.md §6 é existencial e condicionada ("depois de controles adequados", "nos domínios e condições em que a teoria prevê efeito"), enquanto DOCUMENTO_CANONICO.md mantém C2/C3 como enunciados categóricos. Congelam-se ambas como versões documentais distintas; os adversários devem atacar a versão mais forte que o autor declarar.
2. **g e h indefinidas (TPC-F006):** K_R e K_C não possuem definição operacional fechada — toda proposição que depende delas carrega risco de não-falsificabilidade por indefinição.
3. **Taxonomia MET ambígua:** MET-003/MET-005 misturam mecanismo, capacidade e métrica (Achado A-04 da auditoria interna v0.2.4) — os adversários "institucionais" e de "reprodutibilidade" explorarão isso.
4. **HYP-002 tem viés de medição conhecido:** piloto com coleta automática via Copiloto vs. controle com checklist manual (Achado A-03) — adversários de metodologia exploram.
5. **Zero evidência empírica acumulada:** HYP-002 não iniciada; casos reais (CASOS_REAIS.md) são 2 exemplos retrotivos de análise pós-hoc, sem baseline prospectivo.
