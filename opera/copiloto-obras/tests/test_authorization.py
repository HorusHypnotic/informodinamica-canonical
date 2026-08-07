from datetime import date
import pytest
from copiloto_obras.authorization import authorize_access
from copiloto_obras.models import Permission

@pytest.mark.parametrize('actor,action,expected',[('mariana-lopes',Permission.VIEW_CONSOLIDATED_COSTS,True),('carlos-silva',Permission.VIEW_MATERIALS,True),('carlos-silva',Permission.VIEW_CONSOLIDATED_COSTS,False),('carlos-silva',Permission.VIEW_CONTRACT,False),('unknown',Permission.VIEW_PRODUCTION,False)])
def test_actions(context,actor,action,expected): assert authorize_access(context,actor,'gh-01',date(2026,8,4),action)[0] is expected
@pytest.mark.parametrize('worksite,day',[('other',date(2026,8,4)),('gh-01',date(2026,9,1))])
def test_scope_denied(context,worksite,day): assert not authorize_access(context,'mariana-lopes',worksite,day,Permission.VIEW_PRODUCTION)[0]
