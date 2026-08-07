import pytest
from pydantic import ValidationError
from copiloto_obras.models import AuthorizedContext

def test_fixture(context): assert context.fictional
@pytest.mark.parametrize('change',[{'extra':1},{'fictional':False},{'worksite_id':''},{'authorized_period':{'start':'2026-09-01','end':'2026-08-01'}},{'interlocutors':[]}])
def test_invalid_context(context,change):
    d=context.model_dump(mode='json'); d.update(change)
    with pytest.raises(ValidationError): AuthorizedContext.model_validate(d)
