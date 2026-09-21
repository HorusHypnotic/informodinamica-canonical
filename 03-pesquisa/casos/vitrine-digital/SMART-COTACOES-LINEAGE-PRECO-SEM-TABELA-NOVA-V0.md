# Smart Cotações — lineage de preço sem tabela nova V0

Data: 2026-09-20. Auditoria Git read-only do schema tipado do Smart Cotações.

## Achado
O schema atual de `price_observations` já contém peças suficientes para um primeiro V0 de reconfirmação sem criar uma tabela paralela:

- id
- quotation_id
- supplier_id
- supplier_quote_id
- supplier_quote_item_id
- canonical_material_id
- raw_material_text
- unit_price
- quantity/unit
- captured_at
- source_type
- correlation_id
- fingerprint JSON
- confidence_score
- negotiated
- lead_time_days
- freight_included
- payment_terms
- urgency_level
- region_code
- expired_at/by/reason

O `quotation_command_log` também já possui:
- command_id
- command
- payload/result
- quotation_id
- actor_type
- causation_id
- correlation_id
- status/timestamps.

## Conclusão
**Não criar tabela de histórico semanal nem tabela de reconfirmação agora.**

A observação antiga permanece imutável. Uma reconfirmação deve produzir uma nova `price_observation`, vinculada à nova cotação/contexto.

O lineage pode ser representado inicialmente por:
1. `correlation_id` para a jornada;
2. `source_type` para distinguir origem;
3. `fingerprint` para metadados de proveniência, se o contrato atual aceitar isso sem quebrar semântica;
4. command log para ação auditável.

## Contrato candidato
Novo comando conceitual:
`price.reconfirm_observation`

Payload mínimo:
- prior_observation_id
- quotation_id atual
- supplier_quote/item atual
- decision: SAME_PRICE | NEW_PRICE | UNAVAILABLE
- unit_price quando aplicável
- reason/notes opcional
- correlation_id

Resultado:
- cria nova observação quando SAME_PRICE/NEW_PRICE;
- preserva prior_observation_id como lineage;
- não altera captured_at da antiga;
- registra comando/auditoria;
- UNAVAILABLE não inventa preço.

Ainda não implementar antes de auditar `execute_price_command` no banco/migration.

## Freshness
Derivar, não persistir inicialmente:
- CONFIRMED_NOW: observação do contexto atual;
- RECENT_UNCONFIRMED: observação ativa dentro da janela operacional;
- HISTORICAL: fora da janela operacional mas ainda útil à memória;
- EXPIRED: expired_at preenchido.

A janela operacional deve ser parâmetro de política, não hardcode universal de 7 dias.

## Fingerprint
`fingerprint: JSON` é candidato para carregar lineage sem migration, por exemplo:
- prior_observation_id
- confirmation_kind
- reference_captured_at

Mas isso só deve ser usado após verificar a semântica atual do fingerprint. Não transformar campo existente em saco de metadados sem prova.

## Implicação
A arquitetura pode ganhar reconfirmação com mudança muito pequena:
UI/fan-out → command bus → nova observação → memória econômica.

Isso preserva o princípio:
**preço antigo é evidência; confirmação nova é outra evidência.**

## Próximo gate
Localizar implementação SQL de `execute_price_command` e criação de `price_observations` para saber se:
- source_type é constrained;
- fingerprint é calculado/semântico;
- existe unique constraint que impeça observação reconfirmada;
- confidence_score é calculado;
- correlation_id é propagado automaticamente.

Nenhuma mutação em produção.
