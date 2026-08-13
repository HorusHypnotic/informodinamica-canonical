# Revisão pré-commit — DIRECT_MD Converter 0.2 — 2026-08-13

## Coerência e segurança

- O Structural Router 0.2.0 não foi alterado.
- A mudança é operacional e não redefine teoria, Glossário, IDs ou protocolos.
- Código e testes não contêm exceção por `doc_id`, filename, path ou conteúdo semântico.
- Nenhum texto, PDF, Markdown local, manifest ou imagem de validação foi preparado para commit.
- O piloto ficou restrito aos sete IDs previstos, sem OCR, API/LLM ou acesso a `G:`.

## Achados

A geometria melhorou detecção de headings e parágrafos, e checklists vetoriais ambíguos agora geram
warning sem estado inventado. Ainda assim, três falhas materiais persistem. Retenção e determinismo
não compensam ordem incorreta ou hierarquia inventada. Não foram encontrados IDs, conceitos ou
referências canônicas duplicadas ou órfãs.

## Decisão

O código 0.2.0 e suas fixtures são preservados como experimento reprovado e base reproduzível. Não
há autorização para expansão. A próxima iteração deve separar reconstrução da ordem de leitura de
classificação hierárquica e validar cada uma com fixtures de matrizes de transformação reais, porém
sanitizadas/sintéticas.
