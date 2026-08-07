# Protocolo de Validação da TPC — v0.1 (MVP Científico)

**Versão:** 0.1 (Julho de 2026)  
**Autor:** Eduardo Martins  
**Status:** Proposta de protocolo piloto — em desenvolvimento  
**Contexto:** Teoria da Persistência da Coordenação (TPC) — Informodinâmica Aplicada

---

## 1. Objetivo

Este protocolo descreve o experimento mínimo viável para testar a hipótese central da TPC:

> *"A degradação do estado operacional dos signos precede eventos de perda de coordenação (ECOs)."*

O objetivo não é validar toda a teoria, mas responder a uma pergunta específica e falseável:

> *"Antes de uma falha de coordenação, o estado dos signos apresenta degradação mensurável?"*

---

## 2. Hipótese Principal

**H1 — Degradação precede ECO**

Quanto maior a degradação do estado operacional dos signos utilizados em uma operação, maior a probabilidade de ocorrência de um ECO.

Forma matemática:

```
P(ECO) = f(D)
```

Onde:

- **ECO** = evento de corrosão da coordenação (falha observável)
- **D** = degradação total dos signos envolvidos naquele evento

---

## 3. Unidade de Análise

A unidade de análise não é a obra inteira, mas o **evento de coordenação**.

Exemplos de eventos:

- Execução de uma parede
- Concretagem de uma laje
- Compra de um lote de material
- Alteração de projeto
- Liberação de uma frente de serviço
- Entrega de um pedido
- Transferência de equipe entre frentes

**Por quê?**

- A TPC explica onde uma coordenação específica falha, não explica "obras ruins".
- Eventos são observáveis, delimitáveis e comparáveis entre si.

---

## 4. Seleção dos Signos

Para cada evento, identificar todos os signos operacionais envolvidos.

**Exemplo: Evento de Execução de Alvenaria**

| Signo | Tipo Peirce | Como se manifesta |
|-------|-------------|-------------------|
| Planta arquitetônica | Ícone | Desenho da parede com cotas |
| Cronograma | Símbolo/Índice | Data prevista para execução |
| Ordem de serviço | Símbolo | Instrução formal para a equipe |
| Medição anterior | Índice | Nível de referência já executado |
| Foto de acompanhamento | Ícone | Registro visual da última etapa |
| Checklist de qualidade | Símbolo | Critérios de aceitação |

**Critérios de inclusão de signos**

- O signo foi consultado antes da execução?
- O signo influenciou a ação?
- O signo era persistente (disponível no momento)?

---

## 5. Registro Inicial do Estado Operacional

Antes da execução do evento, para cada signo identificado, registrar seu estado operacional.

**Ficha de Signo — Exemplo**

```
SIGNO: Planta executiva — Pavimento 2
EVENTO ASSOCIADO: Execução de alvenaria — Eixo B
DATA/HORA DO REGISTRO: 15/07/2026 08:30

ATRIBUTOS:
- Persistência (P): 0,95  (disponível, íntegra)
- Fidelidade (F): 0,90   (medidas conferem com projeto?)
- Atualidade (U): 0,70   (última revisão há 3 meses)
- Coerência (C): 0,80    (versão única em circulação)
- Rastreabilidade (R): 1,0 (metadados completos)
- Contexto (X): 0,90     (equipe familiarizada com o desenho)

ESTADO OPERACIONAL (EO) = (0,95; 0,90; 0,70; 0,80; 1,0; 0,90)
```

**Instruções para registro**

- Cada atributo é registrado em uma escala de 0 a 1.
- O método de medição segue a Matriz de Identificabilidade (ver documento anexo).
- O registro é feito antes da execução, se possível, ou o mais próximo do início.

---

## 6. Registro do ECO (Evento de Corrosão da Coordenação)

Quando ocorrer uma falha, registrar o ECO associado ao evento.

**Ficha de ECO — Exemplo**

```
ECO-001
EVENTO ASSOCIADO: Execução de alvenaria — Eixo B
DATA DO EVENTO: 15/07/2026 10:45

ESPERADO: Parede executada conforme planta — abertura de 1,20m
OCORRIDO: Parede executada com abertura de 1,50m

POSSÍVEL CAUSA:
- Atualidade da planta baixa (versão antiga com abertura diferente)
- Contexto: comunicação da revisão não chegou à equipe

SIGNO SUSPEITO: Planta executiva (U = 0,70; X = 0,90)

GRAVIDADE:
- Impacto: Médio
- Retrabalho estimado: 4h
- Custo estimado: R$ 600
```

**Critérios para ECO**

- Retrabalho documentado
- Atraso em relação ao planejado
- Desperdício de material
- Falha de qualidade identificada
- Divergência entre dois agentes sobre a mesma orientação

---

## 7. Variáveis do Experimento

### Variáveis Independentes (Medidas antes do evento)

| Variável | Símbolo | Descrição | Fonte |
|----------|---------|-----------|-------|
| Persistência média | P̄ | Média da persistência dos signos do evento | Fichas de signo |
| Fidelidade média | F̄ | Média da fidelidade dos signos | Fichas de signo |
| Atualidade média | Ū | Média da atualidade dos signos | Fichas de signo |
| Coerência média | C̄ | Média da coerência dos signos | Fichas de signo |
| Rastreabilidade média | R̄ | Média da rastreabilidade dos signos | Fichas de signo |
| Contexto médio | X̄ | Média do contexto dos signos | Fichas de signo |
| Degradação total | D | D = Σ αᵢ(1 - atributoᵢ) | Calculado |

### Variável Dependente (Medida após o evento)

| Variável | Símbolo | Descrição | Fonte |
|----------|---------|-----------|-------|
| ECO | E | ∈ {0,1} — Ocorrência de falha de coordenação | Registro de ECO |

### Variáveis de Controle

| Variável | Descrição | Motivo |
|----------|-----------|--------|
| Complexidade da tarefa | Baixa/Média/Alta | Tarefas complexas podem ter mais falhas |
| Número de agentes | Quantos agentes envolvidos | Mais agentes aumentam chance de descoordenação |
| Duração prevista | Tempo estimado para execução | Tarefas longas podem acumular degradação |
| Tipo de serviço | Alvenaria, concreto, compra, etc. | Diferentes serviços têm diferentes dinâmicas |

---

## 8. Primeira Análise (Antes de Modelos Complexos)

Antes de aplicar regressão logística ou qualquer equação sofisticada, fazer uma **análise descritiva comparativa**:

**Pergunta simples**

> *"Os eventos que geraram ECO tinham menor EO médio?"*

**Cálculo**

Para cada evento, calcular:

```
EO_médio = (P + F + U + C + R + X) / 6
```

Comparar:

- Média de EO_médio para eventos **sem ECO**
- Média de EO_médio para eventos **com ECO**

**Exemplo de resultado esperado**

| Grupo | N | EO médio | Desvio padrão |
|-------|---|----------|---------------|
| Sem ECO | 30 | 0,82 | 0,10 |
| Com ECO | 12 | 0,45 | 0,15 |

Interpretação: Se a diferença for estatisticamente significativa (teste t, p < 0,05), temos um primeiro sinal de que a TPC tem validade empírica.

---

## 9. Modelos Subsequentes (Com Dados Suficientes)

### 9.1. Regressão Logística

Para prever a probabilidade de ECO com base na degradação total D:

```
P(ECO) = 1 / (1 + e^{-(β₀ + β₁·D)})
```

Pergunta: Quanto aumenta a chance de ECO quando D aumenta?

### 9.2. Detecção de Limiar

Para testar se existe um ponto de ruptura θ:

```
E = 1 se D > θ, 0 caso contrário
```

Pergunta: Existe um ponto onde pequenos aumentos de degradação geram grande aumento de falhas?

### 9.3. Calibração dos Pesos

Com dados suficientes, ajustar os pesos αᵢ:

```
D = αP(1 - P) + αF(1 - F) + αU(1 - U) + αC(1 - C) + αR(1 - R) + αX(1 - X)
```

Os dados dirão:

- Qual atributo pesa mais?
- Persistência é mais crítica que contexto?
- Em que domínios cada peso é maior?

---

## 10. Critérios de Sucesso do Piloto

| Critério | Condição | O que significa |
|----------|----------|-----------------|
| C1 | EO_médio é significativamente menor em eventos com ECO (p < 0,05) | A TPC tem poder descritivo |
| C2 | O modelo de regressão logística tem AUC > 0,70 | A TPC tem poder preditivo |
| C3 | Existe um limiar θ que separa claramente eventos com e sem ECO | A TPC tem um princípio de ruptura |

Se os três critérios forem atendidos, a TPC terá sua primeira evidência empírica consistente.

---

## 11. Tamanho Amostral Mínimo

- **N mínimo de eventos:** 30 (para análise descritiva com significância)
- **N ideal de eventos:** 50–100 (para regressão logística com 1-2 variáveis)

**Fonte de dados:** O protocolo de pesquisa TDO/OPERA já prevê a coleta de ECOs em 10 obras. Cada obra pode gerar 5-10 eventos, totalizando 50-100 eventos.

---

## 12. Como Este Protocolo se Conecta à Arquitetura Formal

| Componente da arquitetura | Manifestação no protocolo |
|---------------------------|---------------------------|
| Ontologia | Definição de signos, agentes, objetos, eventos |
| Matriz de Identificabilidade | Métricas de cada atributo (P, F, U, C, R, X) |
| Axiomas | A degradação precede ECO (A5, A6, A7) |
| Proposições | P1, P2, P3, P4 são testadas diretamente |
| Formalização Matemática | As equações P, F, U, C, R, X, D, E são operacionalizadas |
| Métricas de campo | As fichas de signo e ECO fornecem os dados |

---

## 13. Próximos Passos

| Ordem | Ação | Responsável | Prazo estimado |
|-------|------|-------------|----------------|
| 1 | Definir os eventos de coordenação a serem monitorados | Pesquisador + equipe | 1 semana |
| 2 | Criar formulário de ficha de signo (em papel ou digital) | Pesquisador | 2 dias |
| 3 | Criar formulário de ficha de ECO (já existe no OPERA) | Pesquisador | Já disponível |
| 4 | Treinar a equipe de campo no preenchimento | Pesquisador | 2 dias |
| 5 | Coletar dados por 30 dias (ou até ter N ≥ 30) | Equipe de campo | 30 dias |
| 6 | Analisar dados (EO médio vs. ECO) | Pesquisador | 2 dias |
| 7 | Se resultados positivos, aplicar regressão logística e detecção de limiar | Pesquisador | 3 dias |
| 8 | Documentar resultados e refinar modelos | Pesquisador | 5 dias |

---

## 14. A Frase que Define este Protocolo

> *"A TPC não precisa ser provada inteira em um único experimento. Ela precisa responder uma pergunta pequena primeiro: 'A degradação dos signos precede a falha?' Se a resposta for sim, a teoria terá o direito de perguntar mais."*

---

**Fim do Protocolo de Validação da TPC — v0.1**
