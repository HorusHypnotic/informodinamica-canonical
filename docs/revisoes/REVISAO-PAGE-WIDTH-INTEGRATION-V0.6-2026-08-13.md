# Revisão pré-commit — Page Width Integration V0.6 — 2026-08-13

## Escopo

Alteração limitada à obtenção e propagação de `page_width`, testes sintéticos e documentação. Nenhum
PDF real, classificação ou manifest out-of-sample foi aberto.

## Integridade

- hash do arbiter inalterado;
- thresholds, gates, pesos, fórmulas, fixtures e ground truth sem diff;
- Structural Router, StructureClassifier e renderer sem diff;
- CropBox/MediaBox e bboxes permanecem no mesmo espaço de usuário PDF;
- fallback ocorre apenas quando largura real válida não está disponível;
- nenhuma condição por conteúdo, `doc_id`, filename ou path foi criada.

## Privacidade e riscos

Somente páginas sintéticas foram usadas. Nenhum conteúdo documental entrou no Git; não houve OCR,
API/LLM, acesso a `G:` ou alteração de PDF. Arquivos preexistentes do owner permanecem fora do
commit.

O contrato de rotação é deliberadamente o espaço não rotacionado usado pelas matrizes do visitor. Se
uma versão futura do parser passar a entregar coordenadas visualmente rotacionadas, essa premissa
deverá ser revalidada antes de alterar o contrato.

Não foram encontrados conceitos canônicos, IDs, duplicidades, referências ou relações órfãs. PRT-002
não se aplica porque não houve fonte externa ou promoção epistemológica.
