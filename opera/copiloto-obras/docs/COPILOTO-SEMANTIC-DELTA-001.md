# COPILOTO-SEMANTIC-DELTA-001

## Status

DESIGN_ONLY — nenhuma mudança de runtime é autorizada por este documento.

## Entrada empírica

No commit `905dd34090813d65c88c8bf445950247f16b1236`, a suíte completa coletou 128 testes: 123 PASS e 5 FAIL. R1–R10 isolados: R1–R5 FAIL; R6–R10 PASS. A suíte histórica permaneceu íntegra; as cinco falhas medem semânticas posteriores ao agente original.

## Princípio

Não tornar o Copiloto um Pocket Engine nem um OPERA Evidence embutido. O Copiloto é a fronteira conversacional/orquestradora que preserva contexto, proveniência, incerteza e resultados externos sem usurpar a autoridade do produtor desses resultados.

## Delta mínimo por falha

### D1 — UNKNOWN de primeira classe — fecha R1/R2

O Copiloto precisa conseguir REPRESENTAR UNKNOWN explicitamente.

Contrato mínimo candidato:

```python
class KnowledgeState(StrEnum):
    KNOWN = "KNOWN"
    UNKNOWN = "UNKNOWN"
```

Regras:
- `UNKNOWN` nunca é convertido em fato, `False`, zero, string vazia ou default silencioso.
- ausência de dependência conhecida não prova independência;
- se orientação depender de UNKNOWN essencial, o Copiloto deve preservar o bloqueio recebido do motor competente ou solicitar esclarecimento;
- o Copiloto não calcula sozinho dependência normativa.

### D2 — resultado do Pocket como envelope externo — fecha R3

Contrato candidato:

```python
class GuidanceEligibility(StrEnum):
    BLOCKED = "BLOCKED"
    ELIGIBLE_FOR_PARTIAL_GUIDANCE = "ELIGIBLE_FOR_PARTIAL_GUIDANCE"
    ELIGIBLE = "ELIGIBLE"
```

O valor é consumido/preservado pelo Copiloto; sua autoridade pertence ao motor que o produziu. `ELIGIBLE_FOR_PARTIAL_GUIDANCE` não cria `HumanDecision`.

### D3 — lifecycle de autoridade externo — fecha R4

Contrato candidato:

```python
class AuthorityState(StrEnum):
    UNDECIDED = "UNDECIDED"
    DECIDED = "DECIDED"
    AUTHORIZED = "AUTHORIZED"
    RELEASED = "RELEASED"
```

Invariante: `DECIDED != AUTHORIZED != RELEASED`.

O Copiloto pode registrar/transportar estados, mas não avançá-los implicitamente. `HumanDecision` registra decisão humana; autorização e release exigem eventos/autoridades explícitos externos ao ato de recomendar.

### D4 — verdict do Evidence como envelope externo — fecha R5

Contrato candidato:

```python
class EvidenceVerdict(StrEnum):
    SUPPORTED = "SUPPORTED"
    SUPPORTED_WITH_EXCEPTION = "SUPPORTED_WITH_EXCEPTION"
    INSUFFICIENT_EVIDENCE = "INSUFFICIENT_EVIDENCE"
    CONFLICTING_EVIDENCE = "CONFLICTING_EVIDENCE"
    NOT_VERIFIABLE = "NOT_VERIFIABLE"
```

O Copiloto NÃO calcula esse verdict. Ele recebe, preserva origem/versão e impede promoção semântica. `INSUFFICIENT_EVIDENCE` jamais pode ser apresentado como `SUPPORTED`.

## Envelope de interoperabilidade candidato

Qualquer resultado especializado consumido pelo Copiloto deve carregar no mínimo:

- `producer` — motor/autoridade de origem;
- `schema_version`;
- `result_type`;
- `result_value`;
- `worksite_id`;
- `created_at`;
- `provenance_reference`;
- `limitations`;

O Copiloto valida forma, escopo da obra e proveniência. Não recalcula o julgamento especializado para fazê-lo caber em sua resposta.

## Ownership semântico

| Semântica | Dono do julgamento | Papel do Copiloto |
|---|---|---|
| UNKNOWN | fonte/contexto + motor consumidor | preservar e não preencher |
| dependência/elegibilidade | Pocket Engine | transportar, explicar limites, pedir dados |
| suficiência/verdict de evidência | OPERA Evidence | transportar sem promover |
| recomendação conversacional | Copiloto | produzir dentro dos limites recebidos |
| decisão | humano autorizado | registrar sem converter em autorização |
| autorização | autoridade externa explícita | transportar estado |
| release | autoridade externa explícita | transportar estado |

## Mudança executável mínima proposta

1. adicionar enums/objetos de interoperabilidade, sem acoplar implementações dos motores;
2. adicionar armazenamento tipado dos envelopes à sessão;
3. validar `worksite_id`, proveniência e transições proibidas;
4. adaptar ResponsePlan para expor bloqueio/limitações sem promover resultados;
5. substituir os testes R1–R5 textuais por testes comportamentais sobre esses contratos;
6. manter R6–R10 como regressão;
7. rodar os 118 históricos + R1–R10 após cada patch.

## Não fazer nesta missão

- importar Pocket Engine como dependência;
- importar OPERA Evidence como dependência;
- duplicar regras de julgamento desses motores;
- conectar API, banco ou dados reais;
- alterar `main`;
- promover produção;
- tratar enum presente no código como prova suficiente de comportamento correto.

## Critério para patch

O patch só é admissível se fechar R1–R5 por comportamento, preservar R6–R10 e manter os 118 históricos verdes. O alvo de bancada é 128/128 PASS, mas 128/128 isoladamente NÃO promove o gate: ainda permanece necessária reauditoria independente conforme REENTRY-001.
