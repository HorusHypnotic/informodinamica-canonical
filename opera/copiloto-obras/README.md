# Runtime local — Copiloto de Obras

> [!WARNING]
> Este runtime está em estágio experimental.
>
> A implementação possui 118 testes automatizados aprovados e foi executada
> somente em modo dry-run, sem chamadas reais à API.
>
> A auditoria formal anterior identificou bloqueadores que foram corrigidos,
> mas a reauditoria formal independente ainda não foi concluída.
>
> O projeto não deve ser utilizado para decisões técnicas, comerciais,
> contratuais, médicas, de segurança ou operacionais em ambientes reais.

MVP local e experimental do perfil `copiloto_obras.v0.1`. Ele monta a composição documental, valida contexto fictício, calcula hashes e aplica regras determinísticas antes de qualquer integração com modelo.

## Limites

- Não contém dados reais, integrações, banco de dados, interface web ou execução em segundo plano.
- O modo padrão deste ciclo é `--dry-run`: não exige chave e não chama a API.
- Decisões técnicas, comerciais, contratuais e de segurança permanecem humanas.
- `POLITICA_DE_LOGS_PLANEJADA`: não há registros locais implementados nesta rodada.

## Desenvolvimento

Crie um ambiente virtual e instale as dependências declaradas no `pyproject.toml`. Depois, a partir desta pasta:

```powershell
$env:PYTHONPATH = 'src'
python -m copiloto_obras --context fixtures/contexts/gh01.json --dry-run
python -m pytest
```

Após instalação editável do pacote, `python -m copiloto_obras` funciona sem definir `PYTHONPATH`.

`OPENAI_API_KEY` e `OPENAI_MODEL` são necessários somente para uma chamada futura e explícita. O cliente OpenAI está deliberadamente inativo e este MVP não oferece comando que faça essa chamada.

## Estado de maturidade

```text
Lote 1: concluído
Lote 2: concluído
Lote 3: concluído
118 testes: aprovados
Dry-run: válido
API real: nunca chamada
Auditoria Formal 3: NAO_APTO
Rodada corretiva 4: concluída
Reauditoria formal independente: pendente
Uso em produção: não autorizado
```
