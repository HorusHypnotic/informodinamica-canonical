# Relatório de validação do congelamento

**Data:** 10/08/2026  
**Versão:** `0.2.0-frozen`  
**Estado:** `FIXTURE CONGELADO — PRÉ-PILOTO`  
**Execuções experimentais:** zero

## Resultado reproduzível

```powershell
& experiments\EXP-001-reconstruction-boundaries\scripts\build-blind-packages.ps1
& experiments\EXP-001-reconstruction-boundaries\scripts\update-manifest.ps1
& experiments\EXP-001-reconstruction-boundaries\scripts\validate-fixture.ps1
```

Resultados esperados e obtidos antes do commit:

```text
BLIND_PACKAGES_OK count=15 fixture_version=0.2.0-frozen
MANIFEST_UPDATED files=64 version=0.2.0-frozen
VALIDATION_OK instances=3 conditions=15 proposition_ids=39 receiver_packages=15 semantic_graphs=3 executions=0
BLIND_CONTENT_SCAN_OK
```

## Verificações concluídas

| Verificação | Resultado |
|---|---|
| Sintaxe JSON | todos os JSONs parseados |
| Instâncias | 3 |
| Condições | 5 por instância; 15 no total |
| Proposições | 13 por instância; 39 IDs únicos |
| Grafos | 3, com classes semânticas e uma classe obrigatória por instância |
| Referências truth→ações | nenhuma referência órfã |
| Manipulation checks | C4A e C4F por instância |
| Pacotes receptor-visible | 15 IDs opacos; conteúdo e hashes verificados |
| Pacote do avaliador | schema e template sem metadados experimentais proibidos |
| Manifesto | inventário integral e hashes válidos; auto-hash excluído por desenho |
| Escopo | nenhum arquivo rastreado alterado fora do EXP-001 |
| Execuções | nenhum `runs/`, `outputs/`, `results/` ou pacote de avaliação executada |

## Correspondência C3 × sham

C3 e sham preservam os mesmos fatos por instância e possuem três seções e onze bullets. Contagem do conteúdo receptor-visible:

| Instância | C3 | Sham |
|---|---:|---:|
| I01 | 132 palavras | 124 palavras |
| I02 | 119 palavras | 115 palavras |
| I03 | 117 palavras | 112 palavras |

A diferença residual de conectivos e densidade simbólica é constitutiva da codificação relacional e permanece registrada como limitação.

## Revisão pré-commit

- Constituição, Documento Canônico, Glossário e TPC não foram alterados.
- Nenhum conceito ou ID canônico foi criado, redefinido ou duplicado.
- Nenhuma referência estrutural ou hash órfão foi encontrado.
- Nenhum conteúdo experimental substantivo mudou na promoção de `0.2.0-candidate` para `0.2.0-frozen`.
- O manifesto preserva proveniência, limitações, estado pré-piloto e ausência de resultados.

## Limitações preservadas

- C3 e sham mantêm diferença residual de conectivos e densidade simbólica.
- O prompt estruturado pode reduzir diferenças e interagir com C3.
- C4-A mede primariamente estado obsoleto; subcategorias permanecem exploratórias.
- C4-F não discrimina fragmentação, proximidade, custo de busca e esforço de integração.
- O isomorfismo limita validade externa.
- Avaliações semânticas futuras exigirão concordância e adjudicação humanas.
- O operador/custodiante não é cego; o desenho é duplo-cego parcial.

## Declaração de não execução

Nenhum receptor recebeu um estímulo. Nenhuma resposta, avaliação, métrica, score, exclusão ou observação experimental existe. O checkpoint representa o estado anterior à primeira execução.
