# Special Review forense — StockFlow / lovable-blueprint-bot

**Data:** 13 de agosto de 2026

**Natureza:** investigação sanitizada, read-only; não altera produto nem Ecosystem Map V1

**Repositório investigado:** `HorusHypnotic/lovable-blueprint-bot`

**Commit investigado:** `953d757396775faa1b47900cf0f043d9d7380ea6` (`main`, alinhado a `origin/main`)

**Classificação final:** **A — SAME SYSTEM**

**Confidence:** **HIGH**

## Resumo executivo

O repositório `lovable-blueprint-bot` contém uma implementação explícita do **Stockflow v2**. A identidade não depende do slug genérico: está declarada no título HTML, manifesto PWA, service worker, interface, relatórios, schemas de evidência, funções server-side e migrations. O histórico mostra uma progressão contínua de um template Lovable para **GestãoCanteiro**, depois para um sistema de gestão de recursos, até o commit de maio de 2026 que “Implementou pilares Stockflow”. Não há segunda linhagem, fork ou repositório concorrente identificado.

O sistema é substancialmente mais amplo que “ideia de estoque”. Implementa recursos unificados (material, ferramenta e equipe), locais/obras, movimentações, transferências com dupla confirmação, compras/fornecedores, consumo, custos, previsão, alertas, QR, trilha de auditoria e um domínio especializado de aplicação de insumos com cadeia de custódia e evidência assinada. O estado canônico que registra StockFlow como `IDEA` e “sem software confirmado” está factualmente desatualizado, mas não foi alterado nesta missão.

Frente ao Obra Flow, há sobreposição em pedido, recebimento, estoque e movimentação. O diferencial comprovado do Stockflow é a custódia de recursos críticos, transferências interlocais, responsabilidade, manutenção/locação, rastreio de aplicação/lote, concentração de recursos e evidência verificável. O Obra Flow é mais simples, local-first e possui notas fiscais, vencimentos e backup/restauração local — capacidades não comprovadas no Stockflow.

## 1. Context Gate

O Context Gate vigente foi executado com o projeto `informodinamica-canonical`. Resultado: `WARN` somente pela working tree preexistente `DIRTY`; branch `main`, HEAD `5a86d1003d03d2624953a9d3cc208762426e2ffd`, alinhado a `origin/main`; checkpoint `context-gate-v1-canonical-green`, estado `CANONICAL GREEN`, commit `e83f45da822bb8e302896f102156af207390ee11`. Não foram encontrados erros ou incompatibilidades de autoridade.

Foram consultados Constituição, Documento Canônico, Glossário, AGENTS, Ecosystem Map V1, Capability Registry V1, Systems Roadmap V1, os três JSONs do ecossistema e a review Obra Flow/Pedidos COD. A missão não cria conceitos/IDs nem altera o núcleo teórico.

## 2. Escopo

Inspeção somente de Git e evidência versionada. Não houve desenvolvimento, correção, deploy, acesso a banco/Supabase remoto, execução contra dados, uso da pista privada ou alteração no repositório investigado. O clone foi necessário porque não havia cópia local.

## 3. Repositório investigado

| Item | Resultado |
|---|---|
| Branch | `main` |
| Remote | repositório público declarado na missão |
| HEAD | `953d757396775faa1b47900cf0f043d9d7380ea6` |
| Sincronia | `main` alinhada a `origin/main` |
| Branches remotas | somente `origin/main` |
| Tags | nenhuma |
| Working tree | limpa durante toda a investigação |
| Stack | React 18, TypeScript, Vite, shadcn/Radix, Tailwind, TanStack Query, Supabase/Postgres/Edge Functions |

## 4. Identidade declarada

**Stockflow v2** aparece diretamente em:

- `index.html`: título e descrição de gestão/custódia de recursos em obra;
- `public/manifest.json`: nome e short name;
- `public/sw.js`: namespace de cache;
- interface e navegação: “Controle Stockflow” e instalação da PWA;
- migrations: comentário “STOCKFLOW V2 — Pilares: Monopólio, Jurídico, Custódia”;
- relatórios e PDFs: documento oficial e pacote de evidência;
- schemas `stockflow.pea.v1`, `stockflow.aplicacao.v3-hmac` e `stockflow.report.v2`;
- função pública de verificação de certidão.

O slug `lovable-blueprint-bot` e o nome genérico do `package.json` são resíduos de scaffolding, não identidade funcional atual.

## 5. Arqueologia Git

| Marco | Data / commit | Evidência |
|---|---|---|
| Template | 2025-10-21, `c2bba38` | scaffold Vite/React chamado pelo slug genérico |
| Conceito e primeira UI | 2025-10-21, `7dbdd39` | sistema enxuto de gestão de canteiro; recursos, movimentos, locais e dashboard em mock |
| Backend | 2025-10-21, `aa860a1` | integração Supabase e tipos |
| Auth/PWA | 2025-10-22, `477ddb6` | manifesto usa **GestãoCanteiro**, autenticação, logs e PWA |
| Expansão operacional | abril de 2026 | fornecedores, pedidos, custos, transferências, consumo, logística, financeiro e automação |
| Stockflow v2 | 2026-05-01, `fb3d98d` | commit “Implementou pilares Stockflow”; branding, monopólio, aplicações, passaporte e custódia |
| Evidência verificável | maio–junho de 2026 | aplicação imutável, registro retroativo controlado, HMAC server-side, certidão e PEA |
| README atual | 2026-08-13, `953d757` | documentação ampliada sem mudança de aplicação |

## 6. Genealogia

`template Lovable → GestãoCanteiro → gestão ampliada de recursos → Stockflow v2`

Trata-se de evolução/branding na mesma linha Git. Não há evidência de bifurcação. O primeiro nome de produto comprovado é GestãoCanteiro; o slug do repositório nunca descreveu o domínio real. Lacuna: não há tag/release formal que delimite uma versão 1.

## 7. Produto reconstruído

Stockflow v2 é uma PWA autenticada de gestão e custódia de recursos de obra apoiada em Supabase. Centraliza materiais, ferramentas e equipe como `recursos`, relaciona-os a locais/obras e registra eventos de entrada, saída, transferência, devolução, manutenção e locação. Acrescenta compras, fornecedores, consumo/custos, inteligência operacional e emissão de evidências.

## 8. Usuários

O código sugere operadores de almoxarifado/canteiro, responsáveis por entrega/retirada/recebimento, aplicadores e responsáveis técnicos. A autenticação é Supabase. Perfis, papéis organizacionais e segregação multiempresa não estão claramente modelados; portanto, os atores são campos operacionais, não uma autorização robusta comprovada.

## 9. Fluxo funcional

Fluxos efetivamente codificados:

1. `autenticação → cadastro de local/obra → cadastro de recurso → movimentação → saldo/status → alerta/histórico`;
2. `fornecedor → pedido solicitado → aprovado → comprado → entregue → entrada em estoque + custo médio`;
3. `recurso/origem → transferência em rota → responsável de retirada/entrega → confirmação de recebimento → cadeia de custódia fechada`;
4. `recurso/lote → aplicação na obra → evidência + responsável → saída espelho → hash HMAC → certidão/PEA`;
5. `consumo/movimentos → previsão, reposição, desvios, custo e score de obra`.

Algumas operações são compostas por várias chamadas client-side, sem transação única comprovada; falha intermediária pode produzir estado parcial. Essa é limitação de operabilidade, não ausência de capability.

## 10. Frontend

A interface existe e é extensa. Há uma única rota SPA principal, com navegação por estado entre 15 superfícies: Dashboard, Modo Obra, QR Code, Inteligência, Continuidade, Aplicações, Passaporte, Logística, Compras, Financeiro, Recursos, Movimentações, Fornecedores, Locais e Auditoria. Inclui formulários, listas, filtros, cards, gráficos, diálogos, estados vazios, scanner/gerador QR, relatórios e navegação mobile.

Classificação:

- `IMPLEMENTED`: todas as superfícies acima estão conectadas ao `Index` e aos hooks;
- `PARTIAL`: fronteiras de autorização, erros transacionais e prova operacional real;
- `DEAD/UNUSED`: nenhum módulo de domínio importante foi comprovado como órfão; componentes UI genéricos não utilizados não são patrimônio funcional;
- `UNKNOWN`: estado do deployment e aderência da UI a dados de produção.

## 11. Modelo de dados

Modelo conceitual versionado:

| Entidade | Papel |
|---|---|
| `locais` | depósito, obra ou locação externa |
| `recursos` | material, ferramenta ou equipe; quantidade, status, local, responsável, criticidade e custos |
| `movimentacoes` | entrada, saída, transferência, devolução, manutenção ou locação; origem/destino/responsável |
| `alertas` | estoque baixo, devolução atrasada ou manutenção vencida |
| `logs` | ação, tabela, registro e detalhes por usuário |
| `fornecedores` | cadastro e dados comerciais |
| `pedidos_compra` / `itens_pedido` | ciclo de compra e recebimento |
| `custos_recursos` | histórico de custo unitário/quantidade/origem |
| `transferencias` | SLA, estados, responsáveis e dupla confirmação |
| `consumo_obra` | consumo por obra/recurso/período |
| `aplicacoes` | uso material por lote, local, aplicador, técnico, evidência, tempos e hash |

Há view de concentração de recursos; funções para alertas, custo/consumo médio, reposição, previsão, score, desvios, automações, monopólio, linha do tempo e transferências atrasadas; storage de evidências; triggers de imutabilidade/retroatividade; e RLS versionada.

Risco: várias policies históricas permitem operações a todos, apesar de RLS habilitada. Logs têm policies autenticadas, e migrations posteriores endurecem partes específicas. A segurança precisa de auditoria própria antes de operação real.

## 12. Estado técnico

- arquitetura web/cloud completa e coerente com o domínio;
- frontend e migrations versionados;
- autenticação, PWA, funções server-side e storage presentes;
- segredo para assinatura é referenciado por variável de ambiente, sem valor reproduzido;
- **SENSITIVE MATERIAL DETECTED**: existe `.env` versionado. Seu conteúdo não foi reproduzido nem incorporado ao relatório;
- não há suíte automatizada no `package.json` nem arquivos de teste de domínio encontrados;
- o build de produção passa, com alerta de chunk principal acima de 500 kB;
- `npm ci` falha porque `package.json` e `package-lock.json` estão dessincronizados;
- lint falha com 167 erros e 9 warnings, predominantemente tipagem `any`, além de problemas pontuais de hooks/configuração.

## 13. Comparação com StockFlow documentado

O StockFlow canônico contém apenas nome, natureza “ideia de estoque”, escopo não comprovado e risco de duplicação. Assim, a comparação mede identidade nominal e coerência do domínio, não equivalência com uma especificação rica inexistente.

| Aspecto | Sistema investigado | StockFlow documentado | Relação |
|---|---|---|---|
| Nome | Stockflow v2 explícito | StockFlow | SAME |
| Problema | recursos, estoque, custódia e evidência em obra | ideia de estoque | COMPATIBLE, investigado é mais amplo |
| Usuário | operação de canteiro/almoxarifado | não definido | UNKNOWN |
| Unidade | locais, depósitos e obras | não definida | UNKNOWN |
| Estoque/material | implementados | implícitos no nome/natureza | COMPATIBLE |
| Ferramentas/equipe | recursos implementados | não documentados | UNKNOWN |
| Equipamento/EPI | não são tipos próprios; podem ser cadastrados genericamente | não documentados | UNKNOWN |
| Movimentação | seis tipos e histórico | não documentada | UNKNOWN |
| Transferência/devolução/manutenção | implementadas | não documentadas | UNKNOWN |
| Responsabilidade/cautela | responsáveis e cadeia de custódia; “cautela” não é entidade | não documentadas | UNKNOWN |
| Obra | local operacional | não documentada | UNKNOWN |
| Fornecedor/pedido/recebimento | implementados | não documentados | UNKNOWN |
| Auditoria | logs, aplicações, hashes e PDFs | não documentada | UNKNOWN |
| Integrações | Supabase, Edge Functions, QR/PDF/PWA | nenhuma confirmada | UNKNOWN |

## 14. Comparação com Obra Flow

| Capability | Stockflow v2 | Obra Flow | Overlap | Diferencial comprovado |
|---|---|---|---|---|
| Obras/locais | obras, depósitos e terceiros | obras | sim | Stockflow modela múltiplos tipos de local |
| Pedido/fornecedor | entidades e ciclo até entrega | pedido; fornecedor textual | sim | Stockflow tem fornecedor e compra separados |
| Recebimento/estoque | entrega gera entrada | recebimento parcial/transacional | sim | Obra Flow explicita parcial/excedente; Stockflow integra compras |
| Movimentações | seis tipos, origem/destino/custos | entrada/saída/ajuste | sim | Stockflow cobre transferência, devolução, manutenção e locação |
| Recursos | material, ferramenta e equipe | material textual por movimento/item | parcial | inventário unificado e identidade de recurso no Stockflow |
| Custódia | dupla confirmação, passaporte, responsáveis | não comprovada | não | diferencial Stockflow |
| Aplicação/lote | prontuário, evidência e hash | consumo simples | parcial | diferencial Stockflow |
| Inteligência | previsão, score, desvio, monopólio | média/dias previstos básicos | parcial | Stockflow mais amplo, não validado operacionalmente |
| Nota/vencimento | não comprovados | implementados | não | diferencial Obra Flow |
| Backup/restore local | não comprovado | implementado e validado | não | diferencial Obra Flow |
| Offline/local-first | PWA com backend cloud | domínio local-first | parcial | Obra Flow opera sem cloud após carga; Stockflow depende do Supabase |
| Auditoria/evidência | logs, imutabilidade, HMAC, certidão | backup/relatórios | parcial | evidência verificável no Stockflow |

Conclusão: sistemas distintos, fortemente sobrepostos no núcleo logístico. Stockflow não é predecessor comprovado do Obra Flow; é um produto especializado e mais amplo em custódia/evidência, enquanto Obra Flow possui simplicidade/local-first e controle fiscal ausentes no primeiro.

## 15. Matriz de capabilities

| Capability | Estado | Origem | Consumidores possíveis |
|---|---|---|---|
| ledger de movimentações de recursos | IMPLEMENTED | movimentos/recursos | Obra Flow, Control, Atlas |
| transferência com dupla confirmação | IMPLEMENTED | transferências | Obra Flow, Copiloto, Atlas |
| passaporte/cadeia de custódia | IMPLEMENTED | recursos/transferências/aplicações | Cofre, Atlas, Vision |
| aplicação rastreável por lote | IMPLEMENTED | aplicações | Obra Flow, Copiloto, Control |
| PEA/certidão HMAC | IMPLEMENTED, não validado externamente | Edge Functions/PDF | Cofre, Atlas, OPERA Research |
| detecção de concentração crítica | IMPLEMENTED | RPC/view | Control, Copiloto |
| previsão/reposição/desvio | IMPLEMENTED, calibração desconhecida | RPCs | Obra Flow, Smart Cotações, Control |
| compra a entrada de estoque | IMPLEMENTED, atomicidade parcial | pedidos/hook | Smart Cotações, Obra Flow |
| trilha de auditoria | PARTIAL | logs e triggers | Atlas, Cofre, Control |
| operação mobile/PWA | IMPLEMENTED | frontend/service worker | produtos de campo |

Essas são fontes potenciais de capability; não devem ser copiadas nem promovidas ao Registry sem contrato, revisão de segurança e prova independente.

## 16. Posição na cadeia operacional

`Smart Cotações → [decisão de compra] → Stockflow/Obra Flow → recebimento → estoque → transferência/aplicação/consumo → Copiloto/Control/Atlas`

- Smart Cotações: `UPSTREAM + INTEGRATION_CANDIDATE`;
- Obra Flow: `OVERLAP`, com complementaridade possível em fiscal/local-first;
- Stockflow: `SPECIALIZED_DOMAIN` em recursos, custódia, movimentação e evidência;
- Copiloto: `DOWNSTREAM + SHARED_CAPABILITY` para operação de campo;
- Control/Atlas/Cofre: `DOWNSTREAM + INTEGRATION_CANDIDATE` para diagnóstico, histórico e custódia;
- Vision: `INTEGRATION_CANDIDATE` para representação visual de recursos/aplicações.

Nenhuma integração está comprovada.

## 17. Patrimônio tecnológico

### IMPLEMENTED

Frontend/PWA; autenticação; schema/migrations; recursos e locais; movimentos; alertas; compras/fornecedores; transferências; consumo/custos; QR; relatórios; aplicações; HMAC/certidão; passaporte; inteligência e automações.

### PARTIAL

Autorização/RLS; atomicidade de fluxos compostos; auditoria completa; tratamento de equipamento/EPI como tipos próprios; validação das métricas; offline real; segregação organizacional.

### DOCUMENTED_ONLY

Alegações de “blindagem jurídica”, prontidão comercial e benefícios operacionais não foram validadas pela investigação. O README contém intenção e orientação Lovable além do comportamento comprovado.

### DEAD/UNUSED

Nenhum domínio principal foi comprovado morto. Resíduos de branding/scaffold e o slug genérico são históricos.

### UNKNOWN

Deployment, banco atual, usuários reais, volume, suporte, mercado, receita e conformidade jurídica.

## 18. Capabilities reutilizáveis

Prioridade investigativa de extração: transferência com dupla confirmação; passaporte de recurso; aplicação por lote com separação entre data do evento e do registro; pacote de evidência assinado; detecção de concentração crítica; e ledger de custo/movimento. Cada uma deve ser extraída como contrato independente, nunca por fusão automática do produto.

## 19. Maturidade

| Eixo | Nível | Justificativa |
|---|---|---|
| CODE | PARTIAL | build passa, mas lint tem 167 erros e não há testes automatizados |
| DATA MODEL | NEAR | schema rico, migrations e relações; segurança/tenancy incompletos |
| UI | NEAR | 15 superfícies conectadas e responsivas; uso real não validado |
| OPERABILITY | PARTIAL | depende de cloud e configuração; nenhuma prova operacional reproduzida |
| DOCUMENTATION | PARTIAL | README amplo, porém mistura guia/prompt, intenção e produto |
| TESTS | NONE | nenhuma suíte automatizada encontrada |
| DEPLOYABILITY | PARTIAL | build passa, mas lockfile dessincronizado impede instalação reproduzível por `npm ci` |
| COMMERCIAL READINESS | EARLY | nenhuma evidência de cliente, suporte, preço, conformidade ou validação |

## 20. Classificação de identidade

**A — SAME SYSTEM.** `lovable-blueprint-bot` é o repositório do Stockflow v2. O slug é genérico, mas a identidade explícita, repetida e historicamente rastreável supera o nome do repositório.

## 21. Classificação patrimonial

- **RECOVERABLE_PRODUCT**: há produto amplo recuperável, mas a operação não foi validada;
- **CAPABILITY_SOURCE**: contém capacidades especializadas reutilizáveis;
- **HISTORICAL_ASSET**: preserva a linhagem GestãoCanteiro → Stockflow;
- não há base para `DEAD_IMPLEMENTATION` nem para `ACTIVE_PRODUCT` operacionalmente confirmado.

## 22. Confidence

**HIGH** para identidade e genealogia. **MEDIUM** para inventário funcional, pois deriva de código/migrations sem banco remoto. **LOW/UNKNOWN** para operabilidade, segurança em produção e maturidade comercial.

## 23. Lacunas

- release/versionamento formal e fronteira entre v1/v2;
- deployment e banco atuais;
- significado institucional aprovado de “blindagem jurídica”;
- tenancy, papéis e autorização por organização/obra;
- testes e evidência de operação real;
- atomicidade e recuperação de falhas nos fluxos multi-etapa;
- política sobre o material sensível versionado;
- definição canônica anterior de StockFlow era insuficiente para comparação detalhada.

## 24. Conflitos documentais

O Ecosystem Map V1, `ecosystem/systems.json`, os links e o machine index registram StockFlow como ideia/backlog sem implementação ou repositório confirmado. A evidência forense contradiz esse fato operacional: existe software explicitamente denominado Stockflow v2, com histórico desde 2025 e HEAD atual em 2026.

O conflito não foi resolvido silenciosamente. Os arquivos do mapa permanecem inalterados. A revisão Obra Flow/Pedidos COD tratava StockFlow apenas como overlap hipotético; este relatório agora delimita a implementação encontrada.

## 25. Recomendação para o Ecosystem Map V2

1. Associar StockFlow ao repositório `HorusHypnotic/lovable-blueprint-bot` e registrar alias histórico **GestãoCanteiro**.
2. Substituir “ideia sem software confirmado” por **RECOVERABLE_PRODUCT + CAPABILITY_SOURCE**, sem promover a operacional/comercial.
3. Registrar o domínio como gestão e custódia cloud de recursos, transferências, aplicações e evidências de obra — não apenas estoque.
4. Marcar overlap explícito com Obra Flow e proibir fusão automática. Exigir decisão de fronteira antes de investir em ambos.
5. Priorizar uma missão separada de segurança/recuperabilidade: remover a incerteza sobre material sensível, auditar RLS/tenancy, executar build/lint e ensaio sintético isolado. Não acessar produção nessa missão.
6. Só depois decidir entre preservar Stockflow como produto especializado, extrair capabilities para Obra Flow ou manter ambos congelados.

## Revisão de privacidade e falseabilidade

Nenhum e-mail, valor de `.env`, token, key, credencial, URL privada ou identificador da pista do owner foi incluído. O relatório registra apenas `SENSITIVE MATERIAL DETECTED`, como exigido. A conclusão deve ser revista se surgir outra implementação StockFlow com autoridade superior ou evidência de que esta linhagem foi apenas um protótipo não autorizado a usar o nome.

Validações: build Stockflow `PASS` com warning de bundle; lint Stockflow `FAIL` (167 erros, 9 warnings); instalação reproduzível `FAIL` por lockfile fora de sincronia; suíte Vitest canônica `1/1 PASS`; testes do Context Gate `11/11 PASS`. Nenhuma falha foi corrigida nesta missão investigativa.
