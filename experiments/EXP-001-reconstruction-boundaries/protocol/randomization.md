# Protocolo de randomização futura e cegamento operacional

Nenhum sorteio definitivo foi realizado e nenhuma execução existe.

## Unidade e isolamento

1. A unidade substantiva é `instância independente × receptor independente × condição`.
2. Cada receptor observa somente **uma execução total** do EXP-001 e não recebe outra instância depois.
3. Cada execução ocorre em sessão nova, sem memória compartilhada, arquivos anteriores ou histórico da tarefa.
4. Se não for possível verificar identidade independente dos receptores, usar sessões completamente independentes como aproximação e registrar a limitação no log.
5. Repetições por seed da mesma célula são repetições técnicas, não réplicas independentes.

## Fluxo cego

```text
fixture interno
→ pacote receptor-visible opaco
→ execução
→ pacote cego do avaliador
→ avaliação primária congelada
→ quebra de cegamento
→ análise experimental
```

- receptor: cego;
- avaliador primário: cego;
- operador/custodiante: não cego;
- nível metodológico: **duplo-cego parcial**.

## Preparação futura

1. Um custodiante gera os pacotes receptor-visible com `scripts/build-blind-packages.ps1` e executa `scripts/validate-fixture.ps1`.
2. Depois do congelamento e antes da execução, o custodiante gera seed criptograficamente aleatória.
3. Registrar seed por referência imutável, hash, algoritmo e versão em mapa separado.
4. Bloquear por instância para equilibrar as cinco condições, respeitando um receptor por execução total.
5. Associar cada atribuição a um `package_id` opaco já materializado. O receptor recebe somente o conteúdo do pacote, nunca seu path interno ou mapa.
6. Selar mapa condição↔pacote↔execução até o congelamento das avaliações primárias.
7. O ambiente contém somente prompt neutro e conteúdo receptor-visible.
8. Antes da primeira execução, registrar mapa, versão, ordem, timestamp e manifesto do ambiente.
9. Após a primeira execução, qualquer correção do mapa gera nova versão e invalida as execuções afetadas.
10. O pacote cego do avaliador é criado segundo `protocol/evaluator-package.schema.json`; não contém condição, deformação, hipótese ou erro-alvo.

## Neutralização obrigatória

- Não entregar nomes de condição, IDs proposicionais, deformações, TPC/TCA, inventários, notas de manipulação ou paths internos.
- Usar o mesmo cabeçalho externo, encoding e prompt.
- O avaliador primário recebe output bruto, rubricas, verdade de pontuação sem metadados experimentais e referência às equivalências semânticas congeladas.
- `target_error` é analisado somente após congelar a avaliação primária.

O isomorfismo entre as três instâncias continua limitando validade externa. A regra de uma execução total por receptor mitiga aprendizagem, mas não diversifica topologias.
