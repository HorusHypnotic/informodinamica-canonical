# Arquitetura do Ecossistema Informodinâmica Aplicada

**Versão:** 1.0 (31 de julho de 2026)  
**Propósito:** Documentar os componentes, papéis e fronteiras do ecossistema.

## Decisões arquiteturais

- `docs/decisoes/DEC-ARQ-001-separacao-atlas-canonico.md` — separação entre o Atlas canônico e aplicações derivadas.
- `docs/decisoes/DEC-ARQ-002-identidade-operacional-opera.md` — separação semântica entre identidade de acesso, organização, obra, recurso, alocação e autorização.

Decisões arquiteturais canonizam fronteiras e semântica. Não autorizam, por si mesmas, alterações em código, banco, autenticação, migrations, permissões, integrações, deploy ou publicação.

## Visão geral

O repositório Git é a memória canônica versionada da Informodinâmica Aplicada. O VS Code é o ambiente de trabalho; agentes de IA atuam sobre o conhecimento versionado; serviços especializados podem apoiar aplicações sem substituir a fonte canônica.

| Camada | Componente | Função |
| --- | --- | --- |
| Fonte da verdade | GitHub / Git | Memória operacional canônica e histórico verificável. |
| Ambiente de trabalho | VS Code | Edição, revisão e execução local. |
| Agentes | Codex e outras IAs | Leitura, análise e apoio sob as regras do repositório. |
| Prototipagem | Lovable ou equivalente | Interfaces e protótipos, quando aplicável. |
| Infraestrutura | Supabase ou equivalente | Dados, autenticação e serviços das aplicações. |
| Arquivo histórico | Google Drive / `archive/` | Evidências e contexto não normativo. |

## Zonas do repositório

| Área | Conteúdo | Autoridade |
| --- | --- | --- |
| Raiz canônica | Constituição, Documento Canônico, Glossário, manual e governança | Normativa |
| `01-teoria/` | TPC, fundamentos e formalização matemática | Canônica teórica |
| `02-aplicacoes/` | Aplicações da teoria, incluindo TDO | Aplicada |
| `03-pesquisa/` | Protocolos experimentais, validação e casos reais | Empírica |
| `protocols/` | Protocolos PRT de governança | Processual |
| `docs/` | Arquitetura, contexto e workflow | Operacional |
| `agents/` | Papéis de agentes especializados | Instrucional |
| `workspace/` | Ideias, rascunhos e experimentos não canônicos | Interna e transitória |
| `opera/` | Código e documentação de integração do ecossistema OPERA | Implementação |
| `produtos/` | Documentação dos produtos OPERA | Produto |
| `archive/` | Histórico e evidências | Não normativa |

## Princípios de design

1. Fonte única da verdade: conteúdo canônico é versionado neste repositório.
2. Separação de papéis: teoria, evidência, aplicação, código e rascunhos não se confundem.
3. Independência de ferramentas: nenhum fornecedor externo define o núcleo.
4. Rastreabilidade: mudanças relevantes são revisadas, versionadas e vinculadas à autoridade apropriada.
5. Acessibilidade: documentação deve ser navegável por humanos e agentes.

## Fluxo de promoção

`workspace/ideas` → `workspace/drafts` → `workspace/experiments` → revisão humana e por pares → artefato canônico ou aplicação → manifesto/release quando aplicável.

O ciclo de vida dos IDs e artefatos canônicos segue `protocols/PRT-001-ciclo-de-vida.md`.

> O GitHub é a memória operacional canônica do projeto. O VS Code é o ambiente de trabalho. Agentes atuam sobre essa memória; ferramentas e serviços externos são componentes especializados conectados a ela.
