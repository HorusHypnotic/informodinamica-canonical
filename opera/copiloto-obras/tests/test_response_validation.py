import pytest
from pydantic import ValidationError
from copiloto_obras.models import ResponsePlan,ResponseIntent
def test_plan_valid(): assert ResponsePlan(intent=ResponseIntent.ACCESS_DENIED)
def test_plan_extra_rejected():
 with pytest.raises(ValidationError): ResponsePlan(intent='ACCESS_DENIED',free_text='x')
def test_plan_duplicate_information_id_rejected():
 with pytest.raises(ValidationError, match='duplicidade'): ResponsePlan(intent='INFORMATION_AVAILABLE',approved_information_ids=['i1','i1'])
@pytest.mark.parametrize('intent,ids',[('ACCESS_DENIED',['i1']),('RECOMMENDATION_PENDING',['r1']),('INFORMATION_AVAILABLE',['missing'])])
def test_plan_is_structured(intent,ids):
 p=ResponsePlan(intent=intent,approved_information_ids=ids if intent!='RECOMMENDATION_PENDING' else [],approved_recommendation_ids=ids if intent=='RECOMMENDATION_PENDING' else [])
 assert p.intent.value==intent
