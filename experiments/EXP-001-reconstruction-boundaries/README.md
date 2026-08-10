# EXP-001 — Reconstruction Boundaries

**Versão do fixture:** `0.2.0-frozen`
**Estado:** `FIXTURE CONGELADO — PRÉ-PILOTO`
**Natureza:** piloto técnico, sintético e não confirmatório

## Pergunta operacional

Mantido o mesmo inventário proposicional relevante, a codificação explícita das relações entre estado, evidência, decisão, autoridade, bloqueio e próxima ação melhora a reconstrução e a primeira ação quando comparada a um checkpoint convencional forte e a um controle de formatação?

## Limites

- Este diretório não altera a TPC nem cria a TCA.
- Nenhuma rodada experimental foi executada.
- Nenhum modelo, humano ou outro receptor recebeu as condições.
- Todas as pessoas, organizações, locais, recursos e acontecimentos são sintéticos.
- O piloto testa o fixture e a operacionalização, não confirma teoria.

## Estrutura

```text
EXP-001-reconstruction-boundaries/
├── README.md
├── protocol/
│   ├── receiver-prompt.md
│   ├── reconstruction-rubric.md
│   ├── first-action-rubric.md
│   ├── logging.schema.json
│   ├── randomization.md
│   └── evaluator-package.schema.json
├── instances/
│   ├── I01-cold-chain/
│   ├── I02-maintenance-parts/
│   └── I03-relief-supplies/
├── packages/
│   ├── audit-map.json
│   ├── receiver-visible/
│   └── receiver-package-manifest.json
├── review/
│   ├── adversarial-review.md
│   └── validation-report.md
├── scripts/
│   ├── build-blind-packages.ps1
│   └── validate-fixture.ps1
└── manifest/
    └── fixture-manifest.json
```

Cada instância contém `task.md`, `truth.json`, `actions.json`, cinco condições, dois manipulation checks e uma matriz proposicional.

## Condições

- `C2`: checkpoint convencional forte.
- `C3`: representação relacional candidata.
- `C3S`: sham de formatação.
- `C4A`: apresentação de estado obsoleto como vigente.
- `C4F`: fragmentação de um vínculo operacional necessário.

Os nomes externos usados em futuras execuções são neutralizados pelos pacotes opacos em `packages/receiver-visible/`. `packages/audit-map.json` pertence somente à camada interna e nunca deve ser entregue ao receptor ou ao avaliador primário.

## Interpretação das deformações

- `C4A`: **estado obsoleto**. Testa se apresentar como vigente um estado anteriormente correto altera reconstrução ou ação. Atraso, substituição e supressão de evidência são interpretações exploratórias, não categorias discriminadas por este piloto.
- `C4F`: combinação potencial de fragmentação relacional, proximidade, custo de busca e esforço de integração. Um resultado não constitui evidência específica de fragmentação sem experimento discriminante posterior.

## Limitações preservadas

- O prompt induz reconstrução estruturada, pode reduzir diferenças entre condições e pode interagir com C3.
- As instâncias são isomórficas; uma execução total por receptor mitiga aprendizagem, mas a validade externa permanece limitada.
- O operador/custodiante conhece o mapa. O método é duplo-cego parcial, não duplo-cego integral.

## Imutabilidade

Este checkpoint antecede qualquer execução. Alteração substantiva posterior exige registro, nova versão, justificativa, nova auditoria e novo checkpoint. O SHA do commit de congelamento é a referência do piloto.
