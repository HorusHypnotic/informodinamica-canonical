# TPC-BREAKER-ATTACKS — Registro completo dos ataques

**Regra 24 (checkpoint):** cada adversário registrou proposições atacadas, melhor ataque, melhor defesa, dano, confiança, fontes e questões abertas nos arquivos de round em `rounds/`. Este documento consolida o inventário de golpes com IDs para rastreabilidade no leaderboard e na página visual.

## Inventário de golpes por round

### R00 — Adversário Zero (null model)
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| AZ-1 | L001, H001, M002 | Domínio aplicado redutível a práticas normativas (SOPs, ISO 9001, diário de obra) |
| AZ-2 | M002, M003, M004 | Métricas sem ganho demonstrado sobre RPN; IFX/CP não mensuráveis reproduzivelmente |
| AZ-3 | C009 | Slektip = lessons learned |
| AZ-4 | L001, F006 | Resíduo não trivial está todo em construtos sem medida |

### R01 — Shannon
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| SH-2 | F003, F004 | B(S,t) adimensionalmente ilegítima (bits + custo) |
| SH-3 | L001, F006 | g e h indefinidas; exige operacionalização Shannon |
| SH-4 | F003 | Informação semântica sem teoria própria (Bar-Hillel & Carnap) |

### R02 — Teoria de Controle
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| CT-1 | L001, L004, P005, P009, F005 | Reconstrução 1:1 por realimentação/observabilidade (tabela de mapeamento) |
| CT-2 | C014 | Domínio desenhado para excluir o contraexemplo (termostato) |
| CT-3 | C014 | Colapso regulação/servo/adaptação — sem discriminação de modos |

### R03 — Sistemas Distribuídos
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| DS-1 | L001, L002 | FLP/CAP/Byzantine mapeiam o fenômeno com precisão superior |
| DS-2 | L001, L002, C015 | Contraexemplo: consenso Paxos/Raft persiste com réplica degradada, sem intérprete humano — reproduzível |
| DS-3 | L002 | Eventual consistency absorve LAW-002 |

### R04 — Teoria de Redes
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| NT-1 | L003, P005 | Cascata/percolação cobrem propagação de deformação |
| NT-2 | C005, C007 | Robustez/redundância absorvem Fliflexação/IFX |
| NT-3 | C010 | ECO = falha de nó/aresta (grafos atribuídos) |

### R05 — Bayes
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| BY-1 | C001, C003 | Estado coordenado = convergência de posteriors (Aumann 1976) |
| BY-2 | L003, H001 | Deformação = ruído de evidência; HYP-001 vira truismo racional |
| BY-3 | P010 | Ambiguidade = verossimilhança de alta entropia |

### R06 — Game Theory
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| GT-1 | C001, C003, L001 | Coordenação emergente sem objetivos comuns (Schelling; Crawford–Sobel; Axelrod) |
| GT-2 | C014 | Casos reais = jogos de sinalização (credenciamento, cheap talk) |
| GT-3 | H003 | ETTO + tradeoff exploração-explotação |

### R07 — Evolução Darwiniana
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| EV-1 | L001, C002, C015, C013 | Coordenação persistente natural sem representação; blindagem do falseador C1 (D4) |
| EV-2 | C009 | Slektips = variação+cópia+seleção (Boyd & Richerson) |
| EV-3 | C002 | Representação como exigência do observador, não do fenômeno |

### R08 — Morfogênese/Colônias/Ecologia
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| MF-1 | L001, C002, C013, C015 | Turing (1952): organização persistente sem representação global (D4) |
| MF-2 | F001 | Decoracao de sistemas dinâmicos (atratores/bifurcação já existem sem TPC) |

### R09 — Neuro/Cognição/Linguística
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| NC-1 | L001, C001 | Hutchins (1995) precede e cobre o núcleo mediacional (D3 + redundância +15) |
| NC-2 | C002, L001 | Cognição 4E: coordenação por acoplamento sem mediação representacional |
| NC-3 | C001 | Compatibilidade inferida da ação — circularidade potencial na medição |

### R10 — Instituições
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| IN-1 | L001, C006, C009 | Rotinas organizacionais (Nelson & Winter) cobrem Slektip/persistência |
| IN-2 | C015 | Persistência pós-substituição total sem representações explícitas (normas tácitas) |
| IN-3 | C010 | ECO = modelo suíço/ICAO incident reporting |

### R11 — Termodinâmica/Física Estatística
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| TD-2 | C013 | Ordem emergente estatística sem representação (Ising; Prigogine) |
| TD-3 | F004 | D(S,t) sem unidade/invariante — descritivo, não explicativo |
| TD-1 | F004 | Metáfora entálpica fundacional não sustentada como mecanismo |

### R12 — Sistemas Dinâmicos/Caos
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| SD-2 | P005, T4, F004 | Não-monotonicidade D(S,t)↔desfecho formalizada (script reproduzível; +10) |
| SD-1 | F002 | 6 curvas soltas; nenhum sistema acoplado; sem atratores reais |
| SD-3 | H001 | Caos limita a previsibilidade exigida por HYP-001 |

### R13 — MAS/Teoria Organizacional
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| MA-1 | L001, C003 | Frameworks MAS (Cohen–Levesque, MOISE+, contract net) com mais rigor |
| MA-2 | L001, L002 | Okhuysen & Bechky (2009): accountability/predictability/common understanding |
| MA-3 | H003 | Infraestrutura invisível (Star & Ruhleder) + Dourish |

### R14 — Quântica/Relatividade
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| RL-1 | F001 | Tempo global t idealizado nunca declarado como idealização |
| QM-2 | C014 | Sem limite de acessibilidade declarado (Holevo como padrão de exigência) |
| QM-1 | — | Nenhum uso indevido quântico no núcleo (D0) — salvo pela regra anti-pseudociência |

### R15 — Cosmologia/Buracos Negros
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| CS-2 | C006, C004 | Colapso de persistência/observabilidade/acessibilidade/recuperabilidade |
| CS-1 | C015 | Cláusula de blindagem do falseador absorve até o horizonte cosmológico |

### R16 (BOSS) — Multiverso
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| MU-2 | C006, F001 | Persistência como substantivo vs. processo — incoerência com a própria nomenclatura |
| MU-1 | C013 | Fronteira: teoria causal-representacional não se aplica a desconectados (registro) |

### R17 — Adversário Final (a própria TPC)
| Golpe | Proposições | Classe |
|-------|-------------|--------|
| I-1 | todo o corpus | Padrão de imunização adaptativa (universais→"podem"→"candidato") |
| I-2 | H001/HYP-001-U | Válvula UNOBSERVED_PRECURSOR absorve evidência contrária |
| I-3 | C014 | Exclusão ad hoc de sabotagem (o próprio fenômeno de "substituição" deliberada) |
| I-4 | M003, M005 | MET confunde mecanismo/capacidade/métrica |
| I-5 | M004 | EPI/K_C sem método reprodutível |

## Consolidação de dano por proposição (para a página visual)

| Proposição | Dano acumulado (classificação máxima) |
|------------|---------------------------------------|
| LAW-001 (mediação) | D3 — reconstruída (R02, R06, R09, R13, R16) + D4 no postulado geral (R07, R08) |
| LAW-002/004 (modais) | D2 — verdadeiras por um caso |
| LAW-003 (taxonomia) | D2 — mapeável a falhas de sensor/comunicação |
| HYP-001/HYP-001-U | D3 — válvula classificatória + ausência de dados |
| HYP-002 | D2 — viés de medição piloto/controle |
| HYP-003 | D2 — redundante (ETTO/infraestrutura invisível) |
| EO/D(S,t)/F002–F006 | D3 — sem monotonicidade, sem unidade, g/h indefinidas |
| Métricas M002–M005 | D2 — reprodutibilidade (IFX escala dupla, EPI, Slektip) |
| ECO (C010) | D2 — precedida por Reason/ICAO |
| Domínio (C014) | D4 — contraexemplos naturais e biológicos |
| Postulado (C013) | D4 — organização persistente sem representação (Turing 1952) |
| Falseador C015 | D3 — blindagem quase insatisfazível |
| Documentos históricos | D1 — definição morta preservada no DOCUMENTO_CANONICO.md |

## Fontes primárias utilizadas (Regra 20)

Aumann (1976); Axelrod (1984); Beshers & Fewell (2001); Boyd & Richerson (1985); Brewer/CAP + Gilbert & Lynch (2002); Callaway et al. (2000); Chemero (2009); Clark (1996); Cohen & Levesque (1991); Crawford & Sobel (1982); Fischer, Lynch & Paterson (1985); Grosz & Kraus (1996); Hawking (1976); Hollnagel (2009); Holevo (1973); Hutchins (1995); Lamport, Shostak & Pease (1982); May (1973); Mirollo & Strogatz (1990); Motter & Lai (2002); Nelson & Winter (1982); North (1990); Okhuysen & Bechky (2009); Page (1993); Prigogine (1984); Reason (1990); Reynolds (1987); Schelling (1960); Smith (1980); Star & Ruhleder (1996); Turing (1952); Varela, Thompson & Rosch (1991); Walsh & Ungson (1991); Albert, Jeong & Barabási (2000).
