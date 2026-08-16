# PLAYBOOK OPERACIONAL — Diagnóstico O.P.E.R.A. R$197 (V0)

**Missão de origem:** Playbook Operacional do Diagnóstico O.P.E.R.A. R$197 V0 (executada em 16/08/2026, após `COD_MONEY_PATH_V0_COMPLETE`).
**Princípio canônico:** este documento é a infraestrutura operacional do experimento. Ele sobrevive à sessão atual e permite que qualquer agente ou humano retome a operação sem depender da memória desta conversa. Todo conhecimento operacional desta sessão vive aqui, versionado.
**Repositório:** `HorusHypnotic/informodinamica-canonical` (privado). O repositório público `HorusHypnotic/canteiro-de-obras-digital` permanece responsável exclusivamente pela superfície comercial pública.
**Artefatos relacionados nesta sessão:** `PLAYBOOK_FASE0.md` (recuperação de estado, em `/home/ubuntu/forense/` — não versionado; o estado real está neste documento e no LOG.md).

**Localização escolhida:** `commercial/experimento-r197/PLAYBOOK-DIAGNOSTICO-OPERA-R197-V0.md`, no mesmo diretório do log append-only do experimento. Decisão registrada: o diretório por experimento (`commercial/experimento-r197/`) é a convenção local mais próxima; não existe playbook comercial pré-existente no repositório (verificado por busca — os objetos comerciais existentes são `money-machine-v0.json`, `offers/`, `schemas/order-v0.schema.json` e `portfolio-execution-matrix-v1-draft.json`, nenhum é um playbook operacional). O playbook não duplica nenhuma dessas estruturas: ele as **consome** (a oferta aprovada v1.1 define preço e SLA; o schema order-v0 define estados de pedido; o log define o registro).

**Canais autorizados:** WhatsApp `5594992193129` e e-mail `canteirodeobrasdigital@gmail.com` (fornecidos pelo owner em 16/08/2026). Não usar outro canal sem autorização.

---

## 0. Contrato do produto (Fase 2)

| Campo | Definição |
|---|---|
| PRODUTO | Diagnóstico O.P.E.R.A. (versão pública: Diagnóstico O.P.E.R.A. V1, `OFFER-OPERA-DIAGNOSTICO-V1`) |
| PREÇO | R$ 197, preço fixo. **Não alterar.** A versão aprovada é `diagnostico-opera-v1.1-approved.json` (status APPROVED, `kind: FIXED`) |
| OBJETIVO | Análise inicial estruturada de um problema operacional de obra, a partir das informações e evidências fornecidas pelo cliente |
| ENTREGÁVEL | Um relatório em PDF, entregue por canal privado combinado, seguindo o template da Seção 10 |
| SLA registrado | `3 dias úteis após todos os inputs necessários estarem disponíveis` (conforme offer v1.1-approved). **O deadline de venda/comunicação ao cliente continua `OWNER_DECISION_REQUIRED` — ver Seção 7** |
| Canal privado | Definido por pedido, sem dependência de fornecedor (offer v1.1-approved) — no experimento: WhatsApp |

O produto **NÃO É**, conforme a copy publicada na página (`#oferta-ativa`), preservada literalmente:

1. Não é laudo, auditoria, fiscalização ou parecer técnico, contábil ou jurídico.
2. Não inclui visita, implementação ou acompanhamento.
3. Não promete economia, redução de perdas ou desempenho.
4. Pode concluir que os dados são insuficientes, sem inventar uma classificação.

Regras operacionais derivadas: **não** atribuir ao diagnóstico atribuições profissionais reservadas; **não** comunicar "economia garantida" ou qualquer promessa de resultado em conversa; **não** caracterizar o PDF como laudo ou parecer; **não** cobrar por visita, implementação ou acompanhamento dentro deste produto.

---

## 1. Primeira resposta no WhatsApp (Fase 3)

Quando chegar a mensagem pré-preenchida **"Olá, vi o Diagnóstico O.P.E.R.A. de R$197 e quero entender como funciona."**, responder com a mensagem abaixo (versão pronta para copiar — editar apenas o trecho em colchetes se necessário):

---

> Olá! Obrigado pelo contato. Explico rapidinho como funciona o Diagnóstico O.P.E.R.A. de R$197.
>
> **O que é:** uma análise inicial e estruturada de um problema da sua obra, feita a partir do que você me enviar (descrição do problema, fotos, planilhas, cronograma, o que tiver disponível). Nada de visita nem de implementação — é uma leitura técnica por dentro do material.
>
> **O que você recebe:** um relatório em PDF com o que está sob controle, o que não está, por quê, e quais prioridades eu enxergo. Tudo com a origem de cada informação clara — o que veio de você, o que observei nos materiais e o que é minha leitura.
>
> **O que não é:** não é laudo, auditoria nem parecer técnico, e não promete economia. É honesto por construção: se os materiais não sustentarem uma conclusão, o relatório diz isso em vez de inventar.
>
> **Preço e cobrança:** R$ 197 fixos. A cobrança só acontece **depois** de confirmarmos juntos o que será analisado — nada é cobrado antes disso.
>
> Se fizer sentido para o seu caso, posso fazer 4 perguntas rápidas para confirmar o escopo. Quer seguir?

---

Objetivos cobertos: explica o serviço em linguagem do cliente, reduz incerteza (o que é/não é, quando paga), não despeja OPERA/TPC/ecossistema, não vende antes de verificar elegibilidade e deixa explícito que o escopo precede a cobrança.

---

## 2. Qualificação mínima (Fase 4)

Cinco perguntas. Investigado: são suficientes para decidir elegibilidade (Seção 3) e montar o intake (Seção 8); o conjunto coincide com os inputs já descritos na página ("Você envia: contexto da obra, problema principal, período, finalidade da análise e origem das informações"). Não aumentar sem necessidade demonstrada em caso real.

1. **Que tipo de obra é?** (residencial, comercial, reforma, obra própria, múltiplas frentes)
2. **Qual problema mais preocupa hoje?** (espera, retrabalho, custo, prazo, compras, equipe — em uma frase do cliente)
3. **Quem executa/gerencia?** (o próprio cliente, empreiteiro, construtora — base do campo `BUYER_ROLE`)
4. **Quais informações/evidências existem?** (fotos, planilha, orçamento, cronograma, nada formalizado)
5. **Qual decisão você gostaria de conseguir tomar depois da análise?** (seguir/frear, contratar/não, renegociar, organizar a obra)

Formato: enviar as cinco de uma vez ou em bloco curto, sem interrogatório formal. Respostas do cliente em áudio valem; transcrever a síntese no registro.

---

## 3. Gate de elegibilidade (Fase 5)

| Estado | Condição | Resposta ao cliente | Próxima ação | Registro |
|---|---|---|---|---|
| `ELIGIBLE` | Obra real e definida; problema operacional claro; evidências mínimas existem (≥1 material útil); cliente é o decisor ou o representa; problema cabe no escopo publicado | Confirmar por escrito (WhatsApp) o escopo combinado: o que será analisado, formato, canal de entrega, preço R$ 197 e que a cobrança vem agora | Solicitar pagamento (Seção 6) e dar início ao intake | Atualizar OPP: estado + escopo confirmado (data/hora) |
| `NEEDS_INFORMATION` | Cliente interessado mas falta insumo mínimo para decidir escopo (ex.: "não sei o que te mandar", problema ainda difuso) | Dizer o que falta em 1 frase e o que adianta mandar (ex.: 3 fotos + descrição de 1 problema) | Aguardar resposta; sem cobrança | Atualizar OPP: estado + o que falta |
| `OUT_OF_SCOPE` | Não é obra/construção; é pedido de laudo/parecer; é pedido de implementação; é problema fora da capacidade declarada (ex.: jurídico, contábil, fiscalização) | Recusar com educação e, quando genuíno, indicar o caminho certo fora do produto ("para isso o indicado é um engenheiro/auditório de X") | Encerrar; nunca cobrar | Atualizar OPP: estado + motivo |

**Regra dura:** cobrança somente após `ELIGIBLE` com escopo confirmado por escrito. Nunca cobrar em `NEEDS_INFORMATION` ou antes do gate.

---

## 4. Cobrança (Fase 6)

Fluxo mínimo, totalmente manual:

```
ELIGIBLE → CONFIRMAÇÃO DE ESCOPO → COBRANÇA → PAGAMENTO CONFIRMADO → INTAKE
```

Confirmar escopo por escrito no WhatsApp (frase de 2–3 linhas: "Análise: X. Entrega: PDF até D. Valor: R$ 197. Pagamento por [método]."). Após o cliente concordar, enviar o pedido de pagamento. Confirmar o recebimento (print/boleto/extrato) **antes** de iniciar a análise. Registrar no OPP a data da confirmação de escopo e a data de pagamento confirmado.

**`PAYMENT_METHOD = OWNER_DECISION_REQUIRED`.** O playbook não inventa o método. Opções operacionais já conhecidas do contexto (não canonizadas): PIX pessoal, transferência bancária, PayPal. O owner deve declarar o método antes da primeira cobrança real; até lá, a operação não cobra.

Nenhuma credencial bancária, chave PIX detalhada ou dado financeiro sensível deve entrar no Git. No Git registra-se apenas "PIX definido — detalhes fora do repositório" ou similar.

---

## 5. Prazo (Fase 7)

**`DELIVERY_DEADLINE = OWNER_DECISION_REQUIRED`.** O playbook não canoniza prazo sem autorização. Três opções operacionais apresentadas para decisão do owner (todas coerentes com o SLA registrado "3 dias úteis após inputs" da offer v1.1-approved, que só passa a valer quando os inputs existirem):

| Opção | Definição | Efeito prático |
|---|---|---|
| A | Entrega em até 3 dias úteis após o intake completo | Coincide com a offer v1.1-approved; exige disciplina de intake |
| B | Entrega em até 5 dias úteis após o intake completo | Margem para casos com material desorganizado |
| C | Entrega em até 7 dias corridos após o pagamento | Simples de comunicar, menos dependente de "inputs completos" |

Quando o owner escolher, a decisão entra aqui e passa a valer para todos os OPPs subsequentes, sem retroatividade explícita a pedidos em curso (registrar a transição no log).

---

## 6. Intake (Fase 8)

Checklist mínimo de materiais **possíveis** (não obrigatórios — o conjunto depende do problema, confirmado no gate):

| Material | Exemplo |
|---|---|
| Descrição do problema | O relato da Seção 2, pergunta 2 |
| Fotos | Obra, frentes, gargalos |
| Documentos | Contrato, contratos de empreitada, NFs |
| Orçamento | Planilha ou documento de custo planejado |
| Cronograma | Cronograma físico ou de metas |
| Medições | Relatórios de medição, boletins de produção |
| Planilhas | Controle de custo, compras, pagamentos |
| Mensagens relevantes | Trechos de conversas que evidenciem o problema |
| Outros registros | O que mais existir e for relevante ao problema declarado |

Regras: não exigir todos; pedir só o que sustenta o problema declarado; **registrar exatamente o que foi recebido** (lista com data, no OPP); o que não foi recebido fica como lacuna (Seção 9), nunca como inferência silenciosa.

---

## 7. Protocolo de análise (Fase 9)

Aplica a disciplina de evidência já existente no repositório: o prompt canônico do agente de campo estabelece "separe sempre **fato observado, relato, inferência e ausência de dados**" (`agents/copiloto-obras-system-prompt.md`, linha 23), e o schema `textual-evidence-v0` exige proveniência para cada evidência (`source_ref` com identificação e hash da fonte). O protocolo do diagnóstico herda esses princípios e os torna executáveis em quatro classes de classificação, com origem de cada afirmação apontada no PDF:

| Classe | Definição | Regra |
|---|---|---|
| `DECLARADO` | O que o cliente afirmou | Nunca tratar como fato; citar com a atribuição ("segundo o cliente") |
| `OBSERVADO` | O que consta nos materiais recebidos (fotos, planilhas, documentos) | Citar a fonte material concreta |
| `INFERIDO` | Conclusão sustentada por declarados + observados, com encadeamento explícito | Mostrar o encadeamento; grau de confiança quando relevante |
| `DESCONHECIDO` | O que não se sabe e seria relevante | Declarar explicitamente como lacuna; nunca preencher com hipótese silenciosa |

Três disciplina operacionais derivadas: o relato do cliente não vira fato automaticamente; quando o relato e o material divergem, a divergência vira achado (com as duas versões); nenhuma conclusão relevante entra no PDF sem base nomeada (classe + fonte).

---

## 8. Template do PDF (Fase 10)

Estrutura mínima reutilizável (arquivo único, Markdown convertido a PDF; nome de arquivo `diagnostico-opera-OPP-XXX.pdf`):

```
# DIAGNÓSTICO O.P.E.R.A.
Cliente: [pseudônimo ou razão social] · OPP: [OPP-XXX] · Data: [AAAA-MM-DD]

## 1. Contexto recebido
(O que o cliente declarou, com a própria voz resumida)

## 2. Questão analisada
(O problema declarado + a decisão que o cliente quer conseguir tomar)

## 3. Materiais/evidências recebidos
(Tabela: material · fonte · data de recebimento · classe OBSERVADO/DECLARADO)

## 4. Situação observável
(O que os materiais sustentam — separação observada/declarada explícita)

## 5. Principais achados
(No máximo 5 achados; cada um com classe e base)

## 6. Evidências associadas
(Mapeamento achado → evidência → fonte)

## 7. Lacunas de informação
(O que falta e o que cada lacuna impede de concluir)

## 8. Prioridades
(Prioridades qualitativas, com base em cada uma)

## 9. Próximas decisões possíveis
(Ações que o diagnóstico habilita — nunca ordem de execução)

## 10. Limites da análise
(Literal: não é laudo/auditoria/parecer; não inclui visita/implementação;
não promete economia; dados insuficientes não viram classificação inventada)
```

Regra econômica: o produto de R$197 deve permanecer entregável — se o caso exigir profundidade de auditoria, a análise declara o limite e o cliente pode ser informado (sem venda automática) de que o caso excede o produto.

---

## 9. Resultado negativo (Fase 11)

Três resultados válidos e formalizados para qualquer achado:

| Resultado | Definição |
|---|---|
| `FINDING_SUPPORTED` | Sustentado por evidências (observadas e/ou declaradas consistentes) |
| `FINDING_NOT_SUPPORTED` | A suspeita ou expectativa do cliente não se sustenta nas evidências |
| `INSUFFICIENT_EVIDENCE` | Os materiais não permitem concluir nada relevante |

O cliente não compra confirmação de suspeita: compra análise. `FINDING_NOT_SUPPORTED` e `INSUFFICIENT_EVIDENCE` são entregas legítimas do produto — comunicar isso ao cliente, sem retrabalho de "encontrar algo para agradar". O PDF sempre declara o resultado de cada achado com essa classificação.

---

## 10. Entrega (Fase 12)

```
PDF → envio (WhatsApp, canal combinado)
    → confirmação de recebimento (pergunta direta: "Recebeu o PDF?")
    → pergunta pós-entrega (registrar resposta literalmente quando possível)
```

Pergunta principal do experimento: **"Depois de ler o diagnóstico, qual decisão ficou mais fácil de tomar?"**. A resposta é evidência de valor percebido, não prova de valor econômico: não converter elogio em caso de sucesso comercial sem receita registrada. Registrar a resposta literal no OPP (campo `observacao`).

---

## 11. Máquina de estados e integração com o log (Fase 13)

Cada oportunidade no `commercial/experimento-r197/LOG.md` recebe o campo adicional **`estado`** (aplicado às novas linhas; não reescrever linhas anteriores retroativamente). Fluxo:

```
CONTACTED → RESPONDED → ELIGIBLE/NEEDS_INFORMATION/OUT_OF_SCOPE
        → PAYMENT_REQUESTED → PAID → MATERIAL_RECEIVED
        → ANALYSIS → DELIVERED → FEEDBACK_RECEIVED
        → (LOST a qualquer ponto antes de PAID)
```

Estados são atualizados por linhas adicionais no log (append-only), cada uma com data e transição. Transições proibidas: nada depois de `PAID` pode ser `LOST`; resultado não pode ser alterado retrospectivamente; recusa nunca é apagada.

---

## 12. OPP-001 (Fase 14)

O primeiro prospect **real** elegível pelo protocolo recebe `OPP-001` no primeiro registro (append) em LOG.md, conforme o schema já existente, agora com os campos `estado` e `BUYER_ROLE` (Seção 13). O teste técnico de página feito pelo owner **não** é OPP-001. Proibido criar OPP fictício.

---

## 13. Campo experimental BUYER_ROLE (Fase 15)

Campo descritivo no log, valores em linguagem natural (sem taxonomia rígida no V0): dono da obra, construtora, empreiteiro, contratante, investidor, gestor, outro. Objetivo: testar empiricamente **quem** atribui valor ao diagnóstico, preenchido a partir da pergunta 3 da qualificação.

---

## 14. Hipótese H15 (Fase 16)

Registrada como **hipótese**, não conclusão (não modifier a página pública nem o posicionamento com base nela):

> **H15** — O comprador economicamente mais alinhado à capacidade O.P.E.R.A. pode não ser o executor da obra, mas o ator que financia, contrata ou assume o risco da execução e sofre com assimetria informacional.

Critério de teste: após `N ≥ 10` OPPs com `BUYER_ROLE` registrado e pelo menos 1 caso pago, comparar `PAID` por papel. Hipótese considerada **SUPPORTED** se o papel financiador/contratante dominar os casos pagos; **REFUTED** se o executor dominar; **UNKNOWN** caso contrário. Registrar o teste e o resultado no log (append).

---

## 15. Mapa de automação futura (Fase 17)

Não implementar automação. Tabela de referência para decisões futuras; no V0, tudo é `MANUAL_NOW`, e classificação futura só com evidência operacional (primeiros casos medidos).

| Etapa | Manual agora | Automatizável? (sem evidência: UNKNOWN) | Evidência necessária |
|---|---|---|---|
| Primeira resposta | Sim | UNKNOWN | Volume de conversas, padrões de pergunta |
| Qualificação (5 perguntas) | Sim | UNKNOWN | Padrões de resposta, taxa de elegibilidade |
| Gate de elegibilidade | Sim | UNKNOWN | Critérios estáveis em N casos |
| Cobrança/pagamento | Sim | UNKNOWN | Método definido + volume |
| Intake (recebimento de materiais) | Sim | UNKNOWN | Volume e formatos recorrentes |
| Classificação DECLARADO/OBSERVADO/INFERIDO/DESCONHECIDO | Sim | UNKNOWN (AI_ASSIST candidato natural) | Consistência humano vs. sugestão de IA |
| Produção do PDF | Sim | UNKNOWN (AI_ASSIST candidato natural) | Tempo de produção medido |
| Envio e confirmação de recebimento | Sim | UNKNOWN | Padrões de resposta |
| Pergunta pós-entrega | Sim | UNKNOWN | Taxa de resposta |
| Atualização do log OPP | Sim | UNKNOWN | Schema estável |

Objetivo futuro (não construir agora): chegar ao owner apenas o que exige julgamento humano. Classificações futuras: `AUTOMATE`, `AI_ASSIST`, `HUMAN_REQUIRED`, `UNKNOWN`.

---

## 16. Economia unitária (Fase 18)

Por diagnóstico, **medir** (não estimar) no momento da execução, registrando no OPP:

| Métrica | Como medir |
|---|---|
| Preço | R$ 197 (fixo) |
| Tempo de conversa | Minutos totais de WhatsApp antes de `PAID` |
| Tempo de análise | Minutos/horas da análise (Seção 9) |
| Tempo de produção do PDF | Minutos do template à entrega |
| Tempo total | Do `CONTACTED` ao `DELIVERED` |
| Retrabalho | Revisões de PDF (janela de correção factual: offer v1.1-approved) |
| Follow-up necessário | S/n e quantas interações após `DELIVERED` |

Objetivo: após os primeiros casos, responder se R$197 é economicamente sustentável para o operador humano. Não decidir sobre preço ou capacidade antes dessa medição.

---

## 17. Privacidade (Fase 19)

Regra dura: **nenhum dado pessoal de prospect em repositório público.** Este playbook e o LOG.md vivem no repositório **privado**, o que atende à regra de transporte; mas dados dentro de Git privado ainda têm riscos (backup, colaboradores, export). Representação segura adotada **antes de qualquer prospect**:

1. **Identificação no log:** usar nome próprio/apelido + organização — suficiente para conduzir o experimento. Evitar CPF, documentos pessoais, dados bancários e endereços.
2. **Conteúdo de conversa:** registrar síntese, nunca transcrição integral de mensagens privadas; trechos sensíveis são parafraseados.
3. **Dados bancários e chaves de pagamento:** nunca entram no Git — ficam fora do repositório (memória do operador/WhatsApp), registrando-se apenas "pagamento confirmado em [data], método definido".
4. **Materiais de intake (fotos, planilhas, contratos do cliente):** fora do Git por padrão; quando indispensável um material para o trabalho de análise, guardar em local privado e referenciar no OPP apenas a existência e a data ("planilha de custo recebida 17/08", sem o arquivo).
5. **Revisão de commit:** antes de qualquer commit neste diretório, varrer diff por telefone completo, e-mail não destinado, CPF e chave bancária (verificação executada na missão de versionamento, Seção 18 deste documento).
6. **LGPD:** os dados são coletados com consentimento na conversa (o CTA e o produto declaram a finalidade); usar apenas para conduzir o experimento; apagar sob pedido do titular.

---

## 18. Checklist de bolso (Fase 20)

Operável pelo celular (ler em qualquer leitor Markdown, marcar mentalmente):

```
CHEGOU WHATSAPP
[ ] responder (mensagem da Seção 1)
[ ] qualificar (5 perguntas, Seção 2)
[ ] decidir elegibilidade (ELIGIBLE / NEEDS_INFORMATION / OUT_OF_SCOPE)
[ ] confirmar escopo (por escrito, WhatsApp)
[ ] cobrar (somente após ELIGIBLE; método definido pelo owner)
[ ] confirmar pagamento
[ ] receber material (intake, registrar o que chegou)
[ ] registrar evidências (DECLARADO/OBSERVADO/INFERIDO/DESCONHECIDO)
[ ] analisar (protocolo da Seção 7)
[ ] produzir PDF (template da Seção 8)
[ ] revisar (limites, classes, sem promessa)
[ ] entregar (WhatsApp)
[ ] confirmar recebimento + perguntar "qual decisão ficou mais fácil?"
[ ] atualizar OPP no LOG.md (estado, BUYER_ROLE, métricas de tempo)
```

---

## 19. Riscos e limites deste playbook

O playbook não resolve tráfego (a página segue sem visitantes mensuráveis — `CONVERSION_RATE = UNKNOWN`, `TRAFFIC_PROBLEM = CONFIRMADO`), não define método de pagamento nem deadline (ambos `OWNER_DECISION_REQUIRED`), não mede a capacidade simultânea do operador (`capacity: NOT_MEASURED` na offer v1.1-approved) e não cria checkout nem automação. O objetivo permanece o da missão: provar `R$0 → possibilidade de R$197` com processo mínimo, persistente e auditável.

---

**Versão:** V0 · **Criado:** 16/08/2026 · **Próxima revisão:** após `N ≥ 10` OPPs ou mudança de decisão do owner em `PAYMENT_METHOD`/`DELIVERY_DEADLINE`.
