
-- Enums
CREATE TYPE public.grupo_pesquisa AS ENUM ('piloto', 'controle');
CREATE TYPE public.status_obra_pesquisa AS ENUM ('ativa', 'finalizada', 'desistente');

-- Table
CREATE TABLE public.obras_pesquisa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  dono_id uuid NOT NULL DEFAULT auth.uid(),
  grupo public.grupo_pesquisa NOT NULL,
  status public.status_obra_pesquisa NOT NULL DEFAULT 'ativa',
  data_inicio date NOT NULL DEFAULT '2026-08-03',
  observacoes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.obras_pesquisa TO authenticated;
GRANT ALL ON public.obras_pesquisa TO service_role;

ALTER TABLE public.obras_pesquisa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Dono seleciona suas obras" ON public.obras_pesquisa
  FOR SELECT TO authenticated USING (auth.uid() = dono_id);
CREATE POLICY "Dono insere suas obras" ON public.obras_pesquisa
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = dono_id);
CREATE POLICY "Dono atualiza suas obras" ON public.obras_pesquisa
  FOR UPDATE TO authenticated USING (auth.uid() = dono_id) WITH CHECK (auth.uid() = dono_id);
CREATE POLICY "Dono deleta suas obras" ON public.obras_pesquisa
  FOR DELETE TO authenticated USING (auth.uid() = dono_id);

CREATE TRIGGER trg_obras_pesquisa_updated_at
BEFORE UPDATE ON public.obras_pesquisa
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
