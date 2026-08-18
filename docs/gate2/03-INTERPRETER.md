# 03-INTERPRETER — Interpretação governada pelo schema

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Código:** `runtime/operagw/interpreter.py` + `runtime/operagw/validation.py`
**Fontes congeladas:** `docs/gate1/schemas/gateway-envelope-v0.1.schema.json` e `docs/gate1/schemas/event-types-v0.1.json` (Gate 1, estado FROZEN)

## 1. Posição do interpretador na cadeia

O interpretador é o **único ponto de não-determinismo** do runtime, e portanto o único que merece desconfiança arquitetada. Ele recebe o texto bruto e o tenant e devolve uma proposta de interpretação — que o runtime trata como hipótese, nunca como fato. Toda saída é revalidada contra o schema congelado; toda hipótese é reavaliada por camadas determinísticas de entidade, impacto, veredito e confirmação.

## 2. Mecânica

O runtime usa o provedor OpenAI (`gpt-5-mini`, referência `openai/gpt-5-mini`) em modo `json_object`, com o schema de eventos do Gate 1 embutido no system prompt para maximizar aderência estrutural. Importa mais o que vem **depois** da resposta:

1. **Pós-validação Draft 2020-12** da resposta completa contra `gateway-envelope-v0.1.schema.json` (com `$ref` em `event-types-v0.1.json` resolvido programaticamente). O `payload` de cada evento tem `additionalProperties: false` sobre as chaves conhecidas.
2. **Retry controlado**: até 2 tentativas com mensagem de erro de schema embutida no prompt, com `__retries` auditado no envelope. No corpus completo: **0 retries** em 18 chamadas (adivinhação estatística de 0,05 falhas esperadas — não é evidência de robustez).
3. **Atributos de auditoria**: `__model_ref`, `__interpretation_version`, `__raw_result` (cópia bruta da resposta) e `__ts` via `utcnow` são injetados no envelope.

## 3. O que o LLM NÃO governa

| Proposta do LLM | Tratamento |
|---|---|
| `event_type` inexistente | Rejeitado pelo enum do schema congelado (NC-01) |
| `confidence` > 1 ou fora de `confidence_level` | Rejeitado por enum/range (NC-03) |
| Entidade declarada DETERMINISTIC sem alias verificado | Rebaixada pela resolução de entidades (NC-04); o nível real do resolver prevalece |
| PAYMENT classificado LOW impact | `assess()` força `HIGH` e `MANDATORY` (NC-05) |
| Rota inexistente | Fallback obrigatório R-TRI-999 (triagem) (NC-06) |
| Tenant ausente na captura | Rejeição pré-interpretação (NC-07) |
| `package_id` divergente da captura | Detecção por chave do pacote; `lineage.parent_package_id` único (NC-08) |
| `raw` diferente do recebido | `sha256_declared` recalculado e comparado (NC-09); rejeição `schema_rejected` |
| `event_id` fora do padrão `^[0-9a-f-]{36}:\d+$` | Rejeitado pelo regex do schema (NC-11) |
| Chave extra no payload | Rejeitada por `additionalProperties: false` do schema de eventos (NC-12) |
| JSON sintaticamente inválido | Rejeição antes de qualquer consumo (NC-02) |
| Prompt injection | O fluxo nunca executa instruções encontradas no texto; respostas seguem apenas a estrutura proposta pelo usuário (NC-13) |

Nos 13 ataques de não-conformidade (doc 09), **todos foram bloqueados antes de gerar evento operacional**.

## 4. Ponto fraco documentado

A chave `entities` permite lista vazia (schema válido). O runtime compensa com `assessment`: eventos sem entidades resolvidas recebem veredito `NAO_SEI` e a entidade desconhecida é proposta por BLOCKED_ASK (caso adv-e). Não é um risco de segurança no Gate 2; é uma área de melhoria do schema candidata a errata futura.

## 5. Separabilidade do Gate 1

O interpretador lê os schemas congelados por caminho relativo ao repositório (`docs/gate1/schemas/`) e os valida por `$ref` — sem cópia normativa e sem edição. Se o schema v0.1 evoluir, o runtime v0.1 continua válido por ter sido executado contra a versão congelada registrada em `__interpretation_version`.
