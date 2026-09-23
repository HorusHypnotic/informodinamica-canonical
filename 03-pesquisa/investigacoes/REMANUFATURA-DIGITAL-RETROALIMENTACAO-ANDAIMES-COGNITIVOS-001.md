# Remanufatura Digital com Retroalimentação e Andaimes Cognitivos — investigação 001

**Data:** 2026-09-23
**Status:** CANDIDATE / INVESTIGAÇÃO
**Escopo:** Informodinâmica × Control Tower × Vitrine Digital × PETECO

## Pergunta

Como transformar uma operação comercial digital em um sistema que não apenas registra execução, mas reutiliza evidência para modificar sua próxima versão, enquanto andaimes cognitivos reduzem omissões e melhoram decisões humanas e dos agentes?

## Material para remanufatura

### Digital Thread / NIST
NIST descreve Digital Thread como fluxo de informação ao longo do ciclo de vida, conectando dados normalmente isolados. As peças úteis são continuidade, interoperabilidade, reutilização e rastreabilidade entre etapas.

Fontes:
- https://www.nist.gov/publications/methodology-digital-twins-product-lifecycle-supported-digital-thread
- https://www.nist.gov/publications/using-graphs-link-data-across-product-lifecycle-enabling-smart-manufacturing-digital
- https://www.nist.gov/publications/reference-architecture-integrate-heterogeneous-manufacturing-systems-digital-thread

### Orbit
Orbit oferece tarefas duráveis, rastreamento de intenção, estados persistentes, associação tarefa-commit, audit log, revisão posterior e friction ledger.

Peças remanufaturáveis: identidade durável da unidade de trabalho; reconstrução intenção → plano → execução → revisão; auditabilidade; fricção como dado; revisão contínua.

Fonte: https://github.com/constellation-works/orbit

### Jarvis
Jarvis formaliza colaboração humano-agente em WorkSessions governadas por política, revisão, contribuições atribuíveis, evidência portátil e aprendizado compartilhado.

Peças remanufaturáveis: sessão durável; política antes da autonomia; evidência durante o trabalho; aprendizagem proposta e governada; contribuição atribuível; outcome posterior sem reescrever silenciosamente o histórico.

Fonte: https://github.com/Flow-Research/jarvis

## Hipótese de arquitetura

A unidade remanufaturada pode ser uma **operação comercial versionada**:

**INTAKE → REPRESENTAÇÃO → HIPÓTESE → DECISÃO → EXECUÇÃO → EVIDÊNCIA → REVISÃO → APRENDIZADO → REMANUFATURA → NOVA VERSÃO**

A próxima versão herda seletivamente evidências e aprendizados governados da anterior.

## Cinco componentes candidatos

### 1. Digital Thread Comercial
Conecta reunião, proposta, decisão, ativo comercial, campanha, contato, negociação, contrato, entrega, evidência e aprendizado.

### 2. Ledger de Evidência
Cada ação material pode carregar identificador, intenção, ator, estado, custo, artefatos, evidência, resultado, revisão, nível epistemológico e relações.

### 3. Andaimes Cognitivos
O sistema não apenas pede campos. Ele explicita:
1. informação ausente;
2. decisão dependente;
3. risco da ausência;
4. autoridade capaz de fornecê-la;
5. possibilidade de continuidade parcial;
6. evidência que encerra a pendência.

Exemplo: se o preço da CASA-01 estiver ausente, divulgação institucional pode continuar, mas comunicação de preço e parte da qualificação econômica ficam bloqueadas.

### 4. Motor de Retroalimentação
Resultado não altera estratégia automaticamente.

**REGISTRO → SINAL → ASSOCIAÇÃO → CORRELAÇÃO RECORRENTE → EXPERIMENTO → EVIDÊNCIA CAUSAL**

A retroalimentação carrega seu nível de evidência.

### 5. Motor de Remanufatura
Recebe versão anterior, evidências, fricções, resultados, objeções, decisões humanas e aprendizados aprovados. Produz proposta de mudança, nunca mutação silenciosa.

**VERSÃO N → DELTA OBSERVADO → PROPOSTA DE REMANUFATURA → REVISÃO → VERSÃO N+1**

## Piloto Padilha — CASA-01

### Intake
Preço, características, fotos, condições, financiamento, CTA, disponibilidade de visita e documentação comercial pertinente.

### Andaime
Preço ausente: bloqueia comunicação de preço e parte da qualificação econômica.
Fotos ausentes: bloqueiam formatos de ativação visual dependentes delas.
Margem ausente: não bloqueia divulgação, mas impede análise econômica segura de concessões e piso de negociação.

### Execução
**PÁGINA → CONTEÚDO → MÍDIA → CONTATO → QUALIFICAÇÃO → VISITA → PROPOSTA → NEGOCIAÇÃO**

### Retroalimentação
Objeções recorrentes podem gerar proposta de mudança, mas não são automaticamente tratadas como causa de venda ou perda.

### Remanufatura
Preservar versão anterior, produzir delta, revisar mensagem/qualificação/oferta e comparar o ciclo seguinte.

O mesmo imóvel pode gerar lead de construção: “não compro esta casa, mas quero construir algo semelhante”. Registrar a relação sem misturar os dois resultados.

## WorkUnit candidato

Campos candidatos: id, objective, owner, authority, context, dependencies, hypotheses, decisions, actions, evidence, frictions, outcomes, learning_proposals, accepted_learning, remanufacture_proposals, previous_version, next_version.

Não é schema aprovado.

## Regras candidatas

1. Sem evidência, não existe PASS.
2. Resultado não reescreve hipótese histórica.
3. Aprendizado observado não vira regra automaticamente.
4. Remanufatura gera delta revisável.
5. Informação sensível permanece segregada da superfície pública.
6. Andaime explica consequência, não apenas ausência.
7. Fricção é dado operacional.
8. Humano mantém autoridade sobre decisões comerciais irreversíveis ou sensíveis.
9. Git/GitHub pode preservar versão e evidência sem precisar ser a interface final do cliente.
10. A Vitrine pode apresentar camada amigável sobre a fonte de verdade.

## Arquitetura candidata

**CLIENTE/OPERADOR → VITRINE/COCKPIT → ANDAIMES COGNITIVOS → WORKUNIT/LEDGER → PETECO/AGENTES → EVIDÊNCIAS + RESULTADOS + FRICÇÕES → REVISÃO/APRENDIZADO → REMANUFATURA → DELTA → HUMANO/GOVERNANÇA → VERSÃO N+1**

## Diferença candidata para CRM

Além de perguntar “em qual estágio está o cliente?”, o sistema pergunta:

**O que esta operação ensinou que deve modificar a próxima versão da própria operação?**

A proposta não elimina CRM. É uma camada de aprendizagem, governança e evolução sobre CRM, Vitrine, GitHub e demais sistemas.

## Próximos testes

- **TEST-01 CASA-01 Cognitive Scaffold:** intake em que cada ausência indique decisão afetada e bloqueio parcial.
- **TEST-02 Feedback sem causalidade falsa:** distinguir exposição, contato, qualificação, visita, proposta e venda.
- **TEST-03 Remanufacture Delta:** gerar delta N → N+1 sem alterar versão anterior.
- **TEST-04 Friction Ledger:** transformar fricções reais em candidatos a processo, automação ou andaime.
- **TEST-05 Cliente observável:** derivar visão simples do que foi decidido, executado, gasto, observado, aprendido e proposto.

## Critério para promoção

Não canonizar por elegância conceitual. Promover componentes somente após operação real, evidência preservada, fricções e falhas documentadas, benefício observável, revisão contra a Control Tower e decisão explícita.

Até lá: **CANDIDATE**.
