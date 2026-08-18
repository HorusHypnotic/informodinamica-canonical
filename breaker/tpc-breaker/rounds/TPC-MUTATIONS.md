# MUTAÇÕES CANDIDATAS — Reparos coletados após o campeonato (não incorporados à teoria)

**Regra 15 do campeonato:** cada reparo testado em cinco critérios. Nenhum reparo foi aceito; todos são candidatos.

## Inventário de mutações

| ID | Reparo | Corrige | Quebra | Reduz falsificabilidade? | Aumenta complexidade? | Ad hoc? |
|----|--------|---------|--------|--------------------------|------------------------|---------|
| MUT-001 | Substituir ECO por definição externa independente (protocolo de registro de falhas tipo ICAO/reason) com critérios de abertura/fechamento | Golpes R10-IN3, R16 (ausência de baseline) | Nada central | Não — aumenta | Leve | Não |
| MUT-002 | Fixar escala única do IFX (0–1) com rubricas e evidência mínima por componente | R00-AZ2, R16 (IFX duas escalas) | Nada | Não | Nenhuma | Não |
| MUT-003 | Especificar EPI com método de baseline (contrafactual por obra pareada) e intervalos de incerteza | R00-AZ2, R16 (Capital Preservado não reprodutível) | Nada | Não | Moderada | Não |
| MUT-004 | Definir K_R via função teste padronizada (desempenho em bateria de tarefas com/sem a representação) | R01-SH3, R16 (g indefinida) | Nada — operacionaliza a peça central | Não | Alta | Parcial |
| MUT-005 | Substituir D(S,t) aditivo por família de modelos (aditivo/multiplicativo/limiar) com comparação formal (AIC/validação cruzada) | R12-SD2 (não-monotonicidade), R00-AZ2 | Modelo vigente viraria hipótese comparada | Não | Alta | Não (o próprio repositório já propõe) |
| MUT-006 | Reclassificar Slektip como objeto operacional (SLK) e lessons-learned como sinônimo controlado, com métrica derivada (taxa de adoção de Slektips) | R00-AZ3, R10-IN1, R16 (duplicação) | Nada | Não | Leve | Não |
| MUT-007 | Adicionar "janela de inconsistência" W(S,t) como 7º atributo de EO (atraso de propagação do estado entre agentes) | R14-RL1 (tempo global idealizado), R03-DS3 | Nada | Não | Leve | Parcial |
| MUT-008 | Introduzir conceito "persistência morta" (representação persistente não observável/consultada) e distinguir os 4 modos de CS-2 | R15-CS2 | Nada | Não | Leve | Não |
| MUT-009 | Remover exclusão ad hoc de "violência/sabotagem/restricões legais extremas" do domínio; tratar ataque deliberado a representações (desinformação) como caso de deformação por substituição | R16 (exceções ad hoc) | HYP-001 fica mais exposta a falsificação | AUMENTA falsificabilidade | Nenhuma | Não |
| MUT-010 | Unificar falseadores: eliminar C2/C3 do DOCUMENTO_CANONICO.md (versão antiga categórica) e manter apenas a versão condicionada v0.8 | R16 (dois sets de falseadores) | Nada — limpa derivas históricas | Levemente reduz (cláusulas condicionadas mantêm-se) | Nenhuma | Não |
| MUT-011 | Publicar revisão sistemática da originalidade frente a CSCW/Hutchins/Nelson-Winter/Okhuysen-Bechky (a que o próprio autor se compromete em TPC.md §4.1) | R09-NC1, R13-MA2, R16 | Nada | Não | Alta (trabalho externo) | Não |
| MUT-012 | Transformar a próxima hipótese do Doppelgänger em protocolo registrado: medições prospectivas de EO predizem ECOs com variância residual sobre RPN, p<0.05 | Resíduo Doppelgänger, R00-AZ | Nada | Não | Alta | Não |

## Mutações REJEITADAS na triagem (registradas para não ressurgirem sorrateiramente)

| ID | Reparo | Motivo da rejeição |
|----|--------|--------------------|
| MUT-013 | Estender "representação" a regularidades implícitas (genoma, feromônios, reflexos) para absorver contraexemplos biológicos | Transforma TPC em trivialmente verdadeira (toda regularidade vira representação) — derrota por banalização |
| MUT-014 | Redefinir domínio como "sistemas com representação verificável" tautologicamente | Imunização total; a teoria ficaria verdadeira por definição do domínio — D5 potencial |
| MUT-015 | Rebaixar HYP-001 a "falhas são às vezes precedidas por deformação" | Transforma a hipótese central em frase vazia; elimina previsibilidade |
| MUT-016 | Absorver o contraexemplo Paxos/raft redefinindo regras de protocolo como representação | Movimentação de trave em pleno combate (viola Regra 3) — a redefinição seria legítima SÓ se feita pós-campeonato com mudança explícita de domínio |

## Teste dos sobreviventes nos cinco critérios

As mutações MUT-001 a MUT-012 passam no critério de não-transformação-em-trivialidade: nenhuma converte a TPC em verdade analítica, e MUT-009 inclusive AUMENTA a falsificabilidade. Nenhuma delas, porém, altera o veredito central do campeonato: o núcleo mediacional é reconstruível por teorias existentes (coverage 81–99%), e o que resta de original é o programa empírico (MUT-012), não um mecanismo novo.
