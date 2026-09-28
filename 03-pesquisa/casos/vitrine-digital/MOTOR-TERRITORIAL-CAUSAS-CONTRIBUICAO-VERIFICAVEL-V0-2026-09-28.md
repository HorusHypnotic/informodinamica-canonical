# MOTOR TERRITORIAL DE CAUSAS E CONTRIBUIÇÃO VERIFICÁVEL — V0
**Data:** 2026-09-28
**Estado:** CANDIDATE / DOCUMENTAL / NÃO IMPLEMENTADO

## Contexto
Redencenses Protetores rompeu a bolha observada do ecossistema em conteúdo ligado a doação para ONG local. Houve bazar em 26–27/09/2026; a frente agora é recorrente: conhecer o projeto e contribuir ao longo do tempo. Isso é observação, não causalidade provada.

Fazenda Esperança: WAITING_REAL_DATA. Não completar dados ausentes.

## Tese
```
causa real → necessidade → campanha → comunidade conhece
→ pessoa/empresa ajuda → contribuição/evidência
→ resultado/aplicação quando verificável
→ prestação de contas → nova história real → nova descoberta
```

A empresa não compra reputação da causa. Contribui por mecanismo declarado; a Vitrine comunica fatos evidenciados.

## Mecanismos empresariais candidatos
- AMPLIFICA: mídia/QR/balcão/rede;
- DOA: contribuição direta;
- MATCHING: complementa doações até regra/teto declarado;
- VENDA_COM_CAUSA: valor fixo/percentual explicitamente destinado;
- EM_ESPECIE: produto/material;
- SERVICO: trabalho doado/subsidiado;
- PONTO_SOLIDARIO: arrecadação/divulgação física;
- MOBILIZA: funcionários/clientes/fornecedores;
- META_COLETIVA: várias empresas em meta pública.

Nenhum mecanismo implica parceria, pagamento, endorsement ou benefício fiscal sem evidência/contrato aplicável.

## Estados de evidência social
```
PRESENTED → SUPPORT_DECLARED → CONTRIBUTION_EVIDENCED
→ RECEIVED_RECORDED → APPLICATION_EVIDENCED
```

```
VIU != AJUDOU
CURTIU != AJUDOU
COMPARTILHOU != DOOU
PROMETEU != DOOU
COMPROVANTE_ENVIADO != LIQUIDAÇÃO_CONFIRMADA
DOOU != RECURSO_APLICADO
```

Promoção exige proveniência, ator, timestamp e vínculo com causa/campanha.

## Evidência financeira e privacidade
Reusar regra patrimonial: comprovantes são FINANCIAL_SENSITIVE.
- não guardar em Git, URL/log público ou localStorage;
- upload não prova liquidação;
- exposição pública só por projeção segura;
- retenção/exclusão/acesso exigem política;
- não publicar chave, CPF ou dados bancários;
- ranking não pode transformar valor declarado em fato sem verificação.

## Empresa que Ajuda
Capacidade candidata baseada em fatos verificáveis: campanhas apoiadas, contribuições confirmadas, itens/serviços fornecidos, matching cumprido, ações concluídas.

Não criar score moral, selo de “empresa boa” ou reputação comprável.

## Redencenses Protetores
Laboratório inicial:
```
CONHEÇA → ENTENDA A NECESSIDADE → VEJA O QUE JÁ ACONTECEU
→ AJUDE AGORA → VEJA A CONSEQUÊNCIA → ACOMPANHE A PRÓXIMA NECESSIDADE
```
Bazar é evento na linha do tempo. Resultado só entra quando fornecido/evidenciado.

## Fazenda Esperança
Segundo domínio potencial para testar generalização. Estado WAITING_REAL_DATA. Não publicar/cadastrar detalhes não fornecidos.

## Empresas da Vitrine
Podem contribuir por capacidade real: transporte, água/gelo, material, comunicação, serviço, ponto de coleta, mídia, matching. Exemplos não significam compromisso de empresas existentes.

```
AJUDOU_CAUSA != CLIENTE_PAGANTE
CLIENTE_PAGANTE != AJUDOU_CAUSA
```

## Motor orgânico
```
campanha → distribuição → atenção → entrada atribuída
→ participação → contribuição evidenciada
→ resultado/aplicação → prestação de contas
```

## Gates
1. arqueologia fresca da Central de Causas em runtime/DB;
2. reconciliar drift Git ↔ runtime;
3. identificar tabelas/RPCs existentes;
4. preservar RLS/GRANT/menor privilégio;
5. provar se mecanismos cabem no modelo atual;
6. DDL somente com gap estrutural provado;
7. PETECO test/build;
8. QA mobile;
9. publicação por gate humano.

## Drift observado
Busca fresca no default branch de HorusHypnotic/vitrinedigital-cod em 2026-09-28 não localizou por texto os artefatos esperados da Central de Causas social. Isso NÃO prova ausência em produção.

```
GIT_SEARCH = NO_MATCH
RUNTIME_SOCIAL_CAUSES = PREVIOUSLY_OBSERVED
GIT_RUNTIME_RELATION = UNKNOWN / DRIFT_TO_INVESTIGATE
```

Não confundir com causas_raiz do OPERA Control, domínio operacional distinto.

## Estado
- motor territorial: CANDIDATE;
- Empresa que Ajuda: CANDIDATE;
- matching: CANDIDATE;
- Protetores: laboratório disponível; resultado do bazar UNKNOWN;
- Fazenda Esperança: WAITING_REAL_DATA;
- implementação: NOT_STARTED;
- custo: R$ 0.
