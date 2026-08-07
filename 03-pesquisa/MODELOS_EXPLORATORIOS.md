# Modelos Exploratórios do Programa de Pesquisa

**Status:** Draft - não validado
**Símbolos preservados:** `EO(S,t)=(P,F,U,C,R,X)`, com `X=Contexto`; `K_R` é capacidade da representação e `K_C`, coordenação observada

## 1. Dinâmica probabilística dos estados operacionais

### Problema

O Estado Operacional descreve exclusivamente uma representação no presente. A linha probabilística pergunta: dado esse estado e seu histórico, quais estados representacionais futuros são plausíveis e com que probabilidades?

Para uma representação (S):

\[
EO(S,t)=\left(P(S,t),F(S,t),U(S,t),C(S,t),R(S,t),X(S,t)\right)
\]

onde (X) mantém o significado canônico de **Contexto**. A transição inicial é expressa por:

\[
\Pr\left(EO(S,t+\Delta t)=e_j\mid EO(S,t)=e_i,H_t,Z_t\right)
\]

em que (H_t) representa o histórico observável e (Z_t), condições ambientais declaradas. A expressão é uma hipótese de modelagem, não uma métrica validada nem uma função de onda.

Exemplo meramente ilustrativo: para uma representação hoje classificada como íntegra, um modelo calibrado poderia estimar 0,60 de permanência, 0,30 de degradação parcial e 0,10 de falha operacional. Esses valores não são parâmetros empíricos do programa.

Métodos candidatos incluem cadeias de Markov, modelos ocultos de Markov, redes bayesianas, análise de sobrevivência, modelos de risco e confiabilidade, Monte Carlo, inferência bayesiana, regressão logística e transições multiestado. A propriedade markoviana não deve ser presumida: o histórico pode ser causalmente relevante.

**Dados necessários:** observações longitudinais com versões, intervenções, ambiente, estado subsequente e censura.
**Possível refutação:** desempenho preditivo fora da amostra não superior a baselines de frequência ou regressão simples.
**Modelos concorrentes:** processos dependentes de histórico, modelos de sobrevivência, regressão e modelos qualitativos de trajetória.

## 2. Identidade operacional (IDR-0013, Draft)

Identidade operacional é a continuidade verificável entre uma representação, suas transformações sucessivas, as decisões associadas e o objeto operacional que ela pretende coordenar.

Ela não equivale à permanência do nome, formato, aparência ou local de armazenamento, nem exige ausência de modificações. A inspiração no Navio de Teseu apenas formula o problema filosófico da identidade através da mudança; não fornece evidência científica.

Propõe-se, sem status métrico:

\[
I(S,t)\in[0,1]
\]

como variável latente candidata ao grau de continuidade. Sua operacionalização poderia considerar versões ligadas, justificativas, autoria, premissas preservadas, decisões e vínculo com o objeto coordenado. Uma representação permanece identificável quando suas transformações mantêm uma cadeia rastreável; esse princípio ainda precisa ser testado contra critérios binários e julgamentos especializados.

Taxonomia provisória:

- **Degradação destrutiva (IDR-0015, Draft):** perda, corrupção ou inacessibilidade do conteúdo.
- **Degradação substitutiva (IDR-0016, Draft):** substituição progressiva de componentes sob aparência de continuidade.
- **Degradação identitária (IDR-0017, Draft):** perda de continuidade suficiente com a representação de origem.
- **Degradação genealógica (IDR-0018, Draft):** impossibilidade de reconstruir versões, justificativas e transformações.

**Dados necessários:** históricos versionados, decisões, responsáveis e objetos coordenados.
**Possível refutação:** ausência de associação reprodutível entre os critérios de continuidade e a capacidade de reconstruir ou executar decisões.
**Modelos concorrentes:** identidade binária, proveniência como grafo, similaridade documental e julgamento qualitativo.

O OPERA Atlas pode ser investigado como mecanismo de preservação de versões, snapshots, fechamentos, auditoria, justificativas, autoria e sequência temporal. Isso não demonstra que o produto resolva integralmente o problema.

## 3. Decomposição da capacidade coordenadora

A capacidade coordenadora da representação (IDR-0020, Draft) é tratada como variável relacional `K_R(S,t;A,T,Z)`. Não é a coordenação `K_C` nem propriedade isolada de `S`. A Equação de Drake inspira somente a estratégia de decompor um fenômeno complexo em fatores investigáveis; seu conteúdo astronômico não é importado.

Um modelo multiplicativo candidato é:

\[
K_{R,\times}(S,t;A,T,Z)=\prod_{i=1}^{n}a_i
\]

Para os seis atributos atuais, (a_i\in\{P,F,U,C,R,X\}). O modelo expressa a hipótese de gargalos, mas não demonstra independência, não define causalidade e pode exagerar valores baixos.

Modelos concorrentes obrigatórios:

\[
K_{+}=\sum_{i=1}^{n}w_i a_i,\qquad \sum_{i=1}^{n}w_i=1
\]

\[
K_G=\prod_{i=1}^{n}a_i^{w_i}
\]

\[
K_I=\sum_{i=1}^{n}w_i a_i+\sum_{i<j}\beta_{ij}a_i a_j
\]

\[
K_L=\begin{cases}
0, & \min(a_i)<\tau_i\\
f(a_1,\ldots,a_n), & \text{caso contrário}
\end{cases}
\]

Os atributos podem ser correlacionados, redundantes, ponderados de modo distinto ou sujeitos a compensações e limiares. Produto, soma ponderada, média geométrica, média harmônica, interações e funções não lineares devem ser comparados por calibração, sensibilidade e validação fora da amostra.

## 4. Antropologia operacional da escolha

Esta linha não propõe uma teoria geral da escolha humana. Investiga apenas como condições representacionais e operacionais alteram a possibilidade de uma escolha coordenada (IDR-0022, Draft).

```text
Objetivo desejado != capacidade de escolher != capacidade de executar != resultado obtido
```

Uma formulação provisória é:

\[
\Pr(E)=f(A,C_c,R,T,M,S_p)
\]

onde (A) é acesso às alternativas, (C_c) capacidade de comparação, (R) confiabilidade das representações, (T) tempo, (M) motivação operacional e (S_p) pressão situacional ou social. Os subscritos evitam confusão com Coerência (C(S,t)) e com a própria representação (S).

**Dados necessários:** alternativas percebidas, representações disponíveis, restrições, decisão, execução e resultado.
**Possível refutação:** condições representacionais não acrescentarem poder explicativo após controles do domínio.
**Modelos concorrentes:** análise qualitativa, utilidade esperada, racionalidade limitada e modelos sociotécnicos de decisão.

## 5. Exemplos investigáveis

- **Cronograma alterado:** testar se premissas, decisões e genealogia permanecem reconstruíveis após mudanças sem histórico.
- **Pedido de material:** estimar risco diante de estoque desatualizado, consumo ausente, fornecedor incerto e mudanças verbais.
- **Projeto revisado:** verificar degradação substitutiva e qual versão orientou a execução.
- **Equipe com informação parcial:** distinguir falha no objetivo compartilhado, escolha, representação e execução.

Os exemplos formulam perguntas e unidades de observação; não constituem evidência.
