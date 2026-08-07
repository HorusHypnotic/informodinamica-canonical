## Objetivo

Criar módulo de pesquisa de campo (`/pesquisa`) para acompanhar 10 obras divididas em piloto/controle, com isolamento por dono (usuário logado).

## 1. Migração de banco

Nova tabela `public.obras_pesquisa`:

- `id` uuid pk (default `gen_random_uuid()`)
- `nome` text not null
- `dono_id` uuid not null → `auth.users(id)` on delete cascade, default `auth.uid()`
- `grupo` text not null, check in `('piloto','controle')`
- `status` text not null default `'ativa'`, check in `('ativa','finalizada','desistente')`
- `data_inicio` date not null default `'2026-08-03'`
- `observacoes` text
- `created_at` timestamptz not null default `now()`
- `updated_at` timestamptz not null default `now()` (trigger de update)

Grants (segue política do projeto — sem `anon`, tudo por `auth.uid()`):

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON public.obras_pesquisa TO authenticated;
GRANT ALL ON public.obras_pesquisa TO service_role;
```

RLS habilitado com 4 políticas (isolamento estrito por dono):

- SELECT: `dono_id = auth.uid()`
- INSERT: `WITH CHECK (dono_id = auth.uid())`
- UPDATE: `USING (dono_id = auth.uid()) WITH CHECK (dono_id = auth.uid())`
- DELETE: `dono_id = auth.uid()`

Trigger `updated_at` reutilizando padrão existente (`fn_set_updated_meta` já existe, mas exige `updated_by` — criar função local simples `set_updated_at()` se necessário, ou usar `BEFORE UPDATE` inline).

Observação: tabela é **isolada por usuário** (não por tenant), conforme pedido explícito — não integra com `obras`, `periodos_fechados`, invariantes do OPERA_CORE. É um registro de pesquisa paralelo, não folha/cronograma.

## 2. Frontend

**Nova rota**: `/pesquisa` em `src/App.tsx` (dentro do `ProtectedRoute` + `AppLayout`).

**Nova página**: `src/pages/PesquisaPage.tsx`

Conteúdo:

- Header com título "Pesquisa de Campo — Piloto vs Controle" e contador (X piloto / Y controle / Z total).
- Botão "Nova obra" → abre `Dialog` (shadcn) com form: nome, grupo (Select), data_inicio (default 2026-08-03), status (default ativa), observações.
- Tabela/lista com colunas: Nome · Grupo (badge laranja=piloto, cinza=controle) · Status (badge verde/azul/vermelho) · Data início · Observações · Ações (Editar).
- Dialog de edição: permite alterar apenas `status` e `observacoes` (nome e grupo travados após criação, para não invalidar a pesquisa).
- Empty state amigável quando lista vazia.

**Sidebar**: adicionar entrada "Pesquisa" (ícone `FlaskConical` do lucide) em `src/components/layout/AppSidebar.tsx`, visível a todos os usuários autenticados (não view-only-obra), fora do fluxo de obras/tenant.

**Data fetching**: `useQuery(['obras-pesquisa', user.id])` + `useMutation` para insert/update, invalidando a query. Sem edge function — RLS já garante o isolamento.

## 3. Fora de escopo (explícito)

- Não cria vínculo com `obras`, `colaboradores`, cronograma, folha.
- Não altera invariantes OPERA_CORE nem gera `system_events`.
- Não implementa checklist externo do grupo controle (só registra que a obra existe).
- Sem multi-tenant: `dono_id` é a única fronteira, conforme pedido "cada usuário vê só as suas".

## 4. Ordem de execução

1. Migration (aprovação do usuário via tool).
2. Após regenerar tipos: criar `PesquisaPage.tsx`, adicionar rota em `App.tsx`, adicionar item no `AppSidebar.tsx`.
