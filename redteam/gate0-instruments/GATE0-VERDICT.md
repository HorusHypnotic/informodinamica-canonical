# GATE0-VERDICT — Veredito do Red Team do Gate 0

**Data:** 18/08/2026 · **SHA-base:** fd1accf (`reconstruction/tpc-v0.9`) · **Branch:** `redteam/gate0-instruments` · **Governança:** TPC v0.8 canônica intocada; Reconstruction = candidate; Gate 0 = adversarial work. Nenhum artefato ganha status canônico.

## 1. Veredito geral

## **PASS_WITH_REVISIONS**

Os instrumentos atuais **não** passam em sua versão vigente (o ECP-V0 é circular e o episódio não é registrável antes do outcome — nessa forma, seria FAIL). Os problemas são **corrigíveis e corrigidos por patches especificados** (GATE0-PATCHES, sete patches). O piloto G1+G2 **não está autorizado** no estado atual: a autorização existe somente **depois de os patches serem aplicados por decisão explícita** e do pré-registro das escolhas de julgamento (Patch 3). Nenhuma coleta de campo, execução de G1/G2, Ultimate Breaker ou alteração de main é permitida antes disso.

## 2. Vereditos por instrumento

| Instrumento | Veredito | Condição |
|-------------|----------|----------|
| ECP-V0 (ECO) | **FAIL na versão V0** → reparável | Patch 1 (ECOA/ECOB) aplicado |
| H-EO (vetor R) | **PASS_WITH_REVISIONS** | Patches 2 e 3 aplicados; X removido do vetor preditivo |
| Cadeia R→I→A→ECO | **PASS** | Como modelo de medição com Patch 7 (não como cadeia causal linear) |
| Episódio coordenacional | **PASS_WITH_REVISIONS** | Patch 4 aplicado (abertura pré-outcome + amostragem universal) |
| Regras de classificação | **PASS** | Patch 5 fecha a válvula; REFUTATION observável |
| Cegamento | **PASS com registro honesto** | Patch 6; `BLINDING=IMPOSSIBLE` exclui braços preditivos pequenos |

## 3. As dez perguntas do critério de sucesso

| # | Pergunta | Resposta |
|---|----------|----------|
| 1 | É possível medir R antes do outcome? | **SIM** — P, U, R objetivamente; F e C com pré-registro de julgamento (Patch 3) |
| 2 | É possível classificar ECO sem conhecer R? | **SIM, após Patch 1** — ECOA é causalmente neutra; o instrumento V0 respondia não |
| 3 | ECO admite casos sem degradação representacional? | **SIM, após Patch 1** — casos #1, #4, #8, #12, #22 dos sintéticos |
| 4 | Degradação admite casos sem ECO? | **SIM** — casos #2, #6, #10, #17 (exposição sem outcome observável) |
| 5 | Episódios podem ser abertos antes do outcome? | **SIM, após Patch 4** — abertura por objetos pré-outcome; V0 não permitia |
| 6 | Verdadeiros negativos são observáveis? | **SIM, após Patch 4** — amostragem universal de episódios dá o denominador |
| 7 | Dois avaliadores podem aplicar as regras independentemente? | **SIM para outcome e snapshot; PARCIAL para julgamento F/C** — divergências marcadas `DISPUTED` com taxa pública; cegamento duplo definido por Patch 6 |
| 8 | UNOBSERVED_PRECURSOR está suficientemente fechado? | **SIM, após Patch 5** — checklist de cobertura + busca ativa obrigatórios; dois avaliadores não podem divergir sem violar o protocolo |
| 9 | A hipótese pode realmente perder? | **SIM** — abandono publicado para 6 hipóteses (GATE0-ABANDONMENT-CRITERIA); taxa de REFUTATION somável; caso #22 é derrota genuína |
| 10 | Estamos autorizados metodologicamente a iniciar G1+G2? | **NÃO ainda** — autorização condicionada: aplicar patches por decisão explícita + pré-registro (Patch 3) + piloto de confiabilidade antes de qualquer predição |

## 4. Regras de reporte independente cumpridas

O red team encontrou e reportou: circularidade real no ECP-V0 (critério 6); X outcome-derived; cadeia linear com contraexemplos reais; episódio não registrável pré-outcome; válvula UNOBSERVED aberta no V0; manipulação narrativa possível no V0 (casos #1, #10, #22 no teste verde×vermelho); e dois limites não cegáveis (escolha de referente; atribuição causal em episódios com documentação visivelmente defeituosa). Também reportou o que sobreviveu ao ataque: todas as quatro células da matriz são agora possíveis; 22 casos sintéticos têm classificação única obrigatória; as seis hipóteses têm condição de abandono publicada. Nenhum resultado foi favorecido; os patches 1, 2 e 7 **criam** caminhos de derrota que o instrumento anterior fechava.

## 5. O que o Gate 0 não resolve

Permanece para o Gate 1: dimensionalidade real do vetor (1/2/3/6 fatores), confiabilidade empírica, escolha de índice estatístico. Para o Gate 3: granularidade do episódio, modelo de dependência entre episódios, ICC. Para o campo: tudo. O Gate 0 apenas demonstrou que a régua, após os patches, **consegue dizer que estamos errados** — o que a régua V0 não conseguia.
