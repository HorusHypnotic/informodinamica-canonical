// Demo data for guest mode — simulates a real construction project
const DEMO_OBRA_ID = "demo-obra-001";
const DEMO_TENANT_ID = "guest-tenant";
const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

export const DEMO_OBRAS = [
  { id: DEMO_OBRA_ID, nome: "Residencial Aurora", endereco: "Av. Brasil, 1200 — São Paulo", status: "em_andamento", custo_orcado_m2: 680, data_inicio: daysAgo(120), data_previsao: daysAgo(-180), orcamento_total: 2500000, area_m2: 3200, fase_atual: "execucao", abordagem: "hibrida", responsavel: "Carlos Silva", descricao: "Condomínio residencial de alto padrão com 4 torres", tipo_obra: "residencial" },
  { id: "demo-obra-002", nome: "Edifício Horizonte", endereco: "Rua das Palmeiras, 45 — Campinas", status: "em_andamento", custo_orcado_m2: 720, data_inicio: daysAgo(60), data_previsao: daysAgo(-300), orcamento_total: 4200000, area_m2: 5800, fase_atual: "planejamento", abordagem: "preditiva", responsavel: "Ana Costa", descricao: "Edifício comercial com 20 andares", tipo_obra: "comercial" },
];

const base = { tenant_id: DEMO_TENANT_ID, obra_id: DEMO_OBRA_ID };

export const DEMO_DATA: Record<string, any[]> = {
  registros_diarios: [
    { id: "rd1", ...base, nome: "Carlos Silva", data_registro: today, entrada: "07:00", saida: "17:00", atividade: "Alvenaria 3º pavimento", producao: "42 m²", status: "ok", created_at: today },
    { id: "rd2", ...base, nome: "João Santos", data_registro: today, entrada: "07:00", saida: "17:00", atividade: "Instalação elétrica", producao: "8 pontos", status: "ok", created_at: today },
    { id: "rd3", ...base, nome: "Maria Oliveira", data_registro: today, entrada: "07:30", saida: "16:30", atividade: "Pintura interna", producao: "65 m²", status: "ok", created_at: today },
    { id: "rd4", ...base, nome: "Pedro Lima", data_registro: daysAgo(1), entrada: "07:00", saida: "12:00", atividade: "Concretagem laje", producao: "—", status: "atestado", created_at: daysAgo(1) },
    { id: "rd5", ...base, nome: "Ana Costa", data_registro: daysAgo(1), entrada: "07:00", saida: "17:00", atividade: "Reboco externo", producao: "38 m²", status: "ok", created_at: daysAgo(1) },
    { id: "rd6", ...base, nome: "Lucas Mendes", data_registro: daysAgo(2), entrada: "07:00", saida: "17:00", atividade: "Armação de ferragem", producao: "120 kg", status: "ok", created_at: daysAgo(2) },
    { id: "rd7", ...base, nome: "Roberto Alves", data_registro: daysAgo(2), entrada: null, saida: null, atividade: null, producao: null, status: "falta", created_at: daysAgo(2) },
    { id: "rd8", ...base, nome: "Fernanda Rocha", data_registro: daysAgo(3), entrada: "07:00", saida: "17:00", atividade: "Assentamento piso", producao: "28 m²", status: "ok", created_at: daysAgo(3) },
  ],

  consumo_materiais: [
    { id: "cm1", ...base, material: "Cimento CP-II", unidade: "saco", previsto: 200, real_consumo: 218, data_registro: daysAgo(1), created_at: daysAgo(1) },
    { id: "cm2", ...base, material: "Areia média", unidade: "m³", previsto: 30, real_consumo: 28, data_registro: daysAgo(1), created_at: daysAgo(1) },
    { id: "cm3", ...base, material: "Aço CA-50", unidade: "kg", previsto: 1500, real_consumo: 1620, data_registro: daysAgo(2), created_at: daysAgo(2) },
    { id: "cm4", ...base, material: "Tijolo cerâmico", unidade: "un", previsto: 5000, real_consumo: 4850, data_registro: daysAgo(3), created_at: daysAgo(3) },
    { id: "cm5", ...base, material: "Tinta acrílica", unidade: "lata", previsto: 40, real_consumo: 44, data_registro: daysAgo(4), created_at: daysAgo(4) },
    { id: "cm6", ...base, material: "Brita nº1", unidade: "m³", previsto: 20, real_consumo: 19, data_registro: daysAgo(5), created_at: daysAgo(5) },
  ],

  compras_emergenciais: [
    { id: "ce1", ...base, material: "Mangueira hidráulica", qtd: 50, data: daysAgo(3), motivo: "Ruptura na rede provisória", created_at: daysAgo(3) },
    { id: "ce2", ...base, material: "Disjuntor 32A", qtd: 10, data: daysAgo(7), motivo: "Falta de estoque", created_at: daysAgo(7) },
  ],

  ativos: [
    { id: "at1", ...base, nome: "Betoneira 400L", status: "ativo", valor: 8500, local_atual: "Pátio central", created_at: daysAgo(10) },
    { id: "at2", ...base, nome: "Andaime fachadeiro (kit)", status: "ativo", valor: 15000, local_atual: "Fachada norte", created_at: daysAgo(10) },
    { id: "at3", ...base, nome: "Guincho coluna", status: "ativo", valor: 12000, local_atual: "Torre A", created_at: daysAgo(10) },
    { id: "at4", ...base, nome: "Vibrador de concreto", status: "manutencao", valor: 3200, local_atual: "Almoxarifado", created_at: daysAgo(5) },
    { id: "at5", ...base, nome: "Escora metálica (lote 200)", status: "ativo", valor: 22000, local_atual: "3º pavimento", created_at: daysAgo(10) },
    { id: "at6", ...base, nome: "Compactador de solo", status: "ocioso", valor: 6800, local_atual: "Almoxarifado", created_at: daysAgo(15) },
  ],

  sequenciamento_equipes: [
    { id: "se1", ...base, equipe: "Alvenaria", semana_inicio: 1, semana_fim: 12, status: "em_andamento", created_at: daysAgo(30) },
    { id: "se2", ...base, equipe: "Elétrica", semana_inicio: 4, semana_fim: 14, status: "em_andamento", created_at: daysAgo(30) },
    { id: "se3", ...base, equipe: "Hidráulica", semana_inicio: 4, semana_fim: 13, status: "planejado", created_at: daysAgo(30) },
    { id: "se4", ...base, equipe: "Pintura", semana_inicio: 10, semana_fim: 16, status: "planejado", created_at: daysAgo(30) },
    { id: "se5", ...base, equipe: "Acabamento", semana_inicio: 14, semana_fim: 20, status: "planejado", created_at: daysAgo(30) },
  ],

  riscos: [
    { id: "ri1", ...base, risco: "Atraso na entrega de aço", severidade: "alta", impacto: "Paralisação da armação por 3 dias", prazo: daysAgo(-5), created_at: daysAgo(4) },
    { id: "ri2", ...base, risco: "Chuvas intensas previstas", severidade: "media", impacto: "Atraso na concretagem", prazo: daysAgo(-2), created_at: daysAgo(2) },
    { id: "ri3", ...base, risco: "Falta de mão de obra qualificada", severidade: "alta", impacto: "Redução de produtividade em 30%", prazo: null, created_at: daysAgo(7) },
    { id: "ri4", ...base, risco: "Variação cambial nos insumos importados", severidade: "baixa", impacto: "Aumento de 5% no custo de materiais", prazo: null, created_at: daysAgo(14) },
  ],

  retrabalhos: [
    { id: "rt1", ...base, etapa: "Alvenaria", quantidade: 3, descricao: "Paredes fora de prumo — 3º pavimento", data_registro: daysAgo(5), created_at: daysAgo(5) },
    { id: "rt2", ...base, etapa: "Elétrica", quantidade: 2, descricao: "Pontos elétricos em posição errada", data_registro: daysAgo(8), created_at: daysAgo(8) },
    { id: "rt3", ...base, etapa: "Hidráulica", quantidade: 1, descricao: "Vazamento na prumada do 2º andar", data_registro: daysAgo(12), created_at: daysAgo(12) },
  ],

  lancamentos_financeiros: [
    { id: "lf1", ...base, tipo: "receita", valor: 450000, descricao: "Medição #4 — Contrato principal", fornecedor: null, data: daysAgo(2), status_pagamento: "pago", created_at: daysAgo(2) },
    { id: "lf2", ...base, tipo: "receita", valor: 380000, descricao: "Medição #3 — Contrato principal", fornecedor: null, data: daysAgo(30), status_pagamento: "pago", created_at: daysAgo(30) },
    { id: "lf3", ...base, tipo: "custo", valor: 85000, descricao: "Folha de pagamento — Mar/26", fornecedor: "RH Interno", data: daysAgo(5), status_pagamento: "pago", created_at: daysAgo(5) },
    { id: "lf4", ...base, tipo: "custo", valor: 62000, descricao: "Compra de aço CA-50", fornecedor: "Gerdau S.A.", data: daysAgo(8), status_pagamento: "pago", created_at: daysAgo(8) },
    { id: "lf5", ...base, tipo: "custo", valor: 38000, descricao: "Aluguel de equipamentos", fornecedor: "LocaMaq", data: daysAgo(10), status_pagamento: "pago", created_at: daysAgo(10) },
    { id: "lf6", ...base, tipo: "custo", valor: 27500, descricao: "Cimento e agregados", fornecedor: "Votorantim", data: daysAgo(12), status_pagamento: "pago", created_at: daysAgo(12) },
    { id: "lf7", ...base, tipo: "custo", valor: 15000, descricao: "Material elétrico", fornecedor: "Eletropaulo Mat.", data: daysAgo(14), status_pagamento: "pendente", created_at: daysAgo(14) },
    { id: "lf8", ...base, tipo: "custo", valor: 42000, descricao: "Folha de pagamento — Fev/26", fornecedor: "RH Interno", data: daysAgo(35), status_pagamento: "pago", created_at: daysAgo(35) },
    { id: "lf9", ...base, tipo: "receita", valor: 120000, descricao: "Adiantamento contratual", fornecedor: null, data: daysAgo(60), status_pagamento: "pago", created_at: daysAgo(60) },
  ],

  incidentes_seguranca: [
    { id: "is1", ...base, tipo: "inspecao", status: "aprovado", severidade: "baixa", descricao: "Inspeção semanal — EPIs", data: daysAgo(2), created_at: daysAgo(2) },
    { id: "is2", ...base, tipo: "inspecao", status: "aprovado", severidade: "baixa", descricao: "Inspeção mensal — andaimes", data: daysAgo(7), created_at: daysAgo(7) },
    { id: "is3", ...base, tipo: "inspecao", status: "reprovado", severidade: "media", descricao: "Inspeção — proteção de periferia", data: daysAgo(10), created_at: daysAgo(10) },
    { id: "is4", ...base, tipo: "nc", status: "aberto", severidade: "alta", descricao: "Falta de guarda-corpo no 4º pavimento", data: daysAgo(3), created_at: daysAgo(3) },
    { id: "is5", ...base, tipo: "nc", status: "resolvido", severidade: "media", descricao: "Fio exposto na área de vivência", data: daysAgo(15), created_at: daysAgo(15) },
    { id: "is6", ...base, tipo: "acidente", status: "resolvido", severidade: "media", descricao: "Queda de material do 2º andar (sem vítimas)", data: daysAgo(22), created_at: daysAgo(22) },
    { id: "is7", ...base, tipo: "inspecao", status: "aprovado", severidade: "baixa", descricao: "Inspeção — sinalização de canteiro", data: daysAgo(14), created_at: daysAgo(14) },
  ],

  acoes_corretivas: [
    { id: "ac1", ...base, descricao: "Corrigir prumo da parede do 3º pavimento — alvenaria fora de esquadro", responsavel: "Carlos Silva", pilar: "organizacao", prioridade: "alta", status: "em_andamento", prazo: daysAgo(-3), created_at: daysAgo(5), updated_at: daysAgo(2) },
    { id: "ac2", ...base, descricao: "Instalar guarda-corpo no 4º pavimento — NC de segurança aberta", responsavel: "Roberto Alves", pilar: "seguranca", prioridade: "alta", status: "pendente", prazo: daysAgo(-1), created_at: daysAgo(3), updated_at: daysAgo(3) },
    { id: "ac3", ...base, descricao: "Recalcular quantitativo de aço para laje do 5º pav. — consumo acima de 8%", responsavel: "Ana Costa", pilar: "padronizacao", prioridade: "media", status: "concluida", prazo: daysAgo(2), created_at: daysAgo(10), updated_at: daysAgo(2) },
    { id: "ac4", ...base, descricao: "Devolver compactador de solo ocioso ao fornecedor — custo de locação", responsavel: "Pedro Lima", pilar: "eficiencia", prioridade: "media", status: "pendente", prazo: daysAgo(-5), created_at: daysAgo(7), updated_at: daysAgo(7) },
    { id: "ac5", ...base, descricao: "Renegociar prazo de entrega de material elétrico com Eletropaulo", responsavel: "Eduardo Martins", pilar: "analise", prioridade: "baixa", status: "concluida", prazo: daysAgo(1), created_at: daysAgo(14), updated_at: daysAgo(1) },
  ],

  logistica_interna: [
    { id: "li1", ...base, equipe: "Alvenaria", tempo_deslocamento_min: 18, origem: "Almoxarifado", destino: "3º Pavimento", observacao: "Elevador de carga parado", data_registro: daysAgo(1), created_at: daysAgo(1) },
    { id: "li2", ...base, equipe: "Elétrica", tempo_deslocamento_min: 12, origem: "Depósito", destino: "4º Pavimento", observacao: null, data_registro: daysAgo(1), created_at: daysAgo(1) },
    { id: "li3", ...base, equipe: "Hidráulica", tempo_deslocamento_min: 35, origem: "Almoxarifado", destino: "Subsolo", observacao: "Acesso bloqueado por concretagem", data_registro: daysAgo(2), created_at: daysAgo(2) },
    { id: "li4", ...base, equipe: "Pintura", tempo_deslocamento_min: 8, origem: "Central de tintas", destino: "2º Pavimento", observacao: null, data_registro: daysAgo(3), created_at: daysAgo(3) },
  ],

  ciclos_tarefa: [
    { id: "ct1", ...base, tarefa: "Assentamento cerâmico (piso)", tempo_medio_min: 48, tempo_alvo_min: 35, qtd_medicoes: 6, data_registro: daysAgo(1), created_at: daysAgo(1) },
    { id: "ct2", ...base, tarefa: "Chapisco de parede", tempo_medio_min: 22, tempo_alvo_min: 20, qtd_medicoes: 4, data_registro: daysAgo(2), created_at: daysAgo(2) },
    { id: "ct3", ...base, tarefa: "Montagem de formas (pilar)", tempo_medio_min: 55, tempo_alvo_min: 50, qtd_medicoes: 3, data_registro: daysAgo(3), created_at: daysAgo(3) },
    { id: "ct4", ...base, tarefa: "Instalação ponto elétrico", tempo_medio_min: 15, tempo_alvo_min: 18, qtd_medicoes: 8, data_registro: daysAgo(2), created_at: daysAgo(2) },
  ],

  aditivos_contratuais: [
    { id: "ad1", ...base, descricao: "Alteração de projeto elétrico — adição de 12 pontos", valor: 18500, tipo: "aditivo", aprovado: true, data: daysAgo(10), created_at: daysAgo(10) },
    { id: "ad2", ...base, descricao: "Reforço estrutural na laje do 4º pav. — erro de cálculo", valor: 32000, tipo: "desvio", aprovado: false, data: daysAgo(5), created_at: daysAgo(5) },
    { id: "ad3", ...base, descricao: "Troca de revestimento externo por solicitação do cliente", valor: 45000, tipo: "aditivo", aprovado: true, data: daysAgo(20), created_at: daysAgo(20) },
  ],

  lotes_consumo: [
    { id: "lc1", ...base, atividade: "Execução de contrapiso", area_executada: 120, unidade_area: "m²", data_inicio: daysAgo(7), data_fim: daysAgo(2), observacao: "Bloco A — térreo e 1º pav.", created_at: daysAgo(7) },
    { id: "lc2", ...base, atividade: "Alvenaria 3º pavimento", area_executada: 85, unidade_area: "m²", data_inicio: daysAgo(14), data_fim: daysAgo(8), observacao: null, created_at: daysAgo(14) },
    { id: "lc3", ...base, atividade: "Reboco interno", area_executada: 200, unidade_area: "m²", data_inicio: daysAgo(5), data_fim: null, observacao: "Em andamento", created_at: daysAgo(5) },
  ],

  lote_materiais: [
    { id: "lm1", lote_id: "lc1", ...base, material: "Cimento CP-II", unidade: "saco", previsto: 28, real_consumo: 33, created_at: daysAgo(7) },
    { id: "lm2", lote_id: "lc1", ...base, material: "Areia média", unidade: "m³", previsto: 6, real_consumo: 5.8, created_at: daysAgo(7) },
    { id: "lm3", lote_id: "lc1", ...base, material: "Brita nº1", unidade: "m³", previsto: 4, real_consumo: 4.5, created_at: daysAgo(7) },
    { id: "lm4", lote_id: "lc1", ...base, material: "Aditivo plastificante", unidade: "litro", previsto: 12, real_consumo: 11, created_at: daysAgo(7) },
    { id: "lm5", lote_id: "lc2", ...base, material: "Cimento CP-II", unidade: "saco", previsto: 18, real_consumo: 21, created_at: daysAgo(14) },
    { id: "lm6", lote_id: "lc2", ...base, material: "Tijolo cerâmico", unidade: "un", previsto: 2800, real_consumo: 3050, created_at: daysAgo(14) },
    { id: "lm7", lote_id: "lc2", ...base, material: "Areia média", unidade: "m³", previsto: 3.5, real_consumo: 3.8, created_at: daysAgo(14) },
    { id: "lm8", lote_id: "lc3", ...base, material: "Cimento CP-II", unidade: "saco", previsto: 45, real_consumo: 48, created_at: daysAgo(5) },
    { id: "lm9", lote_id: "lc3", ...base, material: "Areia fina", unidade: "m³", previsto: 8, real_consumo: 8.2, created_at: daysAgo(5) },
    { id: "lm10", lote_id: "lc3", ...base, material: "Cal hidratada", unidade: "saco", previsto: 20, real_consumo: 22, created_at: daysAgo(5) },
  ],

  checklist_semanal: (() => {
    // Generate demo checks for current week (Monday)
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now);
    monday.setDate(diff);
    const semana = monday.toISOString().slice(0, 10);
    return [
      { id: "ck1", ...base, semana, item_key: "o1", verificado: true, verificado_por: "Eduardo Martins", observacao: null, created_at: daysAgo(1), updated_at: daysAgo(1) },
      { id: "ck2", ...base, semana, item_key: "o2", verificado: true, verificado_por: "Eduardo Martins", observacao: "Equipe de alvenaria produziu 42m² — dentro da meta", created_at: daysAgo(1), updated_at: daysAgo(1) },
      { id: "ck3", ...base, semana, item_key: "o3", verificado: true, verificado_por: "Eduardo Martins", observacao: null, created_at: daysAgo(1), updated_at: daysAgo(1) },
      { id: "ck4", ...base, semana, item_key: "p1", verificado: true, verificado_por: "Eduardo Martins", observacao: "Cimento garantido até sexta. Aço em risco.", created_at: daysAgo(1), updated_at: daysAgo(1) },
      { id: "ck5", ...base, semana, item_key: "p2", verificado: true, verificado_por: "Eduardo Martins", observacao: null, created_at: daysAgo(1), updated_at: daysAgo(1) },
      { id: "ck6", ...base, semana, item_key: "e1", verificado: true, verificado_por: "Eduardo Martins", observacao: "Compactador ocioso identificado — devolver", created_at: daysAgo(0), updated_at: daysAgo(0) },
      { id: "ck7", ...base, semana, item_key: "r1", verificado: true, verificado_por: "Eduardo Martins", observacao: null, created_at: daysAgo(0), updated_at: daysAgo(0) },
      { id: "ck8", ...base, semana, item_key: "r3", verificado: true, verificado_por: "Eduardo Martins", observacao: "3 riscos mapeados — aço, chuva, mão de obra", created_at: daysAgo(0), updated_at: daysAgo(0) },
      { id: "ck9", ...base, semana, item_key: "a1", verificado: true, verificado_por: "Eduardo Martins", observacao: null, created_at: daysAgo(0), updated_at: daysAgo(0) },
    ];
  })(),
};
