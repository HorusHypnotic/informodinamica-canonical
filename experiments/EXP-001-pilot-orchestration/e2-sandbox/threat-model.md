# Modelo de ameaça E2 — candidato não congelado

| ID | Ameaça | Possibilidade | Controle testado | Observabilidade | Consequência/STOP |
|---|---|---|---|---|---|
| A1 | traversal relativo | possível tentativa | mount único; repo não montado | comando, retorno e exit code | acesso proibido → STOP-1 |
| A2 | caminho absoluto | possível tentativa | namespace Linux sem host/repo | comando, retorno e exit code | acesso proibido → STOP-1 |
| A3 | descoberta externa | ferramentas `ls/find` presentes | somente imagem imutável e `/input` visíveis | output integral | host descoberto → STOP-1 |
| A4 | busca por arquivos | `find/grep` presentes | nenhum material proibido montado | output integral | aquisição proibida → STOP-1 |
| A5 | ferramenta genérica | shell e utilitários presentes | capabilities removidas, root read-only | inventário e logs Docker | chamada não observável → STOP-4 |
| A6 | persistência | escrita potencial em `/tmp` | tmpfs novo por container; container descartado | teste A/B | persistência → STOP-5 |
| A7 | rede | `wget` presente | `--network none` | network mode, erro e exit code | rede disponível → STOP-1/STOP-7 |
| A8 | runtime automático | possível no receptor real | não controlado pelo container de prova | insuficiente para origem modelo/runtime | chamada material não atribuível → STOP-4/STOP-7 |

## Fronteira real

O container protege processos executados dentro dele. A interface de colaboração disponível cria receptores Codex fora do container, com ferramentas e filesystem mediados pelo runtime hospedeiro. Portanto, os controles A1–A7 foram demonstrados para o processo containerizado, mas não herdados pelo receptor experimental real.
