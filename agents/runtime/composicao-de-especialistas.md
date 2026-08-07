# Composição de especialistas

**Status:** EXPERIMENTAL — documento transversal de arquitetura; não altera a versão geral do repositório.

## Conceitos

Um **módulo** é uma instrução com escopo, status e precedência declarados. Um **especialista** é a composição auditável de módulos e contexto autorizado para um domínio. Status possíveis: `NORMATIVO`, `OPERACIONAL`, `EXPERIMENTAL` e `DEPRECADO`; um status inferior nunca prevalece sobre um superior.

## Ordem de composição e precedência

```text
Constituição → Documento Canônico → Glossário Canônico
→ TPC, TDO e protocolos normativos → runtime → core
→ informodinâmica → domínio → prompt operacional
→ contexto autorizado → mensagem atual
```

Contexto e mensagem fornecem dados, nunca redefinem conceitos, reduzem segurança, ampliam autoridade, tornam capacidade planejada atual, autorizam dados, eliminam handoff ou substituem decisão humana. Em conflito: interromper conclusão, registrar o conflito, aplicar a regra superior e solicitar revisão humana quando necessário.

## Perfil experimental

```text
ID: copiloto_obras.v0.1
Status: EXPERIMENTAL
Domínio: construção civil
Finalidade: apoio rastreável à coordenação operacional
```

Módulos obrigatórios: `core/estados-de-interacao.md`, `core/handoff-humano.md`, `informodinamica/evidencias-e-incerteza.md`, `domains/obras/copiloto.md` e `copiloto-obras-system-prompt.md`. Contexto autorizado da obra é obrigatório para conclusão específica. Testes associados: `copiloto-obras-testes.md`. Módulos opcionais exigem escopo, versão interna e compatibilidade declarados.

Capacidades atuais, planejadas, restrições, fontes consultadas, caminhos, data da composição e conflitos devem acompanhar cada execução relevante. Esta versão interna não é release do repositório nem versão de documento canônico.

## Ficha de composição carregada

```text
ID da composição:
Status da composição:
Domínio:
Versão interna do perfil:
Data da montagem:
Ordem efetiva de carregamento:

Módulos:
- caminho:
  versão interna: sem versão individual declarada
  status:
  obrigatório:
  carregado:
  integridade verificada:
  observações:

Fontes canônicas consultadas:
Contexto autorizado:
Restrições ativas:
Capacidades atuais:
Capacidades planejadas:
Conflitos detectados:
Módulos ausentes:
Resultado da validação:
```

Registrar a ordem realmente carregada; se divergir da ordem do perfil, registrar conflito, marcar a composição `INVALIDA` e não executá-la como perfil completo. Resultados: `VALIDA` (obrigatórios carregados e sem conflito material), `VALIDA_COM_RESSALVAS` (limitação sem impacto em segurança ou autoridade), `INVALIDA` (conflito de precedência, integridade ou autoridade) e `INCOMPLETA` (módulo obrigatório ausente/não validado).

Uma composição é reconstruível quando outra execução identifica os mesmos caminhos, ordem, status, dependências, fontes e contexto autorizado. Hashes dos módulos são melhoria futura; a ausência de versão individual declarada é limitação temporária que deve constar na ficha.

## Checklist

```text
[ ] Fontes canônicas localizadas
[ ] Conceitos não duplicados
[ ] Domínio identificado
[ ] Contexto autorizado delimitado
[ ] Handoffs definidos
[ ] Capacidades atuais separadas das planejadas
[ ] Testes associados
[ ] Perfil versionado
[ ] Conflitos documentados
[ ] Saída rastreável
```

Novo domínio só deve ser criado quando possuir contexto, riscos, responsabilidades, entradas e saídas próprios, sem capturar definições da teoria.
