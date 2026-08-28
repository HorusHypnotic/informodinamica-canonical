# TRIMATCH-CORPUS-RECOVERY-001

**Status:** SPEC_FROZEN / QUEUED_FOR_EXTRACTION
**Data:** 2026-08-28
**Baseline:** `89edebf7dbc6d6ee0267f57c1f03cf234da18950`
**Issue:** `#12`
**Branch:** `trimatch-corpus-recovery-001`

## 1. Objetivo

Recuperar conservadoramente o patrimônio histórico Trimatch/imobiliário já inventariado no repositório e produzir base rastreável para remanufatura digital.

Esta missão é recuperação e classificação de patrimônio. Não é reativação comercial, validação jurídica, financeira, urbanística ou autorização para transações.

## 2. Regra epistemológica

`HISTORICAL != CURRENT_CANON`

`INVENTORIED != RECOVERED`

`RECOVERED != VALIDATED`

`CAPABILITY != AUTHORITY`

Documento ausente, ilegível ou não materializado permanece `UNKNOWN` ou `UNRESOLVED`.

## 3. Corpus alvo inicial

1. Metodologia Trimatch
2. Modelo de negócio Trimatch
3. monografia_trimatch
4. dossie_investidor_trimatch
5. Funil SPE modelo
6. Guia BTR
7. build_to_rent_brazil
8. Análise de Viabilidade de terreno
9. análise oportunidades imobiliária
10. Financiamentos imobiliários
11. coordenação de projetos imobiliários
12. consultoria_imobiliaria
13. relatorio_franquia_farmacia
14. RGV
15. Trimatch Banker Academy
16. Build to Suit e to Rent em Redenção
17. Documento de Apresentação para Corretores e Imobiliárias

## 4. Proveniência obrigatória por fonte

Registrar, quando disponível:

- caminho histórico exato;
- nome original;
- SHA-256 da fonte já registrado ou calculado sem alterar a fonte;
- caminho do derivado textual;
- método de extração;
- data da extração;
- status `RECOVERED | PARTIAL | UNRESOLVED | EXCLUDED_SENSITIVE`;
- duplicatas somente quando identidade/hash for comprovada.

## 5. Decomposição

Cada componente recuperado deve ser classificado em uma ou mais categorias:

`PROCESSO | SOFTWARE | TESE_COMERCIAL | JURIDICO | FINANCEIRO | CORRETOR | INVESTIDOR | TERRENO`

## 6. Matriz de remanufatura

Somente depois da recuperação, comparar cada componente com infraestrutura existente em 2026 e atribuir:

`REUSE | ADAPT | SUPERSEDE | RETIRE | UNKNOWN`

Toda comparação deve distinguir:

- `SOURCE_2025`: o que o documento histórico realmente declara;
- `OBSERVED_2026`: capacidade atual comprovada por artefato;
- `INFERENCE_2026`: interpretação comparativa;
- `UNKNOWN`: lacuna que não pode ser preenchida honestamente.

Nenhuma classificação promove automaticamente conteúdo para cânone atual.

## 7. Restrições

Proibido nesta missão:

- contatar corretores, proprietários, investidores ou operadores;
- criar SPE ou instrumento jurídico;
- captar ou movimentar recursos;
- avaliar documentação de terreno como parecer jurídico;
- publicar material;
- alterar fontes históricas;
- inventar conteúdo ausente;
- promover componente para OPERA/Control Tower sem gate separado.

## 8. Testes/gates mínimos

T1 corpus alvo inventariado.
T2 cada fonte recuperada possui proveniência.
T3 duplicatas possuem prova por hash/identidade.
T4 fontes ausentes permanecem UNRESOLVED.
T5 material sensível não é exposto para obter completude artificial.
T6 SOURCE_2025 não é confundido com OBSERVED_2026.
T7 inferências são explicitamente marcadas.
T8 matriz não contém PASS jurídico/financeiro/urbanístico implícito.
T9 nenhuma ação comercial ou financeira é executada.
T10 relatório final lista limites e não-claims.

## 9. Gates finais admissíveis

Sucesso rastreável:
`TRIMATCH_CORPUS_RECOVERED_WITH_PROVENANCE`

Bloqueio por fonte:
`TRIMATCH_CORPUS_RECOVERY_BLOCKED_BY_SOURCE_GAP`

Parcial útil:
`TRIMATCH_CORPUS_PARTIALLY_RECOVERED_WITH_UNKNOWNS`

Nenhum gate desta SPEC autoriza reativação comercial do Trimatch.

## 10. Próxima execução pesada

A extração programática dos PDFs e a produção da matriz completa exigem acesso local ao arquivo histórico/binários. Preparar execução para janela Codex/terminal, sem modificar esta SPEC. Se o corpus não estiver presente no checkout, parar com `SOURCE_GAP` em vez de reconstruir documentos por memória.