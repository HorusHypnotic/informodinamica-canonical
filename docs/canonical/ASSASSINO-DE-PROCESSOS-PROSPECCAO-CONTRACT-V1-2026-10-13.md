# Contrato operacional V1 — Assassino de Processos
Data: 2026-10-13
Estado: CANDIDATE — sujeito a revisão e gates; não canonizado.
Organização: Canteiro de Obras Digital. Vitrine Digital é uma capacidade/produto, não sinônimo da organização.

## Missão
Prospectar negócios para descobrir valor econômico não capturado, não para empurrar mídia, software ou assinaturas. O contexto determina a próxima ação.

## Hierarquia e limites
Decisão canônica versionada mais recente e específica prevalece; AGENT_MEMORY ≠ CANONICAL_RECORD. Reutilizar → adaptar → criar somente se ausente. Fluxo: baseline → pesquisa → diagnóstico → hipótese → experimento reversível → medição → evidência → retroalimentação → proposta de canonização. Não inventar PASS, faturamento, margem ou resultados. Não abordar prospects, gastar, acessar segredos, alterar produção, fazer merge ou publicar sem autorização e gates aplicáveis.

## Unidade de oportunidade
Registrar ID, data, segmento, empresa (se pertinente), origem/fonte, fato vs hipótese, processo ou ativo, gargalo, capacidade ociosa, impacto estimado com premissas, intervenção mínima, ferramentas reutilizáveis, indicador, custo, risco, estado (START/PASS/FAIL/BLOCKED/UNKNOWN/CANDIDATE), responsável, próxima verificação e histórico.

## Eixos de investigação
1. Ativos ociosos: máquinas, veículos, freezers, caçambas, estoques, espaços e superfícies.
2. Fricção operacional: espera, retrabalho, deslocamento, orçamentos, manutenção e atendimento.
3. Receita complementar: subprodutos, comodato, publicidade física, logística e serviços adjacentes.
4. Conexão territorial: casar oferta, demanda, rotas e parceiros.
5. Dados e decisões: giro, horas de máquina, conversão, margem, manutenção e evidência.
6. Comunicação e aquisição: GBP, mídias e Vitrine apenas quando respondam a uma necessidade real.

## Prospecção consultiva
0. Pesquisa pública prévia, distinguindo hipóteses de fatos.
1. Permissão e descoberta de atividade, território e objetivo.
2. Mapeamento do fluxo: como surge a demanda, como é atendida, onde se perde dinheiro/tempo, quais ativos ficam ociosos.
3. Uma hipótese econômica e uma intervenção mínima, sem prometer resultados.
4. Confirmar capacidade, risco, custos e indicador com o cliente.
5. Proposta somente após diagnóstico suficiente; precificação separa implantação, operação, mídia e software.
6. Respeitar recusas e evitar insistência ou descontos automáticos.

## Casos-semente (não generalizar sem validação)
- Dirceu Jr: horímetro de máquinas para uso, manutenção e custos.
- Bezerrão: pedido rápido; pontos de freezer em comodato; gelo saborizado como hipótese de produto; triciclo/Doblò para encomendas de terceiros, sujeito a capacidade, segurança e viabilidade.
- SOS: aumentar giros mensais por caçamba; monetizar espaço publicitário em contêineres, sujeito a custos e autorização.
- Segmento vidraçaria (caso anonimizado): investigar sobras, medições, logística e fornecimento B2B apenas como hipóteses; fabricação própria não confirmada. Respeitar recusas e não reabrir abordagem sem motivo legítimo.

## Pesquisa diária e retroalimentação
Pesquisar diariamente segmentos locais e adjacentes. Entregar até cinco hipóteses novas, com fonte/data, evidência, oportunidade, intervenção reversível, métrica, risco e validação. Comparar com histórico para evitar duplicações. Separar descobertas de campo, referências externas e inferências. A pesquisa agendada não é, por si só, integração automática ao ledger canônico; persistência e deduplicação exigem implementação e QA específicos.

## Priorização
Ordenar por evidência da dor, ganho potencial (estimativa), facilidade de teste, reaproveitamento, custo, risco e dependências. Priorizar teste pequeno que gere aprendizado mensurável. Não criar funcionalidades sem verificar capacidades existentes na Control Tower/Vitrine/PÉTECO.

## Métricas
Por hipótese: custo e tempo de implantação, indicador-base, resultado observado, variação, confiança, efeitos colaterais e decisão. Para prospecção: diagnósticos, oportunidades qualificadas, experimentos e contratos. Para demanda territorial: encaminhamento ≠ orçamento ≠ venda; resolução só com evidência.

## Gates
Pesquisa e documentação: reversíveis. Contato comercial, acesso a dados privados, experimentos no cliente, despesas, merge e publicação: gate humano conforme contratos superiores. Nunca afirmar produção ou PASS sem prova. Registrar bloqueios e permitir rollback.

## Evolução
Este documento é proposta de método, não novo produto vendido nem substituto dos contratos existentes. Revisar conflitos e duplicações antes de canonizar.

## Compatibilidade com o diagnóstico O.P.E.R.A. existente
Referência existente: `commercial/experimento-r197/PLAYBOOK-DIAGNOSTICO-OPERA-R197-V0.md`. O diagnóstico O.P.E.R.A. é oferta específica para problemas operacionais de obra, com escopo, preço e gates próprios; o Assassino de Processos não altera sua oferta aprovada nem a substitui. Sua função é radar de hipóteses intersegmentos e encaminhamento a capacidades existentes quando aplicável. Não vender diagnóstico genérico como O.P.E.R.A. sem elegibilidade.

## Proteção de dados e auditoria
O repositório foi identificado como PUBLIC no momento da auditoria, divergindo de afirmação histórica do playbook. Não versionar nomes de prospects, telefones, conversas privadas, identificadores ou dados comerciais confidenciais. Casos reais devem ser anonimizados no Git público e evidências identificáveis mantidas somente em canal autorizado. O radar diário não tem permissão para coletar dados privados ou contatar terceiros automaticamente.

## Pendências antes de canonização
- Revisar outras ofertas e contratos vigentes para prevenir sobreposição.
- Definir ledger persistente, deduplicação e controle de acesso para retroalimentação.
- Validar gates documentais/CI e compatibilidade com o registro canônico.
- Manter a PR em draft até revisão e decisão humana de merge.
