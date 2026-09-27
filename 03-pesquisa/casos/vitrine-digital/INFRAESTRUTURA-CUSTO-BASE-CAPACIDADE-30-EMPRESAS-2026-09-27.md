# Infraestrutura — Custo-base para capacidade de 30 empresas

**Data-base:** 27/09/2026  
**Status:** referência operacional e comercial vigente  
**Capacidade dimensionada:** 30 empresas  
**Receita-base por empresa:** R$ 1.900,00/mês  
**Custo-base mensal de infraestrutura:** **R$ 5.255,40**  
**Alocação econômica:** **9,22% da receita-base**

## 1. Decisão

A operação passa a trabalhar com **R$ 5.255,40/mês** como custo-base de infraestrutura para o dimensionamento econômico e comercial da capacidade de 30 empresas.

O dimensionamento é feito pela capacidade que a operação precisa sustentar, e não apenas pelo consumo mínimo observado no estágio inicial.

```text
30 empresas × R$ 1.900,00 = R$ 57.000,00/mês
R$ 57.000,00 × 9,22% = R$ 5.255,40/mês
```

Cada contrato-base de R$ 1.900,00 incorpora economicamente **R$ 175,18/mês** de infraestrutura.

## 2. Composição de referência

| Camada | Valor mensal |
|---|---:|
| IA, agentes e processamento inteligente | R$ 1.300,00 |
| WhatsApp API e mensageria | R$ 1.000,00 |
| Backend, banco de dados, storage e backups | R$ 900,00 |
| Compute, servidores e automações | R$ 800,00 |
| Observabilidade, domínios e serviços auxiliares | R$ 400,00 |
| Capacidade de expansão e contingência | R$ 855,40 |
| **Total** | **R$ 5.255,40** |

Os valores por camada são envelopes de capacidade e devem ser refinados à medida que fornecedores, APIs e consumo real forem contratados ou medidos.

## 3. Capacidade que deve sustentar

A infraestrutura deve suportar, conforme implantação e demanda:

- Vitrine Digital e operações digitais dos clientes;
- Canteiro de Obras Digital;
- Smart Cotações;
- IA, agentes e automações;
- banco de dados, storage e backups;
- APIs externas e integrações;
- WhatsApp API e mensageria;
- compute e servidores;
- monitoramento e observabilidade;
- pipelines internos e evidências operacionais;
- redundância e expansão até a capacidade de referência.

## 4. Uso na precificação e negociação

O custo de infraestrutura passa a integrar a formação do preço antes de concessões comerciais.

**Regra:** desconto não deve ser calculado apenas sobre o preço nominal do contrato. Deve preservar a capacidade de infraestrutura, os demais custos da entrega e a margem necessária para operar.

Para o contrato-base:

| Item | Valor |
|---|---:|
| Preço-base | R$ 1.900,00 |
| Infraestrutura atribuída (9,22%) | R$ 175,18 |
| Saldo para demais custos, operação e margem | R$ 1.724,82 |

Logo, qualquer desconto reduz diretamente o espaço disponível para operação e margem se os custos estruturais forem mantidos.

A referência de R$ 5.255,40 deve, portanto, funcionar como **âncora interna de custo e capacidade** nas propostas, simulações e negociações, aumentando a disciplina para concessão de descontos.

## 5. Governança financeira

Para preservar rastreabilidade, a gestão mantém duas leituras simultâneas:

1. **Custo-base de infraestrutura:** R$ 5.255,40/mês, utilizado em capacidade, precificação e negociação.
2. **Desembolso realizado:** pagamentos efetivamente ocorridos no período, registrados separadamente no ledger financeiro.

A diferença entre ambos não deve ser tratada como gasto já ocorrido. Ela representa capacidade econômica destinada à expansão, contingência e absorção de infraestrutura necessária à escala.

## 6. Regra de revisão

Revisar esta referência quando houver mudança material em pelo menos um dos seguintes fatores:

- preço-base ou capacidade-alvo;
- arquitetura tecnológica;
- contratação relevante de API, compute, banco ou mensageria;
- consumo mensurado por cliente;
- mudança substancial de fornecedores;
- evidência de que a alocação de 9,22% deixou de representar adequadamente a capacidade necessária.

## 7. Registro canônico

A partir de 27/09/2026:

> **INFRAESTRUTURA = R$ 5.255,40/mês**  
> **CAPACIDADE DE REFERÊNCIA = 30 empresas**  
> **ALOCAÇÃO ECONÔMICA = 9,22% da receita-base**

Esta referência deve alimentar modelos de proposta e negociação, sem substituir o ledger de desembolsos efetivamente realizados.
