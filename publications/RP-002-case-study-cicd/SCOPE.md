# Escopo do RP-002

## Este pacote NÃO pretende:
- Cobrir sistemas operacionais de grande escala fora de ambientes de pipeline de CI/CD;
- Substituir testes de aceitação do usuário (UAT) em ambientes de produção complexos;
- Provar a universalidade das latências para todos os frameworks de software existentes.

## Este pacote pretende:
- Analisar empírico-experimentalmente o fenômeno do "falso verde" em pipelines de CI/CD;
- Medir e comparar as latências informodinâmicas ($T_0$ a $T_4$) sob oito condições experimentais controladas;
- Avaliar a eficácia de mecanismos de meta-acoplamento (N3) na detecção precoce de degradação.
