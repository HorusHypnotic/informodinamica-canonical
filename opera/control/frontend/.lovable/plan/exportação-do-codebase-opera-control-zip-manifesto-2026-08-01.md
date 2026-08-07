# Exportação do codebase OPERA Control (ZIP + manifesto)

Nenhuma alteração em código, banco, deploy, slug, configuração, GitHub ou publicação. A exportação é gerada apenas como artefato para download em `/mnt/documents`.

## O que será gerado

1. `/mnt/documents/OPERA_Control_codebase_Lovable_66b55be.zip`
2. `/mnt/documents/OPERA_Control_export_manifest.md`

Ambos entregues como artefatos com botão de download direto no chat.

## Conteúdo incluído no ZIP

- `src/` (rotas, componentes, libs, integrações)
- `public/` (ícones, manifest, service worker)
- `.lovable/`
- `supabase/migrations/` e `supabase/config.toml`
- `package.json`, `bun.lock`, `package-lock.json` (se existir)
- Configurações: `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `components.json`, `bunfig.toml`
- Documentação existente no repositório (ex.: `src/routes/README.md`, quaisquer `*.md`)

## Conteúdo excluído

- `.env` e qualquer arquivo de ambiente
- chaves, tokens, credenciais
- `node_modules/`, `dist/`, `.git/`, caches e temporários

Observação de transparência: `src/integrations/supabase/client.ts` contém a chave publicável (anon) do backend, que é pública por natureza e necessária para o app rodar. Nenhuma chave secreta ou service role está no repositório. Isso será declarado no manifesto.

## Conteúdo do manifesto

- ID do projeto: `f07282fa-cd06-4234-a1b5-7d8965300c60`
- Commit de origem: `66b55bed00156fc28bdc582c8f3a6073768bd09f`
- Data/hora UTC da exportação
- Lista completa de arquivos incluídos (com tamanho)
- Lista de padrões excluídos
- Confirmação explícita de que `.env` e valores sensíveis não foram incluídos
- Hash SHA-256 do ZIP para verificação de integridade

## Verificação antes de entregar

Listar o conteúdo do ZIP gerado e confirmar por busca que nenhum `.env` ou arquivo de credencial entrou no pacote.
