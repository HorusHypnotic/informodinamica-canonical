# Checkpoint da Primeira Quinzena Reconstruível — 10/08/2026

**Estado documental:** `ACTIVE` — registro operacional datado e não normativo
**Escopo:** preservação do estado da primeira quinzena reconstruível O.P.E.R.A.
**Limite:** não altera teoria, arquitetura canônica, produtos, bancos, autenticação ou pacotes de fechamento

## Contexto

Este checkpoint preserva o estado alcançado após a canonização da identidade operacional e a preparação dos dois primeiros pacotes reais de fechamento quinzenal. Seu objetivo é permitir retomada sem reconstrução por memória.

A fase de arquitetura e preparação está encerrada. A coleta humana da quinzena está em andamento.

## Decisões e marcos anteriores

- A missão 8A foi concluída no commit `0f52d8c77fee90bb9d2da7e88761bacb462bb453`.
- A decisão `DEC-ARQ-002` separa identidade de acesso, organização, obra, recurso, alocação e autorização.
- Os invariantes INV-01 a INV-20 estão vigentes.
- E-mail é atributo de acesso, não identidade canônica de organização, obra, recurso ou alocação.
- `tenant` permanece conceito de implementação até avaliação por componente.
- As missões 9A, 9B e 9B.1 definiram o contrato manual, prepararam os rascunhos e estabeleceram a coleta humana.

Princípios arquiteturais aplicáveis:

```text
acesso ≠ organização
organização ≠ obra
obra ≠ recurso
recurso ≠ alocação
identidade ≠ autorização
```

## Estado Git relevante

No início deste checkpoint:

- branch: `main`;
- HEAD: `0f52d8c77fee90bb9d2da7e88761bacb462bb453`;
- os arquivos de Marca e Design System permaneciam não rastreados;
- `workspace/` continha os pacotes de fechamento ainda não commitados;
- nenhum pacote havia sido enviado, congelado ou submetido a hash final.

Este documento e o diário de retomada são os únicos artefatos autorizados para o commit deste checkpoint.

## Organização e período

| Campo | Valor |
|---|---|
| Organização | Dirceu Engenharia |
| Referência | `dirceu-engenharia` — operacional e provisória |
| Período | 03/08/2026 a 14/08/2026 |
| Timezone | `America/Sao_Paulo` |
| Estado | `QUINZENA EM ANDAMENTO` |
| Responsável | Eduardo |

Nesta primeira execução, Eduardo acumula fechamento, validação, conferência das fontes e preservação. Isso não representa segregação independente de funções.

Eduardo é atualmente o ponto central de reconciliação e distribuição das informações operacionais para stakeholders. Trata-se de observação operacional, não princípio permanente, diagnóstico causal ou requisito arquitetural.

## Obras

### Galpão Quádruplo do Domingos

- `work_ref`: `dirceu-galpao-quadruplo-domingos`;
- referência operacional provisória;
- nome e ID reais no Atlas: pendentes;
- nome e ID reais no Copiloto: pendentes;
- correspondência física entre os registros: pendente de confirmação humana.

### Galpão do Fábio em frente ao Bar do Índio

- `work_ref`: `dirceu-galpao-fabio-frente-bar-do-indio`;
- referência operacional provisória;
- nome e ID reais no Atlas: pendentes;
- nome e ID reais no Copiloto: pendentes;
- correspondência física entre os registros: pendente de confirmação humana.

## Fontes atuais

| Fonte | Papel atual | Limites |
|---|---|---|
| OPERA Atlas | Fonte atualmente mais confiável para diárias | acesso por e-mail não identifica organização ou obra; cobertura ainda precisa ser confirmada |
| OPERA Copiloto | Fonte atualmente mais atual para estoque e operação | cobertura ainda precisa ser confirmada; Compartilhar permanece funcionalidade experimental fora do escopo |
| Caderno físico de cada obra | Possível contraprova | baixa legibilidade; conteúdo ilegível não confirma fato |
| Memória de Eduardo | Reconstrução complementar | deve ser identificada como memória e não substitui registro contemporâneo sem preservar divergência |

Identidades de acesso atualmente usadas:

- Atlas: `canteirodeobrasdigital@gmail.com`;
- Copiloto: `slekdeitzlive@gmail.com`.

Esses e-mails registram acesso operacional, não identidade canônica de organização ou obra.

## Preservação provisória

Google Drive é candidato provisório para preservação externa dos pacotes desta primeira execução. Não foi canonizado como dependência obrigatória do O.P.E.R.A. ou de seus clientes.

Não houve envio, configuração de integração, compartilhamento ou alteração de permissões.

## Estado dos pacotes

Existem dois pacotes em `workspace/fechamentos/`, um por obra. Ambos estão em:

```text
status: rascunho
period_state: QUINZENA EM ANDAMENTO
final_manifest_generated: false
uploaded: false
```

Cada pacote possui:

```text
fechamento.md
fechamento.json
manifest.sha256
evidencias/indice.md
```

Os arquivos `manifest.sha256` são placeholders de rascunho. Nenhum checksum final foi gerado.

## Lacunas em coleta

Por obra, ainda devem ser coletados ou confirmados:

1. IDs e aliases reais no Atlas e no Copiloto;
2. correspondência dos registros com a mesma obra física;
3. diárias;
4. estoque e operação;
5. pessoas e equipes;
6. alocações;
7. atividades e produção;
8. ocorrências;
9. decisões e ações;
10. pendências;
11. evidências;
12. conteúdo legível dos cadernos;
13. informações reconstruídas por memória;
14. divergências entre fontes.

Também devem ser observados recursos compartilhados entre as obras:

- trabalhadores;
- ferramentas;
- equipamentos;
- identidade do recurso;
- origem;
- destino;
- data ou intervalo;
- fonte da informação.

Transferência não cria nova identidade para o recurso.

## Trabalho em andamento

Enquanto a quinzena estiver aberta:

- atualizar os registros reais no Atlas e no Copiloto;
- registrar decisões, ações e pendências;
- observar alocações e transferências entre obras;
- preservar evidências contemporâneas;
- usar os cadernos como contraprova quando legíveis;
- classificar ausências sem preenchimento forçado;
- preservar divergências entre fontes.

## Ações proibidas neste estágio

- declarar fechamento definitivo antes de 14/08/2026;
- gerar manifesto final antes do congelamento;
- inventar IDs, registros, valores ou ocorrências;
- converter ausência em zero, falso ou evento inexistente;
- alterar Copiloto, Control, Atlas, Cofre ou Compartilhar;
- criar integração interproduto;
- alterar banco, migrations, autenticação ou permissões;
- canonizar Google Drive como dependência obrigatória;
- transformar observações desta quinzena em teoria ou métrica;
- alterar Marca ou Design System;
- enviar pacotes sem autorização separada.

## Critérios de retomada

Retomar o trabalho assistido somente quando ocorrer pelo menos um destes gatilhos:

1. chegada de dados reais suficientes para atualizar os pacotes;
2. conflito ou divergência entre fontes;
3. necessidade de reconciliar IDs ou aliases reais;
4. risco concreto de perda de informação;
5. chegada de 14/08/2026;
6. autorização para congelar, gerar hashes ou preservar externamente;
7. falha concreta no procedimento atual.

O diário operacional de retomada está em `docs/diarios/2026-08-10-primeira-quinzena-reconstruivel.md`.

## Próximos passos autorizáveis

Mediante autorização humana específica:

1. atualizar os pacotes com dados reais e proveniência;
2. reconciliar IDs locais sem alterar os produtos;
3. registrar divergências sem resolução silenciosa;
4. executar o fechamento definitivo após 14/08/2026;
5. validar Markdown contra JSON;
6. revisar conteúdo sensível;
7. congelar os arquivos;
8. gerar SHA-256;
9. autorizar commit dos pacotes, se aplicável;
10. copiar manualmente para Google Drive;
11. verificar reabertura e integridade;
12. testar reconstrução por terceiro.
