# TPC-RESEARCH-GATES-V1 — Gates do programa de pesquisa

**Data:** 18/08/2026 · **Regra (seção 27 da missão):** nenhum gate é declarado aprovado sem evidência. A progressão é sequencial: um gate bloqueado impede a declaração de aprovação do seguinte, mas não impede o trabalho preparatório de evidência.

## 1. Os nove gates

| Gate | Nome | O que precisa ser demonstrado | Evidência mínima de passagem |
|------|------|-------------------------------|-------------------------------|
| G0 | COERÊNCIA | Definições não circulares; distinção R/I/A/ECO; A2 rebaixado a H-EO; exclusão de sabotagem revogada ou justificada | Todos os documentos V0 revisados por red team com zero circularidade residual; núcleo provisório submetido a teste adversarial |
| G1 | INSTRUMENTO EO/R | Confiabilidade (teste-reteste, interavaliador) e validade de construto da medida de estado representacional | ICC/alpha ≥ 0.7; comparação de estruturas (1/2/3/6 fatores, hierárquica, checklist) com critério pré-registrado; leakage auditado |
| G2 | INSTRUMENTO ECO | Classificação independente e reproduzível de ECOs | Kappa ≥ 0.7 entre avaliadores cegos ao EO; taxonomia nominal validada; quase-ECOs definidos |
| G3 | ARQUITETURA ESTATÍSTICA | Unidade de análise, clustering e modelo escolhidos e justificados | Estudo piloto com ICC estimado; comparação de unidades (obra vs. episódio coordenacional); modelo M1–M4 pré-registrado |
| G4 | PREDIÇÃO PROSPECTIVA | EO em t₀ prevê ECO dentro da janela, fora da amostra de treino | Validação temporal: treino em períodos anteriores, teste no posterior; métricas: AUC, calibração (Brier), ICs |
| G5 | INCREMENTO | O modelo TPC supera a escada de baselines B0–B6 | Delta-AUC/AIC vs. B6 (mesmos dados brutos sem EO) com IC que exclui zero; sem overfitting (LOO-CV) |
| G6 | CAUSALIDADE | Intervenções representacionais alteram probabilisticamente ECOs | Quase-experimento ou experimento com instrumentação equivalente entre braços (AUD-04 resolvida); estimando causal declarado com IC |
| G7 | REPLICAÇÃO | O efeito replica em outra empresa | Replicação com protocolo idêntico; efeito na mesma direção com IC sobreposto |
| G8 | TRANSPORTABILIDADE | O mecanismo replica em outro tipo de sistema | Salto na TPC TRANSPORTABILITY LADDER (L1 → L2 → ...) com evidência nova por salto |

## 2. Estado atual de cada gate

Todos os gates estão **bloqueados** no momento desta consolidação. O que existe para destravá-los: G0 tem como entrada os documentos V0 desta reconstrução (revisão red team pendente); G1–G2 exigem estudo piloto de instrumentação (2–3 obras, medição prospectiva cega); G3 exige os dados do piloto para estimar ICC e incidência; G4–G5 exigem dimensionamento por poder (seção 5 do TPC-STATISTICAL-ARCHITECTURE-V0); G6 exige redesenho de HYP-002 (régua equivalente); G7–G8 não existem antes de G4–G6.

## 3. O experimento logicamente primeiro

Não é um teste de hipótese grande: é o **piloto de instrumentação (G1+G2)** — 2–3 obras, protocolo ECP-V0 cego, EO medido prospectivamente nas dimensões candidatas, episódios coordenacionais delimitados, sem qualquer pretensão preditiva. Saídas: confiabilidade dos instrumentos, estimativas de ICC e incidência (que dimensionam G3–G5), e a primeira base de negativos. Este é o próximo experimento logicamente necessário (pergunta 7 do critério de sucesso da missão).

## 4. Critérios de abandono por hipótese (pergunta 8)

| Hipótese | Abandonar se |
|----------|--------------|
| H-EO (taxonomia de atributos) | Estrutura fatorial 1–2 fatores explica tão bem quanto 6; ou itens não carregam em dimensões estáveis entre avaliadores |
| ECO como construto | Kappa de ocorrência < 0.4 mesmo com cegamento; classes indistinguíveis após fusões |
| HYP-001-U (associação prospectiva) | Em coorte de episódios, EO em t₀ não associa com ECO na janela (OR ≈ 1 com IC estreito) |
| Incremento (TPC-I) | Modelo B6 (dados brutos sem EO) alcança o mesmo AUC do modelo TPC com IC sobreposto |
| Causalidade (TPC-C) | Intervenções representacionais padronizadas não alteram ECOs vs. controle com instrumentação equivalente |
| Mecanismo (núcleo) | G5 falha em 2 empresas independentes com protocolos cegos |

## 5. Preparação do Ultimate Breaker (seção 28)

Após a reconstrução, o campeonato final terá três adversários, executável apenas quando G0–G2 tiverem entregado instrumentos reais: **ESTATÍSTICA** (instrumento, dimensionalidade, clustering, leakage, overfitting, calibração, baselines, replicação), **DESENHO EXPERIMENTAL** (causalidade, seleção, confounding, instrumentation bias, outcome classification, preregistration) e **VALIDADE EXTERNA** (generalização, transportabilidade, heterogeneidade, domínio). Estado de preparação: os alvos de ataque dos três já estão mapeados nos documentos V0 desta reconstrução; o campeonato será executado em missão separada, depois que existirem instrumentos e piloto dignos de ataque.
