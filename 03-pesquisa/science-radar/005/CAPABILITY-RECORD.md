# CAPABILITY-RECORD.md

## Capacidade: PROSPECTIVE-RECONSTRUCTION-FROM-EVENT-LOGS

### INPUT REQUIREMENTS

Um workbook ou tabela de outcome com identificador de equipe/sessão; logs de eventos com identificador compatível, tarefa, timestamp e payload; protocolo que permita interpretar a ordem das tarefas; e acesso a uma versão verificável do dataset.

### TEMPORAL REQUIREMENTS

É necessário definir `T0`, `TC` e `TY` antes do modelo, provar `TC < TY`, ordenar eventos, separar eventos anteriores de posteriores, e distinguir timestamp de registro de momento em que o outcome se torna conhecido.

### PIPELINE

1. Reconciliar identificadores workbook–log.
2. Identificar tarefa alvo e transição observável.
3. Construir uma linha por sessão/tarefa.
4. Derivar M0, M1 e M2 diretamente de dados permitidos antes do cutoff.
5. Ajustar imputação/modelo somente no treino.
6. Usar split cronológico agrupado.
7. Reportar MAE, RMSE, R², placebos, sensibilidade e limitações.

### VALIDATION CHECKS

Foram validados 68 sessions no workbook, 65 nos logs, 65 com Matrix, 64 matches, 64 outcomes e `TC < TY_proxy`; 228.318 eventos foram inspecionados. `git diff --check` foi aplicado antes da preservação.

### KNOWN FAILURE MODES

Outcome agregado sem timestamp explícito; tarefa não vinculada ao log; timezone ausente; comunicação total confundida com informação pré-cutoff; features derivadas prontas com genealogia desconhecida; tarefas/equipes repetidas; amostra pequena; proxy de colaboração confundida com constructo cognitivo.

### SUPPORTED CLAIMS

A capacidade foi **EXECUTED**: o pipeline reconstruiu features prospectivas de eventos e comparou M0/M1/M2 em dados reais. Ele suporta a afirmação limitada de que, neste subconjunto, não houve incremento robusto de rede/colaboração sobre histórico sob o split escolhido.

### UNSUPPORTED CLAIMS

Não suporta causalidade, validação da TPC, medição de EO/deformação, generalização populacional, irrelevância universal de colaboração ou prova de que o mecanismo representacional não existe.

### REUSABILITY

**CAPABILITY_STATUS = EXECUTED; não promover para REPRODUCED ou ADVERSARIALLY_TESTED.** O script é preservado e os resultados foram gerados uma vez; ainda falta uma segunda execução independente/ambiente fixado e controles adversariais mais fortes de identidade de tarefa/equipe.

## Referências

[1]: https://doi.org/10.1371/journal.pone.0204547 "Amelkin et al. (2018), Dynamics of collective performance in collaboration networks"
[2]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s001 "PLOS e0204547 S1 Dataset"
[3]: https://journals.plos.org/plosone/article/file?type=supplementary&id=10.1371/journal.pone.0204547.s002 "PLOS e0204547 S2 Text"
[4]: https://github.com/HorusHypnotic/informodinamica-canonical/tree/2c9f67fbfedbf22c6c31919e3924ca136366cedc/03-pesquisa/science-radar/004 "SCIENCE-RADAR-004 observation audit"
