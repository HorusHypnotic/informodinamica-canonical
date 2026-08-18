# TPC-LEAKAGE-AUDIT — Auditoria de vazamento temporal e de desfecho

**Data:** 18/08/2026 · **Regra testada (seção 10 da missão):** nenhuma variável usada para prever ECO pode depender de informação posterior ao instante de previsão, nem do próprio desfecho.

## 1. Taxonomia de classificação

| Classe | Definição |
|--------|-----------|
| SAFE PRE-OUTCOME | A variável pode ser medida inteiramente antes do desfecho, sem informação do desfecho em sua construção |
| POTENTIAL LEAKAGE | A definição ou o protocolo operacional de coleta pode capturar informação pós-evento sem controle explícito |
| OUTCOME-DERIVED | A variável é construída usando o próprio desfecho (ou proxy imediato dele) |
| UNDETERMINED | Protocolo de coleta não especificado; impossível verificar |

## 2. Auditoria por variável

| Variável | Definição congelada | Classe | Justificação |
|----------|--------------------|--------|--------------|
| P(t) = e^{−λt} | Persistência | **SAFE PRE-OUTCOME** (com ressalva) | Exige apenas t₀ do artefato; mas λ não calibrado e "criação do artefato" pode ser retrodatada se a datação depender de evento de falha |
| F = 1−‖S−O‖/‖O‖ | Fidelidade | **POTENTIAL LEAKAGE** | Se O(t) for escolhido após o desfecho (o referente "correto" revelado pela falha), a medida usa informação posterior |
| U(t) = 1/(1+τ(t−t₀)) | Atualidade | **SAFE PRE-OUTCOME** | Só depende da data da última atualização, anterior à previsão |
| C = 1−(1/n)Σ‖Sᵢ−Sⱼ‖ | Coerência | **SAFE PRE-OUTCOME** | Comparação entre artefatos existentes; risco apenas se o inventário {Sᵢ} for montado após o desfecho |
| R = metadados/totais | Rastreabilidade | **SAFE PRE-OUTCOME** | Contagem de metadados existentes |
| X = 1 − erros de interpretação | Erros de interpretação | **OUTCOME-DERIVED** | "Erros de interpretação" são essencialmente ECOs classificados retroativamente; usar X para prever ECO equivale a usar o desfecho como preditor do desfecho |
| D(S,t) = Σαᵢ(1−attrᵢ) | Deformação | **HERDA DOS COMPONENTES** | Herda leakage de X e potential leakage de F; adicionalmente αᵢ pode ser calibrado contra desfechos futuros (fitting com vazamento) |
| Pr(E=1)=q(D,A,T,Z) | Risco de ECO | **DEPENDENTE DO CALIBRADO** | O vazamento depende de como q e D são calibrados |
| HYP-001-U "deformação não corrigida precede falha" | Teste de precedência | **POTENTIAL LEAKAGE sistêmico** | A classificação "não corrigida" exige verificar se a equipe sabia da deformação — informação frequentemente apurada depois da falha, em entrevistas pós-incidente (viés de memória e hindsight) |
| ECO | Desfecho | — | É o desfecho; classificado com protocolo próprio (ECO CLASSIFICATION PROTOCOL V0) |
| ICO = I×R×P | Severidade | **SAFE PRE-OUTCOME** (uso posterior ao ECO) | Se usado para selecionar casos do estudo, gera viés de seleção; definir papel a priori |
| Caso real #1/#2 (CASOS_REAIS.md) | Análises retrotivas | **OUTCOME-DERIVED por desenho** | Seleção a posteriori de casos com falha conhecida → base de negativos inexistente; confirmam apenas que deformações existiram antes (hindsight), não que previam |

## 3. Consequências para o programa

Três consequências diretas. Primeiro, **toda análise prospectiva deve congelar o inventário {Sᵢ} e as datas t₀ em t de previsão**, antes de qualquer falha do período. Segundo, **X deve ser excluído de qualquer modelo preditivo de ECO** até existir instrumento de interpretação com coleta separada e anterior. Terceiro, a validação de HYP-001-U exige **classificação cega e independente da deformação** (avaliador sem acesso a registros de falha) e, para os casos retrotivos, reclassificação como geração de hipóteses, nunca como teste — a base de negativos (episódios sem ECO) precisa ser construída prospectivamente.

## 4. Common-method bias (seção 11 da missão)

Se o mesmo avaliador que mede EO classifica ECO — ou se ECO é extraído dos mesmos sistemas em que EO é medido (mesmos logs, mesmas entrevistas) —, a associação EO→ECO pode ser artefato de método comum. O protocolo ECP-V0 exige avaliador de ECO **cego ao EO**, e a associação mínima entre avaliadores (kappa de Cohen ≥ 0.7) como critério de qualidade do instrumento. **AUD-07 permanece como condição de sobrevivência de qualquer resultado favorável.**
