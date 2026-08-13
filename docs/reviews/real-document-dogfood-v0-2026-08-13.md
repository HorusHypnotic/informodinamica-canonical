# P1.3 — Real Document Dogfood V0

**Data:** 13 de agosto de 2026
**Resultado principal:** **ABSTAINED**

## 1. Preflight e congelamento

O Context Gate retornou `WARN` apenas pela árvore local previamente suja. Branch `main`, HEAD e
`origin/main` estavam em `0e07d499e259929c0f1fea65d2937a8e2132fa39`. Provenance V1, Provenance
Index V1, Safe Representation V1, Textual-Safe Route V1 e Textual Evidence Producer V0 estavam
GREEN nos respectivos escopos. DIRECT_MD permaneceu RED/FROZEN.

Antes do acesso foram congelados localmente HEAD, configuração, versões 0.1.0/1.0.0 e SHA-256 dos
quatro scripts e quatro schemas relevantes. Arbiter e conversor congelados permaneceram em
`b8abb3ccbf2f1589c5c50f9d7e53ec39097f2c8e` e
`237380492481c55bddbe8b71cc7a23099885d049`.

## 2. Seleção por metadata

Foi selecionado exatamente `DOC-585cd5f3`, conteúdo binariamente único, `TEXT_NATIVE`, seis páginas,
307.087 bytes, não criptografado e sem erro conhecido. A rota histórica era `STRUCTURED_TEXT`; as
métricas disponíveis indicavam 10.002 caracteres, 311 blocos, cinco páginas complexas e nenhuma
página de imagem. É um caso administrável e não trivial, fora dos sete PDFs congelados.

O original tinha e manteve SHA-256
`585cd5f3f981aecc9187ae735598becc43b248a52ee9cc3dddf08ef3529e81a4`. Não foi movido, renomeado,
editado ou sobrescrito.

## 3. Pipeline realmente percorrido

```text
PDF READ-ONLY
  -> observação bruta local com pypdf 6.14.2
  -> classificação de admissibilidade
  -> STOP / ABSTAINED
```

Evidence Producer, Textual-Safe Route, Safe Representation, Provenance derivativo e Markdown não
foram executados. Essa parada evitou declarar como fato algo que o contrato atual não comprova.

## 4. Observações e admissão

O parser observou seis páginas, 10.275 caracteres extraídos, 220 linhas e zero XObjects de imagem.
As seis páginas tinham MediaBox aproximada de 594,96 × 841,92. A observação levou 2,81 segundos e
teve pico rastreado por `tracemalloc` de 2.265.242 bytes. Não houve erro de execução.

| Família | Estado | Fundamentação |
|---|---|---|
| identidade binária | ADMISSIBLE | hash calculado e confrontado com índice |
| contagem de páginas | ADMISSIBLE | propriedade diretamente observável pelo parser |
| texto bruto extraído | INSUFFICIENT | presença observada não prova completude `RECOVERED` |
| sequência do texto | INSUFFICIENT | ordem emitida não prova ordem documental |
| presença de imagem | INSUFFICIENT | zero XObjects não prova ausência de visual essencial |
| geometria | UNSUPPORTED | produtor V0 não possui regra de admissão para PDF |
| rótulos estruturais | UNSUPPORTED | seriam interpretação, não observação bruta |

Resumo: 7 famílias; 2 admissíveis, 3 insuficientes, 0 conflitantes e 2 unsupported. Nenhuma
observação textual/estrutural atingiu admissão suficiente para alimentar honestamente o produtor.

## 5. Evidence Ledger, representação e provenance

Nenhum Evidence Ledger foi fabricado: contagens `SUFFICIENT`, `INSUFFICIENT`, `CONFLICTING` e
`ABSENT` do produtor são todas zero porque o componente não foi invocado. Não houve bloco
representado, parcial ou indisponível; nenhum asset foi declarado essencial; nenhum derivado,
manifest ou validação foi criado. Não há referência quebrada porque não existe genealogia derivativa.

Essa ausência é mais segura que usar contexto `PLAIN` artificialmente: no V0, texto presente seria
encaminhado como `RECOVERED`, embora o parser sozinho não prove recuperação completa. Também não foi
produzida view Markdown nem métrica de redução.

## 6. Fidelidade e utilidade

- **Technical fidelity:** PASS para a decisão de parada; nenhuma estrutura ou completude foi
  inventada e o original permaneceu íntegro.
- **Practical utility:** FAIL/NOT PRODUCED; não existe representação consumível por humano ou IA.
- **Recuperabilidade da fonte:** PASS pelo `doc_id` e SHA-256, sem publicar localização privada.
- **Human review:** PENDING; material bruto local foi preservado exclusivamente em `.local/`, mas não
  pode validar um derivado inexistente.

## 7. GAP identificado

**GAP-P13-001 — PDF Observation Admission Bridge**

- Camada: fronteira PDF -> observação admissível.
- Severidade: HIGH; bloqueia qualquer uso real seguro da rota textual.
- Evidência: o parser retorna texto, páginas e sinais físicos, mas os contratos atuais não registram
  método/proveniência da observação nem permitem distinguir texto observado de conteúdo comprovado
  como `RECOVERED`.
- Impacto: alimentar o produtor criaria afirmação de completude e possivelmente de ordem sem base.
- Hipótese: é necessário um contrato/validador de admissão que registre página, método, ferramenta,
  natureza direta/derivada, limitações e status de recuperabilidade antes do Evidence Producer.
- Próxima missão: projetar e testar essa ponte somente com PDFs sintéticos/controlados, incluindo
  texto omitido, ordem divergente, fontes incorporadas, vetores/imagens e extração parcial. Não ajustar
  pelos dados deste documento real.

## 8. Testes, privacidade e estado

A suíte passou antes e depois: 117/117. Schemas e componentes permaneceram inalterados;
`git diff --check` passou. Exatamente um PDF foi aberto, sem OCR, API/LLM, `G:`, batch ou DIRECT_MD.
Outputs reais — freeze, texto bruto e resumo — permanecem em `.local/`. Este relatório não contém
filename, path ou conteúdo documental.

## 9. Conclusão

**REAL DOCUMENT DOGFOOD V0 = ABSTAINED**

A infraestrutura sintética GREEN ainda não consegue admitir com segurança observações textuais de um
PDF real. A distância descoberta é anterior à transformação: falta uma ponte auditável que prove o
que a extração permite afirmar. A abstenção preservou fidelidade epistemológica, mas não produziu
utilidade documental. Não processar um segundo documento nem corrigir o gap nesta missão.
