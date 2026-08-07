// MDEO — Configuração dos 7 cenários (config-driven).
// Define labels, campos e fórmulas de cada cenário em um único lugar.

export type CenarioMDEO =
  | "aluguel_vs_compra"
  | "terceirizacao_vs_proprio"
  | "corretiva_vs_preventiva"
  | "estoque_vs_jit"
  | "capacitacao_vs_substituicao"
  | "vista_vs_parcelado"
  | "internalizar_vs_subcontratar";

export type Recomendacao = "opcao_a" | "opcao_b" | "revisar";

export type CampoTipo = "numero" | "moeda" | "percentual" | "inteiro";

export interface CampoMDEO {
  key: string;
  label: string;
  tipo: CampoTipo;
  /** Sufixo usado pelo motor para projetar no horizonte: _mensal, _anual, _unico ou nada (total). */
  ajuda?: string;
}

export interface CenarioConfig {
  id: CenarioMDEO;
  nome: string;
  resumo: string;
  /** Pergunta-chave que o cenário responde. */
  pergunta: string;
  rotuloA: string;
  rotuloB: string;
  /** Se a Opção A tem investimento inicial perguntado ao usuário (input separado). */
  temInvestimentoA: boolean;
  premissas: CampoMDEO[];
  custosA: CampoMDEO[];
  custosB: CampoMDEO[];
}

export const CENARIOS: Record<CenarioMDEO, CenarioConfig> = {
  aluguel_vs_compra: {
    id: "aluguel_vs_compra",
    nome: "Aluguel vs Compra",
    resumo: "Equipamento ou imóvel: alugar ou comprar.",
    pergunta: "Comprar o ativo preserva mais capital do que alugar no horizonte?",
    rotuloA: "Comprar",
    rotuloB: "Alugar",
    temInvestimentoA: true,
    premissas: [
      { key: "demanda_mensal_h", label: "Demanda mensal (horas/mês)", tipo: "numero" },
    ],
    custosA: [
      { key: "manutencao_mensal", label: "Manutenção mensal", tipo: "moeda" },
      { key: "seguro_anual", label: "Seguro anual", tipo: "moeda" },
      { key: "valor_residual", label: "Valor residual ao final (subtrai)", tipo: "moeda", ajuda: "Será somado como custo; informe negativo se quiser deduzir." },
    ],
    custosB: [
      { key: "aluguel_mensal", label: "Aluguel mensal", tipo: "moeda" },
      { key: "encargos_mensal", label: "Encargos/operação mensal", tipo: "moeda" },
    ],
  },
  terceirizacao_vs_proprio: {
    id: "terceirizacao_vs_proprio",
    nome: "Terceirizar vs Equipe Própria",
    resumo: "Serviço operacional contínuo.",
    pergunta: "Equipe própria preserva mais capital do que terceirizar?",
    rotuloA: "Equipe própria",
    rotuloB: "Terceirizar",
    temInvestimentoA: true,
    premissas: [
      { key: "headcount", label: "Pessoas necessárias", tipo: "inteiro" },
    ],
    custosA: [
      { key: "folha_mensal", label: "Folha + encargos mensal", tipo: "moeda" },
      { key: "treinamento_anual", label: "Treinamento anual", tipo: "moeda" },
      { key: "epi_ferramentas_mensal", label: "EPI e ferramentas mensal", tipo: "moeda" },
    ],
    custosB: [
      { key: "contrato_mensal", label: "Contrato mensal", tipo: "moeda" },
      { key: "extras_anual", label: "Aditivos/extras anuais", tipo: "moeda" },
    ],
  },
  corretiva_vs_preventiva: {
    id: "corretiva_vs_preventiva",
    nome: "Manutenção Corretiva vs Preventiva",
    resumo: "Política de manutenção de ativos.",
    pergunta: "Investir em preventiva preserva mais capital do que esperar quebrar?",
    rotuloA: "Preventiva",
    rotuloB: "Corretiva (esperar)",
    temInvestimentoA: true,
    premissas: [
      { key: "horas_parado_evento", label: "Horas paradas por quebra", tipo: "numero" },
      { key: "custo_hora_parado", label: "Custo da hora parada (R$)", tipo: "moeda" },
    ],
    custosA: [
      { key: "preventiva_mensal", label: "Custo preventivo mensal", tipo: "moeda" },
      { key: "pecas_anual", label: "Peças preventivas anuais", tipo: "moeda" },
    ],
    custosB: [
      { key: "corretiva_mensal", label: "Corretivas esperadas no mês", tipo: "moeda" },
      { key: "perda_producao_mensal", label: "Perda de produção mensal", tipo: "moeda" },
    ],
  },
  estoque_vs_jit: {
    id: "estoque_vs_jit",
    nome: "Estoque Próprio vs Just-in-Time",
    resumo: "Política de abastecimento.",
    pergunta: "Manter estoque preserva mais capital do que JIT?",
    rotuloA: "Estoque próprio",
    rotuloB: "Just-in-Time",
    temInvestimentoA: true,
    premissas: [
      { key: "giro_mensal", label: "Giro mensal (un.)", tipo: "numero" },
    ],
    custosA: [
      { key: "armazenagem_mensal", label: "Armazenagem mensal", tipo: "moeda" },
      { key: "obsolescencia_anual", label: "Obsolescência anual", tipo: "moeda" },
      { key: "capital_imobilizado_anual", label: "Custo do capital imobilizado anual", tipo: "moeda" },
    ],
    custosB: [
      { key: "frete_emergencial_mensal", label: "Fretes emergenciais mensais", tipo: "moeda" },
      { key: "rupturas_mensal", label: "Custo de rupturas mensal", tipo: "moeda" },
    ],
  },
  capacitacao_vs_substituicao: {
    id: "capacitacao_vs_substituicao",
    nome: "Capacitar vs Substituir Pessoa",
    resumo: "Pessoa com gap de competência.",
    pergunta: "Capacitar preserva mais capital do que substituir?",
    rotuloA: "Capacitar",
    rotuloB: "Substituir",
    temInvestimentoA: true,
    premissas: [
      { key: "salario_atual_mensal", label: "Salário atual mensal", tipo: "moeda" },
    ],
    custosA: [
      { key: "treinamento_unico", label: "Treinamento (custo único)", tipo: "moeda" },
      { key: "perda_produtividade_mensal", label: "Perda produtividade durante curva", tipo: "moeda" },
    ],
    custosB: [
      { key: "rescisao_unico", label: "Rescisão (custo único)", tipo: "moeda" },
      { key: "recrutamento_unico", label: "Recrutamento e seleção", tipo: "moeda" },
      { key: "rampa_mensal", label: "Custo de rampa mensal", tipo: "moeda" },
    ],
  },
  vista_vs_parcelado: {
    id: "vista_vs_parcelado",
    nome: "À Vista vs Parcelado",
    resumo: "Compra de bem ou insumo.",
    pergunta: "Pagar à vista preserva mais capital do que parcelar?",
    rotuloA: "À vista",
    rotuloB: "Parcelado/Financiado",
    temInvestimentoA: true,
    premissas: [
      { key: "taxa_oportunidade_anual_pct", label: "Taxa de oportunidade anual (%)", tipo: "percentual" },
    ],
    custosA: [
      { key: "custo_oportunidade_anual", label: "Custo de oportunidade anual estimado", tipo: "moeda" },
    ],
    custosB: [
      { key: "parcela_mensal", label: "Parcela mensal", tipo: "moeda" },
      { key: "juros_total_unico", label: "Juros totais embutidos", tipo: "moeda" },
    ],
  },
  internalizar_vs_subcontratar: {
    id: "internalizar_vs_subcontratar",
    nome: "Internalizar vs Subcontratar",
    resumo: "Etapa de serviço dentro do escopo da obra.",
    pergunta: "Executar internamente preserva mais capital do que subcontratar?",
    rotuloA: "Internalizar",
    rotuloB: "Subcontratar",
    temInvestimentoA: true,
    premissas: [
      { key: "volume_mes", label: "Volume mensal de serviço (un./m²/h)", tipo: "numero" },
    ],
    custosA: [
      { key: "mao_obra_mensal", label: "Mão de obra mensal", tipo: "moeda" },
      { key: "supervisao_mensal", label: "Supervisão mensal", tipo: "moeda" },
      { key: "insumos_mensal", label: "Insumos mensal", tipo: "moeda" },
    ],
    custosB: [
      { key: "contrato_mensal", label: "Contrato mensal", tipo: "moeda" },
      { key: "fiscalizacao_mensal", label: "Fiscalização mensal", tipo: "moeda" },
    ],
  },
};

export const CENARIOS_LIST: CenarioConfig[] = Object.values(CENARIOS);
