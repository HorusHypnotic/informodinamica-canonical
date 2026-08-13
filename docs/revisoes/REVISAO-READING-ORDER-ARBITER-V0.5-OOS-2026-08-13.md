# Revisão pré-commit — Reading Order Arbiter V0.5 out-of-sample — 2026-08-13

## Escopo revisado

Somente dois relatórios sanitizados desta validação. Código, thresholds, gates, pesos, heurísticas,
testes, Structural Router, StructureClassifier e renderer permaneceram sem diff.

## Integridade e privacidade

- Exatamente sete IDs foram processados; não houve expansão.
- Conteúdo, filenames, paths, PDFs e manifests reais permanecem em `.local/`.
- O relatório contém apenas `doc_id`, métricas agregadas e hashes de código versionado.
- Arquivos preexistentes do owner foram preservados e ficam fora do commit.
- Não foram criados conceitos canônicos, IDs, duplicidades ou relações órfãs.
- PRT-002 não se aplica porque não houve fonte externa ou promoção epistemológica.

## Achados e risco

4/4 controles foram preservados, 0 falsos GEOMETRY ocorreram e o determinismo passou. A incerteza em
116/116 páginas impede classificação GREEN. Os três golden failures continuam estruturalmente não
resolvidos. A conclusão YELLOW é proporcional à evidência e não autoriza expansão.
