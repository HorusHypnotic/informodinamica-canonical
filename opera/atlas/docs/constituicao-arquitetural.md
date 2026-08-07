# OPERA Atlas — Constituição Arquitetural v1.0

**Estado documental:** `ACTIVE` — transcrição derivada de fonte `HISTORICAL`; não normativa
**Data de extração:** 31 de julho de 2026
**Fonte:** `archive/google-drive/Diagnóstico/OPERA_Atlas_Constituicao_Arquitetural_v1.0.pdf`
**SHA-256 da fonte:** `de01d7e8dc44744f15885ffef76596a2e74fef34c7157d143caeb7e73d61f725`
**Extrator:** `pypdf 6.14.2`

> Esta transcrição facilita busca e navegação por agentes. Em caso de divergência de extração, consulte o PDF de origem. O conteúdo não redefine o Glossário Canônico, a TPC nem os protocolos.

## Resumo editorial

Define a governança arquitetural interna do produto, suas camadas, princípios, contratos e processo de evolução.

## Conexão editorial com TPC/TDO

Relaciona-se à Representação (IDR-0002), à Persistência da Coordenação (IDR-0006) e à Persistência Representacional (LAW-002) como aplicação sociotécnica. A autoridade declarada no PDF vale apenas dentro do OPERA Atlas e permanece subordinada à Constituição deste repositório.

## Transcrição extraída

### Página 1

```text
                        OPERA Atlas
                Constituição Arquitetural

                        As leis permanentes do sistema








Versão            1.0

Data              06/07/2026

Autoridade        Documento supremo — rege OPERA_CORE, Governança, Roadmap, Diagnóstico, Modelo Empresarial

Alteração         Somente via RFC aprovada (§19)

Escopo            OPERA Atlas — arquitetura, contratos e política de evolução
```

### Página 2

```text
1. Preâmbulo

Esta Constituição define as leis permanentes do OPERA Atlas. Ela separa o que pode evoluir livremente daquilo
que não pode ser quebrado sem autorização explícita. Sua autoridade prevalece sobre qualquer outro documento
do projeto.

Ordem de precedência em caso de conflito:
1. Constituição Arquitetural (este documento)
2. OPERA_CORE v1.3 (invariantes de domínio)
3. Governança de Maturidade v1.1 (critérios de promoção)
4. Roadmap de Maturidade v1.0 (marcos)
5. Diagnóstico Objetivo (estado observado)
6. Modelo Empresarial (definição de negócio)

Alteração desta Constituição só ocorre por emenda constitucional aprovada pelo processo formal de RFC
(§19). Qualquer código, migration, decisão de produto ou release que viole esta Constituição é considerado
defeituoso, independentemente de funcionar em produção.
2. Arquitetura em Camadas

O Atlas se organiza em quatro camadas com dependência estritamente descendente.

     +-----------------------------------------------------------+
     | INTERFACE React 18 + Vite 5 + Tailwind + shadcn |
     +-----------------------------------------------------------+
     | APLICACAO hooks, services, react-query, forms |
     +-----------------------------------------------------------+
     | DOMINIO invariantes I1-I11, regras, tipos |
     +-----------------------------------------------------------+
     | INFRAESTRUTURA Supabase: Postgres, RLS, RPC, Edge, Auth |
     +-----------------------------------------------------------+

Regra da dependência descendente: Domínio nunca conhece Aplicação. Aplicação nunca conhece Interface.
Nenhuma camada superior acessa Infraestrutura sem passar pelo cliente Supabase encapsulado em
src/integrations/supabase/client.ts. Violar esta regra é motivo automático de rejeição de código (§18).
3. Princípios Arquiteturais Obrigatórios

Os princípios P1–P10 são cláusulas pétreas. Quebra de qualquer princípio exige emenda constitucional (§19) —
não RFC comum.

       ID       Princípio                         Regra

       P1       Tenant-isolation por RLS          Nenhuma consulta cliente confia em filtros locais para separar tenants.
                                                  RLS é a única fronteira legítima.

       P2       Soft-delete padrão                Entidades de domínio usam deleted_at. Nunca DELETE físico em
                                                  obras, colaboradores, presenças, financeiro.

       P3       Server-derived truth              tenant_id, user_id e role derivam de auth.uid() no server via
                                                  SECURITY DEFINER — nunca do payload do cliente.

       P4       Hash determinístico               Fatos financeiros consolidados produzem SHA-256 sobre payload
                                                  canonicalizado. Mesmo input, mesmo hash, sempre.

       P5       Causalidade rastreável            Toda mutação com efeito jurídico/financeiro grava correlation_id e
                                                  causation_id em system_events.

       P6       Presenças imutáveis com           registro_presencas usa status_contabil (prevista/confirmada/ajustada).
                estado contábil                   Alteração material após a data promove para ajustada, nunca
                                                  sobrescreve.
```

### Página 3

```text
ID        Princípio                              Regra

P7        Sessão apenas via                      Zero IndexedDB/localforage para sessão. Histórico: causou refresh
          Supabase Auth nativo                   loops em mobile.

P8        Zero Service Worker / PWA              Vetados por histórico de stale cache. Novos service workers
                                                 registrados devem ser proativamente desregistrados.

P9        Roles em tabela separada               user_roles é a única fonte de papéis. Nunca em profiles. Verificação
                                                 sempre via has_role() SECURITY DEFINER.

P10       Design tokens semânticos               Cores, gradientes e sombras vivem em index.css como tokens.
                                                 Nenhuma cor hex hardcoded em componente.
```

### Página 4

```text
4. Regras de Evolução do Banco de Dados

• Toda mudança de schema ocorre por migration versionada. Não existe DDL manual em produção.
• CREATE TABLE public.* é sempre acompanhado, na mesma migration, de: GRANT por role → ENABLE ROW
LEVEL SECURITY → CREATE POLICY.
• Colunas obrigatórias em tabelas de domínio: id, tenant_id, created_at, updated_at. deleted_at
quando aplicável (P2).
• Migrations não removem colunas sem cumprir a política de depreciação (§12).
• Renames de coluna seguem o padrão add → backfill → dual-write → read-switch → drop.
• Vedado ALTER DATABASE postgres.
• Validações dependentes de tempo (ex. expire_at > now()) vivem em trigger, nunca em CHECK constraint.
• Toda migration executa em transação. Falha parcial não deixa schema inconsistente.
5. Regras de Versionamento

Atlas adota SemVer (Major.Minor.Patch) tanto para o produto quanto para cada contrato público.
      Nível         Significado                                                             Exige RFC?

      Major         Quebra de contrato público (RPC, edge, schema PostgREST, hash           Sim, obrigatório
                    de fechamento).

      Minor         Adição retrocompatível: nova coluna nullable, novo parâmetro            Opcional (recomendado se
                    opcional, nova rota, nova RPC.                                          toca contrato)

      Patch         Correção sem mudar contrato: bugfix, otimização, ajuste de estilo.      Não

Documentos regidos por esta Constituição versionam separadamente mas seguem a mesma classificação.
Exemplo: OPERA_CORE v1.3 → v2.0 exige emenda; Governança v1.1 → v1.2 aceita RFC comum.
6. Política de Breaking Changes

Uma mudança é breaking quando qualquer uma destas condições ocorre:

• Remove ou renomeia campo em resposta de RPC ou edge function pública.
• Muda tipo de campo de forma não-coerciva.
• Altera semântica de invariante existente (I1–I11 do OPERA_CORE).
• Remove policy RLS que outros contratos assumem ativa.
• Faz folha_pagamento retornar hash diferente para o mesmo input canônico.
• Muda ordem ou nome de coluna em CSV público exportado.

Toda breaking change exige, cumulativamente:

1. RFC aprovada conforme §19.
2. Incremento de versão Major.
3. Janela de depreciação mínima de 90 dias com contrato antigo ativo em paralelo.
4. Migration path documentado e testado.
5. Notificação a clientes ativos em produção antes do prazo final.
```

### Página 5

```text
7. Contratos Públicos Entre Módulos

Contratos públicos só mudam segundo §6. Contratos privados mudam livremente em Patch/Minor.
      Tipo                       Contratos considerados públicos

      Funções DB                 folha_pagamento · verificar_hash_periodo · reabrir_periodo · refechar_periodo ·
                                 validar_fechamento · promover_previsoes · dashboard_aggregates · has_role ·
                                 has_any_role · user_has_obra_access · get_user_tenant_id · is_super_admin ·
                                 setup_tenant · listar_historico_periodo · eficiencia_presenca ·
                                 produtividade_por_equipe · log_system_event

      Edge functions             export-csv · data-retention · toda edge com URL pública documentada

      Tabelas PostgREST          Todas as tabelas em schema public com policies observáveis pelo cliente autenticado

      Eventos                    Formato de linhas em system_events: event_type · source · payload · severity ·
                                 correlation_id · causation_id

      Hash de fechamento         Payload canonicalizado + algoritmo SHA-256 + campos incluídos no hash

      Design tokens              Nomes de tokens semânticos em index.css consumidos por shadcn (ex. --primary,
                                 --destructive, --muted)

Contratos privados (mudam em Minor sem RFC): componentes React internos, hooks, tabelas sem exposição
PostgREST, colunas com prefixo _internal, memórias em .lovable/memory/*, documentação e conteúdo
de landing pages.
8. Modelo Oficial de Eventos

Padrão único, gravado em system_events:

     event_type verbo.entidade.qualificador (ex. periodo.reaberto)
     source rpc.<nome> | edge.<nome> | trigger.<nome> | client.<area>
     correlation_id uuid da transacao logica (mesmo em multiplos passos)
     causation_id evento que causou este (encadeamento causal)
     tenant_id derivado no server via get_user_tenant_id(auth.uid())
     actor_id auth.uid() ou NULL para system-level
     payload jsonb canonicalizado (chaves ordenadas)
     severity info | warn | error
     status success | failure | partial
     duration_ms integer opcional

Toda mutação de estado com efeito jurídico ou financeiro obrigatoriamente emite pelo menos um evento. RPCs
de fechamento (reabertura, refechamento) emitem eventos em cascata com causation_id apontando ao evento
pai. A ausência de evento correspondente a uma mutação registrada em audit_logs_db é um bug de
observabilidade (§13).
9. Modelo Oficial de Snapshots

Snapshot = fotografia imutável de um fato consolidado em um período. É a unidade de prova jurídica do Atlas.

• folha_pagamento(obra, ini, fim) é o gerador canônico de snapshot.
• Ao fechar período, periodos_fechados guarda snapshot_json + hash_snapshot (SHA-256).
• Reabertura preserva a versão anterior em periodos_reaberturas — append-only, jamais UPDATE.
• Refechamento gera nova versão (versao + 1), nunca sobrescreve a anterior.
• Regra do hash reproduzível: mesmo input canônico ⇒ mesmo SHA-256, indefinidamente. Quebrar essa
garantia exige §6.
• A função verificar_hash_periodo(id) reexecuta e compara — retorno integro=true é a prova de
integridade.
10. Modelo Oficial de Identidade das Entidades
```

### Página 6

```text
• Toda entidade primária: id uuid PRIMARY KEY DEFAULT gen_random_uuid().
• Toda entidade multi-tenant: tenant_id uuid NOT NULL.
• Identificadores de negócio (CNPJ, matrícula, código interno) nunca servem como PK — apenas como coluna
indexada.
• Referências entre entidades: sempre UUID + FK explícita com ON DELETE deliberado.
• IDs de artefatos de governança seguem prefixo estável: critérios M0-01…M4-XX, evidências E-01…E-XX, RFCs
RFC-XXXX, invariantes I1…I11, princípios P1…P10.
• IDs uma vez atribuídos nunca são reciclados, mesmo após revogação.
```

### Página 7

```text
11. Política de Compatibilidade Retroativa

• Aditividade preferida: campos novos opcionais nunca quebram cliente.
• Respostas de RPC aceitam campos extras — clientes ignoram o desconhecido.
• Cliente tolera qualquer versão dentro do mesmo Major sem falhar em runtime.
• Cliente falha explicitamente apenas ao encontrar Major diferente do esperado.
• Testes de contrato validam retrocompatibilidade antes de release Minor.
12. Política de Depreciação

• Contrato depreciado é marcado com @deprecated na documentação + sinal em runtime: header
X-Deprecated: <motivo> para edge functions, evento rpc.deprecated_call em system_events para
RPCs DB.
• Janela mínima: 90 dias para contratos públicos · 30 dias para privados.
• Remoção só após: prazo cumprido + zero uso no período (verificado em system_events) + RFC de remoção
aprovada.
• Contrato depreciado permanece funcional durante toda a janela — sinalização não é desativação.
13. Política de Observabilidade

• Todo RPC público loga em audit_logs (efeito de negócio) e/ou system_events (evento causal). Efeito
jurídico/financeiro exige ambos.
• correlation_id é propagado do cliente ao DB via set_correlation_context() no início da transação.
• Erros server-side registram stack + payload sanitizado (sem PII).
• Métricas mínimas monitoradas: latência p95 de RPCs críticas (fechamento, folha), taxa de erro, volume por tipo
de evento, hash mismatches em verificar_hash_periodo.
• Débito reconhecido: monitoramento Sentry ainda não ativo (M2-02). Governa §7 do Roadmap.
14. Política de Auditoria

• Toda tabela de domínio com efeito financeiro/jurídico carrega trigger fn_audit_log_changes gravando em
audit_logs_db (INSERT/UPDATE/DELETE + old_data + new_data).
• Reabertura de período registra: motivo (mín. 20 caracteres), autor, correlation_id, snapshot anterior íntegro.
• Alteração de valor_diaria_usado bloqueada após 7 dias exceto admin (fn_protect_snapshot).
• Período fechado + reaberto = registros lado a lado. Nunca sobrescrita, nunca UPDATE destrutivo.
• Log de auditoria é append-only. Trigger de proteção impede DELETE em audit_logs_db.
15. Política de Performance

Limites duros. Violação = bug, não trade-off.
      Área               Limite                                Ação em caso de violação

      Dashboard          ≤ 15 queries por render               Consolidar em RPC (ex. dashboard_aggregates)

      Fechamento         ≤ 3s para 1 obra × 1 mês              Otimizar folha_pagamento ou dividir período

      N+1                Zero N+1 sobre colaboradores,         Substituir por join server-side
                         obras, presenças

      Bulk               Operações em lote via RPC             Nunca loops de INSERT/DELETE no cliente
                         dedicada

      Payload            Respostas ≤ 2MB por request           Paginar ou filtrar server-side
```

### Página 8

```text
16. Política de Segurança

• RLS obrigatório em toda tabela public.*. Migration que criar tabela sem policy é inválida.
• Verificação de role administrativa sempre via has_role() ou is_super_admin() — SECURITY DEFINER.
• Nunca checar admin em localStorage, sessionStorage ou payload cliente.
• Secrets vivem em env de edge function. Nunca no bundle cliente.
• publishable_key / anon_key podem viver em código.
• service_role_key jamais é referenciado no cliente e jamais é logado.
• Toda edge function pública valida JWT antes de qualquer efeito colateral.
• Auth exclusivamente via Supabase Auth nativo. Nenhum fluxo paralelo de sessão.
17. Critérios de Aceitação de Nova Funcionalidade

Uma funcionalidade só entra em main quando cumpre todos os critérios:

1. Encaixa em uma única camada (§2) sem violar a dependência descendente.
2. Não viola nenhum princípio P1–P10.
3. Traz teste ou justificativa registrada por que não trouxe.
4. Se toca DB: migration + GRANT + RLS + policies na mesma migration.
5. Se toca contrato público (§7): RFC aprovada (§19).
6. Sem cor hex hardcoded; usa design tokens (P10).
7. Se toca fluxo com efeito jurídico: emite evento em system_events (P5).
18. Critérios de Rejeição Automática

Qualquer código com uma destas características é rejeitado sem discussão:
      Sintoma                                                                    Princípio violado

      localStorage/IndexedDB usado para sessão                                   P7

      Registro de Service Worker ou plugin PWA                                   P8

      Coluna nova sem tenant_id em tabela multi-tenant                           P1 · §4

      Filtro de tenant apenas no client                                          P1 · P3

      Cor hex ou classe de cor genérica em componente                            P10

      Campo role em profiles ou users em vez de user_roles                       P9

      Check de admin sem has_role() ou is_super_admin()                          P9 · §16

      UPDATE que sobrescreve fato financeiro fechado                             §9 · §14

      CREATE TABLE sem GRANT + RLS + policy                                      §4 · §16

      ALTER DATABASE postgres em migration                                       §4
19. Processo Formal de RFC (Request for Change)

Toda mudança em contrato público ou princípio arquitetural passa por RFC. Estrutura mínima:

     RFC-XXXX Titulo curto imperativo
     Autor <nome>
     Data AAAA-MM-DD
     Status draft | review | approved | rejected | superseded

     1. Motivacao por que agora, o que dor especifica resolve
     2. Proposta contrato antes / depois (schema, RPC, endpoint)
     3. Alternativas consideradas e por que descartadas
     4. Impacto preencher matriz do §21
     5. Migration path passos ordenados, reversiveis quando possivel
     6. Compatibilidade conforme §11
     7. Depreciacao janela + sinalizacao conforme §12
     8. Aprovacao minimo 1 admin + 1 revisor arquitetural
```

### Página 9

```text
RFCs vivem em .lovable/rfcs/RFC-XXXX.md. Diretório a criar em pedido futuro.
```

### Página 10

```text
20. Fluxo Oficial de Evolução Arquitetural

     Ideia
     |
     v
     Discussao (issue / conversa)
     |
     v
     RFC draft -----------> Rejeitada (fim)
     |
     v
     Review (admin + arquiteto)
     |
     v
     Aprovacao
     |
     v
     Implementacao (migration + codigo + teste)
     |
     v
     Checklist pre-release §23
     |
     v
     Release (Patch / Minor / Major)
     |
     v
     Registro em Governanca §7 (historico de evolucao)
21. Matriz de Impacto Arquitetural

Cada mudança encontra-se em uma célula. Em caso de dúvida, escalar para a direita (§22).
       Dimensão                Patch                        Minor                           Major

       Schema                  Índice, comentário,          Nova coluna nullable, nova      Remove/rename coluna,
                               backfill de dados            tabela                          muda tipo, quebra FK

       RPC pública             Bugfix sem mudar shape       Novo parâmetro opcional,        Remove função, muda
                               do retorno                   novo campo no retorno           tipo/shape de retorno

       Edge pública            Bugfix interno, ajuste de    Novo endpoint, novo header      Muda contrato de
                               log                          opcional                        request/response existente

       RLS                     Ajuste equivalente           Nova policy permissiva          Restringir acesso previamente
                               semanticamente               adicional                       concedido

       UI                      Ajuste de estilo, texto,     Nova tela, novo card, novo      Remove rota, muda URL,
                               ícone                        card KPI                        remove funcionalidade

       Invariante (I1–I11)     —                            —                               Sempre Major. Exige emenda
                                                                                            constitucional

       Princípio (P1–P10)      —                            —                               Sempre Major. Exige emenda
                                                                                            constitucional

       Hash de                 —                            —                               Sempre Major. Exige plano de
       fechamento                                                                           re-verificação de todos os
                                                                                            fechamentos existentes
22. Classificação de Mudanças

Regra prática de bolso:
• Em caso de dúvida, escalar (Patch → Minor, Minor → Major). Nunca escalar para baixo.
• Se o cliente precisa mudar código para continuar funcionando, é Major.
• Se o cliente pode ignorar a mudança sem consequência, é Patch ou Minor.
• Se você não sabe classificar, é Major até prova em contrário.
```

### Página 11

```text
23. Checklist Obrigatório Pré-Release

Um release não sai sem todos os itens marcados. Itens não aplicáveis são justificados na mensagem de release.
       #      Item                                                Como validar

       1      Migrations aplicadas em staging                     Ambiente espelho + smoke test

       2      bun run build sem erros                             Log do build limpo

       3      Testes existentes verdes                            bunx vitest run

       4      Se toca DB: supabase linter sem avisos              supabase--linter
              novos

       5      Se toca contrato público: RFC linkada no PR         Link RFC-XXXX no corpo do PR

       6      Histórico da Governança §7 atualizado               Nova linha em v1.x

       7      Sem console.error novo no fluxo principal           QA em preview

       8      Design tokens respeitados (sem hex                  grep por padrão hex fora de index.css
              hardcoded)

       9      Se toca fluxo financeiro: hash reproduzido em       verificar_hash_periodo() = integro=true
              ambiente de teste

       10     Eventos causais emitidos onde esperado (P5)         SELECT em system_events do fluxo
24. Critérios para Congelamento Arquitetural

Áreas podem ser declaradas congeladas: nenhuma mudança sem emenda constitucional (não bastam RFC
comum + Major). Congelamento existe para proteger prova jurídica e integridade histórica.

       Área congelada                          Gatilho de congelamento                         Estado atual

       Hash de fechamento                      Primeira execução em cliente pago               Não congelado ainda
                                               (M1-01)

       Estrutura de periodos_fechados          Idem                                            Não congelado ainda

       Estrutura de periodos_reaberturas       Idem                                            Não congelado ainda

       Contrato de folha_pagamento             Idem                                            Não congelado ainda

       Modelo de eventos em                    Após 90 dias de estabilidade em produção        Não congelado ainda
       system_events

       Invariantes I1–I11                      Este documento (v1.0)                           Congeladas — mudança exige
                                                                                               emenda

Congelamento é ato formal: exige RFC que altere esta seção da Constituição.
25. Relação Entre Documentos

       Documento                           O que governa                                       Sujeito a

       Constituição Arquitetural           Como o Atlas pode mudar                             Emenda via RFC (§19)
       v1.0

       OPERA_CORE v1.3                     Invariantes de domínio (I1–I11)                     Constituição §3, §24

       Modelo Empresarial                  O que o Atlas é (definição de negócio)              Constituição §17

       Diagnóstico Objetivo                Onde o Atlas está hoje                              Reflete estado real,
                                                                                               evidence-based

       Roadmap de Maturidade v1.0          Marcos M0–M4                                        Constituição §21
```

### Página 12

```text
      Documento                        O que governa                                    Sujeito a

      Governança de Maturidade         Como medir evolução continuamente                Constituição §20
      v1.1

      RFCs                             Propostas individuais de mudança                 Constituição §19

26. Assinatura Constitucional

Esta Constituição é a única fonte de autoridade sobre a arquitetura do OPERA Atlas. Qualquer código,
migration, decisão de produto ou release que a viole é considerado defeituoso, independentemente de
funcionar em produção. Sua alteração exige emenda formal aprovada por RFC. Sua interpretação, em caso
de conflito com qualquer outro documento do projeto, prevalece.
```
