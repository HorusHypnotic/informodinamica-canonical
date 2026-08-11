# DEC — Próximo campeão dos OPERA Core Systems — 11/08/2026

**Estado:** `ACTIVE` — decisão operacional datada, reversível e não normativa
**Decisão:** preparar o **Copiloto de Obras** para o próximo preflight independente
**Execução do preflight:** não iniciada e não autorizada por este documento

## 1. Contexto

Smart Cotações e Obra Flow estão congelados aguardando suas provas reais. A arqueologia do núcleo localizou Copiloto, Control, Atlas e Cofre, testou sua executabilidade local e mostrou que ainda não existe integração. É necessário escolher um único próximo sistema por estado atual, não por preferência histórica.

## 2. Critérios e escala

Cada critério recebe 0–5:

1. proximidade de ciclo completo;
2. valor operacional;
3. menor dependência dos outros;
4. menor risco arquitetural;
5. capacidade de produzir evidência;
6. capacidade de funcionar sozinho;
7. importância para o ciclo de uma quinzena.

Pontuação maior é melhor; no critério 4, 5 significa menor risco.

## 3. Pontuação

| Candidato | Ciclo | Valor | Independência | Baixo risco | Evidência | Sozinho | Quinzena | Total / 35 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Copiloto | 5 | 5 | 5 | 4 | 5 | 5 | 5 | **34** |
| Atlas | 4 | 4 | 5 | 2 | 5 | 5 | 4 | **29** |
| Control | 3 | 4 | 4 | 2 | 4 | 4 | 3 | **24** |
| Cofre | 2 | 3 | 4 | 2 | 4 | 3 | 3 | **21** |

### Copiloto — 34

- aplicação oficial, deploy e build válidos;
- já contém obra, operação diária, ocorrência, quinzena, fechamento e snapshot;
- é fonte atual de estoque/operação no primeiro fechamento real;
- gera evidência operacional sem depender de classificação Control ou custódia Cofre;
- riscos remanescentes são delimitáveis: ausência de suíte de produto, lint quebrado, sobreposição com Atlas e semântica exata do snapshot.

### Atlas — 29

- operacional e usado como fonte atual de diárias;
- possui fechamento, hash, reabertura e histórico mais maduros;
- escopo amplo, sobreposição elevada e 1 único teste superficial aumentam risco;
- um preflight agora poderia confundir validação do produto inteiro com prova da fronteira de memória.

### Control — 24

- build válido e domínio ECO/ICO/MDEO executável;
- não possui obra/período compartilhável e não recebe evento real do Copiloto;
- métricas permanecem em calibração; MDEO não possui validade operacional demonstrada;
- preflight independente é possível, mas menos próximo da quinzena real.

### Cofre — 21

- CLI/Git/estrutura existem, porém são locais, acoplados a path e sem testes/remote;
- papel de custódia interproduto é candidato, não validado;
- fazer dele campeão agora induziria risco de criar infraestrutura antes da necessidade.

## 4. Decisão

O próximo campeão é **Copiloto de Obras**.

A decisão não o torna sistema central, owner da identidade da obra nem entrada obrigatória para Control/Atlas/Cofre. Ela seleciona o produto com maior capacidade de completar sozinho um ciclo operacional mínimo e produzir evidência direta na quinzena.

## 5. Compatibilidade e riscos

Compatibilidade:

- mantém a topologia não linear do adendo de 08/08;
- respeita `DEC-ARQ-002` e não usa e-mail/tenant/nome como identidade canônica;
- não altera TPC, TDO, ECO (`IDR-0010`/`MET-001`) ou ICO (`IDR-0011`/`MET-002`);
- não exige contrato interproduto para validar o Copiloto isoladamente.

Riscos preservados:

- produto sem suíte automatizada própria;
- lint preexistente amplamente vermelho;
- build emite deprecações e avisos de chunks;
- fechamento quinzenal precisa de prova transacional/operacional e verificação de imutabilidade real;
- presença/estoque/produção se sobrepõem ao Atlas;
- IDs reais da obra em andamento ainda não foram reconciliados.

Não há alteração de documentos canônicos nem criação de ID. A decisão é arquitetural operacional; se usada para mudar teoria, fronteiras normativas ou métricas, exigirá novo ciclo `PRT-001`/`PRT-002` e aprovação humana.

## 6. Missão futura preparada — não executar

# COPILOTO DE OBRAS — PREFLIGHT OPERACIONAL V0

## Objetivo

Provar, em ambiente controlado e sem integração, que uma única obra fictícia percorre criação → registro diário → presença/produção/estoque → ocorrência → fechamento de quinzena → snapshot/histórico → reabertura de consulta, preservando isolamento, autoria e coerência.

## Escopo mínimo

1. confirmar branch/HEAD/deploy canônicos do Copiloto;
2. auditar migrations efetivamente aplicadas para obra, acesso, quinzenas, snapshots e auditoria;
3. criar uma obra sintética e dois usuários sintéticos/autorizados;
4. registrar dois dias mínimos com presença, uma produção, uma movimentação de estoque e uma ocorrência não sensível;
5. fechar a quinzena com confirmação explícita;
6. conferir snapshot, totais, histórico, audit trail e criação da próxima quinzena;
7. sair/entrar e comprovar persistência;
8. comprovar isolamento do segundo usuário;
9. verificar que a ocorrência permanece ocorrência e não vira ECO automaticamente;
10. exportar/consultar evidência sem enviar a Control, Atlas, Cofre ou Drive.

## Blockers de entrada

- ambiente público não corresponde a `origin/main`/HEAD declarado;
- migrations do ciclo quinzenal não aplicadas;
- ausência de duas identidades de teste autorizadas;
- risco de atingir dados reais;
- falta de mecanismo de limpeza controlada ou obra sintética isolável;
- regressão de renderização/autenticação;
- fechamento não exige confirmação explícita.

## Dados sintéticos

- obra: `PREFLIGHT COPILOTO V0 — NÃO REAL`;
- período: datas explicitamente fictícias dentro de uma janela autorizada;
- pessoas: `Pessoa Teste A/B`, sem CPF, telefone ou e-mail pessoal no domínio;
- presença: um presente e um ausente;
- produção: uma unidade simples e mensurável;
- estoque: uma entrada e uma saída compatível;
- ocorrência: atraso fictício sem dano, foto ou dado sensível;
- observação de fechamento: `PREFLIGHT V0 — DADOS SINTÉTICOS`.

## Critérios PASS

- build reproduzível e aplicação renderiza;
- obra e dados isolados por autorização;
- registros persistem após nova sessão;
- apenas uma quinzena aberta por obra;
- registros do período associam-se à quinzena correta;
- fechamento cria snapshot coerente e trilha de auditoria;
- fechamento anterior não aceita mutação silenciosa;
- nova quinzena é criada sem apagar o snapshot;
- histórico recupera a quinzena fechada;
- ocorrência não é promovida automaticamente a ECO;
- nenhum produto externo é necessário.

## Critérios FAIL/BLOCKED

- vazamento entre usuários/obras;
- perda ou alteração silenciosa após fechamento;
- totais do snapshot divergem das entradas;
- duas quinzenas abertas simultâneas;
- exclusão/cascata destrói snapshot fechado;
- acesso indevido ao snapshot;
- dependência de Control, Atlas, Cofre ou Drive para completar o ciclo;
- ambiente/migration não verificável;
- teste alcança dados reais fora da autorização.

## Condição de parada

Parar após o veredito do ciclo sintético e seu relatório. Não integrar sistemas, não iniciar operação real, não corrigir dívida fora de blocker, não promover contrato V0 e não alterar Smart, Obra Flow ou Vision.

## Entregáveis futuros

- relatório de preflight com evidências e veredito GREEN/YELLOW/RED;
- inventário de blockers reais;
- decisão separada sobre aptidão para Operação Real #001 do Copiloto;
- nenhuma integração como efeito colateral.

## 7. Condição de parada desta decisão

A missão futura está preparada, mas não iniciada. O próximo passo depende de autorização humana explícita em outra missão.
