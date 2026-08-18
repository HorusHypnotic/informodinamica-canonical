# TPC-BREAKER-AUDIT — Auditoria dos golpes do TPC BREAKER

**Data:** 18/08/2026 · **Camada:** B (auditoria posterior ao Breaker) · **Fontes:** rounds `reconstruction/R00..R16`, leaderboard, doppelgänger, autópsia, baseline congelado (TPC-BASELINE.md), canônico v0.8 (commit aad9af9), missão RECONSTRUCTION V1.

**Princípio (Regra 0 da missão):** nem o Breaker nem esta auditoria têm autoridade por aparecimento. Cada golpe é reclassificado por evidência + lógica + metodologia + proveniência.

## 1. Classificação geral dos golpes do Breaker

| Golpe | Veredito da auditoria | Justificação |
|-------|----------------------|--------------|
| R16-I-1 Imunização adaptativa | **CONFIRMADO** (severidade: MÉDIA-ALTA) | O registro documental existe (A6/A7 rebaixados; HYP-001 reformulada; A1/A2 viraram modelo concorrente). A auditoria posterior obriga a discriminar correção legítima de imunização — ver §3. |
| R16-I-2 Válvula UNOBSERVED_PRECURSOR | **CONFIRMADO E AMPLIADO** | O risco de "buraco negro classificatório" é real e a auditoria posterior acrescenta: critérios pré-registrados independentes são obrigatórios (seção 14 da missão). |
| R16-I-3 Exclusão ad hoc de sabotagem | **CONFIRMADO** | Nenhuma defesa adicional encontrada; a exclusão remove exatamente o caso que a taxonomia nomeia. |
| R03-DS-2 Contraexemplo Paxos/Raft | **REDUZIDO / RECLASSIFICADO** | Ver §2.1 — o baseline permite "agentes OU MECANISMOS" como intérpretes; o golpe atacou uma versão mais fraca da definição do que o baseline congelado. |
| R12-SD-2 Não-monotonicidade de D(S,t) | **CONFIRMADO COM ESCOPO CORRIGIDO** | A demonstração usa pesos iguais; o baseline já declarava αᵢ(domínio). O golpe falsifica uma parametrização, não a família. Mas: validade dimensional, double counting e dependência entre dimensões permanecem como objeções independentes. |
| R09-NC-1 Hutchins precede e cobre | **CONFIRMADO (precedência + sobreposição), REDUZIDO (redundância integral)** | Ver §2.4. |
| R07-EV-1 / R08-MF-1 Coordenação natural sem representação | **VALIDADE LIMITADA PELO DOMÍNIO DECLARADO** | A TPC v0.8 declarou explicitamente primariedade "analítica dentro do domínio" e exclusão de sistemas instintivos; o golpe D4 pressupõe pretensão universal que a versão vigente não afirma. O golpe é um ataque bem-sucedido à TPC v0.7/histórica (Teoria da Persistência da Coordenação), não à v0.8. **REBAIXADO de D4 para D2 no baseline vigente.** |
| R16 (D5 implícito no subtotal: "53") | **REQUANTIFICADO** | Subtotal de 53 mantém-se como soma; o conteúdo muda de "imunização" para análise discriminada — ver §3. |
| Doppelgänger 81–99% / "<5% resíduo" | **CARDINAL INVALIDADO** | Ver §2.3 — nenhum fundamento quantitativo existe; substituir por classificação ordinal. |
| "TPC sobrevive se e somente se HYP-001-U" | **INVALIDADO** | Ver §2.5 — não há demonstração lógica de condição necessária-e-suficiente. |
| "N≥20 obras" e "p<0.05" (autópsia §7) | **INVALIDADO COMO REQUISITO CIENTÍFICO** | N inventado sem cálculo de poder; p como selo de sobrevivência. Ver fase 3. |
| R01-SH2 B(S,t) adimensional | **CONFIRMADO** (independente) | Objeção dimensional de validade, não depende de pesos. |
| R01-SH3 g/h indefinidas | **CONFIRMADO** | Continua o problema operacional central. |
| R02-CT-1 Reconstrução 1:1 por controle | **CONFIRMADO PARCIALMENTE** | O mapeamento é válido, mas a TPC-C001 exige "interpretação"; a reconstrução de controle cobre o núcleo aplicado, não o componente interpretativo. |
| R00-AZ-1/2 Null model | **CONFIRMADO** | Sem evidência nova em contrário. |
| R14-RL-1 Tempo global idealizado | **CONFIRMADO (menor)** | O efeito é desprezível no domínio; registrado como idealização não declarada. |
| R15-CS-2 Colapso das 4 noções | **CONFIRMADO** | Lacuna conceitual real (persistência morta). |
| R16-I-4 (MET ambíguo), I-5 (EPI) | **CONFIRMADO** | Achados A-04/M-01/M-02 da auditoria interna do próprio autor; corroborados independentemente. |
| R10-IN-2 Persistência sem representações explícitas (normas tácitas) | **CONFIRMADO como ponto de tensão** | Força escolha entre TPC-C015 e a definição IDR-0002. |

## 2. Reavaliações obrigatórias (seção 5 da missão)

### 2.1 Paxos/Raft — RECLASSIFICADO

O golpe DS-2 partiu de "sem nenhum agente humano interpretando nenhuma representação operacional". O baseline congelado (TPC-BASELINE.md, TPC-C001/TPC-C002) permite expressamente que representações sejam interpretadas por **agentes ou mecanismos**. Verificação sistemática dos quatro candidatos contra os 4 critérios de IDR-0002:

| Candidato | Critério 1: estado identificável | Critério 2: relação de referência | Critério 3: interpretabilidade | Critério 4: continuidade potencial |
|-----------|----------------------------------|-----------------------------------|--------------------------------|-------------------------------------|
| Log replicado | Sim | Não — não referencia objeto/condição/regra externa; é o próprio dado | Parcial (por mecanismos) | Sim |
| Mensagem quorum | Sim | Não | Parcial | Não (efêmera) |
| Protocolo Paxos/Raft | Sim (código) | **Sim** — especifica condições de progresso/segurança | Sim (por mecanismos) | Sim (persiste entre épocas) |
| Regras de transição de estado | Sim | Sim (condições → ações) | Sim | Sim |

**Conclusão:** o protocolo e suas regras de transição **satisfazem** a definição congelada de representação operacional (interpretadas por mecanismos). Logo o caso é: coordenação resiliente **apesar de** degradação local de representação — sustentada por redundância, quorum e replicação. NÃO é coordenação sem representação. Paxos/Raft é melhor usado como **caso limite de teste** para: (a) redundância/quorum como mecanismos LAW-004, (b) o limite inferior da dependência de representação (o sistema tolera perder 1 de 3 representações — quantos ECOs a TPC tolera?), (c) contraste de custo de manutenção (replicação automática vs. fliflexação manual em canteiros).

**Veredito: ATACADO (reduzido). O golpe não é falsificador de LAW-001 no baseline vigente. O bônus +20 de "contraexemplo reproduzível" é retirado quanto ao rótulo de falsificador, mas mantido quanto à utilidade do caso como teste estrutural — o caso permanece reproduzível e informativo.** Dano revisado do round R03: de 39 para ~27 (DS-1 FLP/CAP mantidos em D3, DS-2 rebaixado de D3 para D1, DS-3 mantido).

### 2.2 D(S,t) — ESCOPO CORRIGIDO

A demonstração de não-monotonicidade (script `contraexemplo_montonicidade.py`) usa αᵢ=1/6. O baseline já continha "αᵢ=αᵢ(domínio)" e T4 admitindo não-monotonicidade. Discriminação correta:

1. **Falsificação da família D?** Não. A família inclui pesos dependentes de tarefa; o contraexemplo falsifica uma parametrização específica não calibrada.
2. **O que resta de dano?** Cinco objeções independentes permanecem: (a) validade dimensional — D soma atributos sem unidade, e nenhum peso α pode consertar isso sem definir unidades; (b) double counting — P, U e R são causalmente encadeados (um documento antigo perde fidelidade E atualidade E rastreabilidade por construção), então a soma pondera o mesmo evento múltiplas vezes; (c) dependência entre dimensões — atributos não são independentes; (d) ausência de calibração — nunca medido; (e) uso de D como índice único de risco sem justificação. As objeções (b)–(e) não dependem dos pesos.
3. **Veredito:** D(S,t) como instrumento de predição = **INDETERMINADO com viés severo de não-operacionalidade**; a família D como notação = inócua. Golpe SD-2 mantido como D2 (não D3) contra a versão "D como índice de risco de ECO"; objeções dimensionais mantidas em D2 independentes.

### 2.3 Doppelgänger — CARDINAL INVALIDADO

O coverage 81–99% foi produzido por julgamento ordinal (ALTA/MÉDIA/BAIXA por linha) convertido retroativamente em faixa percentual. Não há função de agregação declarada, nem pesos por proposição, nem erro de classificação. Além disso, "<5% de resíduo" não é matematicamente derivável de nenhuma linha.

**Correção:** remover 81–99% e "<5%". Substituir pela classificação que a evidência sustenta:

> **SOBREPOSIÇÃO CONCEITUAL SUBSTANCIAL** no núcleo explanandum (mediação representacional, deformação, persistência, restauração — cada um possui contraparte estabelecida em cognição distribuída, controle, redes, teoria organizacional). **Redundância integral do núcleo: NÃO demonstrada.** O Doppelgänger não reconstruiu (i) a dependência empírica medida entre EO prospectivo e ECOs futuros, nem (ii) o pacote integrado aplicado. Esses dois itens são o resíduo — que é um resíduo **empírico** (depende de experimento), não **conceitual** (não foi deduzido por reconstrução).

Implicação: a conclusão "risco severo de redundância" permanece como **julgamento qualitativo defensável**, mas a precisão cardinal era pseudoquantificação.

### 2.4 Hutchins — DISCRIMINADO

A cadeia conceitual do golpe original confundiu cinco relações distintas:

| Relação | Definição | Status TPC × Hutchins |
|---------|-----------|------------------------|
| Precedência | Hutchins publicou antes (1995) | **Demonstrada** — Hutchins precede a TPC em uma década |
| Sobreposição | Mesmos fenômenos de interesse (coordenação por artefatos distribuídos que degradam) | **Demonstrada** — ponte de navio × canteiro |
| Reconstrução | TPC dedutível de Hutchins + teorias adjacentes | **Parcial** — o explanandum é reconstruível; o programa de medida (EO, ECO, protocolo) não é deduzível, é projetual |
| Equivalência | TPC e Distributed Cognition afirmam o mesmo | **Não demonstrada** — DiffCog não define EO, deformação tipológica, ECO nem métricas análogas |
| Redundância | TPC nada acrescenta empiricamente | **Indeterminada** — exige comparação empírica de modelos, não análise conceitual |

**Veredito:** o ataque real (precedência + sobreposição + ausência de mecanismo conceitualmente novo) permanece **CONFIRMADO e é o melhor golpe conceitual do campeonato**. A inferência de "redundância integral" foi além da evidência — o bônus +15 de "demonstração de redundância" é rebaixado para "demonstração de sobreposição substancial" (mantém-se crédito, com rótulo corrigido).

**Pergunta decisiva da missão (seção 5.4):** «existe alguma consequência empiricamente discriminante da TPC que não decorra de Hutchins + teorias existentes?» Resposta atual: **sim, uma — a previsão prospectiva de ECOs por EO medido antes**. Mas ela ainda não existe como resultado; é a aposta HYP-001-U/TPC-P. Se falhar, a redundância integral passa a ser verdadeira.

### 2.5 "Se e somente se HYP-001-U" — INVALIDADO

Nenhuma demonstração lógica de que HYP-001-U é condição necessária e suficiente para a sobrevivência da TPC existe. A família de sobrevivência é decomposta em dimensões independentes (ver TPC-SURVIVOR-MAP): fenômeno, predição, incremento, causalidade, transportabilidade. HYP-001-U cobre apenas TPC-F (precedência/fenômeno) e parte de TPC-P; nada garante que TPC-I, TPC-C ou TPC-T dependam dela. A formulação foi retirada.

### 2.6 Imunização adaptativa — CRITÉRIOS EXPLÍCITOS (seção 5.5)

Critérios para distinguir imunização ad hoc de refinamento legítimo:

| Critério | Imunização ad hoc | Refinamento legítimo |
|----------|-------------------|----------------------|
| Surpreende/segue ameaça | Sim, tipicamente após crítica | Pode antecipar ameaças |
| Reduz falsificabilidade | Sim | Não — pode relocalizar o teste |
| Cria novo risco empírico | Não | Sim — prevê algo novo e testável |
| Justificativa independente | Ausente | Presente (evidência, teoria) |

Aplicação às mudanças históricas documentadas:

| Mudança | Critério 1 | Critério 2 | Critério 3 | Critério 4 | Veredito |
|---------|-----------|-----------|-----------|-----------|----------|
| A6/A7 de axioma para hipótese de modelo | Segue (auditoria interna A-02) | Reduz (determinismo → modelo concorrente) | Não | Parcial (plausibilidade geral) | **SUSPEITA — imunização provável** |
| HYP-001 "elevam o risco" → "tendem a ser precedidas" | Segue | Reduz (probabilidade → tendência temporal) | Sim (HYP-001-U operacionalizou) | Sim (prática de falhas) | **HÍBRIDA — enfraquecimento com operacionalização real; imunização parcial** |
| A1/A2 limiar determinístico → "modelo concorrente" | Segue | Reduz | Sim (T2/T4 declaram testes) | Parcial | **HÍBRIDA** |
| SHANNON_FORMALIZATION_PENDING (suspensão do aparato Shannon) | Antecipa/segue simultaneamente | Reduz formalismo | Não | Sim (reconhecimento honesto de indefinição) | **LEGÍTIMA** |
| Exclusão de "fatores externos/violência/sabotagem" do domínio | Segue | Reduz (remove caso-chave) | Não | Ausente | **SUSPEITA — imunização provável** |
| Domínio v0.8 "só sistemas com representação verificável" | Segue crítica histórica | Reduz no domínio | Sim (restrição empírica) | Sim (coerência com IDR-0002) | **LEGÍTIMA** |

**Resultado:** o padrão existe, mas não é uniforme. Dois casos genuinamente suspeitos (A6/A7; exclusão de sabotagem) bastam para manter o golpe R16-I como o maior da auditoria, porém com nuance: parte do histórico é refinamento falibilista legítimo.

## 3. Golpes novos descobertos pela auditoria (que o Breaker não explorou)

| ID | Golpe | Alvo | Severidade |
|----|-------|------|-----------|
| AUD-01 | **Leakage de desfecho em X:** X = 1 − erros de interpretação/consultas usa o próprio ECO (ou proxy imediato) como preditor de ECO — autocorrelação garantida | TPC-F002, HYP-001-U | **D3 — structural** (um atributo inteiro do instrumento é outcome-derived) |
| AUD-02 | **Validade de construto EO não estabelecida:** A2 (exatamente 6 dimensões) tratado como axioma sem análise fatorial; P/U, F/C empiricamente indistinguíveis; R como infraestrutura, não dimensão; X como propriedade da interação, não do artefato | TPC-A002, TPC-F001 | D3 |
| AUD-03 | **Limiar de 20% arbitrário:** nenhuma justificativa teórica/estatística/empírica para o critério de refutação | Protocolo HYP-001-U | D2 (danifica a credibilidade do critério de refutação, não a hipótese) |
| AUD-04 | **Confounding intervenção/instrumentação em HYP-002:** piloto automatizado (Copiloto) vs. controle manual mistura efeito da intervenção com efeito do instrumento de medição | HYP-002 | D3 (o desenho registrado não pode inferir causalidade) |
| AUD-05 | **Pseudorreplicação em "N≥20 obras":** ECOs aninhados em obras, obras em empresas; unidade estatística não justificada | Autópsia §7 | Golpe ao desenho proposto pelo próprio Breaker |
| AUD-06 | **ECO como outcome heterogêneo não classificado:** ocorrência/severidade/duração/recorrência misturadas num único "P(ECO)" | ECO/MET-001 | D2 |
| AUD-07 | **Risco de common-method bias:** mesmo avaliador classifica ECO conhecendo EO | HYP-001-U operacional | D2 (se não cegado, todo resultado favorável é suspeito) |
| AUD-08 | **Baselines insuficientes:** a escada B0–B6 da missão mostra que o Breaker propôs competir só contra RPN+rotinas; o teste decisivo é B6 (mesmos dados brutos, sem EO) | MST-2 | D2 |

## 4. Saldo quantitativo revisado do Breaker

| Item | Breaker | Pós-auditoria |
|------|---------|----------------|
| Adversário Zero | 8 | 8 |
| Shannon | 7 | 7 |
| Controle | 20 | 17 (CT-1 mantido; CT-3 absorvido pela reclassificação R02) |
| Sistemas Distribuídos | 39 | **27** (DS-2 reclassificado; bônus de falsificador retirado) |
| Redes | 7 | 7 |
| Bayes | 7 | 7 |
| Game Theory | 12 | 12 |
| Evolução | 24 | **16** (EV-1 de D4→D2 no baseline v0.8; D4 mantido para a TPC histórica v0.7) |
| Morfogênese/Colônias/Ecologia | 21 | **13** (MF-1 de D4→D2 pelo mesmo motivo) |
| Neuro/Cognição | 27 | **22** (bônus +15 → +10: sobreposição demonstrada, não redundância integral) |
| Instituições | 12 | 12 |
| Termodinâmica | 12 | 12 |
| Sistemas Dinâmicos/Caos | 22 | 19 (SD-2 de D3→D2) |
| MAS/Organizacional | 12 | 12 |
| Quântica/Relatividade | 4 | 4 |
| Cosmologia/Buracos Negros | 4 | 4 |
| Multiverso (boss) | 4 | 4 |
| A própria TPC (R16) | 53 | **45** (I-1 rebaixado de D3 para dois D3 parciais por discriminação legítimo/ad hoc; sem mudança nos demais) |
| **Total** | **326** | **≈ 235** |

**Interpretação do saldo:** a auditoria não salva a TPC — retira ~91 pontos majoritariamente de superestimação pontual (Paxos, D(S,t) escopo, domínios naturais). O núcleo do veredito do Breaker permanece: **sobreposição conceitual substancial com teorias existentes, núcleo empírico não testado, programa de pesquisa como único status defensável**. O Breaker exagerou em cardinalidade (coverage), em um rótulo (falsificador Paxos), em uma formulação ("se e somente se") e em requisitos estatísticos inventados (N≥20, p como selo).
