# Uma Metodologia para Análise da Persistência da Coordenação em Sistemas Sociotécnicos

**Autores:** Programa de Pesquisa TPC  
**Periódico Alvo:** Journal of Systems and Software (JSS)  
**Estilo Bibliográfico:** ACM / IEEE  

---

## Abstract
Sociotechnical systems—such as software pipelines, healthcare teams, and industrial operations—depend on continuous coordination to maintain functional coherence. Traditional analytical frameworks often treat coordination statically, failing to capture the temporal degradation between representations and real-world phenomena. This paper introduces a comprehensive methodology for analyzing coordination persistence based on the Theory of Coordination Persistence (TPC). The framework comprises four modular protocols (MET-006 to MET-009) governing structural anatomy, pathological degradation, engineering design, and continuous calibration. We operationalize these protocols through informodynamic latencies ($T_0$–$T_4$) and a tripartite entropy taxonomy (Transmission, Coupling, and Interface Entropy). Furthermore, we document a reproducible reference laboratory implemented in a CI/CD pipeline (EXP-001) comprising eight experimental conditions. Our findings demonstrate how internal system coherence can mask real-world decoupling ("false greens") and establish actionable mechanisms for meta-coupling.

**Keywords:** Coordination persistence, sociotechnical systems, CI/CD, informodynamic latencies, reproducible laboratory, software engineering.

---

## 1. Introduction
*(Consolidated from sections/01-introduction.md)*
Sistemas sociotécnicos dependem de coordenação para manter sua coerência funcional, definida como o alinhamento contínuo entre ações de agentes e representações compartilhadas \cite{Hutchins1995, Weick1995}. A fragilidade desse alinhamento gera falhas inesperadas e riscos críticos \cite{Hollnagel2012, Dekker2014}. Este artigo apresenta uma metodologia para análise da persistência da coordenação (MET-006 a MET-009) e um laboratório reproduzível (EXP-001) \cite{Kitchenham2002}.

---

## 2. Positioning and Scope
*(Consolidated from sections/02-positioning.md)*
Este trabalho posiciona-se em diálogo com a Cognição Distribuída \cite{Hutchins1995}, a Engenharia de Resiliência \cite{Hollnagel2012} e a Engenharia de Software Empírica \cite{Kitchenham2002}, delimitando explicitamente seu escopo e fronteiras conceituais.

---

## 3. Methodology (MET-006 to MET-009)
*(Consolidated from sections/03-methodology.md)*
A metodologia engloba:
- **MET-006:** Anatomia da Coordenação.
- **MET-007:** Patologia da Coordenação.
- **MET-008:** Engenharia da Coordenação.
- **MET-009:** Calibração e Validação, incluindo as latências informodinâmicas ($T_0$ a $T_4$) e as três classes de Entropia (Transmissão, Acoplamento e Interface).

---

## 4. Laboratory (EXP-001)
*(Consolidated from sections/04-laboratory.md)*
O laboratório de referência em CI/CD (FastAPI e GitHub Actions) executou oito condições experimentais, avaliando falsos verdes, cegueira de detector e ilusões de calibração \cite{Kitchenham2002}.

---

## 5. Scientific Governance
*(Consolidated from sections/05-governance.md)*
A governança da TPC protege o programa através de quarentena conceitual, critérios de promoção baseados em necessidade explicativa e registro formal de decisões arquiteturais (DECs).

---

## 6. Limitations
*(Consolidated from sections/06-limitations.md)*
As limitações incluem o escopo controlado do ambiente de laboratório, simulações estruturadas em outros domínios e a presença de dados censurados em cenários de produção.

---

## 7. Future Work and Conclusion
*(Consolidated from sections/07-next-steps.md and 08-conclusion.md)*
O programa avança para o RP-002 (Estudo de Caso) e RP-003 (Revisão da Literatura), oferecendo à comunidade um arcabouço rigoroso, modular e reproduzível para a ciência da coordenação.

---

## References
*(Consolidated from bibliography.bib)*
