# Checkpoint — encerramento do DIRECT_MD e baseline da remanufatura documental

**Data:** 13 de agosto de 2026

**Status:** ACTIVE — decisão operacional

**Escopo:** acervo local e pipeline experimental; não altera o núcleo teórico

## Decisão

O experimento que tentou promover `DIRECT_MD` como rota automática geral está encerrado. Seu estado
final é:

**DIRECT_MD = EXPERIMENTAL / RED / FROZEN**

Esse resultado não equivale a reprovar a arquitetura maior:

**DOCUMENT REMANUFACTURING PIPELINE = BASELINE ESTABLISHED**

O pipeline continua válido como problema operacional composto por inventário, deduplicação lógica,
classificação estrutural, roteamento com possibilidade de abstenção, geração de representações,
validação, proveniência e consumo por busca ou sistemas computacionais. Nenhuma rota de representação
está autorizada para execução em massa por este checkpoint.

## Experimento encerrado

O objetivo original era obter Markdown leve, pesquisável e rastreável a partir de PDFs
`TEXT_NATIVE`, preservando estrutura relevante. As iterações V0, V1, V2 e V3 do piloto, os
conversores 0.1.0 a 0.5.1 e os arbiters de Reading Order até V0.6 investigaram retenção textual,
estrutura, ordem de leitura, warnings e decisão conservadora entre source e geometry.

Os resultados históricos RED, YELLOW e GREEN restritos permanecem válidos em seus respectivos
escopos. O último teste out-of-sample congelado produziu:

- sete PDFs e 116 páginas;
- zero `KEEP_SOURCE_ORDER`, 64 `USE_GEOMETRY_ORDER` e 52 `ORDER_UNCERTAIN`;
- 64/64 seleções geométricas como reversões completas falsas;
- dois de quatro controles preservados e 12/20 páginas de controle falsamente reordenadas;
- 52/96 páginas adversariais falsamente reordenadas e 44/96 incertas;
- `page_width` proveniente de CropBox em 116/116;
- determinismo e suíte congelada 73/73: PASS.

O pressuposto `TEXT_NATIVE → DIRECT_MD` foi falsificado: extração textual disponível e retenção alta
não provam fidelidade estrutural nem ordem correta. O experimento não foi promovido por regressão nos
controles e por seleções geométricas confiantes incorretas.

Artefatos congelados:

- arbiter: `b8abb3ccbf2f1589c5c50f9d7e53ec39097f2c8e`;
- conversor 0.5.1: `237380492481c55bddbe8b71cc7a23099885d049`;
- evidência OOS: commit `5ce1211eadaa0898511b569aff02f408ba634dd3`.

A anomalia **64/64 GEOMETRY → FULL ORDER REVERSAL** permanece questão técnica aberta. Convenção do
eixo Y, orientação vertical, transformação de coordenadas e proteção contra reversão integral são
hipóteses futuras, não causas comprovadas.

Código, testes, fixtures, relatórios, hashes e resultados experimentais devem ser preservados. RED é
evidência e não deve ser apagado ou reescrito. Eventual reabertura exige missão explícita, hipótese
testável, fixtures sintéticas adversariais novas, zero recalibração pelos sete PDFs e nova validação
out-of-sample independente antes de qualquer discussão de promoção.

## Princípio operacional

Uma transformação documental automática deve poder se abster quando não houver evidência suficiente
de que preservará a estrutura relevante. Abstenção é comportamento válido do pipeline; cobertura não
justifica forçar classificação ou conversão.

## Proteção do corpus

Nenhum original será excluído, movido ou sobrescrito nesta fase. Outputs derivados permanecem
separados; deduplicação lógica não autoriza exclusão física. Não haverá operação em `G:` sem missão
explícita. `.local/` permanece área operacional não canônica. O plano de converter e descartar PDFs
fica formalmente suspenso até existir política aprovada de preservação e proveniência.

O estado consolidado, as rotas e o backlog estão em
`docs/document-remanufacturing-pipeline.md`. Este checkpoint não altera Constituição, Documento
Canônico, Glossário, TPC, produto OPERA ou protocolos.
