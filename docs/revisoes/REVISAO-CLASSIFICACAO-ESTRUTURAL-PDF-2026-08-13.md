# Revisão pré-commit — classificação estrutural de PDFs — 2026-08-13

## Escopo

Classificador local e determinístico dos conteúdos PDF binariamente únicos, usando sinais de páginas,
texto extraível e objetos de imagem. A versão `1.0.0` da heurística está documentada e testada.

## Coerência, segurança e privacidade

- Nenhum PDF foi modificado, convertido, resumido ou submetido a OCR/IA/serviço externo.
- Texto extraído foi usado transitoriamente em memória apenas para contagem e não foi persistido.
- O processamento ocorreu exclusivamente na cópia local em `D:`; o volume sincronizado não foi usado.
- SQLite, NDJSON, paths, filenames, hashes completos e logs permanecem sob `.local/`, fora do Git.
- A documentação versionável contém somente estatísticas agregadas, parâmetros técnicos e IDs
  sanitizados quando necessários; não publica metadata documental bruta.

## Evidência agregada

- 314 PDFs originais; 245 conteúdos PDF binariamente únicos; 245 classificados.
- 3.622 páginas: 2.908 com texto detectável e 714 sem texto detectável.
- Classes: 217 `TEXT_NATIVE`, 25 `SCAN`, 2 `MIXED`, 1 `VISUAL_TECHNICAL`, zero
  `ENCRYPTED_OR_RESTRICTED` e zero `FAILED`.
- Execução completa sem erros; SHA-256 faltante foi calculado em streaming para identidades ainda
  não hashadas pela deduplicação.

## Limites e próxima fase

A classe é operacional e não semântica. Presença de objetos de imagem é aproximação estrutural, e
texto extraível não garante conversão fiel. A próxima fase deve ser decidida pelo owner e separar
conversão direta, preservação visual, OCR futuro e revisão manual; nenhuma conversão foi iniciada.
