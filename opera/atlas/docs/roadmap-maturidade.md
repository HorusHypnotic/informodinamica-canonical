# OPERA Atlas — Roadmap de Maturidade Empresarial

**Estado documental:** `ACTIVE` — transcrição derivada de fonte `HISTORICAL`; não normativa
**Data de extração:** 31 de julho de 2026
**Fonte:** `archive/google-drive/Diagnóstico/OPERA_Atlas_Roadmap_Maturidade.pdf`
**SHA-256 da fonte:** `98107895948e89638225958de2c48214e9e403df03b8591f3b1f92c2876065bb`
**Extrator:** `pypdf 6.14.2`

> Esta transcrição facilita busca e navegação por agentes. Em caso de divergência de extração, consulte o PDF de origem. O conteúdo não redefine o Glossário Canônico, a TPC nem os protocolos.

## Resumo editorial

Descreve a evolução do Atlas por marcos de maturidade, critérios de prontidão, riscos e rastreabilidade.

## Conexão editorial com TPC/TDO

O roadmap é uma representação operacional (IDR-0002) destinada a orientar coordenação ao longo do tempo. Não deve ser identificado automaticamente como Slektip (IDR-0009/MET-005) sem demonstração do mecanismo de transferência entre ciclos.

## Transcrição extraída

### Página 1

```text
                                      OPERA Atlas
                  Roadmap de Maturidade Empresarial



             Cronograma por marcos de maturidade, não por features isoladas.







Data                          06 de julho de 2026

Versão OPERA_CORE             v1.3

Escopo                        OPERA Atlas (não inclui Copiloto / Compass / demais módulos)

Metodologia                   Evidence-based — cada critério rastreável a arquivo, migration ou memória do
                              repositório

Uso                           Apresentação empresarial, auditoria e planejamento de investimento
```

### Página 2

```text
Sumário Executivo

Este documento organiza a evolução do OPERA Atlas em cinco marcos de maturidade empresarial,
não em backlog de funcionalidades. Cada marco tem critérios objetivos de prontidão, evidência atual no
repositório e gaps mensuráveis. A posição atual do produto é entre M0 e M1: a fundação técnica está
codificada (invariantes, RLS, append-only, hash), mas nenhum piloto pago rodou com fechamento
reproduzível e domínio próprio.

Modelo de Maturidade


           M0                     M1                    M2                     M3                     M4
           Fundação               Pré-piloto            Cliente                Due                    Certificaçõe
           Técnica          >     Pago             >    Enterprise       >     Diligence        >     s
                                                                               Investidor             LGPD / ISO


Legenda: verde = atingido · âmbar = em curso · cinza = futuro.


Uma frase por marco

M0         Fundação técnica auditável — invariantes codificadas, RLS ativa, hash estruturado.

M1         Pré-piloto pago — 1 obra real com fechamento reproduzido e contrato mínimo assinado.

M2         Cliente enterprise — testes automatizados, monitoramento, DPA e role de auditor.

M3         Due diligence para investidor — pentest, métricas de negócio auditáveis, plano de lock-in.

M4         Certificações — LGPD operacional e ISO 27001 com evidências de 6–12 meses de operação.
```

### Página 3

```text
M0 — Fundação Técnica                                                                                                ATINGIDO


Definição. Base arquitetural verificável — o sistema tem invariantes escritas, banco isolado por tenant e
trilha causal capaz de reconstruir qualquer estado consolidado.

Bloco                               Conteúdo

Critérios de prontidão              • OPERA_CORE v1.3 codificado com 11 invariantes (I1–I11).
                                    • RLS ativa em todas as tabelas públicas com GRANTs explícitos.
                                    • Append-only para eventos históricos (audit_logs, audit_logs_db, system_events).
                                    • Fechamento mensal com SHA-256 estruturado
                                    (periodos_fechados.hash_snapshot).
                                    • Observabilidade causal (correlation_id, causation_id) em edges e triggers.

Evidência atual                     .lovable/OPERA_CORE.md v1.3 · migrations de periodos_fechados,
                                    periodos_reaberturas, cronograma_baseline, system_events ·
                                    .lovable/memory/security/rls-access-validation.md · libs src/lib/observability.ts e
                                    supabase/functions/_shared/observability.ts.

Gaps para atingir o marco           Fechamento nunca rodou em obra real; hash SHA-256 nunca foi reproduzido por
                                    terceiro independente. Isolamento cross-tenant não coberto por teste automatizado.

M1 — Pré-piloto Pago                                                                                                EM CURSO


Definição. Um cliente pagante operando em produção com fechamento auditável e contrato de piloto
formal.

Bloco                               Conteúdo

Critérios de prontidão              • 1 fechamento mensal real executado, hash reproduzido por auditor externo.
                                    • CSV exportado, conferido e assinado pelo cliente piloto.
                                    • 1 obra piloto em produção com dados reais por ≥ 30 dias corridos.
                                    • Contrato de piloto assinado + SLA mínimo (uptime declarado, RPO/RTO).
                                    • Domínio próprio no ar (sair de .lovable.app).
                                    • Runbook de onboarding documentado e testado.

Evidência atual                     Edge export-csv funcional (supabase/functions/export-csv/index.ts). Estrutura de
                                    fechamento e reabertura formal pronta (RPCs reabrir_periodo, refechar_periodo).
                                    UI admin com tab "Períodos" implementada. Domínio ainda em
                                    opera-atlas.lovable.app.

Gaps para atingir o marco           Rodar fechamento real; migrar para domínio próprio; escrever contrato de piloto, SLA
                                    e runbook de onboarding; validar exportação CSV com cliente real.
```

### Página 4

```text
M2 — Cliente Enterprise                                                                                                FUTURO


Definição. Produto pronto para vender a clientes com exigências corporativas de segurança, auditoria e
SLA.

Bloco                                Conteúdo

Critérios de prontidão               • Testes automatizados de isolamento cross-tenant (RLS) em CI.
                                     • Monitoramento de erros em produção (Sentry ou equivalente).
                                     • Backup com restore testado trimestralmente e documentado.
                                     • Segregação de funções: admin ≠ operador ≠ auditor, validada por matriz de
                                     permissões.
                                     • Exportação CSV incremental / delta por período.
                                     • Trilha de auditoria consultável por role auditor dedicada.
                                     • SLA formal com cláusula de penalidade e DPA (Data Processing Agreement)
                                     padrão.

Evidência atual                      Roles atuais cobrem admin/operador via has_role + get_user_tenant_id. Auditoria
                                     de banco existe em audit_logs_db mas sem role auditor com view dedicada. Sem
                                     monitoramento externo, sem restore validado, sem DPA formal.

Gaps para atingir o marco            Introduzir role auditor; contratar/ativar Sentry; escrever suite de testes RLS
                                     cross-tenant; executar restore de backup trimestral e documentar; redigir DPA + SLA
                                     enterprise.

M3 — Due Diligence para Investidor                                                                                     FUTURO


Definição. Sistema em condições de sustentar auditoria externa técnica e financeira em processo de
investimento.

Bloco                                Conteúdo

Critérios de prontidão               • Code review externo por consultoria independente.
                                     • Pentest com relatório e remediation plan documentados.
                                     • Documentação de arquitetura completa e versionada.
                                     • Roadmap de produto público e mantido.
                                     • Métricas de negócio auditáveis (MRR, churn, NPS) rastreáveis ao sistema.
                                     • Contratos com fornecedores críticos (Supabase, Lovable) formalizados.
                                     • Plano de contingência de lock-in (referência: §8 do OPERA_CORE).

Evidência atual                      OPERA_CORE §8 já lista soberania atual honestamente (auth, banco, storage, edge,
                                     backup, deploy, domínio) com riscos e mitigações. Roadmap interno existe em
                                     .lovable/plan.md. Sem pentest, sem métricas de negócio operacionalizadas, sem
                                     plano de exit formal.

Gaps para atingir o marco            Contratar pentest; expor roadmap público; instrumentar MRR/churn/NPS; formalizar
                                     contratos com fornecedores críticos; escrever plano de exit de lock-in em documento
                                     versionado.
```

### Página 5

```text
M4 — Certificações — LGPD e ISO 27001                                                                             FUTURO


Definição. Conformidade formal reconhecida — LGPD operacional auditada e ISO 27001 com SGSI
implantado.

Bloco                              Conteúdo

Critérios de prontidão             LGPD: RIPD (Relatório de Impacto), DPO nomeado, base legal por tratamento
                                   documentada, canal do titular funcional, política de retenção implementada e
                                   auditada, termo de uso + política de privacidade revisados por jurídico.
                                   ISO 27001: SGSI implantado, análise de riscos formal, controles do Anexo A
                                   mapeados, auditoria interna aprovada, auditoria externa de certificação concluída.

Evidência atual                    Edge data-retention existe e é observável (memória
                                   architecture/causal-observability). OPERA_CORE codifica princípios (I1, I5, I6, I8)
                                   alinhados a LGPD e ISO 27001. Sem DPO, sem RIPD, sem SGSI, sem canal do
                                   titular.

Gaps para atingir o marco          LGPD operacional inexistente hoje — apenas conceito. ISO 27001 exige 6–12 meses
                                   de operação com evidências antes da auditoria externa. Marco maduro apenas após
                                   M2 + M3 concluídos.


Cronograma Temporal Consolidado

Marco      Status            Pré-requisitos        Estimativa                  Riscos bloqueantes

M0               OK          —                     Concluído                   Nenhum estrutural.

M1           PARCIAL         M0                    4–6 semanas                 Hash não reproduzido; sem domínio próprio;
                                                                               sem contrato-modelo.

M2            FUTURO         M1                    8–12 semanas após           Sem testes RLS; sem monitoramento; sem role
                                                   M1                          auditor; sem DPA.

M3            FUTURO         M2                    12–16 semanas após          Sem pentest; sem métricas de negócio; sem
                                                   M2                          plano de lock-in.

M4            FUTURO         M2 + M3               24–36 semanas               LGPD conceitual; ISO exige histórico
                                                                               operacional.
```

### Página 6

```text
Matriz de Riscos e Débitos Técnicos

Risco                                   Sev.         Marc      Mitigação                                    Evidência
                                                     o

Hash de fechamento nunca                  ALTO       M1        Rodar 1 fechamento real e                    periodos_fechados.ha
reproduzido em obra real                                       re-executar hash com terceiro                sh_snapshot
                                                               independente.

Sem testes automatizados de               ALTO       M2        Suite Vitest + fixtures com dois             src/test/, RLS policies
isolamento cross-tenant                                        tenants; falha se qualquer query
                                                               cruzar fronteira.

Sem monitoramento de erros em            MÉDIO       M2        Integrar Sentry (ou equivalente) no          supabase/functions/*
produção                                                       cliente e nas edge functions.

15 queries no Dashboard                  MÉDIO       M2        Consolidar via RPC agregadora                src/hooks/useDashboa
degradam TTFB                                                  derivada de eventos primários (I7).          rdAggregates.ts

LGPD apenas conceitual — sem              ALTO       M4        Nomear DPO, escrever RIPD, expor             supabase/functions/da
DPO, RIPD ou canal do titular                                  canal, exercitar edge data-retention.        ta-retention/

Lock-in em Supabase / Lovable            MÉDIO       M3        Migrations versionadas + plano de            .lovable/OPERA_COR
                                                               exit documentado; abstrair auth.             E.md §8

Sem restore de backup validado           MÉDIO       M2        Executar restore trimestral em               Supabase backups
                                                               ambiente isolado; documentar
                                                               RPO/RTO reais.


Próximos Passos (7 / 30 / 90 dias)

Horizonte           Ação                                                                                                 Marco

7 dias              Rodar 1 fechamento mensal real; terceiro re-executa hash SHA-256; iniciar migração                   M1
                    de domínio próprio.

30 dias             Piloto pago em obra real; contrato de piloto + SLA mínimo + runbook de onboarding                    M1
                    documentados. Fecha M1.

90 dias             Suite de testes RLS cross-tenant em CI; Sentry ativo; role auditor introduzida; primeiro             M2
                    restore trimestral executado.
```

### Página 7

```text
Anexo A — Rastreabilidade de Critérios

Cada critério de prontidão aponta para o artefato que o comprova ou para a lacuna explícita.

Marco      Critério                                                Evidência / Lacuna

M0         Invariantes codificadas                                 .lovable/OPERA_CORE.md v1.3 (I1–I11)

M0         RLS ativa + GRANTs                                      .lovable/memory/security/rls-access-validation.md

M0         Append-only histórico                                   system_events, audit_logs_db, periodos_reaberturas

M0         Hash SHA-256 estruturado                                periodos_fechados.hash_snapshot (estrutura, sem prova
                                                                   real)

M0         Observabilidade causal                                  src/lib/observability.ts, correlation_id em edges

M1         Fechamento real com hash                                ■ não executado

M1         CSV validado por cliente                                ■ edge export-csv pronto, sem cliente

M1         Piloto ≥ 30 dias em produção                            ■ não iniciado

M1         Contrato + SLA + onboarding                             ■ não escrito

M1         Domínio próprio                                         ■ ainda opera-atlas.lovable.app

M2         Testes RLS cross-tenant                                 ■ src/test/ não cobre isolamento

M2         Monitoramento de erros                                  ■ sem Sentry

M2         Restore de backup validado                              ■ nunca testado

M2         Role auditor                                            ■ não existe

M2         CSV incremental                                         ■ export-csv exporta full, sem delta

M2         DPA padrão                                              ■ não redigido

M3         Pentest externo                                         ■ não realizado

M3         Métricas de negócio                                     ■ MRR/churn/NPS não instrumentados

M3         Plano de exit lock-in                                   ■ OPERA_CORE §8 lista riscos, sem plano formal

M4         DPO nomeado + RIPD                                      ■ não existe

M4         Canal do titular                                        ■ não implementado

M4         Retenção auditada                                       ■ edge data-retention existe, não certificada

M4         SGSI ISO 27001                                          ■ não iniciado
```

### Página 8

```text
Anexo B — Por que Marcos, e não Features

O Diagnóstico Objetivo (documento anterior) organiza o estado do Atlas por feature (baseline, hash,
CSV, Copiloto, RLS, invariantes). Isso responde bem à pergunta "o que existe?", mas não responde "o
que precisa existir para vender / captar / certificar?".
Este roadmap reorganiza os mesmos fatos por marco de maturidade empresarial. Uma feature só
importa na medida em que destrava um marco. O critério deixa de ser "a funcionalidade X está pronta" e
passa a ser "o estágio X do negócio é sustentável".

Diagnóstico Objetivo                                              Roadmap de Maturidade

Organizado por feature (baseline, hash, CSV, RLS…)                Organizado por marco (M0…M4)

Responde: o que já existe?                                        Responde: o que destrava a próxima fase comercial?

Critério: implementado / não implementado                         Critério: marco atingido / em curso / futuro

Público: arquiteto, tech lead                                     Público: investidor, cliente enterprise, DPO, auditor

Alinhado a OPERA_CORE §2 (invariantes)                            Alinhado a OPERA_CORE §8 (soberania) + §9
                                                                  (aceitação)


Conclusão
Os dois documentos são complementares: o Diagnóstico responde "qual é o estado técnico?"; este
Roadmap responde "qual é a próxima barreira empresarial e o que ela custa?". Ambos devem ser lidos
juntos em qualquer conversa de piloto pago, investimento ou certificação.
```
