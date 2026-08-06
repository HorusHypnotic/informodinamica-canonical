# Research Package 002 (RP-002) – Detectando Falsos Verdes em CI/CD: Um Estudo de Caso Empírico

**Status:** Em planejamento / Scaffold inicial  
**Versão:** v0.1  
**Última atualização:** 2026-08-06  

---

## 1. Objetivo do Pacote

O **RP-002** constitui o segundo Research Package do programa TPC. Enquanto o RP-001 estabeleceu o arcabouço metodológico (MET-006 a MET-009), o RP-002 aplica os protocolos a um estudo de caso empírico e controlado em um pipeline de CI/CD (EXP-001), focando na detecção e mitigação de **falsos verdes** (sistemas que reportam sucesso interno enquanto estão desacoplados de suas premissas ou do ambiente real).

---

## 2. Componentes

- `SCOPE.md` – Delimitação do que este estudo de caso cobre e não cobre.
- `claims.md` – Afirmações empíricas derivadas das 8 condições experimentais.
- `assumptions.md` – Pressupostos sobre a generalização de ambientes de CI/CD.
- `paper.md` – O artigo do estudo de caso.
- `data/` – Datasets de latência ($T_0$ a $T_4$) coletados no laboratório.
- `figures/` – Gráficos de distribuição de latências e cascata de falhas.
