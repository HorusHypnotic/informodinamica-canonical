# Identidades candidate e supplier — mapa de domínio

Data: 2026-09-20. Inspeção read-only.

## Estrutura observada
`pilot_supplier_candidates` representa a empresa na camada curatorial/pré-loja. Possui estados de evidência, claim, visibilidade, Smart, comercial e mídia, além de owner_user_id e promoted_supplier_id opcionais.

`suppliers` representa a identidade comercial promovida/operacional. Exige user_id e WhatsApp, possui status, is_active, completeness_score e is_demo.

`commercial_business_links` é uma ponte 1:1:
- candidate_id PK/FK → pilot_supplier_candidates;
- supplier_id UNIQUE/FK → suppliers;
- linked_by/linked_at para governança.

O próprio invariant de claim em candidate exige que CLAIMED tenha owner_user_id + promoted_supplier_id; CURATED exige ambos nulos. Logo a coexistência não é duplicação acidental: ela codifica um **processo de promoção de identidade curatorial para identidade comercial/possuída**.

## Consequência para analytics
O evento `click_events` nasceu no domínio supplier. A Vitrine pública atual também contém empresas que legitimamente continuam no domínio candidate. Portanto usar supplier_id como chave universal de observação exclui empresas curatoriais por desenho.

A correção não deve ser “criar suppliers falsos para todo mundo” apenas para analytics, pois isso violaria a semântica de promoção/claim.

## Identidade recomendada para Inteligência
Para sinais de descoberta pública, a chave natural é `candidate_id`, porque toda empresa curatorial pública já a possui.
Para eventos comerciais legados, manter supplier_id e mapear para candidate_id pela ponte quando houver.
Uma camada analítica futura pode usar uma entidade lógica `business_subject`/business_key resolvida, sem mudar as identidades operacionais.

## Princípio
**Identidade operacional não deve ser fabricada para satisfazer observabilidade. A observabilidade deve acompanhar a topologia real do domínio.**

## Próximo gate
Inspecionar estado real de candidates/suppliers/links e dependências de supplier em carrinho, lista e Smart Cotações. Depois desenhar uma visão/contrato analítico read-only que normalize candidate/supplier sem migrar domínio.

Nenhuma mutação em produção.
