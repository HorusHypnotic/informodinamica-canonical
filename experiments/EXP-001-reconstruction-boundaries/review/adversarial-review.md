# Revisão adversarial do fixture

**Escopo:** fixture candidato, antes de qualquer receptor.

| Risco | Arquivo/área | Correção aplicada | Validação ou risco residual |
|---|---|---|---|
| C2 deliberadamente inferior | todos os `C2.md` | C2 contém estado, evidência, decisão, autoridade, dependência e próxima ação em prosa competente | Inventário P01–P11 está presente; qualidade pragmática ainda requer revisão humana cega |
| C3 contém fatos extras | `C3.md` e matrizes | C3 usa o mesmo inventário relevante de C2; diferenças são relações explícitas | Matrizes não mostram fato adicional; C3 explicita sequência, que é o tratamento e também risco de resposta excessivamente indicada |
| C3 entrega o gabarito | seções “sequência” | C2 também enuncia a sequência admissível em prosa; C3 muda a codificação, não a disponibilidade básica | Residual alto: se C3 vencer apenas por checklist de ação, a interpretação teórica deve ser limitada |
| Sham artificialmente ruim | `C3-sham.md` | Sham usa headings, listas, ordem e todos os fatos relevantes | Relações continuam inferíveis; se desempenho igualar C3, codificação explícita perde apoio |
| Diferença de comprimento | condições | Textos mantidos em faixa próxima por instância | Faixa observada: I01 143–170, I02 129–149, I03 119–143 palavras; registrar comprimento como covariável descritiva |
| C4-A visualmente óbvia | `C4-A.md` | Mesmo estilo de C3; rótulo será neutralizado antes da execução | Paths internos revelam condição e não podem ser expostos ao receptor |
| Atraso colapsa em substituição | C4-A e checks | Estado anterior é apresentado como vigente e evidência incompatível é suprimida de modo explícito na matriz | Residual material: revisores podem classificar como substituição; piloto deve medir discriminabilidade, não protegê-la por definição |
| Fragmentação colapsa em perda | C4-F | Todas as proposições permanecem textualmente recuperáveis | Se revisores não recuperarem um fato por separação, efeito pode ser custo de busca; se fato estiver efetivamente ausente, manipulation check falha |
| Fragmentação ainda inferível | C4-F | Removidas setas e sequência, mantendo regras e estados em registros separados | Residual esperado: agentes capazes podem recompor o vínculo; efeito nulo é informativo |
| Conhecimento geral resolve a ação | todas as instâncias | Decisões arbitrárias, horários, limites de autoridade e atualizações sintéticas determinam a ação | Algumas regras logísticas são intuitivas; acerto sem reconstrução deve ser separado pelo scoring |
| Dependência desnecessária | truth/actions | Cada dependência altera o conjunto admissível de primeiras ações | Revisão humana deve verificar contrafactualmente cada predecessor antes do piloto |
| Excesso/falta de pistas | condições | Evidências e decisões são nomeadas em todos os braços não deformados | C3 pode ser mais fácil por proximidade; isso é parcialmente o tratamento e limita alegações sobre ontologia |
| Nomes sugestivos | paths/IDs internos | Protocolo exige códigos opacos e input sem metadata | Neutralização ainda não executada; é etapa obrigatória posterior ao congelamento |
| Inconsistência temporal | truth/C4-A | Cada truth possui `as_of`, estados anterior e vigente; matriz registra a alteração | Validação estrutural passa; plausibilidade temporal ainda depende de revisão humana |
| Múltiplas primeiras ações | `actions.json` | Uma ação obrigatória por instância; registro/monitoramento é aceitável, mas não substitui a obrigatória | Respostas compostas devem ser reduzidas à primeira ação material declarada |
| Canal ambiental de recuperação | execução futura | Fixture não inclui ambiente, ferramentas ou filesystem para o receptor | Executor deve receber somente prompt e input; qualquer ferramenta adicional muda o tratamento |
| Rubrica subjetiva | rubricas | Critérios binários por dimensão, sem índice composto; ação não prevista vira `não classificada` | Parafraseamento ainda exige dois avaliadores cegos e adjudicação pré-definida |
| Encoding de enums | `actions.json` | Classificações normalizadas para ASCII | Script local valida enum permitido |
| Classe de bloqueio ausente em I02 | `truth.json` I02-P03 | Corrigida de `estado` para `bloqueio` | Script exige todas as nove classes em cada instância |

## Veredicto adversarial

O fixture é tecnicamente auditável, mas não elimina o dilema central: explicitar relações pode equivaler a fornecer informação operacional mais acionável. O piloto deve ser interpretado como teste incremental desta codificação, não como prova da TPC. C4-A mantém sobreposição possível com substituição, e C4-F pode resultar apenas em custo de integração. Esses riscos são pré-declarados e não poderão ser reinterpretados depois das execuções.

