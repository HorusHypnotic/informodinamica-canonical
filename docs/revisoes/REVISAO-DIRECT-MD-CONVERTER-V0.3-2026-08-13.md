# Revisão pré-commit — DIRECT_MD Converter 0.3 — 2026-08-13

## Coerência e segurança

- O Structural Router 0.2.0 não foi alterado.
- Não há condição por `doc_id`, filename, path ou conteúdo semântico.
- O corpus ficou restrito aos sete IDs; não houve OCR, API/LLM, acesso a `G:` ou alteração de PDF.
- Outputs e conteúdo permanecem em `.local/`; documentos versionáveis usam somente `doc_id`.

## Achados

Os contratos isolados e testes por fase são reproduzíveis, mas a inferência de colunas gerou falsos
positivos nos sete casos reais. A telemetria do manifesto agora identifica toda intervenção
geométrica. Não foram encontrados conceitos, IDs ou referências canônicas duplicadas ou órfãs.

## Decisão

Preservar a arquitetura 0.3.0 como experimento reprovado, sem autorização operacional. A próxima
iteração deve transformar qualquer intervenção geométrica em hipótese comparável contra a ordem do
parser e exigir validação objetiva antes de substituir `source_order`.
