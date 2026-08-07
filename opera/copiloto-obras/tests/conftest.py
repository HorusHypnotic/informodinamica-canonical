from pathlib import Path
import pytest
from copiloto_obras.models import AuthorizedContext

@pytest.fixture
def context():
    return AuthorizedContext.model_validate_json((Path(__file__).parents[1] / 'fixtures/contexts/gh01.json').read_text())
