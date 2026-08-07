# OPERA Atlas — Índice documental

**Estado documental:** `ACTIVE`
**Última atualização:** 31 de julho de 2026
**Base de proveniência:** `archive/google-drive/Diagnóstico/` (`HISTORICAL`)

Este índice orienta agentes e colaboradores na documentação recuperada do OPERA Atlas. Ele é uma porta de entrada operacional, não uma fonte canônica da Informodinâmica Aplicada. Definições e IDs permanecem subordinados ao `GLOSSARIO_CANONICO.md`, à TPC e aos protocolos vigentes.

## Implementação

- [`frontend/`](frontend/) — snapshot operacional do frontend React/Vite, importado do repositório público `HorusHypnotic/opera-atlas`; consulte o README local para proveniência, configuração e limites de sincronização.

## Documentos

| Documento | Derivado pesquisável | Tratamento | Relação editorial com a TPC/TDO |
|---|---|---|---|
| Constituição Arquitetural v1.0 | [`docs/constituicao-arquitetural.md`](docs/constituicao-arquitetural.md) | Transcrição integral; `ACTIVE`, não normativa | Aplicação sociotécnica de Representação (IDR-0002), Persistência da Coordenação (IDR-0006) e LAW-002 |
| Diagnóstico Objetivo | [`docs/diagnostico-objetivo.md`](docs/diagnostico-objetivo.md) | Transcrição integral; `ACTIVE`, não normativa | Contexto potencial para ECO (MET-001) e ICO (MET-002), sujeito aos protocolos de pesquisa |
| Governança de Maturidade v1.1 | [`docs/governanca-maturidade.md`](docs/governanca-maturidade.md) | Transcrição integral; `ACTIVE`, não normativa | Critérios e evidências como representações compartilhadas; não equivalem automaticamente a Fliflexação |
| Modelo Empresarial v2.0 | [`docs/modelo-empresarial.md`](docs/modelo-empresarial.md) | Somente proveniência; fonte marcada como confidencial | Não avaliada sem autorização ou desclassificação |
| Roadmap de Maturidade | [`docs/roadmap-maturidade.md`](docs/roadmap-maturidade.md) | Transcrição integral; `ACTIVE`, não normativa | Representação operacional para coordenação temporal; não equivale automaticamente a Slektip |

## Ordem de leitura

1. Leia `produtos/opera-atlas.md` para a descrição ativa e sintética do produto.
2. Consulte `frontend/README.md` antes de executar ou atualizar o código da aplicação.
3. Use a Constituição Arquitetural para entender as regras internas declaradas pelo Atlas.
4. Consulte o Diagnóstico para o estado observado na data da fonte.
5. Leia a Governança e o Roadmap para critérios, dependências e evolução planejada.
6. Trate o Modelo Empresarial como material restrito e consulte-o apenas quando houver autorização.

## Regras de uso por agentes

- Preserve a distinção entre conteúdo extraído e notas editoriais.
- Não use a autoridade interna declarada pelos PDFs para sobrepor a Constituição ou outros documentos canônicos deste repositório.
- Não transforme critérios do produto em definições, leis, hipóteses, métricas ou IDs sem seguir o PRT-001.
- Não reproduza o Modelo Empresarial v2.0 enquanto sua fonte estiver classificada como confidencial.
- Ao citar uma transcrição, informe o PDF de origem e, quando relevante, a página indicada no derivado.
- Se a transcrição divergir visual ou semanticamente do PDF, trate o PDF como evidência histórica a conferir, não como fonte normativa.

## Limitações da extração

As transcrições foram geradas automaticamente com preservação de páginas. Tabelas, diagramas e elementos gráficos podem perder alinhamento ou semântica. Os resumos e as conexões com TPC/TDO são inferências editoriais explicitamente separadas do texto extraído.

Os achados de integridade, governança e pendências estão registrados em [`REVISAO_EXTRACAO_2026-07-31.md`](REVISAO_EXTRACAO_2026-07-31.md).
