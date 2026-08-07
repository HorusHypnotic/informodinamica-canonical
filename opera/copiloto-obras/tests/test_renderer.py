import pytest
from copiloto_obras.models import AccessDecision, Capability, InformationItem, Recommendation, RecommendationStatus
from copiloto_obras.renderer import render

def info(): return InformationItem(id='i1',company_id='construtora-horizonte',type='RELATO',content='CUSTO_SIGILOSO_X9 R$ 987.654,32',source_type='RELATO_VERBAL',source_reference='carlos',confidence='BAIXA',worksite_id='gh-01',period={'start':'2026-08-01','end':'2026-08-31'})
def test_denied_has_no_leak(context):
 from copiloto_obras.session import create_session
 from copiloto_obras.models import CompositionManifest,CompositionResult
 s=create_session(context,CompositionManifest(result=CompositionResult.VALIDA,modules=[]))
 out=render(s,AccessDecision(allowed=False,reason='negado'),{'i1':info()},{},['i1'],[])
 assert 'CUSTO_SIGILOSO_X9' not in out and '987.654' not in out
def test_only_approved_is_shown(context):
 from copiloto_obras.session import create_session
 from copiloto_obras.models import CompositionManifest,CompositionResult
 s=create_session(context,CompositionManifest(result=CompositionResult.VALIDA,modules=[])); out=render(s,AccessDecision(allowed=True),{'i1':info()},{},['i1'],[])
 assert 'CUSTO_SIGILOSO_X9' in out
def recommendation(context, status):
 return Recommendation(recommendation_id='r',company_id=context.company_id,content='ordem',status=status,scope='obra',worksite_id='gh-01',period=context.authorized_period,created_from_information_ids=['i1'],created_by='modelo',created_at='2026-08-04T12:00:00Z',requires_human_validation=False)
@pytest.mark.parametrize('status',[RecommendationStatus.PENDENTE_DE_VALIDACAO,RecommendationStatus.SUSPENSA])
def test_inactive_recommendation_rejected(context,status):
 from copiloto_obras.session import create_session
 from copiloto_obras.models import CompositionManifest,CompositionResult
 s=create_session(context,CompositionManifest(result=CompositionResult.VALIDA,modules=[])); r=recommendation(context,status)
 with pytest.raises(ValueError): render(s,AccessDecision(allowed=True),{'i1':info()},{'r':r},[],['r'])
def test_other_worksite_rejected(context):
 from copiloto_obras.session import create_session
 from copiloto_obras.models import CompositionManifest,CompositionResult
 s=create_session(context,CompositionManifest(result=CompositionResult.VALIDA,modules=[])); bad=info().model_copy(update={'worksite_id':'other'})
 with pytest.raises(ValueError): render(s,AccessDecision(allowed=True),{'i1':bad},{},['i1'],[])
