# TEMPLATE CANÔNICO — Relatório do Diagnóstico O.P.E.R.A. R$197 (V0)

**Artefato operacional:** molde reutilizável. Este arquivo **não é** relatório de um cliente. Um relatório real é produzido copiando este arquivo para um documento privado do cliente (formato `diagnostico-opera-OPP-XXX.md`, depois PDF), preenchendo apenas os campos indicados e apagando as instruções em *[colchetes]*.

**Artefatos vinculados:** `PLAYBOOK-DIAGNOSTICO-OPERA-R197-V0.md` (processo), `MATRIZ-DIAGNOSTICO-PARA-OPERA-V0.md` (continuidade), `LOG.md` (registro append-only), `offer diagnostico-opera-v1.1-approved.json` (SLA e correção factual).

**Regras de produção (não negociáveis):**

1. **DIAGNOSIS_FIRST:** o relatório deve ser completo e útil mesmo que `NEXT_PRODUCT = NONE`. A avaliação de continuidade acontece depois dos achados, por fora deste documento (matriz).
2. **REPORT_LENGTH = FIT_FOR_PURPOSE.** Não existe número de páginas canonizado. Relatar em páginas suficientes para a questão e para os materiais; medir páginas/tempo em cada caso (economia unitária). Evitar tratado.
3. **Relato ≠ fato:** o que o cliente disse é `DECLARADO`; o que os materiais mostram é `OBSERVADO`; conclusões sustentadas são `INFERIDO` (com encadeamento); o que não se sabe é `DESCONHECIDO` ou lacuna.
4. **Nenhuma promessa de economia**, nenhuma atribuição profissional indevida, nenhuma recomendação sem base.
5. **Limites canônicos** na Seção 10, literalmente.

---

# DIAGNÓSTICO O.P.E.R.A.

**[ID do diagnóstico: OPP-XXX · Diagnóstico-XXX]**
**[Data de emissão: AAAA-MM-DD]**
**[Tipo de obra: residencial / comercial / reforma / obra própria / múltiplas frentes]**
**[Papel do contratante: dono da obra / construtora / empreiteiro / contratante / investidor / gestor / outro — campo BUYER_ROLE]**
**[Questão principal analisada: 1 frase, na voz do cliente]**

*[Evitar PII desnecessária: sem telefone, e-mail, CPF ou endereço do cliente. Usar razão social/apelido apenas se necessário à identificação do caso no registro privado do owner.]*

---

## SUMÁRIO EXECUTIVO (primeira página)

### O QUE ANALISAMOS

*[1–2 frases: qual obra, qual pergunta.]*

### O QUE ENCONTRAMOS

*[Máximo 3–5 achados, 1 linha cada, com a classificação entre parênteses.]*

### O QUE NÃO CONSEGUIMOS DETERMINAR

*[Lacunas principais, 1 linha cada.]*

### O QUE MERECE ATENÇÃO PRIMEIRO

*[Máximo 3 prioridades (P1).]*

*Objetivo: o cliente deve conseguir valor deste sumário sem ler o resto.*

---

## 1. OBJETIVO DA ANÁLISE

*[Qual pergunta estamos tentando responder? Escrever a pergunta do cliente, não uma pergunta genérica.]*

---

## 2. CONTEXTO DECLARADO

*[O que foi informado pelo cliente: tipo de obra, história, problema percebido, urgências.]*

**Classificação: `DECLARADO`.** Conteúdo de relato — não tratado como fato observado.

---

## 3. MATERIAIS RECEBIDOS

| Material | Origem (quem/enviou quando) | Data de recebimento | Observação |
|---|---|---|---|
| *[ex.: 14 fotos da obra]* | *[cliente, 17/08]* | *[AAAA-MM-DD]* | *[—]* |
| *[ex.: planilha de custo]* | | | |
| *[ex.: cronograma]* | | | |
| *[ex.: orçamento]* | | | |
| *[ex.: mensagens]* | | | |

**Ausências relevantes:** *[listar o que se esperava e não chegou — ex.: sem cronograma, sem boletins de medição. Registrar também aqui; a ausência é informação.]*

---

## 4. ESTADO OBSERVÁVEL

*[Somente aquilo sustentado pelas evidências recebidas. Cada afirmação cita o material que a sustenta.]*

**Classificação: `OBSERVADO`.**

| Situação observada | Evidência |
|---|---|
| *[ex.: material estocado a céu aberto na foto 3]* | *[foto 03, recebida 17/08]* |

---

## 5. ACHADOS

*[Cada achado tem estrutura própria. Máximo de 5 achados; se a questão tiver mais, priorizar.]*

### ACHADO A-001

**Descrição:** *[1–3 frases.]*

**Classe:** `DECLARADO` / `OBSERVADO` / `INFERIDO` / `DESCONHECIDO`

**Evidência:** *[qual(is) material(is) sustentam — referência direta à Seção 3/4.]*

**Impacto operacional possível:** *[o que isso pode estar causando ou causar — sem prometer valor em reais como garantia.]*

**Confiança:** *[alta / média / baixa — apenas quando o encadeamento permite; omitir falsa precisão.]*

**O que não sabemos:** *[1 frase do que esta evidência não permite concluir.]*

*[Repetir para A-002, A-003, ...]*

**Resultado por achado:** `FINDING_SUPPORTED` / `FINDING_NOT_SUPPORTED` / `INSUFFICIENT_EVIDENCE`

---

## 6. DIVERGÊNCIAS

*[Registrar onde `DECLARADO ≠ OBSERVADO` ou onde fontes divergem entre si. Apresentar as duas versões. Não decidir silenciosamente qual é verdadeira.]*

| Onde divergem | Versão declarada | Versão observada / outra fonte |
|---|---|---|
| *[ex.: cliente relata estoque suficiente; fotos mostram sobra acumulada]* | | |

---

## 7. LACUNAS DE INFORMAÇÃO

*[O que impediria conclusões melhores. Usar `INSUFFICIENT_EVIDENCE` quando a lacuna não permitir concluir sobre um achado relevante.]*

---

## 8. PRIORIDADES

| Prioridade | Achado ligado | Recomendação operacional (não técnica regulamentada) |
|---|---|---|
| **P1 — atenção imediata** | *[A-001]* | *[ação dentro do escopo; não substitui execução qualificada]* |
| **P2 — importante** | | |
| **P3 — acompanhar** | | |

*Separar prioridade operacional de responsabilidade técnica fora do escopo (execução, laudo, fiscalização).*

---

## 9. PRÓXIMAS DECISÕES POSSÍVEIS

Primeiro responder: **diante do que foi observado, quais decisões ficaram disponíveis ao cliente?** *[Listar 2–4 decisões que o diagnóstico habilita — ex.: renegociar com o fornecedor X, reorganizar a sequência de compras, contratar acompanhamento — sem prescrever nenhuma como obrigatória.]*

*[A avaliação de continuidade OPERA é feita por fora deste documento (matriz de encaminhamento) e apresentada ao cliente em mensagem separada, apenas se `CONTINUATION_STATUS ≠ NONE`.]*

---

## 10. LIMITES

Este diagnóstico:

- **não é laudo**, **não é auditoria técnica regulamentada** e **não é parecer** técnico, contábil ou jurídico;
- **não inclui visita à obra**, nem implementação ou acompanhamento, salvo contratação distinta futura;
- **não promete economia**, redução de perdas ou desempenho;
- onde os dados foram insuficientes, **não inventa classificação** — declarou `INSUFFICIENT_EVIDENCE`.

---

## ANEXO — QA DA ENTREGA (interno; não vai ao cliente)

`DELIVERY_QA` executado antes de gerar o PDF (checklist em `PLAYBOOK` Seção QA):

*[ ] pergunta principal respondida ou explicitamente inconclusiva
[ ] relato não tratado como observação
[ ] evidências identificadas
[ ] inferências marcadas
[ ] lacunas declaradas
[ ] nenhuma promessa de economia
[ ] nenhuma atribuição profissional indevida
[ ] nenhuma recomendação sem base
[ ] dados pessoais minimizados
[ ] PDF legível
[ ] escopo respeitado

**DELIVERY_QA = PASS / FAIL** · *[somente PASS pode ser entregue]*

**Métricas medidas (economia unitária):** páginas: [·] · tempo de análise: [·] · tempo de redação: [·] · tempo de revisão: [·] · tempo total: [·]

**DELIVERY_CLOCK_STARTED_AT:** [AAAA-MM-DD HH:MM] · **DELIVERY_DUE_AT:** [AAAA-MM-DD] (3 dias úteis a partir do clock)

**BLOCKED_BY_MISSING_INFORMATION:** *[sim/não — se sim, o que e desde quando; clock pausado pela pendência explícita]*

**CONTINUATION_STATUS:** `NONE` / `POTENTIAL_FIT` / `STRONG_FIT` / `INSUFFICIENT_EVIDENCE`
*(preenchido por fora do relatório, no registro do owner — Seção "Como apresentar continuidade" do playbook)*

**NEXT_BEST_ACTION:** *[encerrar / pedir informação / acompanhar depois / apresentar capacidade OPERA / proposta específica / outro]*

**VALUE_SIGNAL (após entrega):** *[resposta literal à pergunta "qual decisão ficou mais fácil de tomar?"]*
