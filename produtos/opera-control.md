# OPERA Control — Capacidade Analítica

**Em uma frase:** *"A obra revela seus vazamentos aqui."*

---

## Conceito

O OPERA Control é a **camada de diagnóstico e inteligência** do ecossistema. Ele transforma dados operacionais em indicadores de degradação, permitindo que a obra veja onde está perdendo dinheiro, tempo e qualidade.

Ele é a implementação prática da **Teoria da Degradação Operacional (TDO)** e das métricas **ECO**, **ICO**, **Fliflexação** e **Capital Preservado**.

---

## O Problema que Resolve

- Perdas invisíveis que não aparecem em relatórios financeiros.
- Dificuldade de priorizar ações corretivas.
- Falta de visibilidade sobre a recorrência e persistência de problemas.
- Ausência de uma "memória operacional" que aprenda com os erros.

---

## Funcionalidades

| Módulo | O que faz | Conexão TPC |
|--------|-----------|-------------|
| **Registro de ECOs** | Captura estruturada de eventos de corrosão (título, descrição, evidência). | ECO — unidade de observação da degradação. |
| **Cálculo de ICO** | Impacto × Recorrência × Persistência. | Gravidade da falha. |
| **Classificação de Gravidade** | Verde a Preto (1–125). | Priorização de ações. |
| **Capital Preservado** | EPI – Corrosão Acumulada. | Valor econômico mantido. |
| **Biblioteca OPERA** | Catálogo de 55 padrões de causa raiz (P001–P055). | Slektips — conhecimento que persiste. |
| **Recomendações** | Ações corretivas baseadas no diagnóstico. | Fliflexação — restauração da coordenação. |

---

## Ciclo da Corrosão (7 Estágios)

1. **Perda de informação** — Dado não registrado.
2. **Decisão distorcida** — Decisão com base em cenário incompleto.
3. **Execução incorreta** — Ação errada no canteiro.
4. **Retrabalho** — Correção visível.
5. **Corrosão de margem** — Custo do retrabalho come o lucro.
6. **Pressão de caixa** — Escassez força cortes.
7. **Decisões apressadas** — Ciclo se retroalimenta.

**O Control atua no Estágio 1** — detectando a perda de informação antes que ela se transforme em perda financeira.

---

## Conexão com a TPC/TDO

| Conceito TPC | Manifestação no Control |
|--------------|-------------------------|
| ECO | Registro e rastreamento de eventos de corrosão. |
| ICO | Métrica de gravidade (Impacto × Recorrência × Persistência). |
| Fliflexação | Capacidade de detectar e corrigir rapidamente. |
| Capital Preservado | Valor econômico mantido pela correção precoce. |
| Slektip | Padrões P001–P055 — lições reutilizáveis. |

---

## Limitações e Riscos (Viés de Sobrevivência)

- **Dependência de registro:** ECOs só são úteis se forem registrados. Obras com cultura de omissão geram dados pobres.
- **Cultura de culpa:** Se a equipe tem medo de registrar, os ECOs não aparecem. A proteção do ECO é essencial.
- **Calibração do ICO:** Os pesos (Impacto, Recorrência, Persistência) precisam ser calibrados empiricamente.
- **Quase-ECOs:** Falhas que foram evitadas por sorte ou experiência não são registradas, subestimando o risco real.
- **Viés de sobrevivência:** O Control só vê os ECOs que aconteceram. Não vê os que quase aconteceram.

---

## Status

- **Versão:** 0.4 (em desenvolvimento)
- **Próximos passos:** Detecção automática de ECOs via IA; integração com o Copiloto para alertas em tempo real.
