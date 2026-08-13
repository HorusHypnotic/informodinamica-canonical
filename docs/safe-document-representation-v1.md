# Safe Document Representation V1

**Status:** ACTIVE — contrato operacional 1.0.0

## Decisão

A menor representação segura é: JSON estruturado V1 como derivado autoritativo; assets
content-addressed quando a informação visual precisa sobreviver; Markdown determinístico opcional
como view; e Provenance Contract V1 como genealogia e validação externa. Ela não promete reconstrução
perfeita do PDF. O original continua sendo autoridade documental.

## Alternativas avaliadas

| Alternativa | Vantagem | Limite | Decisão |
|---|---|---|---|
| Markdown puro | simples e consumível | achata relações, assets, incerteza e perdas | rejeitado como representação autoritativa |
| Markdown + assets | preserva visual essencial | não formaliza estrutura ou incerteza | necessário, insuficiente sozinho |
| Markdown + manifest estrutural | separa texto e estrutura | duplica estado e pode divergir | não escolhido |
| JSON/AST + renderer | estrutura e incerteza machine-readable | exige view para leitura confortável | núcleo escolhido |
| JSON/AST + assets + view Markdown | fidelidade explícita e consumo prático | mais de um artefato derivado | combinação mínima |

## Contrato mínimo

O schema schemas/safe-document-representation-v1.schema.json contém source_ref por doc_id/SHA-256,
representation_status, páginas/blocos ordenados, assets, uncertainties e known_losses.

Blocos admitem PARAGRAPH, HEADING, LIST, TABLE, CHECKLIST, FORM, ASSET e UNTRANSFORMED. Conteúdo é
RECOVERED, PARTIAL ou UNAVAILABLE; estrutura é PRESERVED, UNCERTAIN, UNRECOVERABLE ou
NOT_APPLICABLE. UNCERTAIN/UNRECOVERABLE exigem nota. Tabela PRESERVED exige rows; heading exige
nível. Não se infere célula, hierarquia, checkbox ou relação de formulário sem evidência.

## Assets, incerteza e abstention

Cada asset possui SHA-256, asset_id, formato, papel, essencialidade e estado da descrição. Asset
essencial deve ser referenciado por bloco. IMAGE, DIAGRAM, PAGE_RENDER e OTHER distinguem função sem
interpretar conteúdo. O contrato não define storage físico.

uncertainties registra interpretações não provadas; known_losses registra informação ausente. Uma
representação REPRESENTED não declara perda conhecida. PARTIAL mantém o recuperado junto de perdas.
ABSTAINED não contém blocos/assets e exige motivo. Scan sem texto pode ser PARTIAL com PAGE_RENDER,
texto UNAVAILABLE e perda explícita; isso não é OCR.

## Proveniência e consumo

O JSON canônico é o derivative safe-document+json no Provenance V1. Seu hash, tamanho,
derivative_id, source e processing event formam a cadeia completa. Falha de validação preserva o JSON
experimental e assets com validation_status=FAIL.

Markdown é renderer/view, não fonte paralela; expõe source, status, páginas, assets, uncertainties e
known losses. Humanos podem lê-lo e consultar o original. IA pode consumir o AST sem deduzir relações
de formatação e decidir usar assets ou abstention conforme a tarefa.

## Cenários e limites

Fixtures cobrem texto linear, headings, lista multinível, tabela conhecida/incerta, checklist,
formulário, imagem, diagrama, mixed, scan, recuperação parcial, abstention, FAIL preservado e
Provenance V1.

Não foram resolvidos: extração de PDFs, reading order, OCR, interpretação visual, semântica de
tabelas/formulários, storage, P0.2, chunking, tokens, renderer produtivo ou escolha de rota. O script
apenas valida contratos sintéticos e demonstra uma view.
