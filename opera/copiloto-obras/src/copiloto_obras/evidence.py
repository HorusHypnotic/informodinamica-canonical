from enum import StrEnum


class InformationType(StrEnum):
    FATO = "FATO"
    RELATO = "RELATO"
    EVIDENCIA = "EVIDENCIA"
    REGISTRO = "REGISTRO"
    INFERENCIA = "INFERENCIA"
    HIPOTESE = "HIPOTESE"
    AUSENCIA_DE_DADOS = "AUSENCIA_DE_DADOS"
    CONTRADICAO = "CONTRADICAO"


def evidence_record(kind: InformationType, content: str, source: str, confidence: str = "NAO_CLASSIFICAVEL") -> dict[str, str]:
    return {"type": kind.value, "content": content, "source": source, "confidence": confidence}
