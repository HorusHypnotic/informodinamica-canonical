# Special Review — identidade e genealogia do Obra Flow / Pedidos COD

**Data:** 13 de agosto de 2026

**Natureza:** investigação sanitizada de identidade de software; não altera identidade institucional nem o Ecosystem Map V1

**Repositório investigado:** `HorusHypnotic/obra-flow`

**Commit investigado:** `d8d24c1f820ab287574072c6ea4734bba220d85b` (`main`, alinhado a `origin/main`)

**Classificação final:** **B — RENAMED / SUCCESSOR**
**Confidence:** **HIGH**, para a identidade da implementação e sua genealogia Git

## Resumo executivo

O único software versionado localizado sob os nomes **Pedidos COD** e **Obra Flow** pertence à mesma linha contínua de commits. O aplicativo começou como **Canteiro Digital**, foi explicitamente renomeado para **Pedidos COD** em 12 de abril de 2026 e, no mesmo repositório, foi consolidado e novamente renomeado para **Obra Flow** em agosto. Não há evidência de fork, segunda árvore de código, branch divergente ou repositório próprio de Pedidos COD.

Consequentemente, no plano técnico e genealógico, Obra Flow é sucessor direto da implementação chamada Pedidos COD. A decisão ativa de 11 de agosto que trata os dois como produtos institucionais distintos continua sendo autoridade operacional até revisão humana, mas essa separação é uma declaração de portfólio: não é sustentada por duas implementações localizadas. O relatório registra esse conflito e não altera silenciosamente a decisão vigente.

Para o Ecosystem Map V2, recomenda-se cadastrar **Obra Flow** como o ativo tecnológico confirmado e registrar `Canteiro Digital → Pedidos COD → Obra Flow` como aliases/fases históricas da mesma implementação. Um eventual produto institucional independente chamado Pedidos COD deve permanecer `DOCUMENTED_ONLY / UNKNOWN` e não deve receber uma segunda identidade tecnológica até surgir fonte própria verificável.

## 1. Context Gate e limites

O Context Gate vigente foi executado antes da investigação. Resultado: `WARN`, causado apenas por working tree preexistente `DIRTY`; branch `main`, HEAD `19da16d0d22ea9fe16b6c1f07da40fa7668f3bd8`, alinhado a `origin/main`; checkpoint `context-gate-v1-canonical-green`, estado `CANONICAL GREEN`, commit `e83f45d`. A missão é compatível com as fontes de autoridade por ser uma revisão operacional, sem criar ou redefinir conceitos, IDs, teoria ou protocolos.

Foram consultados o Ecosystem Map V1, Capability Registry, Systems Roadmap, índices do ecossistema, a decisão vigente sobre Pedidos COD/Obra Flow e sua revisão. Nenhum desses artefatos foi alterado. O repositório investigado permaneceu limpo e não recebeu commit, alteração de branch, acesso a banco remoto ou execução contra dados reais.

## 2. Repositório e identidade declarada

| Evidência | Estado encontrado |
|---|---|
| Repositório | `HorusHypnotic/obra-flow` |
| Branch | `main`; branch local adicional aponta para o mesmo commit, sem divergência |
| Tags | nenhuma |
| Nome atual no README, HTML e PWA | Obra Flow |
| Nome do banco local | `canteiro-digital` |
| Formato de backup | `obra-flow-backup`, versão 1 |
| Metadata de pacote | nome genérico `vite_react_shadcn_ts`, versão `0.0.0`; não constitui identidade de produto |
| Frontend | existe e está versionado; disponibilidade de produção não foi comprovada |

O manifesto atual define Obra Flow como controle local-first de pedidos, recebimentos, notas e estoque da obra. O README também usa Obra Flow, embora preserve material textual histórico de concepção. Nomes residuais são evidência genealógica, não produtos adicionais.

## 3. Histórico Git e genealogia

| Fase | Data / commit | Evidência versionada |
|---|---|---|
| T0 — template | 2025-01-01, `732c726` | base Vite/React/shadcn, ainda sem identidade funcional demonstrada |
| T1 — Canteiro Digital | 2026-03-11, `ddc8753`, `69a015c`, `ec75e7b`, `d4f7e6f`, `541542f`, `1e8ea4f` | criação do Dexie, configuração, base e core do controle de materiais |
| T2 — PWA local/offline | 2026-03-11 a 13 | service worker, instalação e operação offline no mesmo histórico |
| T3 — Pedidos COD | 2026-04-12, `280e3fb` | commit **“Renamed to Pedidos COD”**; mensagem declara preservação de IndexedDB/Dexie, CRUD, PDF e backup; manifesto registra `Pedidos COD` |
| T4 — evolução funcional | abril a junho | três telas, WhatsApp, edição de pedidos, refinamentos, cloud e login; nenhum fork identificado |
| T5 — Obra Flow | 2026-08-03, `743599f`; 2026-08-11, `5a573ed` | consolidação do repositório como Obra Flow e alinhamento de branding; o manifesto muda diretamente de Pedidos COD para Obra Flow |
| T6 — estado auditado | 2026-08-11, `d8d24c1` | implementação local-first endurecida, testes PWA e documentação de preflight |

O ponto decisivo é a continuidade: o arquivo `public/manifest.json` registra Pedidos COD antes de `5a573ed` e Obra Flow nesse commit, na mesma linha Git. A ausência de tags, fork ou branch histórica divergente impede sustentar **C — COMMON ANCESTOR / DIVERGED**. A existência de um rename explícito impede sustentar **D/E** para a implementação. **A — SAME SYSTEM** seria menos precisa porque houve evolução funcional e uma sucessão declarada de branding; **B** preserva ambas.

## 4. Função real e arquitetura

O software é uma PWA mobile/local-first para operação de materiais em obra. A interface React/Vite/TypeScript usa shadcn/Radix e Tailwind; a persistência de domínio usa Dexie/IndexedDB no dispositivo. Supabase/Lovable oferece autenticação e perfil opcionais, mas os dados operacionais permanecem locais. Não foi encontrada sincronização de domínio multi-dispositivo.

Rotas ativas: dashboard, obras, registrar, acompanhar, estoque, relatórios e autenticação. O fluxo executável comprovado é:

`obra → pedido e itens → recebimento → movimentação de entrada → saldo de estoque → saída/ajuste/inventário → relatórios/backup`

Estados de pedido: `solicitado`, `aprovado`, `entregue_parcialmente`, `entregue` e `cancelado`. O status `aprovado` existe, mas não foi encontrada autorização por ator ou workflow formal de aprovação. Fornecedor é campo textual do pedido/nota, não entidade cadastral. Também não há fluxo comprovado de cotação ou compra separado do pedido.

Recebimentos e movimentos são gravados transacionalmente; o saldo é derivado das movimentações. Há notas fiscais e vencimentos, relatórios PDF, resumo para WhatsApp e backup/restauração JSON com validação de referências. O envio por WhatsApp depende de ação do usuário; não é integração autônoma.

## 5. Modelo de dados

O Dexie `canteiro-digital`, versão 4, contém sete stores:

| Entidade | Relações e função principal |
|---|---|
| `obras` | unidade operacional; nome, endereço, responsável e datas |
| `pedidos` | pertence a obra; número, fornecedor textual, datas, valor e status |
| `itensPedido` | pertence a pedido; material, unidade, quantidade e valores |
| `recebimentos` | liga pedido e item; data, quantidade e observação |
| `notasFiscais` | liga obra e opcionalmente pedido; fornecedor, datas, valor e pagamento |
| `movimentacoes` | liga obra; material, entrada/saída/ajuste, origem e recebimento opcional |
| `meta` | metadados locais por chave |

As migrations Supabase encontradas criam somente perfil de usuário e políticas de acesso. Elas não duplicam nem hospedam esse modelo operacional.

## 6. Interface encontrada

A interface **existe no código**, independentemente de sua acessibilidade atual em produção. As rotas ativas consolidam registro e acompanhamento. Arquivos de páginas antigas `Pedidos.tsx`, `NotasFiscais.tsx` e `Vencimentos.tsx` permanecem no repositório, mas não são importados pelo roteador atual; foram classificados como legado potencialmente não utilizado, não como ausência de UI. Não se tentou iniciar, corrigir ou publicar a aplicação.

## 7. Comparação Obra Flow × Pedidos COD

Nesta tabela, “Pedidos COD” significa a implementação historicamente versionada; quando a documentação institucional não fornece fonte independente, isso é explicitado.

| Aspecto | Obra Flow atual | Pedidos COD versionado/institucional | Evidência | Compatibilidade |
|---|---|---|---|---|
| Problema | controle de materiais da obra | manifesto histórico: pedidos, notas e obras; produto institucional independente sem escopo próprio confirmado | manifestos antes/depois do rename | SAME |
| Usuário | operador de obra em dispositivo local | mesma UI histórica; usuário institucional independente desconhecido | continuidade Git | SAME / UNKNOWN institucional |
| Entidades | obra, pedido, item, recebimento, nota, movimento | mesmo banco foi preservado no rename | mensagem de `280e3fb`, Dexie | SAME |
| Fluxo | pedido a recebimento/estoque | predecessor executável do mesmo fluxo, depois ampliado | histórico linear | COMPATIBLE |
| Entrada | formulários locais e importação de backup | mesma base local histórica | código e commit de rename | SAME |
| Saída | UI, PDF, WhatsApp, backup JSON | PDF e backup explicitamente preservados; WhatsApp evoluiu depois | histórico Git | COMPATIBLE |
| Pedido | entidade central | entidade central | schema e branding histórico | SAME |
| Aprovação | status, sem workflow/ator formal | nenhuma fonte independente demonstra mais | schema | OVERLAPPING / UNKNOWN |
| Compra/cotação | não implementada como processo separado | não comprovada por fonte própria | ausência no modelo e rotas | UNKNOWN |
| Fornecedor | texto em pedido e nota | mesmo campo histórico; sem cadastro próprio | schema | SAME |
| Recebimento | entidade e transação operacional | base preservada e posteriormente endurecida | schema/histórico | COMPATIBLE |
| Estoque | saldo derivado de movimentos | evolução posterior na mesma linhagem | histórico/schema | COMPATIBLE |
| Relação com obra | chave estrutural | manifesto histórico inclui obras | schema/manifesto | SAME |
| Integrações | autenticação opcional e WhatsApp acionado pelo usuário | nenhuma integração independente localizada | código versionado | COMPATIBLE / UNKNOWN |
| Modelo de negócio | não documentado | não documentado | ausência de fonte | UNKNOWN |

## 8. Classificação final

**B — RENAMED / SUCCESSOR. CONFIDENCE = HIGH.**

Essa classificação aplica-se ao patrimônio tecnológico comprovado: a aplicação denominada Pedidos COD é predecessora direta do Obra Flow na mesma árvore Git. A investigação não comprova que todo conceito institucional imaginado sob “Pedidos COD” seja idêntico ao Obra Flow; comprova que não foi localizada outra implementação que sustente sua autonomia tecnológica.

## 9. Patrimônio tecnológico

### IMPLEMENTED

- PWA React/TypeScript responsiva, instalável e local-first;
- Dexie/IndexedDB versionado e modelo de domínio coerente;
- CRUD e ciclo de obras, pedidos, itens, recebimentos, notas e movimentações;
- transações de recebimento/estoque e validações de saldo/referências;
- relatórios PDF, resumo para WhatsApp e backup/restauração JSON;
- autenticação opcional, vínculo local de conta e perfis Supabase;
- suíte unitária/integração e testes PWA/e2e documentados;
- documentação de preflight e protocolo operacional.

### PARTIAL

- aprovação é estado, não processo autorizativo auditável;
- fornecedor não possui cadastro/identidade própria;
- cotação e compra não são etapas de domínio separadas;
- continuidade multi-dispositivo/cloud dos dados de obra não existe;
- histórico/relatórios completos de recebimento e inventário têm cobertura limitada;
- operação real foi preparada, mas não evidenciada como concluída.

### DOCUMENTED_ONLY

- protocolo “Operação Real #001”, ainda não iniciado no registro examinado;
- produto institucional Pedidos COD independente desta implementação;
- integrações futuras com outros produtos do ecossistema.

### DEAD/UNUSED

- páginas legadas de Pedidos, Notas Fiscais e Vencimentos não estão no roteamento atual; sua remoção ou reutilização não foi avaliada;
- nomes históricos no banco não estão mortos semanticamente, pois preservam compatibilidade e genealogia.

### UNKNOWN

- deployment atual, uso real, escala, receita, suporte e maturidade comercial;
- existência de fonte privada não localizada para um Pedidos COD institucional separado.

## 10. Capabilities reutilizáveis

São reutilizáveis com revisão de contrato: modelo local-first de obra/pedido/recebimento/movimento; transação de recebimento com geração de entrada; cálculo de estoque a partir do ledger; validação e restauração atômica de backup; relatórios PDF; instalação/offline PWA; e padrão de autenticação opcional sem bloquear domínio local. A reutilização não autoriza copiar dados, fundir produtos ou transformar IDs locais em identidades canônicas.

## 11. Posição na cadeia operacional

| Sistema/relação | Classificação | Evidência e limite |
|---|---|---|
| Smart Cotações | UPSTREAM + INTEGRATION_CANDIDATE | uma cotação/compra aprovada poderia originar pedido; integração não existe |
| StockFlow | OVERLAP + INTEGRATION_CANDIDATE | ambos tocam estoque; fronteiras e fonte do StockFlow exigem revisão própria |
| Pedidos COD | predecessor/alias histórico; `DOCUMENTED_ONLY` como produto separado | mesma linhagem executável, sem segunda fonte localizada |
| Copiloto | DOWNSTREAM + INTEGRATION_CANDIDATE | poderia consumir estado operacional; não implementado |
| OPERA Control | DOWNSTREAM + INTEGRATION_CANDIDATE | controle/análise poderia consumir eventos; não implementado |
| OPERA Atlas | DOWNSTREAM + INTEGRATION_CANDIDATE | referência/visão agregada possível; não implementada |
| Cofre | SHARED_CAPABILITY / INTEGRATION_CANDIDATE | custódia de evidências/backups é compatível, sem contrato atual |

Na cadeia proposta, Obra Flow entra concretamente em **pedido → recebimento → estoque → movimentação/consumo → operação da obra**. “Compra” existe apenas de modo implícito no registro de pedido; cotação, aprovação formal e análise corporativa ficam fora da capacidade comprovada.

## 12. Conflitos documentais

A decisão ativa `DEC-PRODUTO-IDENTIDADE-PEDIDOS-COD-OBRA-FLOW-2026-08-11.md` afirma que os produtos institucionais são distintos e seleciona Obra Flow para o ciclo operacional. A própria decisão registra a genealogia contínua e se declara revisável caso apareça evidência de identidade.

Este review encontra evidência suficiente para **B** no nível de software, mas não revoga a decisão institucional. A distinção vigente pode continuar como escolha estratégica do owner; contudo, o mapa não deve apresentá-la como duas tecnologias confirmadas. Manter ambos como sistemas implementados criaria duplicidade sem segunda fonte, schema ou histórico.

## 13. Lacunas

- não há definição, repositório, schema, interface ou história próprios para Pedidos COD fora do predecessor no `obra-flow`;
- não há evidência de bifurcação entre abril e agosto;
- intenção original do owner, deployment e uso real não são inferíveis do Git;
- o modelo de negócio de ambos não está documentado;
- a fronteira futura entre Obra Flow, Smart Cotações e StockFlow permanece uma decisão arquitetural posterior.

## 14. Recomendação para o Ecosystem Map V2

1. Manter **Obra Flow** como sistema/ativo tecnológico confirmado e apontar para o repositório investigado.
2. Registrar uma genealogia explícita: `Canteiro Digital → Pedidos COD → Obra Flow`, classificando os dois primeiros como nomes/fases históricas da implementação.
3. Não criar uma segunda capability ou ativo implementado para Pedidos COD com base apenas na decisão institucional.
4. Se o owner quiser preservar Pedidos COD como produto futuro separado, marcá-lo como `DOCUMENTED_ONLY`, sem repositório confirmado, escopo `UNKNOWN` e sem herdar automaticamente código/capabilities do Obra Flow.
5. Tratar eventual separação futura como novo contrato de produto e fonte própria; não reescrever a genealogia existente.

## 15. Revisão de segurança, escopo e falseabilidade

O relatório contém apenas identificadores públicos de repositório, hashes Git e estruturas técnicas versionadas. Não contém e-mail do owner, credenciais, tokens, `.env`, URLs privadas, conteúdo de banco ou dados de usuário. Nenhum artefato preexistente do owner integra esta entrega.

Validações executadas no repositório canônico: suíte Vitest `1/1 PASS`; testes do Context Gate `11/11 PASS`; `git diff --check` sem achados. O repositório investigado encerrou a auditoria em `main`, alinhado a `origin/main` e sem alterações locais.

O achado é falseável: deve ser revisto se surgir uma fonte versionada independente — repositório, export, schema ou histórico — que demonstre Pedidos COD como produto executável distinto ou uma bifurcação anterior. Até lá, a classificação tecnicamente sustentada permanece **B — RENAMED / SUCCESSOR**.
