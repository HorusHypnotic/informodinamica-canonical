# Ledger de oportunidades — contrato de deduplicação V0

Estado: CANDIDATE. Escopo: especificação e testes sintéticos, sem dados reais ou persistência.

## Identidade e semântica
Cada observação recebe `EVENT_ID` único. `OPPORTUNITY_ID` identifica uma hipótese de intervenção dentro de um segmento; várias fontes e eventos podem corroborar a mesma oportunidade. Não identificar oportunidades apenas pelo nome da empresa.

Campos mínimos: `segment_id`, `problem_key`, `intervention_key`, `source_ref`, `observed_at`, `evidence_class` (OBSERVED, REPORTED, HYPOTHESIS), `state`, `revision_of`, `metric`, `baseline`, `outcome`, `next_review_at`.

## Normalização
Normalizar espaços, acentos, caixa e sinônimos controlados por versão do vocabulário. A chave lógica é `segment_id + problem_key + intervention_key`. Não usar CPF, telefone, nome ou conteúdo privado como chave. `source_ref` registra proveniência, mas fontes diferentes da mesma hipótese não devem criar oportunidades distintas.

## Decisão
- Mesmo segmento, problema e intervenção: `REINFORCE` com novo evento, não criar oportunidade.
- Mesmo segmento/problema, intervenção diferente: `RELATED_NEW`, preservar ambas e vínculo.
- Segmento diferente: `NEW`, mesmo que intervenção parecida; marcar padrão transferível.
- Evidência contraditória: `CONTRADICT`, preservar histórico e reabrir validação.
- Sem informação suficiente para comparar: `UNKNOWN`, revisão humana; não descartar.
- Alteração de vocabulário: migração versionada com mapa de aliases; nunca recalcular IDs silenciosamente.

## Exemplos sintéticos e resultados esperados
| Evento | Segmento | Problema | Intervenção | Esperado |
|---|---|---|---|---|
| A | distribuição | veículo ocioso | frete de terceiros | NEW |
| B | distribuição | veículo ocioso | frete de terceiros | REINFORCE A |
| C | distribuição | veículo ocioso | consolidar rotas | RELATED_NEW |
| D | vidraçaria | veículo ocioso | frete de terceiros | NEW + padrão transferível |
| E | distribuição | veículo ocioso | frete de terceiros | CONTRADICT se trouxer evidência incompatível |
| F | desconhecido | não informado | frete de terceiros | UNKNOWN |

## Critérios de aceite
1. Execução repetida do mesmo lote é idempotente para oportunidades, mas não apaga eventos distintos.
2. Eventos com mesmo `EVENT_ID` e conteúdo divergente são bloqueados, não sobrescritos.
3. Fontes independentes acumulam evidência; contagem de fontes não implica ganho econômico.
4. Resultado negativo permanece append-only.
5. Nenhum resultado de teste sintético é apresentado como evidência de mercado.
6. Qualquer armazenamento real exige decisão de local, acesso, retenção e rollback.

## Integração
Reutilizar `commercial/experimento-r197/MATRIZ-DIAGNOSTICO-PARA-OPERA-V0.md` para encaminhamento após diagnóstico, sem alterar a oferta aprovada. O radar diário gera candidatos, não clientes automaticamente.