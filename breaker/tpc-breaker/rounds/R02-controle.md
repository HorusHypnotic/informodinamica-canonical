# ROUND 02 — TEORIA DE CONTROLE

**Status:** concluído
**Confiabilidade geral:** ALTA

## Proposições atacadas
TPC-L001, TPC-L004, TPC-P005, TPC-P009, TPC-F005, TPC-C007 (Fliflexação), TPC-C014 (domínio).

## Ataques

### CT-1. Reconstrução integral sem conceito novo (D3, golpe central)
Toda a malha TPC re-mapeia 1:1 para controle por realimentação:

| TPC | Controle |
|-----|----------|
| Representação operacional (S) | Variável de processo medida (sensor/setpoint documental) |
| EO(S,t) (P,F,U,C,R,X) | Vetor de estado estimado |
| Deformação (IDR-0004) | Erro de medição / deriva de sensor / atraso de transporte |
| K_R | Observabilidade + controlabilidade do laço |
| K_C | Erro de regulação (performance do laço fechado) |
| ECO | Violação de setpoint / falha de controle |
| Fliflexação (IDR-0007) | Manutenção/calibração de sensores + re-sintonia do controlador |
| Slektip | Memorização integral / feedforward em ciclos repetidos |
| ICO | Integral do erro ponderado (ITAE/ISE) |
| LAW-003 (mecanismos de deformação) | Classificação de falhas de sensor: perda de sinal, atraso, offset, ruído, falha parcial |

Nenhum fenômeno registrado no repositório (os dois casos reais) exige conceito além do laço de realimentação. O MDEO é explicitamente "um framework de otimização" — i.e., controle ótimo (FUNDAMENTOS_MATEMATICOS.md §3.6). A pergunta do prompt — «TPC acrescenta alguma capacidade explicativa ou apenas renomeia controle?» — recebe resposta condicional: como teoria de projeto de sistemas, a TPC não acrescenta nada sobre o que controle já explica; como taxonomia aplicada, ela seleciona um vocabulário mais amigável a não-engenheiros, o que é ganho pedagógico, não explicativo.

**Dano: D3** — LAW-001 e o núcleo mediacional são reconstruíveis por observabilidade/realimentação dentro do domínio declarado.

### CT-2. A "mediação representacional" é uma tese de observação, não de controle (defesa do ataque parcial)
Contra-golpe interno: a TPC afirma que coordenação é mediada por representações, não que o sistema seja controlável. Laços de controle existem sem representação simbólica (termostato). Mas a ONTOLOGIA.md exclui do domínio "sistemas puramente instintivos ou reflexos (sem representação estável)" — exatamente os sistemas controláveis sem representação. Ou seja, o domínio foi desenhado para excluir o contraexemplo mais forte do controle. Isso não é erro lógico, mas revela que a TPC é uma sub-teoria de controle aplicada a sistemas que por construção têm representação — o que reforça CT-1.

**Dano: D1** adicional (revelação de desenhos de domínio defensivos).

### CT-3. Estabilidade e setpoints: a TPC não distingue os três regimes clássicos (D1)
Controle distingue rejeição de perturbação (regulação), seguimento de referência (servo) e adaptabilidade. A TPC colapsa os três em "coordenação persistente". Um canteiro que segue um cronograma (servo) e um canteiro que resiste a chuvas (regulação) falham por razões dinâmicas distintas; a taxonomia de deformação única não discrimina. Sem essa discriminação, D(S,t) não pode orientar intervenção específica — exatamente o que o controle faz com a decomposição de modos.

**Dano: D1.**

## Melhor defesa possível
A TPC trata de sistemas onde o "sensor" é um artefato social interpretado (documento, cronograma) e o "erro" não é físico mas interpretativo; a literatura de controle quase não modela deriva interpretativa de símbolos sociais. Esse é um problema real de fronteira. Porém, hoje a TPC não oferece formalismo próprio para ele — apenas a promessa.

## Julgamento
| Item | Valor |
|------|-------|
| Melhor ataque | CT-1: reconstrução 1:1 por realimentação/observabilidade |
| Melhor defesa | Interpretação de artefatos sociais como "sensores" não coberta por controle clássico |
| Dano | D3 (8) + D1 + D1 = **10** |
| Bônus | +10 por formalização válida da correspondência (tabela mapeamento) |
| Confiança | 0.75 |
| Questões abertas | Se a TPC formalizar "erro interpretativo de símbolos sociais" como objeto próprio, o golpe CT-1 se dissolve |

## Fontes
ONTOLOGIA.md §1 (domínio); FUNDAMENTOS_MATEMATICOS.md §3.6 (MDEO = otimização); CASOS_REAIS.md; Åström & Murray, *Feedback Systems* (referência padrão).
