# Smart Cotações — memória semanal e reconfirmação de preço V0

Data: 2026-09-20. Auditoria Git read-only + hipótese de remanufatura.

## Insight operacional
Quando um material já foi cotado recentemente com os mesmos fornecedores, uma nova demanda não precisa necessariamente gerar uma nova cotação completa.

Fluxo candidato:
`preço desconhecido → cotar`
`preço recente → reconfirmar`
`confirmado → reutilizar no novo caso`
`alterado → registrar nova observação`
`recusado/indisponível → invalidar apenas para o novo caso, preservando histórico`.

O objetivo é converter trabalho histórico em menor esforço marginal.

## Patrimônio já existente
O Smart Cotações já tem `price_observations` e Memória Econômica.

`EconomicMemoryPanel.tsx` comprova:
- active/expired;
- `captured_at`;
- material canônico;
- região;
- fornecedor;
- cotação de origem;
- preço unitário e quantidade;
- expiração individual e em lote;
- autor/motivo de expiração;
- histórico preservado;
- cálculo público ignora observações expiradas e observações > 90 dias.

`price-domain.ts` comprova:
- command bus de preço;
- `price.expire_observation`;
- `price.expire_bulk`;
- idempotência;
- actor_type;
- health view;
- consulta de stale observations.

## Lacuna
O domínio atual sabe **expirar**, mas não foi comprovado um comando explícito para **reconfirmar** preço.

Também há diferença entre:
- validade para inteligência estatística, hoje até 90 dias;
- validade operacional para reutilizar preço numa compra, que pode ser 1, 3, 7 dias etc.

Não confundir as duas janelas.

## Modelo conceitual
Não criar “histórico semanal” paralelo. Derivar snapshots/consultas semanais da sequência imutável de observações.

Estados derivados candidatos:
- CONFIRMED_NOW
- RECENT_UNCONFIRMED
- HISTORICAL
- EXPIRED

São projeções, não necessariamente coluna de estado.

## Reconfirmação
Mensagem assistida candidata:

> Olá, [fornecedor]. Na última cotação de [data], ficou [item] a R$ [preço] nas condições [x]. Consegue manter esse preço para [quantidade] com entrega [prazo]?

Ações:
- CONFIRMAR MESMO PREÇO
- INFORMAR NOVO PREÇO
- INDISPONÍVEL
- SEM RESPOSTA

Uma confirmação deve gerar evidência nova com timestamp. Não “renovar” silenciosamente `captured_at` da observação antiga.

## Aprendizado comercial
Com histórico suficiente, derivar por fornecedor/material/região:
- último preço;
- mediana/média recente;
- dispersão;
- frequência de alteração;
- desconto médio observado em negociação;
- taxa de confirmação de preço;
- tempo médio de resposta;
- lead time observado;
- validade empírica do preço.

A “média de desconto do vendedor” deve distinguir preço inicial → preço negociado dentro de uma mesma negociação. Não inferir desconto apenas comparando semanas.

## Fan-out adaptativo
Para cada fornecedor candidato:
- sem preço recente → mensagem de cotação;
- preço recente → mensagem curta de confirmação;
- preço confirmado no mesmo contexto → nenhuma nova solicitação;
- preço antigo/volátil → nova cotação.

Assim 10 fornecedores podem virar, por exemplo, poucas cotações completas + várias reconfirmações.

## Freshness adaptativa
Começar com regra simples configurável, ex. 7 dias para reconfirmação, mas não canonizar 7 dias como verdade econômica.

Depois aprender janela por material/fornecedor:
- commodities voláteis: curta;
- itens estáveis: maior;
- fornecedor que altera preço frequentemente: menor;
- fornecedor que honra preço repetidamente: maior.

## Relação com BATNA
Preço histórico não deve concorrer como proposta atual sem marcação.
Pode servir para:
- sugerir BATNA;
- detectar proposta fora da faixa;
- preparar contraproposta;
- decidir quem vale reconfirmar primeiro.

BATNA atual confirmada continua sendo baseada nas propostas da cotação corrente.

## Requisito de auditoria
Cada reutilização/reconfirmação precisa preservar:
- observation_id anterior;
- nova observation/evidence;
- quotation_id novo;
- supplier_id;
- decisão;
- timestamp;
- actor;
- correlation_id quando disponível.

Isso permite reconstruir por que determinado preço foi considerado válido.

## Próximo gate técnico
Auditar schema/migrations do Smart Cotações para descobrir se `price_observations` suporta lineage/reconfirmation sem alteração. Se não, desenhar a menor extensão possível, preferencialmente evento/comando aditivo em vez de mutar observação antiga.

Nenhuma mutação em produção.
