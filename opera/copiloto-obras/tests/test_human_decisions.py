from datetime import datetime,timezone
import pytest
from copiloto_obras.human_decisions import record_human_decision
from copiloto_obras.models import CompositionManifest,CompositionResult,HumanDecision
from copiloto_obras.session import create_session,switch_interlocutor
def decision(): return HumanDecision(decision_id='d1',human_actor_id='renata-alves',role='ENGENHEIRA_RESPONSAVEL',scope='reboco',worksite_id='gh-01',timestamp=datetime(2026,8,4,tzinfo=timezone.utc),content='Decisão humana.')
def test_valid_human_decision(context):
 s=switch_interlocutor(create_session(context,CompositionManifest(result=CompositionResult.VALIDA,modules=[])),context,'renata-alves'); assert len(record_human_decision(s,context,decision()).human_decisions)==1
@pytest.mark.parametrize('change',[{'human_actor_id':'carlos-silva'},{'worksite_id':'other'},{'role':'SEGURANCA'}])
def test_adv_013_rejects_forged_decision(context,change):
 s=switch_interlocutor(create_session(context,CompositionManifest(result=CompositionResult.VALIDA,modules=[])),context,'renata-alves')
 with pytest.raises(ValueError): record_human_decision(s,context,decision().model_copy(update=change))
