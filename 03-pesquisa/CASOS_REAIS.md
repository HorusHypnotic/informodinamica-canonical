# Casos Reais — TDO/OPERA

**Propósito:** Documentação de ECOs identificados em campo, com análise TPC e Slektips gerados.

---

## Caso 1 — Movimentação de Betoneira sem Ordem de Serviço

**Data:** 30 de julho de 2026  
**Local:** [Obra de origem]  
**Agentes envolvidos:** Responsável pela obra, 3 transportadores, autoridade incerta (telefone), obra destino incorreta.

### Descrição do Evento
Três rapazes chegaram em uma caminhonete para retirar uma betoneira, alegando que era para uma obra em um posto. Não souberam informar quem autorizou a retirada. Ao ligarem para uma referência, a informação não foi confirmada. Descobriu-se que a obra destino estava errada. A única barreira para a retirada foi a presença do responsável.

### Análise TPC
- **Representação ausente:** Não havia ordem de serviço.
- **Deformação:** Perda (ausência de protocolo) + Fragmentação (autorização não rastreável) + Substituição (destino errado).
- **ECO:** Coordenação quebrada na movimentação de ativo.

### ICO Estimado
- Impacto (I): 3
- Recorrência (R): 4
- Persistência (P): 5
- ICO = 60 (Vermelho)

### Slektip Gerado
> *"Toda movimentação de equipamento deve ser precedida por uma ordem de serviço rastreável, contendo origem, destino, autorização e confirmação digital."*

### Ação Corretiva
- Criação do Protocolo de Movimentação de Ativos (PMA).
- Implementação no Copiloto de Obras.
- Treinamento das equipes.

### Status
- [ ] Protocolo criado
- [ ] Implementado no sistema
- [ ] Treinamento realizado
- [ ] Revisão pós-implantação

---

## Caso 2 — Comunicação de Pausa sem Alinhamento

**Data:** 30 de julho de 2026  
**Local:** [Obra pausada]  
**Agentes envolvidos:** Funcionário, dono da obra, patrão (em viagem), equipe.

### Descrição do Evento
Em uma obra pausada por baixo rendimento, um funcionário comunicou ao dono da obra que ela estava pausada, sem saber o motivo real (a equipe não está rendendo custo-benefício). O patrão, ausente, não havia alinhado a comunicação com a equipe.

### Análise TPC
- **Representação:** Status oficial da obra.
- **Deformação:** Fragmentação (informação cortada) + Perda (motivo real não transmitido) + Atraso (comunicação não chegou antes da ação).
- **ECO:** Comunicação de status sem alinhamento.

### ICO Estimado
- Impacto (I): 2
- Recorrência (R): 4
- Persistência (P): 3
- ICO = 24 (Laranja)

### Slektip Gerado
> *"Nenhuma comunicação sobre status de obra deve ser feita sem alinhamento e contexto. O gestor deve ser a fonte da verdade sobre o status operacional."*

### Ação Corretiva
- Criação do Protocolo de Comunicação de Status (PCS).
- Comunicação formal ao dono da obra sobre os motivos da pausa.
- Alinhamento interno antes de qualquer comunicação externa.

### Status
- [ ] Protocolo criado
- [ ] Implementado
- [ ] Treinamento realizado
- [ ] Revisão pós-implantação

---

## Caso 3 — [Em andamento]

*Adicione novos casos aqui seguindo o template.*

---

## Template para Novos Casos

```markdown
## Caso N — [Título do ECO]

**Data:** [DD/MM/AAAA]
**Local:** [Descrição]
**Agentes envolvidos:** [Lista]

### Descrição do Evento
[O que aconteceu]

### Análise TPC
- **Representação:** [Qual representação]
- **Deformação:** [Perda / Atraso / Substituição / Ambiguidade / Fragmentação]
- **ECO:** [Descrição]

### ICO Estimado
- Impacto (I): [1-5]
- Recorrência (R): [1-5]
- Persistência (P): [1-5]
- ICO = [valor]

### Slektip Gerado
[Lição aprendida]

### Ação Corretiva
[O que foi feito ou será feito]

### Status
- [ ] Ação iniciada
- [ ] Implementada
- [ ] Validada
```

---

Última atualização: 31 de julho de 2026
