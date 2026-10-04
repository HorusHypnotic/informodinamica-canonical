# Admin Master — Inteligência Contextual Visual V0

Data: 2026-10-04  
Estado: CANDIDATE  
Origem: remanufatura da temporada Power BI + OPERA Atlas/Control + Remanufatura Digital com Retroalimentação + Andaimes Cognitivos.

## Objetivo

Transformar o Admin Master em uma superfície que não apenas exibe indicadores, mas lê evidência visualmente e organiza uma narrativa operacional:

DADO → INDICADOR → VISUAL → CONTEXTO → HISTÓRIA → DIAGNÓSTICO → PRÓXIMA AÇÃO → RESULTADO → APRENDIZADO.

O gráfico é evidência visual. Não é conclusão.

## Patrimônio reutilizado

- Admin Master existente e seu contexto de empresa ativa.
- Telemetria e attribution já existentes.
- OPERA Atlas: planejado → executado → desvio → impacto → replanejamento.
- OPERA Control: problema → causa → impacto → correção → resultado.
- storytelling estudado no Power BI: situação → conflito → causa → impacto → ação → resultado.
- Remanufatura Digital: recuperar capacidade útil sem copiar o sistema inteiro.
- Andaimes Cognitivos: representação externa persistente para reduzir carga de interpretação.
- regra epistemológica: UNKNOWN > invenção.

Não criar BI paralelo. Não criar segundo motor de analytics sem provar necessidade.

## Contrato narrativo

Toda história deve distinguir:

1. OBSERVADO — fato materializado e rastreável.
2. DERIVADO — cálculo reproduzível sobre fatos.
3. HIPÓTESE — interpretação ainda não confirmada.
4. UNKNOWN — dado ou relação causal ausente.
5. AÇÃO — menor próximo passo reversível.
6. RESULTADO — efeito observado após ação.

Narrativa mínima:

SITUAÇÃO → CONFLITO/LACUNA → EVIDÊNCIA → PRÓXIMA AÇÃO.

Narrativa madura:

SITUAÇÃO → MUDANÇA → CAUSA/UNKNOWN → IMPACTO → AÇÃO → RESULTADO → PREVISTO x OBSERVADO → APRENDIZADO.

## Camadas visuais

### V0
Usar somente fatos já carregados no Admin Master:
- empresas observadas;
- empresas públicas;
- empresas ocultas;
- empresas com responsável;
- empresa ativa.

Exportação:
- CSV estruturado;
- PDF via superfície de impressão do navegador.

### V1
Conectar contratos de evidência existentes, sem duplicá-los:
- visitas;
- intenção de contato/WhatsApp;
- attribution;
- demandas;
- atendimento;
- resultado.

### V2
Indicadores específicos por modelo de negócio, somente quando houver contrato de dado:
- margem;
- giro;
- receita;
- ROI/payback;
- recorrência;
- capacidade ociosa;
- tempo de atendimento;
- conversão.

### V3
Retroalimentação:
- narrativa gera ação;
- ação deixa evidência;
- resultado é comparado com hipótese;
- PREVISTO x OBSERVADO é preservado;
- regra/andaime é ajustado somente com evidência.

## Regra de gráficos

Não escolher gráfico por estética.

- linha: mudança no tempo;
- barras: comparação/ranking;
- composição: parte do todo;
- mapa: território;
- tabela: auditoria e detalhe;
- texto narrativo: contexto, conflito e próxima ação.

Nenhum gráfico pode promover causalidade sozinho.

## Exportação

O relatório exportável deve preservar:
- período;
- empresa/escopo;
- estado epistemológico;
- indicadores e unidade;
- narrativa;
- fonte/evidência quando disponível;
- data de geração;
- UNKNOWNs relevantes.

PDF é uma fotografia auditável da leitura. CSV preserva dados estruturados para reuso.

## Andaime cognitivo

A tela deve responder, nessa ordem:

1. O que está acontecendo?
2. O que mudou?
3. Isso é bom, ruim ou UNKNOWN?
4. Qual evidência sustenta a leitura?
5. Qual é o impacto?
6. O que merece atenção agora?
7. Qual a menor próxima ação?
8. O que esperamos observar depois?
9. O que realmente aconteceu?

O usuário não deve precisar fazer arqueologia mental em vinte cards para descobrir a história.

## Limites

- não inventar margem, receita, conversão, mercado ou causalidade;
- ausência de dado não vira zero;
- ausência de fornecedor conhecido não vira GAP;
- previsão não vira PASS;
- correlação não vira causa;
- PDF bonito não vira evidência;
- build PASS não vira produção;
- V0 não altera banco nem cria migration.

## Primeiro incremento

Implementar no Admin Master uma área Inteligência com:
- resumo contextual;
- indicadores de presença já observáveis;
- visualização simples;
- narrativa Situação → Conflito/Lacuna → Próxima ação;
- exportação CSV;
- PDF/impressão;
- UNKNOWN explícito para métricas ainda sem contrato.

Estado deste documento: CANDIDATE até teste de código, QA e gate de promoção.
