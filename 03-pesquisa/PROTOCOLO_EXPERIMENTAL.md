# PROTOCOLO EXPERIMENTAL — Validação Empírica da TPC

**Versão:** 0.1.0
**Data:** 26/07/2026
**Autor:** Eduardo Martins
**Status:** Draft — a ser finalizado com base nos dados disponíveis

---

## 1. Objetivo

Testar a **Consequência Fundamental (HYP-001)** da Teoria da Persistência da Coordenação:

> Toda falha de coordenação observável foi precedida por uma deformação não corrigida da representação que orientava aquela ação.

E testar a **HYP-002** (Pesquisa de Campo):

> O grupo piloto (com OPERA) apresentará significativamente menos ECOs e maior Capital Preservado que o grupo controle, após a implementação de mecanismos de detecção e correção de deformações representacionais.

---

## 2. Desenho de Pesquisa

### 2.1. Tipo

Quase-experimental com grupo piloto e grupo controle.

### 2.2. Amostra

| Grupo | Descrição | N |
|-------|-----------|---|
| Piloto | Obras com implementação OPERA. | A definir |
| Controle | Obras sem implementação OPERA. | A definir |

### 2.3. Critérios de Inclusão

- Obra em andamento (não concluída).
- Mínimo de 3 meses de operação.
- Disponibilidade de registros operacionais (diários de obra, atas de reunião, cronogramas).

### 2.4. Critérios de Exclusão

- Obra com menos de 10 agentes envolvidos.
- Obra com menos de 3 meses de operação.

---

## 3. Variáveis

### 3.1. Variáveis Independentes

- Implementação do OPERA (presença/ausência de mecanismos de detecção e correção de deformações).

### 3.2. Variáveis Dependentes

| Variável | Métrica | Unidade |
|----------|---------|---------|
| Número de ECOs | ECO (MET-001) | Contagem por mês |
| Gravidade média | ICO (MET-002) | Índice (1–125) |
| Maturidade de Fliflexação | IFX (MET-003) | Índice (4–20) |
| Valor preservado | Capital Preservado (MET-004) | R$ |

### 3.3. Variáveis de Confusão (a controlar)

| Variável | Estratégia de Controle |
|----------|----------------------|
| Porte da obra | Estratificação por valor do contrato. |
| Complexidade | Estratificação por número de especialidades. |
| Experiência da equipe | Registro do tempo médio de experiência. |

---

## 4. Procedimentos

### 4.1. Fase 1 — Linha de Base

1. Registrar ECOs existentes na obra (retrospectivo, últimos 3 meses).
2. Calcular ICO e Capital Preservado da linha de base.
3. Documentar representações existentes (cronograma, projetos, protocolos).

### 4.2. Fase 2 — Intervenção (apenas grupo piloto)

1. Implementar OPERA Register para registro em tempo real de ECOs.
2. Implementar OPERA Control para cálculo de ICO.
3. Implementar OPERA Flex para acionamento de protocolos de Fliflexação.
4. Iniciar geração de Slektips.

### 4.3. Fase 3 — Acompanhamento

1. Registro semanal de ECOs em ambos os grupos.
2. Cálculo mensal de ICO, IFX e Capital Preservado.
3. Análise comparativa trimestral.

### 4.4. Fase 4 — Análise

1. Comparar ECOs, ICO, IFX e Capital Preservado entre grupos.
2. Testar se a HYP-001 se sustenta (todo ECO tem deformação representacional associada).
3. Testar se a HYP-002 se sustenta (grupo piloto tem menos ECOs e maior Capital Preservado).

---

## 5. Critérios de Refutação

A TPC será refutada se:

1. **HYP-001 refutada:** Mais de 20% dos ECOs registrados no grupo controle não tiverem deformação representacional identificável como causa.
2. **HYP-002 refutada:** O grupo piloto não apresentar redução estatisticamente significativa (p < 0.05) no número de ECOs ou no ICO após a implementação do OPERA.
3. **Axioma refutado:** For encontrada coordenação persistente sem representação persistente (incluindo regras locais codificadas).

---

## 6. Cronograma

| Fase | Período | Status |
|------|---------|--------|
| Linha de base | 26/07/2026 — 26/08/2026 | Pendente |
| Intervenção | 27/08/2026 — 26/11/2026 | Pendente |
| Acompanhamento | 26/11/2026 — 26/02/2027 | Pendente |
| Análise | 27/02/2027 — 26/05/2027 | Pendente |

---

## 7. Limitações

- Recrutamento de obras pode ser difícil (confidencialidade).
- A amostra inicial será pequena (N < 10), limitando a generalização.
- O estudo de caso exploratório inicial é uma obra em modo controle (sem OPERA).
- A impossibilidade de randomização limita a validade interna.

---

## 8. Referências

| Autor | Ano | Obra | Relação |
|-------|-----|------|---------|
| Hollnagel, E. | 2009 | *The ETTO Principle* | Resiliência operacional. |
| Weick, K. E. | 1979 | *The Social Psychology of Organizing* | Sensemaking organizacional. |
| Kahneman, D. | 2011 | *Thinking, Fast and Slow* | Vieses cognitivos na decisão. |

---

**Versão:** 0.1.0
**Data:** 26/07/2026
**Autor:** Eduardo Martins
