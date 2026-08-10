# Informodinâmica Aplicada — Documento Canônico

**Versão candidata:** 0.8 (Agosto de 2026)
**Status:** revisão fundacional não consolidada
**Autor:** Eduardo Martins  
**Repositório:** [github.com/HorusHypnotic/informodinamica-canonical](https://github.com/HorusHypnotic/informodinamica-canonical)

---

## Sobre este documento

Este é o **documento canônico** da Informodinâmica Aplicada. Ele tem duas funções:

1. **Governança:** definir a estrutura, o escopo, a terminologia e as regras de evolução do projeto.
2. **Visão geral:** apresentar o programa de pesquisa de forma concisa.

Os detalhes teóricos, metodológicos e empíricos estão em documentos separados:

| Documento | Conteúdo | Caminho |
|-----------|----------|---------|
| Glossário | Definições centralizadas | `GLOSSARIO_CANONICO.md` |
| TPC | Teoria formal | `01-teoria/TPC.md` |
| TDO | Aplicação na construção civil | `02-aplicacoes/TDO.md` |
| Base Matemática | Fundamentos matemáticos | `01-teoria/FUNDAMENTOS_MATEMATICOS.md` |
| Manual do ECO | Guia prático | `MANUAL_ECO.md` |
| Protocolo | Metodologia de pesquisa | `03-pesquisa/PROTOCOLO_EXPERIMENTAL.md` |
| Arquitetura operacional | Papéis, ferramentas e fluxo | `docs/architecture.md` |
| Identidade operacional O.P.E.R.A. | Entidades e invariantes de acesso, organização, obra, recurso e alocação | `docs/decisoes/DEC-ARQ-002-identidade-operacional-opera.md` |

---

## Escopo

A Informodinâmica Aplicada é um programa de pesquisa interdisciplinar que investiga se um arcabouço centrado na **persistência das representações operacionais** oferece poder explicativo e preditivo adicional para coordenação e resultados em sistemas sociotécnicos, digitais, autônomos ou híbridos.

**Não substitui** teorias existentes. Propõe-se como uma lente complementar.

### Arquitetura ontológica candidata v0.8

No domínio da TPC, a representação operacional é o objeto analítico primário. Seu estado `EO(S,t)` e sua capacidade coordenadora relacional `K_R` antecedem, no modelo, a coordenação observada `K_C`. Isso não torna coordenação um efeito necessário: agentes, tarefa e ambiente também condicionam o resultado.

Degradação designa a perda de atributos ou de capacidade representacional. Qualquer índice `D(S,t)` é uma operacionalização candidata desse fenômeno, não o fenômeno em si.

O programa permanece aberto enquanto produzir problemas investigáveis. Pesquisas, experimentos e artigos específicos podem ser concluídos, mas a TPC e a TDO não são tratadas como sistemas fechados ou explicações finais. Modelos, hipóteses e formalizações permanecem sujeitos a crítica, falsificação, substituição e comparação com alternativas.

## Extensões exploratórias

As seguintes linhas estão registradas como **Draft**, sem força canônica e sem status de resultado ou métrica validada:

1. dinâmica probabilística dos estados operacionais;
2. identidade operacional e continuidade rastreável das transformações;
3. decomposição da capacidade coordenadora com modelos concorrentes;
4. condições representacionais da escolha coordenada.

Consulte `03-pesquisa/PROGRAMA_DE_PESQUISA_ABERTO.md`, `03-pesquisa/MODELOS_EXPLORATORIOS.md` e `03-pesquisa/MATRIZ_CONCEITO_HIPOTESE_METRICA_TESTE.md`. A inspiração no Navio de Teseu é filosófica; a Equação de Drake inspira apenas uma estratégia de decomposição. Nenhuma dessas analogias constitui evidência.

## Arquitetura operacional

O núcleo canônico permanece independente das ferramentas de implementação. A documentação em `docs/` define as fronteiras entre memória versionada, workspace de experimentação, agentes e código do ecossistema OPERA. Ideias e protótipos não se tornam canônicos sem a revisão e o ciclo de vida previstos na Constituição e em PRT-001.

No ecossistema O.P.E.R.A., identidade de acesso, organização, obra, recurso, alocação e autorização são conceitos distintos. E-mail, `user_id`, `tenant_id`, nomes legíveis, IDs locais e identificadores experimentais não devem ser promovidos automaticamente a identidade canônica de outro conceito. `Tenant` permanece conceito de implementação até que sua semântica seja avaliada por componente. A decisão arquitetural aplicável está registrada em `docs/decisoes/DEC-ARQ-002-identidade-operacional-opera.md`.

---

## Hierarquia do Programa

```

Informodinâmica Aplicada (programa de pesquisa)
│
▼
Representações operacionais persistentes (objeto analítico)
│
▼
Teoria da Persistência da Coordenação (TPC) — efeitos coordenacionais
│
▼
Teoria da Degradação Operacional (TDO) — aplicação na construção civil
│
▼
ECO, ICO, Fliflexação, Capital Preservado, Slektip — instrumentos em calibração

```

---

## Definições Fundamentais

Todas as definições estão centralizadas no [GLOSSARIO_CANONICO.md](GLOSSARIO_CANONICO.md).

| Termo | Definição resumida |
|-------|-------------------|
| **Coordenação** | Redução compartilhada de incertezas. |
| **Representação** | Estrutura persistente, compartilhada e transmissível que reduz incerteza. |
| **ECO** | Evento observável de falha coordenacional, tratado como desfecho. |
| **ICO** | Impacto × Recorrência × Persistência. |
| **Fliflexação** | Capacidade de restaurar atributos e relações representacionais. |
| **Capital Preservado** | Coordenação preservada que gerou valor. |
| **Slektip** | Representação acionável que transfere contexto coordenador entre ciclos. |

---

## Status das Hipóteses

| Hipótese | Status |
|----------|--------|
| H1 — Persistência maior com OPERA | Em teste |
| H2 — Mais ECOs no piloto | Em teste |
| H3 — ICO menor no piloto | Em teste |
| H4 — Capital Preservado maior no piloto | Em teste |
| H5 — IFX maior no piloto | Em teste |
| H6 — Axioma (coordenação sem representação) | Em investigação |
| H7 — Consequência Fundamental | Em investigação |
| H8 — Inércia Representacional | Agenda de pesquisa |

---

## Critérios de Falseabilidade

A TPC será falseada se:

1. **C1:** Coordenação persistente sem representação.
2. **C2:** Falha de coordenação não precedida por deformação.
3. **C3:** Restaurar a representação não restaurar a coordenação.

---

## Glossário

Consulte o [GLOSSARIO_CANONICO.md](GLOSSARIO_CANONICO.md) para a lista completa de termos e identificadores.

---

**Última atualização candidata:** 2 de agosto de 2026
