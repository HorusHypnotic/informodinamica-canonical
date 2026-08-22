# PRESERVATION-RECORD.md

| Campo | Valor |
|---|---|
| ID | `SCIENCE-RADAR-005` |
| Data | 2026-08-22 |
| Objetivo | Reconstruir previsão prospectiva M0/M1/M2 sem leakage |
| Dataset | PLOS ONE e0204547 S1; DOI `10.1371/journal.pone.0204547`; hash S1 `54c33ca5338d6cb2cbb8215a0010ab6251f690d1018069ea94fa048d4a6d5ecc` |
| Pré-análise | Congelada e preservada antes dos modelos em `PREANALYSIS-SPEC.md` |
| Amostra | 64 sessões válidas; 51 train; 13 test |
| Outcome | `Matrix Solving`; `TY_proxy` via primeira instrução da tarefa subsequente |
| Modelos | BASE_MEAN, M0 HISTORY, M1 HISTORY+NETWORK, M2 HISTORY+NETWORK+COLLABORATION |
| Resultado | `ROBUSTNESS_CLASS = NO_INCREMENT`; vantagem pontual não consistente |
| TPC | Não testada; nenhuma variável TPC criada |
| Dados | Datasets externos não copiados ao Git; apenas identificadores, hashes, script e resultados derivados próprios preservados |
| Scripts | `science-radar-005-reconstruct.py` e inspetor Gate 1 preservados junto à missão |
| Entregáveis | Oito Markdown + scripts próprios necessários |
| Próximo gate | Confirmar no protocolo o momento de publicação do score e repetir em ambiente independente; não fazer novo claim até lá |

> Nenhum resultado posterior foi usado para alterar outcome, cutoff, split ou critérios da pré-análise.
