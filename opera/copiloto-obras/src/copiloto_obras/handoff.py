from .models import HandoffCategory
TERMS={HandoffCategory.EMERGENCIA:("acidente","emergência","ferido","queda","incêndio","choque","soterramento"),HandoffCategory.TECNICO:("fissura","viga","estrutural","responsabilidade técnica","concretar","laudo"),HandoffCategory.SEGURANCA:("risco físico","risco de queda","continuar atividade","continuidade"),HandoffCategory.MEDICO:("diagnóstico médico","lesão","médico"),HandoffCategory.COMERCIAL:("preço","desconto","proposta","condição comercial"),HandoffCategory.CONTRATUAL:("contrato","escopo contratual","prazo contratual")}
def required_handoff(text:str):
 text=text.lower()
 return next((category for category,terms in TERMS.items() if any(term in text for term in terms)),None)
