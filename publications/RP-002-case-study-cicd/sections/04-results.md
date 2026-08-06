# 4. Resultados

A análise das oito condições revelou que erros sintáticos (EXP-01) são detectados rapidamente pelo pipeline (73s). Em contrapartida, os experimentos de falso verde (EXP-02 a 06 — como erros lógicos cobertos por testes viciados, casos de borda não cobertos e divergências de ambiente) resultaram em status verde no pipeline (`PASS`), com latências de detecção censuradas à direita (`> 1h` ou dependentes de descoberta manual em produção). Os testes de meta-acoplamento (EXP-07A e 07B) evidenciaram os riscos de cegueira e ilusão de calibração nos detectores.
