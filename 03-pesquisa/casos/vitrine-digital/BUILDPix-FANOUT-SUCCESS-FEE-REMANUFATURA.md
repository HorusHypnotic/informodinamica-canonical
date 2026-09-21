# BuildPixPay → Smart Cotações — remanufatura do fan-out e monetização

Data: 2026-09-20. Auditoria Git read-only.

## Fonte
Repo privado localizado: `HorusHypnotic/build-pix-pal`.

A hipótese recente do owner não nasceu do zero. O BuildPixPay já contém patrimônio de **curadoria de compras** além do Pix.

## Evidências
`Dashboard.tsx` já apresenta:
- aba Curadoria;
- criação/listagem de solicitações de orçamento;
- painel de taxas de curadoria;
- explicação “Solicite Orçamentos → Compare Propostas → Economize”;
- regra comercial exibida: taxa de 20% sobre a economia;
- exemplo: referência 10.000, proposta 8.000, economia 2.000, taxa 400, economia líquida 1.600.

`Suppliers.tsx` já implementa:
- lista de solicitações abertas;
- itens, quantidade, unidade e preço estimado;
- proposta do fornecedor;
- valor total;
- prazo de entrega;
- observações;
- cálculo de economia;
- confirmação manual antes do envio;
- persistência em `supplier_proposals_new`.

Portanto, **success fee de 20% sobre economia e rede de propostas já eram hipóteses codificadas no BuildPixPay**.

## O que remanufaturar
Não transportar o módulo financeiro nem a arquitetura inteira.

Extrair a ergonomia:
1. uma demanda/cotação aberta;
2. lista de fornecedores candidatos;
3. mensagem de solicitação pré-montada;
4. botão individual “Enviar WhatsApp”;
5. operador dispara fornecedor por fornecedor;
6. registrar `contacted_at`/estado do convite;
7. resposta volta para Smart Cotações;
8. comparação/negociação continua no motor já existente.

Isto é **fan-out assistido**, não disparo em massa.

## Por que combina com o estágio atual
- usa relacionamento real do operador;
- evita API/automação de WhatsApp no V0;
- reduz risco de spam;
- mantém decisão humana de quem abordar;
- cada envio pode gerar evidência de contato;
- permite aprender cobertura/tempo de resposta antes de automatizar.

## UX candidata
Painel “Acionar fornecedores”:

[Fornecedor A] [Mensagem pronta] [WhatsApp] [Aguardando]
[Fornecedor B] [Mensagem pronta] [WhatsApp] [Não enviado]
[Fornecedor C] [Mensagem pronta] [WhatsApp] [Respondido]

A mensagem pode ser editada antes do envio. Um clique abre WhatsApp com texto codificado. O sistema não afirma envio até existir ação/evidência apropriada.

## Propostas cegas / “Tinder round”
Hipótese separada:
- comprador pode iniciar sem cadastro;
- propostas são comparadas sem revelar imediatamente a identidade comercial;
- preço, cobertura, prazo e condições podem ser mostrados;
- identidade é liberada numa etapa comercial explícita.

Não implementar antes de validar regras de transparência, aceite e bypass.

## Monetização
Hipótese herdada do BuildPixPay:
`success_fee = economia_comprovada × 20%`.

A base de comparação precisa ser definida antes:
- orçamento de referência aceito?
- segunda melhor proposta completa?
- preço histórico regional válido?
- preço inicialmente apresentado pelo comprador?

Não usar “preço médio de mercado” sem evidência reconstruível.

A Memória Econômica do Smart Cotações oferece matéria-prima futura para baseline auditável, mas ainda não autoriza uma fórmula única.

## Relação futura com gateway
O mesmo padrão de UX “fila + ação individual + estado” pode ser reutilizado futuramente para pagamentos:
- destinatário;
- valor;
- revisar;
- executar individualmente;
- confirmar;
- registrar resultado.

O componente conceitual remanufaturável é a **fila assistida de ações**, não o Pix em si.

## Contratos candidatos
`supplier_outreach`:
- quotation_id
- supplier_id/business_subject
- correlation_id
- message_snapshot
- state DRAFT/OPENED/CONTACTED/RESPONDED/DECLINED/EXPIRED
- opened_at/contacted_at/responded_at
- actor_id

Não criar tabela ainda. Primeiro verificar se Smart Cotações já possui estrutura equivalente.

## Próximo gate
Buscar no Smart Cotações migrations/schema por invite/outreach/contact/message/notification e no BuildPixPay o schema de budget_requests/proposals/curation fees. Só criar contrato novo se não existir equivalente.

Nenhuma mutação em produção.
