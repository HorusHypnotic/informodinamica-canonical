# Relatório — Safe Document Representation V1 — 2026-08-13

## Context Gate e escopo

O Context Gate inicial retornou WARN somente pela working tree preexistente. Não houve conflito
material com Constituição, documentos canônicos, checkpoint, P0, Router ou evidência DIRECT_MD.
Nenhum PDF real foi aberto e nenhum componente congelado foi alterado.

## Avaliação e decisão

Foram comparados Markdown puro, Markdown+assets, Markdown+manifest estrutural, JSON/AST+renderer e a
combinação mínima. Markdown puro não distingue texto retido de relações preservadas. Assets resolvem
persistência visual, não estrutura. Manifest separado do Markdown duplica estado.

Foi escolhido JSON/AST compacto + assets content-addressed + view Markdown opcional. JSON é
autoritativo; Markdown é consumo. Provenance V1 fornece identidade, transformação e validação.

## Segurança, fixtures e integração

O contrato separa conteúdo, estrutura, assets, uncertainties, known losses, abstention e referência
ao original. Impede tabela preservada sem rows, heading sem nível, estrutura incerta sem
justificativa, asset essencial perdido, referência quebrada, abstention com conteúdo e ligação
contraditória ao Provenance V1.

Os 15 cenários obrigatórios sintéticos passaram. O renderer expôs incerteza, perda e assets de forma
determinística. O JSON canônico teve hash, tamanho e formato validados pelo Provenance V1; FAIL
preservou o derivado.

## Impacto esperado por rota

| Rota futura | Uso do contrato |
|---|---|
| textual | blocos recuperados; PRESERVED somente com evidência |
| visual | asset essencial + descrição observada/incerta/indisponível |
| mixed | texto e assets, com perdas/uncertainties explícitas |
| scan | page render/untransformed, texto indisponível, ou abstention; nenhum OCR implícito |

## Validação

- testes específicos: 6/6 PASS;
- 15/15 cenários válidos;
- JSON Schema Draft 2020-12, JSON e Python: PASS;
- Provenance V1 PASS e FAIL: integrados;
- suíte total: 101/101 PASS;
- Context Gate, privacidade e diff: PASS.

## Resultado

**SAFE DOCUMENT REPRESENTATION V1 = GREEN**

Existe contrato mínimo, testável e rastreável para derivados confiáveis sem depender de solução
universal do DIRECT_MD e sem afirmar fidelidade não demonstrada.
