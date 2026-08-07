---
name: OPERA_CORE constitution
description: Constitutional document at .lovable/OPERA_CORE.md — invariants, trust model, temporal model, causality, sovereignty. Check before any architectural change.
type: constraint
---

# OPERA_CORE — leitura obrigatória antes de mudanças arquiteturais

Arquivo: `.lovable/OPERA_CORE.md` (v1.0).

É a **constituição operacional** do sistema. Não descreve o que faz; descreve o que **não pode ser violado**.

## 10 invariantes absolutas (resumo)

1. **I1 Fronteira de Tenant** — nada atravessa tenant sem `is_super_admin` server-side.
2. **I2 Autoridade Server-Side** — cliente nunca é fonte; sempre RLS/RPC/Edge.
3. **I3 Append-Only** — eventos históricos não mutam; correção via evento compensatório.
4. **I4 Irreversibilidade Temporal** — após `periodos_fechados`, escrita só via reabertura formal.
5. **I5 Lineage de Evidência** — toda foto/anexo carrega tenant_id, obra_id, autor, momento, origem.
6. **I6 Permissão Contextual** — `(user, role, tenant_id, obra_id, momento)`, nunca só `(user, role)`.
7. **I7 Reprodutibilidade** — estado consolidado deve ser reconstruível dos eventos primários.
8. **I8 Falha Segura** — em dúvida, negar e logar. Nunca degradar para permissivo.
9. **I9 Determinismo Financeiro** — mesmo input → mesmo output. Sem `now()`/random no cálculo final.
10. **I10 Estado de Certeza** — sempre rotular `prevista`/`confirmada`/`consolidada`/`fechada`.

## Modelo de confiança (regra de ouro)
Se a checagem pode ser feita no banco, é feita no banco. RLS é primeira linha. Código é segunda. UI é cosmética.
**Nunca confiar em** `tenant_id` ou `role` vindos do cliente — sempre derivar via `get_user_tenant_id(auth.uid())` / `has_role(...)`.

## Limites — Opera NÃO é
ERP genérico, BI genérico, rede social, app de tarefas, CRM, automação sem causalidade, CRUD administrativo sem invariante.

## Antes de qualquer feature/migration, perguntar
1. Viola alguma invariante? 2. Quebra fronteira de tenant? 3. Cria consolidado sem evento primário? 4. Mistura estados temporais? 5. Confia no cliente para autorização? 6. Está fora dos limites? 7. Aumenta lock-in?

## Quando atualizar
- Nova invariante codificada → adicionar em §2 do OPERA_CORE.md e bumpar versão.
- Mudança de soberania (nova camada controlada/desacoplada) → atualizar §8.
- Remoção/enfraquecimento de invariante → exige justificativa explícita no histórico.
