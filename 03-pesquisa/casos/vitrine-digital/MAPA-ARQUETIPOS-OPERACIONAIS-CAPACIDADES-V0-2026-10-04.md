# Mapa de Arquétipos Operacionais e Capacidades Reutilizáveis V0

Data: 2026-10-04
Estado: CANDIDATE
Escopo: Canteiro de Obras Digital / Vitrine Digital

## Objetivo
Transformar peculiaridades observadas em empresas reais em capacidades reutilizáveis, sem criar um software isolado para cada segmento.

Fluxo: caso real -> arqueologia -> arquétipo -> capacidades existentes -> delta específico -> menor adaptação -> evidência -> indicador -> narrativa -> próxima ação -> resultado -> aprendizado -> capacidade reutilizável.

Categoria comercial não determina sozinha a operação. Uma empresa pode combinar vários arquétipos.

## Taxonomia arqueológica V0
A amostra atual indica 11 arquétipos candidatos. O número não está congelado.

1. Varejo + entrega recorrente. Caso: Bezerrão. Produto -> pedido -> quantidade -> entrega -> recompra.
2. Comércio de materiais. Caso: Ferragens Brasil. Necessidade -> lista -> cotação -> disponibilidade -> compra -> entrega.
3. Fabricação sob medida. Caso: Letroart. Necessidade -> medidas/arte -> orçamento -> fabricação -> instalação/entrega.
4. Serviço técnico/especializado. Caso: Tauros. Diagnóstico -> escopo -> modalidade -> orçamento -> agenda -> execução.
5. Locação de ativos. Caso: SOS/locações. Ativo -> disponibilidade -> reserva -> entrega -> período -> retirada/renovação -> giro.
6. Serviço + ativo + agenda. Caso: SOS. Chamado -> endereço -> agenda -> equipe/ativo -> execução -> evidência -> recorrência.
7. Frete/logística. Caso: Jean Michael e operações de entrega. Origem -> destino -> carga -> capacidade -> rota -> preço -> execução.
8. Obra/execução continuada. Caso: Dirceu/Minha Obra. Obra -> fase -> equipe -> recurso -> demanda -> execução -> progresso/desvio.
9. Imóvel + proprietário. Caso: Canteiro/imóvel. Imóvel -> dono -> estágio -> mídia -> interesse -> contato -> visita/proposta -> venda.
10. Profissional/mão de obra. Caso: Vaga Quente. Demanda -> profissão/quantidade -> interessados -> compatibilidade -> contratação -> preenchimento.
11. Mídia/presença/distribuição. Casos: Bezerrão, SOS, Rádio e carteira. Contexto -> peça -> canal -> publicação -> interação -> contato -> resultado -> recorrência.

## Composição observada por caso
Bezerrão: VAREJO + ENTREGA + RECORRÊNCIA + ATIVO_EM_PONTO + PRESENÇA.
Capacidades existentes/observadas: vitrine, produtos, pedido emergencial sem fricção, quantidade, WhatsApp, disk-entrega, mídia, GBP/presença, telemetria, IVV. Freezer/ponto/giro permanece em coleta onde não houver prova.

SOS: SERVIÇO + LOCAÇÃO + ATIVO + AGENDA + MÍDIA.
Capacidades-alvo: inventário, disponibilidade, agenda/reserva, período, entrega/retirada, giro, renovação e mídia em contêiner. Um ativo pode ter mais de um motor econômico; receita de locação e mídia não devem ser fundidas.

Canteiro/imóvel: IMÓVEL + PROPRIETÁRIO + MÍDIA + LEAD + VISITA/VENDA.
Capacidades: vínculo imóvel-proprietário, estágio, ficha/mídia, compartilhamento, interesse, contato, visita, proposta e resultado.

Ferragens Brasil: COMÉRCIO_MATERIAIS + COTAÇÃO + ENTREGA.
Letroart: FABRICAÇÃO_SOB_MEDIDA + SERVIÇO + MÍDIA.
Tauros: SERVIÇO_TÉCNICO + MATERIAL + INSTALAÇÃO, preservando modalidades comerciais confirmadas.
Jean Michael: FRETE + CAPACIDADE + TERRITÓRIO + AGENDA.
Vaga Quente: DEMANDA_MÃO_DE_OBRA + MATCH + RESPOSTA + CONTRATAÇÃO.

## Capacidades transversais
Identidade/perfil; catálogo; produto; serviço; mídia; WhatsApp/contato; pedido sem fricção; quantidade; agenda; disponibilidade; ativo; território; rota/logística; demanda; match; cotação; proprietário/responsável; atribuição; analytics; GBP/presença; compartilhamento; evidência/auditoria; ledger econômico; IVV/ROI; recorrência; narrativa contextual; próxima ação; previsto x observado.

## Andaime cognitivo
Cada operação madura deve responder:
1. O que entrou?
2. Em que estado está?
3. Qual recurso, ativo ou pessoa está comprometido?
4. O que precisa acontecer agora?
5. Quanto tempo está levando?
6. Qual resultado econômico ou operacional ocorreu?
7. Qual evidência sustenta o resultado?
8. Isso se repetiu?
9. O previsto bateu com o observado?
10. O aprendizado é específico ou reutilizável?

Estados: OBSERVADO | DERIVADO | HIPÓTESE | UNKNOWN | AÇÃO | RESULTADO.

## Regra de remanufatura
REUTILIZAR capacidade existente -> ADAPTAR somente o delta -> CRIAR somente se ausente -> medir em caso real -> preservar evidência -> promover a padrão apenas após repetição/prova.

Não criar dashboard paralelo, banco paralelo por segmento, analytics separado ou cadastro duplicado se a capacidade existente puder ser estendida com segurança.

## Modelo
EMPRESA -> 1..N ARQUÉTIPOS -> 1..N CAPACIDADES -> EVENTOS -> INDICADORES -> CONTEXTO -> NARRATIVA -> PRÓXIMA AÇÃO -> RESULTADO -> APRENDIZADO.

O arquétipo define perguntas e estados. A capacidade é a peça reutilizável. O segmento é uma composição, não uma aplicação isolada.

## Maturidade inicial V0
- descoberta dos arquétipos: 75%
- empresa -> arquétipo: 70%
- inventário de capacidades: 65%
- deduplicação arquétipo vs capacidade: 45%
- contratos de eventos/estados: 35%
- contratos de indicadores: 30%
- ligação automática ao Admin Inteligência: 20%
- previsto x observado: 10%

Maturidade arquitetural estimada V0: 45%. Não representa cobertura comercial nem qualidade individual das empresas.

## Gates
A. Arqueologia: recuperar empresas/casos e marcar OBSERVADO/HIPÓTESE/UNKNOWN.
B. Deduplicação: decidir arquétipo, capacidade transversal ou particularidade.
C. Contratos: entrada -> estados -> eventos -> saída -> indicadores -> evidência -> próxima ação.
D. Pilotos: Bezerrão para varejo/entrega; SOS para serviço+locação+agenda; Canteiro para imóvel+proprietário.
E. Inteligência: Admin monta leitura pela composição da empresa, não painel genérico.
F. Aprendizado: comparar ação recomendada com resultado e promover padrão somente com evidência.

## Guardrails
Segmento != arquétipo. Empresa pode ter múltiplos arquétipos. Capacidade != produto isolado. Presença != venda. Clique != lead. Venda != margem. Ativo cadastrado != disponível. Agenda planejada != execução. Hipótese != fato. Correlação != causa. Ausência de dado != zero. Peculiaridade de um cliente != padrão do segmento sem repetição/evidência.

## Próximo parafuso
Executar Gate A em lote sobre carteira e infraestrutura existentes, produzindo matriz empresa x arquétipo x capacidade x evidência x lacuna antes de qualquer mudança de schema/UI.


## Gate A — arqueologia em lote 001

Fonte cruzada: estado real do banco da Vitrine + documentos versionados do repositório operacional. Classificação abaixo é conservadora.

| Caso | Composição operacional | Evidência recuperada | Lacuna dominante |
|---|---|---|---|
| Bezerrão | varejo + entrega + recorrência + ativo em ponto + presença | empresa pública; catálogo; pedido emergencial; analytics/IVV; operação de entrega documentada | ledger econômico, pontos/freezers e conversão |
| Ferragens Brasil | comércio materiais + locação + cotação + entrega | ADR multicacidade prova venda e locação; Smart Cotações tem ciclo comercial real documentado | estoque, rental operacional, margem/atribuição |
| Letroart | fabricação sob medida + venda + instalação + mídia | ADR multicacidade prova fabricação, venda e instalação; catálogo/mídia existentes | estados de orçamento/fabricação/instalação e economia |
| Tauros Forros | serviço técnico + material + instalação | nó público e escopo de modalidades em investigação | confirmar modalidades, agenda, orçamento, execução |
| Jean Michael F4000 | frete + capacidade + território + agenda | nó público e capacidade logística documentada | agenda, rotas, preço, ocupação e resultado |
| RSM Serviços e Locações | locação + ativo + agenda | owner_confirmed; Rental Core existente; banco tem pelo menos 1 ativo e 1 ciclo | operação real SOS, frota completa, giro, mídia e economia |
| SOS | serviço + locação + ativo + agenda + mídia | caso documentado como origem/aplicação de Rental Core; dados comerciais de campo | vinculação canônica SOS↔tenant, ativos reais, ciclos reais, receita de mídia |
| Alex Escavações | equipamento + serviço + locação + território | escavação/terraplenagem/locação documentadas; nó público | máquinas, mobilização, disponibilidade, preço e agenda |
| Amélia Rosas do Deserto | varejo/produto + estoque + entrega + sazonalidade | owner_confirmed; produtos/preços e IVV documentados | estoque, custo/margem, pedidos, entrega e sazonalidade |
| Você FM 92.1 | mídia + distribuição + programação | nó público externally_confirmed; rádio ao vivo e capacidade de mídia documentadas | inventário, audiência, grade comercial, campanha e atribuição |
| Depósito de Areia do Marcus | materiais a granel + entrega/logística | nó público scope_confirmed | capacidade, estoque/origem, frota, preço, agenda e recorrência |
| Dirceu Junior | obra + serviço + equipamento + Minha Obra | ADR multicacidade prova execução de obra, serviço e equipamento | ligar operação diária a eventos/indicadores reutilizáveis |
| Canteiro de Obras Digital | empresa/plataforma + imóvel/proprietário + mídia | nó público e arquitetura corporativa documentada | separar capacidades corporativas, Vitrine e fluxo imobiliário |
| Vaga Quente | demanda de mão de obra + match + resposta + contratação | capacidade de bastidor existente; demanda e matching privado documentados | fechamento/contratação, tempo de preenchimento e recorrência |

### Descoberta adicional
O ADR de multicacidade já havia provado que a categoria principal única é insuficiente: Ferragens vende e aluga; Dirceu executa obra, presta serviço e opera equipamento; Letroart fabrica, vende e instala. Isso reforça o modelo de composição e reduz a necessidade de novos produtos isolados.

### Deduplicação provisória
Os 11 arquétipos iniciais não devem ser promovidos integralmente. A arqueologia indica três camadas:

**Motores nucleares candidatos**
1. COMÉRCIO
2. SERVIÇO
3. FABRICAÇÃO
4. LOCAÇÃO
5. LOGÍSTICA
6. PROJETO/OBRA
7. MATCH/INTERMEDIAÇÃO
8. MÍDIA/DISTRIBUIÇÃO

**Capacidades combináveis**
entrega, agenda, ativo, território, recorrência, pedido rápido, cotação, proprietário, presença, catálogo, disponibilidade, compartilhamento, analytics, atribuição, evidência, ledger econômico e narrativa.

**Especializações ainda não promovidas**
freezer por ponto, caçamba com mídia, imóvel com proprietário, fabricação sob medida e mão de obra. Elas permanecem como composição/delta até repetição provar padrão próprio.

## Contrato operacional genérico V0

Todo motor deve poder ser descrito sem criar schema por segmento:

`ENTRADA → ACEITE/QUALIFICAÇÃO → ALOCAÇÃO DE RECURSO → EXECUÇÃO → RESULTADO → EVIDÊNCIA → ECONOMIA → RECORRÊNCIA`

Campos conceituais mínimos:
- subject: empresa/operação;
- operation_type;
- source;
- started_at;
- current_state;
- resource_ref opcional;
- counterparty_ref opcional e com minimização de PII;
- territory/route opcional;
- amount/unit opcional;
- due_at opcional;
- completed_at opcional;
- economic_value e economic_basis somente quando evidenciados;
- evidence_ref;
- outcome;
- next_action;
- epistemic_state.

Esse é contrato conceitual CANDIDATE, não autorização para migration.

## Indicadores por motor — candidatos

COMÉRCIO: pedidos, resposta, conversão, ticket, recorrência, margem quando provada.
SERVIÇO: chamados, tempo até agenda, execução, duração, retorno, margem quando provada.
FABRICAÇÃO: orçamentos, prazo prometido x realizado, fila, retrabalho, margem.
LOCAÇÃO: ativos, ocupação, dias parados, giros, atraso, receita/ativo, margem.
LOGÍSTICA: corridas, capacidade utilizada, distância/rota, agrupamento, tempo, contribuição.
PROJETO/OBRA: progresso, desvios, demandas, recursos, prazo, custo quando provado.
MATCH: demandas, compatíveis, respostas, tempo até match, fechamento.
MÍDIA: peças/campanhas, publicação, interação, contato atribuível, resultado econômico quando provado.

Nenhum indicador econômico assume valor ausente. UNKNOWN permanece UNKNOWN.

## Maturidade após lote 001

- descoberta dos motores/arquétipos: 88%
- empresa → composição operacional: 82%
- inventário de capacidades: 78%
- deduplicação motor vs capacidade: 70%
- contratos de eventos/estados: 55%
- contratos de indicadores: 48%
- ligação automática ao Admin Inteligência: 20%
- previsto x observado: 10%

Maturidade arquitetural estimada: **56%**.

A subida de 45% para 56% representa redução de incerteza arquitetural, não implementação em produção.

## Próximo lote autônomo seguro

1. confrontar os oito motores candidatos com tabelas/capacidades já existentes;
2. marcar REUSE / ADAPT / CREATE / UNKNOWN;
3. identificar quais contratos já têm implementação real;
4. produzir mapa de lacunas sem migration;
5. somente depois propor V1 do Admin Inteligência.


## Lote 002 — remanufatura contra infraestrutura existente

Classificação: REUSE = capacidade implementada reaproveitável; ADAPT = existe núcleo, falta especialização; CREATE = ausência comprovada; UNKNOWN = arqueologia insuficiente.

| Motor | Base recuperada | Decisão V0 |
|---|---|---|
| COMÉRCIO | curated_business_products/services, contatos, storefront, Smart Cotações/demandas, analytics/attribution | REUSE + ADAPT |
| SERVIÇO | curated_business_services, contatos, demandas e estados existentes | REUSE + ADAPT |
| FABRICAÇÃO | catálogo/serviço/mídia existem, mas workflow fabricação não foi provado | ADAPT; workflow específico UNKNOWN |
| LOCAÇÃO | curated_business_rental_assets/cycles, RPCs, agenda e histórico já implementados | REUSE |
| LOGÍSTICA | demanda/frete e território existem como conceitos/casos; ledger universal de corrida não foi provado | ADAPT |
| PROJETO/OBRA | construction_projects, construction_demands, construction_resources e observações de cotação existem | REUSE |
| MATCH/INTERMEDIAÇÃO | public_demand_leads/responses, professional_profiles e Vaga Quente existem | REUSE |
| MÍDIA/DISTRIBUIÇÃO | mídia de empresa, social campaigns/attribution/analytics existem em partes | REUSE + ADAPT |

### Resultado da remanufatura
Nenhum dos oito motores exige, neste momento, autorização para criar uma aplicação paralela. Sete possuem base reutilizável clara; fabricação possui peças reutilizáveis e workflow específico ainda UNKNOWN. Portanto o próximo avanço deve ser uma camada semântica de composição sobre estruturas existentes, não novos silos.

### Lacuna comum encontrada
A principal lacuna transversal não é cadastro. É o contrato operacional/econômico que conecta evento real a resultado:
`evento operacional → evidência → valor/custo/margem quando disponível → resultado → próxima ação`.

Isso explica por que o Admin V0 consegue enxergar empresas, mas ainda não consegue narrar cada operação com precisão econômica.

## Maturidade após lote 002

- descoberta dos motores: 90%
- empresa → composição: 84%
- inventário de capacidades: 86%
- deduplicação motor vs capacidade: 82%
- contratos de eventos/estados: 62%
- contratos de indicadores: 55%
- ligação automática ao Admin Inteligência: 20%
- previsto x observado: 10%

Maturidade arquitetural estimada: **61%**.

Próximo gate: desenhar a matriz semântica de capacidades por motor e o contrato mínimo de resultado/evidência, ainda sem migration, para decidir o menor slice V1.
