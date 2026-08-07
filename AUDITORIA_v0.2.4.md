# Auditoria de Coerência Canônica — v0.2.4

**Data:** 2026-07-31  
**Escopo:** núcleo canônico em `ontology/`, `laws/`, `hypotheses/`, `metrics/`, `references/`, `diagrams/` e `manifest/`; estrutura e inventário de `archive/`.  
**Método:** leitura cruzada de documentos, conferência dos identificadores e referências textuais, análise da malha conceitual, verificação de hashes SHA-256 e inspeção do histórico Git.  
**Limite:** esta auditoria não valida empiricamente as proposições nem reavalia o conteúdo dos PDFs. Ela avalia a coerência, rastreabilidade e governança documentais do estado atual.

## Sumário executivo

O repositório tem um núcleo pequeno, inteligível e bem separado do acervo histórico. A sequência ontológica está explícita, os doze conceitos `IDR` possuem definições, as quatro leis têm relações declaradas e as hipóteses distinguem, em geral, o que é proposição em validação do que é evidência.

Não foi identificada duplicidade de definição ou colisão entre IDs canônicos já atribuídos (`IDR-0001` a `IDR-0012`, `LAW-001` a `LAW-004`, `HYP-001` a `HYP-003` e `MET-001` a `MET-005`). Os principais riscos estão na governança verificável da versão, em referências conceituais ainda não materializadas e na operacionalização das métricas e hipóteses.

| Prioridade | Achados |
| --- | ---: |
| Crítica | 1 |
| Alta | 4 |
| Média | 6 |
| Baixa | 4 |

## Malha canônica observada

```text
IDR-0002 Representação
  → IDR-0001 Coordenação
    → IDR-0006 Persistência
      → IDR-0004 Deformação → ECO → ICO
      → IDR-0005 Resiliência → Fliflexação → IFX → Capital Preservado → Slektip
```

Essa malha é consistente entre `ontology/glossary.md`, `ontology/relations.md` e os dois diagramas Mermaid. A dependência declarada das leis também é coerente: `LAW-001` fundamenta `LAW-002` e `LAW-003`; `LAW-002` fundamenta `LAW-003` e `LAW-004`; as leis 3 e 4 conectam-se às métricas correspondentes.

## Achados críticos

### C-01 — Manifesto não permite verificar a integridade declarada

**Evidência:** `manifest/v0.2.0.manifest.md` contém hashes truncados, por exemplo `README.md = 45862851...`. O SHA-256 bruto atual do mesmo arquivo é `7e42fa886730465e3a0040329eaceee858fc0f5d44214b7d15e9bd828978b734`; o prefixo não coincide. O mesmo ocorre com os demais artefatos amostrados. Além disso, o estado do repositório alcançou v0.2.4 e não há manifesto posterior a v0.2.0.

**Impacto:** a alegação de fonte “verificável e rastreável” não é reproduzível por um leitor independente no estado atual. Não é possível distinguir se houve alteração legítima, mudança de método de hash, erro de geração ou manifesto desatualizado.

**Recomendação:** criar um manifesto por versão publicada, com SHA-256 completo, algoritmo e procedimento de geração explícitos; adicionar uma validação automatizada em modo somente leitura. Usar tags Git anotadas ou assinadas para cada versão canônica.

## Achados de alta prioridade

### A-01 — “Axioma Fundamental” é referência sem artefato canônico

**Evidência:** `hypotheses/HYP-001-consequencia-fundamental.md` lista “Axioma Fundamental” como referência. Não existe documento, ID ou entrada no manifesto com esse nome.

**Impacto:** a hipótese central se apoia em uma base normativa que não pode ser consultada, citada ou versionada.

**Recomendação:** formalizar o axioma como objeto canônico identificado — ou substituir a referência pelos conceitos e leis já existentes, caso o axioma seja apenas uma síntese deles.

### A-02 — HYP-001 contém universalidade incompatível com suas próprias limitações

**Evidência:** o enunciado afirma que “toda falha operacional observável” foi precedida por deformação representacional não corrigida. A seção de limitações admite fatores externos e erro humano não mediado por representação como possíveis exceções.

**Impacto:** o escopo da hipótese fica simultaneamente universal e condicionado; isso reduz sua falseabilidade e pode levar a classificações retrospectivas forçadas.

**Recomendação:** delimitar a população de falhas coberta, definir critérios de exclusão e registrar como serão classificados casos externos, humanos ou mistos.

### A-03 — HYP-002 introduz viés de medição entre piloto e controle

**Evidência:** o grupo piloto terá coleta automática via Copiloto e o controle, checklist manual quinzenal. Ao mesmo tempo, H2 prevê mais ECOs no piloto por maior detecção e H3 compara ICO médio entre os grupos.

**Impacto:** diferenças podem refletir o instrumento e a frequência de coleta, e não a intervenção OPERA. A comparação de ECO/ICO entre grupos fica metodologicamente ambígua.

**Recomendação:** definir protocolo de observação comum, janela de observação, denominadores (por obra, hora, etapa ou exposição), critérios de severidade e estratégia de ajuste para subnotificação.

### A-04 — MET-003 e MET-005 confundem mecanismo, capacidade e métrica

**Evidência:** `MET-003` chama Fliflexação de capacidade/mecanismo e apresenta o **IFX** como a medida agregada. `MET-005` chama Slektip de métrica, mas o define como mecanismo/representação e não fornece variável, fórmula ou escala.

**Impacto:** a taxonomia `MET` mistura objetos de naturezas distintas, dificultando coleta, comparabilidade e futuras implementações.

**Recomendação:** decidir explicitamente se `MET-003` nomeia o constructo ou o índice IFX; para Slektip, optar entre objeto operacional `SLK`, protocolo `PRT` ou métrica derivada (por exemplo, taxa de Slektips validados), mantendo as três coisas separadas quando necessário.

## Achados de média prioridade

### M-01 — Capital Preservado não possui método de mensuração reprodutível

**Evidência:** `MET-004` define `Capital Preservado = EPI − Corrosão Operacional Acumulada`, mas EPI é descrita como um cenário ideal e a corrosão inclui custos heterogêneos. Não há método de estimação, baseline, período, regras de atribuição causal ou tratamento de incerteza.

**Impacto:** a métrica pode ser interpretada como valor observado, contrafactual ou ganho marginal — três coisas diferentes.

**Recomendação:** criar um protocolo de cálculo com unidade, período, fontes, premissas, método de baseline, faixas de incerteza e exemplo reproduzível.

### M-02 — IFX tem escala alternativa sem regra de normalização

**Evidência:** `MET-003` permite componentes de 0–1 “ou 0–10”, mas afirma que o resultado varia de 0 a 1.

**Impacto:** duas equipes podem obter resultados numericamente incompatíveis usando a mesma fórmula.

**Recomendação:** fixar a escala canônica ou definir conversão formal, rubricas de pontuação e evidência mínima para cada componente.

### M-03 — Referências bibliográficas não são citáveis de forma determinística

**Evidência:** documentos usam autor/ano em texto, sem chaves BibTeX. `HYP-003` cita Weick (1995), *Sensemaking in Organizations*, mas `references/bibliography.bib` contém Weick (1979), não a obra de 1995.

**Impacto:** há uma referência quebrada e não existe ligação automática entre afirmações e entradas bibliográficas.

**Recomendação:** adicionar chaves BibTeX nas citações (por exemplo, `[@weick1995]`), incluir a referência ausente e definir padrão de citação.

### M-04 — Relações são duplicadas manualmente em três representações

**Evidência:** a mesma estrutura aparece em `ontology/relations.md`, `diagrams/hierarquia-conceitual.mmd` e `diagrams/ciclo-persistencia.mmd`.

**Impacto:** toda evolução conceitual exige sincronização manual e pode introduzir deriva entre texto, tabela e diagrama.

**Recomendação:** definir uma representação normativa para relações — preferencialmente um registro estruturado versionado — e tratar diagramas como derivados ou validá-los contra essa fonte.

### M-05 — Protocolos são previstos, mas não existem no núcleo

**Evidência:** `README.md` e `AGENTS.md` reservam o prefixo `PRT`; o manifesto lista a formalização de protocolos como próximo passo. Há PDFs de protocolo no acervo, porém nenhuma pasta ou objeto `PRT-XXX` canônico.

**Impacto:** métricas e hipóteses não têm ainda procedimento primário e auditável de coleta/aplicação.

**Recomendação:** criar a camada `protocols/` somente após definir um template mínimo: objetivo, escopo, entradas, etapas, evidências, saída, responsáveis, exceções e relações por ID.

### M-06 — Estado da pesquisa precisa ser separado do desenho pretendido

**Evidência:** `HYP-002` apresenta um desenho de 5 obras piloto versus 5 controle, mas informa que a pesquisa não começou e que apenas uma obra será avaliada em controle.

**Impacto:** leitores podem confundir protocolo planejado com evidência realizada.

**Recomendação:** separar “desenho alvo”, “estado de execução”, “dados disponíveis” e “resultados” em seções ou artefatos distintos, com datas.

## Achados de baixa prioridade

### B-01 — Identificadores reservados aparecem apenas como exemplos

`PRT-001`, `SLK-001` e `LAW-005` aparecem como exemplo, possibilidade futura ou convenção, sem objeto correspondente. Não são IDs duplicados nem erro atual; devem apenas ser tratados como reservados até que existam artefatos canônicos.

### B-02 — O conceito “Estado coordenado” tem integração limitada

`IDR-0003` aparece no glossário, relações e diagrama, mas não é referenciado explicitamente por leis, hipóteses ou métricas. Isso pode ser uma escolha adequada; se for conceito operacional importante, falta esclarecer seu papel analítico.

### B-03 — MET-001 possui definição curta e sem método de registro

ECO está conceitualmente bem ancorado, porém ainda não especifica evidência mínima, momento de abertura/fechamento, taxonomia de causa, gravidade, responsável ou ligação obrigatória a uma representação deformada.

### B-04 — O acervo tem classificação, mas não metadados uniformes por item

`archive/google-drive/INVENTARIO.md` classifica 357 itens e identifica fontes, artefatos e documentos de identidade. Ainda faltam, por item, proveniência, data, licença, sigilo, relação com IDs canônicos e hash. O inventário também alerta corretamente que documentos de identidade devem ficar somente em repositório privado.

## Documentos órfãos e referências quebradas

| Item | Situação | Avaliação |
| --- | --- | --- |
| Axioma Fundamental | Referenciado por HYP-001, sem arquivo/ID | Referência quebrada — alta |
| Weick (1995), *Sensemaking in Organizations* | Citado em HYP-003, ausente do `.bib` | Referência bibliográfica quebrada — média |
| `IDR-0003` Estado coordenado | Definido, mas sem uso fora da ontologia/diagrama | Órfão parcial — baixa |
| `references/bibliography.bib` | Não recebe citações por chave | Órfão funcional parcial — média |
| `references/dossie-revisao.md` | Conectado pelo manifesto, não por relações semânticas | Documento de apoio; ligação semântica pode ser ampliada |
| Diagramas Mermaid | Consistentes com a ontologia no momento | Não órfãos, mas duplicam relações manualmente |

## Checagem de IDs

| Família | Definidos no núcleo | Duplicados de definição | Observação |
| --- | --- | --- | --- |
| `IDR` | 0001–0012 | Nenhum | Sequência contínua |
| `LAW` | 001–004 | Nenhum | `LAW-005` é apenas futuro em HYP-003 |
| `HYP` | 001–003 | Nenhum | Sequência contínua |
| `MET` | 001–005 | Nenhum | Taxonomia de MET precisa de refinamento em 003 e 005 |
| `PRT` | Nenhum | Não aplicável | `PRT-001` é exemplo/reserva |
| `SLK` | Nenhum | Não aplicável | `SLK-001` é exemplo/reserva |

As múltiplas ocorrências encontradas dos IDs existentes são referências cruzadas legítimas, não duplicidades de definição.

## Oportunidades de reorganização

1. Instituir `protocols/` quando houver o primeiro PRT validado, em vez de antecipar documentos vazios.
2. Separar o repositório ou ao menos a distribuição do núcleo canônico do acervo de 707,6 MB; manter relação por inventário, hashes e proveniência.
3. Isolar documentos pessoais/sensíveis do histórico destinado a compartilhamento, observando que remoção futura exige tratar também o histórico Git.
4. Adotar um índice estruturado de objetos canônicos com ID, status, dependências, sucessor, versão e caminhos de arquivos.
5. Criar política de ciclo de vida: rascunho → proposto → em validação → aceito/deprecado, com autoridade humana de aprovação.
6. Converter gradualmente fontes conceituais relevantes do acervo em Markdown com proveniência, sem tratar os PDFs como documentos normativos.

## Plano de priorização sugerido

1. **Crítica:** restaurar a verificabilidade da versão: manifesto completo, método declarado e tag Git.
2. **Alta:** decidir e formalizar o Axioma Fundamental; delimitar HYP-001; corrigir o desenho de medição de HYP-002; normalizar a taxonomia MET/IFX/Slektip.
3. **Média:** especificar protocolos de medição para ECO, ICO, IFX e Capital Preservado; corrigir a bibliografia e automatizar a malha de relações.
4. **Baixa:** aprofundar o papel de Estado coordenado e enriquecer metadados do acervo.

## Conclusão

O núcleo está conceitualmente coeso para a sua maturidade atual: não há colisões de IDs nem contradição direta entre ontologia, leis, hipóteses e métricas. A principal necessidade não é expandir conceitos; é transformar a estrutura editorial existente em governança científica e técnica verificável. Isso preservará o caráter canônico do repositório à medida que protocolos, evidências de campo e aplicações forem incorporados.
