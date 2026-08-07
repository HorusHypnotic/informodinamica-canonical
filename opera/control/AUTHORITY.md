# OPERA Control — Índice de Autoridade

**Estado documental:** `ACTIVE`
**Última revisão:** 31 de julho de 2026
**Escopo:** navegação e precedência das fontes relacionadas ao OPERA Control

Este índice orienta agentes; ele não cria autoridade própria nem altera a hierarquia definida pela Constituição e pela governança documental do repositório.

## Ordem de precedência aplicável

1. `CONSTITUICAO.md` — governança máxima do repositório.
2. `DOCUMENTO_CANONICO.md` — visão institucional e arquitetura documental.
3. `GLOSSARIO_CANONICO.md` — fonte única das definições e IDs.
4. `01-teoria/TPC.md` — teoria formal.
5. `MANUAL_ECO.md` e `02-aplicacoes/TDO.md` — protocolo canônico do ECO e aplicação operacional vigente.
6. `protocols/PRT-001-ciclo-de-vida.md` e `protocols/PRT-002-cartografia-epistemologica.md` — evolução dos IDs e cartografia epistemológica.
7. Documentação de produto e transcrições em `produtos/` e `opera/` — aplicação e apoio, sem poder para redefinir fontes superiores.

Em caso de conflito, preserve as formulações divergentes, reporte-as e aplique a fonte de maior autoridade. Não promova silenciosamente conteúdo de produto ao núcleo canônico.

## Documentos disponíveis

| Documento | Caminho | Classificação | Papel e tratamento |
|---|---|---|---|
| Glossário Canônico | `../../GLOSSARIO_CANONICO.md` | `CANONICAL` | Definições e IDs vigentes de ECO, ICO, Fliflexação, Capital Preservado e Slektip |
| Manual do ECO | `../../MANUAL_ECO.md` | `CANONICAL` | Protocolo vigente do ECO; prevalece sobre guias derivados |
| TDO | `../../02-aplicacoes/TDO.md` | `CANONICAL` | Aplicação operacional vigente, incluindo fórmula, escalas e interpretação do ICO |
| OPERA Control — Capacidade Analítica | `../../produtos/opera-control.md` | `ACTIVE` | Síntese de produto; usar com ressalva quando divergir das fontes canônicas |
| Guia de Registro de ECO | `docs/guia-eco.md` | `ACTIVE` | Transcrição pesquisável de PDF `HISTORICAL`; não normativa e com conflitos documentados |
| Guia de Campo ECO v1.0 | `docs/guia-eco-campo-v1.0.md` | `ACTIVE` | Camada operacional candidata: triagem, nomenclatura e distinção `ICO_campo` |
| Revisão da extração do Guia | `REVISAO_EXTRACAO_GUIA_ECO_2026-07-31.md` | `ACTIVE` | Registro de proveniência, divergências, riscos e decisão pendente |

## Documentos mencionados, mas ainda não disponíveis

| Documento proposto | Destino sugerido | Situação |
|---|---|---|
| Estratégia do Control | `docs/estrategia.md` | Ausente; não classificado |
| Acordo de Trabalho | `docs/acordo-trabalho.md` | Ausente; não classificado |
| Proposta Comercial | `docs/proposta-comercial.md` | Ausente; não classificado |

Um documento ausente não recebe classificação antecipada. Sua autoridade, proveniência, sensibilidade e relação com versões vigentes devem ser verificadas durante a extração.

## Regras para agentes

1. Leia este índice antes de usar documentos específicos do OPERA Control.
2. Para definições ou IDs, consulte primeiro `GLOSSARIO_CANONICO.md`.
3. Use material `ACTIVE` somente como aplicação, evidência ou contexto, sempre subordinado às fontes `CANONICAL`.
4. Use material `HISTORICAL` para proveniência e comparação; não o apresente como estado vigente.
5. Trate material `WORKSPACE` como experimental e sem autoridade, salvo quando a tarefa exigir análise explícita do rascunho.
6. Quando duas fontes divergirem materialmente, informe a divergência e não escolha silenciosamente a fonte inferior.
7. Não implemente escalas, faixas, taxonomias ou regras de negócio extraídas do guia sem a decisão humana registrada na revisão.

## Conflitos atualmente abertos

- O rótulo oficial e o fluxo de triagem estão decididos na camada candidata; a transcrição histórica permanece intacta.
- O produto 1-125 passa a ser denominado `ICO_campo`; sua calibração e relação com outras escalas permanecem abertas.
- Contagem e dias devem ser preservados separadamente dos escores; o banco atual ainda não implementa essa separação.
- A fórmula de Capital Preservado está decidida teoricamente, mas a view atual continua incompatível.
- IFX permanece bloqueado por fórmulas concorrentes e componentes sem definição operacional.

Consulte `REVISAO_EXTRACAO_GUIA_ECO_2026-07-31.md` antes de responder ou implementar algo relacionado a esses pontos.
