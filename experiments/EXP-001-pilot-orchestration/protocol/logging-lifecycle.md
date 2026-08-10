# Ciclo de logging operacional

O log possui três momentos, sem preenchimento retrospectivo silencioso:

1. **prepared:** antes do envio, registra hashes e referências de fixture, mapa, seed, ambiente, prompt, pacote e bundle exato;
2. **started:** imediatamente antes do envio, acrescenta `started_at`, executor efetivo, versão visível, parâmetros e ferramentas efetivamente disponíveis;
3. **completed/failed:** preserva output bruto, timestamps, ações, intervenções, falhas e decisão de exclusão/reposição.

O envelope `prepared/first-run/pre-run.json` não afirma ser uma execução nem um log final válido. Depois de autorização humana, seu conteúdo inicia o registro append-only da execução. O objeto final deve validar contra o `logging.schema.json` congelado.

Se qualquer campo planejado divergir no momento `started`, aplicar STOP-6 antes de enviar o input. Campo indisponível recebe `null` somente quando o schema permitir e deve ser acompanhado por nota explícita; não se inventa versão, parâmetro, token ou timestamp.
