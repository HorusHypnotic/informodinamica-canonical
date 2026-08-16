# Matriz de Sucessão Conceitual — TPC v0.8 → Teoria dos Processos Coordenativos

**Data:** 08/08/2026
**Estado documental:** ACTIVE — análise científica provisória
**Status epistemológico:** inventário de sucessão; não canônico
**Objetivo:** registrar o que foi herdado, reformulado, criado depois, rejeitado ou permanece indecidido na transição entre a Teoria da Persistência da Coordenação v0.8 e os desenvolvimentos posteriores associados à Teoria dos Processos Coordenativos.

## Aviso de autoridade

Este documento:

- não altera a Teoria da Persistência da Coordenação v0.8;
- não formaliza a Teoria dos Processos Coordenativos;
- não promove definições, leis, hipóteses, métricas ou métodos;
- não substitui Constituição, Documento Canônico, Glossário ou TPC.md;
- utiliza classificações provisórias de auditoria;
- preserva divergências entre fontes em vez de resolvê-las silenciosamente.

“Herdado”, “reformulado”, “novo”, “rejeitado” e “indecidido” descrevem relações documentais candidatas. Não constituem estados do PRT-001 nem decisões de canonização.

Nenhuma fonte histórica foi alterada para produzir esta matriz.

## Proveniência

A análise foi produzida após a recanonização encerrada em 3dd8460 e examinou especialmente:

- a formulação candidata v0.8 recuperada durante a recanonização;
- 6583864 — fundação arquitetural com MET-006–009 e EXP-001;
- 5529403 — decisão de migração da nomenclatura da TPC;
- 3dd8460 — preservação explícita da genealogia no README.

## Fontes examinadas

### Núcleo v0.8

- 01-teoria/TPC.md;
- AXIOMAS_E_PROPOSICOES.md;
- FORMALIZACAO_MATEMATICA.md;
- CONSTITUICAO.md;
- GLOSSARIO_CANONICO.md;
- ONTOLOGIA.md;
- DOCUMENTO_CANONICO.md;
- HYP-001–003;
- LAW-001–004;
- MET-001–005.

### Desenvolvimento posterior

- docs/decisoes/DEC-CONC-001-migracao-nomenclatura-tpc.md;
- docs/theory/MET-006.md a MET-009.md;
- docs/experiments/EXP-001_CI-CD/protocol.md;
- docs/cross-domain-validation/invariants-matrix.md;
- README e checkpoints, apenas como metadocumentação.

## Resumo executivo

A maior parte do conteúdo formal disponível pertence à Teoria da Persistência da Coordenação v0.8: objeto analítico, ontologia, axiomas, proposições, leis, hipóteses e métricas. A presença desses elementos na main não demonstra que tenham sido incorporados pela nova formulação.

A ruptura documentada é de centralidade e escopo. Na v0.8, persistência representacional é o objeto central. Depois, persistência passa a ser apresentada como um processo coordenativo entre outros. Não foi encontrada rejeição explícita do núcleo anterior.

O conteúdo substantivamente novo aparece em 6583864. MET-006–009 e EXP-001 introduzem acoplamento, desacoplamento, recalibração, sincronização, canais de realimentação, T₀–T₄, latências, redundância e meta-acoplamento.

Esse material constitui uma camada metodológica e experimental, mas não uma teoria integrada. Ele não foi incorporado ao Glossário, à ontologia, aos axiomas, às leis ou à formalização matemática da v0.8.

Nenhum elemento foi classificado como REJEITADO: não existe evidência explícita de abandono. A quantidade de itens INDECIDIDOS decorre da regra de não presumir continuidade apenas porque também não houve rejeição.

## Legenda de autoridade

| Código | Fonte ou camada |
|---|---|
| C | Constituição — autoridade máxima |
| DC | Documento Canônico |
| G | Glossário Canônico — definições e IDs |
| T8 | TPC.md, ontologia, axiomas e formalização v0.8 |
| D8 | LAW, HYP e MET derivados da v0.8 |
| DEC | DEC-CONC-001 |
| M6–M9 | MET-006–009 |
| EXP | EXP-001 |
| INV | matriz de invariantes |
| R | README, auditorias e checkpoints |

## Matriz

| Elemento | Formulação v0.8 | Formulação posterior | Classificação | Justificativa, autoridade e conflito | Estado e ação futura |
|---|---|---|---|---|---|
| Objeto da teoria | C, DC e T8: persistência e estado das representações; representação como objeto analítico primário | DEC: classe ampla de processos coordenativos | REFORMULADO | A centralidade muda; DEC não possui autoridade para substituir C | Candidato; definir objeto e governança da sucessão |
| Domínio | Sistemas dependentes de representações interpretáveis; exclusão de reflexos e fatores exógenos dominantes | EXP menciona software, saúde e obras | INDECIDIDO | Aplicação multissetorial não define domínio geral | Formular fronteiras e casos excluídos |
| Coordenação — IDR-0001 | Resultado relacional de interpretações e ações compatíveis | EXP fala em coerência funcional por sincronização | HERDADO | Não há redefinição incompatível, mas coerência e coordenação não foram relacionadas formalmente | Preservar apenas como candidato |
| Representação operacional — IDR-0002 | Estrutura portadora de estado, referencial e interpretável | EXP usa representações simbólicas e canais | HERDADO | Continua central, sem substituição demonstrada | Relacionar representação, canal e artefato |
| Persistência | Objeto central e atributo de EO | Um processo entre vários | REFORMULADO | Permanece relevante, mas perde exclusividade | Definir persistência como processo ou regime |
| Degradação | Perda de atributos de EO ou de capacidade K_R | M7 diagnostica degradação/colapso; EXP degrada canais | REFORMULADO | O nível analítico se amplia | Relacionar D_R, canal degradado e desacoplamento |
| Deformação — IDR-0004 | Perda, atraso, substituição, ambiguidade e fragmentação | Materiais posteriores preferem degradação e desacoplamento | INDECIDIDO | Não há abandono nem equivalência formal | Decidir relação entre os três conceitos |
| Resiliência — IDR-0005 | Preservação/restauração da representação | M8/M9 tratam resiliência sistêmica e epistêmica | REFORMULADO | Ampliação de nível sem taxonomia | Distinguir resiliência representacional, epistêmica e sistêmica |
| Acoplamento | Sem conceito formal equivalente | Relação entre fenômeno, representação e canais | NOVO | Surge em P658 sem ID ou modelo geral | Definir entidades, relação e medida |
| Desacoplamento | Sem definição substantiva | Mundo muda e representação permanece anterior; T₀ | NOVO | Definição operacional própria | Diferenciar atraso, deformação e perda de fidelidade |
| Transmissão | Continuidade potencial e transferência por Slektip | Apenas enumerada em DEC | INDECIDIDO | O processo posterior não foi definido | Delimitar transporte, transformação e interpretação |
| Detecção | Sensibilidade da Fliflexação e cegueira da HYP-003 | T₂ e latência de detecção | REFORMULADO | Recebe instante operacional | Definir detector, sinal e limiar |
| Resposta | Correção/intervenção sem instante formal | T₃, início da ação corretiva | REFORMULADO | Ação anterior ganha temporalidade | Separar decisão, início e eficácia |
| Restauração | Recuperação de atributos/K_R; coordenação como desfecho separado | T₄, restauração do acoplamento | REFORMULADO | Muda o objeto restaurado | Definir restauração representacional, de acoplamento e coordenativa |
| Recalibração | Correção e atualização como antecedentes parciais | M9 cria calibração assistida/incorporada e T₀–T₄ | NOVO | Estrutura metodológica inédita | Definir se é processo, protocolo ou mecanismo |
| Sincronização | Sem definição formal | Alinhamento contínuo entre estados e representações | NOVO | Não equivale automaticamente a coordenação | Definir estados, tolerância e direção |
| Estado operacional — EO | Vetor da representação: P, F, U, C, R e X | EXP usa espaço de estados físicos/operacionais | INDECIDIDO | A expressão passa a apontar para objetos diferentes | Separar estado do fenômeno e da representação |
| Estado representacional | Estado de S expresso por EO | Espaço de representações simbólicas | HERDADO | Distinção compatível, ainda sem ponte | Consolidar terminologia futura |
| Capacidade coordenadora — K_R | Propriedade relacional condicionada a agentes, tarefa e ambiente | Não reaparece formalmente | INDECIDIDO | Acoplamento não equivale a K_R | Decidir permanência do mediador causal |
| Coordenação observada — K_C | Desfecho independente de EO | EXP utiliza sinais e métricas de pipeline | INDECIDIDO | T₄ não equivale a K_C | Definir observáveis independentes |
| ECO | Falha coordenacional observável | Ausente de M6–M9 e EXP | INDECIDIDO | Presença histórica não prova herança | Revalidar definição e causalidade |
| ICO | Gravidade I × R × P | Ausente do modelo posterior | INDECIDIDO | Não incorporado nem rejeitado | Manter em calibração fora do novo núcleo |
| Fliflexação | Detectar, corrigir e aprender; restaurar relações representacionais | Recalibração e T₀–T₄ | INDECIDIDO | Sobreposição sem identidade | Comparar escopo com recalibração |
| Capital Preservado | Valor econômico associado à coordenação preservada | Ausente do posterior | INDECIDIDO | Instrumento aplicado não herdado automaticamente | Definir status e contrafactual econômico |
| Slektip | Representação acionável entre ciclos | Transmissão apenas enumerada | INDECIDIDO | Correspondência possível, não registrada | Decidir natureza ontológica e métrica |
| IFX | Sensibilidade, precisão, velocidade e aprendizado | Latências do EXP | INDECIDIDO | Latência cobre apenas parte dos componentes | Resolver fórmula, escala e relação com T₀–T₄ |
| LAW-001 | Coordenação persistente mediada por representações | Sincronização fenômeno–representação | REFORMULADO | Mediação permanece, mas ganha dinâmica; arquivo histórico possui redação mais universal que G/T8 | Restringir domínio antes de qualquer sucessão |
| LAW-002 | Integridade representacional pode sustentar persistência | Persistência vira processo particular | REFORMULADO | Pode sobreviver como lei de regime/subteoria | Definir nível na arquitetura futura |
| LAW-003 | Cinco mecanismos de deformação | Falhas de canais e desacoplamento | INDECIDIDO | Casos compatíveis sem equivalência | Mapear EXP para a taxonomia provisória |
| LAW-004 | K_R pode ser restaurada | Recalibração e redundância sistêmica | REFORMULADO | Princípio reaparece em nível maior | Redefinir objeto e critério de sucesso |
| HYP-001 | Perdas representacionais elevam risco; arquivo histórico faz afirmação mais universal | EXP trata falso verde e desacoplamento | INDECIDIDO | EXP não testa a hipótese geral | Fixar versão autorizada e desenho de teste |
| HYP-002 | Intervenções OPERA devem alterar ECOs, coordenação e valor | Sem equivalente posterior | INDECIDIDO | Direção do número de ECOs diverge entre fontes | Revisar desenho antes de sucessão |
| HYP-003 | Naturalização reduz detecção de deformação | EXP inclui cegueira de detector | INDECIDIDO | Similaridade não demonstra continuidade | Formular comparação própria |
| A1 | Todo signo possui estado variável | Posterior depende de estados, sem assumir universalidade | INDECIDIDO | Compatível, não adotado | Decidir vocabulário primitivo |
| A2 | EO contém P, F, U, C, R e X | Posterior usa canais, níveis e acoplamento | INDECIDIDO | Outra decomposição | Comparar modelos |
| A3 | Interpretação depende de representação, agente, tarefa e ambiente | Posterior privilegia mecanismos automáticos | INDECIDIDO | Interpretação não é modelada | Definir interpretação mecânica/humana |
| A4 | Coordenação resulta de interpretações e ações compatíveis | Posterior usa coerência e acoplamento | INDECIDIDO | Compatibilidade não equivale a adoção axiomática | Avaliar como axioma candidato |
| A5 | Estado pode degradar, persistir ou recuperar-se | M7–M9 descrevem degradação/restauração | INDECIDIDO | Reaparece, mas o objeto do estado mudou | Reformular com tipos de estado |
| P1 | Degradação de EO reduz K_R sob condições | EXP prevê latência após degradação de canal | INDECIDIDO | Variáveis dependentes não equivalem | Criar ponte operacional ou separar hipóteses |
| P2 | EO iguais não garantem coordenação igual | Independência de canais | INDECIDIDO | EXP não testa agentes/tarefa/ambiente | Projetar comparação específica |
| P3 | Persistência isolada não determina coordenação | Falso verde persistente e desacoplado | REFORMULADO | EXP oferece operacionalização clara do princípio | Registrar futuramente hipótese derivada |
| P4 | Limiar de D é modelo concorrente | EXP usa critérios de latência | INDECIDIDO | Não usa D nem θ | Manter modelos separados |
| P5 | Restaurar EO deve elevar K_R; ECO é adicional | T₄ restaura acoplamento | REFORMULADO | Desfecho mudou | Definir cadeia causal e medições |
| P6 | Ambiguidade pode elevar divergência interpretativa | Não testada no EXP | INDECIDIDO | Sem sucessor substantivo | Manter questão aberta |
| MET-006 | Ausente | Anatomia/fisiologia de sistemas coordenativos | NOVO | Método novo; ID MET conflita com categoria de métrica do G | Submeter ao ciclo de vida |
| MET-007 | Ausente | Patologia e progressão de colapso | NOVO | Protocolo diagnóstico novo | Relacionar falhas à LAW-003 |
| MET-008 | Ausente | Engenharia coordenativa | NOVO | Mistura método e prescrição | Delimitar evidência e escopo |
| MET-009 | Ausente | Recalibração contínua | NOVO | Premissas e grandezas próprias | Regularizar estado e classe documental |
| T₀–T₄ | Ausentes | Desacoplamento, evidência, detecção, resposta e restauração | NOVO | Sequência operacional inédita | Generalizar e declarar observabilidade |
| Latências | Funções temporais de atributos, sem ciclo | Observação, detecção, resposta, restauração e total | NOVO | Grandezas posteriores próprias | Formalizar censura, unidades e infinito |
| Invariantes interdomínios | Ausentes | Matriz compara estados, intenção, recalibração e latência | NOVO | Estrutura em construção, sem dados apresentados | Tratar como hipóteses de invariância |
| Realimentação | Registro, correção e aprendizado | Canais independentes, observáveis e revisáveis | REFORMULADO | Ganha arquitetura explícita | Definir canal e feedback |
| Redundância | Sem teoria formal | Redundância funcional de baixa correlação | NOVO | Propriedade arquitetural nova | Definir falha comum e independência |
| Condições de falha | ECO, deformação e falseabilidade geral | Fases de colapso e falhas controladas | REFORMULADO | Passa de desfecho a processo | Separar falha de representação, canal e coordenação |
| Critérios de restauração | Restaurar atributos/K_R e observar coordenação | T₄ e retorno de métrica | REFORMULADO | Marcador operacional não prova K_C | Definir critérios independentes |
| Falseabilidade | C1–C3 gerais | Critérios locais do EXP | REFORMULADO | Operacionalização local, não sucessão geral | Definir falseadores da nova teoria |
| Entropia de Coordenação | Ambiguidade/entropia interpretativa | Termo usado no EXP sem fórmula | NOVO | Não operacionalizado | Definir ou retirar pretensão métrica |
| Níveis N1–N3 | Ausentes | Sintaxe, acoplamento semântico e meta-acoplamento | NOVO | Estratificação específica de CI/CD | Avaliar generalização |
| Independência de canais | Ausente | Princípio de robustez do EXP/M9 | NOVO | Sem definição ou medida | Formalizar independência |
| Meta-acoplamento | Ausente | Monitoramento da validade dos detectores | NOVO | Novo nível reflexivo | Relacionar a metarrepresentação |

## Mapa de conflitos de autoridade

| Fontes | Divergência | Risco | Decisão futura |
|---|---|---|---|
| C/DC × DEC/R | Persistência é objeto central nas superiores; a nova TPC é ampla nas inferiores | Revogação aparente sem emenda | Definir sucessão constitucional |
| G × MET-006–009 | MET significa métrica no G; os novos MET são métodos/protocolos | Colisão de IDs e classes | Decidir classificação e ciclo de vida |
| G/T8 × LAW individuais | Formulações revisadas são condicionais; arquivos históricos usam universalidade | Apresentar candidato como lei universal | Definir redação autorizada |
| G/T8 × HYP-001 individual | Risco aumentado versus causa para toda falha | Monocausalidade e baixa falseabilidade | Preservar versões e decidir sucessor |
| T8 × HYP-002 individual | Menos ECOs versus mais ECOs por detecção | Desenho contraditório | Separar incidência, detecção e registro |
| G/T8 × MET-003 individual | IFX como soma versus média | Incomparabilidade | Definir fórmula e escala |
| G/T8 × MET-004 individual | Candidato versus afirmação de que “prova” valor | Promoção causal indevida | Definir status e contrafactual |
| T8 × EXP/M9 | EO/K_R/K_C versus estados/acoplamento/latências | Modelos paralelos sob a mesma sigla | Construir correspondência formal |
| PRT-001 × MET-006–009 | Estados oficiais versus “Estável/Fundamental” | Maturidade aparente sem promoção | Aplicar ciclo de vida |
| T8 × DC | Falseabilidade condicionada versus redações C2/C3 determinísticas | Inconsistência interna da v0.8 | Consolidar historicamente antes de reutilizar |

## Elementos que não podem ser canonizados ainda

- objeto e domínio geral da Teoria dos Processos Coordenativos;
- processo coordenativo como categoria ontológica;
- acoplamento, desacoplamento, transmissão, recalibração e sincronização;
- Entropia de Coordenação;
- níveis N1–N3 e meta-acoplamento fora de CI/CD;
- MET-006–009 e seus IDs;
- T₀–T₄ como modelo universal;
- latências como métricas gerais;
- invariantes interdomínios;
- independência e redundância de canais;
- relação EO/K_R/K_C com acoplamento e recalibração;
- incorporação automática de ECO, ICO, Fliflexação, Capital Preservado, Slektip e IFX;
- incorporação automática de LAW, HYP, axiomas e proposições v0.8;
- falseabilidade geral da nova teoria.

## Candidatos possíveis ao núcleo futuro

Sem promoção:

- coordenação como fenômeno relacional;
- representação operacional como estrutura portadora de estado;
- distinção entre fenômeno e representação;
- persistência como processo particular;
- acoplamento e desacoplamento;
- detecção, resposta, restauração e recalibração;
- sequência T₀–T₄ e latências;
- canais de realimentação;
- independência e redundância funcional;
- falso verde sob desacoplamento;
- comparação interdomínios como estratégia de teste;
- separação entre restauração representacional e coordenativa.

## Decisões de migração P0 (pendentes de aprovação — branch `fix/p0-canonical-consolidation`)

Registro das cinco decisões de consolidação propostas após a Auditoria E-Prime/Desontologização e a Pré-Canonização P0, executadas em commit único (`fix(tpc): consolidate P0 canonical definitions`). Todas as formulações propostas já existiam na geração canônica vigente (TPC v0.8, GLOSSARIO_CANONICO v0.8, PROTOCOLO_EXPERIMENTAL) ou nos instrumentos operacionais; nenhuma constitui teoria nova.

| P0 | OLD → CURRENT | Classificação |
|----|---------------|----------------|
| P0-1 Coordenação | Definição ativa "redução compartilhada de incertezas" (`MANUAL_ECO.md`) → definição relacional vigente (IDR-0001); a leitura de entropia passa a formulação histórica `QUANTITATIVE_HYPOTHESIS` com `SHANNON_FORMALIZATION_PENDING` (variável, espaço de estados, distribuição, medida, baseline, domínio e mecanismo declarados como pendências) | CONSOLIDATION |
| P0-2 HYP-001 | Três redações canônicas ativas (universal forte no protocolo; condicional na TPC §4.1; probabilística "elevam o risco" no glossário) → versão canônica da TPC §4.1 consolidada no glossário; a universal existente no protocolo é rotulada **HYP-001-U (`DRAFT_EXPERIMENTAL`)**, sem promoção a canônica, com limiar de 20%, janela de detecção e conjunto de mecanismos a declarar, e taxonomia de exceções (`REFUTATION`, `UNOBSERVED_PRECURSOR`, `MISSING_DATA`, `MEASUREMENT_FAILURE`, `OUT_OF_DOMAIN`) que impede conversão automática de evidência contrária em precursor não observado | CLARIFICATION |
| P0-3 Representação | Tese existencial "uma representação só existe porque coordena agentes" (`01-teoria/FUNDAMENTOS_MATEMATICOS.md` §3.11) → alinhada a IDR-0002 e TPC §1 (existência decorre da relação especificável, não do sucesso coordenacional) | CONSOLIDATION |
| P0-4 Axiomas | "assumidos como verdadeiros, sem necessidade de prova" → "fundamento de derivação defeasible dentro do sistema e do domínio, revisável diante de incompatibilidade com a evidência", preservando a função lógica (não reclassificados como hipóteses) | CONTROLLED_MIGRATION |
| P0-5 ECO | "Evento de Corrosão Operacional" (TPC §2.10, MET-001, TDO) → nomenclatura vigente "Evento de Corrosão da Coordenação" (IDR-0010); escopo vigente (evento observável; desfecho candidato) consolidado; nome histórico preservado como sinônimo controlado com nota genealógica; instrumento de registro da MET-001 inalterado | CONTROLLED_MIGRATION |

**NEW_THEORY = 0.** Nenhuma lei (LAW-001–004), métrica (MET-002–005), hipótese (HYP-004–024), protocolo (PRT-001–003) ou experimento (EXP-001) foi alterado. Acoplamento não foi formalizado; Shannon não foi formalizado; HYP-024 e o teste de fronteira ontológica permanecem intocados.

## Lacunas formais

Faltam definição de processo coordenativo, objeto, domínio, ontologia integrada, papel de EO/K_R/K_C, taxonomia dos processos, relação entre deformação/degradação/desacoplamento, axiomas próprios, revisão das LAW/HYP, decisão sobre métricas v0.8, formalização matemática, observabilidade de T₀–T₄, falseabilidade, hipóteses concorrentes, regularização dos MET-006–009, cartografia epistemológica e decisão constitucional.

## Limitações

- A matriz é documental, não validação empírica.
- Similaridade terminológica não foi tratada como identidade.
- Ausência de rejeição não foi tratada como herança.
- Funcionamento de software não foi usado como evidência teórica.
- As classificações devem ser revistas se surgirem fontes anteriores, decisões humanas ou dados experimentais.

## Próxima necessidade analítica registrada

Comparar formalmente o modelo v0.8 — EO, K_R, K_C e D_R — com fenômeno, representação, canal, acoplamento, T₀–T₄ e latências, tentando distinguir operacionalização, ampliação compatível e concorrência parcial.
