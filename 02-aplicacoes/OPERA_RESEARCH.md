# OPERA Research — Módulo de Pesquisa de Campo

**Data:** 26 de julho de 2026
**Autor:** Eduardo Martins
**Contexto:** Análise sistêmica do módulo de pesquisa do ecossistema OPERA, gerada no projeto Lovable.

---

## 1. Conceito e Proposta de Valor

**Problema.** Pesquisa operacional em construção vive dispersa em planilhas, PDFs, WhatsApp e cadernos de obra. Sem rastreabilidade de autor, timestamp, protocolo e consentimento, não há reprodutibilidade — exatamente o que a TDO/TPC precisa para deixar de ser conceito e virar ciência aplicada.

**Como funciona.** O módulo promove a obra a entidade persistente e versionada. Cada obra tem dono, grupo, status e histórico; ao redor dela orbitam consentimentos, indicadores, ECOs e relatórios, todos vinculados ao mesmo `obra_id` e à mesma governança de auth/RLS do OPERA.

**Valor.** Rastreabilidade, auditabilidade, reprodutibilidade e abstração da complexidade técnica — o pesquisador lida com obras e eventos, não com Git ou versionamento.

---

## 2. Direção Estratégica

É o braço científico do Canteiro de Obras Digital. Enquanto Copiloto/Atlas/Control operam o dia a dia, o Research captura e valida empiricamente o método que os sustenta.

**Posicionamento:** LIMS especializado em pesquisa operacional.

- O **Piloto** consome os produtos OPERA.
- O **Controle** produz a linha de base.
- O efeito é um loop: quem opera na plataforma também gera o corpus que valida a plataforma — o OPERA deixa de ser ferramenta e vira **plataforma científica proprietária**.

---

## 3. Objetivos e Indicadores

### Operacionais

- 10 obras instrumentadas (5+5) até 03/08/2026.
- Aderência ≥ 80%.
- Desistência ≤ 20%.

### Científicos

- ICO semanal.
- ECOs categorizados (Perda/Atraso/Substituição/Ambiguidade/Fragmentação).
- IFX e Capital Preservado no encerramento.
- Diferença estatisticamente significativa entre grupos.

### Estratégicos

- Validação empírica da TPC/TDO como ativo intelectual defensável.
- Estudos de caso publicáveis.
- Base para pricing por ICO evitado.

---

## 4. Processo Operacional

```text
Cadastro → Grupo → Protocolo → Instrumentação →
Coleta → ECOs → Dashboards → Relatórios → Encerramento
```

**Hoje:** `obras_pesquisa` + CRUD em `/pesquisa` + RLS por dono + header condicional.

**Próximas camadas:** `consentimentos`, `coletas`, `ecos`, `intervencoes`, `relatorios`.

---

## 5. Critérios de Decisão e Controle

- Isolamento por `dono_id` via RLS; admin via `has_role`.
- Grupo imutável após aceite do protocolo (preserva integridade estatística).
- Status controlado; desistência não apaga — registra mortalidade amostral.
- LGPD, consentimento versionado, publicações usam agregados anonimizados.
- Roadmap: só entra o que serve ao pipeline. Feature sem lugar no fluxo é rejeitada.

---

## 6. Integrações

| Módulo OPERA | Integração com Research |
|--------------|------------------------|
| **Auth** | Compartilhada (Supabase + `requireSupabaseAuth` + `has_role`) |
| **Inscrições** | Promoção lead → participante, ponte marketing/ciência |
| **Atlas** | Consome `coletas`/`ecos` para dashboards |
| **Copiloto** | Grava `intervencoes` |
| **Control** | Alimenta checklists (Piloto in-app, Controle externo) |
| **Storage** | Ancora evidências ao `obra_id` |

---

## 7. Escala, Automação, Monetização

- **Escala:** multi-programa (basta `programa_id`) e multi-instituição (white-label científico para universidades/institutos).
- **Automação:** coleta assistida pelo Copiloto, detecção automática de ECOs via sinais de Atlas/Control, relatórios versionados por data de corte.
- **Monetização:** SaaS por obra ativa (consultorias/construtoras), licenciamento institucional, estudos como topo de funil para os produtos operacionais e, no médio prazo, pricing baseado em ICO evitado — modelo que só se sustenta porque o próprio Research produz a evidência.

---

## Síntese

> O OPERA Research converte processo em estrutura: uma pesquisa que aconteceria de qualquer forma vira ativo versionado, auditável e reutilizável. É o que faz o ecossistema deixar de ser um conjunto de ferramentas e virar **plataforma científica com método proprietário validado por dado próprio**.

---

**Versão:** 0.1
**Data:** 26/07/2026
**Autor:** Eduardo Martins
