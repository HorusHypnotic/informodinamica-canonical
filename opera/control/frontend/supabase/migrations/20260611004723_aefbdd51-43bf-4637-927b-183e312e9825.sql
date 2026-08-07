-- Phase 2: Taxonomia 4 camadas para ECOs
CREATE TYPE dominio_enum AS ENUM ('projeto','suprimentos','execucao','gestao','cliente','ambiente','financeiro','compliance');
CREATE TYPE mecanismo_enum AS ENUM ('tempo','informacao','capital','material','equipamento','comunicacao','qualidade','mao_de_obra');
CREATE TYPE consequencia_enum AS ENUM ('atraso','retrabalho','desperdicio','ociosidade','compra_emergencial','multa','paralisacao','perda_de_margem');

ALTER TABLE public.ecos
  ADD COLUMN dominio dominio_enum,
  ADD COLUMN mecanismo mecanismo_enum,
  ADD COLUMN consequencia consequencia_enum;