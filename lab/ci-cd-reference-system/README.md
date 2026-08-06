# Sistema de Referência para EXP-001

Esta pasta contém o código-fonte da API de calculadora que servirá como objeto de estudo para o EXP-001. Ela representa o estado *baseline* (calibrado) antes da injeção de falhas.

## Tecnologias
- Python 3.11 + FastAPI
- Pytest para testes unitários e de integração
- GitHub Actions para CI/CD

## Como executar localmente
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Estrutura
- `/app` — Código-fonte da aplicação
- `/tests` — Suítes de teste (cobertura conhecida)
- `/.github/workflows` — Pipeline de CI/CD
