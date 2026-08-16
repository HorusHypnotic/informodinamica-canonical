# MATRIZ DIAGNÓSTICO → OPERA (V0)

**Artefato operacional interno** (não vai ao cliente; vive no repositório privado). Objetivo: mapear `ACHADO → NECESSIDADE → POSSÍVEL CONTINUIDADE`, sempre sob `DIAGNOSIS_FIRST` e sem empurrar produto.

---

## 1. Regra de ouro — DIAGNOSIS_FIRST

O diagnóstico **não existe para empurrar software**. O relatório deve ser completo e útil mesmo que `NEXT_PRODUCT = NONE`. A sequência obrigatória é: achados completos e entregues → **somente depois** a avaliação de continuidade. Um caso sem produto seguinte recebe o mesmo valor completo de diagnóstico. Nunca modificar achados para sustentar uma continuidade.

## 2. Inventário de produtos OPERA realmente existentes (arqueologia, 16/08/2026)

Recuperado do repositório canônico (`produtos/opera-produtos.md`, diretórios `opera/`, `commercial/money-machine-v0.json`, `docs/decisoes/`). Não inventar produto; conceito ≠ produto disponível.

| Produto | Problema que resolve | Maturidade (V0) | Entregável | Estado atual | Preço documentado |
|---|---|---|---|---|---|
| **Copiloto de Obras** | Interação operacional: organizar relatos, evidências e próximos passos sob decisão humana | Software Python com código e testes (`opera/copiloto-obras`); auditorias formais realizadas | Interação/assistência operacional | Repouso relativo à oferta comercial; sem preço publicado | Não publicado |
| **OPERA Atlas** | Evidência: rastreabilidade, estado, contexto e memória operacional | Coleção documental ativa (`HISTORICAL` + transcrições) e snapshot de frontend React | Base documental/operacional de evidência | Documental; sem unidade de venda | Não publicado |
| **OPERA Control** | Diagnóstico interno: registrar/analisar ECO, ICO e Capital Preservado | Capacidade analítica documentada (AUTHORITY, guia ECO); banco ainda incompatível com fórmula de Capital Preservado; IFX bloqueado | Análise ECO/ICO | Desenvolvimento interno; **não é produto pronto de venda** | Não publicado |
| **Obra Flow** | Notas fiscais, pedidos e recebimento de materiais | Repositório + Lovable sincronizados | Aplicação Lovable | Operacional interno/teste; sem unidade comercial definida | Não publicado |
| **REO** | Registro de evidências operacionais (evolução do Checklist Chuva) | Repositório + Lovable sincronizados | Aplicação Lovable | Idem Obra Flow | Não publicado |
| **Smart Cotações** | Cotações, fornecedores, comparação, negociação, memória econômica | Repositório + Lovable; "Compra Real #001" foi experimento interno, não pagamento de cliente | Aplicação Lovable | Lead apenas; unidade de receita indefinida | `UNKNOWN` |
| **Canteiro de Obras Digital** | Presença institucional e comunicação aplicada | Página publicada (Money Path V0 ativo) | Site estático | Ativo como vitrine do diagnóstico | — |
| **Implantação O.P.E.R.A.** (candidato MM) | Levar a capacidade OPERA à rotina da obra | Requer escopo e proposta por caso | Implantação assistida | LEAD_ONLY; sem proposta canônica | Faixa de referência R$3.000–8.000 (não aprovada) |
| **Acompanhamento O.P.E.R.A.** (candidato MM) | Suporte contínuo à operação | Requer escopo, capacidade e contrato | Serviço mensal | LEAD_ONLY | Referência a partir de R$1.500/mês (não aprovada) |

Backlog (não usar como continuidade): Gestão OS, Pedidos COD, StockFlow, Direcione, VagaQuente, BuildFast Delivery.

## 3. Matriz de encaminhamento: ACHADO → NECESSIDADE → POSSÍVEL CONTINUIDADE

Os padrões abaixo são **candidatos**, não regras automáticas. Cada linha exige os 5 critérios da Seção 4 e a validação do owner antes de qualquer sugestão ao cliente.

| Padrão de achado | Necessidade derivada | Possível continuidade | Valor esperado | Elegibilidade |
|---|---|---|---|---|
| Falta de registro operacional (decisões, custos, materiais não documentados) | Memória operacional e evidência estruturada | Opera Atlas / Obra Flow / REO | Menos dependência de memória individual | Sem decisão de compra comercial |
| Divergência de custos / compras fora do planejamento | Controle de cotações e negociação | Smart Cotações | Transparência de preços e fornecedores | Unidade de receita indefinida → lead apenas |
| Perda operacional recorrente (espera, retrabalho, compra emergencial) | Diagnóstico contínuo de ECO/ICO | OPERA Control + Implantação | Redução de perdas recorrentes | Requer escopo/proposta por caso |
| Problema estrutural após diagnóstico pontual | Acompanhamento da execução das prioridades | Acompanhamento O.P.E.R.A. | Execução das P1/P2 com supervisão | Requer escopo, capacidade e contrato |
| Rotina caótica, múltiplas frentes sem dono | Coordenação assistida por IA/humano | Copiloto de Obras | Organização da rotina sob decisão humana | Sem oferta comercial publicada |
| Informação insuficiente mesmo após intake | Evidência adicional ou encerrar | Nenhuma (encerrar bem) | Confiança no que foi possível | Não vender continuidade sem base |

*"Valor esperado" descreve o benefício conceitual; nunca apresentar ao cliente como resultado garantido.*

## 4. Critérios para sugerir continuidade (POTENTIAL_FIT / STRONG_FIT)

Uma continuidade só pode ser sugerida se **todos** os cinco critérios estiverem satisfeitos, com justificativa registrada:

1. Problema **observado** ou fortemente sustentado no diagnóstico (não mera possibilidade);
2. Capacidade OPERA **existente** e compatível (ver tabela da Seção 2 — backlog não conta);
3. Benefício **explicável** ao cliente em linguagem do problema dele;
4. **Sem conflito** com os limites profissionais (não vira laudo/auditoria);
5. O cliente **demonstra interesse ou necessidade correspondente** (pergunta aberta — nunca assunção).

## 5. CONTINUATION_STATUS (por diagnóstico)

Valores: `NONE` (nenhuma base ou cliente sem interesse), `POTENTIAL_FIT` (critérios 1–4, cliente ainda não se manifestou), `STRONG_FIT` (os 5 critérios, cliente demonstrou interesse), `INSUFFICIENT_EVIDENCE` (não dá para concluir nem descartar — caso tratado como `NONE` na prática). A existência de um problema **não implica automaticamente** venda de produto.

## 6. NEXT_BEST_ACTION (por diagnóstico)

Registrado internamente no anexo QA do relatório e no LOG: `ENCERRAR`, `PEDIR_INFORMACAO`, `ACOMPANHAR_DEPOIS` (ex.: retomar em X dias), `APRESENTAR_CAPACIDADE_OPERA`, `PROPOSTA_ESPECIFICA` (escopo + preço a definir), `OUTRO`. Deve nascer da evidência do caso, não do desejo de receita.

## 7. Como apresentar continuidade ao cliente (linguagem não coercitiva)

Nunca: "Você precisa contratar o OPERA Control." Estrutura preferida:

> "Durante o diagnóstico apareceu X. Hoje isso está produzindo Y. Existe uma frente do O.P.E.R.A. voltada especificamente para esse tipo de problema. Se fizer sentido, posso te mostrar separadamente como funcionaria no seu caso."

O diagnóstico **já terminou**. A continuidade é outra decisão, outra conversa, outro canal/etapa. Se o cliente não responder à abertura, **não insistir** — registrar `CONTINUATION_STATUS` e encerrar bem (isso também é valor e também alimenta a evidência).

## 8. VALUE_SIGNAL e upsell real (o que medir)

Após entrega: "Depois de ler o diagnóstico, qual decisão ficou mais fácil de tomar?" — registrar literalmente. `VALUE_SIGNAL`: presença de resposta com decisão concreta nomeada (forte), elogio genérico sem decisão (fraco — **não** interpretar como disposição a pagar).

Pipeline de upsell a medir nos primeiros casos, sem assumir que R$197 será funil de produto maior:

`R$197 (diagnóstico) → necessidade descoberta → continuidade oferecida? → aceita? → valor? → receita?`

Registrar no LOG por OPP: continuidade oferecida (sim/não), base (qual critério), resposta do cliente, valor, receita. Hipótese de funil permanece **UNKNOWN** até evidência.
