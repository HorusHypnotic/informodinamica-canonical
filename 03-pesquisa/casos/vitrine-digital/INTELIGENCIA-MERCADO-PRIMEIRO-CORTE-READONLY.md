# Primeiro corte read-only — Inteligência de Mercado

Data: 2026-09-20. Banco de produção consultado somente com SELECT.

## Estado observado

- `public_demand_leads`: 7 registros.
- `market_demand_requests`: 0 registros.
- `public_demand_responses`: 0 registros.
- `click_events`: 3 registros históricos.

Dos 7 leads públicos, 6 têm origem claramente marcada como QA/teste. Um registro tem origem `VITRINE_PEDIDO_TRANSPORT_V0:INDEX`, tipo SERVICE e status UNMATCHED.

## Consequência

Não há amostra real suficiente para produzir inteligência comercial confiável hoje. O pipeline técnico de captura existe, mas a base ainda mistura QA com uso real e não deve ser apresentada ao lojista como “mercado”.

## Descoberta de produto

O primeiro dashboard pago não deve nascer de números decorativos. Antes dele precisamos de:
1. classificação explícita de eventos QA/teste;
2. separação analítica entre tráfego/teste e uso real;
3. captura mínima do lado satisfeito do funil;
4. limiar mínimo de amostra antes de emitir insight.

## Insight operacional já válido

Existe ao menos um traço real/operacional aparente de necessidade de transporte originada na Index e não atendida. Como a amostra é unitária, isso é evidência de fluxo funcionando, não tendência de mercado.

## Regra proposta

Um insight de mercado só pode ser emitido quando:
- fonte não for QA/test;
- janela temporal estiver definida;
- denominador/amostra for exibível ou superar limiar;
- nenhuma PII for revelada;
- regra de cálculo for reconstruível.

## Próxima hipótese

H-IM-002: separar eventos de QA na origem e instrumentar o lado satisfeito do funil permitirá comparar “procura atendida” versus “procura não atendida”, reduzindo o viés identificado em H-IM-001.

Nenhuma alteração de produção foi realizada.
