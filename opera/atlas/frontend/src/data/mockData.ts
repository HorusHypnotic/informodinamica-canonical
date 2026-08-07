// ===== ORGANIZAÇÃO (Mão de Obra) =====
export const laborKPIs = {
  custoReal: 285000,
  custoOrcado: 260000,
  desvioPercent: 9.6,
  custoM2Executado: 142.5,
  custoM2Orcado: 130.0,
};

export const colaboradores = [
  { id: 1, nome: "Carlos Silva", entrada: "07:00", saida: "17:00", atividade: "Alvenaria", producao: "12 m²", status: "ok" as const },
  { id: 2, nome: "João Santos", entrada: "07:00", saida: "17:00", atividade: "Reboco", producao: "18 m²", status: "ok" as const },
  { id: 3, nome: "Pedro Oliveira", entrada: "07:30", saida: "16:00", atividade: "Elétrica", producao: "6 pontos", status: "warning" as const },
  { id: 4, nome: "Lucas Ferreira", entrada: "07:00", saida: "17:00", atividade: "Hidráulica", producao: "8 pontos", status: "ok" as const },
  { id: 5, nome: "André Costa", entrada: "08:00", saida: "15:00", atividade: "Pintura", producao: "22 m²", status: "critical" as const },
  { id: 6, nome: "Marcos Lima", entrada: "07:00", saida: "17:00", atividade: "Estrutura", producao: "4 m³", status: "ok" as const },
];

export const producaoPorFrente = [
  { frente: "Alvenaria", seg: 45, ter: 52, qua: 48, qui: 55, sex: 50, sab: 30, dom: 0 },
  { frente: "Reboco", seg: 60, ter: 58, qua: 65, qui: 62, sex: 70, sab: 35, dom: 0 },
  { frente: "Elétrica", seg: 20, ter: 22, qua: 18, qui: 25, sex: 24, sab: 12, dom: 0 },
  { frente: "Hidráulica", seg: 15, ter: 18, qua: 16, qui: 20, sex: 19, sab: 10, dom: 0 },
  { frente: "Pintura", seg: 80, ter: 75, qua: 85, qui: 78, sex: 90, sab: 40, dom: 0 },
];

// ===== PADRONIZAÇÃO (Insumos) =====
export const insumosKPIs = {
  desperdicioPercent: 7.2,
  metaDesperdicio: 5,
  comprasEmergenciais: 3,
};

export const consumoMateriais = [
  { material: "Cimento CP-II", previsto: 500, real: 545, unidade: "sacos", desperdicio: 9.0 },
  { material: "Areia média", previsto: 30, real: 33, unidade: "m³", desperdicio: 10.0 },
  { material: "Aço CA-50", previsto: 2000, real: 2080, unidade: "kg", desperdicio: 4.0 },
  { material: "Tijolo cerâmico", previsto: 8000, real: 8640, unidade: "un", desperdicio: 8.0 },
  { material: "Argamassa colante", previsto: 200, real: 210, unidade: "sacos", desperdicio: 5.0 },
  { material: "Tinta acrílica", previsto: 80, real: 82, unidade: "latas", desperdicio: 2.5 },
  { material: "Tubo PVC 100mm", previsto: 150, real: 156, unidade: "m", desperdicio: 4.0 },
  { material: "Fio 2.5mm", previsto: 1000, real: 1050, unidade: "m", desperdicio: 5.0 },
];

export const alertasCompras = [
  { material: "Cimento CP-V ARI", qtd: 50, motivo: "Falta no estoque por erro de medição", data: "28/02/2026" },
  { material: "Mangueira cristal", qtd: 30, motivo: "Dano em obra - reposição urgente", data: "01/03/2026" },
  { material: "Disco de corte", qtd: 20, motivo: "Consumo acima do previsto", data: "03/03/2026" },
];

// ===== EFICIÊNCIA (Ativos) =====
export const ativosKPIs = {
  valorParados: 47500,
  tempoProdutivoPercent: 72,
  tempoDeslocamentoPercent: 28,
};

export const ferramentas = [
  { id: 1, nome: "Betoneira 400L", status: "ativo" as const, local: "Bloco A", valor: 8500 },
  { id: 2, nome: "Vibrador de concreto", status: "ocioso" as const, local: "Almoxarifado", valor: 3200 },
  { id: 3, nome: "Andaime tubular (jogo)", status: "ativo" as const, local: "Bloco B", valor: 12000 },
  { id: 4, nome: "Serra circular", status: "realocavel" as const, local: "Bloco A", valor: 2800 },
  { id: 5, nome: "Compactador de solo", status: "ocioso" as const, local: "Pátio", valor: 15000 },
  { id: 6, nome: "Furadeira industrial", status: "ativo" as const, local: "Bloco C", valor: 1800 },
  { id: 7, nome: "Nível a laser", status: "realocavel" as const, local: "Almoxarifado", valor: 4200 },
];

export const cicloTarefa = [
  { semana: "S1", tempo: 4.2 },
  { semana: "S2", tempo: 3.8 },
  { semana: "S3", tempo: 4.5 },
  { semana: "S4", tempo: 3.5 },
  { semana: "S5", tempo: 3.2 },
  { semana: "S6", tempo: 3.0 },
  { semana: "S7", tempo: 2.8 },
  { semana: "S8", tempo: 3.1 },
];

// ===== REDUÇÃO DE PERDAS =====
export const perdasKPIs = {
  improdutividadePercent: 18.5,
  metaImprodutividade: 15,
  retrabalhosTotal: 12,
};

export const sequenciamentoEquipes = [
  { equipe: "Fundação", inicio: 1, fim: 4, status: "concluido" as const },
  { equipe: "Estrutura", inicio: 3, fim: 8, status: "em_andamento" as const },
  { equipe: "Alvenaria", inicio: 6, fim: 12, status: "em_andamento" as const },
  { equipe: "Inst. Elétricas", inicio: 8, fim: 14, status: "planejado" as const },
  { equipe: "Inst. Hidráulicas", inicio: 9, fim: 15, status: "planejado" as const },
  { equipe: "Reboco", inicio: 12, fim: 18, status: "planejado" as const },
  { equipe: "Pintura", inicio: 16, fim: 20, status: "planejado" as const },
];

export const riscos = [
  { risco: "Atraso na entrega de aço", severidade: "alta" as const, impacto: "3 dias de parada na estrutura", prazo: "5 dias" },
  { risco: "Chuvas previstas semana 12", severidade: "media" as const, impacto: "Redução de 40% na produção externa", prazo: "8 dias" },
  { risco: "Vencimento de ART do engenheiro", severidade: "alta" as const, impacto: "Paralisação total da obra", prazo: "12 dias" },
];

export const retrabalhos = [
  { etapa: "Alvenaria", quantidade: 4 },
  { etapa: "Reboco", quantidade: 3 },
  { etapa: "Elétrica", quantidade: 2 },
  { etapa: "Hidráulica", quantidade: 2 },
  { etapa: "Pintura", quantidade: 1 },
];

// ===== ANÁLISE CONTÍNUA (Financeiro) =====
export const financeiroKPIs = {
  entradasProjetadas: 450000,
  saidasProjetadas: 380000,
  saldoProjetado: 70000,
  economizadoSemana: 12500,
  margemAtual: 15.6,
  margemMinima: 10,
};

export const evolucaoFinanceira = [
  { mes: "Set", receita: 120000, custo: 95000, lucro: 25000 },
  { mes: "Out", receita: 180000, custo: 155000, lucro: 25000 },
  { mes: "Nov", receita: 250000, custo: 210000, lucro: 40000 },
  { mes: "Dez", receita: 320000, custo: 280000, lucro: 40000 },
  { mes: "Jan", receita: 400000, custo: 345000, lucro: 55000 },
  { mes: "Fev", receita: 480000, custo: 420000, lucro: 60000 },
  { mes: "Mar", receita: 530000, custo: 460000, lucro: 70000 },
];

export const fornecedores = [
  { nome: "Votorantim Cimentos", valor: 45000, status: "pago" as const },
  { nome: "ArcelorMittal", valor: 78000, status: "pendente" as const },
  { nome: "Tigre Tubos", valor: 12000, status: "pago" as const },
  { nome: "Quartzolit", valor: 8500, status: "atrasado" as const },
  { nome: "Gerdau Aços", valor: 34000, status: "pendente" as const },
  { nome: "Suvinil Tintas", valor: 6200, status: "pago" as const },
];

// ===== SEGURANÇA & QUALIDADE =====
export const segurancaKPIs = {
  diasSemAcidente: 47,
  inspecoesAprovadasPercent: 89,
  naoConformidadesAbertas: 5,
  naoConformidadesResolvidas: 18,
};

// ===== FILTERS =====
export const obras = [
  "Residencial Vila Nova",
  "Comercial Centro",
  "Industrial Zona Sul",
];

export const equipes = [
  "Equipe Alpha",
  "Equipe Bravo",
  "Equipe Charlie",
];
