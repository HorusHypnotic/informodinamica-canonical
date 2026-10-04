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
