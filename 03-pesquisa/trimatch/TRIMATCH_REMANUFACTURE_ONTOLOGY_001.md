# TRIMATCH_REMANUFACTURE_ONTOLOGY_001

Status: `ONTOLOGY_READY / SOURCE_BINDING_PENDING`
Mission: `TRIMATCH-CORPUS-RECOVERY-001`

## Propósito

Definir a régua de decomposição antes da extração pesada para impedir que a leitura dos documentos force categorias retrospectivamente.

## Unidade mínima

`TRIMATCH_COMPONENT`

Campos obrigatórios:
- `component_id`
- `source_document`
- `source_locator`
- `source_hash`
- `source_year_or_date`
- `category`
- `historical_claim`
- `current_counterpart`
- `current_evidence_ref`
- `classification`
- `confidence_basis`
- `unknowns`
- `authority_required_for_adoption`

## Categorias

### PROCESSO
Fluxos de captação, triagem, validação, viabilidade, estruturação, contratação, execução, entrega e distribuição de resultados.

### SOFTWARE
Ferramentas, módulos, interfaces, automações, cálculos ou sistemas digitais propostos/implementados.

### TESE_COMERCIAL
ICP, proposta de valor, canal, oferta, precificação, comissionamento, parceria e narrativa de mercado.

### JURIDICO
SPE, contratos, propriedade, cessão, sub-rogação, responsabilidades, governança societária e qualquer afirmação dependente de validade legal. Conteúdo histórico nesta classe nunca vira orientação jurídica atual sem validação competente.

### FINANCEIRO
ROI, funding, fluxo de caixa, distribuição, retorno, financiamento, custos, margens e premissas econômicas. Números históricos não são forecasts atuais.

### CORRETOR
Captação territorial, relacionamento com proprietário, indicação, negociação, gestão de locação, comissão e operação regional.

### INVESTIDOR
Aquisição, participação, quotas, funding, retorno, risco, reporting e direitos econômicos.

### TERRENO
Localização, zoneamento, infraestrutura, documentação, preço, uso, potencial construtivo e restrições físicas/urbanísticas.

Um componente pode pertencer a múltiplas categorias, mas deve ter uma categoria primária.

## Classificação de remanufatura

`REUSE`: conceito/processo continua útil e há contraparte 2026 comprovável sem mudança material de semântica.

`ADAPT`: patrimônio útil, mas exige mudança de interface, governança, evidência, mercado ou implementação.

`SUPERSEDE`: capacidade 2026 comprovada substitui a peça histórica com função equivalente ou superior. Não implica que o sistema inteiro foi substituído.

`RETIRE`: peça histórica não deve voltar ao sistema por obsolescência comprovada, conflito de governança, risco ou ausência deliberada de valor atual. Exige justificativa, não mera preferência.

`UNKNOWN`: evidência insuficiente para qualquer uma das anteriores.

## Camadas 2026 para confronto

Estas são somente famílias candidatas. A ligação exata exige evidência Git fresca:
- OPERA / método operacional
- OPERA Atlas
- OPERA Vision
- OPERA Evidence
- Control Tower
- Smart Cotações
- Media Factory
- Pocket Engine
- Fábrica de Provas

`KNOWN_NAME != VERIFIED_COUNTERPART`.

## Hipóteses de trabalho, não classificações

H1 Trimatch pode ter sido parcialmente decomposto em capacidades hoje distribuídas entre OPERA, Evidence e Control Tower.
H2 o papel humano do corretor pode continuar relevante mesmo com automação de triagem/análise.
H3 o maior patrimônio recuperável pode estar no processo e na tese de coordenação, não no software histórico.
H4 premissas jurídicas, financeiras e urbanísticas provavelmente têm maior taxa de `ADAPT/UNKNOWN` por dependência temporal.

Todas permanecem `INFERENCE_2026` até source binding.

## Anti-colapso semântico

- `LAND_FOUND != LAND_VIABLE`
- `DOCUMENT_RECEIVED != DOCUMENT_VALIDATED`
- `VIABILITY_MODEL != INVESTMENT_ADVICE`
- `INVESTOR_INTEREST != COMMITTED_CAPITAL`
- `SPE_DESIGN != SPE_CREATED`
- `PROJECTED_ROI != REALIZED_RETURN`
- `CORRECTOR_LEAD != COMMERCIAL_AUTHORITY`
- `BUILD_TO_SUIT_CANDIDATE != EXECUTABLE_BTS`
- `REUSE != CURRENT_CANON`

## Saída esperada após extração

A matriz final deverá permitir responder quantitativamente:
1. quantos componentes foram recuperados;
2. quantos são REUSE/ADAPT/SUPERSEDE/RETIRE/UNKNOWN;
3. quais capacidades 2026 já substituem funções históricas;
4. quais lacunas exigem código;
5. quais exigem validação humana/profissional/mercado;
6. qual menor vertical slice comercial pode ser testado sem ressuscitar o sistema inteiro.

## Gate

`ONTOLOGY_READY / SOURCE_BINDING_REQUIRES_CORPUS_RECOVERY`

A ontologia pode avançar sem Codex. A classificação factual não pode avançar além daqui sem recuperar o corpus.