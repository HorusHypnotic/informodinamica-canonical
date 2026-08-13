# Revisão pré-commit — DIRECT_MD Pilot V1 — 2026-08-13

## Coerência e segurança

- O commit do Structural Router foi concluído separadamente antes do piloto.
- Exatamente sete `LINEAR_TEXT` foram convertidos; nenhum `STRUCTURED_TEXT` ou
  `STRUCTURAL_REVIEW` foi processado.
- Não houve OCR, API/LLM externa, acesso a `G:`, movimentação ou alteração do acervo.
- Outputs, manifests e material de validação permanecem em `.local/`, ignorados pelo Git.
- A documentação versionável usa somente `doc_id`, métricas agregadas e motivos estruturais.
- Não houve alteração ad hoc do router ou do conversor após a descoberta das falhas.

## Achado

Retenção textual de 100% e ordem monotônica de linhas coexistiram com três perdas materiais de
hierarquia. Isso confirma novamente que retenção não é proxy suficiente de fidelidade estrutural.
Não foram encontrados conceitos, IDs ou artefatos canônicos duplicados ou órfãos.

## Decisão e pendência

O piloto V1 é `RED`; não autoriza expansão. A próxima missão deve tratar reconstrução determinística
de headings, limites de parágrafo e listas em fixtures locais, sem mudar o router para acomodar o
conversor. Depois, executar novo piloto independente nos mesmos sete `doc_id`.
