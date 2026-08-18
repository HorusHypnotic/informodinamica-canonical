# APPLY-PATCHES-REPORT — Aplicação dos 7 patches aprovados (parada antes do campo)

**Data:** 18/08/2026 · **Branch:** `reconstruction/tpc-v0.9` (CANDIDATE) · **Base:** fd1accf · **Decisão humana executada:** ACCEPT ALL 7 PATCHES — APPLY + PRE-REGISTER — NO CANONIZATION — STOP BEFORE FIELD.

## 1. O que esta missão fez

Aplicou os sete patches aceitos pelo usuário aos documentos de instrumentos da Reconstruction candidate e produziu o pré-registro da coleta piloto. **Não executou o campo (G1+G2)** — nenhum dado foi coletado. **Não canonizou nada** — main permanece em aad9af9 sem alterações. **Não alterou o baseline congelado** (TPC-BASELINE.md sem diffs): os patches alteram instrumentos e protocolo de pesquisa, não proposições congeladas. **Não executou o Ultimate Breaker** (permanece preparado, execução condicionada aos gates).

## 2. Mapa de aplicação por patch

| Patch | Documento afetado | Aplicação |
|-------|-------------------|-----------|
| 1 — ECOA/ECOB | ECO-CLASSIFICATION-PROTOCOL-V0.md §1, §1b, §5 | Critério 6 removido da classificação de ocorrência; ECOA = 5 critérios neutros; ECOB camada separada (9 categorias candidatas, taxa de indeterminado pública, nunca preditiva); força maior sem componente coordenacional = ECOA-NEGATIVE com marcador |
| 2 — X removido | TPC-CONSTRUCT-VALIDITY.md §2.6 | X₁ (logs) = covariável de uso; X₂ = subclasse de ECOB; vetor preditivo do piloto = (P, U, F, C + R moderador) + X₁ |
| 3 — Pré-registro F/C | P0-PRE-REGISTRY.md §2 | Referente por tipo de artefato, inventário e emparelhamento por tipo de episódio, rubricas-âncora — fixados antes da coleta |
| 4 — Episódio pré-outcome | TPC-STATISTICAL-ARCHITECTURE-V0.md §3; P0-PRE-REGISTRY.md §3 | Abertura por objetos observáveis em t₀; fechamento por fim natural ou horizonte; amostragem universal de todos os episódios abertos |
| 5 — Partição lexical (V1) | ECO-CLASSIFICATION-PROTOCOL-V0.md §7; P0-PRE-REGISTRY.md §6 | 6 regras em ordem lexical; REFUTATION não é categoria; célula de derrota = regra 6 com ECOB ≠ representacional; limiar de cobertura ≥ 80% pré-registrado |
| 6 — Cegamento | ECO-CLASSIFICATION-PROTOCOL-V0.md §4; P0-PRE-REGISTRY.md §7 | Dois mundos com fluxos proibidos; DISPUTED público; BLINDING=IMPOSSIBLE para equipes ≤ 2 (braço descritivo) |
| 7 — Cadeia como medição | TPC-CONSTRUCT-VALIDITY.md §4 | Snapshot R congelado e inalterável na janela; loops e feedback = covariáveis de processo; ordem de medição ≠ ontologia |

Documentos de registro atualizados (consistência, sem mudança de conteúdo substantivo): TPC-RESEARCH-GATES-V1.md (estado dos gates: G0 aberto; campo bloqueado até decisão humana), TPC-V0.9-CANDIDATE.md (tabela de componentes pós-patches + registro de aplicação).

## 3. Pré-registro (P0-PRE-REGISTRY.md)

Produzido como documento novo da candidate: escolhas de julgamento fixadas (seção 2), desenho do episódio (seção 3), snapshot congelado (seção 4), vetor e outcome (seção 5), partição V1 (seção 6), parâmetros de medição (seção 7), métricas primárias (seção 8), condições de abandono herdadas e intocáveis (seção 9) e **autorização de campo como condição final** (seção 11): decisão humana + assinatura de fixação + piloto de confiabilidade interno (kappa ≥ 0.7 em ≥ 20 episódios) — coleta iniciada sem as três condições é não autorizada.

## 4. Revalidação dos invariantes desta missão

| # | Invariante | Resultado |
|---|------------|-----------|
| 1 | main intocado (aad9af9) | ✅ sem diffs fora de `reconstruction/` |
| 2 | Baseline congelado intocado (TPC-BASELINE.md) | ✅ `git diff fd1accf` vazio |
| 3 | Nada canonizado | ✅ documentos novos/mostrados são candidate/adversarial work |
| 4 | G1+G2 não executado (nenhum dado coletado) | ✅ — PARADA ANTES DO CAMPO |
| 5 | Ultimate Breaker não executado | ✅ preparado, não executado |
| 6 | TPC v0.9 candidate = candidate | ✅ branch sem promoção |
| 7 | 7 patches aplicados por decisão explícita | ✅ todos com nota "Patch N aplicado" nos documentos |
| 8 | Pré-registro produzido antes de qualquer coleta | ✅ P0-PRE-REGISTRY.md |
| 9 | Condições de abandono preservadas | ✅ herdadas no pré-registro §9 |
| 10 | Célula de derrota preservada e somável | ✅ regra 6 da partição V1 |

## 5. Estado de decisão pendente (HUMAN DECISION REQUIRED)

O instrumento está corrigido e o pré-registro está fixado. A próxima ação legítima é **uma** delas:

1. **ACCEPT PRE-REGISTRY + AUTHORIZE FIELD** — autoriza a missão específica de execução do piloto G1+G2 (com o piloto de confiabilidade interno primeiro).
2. **REVIEW PREREGISTRY** — pedir ajustes às seções 2–9 antes de fixar (as seções só podem mudar com justificativa pública de desvio após a fixação).
3. **REJECT / RETURN** — manter a candidate inalterada; nenhum campo ocorre.

**PARADA ANTES DO CAMPO. Nenhum dado coletado nesta missão.**
