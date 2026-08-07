# Observatorio Documental

**Estado documental:** `ACTIVE` - instrumento operacional nao normativo
**Escopo:** acompanhamento continuo da documentacao versionada

## Finalidade

Esta area organiza verificacoes automatizadas, anotacoes humanas e insights candidatos sobre o acervo. Ela nao altera a autoridade dos documentos analisados e nao promove conteudo para o nucleo canonico sem revisao.

## Estrutura

| Area | Uso |
|---|---|
| [`anotacoes/`](anotacoes/) | Registros factuais, perguntas e inconsistencias observadas. |
| [`insights/`](insights/) | Interpretacoes candidatas ainda sem autoridade canonica. |
| [`relatorios/`](relatorios/) | Explicacao sobre os relatorios produzidos pelo GitHub Actions. |

## Auditoria diaria

O workflow `.github/workflows/auditoria-documental-diaria.yml` executa diariamente e tambem pode ser iniciado manualmente. Ele:

1. inventaria os arquivos Markdown rastreados pelo Git;
2. verifica titulo principal e links locais;
3. conta marcadores `TODO`, `FIXME`, `PENDENTE` e `BLOQUEADO`;
4. registra documentos alterados nas ultimas 24 horas;
5. destaca arquivos grandes que merecem revisao de navegabilidade;
6. publica um resumo na execucao e preserva o relatorio como artefato por 30 dias.

O workflow nao edita, commita, canoniza ou publica insights automaticamente. Interpretacao continua exigindo registro nesta area e revisao humana conforme `docs/workflow.md`.

## Limites

- Um link valido nao comprova coerencia conceitual.
- Um marcador ausente nao significa que o documento esteja completo.
- Tamanho de arquivo e apenas um sinal de navegabilidade.
- Relatorios automatizados sao evidencias operacionais, nao pareceres teoricos.
- O Codex nao permanece executando fora de uma sessao; o agendamento pertence ao GitHub Actions.
