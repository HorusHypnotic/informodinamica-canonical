# AGENTS.md — Constituição Operacional para Agentes

## Missão

Preservar e evoluir, com rastreabilidade, o Núcleo Canônico da Informodinâmica Aplicada e da Teoria da Persistência da Coordenação (TPC). A prioridade máxima é a coerência interna da teoria; velocidade, completude ou estilo nunca justificam sacrificar essa coerência.

Este arquivo orienta agentes. Ele é subordinado à [CONSTITUICAO.md](CONSTITUICAO.md), documento máximo de governança, e não cria autoridade teórica própria.

## Ordem de autoridade

1. `CONSTITUICAO.md` — governança e regras de evolução.
2. `DOCUMENTO_CANONICO.md` — visão geral, escopo e arquitetura documental.
3. `GLOSSARIO_CANONICO.md` — fonte única e definitiva das definições e IDs.
4. `01-teoria/TPC.md` e `AXIOMAS_E_PROPOSICOES.md` — teoria, axiomas, leis, hipóteses e métricas.
5. Protocolos `protocols/PRT-*.md` — processos de ciclo de vida e cartografia epistemológica.
6. Aplicações, pesquisa, produtos, educação, guias e artefatos derivados.

Em caso de conflito, reporte-o; não o resolva silenciosamente. Documentos de menor autoridade não redefinem documentos de maior autoridade.

## Estrutura atual

- `01-teoria/` — TPC, fundamentos e formalização matemática.
- `02-aplicacoes/` — aplicações, incluindo TDO e OPERA Research.
- `03-pesquisa/` — protocolo experimental, validação empírica e casos reais.
- `protocols/` — PRT-001 (ciclo de vida dos IDs) e PRT-002 (cartografia epistemológica).
- `produtos/` — documentação do ecossistema OPERA.
- `references/` e `diagrams/` — bibliografia, inspirações e diagramas.
- `archive/` — histórico, decisões e backups; não é fonte normativa.

Pastas históricas como `ontology/`, `laws/`, `hypotheses/` e `metrics/` podem permanecer como referência, mas as definições vigentes estão centralizadas em `GLOSSARIO_CANONICO.md`.

Consulte `docs/governanca_documental_v0.7.1.md` para a classificação `CANONICAL`, `ACTIVE`, `HISTORICAL`, `DEPRECATED` e `WORKSPACE`. Essa classificação organiza o trabalho, mas não altera a ordem de autoridade acima.

## Fonte da verdade e formatos

- O repositório Git é a fonte canônica versionada; arquivos Markdown são a fonte primária editável.
- PDFs, planilhas e imagens são artefatos, evidências ou materiais de consulta; não são normativos por si só.
- Use Markdown para documentação, LaTeX para formalização matemática e Mermaid/SVG textual para diagramas.
- Não trate arquivos removidos do acervo como fontes ativas sem verificar o histórico Git e a documentação vigente.

## Identificadores e ciclo de vida

Use os prefixos oficiais: `IDR`, `LAW`, `HYP`, `MET` e `PRT`. IDs são permanentes, sequenciais e nunca reutilizados. A primeira ocorrência de um termo canônico deve citar seu ID.

Siga `PRT-001` para criar, revisar, aprovar, tornar canônico ou tornar obsoleto um artefato. Os estados reconhecidos são Draft, Experimental, Canônico e Obsoleto. Não invente ou promova estados sem aprovação humana.

## Antes de qualquer alteração canônica

Verifique e explique:

1. Compatibilidade com a Constituição, Documento Canônico, Glossário e TPC.
2. Contradições, redefinições, sobreposições ou duplicidades de conceitos e IDs.
3. Dependências de entrada, arquivos afetados e impactos nas aplicações e protocolos.
4. Evidências, escopo, limitações, status epistemológico e critérios de falseabilidade.
5. Se a proposta exige cartografia epistemológica conforme `PRT-002`.

Não altere documentos canônicos silenciosamente. Apresente motivo, impacto, riscos e proposta de mudança antes de editar. Preserve a proveniência de conteúdo extraído do acervo.

## Estilo e comunicação

- Priorize clareza, precisão e linguagem proporcional à evidência.
- Evite marketing e linguagem absoluta para hipóteses, métricas em calibração ou fundamentos em desenvolvimento.
- Diferencie fatos documentados, inferências e sugestões.
- Use os IDs oficiais e a terminologia do glossário vigente.
- Quando houver dúvida material sobre autoridade, significado ou escopo, pare e peça direção antes de modificar.

## Acervo, pesquisa e confidencialidade

- Não mover, reescrever ou descartar itens de `archive/` sem autorização explícita.
- Não reproduzir nem publicar dados pessoais, confidenciais ou sensíveis.
- Casos reais, ECOs e evidências empíricas devem seguir os protocolos e preservar anonimização quando necessária.
- Fontes externas não se tornam normativas sem registro, proveniência e, quando aplicável, cartografia conforme `PRT-002`.

## Encerramento de sessão e pré-commit

Ao concluir uma sessão com alterações, antes de qualquer commit:

1. Revisar todas as alterações realizadas na sessão.
2. Procurar inconsistências com os documentos de maior autoridade e o glossário vigente.
3. Procurar duplicidades de conceitos, definições, IDs ou artefatos canônicos.
4. Verificar documentos, IDs, referências ou relações órfãs.
5. Gerar ou atualizar um relatório de revisão com achados, riscos e pendências.

Em uma consolidação de versão, estabilize primeiro o conteúdo e só então calcule hashes e complete o manifesto. Nunca reconstrua retroativamente o manifesto de uma versão publicada usando arquivos locais posteriores.

Não realizar commit enquanto essa revisão não estiver concluída e reportada.
