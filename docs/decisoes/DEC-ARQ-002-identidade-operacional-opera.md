# DEC-ARQ-002 — Identidade Operacional do Ecossistema O.P.E.R.A.

**Status:** Aprovada
**Data da decisão:** 10 de agosto de 2026
**Escopo:** Arquitetura semântica do ecossistema O.P.E.R.A.
**Natureza:** Decisão arquitetural; não altera a ontologia teórica da TPC

## Contexto

As implementações atuais utilizam e-mail, `user_id`, `tenant_id`, `obra_id`, nomes legíveis e identificadores experimentais com semânticas locais. Esses identificadores não constituem, por si mesmos, a ontologia canônica do ecossistema.

O modelo deve suportar múltiplos usuários acessando uma organização, múltiplas obras por organização e recursos transferíveis entre obras sem mudança de identidade.

## Decisão

São conceitos semanticamente distintos:

1. identidade de acesso;
2. organização;
3. obra;
4. recurso;
5. alocação;
6. autorização.

```text
acesso ≠ organização
organização ≠ obra
obra ≠ recurso
recurso ≠ alocação
identidade ≠ autorização
```

## Entidades e relações

### Identidade de acesso

Representa o sujeito autenticável. E-mail é atributo mutável de autenticação ou contato e não é identidade canônica de organização, obra, recurso ou alocação.

### Organização

Representa o domínio operacional administrado. Uma construtora ou empresa pode ser representada como organização. “Empresa” não constitui automaticamente uma identidade paralela.

### Obra

Representa empreendimento ou unidade operacional com identidade própria, estável e persistente. Cada obra mantém vínculo explícito com uma organização.

### Recurso

Representa pessoa, ferramenta, equipamento ou outro ativo reutilizável ou compartilhável. O recurso mantém identidade própria, independentemente da obra em que esteja alocado.

### Alocação

Representa relação temporal entre um recurso e uma obra. Transferência encerra, substitui ou relaciona alocações; não cria novo recurso.

### Autorização

Representa o direito de uma identidade de acesso agir sobre uma organização, obra ou outro objeto. Alteração de autorização não altera a identidade dos objetos.

## Relação conceitual

```text
Identidade de acesso
        │
        └── vínculo/permissão ──> Organização
                                      │
                                      ├── múltiplas obras
                                      └── múltiplos recursos
                                                │
                                                └── alocações temporais
                                                    para obras
```

## Invariantes

- **INV-01:** E-mail é credencial ou atributo mutável de acesso e contato, não identificador canônico de usuário, organização, obra, recurso ou alocação.
- **INV-02:** Uma organização pode possuir ou administrar múltiplas obras.
- **INV-03:** Cada obra possui identidade própria, estável e persistente.
- **INV-04:** Recursos podem existir no nível organizacional e ser alocados temporalmente a diferentes obras.
- **INV-05:** Transferência entre obras não cria nova identidade para o recurso.
- **INV-06:** Todo fato específico de obra deve preservar referência inequívoca à obra correspondente.
- **INV-07:** Em transferências devem permanecer reconstruíveis recurso, origem, destino, vigência, autoria do registro e autoridade conhecida.
- **INV-08:** Autenticação, acesso, organização, obra, recurso, alocação e autorização são conceitos semanticamente distintos.
- **INV-09:** `tenant`, `user_id`, e-mail, nome legível, IDs locais e identificadores experimentais não são automaticamente identidades canônicas de outro conceito.
- **INV-10:** Múltiplos usuários podem acessar a mesma organização e obra sem alterar a identidade desses objetos.
- **INV-11:** Alterar e-mail, credencial, papel ou permissão não altera organização, obra ou recurso.
- **INV-12:** Empresa é denominação jurídica ou comercial possível de uma organização, não identidade concorrente automática.
- **INV-13:** Tenant é conceito de implementação cuja correspondência deve ser declarada por componente.
- **INV-14:** Recurso pessoa e identidade de acesso podem estar relacionados, mas não são equivalentes.
- **INV-15:** “Local atual” é projeção do histórico de alocações e não substitui esse histórico.
- **INV-16:** Restrições de simultaneidade pertencem às regras do tipo de recurso e não à definição universal de alocação.
- **INV-17:** IDs locais podem ser aliases, desde que sua correspondência conceitual seja explícita e rastreável.
- **INV-18:** Remover acesso não apaga autoria, autorização ou proveniência histórica.
- **INV-19:** Um fato de obra não pode ser atribuído somente por usuário, e-mail ou nome legível.
- **INV-20:** IDR-0013 — Identidade Operacional não designa identidade cadastral de usuário, organização, obra ou recurso.

## Compatibilidade

Esta decisão canoniza semântica, não implementação. Ela não declara que `tenant_id` deve ser renomeado, não prescreve banco global, não exige migration e não autoriza alteração de autenticação ou permissões.

`tenant` permanece um conceito de implementação até que sua semântica seja avaliada e declarada por componente.

Cada componente deverá futuramente declarar:

1. quais entidades canônicas representa;
2. quais IDs locais funcionam como aliases;
3. qual é a semântica local de tenant;
4. como preserva identidade de obra;
5. como representa recursos e alocações, quando aplicável.

## Consequências

- E-mail não pode funcionar como chave canônica de organização, obra, recurso ou alocação.
- Registros de obra devem preservar identidade inequívoca da obra.
- Recursos compartilháveis não adquirem nova identidade apenas por transferência.
- Schemas atuais são implementações locais, não fontes automáticas da ontologia.
- Mudanças técnicas futuras exigem missão e autorização próprias.
