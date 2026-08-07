# Constituição da Informodinâmica Aplicada

**Status:** Revisão candidata 1.2 — não consolidada
**Data de Adoção:** 24 de julho de 2026
**Última proposta de emenda:** 2 de agosto de 2026
**Autor:** Eduardo Martins

---

## Preâmbulo

A Informodinâmica Aplicada é um programa de pesquisa dedicado ao estudo da persistência de representações operacionais e de sua capacidade de sustentar coordenação. No domínio da TPC, a representação é o objeto analítico primário; coordenação é um resultado relacional observável quando agentes ou mecanismos interpretam representações de modo compatível para agir.

Esta Constituição estabelece as regras fundamentais para a evolução, governança e manutenção do Núcleo Canônico da disciplina. Ela é o documento que define como o conhecimento da Informodinâmica é criado, revisado, aprovado e versionado.

---

## Artigo 1 — Da Missão e do Objeto de Estudo

### 1.1 Missão

A missão da Informodinâmica Aplicada é:

*Fornecer um arcabouço teórico e prático para compreender, medir e intervir na persistência e na capacidade coordenadora de representações operacionais, investigando seus efeitos sobre coordenação, valor e resiliência.*

### 1.2 Objeto de Estudo

O objeto de estudo da disciplina é a **persistência representacional em sistemas coordenados**: como representações operacionais mantêm ou perdem, ao longo do tempo e em ambientes determinados, a capacidade de sustentar interpretações compatíveis e ações coordenadas.

A coordenação permanece o fenômeno observável que dá nome à TPC, mas não é tratada como entidade primária nem como efeito automático. A relação entre estado representacional e coordenação é uma hipótese causal sujeita a teste.

---

## Artigo 2 — Da Estrutura do Conhecimento

O conhecimento da Informodinâmica está organizado em três camadas:

### 2.1 Núcleo Canônico

Localizado no repositório `informodinamica-canonical`, contém a fonte única, verificável e rastreável de todos os conceitos, leis, hipóteses e métricas da disciplina. Nenhum outro local é considerado oficial.

### 2.2 Aplicações

Consomem o Núcleo Canônico. Incluem:

- Ecossistema OPERA
- Artigos acadêmicos
- Protocolos de pesquisa
- Software
- Dashboards

### 2.3 Governança

Define as regras para a evolução do Núcleo e das Aplicações. Esta Constituição é o documento máximo da Governança. A ela se somam os protocolos PRT-001 (Ciclo de Vida dos IDs) e PRT-002 (Cartografia Epistemológica).

O PRT-003 (Classificação Multiaxial do Conhecimento) permanece como proposta Draft. Ele registra separadamente governança, formalização, evidência e maturidade operacional e somente integrará a governança vigente após cumprir seu processo de adoção.

---

## Artigo 3 — Dos Identificadores Permanentes

Todo conceito, lei, hipótese ou métrica do Núcleo Canônico deve possuir um identificador único e permanente.

### 3.1 Prefixos

| Prefixo | Objeto | Exemplo |
|---------|--------|---------|
| **IDR** | Conceito (ontologia) | IDR-0001 — Coordenação |
| **LAW** | Proposição estruturante | LAW-001 — Mediação Representacional |
| **HYP** | Hipótese de pesquisa | HYP-001 — Consequência Fundamental |
| **MET** | Métrica operacional | MET-001 — ECO |
| **PRT** | Protocolo | PRT-002 — Cartografia Epistemológica |

### 3.2 Regras para IDs

- IDs são atribuídos sequencialmente.
- Um ID, uma vez atribuído, nunca é reutilizado.
- Um ID pode ser marcado como "Obsoleto", mas não pode ser apagado.
- A primeira ocorrência de qualquer termo em qualquer documento canônico deve citar seu ID.

---

## Artigo 4 — Do Ciclo de Vida dos Artefatos

Todo artefato do Núcleo Canônico (conceito, lei, hipótese, métrica) deve seguir o ciclo abaixo antes de ser considerado "Canônico". O protocolo PRT-001 detalha este processo.

### 4.1 Estados

| Estado | Significado |
|--------|-------------|
| **Draft** | Em elaboração. Pode ser alterado livremente. Ainda não é referência. |
| **Experimental** | Já utilizado em contextos práticos, mas sem validação robusta. Pode ser citado, mas com ressalvas. |
| **Canônico** | Aprovado formalmente para integrar a disciplina. É fonte da verdade. |
| **Obsoleto** | Substituído por outro artefato ou conceito. Mantido para rastreabilidade histórica. |

### 4.2 Transições

- **Draft → Experimental:** O artefato deve ter sido utilizado em pelo menos uma aplicação (ex: OPERA, artigo, protocolo).
- **Experimental → Canônico:** O artefato deve ter sido submetido a revisão por pares (formal ou informal) e estar alinhado com o restante do Núcleo.
- **Canônico → Obsoleto:** O artefato deve ser explicitamente substituído por outro, com justificativa documentada no manifesto da versão.

---

## Artigo 5 — Do Versionamento Semântico

A disciplina utiliza **Versionamento Semântico** (SemVer) para suas versões.

### 5.1 Formato

```
X.Y.Z
```

Onde:

- **X (MAJOR):** Mudanças incompatíveis com versões anteriores.
- **Y (MINOR):** Adição de novos conceitos, leis ou métricas (compatível).
- **Z (PATCH):** Correções, melhorias de redação, SHAs atualizados.

### 5.2 Regras

- Um arquivo `manifest/vX.Y.Z.manifest.md` deve acompanhar cada versão.
- O manifesto deve conter a lista de SHAs (SHA-256) de todos os artefatos naquela versão.
- A versão corrente deve estar sempre indicada no README.md.

---

## Artigo 6 — Do Processo de Revisão (Cartografia Epistemológica)

A inclusão de novos fundamentos teóricos deve seguir o PRT-002 — Protocolo de Cartografia Epistemológica, que define seis perguntas a serem respondidas para cada autor ou teoria proposta como fundamento.

### 6.1 Critérios de inclusão

Uma teoria é incorporada como fundamento da IA se:

- A lacuna identificada for genuína e relevante para a IA.
- Nenhum outro campo já trata essa lacuna de forma sistemática.
- A integração for possível sem substituir a teoria original.

### 6.2 Critérios de exclusão

Uma teoria não é incorporada se:

- A lacuna já for tratada por outra teoria consolidada.
- A integração for forçada ou redundante.
- O fenômeno já estiver totalmente coberto por um campo existente.

---

## Artigo 7 — Das Convenções de Nomenclatura

### 7.1 Arquivos

- Todos os arquivos do Núcleo devem usar **snake_case** (ex: `lei-mediacao.md`).
- O nome do arquivo deve ser autoexplicativo.

### 7.2 Títulos

- O título de cada artefato deve ser claro e descritivo.
- A primeira linha do arquivo deve conter o ID e o título (ex: `# LAW-001 — Mediação Representacional`).

### 7.3 Diagramas

- Diagramas devem ser mantidos em formato textual (Mermaid ou SVG) em `diagrams/`.
- O PDF é apenas um artefato renderizado.

---

## Artigo 8 — Da Rastreabilidade e da Fonte Única

### 8.1 A fonte da verdade

O repositório `informodinamica-canonical` é a **única fonte da verdade** da disciplina. Nenhum outro local (Google Drive, Dropbox, computador local) é considerado oficial.

### 8.2 O PDF

PDFs são artefatos compilados, nunca fontes. Eles podem ser gerados a partir do Núcleo, mas não são parte do Núcleo.

---

## Proposta de Emenda Epistemológica — Draft não vigente

Esta seção registra uma proposta para deliberação humana futura. Ela **não altera** os artigos vigentes nem promove modelos exploratórios ao Núcleo Canônico.

1. Toda analogia deve ser identificada como analogia e não pode ser apresentada como evidência.
2. Toda hipótese deve ser distinguida de resultados observados.
3. Toda métrica deve declarar seu estado de definição, calibração e validação.
4. Todo modelo deve registrar alternativas concorrentes e condições de comparação.
5. Nenhuma inspiração externa deve ser incorporada sem reconstrução conceitual e, quando aplicável, PRT-002.
6. Problemas filosóficos podem orientar perguntas, mas não constituem validação empírica.
7. Metáfora, conceito, definição, hipótese, modelo, métrica, resultado e lei devem permanecer categorias documentais distintas.

---

**Versão candidata:** 1.2
**Data da proposta:** 02/08/2026
**Autor:** Eduardo Martins
