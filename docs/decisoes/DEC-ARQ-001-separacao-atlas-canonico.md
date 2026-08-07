# DEC-ARQ-001 — Separação Atlas e Canonical

## Status

Rascunho de decisão arquitetural.

Data: 2026-08-07

## Contexto

Durante a recuperação do repositório `informodinamica-canonical`, foi identificada uma divergência estrutural entre duas linhas históricas:

- `origin/main`: linha canônica atual contendo o núcleo `client/src`.
- `atlas-restaurado-v1`: reconstrução contendo o frontend histórico do OPERA Atlas em `opera/atlas/frontend`.

## Evidência observada

A branch `atlas-restaurado-v1` contém:

- 173 arquivos em `opera/atlas/frontend/src`.
- Frontend funcional validado com `npm run build`.
- Estrutura completa de páginas, componentes, analytics e integrações.

A linha `origin/main` contém:

- 78 arquivos em `client/src`.
- Ausência do diretório histórico `opera/atlas/frontend`.

## Diagnóstico

A divergência não representa perda simples de arquivos.

Foram identificadas duas arquiteturas distintas:

### Arquitetura Atlas

Centrada em:

- dashboard operacional;
- analytics;
- gestão de obras;
- Supabase próprio;
- componentes administrativos.

### Arquitetura Canonical

Centrada em:

- coleta de observações;
- pesquisa informodinâmica;
- validação experimental;
- estrutura client/server.

## Decisão provisória

Manter `atlas-restaurado-v1` como linha histórica preservada.

Não realizar merge direto neste momento.

A integração futura deve ocorrer por análise arquitetural, identificando componentes reutilizáveis e fronteiras entre produtos.

## Próximos passos

- Mapear sobreposição entre Atlas e Canonical.
- Identificar módulos compartilháveis.
- Definir estratégia de unificação ou coexistência.