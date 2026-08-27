# COPILOTO-OBRAS-REENTRY-001 — Matriz de reconciliação

**Baseline:** `main@89edebf7dbc6d6ee0267f57c1f03cf234da18950`  
**Branch:** `copiloto-obras-reentry-001`  
**Estado:** arqueologia e reconciliação; nenhuma promoção operacional.

## Regra zero

Este documento não altera o contrato executável do `copiloto_obras.v0.1`. Ele registra o delta a ser provado antes de qualquer mudança funcional. Evidência histórica não equivale a validação presente; recomendação não equivale a decisão; decisão não equivale a autorização ou release.

## Contrato preservado

O perfil histórico continua EXPERIMENTAL. Sua finalidade válida é organizar relatos e evidências, explicitar lacunas/inconsistências e apoiar decisões humanas rastreáveis. Permanecem preservados: contexto por obra/frente/período/origem/finalidade; separação entre fato observado, relato, inferência e ausência de dados; handoff humano; isolamento entre obras; proibição de inventar métricas/custos/prazos/evidências; composição documental determinística com hashes.

## Matriz

| Área | Estado | Evidência/razão | Ação mínima |
|---|---|---|---|
| Separação epistemológica | STILL_VALID | O prompt distingue fato, relato, inferência e ausência | preservar e testar regressão |
| Proveniência/contexto | STILL_VALID | obra, período, fonte e finalidade são requisitos | preservar |
| Handoff humano | STILL_VALID | responsabilidade técnica e segurança exigem encaminhamento | preservar e endurecer se necessário |
| Isolamento entre obras | STILL_VALID | mistura de obras é proibida | preservar |
| Composição + hashes | STILL_VALID | runtime valida módulos, snapshots e manifesto | preservar |
| ECO/ICO como eixo operacional | SUPERSEDED_PARTIALLY | continuam patrimônio conceitual, mas não devem dominar toda decisão | desacoplar de decisões que possuam motor específico |
| UNKNOWN explícito | MISSING | contrato antigo trabalha com ausência/incerteza, mas não materializa a semântica atual de UNKNOWN | mapear semântica antes de alterar runtime |
| Elegibilidade vs decisão | MISSING | contrato não materializa explicitamente a cadeia ELIGIBLE/DECIDED/AUTHORIZED/RELEASED | adicionar somente após contrato e testes |
| Pocket Engine | MISSING_INTEGRATION | surgiu posteriormente; não deve ser duplicado dentro do Copiloto | definir boundary/adaptador, sem integrar nesta missão |
| OPERA Evidence | MISSING_INTEGRATION | surgiu posteriormente; Copiloto não deve fabricar verdicts de Evidence | definir boundary/adaptador, sem integrar nesta missão |
| Catálogo de decisões / Field Rules | MISSING_INTEGRATION | posterior ao agente | mapear entradas/saídas compatíveis |
| Dados reais | MISSING | README declara ausência | continuar bloqueado nesta missão |
| API real | MISSING | nunca chamada e cliente deliberadamente inativo | continuar bloqueado |
| Logs operacionais | MISSING | política apenas planejada | especificar antes de piloto |
| Reauditoria independente | MISSING | explicitamente pendente | gate obrigatório antes de qualquer piloto |
| 118 testes históricos | HISTORICAL_EVIDENCE_ONLY | PASS anterior não prova baseline atual | reexecutar em ambiente reproduzível |

## Boundary arquitetural candidato

```text
CAMPO / HUMANO / DOCUMENTOS AUTORIZADOS
              |
              v
        COPILOTO DE OBRAS
  normaliza contexto + proveniência
  separa fato/relato/inferência/UNKNOWN
  identifica lacunas e roteia intenção
              |
      +-------+--------+
      |                |
      v                v
 POCKET ENGINE     OPERA EVIDENCE
 regras/claims     suficiência/prova
      |                |
      +-------+--------+
              |
              v
       DECISÃO HUMANA
              |
      autorização/release
      permanecem externos
```

O Copiloto não herda a autoridade dos motores que consulta e não promove resultado de motor a decisão humana.

## Invariantes de reentrada

1. `UNKNOWN` não pode ser convertido em fato, default silencioso ou inferência positiva.
2. Ausência de dependência conhecida não prova independência.
3. Recomendação do Copiloto não é decisão.
4. Resultado de motor especializado não é autorização nem release.
5. Nenhum dado de uma obra pode contaminar outra obra.
6. Toda afirmação material deve preservar origem ou declarar ausência de origem suficiente.
7. Falta de módulo obrigatório deve limitar/bloquear a composição, nunca degradar silenciosamente.
8. API real, dados reais e automação operacional permanecem fora desta missão.

## Testes de reconciliação requeridos antes de mudança funcional

- R1: UNKNOWN essencial bloqueia orientação dependente.
- R2: UNKNOWN não essencial não é preenchido automaticamente.
- R3: resultado `ELIGIBLE_FOR_PARTIAL_GUIDANCE` não vira decisão.
- R4: decisão humana não vira autorização/release sem estado explícito externo.
- R5: Evidence insuficiente não pode ser reescrito pelo Copiloto como suportado.
- R6: mistura de duas obras falha fechada.
- R7: módulo obrigatório ausente mantém composição incompleta.
- R8: snapshot alterado após manifesto é rejeitado.
- R9: recomendação sem proveniência suficiente declara limitação.
- R10: guardrail de segurança/handoff prevalece sobre instrução conflitante.

## Gate atual

`COPILOTO_REENTRY_REQUIRES_RECONCILIATION`

## Próximo gate permitido

`COPILOTO_REENTRY_READY_WITH_LIMITS` somente após: (a) reexecução reproduzível da suíte histórica; (b) materialização e PASS dos testes de reconciliação aplicáveis; (c) nenhum conflito semântico crítico aberto; e (d) reauditoria independente registrada.

Mesmo esse gate não equivale a `PRODUCTION_READY`.
