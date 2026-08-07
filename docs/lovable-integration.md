# Integração Lovable e GitHub — OPERA

**Estado documental:** `ACTIVE`
**Última atualização:** 3 de agosto de 2026
**Escopo:** inventário operacional de integrações e processo de incorporação de aplicações; não define conceitos da Informodinâmica Aplicada.

## Regra de autoridade

Os repositórios de produto são fontes operacionais de código e deploy. Este repositório canônico preserva teoria, governança, contratos e snapshots expressamente revisados. Uma conexão GitHub ↔ Lovable não transfere autoridade conceitual ao código da aplicação e não cria sincronização automática com o canônico.

```text
Lovable ↔ repositório GitHub do produto
                    ↓ revisão explícita
       snapshot/contrato no canônico
```

## Produtos consolidados

| Produto | Repositório operacional | Projeto Lovable | Estado em 3/8/2026 |
|---|---|---|---|
| PDIC | `HorusHypnotic/pdic` | ID não registrado neste inventário | GitHub e Lovable sincronizados; nenhum snapshot incorporado ao canônico |
| OPERA Control | `HorusHypnotic/opera-control` | `f07282fa-cd06-4234-a1b5-7d8965300c60` | Produto sincronizado; snapshot anterior preservado em `opera/control/frontend/` |
| OPERA Atlas | `HorusHypnotic/opera-atlas` | Confirmado, ID não registrado | Produto sincronizado; snapshot `4f56022c` preservado em `opera/atlas/frontend/` |
| Obra Flow | `HorusHypnotic/obra-flow` | Confirmado, ID não registrado | Produto sincronizado; sem snapshot canônico |
| REO | `HorusHypnotic/reo` | Confirmado, ID não registrado | Produto sincronizado; sem snapshot canônico |
| Smart Cotações | `HorusHypnotic/smart-cotacoes` | `f0a550c0-42f4-46dc-9f99-2bcffc7b3228` | Produto sincronizado e publicado; sem snapshot canônico |
| Canteiro de Obras Digital | `HorusHypnotic/canteiro-de-obras-digital` | Confirmado, ID não registrado | Produto sincronizado; documentação de produto preservada no canônico |

## Frentes em andamento

| Frente | Repositório ou origem | Estado |
|---|---|---|
| Radar Territorial oficial | `HorusHypnotic/radar-territorial` | Repositório oficial; `master` não deve receber a fusão enquanto os gates estiverem abertos |
| Radar Urbano Operador | `HorusHypnotic/radarurbanooperador` | Fonte Lovable saneada; candidata a interface operacional |
| OPERA Territorial | `HorusHypnotic/operaterritorial` / Lovable `11df8185-36f2-4f46-a8c1-ff4fe3aebbe7` | Terceira implementação auditada; integração deve ser seletiva |
| Copiloto de Obras | `opera/copiloto-obras/` | Runtime Python experimental no canônico; sem repositório operacional independente ou frontend Lovable confirmado |

## Identificados e backlog

| Produto | Estado |
|---|---|
| Gestão OS | Projeto Lovable identificado; ID e repositório ainda não registrados |
| Pedidos COD | Projeto/conta identificados; ID e repositório ainda não registrados |
| StockFlow | Ideia; escopo pendente |
| Direcione | Ideia; escopo pendente |
| VagaQuente | Backlog |
| BuildFast Delivery | Backlog |

Contas de acesso, endereços de e-mail e outras informações pessoais não devem ser registrados neste documento versionado.

## Radar Territorial: bloqueio de promoção

As três implementações territoriais têm responsabilidades complementares:

- `radar-territorial`: autoridade técnica, Python/GIS/QGIS, dados, manifestos, API e testes;
- `radarurbanooperador`: interface operacional, eventos urbanos, mapas, indicadores e ingestão;
- `operaterritorial`: allowlist, papéis, importação, versionamento otimista e auditoria encadeada.

A branch `integration/lovable-fusion` permanece isolada. A promoção para `master` está bloqueada até haver contratos comuns, saneamento de ambientes, revisão de RLS e autorização, testes web, estratégia de deploy/rollback e decisão explícita sobre os schemas Supabase.

## Regras de incorporação no canônico

1. Confirmar URL, branch e commit da origem antes da importação.
2. Importar como snapshot sem `.git` aninhado.
3. Não incorporar `.env`, credenciais, tokens, bancos locais, `node_modules/` ou artefatos de build.
4. Fornecer `.env.example` apenas com nomes de variáveis e valores inertes.
5. Registrar proveniência, limites e commit de origem no README da aplicação.
6. Executar instalação reproduzível, testes, lint, build e auditoria de dependências.
7. Não mascarar falhas de validação; registrar dívidas e riscos explicitamente.
8. Comparar futuras atualizações com o snapshot anterior antes de substituir arquivos.
9. Não copiar automaticamente todo produto operacional para o canônico; preferir contratos e snapshots necessários à governança.

Alterações feitas no canônico não retornam automaticamente ao Lovable ou ao repositório de origem. O envio à origem exige fluxo explícito e revisão separada.

## Atualização de um snapshot

Uma atualização deve ocorrer em área temporária, seguida de comparação com a versão incorporada. O relatório da integração deve registrar:

- commit anterior e novo commit de origem;
- arquivos adicionados, alterados e removidos;
- mudanças de configuração e banco de dados;
- resultados de testes, lint, build e auditoria;
- incompatibilidades, riscos e decisões humanas pendentes.

## Política de commit

- Revisar o conjunto exato de arquivos staged antes do commit.
- Separar migrações de dependências ou segurança quando tiverem risco próprio relevante.
- Não atribuir número de versão sem decisão de release e conformidade com a governança vigente.
- Não realizar push enquanto a revisão de encerramento não estiver concluída e reportada.
