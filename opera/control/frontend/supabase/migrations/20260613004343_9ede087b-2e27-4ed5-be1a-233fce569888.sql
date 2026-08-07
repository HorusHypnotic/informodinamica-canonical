
-- 1. Vínculo MDEO ↔ ECOs
ALTER TABLE public.ecos
  ADD COLUMN decisao_mdeo_id uuid REFERENCES public.decisoes_economicas(id) ON DELETE SET NULL;
CREATE INDEX idx_ecos_decisao_mdeo ON public.ecos(decisao_mdeo_id) WHERE decisao_mdeo_id IS NOT NULL;

-- 2. Enum de prazo
CREATE TYPE public.prazo_recomendacao AS ENUM ('curto', 'medio', 'estruturante');

-- 3. Tabela recomendacoes
CREATE TABLE public.recomendacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  causa_raiz_id uuid NOT NULL REFERENCES public.causas_raiz(id) ON DELETE CASCADE,
  prazo public.prazo_recomendacao NOT NULL,
  acao text NOT NULL,
  prazo_dias integer,
  responsavel_sugerido text,
  origem text NOT NULL DEFAULT 'opera_lib',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_recomendacoes_causa ON public.recomendacoes(causa_raiz_id);
CREATE INDEX idx_recomendacoes_user ON public.recomendacoes(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recomendacoes TO authenticated;
GRANT ALL ON public.recomendacoes TO service_role;
ALTER TABLE public.recomendacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own recomendacoes" ON public.recomendacoes
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_recomendacoes_updated_at
  BEFORE UPDATE ON public.recomendacoes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Tabela recomendacoes_implementadas
CREATE TABLE public.recomendacoes_implementadas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  recomendacao_id uuid NOT NULL REFERENCES public.recomendacoes(id) ON DELETE CASCADE,
  causa_raiz_id uuid NOT NULL REFERENCES public.causas_raiz(id) ON DELETE CASCADE,
  implementada_em date NOT NULL DEFAULT CURRENT_DATE,
  ico_antes numeric,
  ico_depois numeric,
  observacoes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_recimpl_causa ON public.recomendacoes_implementadas(causa_raiz_id);
CREATE INDEX idx_recimpl_user ON public.recomendacoes_implementadas(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recomendacoes_implementadas TO authenticated;
GRANT ALL ON public.recomendacoes_implementadas TO service_role;
ALTER TABLE public.recomendacoes_implementadas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own rec impl" ON public.recomendacoes_implementadas
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_recimpl_updated_at
  BEFORE UPDATE ON public.recomendacoes_implementadas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 5. Trigger de seed: ao criar causa raiz, inserir 3 recomendações padrão por categoria
CREATE OR REPLACE FUNCTION public.seed_recomendacoes_causa()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_curto text;
  v_medio text;
  v_estrut text;
BEGIN
  CASE NEW.categoria
    WHEN 'fornecedor' THEN
      v_curto := 'Mapear materiais críticos e definir estoque mínimo empírico';
      v_medio := 'Construir curva ABC e ponto de pedido baseado em lead time';
      v_estrut := 'Integrar planejamento de compras ao cronograma de produção';
    WHEN 'processo' THEN
      v_curto := 'Documentar o passo onde a falha ocorre e criar checklist temporário';
      v_medio := 'Padronizar procedimento com SOP escrito e responsável definido';
      v_estrut := 'Redesenhar fluxo eliminando o gargalo identificado';
    WHEN 'pessoas' THEN
      v_curto := 'Briefing rápido com a equipe sobre a falha recorrente';
      v_medio := 'Plano de capacitação focado na lacuna identificada';
      v_estrut := 'Revisar matriz de competências e plano de carreira';
    WHEN 'projeto' THEN
      v_curto := 'Revisão técnica do projeto antes do próximo ciclo';
      v_medio := 'Implantar checklist de revisão de projeto obrigatório';
      v_estrut := 'Adotar metodologia de projeto integrado (engenharia simultânea)';
    WHEN 'gestao' THEN
      v_curto := 'Reunião de revisão de indicadores com gestor responsável';
      v_medio := 'Implantar reunião semanal de gestão com pauta padrão';
      v_estrut := 'Estruturar governança com papéis e SLAs internos';
    WHEN 'comunicacao' THEN
      v_curto := 'Definir canal único oficial para a informação que falhou';
      v_medio := 'Implantar registro padronizado de decisões (ata curta)';
      v_estrut := 'Redesenhar fluxo de comunicação entre áreas envolvidas';
    ELSE
      v_curto := 'Revisar internamente o processo afetado';
      v_medio := 'Documentar e monitorar a recorrência por 30 dias';
      v_estrut := 'Redesenhar o fluxo eliminando a causa raiz';
  END CASE;

  INSERT INTO public.recomendacoes (user_id, causa_raiz_id, prazo, acao, prazo_dias)
  VALUES
    (NEW.user_id, NEW.id, 'curto', v_curto, 7),
    (NEW.user_id, NEW.id, 'medio', v_medio, 30),
    (NEW.user_id, NEW.id, 'estruturante', v_estrut, NULL);

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_seed_recomendacoes
  AFTER INSERT ON public.causas_raiz
  FOR EACH ROW EXECUTE FUNCTION public.seed_recomendacoes_causa();
