# HYP-024 — Compatibilidade funcional por acoplamento físico sem representação separável

**Data:** 08/08/2026
**Estado PRT-001:** Draft
**Status epistemológico:** hipótese candidata, não testada
**Estado documental:** ACTIVE — agenda de pesquisa
**Autoridade:** não canônica
**Registro no Glossário:** pendente; o Glossário não foi alterado nesta tarefa

## Objetivo

Testar se existe ao menos uma classe operacional delimitada em que múltiplos componentes produzam ações mutuamente compatíveis por acoplamento físico direto, sem depender de representação operacional separável.

Esta hipótese não afirma que coordenação não representacional existe. Ela formula condições sob as quais sua existência poderia ser investigada.

## Enunciado

> Em pelo menos uma classe operacional previamente delimitada de sistemas com dois ou mais componentes, a compatibilidade funcional entre ações permanecerá acima de um controle negativo quando forem retirados todos os estados intermediários que satisfaçam critérios explícitos de representação operacional separável, desde que o acoplamento físico direto entre os componentes seja preservado.

## Motivação

A TPC v0.8 aplica-se a coordenação persistente mediada por representações operacionais. O desenvolvimento posterior introduziu acoplamento, sincronização, canais e recalibração, mas também permaneceu representacional.

O teste de fronteira ontológica identificou um candidato adversarial:

> ações funcionalmente compatíveis produzidas por acoplamento físico direto, sem estrutura intermediária separável, referencial e interpretável.

Investigar esse candidato pode:

- delimitar melhor o domínio da v0.8;
- esclarecer se coordenação e causalidade são categorias distintas;
- testar se representação é necessária para toda coordenação ou apenas para coordenação persistente em determinado regime;
- indicar se a nova TPC necessita de ontologia mais ampla.

## Definições operacionais provisórias

Estas definições são instrumentos da hipótese e não alteram o Glossário.

### Componente

Unidade identificável capaz de produzir mudança observável relevante para o sistema estudado.

### Ação

Mudança produzida por um componente que pode afetar a tarefa, condição ou outro componente.

### Compatibilidade funcional

Condição em que as ações dos componentes contribuem conjuntamente para critério operacional previamente declarado e apresentam desempenho superior ao controle negativo ou às ações desacopladas.

Compatibilidade funcional não é sinônimo de simultaneidade, correlação, ordem visual ou sincronização.

### Dependência relacional

A compatibilidade deve diminuir quando a relação entre os componentes for interrompida, mantendo-se controladas as demais condições relevantes.

### Acoplamento físico direto

Relação em que a mudança produzida por um componente altera condições físicas disponíveis ao outro sem mediação demonstrada por estado intermediário representacional separável.

### Representação operacional separável

Para esta hipótese, candidato a representação é uma estrutura:

1. portadora de estado;
2. distinguível do fenômeno ou condição referida;
3. com relação de referência especificável;
4. utilizada por agente ou mecanismo de modo sensível ao conteúdo para orientar ação;
5. capaz, ao menos em princípio, de desacoplar-se ou estar errada sobre o que representa.

Esta definição é critério analítico provisório. Não substitui IDR-0002.

## Condições necessárias para suporte

Um caso somente poderá oferecer suporte à HYP-024 se:

1. houver pelo menos dois componentes;
2. cada componente produzir ação observável;
3. existir critério de compatibilidade funcional definido antes da observação;
4. a compatibilidade depender relacionalmente dos componentes;
5. sincronização ou correlação isoladas forem insuficientes para o resultado;
6. causas comuns relevantes forem controladas;
7. todas as representações candidatas identificáveis forem inventariadas;
8. a retirada contrafactual das representações candidatas não eliminar a compatibilidade;
9. o acoplamento físico direto permanecer durante a retirada;
10. houver controle negativo;
11. o acoplamento puder falhar ou ser interrompido;
12. o resultado for reproduzível dentro da classe delimitada.

## Evidências que não contam como suporte

- ausência de documento ou banco de dados;
- presença de movimento sincronizado;
- correlação temporal;
- resposta de vários componentes à mesma causa externa;
- comportamento coletivo sem critério funcional;
- renomear estado físico como “não representação” sem testar referência e interpretação;
- resultado produzido por regra, setpoint, sensor ou memória não inventariados;
- funcionamento de software ou aplicação OPERA.

## Possíveis falsificadores

Dentro de uma classe operacional e protocolo previamente delimitados, a hipótese será enfraquecida ou refutada para aquela classe se:

1. toda compatibilidade observada desaparecer quando representações identificáveis forem retiradas;
2. um estado intermediário necessário satisfizer os critérios de representação separável;
3. a compatibilidade for explicada integralmente por causa comum;
4. o resultado persistir mesmo após remoção da relação entre componentes, mostrando que não havia dependência relacional;
5. o fenômeno for apenas sincronização, correlação ou resposta paralela;
6. o desempenho não superar controle negativo;
7. o resultado não for reproduzível.

Como HYP-024 possui forma existencial, falha em uma classe não refuta todas as classes possíveis. O escopo de qualquer conclusão deverá permanecer limitado à população e às arquiteturas efetivamente examinadas.

## Possíveis confundidores

- representação implícita não identificada;
- estado interno do controlador;
- setpoint persistente;
- memória corporal ou material;
- traço ambiental com função referencial;
- regra local codificada;
- atraso de observação;
- causa comum;
- seleção de casos;
- definição circular de coordenação;
- critério funcional escolhido após o resultado;
- redundância representacional;
- agregação que oculta dependências locais;
- antropomorfização de interpretação;
- chamar toda diferença causal de representação.

## Relação com LAW-001

LAW-001 permanece inalterada:

> No domínio declarado da TPC, coordenação persistente é mediada por representações operacionais.

HYP-024 não afirma a falsidade da LAW-001. Ela testa uma possível fronteira:

- o fenômeno pode não ser persistência da coordenação;
- pode situar-se fora do domínio v0.8;
- pode revelar que LAW-001 requer domínio mais explícito;
- pode falhar e reforçar a centralidade representacional.

Qualquer interpretação futura deverá distinguir contraexemplo ao domínio, extensão do domínio e falsificação de uma proposição dentro do domínio.

## Relação com a TPC v0.8

A v0.8 fornece os critérios históricos de representação, coordenação persistente e mediação. HYP-024 não os reescreve. Ela investiga se existe classe coordenativa que a ontologia v0.8 deliberadamente não cobre ou somente cobriria ampliando substantivamente “representação”.

## Relação com a Teoria dos Processos Coordenativos

Se obtiver suporte, HYP-024 poderá oferecer evidência para investigar domínio mais amplo. Não provará, por si só:

- a Teoria dos Processos Coordenativos;
- superioridade sobre a v0.8;
- inexistência de representação em outros regimes;
- validade de acoplamento como conceito geral;
- necessidade de novos axiomas ou leis.

Se não obtiver suporte, continuará possível que acoplamento, canais e recalibração sejam apenas ampliação arquitetural dentro de regime representacional.

## Relação com DEC-PESQ-001

Esta hipótese operacionaliza a pergunta de pesquisa registrada em DEC-PESQ-001:

> Quais condições mínimas distinguem coordenação propriamente dita de mero acoplamento causal?

Ela não resolve a decisão nem autoriza a formalização suspensa por ela.

## Proveniência

- núcleo histórico candidato v0.8;
- 6583864 — modelo experimental posterior;
- 5529403 — decisão de transição de nomenclatura;
- 3dd8460 — preservação da genealogia;
- matriz de sucessão conceitual;
- teste adversarial de correspondência;
- teste de fronteira ontológica.

## Limitações

- hipótese ainda sem domínio empírico selecionado;
- “compatibilidade funcional” exige operacionalização específica;
- ausência de representação é difícil de demonstrar;
- hipótese existencial não admite refutação universal por amostra finita;
- nenhuma fonte externa foi cartografada;
- não há protocolo experimental definitivo;
- o ID ainda não foi registrado no Glossário por restrição desta tarefa.

## Próxima necessidade experimental

Um futuro experimento deverá, no mínimo:

- distinguir coordenação de sincronização;
- definir compatibilidade funcional antes da coleta;
- retirar representações identificáveis contrafactualmente;
- preservar o acoplamento físico durante a retirada;
- demonstrar dependência relacional;
- excluir causa comum;
- excluir representação implícita;
- permitir falha ou perda do acoplamento;
- possuir controle negativo;
- medir reprodutibilidade;
- registrar casos indecididos;
- delimitar explicitamente a classe à qual a conclusão se aplica.

Este rol não constitui protocolo experimental.
