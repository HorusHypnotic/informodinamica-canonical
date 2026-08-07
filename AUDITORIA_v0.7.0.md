# Auditoria de Transição e Coerência — v0.7.0

**Data:** 2026-07-31  
**Escopo:** transição `e9ca452` (v0.2.4) → `5152e4b` (v0.7.0), documentos normativos e núcleo vigente.  
**Método:** leitura de README, Constituição, Documento Canônico, Glossário Canônico, TPC, protocolos, roadmap, changelog, manifesto e comparação Git de nomes/estatísticas.  
**Limite:** avaliação documental; não valida empiricamente a TPC, não reprocessa PDFs e não substitui revisão humana especializada.

## Sumário executivo

A versão v0.7.0 transforma o repositório de um núcleo modular inicial em uma arquitetura institucionalizada: Constituição, Documento Canônico, Glossário Canônico, protocolos de governança, teoria centralizada, pesquisa, aplicações e produtos. A mudança é coerente com a direção de formalização do programa.

O maior risco da transição não é conflito de Git: o avanço foi fast-forward. É a coexistência de documentos históricos e novos documentos de autoridade, que pode induzir agentes ou leitores a usar definições antigas, caminhos substituídos ou versão de manifesto desatualizada.

| Prioridade | Achados |
| --- | ---: |
| Crítica | 0 |
| Alta | 3 |
| Média | 4 |
| Baixa | 3 |

## Mudanças estruturais verificadas

- Adição de 154 mudanças de arquivo no avanço remoto, com 5.442 inserções e 26.088 remoções.
- Inclusão de `CONSTITUICAO.md`, `GLOSSARIO_CANONICO.md`, `CHANGELOG.md`, `ROADMAP.md`, fundamentos matemáticos, documentos de teoria/aplicação/pesquisa e `PRT-001`/`PRT-002`.
- Reorganização para `01-teoria/`, `02-aplicacoes/`, `03-pesquisa/`, `protocols/`, `produtos/` e guias.
- Remoção de grande quantidade de materiais do acervo, incluindo documentos pessoais, imagens e artefatos não canônicos; essa mudança reduz exposição e ruído no clone de trabalho.
- `ontology/glossary.md` foi mantido como referência histórica, enquanto `GLOSSARIO_CANONICO.md` tornou-se a fonte única de definições.

## Achados de alta prioridade

### A-01 — Manifesto vigente não acompanha a versão declarada

**Evidência:** README e changelog indicam v0.7.0; `manifest/` contém `v0.6.0.manifest.md` como versão mais recente. A Constituição exige um manifesto por versão semântica.

**Risco:** a v0.7.0 não possui ainda certificado de integridade completo e os hashes do v0.6.0 não representam os novos artefatos.

**Controle recomendado:** gerar `manifest/v0.7.0.manifest.md` com hashes completos, método de geração, lista de artefatos canônicos e commit de referência.

### A-02 — Autoridade documental precisa ser explicitamente protegida contra deriva histórica

**Evidência:** o repositório conserva `ontology/`, `laws/`, `hypotheses/`, `metrics/` e o manifesto v0.2.0, enquanto o changelog informa que o glossário anterior foi substituído por `GLOSSARIO_CANONICO.md`.

**Risco:** agentes podem ler um documento histórico antes do glossário vigente e replicar definição, taxonomia ou status desatualizado.

**Controle recomendado:** manter a hierarquia de autoridade em `AGENTS.md`, adicionar avisos de status histórico nos documentos legados ou links diretos para o glossário vigente e impedir novas alterações conceituais nesses caminhos sem migração explícita.

### A-03 — Estado de pesquisa e linguagem de maturidade exigem separação rigorosa

**Evidência:** a TPC é declarada “documento canônico — teoria formal consolidada”, mas suas métricas estão em calibração e a pesquisa de campo HYP-002 ainda não começou. O roadmap situa a validação empírica como fase em andamento.

**Risco:** leitores podem interpretar formalização canônica como validação empírica concluída.

**Controle recomendado:** preservar em materiais públicos a distinção entre status documental, status teórico, status experimental e evidência empírica; usar explicitamente as limitações em apresentações e aplicações.

## Achados de média prioridade

### M-01 — Taxonomia de MET-003, IFX e MET-005/Slektip permanece ambígua

O glossário classifica Fliflexação e Slektip como métricas, enquanto a TPC apresenta IFX como a métrica associada à Fliflexação e descreve Slektip como mecanismo. A aplicação TDO usa “IFX (MET-003)”.

**Controle recomendado:** definir em uma revisão futura se `MET-003` é o constructo Fliflexação ou o índice IFX e se Slektip é métrica, mecanismo ou objeto de conhecimento; registrar a decisão no glossário e em PRT-001.

### M-02 — Há risco residual de caminhos documentais desatualizados

O caminho de fundamentos matemáticos em `DOCUMENTO_CANONICO.md` foi corrigido nesta sessão para `01-teoria/FUNDAMENTOS_MATEMATICOS.md`. O changelog e o histórico contêm nomes de arquivos de versões anteriores, portanto o risco permanece para outros links não verificados automaticamente.

**Controle recomendado:** executar uma verificação automatizada de links Markdown e revisar os caminhos após cada reorganização.

### M-03 — A metrologia ainda demanda regras operacionais completas

TPC e protocolo experimental definem fórmulas e escalas de ICO/IFX, mas a calibração está declarada como pendente. Capital Preservado depende de EPI e atribuição de corrosão acumulada.

**Controle recomendado:** registrar versionamento de escalas, fontes, denominadores, critérios de pontuação e incerteza antes de comparar obras ou publicar resultados.

### M-04 — A remoção do acervo precisa manter rastreabilidade histórica

A limpeza reduziu materiais pessoais e artefatos, o que é positivo. Os itens removidos continuam recuperáveis pelo histórico Git, mas a política de retenção, sigilo e proveniência dos remanescentes deve permanecer documentada.

**Controle recomendado:** registrar decisões relevantes de remoção em changelog/inventário e manter o acervo remanescente fora da autoridade normativa.

## Achados de baixa prioridade

### B-01 — Variação terminológica de ECO

Documentos novos usam “Evento de Corrosão da Coordenação”; documentos históricos usam “Evento de Corrosão Operacional”. A evolução é compreensível, mas deve aparecer como sinônimo histórico controlado no glossário.

### B-02 — Convenção de nomes de arquivos diverge de parte do legado

A Constituição recomenda `snake_case`, enquanto o legado contém maiúsculas, hífens e caminhos históricos. A regra deve ser aplicada a novos arquivos, com migração controlada quando necessária, não por renomeação em massa.

### B-03 — Manifesto v0.6.0 contém caminho histórico de glossário

O manifesto referencia `ontology/glossary.md`, enquanto a v0.7.0 declara `GLOSSARIO_CANONICO.md` como fonte vigente. Isso é aceitável como registro histórico, desde que não seja interpretado como manifesto da versão atual.

## Integridade, duplicidades e órfãos

- **IDs:** o Glossário Canônico apresenta a sequência IDR-0001–0012, LAW-001–004, HYP-001–003, MET-001–005 e PRT-001–002; não foi encontrada colisão de ID na fonte vigente.
- **Definições:** o glossário vigente centraliza definições. Há duplicação histórica em arquivos anteriores; ela deve ser tratada como legado, não como segunda fonte de verdade.
- **Órfãos:** o Axioma Fundamental, ausente na v0.2.4, está agora formalizado em `01-teoria/TPC.md`; o achado anterior está resolvido.
- **Referências:** `GLOSSARIO_CANONICO.md`, `DOCUMENTO_CANONICO.md`, Constituição e TPC formam a nova cadeia de navegação. A verificação automática de links é recomendada para confirmar todos os caminhos após a reorganização.

## Próximos controles

1. Criar manifesto v0.7.0 e vincular a um commit Git definitivo.
2. Revisar links e referências de caminhos antigos.
3. Manter documentos v0.2.4 como históricos; não os usar como autoridade atual.
4. Calibrar métricas e registrar o protocolo operacional de medição.
5. Consolidar casos reais e evidências de validação empírica.
6. Antes de commit, revisar os documentos locais de governança contra esta auditoria e a Constituição.

## Conclusão

A v0.7.0 melhora substancialmente a governança e a navegabilidade do repositório. A prioridade agora é consolidar a transição: atualizar o manifesto, blindar a fonte de autoridade contra documentos legados e manter separadas formalização teórica, aplicação operacional e evidência empírica.

## Adendo — revisão da arquitetura operacional

**Data:** 2026-07-31  
**Alterações revisadas:** criação de `docs/`, `agents/`, `workspace/` e `opera/`; ampliação de `.gitignore`; atualização de README, Documento Canônico e Roadmap.

- Os novos documentos preservam a ordem de autoridade: Constituição, Documento Canônico, Glossário e TPC continuam superiores às instruções de agentes e à documentação operacional.
- `workspace/` foi mantido explicitamente não canônico; `opera/` foi separado da documentação já existente em `produtos/`.
- Os sete papéis de agentes foram criados sem lhes atribuir autoridade para alterar teoria autonomamente.
- Não foram identificadas duplicidades conceituais novas, IDs novos ou documentos órfãos entre os arquivos criados.
- Todos os caminhos internos introduzidos nesta sessão foram verificados como existentes; o caminho matemático anteriormente quebrado foi corrigido.
- Risco remanescente: os diretórios de implementação ainda contêm apenas marcadores `.gitkeep`; convenções de código e integração deverão ser definidas antes do primeiro módulo OPERA.
