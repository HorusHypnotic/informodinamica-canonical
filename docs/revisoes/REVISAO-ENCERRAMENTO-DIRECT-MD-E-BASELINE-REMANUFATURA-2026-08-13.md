# Revisão pré-commit — encerramento do DIRECT_MD e baseline da remanufatura — 2026-08-13

## Escopo revisado

Foram revisados o checkpoint operacional de encerramento, o baseline do pipeline e três documentos
operacionais preexistentes atualizados para refletir o estado congelado. Nenhum código, teste,
fixture, PDF, output derivado ou produto OPERA foi alterado.

## Fontes confrontadas

- `AGENTS.md`, `CONSTITUICAO.md`, `DOCUMENTO_CANONICO.md` e `GLOSSARIO_CANONICO.md`;
- índice vigente `context-gate/projects/informodinamica-canonical.json` e checkpoint
  `context-gate-v1-canonical-green`;
- `docs/context.md`, `docs/governanca_documental_v0.7.1.md` e documentação operacional de inventory,
  deduplication, classificação PDF, Structural Router e PDF-to-Markdown;
- índices locais completos de inventário, deduplicação e classificação;
- relatórios sanitizados dos pilotos DIRECT_MD e do Reading Order Arbiter até V0.6 OOS.

## Coerência e conflitos

Não foi encontrado conflito material com Constituição, Documento Canônico, Glossário, TPC,
checkpoint vigente ou decisão posterior aplicável. Nenhum conceito, ID, protocolo ou estado
epistemológico do núcleo foi criado ou redefinido; PRT-002 não se aplica.

Foi encontrada uma divergência operacional não material: o resumo local histórico da classificação
V1.1.0 chamou os 152 `TEXT_NATIVE` de “conversão automática”, enquanto a documentação já dizia que a
classe não autorizava conversão. O baseline preserva o resumo como evidência histórica e explicita
que os pilotos posteriores falsificaram `TEXT_NATIVE → DIRECT_MD`; não altera o classificador nem
reescreve resultados passados.

O estado GREEN do Structural Router 0.2.0 foi preservado em seu escopo histórico. Ele não é usado
para compensar ou ocultar o RED downstream. O princípio de abstenção foi registrado como regra
operacional compatível com segurança, proveniência e preservação, não como novo fundamento teórico.

## Privacidade e preservação

- nenhum PDF ou Markdown derivado de PDF entrou no diff;
- nenhum filename, path privado, hash documental completo ou texto do corpus foi versionado;
- nenhum arquivo original foi aberto para nova conversão, movido, sobrescrito ou excluído;
- nenhum acesso a `G:`, OCR, API/LLM, MD_WITH_ASSETS ou processamento de corpus ocorreu;
- `.local/` permaneceu não canônico e fora do commit;
- arquivos preexistentes do owner em `docs/` e `workspace/` não foram absorvidos;
- código, testes, fixtures e relatórios experimentais permanecem preservados.

## Validação

- Context Gate inicial e pós-mudança: `WARN` somente pela working tree preexistente;
- testes do Context Gate: 11/11 PASS;
- validação de JSON aplicável: PASS;
- hashes do arbiter e conversor congelados: preservados;
- `git diff --check`: PASS;
- revisão de privacidade por padrões: PASS;
- diff limitado a documentação operacional, checkpoint e esta revisão.

## Conclusão

O diff encerra formalmente o experimento sem apagar sua evidência, estabelece uma arquitetura de
rotas com abstenção e consolida o corpus e o backlog sem iniciar implementação. Não foram encontradas
duplicidades documentais: o checkpoint registra a decisão; o baseline concentra estado, rotas e
backlog; os três documentos existentes apenas apontam para o novo estado aplicável.
