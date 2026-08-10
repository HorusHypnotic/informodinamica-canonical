# Checkpoint — EXP-001 pausado antes da primeira execução

**Estado:** `EXP-001 PAUSADO — PRÉ-PILOTO`  
**Motivo:** executor experimental disponível não satisfaz atualmente os requisitos de isolamento e observabilidade.  
**Estado epistemológico:** nenhum resultado experimental observado.  
**Execução:** `0/30`.

## Estado científico

A TCA foi reduzida a uma hipótese experimental estreita sobre reconstrução de estado e preservação/degradação de relações representacionais. Não é tratada como teoria independente confirmada.

O EXP-001 pretende testar se mudanças na estrutura relacional da representação, com fatos relevantes controlados, alteram a reconstrução de estado e a primeira ação de um receptor sucessor. Nenhum resultado experimental existe.

## Fixture canônico

```text
commit:  90bc761c75fe8f75194eee2bb33b508af4481df7
tag:     exp-001-fixture-v0.2.0-frozen
version: 0.2.0-frozen
state:   FIXTURE EXP-001 CONGELADO ANTES DA PRIMEIRA EXECUÇÃO
```

Preservados: 3 instâncias, 5 condições por instância, 15 células, 39 proposições, 15 pacotes receptor-visible, truth, grafos, rubricas, protocolos, hashes e limitações.

## Plano preservado

```text
3 instâncias × 5 condições × 2 repetições = 30 runs
```

Condições: C2, C3, C3-sham, C4-A e C4-F. A randomização está materializada e não deve ser regenerada sem decisão metodológica explícita.

## Estado das execuções

```text
experimental_runs_started = 0
experimental_runs_completed = 0
experimental_outputs_observed = 0
RUN-001 = blocked_preflight_stop6_not_started
RUN-002..RUN-030 = planned_not_started
RUN-001R1 = nunca preparado
```

RUN-001 não conta como execução. A sessão-prova e IT-002–IT-009 são testes fictícios de infraestrutura, não runs.

## STOP-6

O perfil E0 previa Codex/GPT-5 sem ferramentas e sem workspace. O ambiente real apresentou ferramentas callable, filesystem potencial, impossibilidade técnica de desativação e revisão exata não exposta. STOP-6 ocorreu antes de qualquer input experimental.

## Tentativa E2

Foi testado um sandbox Docker/WSL2 descartável com root read-only, usuário não privilegiado, capabilities removidas, rede ausente, mount controlado e estado efêmero. Traversal, caminhos absolutos, descoberta do host, persistência, rede e recriação foram testados com conteúdo fictício.

Resultado: `E2-F0 — FALHA`. O container isolava os processos internos, mas o receptor Codex gerenciado permanecia fora desse domínio. Docker seguro não equivale a receptor experimental confinado. A emenda `pilot-protocol-v0.2.0-candidate` permanece candidata e não congelada.

## Distinção metodológica

- capacidade disponível: ferramenta existe;
- capacidade utilizada: receptor chama a ferramenta;
- informação externa adquirida: ferramenta entrega conteúdo além da condição.

A aquisição externa é a ameaça direta mais forte. No executor atual, não foi possível garantir observabilidade e confinamento suficientes para separar as três propriedades durante um run real.

## Limitações preservadas

- diferença residual C3 × sham;
- scaffold do prompt pode interagir com C3;
- C4-F combina fragmentação e custo de busca;
- isomorfismo entre instâncias;
- necessidade de adjudicação semântica;
- revisão exata de modelo proprietário pode ser invisível;
- isolamento de agentes gerenciados pode não ser controlável;
- presença de ferramentas não equivale automaticamente a aquisição externa.

## Questão metodológica aberta

> Como executar experimentos controlados e reproduzíveis sobre agentes proprietários quando runtime, ferramentas, filesystem e revisão do modelo não estão integralmente sob controle do pesquisador?

Essa questão emerge do EXP-001 e não é resultado da TPC.

## Condições de retomada

- R1: executor text-only tecnicamente controlável;
- R2: executor agêntico com ferramentas e filesystem confináveis e auditáveis;
- R3: decisão metodológica formal, revisada antes da coleta, demonstrando que o perfil disponível é aceitável.

## Regra durante a pausa

Não modificar fixture, regenerar randomização, executar pacotes, quebrar cegamento, interpretar condition-map, adaptar hipótese a material externo ou transformar STOP-6 em evidência teórica.

**Estado correto:** experimento pronto, execução bloqueada por controle do receptor.  
**Próxima ação:** nenhuma até decisão explícita de retomada.
