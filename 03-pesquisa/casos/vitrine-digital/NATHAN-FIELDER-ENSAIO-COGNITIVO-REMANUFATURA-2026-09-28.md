# Nathan Fielder como benchmark de ensaio cognitivo para a Control Tower

Data: 2026-09-28
Status: CANDIDATE_PATTERN
Escopo: pesquisa de mecanismo; não cria capability, engine ou arquitetura paralela.

## Pergunta

Quais mecanismos observáveis no processo de Nathan Fielder podem ser remanufaturados como extensão do patrimônio já existente de Remanufatura Digital com Retroalimentação e Andaimes Cognitivos?

## Evidência externa observada

1. Em entrevista à GQ sobre Nathan for You, Fielder descreve um processo de criar algo, testar no mundo real, observar o que acontece e reescrever/ajustar a partir de quase cada interação.
2. The Rehearsal usa ensaio prévio de interações, réplicas de ambientes, atores e ramificações para explorar respostas possíveis antes do evento real.
3. O próprio mecanismo demonstra um limite útil: simulação não elimina contingência. O mundo real continua sendo a autoridade final.

Fontes públicas consultadas:
- GQ, 2015: https://www.gq.com/story/nathan-for-you-season-3-qa
- The New Yorker, 2022: https://www.newyorker.com/magazine/2022/08/15/dont-worry-nathan-fielder-also-hates-himself
- New York Review of Books, 2022: https://www.nybooks.com/articles/2022/12/22/no-surprises-the-rehearsal-nathan-fielder/

## Arqueologia interna

### 1. Remanufatura + retroalimentação + andaime
Evidência:
- vitrinedigital-cod/docs/PETECO-DIGITAL-REMANUFACTURING-FEEDBACK-SCAFFOLDS-V1.md
- vitrinedigital-cod/docs/PETECO-CANONICAL-OPERATING-RULES-V1.md §14

Função atual:
ARQUEOLOGIA -> CLASSIFICAÇÃO -> REMANUFATURA -> TESTE -> EVIDÊNCIA -> CRÍTICA -> APRENDIZADO -> REGRA/ANDAIME MELHOR -> NOVA ARQUEOLOGIA.

Classificação: REUTILIZAR.

### 2. Retroalimentação do patrimônio
Evidência:
- archive/drive-archaeology/2026-08-24/REMANUFATURA-DIGITAL-COM-RETROALIMENTACAO.md

Função atual:
patrimônio -> recuperação -> conhecimento reutilizável -> experimento atual -> resultado no mundo -> evidência/aprendizado -> patrimônio atualizado.

Classificação: REUTILIZAR.

### 3. Andaime cognitivo como representação externa persistente
Evidência:
- protocols/PRT-002-cartografia-epistemologica.md

Função atual:
trata andaimes como representações externas cuja persistência, degradação e restauração importam para coordenação ao longo do tempo.

Classificação: REUTILIZAR.

### 4. Ensaio explícito antes da ação
Busca por simulation/rehearsal/scenario nos dois repositórios não encontrou contrato equivalente nomeado.

Classificação: ADAPTAR, não AUSENTE arquitetural.
Justificativa: o comportamento cabe como etapa opcional do ciclo existente, sem justificar engine independente.

## Delta remanufaturado

Adicionar conceitualmente uma etapa opcional de ENSAIO entre classificação e execução quando:
- a ação possuir ramificações relevantes;
- existir histórico/evidência suficiente para construir cenários;
- ensaiar for mais barato e seguro que errar no mundo;
- o ensaio não exigir dados pessoais indevidos nem manipulação de terceiros.

Fluxo candidato:

ARQUEOLOGIA
-> CLASSIFICAÇÃO
-> REMANUFATURA
-> [ENSAIO, quando aplicável]
-> AÇÃO MÍNIMA REVERSÍVEL
-> TESTE/MUNDO REAL
-> EVIDÊNCIA
-> PREVISTO x OBSERVADO
-> CRÍTICA
-> APRENDIZADO
-> REGRA/ANDAIME MELHOR
-> NOVA ARQUEOLOGIA

## Contrato mínimo do ensaio

Entrada:
- objetivo;
- estado/evidência conhecida;
- casos comparáveis;
- ações permitidas/proibidas;
- ramificações relevantes;
- condição de parada.

Saída:
- cenários explícitos, não previsões tratadas como fatos;
- hipótese operacional;
- menor ação reversível com maior ganho de informação;
- sinais que confirmam/refutam a hipótese;
- UNKNOWNs preservados.

Depois da execução real:
- registrar PREVISTO x OBSERVADO;
- não apagar previsão errada;
- usar o erro para melhorar regra, capability, brief ou andaime.

## Aplicação inicial candidata

Smart Cotações é o primeiro laboratório natural porque já possui demanda, fornecedor, resposta, histórico econômico e recorrência. O ensaio não deve escolher fornecedor automaticamente nem inventar disponibilidade/preço. Deve apenas estruturar a próxima ação e medir divergência entre cenário e realidade.

Exemplo de pergunta de ensaio:
"Para esta demanda recorrente, qual consulta mínima aumenta informação sem perder comparação histórica?"

## Limites éticos e operacionais

Não remanufaturar:
- engano de pessoas;
- coleta encoberta de dados pessoais;
- manipulação de participantes;
- representação sintética apresentada como fato;
- previsão convertida em PASS;
- automação de decisão humana sensível.

Usar:
- dados autorizados;
- evidência sanitizada;
- cenários sintéticos internos;
- gate humano quando aplicável;
- mundo real como autoridade de validação.

## Decisão

NÃO CRIAR "REHEARSAL ENGINE" agora.

Decisão de remanufatura:
- REUTILIZAR o ciclo PETECO já canônico;
- ADAPTAR com o padrão opcional ENSAIO -> PREVISTO x OBSERVADO;
- testar primeiro em um caso real de baixo risco;
- somente considerar extração como capability independente após reuso real e teste independente.

## Estado

CANDIDATE_PATTERN.

Não é PASS de produto, não é capability registrada e não altera automaticamente o Registry V2.

Critério de promoção:
1. pelo menos um ensaio real versionado;
2. ação real subsequente;
3. registro PREVISTO x OBSERVADO;
4. ganho demonstrável de informação ou redução de erro/custo;
5. ausência de duplicação funcional;
6. evidência suficiente para decidir REUTILIZAR/ADAPTAR novamente ou extrair capability.
