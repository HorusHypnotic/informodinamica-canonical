
-- Enums
CREATE TYPE public.cenario_mdeo AS ENUM (
  'aluguel_vs_compra','terceirizacao_vs_proprio','corretiva_vs_preventiva',
  'estoque_vs_jit','capacitacao_vs_substituicao','vista_vs_parcelado',
  'internalizar_vs_subcontratar'
);
CREATE TYPE public.recomendacao_mdeo AS ENUM ('opcao_a','opcao_b','revisar');
CREATE TYPE public.decisao_status AS ENUM ('rascunho','aprovada','descartada');

-- Table
CREATE TABLE public.decisoes_economicas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  cenario public.cenario_mdeo NOT NULL,
  titulo text NOT NULL,
  horizonte_meses integer NOT NULL DEFAULT 12 CHECK (horizonte_meses BETWEEN 1 AND 360),
  premissas jsonb NOT NULL DEFAULT '{}'::jsonb,
  custos_a jsonb NOT NULL DEFAULT '{}'::jsonb,
  custos_b jsonb NOT NULL DEFAULT '{}'::jsonb,
  investimento_inicial_a numeric NOT NULL DEFAULT 0,
  cct_a numeric,
  cct_b numeric,
  epi numeric,
  payback_meses numeric,
  roc numeric,
  recomendacao public.recomendacao_mdeo,
  status public.decisao_status NOT NULL DEFAULT 'rascunho',
  observacoes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.decisoes_economicas TO authenticated;
GRANT ALL ON public.decisoes_economicas TO service_role;

ALTER TABLE public.decisoes_economicas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own decisoes"
  ON public.decisoes_economicas FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- updated_at trigger (reusa set_updated_at já existente)
CREATE TRIGGER trg_decisoes_updated_at
  BEFORE UPDATE ON public.decisoes_economicas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Recalculo de derivados
CREATE OR REPLACE FUNCTION public.recalcular_mdeo()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_sum_a numeric := 0;
  v_sum_b numeric := 0;
  v_inv numeric := COALESCE(NEW.investimento_inicial_a, 0);
  v_horizonte int := COALESCE(NEW.horizonte_meses, 12);
  v_epi numeric;
  v_econ_mensal numeric;
  k text;
  v numeric;
BEGIN
  -- Soma simples de todos os valores numéricos no JSONB ao longo do horizonte.
  -- Chaves com sufixo "_mensal" são multiplicadas por horizonte_meses.
  -- Chaves com sufixo "_anual" multiplicadas por horizonte/12.
  -- Chaves com sufixo "_unico" somadas como estão.
  -- Demais chaves numéricas: somadas como estão (assume valor total).
  FOR k, v IN
    SELECT key, NULLIF(value::text, 'null')::numeric
    FROM jsonb_each_text(NEW.custos_a)
    WHERE value ~ '^-?[0-9]+(\.[0-9]+)?$'
  LOOP
    IF k LIKE '%_mensal' THEN v_sum_a := v_sum_a + v * v_horizonte;
    ELSIF k LIKE '%_anual' THEN v_sum_a := v_sum_a + v * (v_horizonte::numeric / 12);
    ELSE v_sum_a := v_sum_a + v;
    END IF;
  END LOOP;

  FOR k, v IN
    SELECT key, NULLIF(value::text, 'null')::numeric
    FROM jsonb_each_text(NEW.custos_b)
    WHERE value ~ '^-?[0-9]+(\.[0-9]+)?$'
  LOOP
    IF k LIKE '%_mensal' THEN v_sum_b := v_sum_b + v * v_horizonte;
    ELSIF k LIKE '%_anual' THEN v_sum_b := v_sum_b + v * (v_horizonte::numeric / 12);
    ELSE v_sum_b := v_sum_b + v;
    END IF;
  END LOOP;

  NEW.cct_a := v_sum_a + v_inv;
  NEW.cct_b := v_sum_b;
  v_epi := NEW.cct_b - NEW.cct_a;
  NEW.epi := v_epi;
  v_econ_mensal := v_epi / NULLIF(v_horizonte, 0);
  NEW.payback_meses := CASE WHEN v_inv > 0 AND v_econ_mensal > 0 THEN v_inv / v_econ_mensal ELSE NULL END;
  NEW.roc := CASE WHEN v_inv > 0 THEN v_epi / v_inv ELSE NULL END;

  IF v_epi IS NULL OR NEW.cct_a IS NULL OR NEW.cct_b IS NULL THEN
    NEW.recomendacao := 'revisar';
  ELSIF GREATEST(NEW.cct_a, NEW.cct_b) > 0
        AND ABS(v_epi) / GREATEST(NEW.cct_a, NEW.cct_b) < 0.10 THEN
    NEW.recomendacao := 'revisar';
  ELSIF v_epi > 0
        AND (NEW.payback_meses IS NULL OR NEW.payback_meses <= v_horizonte) THEN
    NEW.recomendacao := 'opcao_a';
  ELSE
    NEW.recomendacao := 'opcao_b';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_decisoes_recalc
  BEFORE INSERT OR UPDATE ON public.decisoes_economicas
  FOR EACH ROW EXECUTE FUNCTION public.recalcular_mdeo();

-- View: Capital Preservado por usuário
CREATE VIEW public.vw_capital_preservado
WITH (security_invoker = true)
AS
SELECT
  user_id,
  COALESCE(SUM(epi) FILTER (WHERE status = 'aprovada'), 0) AS capital_preservado,
  COALESCE(SUM(epi) FILTER (WHERE status = 'aprovada' AND created_at >= date_trunc('month', now())), 0) AS epi_mes
FROM public.decisoes_economicas
GROUP BY user_id;

GRANT SELECT ON public.vw_capital_preservado TO authenticated;
GRANT ALL ON public.vw_capital_preservado TO service_role;
