# CHECKPOINT TPC BREAKER — 17/08/2026

## Estado de execução
- Fase 1 (arqueologia): CONCLUÍDA — repo `informodinamica-canonical` commit aad9af9, branch isolada `breaker/tpc-breaker-championship` criada (nenhuma mudança no repositório do usuário, apenas branch; nada mergeado).
- Fase 2 (baseline): CONCLUÍDA — `/home/ubuntu/tpc-breaker/TPC-BASELINE.md`
- Fase 3 (rounds): CONCLUÍDA — todos os rounds 00–16 escritos em `/home/ubuntu/tpc-breaker/rounds/`:
  R00-null, R01-shannon, R02-controle, R03-sistemas-distribuidos, R04-redes, R05-bayes, R06-game-theory, R07-evolucao, R08-morfogenese-colonias-ecologia, R09-neuro-cognicao, R10-instituicoes, R11-termodinamica-fisestat, R12-sistemas-dinamicos-caos, R13-mas-org, R14-quantica-relatividade, R15-cosmologia-buracos-negros, R16-a-propria-tpc
- Doppelgänger: CONCLUÍDO — `/home/ubuntu/tpc-breaker/TPC-DOPPELGANGER.md` (coverage 81–99%, risco severo de redundância)
- Boss Multiverso: CONCLUÍDO — `/home/ubuntu/tpc-breaker/TPC-MULTIVERSE-BOSS.md`

## Dano bruto por adversário (Regra 9/10: D1=1, D2=3, D3=8, D4=20, D5=50; bônus/penalidades)
| Adversário | Dano bruto | Bônus | Penalidades | TOTAL |
|---|---|---|---|---|
| Adversário Zero (null) | 8 | 0 | 0 | 8 |
| Shannon | 7 | 0 | 0 | 7 |
| Teoria de Controle | 10 | +10 | 0 | 20 |
| Sistemas Distribuídos | 19 | +20 | 0 | 39 |
| Teoria de Redes | 7 | 0 | 0 | 7 |
| Bayes | 7 | 0 | 0 | 7 |
| Game Theory | 12 | 0 | 0 | 12 |
| Evolução Darwiniana | 24 | 0 | 0 | 24 |
| Morfogênese/Colônias/Ecologia | 21 | 0 | 0 | 21 |
| Neuro/Cognição/Linguística | 12 | +15 | 0 | 27 |
| Instituições | 12 | 0 | 0 | 12 |
| Termodinâmica/Física Estatística | 12 | 0 | 0 | 12 |
| Sistemas Dinâmicos/Caos | 12 | +10 | 0 | 22 |
| MAS + Teoria Organizacional | 12 | 0 | 0 | 12 |
| Quântica/Relatividade | 4 | 0 | 0 | 4 |
| Cosmologia/Buracos Negros | 4 | 0 | 0 | 4 |
| Multiverso (boss) | 4 | 0 | 0 | 4 |
| A Própria TPC (adversário final) | 53 | 0 | 0 | 53 |

## Ranking previsto (Top 16)
1. A Própria TPC — 53
2. Sistemas Distribuídos — 39
3. Neuro/Cognição/Linguística — 27
4. Evolução Darwiniana — 24
5. Sistemas Dinâmicos/Caos — 22
6. Morfogênese/Colônias/Ecologia — 21
7. Teoria de Controle — 20
8. MAS + Teoria Organizacional — 12
= Game Theory — 12 / Instituições — 12 / Termodinâmica — 12
12. Adversário Zero — 8
13. Shannon — 7 / Redes — 7 / Bayes — 7
16. Quântica/Relatividade — 4 / Cosmologia — 4 / Multiverso — 4

## Bracket (Top 16 → Top 8 → Top 4 → Semi → Final)
Top16: (1 vs 16) TPC-própria × Cosmologia; (2 vs 15) Distr. × Quântica; (3 vs 14) Neuro × Termodinâmica; (4 vs 13) Evolução × Bayes; (5 vs 12) Sis.Dinâmicos × Adversário Zero; (6 vs 11) Morfogênese × Instituições; (7 vs 10) Controle × MAS/Org; (8 vs 9) GameTheory × Redes/Shannon (tiebreak: Game Theory 12 > Redes 7)
Top8: TPC-própria, Distr., Neuro, Evolução, Sis.Dinâmicos, Morfogênese, Controle, GameTheory
Top4: TPC-própria, Distr., Neuro, Evolução (soma de danos nos confrontos diretos por dano D3+/redundância)
Semi: TPC-própria × Evolução; Distr. × Neuro
Final: TPC-própria × Sistemas Distribuídos
TOP 1: A PRÓPRIA TPC (maior ameaça = a auditoria interna: padrão de imunização adaptativa + HYP-001-U válvula UNOBSERVED_PRECURSOR + exclusão ad hoc de sabotagem) — com Sistemas Distribuídos como maior ameaça externa (contraexemplo Paxos/raft reproduzível + FLP/CAP).

## Próximos passos (fases 5–6)
- Fase 5: MUTAÇÕES (MUT-001..MUT-n) → já registradas nos rounds: MUT-007 janela inconsistência, MUT-008 persistência morta, MUT-016 redefinição de representação (proibida), etc. Escrever TPC-MUTATIONS (ou integrar na autópsia), pentefino → TPC-MINIMUM-SURVIVABLE.md, autópsia → TPC-AUTOPSY.md, leaderboard/bracket → TPC-BREAKER-LEADERBOARD.md, ataques → TPC-BREAKER-ATTACKS.md, página visual → TPC-BREAKER.html
- Fase 6: entregar tudo ao usuário.

## Dados-chave do repo (para citação)
- TPC.md v0.8 (02/08/2026): postulado, IDR-0001..0012, LAW-001..004, HYP-001..003, MET-001..005, falseabilidade §6, limitações §7
- DEC-CONC-001 (07/08/2026): TPC = Teoria dos Processos Coordenativos
- GLOSSARIO_CANONICO.md v1.1: fonte única; SHANNON_FORMALIZATION_PENDING; HYP-001-U draft
- FORMALIZACAO_MATEMATICA.md: EO=(P,F,U,C,R,X); D(S,t)=Σαᵢ(1−aᵢ); Pr(E=1)=q(D,…); g,h indefinidas
- FUNDAMENTOS_MATEMATICOS.md v2.0: 11 áreas matemáticas; ICO≈RPN; MDEO=otimização; Riemann/Categorias filosóficos
- ONTOLOGIA.md: domínio e exclusões (instintivos, fatores externos/violência/sabotagem)
- AXIOMAS_E_PROPOSICOES.md: A1–A5; A6/A7 rebaixados; P1–P6, T1–T4
- PROTOCOLO_EXPERIMENTAL.md: HYP-001-U, desenho quasi-experimental, refutação >20% sem deformação, taxonomia REFUTATION/UNOBSERVED_PRECURSOR/...
- CASOS_REAIS.md: 2 casos retrotivos (betoneira ICO 60; pausa ICO 24)
- AUDITORIA_v0.2.4.md: C-01 manifesto, A-01 axioma órfão, A-02 HYP-001 universal, A-03 viés medição piloto, A-04 MET-003/005; M-01 capital, M-02 IFX escala, M-03 bib
- AUDITORIA_v0.7.0.md: manifesto desatualizado, autoridade documental, MET ambíguo
