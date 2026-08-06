# MET-006 – Auditoria do Instrumento

**Status:** Em auditoria cega (Fase 3)  
**Data:** 2026-08-06  

## Objetivo
Auditar o formulário MET-006 para identificar ambiguidades, falhas de preenchimento e limitações quando aplicado por agentes que não participaram da formulação teórica da TPC.

## Registro de Defeitos (V-Series)

### Problema V-001
- **Campo:** "Descreva o fenômeno em termos concretos"
- **Descrição:** O formulário não explicita que o fenômeno deve incluir agentes humanos e suas interações.
- **Como apareceu:** O agente externo descreveu apenas os artefatos técnicos, ignorando os agentes humanos.
- **Impacto:** A descrição do fenômeno fica incompleta, omitindo a dimensão social da coordenação.
- **Correção proposta:** Adicionar uma nota: "Inclua tanto os agentes (humanos e máquinas) quanto os artefatos que eles utilizam."
- **Status:** Aberta

### Problema V-002
- **Campo:** "Identifique o problema de coordenação que o sistema resolve"
- **Descrição:** O formulário não diferencia "objetivo do sistema" de "problema de coordenação".
- **Como apareceu:** O agente respondeu com o objetivo do pipeline (garantir integridade do código), não com o problema de coordenação (ex: conflito entre velocidade e estabilidade).
- **Impacto:** A análise fica superficial, focando no que o sistema faz, não no que ele coordena.
- **Correção proposta:** Reformular a pergunta: "Que conflito ou assimetria este sistema resolve entre agentes?"
- **Status:** Aberta

### Problema V-003
- **Campo:** "Mapeie as representações persistentes"
- **Descrição:** O formulário não fornece exemplos de representações além das óbvias (código, testes).
- **Como apareceu:** O agente listou apenas código-fonte, resultados de testes e logs, omitindo mensagens de commit, comentários em PRs, status do CI.
- **Impacto:** O mapeamento fica incompleto, perdendo representações cruciais para a coordenação.
- **Correção proposta:** Adicionar uma lista de exemplos: "mensagens de commit, comentários, status de pipeline, artefatos de build."
- **Status:** Aberta

### Problema V-004
- **Campo:** "Descreva os canais pelos quais as representações circulam"
- **Descrição:** O formulário não diferencia "ferramenta" de "canal de circulação".
- **Como apareceu:** O agente listou ferramentas (Git, GitHub Actions), mas não descreveu como as representações circulam entre agentes (ex: notificações, revisões).
- **Impacto:** A descrição dos canais fica técnica, não relacional.
- **Correção proposta:** Reformular: "Como as representações se movem entre os agentes? Quais são os mecanismos de transferência (ex: notificações, reuniões, alertas) e quais ferramentas os suportam?"
- **Status:** Aberta

### Problema V-005
- **Campo:** "Registre os invariantes estruturais"
- **Descrição:** O formulário não define o que são "invariantes" nem fornece exemplos.
- **Como apareceu:** O agente listou artefatos (commits, branches), não os invariantes abstratos (espaço de estados, diferencial, registro de intenções).
- **Impacto:** O campo se torna vago e difícil de preencher.
- **Correção proposta:** Adicionar uma definição e exemplos: "Invariantes são elementos estruturais que se repetem em diferentes domínios. Exemplos: espaço de estados (o que pode ser observado), diferencial (o que mudou), registro de intenções (por que mudou)."
- **Status:** Aberta
