# Matriz de Invariantes Coordenativos

**Status:** Em construção

Esta matriz compara os invariantes da TPC identificados em diferentes domínios experimentais (EXP-001, EXP-002...). O objetivo é verificar se os mesmos mecanismos estruturais emergem em sistemas que não compartilham origem ou propósito.

| Invariante da TPC | EXP-001 (CI/CD) | EXP-002 (Hospital) | EXP-003 (Obra) |
| :--- | :--- | :--- | :--- |
| **Espaço de Estados** | Código-fonte + Branch | Paciente + Leito | Planta + Estágio |
| **Diferencial (Diff)** | `git diff` | Mudança na prescrição | Avanço físico |
| **Registro de Intenções** | Mensagem de commit | Anotação de enfermagem | Ata de reunião |
| **Canal de Recalibração** | CI/CD + Testes | Passagem de plantão | Vistoria técnica |
| **Latência de Detecção típica** | Segundos a horas | Minutos a horas | Dias a semanas |

*(A ser expandido com os dados dos experimentos.)*
