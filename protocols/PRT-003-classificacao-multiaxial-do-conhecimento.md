# PRT-003 — Protocolo de Classificação Multiaxial do Conhecimento

**Versão:** 0.1.0  
**Data:** 03/08/2026  
**Autor:** Eduardo Martins  
**Status:** Draft normativo — aguardando adoção formal

---

## 1. Objetivo

Este protocolo define como registrar a maturidade de conceitos, proposições, hipóteses, métricas, modelos, procedimentos e implementações da Informodinâmica Aplicada e do ecossistema O.P.E.R.A.

Seu propósito é impedir que dimensões distintas sejam reduzidas a uma única etiqueta de maturidade. A posição institucional de um artefato, sua precisão formal, sua sustentação empírica e sua implementação operacional devem ser registradas separadamente.

---

## 2. Princípio institucional

> Nenhum artefato pode ter sua maturidade representada adequadamente por um único status quando governança, formalização, evidência e implementação evoluem de maneira independente.

Aplicam-se as seguintes distinções:

```text
Canônico ≠ verdadeiro
Formalizado ≠ validado
Implementado ≠ corroborado
Obsoleto ≠ refutado
```

---

## 3. Escopo

O protocolo aplica-se a:

- **IDR** — conceitos e entidades da ontologia;
- **LAW** — proposições estruturantes;
- **HYP** — hipóteses de pesquisa;
- **MET** — métricas e instrumentos;
- **PRT** — protocolos, quando sua avaliação multiaxial for pertinente;
- modelos matemáticos e computacionais;
- procedimentos experimentais;
- aplicações e implementações no ecossistema O.P.E.R.A.;
- artefatos de pesquisa que proponham conhecimento para o Núcleo Canônico.

O PRT-003 não substitui o PRT-001. O PRT-001 governa o ciclo de vida institucional dos IDs; o PRT-003 impede que esse ciclo seja confundido com formalização, evidência ou maturidade operacional.

---

## 4. Eixos obrigatórios

### 4.1 Eixo G — Governança

Registra a posição institucional do artefato segundo o PRT-001.

| Estado | Significado |
|---|---|
| **Draft** | Em elaboração; ainda não é referência oficial. |
| **Experimental** | Admitido para pesquisa ou aplicação com ressalvas explícitas. |
| **Canônico** | Aprovado formalmente como referência do projeto. Não implica verdade científica. |
| **Obsoleto** | Substituído institucionalmente e preservado para rastreabilidade. Não implica refutação. |

### 4.2 Eixo F — Formalização

Registra a precisão e a completude da definição ou do modelo.

| Estado | Critério mínimo |
|---|---|
| **Intuitivo** | Existe descrição compreensível, mas sem definição operacional suficiente. |
| **Definido** | Possui definição, domínio, relações e critérios de distinção declarados. |
| **Formalizado parcialmente** | Parte relevante possui estrutura lógica, matemática ou computacional, mas restam componentes não especificados. |
| **Formalizado** | Variáveis, relações, domínio, condições, alternativas e critérios de aplicação estão explicitados de forma verificável. |

Formalização não implica correção, validade externa ou sustentação empírica.

### 4.3 Eixo E — Evidência

Registra a relação entre o artefato e a evidência disponível.

| Estado | Critério mínimo |
|---|---|
| **Não testado** | Não existe teste empírico adequado concluído. |
| **Em teste** | Existe protocolo ou coleta ativa, ainda sem conclusão suficiente. |
| **Corroborado provisoriamente** | Recebeu suporte em estudo documentado, com domínio e limitações declarados. |
| **Corroborado por replicação** | Recebeu suporte em estudos independentes ou replicações pertinentes. |
| **Enfraquecido** | Evidências relevantes reduziram sua plausibilidade ou alcance. |
| **Refutado** | Falhou sob critérios de refutação previamente declarados, no domínio testado. |

Toda corroboração é limitada ao domínio, ao método, à amostra e às condições do estudo. Corroboração não equivale a prova definitiva.

### 4.4 Eixo O — Operacional

Registra a maturidade da implementação ou do uso. Deve ser preenchido quando o artefato possuir manifestação operacional; caso contrário, usa-se **Não aplicável**.

| Estado | Critério mínimo |
|---|---|
| **Não aplicável** | O artefato não requer implementação operacional. |
| **Não implementado** | Há definição ou especificação, mas nenhuma implementação verificável. |
| **Prova de conceito** | Demonstração restrita da possibilidade técnica. |
| **Protótipo** | Implementação funcional para exploração, ainda sem operação controlada suficiente. |
| **Piloto** | Uso delimitado com usuários, dados ou processos reais e monitoramento explícito. |
| **Produção controlada** | Uso real com escopo, riscos, rollback e supervisão definidos. |
| **Produção estável** | Operação recorrente com evidências de confiabilidade e manutenção. |
| **Descontinuado** | Implementação retirada de uso e preservada apenas para histórico. |

Uma escala TRL pode ser registrada como metadado complementar, desde que seus critérios e a adaptação ao domínio sejam documentados. TRL não substitui o Eixo O.

---

## 5. Independência dos eixos

1. Os quatro eixos evoluem independentemente.
2. Nenhum estado em um eixo permite inferir estado em outro.
3. Um artefato canônico pode permanecer não testado.
4. Um artefato experimental pode estar completamente formalizado.
5. Uma implementação em produção pode executar um modelo ainda não corroborado.
6. Um resultado corroborado pode permanecer fora do Núcleo Canônico até decisão de governança.
7. Um artefato obsoleto pode conservar valor histórico e evidência favorável no domínio em que foi estudado.

---

## 6. Registro mínimo obrigatório

Toda classificação deve registrar:

- identificador e nome do artefato;
- estado em cada eixo aplicável;
- data da avaliação;
- responsável pela avaliação;
- justificativa verificável;
- fontes ou evidências utilizadas;
- domínio e limitações;
- classificação anterior, quando houver mudança.

Exemplo:

```yaml
id: IDR-0008
nome: Capital Preservado
maturidade:
  governanca: experimental
  formalizacao: formalizado_parcialmente
  evidencia: nao_testado
  operacional: prototipo
avaliado_em: 2026-08-03
responsavel: Eduardo Martins
dominio: construção civil
fontes:
  - GLOSSARIO_CANONICO.md
  - metrics/MET-004-Capital-Preservado.md
  - opera/control/
justificativa: >-
  O conceito integra o vocabulário experimental e possui fórmula candidata e
  protótipo, mas ainda não apresenta calibração ou corroboração empírica.
```

---

## 7. Regras de transição

1. Toda mudança deve ser datada e justificada.
2. Avanços no Eixo E devem apontar para protocolo, dados, análise e resultado reproduzível.
3. Avanços no Eixo O devem apontar para implementação e evidência de uso compatíveis com o estado declarado.
4. Avanços no Eixo F devem registrar quais ambiguidades, variáveis ou relações foram resolvidas.
5. Mudanças no Eixo G continuam submetidas ao PRT-001 e à Constituição.
6. Regressões são permitidas e obrigatórias quando nova evidência ou auditoria invalidar a classificação anterior.
7. A classificação anterior não deve ser apagada; deve permanecer reconstruível pelo Git, manifesto ou histórico próprio.
8. Classificações sem fonte ou justificativa são consideradas **não verificadas** e não podem fundamentar promoção de maturidade.
9. Toda mudança em qualquer eixo deve citar explicitamente o fundamento que autoriza a nova classificação, com localização verificável sempre que disponível: documento, versão, seção, relatório, conjunto de dados, commit ou implementação.
10. Toda mudança deve identificar o responsável pela avaliação e, quando houver aprovação formal, a autoridade decisória e o registro da decisão. O PRT-002 somente deve ser citado quando a mudança depender de cartografia epistemológica ou fundamento externo; ele não aprova automaticamente transições de evidência ou operação.

### 7.1 Registro de mudança

O registro mínimo de uma transição deve permitir responder: **o que mudou, por que mudou, com base em quê, quando e por decisão de quem?**

```yaml
artefato: IDR-0012
eixo: evidencia
estado_anterior: em_teste
estado_novo: corroborado_provisoriamente
data: 2026-08-03
fundamento:
  documento: RELATORIO_VALIDACAO_2026_02.md
  versao: 1.0.0
  secao: "4.3"
  commit: "<sha-do-commit>"
responsavel_avaliacao: "<nome>"
autoridade_decisoria: "<pessoa, colegiado ou protocolo aplicável>"
decisao: "<registro da aprovação>"
limitacoes:
  - "Corroboração restrita ao domínio e à amostra do estudo."
```

---

## 8. Critérios contra inferências indevidas

As seguintes inferências são proibidas sem evidência adicional:

| Observação | Inferência indevida |
|---|---|
| Está no GitHub | Funciona ou está validado |
| Está na Constituição | É verdade científica |
| Possui equação | Está formalizado completamente ou comprovado |
| Está implementado | O conceito foi corroborado |
| Foi usado em um piloto | É generalizável |
| Foi corroborado em um domínio | Aplica-se a todos os domínios |
| Foi refutado em uma condição | É necessariamente falso em qualquer domínio |

---

## 9. Relação com a governança

```text
Constituição
    define autoridade e princípios

PRT-001
    governa IDs e ciclo institucional

PRT-002
    governa fundamentos externos e fronteiras epistemológicas

PRT-003
    governa a classificação multiaxial da maturidade

Protocolos experimentais
    produzem e avaliam evidência

Git e manifestos
    preservam o histórico das classificações
```

---

## 10. Adoção e implantação

Para sair de **Draft**, o PRT-003 deverá:

1. ser aplicado a pelo menos um lote completo de conceitos ou artefatos;
2. receber revisão humana documentada;
3. demonstrar compatibilidade com PRT-001 e com a Constituição;
4. registrar ambiguidades encontradas durante a aplicação;
5. definir, antes da primeira release que o adotar, onde os metadados multiaxiais serão armazenados;
6. ser incluído no manifesto da release correspondente.

Até essa adoção, classificações produzidas segundo este protocolo devem ser apresentadas como avaliações candidatas.

---

## 11. Decisão de origem

O PRT-003 resulta da revisão do Lote 01 — Fundamentos da TPC. A revisão identificou que uma escala única misturava posição institucional, precisão formal, evidência e implementação. O protocolo preserva a identidade dessas dimensões e impede que avanços em uma sejam apresentados como avanços automáticos nas demais.

---

**Versão:** 0.1.0  
**Data:** 03/08/2026  
**Status:** Draft normativo — aguardando adoção formal
