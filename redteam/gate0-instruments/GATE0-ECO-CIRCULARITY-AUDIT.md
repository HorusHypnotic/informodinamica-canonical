# GATE0-ECO-CIRCULARITY-AUDIT — Auditoria de circularidade do instrumento ECO

**Data:** 18/08/2026 · **Adversário A** · **SHA-base:** fd1accf (`reconstruction/tpc-v0.9`) · **Objeto:** ECO CLASSIFICATION PROTOCOL V0 (`ECO-CLASSIFICATION-PROTOCOL-V0.md`).

## 1. A pergunta central

> «É possível classificar uma falha coordenacional sem saber previamente se houve degradação representacional?»

O achado é **direto e grave**: o critério 6 do ECP-V0 vigente ("Origem interna — a causa primária é representação/comunicação interna, com evidência documental") faz da atribuição causal um **pré-requisito de existência** do ECO. Isso significa que o desfecho só pode nascer quando a própria hipótese da TPC (falha tem origem representacional) é usada como condição de classificação. Aplicado ao desenho R→ECO, o instrumento contém a pergunta dentro da resposta: **circularidade confirmada no instrumento V0**.

| Critério ECP-V0 | Passa no teste de independência? | Problema |
|------------------|----------------------------------|----------|
| 1. Ação interdependente | Sim — verificável sem EO | — |
| 2. Necessidade verificável de compatibilidade | Sim | — |
| 3. Incompatibilidade observável | Sim | — |
| 4. Consequência operacional | Sim | — |
| 5. Janela temporal | Sim | — |
| 6. Origem interna (causa representacional) | **NÃO** | Exige que o avaliador de ECO primeiro julgue "a causa foi representacional?" — exatamente a hipótese em teste. O outcome contém a própria teoria. |

## 2. Consequência lógica

Com o critério 6 vigente, a célula "não | sim" da matriz R×ECO (representação OK + ECO) é **definicionalmente impossível**: qualquer falha que se descubra sem degradação representacional é excluída do conjunto de ECOs pelo critério de origem. A hipótese HYP-001-U torna-se **imunizada por construção** — o teste que poderia refutá-la (falhas com representação intacta) não pode entrar no corpus de desfechos. Este é o mesmo defeito estrutural da válvula UNOBSERVED_PRECURSOR, agora transplantado para dentro do próprio instrumento de desfecho. **Se o protocolo for aplicado como escrito, GATE 0 = FAIL para a versão V0.**

## 3. A separação em duas camadas (seção 4 da missão)

A correção estrutural é dividir o instrumento em **Camada A — OUTCOME** (ECOA) e **Camada B — ATRIBUIÇÃO MECANÍSTICA** (ECOB):

**Camada A (ECOA)** responde apenas: «houve falha coordenacional?» — usando exclusivamente os critérios 1–5, **sem qualquer atribuição de causa**, sem conhecer EO, sem conhecer a hipótese TPC quando possível. O objeto vira um construto causalmente neutro: "evento em que ações interdependentes necessárias produziram incompatibilidade verificável com consequência operacional numa janela".

**Camada B (ECOB)** responde depois, de forma separada e com avaliador idealmente distinto: «quais mecanismos podem ter contribuído?», sobre categorias candidatas testáveis — representacional; capacidade; incentivo; recurso; restrição física; planejamento; competência; externo; múltiplo; indeterminado. Nenhuma dessas categorias é assumida como exaustiva ou mutuamente exclusiva; a taxa "indeterminado/múltiplo" é em si uma métrica de qualidade da atribuição (alta taxa = categorias fracas).

**Verificação da matriz 2×2 com o instrumento corrigido:**

| Representação | ECOA | Resultado |
|---------------|------|-----------|
| não | não | Verdadeiro negativo candidato — **observável** (episódios normais são o braço base do estudo) |
| sim | não | Exposição sem outcome — **observável** (degradação sem consequência; o ECP-V0 já registrava "quase-ECO" para severidade, mas a versão corrigida registra como ECOA=0) |
| não | sim | **Contraexemplo importante — agora possível e esperado**; a proporção dessas ocorrências no total de ECOA é um número público do estudo, não um dado excluído |
| sim | sim | Associação candidata — a célula de interesse de HYP-001-U |

Todas as quatro células existem. A circularidade V0 é **removível por revisão de instrumento** — o problema não está na natureza do construto, está no critério 6. Registros de apoio à remoção: na literatura de incidentes de construção, retrabalho é registrado por consequência econômica, não por causa (a atribuição causal é etapa posterior e frequentemente contestada). O construto neutro ECOA tem portanto precedente operacional.

## 4. Heterogeneidade do ECOA

ECOA permanece um outcome composto em **ocorrência**; a auditoria anterior (AUD-06) manteve a separação em quatro dimensões: ocorrência (binária), Severity (contínua/categórica), Duration e Recurrence. O ataque de Gate 0 adiciona uma exigência: **Severity e Duration devem ser medidas por unidade externa (horas, R$)** — não por categoria subjetiva do avaliador — sempre que houver dado disponível, porque severidade julgada pode ser contaminada pela narrativa causal. A classe nominal (retrabalho, espera, compra errada, etc.) é registrada como descritor, não como definidora.

## 5. Achado residual de subjetividade

Mesmo o critério 2 (necessidade verificável de compatibilidade) esconde um julgamento: "verificável" depende do que o avaliador sabe que poderia ter sido verificado. Em conflito entre dois avaliadores, a regra de desempate proposta é a mais estrita possível compatível com não circularidade: **se dois avaliadores razoáveis divergem no critério 2, o episódio entra no estudo com marcador de disputabilidade — nunca é excluído automaticamente** (excluir divergências favorecerá selecionar episódios fáceis de julgar). A taxa de disputabilidade é métrica pública do instrumento.

## 6. Veredito parcial do Adversário A

**Circularidade confirmada na versão V0; corrigível por separação Camada A / Camada B.** O construto ECO sobrevivente é ECOA (falha coordenacional causalmente neutra) + ECOB (atribuição mecanística separada, com categoria "indeterminado" obrigatória e taxa reportada). Patch proposto em `GATE0-REPRESENTATION-INSTRUMENT-AUDIT.md` anexo e consolidado no patch documentado ao final desta missão. O teste decisivo de Gate 0 para o ECO é atendido: **é possível classificar ECO sem saber se houve degradação** — mas somente após a revisão.
