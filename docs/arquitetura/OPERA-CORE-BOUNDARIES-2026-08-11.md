# Fronteiras dos OPERA Core Systems — 11/08/2026

**Estado documental:** `ACTIVE` — proposta arquitetural datada, não normativa
**Relação:** complementa o mapa de sistemas da mesma data
**Não faz:** integração, redesenho de produto ou alteração da TPC/TDO

## 1. Regra de fronteira

Uma fronteira é atribuída ao sistema que precisa preservar o estado para cumprir sua função independente. Consumo não transfere ownership. Cópia não cria autoridade. Um registro operacional não se torna ECO por transporte, e um snapshot exportado não torna o Cofre owner da memória do produto.

Termos da matriz:

- `OWNER`: cria e governa o estado em seu domínio;
- `CONSUMER`: usa o estado sem governá-lo;
- `REFERENCE`: mantém referência/proveniência sem duplicar autoridade;
- `NONE`: fora da fronteira;
- `CONFLICT`: duas implementações reivindicam semântica ainda não reconciliada.

## 2. Definições propostas

### Copiloto de Obras

**É:** superfície operacional do canteiro para registrar estado diário e produzir continuidade de uma quinzena por obra.

**Registra:** presença, alocação, equipes, produção, estoque, atividades, ocorrências, observações e evidências de campo disponíveis no produto.

**Não deveria:** diagnosticar automaticamente toda ocorrência como ECO; calcular autoridade teórica do ICO; tornar-se ERP, BIM, comprador ou custódia canônica transversal.

**Unidade operacional:** `obra_id` local + dia, agrupados por `quinzena_id` local.

**Saída mínima futura:** registro/ocorrência/fechamento com origem, ID externo, período e proveniência. A saída não precisa atravessar Control ou Atlas quando não houver necessidade.

### OPERA Control

**É:** aplicação de classificação e diagnóstico de falhas coordenacionais e de análise econômica operacional.

**Observa/calcula:** ECO, `ICO_campo`, recorrência, margem corroída, causas, recomendações, decisões MDEO e indicadores derivados existentes.

**Recebe/captura:** atualmente captura diretamente por usuário. Futuramente pode consumir ocorrências externas, mas deve preservar a distinção entre fato de origem e classificação analítica.

**Não deveria:** ser owner do registro bruto do campo, fabricar identidade de obra, impor seu `user_id` como identidade organizacional ou apresentar métricas em calibração como validação causal.

**Saída mínima futura:** decisão de classificação (aceito/rejeitado como ECO), diagnóstico, valores calculados, responsável, ação e proveniência da entrada.

### OPERA Atlas

**É:** aplicação operacional ampla cuja fronteira distintiva é congelar, versionar, auditar e reconstruir estados por obra/período.

**Congela:** dados selecionados pelas funções de fechamento em `snapshot_json`, com hash, autoria, intervalo e trilha de reabertura.

**Baseline:** estado de referência explícito contra o qual mudanças são comparáveis. No produto, há estruturas de estado e comparação; o termo não autoriza tratar todo dado corrente como baseline formal.

**Fechamento:** consolidação server-side de um intervalo/competência do Atlas. Pode ser reaberto com registro; não equivale à quinzena irreversível do Copiloto.

**Periodicidade real:** competência/intervalo informado no Atlas, frequentemente mensal; não existe equivalência automática com quinzena.

**Memória histórica:** snapshots, hashes, versões, períodos fechados, logs e eventos que permitem reconstruir o estado do próprio Atlas.

**Não deveria:** funcionar como barramento do ecossistema, substituir o Cofre como acervo transversal ou assumir ownership de fatos externos apenas por copiá-los.

### Cofre de Memória Absoluta

**É hoje:** repositório Git local, filesystem documental, CLI PowerShell, schemas e protótipo de Engines, sincronizados em pasta do Google Drive.

**Identifica:** representações locais por namespaces e contador JSON. Não identifica obras canonicamente e não garante unicidade entre clones/processos.

**Preserva:** arquivos, histórico Git e contexto curado local. Pode futuramente custodiar pacotes evidenciários interproduto, sem reimplementar snapshots internos.

**Natureza:** combinação de acervo privado + protocolo em formação + CLI/protótipo executável. Não é produto público nem infraestrutura oficial.

**Git:** mantém genealogia e comparação local; sem remote configurado. Git canônico da disciplina permanece separado.

**Google Drive:** sincroniza/espelha a pasta local e pode auxiliar recuperação; não é fonte canônica.

**Identidade canônica da obra:** continuidade verificável de um objeto físico entre aliases dos sistemas, não o nome da pasta, e-mail, tenant ou qualquer UUID isolado.

## 3. Matriz de responsabilidades

| Responsabilidade | Copiloto | Control | Atlas | Cofre |
|---|---|---|---|---|
| Captura diária | OWNER | NONE | CONFLICT | NONE |
| Presença | OWNER | NONE | CONFLICT | REFERENCE |
| Produção | OWNER | NONE | CONFLICT | REFERENCE |
| Estoque operacional | OWNER | NONE | CONFLICT | REFERENCE |
| Ocorrências | OWNER | CONSUMER | REFERENCE | REFERENCE |
| ECO | REFERENCE | OWNER | REFERENCE | CONFLICT |
| ICO | NONE | OWNER | NONE | REFERENCE |
| Evidências de origem | OWNER | REFERENCE | CONFLICT | REFERENCE |
| Evidências analíticas | REFERENCE | OWNER | CONSUMER | REFERENCE |
| Baseline | REFERENCE | NONE | OWNER | REFERENCE |
| Fechamento quinzenal | OWNER | NONE | REFERENCE | REFERENCE |
| Fechamento de período Atlas | NONE | NONE | OWNER | REFERENCE |
| Histórico operacional interno | OWNER | OWNER | OWNER | NONE |
| Custódia transversal de pacote | REFERENCE | REFERENCE | REFERENCE | OWNER proposto, ainda não validado |
| Identidade da obra | CONSUMER | CONSUMER | CONSUMER | REFERENCE; nenhum owner implementado |
| Exportação | OWNER | OWNER | OWNER | CONSUMER/OWNER de reexportação curada |
| Memória de produto | OWNER | OWNER | OWNER | NONE |
| Memória curada entre ciclos | REFERENCE | REFERENCE | REFERENCE | OWNER proposto |

## 4. Conflitos que permanecem abertos

### C1 — captura operacional Copiloto × Atlas

Ambos armazenam presença, produção, estoque e ocorrências. A sobreposição é histórica e real. Não há evidência suficiente para remover módulos. O preflight escolhido deve observar qual sistema é fonte primária em uma obra e registrar divergências, sem sincronizar.

### C2 — duas semânticas de fechamento

Copiloto fecha quinzena de campo e cria snapshot de presença/diárias. Atlas fecha intervalo/competência mais amplo com snapshot/hash e possibilidade auditada de reabertura. Devem permanecer tipos distintos no contrato.

### C3 — Atlas × Cofre como “memória”

Atlas possui memória operacional implementada. Cofre possui memória documental transversal local. Copiar o snapshot não transfere ownership e não justifica novo banco. A única fronteira não redundante candidata para o Cofre é custódia curada do pacote final.

### C4 — ECO Control × ECO Cofre

Control implementa entidade operacional de diagnóstico; Cofre documenta um tipo de representação e gera IDs `ECO-*`. Esses namespaces não são equivalentes nem compatíveis por evidência. O Cofre não deve emitir identificador com aparência canônica sem registrar `source_system`, namespace e autoridade.

### C5 — identidade sem owner

Nenhum dos quatro sistemas governa hoje a correspondência interproduto de obra. Isso exige manifesto/contrato de aliases. Não exige serviço, banco ou “Kernel”.

### C6 — fonte atual da primeira quinzena

O fechamento em andamento declara Atlas como fonte mais confiável de diárias e Copiloto como fonte mais atual de estoque/operação. Isso mostra complementaridade pragmática e também duplicidade; o fato deve ser observado, não transformado em arquitetura permanente.

## 5. Vocabulário mínimo comum

O vocabulário já observável e suficientemente neutro é:

- `obra`: objeto físico/operacional referenciado;
- `periodo`: intervalo com timezone e sem equivalência implícita entre produtos;
- `registro`: representação persistida na origem;
- `evento`: mudança ou ocorrência observada;
- `evidencia`: artefato/afirmação ligado à origem e integridade;
- `snapshot`: estado congelado por regra declarada;
- `diff`: relação calculável entre estados, não necessariamente armazenada;
- `origem`: sistema e ID local;
- `actor`: agente que registrou/decidiu, separado da identidade da obra;
- `timestamp`: instante com timezone.

Esse vocabulário não cria event sourcing universal, event bus ou ontologia compartilhada.

## 6. Critérios de aceitação de fronteira

Uma futura troca somente respeita estas fronteiras se:

1. não substituir o ID local;
2. carregar origem e proveniência;
3. distinguir fato, inferência e decisão;
4. não promover ocorrência a ECO automaticamente;
5. não equiparar períodos distintos;
6. não transferir ownership por cópia;
7. permitir rejeição e lacuna explícitas;
8. não usar e-mail, tenant, nome ou path como identidade canônica;
9. não depender de Google Drive como fonte da verdade;
10. permanecer executável manualmente antes de qualquer infraestrutura.

## 7. Relação com autoridade canônica

As fronteiras são compatíveis com a separação de identidades de `DEC-ARQ-002`, com a topologia não linear do adendo de 08/08 e com a primariedade analítica das representações (`IDR-0002`, `LAW-001`). Elas não redefinem ECO (`IDR-0010`/`MET-001`), ICO (`IDR-0011`/`MET-002`) nem Slektip (`IDR-0009`/`MET-005`). Conflitos de nomenclatura e maturidade foram preservados em vez de resolvidos silenciosamente.
