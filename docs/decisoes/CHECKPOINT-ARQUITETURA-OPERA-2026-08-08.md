# Checkpoint arquitetural OPERA — 08/08/2026

**Estado documental:** `ACTIVE` — registro operacional datado, provisório e não normativo
**Escopo:** Kernel OPERA, PDIC, Cofre, produtos e estratégia do primeiro ciclo interproduto
**Limite:** não altera teoria, glossário, produtos, contratos, software, bancos ou ambientes externos

## Objetivo

Registrar de forma factual e reconstruível o estado arquitetural resultante das auditorias realizadas após o checkpoint de integração OPERA de 8 de agosto de 2026.

Este documento registra decisões provisórias para orientar o próximo experimento. Ele não canoniza nomes, fronteiras, contratos ou novas camadas do ecossistema.

## Estado anterior

O checkpoint `CHECKPOINT-INTEGRACAO-OPERA-2026-08-08.md` confirmou que Copiloto, Control e Atlas estavam sincronizados e funcionavam isoladamente no escopo validado, mas não demonstrou integração executável entre eles nem participação do Cofre no ciclo.

Os commits de produto então tomados como referência foram:

| Produto | Repositório oficial | Commit validado |
|---|---|---|
| Copiloto de Obras | `HorusHypnotic/copilotodeobras` | `5fc3249` |
| OPERA Control | `HorusHypnotic/opera-control` | `ec87bf8` |
| OPERA Atlas | `HorusHypnotic/opera-atlas` | `6484ddd` |

O checkpoint anterior não definiu contratos, identidade compartilhada, orquestração ou continuidade operacional entre os produtos.

## Auditorias realizadas

Após aquele checkpoint foram realizadas, em modo de inspeção, três auditorias arquiteturais complementares:

1. mapeamento dos contratos e das identidades do ciclo mínimo Copiloto → Control → Atlas → Cofre;
2. auditoria das fronteiras entre Kernel OPERA, PDIC e Cofre;
3. auditoria genealógica e executável do repositório `HorusHypnotic/pdic`.

As auditorias examinaram código, schemas, migrations, tipos, rotas, funções, histórico Git e documentação disponível. Elas não implementaram integração nem alteraram os produtos examinados.

## Principais descobertas

### Ciclo interproduto

- Não existem contratos interproduto executáveis entre Copiloto, Control e Atlas.
- Não existe identificador comum de obra.
- Não existe conceito temporal comum: o Copiloto possui quinzena formal, o Control não possui `obra_id` nem período equivalente e o Atlas fecha por competência mensal.
- Uma ocorrência do Copiloto não é automaticamente um ECO; impacto, recorrência, persistência, causa, padrão e recomendação exigem classificação adicional no Control.
- O Atlas já implementa capacidades internas de snapshot, hash, versionamento, histórico e auditoria. Essas capacidades não devem ser duplicadas em outra camada apenas para produzir simetria arquitetural.
- A primeira prova pode ocorrer por artefatos JSON e Markdown, sem API, mensageria ou sincronização distribuída.

### Kernel OPERA

- Kernel, PDIC e Cofre podem representar responsabilidades distintas, mas essa separação não existe na implementação atual.
- `D:\slektips\kernel` é um protótipo funcional interno ao Cofre.
- `IdEngine.ps1` e `CaptureEngine.ps1` dependem de PowerShell, da posição física dentro de `D:\slektips`, de `99-runtime\kernel`, de `00-inbox` e de namespaces do Cofre.
- O gerador de IDs usa contador JSON local e não garante unicidade entre processos, clones ou máquinas.
- Não há evidência de dois consumidores reais compartilhando uma mesma implementação portátil.
- Não há base suficiente para criar um repositório `opera-kernel`.

### PDIC

- O repositório `HorusHypnotic/pdic` é histórica e executavelmente um produto vertical de inteligência do mercado da construção e imobiliário.
- Sua identidade histórica é **Painel Diário de Inteligência da Construção e Imobiliário**, também apresentado como Market Compass.
- A definição **Plataforma Digital de Integração e Colaboração** foi acrescentada ao README no commit `405a895`.
- O commit `405a895` alterou documentação e adicionou um dossiê, mas não adicionou código, schema, migration ou Edge Function de interoperabilidade OPERA.
- A hipótese de continuidade natural entre o produto vertical e uma futura camada de interoperabilidade foi classificada como fraca.
- A hipótese de que são dois sistemas conceitualmente distintos usando a mesma identidade foi classificada como forte.
- O repositório existente deve ser preservado, mas não deve tornar-se dependência crítica de Copiloto, Control ou Atlas.

### Cofre

- `D:\slektips` reúne o Cofre atual, um protótipo interno de Kernel, dados operacionais, CLI, memória e arquivo histórico.
- A função potencialmente própria do Cofre no ciclo é a custódia evidenciária interproduto, acompanhada de curadoria, indexação, manifesto e recuperação de contexto.
- O Cofre não deve substituir a memória operacional do Atlas nem atuar automaticamente como barramento de integração.
- A estrutura definitiva do Cofre e o destino físico de `D:\slektips` permanecem abertos.

## Decisões arquiteturais provisórias

As decisões abaixo orientam apenas a próxima prova. Não são decisões canônicas:

1. Não criar Kernel independente neste momento.
2. Preservar `D:\slektips\kernel` como protótipo histórico e interno do Cofre.
3. Preservar `HorusHypnotic/pdic` como produto vertical legado, sem transformá-lo no barramento do ecossistema.
4. Não usar o `pdic` atual como infraestrutura crítica de Copiloto, Control ou Atlas.
5. Não criar camada executável de interoperabilidade antes da prova manual.
6. Não decidir ainda o nome definitivo de uma eventual camada futura.
7. Definir primeiro contratos experimentais, versionados e legíveis em JSON e Markdown.
8. Provar manualmente um ciclo Copiloto → Control → Atlas → Cofre.
9. Limitar a prova a uma obra, uma quinzena e uma ocorrência não sensível.
10. Extrair infraestrutura compartilhada somente quando uma necessidade idêntica for demonstrada por pelo menos dois consumidores reais.

## Elementos explicitamente não decididos

Permanecem abertos:

- o nome da futura camada de interoperabilidade;
- a própria necessidade futura de um serviço executável de interoperabilidade;
- o uso futuro da sigla PDIC para essa camada;
- a existência futura de Kernel independente;
- a stack de interoperabilidade;
- banco central de identidade;
- API, webhooks, mensageria, filas, retries e automação;
- sincronização bidirecional entre produtos;
- estrutura definitiva do Cofre;
- eventual mudança física de `D:\slektips`;
- recanonização nominal do produto vertical atualmente chamado PDIC;
- criação de novos repositórios;
- contratos e schemas definitivos.

## Fronteiras provisórias de responsabilidade

As fronteiras desta seção são **NÃO CANÔNICAS** e deverão ser testadas no experimento.

| Sistema ou camada | Responsabilidade provisória | Não assume nesta fase |
|---|---|---|
| Copiloto | Dados operacionais de campo e fechamento quinzenal | Classificação automática de ocorrência como ECO |
| Control | Classificação ECO, ICO, diagnóstico, causa, padrão e recomendação | Autoridade sobre o registro bruto de campo |
| Atlas | Baseline, snapshots, fechamento, hash, versionamento, histórico e auditoria operacional | Barramento interproduto ou custódia geral do Cofre |
| Cofre | Custódia, curadoria, indexação e recuperação de representações e pacotes evidenciários | Transporte operacional ou duplicação dos fechamentos do Atlas |
| Futura interoperabilidade, se necessária | Contratos, resolução de identidade, idempotência, entrega e observabilidade das trocas | Ontologia e regras internas dos produtos |
| Kernel futuro, se existir | Primitivas pequenas, portáteis, determinísticas e sem estado de domínio, comprovadamente compartilhadas | Produto, banco central, ontologia ECO, inbox ou transporte |

## Identidade experimental da obra

Para o primeiro piloto não será criado banco global de identidade, o nome da obra não será usado como chave e os IDs internos dos produtos não serão alterados.

A solução provisória é um manifesto experimental contendo:

- `integration_work_id`, independente dos IDs locais;
- aliases dos IDs locais existentes;
- nome legível da obra, apenas para conferência humana;
- início e fim do período examinado.

O Control poderá referenciar o `integration_work_id` no artefato mesmo sem possuir `obra_id` interno. Essa solução é reversível e não constitui ainda um serviço de resolução de identidade.

## Estratégia do primeiro ciclo

O primeiro ciclo proposto é:

1. o Copiloto fecha uma quinzena;
2. uma ocorrência não sensível é selecionada;
3. um JSON Copiloto → Control é produzido manualmente;
4. um humano classifica a ocorrência como ECO ou a rejeita;
5. um JSON Control → Atlas é produzido manualmente quando houver diagnóstico;
6. o pacote final recebe proveniência e hash;
7. o conjunto é preservado externamente ou no Cofre, sem uso indevido dos snapshots internos do Atlas;
8. outra pessoa tenta reconstruir obra, quinzena, ocorrência, decisão, eventual ECO/ICO e cadeia de proveniência usando apenas os artefatos.

O critério de sucesso é a reconstrução inequívoca do ciclo. O experimento também será válido se a ocorrência for justificadamente rejeitada como ECO, desde que a decisão e sua proveniência sejam preservadas.

## Status arquitetural dos componentes

| Componente | Estado registrado neste checkpoint |
|---|---|
| Copiloto | Produto validado isoladamente; fonte de campo e único sistema com quinzena formal entre os três examinados |
| Control | Produto validado isoladamente; autoridade candidata para classificação e diagnóstico; sem identidade de obra ou período compartilhado |
| Atlas | Produto validado isoladamente; memória operacional madura em snapshots, hashes, versões e auditoria; sem ingestão interproduto demonstrada |
| Cofre | Produto/acervo local em `D:\slektips`; fronteira potencial de custódia e recuperação ainda não validada no ciclo |
| Kernel | Protótipo interno ao Cofre; não aprovado como infraestrutura independente |
| Repositório `pdic` | Produto vertical legado com identidade documental recente em conflito com sua genealogia e implementação |
| Interoperabilidade futura | Responsabilidade hipotética; sem nome, stack, repositório ou serviço aprovados |

## Riscos

- associar registros à obra errada por ausência de identidade comum;
- confundir nome legível com chave estável;
- tratar toda ocorrência como ECO sem classificação;
- perder a relação entre registro bruto e diagnóstico;
- confundir quinzena do Copiloto com competência mensal do Atlas;
- divergências de timezone nas fronteiras de data;
- expor dados pessoais ou evidências sensíveis;
- reprocessar o mesmo pacote sem idempotência;
- produzir hashes diferentes sem serialização definida;
- usar CSV ou Markdown humano como substituto de contrato estruturado;
- duplicar no Cofre a memória operacional já mantida pelo Atlas;
- converter o produto vertical `pdic` em infraestrutura crítica por semelhança nominal;
- extrair um Kernel antes de haver reutilização real;
- transformar decisões provisórias deste checkpoint em autoridade canônica sem revisão.

## Conflitos preservados

Este checkpoint não resolve silenciosamente os seguintes conflitos:

1. a sigla PDIC identifica historicamente o Painel Diário de Inteligência da Construção e Imobiliário, enquanto documentação recente a redefine como Plataforma Digital de Integração e Colaboração;
2. o README e o canônico descrevem uma futura camada integradora, mas o repositório `pdic` não implementa integração entre produtos OPERA;
3. a arquitetura declarada do Kernel afirma independência, mas os Engines implementados permanecem acoplados ao Cofre;
4. o modelo do Cofre, o schema SlekTip e os Engines possuem divergências de estados, formatos de ID e responsabilidades;
5. Copiloto, Control e Atlas usam identidades e modelos temporais independentes;
6. o Preview anteriormente observado do Atlas contém identidade ou textos associados a “O.P.E.R.A. Control”, cuja causa permanece indeterminada.

## Próximo passo recomendado

O menor próximo passo é preparar, mediante autorização específica, os artefatos documentais experimentais do primeiro ciclo:

1. manifesto de identidade de uma obra;
2. contrato mínimo Copiloto → Control;
3. contrato mínimo Control → Atlas;
4. regras de proveniência, validação e rejeição;
5. critério de hash e custódia do pacote final.

Esses artefatos devem ser revisados antes de qualquer API, banco, automação, novo repositório ou alteração dos produtos.

## Relação com documentos anteriores

Este checkpoint complementa, sem reescrever retroativamente:

- `CHECKPOINT-INTEGRACAO-OPERA-2026-08-08.md`;
- `docs/ecossistema-projetos-2026-08-03.md`;
- `docs/inventario-executavel-2026-08-02.md`;
- `docs/lovable-integration.md`;
- os snapshots e registros preservados em `opera/`.

Documentos anteriores permanecem evidências datadas. Em caso de conflito com fontes de maior autoridade, este checkpoint deve ser tratado como registro operacional provisório e não como redefinição teórica ou normativa.
