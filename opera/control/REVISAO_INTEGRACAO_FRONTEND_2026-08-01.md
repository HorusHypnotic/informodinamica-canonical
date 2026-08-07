# Revisão da integração do frontend do OPERA Control — 1º de agosto de 2026

**Estado documental:** `ACTIVE`  
**Escopo:** preservação e integração operacional; não altera conceitos ou documentos canônicos.

## Proveniência

| Item | Valor |
|---|---|
| Projeto Lovable | `f07282fa-cd06-4234-a1b5-7d8965300c60` |
| Commit interno informado | `66b55bed00156fc28bdc582c8f3a6073768bd09f` |
| Branch de edição informada | `edit/edt-20075a1a-4bf9-4cd4-9285-36833cab82c7` |
| URL pública observada | `https://teoriadegradaooperacional.lovable.app` |
| Arquivo privado de origem | `OPERA_Control_codebase_Lovable_66b55be.zip` |
| SHA-256 do ZIP | `085216338932777DDE3518D9AE4462A5A56D8CD10601BBAACD8FA269C702806` |
| Total exportado | 128 arquivos |

O ZIP e o manifesto originais permanecem fora do repositório público, em `Documents/OPERA-Privado/Control/`.

## Decisão humana

Foi autorizada a preservação fiel do codebase como snapshot histórico/experimental e não normativo. Não foi autorizada a promoção de suas fórmulas ou taxonomias ao núcleo canônico, nem uma refatoração teórica nesta etapa.

## Segurança da importação

- `.env`, `.git`, `node_modules/` e artefatos de build não foram importados.
- A exportação foi reinspecionada e continha 128 arquivos, sem caminhos proibidos.
- Foi criado `.env.example` apenas com nomes de variáveis e valores vazios.
- O `.gitignore` passou a excluir `.env`, variantes, relatórios locais de auditoria e lint.
- O cliente Supabase usa variáveis de ambiente; nenhuma URL ou chave Supabase hardcoded foi encontrada no snapshot exportado.
- Variáveis server-side sensíveis são referenciadas pelo código e exigem separação rigorosa entre cliente e servidor.

## Divergências com fontes superiores

### ICO (MET-002)

O snapshot implementa `Impacto × Recorrência × Persistência`, mas restringe as três dimensões a notas de 1 a 5 e classifica o resultado em seis faixas até 125. A TDO vigente define Impacto em escala de 1 a 5, Recorrência como contagem e Persistência em dias. Portanto, os valores produzidos pelo snapshot não são diretamente comparáveis à métrica canônica.

### ECO (MET-001)

O banco e a interface usam terminologia e taxonomias herdadas do produto. A definição vigente permanece “Evento de Corrosão da Coordenação”, conforme o Glossário Canônico. Rótulos históricos não redefinem MET-001.

### Capital Preservado (MET-004)

A view `vw_capital_preservado` agrega a soma de EPI de decisões aprovadas. A formulação canônica vigente é `EPI − Corrosão Operacional Acumulada`. A view deve ser tratada como implementação histórica incompatível até migração explícita.

### Outros construtos

O snapshot contém IR, Margem Corroída, MDEO, taxonomias de causas e recomendações automáticas. Esses construtos são aplicações experimentais do produto e não recebem, por esta integração, IDs ou autoridade canônica.

## Impactos e limites

- O código fica isolado em `opera/control/frontend/`, subordinado a `opera/control/AUTHORITY.md`.
- Nenhuma definição, ID, lei, hipótese, métrica ou protocolo canônico foi alterado.
- O PRT-002 não é acionado, pois nenhum novo fundamento teórico está sendo proposto ou promovido.
- Migrações Supabase foram preservadas para reprodutibilidade histórica, não aprovadas para aplicação em um banco novo.
- A troca do slug público para `opera-control` permanece pendente por risco de quebra de links e callbacks.

## Verificações pendentes nesta revisão

- [x] Instalação reproduzível com `npm ci`.
- [x] Build de produção.
- [x] Lint sem mascaramento de falhas.
- [x] Auditoria de dependências de produção e desenvolvimento.
- [x] Revisão final de arquivos, referências e dados sensíveis antes de qualquer commit.

## Resultados das validações

| Verificação | Resultado |
|---|---|
| `npm ci` | Aprovado após sincronização do `package-lock.json` com `package.json` |
| Testes automatizados | Indisponíveis; o snapshot não define script `test` |
| `npm run build` | Aprovado, com avisos de APIs depreciadas e opções de bundler |
| `npm run lint` | Reprovado: 1.088 problemas, sendo 1.082 erros e 6 avisos; 1.080 erros são potencialmente corrigíveis por formatação automática |
| `npm audit` | 4 vulnerabilidades transitivas: 3 altas e 1 baixa; nenhuma crítica |

A instalação emitiu aviso de engine: `eslint-visitor-keys@5.0.1` requer Node `^20.19.0`, `^22.13.0` ou `>=24`, enquanto a validação ocorreu com Node `22.12.0`. O build ainda foi concluído, mas o ambiente recomendado deve usar uma versão compatível.

O lockfile exportado estava materialmente dessincronizado: versões de ferramentas Lovable/Nitro divergiam e dependências declaradas, incluindo geração de PDF, estavam ausentes. A sincronização do lockfile foi necessária para tornar `npm ci` reproduzível; não foram aplicados `npm audit fix`, `--force` ou upgrades major deliberados.

## Revisão final de integridade

- Nenhum `.env`, valor de credencial, token, endereço de e-mail pessoal ou chave com aparência de JWT foi encontrado nos arquivos elegíveis para versionamento.
- `.output/`, `node_modules/`, `audit-report.json` e `lint-result.txt` foram gerados apenas localmente e estão ignorados.
- Não existe `.git` aninhado.
- O frontend possui README próprio com proveniência, classificação e advertências de incompatibilidade.
- Os arquivos anteriores de `opera/control/` permanecem fora do escopo desta importação e não devem ser adicionados implicitamente ao mesmo commit.
- Não foram encontradas referências ou relações canônicas novas; as divergências conhecidas estão explicitamente registradas neste relatório e em `opera/control/AUTHORITY.md` no workspace local.
