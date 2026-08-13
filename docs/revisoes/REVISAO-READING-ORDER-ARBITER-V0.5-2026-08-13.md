# Revisão pré-commit — Reading Order Arbiter V0.5 — 2026-08-13

## Escopo e autoridade

- Context Gate executado antes das alterações; nenhum blocker novo.
- Alteração limitada ao arbiter, fixtures sintéticas, testes e documentação metodológica.
- Structural Router 0.2.0, StructureClassifier, renderer, PDFs, teoria e produtos não foram alterados.
- PRT-002 não se aplica: não houve fonte externa ou promoção de conhecimento canônico.

## Achados

- Os 13 cenários obrigatórios possuem ground truth explícito e independente.
- A matriz é diagonal; não há falso geométrico, falso KEEP ou excesso de incerteza.
- Todos os thresholds são campos versionados e possuem teste exato.
- Nenhuma condição depende de semântica, `doc_id`, filename ou path.
- Nenhum conteúdo ou endereço de documento real entrou no diff.

## Riscos e pendências

- GREEN comprova apenas o conjunto sintético declarado, não desempenho em PDFs reais.
- Os sete documentos reais continuam congelados e não foram usados para calibração.
- A próxima revalidação deve tratá-los como conjunto fora da amostra e não ajustar thresholds durante
  a mesma missão.

Não foram identificadas duplicidades, redefinições canônicas, IDs ou referências órfãs introduzidas.
