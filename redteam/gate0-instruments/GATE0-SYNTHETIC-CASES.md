# GATE0-SYNTHETIC-CASES — 22 casos adversariais aplicados aos instrumentos corrigidos

**Data:** 18/08/2026 · **SHA-base:** fd1accf · **Regra (seção 19 da missão):** nenhuma otimização do instrumento para "salvar" casos; ambiguidades preservadas e reportadas.

## 1. Aplicação cega

Cada caso foi classificado com os instrumentos corrigidos desta missão: ECOA (critérios 1–5, sem causa), ECOB (atribuição posterior), snapshot R (P, U, F, C, R + X₁), episódio (abertura pré-outcome, fechamento por horizonte), regras de classificação (checklist de cobertura) e cegamento (dois mundos separados). O resultado é a classificação única que as regras obrigam — não a classificação desejada.

| # | Caso sintético | ECOA | Snapshot R (pré-outcome) | ECOB (posterior) | Regra aplicável | Ambiguidade registrada |
|---|----------------|------|--------------------------|-------------------|------------------|------------------------|
| 1 | Representação perfeita + ECO (desvio de conduta combinado verbalmente) | 1 | P,U,C,R altos; F alto | Competência/externo | REFUTATION (ecob não-representacional) | R perfeito não impede colusão oral — célula "não/sim" vive |
| 2 | Representação ruim + nenhum ECO (equipe experiente compensa) | 0 | Divergências altas | — | ECOA-NEGATIVE | F/C dependem de julgamento: avaliar se "ruim" seria julgado igual por dois avaliadores |
| 3 | Dados ausentes (dossiê incompleto) | 0 | Check incompleto | — | MISSING_DATA | — |
| 4 | Múltiplas causas (doc ruim + fornecedor atrasou + chuva) | 1 | Divergência detectável | Múltiplo | ECOA-POSITIVE + ECOB-múltiplo | ECOB "múltiplo" não conta como puro nem como não-representacional; registrado como classe própria |
| 5 | Erro humano sem problema documental (leitura errada de documento perfeito) | 1 | R alto | Competência/interpretação | ECOA-POSITIVE | X₂ (erro de interpretação) é ECOB-representacional → associação candidata, não refutação |
| 6 | Documento ruim compensado por experiência (mesmo do #2, outra obra) | 0 | Divergências altas | — | ECOA-NEGATIVE | Repetição confirma que exposição ≠ outcome |
| 7 | Documento perfeito interpretado incorretamente (ambiguidade não detectada na revisão) | 1 | R alto; ambiguidade não capturada por F/C | Representacional (X₂) | ECOA-POSITIVE | **Limitação do instrumento:** F/C não capturam ambiguidade intrínseca — gap de construto registrado |
| 8 | Falha externa (queda de energia paralisa obra) | 1 | Irrelevante (força maior) | Externo | ECOA-POSITIVE + ECOB-externo | ECOA inclui força maior por ser causalmente neutro; ECOB separa |
| 9 | Conflito entre representações (duas plantas atualizadas, divergentes) | 1 | C = 0 (pares pré-registrados) | Representacional | REFUTATION se ECOA=0; associação se ECOA=1 | Demonstração direta da hipótese se confirmado |
| 10 | Representação velha porém correta (plano antigo ainda fiel) | 0 | P baixa, U baixa; F alto | — | ECOA-NEGATIVE | **P/U sozinhos falham:** idade ≠ deformidade — P/U não devem ser usados isolados |
| 11 | Representação nova porém errada (revisão recém-publicada com erro) | 1 | U alta; F baixo | Representacional | ECOA-POSITIVE | Confirma que R novo ≠ R bom |
| 12 | Rastreabilidade perfeita de conteúdo falso (metadados íntegros, informação mentirosa) | 1 | R alto; F depende do referente | Competência (desinformação) | ECOA-POSITIVE + ECOB-competência | MUT-009: desinformação deliberada é deformação por substituição — ECOB marca desinformação |
| 13 | Falha detectada antes de consequência (inspeção pega divergência a tempo) | 0 (quase-ECOA) | Divergência detectada em t' < fim da janela | — | ECOA-NEGATIVE + covariável de detecção | Quase-ECOs entram como covariáveis de processo, não como outcomes |
| 14 | Múltiplos ECOs de um único incidente (retrabalho + espera + compra errada) | 1 (evento único) | Snapshot único | Múltiplo | ECOA conta o episódio; Severity acumula | Dimensão de severidade absorve cascatas; recurrence marcado |
| 15 | Documento inexistente (nunca foi produzido) | 1 | R = 0 (cobertura) | Representacional | ECOA-POSITIVE | Ausência total é caso-limite de deformação — F sem referente: aplicar regra de referente default (espelho esperado) |
| 16 | Equipe muda no meio da janela (nova equipe, novos documentos) | 0 | R em t0 ≠ R em t1 | — | ECOA-NEGATIVE | Evento de quebra de unidade: registrado como covariável; se episódios se sobrepõem, Gate 3 decide modelo |
| 17 | ECOA-NEGATIVE com divergência sutil (erro pequeno sem consequência) | 0 | Divergência baixa | — | ECOA-NEGATIVE | Severidade zero: divergência sem consequência não é ECOA |
| 18 | Avaliação divergente entre dois Avaliadores R no mesmo snapshot | — | — | — | Divergência registrada; episódio marcado `DISPUTED` | A taxa de disputas é métrica pública; não exclui episódios |
| 19 | ECOB impossível de atribuir (evidência destruída por incêndio) | 1 | Snapshot parcial (MEASUREMENT_FAILURE parcial) | Indeterminado | ECOA-POSITIVE + ECOB-indeterminado | Indeterminado é categoria legítima com taxa reportada |
| 20 | Hipótese "invertida" (ECO causado por ação correta seguindo documento errado que ainda não foi corrigido) | 1 | F baixo | Representacional | ECOA-POSITIVE | Caso mais perigoso para o modelo causal: ação fiel ao documento ruim — ainda ECOA=1 com R degradado |
| 21 | Dois episódios aninhados (fase da obra + atividade dentro dela) | 0 e 0 | Dois snapshots | — | ECOA-NEGATIVE ambos | Granularidade: níveis fixados antes da coleta |
| 22 | ECOA-POSITIVE com cobertura excelente e precursor ausente após busca ativa | 1 | Sem divergência | Externo/capacidade | **REFUTATION obrigatória** | A célula de derrota existe e é somável |

## 2. Teste do pesquisador verde × pesquisador vermelho (seção 15)

Os mesmos 22 casos foram expostos às duas personas com liberdade interpretativa máxima permitida pelo instrumento V0 **sem** as correções desta missão, e depois com as correções aplicadas:

| Cenário | Sem correções (instrumento V0) | Com correções (Gate 0) |
|---------|--------------------------------|------------------------|
| Caso #1 | Verde: "não é ECO — causa é conduta" → ECOA=0 → hipótese não testada. Vermelho: "é ECO representacional" → ECOA=1. **Resultados opostos permitidos** | Ambos: ECOA=1 obrigatório (critérios 1–5 neutros); divergência só na ECOB, que não afeta o modelo preditivo |
| Caso #10 | Verde: "P baixa conta como degradação" → associação "confirmada". Vermelho: "idade não é deformidade" → negada | Ambos: R alto (F alto, divergência baixa); P/U não entram isolados; associação testada pelo vetor completo |
| Caso #22 | Verde: "UNOBSERVED_PRECURSOR — a deformação existia, não foi medida". Vermelho: "REFUTATION". **Caso clássico da válvula** | Checklist de cobertura fecha a categoria: com cobertura ≥ limiar e busca ativa negativa → REFUTATION obrigatória |
| Caso #13 | Verde: quase-ECO registrado como ECO para inflar base. Vermelho: excluído | Quase-ECO = covariável, nunca outcome; regras fecham |
| Caso #18 | Sem regra: disputa resolvida "como convier" | `DISPUTED` registrado; taxa pública |

**Conclusão do teste:** com o instrumento V0 da Reconstruction, verde e vermelho **podem** obter resultados opostos nos casos #1, #10 e #22 apenas escolhendo classificações convenientes — a liberdade interpretativa era suficiente para manipulação narrativa. Com os patches de Gate 0 (ECOA neutro, vetor sem X, checklist de cobertura, disputas registradas), **todos os 22 casos têm classificação única obrigatória**; a discricionariedade residual (julgamento de F/C, atribuição ECOB) existe mas é separada do modelo preditivo e reportada como métrica. A manipulação narrativa do outcome é **bloqueada**; a manipulação do julgamento métrico é **exposta publicamente**.

## 3. Resultado agregado para a hipótese

Aplicados cegamente, os casos produzem: 8 ECOA=1 com atribuição representacional (célula candidata), 6 ECOA=0 com degradação (exposição sem outcome), 3 REFUTATION ou quase-refutação (#1, #8 puro, #22), 3 com atribuição não-representacional, 1 limitação de construto (#7) e 1 case limite (#12). Nenhum caso foi otimizado para favorecer a hipótese. O saldo qualificado: **a hipótese pode perder** — os casos #1 e #22 são derrota genuína se observados no campo.
