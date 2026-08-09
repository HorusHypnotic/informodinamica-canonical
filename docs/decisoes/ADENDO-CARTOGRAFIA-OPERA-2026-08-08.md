# Adendo à cartografia do Ecossistema OPERA — 08/08/2026

**Estado documental:** `ACTIVE` — registro datado, provisório e não normativo
**Escopo:** evidências posteriores ao checkpoint arquitetural `62b7b09` e topologia provisória do núcleo público OPERA
**Limite:** não altera retroativamente checkpoints, teoria, produtos, contratos ou software

## Preservação histórica

O commit `62b7b09` — `docs: registra checkpoint arquitetural do OPERA` — permanece válido como fotografia do conhecimento disponível no momento em que foi produzido.

Conclusões posteriores não devem reescrevê-lo retroativamente. Este adendo registra evidências públicas e uma decisão humana posteriores àquele checkpoint.

## Revisão da situação do PDIC

A página pública do Canteiro de Obras Digital apresenta **PDIC Market Compass** como produto atual do portfólio, com status **Em calibração**.

Sua identidade pública, histórica e executável converge para:

> **PDIC — Painel Diário de Inteligência da Construção e Imobiliário.**

A classificação anterior de “produto vertical legado” foi superada pela evidência pública posterior. A formulação revisada é: produto vertical atual do portfólio, em calibração, com identidade documental recente em conflito.

A formulação **PDIC — Plataforma Digital de Integração e Colaboração** não representa o produto executável encontrado e deixa de ser usada provisoriamente como nome de uma futura camada de interoperabilidade.

Uma eventual interoperabilidade permanece:

- sem nome;
- sem stack;
- sem implementação;
- sem decisão sobre sua própria necessidade ou existência futura.

## Núcleo público OPERA identificado

O núcleo público identificado é formado por:

- Copiloto de Obras;
- O.P.E.R.A. Atlas;
- O.P.E.R.A. Control.

Essa tríade não esgota o portfólio OPERA. Produtos especializados permanecem fora do núcleo e possuem maturidades distintas.

## Decisão provisória: topologia, não pipeline

Copiloto, Atlas e Control não devem ser tratados como uma sequência linear obrigatória.

Não são canonizados como pipeline universal:

```text
Copiloto → Atlas → Control
```

nem:

```text
Copiloto → Control → Atlas
```

A interpretação provisória das responsabilidades é:

- **Copiloto:** registro e operação;
- **Atlas:** evidência, preservação, reconstrução e prova;
- **Control:** análise, diagnóstico e classificação.

O Copiloto constitui o ponto operacional comum. A partir do registro, a necessidade observada determina quais capacidades são acionadas:

```text
                    COPILOTO
                        |
                registro operacional
                        |
              +---------+---------+
              |                   |
              v                   v
            ATLAS               CONTROL
          preservar             analisar
          reconstruir           diagnosticar
          provar                classificar
```

As ramificações não são mutuamente exclusivas. Um mesmo evento pode:

- permanecer apenas no Copiloto;
- exigir preservação ou reconstrução no Atlas;
- exigir análise ou diagnóstico no Control;
- exigir ambos;
- produzir no Control um diagnóstico que posteriormente precise ser preservado como evidência no Atlas.

A ordem pública “Registrar → Preservar → Diagnosticar” é tratada como narrativa e organização pública enquanto não houver evidência de que constitua ordem técnica obrigatória.

## Princípio provisório

> **Nem toda representação precisa atravessar todos os produtos. A necessidade operacional determina quais capacidades são acionadas.**

Este é um princípio provisório, não uma lei canônica. Ele deverá ser submetido ao primeiro experimento integrado.

## Posição conservadora do Cofre e do Kernel

O Cofre permanece classificado como:

- ferramenta pessoal e acervo privado;
- protótipo de memória do ecossistema;
- possível futura camada de custódia.

Ele não é classificado neste momento como produto público, infraestrutura oficial ou quarto produto do núcleo OPERA.

O Kernel permanece protótipo histórico e interno do Cofre. Não há decisão para extraí-lo como infraestrutura independente.

## Pendências preservadas

Este adendo não resolve:

- a relação entre Pedidos COD e Obra Flow;
- a fronteira entre REO e Atlas;
- a autoridade final do Radar Territorial;
- o conflito Atlas × Control observado anteriormente;
- a situação futura de StockFlow;
- a situação futura de Direcione;
- a situação futura de Canteiro CRM;
- o papel futuro do Cofre;
- o nome, a necessidade e a arquitetura de uma eventual interoperabilidade.

## Implicação para o primeiro experimento

O primeiro experimento permanece limitado a:

```text
uma obra
+ uma quinzena
+ ocorrências reais não sensíveis
```

O experimento não deve obrigar cada ocorrência a percorrer Copiloto → Control → Atlas ou Copiloto → Atlas → Control.

Para cada ocorrência, deverá ser registrado futuramente se surgiu necessidade de:

- **A.** somente registro operacional;
- **B.** preservação ou evidência;
- **C.** análise ou diagnóstico;
- **D.** ambas.

O objetivo é permitir que o fluxo observado revele a topologia necessária antes da implementação de interoperabilidade. Este adendo não cria schemas, contratos ou exemplos de troca.

## Relação com os checkpoints

Este documento complementa, sem substituir ou alterar:

- `CHECKPOINT-ARQUITETURA-OPERA-2026-08-08.md`;
- `CHECKPOINT-INTEGRACAO-OPERA-2026-08-08.md`.

Em caso de leitura futura, os checkpoints permanecem fotografias históricas válidas e este adendo deve ser lido como evidência e decisão provisória posteriores.
