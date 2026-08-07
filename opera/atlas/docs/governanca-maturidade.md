# OPERA Atlas — Governança de Maturidade Empresarial v1.1

**Estado documental:** `ACTIVE` — transcrição derivada de fonte `HISTORICAL`; não normativa
**Data de extração:** 31 de julho de 2026
**Fonte:** `archive/google-drive/Diagnóstico/OPERA_Atlas_Governanca_Maturidade_v1.1.pdf`
**SHA-256 da fonte:** `ad33db94d49befadd38b47d15e401ae7a28e57a027ce2360dfd2580c6d73e728`
**Extrator:** `pypdf 6.14.2`

> Esta transcrição facilita busca e navegação por agentes. Em caso de divergência de extração, consulte o PDF de origem. O conteúdo não redefine o Glossário Canônico, a TPC nem os protocolos.

## Resumo editorial

Organiza marcos, critérios mensuráveis, evidências, dependências e regras de promoção da maturidade do produto.

## Conexão editorial com TPC/TDO

Os critérios e evidências funcionam como representações compartilhadas (IDR-0002) para sustentar coordenação (IDR-0001) na evolução do produto. Não equivalem, por si, a Fliflexação (IDR-0007/MET-003) nem alteram seus critérios.

## Transcrição extraída

### Página 1

```text
                      OPERA Atlas
    Governança de Maturidade Empresarial

                   Evolução do Roadmap v1.0 → v1.1








Versão            1.1

Data              06/07/2026

Base              OPERA_CORE v1.3 · Roadmap de Maturidade v1.0

Tipo              Instrumento de governança contínua, evidence-based

Escopo            OPERA Atlas (não inclui Copiloto/Compass)
```

### Página 2

```text
1. Painel Executivo

Leitura de 30 segundos. Cada linha responde à pergunta central: onde o Atlas está, o que impede o próximo
marco e qual a evidência disso?


        Posição atual                           M0 concluído · M1 em curso

        Maturidade global                       ~32% (M0 100% + M1 ~60%, ponderado por peso equivalente entre
                                                marcos)

        Próximo marco                           M1 — Pré-piloto Pago

        Bloqueador principal                    Hash SHA-256 de fechamento nunca reproduzido em obra real por
                                                terceiro (critério M1-02)

        Previsão de conclusão de M1             4–6 semanas, condicionada a existir 1 cliente piloto ativo

        Risco geral                             MÉDIO-ALTO — estrutura pronta, execução real ausente

        Tendência                               > ascendente — invariante I11 e função verificar_hash_periodo
                                                entregues após v1.0


Indicadores executivos

          Marcos concluídos             Critérios concluídos           Critérios bloqueados           Riscos críticos (Alto)

                 1 / 5                  9 / 28 (~32%)                             3                              3
           Débitos técnicos             Evidências auditadas          Evidências pendentes
                críticos
                    2                              6                             12
```

### Página 3

```text
2. Índice de Maturidade por Marco

Cada marco expõe: percentual de conclusão, critérios OK / parcial / aberto, bloqueadores, nível de risco e
evidência-chave. Percentual = critérios concluídos ÷ critérios totais do marco.

        M0 — Fundação Técnica                                                                                  100%



       Concluídos              ✔ Invariantes I1–I11 codificadas
                               ✔ RLS em 22+ tabelas
                               ✔ Estrutura de hash SHA-256
                               ✔ Eventos causais (system_events)
                               ✔ Soft-delete padrão

       Parciais                —

       Abertos                 —

       Bloqueador              Nenhum

       Risco                   BAIXO

       Evidência-chave         OPERA_CORE.md v1.3 · migrations aplicadas

        M1 — Pré-piloto Pago                                                                                   60%



       Concluídos              ✔ Export CSV funcional
                               ✔ Estrutura de fechamento (periodos_fechados + hash)
                               ✔ UI administrativa de fechamento

       Parciais                ! Domínio próprio
                               ! Onboarding documentado

       Abertos                 ✖ Hash reproduzido em obra real
                               ✖ Piloto 30 dias executado
                               ✖ Contrato piloto assinado

       Bloqueador              Ausência de cliente piloto ativo com fechamento real

       Risco                   MÉDIO-ALTO

       Evidência-chave         periodos_fechados · verificar_hash_periodo · export-csv

        M2 — Cliente Enterprise                                                                                8%



       Concluídos              —

       Parciais                ! CSV incremental (parcial via export-csv)

       Abertos                 ✖ Testes RLS cross-tenant em CI
                               ✖ Monitoramento Sentry
                               ✖ Role auditor
                               ✖ DPA assinado
                               ✖ Restore de backup testado

       Bloqueador              M1 não concluído

       Risco                   ALTO

       Evidência-chave         rls-access-validation.md (não testado)
```

### Página 4

```text
 M3 — Due Diligence Investidor                                                                       10%



Concluídos             ✔ §8 OPERA_CORE (débitos técnicos catalogados)

Parciais               —

Abertos                ✖ Revisão externa de código
                       ✖ Pentest
                       ✖ Métricas de negócio (MRR/churn/NPS)
                       ✖ Plano de contingência lock-in

Bloqueador             Base enterprise (M2) inexistente

Risco                  ALTO

Evidência-chave        OPERA_CORE §8

 M4 — Certificações (LGPD / ISO 27001)                                                               0%



Concluídos             —

Parciais               —

Abertos                ✖ RIPD
                       ✖ DPO nomeado
                       ✖ Política de retenção auditada
                       ✖ SGSI ISO 27001
                       ✖ Auditoria externa

Bloqueador             LGPD operacional inexistente

Risco                  ALTO

Evidência-chave        data-retention/index.ts (estrutura, não auditada)
```

### Página 5

```text
3. Critérios Mensuráveis

Cada requisito passa a ter ID único, prioridade, responsável, validação objetiva, dependências e status. Só
critérios de prioridade Alta bloqueiam a promoção de marco (§7).

   ID          Critério                      Prio     Responsável           Validação objetiva                    Dep.       Status
   M0-01       Invariantes I1–I11            Alta     Backend               Presente em                           —          Concluído
               codificadas                                                  OPERA_CORE.md v1.3 §3
   M0-02       RLS habilitado em             Alta     Backend               SELECT sem sessão retorna             —          Concluído
               todas tabelas públicas                                       vazio para 22+ tabelas
   M0-03       Export CSV funcional          Alta     Backend               Edge export-csv retorna 200 +         —          Concluído
                                                                            arquivo válido
   M0-04       Estrutura de hash             Alta     Backend               folha_pagamento() retorna             —          Concluído
               SHA-256                                                      campo hash determinístico
   M0-05       Eventos causais               Médi     Backend               system_events grava                   —          Concluído
               rastreáveis                   a                              correlation_id + causation_id
   M1-01       Fechamento real               Alta     Backend +             1 registro em                         M0-04      Aberto
               executado em obra                      Cliente piloto        periodos_fechados com
                                                                            hash_snapshot para obra real

   M1-02       Hash reproduzido por          Alta     Backend +             verificar_hash_periodo(id)            M1-01      Aberto
               terceiro                               Auditor               integro=true em 2 sessões
                                                                            distintas
   M1-03       CSV conferido pelo            Médi     Produto               Assinatura do cliente piloto no       M0-03      Pronto p/
               cliente                       a                              CSV exportado                                    execução
   M1-04       Domínio próprio               Médi     DevOps                DNS apontado + certificado TLS        —          Aberto
                                             a                              ativo
   M1-05       Onboarding                    Médi     Produto               Passo-a-passo publicado +             —          Parcial
               documentado                   a                              testado com 1 usuário externo
   M1-06       Contrato piloto               Alta     Comercial             PDF assinado por cliente +            —          Aberto
               assinado                                                     Atlas
   M2-01       Testes RLS                    Alta     Backend               bun vitest run verde com fixture      M1         Aberto
               cross-tenant em CI                                           de 2 tenants
   M2-02       Monitoramento Sentry          Alta     DevOps                Dashboard Sentry recebendo            —          Aberto
               ativo                                                        erros em produção
   M2-03       Role auditor                  Alta     Backend               app_role='auditor' + policies         —          Aberto
               implementada                                                 read-only cross-obra
   M2-04       CSV incremental (delta)       Médi     Backend               export-csv aceita                     M0-03      Parcial
                                             a                              since=timestamp e retorna delta
   M2-05       DPA assinado com              Alta     Jurídico              Contrato de processamento de          —          Aberto
               cliente enterprise                                           dados registrado
   M2-06       Restore de backup             Alta     DevOps                Restore em ambiente staging +         —          Aberto
               testado                                                      hash íntegro pós-restore
   M3-01       Revisão externa de            Alta     Auditor externo       Relatório assinado por terceiro       M2         Aberto
               código                                                       independente
   M3-02       Pentest executado             Alta     Segurança             Laudo de pentest com CVEs             M2         Aberto
                                                                            corrigidos ou aceitos
   M3-03       Métricas de negócio           Alta     Produto               Dashboard interno com séries          M1         Aberto
               (MRR/churn/NPS)                                              mensais de 3 meses
   M3-04       Plano de contingência         Médi     Arquitetura           Documento com estratégia de           —          Aberto
               lock-in                       a                              saída Supabase + estimativa
   M3-05       Contratos críticos            Alta     Jurídico              MSA, SLA e termos publicados          M1-06      Aberto
               formalizados                                                 e assinados
   M4-01       RIPD publicado                Alta     DPO                   Relatório de Impacto à Proteção       M3         Aberto
                                                                            de Dados aprovado
```

### Página 6

```text
ID          Critério                      Prio      Responsável           Validação objetiva                      Dep.       Status

M4-02       DPO nomeado                   Alta      Jurídico              Portaria + contato público              —          Aberto
                                                                          publicado

M4-03       Política de retenção          Alta      Auditor               data-retention/index.ts auditado        M2-06      Aberto
            auditada                                                      + logs de execução

M4-04       SGSI ISO 27001                Alta      Segurança             Manual do SGSI + matriz de              M3         Aberto
            implantado                                                    riscos aprovada

M4-05       Auditoria externa ISO         Alta      Auditor               Certificado emitido por                 M4-04      Aberto
            27001                                   certificador          organismo credenciado
```

### Página 7

```text
4. Mapa de Dependências

A sequência linear entre marcos é apenas parte da história. Existe uma cadeia crítica de destravamento que
atravessa marcos e determina o ritmo real de evolução.
4.1 Sequência entre marcos

                     M0         >         M1         >        M2         >         M3         >        M4


4.2 Cadeia crítica de destravamento

                                                                                                                    Due
                                                                                                                    Dilig
       Hash reproduzido (M1-02)        >   Piloto Pago (M1)                >   Cliente Enterprise (M2)         >    enc
                                                                                                                    e
                                                                                                                    (M3)

       Testes RLS cross-tenant         >   Cliente Enterprise (M2)
       (M2-01)

       Retenção auditada (M4-03)       >   Certificações (M4)

       Restore backup (M2-06)          >   Retenção auditada (M4-03)       >   Certificações (M4)

5. Evidências Normalizadas

Toda evidência segue um padrão único: tipo · origem · localização · comprova · data · validade. Evidências
sem localização rastreável não valem promoção de marco.

      ID        Tipo          Origem      Localização / Descrição                   Comprova          Data       Validad
                                                                                                                 e
      E-01      Migration     Supabas     periodos_fechados                         M0-04 · M1-01     2026-05    Perene
                              e           (hash_snapshot, versao,
                                          reaberto_em)
      E-02      Função DB     Supabas     folha_pagamento() retorna hash            M0-04             2026-05    Perene
                              e           SHA-256 determinístico
      E-03      Função DB     Supabas     verificar_hash_periodo()                  M1-02             2026-05    A
                              e           reexecuta e compara                       (mecanismo)                  auditar
      E-04      Edge          Supabas     supabase/functions/export-csv/i           M0-03 · M1-03     Ativa      Perene
                Function      e           ndex.ts
      E-05      Constitucio   Repo        .lovable/OPERA_CORE.md v1.3               M0-01             2026-05    Perene
                nal                       (I1–I11)                                                    -30
      E-06      Migration     Supabas     system_events (correlation_id,            M0-05             2026-04    Perene
                              e           causation_id)
      E-07      Função DB     Supabas     reabrir_periodo() +                       M0-04             2026-06    Perene
                              e           refechar_periodo()                        estrutural
      E-08      Edge          Supabas     supabase/functions/data-retenti           M4-03             Ativa      A
                Function      e           on/index.ts                               (mecanismo)                  auditar
      E-09      Memória       Repo        .lovable/memory/security/rls-ac           M0-02 · M2-01     2026-05    A
                                          cess-validation.md                                                     auditar
      E-10      Document      /mnt/docu   OPERA_Atlas_Roadmap_Maturidade.           todos             2026-07    Perene
                o             ments/      pdf (v1.0)                                                  -06
      E-11      Document      /mnt/docu   OPERA_Atlas_Diagnostico_Objetiv           M0 · M1           2026-07    Perene
                o             ments/      o.pdf                                                       -06
      E-12      Pendente      —           Hash reproduzido em obra real             M1-02             —          Penden
                                          por terceiro                                                           te
```

### Página 8

```text
ID       Tipo          Origem      Localização / Descrição                    Comprova          Data       Validad
                                                                                                           e
E-13     Pendente      —           Contrato piloto assinado                   M1-06             —          Penden
                                                                                                           te
E-14     Pendente      —           Suite Vitest RLS cross-tenant              M2-01             —          Penden
                                                                                                           te
E-15     Pendente      —           Laudo de pentest                           M3-02             —          Penden
                                                                                                           te
E-16     Pendente      —           RIPD assinado por DPO                      M4-01 · M4-02     —          Penden
                                                                                                           te
E-17     Pendente      —           Certificado ISO 27001                      M4-05             —          Penden
                                                                                                           te
E-18     Pendente      —           Log de restore de backup                   M2-06 · M4-03     —          Penden
                                   validado                                                                te
```

### Página 9

```text
6. Critério Formal de Mudança de Marco


Um marco só transita para "atingido" quando todas as condições abaixo são satisfeitas simultaneamente:

(a) Todos os critérios de prioridade Alta deste marco estão com status Concluído e possuem evidência
auditada (validade = Perene ou A auditar concluída).
(b) Nenhuma dependência crítica listada em §4 permanece aberta.
(c) Todas as evidências obrigatórias existem em §5 com localização rastreável (não "Pendente").
(d) Nenhum bloqueador classificado como Alto permanece registrado no índice §2.

Critérios de prioridade Média ou Baixa podem transitar para "débito técnico documentado" sem impedir a
promoção do marco — desde que registrados no histórico §7 e no §8 do OPERA_CORE.

7. Histórico de Evolução

Log incremental. Cada versão registra apenas o que mudou. Acompanhamento sem releitura integral.

       Versão     Data              Mudança                                                                       Status

       v1.0       2026-07-06        Roadmap inicial publicado. M0 declarado concluído. Marcos M1–M4               publicado
                                    com critérios textuais e gaps identificados.

       v1.1       2026-07-06        Governança contínua ativada: IDs de critério (M0-01 … M4-05),                 publicado
                                    evidências normalizadas (E-01 … E-18), painel executivo, critério formal
                                    §6, cadeia crítica de dependências.

       v1.2       —                 + Hash reproduzido em obra real (M1-02) · E-12 promovida a auditada.          reservado

       v1.3       —                 + Domínio próprio (M1-04) · + Onboarding validado (M1-05).                    reservado

       v1.4       —                 + Contrato piloto assinado (M1-06) · E-13 promovida.                          reservado

       v1.5       —                 → M1 atingido conforme §6.                                                    reservado

8. Como Atualizar Este Documento

• Cada avanço real gera: (1) uma linha nova em §7, (2) atualização de status do critério em §3, (3) promoção da
evidência correspondente em §5, (4) revisão do painel executivo em §1.
• Nenhuma mudança de status de marco pode ocorrer sem passar pelas quatro condições do §6.
• Novas evidências recebem o próximo ID sequencial (E-19, E-20, …). IDs não são reciclados.
• Novos critérios recebem o próximo ID do marco (ex. M1-07).
• Este PDF é regerado, não editado à mão. Script versionado em /tmp/gen_gov.py.
• A cadência mínima recomendada de atualização é semanal enquanto M1 estiver aberto, e mensal a partir de
M2.

Anexo — Diferença v1.0 → v1.1

       Aspecto                Roadmap v1.0                                Governança v1.1

       Natureza               Documento estático                          Instrumento vivo

       Critérios              Texto livre por marco                       ID único, prioridade, validação objetiva,
                                                                          dependências, status

       Evidências             Menções pontuais no corpo                   Tabela E-01 … E-18 com localização, data e
                                                                          validade

       Progresso              Descritivo                                  Percentual por marco + barra + KPIs executivos
```

### Página 10

```text
Promoção de                Implícita                                         Regra formal §6 com 4 condições obrigatórias
marco

Rastreabilidade            Anexo A textual                                   Cadeia crítica §4 + evidências rastreáveis §5

Histórico                  Não existe                                        §7 versionado, incremental

Público-alvo               Leitura interna                                   Investidor, cliente enterprise, auditor, equipe
```
