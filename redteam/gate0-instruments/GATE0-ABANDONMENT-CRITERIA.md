# GATE0-ABANDONMENT-CRITERIA — Critérios explícitos de abandono por hipótese

**Data:** 18/08/2026 · **SHA-base:** fd1accf · **Regra (seção 18):** para cada hipótese, EVIDÊNCIA FAVORÁVEL, EVIDÊNCIA CONTRÁRIA, ABANDONMENT CONDITION — se a terceira linha não puder ser preenchida, a hipótese está protegida demais.

## 1. Hipóteses sobreviventes após Gate 0

| ID | Hipótese | Evidência favorável | Evidência contrária | Abandonment condition |
|----|----------|---------------------|---------------------|----------------------|
| H-A (fenômeno) | ECOA associa-se com snapshot R degradado | OR > 1 com IC excluindo 1 em coorte prospectiva | OR ≈ 1 com IC estreito | OR ≈ 1 em 2 empresas independentes com protocolos cegos |
| H-B (incremento) | Modelo com vetor R supera B6 (mesmos dados brutos sem R) | ΔAUC/ΔAIC com IC excluindo zero | Δ indistinguível de zero | B6 empata ou supera o modelo TPC em validação temporal |
| H-C (causal) | Intervenções representacionais reduzem ECOA vs. controle instrumentado | Estimando causal com IC desfavorável ao controle | Estimando ≈ 0 ou favorável ao controle | Diferença zero replicada com instrumentação equivalente |
| H-D (instrumento R) | Vetor medível com confiabilidade ≥ limiar | ICC/kappa ≥ 0.7 por componente | Disputas e discordância altas persistentes | Nenhuma estrutura dimensional estável entre avaliadores após 2 rodadas de rubricas |
| H-E (instrumento ECO) | ECOA classificável com kappa ≥ 0.7 cego a R | Kappa alto na ocorrência | Kappa < 0.4 com cegamento mantido | Cegamento impossível de sustentar em todas as obras-alvo |
| H-F (mecanismo) | ECOB-representacional majoritária em episódios com R degradado | Taxa representacional > demais classes | Taxa representacional ≈ taxa "múltiplo"/"indeterminado" | Não é abandono: a hipótese F é secundária; apenas rebaixa a ambição causal |

Todas as três colunas estão preenchidas para todas as hipóteses — nenhuma está protegida. O abandono nunca é por um único estudo ruim (que pode ser MISSING_DATA ou MEASUREMENT_FAILURE legítimo); é por **padrão replicado com instrumentos auditados**.

## 2. Teste de trivialidade (seção 17) — resposta honesta

Removida a circularidade, a formulação residual é: «estado documental medido antes de falhas associa-se com o risco futuro dessas falhas». É verdadeira e **não trivial em um ponto específico**: o vetor R mede o estado de representações (com fidelidade a referentes e coerência entre pares), não "qualidade documental genérica" — e a não trivialidade está inteira no teste H-B (B6). Se B6 empatar, a formulação colapsa em trivialidade prática ("documentos ruins às vezes acompanham problemas"), e o abandono de H-B é exatamente o abandono da ambição original. **Não há inflação artificial de ambição: a hipótese foi rebaixada ao mínimo que os instrumentos podem sustentar, e a única parte que não colapsa em trivialidade é a que ainda não tem nenhuma evidência.**

## 3. Falsificabilidade agregada do programa

O programa inteiro pode perder de cinco formas independentes (TPC-F, -P, -I, -C, -T), cada uma com condição acima publicada. Aderência adicional: a **taxa de REFUTATION** (célula cobertura alta + busca ativa negativa + ECOA=1 não-representacional) é somável e reportada; se alta, a associação H-A enfraquece mesmo com OR > 1 — dois números públicos, não um.
