# Proposta de Evolução do Protocolo e da TPC — v0.1

**Versão:** 0.1 (Julho de 2026)  
**Autor:** Eduardo Martins  
**Status:** Proposta de refinamento — em desenvolvimento  
**Contexto:** Teoria da Persistência da Coordenação (TPC) — Informodinâmica Aplicada

---

## Leitura da Evolução

A TPC começou como:

> *"A informação perdida gera problemas."*

Agora está caminhando para algo mais específico:

> *"Sistemas coordenados dependem de estados representacionais persistentes. A degradação desses estados altera a probabilidade de falha da coordenação."*

Essa segunda formulação é muito mais testável.

---

## 1. Separar "Estado do Signo" de "Estado do Sistema"

Hoje existe uma pequena mistura conceitual:

```
EO(S,t)
```

é o estado de um signo individual. Mas o ECO normalmente não depende de um único signo. Ele acontece por uma rede de signos e agentes.

**Exemplo:** A planta estava correta. O cronograma estava correto. A ordem de serviço estava correta. Mas o encarregado recebeu uma versão antiga; o engenheiro atualizou sem comunicar; o fornecedor entregou material diferente. O problema não era um signo isolado, mas a coordenação entre signos.

**Proposta:** Adicionar o conceito de **Estado Operacional do Evento**:

```
EO_E(t) = f(EO_{S1}, EO_{S2}, ..., EO_{Sn}, A, R)
```

Ou seja, o estado operacional do evento considera:

- Qualidade dos signos
- Relação entre signos
- Agentes envolvidos
- Fluxo de interpretação

Isso aproxima mais da ideia central de "informodinâmica".

---

## 2. Variável de Fluxo: Latência de Transmissão

A TPC fala de coordenação. Coordenação não é apenas possuir signos bons. É o signo chegar ao agente certo no momento certo.

**Exemplo:** Uma revisão de projeto existe, está correta, tem rastreabilidade — mas chega depois da execução.

**Proposta:** Incluir a variável **Latência de Transmissão**:

| Propriedade | Descrição |
|-------------|-----------|
| Símbolo | L_s |
| Definição | Tempo entre uma mudança no signo e sua assimilação pelo agente que executa. |

**Exemplo:** Projeto revisado às 08:00, equipe recebeu às 14:00 → L_s = 6h

Isso conversa diretamente com o conceito original de **atraso** (um dos cinco mecanismos de deformação).

---

## 3. A Equação da Degradação Pode Evoluir

A fórmula atual:

```
D = Σ αᵢ(1 - Aᵢ)
```

é boa como primeira aproximação. Mas talvez a TPC precise de uma versão onde os fatores interagem, porque baixa atualização + alta complexidade pode ser pior que a soma dos dois.

**Proposta para versão futura:**

```
D = f(P, F, U, C, R, X, L, Ω)
```

Onde **Ω** seria a **densidade de interação do sistema**.

**Exemplo:** Uma obra pequena com 3 pessoas pode sobreviver a um signo ruim. Uma obra com 200 pessoas pode colapsar com o mesmo signo ruim.

---

## 4. Classificação do ECO

Hoje o ECO é binário: E = 0 ou 1. Funciona para começar, mas a teoria já possui uma ideia mais rica com os ECOs do OPERA.

**Proposta:** Criar uma classificação multidimensional:

```
E = (tipo, impacto, recorrência, persistência)
```

**Exemplo:**

```
ECO-045
Tipo: Atualidade
Impacto: 4
Recorrência: 3
Persistência: 5
```

Isso conecta com o ICO (Índice de Corrosão Operacional) já criado no OPERA.

---

## 5. Comparação Temporal (Queda Informacional)

O teste estatístico inicial está correto, mas falta uma dimensão temporal. A pergunta mais poderosa da TPC não é somente:

> *"Eventos com ECO têm EO menor?"*

É:

> *"O EO cai antes do ECO?"*

**Proposta:** Medir o EO em múltiplos pontos temporais antes do evento:

| Ponto | EO | Evento |
|-------|----|--------|
| Dia -7 | 0,85 | — |
| Dia -3 | 0,65 | — |
| Dia -1 | 0,40 | — |
| Dia 0 | — | ECO |

A TPC ganharia força se mostrar que existe uma **"queda informacional"** antes da falha física — uma curva descendente do EO que precede o evento de corrosão.

---

## 6. Hipótese Adicional: Lei da Antecedência Informacional

Com base nas propostas acima, nasce uma nova hipótese:

**H2 — Lei da Antecedência Informacional**

> *"Eventos de corrosão da coordenação são precedidos por uma degradação mensurável do estado operacional dos signos envolvidos."*

Formalmente:

```
dD/dt > 0 ⇒ P(ECO) ↑
```

Ou seja: quando a degradação acelera, a probabilidade do ECO aumenta.

---

## 7. Próximo Documento Sugerido

O próximo documento que seria útil criar:

> **"Modelo de Dados Experimental da TPC v0.1"**

Porque aí se transforma tudo isso em tabelas:

- Tabela de eventos
- Tabela de signos
- Tabela de atributos
- Tabela de ECOs
- Tabela temporal

Seria praticamente o banco de dados científico da teoria. Isso conversa diretamente com o que já está sendo construído no OPERA.

---

## Resumo das Propostas

| # | Proposta | Tipo | Prioridade |
|---|----------|------|------------|
| 1 | Estado Operacional do Evento (EO_E) | Conceitual | Alta |
| 2 | Latência de Transmissão (L_s) | Nova variável | Alta |
| 3 | Degradação com interação de fatores (Ω) | Formalização | Média |
| 4 | Classificação multidimensional do ECO | Operacional | Alta |
| 5 | Medição temporal do EO (queda informacional) | Metodológica | Alta |
| 6 | H2 — Lei da Antecedência Informacional | Hipótese | Alta |
| 7 | Modelo de Dados Experimental | Infraestrutura | Média |

---

**Fim da Proposta de Evolução**
