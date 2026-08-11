# Evolução do ecossistema OPERA — 11 de agosto de 2026

**Classificação documental:** ACTIVE — diário técnico reconstruível

**Escopo:** registro factual das auditorias, decisões, estabilizações e gates realizados em 11/08/2026. Este documento não altera teoria, não promove artefatos ao núcleo canônico e não inicia experimentos reais.

## Síntese

O dia converteu diferentes produtos do OPERA em ciclos com fronteiras e gates verificáveis. OPERA Vision teve seu núcleo visual validado e recebeu compartilhamento read-only e um passe de experiência. Smart Cotações saiu de um preflight RED para GREEN após hardening e provas operacionais. Obra Flow foi separado institucionalmente de Pedidos COD e liberado, com ressalvas local-first, para uma operação real controlada. A auditoria do core rejeitou a ideia de um pipeline obrigatório entre Copiloto, Control, Atlas e Cofre. O preflight posterior do Copiloto, contudo, encontrou blockers de fechamento e terminou RED.

“Pronto”, “validado”, “GREEN” e “preparado para experimento real” são estados diferentes neste registro.

## Linha do tempo significativa

1. **OPERA Vision:** a V0.2 adicionou compartilhamento público read-only por token revogável e criação de EAP por presets ou item personalizado. O teste público confirmou geração, acesso anônimo sem CRUD, modos Execução/Saúde e revogação. A responsividade do share foi registrada como ressalva não bloqueante.
2. **OPERA Vision Experience Pass V0.2.1:** foram produzidos landing enxuta, orientação de primeiro uso, empty states e correção responsiva do share. Build e verificações estáticas passaram; a documentação preserva que publicação/validação visual final dependiam de ação humana.
3. **Product Scout:** Smart Cotações foi escolhido como campeão da frente comercial/compra. Vitrine Digital ficou como hipótese futura de canal; Build Fast Delivery e Vaga Quente foram congelados por dependência de rede/dados ainda não provados.
4. **Smart Cotações — preflight inicial:** a auditoria encontrou funções privilegiadas expostas além do necessário e classificou o produto como RED antes de qualquer compra real.
5. **Smart Cotações — hardening e recuperação:** privilégios de execução foram restringidos, chamadas anônimas bloqueadas e uma regressão de renderização foi restaurada sem tratar valores públicos client-side como secrets.
6. **Smart Cotações — fechamento GREEN:** comprador e administrador foram validados, o OAuth passou a exigir seleção explícita de conta e a chamada interna de memória econômica foi provada dentro de transação revertida. A prova criou duas observações apenas dentro da subtransação e deixou zero linhas após rollback.
7. **Smart Cotações Experience Pass:** a jornada foi apresentada como serviço semi-assistido: o cliente registra a necessidade, um operador humano busca/negocia propostas e o produto organiza comparação e decisão. Identidade PWA foi adicionada. A Compra Real #001 permaneceu não iniciada.
8. **Pedidos COD × Obra Flow:** a arqueologia e a decisão documental estabeleceram que são produtos distintos. O repositório executável `obra-flow` foi selecionado para o ciclo pedido → recebimento → nota → estoque.
9. **Obra Flow — preflight:** recebimento e movimento de estoque foram tornados atômicos em Dexie; recebimentos parcial e total, rejeição de excedente, notas/vencimentos, backup/restore, reload mobile e operação offline após a primeira carga foram testados. Veredito PASS COM RESSALVA local-first.
10. **OPERA Core:** Copiloto, Control, Atlas e Cofre foram auditados. A seta `Copiloto → Control → Atlas → Cofre` foi refutada como pipeline obrigatório; foram definidos fronteiras e contrato mínimo de interoperabilidade V0. Copiloto foi escolhido como próximo campeão por decisão documentada.
11. **Copiloto — preflight operacional:** a inspeção encontrou cálculo incorreto de meia diária, fechamento não transacional, mutação silenciosa possível do histórico, inconsistências cross-obra e ausência de evidência operacional completa. O veredito foi RED; nenhuma quinzena real foi iniciada.

## Produtos e evidências

### OPERA Vision

- O V0 já possuía aceite operacional com ressalvas; a V0.1 registrou estabilização das correções diretamente afetadas.
- A V0.2 comprovou share público read-only no backend, revogação e EAP de baixa fricção.
- A V0.2.1 tratou landing, onboarding contextual, empty states e responsividade do share.
- A política pública não se limita a esconder botões: uma RPC retorna payload autorizado e a policy de Storage limita a leitura da imagem compartilhada.
- O Google OAuth possui suporte a seleção controlada de conta no ciclo estabilizado relatado.
- O contrato de integração V0 prepara o Vision como camada visual futura, sem implementar integração nem torná-lo dono do domínio alheio.

Estado ao final do dia: **VALIDADO COM RESSALVAS**, com Experience Pass tecnicamente pronto e sem V0.3 iniciada.

### Smart Cotações

- Campeão do Product Scout para provar uma compra real.
- O RED inicial permanece documentado como fotografia anterior ao hardening.
- Funções privilegiadas preservaram `SECURITY DEFINER` e `search_path=public`, mas perderam execução anônima/indevida conforme a matriz.
- Comprador comum viu apenas seu dashboard; admin acessou `/admin`; `record_price_observation` permaneceu inacessível diretamente ao comprador.
- A chamada legítima interna foi exercitada com rollback, sem contaminar a memória econômica.
- A jornada explicita a participação humana na obtenção e negociação das propostas.
- PWA recebeu identidade instalável; não foi prometida sincronização offline.

Estado ao final do dia: **GREEN**. `SMART COTAÇÕES — COMPRA REAL #001` está **PREPARADA, NÃO INICIADA**.

### Obra Flow

- Pedidos COD e Obra Flow foram canonizados documentalmente como produtos distintos; o histórico nominal do bundle não foi apagado.
- Obra Flow permaneceu local-first, com IndexedDB/Dexie como fonte operacional no dispositivo.
- Recebimento e entrada de estoque são atômicos; saldo, parcial/total e rejeição de excedente foram provados.
- Nota fiscal, pedido e obra têm vínculos validados; vencimentos persistem.
- Backup é versionado, validado antes da substituição e restaurado atomicamente.
- Manifest, ícones, service worker, reload e primeira carga seguida de uso offline passaram.
- A ressalva é estrutural: não existe cópia externa automática, colaboração ou continuidade multi-dispositivo; o operador deve exportar backups em marcos críticos.

Estado ao final do dia: **PASS COM RESSALVA**. `OBRA FLOW — OPERAÇÃO REAL #001` está **PREPARADA, NÃO INICIADA**.

### OPERA Core e Copiloto

- Copiloto é dono de registro diário, presença/equipe, produção, estoque operacional, ocorrência e fechamento quinzenal.
- Control é dono de ECO, ICO, MDEO e decisão/restauração correspondente.
- Atlas é dono de baseline, fechamento por período, snapshot/hash e histórico próprio.
- Cofre é candidato a custódia curada/memória interproduto; não é passagem obrigatória.
- Vision representa visualmente a obra e não assume os domínios anteriores.

O Copiloto continuou sendo a escolha correta para o próximo gate do core, mas o gate revelou risco real. Seu preflight terminou **RED**: a Quinzena Real #001 não foi preparada e permanece **NÃO INICIADA**.

## Princípios consolidados

1. Produto pronto não significa produto provado.
2. Cada produto deve provar sozinho seu ciclo mínimo antes de integração.
3. Integração não deve preceder identidade e fronteiras canônicas.
4. O usuário humano pode ser parte intencional da arquitetura, como na cotação semi-assistida.
5. Local-first pode ser aceitável quando o contexto e as salvaguardas operacionais o justificarem.
6. Share público deve ser read-only no backend, não apenas na interface.
7. Lovable é camada de execução/publicação; não substitui necessariamente a autoria versionada.
8. Git e o repositório são a fonte de verdade do código.
9. Google Drive não é fonte canônica.
10. Evidência operacional tem prioridade sobre expansão de features.

## Decisões do dia

1. **Pedidos COD e Obra Flow são produtos distintos.** O repositório `obra-flow` executa o domínio operacional selecionado; isso não extingue Pedidos COD.
2. **Smart Cotações é o campeão da frente comercial/compra.** Sua próxima prova é uma compra real controlada, não uma expansão de plataforma.
3. **Copiloto é o próximo campeão do core.** A escolha determinou o próximo teste, não garantiu aprovação; o preflight subsequente terminou RED.
4. **`Copiloto → Control → Atlas → Cofre` não é pipeline canônico obrigatório.** São responsabilidades independentes que podem participar de trajetórias condicionais.
5. **Interoperabilidade futura exige contrato mínimo explícito.** Identidade, tipo de evento, proveniência, idempotência e semântica temporal não podem surgir por acoplamento implícito.

## Arquitetura emergente

```text
CLIENTE / CAMPO
│
├── Smart Cotações
│   necessidade → propostas → negociação humana assistida → decisão
│
├── Obra Flow
│   pedido → recebimento → nota → estoque
│
├── Copiloto
│   registro diário → presença → produção → ocorrência → quinzena
│
├── Control
│   ECO → ICO → MDEO → decisão/restauração
│
├── Atlas
│   baseline → fechamento por período → snapshot/hash → histórico
│
├── Vision
│   representação visual da obra
│
└── Cofre
    custódia/memória interproduto candidata
```

Este é um mapa de responsabilidades, **não um pipeline obrigatório**.

## Estado dos produtos ao final do dia

| Produto | Estado | Próximo experimento | Desenvolvimento |
|---|---|---|---|
| OPERA Vision | VALIDADO / PASS COM RESSALVA | validação visual curta da V0.2.1 publicada, quando aplicável | congelar domínio; não iniciar V0.3 |
| Smart Cotações | GREEN | Compra Real #001 | congelado até início explícito do protocolo |
| Obra Flow | PASS COM RESSALVA | Operação Real #001 em um dispositivo, com backups | congelado até início explícito do protocolo |
| Copiloto | RED | estabilizar fechamento/integridade e repetir preflight | somente blockers do preflight |
| Control | OPERACIONAL isoladamente | experimento próprio após definição explícita | sem integração automática |
| Atlas | OPERACIONAL isoladamente | fechamento próprio controlado | sem equiparar período à quinzena |
| Cofre | CONCEITUAL/LOCAL | provar custódia curada antes de qualquer dependência | não usar como pipeline obrigatório |
| Vaga Quente | CONGELADO | aguardar fonte concreta de vagas e trabalhadores | não desenvolver matching agora |
| Build Fast Delivery | CONGELADO | aguardar volume real de pedidos/entregas | não construir rede logística agora |
| Vitrine Digital | CONCEITUAL | após piloto Smart, testar canal mínimo com oferta real | não construir marketplace standalone |

## Experimentos preparados, não iniciados

| Experimento | Estado em 11/08/2026 |
|---|---|
| SMART COTAÇÕES — COMPRA REAL #001 | PREPARADO — NÃO INICIADO |
| OBRA FLOW — OPERAÇÃO REAL #001 | PREPARADO — NÃO INICIADO |
| COPILOTO — QUINZENA REAL #001 | NÃO PREPARADO — PREFLIGHT RED — NÃO INICIADO |

## Métricas rastreáveis do registro

- 5 decisões arquiteturais/produto destacadas neste diário.
- 3 preflights documentados no dia: Smart Cotações, Obra Flow e Copiloto.
- 2 produtos liberados documentalmente para experimento real: Smart Cotações e Obra Flow.
- 2 experimentos reais preparados e não iniciados.
- 4 sistemas centrais auditados conjuntamente: Copiloto, Control, Atlas e Cofre.
- 1 contrato de interoperabilidade V0 produzido no repositório canônico.
- 2 produtos institucionalmente distinguidos na decisão Pedidos COD × Obra Flow.

Os números acima contam artefatos e gates identificáveis; não medem impacto comercial nem validação científica.

## Fontes de reconstrução

- `docs/OPERA-PRODUCT-SCOUT-2026-08-11.md`;
- `docs/decisoes/DEC-PRODUTO-IDENTIDADE-PEDIDOS-COD-OBRA-FLOW-2026-08-11.md`;
- `docs/arquitetura/OPERA-CORE-SYSTEMS-MAP-2026-08-11.md`;
- `docs/arquitetura/OPERA-CORE-BOUNDARIES-2026-08-11.md`;
- `docs/arquitetura/OPERA-CORE-INTEROPERABILITY-CONTRACT-V0.md`;
- `docs/decisoes/DEC-OPERA-CORE-NEXT-CHAMPION-2026-08-11.md`;
- relatórios versionados de V0.2/V0.2.1 no repositório `opera-vision`;
- relatório e protocolo versionados no repositório `smart-cotacoes`;
- decisão, relatório e protocolo versionados no repositório `obra-flow`;
- `docs/COPILOTO-OPERATIONAL-PREFLIGHT-2026-08-11.md` na branch de preflight do repositório `copilotodeobras`.

## Bloco curto para GitHub

Em 11 de agosto de 2026, o ecossistema OPERA passou a registrar gates operacionais explícitos por produto. OPERA Vision validou seu compartilhamento read-only e recebeu melhorias de primeiro uso; Smart Cotações encerrou o preflight em GREEN após hardening; Obra Flow provou seu ciclo local-first e ficou preparado, com ressalvas, para uma operação real; e o core teve responsabilidades e interoperabilidade mapeadas. O preflight do Copiloto encontrou blockers e terminou RED, preservando a regra central do dia: nenhum experimento real começa apenas porque o software parece pronto.
