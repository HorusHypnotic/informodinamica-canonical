# ECO CLASSIFICATION PROTOCOL V0 — Proposta de instrumento (não canônico)

**Data:** 18/08/2026 · **Status:** proposta de instrumento de medição para discussão e teste piloto. **NÃO canonizar** antes do Gate 2.

## 1. Definição operacional do evento

Um **ECO** é um evento classificável se e somente se **todos** os seis critérios a seguir forem atendidos, com evidência documental independente (não relato de memória):

| # | Critério | Conteúdo | Evidência mínima |
|---|----------|----------|------------------|
| 1 | Ação interdependente | Existe tarefa/decisão em que dois ou mais agentes precisam de compatibilidade para produzir resultado operacional | Registro de divisão de trabalho, pedidos, cronograma |
| 2 | Necessidade verificável de compatibilidade | A compatibilidade pode ser verificada objetivamente (mesma versão, mesma especificação, mesmo desenho) | Documento-alvo comum especificado |
| 3 | Incompatibilidade observável | Há divergência mensurável entre ações, versões ou especificações efetivamente usadas | Duas versões/registros incompatíveis |
| 4 | Consequência operacional | A incompatibilidade produz efeito operacional (retrabalho, espera, desperdício, parada, entrega errada) | Custo, horas, material ou tempo mensurados |
| 5 | Janela temporal | O evento é delimitado no tempo (início e fim identificáveis) | Registro datado |
| 6 | Origem interna | A causa primária é representação/comunicação interna (exclui, a princípio, sabotagem, força maior e pura falha humana individual sem componente representacional — ver seção 4) | Análise de causa com evidência |

**Não-ECO:** falha individual sem componente de compatibilidade (critério 2 falho), evento com incompatibilidade mas sem consequência operacional (critério 4 falho — registrar como quase-ECO para estudo de severidade), força maior externa.

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

O avaliador de ECO trabalha **sem acesso ao EO** do episódio (nem aos escores dos atributos, nem a entrevistas sobre estado de artefatos). A classificação usa apenas evidência do critério de origem (registros, versões, logs, fotos datadas). Avaliação dupla independente com arbitragem às cegas de um terceiro. Meta: kappa ≥ 0.7 na ocorrência; para classes nominais, kappa por classe reportado. Se o cegamento for impossível na prática (o avaliador é o gestor que conhece os artefatos), **o risco common-method bias é registrado e o estudo é reclassificado como exploratório** (AUD-07).

## 5. A exclusão de sabotagem/desinformação

A TPC v0.8 excluiu "fatores externos" (imunização suspeita R16-I-3). Este protocolo adota MUT-009: **a desinformação deliberada é um caso-limite de deformação por substituição** (LAW-003) e deve ser classificada como ECO com marcação de causa deliberada, não excluída. A exclusão atual do domínio é mantida apenas para força maior (catástrofe, ato de terceiro sem via representacional). Este ponto será revisado no Gate 0.

## 6. O que o instrumento ainda não faz

ECP-V0 não mede prevenção (quase-ECOs sem consequência), não mede severidade sem consequência registrada, não cobre ECOs não documentados (viés de documentação: obras com melhor registro tendem a ter mais ECOs detectados — corrigir por esforço de documentação quando possível) e não resolve a base de negativos (episódios sem ECO), que depende da unidade de análise do TPC-STATISTICAL-ARCHITECTURE-V0.
