# Revisão da extração do OPERA Atlas — 31/07/2026

**Estado documental:** `ACTIVE`
**Escopo:** arquivos criados em `opera/atlas/` a partir dos cinco PDFs de `archive/google-drive/Diagnóstico/`
**Resultado:** aprovado para revisão humana, com ressalvas abaixo; nenhum commit realizado

## Compatibilidade e autoridade

- Nenhum documento canônico foi alterado.
- Os PDFs de origem permanecem classificados como `HISTORICAL`; quatro transcrições foram marcadas como `ACTIVE` e não normativas.
- A autoridade “suprema” reivindicada pela Constituição Arquitetural foi delimitada ao produto OPERA Atlas. Ela não se sobrepõe à `CONSTITUICAO.md` deste repositório.
- Nenhum ID foi criado, promovido ou redefinido. As conexões com TPC/TDO foram identificadas como inferências editoriais.
- O PRT-002 não foi acionado, pois a extração não incorpora autores ou teorias externas ao núcleo.

## Integridade da extração

| Derivado | Páginas da fonte | Páginas transcritas | Resultado |
|---|---:|---:|---|
| `docs/constituicao-arquitetural.md` | 12 | 12 | Completo |
| `docs/diagnostico-objetivo.md` | 6 | 6 | Completo |
| `docs/governanca-maturidade.md` | 10 | 10 | Completo |
| `docs/modelo-empresarial.md` | 13 | 0 | Conteúdo omitido por confidencialidade; proveniência preservada |
| `docs/roadmap-maturidade.md` | 8 | 8 | Completo |

Cada derivado registra caminho e SHA-256 da fonte. Os cinco links do índice foram verificados e não há derivados órfãos.

## Achados e riscos

1. **Confidencialidade:** `OPERA_Atlas_Modelo_Empresarial_v2.pdf` declara-se confidencial. A reprodução integral foi bloqueada; uma extração futura exige autorização humana explícita ou desclassificação registrada.
2. **Invariantes divergentes:** `produtos/opera-atlas.md` apresenta princípios de integridade `I1–I10`, enquanto a Constituição Arquitetural extraída referencia invariantes de domínio `I1–I11` e princípios arquiteturais `P1–P10`. Os conjuntos não devem ser fundidos ou renumerados sem localizar o `OPERA_CORE v1.3` citado pela fonte e realizar revisão própria.
3. **ECO como classificação:** `produtos/opera-atlas.md` afirma que fechamentos divergentes são “ECOs financeiros”. O glossário define ECO (IDR-0010/MET-001) de modo mais geral. A transcrição não amplia essa afirmação; sua validade operacional requer protocolo e evidência.
4. **Temporalidade:** Diagnóstico, Governança e Roadmap descrevem estado observado ou planejado em julho de 2026. Não devem ser tratados como estado atual do runtime sem verificação no código e no ambiente publicado.
5. **Perda visual:** tabelas e diagramas foram preservados como texto por página, mas alinhamento e semântica visual podem ter sido degradados pelo extrator. Conferir o PDF antes de decisões arquiteturais ou jurídicas.

## Duplicidades e dependências

- Os derivados repetem deliberadamente conteúdo histórico para torná-lo pesquisável, mas não constituem novas fontes normativas.
- `produtos/opera-atlas.md` e `produtos/opera-produtos.md` continuam sendo as sínteses ativas de produto e foram ligados pela ordem de leitura do índice.
- O arquivo `archive/google-drive/OPERA_Atlas_Mapeamento_Migracao_v1.pdf` está fora do escopo desta tarefa e não foi extraído.
- Dependências citadas pelos PDFs, como `OPERA_CORE v1.3` e RFCs do produto, não foram localizadas ou validadas neste escopo; suas afirmações permanecem históricas até confronto com os artefatos correspondentes.

## Pendências recomendadas

- Obter decisão humana sobre o tratamento do Modelo Empresarial confidencial.
- Localizar e classificar o `OPERA_CORE v1.3` antes de reconciliar I1–I10 com I1–I11.
- Comparar as alegações de estado dos PDFs com o runtime e o código publicados em uma auditoria separada.
- Fazer conferência visual amostral das tabelas críticas antes de usar as transcrições como base de implementação.
