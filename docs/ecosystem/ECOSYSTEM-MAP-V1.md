# Mapa do Ecossistema V1

**Estado documental:** ACTIVE — inventário operacional canônico por decisão do owner; não redefine TPC/TDO
**Data:** 13 de agosto de 2026

## Resumo executivo

Foram confirmados 18 ativos mapeáveis: 13 ativos/propostas em curso, 4 explicitamente `FROZEN` e 1
ideia sem implementação confirmada. Cinco ativos estão `NEAR` em pelo menos um eixo de entrega:
OPERA Vision, Smart Cotações, Obra Flow, OPERA Control e OPERA Atlas. `NEAR` significa que existe um
ciclo verificável próximo; não significa produto terminado, mercado validado ou receita ativa.

Os cinco focos recomendados são: Smart Cotações, OPERA Vision, Obra Flow, Copiloto e Remanufatura
Documental. Não devem receber esforço agora: Cofre, PDIC, família Territorial, StockFlow e Vaga
Quente; Build Fast Delivery integra o mesmo conjunto congelado e só perde a lista por limite de cinco.

## Escala

Estados: `IDEA`, `CONCEPT`, `PROTOTYPE`, `TECHNICAL_GREEN`, `FUNCTIONAL_GREEN`, `RELEASE_GREEN`,
`OPERATIONAL`, `MARKET_VALIDATED`, `REVENUE_GENERATING`, `FROZEN`, `DEPRECATED`. Proximidade é
`NEAR/MID/FAR`, separada para técnica, serviço e produto. Mercado é `NONE/HYPOTHESIS/SIGNAL/VALIDATED`;
receita é `NONE/POSSIBLE/NEAR_TERM/ACTIVE`. Nenhum ativo recebeu mercado `VALIDATED` ou receita
`ACTIVE` por falta de evidência versionada.

## Patrimônio confirmado

| Grupo | Ativos | Estado sintético |
|---|---|---|
| Pesquisa/IP | Informodinâmica, TPC, TDO, OPERA Research | conceitual/protótipo; validação externa pendente |
| OPERA core | Copiloto, Control, Atlas, Vision, Cofre | do FROZEN ao RELEASE_GREEN; sem pipeline obrigatório |
| Operação comercial | Smart Cotações, Obra Flow | FUNCTIONAL_GREEN; experimentos reais preparados |
| Plataforma/territorial | PDIC, família Radar/OPERA Territorial | conceito ou congelado; integração não provada |
| Aplicação guarda-chuva | Canteiro de Obras Digital | serviço/pesquisa conceitual, não software comprovado |
| Infraestrutura documental | Remanufatura Documental | TECHNICAL_GREEN sintético; primeiro real ABSTAINED |
| Backlog | StockFlow, Vaga Quente, Build Fast Delivery | ideia/congelados, sem software confirmado |

Os registros completos estão em `ecosystem/systems.json`. `Margin Narrative Engine`, `Build Pix Pay`
e `GRO/PGR` foram procurados, mas não possuem ativo versionado confirmado neste repositório. Não foram
convertidos em sistemas por memória ou nome. QGIS é capacidade técnica da família territorial, não
produto independente comprovado.

## Dependências confirmadas e propostas

- TDO `DEPENDS_ON` TPC; OPERA Research e Canteiro Digital `DEPENDS_ON` TDO.
- Control `DEPENDS_ON` TDO como aplicação, sem provar as métricas empiricamente.
- Copiloto, Control, Atlas e Cofre não formam pipeline obrigatório. Integrações entre eles permanecem
  propostas pelo contrato de interoperabilidade V0, não dependências executáveis.
- Vision, Smart Cotações e Obra Flow possuem ciclos próprios; tema comum não implica banco ou fluxo.

## Priorização

### Top 5 — dinheiro mais próximo

1. Smart Cotações; 2. OPERA Vision; 3. Obra Flow; 4. Copiloto; 5. TDO/Canteiro Digital como serviço
assistido. Nenhum possui receita ativa comprovada; os três primeiros têm a menor distância a ensaio.

### Top 5 — pesquisa/IP

1. TPC; 2. Informodinâmica Aplicada; 3. TDO; 4. OPERA Research; 5. Remanufatura Documental.

### Top 5 — vantagem competitiva

1. TPC/Informodinâmica; 2. TDO; 3. Remanufatura com provenance/abstention; 4. Copiloto como captura
operacional; 5. Atlas como snapshots/histórico. É potencial, não originalidade ou exclusividade provada.

## Overlap e reinvenção

1. **Atlas × Cofre:** memória operacional versus custódia curada; não criar segundo banco.
2. **Obra Flow × StockFlow:** estoque adjacente; StockFlow não tem implementação confirmada.
3. **PDIC × interoperabilidade V0:** não construir plataforma antes de troca bilateral real.
4. **Três territoriais:** schemas distintos; selecionar capacidades, não fundir repositórios.
5. **Canteiro Digital × OPERA:** aplicação/serviço guarda-chuva; não duplicar produtos.
6. **Snapshots/auditoria:** catalogar CAP-010 antes de criar nova engine, sem forçar schema comum.
7. **DIRECT_MD:** RED/FROZEN; não receber esforço nem ser confundido com capacidades verdes separadas.

## Fronteiras e privacidade

`workspace/` é área operacional privada e não foi indexada. Devem permanecer separados: núcleo
canônico/pesquisa, repositórios de produto, workspace privado e archive/corpus. Não houve acesso a
Lovable, bancos, Google Drive, `G:`, corpus ou PDFs nesta missão.
