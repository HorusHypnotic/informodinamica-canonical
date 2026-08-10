# Protocolo operacional do piloto técnico

## Unidade e receptor

A unidade é uma instância × uma condição × uma execução técnica independente. Cada receptor participa de uma única execução total, em sessão nova, sem memória, histórico, outros pacotes ou reutilização deliberada de contexto. Sessões isoladas são aproximação operacional; independência estatística do serviço não é afirmada.

## Input permitido

Somente:

1. cópia byte a byte do prompt neutro congelado;
2. cópia byte a byte do pacote receptor-visible sorteado;
3. ambiente e ferramentas fixados no manifesto.

Truth, condição real, audit-map, manipulation checks, rubricas, hipóteses, TPC/TCA e outros resultados são proibidos.

## Sequência preservada

O output bruto deve preservar reconstrução, restrições, autoridade, concluído, pendente, bloqueios, primeira ação material e justificativa. Nenhuma edição retrospectiva é permitida. Continuação operacional, se futuramente autorizada, é registrada separadamente.

## Logging

Antes do envio, instanciar um registro segundo o schema congelado e registrar referências/hashes de fixture, pacote, prompt, mapa e ambiente. Durante a execução, acrescentar timestamps, output bruto, primeira ação, ações posteriores, ferramentas, intervenções, tokens e tempo disponíveis. Campo reconstruído posteriormente deve receber anotação explícita de proveniência.

## Falha técnica

Conta como falha técnica: pacote incompleto, interrupção antes da resposta, ambiente corrompido, ferramenta planejada indisponível, deriva de modelo/configuração, timeout externo ou erro de infraestrutura. Resposta ruim, violação, alucinação, omissão, escolha errada ou resultado desfavorável são dados, nunca falha técnica.

## Exclusão e reposição

Exclusão somente por falha técnica pré-definida, sempre com motivo, evidência, momento, decisão e elegibilidade de reposição. A execução original permanece no ledger. Reposição usa novo run ID e nova sessão, mantendo instância e condição, e referencia a falha substituída. Mau desempenho nunca é excluído.

## Avaliação cega

Output bruto → pacote cego → avaliação primária → adjudicação cega → congelamento da avaliação → quebra de cegamento. Operador/custodiante não atua como avaliador primário. `target_error` é secundário e posterior à avaliação primária.

## STOP rules

- STOP-1: contaminação do receptor;
- STOP-2: erro substantivo no fixture;
- STOP-3: cegamento inviável;
- STOP-4: logging não reconstruível;
- STOP-5: ambiente não restaurável;
- STOP-6: deriva material de executor;
- STOP-7: falha sistêmica recorrente.

Qualquer STOP interrompe novas execuções, preserva tudo e proíbe correção silenciosa.

## Não confirmatório

O piloto testa fixture, logging, dificuldade, vazamento, estabilidade e rubricas. Não confirma/refuta TPC, não comprova superioridade de C3 e não sustenta validade geral das deformações.
