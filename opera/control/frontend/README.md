# OPERA Control — frontend preservado

**Estado documental:** `HISTORICAL`  
**Compatibilidade teórica:** `Experimental`, não normativa  
**Projeto Lovable:** `f07282fa-cd06-4234-a1b5-7d8965300c60`  
**Commit interno de origem:** `66b55bed00156fc28bdc582c8f3a6073768bd09f`  
**URL pública observada:** https://teoriadegradaooperacional.lovable.app

Este diretório preserva o codebase exportado do OPERA Control em 1º de agosto de 2026. Ele registra o estado funcional do produto, mas não constitui fonte normativa da Informodinâmica Aplicada, da TPC ou da TDO.

## Alerta de compatibilidade

O snapshot implementa versões históricas ou experimentais de ECO (MET-001), ICO (MET-002) e Capital Preservado (MET-004). Entre as divergências conhecidas:

- Recorrência e Persistência são armazenadas como notas de 1 a 5.
- O ICO é classificado em seis faixas entre 1 e 125.
- Capital Preservado é agregado como soma de EPI aprovado.

Essas regras não devem ser tratadas como definições canônicas. Consulte `GLOSSARIO_CANONICO.md`, `02-aplicacoes/TDO.md`, `MANUAL_ECO.md` e `opera/control/AUTHORITY.md` antes de alterar cálculos, banco de dados ou textos do produto.

## Execução local

```bash
npm ci
npm run dev
```

Validações disponíveis:

```bash
npm run lint
npm run build
```

O projeto exportado não possui script automatizado de testes.

## Configuração

Copie `.env.example` para `.env` e preencha os valores somente no ambiente local. Variáveis server-side, especialmente `SUPABASE_SERVICE_ROLE_KEY` e `STRIPE_SECRET_KEY`, nunca devem ser expostas ao navegador ou commitadas.

## Limites da preservação

- O snapshot não contém histórico Git interno do Lovable.
- A exportação não estabelece sincronização com Lovable ou GitHub.
- O slug público antigo foi preservado; nenhuma republicação foi executada.
- A futura adequação às definições canônicas exige proposta e revisão próprias, sem reescrever silenciosamente este registro histórico.
