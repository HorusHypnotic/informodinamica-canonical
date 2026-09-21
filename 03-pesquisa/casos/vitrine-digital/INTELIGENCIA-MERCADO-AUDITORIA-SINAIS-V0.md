# Auditoria de sinais — Inteligência de Mercado V0

Data: 2026-09-20. Fonte congelada inspecionada: vitrinedigital-cod @ 14ab48d.

## Evidência encontrada

### Busca na Index
A Index mantém a consulta do usuário apenas em estado React (`q`). O matching de ofertas é local, por tokens, sobre as ofertas carregadas. Quando há resultados, a interface informa a quantidade e rola para o grid. Quando não há resultado, encaminha para `/pedido?q=...&src=INDEX`.

**Conclusão:** hoje a busca bem-sucedida é um sinal efêmero. Não há evidência neste fluxo de persistência de search/query, impressão de oferta ou clique.

### Demanda não atendida / Pedido
`/pedido` chama `submit_public_demand` e persiste uma demanda pública com tipo, título, detalhes, cidade/UF, data limite, contato, source e consentimento de compartilhamento.

A origem recebe `VITRINE_PEDIDO_V0` ou `VITRINE_PEDIDO_TRANSPORT_V0`, podendo anexar o source como `:INDEX`.

**Conclusão:** demandas enviadas já são um sinal persistido e têm origem parcialmente rastreável. É o ativo mais maduro para o primeiro insight de mercado.

### Cockpit / Minha página
`/minha-loja` lê contexto, storefront e mídia e grava alterações de identidade/aparência. Não foi encontrada instrumentação de page_view, exposição, contato ou conversão nesse fluxo inspecionado.

## Matriz V0

| Sinal | Situação | Ação |
|---|---|---|
| demanda enviada | já persistido via submit_public_demand | reutilizar |
| origem INDEX de demanda | já parcialmente persistida em source | reutilizar/normalizar depois |
| busca com resultado | efêmero no cliente | instrumentação futura |
| busca sem resultado | torna-se persistente somente se usuário enviar /pedido | derivar funil parcial |
| offer impression/search match | calculado no cliente, não persistido | instrumentação futura |
| page view empresa/produto | não evidenciado na inspeção | instrumentação futura |
| contact intent | não evidenciado na inspeção | instrumentação futura |
| alteração de catálogo/identidade | persistida operacionalmente | não confundir com sinal de demanda |

## Insight testável sem criar eventos novos

Primeiro experimento deve usar **demanda submetida**, não page_view.

Perguntas já possíveis após auditar schema/RPC:
- quantas demandas por tipo/categoria/período;
- quantas vieram do fluxo INDEX;
- quais termos/títulos se repetem;
- quais necessidades transport/frete aparecem;
- distribuição temporal e territorial agregada;
- demanda com consentimento público versus privada.

Isso permite provar valor do motor antes de instalar analytics amplo.

## Lacuna informodinâmica observada

A Index conhece temporariamente informação valiosa: consulta, conjunto de matches e quantidade de ofertas. Se o usuário encontra algo e sai, essa informação desaparece do sistema. Há **perda informacional por não persistência**.

Se não encontra, parte do sinal pode sobreviver quando o usuário conclui `/pedido`. Portanto o sistema preserva melhor a informação sobre fracasso de matching do que sobre sucesso. Isso pode enviesar qualquer leitura futura do mercado.

Hipótese H-IM-001: instrumentar somente demandas submetidas superestima necessidades não atendidas e subrepresenta demanda satisfeita.

## Próximo teste barato

Auditar definição e dados de `submit_public_demand` / tabela de demandas e construir uma consulta agregada read-only. Não adicionar tracking ainda.
