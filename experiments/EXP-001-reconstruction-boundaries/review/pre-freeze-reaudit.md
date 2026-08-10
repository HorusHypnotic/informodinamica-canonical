# Reauditoria interna dos bloqueadores — B3.6

**Escopo:** somente F3, F5, F6, F10, logging, cegamento e aprendizagem transversal.  
**Fixture auditado:** `0.2.0-candidate`  
**Promoção posterior sem mudança substantiva:** `0.2.0-frozen`  
**Execuções observadas:** zero.

## Resultados

| Critério | Resultado | Evidência |
|---|---|---|
| F3 — sham adequado | PASS COM RESSALVA | C3 e sham têm três seções, onze bullets, mesma ordem, fatos equivalentes e extensão aproximada. Permanecem diferenças constitutivas de conectivos e densidade simbólica. |
| F5 — grafo semanticamente fechado | PASS | Cada instância possui definição de ação material, uma classe obrigatória, equivalências finitas, precondições e regra de adjudicação. Resposta nova não é excluída automaticamente. |
| F6 — C4-A interpretável | PASS | A inferência primária foi estreitada para estado obsoleto; atraso, substituição e supressão de evidência são exploratórios. |
| F10 — anonimização e neutralização | PASS | Quinze pacotes opacos foram materializados, têm hashes verificados e passaram por busca automatizada de termos proibidos. |
| Logging | PASS | O schema referencia input, prompt, pacote, mapa, ambiente, executor, modelo, parâmetros, output, rubricas, avaliação e adjudicações. |
| Cegamento | PASS COM RESSALVA | Receptor e avaliador primário recebem camadas cegas; operador/custodiante permanece não cego. Classificação correta: duplo-cego parcial. |
| Aprendizagem transversal | PASS COM RESSALVA | Regra de uma execução total por receptor foi formalizada. Isomorfismo e validade externa limitada permanecem. |

## Verificações automáticas

- 3 instâncias e 15 condições preservadas;
- 39 IDs proposicionais preservados;
- 15 pacotes receptor-visible materializados;
- hashes dos pacotes correspondentes ao conteúdo;
- nenhum termo experimental proibido nos pacotes cegos materializados;
- 3 grafos com classes semânticas;
- nenhuma execução, output ou resultado experimental;
- manifesto cobre todos os arquivos do fixture, exceto a si próprio por desenho.

## Riscos residuais aceitos para piloto técnico

- conectivos e símbolos relacionais produzem densidade textual inevitavelmente diferente entre C3 e sham;
- prompt estruturado pode reduzir diferenças e interagir com C3;
- C4-F continua combinando fragmentação, proximidade, custo de busca e integração;
- isomorfismo limita generalização;
- avaliações semânticas ainda exigirão concordância e adjudicação humanas futuras.

Nenhum risco crítico permanece. Os riscos altos da auditoria B3.5 foram eliminados ou mitigados a nível aceitável para revisão humana de um piloto técnico.
