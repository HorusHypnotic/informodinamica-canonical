
-- =============== ENUMS ===============
CREATE TYPE public.app_role AS ENUM ('admin', 'analista', 'gestor', 'cliente');

CREATE TYPE public.causa_categoria AS ENUM (
  'processo', 'pessoas', 'fornecedor', 'projeto', 'gestao', 'comunicacao', 'outros'
);
CREATE TYPE public.criticidade AS ENUM ('baixa', 'media', 'alta', 'critica');
CREATE TYPE public.causa_status AS ENUM ('ativa', 'monitorando', 'resolvida', 'arquivada');

CREATE TYPE public.eco_categoria AS ENUM (
  'retrabalho','compra_emergencial','atraso','falha_comunicacao',
  'falta_material','equipamento_parado','erro_execucao','erro_projeto',
  'aprovacao_lenta','outros'
);

-- =============== PROFILES ===============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- =============== USER ROLES ===============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- =============== AUTO PROFILE + DEFAULT ROLE ===============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'analista');
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============== UPDATED_AT HELPER ===============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============== CAUSAS RAIZ ===============
CREATE TABLE public.causas_raiz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria public.causa_categoria NOT NULL DEFAULT 'outros',
  criticidade public.criticidade NOT NULL DEFAULT 'media',
  status public.causa_status NOT NULL DEFAULT 'ativa',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.causas_raiz TO authenticated;
GRANT ALL ON public.causas_raiz TO service_role;
ALTER TABLE public.causas_raiz ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own causas" ON public.causas_raiz FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_causas_updated_at
BEFORE UPDATE ON public.causas_raiz
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_causas_user ON public.causas_raiz(user_id);

-- =============== ECOS ===============
CREATE TABLE public.ecos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  causa_raiz_id UUID REFERENCES public.causas_raiz(id) ON DELETE SET NULL,
  data_evento DATE NOT NULL DEFAULT CURRENT_DATE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria public.eco_categoria NOT NULL DEFAULT 'outros',
  valor_prejuizo NUMERIC(14,2) NOT NULL DEFAULT 0,
  data_inicio_causa DATE,
  responsavel TEXT,
  impacto SMALLINT NOT NULL CHECK (impacto BETWEEN 1 AND 5),
  recorrencia SMALLINT NOT NULL CHECK (recorrencia BETWEEN 1 AND 5),
  persistencia SMALLINT NOT NULL CHECK (persistencia BETWEEN 1 AND 5),
  ico SMALLINT GENERATED ALWAYS AS (impacto * recorrencia * persistencia) STORED,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ecos TO authenticated;
GRANT ALL ON public.ecos TO service_role;
ALTER TABLE public.ecos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own ecos" ON public.ecos FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_ecos_updated_at
BEFORE UPDATE ON public.ecos
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_ecos_user ON public.ecos(user_id);
CREATE INDEX idx_ecos_causa ON public.ecos(causa_raiz_id);
CREATE INDEX idx_ecos_data ON public.ecos(data_evento);
