# Diário de Campo 01 – Canteiro de Obras (Fase 3)

**Data:** 2026-08-06  
**Grau de observação:** O2 (Reconstrução logo após o evento)  
**Contexto:** Observação de rotina em canteiro de obras de médio porte (Fase de superestrutura).  

## 1. O Que Aconteceu?
Durante a concretagem da laje do 3º pavilhão, o mestre de obras percebeu que a posição dos conduítes elétricos previstos no projeto estrutural/elétrico revisado (Rev. 03) divergia da armação de aço já posicionada em campo pela equipe de armadores.

## 2. Quem Participou?
- O mestre de obras (Carlos).
- O encarregado de elétrica (João).
- O engenheiro residente (via telefone/WhatsApp).

## 3. Que Representação Estava Sendo Usada?
- Projeto estrutural digital (BIM Viewer no tablet do mestre de obras) vs. Projeto elétrico impresso em papel (Versão Rev. 02, antiga).

## 4. Onde Apareceu a Primeira Divergência?
- Na interface entre o projeto estrutural (atualizado) e o projeto elétrico (desatualizado impresso em papel), gerando colisão física no posicionamento das caixas de passagem.

## 5. Como Foi Percebida?
- Percebida visualmente pelo encarregado de elétrica ao tentar encaixar a tubulação na malha de aço, gerando um impasse operacional em campo.

## 6. Como Foi Corrigida?
- O mestre de obras fotografou o local, enviou pelo WhatsApp para o escritório de projetos, que emitiu uma orientação verbal imediata de desvio temporário, seguida por RFI formalizada posteriormente.

## Hipóteses Concorrentes

### Hipótese TPC
- **Descrição:** O incidente decorre de um desalinhamento informodinâmico entre as representações persistentes (BIM Rev. 03 vs. Papel Rev. 02), ampliado por latências de transmissão ($T_1 - T_0$) na distribuição de versões em campo.
- **Predição:** A introdução de um canal síncrono de calibração de versões reduziria a latência de detecção ($T_2 - T_0$) e eliminaria a entropia de interface.

### Hipótese Gestão Tradicional
- **Descrição:** O problema é falha de comunicação humana e falta de atenção do mestre de obras ao não verificar a revisão impressa.
- **Predição:** Treinamento de pessoal e memorandos impressos resolveriam o problema.

### Hipótese BIM
- **Descrição:** O erro ocorreu porque parte da equipe ainda usava papel em vez de 100% de dispositivos móveis sincronizados.
- **Predição:** A eliminação total do papel e adoção exclusiva de tablets em campo impediria a divergência.

### Hipótese Lean
- **Descrição:** Falha no fluxo puxado de informações (last planner system) e falta de checagem prévia (constraint analysis) antes da execução.
- **Predição:** Implementação de reuniões de planejamento de curto prazo (PPC) com checagem de restrições de projeto evitaria o conflito.

---

## Ficha de Unidade Observacional

- **ID:** OBS-0001
- **Domínio:** Construção Civil
- **Tipo de observação:** O2
- **Fenômeno observado:** Conflito de versão entre projeto estrutural digital e projeto elétrico em papel durante concretagem.
- **Representações envolvidas:** BIM Viewer (Rev. 03) vs. Projeto Elétrico impresso (Rev. 02).
- **Agentes envolvidos:** Mestre de obras, encarregado de elétrica, engenheiro residente.
- **Canais:** Papel impresso, tablet, aplicativo de mensagens instantâneas (WhatsApp).
- **Hipóteses concorrentes:** TPC, Gestão Tradicional, BIM, Lean.
- **Resultado observado:** Orientação verbal de desvio em campo e emissão posterior de RFI.
- **Contradições encontradas:** A coexistência de suportes (papel e digital) gera janelas de assimetria que o BIM puro ou o papel puro isoladamente mascaram.
- **Questões em aberto:** Como medir quantitativamente o impacto da latência $T_1 - T_0$ na produtividade diária das equipes?
