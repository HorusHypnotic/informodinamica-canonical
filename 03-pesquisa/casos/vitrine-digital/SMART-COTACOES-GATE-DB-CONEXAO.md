# Smart Cotações — gate do banco real bloqueado por conexão

Data: 2026-09-20.

## Verificação
O `supabase/config.toml` do repo `HorusHypnotic/smart-cotacoes` declara:

`project_id = mkvohrldpdadlkqawwxc`

A conexão Supabase atualmente disponível à Torre expõe somente:

`cpmuobplnefltxdmoqzj` — `opera-infrastructure` — status INACTIVE.

Portanto o projeto real do Smart Cotações **não está acessível pela conexão Supabase atual**.

## Consequência
Não é possível cumprir com evidência o gate planejado de catálogo PostgreSQL para:
- record_price_observation;
- execute_price_command;
- finalização;
- constraints/triggers de price_observations;
- grants/RLS atuais.

Não substituir esse acesso ausente por suposição baseada em Git.

## Estado
🟠 BLOQUEADO POR CONEXÃO, não por arquitetura.

Nenhuma mutação executada.

## Próxima ação quando a conexão estiver disponível
Executar somente SELECTs de catálogo:
- pg_proc / pg_get_functiondef;
- pg_class / pg_attribute;
- pg_constraint;
- pg_trigger;
- information_schema.role_routine_grants;
- pg_policies;
- índices/uniques de price_observations.

Depois confrontar DB real × types do main × migrations/histórico.

## Regra
Não conectar/recriar/copiar projeto automaticamente. A conexão correta deve apontar explicitamente para `mkvohrldpdadlkqawwxc`.
