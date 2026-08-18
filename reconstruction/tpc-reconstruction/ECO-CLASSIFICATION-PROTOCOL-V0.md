# ECO CLASSIFICATION PROTOCOL V0 — Proposta de instrumento (não canônico)

**Data:** 18/08/2026 · **Status:** proposta de instrumento de medição para discussão e teste piloto. **NÃO canonizar** antes do Gate 2.

**Nota de aplicação de patches (18/08/2026):** os 7 patches do Gate 0 foram aceitos por decisão explícita (HUMAN DECISION REQUIRED → ACCEPT ALL 7 PATCHES) e aplicados neste documento: Patch 1 (seção 1: ECOA separada de ECOB; critério de origem removido da classificação de ocorrência), Patch 5 (seção 7: partição lexical de 6 regras), Patch 6 (seção 4: mundos separados + BLINDING=IMPOSSIBLE), Patch 2 (atributo X retirado do vetor preditivo — ver TPC-CONSTRUCT-VALIDITY), Patches 3 e 4 (abertura pré-outcome e escolhas pré-registradas — ver TPC-STATISTICAL-ARCHITECTURE-V0 e P0-PRE-REGISTRY). O baseline congelado (TPC-BASELINE.md) não foi alterado; patches alteram instrumentos e protocolo de pesquisa, não proposições congeladas.

## 1. Definição operacional do evento

**Patch 1 aplicado — separação ECOA/ECOB:** um **ECOA** (ocorrência de falha coordenacional) é um evento classificável se e somente se **todos** os cinco critérios a seguir forem atendidos, com evidência documental independente (não relato de memória). A causa **não faz parte** da classificação de ocorrência — a atribuição mecanística é uma camada posterior e separada (ECOB, seção 1b):

| # | Critério ECOA | Conteúdo | Evidência mínima |
|---|----------|----------|------------------|
| 1 | Ação interdependente | Existe tarefa/decisão em que dois ou mais agentes precisam de compatibilidade para produzir resultado operacional | Registro de divisão de trabalho, pedidos, cronograma |
| 2 | Necessidade verificável de compatibilidade | A compatibilidade pode ser verificada objetivamente (mesma versão, mesma especificação, mesmo desenho) | Documento-alvo comum especificado |
| 3 | Incompatibilidade observável | Há divergência mensurável entre ações, versões ou especificações efetivamente usadas | Duas versões/registros incompatíveis |
| 4 | Consequência operacional | A incompatibilidade produz efeito operacional (retrabalho, espera, desperdício, parada, entrega errada) | Custo, horas, material ou tempo mensurados |
| 5 | Janela temporal | O evento é delimitado no tempo (início e fim identificáveis) | Registro datado |

**Não-ECOA:** falha individual sem componente de compatibilidade (critério 2 falho); evento com incompatibilidade mas sem consequência operacional (critério 4 falho — registrar como quase-ECOA para estudo de severidade). **Evento externo SEM incompatibilidade coordenacional** (queda de energia pura, chuva, catástrofe, força maior sem divergência entre versões/representações): critério 3 falha — **não é ECOA**, registrado como ECOA-NEGATIVE com marcador "externo, sem componente coordenacional"; não entra no corpus de desfechos coordenacionais (correção formal V1, caso #8 dos sintéticos). Evento externo **com** incompatibilidade coordenacional verificável (ex.: cronogramas incompatíveis sobre o mesmo circuito causam a parada) **é ECOA-POSITIVE**, com ECOB externo ou múltiplo.

### 1b. ECOB — atribuição mecanística (separada, nunca preditiva)

**Patch 1 aplicado:** depois de classificado ECOA-POSITIVE, um avaliador (idealmente diferente, sem acesso ao vetor R) registra a **ECOB**: atribuição mecanística do episódio, com categorias candidatas — **representacional, capacidade, incentivo, recurso, restrição física, planejamento, competência, externo, múltiplo, indeterminado**. A taxa de "indeterminado" é reportada publicamente. **ECOB nunca entra no modelo preditivo** — o outcome para a hipótese é sempre ECOA.

## 2. Classificação do desfecho — quatro dimensões separadas

Nenhum "P(ECO)" único. Todo ECO classificado recebe **quatro valores independentes** (seção 12 da missão):

| Dimensão | Definição | Escala sugerida |
|----------|-----------|------------------|
| Ocorrência | ECO aconteceu sim/não no episódio | Binária |
| Severity | Consequência operacional em unidades de custo ou horas | Contínua (R$/h) + categoria nominal |
| Duration | Duração entre início e resolução | Horas/dias |
| Recurrence | Número de repetições do mesmo padrão de incompatibilidade em janela definida | Contagem |

Ocorrência não implica severidade; um atraso de 10 minutos em material barato e uma parada de semana em estrutura crítica são o mesmo "ECO=1" com Severity incompatível. Modelos separados para P(ECO), Severity|ECO, Duration e Recurrence.

## 3. Taxonomia nominal das classes de ECO (hipótese a validar)

Retrabalho; espera/bloqueio; execução incompatível; compra errada; conflito de versão; parada; desperdício de material; atraso de cronograma; decisão contraditória. A taxonomia é **candidata**: cada classe será validada quanto à confiabilidade interavaliador no Gate 2; classes indistinguíveis serão fundidas.

## 4. Cegamento e avaliação independente

**Patch 6 aplicado — cegamento operacional:** dois mundos com fluxos de informação proibidos: o avaliador de R **nunca vê** ECOA/ECOB do episódio dentro da janela preditiva; o avaliador de ECOA/ECOB **nunca vê** o vetor R congelado do episódio. Avaliação dupla independente em cada mundo, com arbitragem às cegas de um terceiro. Meta: kappa ≥ 0.7 na ocorrência; para classes nominais, kappa por classe reportado. Divergências recebem marca `DISPUTED` com taxa pública. Se o cegamento for impossível na prática (o avaliador é o gestor que conhece os artefatos), **o risco common-method bias é registrado e o estudo é reclassificado como exploratório** (AUD-07). Se a equipe for ≤ 2 pessoas e nenhum cegamento for praticável, o braço recebe a marca `BLINDING=IMPOSSIBLE` e fica **apenas descritivo** — excluído do estimando principal preditivo.

## 5. A exclusão de sabotagem/desinformação

A TPC v0.8 excluiu "fatores externos" (imunização suspeita R16-I-3). Este protocolo adota MUT-009: **a desinformação deliberada é um caso-limite de deformação por substituição** (LAW-003) e deve ser classificada como ECOA-POSITIVE com marcação de causa deliberada, não excluída — sua atribuição vai para a ECOB ("competência/deliberada"). A exclusão atual do domínio é mantida apenas para evento externo SEM componente coordenacional (seção 1). Este ponto foi revisado no Gate 0 (patch 1 + correção formal V1).

## 6. O que o instrumento ainda não faz

ECP-V0 (pós-patches) não mede prevenção (quase-ECOs sem consequência), não mede severidade sem consequência registrada, não cobre ECOs não documentados (viés de documentação: obras com melhor registro tendem a ter mais ECOs detectados — corrigir por esforço de documentação quando possível). **A base de negativos deixou de ser problema:** o Patch 4 redefine o episódio como abertura pré-outcome por objetos observáveis em t₀ e amostragem universal de todos os episódios abertos na janela, garantindo o denominador de P(ECOA) (ver TPC-STATISTICAL-ARCHITECTURE-V0 §3 e P0-PRE-REGISTRY).

## 7. Partição de classificação do episódio (Patch 5 corrigido — V1)

Todo episódio com dossiê é classificado por **ordem lexical**: a primeira regra satisfeita determina a categoria; as demais tornam-se inacessíveis. A primeira regra satisfeita decide — sem discricionariedade de escolha entre categorias. **Nota formal:** "REFUTATION" deixou de ser categoria (correção formal V1); a célula de derrota é descrita pela composição das regras 4–6.

| Ordem | Categoria | Condições necessárias E suficientes |
|-------|-----------|-------------------------------------|
| 1 | **MISSING_DATA** | Checklist de completude registra incompletude identificável (tarefa, inventário, congelamento ou registros da janela ausentes) **que antecede a classificação do outcome** |
| 2 | **MEASUREMENT_FAILURE** | Evidência técnica objetiva da falha do snapshot R (timestamp ausente, arquivo corrompido) registrada **antes ou na origem do snapshot** |
| 3 | **ECOA-NEGATIVE** | Dossiê completo; critérios 1–5 avaliados; critério 3 **não** atendido OU critério 4 não atendido (inclui evento externo sem componente coordenacional) |
| 4 | **ECOA-POSITIVE** | Critérios 1–5 atendidos com evidência documental independente |
| 5 | **UNOBSERVED_PRECURSOR** | ECOA-POSITIVE + checklist de cobertura da janela com escore ≥ **limiar pré-registrado** + divergência não detectada nos dados disponíveis + **busca ativa documentada e negativa** |
| 6 | **ECOA-POSITIVE + ECOB** | ECOA-POSITIVE e UNOBSERVED descartado; ECOB registrada como subclasse descritiva (representacional, capacidade, incentivo, recurso, restrição física, planejamento, competência, externo, múltiplo, indeterminado). **ECOB ≠ representacional nesta regra é a célula de derrota: observável, somável e métrica primária** |

**Exclusividade:** cada regra exige a negação das anteriores. **Exaustividade:** não há estado residual para episódio com dossiê.
