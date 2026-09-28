# Motor de Demanda Territorial e Aquisicao V0

Data: 2026-09-27
Status: ACTIVE method; automation CANDIDATE.

## Canonical decision
Unserved demand is an acquisition signal for Vitrine Digital.

Flow: observed demand -> normalized category -> open territorial discovery -> candidate supplier -> qualification -> human approach -> acquisition -> activation -> service -> evidence -> learning.

Evidence states: DISCOVERED -> QUALIFIED -> CONTACT_READY -> APPROACHED -> REPLIED -> PROPOSAL -> WON or LOST -> ACTIVATED -> FIRST_DEMAND_SERVED.

DISCOVERED is never APPROACHED. Public listings do not prove inventory, price, availability or partnership. Specific brands require supplier confirmation.

## Pilot 001
Demand signal: bags and lipstick/makeup, with Boca Rosa as a requested-brand hypothesis.

Initial territorial candidates in Redencao-PA: Kettlen Bolsas; Ideal Magazine; Lojas Maranata; Mundo Feminino Redencao; Petunia Cosmeticos; Casa da Maquiagem; Lojas Kastelar Cosmeticos; 1 TOQ MAKE; Amorella Maquiagem e Semijoias; BEM ME QUERO 10.

Initial state for all: DISCOVERED.

## Feedback loop
Every activated store or provider expands the Vitrine capability matrix. Every served or lost demand updates acquisition priority.

Candidate capabilities: demand_gap_detector; territorial_lead_enricher; acquisition_queue; capability_feedback; outcome_loop.


## Pilot 002 - sinais organicos externos de WhatsApp

Fonte: grupo externo de WhatsApp, observacao de 2026-09-26 a 2026-09-27.
Privacidade: numeros pessoais e identidade dos demandantes nao entram no radar comercial. Preservar somente sinal necessario, data, categoria, territorio e proveniencia.

Sinais observados:
- 2026-09-26 | SAUDE/ENDOSCOPIA | Redencao | procura por local que realize endoscopia pela Unimed.
- 2026-09-26 | ALIMENTACAO/SALGADOS_FESTA | Redencao | procura por fornecedor recomendado.
- 2026-09-26 | LOGISTICA/TOTAL_EXPRESS | Redencao | procura por contato/local da distribuidora.
- 2026-09-26 | MOBILIDADE/CARONA | Maraba -> Redencao | 1 passageiro, segunda ou terca.
- 2026-09-27 | ALIMENTACAO/FRANGO_ASSADO | Redencao | procura por fornecedor no mesmo dia.
- 2026-09-27 | BELEZA/DESIGN_SOBRANCELHAS | Redencao | procura por prestador.

Regra: demanda externa observada != lead comercial do demandante. O alvo de aquisicao e a capacidade fornecedora ausente ou insuficiente.

## Recorrencia e prioridade

Um sinal isolado valida existencia de demanda. Repeticao por categoria, subcategoria, rota, urgencia ou periodo aumenta prioridade de aquisicao e produto. Nao inferir tamanho de mercado a partir de um grupo isolado.

Registrar, quando possivel: signal_id, observed_at, source_type, category, subcategory, territory, route, urgency, normalized_need, supplier_found_count, vitrine_supplier_count, outcome e evidence_ref.

## Cobertura territorial da demanda

Indicador CANDIDATE:

coverage_rate = demandas observadas com pelo menos uma resposta compativel disponivel na Vitrine / demandas observadas elegiveis

Manter tambem:
- external_supplier_discovery_rate
- vitrine_gap_count
- time_to_first_compatible_supplier
- activation_from_gap_rate
- first_demand_served_rate

Uma listagem publica nao conta como resposta disponivel ate capacidade, disponibilidade e condicoes relevantes serem confirmadas.

## Novas regras de evidencia

- Credenciamento de saude/convenio permanece UNKNOWN ate confirmacao por fonte apropriada.
- Disponibilidade no dia, estoque, preco, rota e agenda permanecem UNKNOWN ate confirmacao.
- Informacao territorial aberta serve para descoberta e qualificacao, nao para fabricar disponibilidade.
- Dados pessoais de participantes de grupos externos nao devem virar base de prospeccao sem fundamento/autorizacao.


## Integracao com o Radar de Demanda existente

Nao criar uma segunda inbox operacional.

Arquitetura decidida:
external_signal -> normalize/dedupe -> coverage_check -> COVERED | GAP | UNKNOWN.

- COVERED: existe capacidade compativel confirmada na Vitrine; encaminhar para o fluxo existente quando houver demanda acionavel.
- GAP: nao ha capacidade compativel confirmada; gerar acquisition_signal e fila de fornecedores/prestadores DISCOVERED.
- UNKNOWN: informacao insuficiente para afirmar cobertura; enriquecer antes de promover.

O Radar de Demanda existente permanece responsavel pelo ciclo operacional UNMATCHED -> REVIEWING -> REFERRED -> WON/LOST.
O Motor Territorial fica a montante e aprende com sinais externos sem criar demandante ficticio nem copiar telefone pessoal.

Promocao external_signal -> public_demand_lead exige demanda real acionavel e base/autorizacao adequada para contato. Sinal agregado de mercado pode alimentar aquisicao sem virar public_demand_lead.

## Contrato minimo da fila de sinais

external_signal:
- signal_id
- observed_at
- source_type
- source_ref protegido ou agregado
- category
- subcategory
- normalized_need
- territory
- route nullable
- urgency
- recurrence_key
- evidence_ref
- coverage_state: COVERED | GAP | UNKNOWN
- matched_capability_ids
- acquisition_signal_id nullable
- promoted_demand_id nullable
- created_at

Regra de dedupe CANDIDATE: mesma recurrence_key em janela temporal definida aumenta occurrence_count; nao apagar ocorrencias brutas/evidencia.

Prioridade de aquisicao CANDIDATE deve considerar recorrencia, urgencia, gap confirmado e proximidade territorial. Pesos so viram ACTIVE depois de dados observados.


## Pilot 003 — second external WhatsApp batch

Observed window: 2026-09-23 to 2026-09-25.
Privacy rule remains: participant phone numbers and identities are not copied into the commercial radar.

### Demand signals
- LOGISTICS / MARKETPLACE_DROPOFF — pickup/drop-off point for Mercado Livre/Shopee in Redencao.
- HOME_SERVICES / CAR_UPHOLSTERY_CLEANING — car-seat cleaning.
- RETAIL / AIR_CONDITIONER — central air-conditioning unit for sale.
- MOBILITY / PARCEL_RIDE — Maraba -> Redencao parcel transport, same day, cost contribution offered.
- HOUSING / RENT_KITNET — kitnet rental.
- JOBS / DOMESTIC_WORKER — domestic worker referral.
- RETAIL / NOTEBOOK — notebook for sale.
- HEALTH / KNEE_BRACE — knee brace for sale.
- HOME_SERVICES / GAS_DELIVERY — urgent gas delivery at night.
- HOUSING / RENT_HOUSE — house rental.
- HOUSING / RENT_HOUSE — house rental near Fesar.
- MOBILITY / RIDE — Goiania -> Redencao, Sunday or Monday.

### Non-demand signals
Three messages were classified as OFFER/ADVERTISING rather than demand:
- semijewelry promotion;
- new catalog/promotion announcement;
- Maragogi apartment travel advertisement.

Rule: OFFER/ADVERTISING may feed a supplier/opportunity corpus later, but MUST NOT increment observed-demand metrics.

### Recurrence evidence
Within this batch, HOUSING / RENT_HOUSE appears twice. This is recurrence evidence for prioritization only. It is not evidence of market size, conversion, willingness to pay, or unmet supply.

### Product intersections
- GAS_DELIVERY intersects an already-developed Vitrine emergency gas/water flow, but coverage remains UNKNOWN until compatible supplier availability for the observed time is evidenced.
- PARCEL_RIDE and RIDE reinforce the Caronas/Encomendas product hypothesis.
- MARKETPLACE_DROPOFF is a candidate information/logistics capability.
- HOUSING introduces a repeated local demand class that is not yet canonically declared covered.
- JOBS / DOMESTIC_WORKER intersects the broader local opportunity/job discovery surface, but no fulfillment capability is inferred.

### Classifier implementation evidence
Vitrine implementation branch `fix/peteco-singleton-bus-v3` now contains deterministic offline classification for demand vs offer, category/subcategory, route and coverage default UNKNOWN.
Latest implementation commit for Pilot 003: `df3bb117fea0da671bca96120878d2954f74aa01`.
Fresh PETECO test/build evidence is required before implementation state can become PASS.
