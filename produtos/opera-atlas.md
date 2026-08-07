# OPERA Atlas — Capacidade de Evidência

**Em uma frase:** *"A obra deixa um legado aqui."*

---

## Conceito

O OPERA Atlas é a **camada de imutabilidade e rastreabilidade** do ecossistema. Ele congela a verdade operacional da obra em momentos específicos (baseline, fechamentos mensais), garantindo que qualquer estado possa ser reconstruído, auditado e comprovado.

Ele é a materialização do princípio de **event sourcing** (Kleppmann) e da **persistência representacional** da TPC.

---

## O Problema que Resolve

- Disputas contratuais sobre o que foi entregue e quando.
- Perda de contexto financeiro entre planejamento e execução.
- Impossibilidade de auditar decisões passadas.
- Dependência de versões não rastreáveis de documentos.

---

## Princípios de Integridade (I1–I10)

| Princípio | O que significa na prática |
|-----------|----------------------------|
| **I1 — Isolamento de Tenant** | Cada obra tem seus dados isolados. Ninguém fora do tenant acessa. |
| **I2 — Autoridade Server-Side** | O servidor decide, nunca o navegador. Zero manipulação cliente-side. |
| **I3 — Append-Only** | Nada se apaga. Correções geram novos eventos, nunca substituições. |
| **I4 — Irreversibilidade Temporal** | Fechamentos são definitivos. Reaberturas ficam registradas com motivo. |
| **I5 — Lineage de Evidência** | Cada foto, PDF ou anexo carrega quem criou, quando e de qual evento. |
| **I6 — Permissão Contextual** | Acesso depende de (usuário, função, obra, momento). Nunca apenas do cargo. |
| **I7 — Reprodutibilidade** | O estado financeiro de qualquer mês é reconstruível dos eventos originais. |
| **I8 — Falha Segura** | Se houver dúvida, o sistema nega. Nunca degrada para permissivo. |
| **I9 — Determinismo Financeiro** | Mesmo input, mesma saída. Cálculos são matematicamente determinísticos. |
| **I10 — Diferenciação de Estado** | Cada dado carrega seu nível de certeza: prevista, confirmada, consolidada, fechada. |

---

## Conexão com a TPC/TDO

| Conceito TPC | Manifestação no Atlas |
|--------------|-----------------------|
| Persistência | Dados imutáveis e rastreáveis ao longo do tempo. |
| Rastreabilidade | Cada evento tem origem, autor, data e motivo. |
| Fidelidade | O estado financeiro é reconstruível a partir dos eventos originais. |
| Coerência | O sistema garante que não haja contradições entre versões. |
| ECO | Fechamentos que não batem são ECOs financeiros. |

---

## Limitações e Riscos (Viés de Sobrevivência)

- **Complexidade:** A imutabilidade exige disciplina. Correções geram versões, não substituições — o que pode ser confuso para usuários não treinados.
- **Adoção:** O Atlas só funciona se a obra registrar corretamente os eventos. Obras desorganizadas não se beneficiam.
- **Custo de armazenamento:** Manter todas as versões pode ser caro em longo prazo.
- **Falsa segurança:** Ter dados imutáveis não garante que os dados estavam corretos no momento da captura.

---

## Status

- **Versão:** 0.3 (em desenvolvimento)
- **Próximos passos:** Automatização de fechamentos; integração com APIs de sistemas financeiros.
