import pytest
from copiloto_obras.session import create_session,switch_interlocutor
from copiloto_obras.models import CompositionManifest,CompositionResult,Permission
from copiloto_obras.authorization import authorize_access
def base(context): return create_session(context,CompositionManifest(result=CompositionResult.VALIDA,modules=[]))
def test_carlos_to_mariana(context):
 s=switch_interlocutor(base(context),context,'carlos-silva'); s=switch_interlocutor(s,context,'mariana-lopes')
 assert Permission.VIEW_CONSOLIDATED_COSTS in s.effective_permissions
def test_mariana_to_carlos_drops_cost(context):
 s=switch_interlocutor(base(context),context,'mariana-lopes'); s=switch_interlocutor(s,context,'carlos-silva')
 assert Permission.VIEW_CONSOLIDATED_COSTS not in s.effective_permissions
 assert not authorize_access(context,s.current_interlocutor.id,'gh-01',s.authorized_period.start,Permission.VIEW_CONSOLIDATED_COSTS)[0]
def test_invalid_switch_preserves_session(context):
 s=base(context)
 with pytest.raises(ValueError): switch_interlocutor(s,context,'unknown')
 assert s.current_interlocutor is None
