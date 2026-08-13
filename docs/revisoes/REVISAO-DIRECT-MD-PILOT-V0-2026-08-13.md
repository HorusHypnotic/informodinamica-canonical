# Revisão pré-commit — DIRECT_MD Pilot V0 — 2026-08-13

## Coerência, segurança e privacidade

- Somente dez identidades `TEXT_NATIVE` foram processadas; não houve expansão para o corpus.
- Nenhum OCR, API, LLM de conversão, upload, acesso a `G:` ou modificação dos PDFs ocorreu.
- Markdown e manifests permanecem em `.local/`, fora do Git.
- Código e documentação versionável não contêm filename, path, texto documental ou metadata privada.
- O relatório sanitizado usa apenas `doc_id` e métricas estruturais.

## Resultado

O piloto revelou três falhas materiais em dez documentos e foi classificado como `RED`. A retenção
textual elevada não compensou perda de relações de formulário, checklist e matriz. O commit é
favorável apenas para preservar a ferramenta experimental, testes, método e evidência negativa;
não autoriza conversão em massa.

## Próxima decisão

Interromper expansão. Uma missão futura deve melhorar roteamento e reconstrução estrutural e então
executar novo piloto independente antes de qualquer lote dos 152 `TEXT_NATIVE`.
