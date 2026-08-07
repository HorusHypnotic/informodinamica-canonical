from .models import InteractionState


ALLOWED_TRANSITIONS: dict[InteractionState, set[InteractionState]] = {
    InteractionState.CONTATO: {InteractionState.DESCOBERTA, InteractionState.ENCERRAMENTO},
    InteractionState.DESCOBERTA: {InteractionState.QUALIFICACAO, InteractionState.DIAGNOSTICO, InteractionState.ENCERRAMENTO},
    InteractionState.QUALIFICACAO: {InteractionState.DIAGNOSTICO, InteractionState.ENCERRAMENTO},
    InteractionState.DIAGNOSTICO: {InteractionState.RECOMENDACAO, InteractionState.REVISAO, InteractionState.DESCOBERTA},
    InteractionState.RECOMENDACAO: {InteractionState.IMPLANTACAO, InteractionState.REVISAO, InteractionState.ENCERRAMENTO},
    InteractionState.IMPLANTACAO: {InteractionState.OPERACAO_ATIVA, InteractionState.SUPORTE, InteractionState.ENCERRAMENTO},
    InteractionState.OPERACAO_ATIVA: {InteractionState.SUPORTE, InteractionState.REVISAO, InteractionState.ENCERRAMENTO},
    InteractionState.SUPORTE: {InteractionState.OPERACAO_ATIVA, InteractionState.REVISAO, InteractionState.ENCERRAMENTO},
    InteractionState.REVISAO: {InteractionState.DIAGNOSTICO, InteractionState.RECOMENDACAO, InteractionState.OPERACAO_ATIVA, InteractionState.ENCERRAMENTO},
    InteractionState.ENCERRAMENTO: set(),
}


def validate_transition(previous: InteractionState, current: InteractionState) -> None:
    if current not in ALLOWED_TRANSITIONS[previous]:
        raise ValueError("Transição de sessão não permitida.")
