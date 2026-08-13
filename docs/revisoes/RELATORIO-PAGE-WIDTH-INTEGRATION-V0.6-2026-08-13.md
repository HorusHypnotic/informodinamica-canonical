# Relatório sanitizado — Page Width Integration para Arbiter V0.6 — 2026-08-13

## Context Gate e congelamento

O Context Gate retornou `WARN` apenas pela working tree preexistente do owner. O arbiter permaneceu
byte a byte em `b8abb3ccbf2f1589c5c50f9d7e53ec39097f2c8e`. Nenhum threshold, gate, peso,
fórmula, decisão, fixture ou ground truth foi alterado.

Conversor antes: `613a00023833e00c08c1ca1d47df7e771b567e00`, versão 0.5.0. A integração
incrementa somente o adaptador para 0.5.1.

## Ponto de integração

O fluxo é:

```text
PDF page
  → effective_page_width(page)
  → LayoutLine.page_width
  → TextBlock.page_width
  → ReadingOrderEngine 0.6.0
```

O ponto antes ausente ficava em `render_layout`: `LayoutLine.page_width` já existia, mas não era
repassado ao construtor de `TextBlock`. Agora cada bloco recebe a largura de sua página.

## Fonte geométrica e coordenadas

`effective_page_width` consulta, nesta ordem:

1. `page.cropbox.width`, quando finita e positiva;
2. `page.mediabox.width`, quando finita e positiva;
3. zero, quando nenhuma largura real é válida.

CropBox representa a região efetiva visível usada como dimensão preferencial. MediaBox é o limite
físico de fallback do PDF. As coordenadas `tm` entregues por `pypdf.extract_text` e os bboxes
construídos pelo adaptador estão no espaço de usuário PDF não rotacionado. `page_width` permanece
nesse mesmo espaço; portanto uma entrada `/Rotate` não troca largura por altura no contrato do
arbiter. Não há conversão de unidade ou normalização inventada.

Quando a largura é zero/ausente, `TextBlock.page_width=0` aciona o fallback V0.6 já existente pela
extensão horizontal observada. Esse fallback não é usado quando CropBox ou MediaBox fornece medida
válida.

## Testes de integração

Quatro testes agregados novos cobrem:

- fluxo exato de `LayoutLine(420)` até a métrica `page_width=420`;
- páginas sintéticas padrão, estreita, larga/3× e sem blocos;
- CropBox menor que MediaBox e prioridade correta;
- rotação 90° mantendo largura no espaço não rotacionado;
- CropBox zero com fallback para MediaBox;
- ambas as larguras inválidas/NaN, retornando zero;
- zero chegando ao fallback horizontal do arbiter.

As páginas são geradas em memória/temporário; nenhum PDF real foi necessário.

## Validação

- suíte anterior: 69/69 preservada;
- testes adicionados: 4;
- suíte total: 73/73 PASS;
- fixtures V0.5: PASS;
- fixtures V0.6: PASS;
- determinismo de conversão/manifesto existente: PASS;
- hash do arbiter antes/depois: `b8abb3ccbf2f1589c5c50f9d7e53ec39097f2c8e`;
- `git diff --check`: PASS;
- Structural Router, StructureClassifier e Markdown Renderer sem diff;
- sete PDFs reais processados: zero.

## Avaliação

**PAGE_WIDTH INTEGRATION = GREEN**

Próxima missão recomendada: congelar o novo hash do conversor e executar uma revalidação
out-of-sample V0.6 exatamente nos sete IDs, sem alterar arbiter ou integração durante o teste.
