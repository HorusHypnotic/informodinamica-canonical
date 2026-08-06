# 1. Introdução

Sistemas de Integração Contínua e Entrega Contínua (CI/CD) são pilares fundamentais da engenharia de software moderna, projetados para garantir que alterações de código sejam testadas, validadas e integradas de forma automatizada. No entanto, pipelines de CI/CD sofrem frequentemente de um fenômeno crítico: o **falso verde**, onde o sistema reporta sucesso (build verde) apesar de o software estar desacoplado de suas premissas funcionais, requisitos de negócio ou do ambiente real de execução.

Este artigo apresenta um estudo de caso empírico e controlado (EXP-001) para analisar como os falsos verdes emergem, propagam-se e afetam as latências de detecção em sistemas sociotécnicos.
