# CHECKPOINT-TPC-RECONSTRUCTION-GATE0-2026-08-18 — Parada de parada: estado completo para retomada

**Data do checkpoint:** 18/08/2026 · **Branch:** `reconstruction/tpc-v0.9` (CANDIDATE) · **HEAD:** `20db7c8` · **Working tree:** limpa · **Main:** `aad9af9` (INTOCADA) · **FIELD=BLOCKED** — nenhum dado de campo coletado em nenhuma missão.

Este documento é o ponto de retomada para qualquer sessão futura. Tudo o que é necessário para continuar está aqui: genealogia, inventário do que morreu e sobreviveu, patches aplicados, estado dos gates, pré-registro fixado, decisão pendente e comandos exatos.

## 1. Genealogia (cadeia de autoridade)

| SHA | Evento | Ramo | Canonizado? |
|-----|--------|------|-------------|
| `aad9af9` | TPC v0.8 canônica ("Teoria dos Processos Coordenativos", DEC-CONC-001) | `main` | ✅ — este é o canônico |
| `fd1accf` | TPC RECONSTRUCTION V1: consolidação do Breaker (326 → ≈235 pts revisados) + auditoria posterior; 8 vulnerabilidades novas; TPC v0.9 candidate | `reconstruction/tpc-v0.9` | ❌ candidate |
| — | GATE 0 RED TEAM: régua atacada antes do campo; veredito PASS_WITH_REVISIONS; correção formal V1 (exclusividade UNOBSERVED/REFUTATION; força externa sem incompatibilidade ≠ ECOA); 22 sintéticos reexecutados (2 mudanças: #8 e #22) | `redteam/gate0-instruments` | ❌ adversarial work |
| — | GATE 0 FINAL HYGIENE: 6 STALE_REFERENCE corrigidas, 10 invariantes revalidados; pacote de decisão dos 7 patches | `redteam/gate0-instruments` | ❌ adversarial work |
| `20db7c8` | Decisão humana **ACCEPT ALL 7 PATCHES** executada: patches aplicados nos instrumentos + pré-registro P0 produzido. **PARADA ANTES DO CAMPO** | `reconstruction/tpc-v0.9` | ❌ candidate — G0 aberto, campo bloqueado |

Linha de autoridade: `aad9af9` → `fd1accf` → (Gate 0 red team + hygiene) → **`20db7c8`**. Tudo fora de `reconstruction/` e `redteam/` no repositório é o canônico v0.8.

## 2. O que morreu (não sobrevive à TPC v0.9 candidate)

| Item | Como morreu | Evidência |
|------|-------------|-----------|
| Status de TEORIA | Classificação final: EMPRICAL HYPOTHESIS FAMILY + INSTRUMENT DEVELOPMENT PROGRAM — não teoria | TPC-RECONSTRUCTION-EXECUTIVE |
| Axioma A2 (vetor EO de 6 atributos como fato) | Rebaixado a H-EO, hipótese taxonômica candidata | AUD-02; GATES §1 |
| Atributo X do vetor preditivo | X₁ → covariável de uso; X₂ → subclasse de ECOB; **removido do vetor por Patch 2** | leakage audit; CONSTRUCT-VALIDITY |
| Limiar de 20% de deformação | Arbitrário (AUD-03); substituído pelo limiar de cobertura pré-registrado (≥80%) | ECP-V0 pós-patches |
| N≥20 obras / p<0.05 como selo | Pseudorreplicação (AUD-05); tamanho por cálculo de poder | STATISTICAL-ARCHITECTURE §1 |
| R→I→A→ECO como cadeia causal do fenômeno | Rebaixada (AUD-06): loops, feedback e ação sem deformação falsificam; **reclassificada como protocolo de medição por Patch 7** | PATCHES §7 |
| REFUTATION como categoria | Removida na correção formal V1: sobreposição com UNOBSERVED_PRECURSOR; célula de derrota agora é a regra 6 da partição (ECOA-POSITIVE + UNOBSERVED descartado + ECOB ≠ representacional) | GATE0-CLASSIFICATION-RULES-V1 |
| ECO com critério de "origem interna" | Circular (imunização construída no outcome); **Patch 1**: ECOA neutra + ECOB separada | ECO circularity audit |
| Exclusão de sabotagem do domínio | Imunização suspeita; MUT-009: desinformação = ECOA-POSITIVE com marca deliberada | R16; ECP-V0 §5 |
| "Se e somente se HYP-001-U" | Retirado pelo Breaker auditado; associações não são equivalência | Breaker audit |
| HYP-003 (inércia representacional) | REDUNDÂNCIA DEMONSTRADA (Hollnagel; Star/Ruhleder) | Breaker D2 + auditoria |
| D(S,t) como índice único, B(S,t), g/h como funções, K_R/K_C, ICO como métrica nova, Slektip/Capital Preservado/Fliflexação como conceitos, coverage cardinal do Doppelgänger | Removidos na consolidação (lista completa em TPC-V0.9-CANDIDATE §2) | Candidate |

## 3. O que sobreviveu (os três tijolos + instrumentação pós-patches)

| Item | Estado | Condição de vida |
|------|--------|------------------|
| HYP-001-U (associação prospectiva deformação→ECO) | Aposta empírica central — **única aposta original** | Teste G4/G5; abandono se OR≈1 em coorte |
| TPC-I (incremento sobre baselines B0–B6) | Hipótese de programa | Decisivo: B6; abandono se B6 empatar |
| TPC-P/I/C (mecanismo, transportabilidade, causalidade) | Hipóteses dependentes (G6–G8) | Cada uma com critério de abandono próprio |
| ECOA como outcome (5 critérios, causalmente neutro) | Instrumento pronto (Patch 1) | Pilotar G1+G2 |
| ECOB (atribuição separada, nunca preditiva) | Instrumento pronto | Taxa de indeterminado reportada |
| Partição de classificação V1 (6 regras, ordem lexical) | Instrumento pronto (Patch 5 corrigido) | Célula de derrota somável |
| Vetor preditivo (P, U, F, C + R moderador) + X₁ | Hipótese de dimensionalidade (H-EO, Patch 2) | Gate 1: comparação fatorial |
| Episódio coordenacional como unidade + amostragem universal | Desenho pronto (Patches 3 e 4) | Gate 3: teste de adequação da unidade |
| Cegamento em dois mundos + BLINDING=IMPOSSIBLE | Protocolo pronto (Patch 6) | Gate 2 |
| Cadeia como protocolo de medição (Patch 7) | Modelo aplicado | Covariáveis de processo registram loops |

## 4. Os 7 patches (aplicados em 20db7c8)

| # | Patch | Documento | Status |
|---|-------|-----------|--------|
| 1 | ECOA/ECOB (5 critérios neutros + atribuição separada; força externa sem incompatibilidade = ECOA-NEGATIVE) | ECO-CLASSIFICATION-PROTOCOL-V0.md §1, §1b, §5 | ✅ aplicado |
| 2 | X₁ covariável de uso / X₂ → ECOB; vetor = (P,U,F,C+R mod)+X₁ | TPC-CONSTRUCT-VALIDITY.md §2.6 | ✅ aplicado |
| 3 | Pré-registro das escolhas de julgamento (referente, inventário, emparelhamento, rubricas) | P0-PRE-REGISTRY.md §2 | ✅ fixado |
| 4 | Episódio pré-outcome + amostragem universal | TPC-STATISTICAL-ARCHITECTURE-V0.md §3; P0-PRE-REGISTRY.md §3 | ✅ aplicado |
| 5 | Partição lexical V1 (REFUTATION extinta; célula de derrota somável; limiar ≥80%) | ECO-CLASSIFICATION-PROTOCOL-V0.md §7; P0-PRE-REGISTRY.md §6 | ✅ aplicado |
| 6 | Dois mundos de cegamento + DISPUTED público + BLINDING=IMPOSSIBLE | ECO-CLASSIFICATION-PROTOCOL-V0.md §4; P0-PRE-REGISTRY.md §7 | ✅ aplicado |
| 7 | Cadeia R→I→A→ECO como protocolo de medição (snapshot congelado, loops = covariáveis) | TPC-CONSTRUCT-VALIDITY.md §4 | ✅ aplicado |

Baseline congelado `TPC-BASELINE.md`: **inalterado** (documenta a história; patches alteram instrumentos, não proposições congeladas).

## 5. Estado dos gates

| Gate | Estado | O que falta |
|------|--------|-------------|
| G0 — COERÊNCIA | **ABERTO** (PASS_WITH_REVISIONS + patches aplicados + hygiene) | — |
| G1 — INSTRUMENTO EO/R | Bloqueado | Piloto de instrumentação (dados) |
| G2 — INSTRUMENTO ECO | Bloqueado | Piloto de instrumentação (dados) |
| G3 — ARQUITETURA ESTATÍSTICA | Bloqueado | Dados do piloto (ICC, incidência) |
| G4 — PREDIÇÃO PROSPECTIVA | Bloqueado | Dimensionamento por poder |
| G5 — INCREMENTO | Bloqueado | G3 + dados suficientes |
| G6 — CAUSALIDADE | Bloqueado | Régua equivalente HYP-002 |
| G7 — REPLICAÇÃO | Não existe antes de G4–G6 | — |
| G8 — TRANSPORTABILIDADE | Não existe antes de G4–G6 | — |

Ultimate Breaker (estatística, desenho experimental, validade externa): **preparado, não executado** — execução condicionada a G0–G2 entregarem instrumentos reais.

## 6. Pré-registro (P0-PRE-REGISTRY.md)

Fixado em 20db7c8. Conteúdo: escolhas de julgamento (§2), desenho do episódio (§3), snapshot congelado (§4), vetor/outcome (§5), partição V1 (§6), parâmetros de medição — incluindo limiar de cobertura ≥80% (§7), métricas primárias (§8), condições de abandono herdadas e **intocáveis na coleta** (§9), limites explícitos (§10).

## 7. FIELD=BLOCKED — decisão humana pendente

Nenhum dado de campo foi coletado em nenhuma missão (veredito, hygiene, patches, pré-registro — tudo é trabalho de instrumento e protocolo). O pré-registro §11 exige três condições para o campo iniciar: **(i) decisão humana explícita, (ii) fixação assinada das seções 2–7, (iii) piloto de confiabilidade interno (≥20 episódios em duplicata, kappa ≥0.7)**. Qualquer coleta sem as três condições é **coleta não autorizada**.

**HUMAN DECISION REQUIRED** — a próxima ação legítima é exatamente uma destas:
1. `ACCEPT PRE-REGISTRY + AUTHORIZE FIELD` → missão de execução do piloto G1+G2 (confiabilidade interna primeiro);
2. `REVIEW PREREGISTRY` → ajustes às seções 2–9 antes de fixar;
3. `REJECT / RETURN` → candidate permanece como está; nenhum campo.

## 8. Retomada amanhã — estado e comandos

**Para retomar o trabalho exatamente neste ponto:**

```bash
# 1. Clonar/abrir e ir à branch candidate
git clone <repo>            # (ou git pull se o clone já existe)
cd informodinamica-canonical
git fetch --all
git checkout reconstruction/tpc-v0.9   # HEAD esperado: 20db7c8
git log -1 --oneline                   # confirmar: apply: 7 Gate 0 patches approved...

# 2. Verificações de guarda (executar antes de qualquer alteração)
git rev-parse origin/main              # deve ser aad9af9
git rev-parse origin/reconstruction/tpc-v0.9  # deve ser 20db7c8
git diff HEAD origin/main --name-only | grep -v "^reconstruction/"  # deve ser vazio
git diff 20db7c8 -- reconstruction/tpc-reconstruction/TPC-BASELINE.md  # deve ser vazio

# 3. O campo continua bloqueado: NÃO iniciar coleta de dados nesta branch
#    A missão de campo só começa após a decisão humana (seção 7 deste checkpoint).

# 4. Branches de apoio (leitura, não tocar em main)
#    redteam/gate0-instruments  — Gate 0 red team + hygiene (veredito, audits, sintéticos)
#    breaker/tpc-breaker-championship — campeonato original (18 adversários, 326→235 pts)
```

**Documentos de contexto essenciais** (nesta branch): `APPLY-PATCHES-REPORT.md` (o que os patches fizeram), `P0-PRE-REGISTRY.md` (o instrumento fixado), `TPC-V0.9-CANDIDATE.md` (o que é a candidate hoje), `TPC-RESEARCH-GATES-V1.md` (gates e abandono), `ECO-CLASSIFICATION-PROTOCOL-V0.md` (o instrumento ECO pós-patches). Na branch `redteam/gate0-instruments`: `GATE0-VERDICT.md`, `GATE0-CLASSIFICATION-RULES-V1.md`, `GATE0-PATCHES.md`, `GATE0-SYNTHETIC-CASES.md`, `GATE0-FINAL-HYGIENE-REPORT.md`.

**Regras de governança que continuam valendo na retomada:** nada mergeado ao `main` sem canonização explícita; baseline congelado não se reescreve (história é preservada em TPC-BASELINE.md); patches/decisões sempre com decisão humana explícita; FIELD=BLOCKED permanece até a seção 7 deste checkpoint ser resolvida.

**Fim do checkpoint.** Retomada possível de qualquer sessão a partir de `20db7c8`.
