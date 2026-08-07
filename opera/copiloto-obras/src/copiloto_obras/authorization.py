from datetime import date
from .models import AuthorizedContext, Interlocutor, Permission
def authorize_access(context:AuthorizedContext, interlocutor_id:str, worksite_id:str, period:date, action:Permission):
 if worksite_id != context.worksite_id: return False,"Acesso entre obras não é autorizado.",None
 if not context.authorized_period.start <= period <= context.authorized_period.end: return False,"Período fora da autorização.",None
 actor=next((x for x in context.interlocutors if x.id==interlocutor_id),None)
 if actor is None: return False,"Interlocutor não autorizado.",None
 if action not in actor.permissions: return False,"Ação não autorizada para este interlocutor.",actor
 return True,"Contexto e ação autorizados.",actor
