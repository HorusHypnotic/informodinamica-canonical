# Revisão da integração do frontend do OPERA Atlas — 31 de julho de 2026

**Estado documental:** `ACTIVE`  
**Escopo:** integração operacional; não altera o núcleo teórico ou definições canônicas.

## Resultado

O frontend foi incorporado em `opera/atlas/frontend/` como snapshot do commit `4f56022cb3f3fd195ff0f44f1a977fcf7ec549fb`, obtido de `https://github.com/HorusHypnotic/opera-atlas` na branch `main`.

A integração preserva a documentação ativa já existente em `opera/atlas/` e mantém a separação entre implementação, documentação de produto e fontes canônicas. Não foram criados ou redefinidos conceitos, IDs, leis, hipóteses, métricas ou protocolos; portanto, a cartografia epistemológica do PRT-002 não é aplicável a esta importação.

## Decisões de integração

- O `.git` da origem foi excluído para impedir um repositório aninhado e uma fronteira ambígua de versionamento.
- O `.env` versionado na origem não foi importado, para evitar incorporar configuração ou possíveis segredos. Foi criado um `.env.example` sem valores.
- Uma migração de correção de dados que confirmava uma conta por endereço de e-mail pessoal foi excluída. Ela não alterava esquema, não era portátil e sua republicação contrariaria as regras de confidencialidade do repositório.
- O README genérico da origem foi substituído por documentação de proveniência, execução e limites de sincronização.
- O `package-lock.json` foi sincronizado com `package.json`, pois a origem declarava `gantt-task-react@0.3.9` sem registrá-lo no lockfile, impedindo `npm ci`.

## Verificações executadas

| Verificação | Resultado |
|---|---|
| `npm ci` | Aprovado após sincronização do lockfile |
| `npm test` | Aprovado: 1 arquivo e 1 teste |
| `npm run build` | Aprovado |
| `npm run lint` | Reprovado: 290 erros e 23 avisos herdados |
| Repositório Git aninhado | Ausente |
| `.env` importado | Ausente |

## Achados e riscos

1. O lint registra 313 ocorrências, predominantemente `@typescript-eslint/no-explicit-any`, além de dependências ausentes em hooks e poucos problemas de estilo. A correção exige uma etapa de qualidade dedicada e não foi mascarada por relaxamento das regras.
2. O npm reportou 28 vulnerabilidades na árvore de dependências: 2 baixas, 6 moderadas, 19 altas e 1 crítica. Não foi aplicado `npm audit fix`, pois atualizações automáticas podem alterar comportamento ou introduzir incompatibilidades.
3. O build gera um bundle principal minificado de aproximadamente 2,2 MB e alerta sobre chunks acima de 500 kB. Recomenda-se revisar divisão de código antes de tratar desempenho como estabilizado.
4. A cópia local é um snapshot, não uma sincronização bidirecional. Mudanças entre Lovable, o repositório de origem e este repositório exigem fluxo explícito de comparação, revisão e registro do commit importado.
5. A integração não confirma, por si só, que o projeto Lovable esteja conectado ao GitHub nem testa publicação remota; essas verificações dependem do estado externo e de acesso à conta Lovable.

## Atualização — análise e correção controlada de vulnerabilidades

Foi gerado localmente um relatório completo por `npm audit --json`. O artefato bruto `audit-report.json` é ignorado pelo Git; os resultados relevantes e as decisões permanentes estão consolidados abaixo.

### Comparação

| Escopo | Antes | Depois |
|---|---:|---:|
| Total | 28: 1 crítica, 19 altas, 6 moderadas e 2 baixas | 25: 0 críticas, 15 altas, 8 moderadas e 2 baixas |
| Produção (`--omit=dev`) | 22: 0 críticas, 16 altas, 5 moderadas e 1 baixa | 20: 0 críticas, 12 altas, 7 moderadas e 1 baixa |

### Atualizações aplicadas

| Pacote direto | Antes | Depois | Motivo |
|---|---:|---:|---|
| `vitest` | 3.2.4 | 3.2.7 | Remove vulnerabilidade crítica em versões anteriores a 3.2.6 |
| `postcss` | 8.5.6 | 8.5.25 | Atualização compatível para versão fora das faixas reportadas |
| `react-router-dom` | 6.30.1 | 6.30.4 | Última correção disponível na linha major 6 |
| `vite` | 5.4.19 | 5.4.21 | Última correção disponível na linha major 5 |

### Vulnerabilidades diretas remanescentes

1. `vite 5.4.21`: severidade alta; a correção indicada pelo npm exige `vite 8.2.0`, uma mudança major que demanda migração e testes específicos.
2. `react-router-dom 6.30.4`: severidade moderada; a correção completa indicada exige `7.18.2`, também major.
3. `xlsx 0.18.5`: severidade alta; o registro npm não oferece versão corrigida. É necessário avaliar uma distribuição suportada, alternativa de biblioteca ou mitigação do processamento de arquivos não confiáveis.

### Decisões

- Não foi usado `npm audit fix --force`.
- Não foram apagados lockfile ou cache npm.
- Foram aplicadas somente atualizações diretas compatíveis com as linhas major vigentes.
- Upgrades major permanecem pendentes de escopo e validação próprios.

### Revalidação após as atualizações

| Verificação | Resultado |
|---|---|
| `npm ci` | Aprovado |
| `npm test` | Aprovado: 1 arquivo e 1 teste |
| `npm run build` | Aprovado |
| `npm run lint` | Reprovado sem regressão: 290 erros e 23 avisos |

## Revisão de governança e integridade

- Compatibilidade: a alteração está na zona `opera/`, classificada como implementação `ACTIVE`, subordinada à Constituição, ao Documento Canônico, ao Glossário e à TPC.
- Contradições e duplicidades: nenhum conceito ou ID canônico foi introduzido; o frontend não substitui `produtos/opera-atlas.md` nem a documentação de `opera/atlas/docs/`.
- Dependências e impacto: foram adicionados código React/Vite, configuração Supabase, recursos estáticos e dependências npm somente sob `opera/atlas/frontend/`.
- Evidência e limitações: commit e repositório de origem estão registrados; testes automatizados são mínimos e não demonstram validação funcional completa.
- Órfãos: o frontend possui README próprio, está referenciado por `docs/lovable-integration.md` e a configuração local possui modelo em `.env.example`. O índice `opera/atlas/README.md` permanece fora deste staging por pertencer a um conjunto documental pré-existente ainda não rastreado.

## Pendências recomendadas

1. Auditar a vulnerabilidade crítica e as 19 altas, priorizando caminhos alcançáveis em produção.
2. Criar plano incremental para zerar lint sem desativar regras globalmente.
3. Definir um protocolo de atualização do snapshot e de envio de mudanças à origem.
4. Executar teste funcional com Supabase em ambiente autorizado e configuração não versionada.

## Pendência documental — consolidado do OPERA Atlas

**Documento:** `OPERA_Atlas_Documentacao_Consolidada_v1.md`  
**Localização atual:** raiz do repositório, não rastreado  
**Estado:** bloqueado para integração pública

### Motivos

1. O consolidado reproduz conteúdo do “Modelo Empresarial v2.0” explicitamente classificado como confidencial. Ele não pode ser incorporado ao repositório público sem autorização e tratamento documental adequados.
2. O documento apresenta o `OPERA_CORE` como autoridade máxima. Essa autoridade pode valer internamente para decisões técnicas do produto Atlas, mas permanece subordinada à `CONSTITUICAO.md`, ao `DOCUMENTO_CANONICO.md`, ao `GLOSSARIO_CANONICO.md` e às demais fontes superiores previstas na governança deste repositório.
3. O documento reúne materiais com estados distintos — vigente, parcial, histórico, aspiracional e confidencial — e não pode receber uma única classificação documental sem camada editorial que preserve essas diferenças.

### Decisões pendentes

- [ ] Autorizar uma versão pública sanitizada ou manter o conteúdo fora do repositório público.
- [ ] Definir quais seções podem ser reproduzidas e quais devem permanecer apenas referenciadas.
- [ ] Declarar explicitamente a autoridade do `OPERA_CORE` como interna ao produto Atlas e subordinada à governança global do repositório.
- [ ] Escolher a localização final: `opera/atlas/docs/` após sanitização, repositório privado ou armazenamento externo controlado.
- [ ] Designar responsável humano pela classificação e aprovação do conteúdo.

Até essas decisões serem tomadas, o arquivo deve permanecer não rastreado, sem movimentação para `archive/` e sem inclusão em commit ou push.
