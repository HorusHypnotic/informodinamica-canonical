# MET-005 — Slektip

**Título:** Slektip é um mecanismo de persistência da coordenação para o próximo ciclo.

**Status:** Métrica operacional (em desenvolvimento).

---

## Introdução

Slektip é o mecanismo que garante que a coordenação não termine com o ciclo atual. Ele captura o aprendizado operacional e o transforma em uma representação reutilizável que pode ser transferida para o próximo projeto, obra ou equipe. É a memória operacional da organização.

---

## Conceito

Slektip é uma representação persistente que encapsula uma lição aprendida, um padrão de falha, uma solução validada ou uma melhoria de processo, e que é formalmente registrada para ser reutilizada em ciclos futuros.

Propriedades de um Slektip:
- **Persistente:** sobrevive ao ciclo que o originou.
- **Acionável:** pode ser diretamente aplicado em uma nova situação.
- **Rastreável:** possui identificador (ex: SLK-001) e está vinculado ao ECO que o gerou.
- **Evolutivo:** pode ser atualizado ou refinado com base em novas experiências.

---

## Contexto

- **Relação com a TPC:** Slektip é a manifestação prática da **Persistência Representacional (LAW-002)** aplicada ao longo de múltiplos ciclos. Ele transforma o aprendizado local em conhecimento organizacional.
- **Relação com outras métricas:** Cada ECO (MET-001) bem resolvido deve gerar um Slektip. O número de Slektips gerados é um indicador da capacidade de aprendizado do sistema (componente do IFX).
- **Uso prático:** No ecossistema OPERA, Slektips são armazenados na **Biblioteca OPERA** e podem ser consultados por qualquer obra futura. Eles são o "DNA" da coordenação persistente.

**Exemplo:** Uma obra identifica que a compra emergencial de um insumo ocorreu porque o estoque mínimo não foi atualizado. O ECO é registrado, a causa é corrigida, e um Slektip é criado: *"Sempre atualizar o estoque mínimo no sistema sempre que houver uma alteração no cronograma."* A próxima obra herda esse Slektip e evita o mesmo erro.

---

**Referências:**
- LAW-002 (Persistência Representacional)
- MET-001 (ECO)
- MET-003 (Fliflexação)
- Nonaka, I. (1995). *The Knowledge-Creating Company*.
