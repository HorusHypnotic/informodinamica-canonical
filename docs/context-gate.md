# Context Gate — memória canônica executável

## Problema e solução

“Reconstrução sem aplicação” ocorre quando a informação existe, mas nenhuma barreira obriga a
confrontá-la com a próxima ação. O Context Gate transforma o índice mínimo de projeto, checkpoint,
regras, autoridades, restrições e evidências em um preflight verificável antes de missões materiais.

Ele reutiliza a hierarquia de `AGENTS.md`, a Constituição, documentos canônicos, checkpoints e Git.
Não cria nova Constituição, banco, Cofre ou sistema de memória.

## Uso

No repositório canônico:

```powershell
python scripts/context_gate.py --project informodinamica-canonical --repo .
python scripts/context_gate.py --project opera-vision --repo "D:\Projetos Github\opera-vision"
python scripts/context_gate.py --project informodinamica-canonical --repo . --mission caminho\missao.json
```

O primeiro uso pode retornar `WARN` quando a árvore estiver suja. Uma missão que declare
`requires_clean_worktree: true` converte isso em `BLOCKED`.

## Contratos

- `context-gate/projects/*.json`: índice operacional vigente por projeto; cada regra declara
  `scope: repo` ou `scope: index` para impedir resolução ambígua.
- `context-gate/checkpoints/*.json`: checkpoint estruturado quando o Markdown existente não possui
  metadata suficiente.
- `context-gate/mission.template.json`: campos mínimos para missão bem formada.

O gate valida campos obrigatórios, repositório remoto, paths de regras, branch esperada, metadata,
existência e ancestralidade do commit do checkpoint, referência de regras/checkpoint da missão e
compatibilidade da working tree.

## Hierarquia operacional

Para fatos operacionais, vence o estado real verificável. Para evolução do núcleo, a Constituição
continua máxima. Decisão canônica posterior vence checkpoint anterior; checkpoint aplicável vence
documento histórico; conversa não versionada é apenas insumo. Conflitos são reportados, nunca
resolvidos silenciosamente.

## Captura entre conversa e Git

Uma decisão relevante deve virar checkpoint Markdown/JSON com projeto, data, status, commit,
proveniência, sucessão e pendências; depois deve ser revisada, commitada e referenciada no índice do
projeto. Só então o Context Gate pode tratá-la como contexto governante. Não há captura automática
de chats nesta versão.

## Estados

- `PASS`: contexto obrigatório íntegro e compatível.
- `WARN`: contexto utilizável, mas branch/working tree/checkpoint merece atenção.
- `BLOCKED`: campo, regra, ancestralidade ou pré-condição obrigatória inválida.

## Limites

O gate não consulta Lovable ou banco, não decide Publish, não prova aceite funcional e não inventa
fatos ausentes. Ele garante participação do contexto versionado na decisão; julgamento e aprovação
humana permanecem necessários.
