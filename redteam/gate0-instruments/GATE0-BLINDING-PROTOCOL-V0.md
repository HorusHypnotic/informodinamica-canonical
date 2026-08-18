# GATE0-BLINDING-PROTOCOL-V0 — Protocolo candidato de cegamento

**Data:** 18/08/2026 · **Adversário E de facto** · **SHA-base:** fd1accf · **Objeto:** seção 12 da missão (dois papéis), com registro honesto de onde o cegamento não é operacionalmente possível.

## 1. Os dois papéis

**AVALIADOR R (estado representacional).** Observa exclusivamente o snapshot em t0: artefatos documentais com data, versão, inventário e metadados — tudo o que existia antes da janela. Classifica P, U, F (referente pré-registrado), C (pares pré-registrados), R e registra X₁ (acessos/consultas). **Proibições permanentes:** conhecer o outcome do episódio; conhecer ECOA ou ECOB do mesmo episódio; conhecer a hipótese causal atribuída por qualquer avaliador; acessar registros posteriores ao congelamento (entregas, retrabalho, incidentes, atas de falha). A hipótese TPC não é comunicada ao Avaliador R quando possível (na prática de obra, o avaliador pode conhecer a existência da "teoria" — registrar isso; o que não pode conhecer são os *resultados*).

**AVALIADOR ECO (desfecho).** Recebe apenas o dossiê do episódio após a janela: registros de tarefa, evidência de incompatibilidade, consequência operacional, datas. Classifica ECOA (ocorrência binária pelos critérios 1–5 neutros) e, em etapa separada e com relatório distinto, a atribuição ECOB. **Proibições permanentes:** receber qualquer classificação EO/R/I do episódio; receber o vetor de preditores; conhecer a hipótese causal de R. A atribuição ECOB é feita *depois* da classificação ECOA e sem ver ECOA do colega (avaliação dupla independente com arbitragem cega).

## 2. O que é cegável e o que não é — registro honesto

| Ponto do desenho | Cegável? | Limite real |
|------------------|----------|-------------|
| Snapshot de P, U, R | Sim | Registros datados são objetivamente anteriores; cegamento pleno |
| F (referente declarado) | Parcialmente | A *escolha* do referente é pré-registrada, mas a medição de divergência envolve julgamento; avaliador pode "sentir" o problema se a divergência for flagrante |
| C (pares declarados) | Parcialmente | Mesmo limite de julgamento; pares pré-registrados reduzem o discricionarismo, não o eliminam |
| X₁ (consultas/acessos) | Sim | Logs são objetivos; cegamento pleno |
| ECOA (ocorrência) | Sim na maioria dos casos | Quando a consequência operacional é pública e óbvia (obra parada), o avaliador não precisa "saber" nada — os fatos falam; cegamento pleno na prática |
| ECOB (causa) | **Parcialmente impossível** | Em episódios com documentação visivelmente deficiente, a atribuição "representacional" é quase inevitável para qualquer avaliador; **o cegamento causal nunca pode ser total — por isso ECOB não pode ser variável do modelo preditivo, apenas descritor público e candidato a análise secundária** |
| Conhecimento do programa | Não controlável | Avaliadores de campo sabem que existe um "estudo sobre documentos e falhas"; mitigação = não revelar hipótese direcional nem resultados parciais |

**Regra de ouro decorrente:** tudo o que é preditor vive no mundo do Avaliador R (antes); tudo o que é desfecho vive no mundo do Avaliador ECO (depois); e **nada do mundo ECOB entra no modelo preditivo**. A única exceção registrada: em equipes muito pequenas (1–2 pessoas), o Avaliador R e o Avaliador ECO podem ser a mesma pessoa na prática; nesse caso o episódio é marcado `BLINDING=IMPOSSIBLE` e entra apenas no braço descritivo do estudo, nunca no braço preditivo.

## 3. Ordem de trabalho por episódio (linha do tempo do cegamento)

Em t0 o Avaliador R congela o snapshot; a janela corre sem qualquer retroalimentação para R; ao final da janela, o dossiê ECO é montado **excluindo** todo material produzido pelo Avaliador R; o Avaliador ECO classifica ECOA; em paralelo e às cegas, o segundo Avaliador ECO classifica ECOA e ECOB; divergências vão a arbitragem cega de terceiro; só então os mundos se encontram na análise (que é pública e pré-registrada). O "encontro" acontece na estatística, nunca na classificação.

## 4. Confiabilidade — como será testada (seção 13 da missão)

O protocolo define o desenho do teste sem fixar índice prematuramente: dois avaliadores R recebem o mesmo snapshot e classificam independentemente; dois avaliadores ECO recebem o mesmo dossiê e classificam independentemente; as classificações são comparadas **por componente** (P, U, C item a item; F e C por parâmetros de julgamento com rubricas-âncora; ECOA por ocorrência; ECOB por categoria). O índice formal (kappa, ICC, Krippendorff conforme natureza da variável) será escolhido no Gate 1 com justificativa por tipo de dado — Gate 0 fixa apenas o desenho: duplicação independente + rubricas âncora + taxa de divergência pública.
