# Contrato V0 — sinal mínimo do lado satisfeito

Status: desenho experimental. Nenhuma alteração em produção.

## Problema
Hoje a Vitrine preserva uma demanda quando a busca falha e o usuário conclui /pedido, mas não preserva de forma equivalente quando a busca encontra ofertas. Isso impede medir procura atendida versus não atendida.

## Evento mínimo proposto
Nome conceitual: `search_outcome`.

Campos estritamente necessários:
- `occurred_at`
- `source_surface` — ex. INDEX
- `query_class` — classificação/categoria normalizada, preferível ao texto bruto
- `result_count_bucket` — 0, 1, 2–5, 6+
- `outcome` — MATCHED ou UNMATCHED
- `session_nonce_hash` opcional e efêmero, somente se necessário para deduplicação

Não coletar no V0:
- nome;
- telefone;
- e-mail;
- IP persistido pela aplicação;
- geolocalização precisa;
- texto livre bruto da consulta como requisito analítico;
- identificador de usuário.

## Regra de minimização
Se categoria + bucket responderem à pergunta de mercado, não armazenar a consulta bruta.

Exemplo:
`{ source_surface: INDEX, query_class: MATERIAL, result_count_bucket: "2-5", outcome: MATCHED }`

## O que esse único evento permite
- taxa de buscas com oferta;
- taxa sem oferta;
- categorias com maior lacuna;
- evolução por janela temporal;
- comparação com demandas efetivamente submetidas;
- base para medir se adicionar fornecedores melhora cobertura.

## O que ele NÃO prova
MATCHED não significa compra, contato ou satisfação. Significa apenas que o mecanismo apresentou pelo menos uma oferta compatível.

## Funil futuro, sem antecipar implementação
SEARCH_OUTCOME → OFFER_OPEN/CONTACT_INTENT → DEMAND_SUBMITTED → RESPONSE/RESOLUTION.

Cada estágio deve nascer somente quando houver pergunta comercial que justifique o dado.

## Separação QA
Todo evento experimental precisa de `environment/source_class` ou mecanismo equivalente que permita excluir QA/teste das agregações comerciais.

## Gate de insight
Não emitir alerta/tendência com amostra pequena. O limiar deve ser parametrizado e exibido na metodologia.

## Testes PÉTECO candidatos
1. query com match produz exatamente um outcome MATCHED;
2. query sem match produz exatamente um outcome UNMATCHED;
3. evento não contém PII proibida;
4. QA não entra na agregação comercial;
5. falha ao registrar evento nunca bloqueia busca/navegação;
6. contagem agregada é reconstruível deterministicamente.

## Hipótese experimental
H-IM-003: um único evento agregado de resultado da busca é suficiente para reduzir materialmente o viés H-IM-001 sem criar uma plataforma genérica de analytics.

Próximo gate: verificar se tabelas/eventos existentes podem acomodar este contrato com segurança antes de criar schema novo.
