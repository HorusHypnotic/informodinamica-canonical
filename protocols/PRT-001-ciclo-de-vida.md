# PRT-001 — Protocolo de Ciclo de Vida dos IDs

**Versão:** 0.1.0
**Data:** 26/07/2026
**Autor:** Eduardo Martins
**Status:** Protocolo canônico — vigente

---

## 1. Objetivo

Este protocolo define o ciclo de vida dos identificadores (IDR, LAW, HYP, MET) no Núcleo Canônico da Informodinâmica Aplicada. Ele estabelece as regras de criação, evolução, desativação e rastreabilidade de cada artefato.

---

## 2. Escopo

Aplica-se a todos os artefatos do Núcleo Canônico:

- **IDR** — Conceitos da ontologia.
- **LAW** — Proposições estruturantes.
- **HYP** — Hipóteses de pesquisa.
- **MET** — Métricas operacionais.

---

## 3. Estados

| Estado | Significado | Permissões |
|--------|-------------|------------|
| **Draft** | Em elaboração. Ainda não é referência oficial. | Pode ser alterado livremente. Não deve ser citado como canônico. |
| **Experimental** | Já utilizado em contextos práticos, mas sem validação robusta. | Pode ser citado, mas com ressalvas. |
| **Canônico** | Aprovado formalmente. É fonte da verdade. | Não pode ser alterado sem emenda documentada. |
| **Obsoleto** | Substituído por outro artefato. | Mantido para rastreabilidade. Não pode ser reutilizado. |

---

## 4. Transições

### 4.1. Draft → Experimental

**Critérios:**

1. O artefato foi utilizado em pelo menos uma aplicação (ex: OPERA, artigo, protocolo).
2. O artefato está registrado no manifesto da versão atual.

**Procedimento:** O autor registra a primeira utilização e atualiza o status no arquivo correspondente.

### 4.2. Experimental → Canônico

**Critérios:**

1. O artefato foi submetido a revisão por pares (formal ou informal).
2. O artefato está alinhado com o restante do Núcleo (sem contradições internas).
3. A transição foi registrada em um commit com mensagem explícita.

**Procedimento:** O autor submete o artefato para revisão, coleta o parecer e atualiza o status.

### 4.3. Canônico → Obsoleto

**Critérios:**

1. O artefato foi explicitamente substituído por outro.
2. A justificativa está documentada no manifesto da versão.

**Procedimento:** O autor marca o artefato como "Obsoleto" no arquivo original, cria um novo artefato com novo ID, e registra a substituição no manifesto.

---

## 5. Regras Gerais

1. **IDs são permanentes.** Um ID, uma vez atribuído, nunca é reutilizado.
2. **IDs são sequenciais.** O próximo ID segue o último usado.
3. **IDs obsoletos são preservados.** O arquivo não é apagado, apenas marcado como obsoleto.
4. **Rastreabilidade é obrigatória.** Todo commit que altera um artefato deve citar o ID correspondente.
5. **Primeira ocorrência.** A primeira vez que um termo é usado em qualquer documento canônico, deve-se citar seu ID.

---

## 6. Exemplo de Ciclo de Vida

```
IDR-0002 (Representação)
  → Draft (01/07/2026) — definição inicial
  → Experimental (10/07/2026) — usado no OPERA
  → Canônico (24/07/2026) — aprovado no manifesto v0.2.0
  → [em Canônico] — aguardando possível refinamento
```

---

**Versão:** 0.1.0
**Data:** 26/07/2026
**Autor:** Eduardo Martins
