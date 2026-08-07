# MET-002 — ICO (Índice de Corrosão Operacional)

**Título:** ICO é a medida de quão crítica foi a falha de persistência da coordenação.

**Fórmula:**

ICO = I × R × P

Onde:
- **I**: Impacto (tamanho da ruptura, escala 1 a 5)
- **R**: Recorrência (quantas vezes ocorreu)
- **P**: Persistência (tempo em dias desde a primeira detecção)

**Versão analítica (com penalização temporal):**

ICO_analítico = I × R × P^1.5

**Inspiração:** Estrutura inspirada no Número de Prioridade de Risco (NPR) da metodologia FMEA.

**Relações:**
- Baseia-se em: IDR-0011 (ICO).
- Conecta-se a: MET-001 (ECO), MET-003 (Fliflexação), HYP-002 (Pesquisa de campo).
