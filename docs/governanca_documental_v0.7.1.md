# Governança documental — consolidação candidata v0.7.1

**Estado:** ativo, candidato a consolidação local

**Escopo:** arquitetura documental e operacional; não introduz nem altera conceitos da TPC/TDO.
**Precedência:** subordinado a `CONSTITUICAO.md`, `DOCUMENTO_CANONICO.md` e `GLOSSARIO_CANONICO.md`.

## Objetivo

Consolidar a arquitetura local posterior à versão publicada v0.7.0, deixando explícitos os documentos de autoridade, os materiais operacionais, o acervo histórico e os limites de cada camada. A presente consolidação é candidata à versão **v0.7.1** e ainda não corresponde a uma release nem a um commit.

## Estados documentais

| Estado | Significado |
|---|---|
| `CANONICAL` | Fonte de autoridade para definições, normas ou protocolos. Conflitos são resolvidos pela ordem de autoridade. |
| `ACTIVE` | Material vigente de apoio, aplicação, pesquisa ou operação; não substitui fonte canônica. |
| `HISTORICAL` | Registro preservado de versões, formulações ou acervo anteriores; não deve criar nova autoridade. |
| `DEPRECATED` | Material preservado, mas substituído por sucessor identificado. Não deve receber desenvolvimento conceitual novo. |
| `WORKSPACE` | Espaço temporário, experimental ou de estrutura inicial, sem autoridade documental. |

## Classificação inicial

| Caminho ou conjunto | Estado | Observação |
|---|---|---|
| `CONSTITUICAO.md` | `CANONICAL` | Norma suprema de governança. |
| `DOCUMENTO_CANONICO.md`, `GLOSSARIO_CANONICO.md` | `CANONICAL` | Visão institucional e fonte única de definições. |
| `01-teoria/TPC.md`, `01-teoria/FUNDAMENTOS*.md`, `AXIOMAS_E_PROPOSICOES.md` | `CANONICAL` | Núcleo teórico, sujeito à hierarquia constitucional. |
| `protocols/PRT-*.md` | `CANONICAL` | Protocolos de ciclo de vida e cartografia epistemológica. |
| `MANUAL_ECO.md` | `CANONICAL` | Protocolo operacional do ECO. |
| `02-aplicacoes/`, `03-pesquisa/`, `produtos/`, `references/bibliografia.bib` | `ACTIVE` | Aplicação, pesquisa e base bibliográfica vigente. |
| `README.md`, `CONTRIBUTING.md`, `ROADMAP.md`, `CHANGELOG.md`, `AGENTS.md`, `PROJECT_MEMORY.md`, `docs/`, `agents/` | `ACTIVE` | Navegação, operação e contexto; não definem a teoria. |
| `FORMALIZACAO_MATEMATICA.md`, `ONTOLOGIA.md`, `PROTOCOLO_EXPERIMENTAL.md` | `ACTIVE` | Complementos formais ou instrumentais; exigem alinhamento explícito com o glossário ao evoluir. |
| `ontology/`, `laws/`, `hypotheses/`, `metrics/`, `archive/`, `manifest/v0.2.0.manifest.md`, `manifest/v0.6.0.manifest.md` | `HISTORICAL` | Acervo e rastreabilidade de formulações ou releases anteriores. |
| `DOCUMENTO_UNIFICADO.md` | `DEPRECATED` | Documento de síntese anterior; sucessores: `DOCUMENTO_CANONICO.md`, `GLOSSARIO_CANONICO.md` e `01-teoria/TPC.md`. |
| `references/bibliography.bib` | `HISTORICAL` | Bibliografia reduzida anterior; a fonte ativa é `references/bibliografia.bib`. |
| `workspace/` | `WORKSPACE` | Ideias, rascunhos, experimentos e anotações temporárias. |
| `opera/` | `ACTIVE` | Estrutura operacional inicial do OPERA; os marcadores vazios não têm autoridade. |

## Decisões de migração e duplicidade

1. `GLOSSARIO_CANONICO.md` é a fonte única para definições e IDs vigentes. Os diretórios legados `ontology/`, `laws/`, `hypotheses/` e `metrics/` permanecem preservados apenas como histórico.
2. `references/bibliografia.bib` é a bibliografia ativa por ser a base mais abrangente. `references/bibliography.bib` é mantida para rastreabilidade histórica e não deve ser atualizada em paralelo.
3. `03-pesquisa/PROTOCOLO_EXPERIMENTAL.md` é o protocolo ativo de desenho e validação de pesquisa. O arquivo raiz `PROTOCOLO_EXPERIMENTAL.md` permanece ativo apenas como instrumento complementar de mensuração e deverá receber, em revisão futura, um título ou cabeçalho que delimite esse papel.
4. `DOCUMENTO_UNIFICADO.md` não é fonte de autoridade. Seu conteúdo histórico não deve ser removido, mas novas sínteses devem referenciar os seus sucessores canônicos.
5. A pasta `educacao/` não será criada sem conteúdo didático qualificado. Referências de navegação devem tratá-la como planejada até sua publicação.

## Convenção de nomes e exceções

A Constituição estabelece `snake_case` para novos arquivos do núcleo. A base contém nomes históricos em maiúsculas, nomes com hífen e identificadores públicos. Não haverá renomeação em massa nesta consolidação, pois ela quebraria links e rastreabilidade.

Exceções propostas e justificadas:

- documentos institucionais de raiz já públicos (`README.md`, `CONSTITUICAO.md`, `DOCUMENTO_CANONICO.md`, `GLOSSARIO_CANONICO.md`, `CHANGELOG.md`);
- IDs normativos que preservam forma pública (`PRT-001-ciclo-de-vida.md`);
- nomes legados classificados como `HISTORICAL` ou `DEPRECATED`.

Novos arquivos do núcleo devem usar `snake_case`; novos arquivos operacionais podem usar nomes descritivos em minúsculas com hífen quando isso seguir a convenção já adotada na pasta correspondente.

## Fronteiras da v0.7.1

- Esta versão organiza documentação, memória, instruções de agentes e estrutura operacional.
- Não promove hipóteses a leis, não reescreve axiomas e não altera definições canônicas.
- Não remove, renomeia em massa, nem reclassifica semanticamente o acervo histórico.
- O manifesto definitivo só pode receber hashes após estabilização textual e revisão autorizada.

## Dívida histórica de governança — v0.7.0

O commit remoto que representa v0.7.0 não possui manifesto final correspondente. Essa ausência é registrada como dívida histórica: **não deve ser corrigida retroativamente com arquivos locais posteriores**. A eventual reconstrução de um manifesto v0.7.0 exige uma auditoria dedicada do commit publicado, com escopo e autorização próprios.

## Próxima revisão necessária

Antes de release da v0.7.1: validar links e referências, revisar esta classificação, decidir se o protocolo experimental de raiz será renomeado ou apenas receberá cabeçalho de escopo, estabilizar o conjunto de artefatos e então calcular SHA-256 completos.
