# Diário de Campo 02 – Canteiro de Obras (Fase 3)

**Data:** 2026-08-06  
**Grau de observação:** O2 (Reconstrução logo após o evento)  
**Contexto:** Gestão de suprimentos e recebimento de materiais em canteiro (Alvenaria).  

## 1. O Que Aconteceu?
Um lote de blocos cerâmicos entregue pelo fornecedor divergiu da especificação dimensional contratada (blocos de 14cm em vez de 19cm), paralisando temporariamente o início da alvenaria do 2º pavimento.

## 2. Quem Participou?
- O almoxarife (Pedro).
- O comprador da construtora (Marcos).
- O encarregado de alvenaria (Antônio).

## 3. Que Representação Estava Sendo Usada?
- Nota fiscal e pedido de compra digital vs. Especificação técnica do projeto arquitetônico.

## 4. Onde Apareceu a Primeira Divergência?
- No momento da conferência física do material descarregado no canteiro pelo almoxarife, confrontando a nota fiscal com a exigência de projeto.

## 5. Como Foi Percebida?
- Percepção imediata pelo almoxarife ao notar a largura visualmente menor dos blocos no pallet.

## 6. Como Foi Corrigida?
- Recusa parcial da carga, emissão de registro de não-conformidade (RNC) e contato telefônico imediato com o setor de compras para troca do lote.

## Hipóteses Concorrentes

### Hipótese TPC
- **Descrição:** Falha de acoplamento entre o pedido de compra (representação comercial) e a especificação de projeto (representação técnica), sem canal de checagem prévia na interface de recebimento.
- **Predição:** Vincular o pedido de compra diretamente ao catálogo BIM reduz a entropia de transmissão de requisitos.

### Hipótese Gestão Tradicional
- **Descrição:** Erro do fornecedor e falta de rigor no controle de almoxarifado.
- **Predição:** Multar o fornecedor e exigir mais atenção do almoxarife.

### Hipótese BIM
- **Descrição:** Inexistência de integração entre o quantitativo BIM e o sistema ERP de compras.
- **Predição:** Automação de suprimentos via modelo BIM eliminará divergências de especificação.

### Hipótese Lean
- **Descrição:** Falha no processo de homologação de fornecedores e ausência de inspeção na fonte.
- **Predição:** Homologação rigorosa e entrega just-in-time com inspeção prévia.

---

## Ficha de Unidade Observacional

- **ID:** OBS-0002
- **Domínio:** Construção Civil
- **Tipo de observação:** O2
- **Fenômeno observado:** Divergência dimensional em lote de blocos cerâmicos entregue em canteiro de obras.
- **Representações envolvidas:** Pedido de compra digital (ERP) vs. Especificação de projeto arquitetônico.
- **Agentes envolvidos:** Almoxarife, comprador, encarregado de alvenaria.
- **Canais:** Nota fiscal física/digital, telefone, registro de não-conformidade (RNC).
- **Hipóteses concorrentes:** TPC, Gestão Tradicional, BIM, Lean.
- **Resultado observado:** Recusa parcial do lote, emissão de RNC e renegociação com compras.
- **Contradições encontradas:** O sistema comercial e o sistema técnico operam com representações desconectadas, gerando falha de interface no recebimento.
- **Questões em aberto:** Como automatizar a verificação prévia de recebimento para minimizar o custo de transação da recusa em campo?
