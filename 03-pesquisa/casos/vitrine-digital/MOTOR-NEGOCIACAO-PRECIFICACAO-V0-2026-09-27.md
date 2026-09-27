# Motor de Negociação e Precificação V0 — Vitrine Digital

**Data:** 27/09/2026  
**Status:** ACTIVE / CANDIDATE onde indicado  
**Base canônica:** custo-base de infraestrutura de R$ 5.255,40/mês para capacidade de 30 empresas.

## 1. Regras vigentes

1. Novas propostas comerciais trabalham com **3 faixas de referência para a mesma linha de produto**.
2. A **Faixa 1 começa em R$ 1.900,00/mês**.
3. Toda proposta de fechamento possui **validade de 7 dias**.
4. Contratos existentes não são reajustados retroativamente por esta regra.
5. Infraestrutura entra na formação de preço antes de qualquer concessão.
6. A referência econômica de infraestrutura é **9,22% da receita-base**, equivalente a **R$ 175,18 por contrato de R$ 1.900** na capacidade de 30 empresas.
7. Desconto reduz o espaço disponível para operação e margem. Portanto, não deve ser concedido como reflexo automático a objeção de preço.

## 2. Faixas comerciais

| Faixa | Valor | Estado |
|---|---:|---|
| Faixa 1 | **R$ 1.900/mês** | ACTIVE |
| Faixa 2 | **PENDENTE** | CANDIDATE |
| Faixa 3 | **PENDENTE** | CANDIDATE |

**Trava:** não inventar valores para as Faixas 2 e 3 até decisão comercial explícita.

## 3. Piso estrutural visível

Para R$ 1.900/mês:

- infraestrutura atribuída: **R$ 175,18/mês**;
- saldo após infraestrutura: **R$ 1.724,82/mês**;
- desse saldo ainda saem operação, ativação/mídia quando aplicável, impostos, fornecedores e margem.

Logo, R$ 1.900 não deve ser tratado como margem disponível.

## 4. Gate antes de desconto

Antes de conceder desconto, registrar:

- preço de tabela/faixa;
- motivo objetivo da concessão;
- duração do desconto;
- contrapartida recebida;
- novo valor mensal;
- infraestrutura preservada;
- custos variáveis adicionais;
- margem resultante quando mensurável;
- data de expiração da proposta;
- autoridade que aprovou a exceção.

Sem esses elementos, desconto = **HOLD**.

## 5. Ordem de negociação

Quando houver objeção de preço:

1. preservar preço e esclarecer escopo/resultado;
2. ajustar escopo antes de reduzir preço;
3. buscar contrapartida econômica antes de conceder desconto;
4. se houver desconto, torná-lo explícito, rastreável e temporal quando aplicável;
5. preservar a validade de 7 dias;
6. registrar exceções para evitar que desconto pontual vire novo preço de referência.

## 6. Contrapartidas possíveis

Exemplos a avaliar conforme o caso, sem concessão automática:

- prazo/compromisso contratual;
- redução objetiva de escopo;
- pagamento antecipado;
- menor demanda operacional;
- ativo/evidência comercial autorizada;
- condição de implantação que reduza custo real.

Cada contrapartida deve ter relação econômica demonstrável com a concessão.

## 7. Evidência e aprendizado

Cada negociação relevante deve alimentar um ledger mínimo:

`cliente | faixa inicial | objeção | concessão | contrapartida | preço fechado | validade | resultado | custo de servir | evidência`

Objetivo: transformar negociação em dado e descobrir, com clientes reais, quais concessões fecham negócio sem destruir margem.

## 8. Integração com capacidade de 30 empresas

Referência:

```text
30 × R$ 1.900 = R$ 57.000/mês
Infraestrutura = R$ 5.255,40/mês
Infraestrutura atribuída = 9,22%
```

A meta de escala não autoriza desconto por volume presumido. O preço deve financiar a capacidade necessária para chegar e sustentar a operação de 30 empresas.

## 9. Pendências

- [ ] Definir valor e escopo da Faixa 2.
- [ ] Definir valor e escopo da Faixa 3.
- [ ] Definir matriz formal de autoridade de desconto.
- [ ] Definir limites de concessão por tipo de contrapartida com evidência real.
- [ ] Integrar o ledger de negociação às propostas futuras.
- [ ] Medir custo real de servir por cliente e comparar com o custo-base de capacidade.

## 10. Regra de segurança comercial

**Preço-base não é caixa livre. Desconto não é cortesia. Toda concessão consome capacidade econômica e precisa comprar alguma coisa em troca.**
