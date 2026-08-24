# Feedback Return Ledger

**Missão:** FEEDBACK-LOOP-001  
**Data de abertura:** 2026-08-24  
**Estado:** `OPEN / AWAITING_FIELD_OUTCOME`

## Função

Este ledger impede que resultados novos sejam despejados indistintamente no cânone. Cada claim relevante que surgir da remanufatura documental, do OPERA Evidence ou do ORACLE-001 deve receber uma decisão explícita de retorno.

## Estados permitidos

- `RETURN_TO_CANON` — evidência e gate suficientes para alterar/reforçar o núcleo canônico.
- `RETURN_TO_PRODUCT` — altera produto, protocolo, UX, coleta ou oferta, sem promover teoria.
- `PRESERVE_ONLY` — vale como registro histórico/experimental, mas não altera teoria nem produto.
- `REJECT` — claim rejeitado pelo gate; preservar a rejeição e a razão.
- `PENDING` — ainda sem evidência suficiente para arbitrar.

## Ledger inicial

| ID | Origem | Claim / descoberta | Evidência atual | Destino | Próximo gate |
|---|---|---|---|---|---|
| FR-001 | livros TDO recuperados | Evidência, rastreabilidade e auditabilidade possuem ancestralidade documental anterior ao OPERA Evidence | manuscritos históricos recuperados | `PRESERVE_ONLY` | comparação genealógica concluída |
| FR-002 | arqueologia documental | `OPERA Evidence` não deve ser projetado retroativamente como produto já existente nos manuscritos | proveniência + diferença de formulação/maturidade | `PRESERVE_ONLY` | manter regra de genealogia |
| FR-003 | ORACLE-001 | Um terceiro pode avaliar responsavelmente uma declaração de avanço usando Evidence Pack sem acompanhar a execução | ainda não executado | `PENDING` | teste de campo + avaliador cego |
| FR-004 | ORACLE-001 | Evidência mínima comum de obra é suficiente para sustentar existência de avanço | ainda não executado | `PENDING` | teste de campo |
| FR-005 | ORACLE-001 | Evidência mínima comum de obra é suficiente para sustentar magnitude percentual exata do avanço | ainda não executado | `PENDING` | teste de campo; não forçar percentual |
| FR-006 | produto | Protocolo de Evidence pode funcionar sem revalidar captura do OPERA Vision | decisão experimental atual; Vision fora do escopo do teste | `RETURN_TO_PRODUCT` provisório | observar execução do ORACLE-001 |
| FR-007 | remanufatura | Patrimônio recuperado pode informar experimento atual e receber outcome de volta de forma governada | ida do loop demonstrada; volta ainda não | `PENDING` | fechar FEEDBACK-LOOP-001 |

## Template de entrada

```text
ID:
Data:
Origem:
Claim:
Evidência:
Contradições/lacunas:
Decisão: RETURN_TO_CANON | RETURN_TO_PRODUCT | PRESERVE_ONLY | REJECT | PENDING
Justificativa:
Artefato afetado:
Gate humano:
Commit/issue relacionado:
```

## Regra de atualização

Nenhuma linha `PENDING` pode ser promovida apenas porque o resultado parece coerente com os manuscritos históricos.

A atualização deve registrar:

`claim anterior → evidência nova → decisão → destino → efeito produzido`

Se a evidência contradizer a expectativa, preservar a contradição. A retroalimentação inclui resultados negativos.

## Próxima entrada esperada

A próxima atualização deve vir do ORACLE-001 executado em campo. O resultado deverá preencher pelo menos FR-003, FR-004 e FR-005 e poderá criar novas linhas sobre lacunas de coleta, Evidence Pack e produto.
