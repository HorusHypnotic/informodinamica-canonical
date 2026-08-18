# OPERA Gateway Entity Resolution — v0.1

**Estado:** `FROZEN — GATE 1` · **Versão:** `entity-resolution/0.1`
**Fontes normativas:** doc 03 §4 (Gate 0); DEC-ARQ-002 (identidade operacional: `acesso ≠ organização ≠ obra ≠ recurso ≠ alocação ≠ autorização`; nome nunca é chave); arqueologia doc 01 (representações atuais por produto).

## 1. O que já existe (arquivos de entidade por produto)

| Entidade | Representações atuais (por banco) | Master único? |
|---|---|---|
| pessoa | `profiles` (Copiloto/Atlas), `colaboradores` (Copiloto), `stakeholders` (Direcione), `responsible TEXT` (REO) | **Não** |
| obra | `obras.id` UUID × 5 bancos distintos; nomes humanos ambíguos; manifest de aliases nunca preenchido | **Não** |
| material | `materiais` (Copiloto) + `canonical_materials`/`material_aliases` (Smart Cotações, com confidence) | Parcial (só Smart Cotações) |
| ativo | `missao_recursos` (Direcione, status sem master); `equipamentos` informal | **Não — BLOQUEIO DOCUMENTADO (ER-B1)** |
| fornecedor | `suppliers` (Smart Cotações), `stakeholders` (Direcione) | **Não** |
| empresa | `construtoras` (Direcione/Copiloto), `contractors` (REO) | **Não** |
| local | `localizacao TEXT`, GPS (REO/Copiloto), zonas (Vision) | **Não** |
| tarefa | `missoes`, `atividades`, `stages` | **Não** |

**ER-B1 — Bloqueio de master de ativos.** Não existe master de ativos/ferramentas em nenhum produto. Consequência de contrato: todo `ASSET_TRANSFER`/`ASSET_DAMAGE` resolve apenas para **classe de ativo + descrição**; ID canônico de ativo individual é impossível até que um master exista. O contrato registra o ativo como entidade `ativo` com `resolution_level` nunca superior a `PROVISIONAL` (classe) e o caso vai para confirmação simples ou triagem. Este bloqueio é explícito no corpus (CASE-01, ADVERSARIAL-E) e impede associação silenciosa.

**ER-B2 — Bloqueio de identidade entre produtos.** Sem federação de pessoas, "João" de um banco não prova ser o "João" de outro. Consequência: o gateway constrói **aliases próprios do gateway** (`entity_aliases`, manifesto V0 estendido) e nunca escreve IDs de produto A no destino B sem verificação humana registrada (`verified_by`/`verified_at`, padrão do envelope canônico).

## 2. Níveis de resolução (formalização dos 3 níveis)

| Nível | Condição | Comportamento | confidence |
|---|---|---|---|
| `DETERMINISTIC` | alias exato no dicionário (normalização minúsculo/sem acento), uma única correspondência verificada (`verified_by`/`verified_at` presente) | resolução direta, sem pergunta | 1.0 |
| `PROVISIONAL` | fuzzy match (similaridade + frequência de uso) acima de limiar, ou múltiplas candidatas plausíveis | proposta com 2–3 candidatos; **confirmação simples obrigatória** antes de write | 0.5–0.99 |
| `CONFLICTED` / `UNKNOWN` | zero correspondências, ou ambiguidade irreversível (nome de pessoa em duas equipes, obra homônima empresa/pessoa) | **bloqueio**: perguntar ao remetente; sem resposta → triagem; nunca associação silenciosa | < 0.5 |

**Nome textual nunca funciona como chave canônica definitiva.** Campo `display` é apenas para exibição; `resolved_id` só se preenche em `DETERMINISTIC`; em `PROVISIONAL` o envelope carrega `candidate_ids[]` e aguarda confirmação; em `CONFLICTED` `resolved_id` é `null` e `confirmation_requirement` é `BLOCKED_ASK`.

## 3. Entidades tratadas no contrato

O envelope suporta explicitamente `kind ∈ {obra, pessoa, material, ativo, fornecedor, empresa, local, tarefa}`. Para cada `kind` o nível de resolução acima se aplica. Regras específicas: **obra** exige binding tenant-first (obra pertence a um tenant por DEC-ARQ-002; fuzzy entre tenants é proibido — cross-tenant por similaridade de nome é violação crítica); **pessoa** exige binding canal↔ator (`sender_binding`) — pessoa não verificada no binding aparece como entidade nova, nunca herdada de outro produto; **material** reutiliza `canonical_materials`/`material_aliases` do Smart Cotações como fonte preferencial de aliases; **ativo** segue ER-B1; **empresa** resolve para tenant (não cria empresa nova silenciosamente).

## 4. Manifesto de aliases (memória de resolução)

Estrutura v0.1 (JSON versionado, evolui para tabela no GATE 4+):

```json
{
  "aliases_version": "0.1",
  "entries": [
    {
      "display": "domingos",
      "kind": "obra",
      "resolved_id": "obra:dirceu-engenharia:galpao-quadruplo-domingos",
      "tenant": "dirceu-engenharia",
      "source": "canonical_manifest|learned",
      "verified_by": "human_actor_ref",
      "verified_at": "RFC3339",
      "confidence": 1.0,
      "usage_count": 17
    }
  ]
}
```

Aprendizado por uso (`source: learned`) sempre entra como `PROVISIONAL` e exige verificação humana antes de promover a `DETERMINISTIC`. Este é o único mecanismo de "memória" do gateway no v0.1 — suficiente para o MVP e auditável.

## 5. Interações com o restante do contrato

Entity resolution alimenta `assessment.verdict`: entidade `CONFLICTED` em evento de qualquer tipo muda o veredito para `PRECISO_PERGUNTAR`; entidade `CONFLICTED` + HIGH-IMPACT muda para `NAO_POSSO_EXECUTAR` (write proibido). A resolução não altera `raw`, não altera `interpretation` (gambiarra de reescrita da interpretação original é proibida — uma nova resolução gera `interpretation_version` nova com `transformation: reconciled`).
