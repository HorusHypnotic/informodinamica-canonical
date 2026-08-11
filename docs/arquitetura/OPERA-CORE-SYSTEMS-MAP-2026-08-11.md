# Mapa dos OPERA Core Systems — 11/08/2026

**Estado documental:** `ACTIVE` — fotografia arquitetural datada, operacional e não normativa  
**Escopo:** Copiloto de Obras, OPERA Control, OPERA Atlas e Cofre de Memória Absoluta  
**Limite:** não altera teoria, produtos, bancos, integrações ou o fechamento real em andamento

## 1. Veredito executivo

Os quatro sistemas existem, mas não formam hoje um pipeline técnico. Copiloto, Control e Atlas são aplicações independentes com bancos e identidades locais; o Cofre é um repositório Git local, uma estrutura documental e uma CLI PowerShell sincronizada por Google Drive. Não existe contrato executável, `obra_id` comum, API ou ingestão entre eles.

A topologia sustentada pela evidência continua sendo:

```text
                         COPILOTO
                 registro operacional diário
                           |
              +------------+------------+
              |                         |
              v                         v
          CONTROL                    ATLAS
    classificar/diagnosticar   operar/preservar estados
              |                         |
              +------------+------------+
                           |
                           v
                         COFRE
             custódia externa somente quando
             houver pacote curado e autorizado
```

As setas representam possibilidades documentais futuras, não integrações atuais nem percurso obrigatório de todo registro.

## 2. Método e autoridade

Foram examinados repositórios, remotes, branches, HEADs, status, histórico Git, READMEs, decisões, schemas, migrations, rotas, funções, testes e builds locais. As conclusões obedecem à ordem de autoridade da Constituição, do Documento Canônico, do Glossário Canônico e da TPC. O mapa aplica TPC/TDO apenas como lente; não cria IDs, métricas ou proposições.

Fontes centrais:

- `CONSTITUICAO.md`, `DOCUMENTO_CANONICO.md`, `GLOSSARIO_CANONICO.md`, `01-teoria/TPC.md` e `02-aplicacoes/TDO.md`;
- `docs/decisoes/DEC-ARQ-002-identidade-operacional-opera.md`;
- `docs/decisoes/ADENDO-CARTOGRAFIA-OPERA-2026-08-08.md`;
- `docs/decisoes/CHECKPOINT-ARQUITETURA-OPERA-2026-08-08.md`;
- `docs/decisoes/CHECKPOINT-PRIMEIRA-QUINZENA-RECONSTRUIVEL-2026-08-10.md`;
- código atual dos três produtos e arquitetura local do Cofre.

Esta cartografia atende ao papel de `PRT-002` ao manter separadas fonte canônica, implementação, inferência e proposta. Nenhuma descrição de produto é promovida a definição teórica.

## 3. Repositórios encontrados

| Candidato | Path | Remote | Branch / HEAD em 11/08 | Status inicial | Relação e confiança |
|---|---|---|---|---|---|
| Copiloto de Obras | `D:\Projetos Github\copilotodeobras` | `HorusHypnotic/copilotodeobras` | `chore/sincronizar-dependencias` / `5fc3249` = `origin/main` | limpo | Produto web oficial; alta |
| Runtime Copiloto experimental | `informodinamica-canonical/opera/copiloto-obras` | parte do canônico | branch desta auditoria / base `478aede` | limpo antes dos testes | Agente experimental, não produto web; alta |
| Control operacional | `D:\Projetos Github\opera-control-official` | `HorusHypnotic/opera-control` | `main` / `ec87bf8` | limpo | Produto oficial; alta |
| Extração Control | `D:\Projetos Github\opera-control` | `HorusHypnotic/opera-control-canonical-extract` | `main` / `e3fa9f8` | limpo | Extração documental/snapshot, não deploy atual; alta |
| Atlas | `D:\Projetos Github\opera-atlas` | `HorusHypnotic/opera-atlas` | `main` / `6484ddd` | limpo | Produto oficial; alta |
| Cofre | `D:\slektips` | sem remote configurado | `master` / `06164ab` | limpo | Repositório local do Cofre; alta |

Não foi encontrado repositório público autônomo do Cofre. Os builds regeneraram arquivos derivados ignorados; os dois `routeTree.gen.ts` tocados pelo gerador foram restaurados e os repositórios de produto terminaram limpos.

## 4. Matriz de estado real

Classificação: A operacional; B funcional incompleto; C protótipo executável; D código parcial; E conceito/documentação; F vestígio histórico.

| Sistema | Conceito | Código | Executa | Persistência | Deploy | Testes | Estado |
|---|---|---|---|---|---|---|---|
| Copiloto | sim | aplicação TanStack Start/React/Supabase | build PASS; uso real citado no fechamento corrente | Supabase por UUID local de obra; quinzenas e snapshots | `copilotodeobras.lovable.app`, validado isoladamente no checkpoint | sem script de testes no produto; runtime homônimo separado tem 118 testes PASS | **A — operacional**, com dívida de testes/lint |
| Control | sim | aplicação TanStack Start/React/Supabase | build PASS; validado isoladamente | Supabase por usuário, sem `obra_id` | deploy Lovable registrado no checkpoint | sem suíte automatizada declarada; lint FAIL preexistente | **B — funcional incompleto**, pois diagnostica mas não representa obra/período compartilhável |
| Atlas | sim | aplicação Vite/React/Supabase | build PASS; fonte real de diárias no fechamento corrente | Supabase multi-tenant, UUID local de obra, snapshots e períodos fechados | deploy Lovable registrado no checkpoint | 1 teste superficial PASS; lint FAIL preexistente | **A — operacional**, com cobertura de testes insuficiente |
| Cofre | sim | Git + Markdown/JSON + CLI/Engines PowerShell | comandos locais e captura implementados | filesystem, Git e contador JSON local | sem deploy e sem remote | nenhuma suíte encontrada | **C — protótipo executável** local |

### Gates locais observados

- Copiloto produto: build PASS; lint FAIL com 14.354 problemas, dominados por CRLF/Prettier e tipos.
- Control: build PASS; lint FAIL com 10.620 problemas, dominados por CRLF/Prettier e tipos.
- Atlas: build PASS; Vitest 1/1 PASS; lint FAIL com 501 problemas.
- Runtime experimental Copiloto: pytest 118/118 PASS. Esse resultado não é evidência de teste do produto web.
- Cofre: estrutura e histórico executáveis inspecionados; não foi executada captura para evitar mutação de memória.

## 5. Identidade atual da obra

| Sistema | Identificador observado | Contexto | Limite |
|---|---|---|---|
| Copiloto | `obras.id` UUID; relações por `obra_id`; acesso por organização/papéis | banco próprio | sem alias canônico externo |
| Control | `ecos.id`, `user_id` e entidades analíticas | usuário autenticado | não possui `obra_id` no domínio ECO atual |
| Atlas | `obras.id` UUID + `tenant_id`; relações por `obra_id` | banco próprio multi-tenant | ID não corresponde ao UUID do Copiloto |
| Cofre | diretórios, nomes humanos e IDs de representações (`I-*`, `ECO-*`, etc.) | filesystem/Git local | não há registro resolutor de obra implementado |

Não é possível provar automaticamente que “Obra X” nos quatro contextos é o mesmo objeto físico. Os motivos são: namespaces locais independentes, Control sem identidade de obra, Cofre sem cadastro resolutor, nomes humanos ambíguos e ausência de manifesto de aliases preenchido com IDs reais.

A execução real de 03/08/2026 a 14/08/2026 usa `work_ref` provisório em rascunhos, mas os IDs reais de Copiloto e Atlas e a correspondência física ainda estão pendentes de confirmação humana. Isso é evidência de necessidade de contrato, não de necessidade de banco central.

## 6. Ciclo mínimo de uma quinzena

| Transição | Owner atual ou futuro mínimo | Estado observado |
|---|---|---|
| Obra → registro diário | Copiloto | implementado para campo; Atlas também captura módulos próprios |
| Registro → evento/ocorrência | Copiloto | ocorrência operacional implementada; não equivale automaticamente a ECO |
| Evento → análise | Control, mediante seleção/classificação humana | aplicação implementa ECO/ICO e diagnóstico, mas ingestão ausente |
| Análise → evidência | origem preserva registro; Atlas pode preservar estado; humano mantém proveniência | contrato ausente |
| Evidência → fechamento | Copiloto para quinzena; Atlas para período/competência próprios | dois fechamentos semanticamente diferentes |
| Fechamento → snapshot | Copiloto e Atlas em seus domínios | implementado internamente nos dois; não duplicar no Cofre |
| Snapshot → histórico | produto que produziu o snapshot | implementado localmente nos produtos |
| Histórico → exportação/custódia | exportador do produto; Cofre apenas para pacote curado | Atlas exporta; Copiloto possui relatórios/compartilhamento; custódia interproduto ainda não provada |

### Fechamento operacional versus fechamento de pesquisa

- **Copiloto:** uma quinzena aberta por obra; fechamento explícito e irreversível na interface; congela snapshot por colaborador, presenças/diárias, observações e auditoria; cria a próxima quinzena. Não foi encontrado hash do snapshot quinzenal.
- **Atlas:** fecha intervalo/competência por obra com `snapshot_json`, hash e regras de bloqueio; existe reabertura registrada (`reaberto_em`), histórico e exportação. Sua competência não é a quinzena do Copiloto.
- **Pesquisa:** o fechamento real em `workspace/fechamentos/` permanece rascunho até 14/08/2026; hashes finais, upload e reconstrução por terceiro ainda não ocorreram. Não confundir esse pacote com qualquer fechamento interno de produto.

## 7. Teste da cadeia histórica

| Seta | Classificação | Evidência |
|---|---|---|
| Copiloto → Control | **PLAUSÍVEL**, tecnicamente **AUSENTE** | ocorrência pode alimentar triagem ECO, mas não há contrato, API, ID comum ou ingestão |
| Control → Atlas | **PLAUSÍVEL**, tecnicamente **AUSENTE** | diagnóstico pode tornar-se evidência preservável, mas Atlas não consome saída Control |
| Atlas → Cofre | **PLAUSÍVEL**, tecnicamente **AUSENTE** | pacote exportado pode receber custódia; nenhuma exportação automática ou ciclo validado |
| Copiloto → Atlas | **INDETERMINADA** | ambos mantêm estados próprios; não há consumo demonstrado e forçar a seta pode duplicar captura |
| Control → Cofre | **PLAUSÍVEL** | decisão/diagnóstico curado pode ser preservado diretamente, sem obrigação de passar pelo Atlas |

Veredito: `Copiloto → Control → Atlas → Cofre` é **errado como pipeline obrigatório** e **plausível como uma das trajetórias manuais condicionais**. A topologia ramificada do adendo de 08/08 permanece a formulação mais fiel.

## 8. ECO, ICO, MDEO e TRO

| Elemento | Conceito documentado | Código executável | Uso operacional comprovado nesta auditoria |
|---|---|---|---|
| ECO (`IDR-0010` / `MET-001`) | canônico | CRUD, categoria, causa, prejuízo, evidência textual e classificação no Control | produto validado isoladamente; nenhum evento real interproduto classificado nesta missão |
| ICO (`IDR-0011` / `MET-002`) | canônico; métricas em calibração | `I × R × P` 1–125 e faixas no Control | cálculo executável; deve ser rotulado `ICO_campo`, não validação empírica da métrica |
| MDEO | conceito de produto, sem ID canônico identificado | sete cenários, projeção de custos, EPI, payback, ROC e recomendação | executável no Control; validade operacional/econômica não demonstrada aqui |
| TRO | nenhuma definição canônica vigente localizada | não encontrado no Control/Copiloto; Atlas calcula placeholder de tempo médio de resolução como zero por falta de `resolved_at` | **não implementado e não operacional** |
| responsável/ação | documentados em fluxos | `responsavel`, decisões e recomendações existem no Control | parcialmente implementados |
| estabilização/encerramento/aprendizado | presentes como intenção TDO | estados de causa/recomendação e pesquisa existem, mas não há ciclo TRO completo rastreável | parcial/indeterminado |

Existência em Markdown não foi usada como prova de implementação; existência de código não foi usada como prova de uso real.

## 9. Sobreposições encontradas

| Sobreposição | Classificação | Decisão de fronteira |
|---|---|---|
| Copiloto e Atlas capturam presença/produção/estoque | **CONFLICT / histórica** | selecionar owner por caso no preflight; não sincronizar antes de observar a operação |
| Copiloto e Atlas criam fechamento/snapshot | **LEGÍTIMA** se preservarem semânticas distintas; **REDUNDANTE** se usados como cópia | nomear `quinzena_operacional` e `periodo_atlas`, sem equivalência implícita |
| Atlas e Cofre preservam memória | **CONFLICT** | Atlas é owner da memória operacional interna; Cofre, no máximo, custódia de pacote interproduto curado |
| Copiloto registra ocorrência e Control registra ECO | **LEGÍTIMA** | ocorrência é fato bruto; ECO exige classificação e pode ser rejeitado |
| Control captura ECO diretamente | **LEGÍTIMA** para uso independente, mas cria risco de duplicar registro | preservar `source_system`/`external_id` quando originado fora |
| Cofre usa tipo `ECO` e contador próprio | **CONFLICT** | não declarar seu namespace compatível com IDs canônicos/produto sem governança |
| Atlas contém ampla gestão operacional | **HISTÓRICA / INDETERMINADA** | não redesenhar; medir quais módulos são efetivamente fonte na obra real |

## 10. Leitura TPC e TDO

| Sistema | Representação persistente | Incerteza/decisão/ação coordenada | Coordenação perdida se desaparecer |
|---|---|---|---|
| Copiloto | estado diário de campo e quinzena | reduz atraso de percepção e suporta gestão diária | presença, produção, estoque, ocorrências e continuidade quinzenal deixam de persistir em uma superfície comum |
| Control | ECO, causa, ICO, decisão e recomendação | prioriza análise e resposta a falhas | a ligação estruturada entre evento, gravidade, causa e resposta deixa de persistir |
| Atlas | estados operacionais/financeiros, períodos, snapshots, hashes e auditoria | suporta reconstrução e prova | baseline, fechamento verificável e histórico auditável deixam de persistir |
| Cofre | representações curadas, histórico Git e pacotes | suporta recuperação transversal e reuso | custódia e recuperação fora dos produtos tornam-se dependentes de pastas dispersas/memória pessoal |

Na lente TDO, Copiloto atua antes e durante a perda de informação; Control atua na classificação da falha, decisão e priorização; Atlas reduz perda genealógica e disputa sobre estados; Cofre pode reduzir perda de contexto entre ciclos. Nenhuma dessas relações prova causalidade nem eficácia; `HYP-002` continua não iniciada.

## 11. Cofre e Google Drive hoje

O Cofre é uma combinação local de:

- repositório Git sem remote;
- estrutura de diretórios e schemas documentais;
- CLI PowerShell e Engines acoplados a `D:\slektips`;
- inbox, registros, boletins, exportações e contador JSON local;
- pasta sincronizada pelo Google Drive Desktop.

Ele não é banco central, barramento, produto público, fonte canônica da teoria ou memória interna do Atlas. O “Kernel OPERA” permanece protótipo interno ao Cofre e sua ADR local conflita com a decisão canônica provisória de não extraí-lo.

Papéis do Google Drive:

- **backup/sincronização de arquivos:** papel local declarado no tutorial do Cofre;
- **preservação externa manual:** candidato para o primeiro pacote real;
- **interface humana/espelho:** possível, mas não verificado como contrato;
- **fonte canônica:** **não**. A Constituição determina que o Git canônico é a fonte oficial da disciplina.

Há conflito entre “sincronização” e “backup” quando não se define retenção/recuperação; a missão não configurou nem testou Drive.

## 12. Relações futuras, sem integração

- **OPERA Vision:** pode consumir `canonical_obra_id` e estados derivados de progresso/saúde como `REFERENCE`/`CONSUMER`; não deve tornar-se owner de presença, estoque, ECO ou fechamento externo.
- **Smart Cotações:** uma compra aprovada pode futuramente produzir um evento de suprimento referenciado à obra, contendo decisão, itens, valor, fornecedor e proveniência; não deve criar a identidade da obra.
- **Obra Flow:** pedido, recebimento e estoque podem consumir `canonical_obra_id` e produzir eventos logísticos com `external_id`; não devem substituir o registro diário ou o snapshot do core.

Esses três produtos permaneceram intocados.

## 13. Lacunas e confiança

Alta confiança: localização, HEADs, stacks, schemas, ausência de contrato executável, identidades locais, builds e arquitetura do Cofre. Média confiança: uso real dos módulos, pois deriva de checkpoints e rascunhos ainda abertos, não de acesso aos backends em produção. Baixa/indeterminada: equivalência física das obras, conteúdo final da quinzena, comportamento de recuperação do Drive e eficácia operacional de ECO/ICO/MDEO.

## 14. Condição de parada

O mapa localiza os quatro sistemas, classifica estado, identidade, ciclo, cadeia, sobreposições e papéis. Ele não autoriza integração, alteração de produto, fechamento real, upload, preflight ou promoção de hipótese.
