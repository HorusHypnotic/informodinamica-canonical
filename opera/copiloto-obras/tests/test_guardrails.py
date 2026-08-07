from pathlib import Path
from copiloto_obras.models import AuthorizedContext, CompositionResult
from copiloto_obras.composition import find_repository_root, load_composition

EXPECTED_TRANSITIONS = {
    "CONTATO": {"DESCOBERTA", "ENCERRAMENTO"},
    "DESCOBERTA": {"QUALIFICACAO", "DIAGNOSTICO", "ENCERRAMENTO"},
    "DIAGNOSTICO": {"RECOMENDACAO", "REVISAO", "DESCOBERTA"},
}

def test_context_uses_strict_response_plan_contract():
    context = AuthorizedContext.model_validate_json((Path(__file__).parents[1] / "fixtures/contexts/gh01.json").read_text())
    assert context.fictional is True
    assert all(actor.permissions for actor in context.interlocutors)

def test_composition_remains_valid():
    assert load_composition(find_repository_root(Path(__file__))).result is CompositionResult.VALIDA

def test_expected_transitions_are_independent_of_production_constant():
    assert "DIAGNOSTICO" in EXPECTED_TRANSITIONS
