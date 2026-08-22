# PRESERVATION-RECORD.md

| Campo | Valor |
|---|---|
| ID | `TPC-RETRO-002R` |
| Data | 2026-08-22 |
| Agente executor | Manus AI |
| Base canônica | `HorusHypnotic/informodinamica-canonical@e48daac4a2ee1c67786ceb1a34af42585ff71b24` |
| Objetivo | Reanalisar destrutivamente o RETRO-002 sem O_first_update_hours antes de qualquer nova coleta |
| Status | Análise concluída; artefatos prontos para preservação Git |
| Entregáveis | Seis arquivos da missão, mais o script de reexecução e resultados derivados de suporte |
| Resultado | D local contra X/C sobrevive à remoção de O; nenhuma medida direta independente de EO foi encontrada |
| Decisão | `NO_NEW_COLLECTION` |
| Próximo gate | Validar medida independente de estado representacional e pré-especificar teste discriminante |

A reexecução foi feita em ambiente isolado com cópia do código canônico. O script original e os resultados originais não foram alterados nem apagados. O suporte preservado inclui `src/analyze_retro002_without_o.py`, `results/model_results_without_o.csv`, `results/stability_without_o.csv`, `results/placebo_without_o.csv` e `results/delta_24_summary_without_o.csv`.

