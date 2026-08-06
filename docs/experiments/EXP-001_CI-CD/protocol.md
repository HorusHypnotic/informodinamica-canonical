# Protocolo Experimental: EXP-001 — Dinâmica de Desacoplamento em Sistemas de Integração Contínua e Entrega Contínua (CI/CD)

**Autor:** Equipe de Pesquisa em Informodinâmica (TPC)  
**Versão:** 1.0.0-rc.1  
**Status:** Ativo / Calibração MET-009B  

---

## 1. Contexto e Fundamentação Teórica

A Teoria dos Processos Coordenativos (TPC) postula que sistemas complexos (sejam artificiais, como pipelines de software, ou vivos, como equipes cirúrgicas e canteiros de obras) mantêm sua coerência funcional por meio da contínua sincronização entre o espaço de estados físicos/operacionais e o espaço de representações simbólicas (commits, logs, registros de enfermagem, atas).

O EXP-001 constitui o primeiro teste empírico formal da TPC em um domínio artificial altamente regido por automação: o pipeline de Integração Contínua e Entrega Contínua (CI/CD). O objetivo central é observar, injetar degradações controladas e medir a Entropia de Coordenação resultante do desacoplamento entre o código real executado e a representação formal mantida nos artefatos de controle.

---

## 2. Hipótese Formal

> "Sistemas coordenativos podem manter elevada coerência interna aparente (builds passando, testes unitários verdes) enquanto perdem progressivamente o acoplamento com o fenômeno real que representam (requisitos de usuário, estabilidade em produção, latência de integração real). A capacidade de detectar e corrigir esse desacoplamento depende fundamentalmente da independência, observabilidade e revisão contínua dos canais de realimentação."

---

## 3. Arquitetura do Sistema de Referência (Baseline)

Para garantir a reprodutibilidade e a mensurabilidade, o EXP-001 utilizará um **sistema de referência deliberadamente simples**, porém com mecanismos explícitos de calibração incorporados.

### 3.1. Objeto de Estudo
- Uma API REST de calculadora/estoque, com três endpoints públicos.
- Repositório Git com *branches* protegidos, exigindo *Pull Requests* e *status checks*.

### 3.2. Mecanismos de Calibração Incorporados (Baseline)

| Nível TPC | Mecanismo | Descrição |
| :--- | :--- | :--- |
| **N1 - Coerência Sintática** | Linter + Compilador | Impede commits com erros de sintaxe. |
| | Testes Unitários | Cobertura conhecida (ex: 92% de linhas). |
| **N2 - Acoplamento Semântico** | Testes de Contrato | Validam a resposta da API contra um *schema* OpenAPI fixo. |
| | Testes de Integração | Executam a aplicação em container e testam a comunicação com dependências (ex: banco de dados *mockado*). |
| | Testes *Smoke* pós-deploy | Requisição de *health check* no ambiente de *staging* antes do *merge*. |
| **N3 - Meta-Acouplamento** | Alertas de Queda de Cobertura | O pipeline falha se a cobertura total cair abaixo de 90%. |
| | Validade do Contrato | O *schema* OpenAPI possui data de validade e exige revisão manual a cada 30 dias. |

> **Nota**: Cobertura de 92% não é sinônimo de "sistema robusto". A cobertura é apenas um *marcador conhecido*. O que define a robustez é a *independência* entre os canais (ex: o teste de contrato não usa a mesma lógica do código que está testando).

---

## 4. Definição Operacional das Latências Informodinâmicas

| Símbolo | Instante | Definição |
| :--- | :--- | :--- |
| **T₀** | **Desacoplamento** | O momento exato em que o fenômeno (mundo real) muda, mas a representação (código + configurações) ainda reflete o estado anterior. *Ex: o commit com o erro é feito no repositório.* |
| **T₁** | **Evidência Disponível** | O momento em que o primeiro sinal do fenômeno *está disponível* para ser observado por algum canal (log, métrica, requisição de usuário). |
| **T₂** | **Detecção** | O momento em que o sistema *alerta* ou *interrompe* a execução devido à divergência identificada. |
| **T₃** | **Resposta** | O momento em que uma ação corretiva *começa* a ser executada (ex: um *hotfix* é iniciado). |
| **T₄** | **Restauração** | O momento em que o acoplamento é restabelecido (ex: o *hotfix* é aplicado em produção e a métrica volta ao normal). |

**Cálculo das Latências:**

| Grandeza | Fórmula | Significado |
| :--- | :--- | :--- |
| **Latência de Observação** | T₁ - T₀ | Quão rápido o sistema gera um sinal bruto do mundo. |
| **Latência de Detecção** | T₂ - T₀ | Intervalo entre o erro e o momento em que alguém/algo sabe que há um erro. |
| **Latência de Resposta** | T₃ - T₂ | Tempo entre a detecção e o início da correção (inclui decisão humana ou automação). |
| **Latência de Restauração** | T₄ - T₃ | Tempo necessário para a correção surtir efeito no mundo real. |
| **Latência Total de Recalibração** | T₄ - T₀ | O ciclo completo de desacoplamento → reacoplamento. |

---

## 5. Protocolo dos Sete Experimentos de Degradação Controlada

Cada experimento consiste em uma intervenção deliberada que **degrada ou remove um canal de calibração específico**, a partir da linha de base (`main`).

| ID | Nome | Degradação Injetada | Canal Afetado | Hipótese de Latência |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Erro de Sintaxe | Inserir vírgula faltando em um arquivo crítico. | N1 - Compilador | Detecção em < 2 min (T₂ - T₀). |
| **02** | Erro Lógico Coberto | Alterar lógica de desconto, mas teste espera valor antigo. | N1 - Teste Unitário (viciado) | Detecção em < 5 min. |
| **03** | Caso de Borda Não Coberto | Inserir divisão por zero sem teste correspondente. | *Nenhum no pipeline.* | Detecção > 1h (produção) ou por usuário. |
| **04** | Desalinhamento de Requisito | Implementar R$ 10 fixo, mas requisito pede 10%. | N2 (Acoplamento) | Detecção NULA pelo pipeline. |
| **05** | Divergência de Ambiente | Usar variável de ambiente que só existe localmente. | N2 - Integração | Detecção em staging/produção (minutos/horas). |
| **06** | Mudança Externa | API externa muda campo `price` para `amount`. | N2 - Contrato | Detecção via health check externo (horas/dias). |
| **07A** | Cegueira do Detector | Desativar webhook que dispara o pipeline. | N3 - Meta | Nenhuma detecção; falso verde eterno. |
| **07B** | Ilusão de Calibração | Pipeline roda, mas scripts sempre retornam `exit 0`. | N3 - Meta | Falso verde com aparência de saúde. |

---

## 6. Critérios de Coleta e Registro

Para cada experimento, registrar:
1. Timestamps T₀ a T₄ com resolução de segundos.
2. Canal que efetivamente detectou.
3. Evidência observada (log, alerta, reclamação).
4. Custo da correção (opcional).

Dados armazenados em: `results/dataset-001.csv`

---

## 7. Critérios de Validação da Hipótese

A hipótese será corroborada se:
1. Exp 03, 04, 06, 07A, 07B apresentarem Latência de Detecção > 1 hora (ou infinita).
2. Exp 01 e 02 apresentarem < 10 minutos.
3. Exp 07B demonstrar que *falso verde é mais perigoso que ausência de sinal*.
