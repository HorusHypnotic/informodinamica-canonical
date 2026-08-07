# Relatorio de pagamento por compartilhamento direto

**Organizacao:** Dirceu Jr Engenharia  
**Status:** DRAFT - requer validacao operacional e de privacidade  
**Canal:** compartilhamento manual pelo WhatsApp, sem WhatsApp API

## 1. Objetivo e limite

Este protocolo define como preparar e compartilhar informacoes de pagamento pelo WhatsApp quando o operador realiza o envio diretamente. O sistema nao envia mensagens, nao escolhe destinatarios e nao confirma a entrega.

O fluxo termina quando o conteudo revisado e entregue ao recurso de compartilhamento do dispositivo ou copiado pelo operador. A partir desse ponto, o WhatsApp, o sistema operacional e o dispositivo passam a integrar o ambiente de tratamento.

## 2. Principios operacionais

1. Exibir por padrao uma visao pseudonimizada, com identificadores como `COL-001`.
2. Revelar nome, chave Pix ou outro dado pessoal somente para usuario autenticado e autorizado.
3. Limitar cada mensagem aos dados necessarios para sua finalidade.
4. Exigir revisao humana do conteudo e do destinatario antes do envio.
5. Nao incluir dados pessoais em logs, telemetria, mensagens de erro ou parametros de URL.
6. Registrar somente metadados minimos da operacao, sem copiar o conteudo enviado.

Pseudonimizacao nao e anonimizacao. Se o identificador puder ser associado novamente a uma pessoa mediante informacao adicional, o conteudo continua sujeito aos controles aplicaveis a dados pessoais.

## 3. Fluxo aprovado

1. O operador abre o relatorio pseudonimizado.
2. O operador seleciona um colaborador e solicita **Preparar compartilhamento**.
3. O sistema verifica autenticacao e permissao.
4. O sistema recupera apenas os campos necessarios de uma fonte protegida.
5. Uma tela local apresenta destinatario, finalidade e mensagem completa para conferencia.
6. O operador escolhe **Compartilhar** ou **Copiar texto**.
7. O operador abre o WhatsApp, confirma o contato e envia manualmente.
8. O sistema limpa o estado sensivel da interface na medida tecnicamente possivel e registra apenas o evento operacional.

Nao existe chamada a WhatsApp API, disparo automatico, lista automatizada de contatos ou confirmacao de entrega pelo sistema.

## 4. Forma de compartilhamento

### Preferencial: compartilhamento nativo

Quando disponivel, usar o recurso nativo de compartilhamento do sistema operacional. O usuario continua responsavel por selecionar e conferir o contato no WhatsApp.

### Alternativa: area de transferencia

Copiar o texto somente apos acao explicita. A interface deve alertar que o conteudo permanecera temporariamente na area de transferencia e oferecer uma acao para limpa-la, quando o ambiente permitir.

### Link `wa.me`

Nao usar `wa.me` com nome, chave Pix ou outro dado pessoal no parametro `text`. O texto passa a integrar uma URL e pode aparecer em historico, logs, sincronizacao ou ferramentas externas. Um link sem conteudo sensivel pode apenas abrir a conversa, mantendo a insercao manual da mensagem.

## 5. Separacao dos relatorios

O resumo coletivo nao deve conter nomes completos, chaves Pix ou dados bancarios. Ele pode apresentar identificador interno, periodo, valor e situacao, conforme a necessidade operacional.

Dados para pagamento devem ser preparados individualmente. Uma mensagem destinada a um colaborador nao deve expor dados de outros colaboradores.

### Resumo interno pseudonimizado

```text
Periodo: [INICIO] a [FIM]
COL-001 | Valor: R$ [VALOR] | Situacao: [SITUACAO]
COL-002 | Valor: R$ [VALOR] | Situacao: [SITUACAO]
```

### Mensagem individual

```text
Ola, [NOME].

Segue a conferencia do periodo [INICIO] a [FIM]:
Valor: R$ [VALOR]
Situacao: [SITUACAO]

Confira as informacoes antes de responder.
```

A chave Pix deve ser exibida ou enviada somente quando for indispensavel ao pagamento e para o destinatario adequado.

## 6. Relatorio consolidado de todas as obras

Uma mesma pessoa pode aparecer em mais de uma obra. Cada linha consolidada representa uma alocacao `pessoa-obra`; portanto, a soma de diarias alocadas nao equivale ao numero de colaboradores unicos nem ao numero bruto de registros de apontamento.

O relatorio completo do Atlas, que pode conter nomes e chaves Pix, e um documento interno de pagamento. Ele nao deve ser encaminhado como mensagem coletiva. Para compartilhamento manual pelo WhatsApp, usar o resumo pseudonimizado abaixo e preparar os dados de pagamento individualmente.

### Modelo para copiar e compartilhar

```text
Relatorio consolidado de [INICIO] a [FIM]

Os valores representam diarias alocadas por frente de servico. Uma pessoa pode aparecer em mais de uma obra.

[OBRA]
Total de alocacoes pessoa-obra: [ALOCACOES]
Total de diarias alocadas: [DIARIAS]
Subtotal: R$ [SUBTOTAL]

[REPETIR BLOCO PARA CADA OBRA]

RESUMO CONSOLIDADO
Total de alocacoes pessoa-obra: [TOTAL_ALOCACOES]
Total de diarias alocadas: [TOTAL_DIARIAS]
Total geral do periodo: R$ [TOTAL_GERAL]

Este resumo nao informa a quantidade de colaboradores unicos. Dados pessoais e bancarios devem ser conferidos no relatorio interno e compartilhados apenas com o destinatario adequado.

Relatorio gerado por O.P.E.R.A. Atlas em [DATA_EMISSAO].
```

### Mensagem individual de pagamento

```text
Ola, [NOME].

Segue a conferencia do periodo [INICIO] a [FIM]:
Obra: [OBRA]
Diarias alocadas: [DIARIAS]
Valor: R$ [VALOR]

Confira as informacoes antes de responder.
```

A chave Pix pode ser acrescentada somente quando necessaria para a finalidade do envio e depois de o operador conferir manualmente o destinatario.

## 7. Armazenamento e auditoria

Se nome, Pix ou outros identificadores forem recuperados para montar a mensagem, existe tratamento de dados pessoais em alguma fonte. Essa fonte deve ter controle de acesso, protecao adequada, retencao definida e separacao entre dados identificadores e a visao pseudonimizada quando aplicavel.

O registro de auditoria pode conter:

- identificador do relatorio;
- usuario operador;
- data e hora;
- versao do modelo;
- categoria do destinatario;
- resultado `preparado`, `cancelado` ou `compartilhamento_iniciado`.

O registro nao deve conter nome, telefone, chave Pix, texto da mensagem ou conteudo da area de transferencia. `compartilhamento_iniciado` nao significa mensagem entregue ou lida.

## 8. Limites tecnicos

Nao se deve afirmar que o conteudo nunca permanecera em cache, historico, notificacoes, backups, area de transferencia ou conversa. O sistema pode reduzir a exposicao sob seu controle, mas nao eliminar registros mantidos pelo navegador, sistema operacional, dispositivo, WhatsApp ou destinatario.

Antes da operacao, a organizacao deve definir finalidade, necessidade, perfis de acesso, prazo de retencao, responsabilidades e hipotese legal aplicavel. Consentimento nao deve ser presumido como fundamento unico sem essa avaliacao.

## 9. Criterios de aceite

- [ ] Nenhuma integracao com WhatsApp API ou envio automatico.
- [ ] Relatorio coletivo sem nomes completos, telefone, Pix ou dados bancarios.
- [ ] Dados identificadores acessiveis somente a perfis autorizados.
- [ ] Tela de revisao mostra mensagem e exige confirmacao do operador.
- [ ] Destinatario selecionado e conferido manualmente no WhatsApp.
- [ ] Nenhum dado pessoal em URL, log, telemetria ou erro.
- [ ] Auditoria registra metadados, nunca o texto da mensagem.
- [ ] Interface nao declara entrega, leitura ou ausencia absoluta de rastros.
- [ ] Procedimento de incidente e revisao de acessos documentados.
- [ ] Validacao juridica e de privacidade concluida antes do uso em producao.

## 10. Referencias oficiais

- [Glossario da ANPD](https://www.gov.br/anpd/pt-br/documentos-e-publicacoes/glossario-anpd)
- [Guia de seguranca para agentes de tratamento de pequeno porte](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-publica-guia-de-seguranca-para-agentes-de-tratamento-de-pequeno-porte)

Este documento e um protocolo operacional e nao substitui avaliacao juridica ou de privacidade aplicada ao contexto da organizacao.
