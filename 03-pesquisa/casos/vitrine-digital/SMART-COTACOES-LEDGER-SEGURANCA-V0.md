# Smart Cotações — auditoria de segurança e reutilização do ledger

Data: 2026-09-20. Produção inspecionada somente com SELECT.

## Tabelas
`construction_demands` e `construction_quote_observations` têm RLS habilitada e **nenhuma policy direta**. Portanto acesso normal às tabelas fica fechado; o contrato de acesso é pelas RPCs SECURITY DEFINER.

## RPCs do usuário
As funções de demanda/cotação relevantes concedem EXECUTE a `authenticated`, não a anon:
- create_my_construction_demand
- list_my_construction_demands
- set_my_construction_demand_state
- list_my_weekly_quote_demands
- list_my_quote_observations

`list_my_quote_observations` primeiro resolve o project_id da demanda e exige `can_manage_construction_project(v_project)`. Só então retorna as observações.

Conclusão: leitura das cotações está vinculada ao direito de gerenciar a obra, não apenas ao conhecimento do demand_id.

## Escrita de quote
`admin_record_construction_quote_observation`:
- EXECUTE apenas authenticated/service_role/postgres;
- exige `is_platform_admin(auth.uid())`;
- valida unit_price > 0;
- restringe source_type a SUPPLIER_CONFIRMED, MANUAL_QUOTE, CATALOG, MESSAGE ou OTHER;
- rejeita demanda inexistente;
- rejeita estados PAUSED/CANCELLED/ORDERED/RECEIVED;
- grava recorded_by;
- pode transicionar QUOTE_DUE → QUOTED_RECENTLY.

Conclusão: o ledger atual foi desenhado como **observação de cotação administrativamente registrada**, não como resposta direta e autônoma do fornecedor.

## Veredito arquitetural
**Sim: a espinha atual é reutilizável como núcleo do Smart Cotações V0.**
Não há evidência de necessidade de criar outro schema paralelo para demanda + quote observation.

Mas o contrato atual não fecha o Smart Cotações completo. Para fornecedores responderem diretamente, deve existir futuramente um contrato específico de resposta/convite, em vez de abrir a tabela ou afrouxar a RPC admin.

## Fronteira segura
Preservar:
- tabelas fechadas por RLS;
- acesso do dono via RPC com autorização de projeto;
- registro administrativo auditável;
- source_type/evidence/recorded_by;
- candidate_id + supplier_id opcionais.

Adicionar futuramente, se validado:
- quote_request/invite;
- resposta autenticada ou tokenizada com escopo;
- status de resposta;
- seleção/adjudicação;
- entrega/resultado.

## Regra
Não transformar `admin_record_construction_quote_observation` em endpoint público. Criar um contrato separado quando houver fluxo real de fornecedor.

## Próximo gate
Mapear estados e invariantes de `construction_demands` e a observação real existente, sanitizada, para desenhar o ciclo de vida V0 sem quebrar o ledger.

Nenhuma mutação em produção.
