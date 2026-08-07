# MET-003 — Fliflexação

**Título:** Fliflexação é a capacidade de restaurar a persistência da coordenação.

**Status:** Métrica operacional (em calibração empírica).

---

## Introdução

A Fliflexação é o mecanismo ativo que se opõe à deformação representacional. Enquanto o ECO (MET-001) e o ICO (MET-002) diagnosticam a falha de persistência, a Fliflexação atua para restaurar a coordenação antes que a falha se torne irreversível. Ela é a manifestação prática da Lei 4 (Resiliência Representacional — LAW-004).

---

## Conceito

Fliflexação é a capacidade de um sistema de detectar, corrigir e aprender com deformações representacionais, restaurando a coordenação entre os agentes.

Ela se desdobra em quatro componentes mensuráveis:

| Componente | Definição |
|------------|-----------|
| Sensibilidade | Capacidade de detectar que a coordenação está falhando. |
| Precisão | Capacidade de decidir como restaurar a coordenação. |
| Velocidade | Capacidade de restaurar a coordenação rapidamente. |
| Aprendizado | Capacidade de evitar que a mesma falha se repita. |

---

## Índice de Fliflexação (IFX)

O **IFX** é a medida agregada da maturidade da Fliflexação de um sistema. É calculado como:

IFX = (Sensibilidade + Precisão + Velocidade + Aprendizado) / 4

Cada componente é avaliado em uma escala de 0 a 1 (ou 0 a 10), e o IFX resultante varia de 0 (ausência total de resiliência) a 1 (sistema plenamente restaurativo).

---

## Contexto

- **Relação com a TPC:** A Fliflexação é a implementação prática da **Resiliência Representacional (LAW-004)**. Ela transforma um princípio teórico em uma métrica operacional.
- **Relação com outras métricas:** Fliflexação é acionada após a detecção de um ECO (MET-001) e tem como objetivo reduzir o ICO (MET-002) futuro. Ela alimenta o Capital Preservado (MET-004).
- **Uso prático:** No ecossistema OPERA, a Fliflexação é operacionalizada por:
  - Registro automático de ECOs.
  - Recomendações de correção (Precisão).
  - Alertas em tempo real (Velocidade).
  - Atualização da biblioteca de Slektips (Aprendizado).

**Exemplo:** Uma obra que detecta um ECO (perda de uma especificação técnica), identifica a causa em 2 horas, corrige a representação em 4 horas, e registra o aprendizado para a próxima obra tem alta Fliflexação. Uma obra que só detecta o ECO após uma semana e não registra o aprendizado tem baixa Fliflexação.

---

**Referências:**
- LAW-004 (Resiliência Representacional)
- MET-001 (ECO)
- MET-002 (ICO)
- Hollnagel, E. (2009). *The ETTO Principle*.
