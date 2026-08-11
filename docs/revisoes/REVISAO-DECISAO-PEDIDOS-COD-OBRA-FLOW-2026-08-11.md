# Revisão da decisão Pedidos COD ↔ Obra Flow

**Data:** 11 de agosto de 2026

**Artefato revisado:** `docs/decisoes/DEC-PRODUTO-IDENTIDADE-PEDIDOS-COD-OBRA-FLOW-2026-08-11.md`

**Natureza:** revisão pré-commit de decisão operacional de produto.

## Compatibilidade com fontes de autoridade

- `CONSTITUICAO.md`: compatível; o artefato não cria conceito, lei, hipótese, métrica, protocolo ou ID.
- `DOCUMENTO_CANONICO.md`: compatível; preserva a distinção entre IDs locais e identidade canônica de obra.
- `GLOSSARIO_CANONICO.md`: nenhuma definição foi criada ou alterada.
- `DEC-ARQ-002-identidade-operacional-opera.md`: compatível; IDs numéricos Dexie permanecem aliases locais e a decisão não equipara acesso, obra ou produto.
- `PRT-001`: não acionado para novo ID, porque o artefato é decisão operacional de produto.
- `PRT-002`: não acionado; não há autor, teoria ou fundamento externo incorporado.

## Contradições e resolução explícita

Contradição encontrada:

- o bundle do repositório `obra-flow` preservava “Pedidos COD”;
- a revisão de 3 de agosto e o catálogo ativo definiam Obra Flow como produto independente;
- Pedidos COD permanecia sem repositório confirmado.

A decisão não resolve a contradição por apagamento. Classifica o nome no bundle como identidade histórica da implementação e seleciona Obra Flow pela autoridade documental posterior. Pedidos COD permanece produto distinto e não descontinuado.

## Duplicidades

- Não foi criado produto adicional para `build-sync-notes`; o nome permanece histórico do mesmo repositório.
- Não foi criado novo Pedidos COD a partir do código do Obra Flow.
- A matriz de identidade referencia inventários existentes em vez de duplicar seus papéis normativos.

## Dependências e impactos

- Entrada: histórico Git de `HorusHypnotic/obra-flow`, revisão de segurança/rename, inventários de produto e Product Scout.
- Impacto no produto: autoriza alinhamento de branding e pre-flight sob o nome Obra Flow.
- Impacto teórico: nenhum.
- Integrações: nenhuma criada.
- Schema canônico: nenhuma alteração.

## Evidência, escopo e limitações

- Evidência: commits datados, código executável, documentação do repositório e catálogo ativo.
- Escopo: identidade institucional e seleção para validação local-first.
- Limitação: a fonte operacional própria de Pedidos COD continua não identificada.
- Status epistemológico: decisão operacional documentada, não conclusão teórica ou empírica sobre a TPC.
- Falseabilidade operacional: a decisão deve ser revista se surgir fonte autoritativa anterior ou posterior que comprove Pedidos COD como o mesmo produto ou como autoridade do repositório.

## Órfãos e referências

- O artefato não cria IDs ou relações canônicas que possam ficar órfãs.
- Referencia explicitamente o repositório operacional e preserva os nomes históricos necessários à genealogia.
- O relatório de pre-flight e a canonicalização detalhada permanecem no repositório do produto, sem copiar código para o canônico.

## Riscos e pendências

- Pedidos COD continua sem escopo e repositório confirmados.
- Integração futura entre os produtos permanece indeterminada.
- O artefato não deve ser lido como descontinuação de Pedidos COD.

## Veredito da revisão

**APTO PARA COMMIT**, limitado aos dois arquivos desta decisão e sem incluir outros arquivos locais não relacionados.
