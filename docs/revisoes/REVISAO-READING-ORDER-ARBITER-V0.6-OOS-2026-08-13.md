# Revisão pré-commit — Reading Order Arbiter V0.6 — out-of-sample — 2026-08-13

## Escopo

Esta sessão executou somente validação out-of-sample congelada e produziu um relatório sanitizado.
Nenhum comportamento foi alterado. Foram processados exclusivamente os sete `doc_id` autorizados e a
condição de parada foi respeitada após a revalidação.

## Integridade e governança

- Context Gate executado antes da missão; `WARN` limitado à working tree preexistente;
- arbiter e conversor mantiveram os hashes congelados;
- thresholds, gates, pesos, fórmulas, fixtures e ground truth sem diff;
- Structural Router, StructureClassifier e Markdown Renderer sem diff;
- falha registrada sem correção, recalibração ou expansão do corpus;
- resultado RED não promove estado canônico nem redefine conceitos ou IDs;
- PRT-002 não se aplica: não houve fonte externa nem promoção epistemológica.

Não foram encontrados conflitos com Constituição, Documento Canônico, Glossário ou TPC, nem
duplicidades, IDs, referências ou relações órfãs. O relatório é evidência operacional sanitizada e
não altera produto OPERA, Context Gate ou pipeline documental.

## Privacidade e arquivos

Outputs reais e inspeções auxiliares permanecem em `.local/`. Nenhum texto, filename ou path de PDF
foi incluído no Git; o relatório contém somente `doc_id` e métricas estruturais agregadas. Não houve
OCR, API/LLM, acesso a `G:` ou modificação de PDF.

Os arquivos preexistentes do owner em `docs/` e `workspace/` permanecem fora do commit. O commit deve
conter somente este documento e o relatório OOS correspondente.

## Riscos e pendências

A suíte sintética permanece verde apesar de todas as 64 seleções reais serem reversões completas.
Isso demonstra uma lacuna de cobertura, mas não autoriza ajuste pelos sete documentos. A pendência é
uma missão diagnóstica separada sobre convenção vertical e guarda contra reversão integral, seguida
de novas fixtures sintéticas antes de qualquer nova validação real.
