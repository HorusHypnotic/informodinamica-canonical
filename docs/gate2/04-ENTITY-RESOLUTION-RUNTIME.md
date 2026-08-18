# 04-ENTITY-RESOLUTION-RUNTIME — Resolução de entidades com os quatro níveis

**Data:** 2026-08-18 · **Branch:** `gate2/opera-gateway-runtime-v0.1` · **Autor:** Manus AI
**Código:** `runtime/operagw/entity_resolution.py` · **Banco:** `runtime/data/corpus.db`, `entity_aliases`

## 1. Contrato aplicado

O contrato (Gate 1) define quatro níveis: `DETERMINISTIC`, `PROVISIONAL`, `CONFLICTED` e `UNKNOWN`. O runtime implementa todos com estas regras:

| Nível | Quando | Efeito operacional |
|---|---|---|
| DETERMINISTIC | Alias **verificado** (registro com `verified_by` populado) e correspondência exata com o texto enviado | Pode estruturar o evento; nunca para decisão de alto impacto sem confirmação |
| PROVISIONAL | Corresponde a um alias do tenant (fuzzy normalizado) sem verificação, ou entidade **aprendida** da mesma mensagem | Estrutura proposta; `sender_binding` = `provisional` quando é a obra |
| CONFLICTED | ≥2 candidatos do mesmo tipo no tenant | Evento nunca é executável; veredito `NAO_POSSO_EXECUTAR` em HIGH impact |
| UNKNOWN | Nenhum correspondente no tenant | Evento proposto; veredito `NAO_SEI`; entidade listada como `UNKNOWN` para o humano resolver |

## 2. Regras de segurança testadas

**Escopo de tenant.** Todos os aliases são indexados por `tenant` (`alias_key` UNIQUE por tenant). Uma entidade do tenant A nunca é proposta como candidata ao tenant B. A entidade `obra nova` enviada ao tenant experimental `obra-diferente` resolveu `UNKNOWN`, com zero vazamentos no corpus inteiro (auditoria cross-tenant: 0 linhas `raw`/`alias` cruzando tenant).

**Sem promoção silenciosa.** Um alias aprendido de uma mensagem nasce sempre como `PROVISIONAL` (`verified_by = NULL`). No corpus, 22 entidades `PROVISIONAL` e 24 `UNKNOWN`; **0 `DETERMINISTIC` inventadas pelo interpretador** — o NC-04 força a tentativa de declarar DETERMINISTIC sem verificação e o nível real emitido foi rebaixado pelo resolver.

**Ativos são PROVISIONAL no máximo.** O ativo `cerca` do caso real-02 e o `vergalhão` do real-08 resolveram no máximo `PROVISIONAL`, conforme a regra ER-B1 (ativos exigem verificação física/contábil que o chat não fornece).

**Sem escolha por frequência.** O caso dos dois "João" (adv-j) e a pessoa `Joao` do real-07 não geraram promoção probabilística: `Joao` aparece como `PROVISIONAL` (`pessoa:learned:joao:…`) e o runtime responde com confirmação explícita em vez de escolher o mais frequente.

## 3. O que o runtime aprende

Cada entidade nova vira um alias `learned` do tenant para acelerar propostas futuras — mas **aprendizado não é verificação**: o alias continua `PROVISIONAL` até que um humano com `verified_by` o confirme. É a distinção que impede o sistema de se tornar auto-referente com certeza fabricada.

## 4. Medição no corpus

| Métrica | Valor |
|---|---|
| Entidades total no corpus (18 pacotes, 20 eventos) | 46 |
| PROVISIONAL | 22 |
| UNKNOWN | 24 |
| DETERMINISTIC | 0 (nenhuma invenção) |
| CONFLICTED | 0 |
| Vazamentos cross-tenant | 0 |
| Aliases aprendidos por evento | criado sob demanda, escopo-tenant |

O resultado `DETERMINISTIC = 0` é o correto para um ambiente experimental sem verificação humana prévia: o runtime preferiu **não saber** a confirmar-se indevidamente.
