# Revisão da extração do Guia de Registro de ECO — 31/07/2026

**Estado documental:** `ACTIVE`
**Escopo:** `docs/guia-eco.md`, `AUTHORITY.md` e a fonte histórica do guia
**Resultado:** transcrição aprovada para revisão humana, com conflitos normativos bloqueando adoção operacional automática; nenhum commit realizado

## Proveniência e integridade

- Fonte: `archive/google-drive/Guia de Registro de ECO - OPERA Control.pdf`.
- SHA-256: `a8a68854350bd7270375e556e67e695d0a685e454713b97475ad68f353f57036`.
- Páginas na fonte: 18.
- Páginas transcritas: 18.
- Não foram detectados e-mails, telefones, CPFs, credenciais ou marca de confidencialidade.
- O extrator advertiu sobre texto rotacionado; tabelas, diagramas e ordem visual exigem conferência no PDF.

## Autoridade e ciclo de vida

- O PDF pertence a `archive/` e, portanto, é `HISTORICAL`.
- O Markdown é `ACTIVE` apenas como derivado pesquisável; não é fonte normativa.
- `AUTHORITY.md` registra a precedência aplicável sem criar autoridade nova; o cabeçalho estruturado do guia repete essa classificação para consumo por agentes.
- Nenhum ID foi criado, alterado ou promovido.
- O PRT-002 não se aplica, pois não houve incorporação de teoria ou autor externo.

## Divergências com fontes superiores

| Tema | PDF histórico | Fonte superior vigente | Tratamento |
|---|---|---|---|
| Nome do ECO | Evento de Corrosão **Operacional** | Evento de Corrosão **da Coordenação** em `GLOSSARIO_CANONICO.md` | Preservado somente na transcrição histórica |
| Escopo de registro | Qualquer ocorrência que atrapalhe produção, gere custo, retrabalho ou atraso | `MANUAL_ECO.md` exclui erro individual, decisão estratégica equivocada e evento externo imprevisível quando não configuram corrosão representacional | Regra ampla do PDF não deve orientar coleta sem reconciliação |
| Recorrência do ICO | Nota de 1 a 5 | Contagem em `02-aplicacoes/TDO.md` | Conflito aberto |
| Persistência do ICO | Nota de 1 a 5 por intervalo temporal | Dias desde a primeira detecção em `02-aplicacoes/TDO.md` | Conflito aberto |
| Faixas do ICO | 1–125, seis cores | 1–5, 6–15, 16–40 e 41+ na TDO | Conflito aberto; não parametrizar software |
| Capital Preservado | Soma dos prejuízos evitados | EPI menos Corrosão Operacional Acumulada na TDO | Formulações não equivalentes; requer decisão teórica |
| Causalidade | O guia induz classificação prática ampla | HYP-001 permanece hipótese falseável | Não converter em afirmação absoluta |

## Diferenças entre o pedido anexado e o PDF

O Markdown fornecido no pedido não é uma reprodução fiel do PDF:

- renumera e reorganiza seções;
- acrescenta checklist e seção explícita de conexão TPC/TDO que não aparecem dessa forma na fonte;
- não preserva integralmente a página sobre o ciclo de oito etapas do ECO;
- apresenta conteúdo editorial como se fosse extraído.

Por isso, `docs/guia-eco.md` foi gerado diretamente do PDF, por página, e não a partir do bloco Markdown anexado.

## Dependências, duplicidades e órfãos

- `MANUAL_ECO.md` continua sendo a autoridade canônica sobre o ECO.
- `02-aplicacoes/TDO.md` continua sendo a aplicação vigente para fórmula, escalas e interpretação do ICO.
- `produtos/opera-control.md` já replica a escala 1–125 do PDF e conflita com a TDO; a extração não resolveu nem ampliou esse conflito.
- O guia está indexado por `AUTHORITY.md`; um índice geral de produto em `opera/control/README.md` permanece uma tarefa separada.

## Decisão candidata posterior - 2 de agosto de 2026

Foi criada a camada `docs/guia-eco-campo-v1.0.md`, sem alterar esta transcrição ou o PDF de origem. A reconciliação candidata estabelece:

- nome oficial “Evento de Corrosão da Coordenação”;
- registro amplo como ocorrência candidata, seguido de triagem;
- produto de notas 1-5 denominado `ICO_campo`;
- contagem e dias preservados como variáveis brutas separadas;
- Capital Preservado alinhado à fórmula teórica, com implementação ainda incompatível;
- faixas e IFX ainda sujeitos a validação e decisão própria.

## Pendências de implementação

Antes de usar a especificação em produção ou pesquisa, a revisão humana deve aprovar a camada candidata, definir migrations para valores brutos, calibrar faixas e verificar compatibilidade com PRT-001.
