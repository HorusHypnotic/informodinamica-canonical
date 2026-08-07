# Axiomas e Proposições da TPC

## O que Decorrem Logicamente da Teoria

**Versão candidata:** 0.8 (Agosto de 2026)
**Autor:** Eduardo Martins  
**Status:** Revisão axiomática fundacional — não consolidada

---

## 1. Axiomas

Os axiomas são premissas fundamentais que a teoria assume como verdadeiras, sem necessidade de prova.

| Axioma | Enunciado |
|--------|-----------|
| A1 | Todo signo operacional possui um estado operacional que pode variar ao longo do tempo. |
| A2 | O estado operacional de um signo é composto por um conjunto de atributos: persistência, fidelidade, atualidade, coerência, rastreabilidade e contexto. |
| A3 | A interpretação depende do estado operacional da representação e das condições do intérprete, da tarefa e do ambiente. |
| A4 | Coordenação observada é um resultado relacional de interpretações e ações compatíveis. |
| A5 | O estado operacional pode degradar, permanecer estável ou recuperar-se conforme processos e intervenções. |

Os antigos A6 e A7, que afirmavam acúmulo necessário e limiar determinístico, são reclassificados como hipóteses de modelo. Não são axiomas.

---

## 2. Proposições

As proposições são consequências lógicas dos axiomas. Elas podem ser testadas empiricamente.

| Proposição | Enunciado | Derivado de |
|------------|-----------|-------------|
| P1 | Degradação de `EO` deve reduzir `K_R` em condições especificadas; magnitude e forma são empíricas. | A2, A3 |
| P2 | Estados operacionais idênticos não garantem coordenação idêntica, pois agentes, tarefa e ambiente podem diferir. | A3, A4 |
| P3 | O efeito isolado de persistência requer controle dos demais atributos e condicionantes; não decorre apenas da ontologia. | A2, A3 |
| P4 | Um limiar em `D(S,t)` é modelo concorrente testável para ECO, não consequência necessária. | A4, A5 |
| P5 | Restaurar `EO` deve elevar `K_R`; redução de ECO é uma hipótese adicional. | A3, A4, A5 |
| P6 | Ambiguidade pode elevar divergência interpretativa; o efeito depende dos mecanismos de interpretação. | A3, A4 |

---

## 3. Resultados Condicionais Propostos

| Teorema | Enunciado | Condições |
|---------|-----------|-----------|
| T1 | Se um modelo de limiar for adotado e validado, `D(t)>θ` implica `E=1` por definição do modelo | Condicional, não teorema empírico |
| T2 | Persistência alta isoladamente não implica degradação zero nem ausência de ECO | Contraexemplo possível em F, U, C, R ou X |
| T3 | Se ambiguidade elevar divergência interpretativa, pode reduzir `K_C` | Depende de agentes, tarefa e ambiente |
| T4 | Monotonicidade de `D(t)` exige hipótese adicional; recuperação é permitida | Modelo a comparar |

---

## Próximos Passos

| Ordem | Ação |
|-------|------|
| 1 | Criar os três documentos no repositório: ONTOLOGIA.md, AXIOMAS_E_PROPOSICOES.md, FORMALIZACAO_MATEMATICA.md. |
| 2 | Definir os pesos α_i empiricamente (estudo piloto). |
| 3 | Coletar dados para calibrar os modelos (persistência, fidelidade, etc.). |
| 4 | Testar as proposições P1–P6 com os dados. |
| 5 | Ajustar os modelos com base nos resultados. |
| 6 | Refinar os axiomas e proposições conforme necessário. |
