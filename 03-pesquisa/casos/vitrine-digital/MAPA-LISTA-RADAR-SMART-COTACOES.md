# Lista para cotar, Radar e Smart Cotações — separação de motores

## Evidência no código congelado

### Lista para cotar
É um mecanismo local/client-side:
- estado em localStorage `vd_cart_v1`;
- limite de 10 itens;
- agrupamento por empresa;
- quantidade por item;
- subtotal para itens com preço;
- mensagem montada e enviada diretamente ao WhatsApp da empresa;
- telemetria via `trackWhatsappClick(..., "cart")`.

Não há, nesse fluxo, disputa entre múltiplos fornecedores, coleta estruturada de respostas, comparação de preços ou adjudicação. Portanto **Lista para cotar não é sinônimo de Smart Cotações**.

### Radar público /pedido
É outro motor:
- não exige conta;
- recebe necessidade;
- persiste via `submit_public_demand`;
- carrega origem, tipo, urgência, localização textual, prazo, consentimento e contato;
- quando vem da Index, preserva source INDEX.

É fallback de demanda e captação, não cotação multi-fornecedor.

### /preciso autenticado
É um terceiro fluxo:
- matching local com ofertas e serviços públicos;
- se houver match, mostra possíveis atendimentos;
- usuário autenticado pode persistir necessidade via `create_my_market_demand`;
- possui estados OPEN/PAUSED/MATCHED/RESOLVED/CANCELLED;
- frete possui estrutura específica.

Isso se aproxima mais de um ledger de necessidade do que de cotação comercial.

## Smart Cotações como motor de ordem superior
O Smart Cotações descrito operacionalmente pelo produto deve ser tratado como orquestração que pode consumir:
1. necessidade/pedido;
2. relacionamento com fornecedores;
3. múltiplas solicitações;
4. respostas/preços/disponibilidade;
5. comparação;
6. evidência de atendimento/entrega;
7. inteligência resultante.

Nenhum dos três fluxos isolados acima implementa todo esse ciclo.

## Mapa
INDEX/Busca
├─ encontrou → oferta/empresa → Lista para cotar → WhatsApp
└─ não encontrou → /pedido → Radar público
                         └─ possível evolução para Smart Cotações

/preciso autenticado → necessidade persistida + matching
                         └─ possível entrada para Smart Cotações

Smart Cotações = orquestrador, não carrinho.

## Consequência para Inteligência
Não usar `cart` como proxy de cotação concluída.
- add-to-cart = intenção de organizar/considerar;
- WhatsApp cart click = solicitação iniciada;
- demand submitted = necessidade declarada;
- supplier response = ainda precisa de evidência própria;
- purchase/resolution = ainda precisa de evidência própria.

## Próximo gate
Auditar tabelas/RPCs relacionadas a respostas de demanda e quaisquer estruturas de quote/procurement. O objetivo é descobrir quanto do Smart Cotações já existe no backend mesmo sem uma rota com esse nome.

Nenhuma mutação em produção.
