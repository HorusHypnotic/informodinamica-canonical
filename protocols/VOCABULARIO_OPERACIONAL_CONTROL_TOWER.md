# Vocabulário Operacional — Control Tower / PETECO

**Data:** 2026-09-27  
**Status:** CANDIDATE para canonização via PR  
**Escopo:** comandos curtos usados entre operador, Torre e PETECO.

## Comandos

| Expressão | Significado operacional | Regra |
|---|---|---|
| `Pau na máquina` | Executar ou continuar imediatamente a próxima ação segura da esteira real. | Não significa explicar plano. Avançar até PASS, FAIL real ou bloqueio comprovado, preservando evidência fresca. |
| `#rebobine` | Recuperar regras, estado, decisões e evidências canônicas antes de agir. | Não inventar caminho novo quando o caminho canônico já existe. |
| `att` | **Atualização / status.** | No contexto operacional da Torre/PETECO, nunca interpretar como “atenciosamente”. Responder em baixa abstração com estado fresco, mudança, bloqueio e próxima ação. |

## Travas que continuam valendo

1. `START != PASS`. Processo iniciado não prova funcionamento.
2. PASS exige evidência fresca e verificável; histórico não substitui prova atual.
3. Estados operacionais: `UNKNOWN`, `START`, `PASS`, `FAIL`, `BLOCKED` e, quando aplicável, `CANDIDATE`.
4. GitHub/registro versionado é a fonte de verdade; memória de agente não é registro canônico.
5. PETECO é executor/prova no trilho autorizado; comando curto do operador não remove gates.
6. `Pau na máquina` não autoriza custo, crédito Lovable, segredo exposto, mutação indevida de produção, merge ou publicação fora dos gates existentes.
7. Lovable AI/créditos: hard gate de custo zero para tarefas cobertas por GitHub/código/PETECO.
8. Produção não é laboratório. Preview, deploy, commit ou código presente não equivalem a PASS funcional.
9. Supabase da Vitrine permanece o projeto canônico `lyuzmfqfigvcajvetapq`; nunca substituir por `opera-infrastructure`.
10. Falha repetida sem delta não deve virar loop cego: preservar log/evidência, diagnosticar e mudar a próxima ação.
11. Comunicação de status deve privilegiar baixa abstração: o que estava quebrado, o que mudou, estado atual e próximo parafuso.

## Semântica curta

```text
att             -> me atualize
#rebobine       -> recupere o cânone antes de agir
Pau na máquina  -> execute pelo trilho canônico
START           -> começou
PASS            -> provado agora
FAIL            -> falhou com evidência
BLOCKED         -> impedimento comprovado
UNKNOWN         -> ainda sem prova
```

## Regra de precedência

Decisão canônica mais recente e específica prevalece sobre checkpoint antigo ou memória resumida. Em conflito, parar a promoção para PASS e recuperar a fonte versionada.
