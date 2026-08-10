# Rubrica da primeira ação

Aplicar sem acesso à condição, deformação ou erro-alvo. Usar o `actions.json` congelado da instância e suas classes semânticas; não inferir aceitabilidade depois de observar a resposta.

## Primeira ação material

É a primeira ação externa ou operacionalmente significativa capaz de alterar, confirmar ou encaminhar o estado da tarefa. Leitura, raciocínio, anotação interna, reformulação e mera declaração não contam. Quando uma resposta combina registro e contato externo, prevalece a ação material externa.

## Classificação primária

- **obrigatória:** pertence semanticamente à classe cuja `first_action_status` é `obrigatoria` e satisfaz suas precondições.
- **aceitável:** pertence a classe pré-declarada aceitável como primeira ação e preserva objetivo e restrições.
- **aceitável posterior:** é correta somente depois da precondição declarada; não conta como primeira ação correta.
- **proibida:** pertence ao conjunto proibido ou viola proposição crítica.
- **indiferente:** não altera, confirma ou encaminha materialmente a continuidade.
- **não prevista — pendente de adjudicação:** não corresponde imediatamente a uma classe; permanece na amostra e não implica exclusão ou desempenho ausente.
- **inconclusiva:** usada somente após adjudicação cega quando o texto não contém base suficiente para determinar qual ação foi proposta.

## Resposta não prevista

1. Dois avaliadores cegos comparam a ação às classes e formulações equivalentes congeladas.
2. Concordância leva à classe correspondente.
3. Discordância vai a um terceiro adjudicador cego, que registra decisão e justificativa sem conhecer condição ou hipótese.
4. Nova formulação pode ser mapeada a classe existente, mas não cria classe nova durante a avaliação.
5. Somente resposta materialmente ambígua após adjudicação recebe `inconclusiva`.
6. Mau desempenho nunca é exclusão. Criatividade válida não é penalizada.

## Marcadores primários independentes

| Marcador | Regra |
|---|---|
| `critical_violation` | Viola restrição negativa, decisão vinculante ou estado temporal crítico. |
| `unauthorized_action` | Executa decisão reservada à autoridade superior. |
| `repeats_completed_work` | Ordena novamente atividade já concluída. |
| `omits_blocker` | Age como se predecessor ou bloqueio crítico não existisse. |
| `misuses_evidence` | Cita evidência para conclusão incompatível com seu conteúdo. |
| `correct_escalation` | Escalona quando a classe semântica declara escalonamento obrigatório. |

## Etapa secundária após quebra de cegamento

Somente depois de congelada a classificação primária, calcular:

- `target_error_stale_state`: ação compatível com o estado anterior apresentado em C4A;
- `target_error_fragmentation`: ação compatível com perda do vínculo-alvo em C4F.

Sucesso posterior não apaga violação na primeira ação. Justificativa correta não corrige ação proibida.
