# Checkpoint de integração OPERA — 08/08/2026

**Estado documental:** `ACTIVE` — registro operacional datado e não normativo
**Escopo:** identidade, sincronismo e validação isolada dos produtos Lovable atuais
**Limite:** não altera teoria, glossário, produtos, software, Supabase ou ambientes Lovable

## Objetivo

Registrar o estado verificado da relação:

```text
Lovable
   ↕
repositório GitHub oficial
   ↕
clone local / VS Code
```

Este checkpoint distingue sincronização de repositório, funcionamento isolado de produto e integração funcional entre produtos. As três condições não são equivalentes.

## Estado verificado dos produtos

| Produto | Repositório oficial | Clone local | Branch | Commit validado | Build | Testes | Preview Lovable | Published | Ressalvas |
|---|---|---|---|---|---|---|---|---|---|
| Copiloto de Obras | `HorusHypnotic/copilotodeobras` | `D:\Projetos Github\copilotodeobras` | `main` | `5fc3249` — `fix: sincroniza lockfile npm do Copiloto` | Sucesso após instalação limpa | Automatizados ausentes | Funcionando | Não validado neste checkpoint | Não confundir com o runtime experimental em `opera/copiloto-obras/` |
| OPERA Control | `HorusHypnotic/opera-control` | `D:\Projetos Github\opera-control-official` | `main` | `ec87bf8` — `chore: consolida governança e segurança do OPERA Control` | Sucesso após instalação limpa | Script de testes ausente | Funcionando após sincronização dos bindings Cloud | Não validado; tratar separadamente do Preview | Não confundir com `opera-control-canonical-extract` |
| OPERA Atlas | `HorusHypnotic/opera-atlas` | `D:\Projetos Github\opera-atlas` | `main` | `6484ddd` — `fix: restaura reprodutibilidade do OPERA Atlas` | Sucesso após instalação limpa | `1 passed`; cobertura mínima | Funcionando | Não validado neste checkpoint | Preview apresenta identidade/textos de “O.P.E.R.A. Control”; possível conflito de identidade ou escopo |

Os três produtos funcionam isoladamente no escopo testado: instalação limpa, build e smoke test das rotas públicas indicadas nas auditorias. Esse resultado não certifica cobertura funcional completa, produção, segurança ou integração entre produtos.

## Fronteiras de identidade

### Copiloto de Obras

O aplicativo Lovable oficial é mantido em `HorusHypnotic/copilotodeobras`. O diretório `opera/copiloto-obras/` deste repositório contém um runtime Python experimental recuperado e validado separadamente. Presença, testes ou evolução de um não implicam sincronização automática com o outro.

### OPERA Control

O aplicativo oficial é `HorusHypnotic/opera-control`, com clone local em `D:\Projetos Github\opera-control-official`.

O repositório `HorusHypnotic/opera-control-canonical-extract`, clonado em `D:\Projetos Github\opera-control`, é um extrato/snapshot documental distinto. Ele não é o clone oficial do aplicativo Lovable e não deve ser fundido ou sincronizado automaticamente com ele.

### OPERA Atlas

O produto auditado é `HorusHypnotic/opera-atlas`. A presença, no Preview atual, de identidade ou textos relacionados a “O.P.E.R.A. Control” é registrada como possível conflito de identidade ou escopo. Este checkpoint não determina a causa e não autoriza correção visual, renomeação ou migração.

## Preview e Published

O Preview do editor Lovable e o deployment Published são estados independentes. Uma conexão Git marcada como `Connected` e um Preview funcional não provam que o snapshot publicado esteja atualizado.

```text
Git sincronizado ≠ Preview validado ≠ Published atualizado
```

O estado Published dos três produtos não foi validado por este checkpoint. No Control, essa separação é especialmente relevante porque a falha anterior “A página não carregou” deixou de ocorrer no Preview após a sincronização dos bindings Cloud, sem que isso prove o estado do deployment publicado.

## Limite da integração OPERA

Não existe, neste checkpoint, evidência de integração executável do ciclo:

```text
Copiloto → Control → Atlas
```

Também não existe evidência do ciclo ampliado:

```text
Copiloto → Control → Atlas → Cofre
```

O Cofre não integra esta validação. A sincronização individual de cada produto entre Lovable, GitHub e clone local não demonstra troca de dados, contratos, identidade compartilhada, orquestração ou continuidade operacional entre sistemas.

## Próxima fase

A próxima fase deve definir e provar o ciclo operacional mínimo entre os sistemas antes de qualquer declaração de integração. O menor avanço documental e técnico esperado é:

1. delimitar responsabilidades e entradas/saídas de Copiloto, Control e Atlas;
2. definir contratos mínimos, identidade e critérios de rastreabilidade;
3. selecionar um fluxo ponta a ponta pequeno e não destrutivo;
4. estabelecer evidências, testes e critérios de aceite;
5. executar a prova sem incluir o Cofre até haver escopo e autorização próprios.

## Conflitos documentais encontrados

Os documentos `docs/lovable-integration.md`, `docs/ecossistema-projetos-2026-08-03.md` e a atualização de `docs/inventario-executavel-2026-08-02.md` ainda descrevem o Copiloto de Obras somente como runtime experimental no canônico, sem repositório operacional independente confirmado. Essa afirmação representa corretamente a fotografia de 2–3 de agosto, mas foi superada pela identificação e validação posterior de `HorusHypnotic/copilotodeobras`.

Não há conflito sobre a preservação do runtime experimental: ele continua sendo um artefato distinto. A mudança factual é apenas a confirmação posterior de um aplicativo Lovable oficial independente.

O possível conflito de identidade do Preview do Atlas com textos de “O.P.E.R.A. Control” permanece aberto. Não há evidência suficiente neste checkpoint para classificá-lo como simples identidade visual, compartilhamento deliberado de escopo ou implementação incorreta.

## Relação com documentos anteriores

Este documento atualiza a fotografia operacional sem reescrever retroativamente:

- `docs/inventario-executavel-2026-08-02.md`;
- `docs/ecossistema-projetos-2026-08-03.md`;
- `docs/lovable-integration.md`;
- os snapshots preservados em `opera/`.

Em caso de leitura futura, os documentos anteriores permanecem evidências datadas; este checkpoint registra apenas o estado verificado em 8 de agosto de 2026.
