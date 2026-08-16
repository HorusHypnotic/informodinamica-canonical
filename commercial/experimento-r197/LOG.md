# Experimento R$197 — Log comercial append-only (COD Money Path V0)

Este arquivo é append-only. Nenhuma oportunidade pode ser apagada porque não comprou.
Não criar OPP-001 fictício durante teste técnico — o primeiro prospect elegível real passa a ser OPP-001.

## Schema de campos (por linha de oportunidade)

| Campo | Descrição |
|---|---|
| OPP_ID | Identificador sequencial da oportunidade (ex.: OPP-001) |
| data | Data do primeiro contato (AAAA-MM-DD) |
| origem | Como a pessoa chegou (ex.: link direto, Instagram, indicação) |
| contato | Identificação do contato (nome/empresa — LGPD: uso apenas para conduzir o experimento) |
| mensagem_enviada | Texto/rota da mensagem enviada (ex.: WhatsApp com mensagem pré-preenchida do Diagnóstico R$197) |
| resposta | Resposta recebida (data + síntese) |
| pagina_visitada | Página acessada antes/durante a conversa (se registrada) |
| conversa_iniciada | sim/não |
| diagnostico_solicitado | sim/não |
| diagnostico_contratado | sim/não |
| pagamento_recebido | sim/não |
| valor | Valor recebido (R$) |
| observacao | Contexto livre |

## Regras

1. Append apenas; nunca editar linhas existentes.
2. Uma linha por oportunidade real. Sem oportunidades fictícias.
3. Registrar antes de cobrar; registrar também quem recusou.
4. Fonte da verdade comercial durante o experimento: WhatsApp do responsável + este log.

## Oportunidades

(nenhum registro ainda — o primeiro prospect real será OPP-001)

## Nota de segurança (16/08/2026)

O GitHub Pages do repositório COD publica TODO o repositório, incluindo este diretório `logs/`.
Decisão do agente: este arquivo NÃO permaneceu no repositório COD (movido para o repositório privado
`informodinamica-canonical/commercial/`). Aqui permanece apenas este registro da decisão.
