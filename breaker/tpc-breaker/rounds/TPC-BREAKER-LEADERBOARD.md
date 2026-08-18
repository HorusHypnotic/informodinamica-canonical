# TPC ADVERSARIAL LEADERBOARD

**Campeonato:** TPC BREAKER — 17/08/2026
**Sistema de pontuação (Regra 10):** D1=1, D2=3, D3=8, D4=20, D5=50; bônus: +10 contraexemplo reproduzível, +10 formalização válida, +15 redundância demonstrada, +20 previsão conflitante testável; penalidades: −10 ataque analógico, −20 uso incorreto da teoria adversária, −30 especulação como evidência.
**Regra de independência (13):** cada adversário atacou o baseline congelado sem conhecer as defesas dos anteriores; checkpoints registrados por round.

## Ranking final — Top 16

| Pos. | Adversário | Dano bruto | Bônus | Penal. | TOTAL | Melhor golpe |
|------|-----------|-----------|-------|--------|-------|--------------|
| 🥇 | **A Própria TPC** (auditoria interna) | 53 | 0 | 0 | **53** | Padrão de imunização adaptativa + válvula UNOBSERVED_PRECURSOR + exclusão ad hoc de sabotagem |
| 🥈 | **Sistemas Distribuídos** | 19 | +20 | 0 | **39** | Contraexemplo Paxos/Raft reproduzível (consenso persiste com degradação local não corrigida) |
| 🥉 | **Neuro + Cognição + Linguística** | 12 | +15 | 0 | **27** | Hutchins (1995) precede e cobre o núcleo mediacional; redundância demonstrada |
| 4. | **Evolução Darwiniana** | 24 | 0 | 0 | **24** | Coordenação persistente natural sem representação (formigueiros, flocking, Turing 1952) |
| 5. | **Sistemas Dinâmicos + Caos** | 12 | +10 | 0 | **22** | Não-monotonicidade D(S,t)↔desfecho formalizada (script reproduzível) |
| 6. | **Morfogênese + Colônias + Ecologia** | 21 | 0 | 0 | **21** | Organização persistente sem representação global (Turing 1952; May 1973) |
| 7. | **Teoria de Controle** | 10 | +10 | 0 | **20** | Reconstrução 1:1 por realimentação/observabilidade (mapeamento completo) |
| 8. | **Game Theory** | 12 | 0 | 0 | **12** | Coordenação emergente sem objetivos comuns já é teoria madura (Schelling, Crawford–Sobel) |
| 8. | **Instituições** | 12 | 0 | 0 | **12** | Rotinas organizacionais (Nelson & Winter) cobrem Slektip e persistência |
| 8. | **MAS + Teoria Organizacional** | 12 | 0 | 0 | **12** | Frameworks MAS (Cohen–Levesque, MOISE+) com mais rigor formal |
| 8. | **Termodinâmica + Física Estatística** | 12 | 0 | 0 | **12** | Ordem emergente estatística sem representação (Ising; Prigogine) |
| 12. | **Adversário Zero** (null model) | 8 | 0 | 0 | **8** | Domínio aplicado redutível a práticas normativas; ICO = RPN re-rotulado |
| 13. | **Shannon** | 7 | 0 | 0 | **7** | Formalismo adimensional B(S,t) + g/h indefinidas |
| 13. | **Teoria de Redes** | 7 | 0 | 0 | **7** | Cascatas/percolação e robustez cobrem deformação e resiliência |
| 13. | **Bayes** | 7 | 0 | 0 | **7** | Estado coordenado = convergência de posteriors (Aumann 1976) |
| 16. | **Cosmologia + Buracos Negros** | 4 | 0 | 0 | **4** | Colapso das 4 noções persistência/observabilidade/acessibilidade/recuperabilidade |
| 16. | **Quântica + Relatividade** | 4 | 0 | 0 | **4** | Tempo global idealizado nunca declarado como idealização |
| 16. | **Multiverso** (BOSS) | 4 | 0 | 0 | **4** | "Persistência" como substantivo vs. processo (incoerência com a própria nomenclatura) |

Pontuação total do campeonato: **326 pontos de dano** contra a TPC.

## Bracket — Campeonato eliminatório

```
TOP 16                              TOP 8
────────────────────────────────────────────────────
(1)  A Própria TPC ............53 ──►┐
(16) Cosmologia/BN .............4 ──►┘  A Própria TPC ►┐
                                      ┌────────────────►┐
(2)  Sistemas Distribuídos .....39 ──►┐                  │
(15) Quântica/Relatividade .....4 ──►┘  Distr. ─────────►┤ SEMIFINAL
                                                          │  A Própria TPC ──► FINAL ──► 🏆 A PRÓPRIA TPC
(3)  Neuro/Cognição/Linguística .27 ──►┐                  │  (53)
(14) Termodinâmica/Fís.Estat. ..12 ──►┘  Neuro ──────────►┤
                                      ┌────────────────►┘
(4)  Evolução Darwiniana .........24 ──►┐
(13) Bayes .......................7 ──►┘  Evolução ──────►┤
                                                           SEMIFINAL 2
(5)  Sis. Dinâmicos + Caos ......22 ──►┐  Distr. (39) ──►┘
(12) Adversário Zero ............8 ──►┘  Distr. ─────────►┘
                                      ┌────────────────►┐
(6)  Morfogênese/Colônias/Ecologia 21 ──►┐
(11) Instituições ...............12 ──►┘  Morfogênese ──►┘
                                           (perde para Distr. em confronto
(7)  Teoria de Controle ..........20 ──►┐   direto por dano D3/redundância)
(10) MAS + Teoria Organizacional .12 ──►┘  Controle ──────►┘

(8)  Game Theory .................12 ──►┐  (9) Redes(7)/Shannon(7):
(9)  Teoria de Redes ..............7 ──►┘   tiebreak pelo melhor golpe — Redes
       (eliminado no Top 16: golpe D2    ──►  avança e também cai no Top 8)
        NT-1, sem reproduzibilidade)
```

**TOP 4:** A Própria TPC, Sistemas Distribuídos, Neuro/Cognição, Evolução Darwiniana.
**SEMIFINAIS:** A Própria TPC × Evolução (53 × 24 → TPC-própria); Sistemas Distribuídos × Neuro (39 × 27 → Distr.).
**FINAL:** A Própria TPC × Sistemas Distribuídos.

## 🏆 TOP 1 — MAIOR AMEAÇA CONHECIDA À TPC

**A PRÓPRIA TPC (53 pontos).** A auditoria interna (round sem adversário externo) identificou o padrão estrutural mais danoso: sucessivo enfraquecimento adaptativo das proposições (universais → "tendem a" → "podem" → "candidato" → "modelo concorrente"), a válvula classificatória UNOBSERVED_PRECURSOR capaz de absorver quase toda evidência contrária à HYP-001-U, e a exclusão ad hoc do caso de sabotagem/desinformação — exatamente o fenômeno que a própria taxonomia de deformação deveria explicar melhor. Se cada ataque futuro puder ser absorvido por uma cláusula condicional, a teoria converge para imunidade total. O único antídoto são os dados (HYP-002).

**Maior ameaça externa:** Sistemas Distribuídos (39) — contraexemplo reproduzível (consenso Paxos/Raft persiste com réplica degradada sem interpretação humana) dentro do domínio declarado pela própria ONTOLOGIA.md, mais os teoremas FLP/CAP/Byzantine que mapeiam o fenômeno com precisão que a TPC não tem.

## Eliminação precoce com valor (regra 12 — preservados)

- **Bayes, Redes, Shannon (7 pts cada):** golpes corretos mas menos destrutivos; Shannon é parcialmente neutralizado pelas salvaguardas documentais do próprio autor.
- **Quântica, Cosmologia, Multiverso (4 pts cada):** o rigor anti-pseudociência do repositório canônico neutralizou esses adversários — a TPC não comete saltos quântico-entrópicos; as fronteiras foram mapeadas como limites honestos de aplicabilidade, não como feridas.
