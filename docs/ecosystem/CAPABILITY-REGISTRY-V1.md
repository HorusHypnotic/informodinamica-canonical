# Capability Registry V1

O registro estruturado `ecosystem/capabilities.json` contém 11 capacidades verificadas. A unidade de
reuso é uma capacidade com contrato e limite, não a cópia integral de um produto.

| ID | Capability | Estado | Reuso prioritário |
|---|---|---|---|
| CAP-001 | Context Gate | V1 CANONICAL GREEN | gates de produtos |
| CAP-002 | Document Provenance | V1 GREEN | pesquisa, Cofre e intercâmbio documental |
| CAP-003 | Provenance Index | V1 GREEN | índices locais reconstruíveis |
| CAP-004 | Safe Representation | V1 GREEN sintético | derivados com perdas explícitas |
| CAP-005 | Evidence Ledger | V0 GREEN sintético | pesquisa/diagnóstico sem certeza silenciosa |
| CAP-006 | Textual-Safe Route | V1 GREEN sintético | transformação pós-admissão |
| CAP-007 | Corpus Inventory | operacional | acervos locais controlados |
| CAP-008 | Binary Deduplication | operacional | deduplicação lógica, nunca exclusão automática |
| CAP-009 | Classification/Routing | GREEN restrito | triagem, não convertibilidade |
| CAP-010 | Snapshot/Hash/Audit Patterns | local, não compartilhado | extrair só após três usos reais |
| CAP-011 | Research Governance/Falsifiability | canônico/ativo | experimentos e alegações de IP |

GREEN sintético não equivale a uso real; padrão repetido não é automaticamente biblioteca; reuso não
transfere ownership; e toda capability referenciada deve existir no registro.
