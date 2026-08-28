# CODEX TERMINAL PACKET — TRIMATCH-CORPUS-RECOVERY-001

## Missão

Executar a recuperação programática conservadora do corpus Trimatch definido em `TRIMATCH_CORPUS_RECOVERY_SPEC_001.md`.

## Base obrigatória

- branch: `trimatch-corpus-recovery-001`
- SPEC congelada no commit `2009924ae19b65fd39e68a6c89745e5d3758ad2e`
- issue: #12
- não modificar a SPEC

## Passos

1. Confirmar branch, HEAD e working tree antes de qualquer escrita.
2. Localizar `archive/google-drive/` no checkout real.
3. Resolver somente as 17 famílias do corpus alvo.
4. Para cada PDF encontrado, calcular SHA-256 e confrontar com hashes já registrados nos relatórios quando houver.
5. Deduplicar somente por hash idêntico ou identidade documental demonstrável.
6. Extrair texto localmente para diretório novo da missão. Não sobrescrever fontes nem derivados antigos.
7. Registrar ferramenta/versão/comando de extração e erro por arquivo.
8. Sanitizar a saída antes de commit. Documento sinalizado como pessoal, fiscal, contratual/confidencial ou contendo PII não deve ser promovido para texto público; registrar apenas estado `EXCLUDED_SENSITIVE` e metadados não sensíveis.
9. Produzir `RECOVERY_MANIFEST.json` e relatório Markdown com proveniência e estados.
10. Só então decompor componentes nas categorias da SPEC.
11. Comparação com capacidades 2026 deve usar somente artefatos Git comprováveis. Ausência vira UNKNOWN.
12. Produzir matriz `REUSE | ADAPT | SUPERSEDE | RETIRE | UNKNOWN` com colunas SOURCE_2025, OBSERVED_2026, INFERENCE_2026 e evidence refs.
13. Rodar testes/gates T1–T10.
14. Commitar somente artefatos sanitizados da missão.
15. Reportar SHA final, arquivos, hashes, testes, limites e gate.

## Stop conditions

Parar sem inventar PASS se:

- `archive/google-drive/` não existir no checkout;
- corpus alvo não puder ser resolvido com proveniência suficiente;
- extração exigir exposição de material sensível;
- houver divergência de hash não explicada;
- qualquer premissa jurídica/financeira/urbanística exigir validação externa;
- houver necessidade de credencial, rede externa ou mutação fora do repositório.

Gate de bloqueio admissível:
`TRIMATCH_CORPUS_RECOVERY_BLOCKED_BY_SOURCE_GAP`

Gate parcial admissível:
`TRIMATCH_CORPUS_PARTIALLY_RECOVERED_WITH_UNKNOWNS`

Gate de sucesso somente com corpus suficiente e rastreável:
`TRIMATCH_CORPUS_RECOVERED_WITH_PROVENANCE`

## Proibições

Sem publicação, deploy, contato com terceiros, criação de SPE, captação, pagamento, negociação de terreno, parecer jurídico ou promoção automática ao cânone.