# ROUND 00 — ADVERSÁRIO ZERO (NULL MODEL)

**Status:** concluído
**Confiabilidade geral:** ALTA (argumentos conceituais, sem dados novos)

## Proposições atacadas
TPC-L001, TPC-H001, TPC-M002, TPC-M003, TPC-M004, TPC-C007/008/009 (Fliflexação/IFX/Capital Preservado/Slektip).

## Pergunta central
«Precisamos realmente da TPC?» — tente explicar os fenômenos do domínio (canteiros de obra: retrabalho, comunicação, falhas de handoff) usando linguagem comum e teorias existentes.

## Ataques

### AZ-1. Redução a "gestão de obra com boa disciplina documental" (D2)
O domínio canônico da TPC é "sistemas operacionais produtivos (construção, logística, saúde, educação)" onde "ações dependem da interpretação de representações operacionais". Nessa população, tudo o que os casos reais do repositório registram (betoneira retirada sem ordem de serviço; comunicação de pausa sem alinhamento) já é coberto por práticas estabelecidas há décadas: ordens de serviço escritas, diário de obra, atas, procedimentos operacionais padrão (SOPs), gestão de não-conformidades (ISO 9001), FMEA/HACCP em saúde, HAZOP em engenharia. Nenhuma das duas análises TPC dos casos exige um conceito que não exista nesses corpos de prática. A TPC, para o domínio aplicado, não aumenta **compressão explicativa** nem **previsão** sobre o que já existe.

**Dano: D2.** A teoria funciona como linguagem descritiva pós-hoc de fenômenos já codificados em procedimentos normativos. A própria auditoria interna v0.7.0 admite: "seus conceitos estão em calibração e a pesquisa de campo não começou".

### AZ-2. As métricas não somam poder preditivo sobre o baseline trivial (D2)
ICO = I × R × P é um re-empacotamento deSeverity×Frequency×Duration, análogo direto ao RPN da FMEA (que a própria FUNDAMENTOS_MATEMATICOS.md reconhece: "O ICO é análogo a um indicador de risco (como o RPN da FMEA)"). Se o ICO não ultrapassa RPN em capacidade preditiva de custos — e não há nenhum estudo comparativo registrado — o custo cognitivo de aprender a nova terminologia não é pago. IFX com componentes em duas escalas possíveis (0–1 ou 0–10) e Capital Preservado = EPI − corrosão (EPI sendo "cenário ideal") são, hoje, não mensuráveis de forma reprodutível (achados M-01, M-02 da auditoria interna). Uma métrica que ainda não pode ser calculada não pode melhorar compressão, previsão ou operacionalização.

**Dano: D2.**

### AZ-3. Slektip = lição aprendida (D1)
"Slektip: representação persistente e acionável destinada a transferir contexto coordenador entre ciclos operacionais" é operacionalmente indistinguível de *lessons learned* / *knowledge assets* da gestão do conhecimento (Nonaka & Takeuchi, 1995 — que o próprio repositório cita) e de *standard work* do lean. A renomeação não acrescenta mecanismo.

**Dano: D1.**

### AZ-4. O único espaço onde a TPC poderia não ser trivial é também o mais vago (D1)
O valor diferencial potencial da TPC reside em (a) a mediação representacional como lei geral e (b) o programa quantitativo (EO, D(S,t), Pr(E=1)=q(...)). Mas (a) quase não é testável no estado atual porque g e h estão indefinidas, e (b) não foi calibrado em nenhum domínio. Logo o "resíduo não trivial" da TPC está inteiramente em construtos ainda sem medida — o null model ganha o round aplicado de forma folgada e o round teórico fica indeciso, o que já é dano para uma teoria que pretende integrar domínios.

**Dano: D1** (para o núcleo teórico; soma com AZ-1/AZ-2 no domínio aplicado).

## Melhor defesa possível (registrada, não endossada)
A TPC não afirma ser a primeira a notar que documentos mal mantidos causam falhas. O que propõe é um **programa de pesquisa** com taxonomia explícita de deformação (perda/atraso/substituição/ambiguidade/fragmentação), separação analítica entre estado da representação (EO) e desfecho (ECO), e uma agenda de comparação de modelos (aditivo vs. multiplicativo vs. limiar). A pergunta "precisamos dela?" só se resolve com os dados que ainda não existem.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | AZ-1 + AZ-2: domínio aplicado redutível; métricas sem ganho demonstrado sobre RPN/lessons-learned |
| Melhor defesa | Agenda de pesquisa com hipóteses testáveis já declaradas; não é teoria acabada |
| Dano | D2 (3 pts) × 2 + D1 (1 pt) × 2 = **8** |
| Bônus/penalidades | nenhum ataque analógico; nenhuma especulação apresentada como evidência |
| Confiança | 0.85 |
| Questões abertas | A resposta definitiva é empírica (HYP-002); o round zero não pode falsificar, apenas mostrar ausência de ganho atual |

## Fontes
AUDITORIA_v0.2.4.md (achados A-04, M-01, M-02); FUNDAMENTOS_MATEMATICOS.md §3.8 (analogia RPN/FMEA); GLOSSARIO_CANONICO.md (MET-003/005); CASOS_REAIS.md (2 casos retrotivos).
