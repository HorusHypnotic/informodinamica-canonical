# Revisão pré-commit — OPERA Core Systems — 11/08/2026

**Estado:** `ACTIVE` — relatório de revisão documental da sessão
**Branch:** `research/opera-core-systems-map`
**Escopo revisado:** quatro artefatos da arqueologia/decisão; nenhum código de produto

## 1. Arquivos da sessão

- `docs/arquitetura/OPERA-CORE-SYSTEMS-MAP-2026-08-11.md`;
- `docs/arquitetura/OPERA-CORE-BOUNDARIES-2026-08-11.md`;
- `docs/arquitetura/OPERA-CORE-INTEROPERABILITY-CONTRACT-V0.md`;
- `docs/decisoes/DEC-OPERA-CORE-NEXT-CHAMPION-2026-08-11.md`;
- este relatório.

Permanecem fora do escopo e não serão incluídos os itens preexistentes não rastreados `docs/OPERA-PRODUCT-SCOUT-2026-08-11.md`, `docs/decisoes/DEC-MARCA-001-arquitetura-de-marca-opera.md`, `docs/design-system-opera-v0.1.md` e `workspace/`.

## 2. Compatibilidade com fontes superiores

| Fonte | Resultado |
|---|---|
| `CONSTITUICAO.md` | compatível: Git canônico permanece fonte da disciplina; Drive não foi promovido |
| `DOCUMENTO_CANONICO.md` | compatível: documentos são arquitetura operacional, não teoria |
| `GLOSSARIO_CANONICO.md` | compatível: nenhum ID criado/reutilizado; ECO/ICO/Slektip mantêm IDs vigentes |
| `01-teoria/TPC.md` | compatível: TPC usada como lente, sem inferir causalidade ou eficácia |
| `02-aplicacoes/TDO.md` | compatível com ressalva: `ICO_campo`, MDEO e TRO são descritos pelo estado de implementação, não canonizados |
| `DEC-ARQ-002` | compatível: acesso, organização, obra, recurso, alocação e autorização permanecem distintos |
| cartografia/checkpoints de 08/08 e 10/08 | compatível: topologia não linear e quinzena real em andamento foram preservadas |

## 3. Contradições e conflitos preservados

1. Copiloto e Atlas duplicam captura operacional; não foi escolhido owner universal.
2. Fechamento quinzenal do Copiloto e fechamento por período do Atlas não foram equiparados.
3. Atlas e Cofre usam “memória” com semânticas diferentes; ownership foi separado.
4. Cofre gera namespace `ECO-*`, mas ele não foi declarado equivalente ao ECO do Control ou aos IDs canônicos.
5. ADR local do Kernel no Cofre conflita com o checkpoint canônico que mantém o Kernel como protótipo interno; o conflito foi registrado.
6. Control não possui identidade de obra; `canonical_obra_id` foi proposto como manifesto, não implementado.
7. Google Drive aparece como sincronização/backup e candidato de preservação; não foi tratado como fonte canônica.

Nenhuma contradição foi resolvida silenciosamente.

## 4. Duplicidades, IDs e órfãos

- nenhum novo `IDR`, `LAW`, `HYP`, `MET` ou `PRT` foi criado;
- `canonical_obra_id` foi explicitamente desambiguado de Identidade Operacional (`IDR-0013`, Draft);
- não foi criado documento concorrente de definição de ECO/ICO;
- o contrato referencia o mapa e as fronteiras pela mesma família nominal e é autocontido;
- a decisão contém a missão futura completa e não depende de arquivo ainda inexistente;
- não foram encontrados artefatos novos órfãos dentro do conjunto da sessão.

## 5. Evidência, inferência e proposta

- **fatos:** paths, remotes, HEADs, schemas, funções, builds, testes, lints e estado Git;
- **inferências:** classificação A–F, leitura TPC/TDO, conflitos e topologia;
- **propostas:** fronteiras owner/consumer, contrato V0, score e campeão;
- **não comprovado:** equivalência real de obra entre bancos, aplicação efetiva das migrations em produção, recuperação do Drive, eficácia causal e fechamento final da quinzena.

A gradação de confiança foi registrada no mapa. Documentação histórica não foi usada como prova única de código ou uso operacional.

## 6. Cartografia epistemológica

A missão exigiu correspondência entre teoria, produto e implementação, portanto `PRT-002` é aplicável como disciplina de separação de camadas. O conjunto mantém:

- conceitos canônicos com seus IDs;
- código executável como evidência de implementação;
- checkpoints como evidência datada de uso;
- classificações e fronteiras como inferências/propostas reversíveis;
- critérios que permitiriam refutar a arquitetura proposta no preflight.

Não houve incorporação de fonte externa à base normativa.

## 7. Validações executadas

| Gate | Resultado |
|---|---|
| build Copiloto | PASS, com warnings/deprecações |
| lint Copiloto | FAIL preexistente: 14.354 problemas |
| build Control | PASS, com warnings/deprecações |
| lint Control | FAIL preexistente: 10.620 problemas |
| build Atlas | PASS, com warnings de bundle |
| teste Atlas | PASS: 1/1 |
| lint Atlas | FAIL preexistente: 501 problemas |
| runtime experimental Copiloto | PASS: 118/118 pytest; não atribuído ao produto web |
| status final dos produtos | limpo; nenhum arquivo de produto alterado |
| codificação dos documentos | UTF-8 sem caractere de substituição; sem tabs |

## 8. Riscos e pendências

- lints vermelhos reduzem confiabilidade de manutenção, mas não invalidam os builds observados;
- cobertura automatizada de Copiloto/Control é ausente e do Atlas é superficial;
- migrations foram auditadas no repositório, não confirmadas no backend nesta missão;
- classificação `A` indica operação observada/registrada, não maturidade de produção irrestrita;
- o score depende das sete dimensões declaradas e deve ser revisto se surgir evidência operacional nova;
- o preflight do Copiloto não foi iniciado.

## 9. Veredito da revisão

**APTO PARA COMMITS DOCUMENTAIS.** O conjunto é compatível com as fontes de maior autoridade, preserva conflitos, não cria IDs ou infraestrutura, não altera produtos e cumpre a condição de parada. Os commits devem incluir somente os cinco arquivos desta revisão.
