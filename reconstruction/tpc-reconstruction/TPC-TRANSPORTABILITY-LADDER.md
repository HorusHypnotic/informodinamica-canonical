# TPC TRANSPORTABILITY LADDER — Estratégia de validade externa

**Data:** 18/08/2026 · **Princípio (seção 22 da missão):** nenhum resultado de obras pode ser generalizado automaticamente para saúde, software, indústria, logística, finanças ou "qualquer sistema sociotécnico". Cada salto exige nova evidência.

## 1. A escada

| Nível | Salto | Evidência exigida |
|-------|-------|--------------------|
| L0 | Mesma obra / mesma população | Replicação interna (validação temporal fora da amostra) |
| L1 | Outras obras da mesma empresa | Replicação com mesma cultura documental; testar intercepto por obra |
| L2 | Outras empresas do mesmo setor | Replicação com novos clusters; reestimativa de ICC |
| L3 | Tipos diferentes de obra (residencial → industrial; pequeno → grande porte) | Testar moderadores de tipo de obra; revalidação de construto de EO |
| L4 | Setor operacional vizinho (logística, manufatura, manutenção industrial) | Replicação do protocolo ECP-V0 adaptado; revalidação dos atributos EO (relevância pode mudar por domínio) |
| L5 | Domínio distante (saúde, software, finanças) | Replicação completa com instrumentos revalidados |

## 2. Regras de uso

Um resultado em nível Lk **não autoriza** afirmações em Lk+1 sem replicação explícita. Toda publicação de resultado deve declarar o nível da escada em que a evidência foi produzida. A afirmação "a TPC vale para sistemas sociotécnicos em geral" é de nível **L5+ sem nenhuma evidência** — proibir até que L2 exista.

## 3. Parametrização local (seção 23 da missão)

A escada é compatível com a hipótese de que o **mecanismo é transportável enquanto a parametrização é local**: pesos αᵢ, escalas de atributos, janelas temporais, atributos relevantes e tipos de ECO podem variar por domínio sem que o mecanismo deixe de valer. Consequência prática: nos saltos L3–L4, a comparação não é "o mesmo modelo funciona?", mas "o mesmo mecanismo (EO deforma → risco sobe) sobrevive com recalibração local?". Não confundir mecanismo transportável com métrica universal: D(S,t) com pesos fixos de canteiro aplicado a software é erro de transportabilidade, não teste do mecanismo.

## 4. O que sabemos hoje

Todos os casos documentados pela TPC (CASOS_REAIS.md) são retrotivos, dentro de um único contexto empresarial — evidência no máximo **L0 (e fraca, por desenho)**. Nenhuma afirmação transportável da TPC existe hoje. O nível L0 genuíno (replicação interna prospectiva com validação temporal) ainda não foi alcançado por nenhum estudo TPC.
