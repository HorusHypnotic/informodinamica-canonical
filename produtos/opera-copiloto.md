# Copiloto de Obras — Capacidade Operacional

**Em uma frase:** *"A obra respira aqui."*

---

## Conceito

O Copiloto de Obras é o **sistema operacional do canteiro**. Ele centraliza todas as informações do dia a dia da obra em um único lugar, substituindo planilhas, cadernos, WhatsApp e memória humana.

Ele não é um "app de gestão" genérico. É uma **representação viva da coordenação operacional** — o que a TPC chama de estado representacional da obra.

---

## O Problema que Resolve

- Informação espalhada em múltiplos canais (WhatsApp, e-mail, papel, planilha).
- Decisões tomadas com base em dados desatualizados ou incompletos.
- Dependência da memória de pessoas-chave (o encarregado que "sabe tudo").
- Perda de contexto entre decisões e execução.

---

## Funcionalidades

| Módulo | O que faz | Conexão TPC |
|--------|-----------|-------------|
| **Equipes** | Registro de presença, alocação, diárias. | Persistência da representação de quem está na obra. |
| **Produção** | Apontamento de produção por frente de serviço. | Fidelidade da representação do avanço físico. |
| **Estoque** | Controle de entrada, saída e consumo de materiais. | Coerência entre estoque planejado e real. |
| **Ocorrências** | Registro de eventos, problemas, alertas. | ECO — o primeiro sinal de que a coordenação falhou. |
| **Cronograma** | Acompanhamento do planejado vs. executado. | Atualidade da representação temporal. |
| **Alertas** | Notificações automáticas (estoque baixo, produção abaixo). | Resiliência representacional — detectar deformações cedo. |

---

## Conexão com a TPC/TDO

| Conceito TPC | Manifestação no Copiloto |
|--------------|--------------------------|
| Representação | Cada registro (presença, produção, estoque) é uma representação da realidade. |
| Persistência | Os dados são armazenados e rastreáveis ao longo do tempo. |
| Deformação | Dados incorretos, atrasados ou faltantes são ECOs em potencial. |
| Fliflexação | Alertas e ocorrências permitem correção rápida. |

---

## Limitações e Riscos (Viés de Sobrevivência)

- **Dependência de alimentação:** O Copiloto só é útil se os dados forem inseridos corretamente.
- **Viés de adoção:** Obras que usam o Copiloto tendem a ser mais organizadas — o que pode superestimar sua eficácia.
- **Quase-ECOs:** Muitas falhas são evitadas por experiência humana, não registradas no sistema.
- **Fricção:** Se o registro for mais trabalhoso do que o benefício percebido, a adoção cai.

---

## Status

- **Versão:** 0.4 (em desenvolvimento)
- **Próximos passos:** Redução de fricção; integração com assistente de voz para registro rápido.
