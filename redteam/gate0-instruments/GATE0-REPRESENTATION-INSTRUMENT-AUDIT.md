# GATE0-REPRESENTATION-INSTRUMENT-AUDIT — Auditoria do instrumento representacional H-EO

**Data:** 18/08/2026 · **Adversário B** · **SHA-base:** fd1accf · **Objetos:** TPC-CONSTRUCT-VALIDITY.md, TPC-LEAKAGE-AUDIT.md, H-EO.

## 1. A pergunta central

> «Um avaliador consegue medir o estado da representação sem saber o que aconteceu depois?»

O ataque parte da definição de cada atributo candidato (P, F, U, C, R, X) e classifica a fonte informacional mínima de cada medida. Importante: esta auditoria **não presume** seis dimensões, nem a fusão P+U, nem R como metadado — essas permanecem hipóteses do Gate 1. Gate 0 verifica apenas: definível, observável, não circular, potencialmente distinguível.

## 2. Classificação por atributo

| Atributo | Definição operacional (congelada) | Classificação | Justificação |
|----------|-----------------------------------|---------------|--------------|
| P | Data de criação/última existência continuada do artefato | **PRE-OUTCOME OBSERVABLE** | Apenas registros datados do artefato; risco residual: retrodatação (ver R1) |
| F | Distância ao referente | **DEPENDS ON RESEARCHER JUDGMENT** (forte) | O referente O(t) raramente é observável; escolher O exige julgamento do pesquisador — risco de escolha do referente ser influenciada pelo outcome conhecido; exige protocolo fixo de seleção de referente por tipo de artefato, pré-registrado |
| U | Data da última atualização | **PRE-OUTCOME OBSERVABLE** | Registrada pelo sistema; sem dependência futura |
| C | Distância entre pares de artefatos | **DEPENDS ON RESEARCHER JUDGMENT** (moderado) | O inventário {Sᵢ} e o emparelhamento são escolhas do pesquisador; o ataque é: "emparelhar artefatos que divergem" vs. "emparelhar artefatos que concordam" produz C diferentes para o mesmo estado — exige inventário e emparelhamento pré-registrados por tipo de episódio |
| R | Completude de metadados | **PRE-OUTCOME OBSERVABLE** | Contagem; mas a auditoria de Gate 0 registra a objeção: R como dimensão ou infraestrutura é indeterminável neste gate (Gate 1) — aqui, classificada apenas como **definível e observável** |
| X | Erros de interpretação / consultas | **DEPENDS ON ECO** | "Erros de interpretação" são classificações de falha interpretativa — operacionalmente o mesmo objeto do desfecho. Confirma a conclusão da auditoria de leakage: X não pode entrar no vetor de preditores. |

## 3. X — análise das alternativas A–D (seção 7 da missão)

As quatro opções foram testadas contra justificativa metodológica, não elegância:

- **A (X permanece atributo representacional):** rejeitada — a definição operacional "erros de interpretação/consultas" é outcome-derived; mantê-la reintroduz o leakage que a auditoria anterior já documentou.
- **B (X migra para nível I):** parcialmente correta mas insuficiente — o nível I não é apenas X: um instrumento de interpretação precisa medir *capacidade interpretativa* (competência, atenção, acesso ao artefato), não apenas erros cometidos. Medir só erros herda o mesmo viés.
- **C (X é removido provisoriamente):** correta como decisão mínima — antes do piloto, nenhum componente de interpretação entra no vetor de preditores.
- **D (X é dividido):** é o complemento metodologicamente necessário de C: os dois componentes de X são separados — **X₁ = registro interpretativo** (quem consultou o quê, quando — observável pre-outcome, movido para o nível I sem julgamento de erro); **X₂ = classificação de erro** (julgamento "isso foi um erro de interpretação?" — isso é um ECOA com atribuição representacional, ou seja, pertence à Camada B do desfecho, não ao preditor).

**Decisão:** C + D. O vetor de preditores do piloto (G1) contém apenas P, U, F (com referente pré-registrado), C (com inventário/emparelhamento pré-registrado) e R (como moderador registrado). X₁ é registrado como covariável de acesso/uso; X₂ é reclassificado como subclasse de ECOB. O instrumento de interpretação completo (I) fica como objeto futuro do programa, fora do vetor preditivo do piloto.

## 4. Dependência de julgamento do pesquisador: o ataque que resiste

Dois atributos (F e C) dependem de escolhas do pesquisador. Isso não os destrói — mas **limita o que Gate 0 pode garantir**: o instrumento H-EO é definível, observável e não circular **se e somente se** as escolhas (referente de F; inventário e emparelhamento de C) forem pré-registradas antes da observação dos outcomes. Sem pré-registro dessas escolhas, um Pesquisador Verde e um Vermelho com os mesmos dados produziriam medidas diferentes — exatamente o teste da seção 15 desta missão (verificado nos casos sintéticos). **Condição de passagem do Gate 0 para H-EO: protocolo de seleção de referentes e de emparelhamento anexado antes do campo. Sem isso: FAIL.**

## 5. Circularidade intra-atributo

Verificação adicional: nenhum atributo redefine-se pelo outro nem pelo desfecho após a remoção de X. P, U, R são contagens datadas; F usa referente declarado; C usa pares declarados. O risco residual é colinearidade (P↔U, F↔C), mas colinearidade não é circularidade — pertence ao Gate 1 (dimensionalidade), não a este gate.

## 6. Veredito parcial do Adversário B

**H-EO sobrevive a Gate 0 condicionado a pré-registro das escolhas de julgamento (referente, inventário, emparelhamento) e à remoção/divisão de X (C+D).** O vetor de preditores do piloto fica com cinco componentes: P, U, F, C, R(+moderador), mais X₁ como covariável de uso. Se o pré-registro não existir antes do campo, o instrumento não é aplicável de forma independente — nesse cenário, Gate 0 = FAIL.
