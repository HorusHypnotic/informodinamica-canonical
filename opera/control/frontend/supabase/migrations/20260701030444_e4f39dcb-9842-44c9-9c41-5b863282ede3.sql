
CREATE TABLE public.padroes_biblioteca (
  codigo TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  dominio dominio_enum NOT NULL,
  mecanismo mecanismo_enum NOT NULL,
  consequencia consequencia_enum NOT NULL,
  fenomeno_universal TEXT NOT NULL,
  sugestao_causa_categoria TEXT NOT NULL,
  sugestao_causa_nome TEXT NOT NULL,
  acao_curto TEXT,
  acao_medio TEXT,
  acao_estruturante TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.padroes_biblioteca TO authenticated;
GRANT ALL ON public.padroes_biblioteca TO service_role;

ALTER TABLE public.padroes_biblioteca ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Autenticados leem biblioteca"
  ON public.padroes_biblioteca FOR SELECT
  TO authenticated USING (true);

CREATE TRIGGER trg_padroes_updated_at
  BEFORE UPDATE ON public.padroes_biblioteca
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.ecos ADD COLUMN padrao_codigo TEXT NULL
  REFERENCES public.padroes_biblioteca(codigo) ON DELETE SET NULL;
CREATE INDEX idx_ecos_padrao ON public.ecos(padrao_codigo) WHERE padrao_codigo IS NOT NULL;

-- Seed
INSERT INTO public.padroes_biblioteca
(codigo, nome, dominio, mecanismo, consequencia, fenomeno_universal, sugestao_causa_categoria, sugestao_causa_nome, acao_curto, acao_medio, acao_estruturante) VALUES
-- Suprimentos
('P001','Compra Emergencial Crônica','suprimentos','informacao','compra_emergencial','Decisão lenta + Falha de informação','fornecedor','Planejamento de consumo insuficiente',
  'Lista de materiais com maior giro; estoque mínimo empírico','Implantar curva ABC e ponto de pedido por lead time','Integrar planejamento de compras ao cronograma de produção'),
('P002','Estoque Invisível','suprimentos','informacao','desperdicio','Falha de informação','fornecedor','Controle de estoque divergente do físico',
  'Inventário rápido dos itens críticos','Implantar sistema simples de baixa/entrada','Integrar estoque ao ERP com auditoria periódica'),
('P003','Dependência de Fornecedor Único','suprimentos','mao_de_obra','paralisacao','Dependência','fornecedor','Base de fornecedores concentrada',
  'Mapear fornecedores alternativos para itens críticos','Homologar segundo fornecedor por família','Política de dupla-fonte para materiais estratégicos'),
('P004','Cotação Insuficiente','suprimentos','qualidade','perda_de_margem','Variabilidade','fornecedor','Processo de cotação inconsistente',
  'Definir número mínimo de cotações por faixa de valor','Padronizar RFQ e critérios de escolha','Portal de compras com histórico de preços'),
('P005','Lead Time Ignorado','suprimentos','tempo','ociosidade','Espera','fornecedor','Prazo de fornecedor não considerado no planejamento',
  'Documentar lead time real por SKU','Ponto de pedido baseado em lead time médio','Planejamento integrado compras × cronograma'),
('P006','Material Inadequado','suprimentos','qualidade','retrabalho','Retrabalho + Falha de informação','fornecedor','Especificação técnica frágil na compra',
  'Checklist de conferência no recebimento','Padronizar especificação técnica por item','Homologação técnica de fornecedores'),
('P007','Entrega Parcial','suprimentos','tempo','atraso','Falta de sincronização + Espera','fornecedor','Falta de sincronização entrega × execução',
  'Confirmar quantidade total no pedido','SLA de entrega integral com fornecedor','Recebimento integrado ao cronograma'),
-- Projeto
('P010','Projeto Fantasma','projeto','informacao','retrabalho','Falha de informação','projeto','Projeto executivo ausente ou incompleto',
  'Levantar o que existe e o que falta de projeto','Fechar entregáveis mínimos por disciplina','Padrão de entregáveis obrigatórios antes de mobilizar'),
('P011','Revisões Sem Controle','projeto','informacao','retrabalho','Falha de informação','projeto','Falta de controle de versão de projeto',
  'Adotar carimbo de revisão único e visível','Repositório único com controle de versão','Fluxo formal de emissão e distribuição'),
('P012','Compatibilização Ausente','projeto','qualidade','retrabalho','Retrabalho','projeto','Disciplinas não compatibilizadas',
  'Revisão cruzada rápida das disciplinas críticas','Reunião semanal de compatibilização','Compatibilização BIM obrigatória antes de obra'),
('P013','Escopo Ambíguo','projeto','qualidade','perda_de_margem','Variabilidade','projeto','Escopo contratual mal delimitado',
  'Registrar por escrito o que está e não está no escopo','Padronizar memorial descritivo','Contratação com escopo modular'),
('P014','Projeto Desatualizado','projeto','informacao','retrabalho','Falha de informação','projeto','Uso de versão obsoleta em campo',
  'Retirar versões antigas do canteiro','Distribuição controlada por revisão','Projeto acessado por app com última versão'),
('P015','Especificação Incompleta','projeto','informacao','retrabalho','Falha de informação + Retrabalho','projeto','Especificações técnicas incompletas',
  'Reuniões diárias de alinhamento; canal rápido para RFI','Templates padronizados de especificação','Processo formal de revisão e validação'),
('P016','Mudança de Projeto Tardia','projeto','informacao','retrabalho','Decisão lenta + Retrabalho','projeto','Alterações de projeto fora de janela',
  'Congelar projeto após determinada etapa','Comitê de mudanças com impacto quantificado','Gestão de escopo com aditivos formais'),
-- Execução
('P020','Retrabalho Silencioso','execucao','qualidade','retrabalho','Retrabalho','processo','Retrabalho não registrado',
  'Registrar todo retrabalho por 30 dias','Análise semanal das causas de retrabalho','Cultura de reportar sem punir'),
('P021','Produção Interrompida','execucao','tempo','ociosidade','Espera','processo','Interrupções não mapeadas na produção',
  'Registrar todas paradas > 30 min','Análise Pareto das causas de parada','Plano de eliminação sistemática de paradas'),
('P022','Equipe Sem Padronização','execucao','qualidade','retrabalho','Variabilidade','processo','Falta de padrão operacional',
  'Alinhar padrão do serviço com a equipe','Escrever SOP com fotos','Treinamento e certificação por função'),
('P023','Improvisação Operacional','execucao','tempo','desperdicio','Movimento','processo','Ausência de método padronizado',
  'Documentar o método atual','Padronizar ferramentas e sequência','5S e kaizen contínuo'),
('P024','Sequenciamento Inadequado','execucao','tempo','atraso','Falta de sincronização','processo','Sequência de tarefas mal planejada',
  'Reunião diária de sequenciamento','Planejamento semanal por frente','Last Planner System'),
('P025','Ferramenta Inadequada','execucao','equipamento','retrabalho','Variabilidade + Retrabalho','processo','Ferramenta errada para a tarefa',
  'Mapear ferramentas por tarefa crítica','Padronizar kit por função','Plano de manutenção e renovação de ferramentas'),
('P026','Desperdício de Material','execucao','material','desperdicio','Movimento + Variabilidade','processo','Consumo acima do previsto',
  'Medir consumo real vs previsto por 30 dias','Padronizar corte e aproveitamento','Meta de perda por serviço com bonificação'),
-- Gestão
('P030','Aprovação Gargalo','gestao','informacao','atraso','Decisão lenta','gestao','Alçadas de aprovação concentradas',
  'Mapear pedidos parados aguardando aprovação','Redefinir alçadas por valor','Delegação estruturada por matriz de decisão'),
('P031','Decisão Sem Evidência','gestao','informacao','perda_de_margem','Falha de informação','gestao','Decisões sem dados de apoio',
  'Exigir uma métrica por decisão relevante','Painel semanal de indicadores','Cultura data-driven com dashboards por área'),
('P032','Dependência de Pessoa-Chave','gestao','mao_de_obra','paralisacao','Dependência','pessoas','Conhecimento concentrado em um único indivíduo',
  'Documentar processos-chave','Backup formal por processo crítico','Rotação de funções e job rotation'),
('P033','Comunicação Fragmentada','gestao','comunicacao','atraso','Falha de informação','comunicacao','Canais de comunicação dispersos',
  'Definir canal oficial único por assunto','Ata curta em toda decisão','Governança de comunicação por área'),
('P034','Ausência de Memória Operacional','gestao','informacao','retrabalho','Falha de informação','gestao','Lições aprendidas não capturadas',
  'Criar registro simples de decisões','Base de lições aprendidas por obra','Repositório corporativo pesquisável'),
('P035','Delegação Ineficaz','gestao','informacao','atraso','Falha de informação + Decisão lenta','gestao','Delegação sem clareza de expectativa',
  'Identificar tarefas de baixo risco delegáveis já','Treinar gestores em delegação eficaz','Matriz de responsabilidades e acompanhamento'),
('P036','Reuniões Excessivas','gestao','tempo','ociosidade','Espera + Movimento','gestao','Cultura de reunião sem pauta',
  'Cancelar reuniões sem pauta','Padronizar pauta e duração máxima','Rituais de gestão enxutos'),
-- Cliente
('P040','Mudança Contínua de Escopo','cliente','qualidade','retrabalho','Variabilidade','comunicacao','Cliente altera escopo com frequência',
  'Registrar toda mudança por escrito','Rito formal de aditivo com impacto','Gestão contratual de mudanças'),
('P041','Aprovação Tardia','cliente','informacao','atraso','Decisão lenta','comunicacao','Cliente aprova fora do prazo',
  'Definir SLA de aprovação em ata','Escalonar aprovações atrasadas','Contrato com cláusula de aprovação tácita'),
('P042','Informação Incompleta','cliente','informacao','retrabalho','Falha de informação','comunicacao','Cliente entrega briefing incompleto',
  'Checklist de informações mínimas para começar','Formulário padrão de briefing','Diagnóstico prévio obrigatório'),
('P043','Expectativa Desalinhada','cliente','informacao','perda_de_margem','Falha de informação','comunicacao','Expectativa do cliente não alinhada',
  'Reunião de nivelamento inicial','Entregas parciais com aprovação','Contrato com escopo e critérios de aceite'),
('P044','Feedback Não Processado','cliente','informacao','retrabalho','Falha de informação + Decisão lenta','comunicacao','Feedback do cliente sem tratamento',
  'Registrar todo feedback recebido','Ciclo semanal de resposta a feedback','NPS estruturado com plano de ação'),
('P045','Reclamação Recorrente','cliente','qualidade','retrabalho','Retrabalho + Falha de informação','comunicacao','Mesma reclamação repete-se sem correção',
  'Mapear top 5 reclamações do trimestre','Plano de ação por causa raiz','Sistema de gestão da qualidade'),
-- Ambiente
('P050','Chuva Não Gerenciada','ambiente','tempo','ociosidade','Espera','outros','Impacto climático sem plano de contingência',
  'Plano B para dias de chuva','Cronograma com folga sazonal','Cobertura de áreas críticas'),
('P051','Acesso Deficiente','ambiente','tempo','desperdicio','Movimento','outros','Acessos internos mal dimensionados',
  'Redefinir rotas de circulação','Melhorar acessos com brita/placa','Projeto de canteiro com acessos dimensionados'),
('P052','Logística Territorial','ambiente','tempo','atraso','Falta de sincronização','outros','Distância entre frentes gera desperdício de tempo',
  'Agrupar entregas por região','Roteirização de deslocamentos','Base logística intermediária'),
('P053','Restrição Regulatória','ambiente','informacao','paralisacao','Falha de informação','outros','Restrições regulatórias não mapeadas',
  'Mapear licenças e restrições ativas','Calendário de vigência de licenças','Compliance regulatório contínuo'),
('P054','Falta de Espaço','ambiente','tempo','ociosidade','Movimento + Espera','outros','Layout físico insuficiente para operação',
  'Aplicar 5S na área mais crítica','Otimizar layout e endereçar estoque','Redesenho do canteiro/layout'),
('P055','Condições Climáticas Extremas','ambiente','tempo','paralisacao','Espera + Falta de sincronização','outros','Ausência de plano para clima extremo',
  'Monitorar previsão para ações preventivas','Plano de contingência climática','Seguro operacional e reprogramação estruturada');
