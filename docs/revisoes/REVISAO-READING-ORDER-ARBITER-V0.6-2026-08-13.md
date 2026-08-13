# Revisão pré-commit — Reading Order Arbiter V0.6 — 2026-08-13

## Escopo e autoridade

- Context Gate executado antes da alteração; nenhum blocker novo.
- Mudança limitada ao arbiter, contrato opcional de largura de página, testes e fixtures sintéticas.
- Nenhum PDF real ou manifest out-of-sample foi aberto.
- Structural Router, StructureClassifier, conversor e Markdown Renderer não foram alterados.
- Constituição, Glossário, TPC e produtos não foram modificados.

## Integridade

- Os seis gates externos conservam fórmula e thresholds.
- O particionamento de `geometry_order` usa os mesmos clusters width-invariant validados pelo signal;
  essa alteração é necessária para evitar validação e aplicação de hipóteses distintas.
- Fixtures V0.5 continuam diagonais; fixtures V0.6 também são diagonais.
- Ablações demonstram contribuição necessária dos quatro sinais novos relevantes.
- Não existem condições por conteúdo, `doc_id`, filename ou path.

## Riscos e pendências

- O fallback sem `page_width` usa extensão observada; a futura validação real requer integração
  explícita da largura da página, em missão separada.
- GREEN é sintético e não promove DIRECT_MD nem autoriza expansão.
- Arquivos preexistentes do owner permanecem fora do commit.

Não foram encontrados conceitos canônicos, IDs, duplicidades, referências ou relações órfãs. PRT-002
não se aplica porque não houve fonte externa ou promoção epistemológica.
