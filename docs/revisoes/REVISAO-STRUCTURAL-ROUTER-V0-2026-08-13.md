# Revisão pré-commit — Structural Router V0 — 2026-08-13

## Coerência e segurança

- A mudança é operacional e derivada; não redefine Constituição, Glossário, TPC, IDs ou protocolos.
- Nenhuma classificação temática ou cartografia epistemológica é criada; `PRT-002` não se aplica.
- Nenhum PDF foi convertido, modificado, movido ou enviado; não houve OCR, API/LLM ou acesso a `G:`.
- Saídas detalhadas, paths e logs permanecem locais e ignorados pelo Git.
- Código e documentação versionável contêm somente métricas agregadas e `doc_id` sanitizado.

## Achados e decisão

O router 0.2.0 bloqueou os três adversariais históricos, preservou os dois passes inequívocos e
reteve os cinco casos com avisos fora de `DIRECT_MD` silencioso. Uma revisão independente causou
endurecimento documentado da versão 0.1.0 para 0.2.0. Os sete candidatos finais foram cobertos por
controle histórico ou verificação raster adicional sem sinal estrutural perigoso observado.

Não foram encontrados conceitos, IDs, referências ou relações canônicas duplicadas ou órfãs. O
estado `GREEN` autoriza somente propor um segundo piloto controlado sobre a população linear; não
autoriza lote nem mudança no conversor.

## Pendência

Próxima missão recomendada: segundo piloto `DIRECT_MD`, limitado aos sete `LINEAR_TEXT`, com
validação estrutural independente e condição de parada ao primeiro falso positivo material.
