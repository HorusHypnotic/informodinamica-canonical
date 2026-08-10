# EXP-001 — Orquestração pré-execução

**Fixture imutável:** `90bc761c75fe8f75194eee2bb33b508af4481df7`  
**Tag local:** `exp-001-fixture-v0.2.0-frozen`  
**Fixture:** `0.2.0-frozen`  
**Estado:** `EXP-001 PAUSADO — PRÉ-PILOTO`; nenhuma execução iniciada

Este diretório é operacional e fica fora de `EXP-001-reconstruction-boundaries/`. Ele não altera estímulos, truth, grafos, rubricas, prompt, pacotes ou manifesto congelados.

## Dimensão real

O fixture possui cinco condições por instância: C2, C3, C3-sham, C4-A e C4-F. O plano anterior de seis condições não corresponde ao fixture congelado. O piloto real contém:

```text
3 instâncias × 5 condições × 2 repetições = 30 execuções técnicas
```

## Estado operacional

- `randomization/seed.txt`: seed registrada; nunca entregar ao receptor ou avaliador.
- `randomization/condition-map.json`: mapa selado condição↔código; acesso exclusivo do custodiante.
- `execution-plan.json` e `.csv`: ordem completa pré-declarada.
- `protocol/`: executor, ambiente, falhas, exclusões, reposição, cegamento e STOP rules.
- `prepared/first-run/`: primeira execução pronta, ainda não enviada.
- `scripts/validate-preflight.ps1`: valida o plano sem executar receptor.

Nenhum arquivo neste diretório é resultado experimental.

## Pausa

O experimento está pronto quanto ao fixture e ao plano, mas a execução está bloqueada por controle insuficiente do receptor. O executor Codex disponível não oferece confinamento e observabilidade tecnicamente demonstrados para ferramentas e filesystem. Não retomar sem satisfazer R1, R2 ou R3 em `CHECKPOINT-PAUSED.md`.
