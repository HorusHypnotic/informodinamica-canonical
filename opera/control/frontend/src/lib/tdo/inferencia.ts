// Inferência de domínio + consequência a partir da categoria de uma causa raiz
// ou da categoria de um ECO. Usado para pré-preencher campos do formulário —
// o usuário sempre pode sobrescrever.

type Dominio =
  | "projeto" | "suprimentos" | "execucao" | "gestao"
  | "cliente" | "ambiente" | "financeiro" | "compliance";

type Consequencia =
  | "atraso" | "retrabalho" | "desperdicio" | "ociosidade"
  | "compra_emergencial" | "multa" | "paralisacao" | "perda_de_margem";

// Mapa por categoria de causa raiz → (domínio, consequência) padrão.
const POR_CAUSA: Record<string, { dominio: Dominio; consequencia: Consequencia }> = {
  fornecedor:  { dominio: "suprimentos", consequencia: "compra_emergencial" },
  processo:    { dominio: "execucao",    consequencia: "retrabalho" },
  pessoas:     { dominio: "execucao",    consequencia: "retrabalho" },
  projeto:     { dominio: "projeto",     consequencia: "retrabalho" },
  gestao:      { dominio: "gestao",      consequencia: "perda_de_margem" },
  comunicacao: { dominio: "gestao",      consequencia: "atraso" },
  outros:      { dominio: "execucao",    consequencia: "desperdicio" },
};

// Mapa por categoria do próprio ECO (fallback se não houver causa).
const POR_ECO: Record<string, { dominio: Dominio; consequencia: Consequencia }> = {
  retrabalho:         { dominio: "execucao",    consequencia: "retrabalho" },
  compra_emergencial: { dominio: "suprimentos", consequencia: "compra_emergencial" },
  atraso:             { dominio: "execucao",    consequencia: "atraso" },
  falha_comunicacao:  { dominio: "gestao",      consequencia: "atraso" },
  falta_material:     { dominio: "suprimentos", consequencia: "paralisacao" },
  equipamento_parado: { dominio: "execucao",    consequencia: "paralisacao" },
  erro_execucao:      { dominio: "execucao",    consequencia: "retrabalho" },
  erro_projeto:       { dominio: "projeto",     consequencia: "retrabalho" },
  aprovacao_lenta:    { dominio: "gestao",      consequencia: "atraso" },
  outros:             { dominio: "execucao",    consequencia: "desperdicio" },
};

export function inferirPorCausa(categoriaCausa?: string | null) {
  if (!categoriaCausa) return null;
  return POR_CAUSA[categoriaCausa] ?? null;
}

export function inferirPorEco(categoriaEco?: string | null) {
  if (!categoriaEco) return null;
  return POR_ECO[categoriaEco] ?? null;
}
