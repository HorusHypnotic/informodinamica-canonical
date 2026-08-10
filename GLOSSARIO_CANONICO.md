# Glossário Canônico da Informodinâmica Aplicada

**Versão candidata:** 1.1 (2 de agosto de 2026)
**Status:** revisão fundacional não consolidada
**Propósito:** Fonte única e definitiva de todas as definições da TPC. Este glossário substitui definições dispersas em outros documentos.

---

## Como usar este glossário
- **IDR-XXXX** identifica um conceito fundamental.
- **LAW-XXX** identifica uma proposição estruturante.
- **HYP-XXX** identifica uma hipótese de pesquisa.
- **MET-XXX** identifica uma métrica operacional.
- **PRT-XXX** identifica um protocolo.

---

## IDR — Conceitos Fundamentais

| IDR | Termo | Definição |
|-----|-------|-----------|
| **IDR-0001** | Coordenação | Resultado relacional emergente no qual agentes ou mecanismos produzem ações compatíveis ao interpretar representações sob condições operacionais determinadas. |
| **IDR-0002** | Representação Operacional | Estrutura portadora de estado que mantém relação especificável com um objeto, condição, regra ou ação e pode ser interpretada por agentes ou mecanismos. |
| **IDR-0003** | Estado Coordenado | Condição em que agentes compartilham representações compatíveis para produzir uma ação coerente sem retrabalho. |
| **IDR-0004** | Deformação Representacional | Alteração que reduz atributos do estado operacional ou a capacidade de uma representação sustentar interpretações compatíveis, por mecanismos como perda, atraso, substituição, ambiguidade ou fragmentação. |
| **IDR-0005** | Resiliência Representacional | Capacidade de restaurar ou preservar a integridade funcional da representação. |
| **IDR-0006** | Persistência da Coordenação | Propriedade secundária de um sistema de manter ações compatíveis ao longo do tempo sob dependência de representações persistentes e condições operacionais adequadas. |
| **IDR-0007** | Fliflexação | Capacidade de restaurar atributos e relações de representações degradadas; recuperação da coordenação é desfecho separado. |
| **IDR-0008** | Capital Preservado | Coordenação preservada que se traduziu em valor econômico. |
| **IDR-0009** | Slektip | Representação persistente e acionável destinada a transferir contexto coordenador entre ciclos operacionais. |
| **IDR-0010** | ECO (Evento de Corrosão da Coordenação) | Evento observável de falha coordenacional; desfecho candidato, não medida direta de toda degradação representacional. |
| **IDR-0011** | ICO (Índice de Corrosão Operacional) | Medida da gravidade da falha de persistência (Impacto × Recorrência × Persistência). |
| **IDR-0012** | IFX (Índice de Fliflexação) | Medida da maturidade da Fliflexação (Sensibilidade + Precisão + Velocidade + Aprendizado). |

### Propostas Draft — não canônicas

Os IDs abaixo são permanentes, mas os conceitos permanecem em elaboração e não devem ser citados como definições canônicas.

| IDR | Termo | Definição Draft |
|-----|-------|-----------------|
| **IDR-0013** | Identidade Operacional | Continuidade verificável entre uma representação, suas transformações sucessivas, as decisões associadas e o objeto operacional que ela pretende coordenar. |
| **IDR-0014** | Continuidade Operacional | Grau em que versões sucessivas preservam uma cadeia reconstruível de premissas, decisões, responsáveis e objetos coordenados. |
| **IDR-0015** | Degradação Destrutiva | Perda, corrupção ou inacessibilidade do conteúdo de uma representação. |
| **IDR-0016** | Degradação Substitutiva | Substituição progressiva de componentes de uma representação sob aparência de continuidade. |
| **IDR-0017** | Degradação Identitária | Perda de continuidade operacional suficiente com a representação de origem. |
| **IDR-0018** | Degradação Genealógica | Perda da capacidade de reconstruir versões, justificativas e transformações. |
| **IDR-0019** | Estado Probabilístico | Distribuição candidata de probabilidades sobre estados operacionais futuros, condicionada às informações declaradas pelo modelo. |
| **IDR-0020** | Capacidade Coordenadora da Representação | Propriedade relacional candidata de uma representação sustentar interpretações compatíveis para uma tarefa, dados agentes e ambiente determinados; ainda sem métrica validada. |
| **IDR-0021** | Fatorização da Coordenação | Estratégia de decompor a capacidade coordenadora em componentes observáveis e comparar regras de agregação. |
| **IDR-0022** | Escolha Coordenada | Escolha produzida sob condições representacionais e operacionais suficientes para alinhar decisão, execução e objetivo declarado. |
| **IDR-0023** | Ambiente Representacional | Conjunto de representações, acessos, restrições, tempos e relações sociais disponíveis a agentes em uma situação decisória. |
| **IDR-0024** | Transição Operacional | Mudança observada ou modelada entre estados operacionais de uma representação ao longo do tempo. |

> **Nota de desambiguação arquitetural:** IDR-0013 descreve a continuidade verificável de representações e objetos coordenados no programa teórico. Não designa identidade cadastral de usuário, organização, obra, recurso ou alocação no ecossistema O.P.E.R.A. Essas entidades pertencem à arquitetura da aplicação e são diferenciadas em `docs/decisoes/DEC-ARQ-002-identidade-operacional-opera.md`.

---

## LAW — Proposições Estruturantes

| LAW | Título | Enunciado |
|-----|--------|-----------|
| **LAW-001** | Mediação Representacional | No domínio declarado da TPC, coordenação persistente é mediada por representações operacionais. |
| **LAW-002** | Persistência Representacional | Representações íntegras podem sustentar coordenação persistente quando intérpretes, tarefa e ambiente permanecem compatíveis. |
| **LAW-003** | Deformação Representacional | As representações se deformam por mecanismos de perda, atraso, substituição, ambiguidade e fragmentação (taxonomia provisória). |
| **LAW-004** | Resiliência Representacional | A capacidade coordenadora de representações pode ser restaurada por mecanismos que preservam ou reconstroem seu estado e suas relações operacionais. |

---

## HYP — Hipóteses de Pesquisa

| HYP | Título | Enunciado |
|-----|--------|-----------|
| **HYP-001** | Consequência Fundamental | No domínio da TPC, perdas não corrigidas no estado ou na capacidade de representações relevantes elevam o risco de falhas internas de coordenação. |
| **HYP-002** | Pesquisa de Campo | Intervenções OPERA que preservem atributos representacionais produzirão diferenças mensuráveis em capacidade coordenadora, ECOs e valor, comparadas a condições de controle. |
| **HYP-003** | Inércia Representacional | Quanto maior a capacidade coordenadora observada de uma representação, maior pode ser sua naturalização e menor a detecção de deformações silenciosas. |

### Hipóteses Draft — agenda de pesquisa

| Faixa | Linha | Arquivo |
|-------|-------|---------|
| **HYP-004–HYP-008** | Dinâmica probabilística | `03-pesquisa/hipoteses/HYP-004-008-dinamica-probabilistica.md` |
| **HYP-009–HYP-013** | Identidade operacional | `03-pesquisa/hipoteses/HYP-009-013-identidade-operacional.md` |
| **HYP-014–HYP-018** | Capacidade coordenadora | `03-pesquisa/hipoteses/HYP-014-018-capacidade-coordenadora.md` |
| **HYP-019–HYP-023** | Escolha operacional | `03-pesquisa/hipoteses/HYP-019-023-escolha-operacional.md` |

---

## MET — Métricas Operacionais

| MET | Título | Definição |
|-----|--------|-----------|
| **MET-001** | ECO | Unidade de observação de uma falha coordenacional e de sua possível relação com representações degradadas. |
| **MET-002** | ICO | Índice de Corrosão Operacional — Impacto × Recorrência × Persistência. |
| **MET-003** | Fliflexação | Instrumento candidato para observar restauração representacional e seu possível efeito coordenacional. |
| **MET-004** | Capital Preservado | Coordenação preservada que se traduziu em valor econômico. |
| **MET-005** | Slektip | Representação candidata para transferência de contexto coordenador entre ciclos. |

---

## PRT — Protocolos

| PRT | Título | Descrição |
|-----|--------|-----------|
| **PRT-001** | Ciclo de Vida dos IDs | Processo de criação, revisão e obsolescência de identificadores. |
| **PRT-002** | Cartografia Epistemológica | Método para delimitar o território da TPC em relação a outras teorias. |
| **PRT-003** | Classificação Multiaxial do Conhecimento | Protocolo Draft para registrar separadamente governança, formalização, evidência e maturidade operacional. |

---

## Critérios de uma Representação

1. **Persistência** — atravessa o tempo.
2. **Orientação** — guia ação ou decisão.
3. **Compartilhamento** — existe para múltiplos agentes.
4. **Transmissibilidade** — pode ser comunicada ou transferida.

---

## Cinco Mecanismos de Deformação (Taxonomia Provisória)

| Mecanismo | Definição |
|-----------|-----------|
| **Perda** | Elementos da representação desaparecem. |
| **Atraso** | A representação chega depois do momento necessário. |
| **Substituição** | Um elemento é trocado por outro. |
| **Ambiguidade** | A representação permite múltiplas interpretações. |
| **Fragmentação** | A representação é dividida em partes desconectadas. |

---

## Critérios de Falseabilidade

A TPC será falseada se:

1. **C1:** For demonstrada coordenação persistente sem qualquer representação persistente.
2. **C2:** For demonstrada uma falha de coordenação não precedida por deformação representacional.
3. **C3:** Restaurar a representação não restaurar a coordenação.

---

**Última atualização candidata:** 2 de agosto de 2026
