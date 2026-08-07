# Manual do ECO — Evento de Corrosão da Coordenação

**Versão:** 3.0 (Julho de 2026)
**Autor:** Eduardo Martins
**Contexto:** Núcleo Canônico da Informodinâmica Aplicada
**Status:** Documento canônico — vigente

---

## 1. Origem e Evolução

O conceito de **ECO (Evento de Corrosão da Coordenação)** nasceu no estudo de campo em canteiros de obras, dentro da Teoria da Degradação Operacional (TDO). Inicialmente, foi pensado como uma unidade de observação para registrar perdas operacionais. Com o amadurecimento da Teoria da Persistência da Coordenação (TPC), o ECO ganhou uma função teórica mais ampla: tornou-se a unidade fundamental de observação da degradação representacional.

**Evolução:**

| Fase | Contexto | Função do ECO |
|------|----------|---------------|
| **TDO** | Estudo de caso em canteiros | Unidade de registro de perdas operacionais |
| **TPC** | Arcabouço teórico | Unidade de observação da degradação representacional |
| **OPERA** | Ecossistema tecnológico | Métrica central (MET-001) do sistema |

---

## 2. A Proteção do ECO

### 2.1. Por que ninguém é punido

O ECO é uma **ferramenta de diagnóstico**, não uma ferramenta de avaliação de desempenho. Sua função é identificar onde a coordenação se degradou, não apontar culpados.

**Princípio fundamental:** A corrosão é um fenômeno sistêmico, não individual. Quando um ECO é registrado, a pergunta é *"onde o sistema falhou em preservar a representação?"*, nunca *"quem errou?"*.

### 2.2. Camada de proteção

- O ECO é **anonimizável** em relatórios para terceiros.
- O registro do ECO não gera penalidade para o agente que o reporta.
- O ECO pode ser reportado por qualquer agente do sistema, incluindo supervisores, engenheiros e trabalhadores.

---

## 3. Definição

> **ECO (Evento de Corrosão da Coordenação):** qualquer ocorrência em que uma representação compartilhada se degrada, se perde ou se torna incompatível com a realidade operacional, resultando em perda de coordenação entre agentes.

### 3.1. O que é ECO

- Uma informação que deixa de circular.
- Uma instrução que é interpretada de forma diferente por dois agentes.
- Um registro que não é atualizado quando a realidade muda.
- Um processo que é executado com base em dados desatualizados.

### 3.2. O que NÃO é ECO

- Um erro individual de execução (isso é falha operacional, não corrosão).
- Uma decisão estratégica equivocada (isso é falha de planejamento).
- Um evento externo imprevisível (isso é perturbação ambiental).

---

## 4. Lógica da Coordenação como Distribuição

A TPC parte de uma premissa simples: **coordenação é a redução compartilhada de incertezas**. Quando agentes compartilham representações compatíveis, suas ações se tornam mutuamente previsíveis. Quando essas representações se degradam, a coordenação se perde.

O ECO é o **ponto de observação** dessa perda. Ele marca o momento em que a representação deixou de funcionar como veículo de coordenação.

---

## 5. Agentes como Sensores

Na Informodinâmica Aplicada, **todo agente é um sensor**. Isso significa que qualquer pessoa envolvida na operação pode detectar e reportar um ECO. Não é necessário ser gerente, engenheiro ou analista para identificar que "algo não está fazendo sentido".

**Exemplo:** Um pedreiro percebe que o projeto no papel não bate com o que o mestre de obras pediu ontem. Esse desencontro é um ECO. O pedreiro não precisa saber o que é "corrosão representacional" para reportá-lo — ele só precisa dizer: *"aqui não bate"*.

---

## 6. Exemplos em Diferentes Áreas

| Área | ECO típico | Consequência |
|------|-----------|--------------|
| **Construção civil** | Projeto atualizado no escritório, mas versão antiga no canteiro | Retrabalho, atraso, custo adicional |
| **Saúde** | Protocolo de medicação alterado, mas enfermaria não foi notificada | Erro de medicação, risco ao paciente |
| **Educação** | Calendário escolar atualizado, mas professores não receberam | Falta de planejamento, aulas perdidas |
| **Logística** | Rota de entrega alterada, mas motorista usa GPS desatualizado | Atraso, custo extra, insatisfação |
| **Software** | Documentação da API desatualizada, mas devs usam versão antiga | Bugs, retrabalho, incompatibilidade |

---

## 7. Relação ECO ↔ TPC ↔ TDO

```
TPC (Teoria)
  │
  ├── ECO = unidade de observação da degradação
  │
  ▼
TDO (Aplicação)
  │
  ├── ECO + ICO + Fliflexação = diagnóstico completo
  │
  ▼
OPERA (Sistema)
  │
  └── MET-001 (ECO) + MET-002 (ICO) + MET-003 (Fliflexação)
```

O ECO é o **tijolo fundamental**. Sem ECO, não há ICO (índice). Sem ICO, não há diagnóstico. Sem diagnóstico, não há restauração.

---

## 8. A Frase que Define o ECO

> *"O ECO é o momento em que a representação deixa de coordenar. Ele não é o erro — é o sinal de que o erro está prestes a acontecer."*

---

**Versão:** 3.0
**Data:** 26/07/2026
**Autor:** Eduardo Martins
