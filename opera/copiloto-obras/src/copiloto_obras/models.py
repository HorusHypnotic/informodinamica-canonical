from datetime import date, datetime, timezone
from enum import StrEnum
from typing import Literal
from uuid import uuid4
from pydantic import BaseModel, ConfigDict, Field, model_validator

class StrictModel(BaseModel): model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
class CompositionResult(StrEnum): VALIDA="VALIDA"; VALIDA_COM_RESSALVAS="VALIDA_COM_RESSALVAS"; INVALIDA="INVALIDA"; INCOMPLETA="INCOMPLETA"
class InteractionState(StrEnum): CONTATO="CONTATO"; DESCOBERTA="DESCOBERTA"; QUALIFICACAO="QUALIFICACAO"; DIAGNOSTICO="DIAGNOSTICO"; RECOMENDACAO="RECOMENDACAO"; IMPLANTACAO="IMPLANTACAO"; OPERACAO_ATIVA="OPERACAO_ATIVA"; SUPORTE="SUPORTE"; REVISAO="REVISAO"; ENCERRAMENTO="ENCERRAMENTO"
class Permission(StrEnum):
 VIEW_PRODUCTION="VIEW_PRODUCTION"; VIEW_MATERIALS="VIEW_MATERIALS"; VIEW_OPERATIONAL_COSTS="VIEW_OPERATIONAL_COSTS"; VIEW_CONSOLIDATED_COSTS="VIEW_CONSOLIDATED_COSTS"; VIEW_CONTRACT="VIEW_CONTRACT"; REGISTER_OPERATIONAL_REPORT="REGISTER_OPERATIONAL_REPORT"; REGISTER_SAFETY_EVENT="REGISTER_SAFETY_EVENT"; REGISTER_HUMAN_TECHNICAL_DECISION="REGISTER_HUMAN_TECHNICAL_DECISION"; REQUEST_TECHNICAL_DECISION="REQUEST_TECHNICAL_DECISION"; REQUEST_COMMERCIAL_DECISION="REQUEST_COMMERCIAL_DECISION"; REQUEST_PRICE="REQUEST_PRICE"; REQUEST_DISCOUNT="REQUEST_DISCOUNT"; REQUEST_CONTRACT_CHANGE="REQUEST_CONTRACT_CHANGE"; ACCESS_OTHER_WORKSITE="ACCESS_OTHER_WORKSITE"
class Role(StrEnum): GESTORA="GESTORA"; ENCARREGADO="ENCARREGADO"; ENGENHEIRA_RESPONSAVEL="ENGENHEIRA_RESPONSAVEL"; SEGURANCA="SEGURANCA"
class InformationType(StrEnum): FATO="FATO"; RELATO="RELATO"; EVIDENCIA="EVIDENCIA"; INFERENCIA="INFERENCIA"; HIPOTESE="HIPOTESE"; LACUNA="LACUNA"; CONTRADICAO="CONTRADICAO"
class Confidence(StrEnum): BAIXA="BAIXA"; MEDIA="MEDIA"; ALTA="ALTA"; NAO_APLICAVEL="NAO_APLICAVEL"
class RecommendationStatus(StrEnum): ATIVA="ATIVA"; PENDENTE_DE_VALIDACAO="PENDENTE_DE_VALIDACAO"; SUSPENSA="SUSPENSA"; SUBSTITUIDA="SUBSTITUIDA"; CANCELADA="CANCELADA"
class HandoffCategory(StrEnum): TECNICO="TECNICO"; SEGURANCA="SEGURANCA"; COMERCIAL="COMERCIAL"; CONTRATUAL="CONTRATUAL"; EMERGENCIA="EMERGENCIA"; MEDICO="MEDICO"; PRIVACIDADE="PRIVACIDADE"
class Capability(StrEnum): DRY_RUN="DRY_RUN"; LOAD_COMPOSITION="LOAD_COMPOSITION"; VALIDATE_CONTEXT="VALIDATE_CONTEXT"; VALIDATE_AUTHORIZATION="VALIDATE_AUTHORIZATION"; VALIDATE_RESPONSE="VALIDATE_RESPONSE"; CREATE_LOCAL_SESSION="CREATE_LOCAL_SESSION"; CALCULATE_HASHES="CALCULATE_HASHES"; OPENAI_API_CALL="OPENAI_API_CALL"; WHATSAPP="WHATSAPP"; SUPABASE="SUPABASE"; ATLAS="ATLAS"; CONTROL="CONTROL"; BACKGROUND_AUTOMATION="BACKGROUND_AUTOMATION"; SCHEDULED_NOTIFICATION="SCHEDULED_NOTIFICATION"; REAL_DATA_ACCESS="REAL_DATA_ACCESS"
class ResponseIntent(StrEnum): ACCESS_GRANTED="ACCESS_GRANTED"; ACCESS_DENIED="ACCESS_DENIED"; INFORMATION_AVAILABLE="INFORMATION_AVAILABLE"; INFORMATION_INCOMPLETE="INFORMATION_INCOMPLETE"; CLARIFICATION_REQUIRED="CLARIFICATION_REQUIRED"; RECOMMENDATION_ACTIVE="RECOMMENDATION_ACTIVE"; RECOMMENDATION_PENDING="RECOMMENDATION_PENDING"; RECOMMENDATION_SUSPENDED="RECOMMENDATION_SUSPENDED"; HANDOFF="HANDOFF"; CAPABILITY_UNAVAILABLE="CAPABILITY_UNAVAILABLE"; CONTRADICTION_DETECTED="CONTRADICTION_DETECTED"
class ModuleRecord(StrictModel): path:str; sha256:str; required:bool=True; loaded:bool=True; snapshot_bytes:bytes=Field(default=b"",exclude=True,repr=False)
class CompositionManifest(StrictModel): composition_id:str="copiloto_obras.v0.1"; result:CompositionResult; modules:list[ModuleRecord]; missing_modules:list[str]=Field(default_factory=list); effective_order:list[str]=Field(default_factory=list); manifest_sha256:str|None=None
class AuthorizedPeriod(StrictModel):
 start:date; end:date
 @model_validator(mode="after")
 def valid(self):
  if self.end < self.start: raise ValueError("Período autorizado inválido.")
  return self
class Interlocutor(StrictModel):
 id:str=Field(min_length=1); name:str=Field(min_length=1); role:Role; permissions:set[Permission]=Field(min_length=1)
class AuthorizedContext(StrictModel):
 fictional:Literal[True]; company_id:str=Field(min_length=1,max_length=120); company_name:str=Field(min_length=1,max_length=240); worksite_id:str=Field(min_length=1,max_length=120); worksite_name:str=Field(min_length=1,max_length=240); authorized_period:AuthorizedPeriod; interlocutors:list[Interlocutor]=Field(min_length=1,max_length=100); unavailable_capabilities:set[Capability]
class SessionStateTransition(StrictModel): previous:InteractionState; current:InteractionState
class InformationItem(StrictModel):
 id:str=Field(min_length=1,max_length=120); company_id:str=Field(min_length=1,max_length=120); worksite_id:str=Field(min_length=1,max_length=120); period:AuthorizedPeriod; type:InformationType; content:str=Field(min_length=1,max_length=4000); source_type:str=Field(min_length=1,max_length=120); source_reference:str=Field(min_length=1,max_length=240); confidence:Confidence; supporting_information_ids:list[str]=Field(default_factory=list,max_length=20)
 @model_validator(mode="after")
 def source_rules(self):
  if self.type is InformationType.FATO and self.source_type == "RELATO_VERBAL": raise ValueError("Relato verbal não é fato.")
  if self.type is InformationType.INFERENCIA and not self.supporting_information_ids: raise ValueError("Inferência exige origem.")
  if self.type is InformationType.CONTRADICAO and len(self.supporting_information_ids)<2: raise ValueError("Contradição exige duas referências.")
  return self
class Contradiction(StrictModel): id:str=Field(min_length=1,max_length=120); company_id:str=Field(min_length=1,max_length=120); worksite_id:str=Field(min_length=1,max_length=120); period:AuthorizedPeriod; information_ids:list[str]=Field(min_length=2,max_length=20); reason:str=Field(min_length=1,max_length=2000)
class Recommendation(StrictModel):
 recommendation_id:str=Field(min_length=1,max_length=120); company_id:str=Field(min_length=1,max_length=120); worksite_id:str=Field(min_length=1,max_length=120); period:AuthorizedPeriod; content:str=Field(min_length=1,max_length=2000); status:RecommendationStatus; scope:str=Field(min_length=1,max_length=240); created_from_information_ids:list[str]=Field(min_length=1,max_length=20); created_by:str=Field(min_length=1,max_length=120); created_at:datetime; requires_human_validation:bool; supersedes_id:str|None=Field(default=None,max_length=120)
 @property
 def id(self): return self.recommendation_id
 @model_validator(mode="after")
 def unique_supporting_information(self):
  if len(set(self.created_from_information_ids)) != len(self.created_from_information_ids): raise ValueError("Referência de suporte duplicada.")
  return self
class Handoff(StrictModel): category:HandoffCategory; reason:str=Field(min_length=1,max_length=2000); required:Literal[True]=True
class AccessDecision(StrictModel): allowed:bool; reason:str|None=None
class HumanDecision(StrictModel): decision_id:str; human_actor_id:str; role:Role; scope:str; worksite_id:str; timestamp:datetime; content:str
class RecommendationReactivation(StrictModel): event_id:str=Field(min_length=1); recommendation_id:str=Field(min_length=1); human_actor_id:str=Field(min_length=1); role:Role; company_id:str=Field(min_length=1); worksite_id:str=Field(min_length=1); period:AuthorizedPeriod; timestamp:datetime; origin:Literal["HUMAN"]="HUMAN"
class ResponsePlan(StrictModel):
 intent:ResponseIntent; approved_information_ids:list[str]=Field(default_factory=list,max_length=20); approved_recommendation_ids:list[str]=Field(default_factory=list,max_length=10); acknowledgement:bool=False; clarification_questions:list[str]=Field(default_factory=list,max_length=5); limitations:list[str]=Field(default_factory=list,max_length=5); next_safe_action:str|None=Field(default=None,max_length=240); handoff_message:str|None=Field(default=None,max_length=240)
 @model_validator(mode="after")
 def unique_approved_ids(self):
  if len(set(self.approved_information_ids)) != len(self.approved_information_ids): raise ValueError("ID de informação aprovado em duplicidade.")
  if len(set(self.approved_recommendation_ids)) != len(self.approved_recommendation_ids): raise ValueError("ID de recomendação aprovado em duplicidade.")
  return self
class SessionState(StrictModel):
 session_id:str=Field(default_factory=lambda:str(uuid4())); created_at:datetime=Field(default_factory=lambda:datetime.now(timezone.utc)); composition_id:str; composition_result:CompositionResult; composition_manifest_sha256:str|None=None; company_id:str; worksite_id:str; authorized_period:AuthorizedPeriod; current_interlocutor:Interlocutor|None=None; authorized_roles:set[Role]=Field(default_factory=set); effective_permissions:set[Permission]=Field(default_factory=set); pending_action:Permission|None=None; pending_authorization:bool=False; current_state:InteractionState=InteractionState.CONTATO; open_contradictions:list[Contradiction]=Field(default_factory=list); active_recommendations:list[Recommendation]=Field(default_factory=list); suspended_recommendations:list[Recommendation]=Field(default_factory=list); cancelled_recommendations:list[Recommendation]=Field(default_factory=list); replaced_recommendations:list[Recommendation]=Field(default_factory=list); recommendation_reactivations:list[RecommendationReactivation]=Field(default_factory=list); consumed_reactivation_event_ids:set[str]=Field(default_factory=set); pending_handoffs:list[Handoff]=Field(default_factory=list); human_decisions:list[HumanDecision]=Field(default_factory=list); denied_access_requests:list[str]=Field(default_factory=list); unavailable_capabilities:set[Capability]=Field(default_factory=set); evidence_records:list[InformationItem]=Field(default_factory=list); message_history:list[dict[str,str]]=Field(default_factory=list); interlocutor_history:list[str]=Field(default_factory=list)
class AgentResponse(StrictModel): composition_result:CompositionResult; session_state:SessionStateTransition; interlocutor_id:str; information:list[InformationItem]=Field(max_length=50); evidence_gaps:list[str]=Field(max_length=20); contradictions:list[Contradiction]=Field(max_length=20); recommendations:list[Recommendation]=Field(max_length=20); handoff:Handoff|None; unavailable_capabilities:set[Capability]; response_plan:ResponsePlan
