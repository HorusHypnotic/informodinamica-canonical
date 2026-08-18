# GATE0-EPISODE-AUDIT — Ataque ao episódio coordenacional como unidade

**Data:** 18/08/2026 · **Adversário D** · **SHA-base:** fd1accf · **Objeto:** unidade candidata (TPC-STATISTICAL-ARCHITECTURE-V0).

## 1. A pergunta central

> «Como sabemos onde um episódio começa e termina sem olhar para o outcome?»

O ataque identifica que a versão da Reconstruction define o episódio com uma condição de fechamento implícita vinculada ao outcome ("o desfecho pode ou não ocorrer dentro da janela") e sem regra operacional de abertura. Consequência real se não corrigido: **episódios seriam abertos quando um ECO acontece** (delimitação retrospectiva) → selection bias total → estudo preditivo impossível. A versão vigente, lida literalmente, exige que o desenhista já conheça o outcome para saber o que delimitar. **Achado de Gate 0: o episódio como está escrito não é registrável antes do resultado.**

## 2. Regra de abertura sem outcome

A regra reconstruída usa apenas objetos observáveis em t0, todos pré-outcome:

| Elemento | Fonte observável em t0 |
|----------|------------------------|
| Tarefa/decisão interdependente | Registro de atribuição de trabalho, pedido, fase de cronograma — existe antes do outcome |
| Agentes identificáveis | Equipe declarada no registro |
| Conjunto de representações | Inventário documental vinculado à tarefa (planta, cronograma, lista, pedido) — endereçado por documento |
| Janela temporal | Definida pelo fim natural da tarefa ou por horizonte fixo (ex.: 30 dias) — declarada antes |
| Congelamento de estado | Snapshot de P, U, F, C, R em t0 — registro datado |

**Fechamento:** o episódio termina pelo primeiro de: (i) fim da janela declarada; (ii) conclusão documentada da tarefa (entrega aceita); (iii) cancelamento registrado. **O outcome nunca participa da delimitação** — ele é medido *dentro* da janela, seja 0 ou 1. A condição "desfecho pode ou não ocorrer" é reescrita como: "o resultado é registrado ao final da janela, independentemente do valor" — exatamente o que permite os verdadeiros negativos (seção 3).

## 3. Verdadeiros negativos — o teste crítico

O ataque da seção 11 da missão perguntou: «como o sistema registra situações em que absolutamente nada deu errado?» O protocolo ECP-V0 original **não responde** — ele nasceu como instrumento de classificação de falhas (protocolo de evento). O instrumento corrigido responde por composição: o **episódio** é a unidade de amostragem do denominador; a maioria dos episódios de uma obra real termina com ECOA = 0. A amostragem deve ser **por episódio, não por evento**: registrar todos os episódios abertos em uma janela de coleta (não apenas os que geraram falha). Se o desenho coletar apenas episódios com problema, o risco não é estimável — a taxa de falsos positivos da hipótese se torna incalculável. **Condição de Gate 0: o protocolo de amostragem declara amostragem de todos os episódios, não de eventos.**

## 4. Objções que resistem

Mesmo com a regra reconstruída, três objeções permanecem e são registradas: (i) **granularidade** — uma "tarefa" pode se decompor em subprocessos; o nível de agregação do episódio (macro: fase de obra; micro: atividade) é uma escolha que altera ICC e incidência — pertence ao Gate 3, mas o Gate 0 exige que a escolha seja **fixada antes da coleta**; (ii) **episódios sobrepostos** — agentes participam de vários episódios simultâneos; a dependência entre episódios é estrutural e pertence ao modelo do Gate 3 (mencionada aqui por honestidade); (iii) **o episódio não existe antes de ser declarado** — unidades naturais não são dadas; são convencionadas; a justificativa da convenção (independência do outcome) é o que a torna científica.

## 5. Veredito parcial do Adversário D

**O episódio V0 falha o teste (não registrável antes do outcome); o episódio reconstruído passa condicionado a três fixações:** regra de abertura exclusivamente pré-outcome, fechamento por regras naturais/horizonte fixo, e amostragem de todos os episódios (denominador completo, permitindo verdadeiros negativos). Sem essas fixações, Gate 0 = FAIL para o desenho preditivo.
