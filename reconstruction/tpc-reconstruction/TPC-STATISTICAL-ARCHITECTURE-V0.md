# TPC-STATISTICAL-ARCHITECTURE-V0 — Unidades, clustering, episódios e modelos

**Data:** 18/08/2026 · **Status:** proposta candidata, não canônica. Substitui as exigências não justificadas do Breaker (N≥20 obras, p<0.05 como selo).

## 1. O que foi retirado

O Breaker (autópsia §7) propôs "N≥20 obras pareadas, p<0.05, validação cruzada temporal" sem demonstrar que a obra é a unidade estatística correta. A auditoria (AUD-05) confirmou: esse desenho permite **pseudorreplicação** — ECOs não são independentes entre si nem obras independentes entre empresas. O requisito N≥20 é **retirado**; o tamanho amostral será determinado por cálculo de poder condicionado à estrutura escolhida. p<0.05 deixa de ser selo de sobrevivência: os estimandos declarados são effect size, intervalo de incerteza, desempenho fora da amostra, calibração e replicação.

## 2. Estrutura hierárquica dos dados

```
empresa → obra → equipe/processo → artefato → versão → episódio coordenacional → ECO(t)
```

Cada nível introduz correlação intraclasse. ECOs dentro da mesma obra compartilham gestão, cultura documental e fornecedor; obras da mesma empresa compartilham procedimentos. Ignorar isso produz erros padrão subestimados e falsos positivos. A hierarquia acima não é afirmação de que todos os níveis devam entrar no modelo — é o **mapa de dependência** que o desenho precisa endereçar.

## 3. Unidade candidata: o episódio coordenacional

Proposta (seção 16 da missão): a unidade estatística natural é o **episódio coordenacional**, definido operacionalmente por cinco condições verificáveis:

1. Existe tarefa ou decisão com interdependência entre agentes identificáveis;
2. Os agentes dependem de representações identificáveis (artefatos com endereço documental);
3. O estado representacional pode ser congelado em t₀ (EO medido antes do desfecho);
4. Um horizonte futuro é definido (janela em que o desfecho pode ocorrer);
5. O desfecho pode ou não ocorrer dentro da janela.

O episódio transforma o estudo de "correlação entre dois agregados" em **cohorte prospectiva por episódio**: mede-se EO em t₀, segue-se até o desfecho na janela. Vantagens: (i) define corretamente o denominador de P(ECO); (ii) força a precedência temporal por construção (leakage pré-outcome da seção 3); (iii) permite sobrevivência/análise de tempo até evento; (iv) episódios aninham naturalmente na hierarquia (episódios dentro de obras dentro de empresas). **Status: unidade candidata — não canonizar antes de testar utilidade** (seção 16); o Gate 3 inclui o teste de adequação da unidade.

## 4. Modelos candidatos (escada de complexidade)

| Nível | Modelo | Uso |
|-------|--------|-----|
| M0 | Tabela 2×2 (EO degradado sim/não × ECO sim/não) com odds ratio e IC | Primeira evidência descritiva; nunca prova preditiva |
| M1 | Regressão logística mista: ECO ~ EO + baselines + (1\|obra) + (1\|empresa) | Modelo de trabalho inicial; ICC estimado, não assumido |
| M2 | Survival (tempo até ECO dentro do episódio) com EO em t₀ como covariável | Aproveita a estrutura de janela do episódio |
| M3 | Hierárquico bayesiano com parâmetros por empresa (parametrização local) | Seção 23: mecanismo transportável ≠ métrica universal |
| M4 | Modelo flexível nos mesmos dados brutos (sem EO) | Baseline B6 — o teste decisivo de informação adicional |

Nenhum modelo é declarado preferido a priori; a escolha pertence ao Gate 3 com comparação formal (AIC/LOO-CV) e validação temporal (treino em períodos anteriores, teste no posterior).

## 5. Dimensionamento amostral — regras em vez de números

Em vez de N arbitrário, o projeto deve declarar antes da coleta: (i) a unidade primária (episódio); (ii) ICC esperado por nível (obra, empresa), com análise de sensibilidade 0–0.3; (iii) incidência base esperada de ECO por episódio (estimada de pilotagem ou da literatura de retrabalho em construção — ordem de grandeza a reportar com fonte); (iv) efeito mínimo relevante em odds ratio (ex.: OR ≥ 1.5 para EO degradado) justificado operacionalmente; (v) poder alvo (≥ 0.8) e nível de incerteza (IC 95%). O número de episódios resulta do cálculo; o número de obras e empresas resulta do desenho de clusters necessário para o ICC. Um projeto que chegue a "N = 274 episódios, 14 obras, 5 empresas" por cálculo é ciência; um que chegue a "20 obras" por arredondamento não é.

## 6. O que ainda falta

A incidência base de ECOs em episódios coordenacionais é desconhecida — nenhuma medição prospectiva desse tipo foi publicada pela TPC; um **estudo piloto de medição** (Gate 1/2) é pré-requisito para dimensionar qualquer estudo preditivo (Gate 4/5).
