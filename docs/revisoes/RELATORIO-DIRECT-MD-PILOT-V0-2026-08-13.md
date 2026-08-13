# Relatório sanitizado — DIRECT_MD Pilot V0 — 2026-08-13

## Escopo

Conversão controlada de dez identidades `TEXT_NATIVE`, selecionadas exclusivamente por métricas
estruturais: faixas curta, média e longa; variação de imagens e gráficos; casos lineares e próximos
da fronteira visual. O relatório usa somente `doc_id`; Markdown, manifests, paths e conteúdo
documental permanecem locais e ignorados pelo Git.

## Matriz

| doc_id | Páginas | Resultado | Retenção | Warning humano | Tempo | Markdown | Tokens estimados |
|---|---:|---|---:|---|---:|---:|---:|
| DOC-6490c903 | 2 | PASS | 1,0000 | nenhum | 0,012 s | 3.263 B | 791 |
| DOC-bc0b8a66 | 2 | PASS_WITH_WARNINGS | 1,0000 | heading/layout achatado | 0,031 s | 1.891 B | 444 |
| DOC-7be23575 | 1 | FAIL | 1,0000 | relações de formulário perdidas | 0,020 s | 895 B | 211 |
| DOC-db11d875 | 8 | PASS | 1,0000 | nenhum | 0,127 s | 16.733 B | 4.037 |
| DOC-f91f5fbb | 10 | PASS_WITH_WARNINGS | 1,0000 | headings/listas achatados | 0,271 s | 36.709 B | 8.934 |
| DOC-1901cbee | 6 | FAIL | 0,9845 | estrutura de lista/matriz perdida | 0,107 s | 5.449 B | 1.277 |
| DOC-401db163 | 30 | PASS_WITH_WARNINGS | 1,0000 | headings/listas parcialmente achatados | 1,602 s | 53.521 B | 12.845 |
| DOC-9daba885 | 132 | PASS_WITH_WARNINGS | 0,9612 | ruído em front matter/headings | 1,120 s | 204.019 B | 49.376 |
| DOC-13180c45 | 34 | PASS_WITH_WARNINGS | 0,9600 | tabelas/fórmulas achatadas | 1,981 s | 57.426 B | 14.335 |
| DOC-800be6ec | 2 | FAIL | 1,0000 | relações de checklist perdidas | 0,047 s | 2.429 B | 589 |

## Métricas agregadas

- Resultados: 2 `PASS`, 5 `PASS_WITH_WARNINGS`, 3 `FAIL`.
- Retenção: média 0,9906; mediana 1,0000; mínimo 0,9600; máximo 1,0000.
- Tempo: total 5,318 s; média 0,532 s; mediana 0,117 s; mínimo 0,012 s; máximo 1,981 s.
- PDF original: 4.378.689 bytes; Markdown: 382.335 bytes; redução local de bytes: 91,27%.
- Caracteres extraíveis: 304.605; caracteres preservados: 296.286.
- Markdown: 54.002 palavras, 3.160 linhas e 92.839 tokens estimados.

A redução de bytes descreve somente representações locais; não mede custo de tokens de PDF em
provedores de IA.

## Defeitos e correções

Foram corrigidos: detecção de heading numerado com ponto, bullet extraído como ponto, número de
página sem acento, footer variável por paginação e fragmentação causada pelo modo `layout` do
parser. Fronteiras de página e UTF-8 foram preservados. O SHA-256 do Markdown foi idêntico em duas
execuções reais; somente o timestamp do manifesto variou.

Persistem falhas materiais em formulários, checklists e matrizes, além de achatamento parcial de
headings, listas, tabelas e fórmulas. Retenção textual alta não prova fidelidade estrutural.

## Decisão

**DIRECT_MD PILOT = RED**

Não expandir para os 152 documentos. Antes de novo piloto, o roteamento estrutural deve retirar
formulários/checklists de `DIRECT_MD` e o conversor deve preservar hierarquia e blocos tabulares com
validação explícita, sem inventar células.
