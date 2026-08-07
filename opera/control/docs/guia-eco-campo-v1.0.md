# Guia de Campo ECO v1.0 - especificação candidata

**Estado documental:** `ACTIVE` - aplicação operacional candidata
**Alinhamento:** candidata TPC v0.8
**Não substitui:** `GLOSSARIO_CANONICO.md`, `MANUAL_ECO.md` ou `02-aplicacoes/TDO.md`

## 1. Nomenclatura

O termo oficial permanece **ECO - Evento de Corrosão da Coordenação** (`IDR-0010`/`MET-001`). “Evento de Corrosão Operacional” é rótulo histórico do produto.

Na candidata v0.8, ECO é um desfecho observável de falha coordenacional. Degradação representacional, mecanismo causal e estado da representação são registrados separadamente.

## 2. Registre a ocorrência; classifique depois

Para reduzir perda de sinal de campo, qualquer ocorrência relevante pode entrar como **ocorrência candidata**. Isso não significa classificá-la automaticamente como ECO.

```text
Ocorrência candidata
        |
Triagem de evidência
        |-- ECO confirmado
        |-- possível ECO
        |-- não classificável
        `-- excluído como ECO, com motivo preservado
```

Um ECO confirmado exige:

1. falha coordenacional observável;
2. ação, agentes ou mecanismos afetados identificáveis;
3. representação relevante ou ausência documentada;
4. evidência mínima vinculada;
5. separação entre observação e inferência causal.

Erros individuais isolados, decisões estratégicas, eventos externos e perdas sem falha coordenacional podem ser registrados como ocorrências, mas não recebem automaticamente o tipo ECO.

## 3. ICO de campo

O frontend atual implementa:

\[
ICO_{campo}=I_s\times R_s\times P_s
\]

com três escores ordinais de 1 a 5 e resultado entre 1 e 125. O sufixo `_campo` é obrigatório em documentação analítica para distingui-lo de variáveis brutas.

| Campo | Escore de campo | Variável bruta a preservar |
|---|---|---|
| Impacto | 1-5 por faixa declarada | custo, prazo, segurança e consequência observados |
| Recorrência | 1-5 por intervalo | contagem e janela temporal |
| Persistência | 1-5 por intervalo | duração em dias e estado de resolução |

As seis faixas de cor do produto podem orientar fila operacional, mas não são equivalentes às quatro faixas históricas da TDO e ainda exigem calibração. Em 2 de agosto de 2026, os rótulos visíveis e cabeçalhos de exportação do frontend foram ajustados para “ICO (campo)”; identificadores internos e schema foram preservados por compatibilidade.

## 4. Capital Preservado

\[
Capital\ Preservado=EPI-Corrosão\ Operacional\ Acumulada
\]

“Prejuízo evitado” pode alimentar EPI quando houver contrafactual e método documentados. A view atual do Control soma EPI e ainda não implementa integralmente a fórmula; portanto o dashboard não deve ser apresentado como cálculo canônico validado.

## 5. Registro mínimo

- data do evento e data do registro;
- descrição observável;
- agentes, ação e tarefa afetados;
- representação relevante e sua versão;
- evidência disponível;
- estado: candidato, possível, confirmado, não classificável ou excluído;
- escores de campo e valores brutos;
- hipótese causal separada do fato;
- revisor e justificativa de classificação.

## 6. Limitações

Este guia resolve nomenclatura e fluxo de triagem para a candidata v0.8. Não valida faixas, pesos, causalidade, Capital Preservado ou IFX. Alterações no banco e no frontend exigem migration, compatibilidade e testes próprios.

### Migrations futuras aprovadas como pendência

1. armazenar contagem, janela de recorrência, duração em dias e estado de resolução separadamente dos escores;
2. corrigir `vw_capital_preservado` somente após definir e testar a fonte de Corrosão Operacional Acumulada;
3. manter backfill, rollback e compatibilidade de leitura explícitos.
