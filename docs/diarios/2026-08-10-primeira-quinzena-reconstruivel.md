# Diário de Retomada — Primeira Quinzena Reconstruível

**Data do registro:** 10/08/2026
**Período operacional:** 03/08/2026 a 14/08/2026
**Organização:** Dirceu Engenharia
**Estado:** coleta humana em andamento

## Onde paramos?

A fase de arquitetura e preparação está encerrada.

A identidade operacional foi canonizada no commit `0f52d8c77fee90bb9d2da7e88761bacb462bb453`. Os dois rascunhos de fechamento foram preparados em `workspace/fechamentos/`, mas permanecem fora do Git e não contêm dados operacionais consolidados nem hashes finais.

A coleta humana da quinzena está em andamento.

Não reconstruir este contexto por memória. Antes de retomar, ler:

1. `docs/decisoes/DEC-ARQ-002-identidade-operacional-opera.md`;
2. `docs/decisoes/CHECKPOINT-PRIMEIRA-QUINZENA-RECONSTRUIVEL-2026-08-10.md`;
3. os dois `fechamento.md` em `workspace/fechamentos/`;
4. os respectivos `evidencias/indice.md`.

## O que fazer enquanto a quinzena estiver aberta?

- atualizar o Atlas, especialmente as diárias;
- atualizar o Copiloto, especialmente estoque e operação atual;
- registrar decisões, ações e pendências no momento em que ocorrerem;
- observar trabalhadores, ferramentas e equipamentos transferidos entre as duas obras;
- para cada transferência, preservar identidade, origem, destino, data ou intervalo e fonte;
- preservar evidências contemporâneas;
- usar os cadernos físicos como contraprova quando o conteúdo for legível;
- identificar explicitamente informações reconstruídas pela memória de Eduardo;
- preservar divergências entre fontes;
- usar `não_ocorreu`, `não_coletado`, `desconhecido` ou `não_aplicável`;
- não forçar preenchimento de lacunas.

## Quando chamar novamente o Codex?

Somente em uma destas circunstâncias:

1. existem dados reais novos suficientes para atualizar os pacotes;
2. foi encontrado conflito ou divergência entre fontes;
3. é necessário reconciliar IDs ou aliases reais do Atlas e Copiloto;
4. foi descoberto risco concreto de perda de informação;
5. chegou 14/08/2026 e o fechamento definitivo pode começar;
6. é necessário gerar hashes e preparar a preservação final;
7. houve falha concreta no procedimento atual.

Ao retornar, informar quais fontes mudaram, o intervalo coberto, a obra afetada e se existe evidência preservável.

## Quando NÃO chamar o Codex?

Não chamar apenas para:

- criar nova feature;
- redesenhar produto;
- automatizar trabalho manual que está funcionando;
- expandir portfólio;
- alterar Marca;
- alterar Design System;
- integrar Copiloto, Control, Atlas ou Cofre;
- corrigir bugs comerciais;
- transformar observações da quinzena em teoria;
- criar novas métricas;
- declarar Google Drive como dependência obrigatória;
- gerar hash antes do congelamento;
- declarar fechamento final antes de 14/08/2026.

## Gatilho de fechamento — 14/08/2026

Em 14/08/2026, iniciar missão separada e autorizada para:

1. revisar a cobertura final de cada fonte;
2. completar as lacunas que possam ser classificadas;
3. marcar o estado final dos dois pacotes;
4. validar `fechamento.md` contra `fechamento.json`;
5. revisar divergências e conteúdo sensível;
6. congelar os arquivos;
7. calcular SHA-256 dos arquivos finais;
8. substituir os placeholders de `manifest.sha256`;
9. solicitar autorização de commit, se aplicável;
10. copiar manualmente os pacotes para o Google Drive autorizado;
11. reabrir, baixar e conferir os arquivos preservados;
12. recalcular e comparar os hashes;
13. testar reconstrução por terceiro;
14. encerrar formalmente a primeira quinzena reconstruível.

## Verificação rápida antes de qualquer retomada

- [ ] A quinzena ainda está aberta ou já chegou 14/08/2026?
- [ ] Qual das duas obras foi afetada?
- [ ] Há dados novos ou apenas uma intenção de melhoria?
- [ ] A fonte e o período estão identificados?
- [ ] Existe conflito entre fontes?
- [ ] Há risco de perda de informação?
- [ ] Os pacotes continuam como rascunho e sem hash final?
- [ ] A ação desejada possui autorização humana específica?

Se não houver dado novo, divergência, risco, falha concreta ou gatilho de fechamento, continuar a coleta manual e não abrir nova missão.
