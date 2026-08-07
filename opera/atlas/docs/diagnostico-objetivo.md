# OPERA Atlas — Diagnóstico Objetivo

**Estado documental:** `ACTIVE` — transcrição derivada de fonte `HISTORICAL`; não normativa
**Data de extração:** 31 de julho de 2026
**Fonte:** `archive/google-drive/Diagnóstico/OPERA_Atlas_Diagnostico_Objetivo.pdf`
**SHA-256 da fonte:** `eac02c9b9fefb7afe46981bafcf3a7096d23e1b13f4cdf96cffc445896243add`
**Extrator:** `pypdf 6.14.2`

> Esta transcrição facilita busca e navegação por agentes. Em caso de divergência de extração, consulte o PDF de origem. O conteúdo não redefine o Glossário Canônico, a TPC nem os protocolos.

## Resumo editorial

Registra o estado observado do produto, capacidades existentes, lacunas, riscos e próximo teste operacional.

## Conexão editorial com TPC/TDO

Pode fornecer contexto para investigação de ECO (MET-001) e ICO (MET-002), mas seus achados não constituem automaticamente eventos ou medições canônicas; qualquer uso empírico deve seguir os protocolos de pesquisa.

## Transcrição extraída

### Página 1

```text
OPERA Atlas

Diagnóstico Objetivo — o que está construído, o que falta, o que arrisca


   Data                        06 de julho de 2026

   Versão base                 OPERA_CORE v1.3

   Método                      Evidence-based — apenas o que existe em código, migrations e memórias do repositório

   Escopo                      Atlas (núcleo operacional). Não avalia Copiloto, Control, Stockflow, Smart Cotações.


Legenda de status

   OK Implementado e verificável no           PARCIAL Estrutura existe, sem prova        AUSENTE Nenhum artefato
   repositório                                em produção                                encontrado


Este relatório responde diretamente às 6 seções do diagnóstico solicitado. Cada afirmação é rastreável a um
arquivo, migration ou memória do projeto — não a intenções ou promessas de roadmap.
```

### Página 2

```text
§1 — O que já está construído (e em produção)

Situação atual das capacidades críticas do Atlas. "Em produção" aqui significa código publicado no branch
principal, não necessariamente com uso real por cliente pagante.

    Capacidade                          Status             Evidência no repositório

    Baseline (cronograma                PARCIAL            Tabela cronograma_baseline existe (schema Supabase). Nenhuma
    congelado)                                             evidência de baseline gerado para obra real. Não há edge function ou
                                                           fluxo de UI que congele e assine o baseline. Falta caso de uso
                                                           end-to-end.

    Fechamento mensal com               PARCIAL            Tabelas periodos_fechados e periodos_reaberturas
    hash SHA-256                                           implementadas. Componente admin PeriodosFechadosTab
                                                           presente. Coluna de hash prevista, mas não há teste de
                                                           reprodutibilidade executado (mesmo input → mesmo hash) nem
                                                           snapshot arquivado.

    Exportação CSV                      OK                 Edge function supabase/functions/export-csv/index.ts
                                                           implementada com escopos tenant_full / obra / período. UI
                                                           ExportarDadosTab integrada ao Admin. Respeita RLS via
                                                           userClient, gera ZIP com manifest, signed URL 15min, eventos
                                                           exportacao_csv.* em system_events. Limite conhecido: ~100k linhas
                                                           por chamada.

    Integração com Copiloto             AUSENTE            Nenhum arquivo, edge function, webhook, tabela de ingestão ou
                                                           contrato de dados referenciando "Copiloto" foi encontrado no
                                                           repositório. Equipes, produção e custos são coletados diretamente
                                                           no Atlas via UI/CRUD; não há canal de entrada externo.

    RLS multi-tenant                    OK                 RLS ativo em todas as 22+ tabelas. Helpers get_user_tenant_id,
                                                           has_role, user_has_obra_access como SECURITY DEFINER
                                                           tenant-scoped. Hardening documentado em
                                                           memory/security/rls-access-validation. Ressalva: não há suíte de
                                                           testes automatizados cross-tenant — validação é por revisão de
                                                           policy.

    Invariantes OPERA_CORE              OK                 I1 Fronteira de tenant: derivada server-side, nunca do cliente. I2
    (I1, I2, I4, I9, I11)                                  Autoridade server-side: RLS + RPC + edge. I4 Irreversibilidade
                                                           temporal: periodos_fechados + reabertura formal. I9 Determinismo
                                                           financeiro: cálculos em funções puras (src/analytics/*) sem
                                                           now()/random. I11 (append-only observabilidade): tabela
                                                           system_events com correlation_id. Codificadas — não auditadas
                                                           por terceiro.
```

### Página 3

```text
§2 — O que está em construção (não finalizado)

   Item                                   Status            Onde está

   Apontamento de diárias /               PARCIAL           Página RelatorioMaoObraPage em iteração ativa (default de
   Relatório de mão de obra                                 quantidade ajustado nesta sprint). Regras de folha em
                                                            src/lib/payrollRules.ts. Falta consolidação mensal automatizada.

   Bulk delete de                         OK                Entregue na sprint atual em ColaboradoresPage. Já em
   presenças/faltas                                         produção.

   Capacidade & planejamento              PARCIAL           Memória features/capacidade-planejamento registra conceito;
   (staffing)                                               componentes CapacidadePresencaCard e
                                                            ProdutividadeEquipeCard existem. Não há motor de simulação
                                                            prospectivo.

   Gantt / Cronograma físico              PARCIAL           Página CronogramaPage + GanttBoard + edges gantt-list /
                                                            gantt-update-task. Tabelas atividades e
                                                            atividade_dependencias. Ainda sem baseline congelado nem
                                                            cálculo de SPI persistido.

   Governança LGPD (RoPA,                 AUSENTE           Descrito em OPERA Atlas Modelo Empresarial v2 (PDF) mas não
   DPO, classificação de dados)                             implementado em código: sem tabela de classificação de coluna,
                                                            sem registro de operações de tratamento, sem função de titular
                                                            (export/erase).

   Prova jurídica do fechamento           AUSENTE           Nenhum teste de auditoria simulada. Nenhum documento de
                                                            cadeia de custódia. Hash existe como campo mas não como
                                                            evidência publicamente verificável.
```

### Página 4

```text
§3 — O que falta para o MVP do Atlas

    Área                                   O que falta concretamente

    Integração com Copiloto                Não há contrato de dados definido. Ao menos precisa: (a) endpoint de ingestão
                                           autenticado por tenant, (b) mapeamento equipes→colaboradores,
                                           produção→registros_diarios, custos→lancamentos_financeiros, (c) idempotência
                                           por correlation_id, (d) evento ingestao_copiloto.* em system_events.

    Fechamento mensal funcional            Falta: (a) função server-side que serialize o estado consolidado em ordem
                                           determinística, (b) cálculo do SHA-256 sobre esse blob, (c) armazenamento do
                                           snapshot bruto (não só do hash) em storage privado, (d) fluxo de UI "Fechar mês"
                                           com dupla confirmação, (e) validação de re-execução gerar hash idêntico.

    Exportação CSV —                       Cobertura atual boa. Faltam: verificação de cobertura de todas as tabelas allowlist
    completude                             × tabelas reais; export incremental (delta) para tenants grandes; job assíncrono
                                           acima de ~100k linhas.

    Prova jurídica                         Nenhum cenário de auditoria foi rodado. Precisa: (a) simulação com terceiro
                                           re-executando o hash, (b) parecer jurídico sobre valor probatório, (c) política de
                                           retenção do snapshot bruto.

    Documentação                           Existem MANUAL_SISTEMA.md, RELATORIO_TESTE_SISTEMA.md,
                                           OPERA_CORE.md. Faltam: contrato comercial, termo de uso, política de
                                           privacidade, guia de onboarding do cliente, runbook de incidentes.

§4 — Riscos e débitos técnicos conhecidos

    Risco / Débito                               Severidade          Impacto

    Hash de fechamento não testado               ALTO                Vender "prova jurídica" sem uma execução verificada é risco
                                                                     reputacional grave. Uma única falha em produção destrói a
                                                                     narrativa de imutabilidade.

    Ausência de testes automatizados             ALTO                RLS é revisada manualmente. Um regressão em qualquer
    de isolamento tenant                                             policy passa despercebida. Ver
                                                                     RELATORIO_TESTE_SISTEMA.md: apenas 1 test file
                                                                     existe.

    15 queries paralelas no                      MÉDIO               Aceitável hoje com React Query. Escala mal acima de
    DashboardOverview                                                dezenas de obras / centenas de colaboradores por tenant.
                                                                     Views agregadas ou dashboard_aggregates RPC devem
                                                                     substituir.

    Sem monitoramento de erros                   MÉDIO               Bugs em produção só aparecem por relato do cliente.
    (Sentry etc.)                                                    system_events cobre eventos de domínio, não crashes de
                                                                     UI.

    Bundle sem lazy-loading de rotas             BAIXO               First load pesado. Impacta primeira impressão comercial em
                                                                     mobile.

    LGPD operacional inexistente                 ALTO                Sem controle de titular, sem RoPA, sem base legal
                                                 (jurídico)          registrada por tratamento. Bloqueador para contratos com
                                                                     construtoras grandes.

    Copiloto não integrado                       ALTO                Discurso comercial cita ecossistema; Atlas sozinho é "mais
                                                 (produto)           um painel". Sem Copiloto o valor percebido cai.
```

### Página 5

```text
§5 — Próximo passo (7 dias)

Ação mais crítica: rodar 1 (um) fechamento mensal real, com hash reproduzível, em 1 obra piloto, e
provar o hash de forma independente. Sem isso, todo o resto do discurso Atlas fica em suspenso.

   Quando            O quê                                                                                Quem

   D+1 a D+2         Implementar função server-side gerar_snapshot_periodo(tenant, obra,                  Dev backend
                     mes) que retorna JSON determinístico + SHA-256.

   D+3               Rodar em obra piloto. Salvar snapshot bruto em bucket privado. Registrar             Dev + Cliente piloto
                     evento periodo.fechado em system_events.

   D+4               Terceiro re-executa a função com os mesmos inputs e compara o hash.                  Auditor externo (pode
                     Documenta o resultado.                                                               ser o próprio Eduardo
                                                                                                          M.)

   D+5               Definir contrato de dados Copiloto→Atlas (payload, autenticação,                     Product + Dev
                     idempotência). Escrever OpenAPI/JSON schema.

   D+6               Rodar exportação CSV completa do tenant piloto. Validar cobertura de                 Dev + Cliente piloto
                     tabelas × dados reais.

   D+7               Revisão: o que passou, o que quebrou. Ir/Não-ir para próxima sprint de               Todos
                     MVP vendável.

Decisões a tomar antes: (1) quem é a obra piloto e assina termo de participação; (2) quem é o terceiro que
valida o hash; (3) se o Copiloto entra como pré-requisito do MVP ou como fase 2.

§6 — Critério de prontidão para venda

Veredicto: o Atlas NÃO está pronto para ser vendido como produto autônomo hoje.

O que falta para estar vendável:
• 1 fechamento mensal executado com hash reproduzível e validado por terceiro (§5).

• Integração com Copiloto OU decisão explícita de vender Atlas standalone sem o discurso de ecossistema.

• LGPD operacional mínima: termo de uso, política de privacidade, RoPA básica, contato de DPO.

• 1 caso jurídico simulado documentando o valor probatório do hash.

• Contrato comercial + SLA + política de retenção assinados.

• Onboarding auto-serviço testado com cliente que não é o fundador.

Prazo estimado
4 a 6 semanas, condicionado a: (a) fechamento com hash validado em até 2 semanas, (b) LGPD operacional
em 3 semanas, (c) documentação comercial em 2 semanas em paralelo. Se a integração com Copiloto for
pré-requisito, somar +4 a 6 semanas (total 8–12).
```

### Página 6

```text
Anexo A — Matriz-resumo (atualizada com evidência)

    Seção                                 Status                Observação

    Baseline                              PARCIAL               Tabela existe. Sem obra real.

    Fechamento com hash                   PARCIAL               Estrutura pronta. Não testado.

    Exportação CSV                        OK                    Edge + UI + eventos. Em produção.

    Integração com Copiloto               AUSENTE               Não iniciada.

    RLS                                   OK                    Ativo. Sem teste cross-tenant automatizado.

    Prova jurídica                        AUSENTE               Não validada.

    MVP vendável                          AUSENTE               Falta Copiloto (ou decisão) + fechamento validado + LGPD +
                                                                docs.

    Próximo passo                         —                     Rodar 1 fechamento real com hash validado por terceiro em 7
                                                                dias.


Anexo B — Referências no repositório

• .lovable/OPERA_CORE.md — constituição operacional v1.3

• .lovable/memory/architecture/opera-core-constitution.md — invariantes I1–I10

• .lovable/memory/architecture/period-reopening.md — modelo de reabertura formal

• .lovable/memory/architecture/causal-observability.md — correlation_id / causation_id

• .lovable/memory/features/csv-export.md — arquitetura da exportação CSV

• .lovable/memory/security/rls-access-validation.md — hardening RLS pré-piloto

• supabase/functions/export-csv/index.ts — edge function de exportação

• supabase/functions/gantt-list/index.ts + gantt-update-task/index.ts — cronograma

• src/components/admin/ExportarDadosTab.tsx — UI de exportação

• src/components/admin/PeriodosFechadosTab.tsx — UI de fechamento

• src/analytics/*.ts — funções puras determinísticas (I9)

• src/lib/observability.ts + supabase/functions/_shared/observability.ts — headers causais

• Tabelas: periodos_fechados, periodos_reaberturas, cronograma_baseline, system_events, audit_logs_db, user_roles.

• RELATORIO_TESTE_SISTEMA.md — última auditoria interna (09/03/2026).


Documento gerado em modo evidence-based. Cada linha marcada como OK foi verificada contra o repositório na data
acima. Cada linha marcada como AUSENTE significa que uma busca no código não encontrou artefato — não é opinião.
```
