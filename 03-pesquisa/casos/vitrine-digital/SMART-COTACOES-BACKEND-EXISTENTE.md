# Smart Cotações — peças encontradas no backend

Data: 2026-09-20. Produção inspecionada read-only.

## Descoberta
O backend já contém uma espinha dorsal muito mais próxima do Smart Cotações do que a UI sugere.

### construction_demands
Ledger de demanda de obra com:
- project_id;
- demand_type;
- item_name / normalized_key;
- quantity / unit;
- need_by;
- state;
- forecast_source;
- recurrence_rule;
- market_consent;
- pausa/retomada.

RPCs incluem `create_my_construction_demand`, `list_my_construction_demands`, `set_my_construction_demand_state`, `list_my_weekly_quote_demands`.

### construction_quote_observations
Registro estruturado de cotação observada:
- demand_id;
- supplier_candidate_id **e** supplier_id opcionais;
- supplier_name_snapshot;
- unit_price / quoted_quantity / unit;
- freight_amount;
- lead_time_text;
- payment_terms_text;
- valid_until;
- observed_at;
- source_type;
- evidence_note;
- recorded_by.

RPC administrativa `admin_record_construction_quote_observation` já grava essa estrutura.

Isto é importante: o schema de cotação já reconhece as duas identidades supplier/candidate que acabamos de mapear.

### Demanda pública
`public_demand_leads` + `public_demand_responses` implementam pedido público e resposta por token, mas atualmente existem 0 respostas.

## Estado de produção
Há pelo menos 1 `construction_quote_observation` e dados em `construction_demands`. Volume ainda é insuficiente para inferência comercial ampla.

## Mapa revisado do Smart Cotações
construction_demand
→ quote_observation(s)
→ comparação possível por preço/frete/prazo/condições
→ [lacuna] escolha/adjudicação
→ [lacuna] entrega/resultado
→ inteligência histórica.

Portanto o Smart Cotações **não precisa nascer do zero**. A espinha demanda→observação já existe.

## Lacunas reais
1. fan-out estruturado da solicitação para múltiplos fornecedores;
2. resposta do fornecedor vinculada à demanda/cotação;
3. escolha/adjudicação;
4. resultado/entrega;
5. UX que reúna o ciclo;
6. métricas com amostra e cobertura suficientes.

## Consequência
Antes de criar qualquer novo schema de quote, reaproveitar `construction_demands` e `construction_quote_observations` deve ser a hipótese padrão.

## Próximo gate
Inspecionar o único quote real e as construction_demands existentes de forma agregada/sanitizada, além das políticas/RPCs de acesso, para verificar se o ledger é seguro e utilizável como núcleo do V0.

Nenhuma mutação em produção.
