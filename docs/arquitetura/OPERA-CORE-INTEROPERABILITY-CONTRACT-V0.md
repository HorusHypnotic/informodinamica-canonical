# OPERA Core Interoperability Contract V0

**Estado:** `DRAFT` — proposta documental para prova manual
**Versão:** `0.0.1`
**Data:** 2026-08-11
**Implementação:** inexistente e não autorizada

## 1. Objetivo

Definir o menor envelope comum capaz de correlacionar representações de Copiloto, Control, Atlas e Cofre sem unificar bancos, IDs internos, schemas ou ciclos de vida. O contrato impede incompatibilidade acidental enquanto preserva autonomia.

Este arquivo é um **contrato necessário** para uma futura prova. Não demonstra **infraestrutura necessária**. A execução V0 deve ser possível por JSON/Markdown revisado manualmente.

## 2. Fora do escopo

Não define API, endpoint, banco central, sincronização, webhook, fila, retry, event bus, Kafka, autenticação federada, Supabase compartilhado, storage compartilhado, Kernel, API gateway ou resolução automática de conflitos.

## 3. Princípios

1. IDs locais permanecem imutáveis e autoritativos em sua origem.
2. `canonical_obra_id` é uma referência de correlação governada por manifesto, não chave primária global implementada.
3. Nome legível nunca é chave.
4. Ausência, desconhecido, não aplicável e não ocorrência são estados distintos.
5. Fato, inferência, decisão e snapshot são tipos distintos.
6. Período sempre declara início, fim e timezone.
7. Toda transformação preserva origem e o ID do registro anterior.
8. Idempotência documental usa `package_id` e `external_id`; não pressupõe serviço.
9. Hash só é obrigatório quando o payload estiver congelado e a serialização estiver declarada.
10. Nenhum consumidor se torna owner por receber ou copiar dados.

## 4. Identidade mínima da obra

```json
{
  "canonical_obra_id": "obra:dirceu-engenharia:galpao-quadruplo-domingos",
  "display_name": "Galpão Quádruplo do Domingos",
  "aliases": [
    {
      "source_system": "copiloto",
      "external_obra_id": "UUID_LOCAL_A",
      "verified_by": "HUMAN_ACTOR_REF",
      "verified_at": "2026-08-14T17:00:00-03:00",
      "verification_basis": "descrição curta da evidência"
    },
    {
      "source_system": "atlas",
      "external_obra_id": "UUID_LOCAL_B",
      "verified_by": "HUMAN_ACTOR_REF",
      "verified_at": "2026-08-14T17:00:00-03:00",
      "verification_basis": "descrição curta da evidência"
    }
  ],
  "created_at": "2026-08-11T00:00:00-03:00",
  "metadata": {
    "organization_ref": "dirceu-engenharia",
    "status": "provisional"
  }
}
```

### Regras

- formato proposto de `canonical_obra_id`: string opaca, estável e não reciclável;
- o exemplo acima é ilustrativo e não registra correspondência real;
- `external_obra_id` é obrigatório por alias;
- `source_system` permitido inicialmente: `copiloto`, `control`, `atlas`, `cofre`, `vision`, `smart_cotacoes`, `obra_flow`, `manual`;
- Control pode omitir alias de obra até possuir referência local, mas o pacote deve carregar `canonical_obra_id` verificado externamente;
- qualquer troca com alias não verificado deve usar `identity_status: "unverified"` e não pode ser agregada automaticamente.

## 5. Envelope mínimo

```json
{
  "contract": "opera-core-interoperability/v0",
  "package_id": "uuid",
  "record_type": "registro|evento|evidencia|analise|decisao|snapshot|fechamento|rejeicao",
  "canonical_obra_id": "string",
  "identity_status": "verified|provisional|unverified|conflicted",
  "period": {
    "kind": "day|quinzena_operacional|periodo_atlas|custom",
    "start": "2026-08-03",
    "end": "2026-08-14",
    "timezone": "America/Sao_Paulo"
  },
  "origin": {
    "source_system": "copiloto",
    "external_id": "string",
    "external_obra_id": "string|null",
    "recorded_at": "RFC3339",
    "actor": "opaque actor reference|null"
  },
  "lineage": {
    "parent_package_id": "uuid|null",
    "parent_external_id": "string|null",
    "transformation": "captured|classified|rejected|diagnosed|frozen|exported|curated"
  },
  "payload": {},
  "evidence": [],
  "integrity": {
    "serialization": "none|json-c14n-profile-to-be-approved",
    "sha256": "hex|null",
    "frozen_at": "RFC3339|null"
  },
  "created_at": "RFC3339"
}
```

## 6. Campos e invariantes

| Campo | Obrigatório | Invariante |
|---|---|---|
| `contract` | sim | valor exato da versão |
| `package_id` | sim | UUID único no conjunto da prova; reenvio mantém o mesmo valor |
| `record_type` | sim | não inferido pelo destino |
| `canonical_obra_id` | sim | deve existir no manifesto da prova |
| `identity_status` | sim | conflito bloqueia agregação |
| `period` | sim | `start <= end`; timezone IANA |
| `origin.source_system` | sim | namespace explícito |
| `origin.external_id` | sim | ID original, nunca reescrito pelo consumidor |
| `origin.external_obra_id` | condicional | requerido quando a origem possui obra local |
| `actor` | recomendado | referência opaca; não usar e-mail como identidade canônica |
| `lineage` | sim | transformação e pai quando derivado |
| `payload` | sim | schema pertence ao produtor/tipo; contrato V0 não uniformiza domínio |
| `evidence` | não | cada item deve declarar origem e integridade quando disponível |
| `integrity` | sim | hash nulo enquanto rascunho; hash não nulo somente após congelamento |
| `created_at` | sim | instante de criação do envelope, distinto do evento |

## 7. Tipos mínimos de payload

### Ocorrência Copiloto

Deve carregar descrição observável, momento, categoria local, evidência disponível e estado de incerteza. Não contém `eco: true` por padrão.

### Classificação Control

Deve referenciar o pacote de ocorrência e registrar:

- `decision: accepted_as_eco | rejected_as_eco | insufficient_evidence`;
- justificativa humana;
- ECO local criado, se houver;
- `ICO_campo` e componentes, se calculados;
- responsável/ação, se definidos;
- versão da regra/fórmula.

### Snapshot/fechamento

Deve declarar `period.kind`, regra de inclusão, produto owner, estado (`draft|frozen|reopened|superseded`), hash quando congelado e referência da reabertura/substituição. `quinzena_operacional` e `periodo_atlas` nunca são convertidos automaticamente um no outro.

### Custódia Cofre

Deve referenciar o pacote original, caminho relativo ou locator autorizado, hash conferido, data de custódia e responsável. O Cofre não altera o payload congelado; curadoria adicional é novo pacote derivado.

## 8. Evidência

Cada entrada de `evidence` deve usar:

```json
{
  "evidence_id": "string",
  "kind": "photo|document|note|export|database_record|other",
  "source_system": "string",
  "external_id": "string|null",
  "captured_at": "RFC3339|null",
  "actor": "opaque reference|null",
  "locator": "relative-or-authorized-locator",
  "sha256": "hex|null",
  "sensitivity": "public|internal|restricted",
  "availability": "available|missing|inaccessible|not_collected"
}
```

URLs públicas, tokens e paths pessoais não devem ser incorporados sem necessidade. O contrato registra ausência sem inventar conteúdo.

## 9. Validação e rejeição

Um pacote é rejeitado antes de consumo quando:

- contrato/versão desconhecido;
- obra ausente ou identidade em conflito;
- origem/ID externo ausentes;
- período inválido ou timezone ausente;
- derivação sem pai;
- hash declarado não confere;
- snapshot marcado congelado sem hash;
- ocorrência promovida a ECO sem decisão de classificação;
- payload contém dado sensível fora da autorização da prova.

Rejeição gera `record_type: "rejeicao"`, preserva o pacote original e não o corrige silenciosamente.

## 10. Fluxos permitidos V0

```text
Copiloto occurrence
  -> Control classification (optional)
  -> Atlas evidence/snapshot reference (optional)
  -> Cofre custody (optional and authorized)
```

Também são válidos:

```text
Copiloto -> Atlas
Copiloto -> Control
Control -> Cofre
Atlas -> Cofre
Copiloto somente
```

O roteamento depende da necessidade observada. Nenhum fluxo é automático.

## 11. Relações periféricas futuras

- Vision consome identidade e estados como referência; seus IDs locais continuam próprios.
- Smart Cotações produz decisão/compra aprovada como evento de suprimento referenciado.
- Obra Flow consome a obra e produz pedido/recebimento/estoque com origem e ID externo.

Nenhum desses fluxos integra a V0 nem foi implementado.

## 12. Critério para considerar infraestrutura

Infraestrutura compartilhada só deve ser proposta após uma prova manual demonstrar pelo menos dois consumidores reais com a mesma necessidade e registrar volume, frequência, falhas de entrega, idempotência, segurança e recuperação. Até lá, arquivos versionados e revisão humana são suficientes.

## 13. Compatibilidade e revisão

O contrato respeita a separação `acesso ≠ organização ≠ obra ≠ recurso ≠ alocação ≠ autorização` de `DEC-ARQ-002`. `canonical_obra_id` é identidade cadastral arquitetural e não redefine Identidade Operacional (`IDR-0013`, ainda Draft). ECO/ICO preservam IDs e definições canônicas; MDEO/TRO não são promovidos. Antes de `0.1.0`, o exemplo deve ser testado com uma obra fictícia e revisão humana, sem tocar a quinzena real.
