# TPC-V0.9-CANDIDATE — Nova formulação mínima candidata (NÃO CANÔNICA)

**Data:** 18/08/2026 · **Status:** candidato adversarial para o Gate 0. Este documento não altera o repositório canônico.

## 1. Núcleo provisório (seção 24 da missão — formulação submetida a quebra)

> «Em determinadas classes de sistemas sociotécnicos dependentes de artefatos representacionais, propriedades observáveis desses artefatos, medidas antes e independentemente dos desfechos, podem estar associadas ao risco futuro de falhas coordenacionais; a magnitude, estrutura, causalidade e transportabilidade dessa associação são questões empíricas.»

**Tentativas de quebra aplicadas:**

1. *"Distribuições de propriedades observáveis podem prever desfechos" é vago até dizer quais propriedades em quais sistemas.* — Resposta da formulação: "determinadas classes" e "falhas coordenacionais" limitam o escopo; a formulação não reivindica universalidade. A objeção não a trivializa, apenas aponta que o conteúdo está no programa de instrumentação (G1–G2).
2. *Isso não é teoria, é uma aposta metodológica que qualquer programa de medição de qualidade documental faria.* — **OBJEÇÃO SUSTENTADA.** A formulação se reduz a "medir estado de documentos antes para prever falhas", o que a literatura de qualidade documental e de confiabilidade já faz. A versão candidata responde distinguindo-se por dois compromissos específicos: (i) os artefatos são tratados como **representações com estado interpretável** (não como "documentos" genéricos), o que inclui o nível de interpretação (I) e a cadeia R→I→A→ECO; (ii) a taxonomia de deformação e a classificação cega de ECO são instrumentos dedicados. Se esses instrumentos não se distinguirem empiricamente de medições de qualidade documental genérica (B6), a formulação colapsa na objeção — e esse é exatamente o teste de G5.
3. *Pode ser reduzida sem perda?* — Redução candidata: «**Em sistemas sociotécnicos deliberativos, o estado mensurável de artefatos representacionais compartilhados, observado antes dos desfechos, pode prever falhas de coordenação além dos baselines usuais; magnitude, causalidade e alcance dessa previsão são questões empíricas.**» Esta versão elimina "determinadas classes" (o domínio é delimitado pelos instrumentos, não pela prosa) e condensa as quatro questões empíricas em uma declaração de programa. Não se encontra redução adicional que não triviale (ex.: "documentos importam" já não é falsificável de forma interessante).

## 2. O que a TPC v0.9 candidata contém

| Componente | Conteúdo | Status |
|------------|----------|--------|
| Domínio | Sistemas sociotécnicos deliberativos com artefatos representacionais compartilhados | Definição operacional |
| Arquitetura | R (estado da representação) → I (interpretação) → A (ação) → ECO (desfecho coordenacional) — reclassificada (Patch 7) como **protocolo de medição**: R congelado em t₀, loops como covariáveis, ordem de medição ≠ ontologia | Modelo (Gate 0) |
| H-EO | Taxonomia candidata de propriedades do estado representacional (fator temporal P+U, fidelidade F com referente declarado, coerência C sobre grafo; R como camada de metadados; I separado) | Hipótese (Gate 1) |
| ECP-V0 (pós-patches) | Protocolo de classificação: **ECOA** (5 critérios, causalmente neutro) + **ECOB** (atribuição separada, nunca preditiva); partição de 6 regras; cegamento em dois mundos, kappa mínimo | Instrumento (Gate 2) |
| Vetor preditivo (pós-patches) | (P, U, F, C + R moderador) + X₁ (logs de consulta); X₂ removido para ECOB (Patch 2) | Instrumento (Gate 1) |
| Núcleo empírico | Associação prospectiva + incremento sobre baselines B0–B6 (decisivo: B6) | Hipótese (Gates 4–5) |
| Hipótese causal | Intervenções representacionais alteram ECOs (régua equivalente entre braços) | Hipótese (Gate 6) |
| Programa | Gates G0–G8 com critérios de abandono explícitos; G0 aberto após red team PASS_WITH_REVISIONS; patches 1–7 aplicados por decisão humana; campo não iniciado | Roadmap |

**Registro de aplicação (18/08/2026):** patches 1–7 aceitos por decisão explícita e aplicados nos documentos de instrumentos; baseline congelado intocado; pré-registro P0-PRE-REGISTRY produzido; missão parada antes do campo.

**Explicitamente removido da v0.8:** axioma A2 (→ H-EO), B(S,t), D(S,t) como índice único, g/h como funções, K_R/K_C, HYP-003, ICO como métrica nova, Slektip/Capital Preservado/Fliflexação como conceitos, limiar de 20%, N≥20, "se e somente se HYP-001-U", exclusão de sabotagem, coverage cardinal do Doppelgänger, e toda a nomenclatura histórico-retórica que não gera teste.

## 3. Classificação final do sobrevivente (seção 25)

A classificação não é THEORY nem PROTO-THEORY. O sobrevivente é:

> **EMPIRICAL HYPOTHESIS FAMILY + INSTRUMENT DEVELOPMENT PROGRAM**, dentro de um RESEARCH PROGRAM.

Justificativa: não há corpo explanatório autônomo remanescente (o explanandum é coberto por teorias anteriores com sobreposição substancial); o que existe é (i) uma família de hipóteses empíricas separadas (TPC-F/P/I/C/T), cada uma com critério de abandono; (ii) um programa de desenvolvimento de instrumentos (EO/H-EO e ECO/ECP-V0) que é pré-requisito para testar a família; (iii) uma arquitetura de roadmap (gates) que disciplina a progressão. O nome "TPC" pode ser preservado como rótulo do programa por conveniência, sem status teórico — a decisão de renomear (por exemplo, para algo que não sugira "teoria") é adiada para o Gate 0, quando houver conteúdo novo a nomear.

## 4. O que a v0.9 candidata ainda não sabe (incertezas honestas)

A incidência base de ECOs por episódio é desconhecida; não existe medição prospectiva publicada; a estrutura dimensional de EO é pura conjectura; o cegamento total entre avaliador de ECO e medição de EO pode ser impraticável em organizações pequenas (risco comum residual); e a distinção entre "qualidade documental" e "estado representacional" — a única fronteira que separa este programa da literatura existente — só será decidida por G5. Se B6 empatar com o modelo TPC, o programa encerra sua ambição original e sobrevive apenas como estudo de caso de instrumentação.
