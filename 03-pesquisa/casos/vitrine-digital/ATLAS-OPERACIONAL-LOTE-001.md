# Atlas operacional da Vitrine Digital — Lote 001

Status: observacional. Fonte operacional: `HorusHypnotic/vitrinedigital-cod`. Este documento não altera o runtime da Vitrine.

## Motores e superfícies

| Motor | Evidência atual | Estado |
|---|---|---|
| Vitrine / catálogo público | RPC pública e catálogo comercial conhecidos; mídia anônima ainda sem aceitação final | parcial |
| Minha Loja / cockpit | edição de logo/capa e persistência aceitas em teste humano após 064 | comprovado |
| Admin / Curadoria | fluxo autenticado recuperado e aceito após 064 | comprovado |
| Busca / demanda | rotas e matching existentes; precisa contrato E2E | parcial |
| Você FM | programação e streaming existentes; identidade pública ainda pendente | parcial |
| Smart Cotações | uso real e fluxo distribuído | parcial |
| Vaga Quente | componentes distribuídos; E2E pendente | parcial |
| Minha Obra | implementação existente; E2E pendente | parcial |
| Frete | intenção/matching e prestadores existentes; fluxo incompleto | parcial |
| Caronas / encomendas | hipótese/arquitetura sem motor consolidado | hipótese |
| Território | MapLibre e rotas de laboratório | parcial |
| Inteligência de Mercado | sinais brutos existem; ledger/analytics ainda a auditar | hipótese em instrumentação |

Percentuais não são atribuídos neste atlas sem métrica operacional definida.

## Dependências críticas iniciais

- Público: RPCs públicas → dados curatoriais → política de visibilidade → resolução de mídia → renderização.
- Proprietário: autenticação → contexto da empresa → produtos/serviços/mídia → persistência → página pública.
- Admin: autenticação → is_platform_admin → lista/contexto de empresas → curadoria.
- Inteligência: evento observável → agregação → regra/insight → cockpit → ação → novo evento.

## Caso 060–064 como traço informodinâmico

1. Acontecimento: instalação PWA existente não refletia estado esperado.
2. Representação inicial: hipótese de service worker/cache obsoleto.
3. Intervenções 060/061: atualização e headers. Evidência humana falsificou suficiência.
4. 062: bridge/versionamento atravessou a barreira e a instalação antiga recebeu a UI nova.
5. Novo sinal: UI atualizada, porém Admin sem contexto e depois erro explícito de permissão.
6. 063: recuperou seletor/arquitetura de curadoria. Evidência expôs `permission denied for function is_platform_admin`.
7. 064: restaurou EXECUTE apenas para authenticated, preservando anon=false e semântica self-only.
8. Migração no Git não bastou: estado de produção precisou ser inspecionado, aplicado e verificado.
9. Aceitação: usuário confirmou PWA funcionando, Admin funcional e alteração persistente de logo/capa.

Leitura TPC provisória: a representação “código versionado contém a migração” divergiu do estado operacional “migração aplicada no banco”. O incidente demonstra utilidade de distinguir representação declarada, estado efetivo e evidência de aceitação. Não confirma uma teoria por si só.

## Inteligência de Mercado: sinais mínimos candidatos

- page_view: visita a empresa/oferta.
- search_match / offer_impression: oferta apareceu como resposta.
- contact_intent: intenção de contato.
- demand_created / demand_unmatched: demanda criada e ausência de correspondência.
- quote_requested / supplier_response: futuro acoplamento com Smart Cotações.

V0 deve evitar PII e trabalhar com agregação por empresa, categoria, produto e janela temporal.

## Taxonomia editorial inicial

- COMMERCIAL_OFFER: consome capacidade de exposição comercial.
- SERVICE: serviço publicável, com regra própria.
- PROGRAMMING: grade/conteúdo, não deve consumir cota comercial.
- EDITORIAL/EVENT: hipótese futura.

Presets comerciais candidatos: Oferta, Promoção, Enquanto durar o estoque, Novidade, Últimas unidades, Destaque, Sob encomenda, Disponível hoje, Preço sob consulta, Oportunidade da semana.

## Testes baratos candidatos para PÉTECO

- contrato: quantidade comercial não inclui PROGRAMMING;
- contrato: mídia pública resolvível para oferta publicada;
- segurança: authenticated pode executar admin check e anon não;
- PWA: worker/sentinel esperado presente no build;
- catálogo: falha de enriquecimento não elimina oferta-base;
- inteligência futura: eventos sem PII e agregações determinísticas.

## Próximo lote

Auditar no código/schema quais desses sinais já são persistidos, quais são inferíveis e quais exigem instrumentação nova. Nenhuma instrumentação deve ser feita antes dessa auditoria.
