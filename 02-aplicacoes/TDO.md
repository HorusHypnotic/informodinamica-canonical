# TDO — Teoria da Degradação Operacional

**Versão:** 0.1.0
**Data:** 26/07/2026
**Autor:** Eduardo Martins
**Status:** Documento canônico — aplicação operacional

---

## 1. Contexto

A TDO é a aplicação da Teoria da Persistência da Coordenação (TPC) ao domínio da construção civil. Ela observa como representações de obra persistem, perdem atributos ou capacidade coordenadora e se relacionam com falhas operacionais. Intervenções incidem primeiro sobre representações; efeitos na coordenação devem ser medidos separadamente.

A TDO é o núcleo teórico do ecossistema **OPERA** — um sistema de gestão operacional baseado na preservação da coordenação.

---

## 2. O Problema Operacional

Na construção civil, a coordenação entre equipes, fornecedores, cronogramas e documentos é o fator determinante entre sucesso e fracasso. A maioria dos problemas operacionais (retrabalho, atrasos, desperdício, erros) não são falhas de execução, mas falhas de coordenação causadas por representações deformadas:

- Um cronograma desatualizado.
- Um projeto com informações conflitantes.
- Um protocolo de comunicação ambíguo.
- Uma lição aprendida que não foi transferida.

A TDO propõe, como hipótese a testar, que parte desses problemas pode ser diagnosticada ou antecipada pela monitoração do estado e da capacidade coordenadora das representações que orientam a obra.

---

## 3. Modelo Operacional

### 3.1. Ciclo da Corrosão Operacional

O ciclo operacional é composto por quatro fases:

```
Coordenação → Persistência → [Deformação] → ECO → Fliflexação → Coordenação (reinício)
```

| Fase | Descrição | Métrica |
|------|-----------|---------|
| Coordenação | Alinhamento inicial entre agentes e representações. | — |
| Persistência | Manutenção da integridade das representações ao longo do tempo. | — |
| Deformação | Perda, atraso, substituição, ambiguidade ou fragmentação de uma representação. | — |
| ECO | Evento de Corrosão da Coordenação — evento observável de falha coordenacional (geração anterior: "Evento de Corrosão Operacional", sinônimo histórico controlado). | ECO (MET-001) |
| Fliflexação | Restauração da coordenação e aprendizado. | IFX (MET-003) |

### 3.2. Métricas da TDO

#### ECO (MET-001) — Evento de Corrosão da Coordenação

> **Nota genealógica:** nomenclatura anterior "Evento de Corrosão Operacional" (geração v0.9); o nome histórico é preservado como sinônimo controlado. O instrumento de registro (data/hora, tipo de deformação, representação afetada, impacto) permanece inalterado.

Cada ECO é registrado como uma unidade de falha de persistência, contendo:

- **Data e hora** da detecção.
- **Tipo de deformação** (perda, atraso, substituição, ambiguidade, fragmentação).
- **Representação afetada** (cronograma, projeto, protocolo, etc.).
- **Impacto estimado** (escala 1 a 5).

#### ICO (MET-002) — Índice de Corrosão Operacional

**Fórmula:** ICO = I x R x P

| Variável | Descrição | Escala |
|----------|-----------|--------|
| I | Impacto do ECO | 1 a 5 |
| R | Recorrência (quantas vezes ocorreu) | Contagem |
| P | Persistência (dias desde a primeira detecção) | Dias |

**Interpretação:**

| ICO | Gravidade | Ação Recomendada |
|-----|-----------|------------------|
| 1–5 | Baixa | Registrar e monitorar. |
| 6–15 | Média | Investigar causa raiz e corrigir. |
| 16–40 | Alta | Acionar protocolo de Fliflexação imediatamente. |
| 41+ | Crítica | Paralisar a atividade afetada até a resolução. |

#### IFX (MET-003) — Índice de Fliflexação

**Fórmula:** IFX = Sensibilidade + Precisão + Velocidade + Aprendizado

| Componente | Descrição | Escala |
|------------|-----------|--------|
| Sensibilidade | Capacidade de detectar deformações cedo. | 1 a 5 |
| Precisão | Capacidade de identificar a causa raiz corretamente. | 1 a 5 |
| Velocidade | Tempo entre detecção e correção. | 1 a 5 |
| Aprendizado | Registro e transferência do aprendizado. | 1 a 5 |

#### Capital Preservado (MET-004)

**Fórmula:** Capital Preservado = EPI - Corrosão Operacional Acumulada

| Variável | Descrição |
|----------|-----------|
| EPI | Economia Potencial Identificada (valor em cenário ideal). |
| Corrosão Acumulada | Soma dos custos de todos os ECOs. |

**Interpretação:** Quanto maior o Capital Preservado, maior a eficácia da infraestrutura de representação da obra.

#### Slektip (MET-005)

Mecanismo de transferência de coordenação entre ciclos operacionais (ex: de uma obra para outra).

**Propriedades:** Persistente, Acionável, Rastreável, Evolutivo.

---

## 4. IMPLEMENTAÇÃO OPERA

O ecossistema OPERA implementa a TDO através de módulos:

| Módulo | Função | Métrica |
|--------|--------|---------|
| OPERA Register | Registro de ECOs em tempo real. | ECO |
| OPERA Control | Cálculo de ICO e Capital Preservado. | ICO, Capital Preservado |
| OPERA Flex | Acionamento de protocolos de Fliflexação. | IFX |
| OPERA Library | Biblioteca de Slektips reutilizáveis. | Slektip |

---

## 5. Estudo de Caso Piloto

**Obra:** [A definir]
**Status:** Grupo controle — sem implementação OPERA.
**Objetivo:** Documentar ECOs naturais da obra para validar HYP-002.

---

## 6. Referências

| Autor | Ano | Obra | Relação com a TDO |
|-------|-----|------|-------------------|
| Hollnagel, E. | 2009 | *The ETTO Principle* | Resiliência operacional. |
| Koskela, L. | 1992 | *Application of the New Production Philosophy to Construction* | Produção enxuta na construção. |
| Woods, D. | 2006 | *Essential Characteristics of Resilience* | Resiliência em sistemas complexos. |

---

**Versão:** 0.1.0
**Data:** 26/07/2026
**Autor:** Eduardo Martins
