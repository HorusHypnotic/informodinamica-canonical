# Relações entre Conceitos da Informodinâmica Aplicada

Este documento mapeia como os conceitos fundamentais se conectam entre si, formando a rede conceitual da disciplina.

## Hierarquia Fundamental

```
Representação (IDR-0002)
    └── Coordenação (IDR-0001) — toda coordenação é mediada por representações
        ├── Estado coordenado (IDR-0003) — resultado da coordenação bem-sucedida
        └── Persistência da coordenação (IDR-0006) — manutenção ao longo do tempo
            ├── Deformação representacional (IDR-0004) — ameaça à persistência
            └── Resiliência representacional (IDR-0005) — defesa contra a deformação
                └── Fliflexação (IDR-0007) — mecanismo ativo de restauração
```

## Ciclo Operacional

```
Coordenação (IDR-0001)
    → Persistência (IDR-0006)
        → [Falha] → ECO (IDR-0010) → ICO (IDR-0011)
        → [Restauração] → Fliflexação (IDR-0007) → IFX (IDR-0012)
            → Capital Preservado (IDR-0008)
                → Slektip (IDR-0009) — transferência para próximo ciclo
                    → Coordenação (IDR-0001) — reinício do ciclo
```

## Proposições e seus Fundamentos

| Proposição | Baseia-se em | Fundamenta |
|------------|-------------|------------|
| LAW-001 — Mediação | IDR-0001, IDR-0002 | LAW-002, LAW-003 |
| LAW-002 — Persistência | IDR-0001, IDR-0002 | LAW-003, LAW-004 |
| LAW-003 — Deformação | IDR-0004 | MET-001, MET-002 |
| LAW-004 — Resiliência | IDR-0005 | MET-003, MET-004 |

## Métricas e seus Conceitos

| Métrica | Conceito Base | Conexões |
|---------|--------------|----------|
| MET-001 — ECO | IDR-0010 | MET-002, MET-003 |
| MET-002 — ICO | IDR-0011 | MET-001, MET-003 |
| MET-003 — IFX | IDR-0012 | MET-001, MET-002 |
| MET-004 — Capital Preservado | IDR-0008 | MET-003, MET-005 |
| MET-005 — Slektip | IDR-0009 | MET-004 |
