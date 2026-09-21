# Smart Cotações — auditoria do histórico de transições

Data: 2026-09-20. Produção inspecionada read-only.

## Resultado
Não foi encontrado trigger em `construction_demands` que registre mudanças de estado.

Também não foi encontrada tabela específica de history/ledger/transition para construction demand.

Existem ledgers em outros domínios:
- `curated_business_state_events`: from_state, to_state, provenance, changed_by, changed_at;
- `supplier_lifecycle_events`;
- `attribution_events`;
- `site_analytics_events`;
- `attention_events`;
- `click_events`.

Isto prova que o sistema já utiliza o padrão de eventos/histórico em outras áreas, mas esse padrão ainda não cobre a máquina de estados do Smart Cotações.

## Lacuna
`construction_demands.updated_at` informa apenas a última alteração. Campos de pausa preservam parte do histórico de PAUSED, mas não permitem reconstruir a sequência completa.

Exemplo:
ACTIVE → QUOTE_DUE → QUOTED_RECENTLY → AWAITING_CONFIRMATION → READY_TO_BUY

Após chegar ao último estado, os timestamps das etapas intermediárias não são recuperáveis a partir da linha atual.

## Consequência para Inteligência
Sem ledger não é possível medir de forma confiável:
- tempo até cotar;
- tempo até decisão;
- tempo até pedido;
- tempo até recebimento;
- número de recotações;
- duração acumulada em pausa;
- gargalos por etapa.

Isso é **perda de informação por sobrescrita de estado**.

## Padrão já disponível para remanufatura
`curated_business_state_events` fornece um molde conceitual útil:
entity_id + from_state + to_state + provenance + changed_by + changed_at.

Hipótese para o domínio de demanda:
`construction_demand_state_events`
- demand_id
- from_state
- to_state
- provenance
- changed_by
- changed_at
- metadata mínima, se necessária.

Não implementar ainda.

## Regra de desenho
O evento deve ser produzido no mesmo contrato que efetiva a transição, idealmente atomicamente. Telemetria client-side não pode ser fonte canônica do histórico de estado.

## Informodinâmica
Novo fenômeno registrado: **perda informacional por atualização destrutiva**. O sistema preserva o estado presente, mas destrói a trajetória que o produziu.

Estado é fotografia. Ledger é filme.

## Próximo gate
Comparar o padrão `curated_business_state_events` e suas funções com `set_my_construction_demand_state` para desenhar uma remanufatura mínima, transacional e compatível com o ledger existente. Ainda sem executar migration.

Nenhuma mutação em produção.
