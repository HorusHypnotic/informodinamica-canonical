import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { useTableData } from "@/hooks/useTableData";
import { useObra } from "@/hooks/useObra";
import { useAuth } from "@/hooks/useAuth";
import { ListChecks, ChevronLeft, ChevronRight, CheckCircle2, Circle, MessageSquare, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// ── Checklist items from the O.P.E.R.A. PDF ──
const CHECKLIST_ITEMS = [
  {
    pilar: "O", pilarName: "Organização & Mão de Obra", color: "bg-blue-500/15 text-blue-400",
    items: [
      { key: "o1", label: "Controle de Diárias Individual", desc: "Verificar se todos os colaboradores registraram entrada/saída e atividade." },
      { key: "o2", label: "Produção por Frente de Serviço", desc: "Medir o avanço físico real de cada equipe nas últimas 24h/semana." },
      { key: "o3", label: "Cálculo de Custo por m² Executado", desc: "Dividir o custo da equipe pela metragem real produzida no período." },
      { key: "o4", label: "KPI: Custo Real vs. Orçado", desc: "Verificar desvio percentual entre custo real e orçamento." },
    ],
  },
  {
    pilar: "P", pilarName: "Padronização & Insumos", color: "bg-amber-500/15 text-amber-400",
    items: [
      { key: "p1", label: "Conferência de Estoque Crítico", desc: "Verificar se materiais para os próximos 7 dias estão garantidos em canteiro." },
      { key: "p2", label: "Análise de Consumo Real vs. Previsto", desc: "Cruzar notas fiscais de saída de estoque com a produção da etapa." },
      { key: "p3", label: "Identificação de Compras Emergenciais", desc: "Listar itens comprados fora do planejamento e o motivo." },
      { key: "p4", label: "KPI: % de Perda/Desperdício", desc: "Meta: < 5%. Verificar índice atual." },
    ],
  },
  {
    pilar: "E", pilarName: "Eficiência & Ativos", color: "bg-emerald-500/15 text-emerald-400",
    items: [
      { key: "e1", label: "Mapeamento de Ferramentas/Equipamentos", desc: "Identificar ferramentas ociosas que podem ser realocadas ou devolvidas." },
      { key: "e2", label: "Logística Interna e Deslocamento", desc: "Observar se o tempo de movimentação da equipe está drenando produtividade." },
      { key: "e3", label: "Análise de Ciclo de Tarefa", desc: "Cronometrar etapas repetitivas para identificar lentidão sistêmica." },
      { key: "e4", label: "KPI: Valor de Ativos Parados", desc: "Totalizar o valor em R$ de equipamentos ociosos." },
    ],
  },
  {
    pilar: "R", pilarName: "Redução de Perdas & Gargalos", color: "bg-red-500/15 text-red-400",
    items: [
      { key: "r1", label: "Sequenciamento (Linha de Balanço)", desc: "Garantir que a equipe 'A' não está travando o início da equipe 'B'." },
      { key: "r2", label: "Inspeção de Retrabalho", desc: "Identificar falhas técnicas imediatas para evitar demolição/correção futura." },
      { key: "r3", label: "Mapa de Risco Operacional", desc: "Listar os 3 maiores riscos para o cronograma nos próximos 15 dias." },
      { key: "r4", label: "KPI: Índice de Improdutividade", desc: "Meta: < 15%. Verificar índice atual." },
    ],
  },
  {
    pilar: "A", pilarName: "Análise Contínua & Financeiro", color: "bg-purple-500/15 text-purple-400",
    items: [
      { key: "a1", label: "Projeção de Fluxo de Caixa (30 dias)", desc: "As entradas previstas cobrem as folhas e fornecedores do mês?" },
      { key: "a2", label: "Atualização do Painel de Economia", desc: "Quanto em R$ foi economizado nesta semana via gestão?" },
      { key: "a3", label: "Ponto de Ruptura Financeira", desc: "Identificar se a obra está consumindo margem de lucro antecipada." },
      { key: "a4", label: "Controle de Aditivos e Desvios", desc: "Algum desvio técnico gerou custo extra não aprovado?" },
    ],
  },
];

const ALL_KEYS = CHECKLIST_ITEMS.flatMap((s) => s.items.map((i) => i.key));

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function formatWeekLabel(weekStart: string): string {
  const start = new Date(weekStart + "T12:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  return `${fmt(start)} — ${fmt(end)}`;
}

interface CheckItem {
  id: string;
  item_key: string;
  verificado: boolean;
  verificado_por: string | null;
  observacao: string | null;
  semana: string;
}

export default function ChecklistSemanalPage() {
  const { profile, isGuest } = useAuth();
  const { selectedObraId } = useObra();
  const { data: checks = [], insert, update } = useTableData<CheckItem>("checklist_semanal");

  const [weekOffset, setWeekOffset] = useState(0);
  const currentWeek = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + weekOffset * 7);
    return getWeekStart(d);
  }, [weekOffset]);

  const weekChecks = useMemo(
    () => checks.filter((c) => c.semana === currentWeek),
    [checks, currentWeek]
  );

  const checkedKeys = useMemo(
    () => new Set(weekChecks.filter((c) => c.verificado).map((c) => c.item_key)),
    [weekChecks]
  );

  const totalItems = ALL_KEYS.length;
  const checkedCount = checkedKeys.size;
  const progressPercent = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const getCheckRecord = (key: string) => weekChecks.find((c) => c.item_key === key);

  const handleToggle = async (key: string) => {
    const existing = getCheckRecord(key);
    if (existing) {
      await update(existing.id, {
        verificado: !existing.verificado,
        verificado_por: profile?.full_name || profile?.email || "—",
        updated_at: new Date().toISOString(),
      });
    } else {
      await insert({
        item_key: key,
        semana: currentWeek,
        verificado: true,
        verificado_por: profile?.full_name || profile?.email || "—",
      });
    }
  };

  const handleObservacao = async (key: string, obs: string) => {
    const existing = getCheckRecord(key);
    if (existing) {
      await update(existing.id, { observacao: obs, updated_at: new Date().toISOString() });
    } else {
      await insert({
        item_key: key,
        semana: currentWeek,
        verificado: false,
        observacao: obs,
      });
    }
    toast.success("Observação salva");
  };

  return (
    <div>
      <GlobalFilters />
      <SectionHeader
        title="Checklist Semanal O.P.E.R.A."
        subtitle="Verificação semanal de todos os itens do método"
        icon={<ListChecks className="h-5 w-5" />}
      />

      {/* Week navigator */}
      <div className="glass-card p-4 mb-6 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setWeekOffset((w) => w - 1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <p className="text-sm font-semibold">{formatWeekLabel(currentWeek)}</p>
          <p className="text-xs text-muted-foreground">
            {weekOffset === 0 ? "Semana atual" : weekOffset > 0 ? `+${weekOffset} semana(s)` : `${weekOffset} semana(s)`}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setWeekOffset((w) => w + 1)}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress summary */}
      <div className="glass-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Progresso da Semana</h3>
          <span className="text-sm font-mono font-semibold">
            {checkedCount}/{totalItems}{" "}
            <span className={`${progressPercent === 100 ? "text-status-ok" : progressPercent >= 50 ? "text-status-warning" : "text-muted-foreground"}`}>
              ({progressPercent.toFixed(0)}%)
            </span>
          </span>
        </div>
        <Progress value={progressPercent} className="h-3" />
        {progressPercent === 100 && (
          <p className="text-xs text-status-ok mt-2 font-semibold">✓ Checklist completo para esta semana!</p>
        )}
      </div>

      {/* History chart */}
      <ChecklistHistoryChart checks={checks} />

      {/* Checklist by pillar */}
      <div className="space-y-6">
        {CHECKLIST_ITEMS.map((section) => {
          const sectionChecked = section.items.filter((i) => checkedKeys.has(i.key)).length;
          const sectionTotal = section.items.length;
          return (
            <div key={section.pilar} className="glass-card overflow-hidden">
              {/* Pillar header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-lg font-bold text-lg flex items-center justify-center ${section.color}`}>
                    {section.pilar}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{section.pilarName}</h3>
                    <p className="text-xs text-muted-foreground">{sectionChecked}/{sectionTotal} verificados</p>
                  </div>
                </div>
                <div className="w-24">
                  <Progress value={(sectionChecked / sectionTotal) * 100} className="h-2" />
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-border/50">
                {section.items.map((item) => {
                  const checked = checkedKeys.has(item.key);
                  const record = getCheckRecord(item.key);
                  return (
                    <div
                      key={item.key}
                      className={`px-4 py-3 flex items-start gap-3 transition-colors ${checked ? "bg-status-ok/5" : "hover:bg-secondary/50"}`}
                    >
                      <button
                        onClick={() => handleToggle(item.key)}
                        className="mt-0.5 shrink-0 transition-transform hover:scale-110"
                      >
                        {checked ? (
                          <CheckCircle2 className="h-5 w-5 text-status-ok" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/40" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${checked ? "line-through text-muted-foreground" : ""}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        {record?.verificado_por && checked && (
                          <p className="text-[10px] text-muted-foreground/60 mt-1">
                            ✓ por {record.verificado_por}
                          </p>
                        )}
                        {record?.observacao && (
                          <p className="text-xs mt-1 p-2 rounded bg-secondary/80 text-muted-foreground italic">
                            💬 {record.observacao}
                          </p>
                        )}
                      </div>
                      <ObservacaoPopover
                        currentObs={record?.observacao || ""}
                        onSave={(obs) => handleObservacao(item.key, obs)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChecklistHistoryChart({ checks }: { checks: CheckItem[] }) {
  const historyData = useMemo(() => {
    const weeks: { week: string; label: string; percent: number }[] = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i * 7);
      const ws = getWeekStart(d);
      const weekChecks = checks.filter((c) => c.semana === ws && c.verificado);
      const pct = ALL_KEYS.length > 0 ? (weekChecks.length / ALL_KEYS.length) * 100 : 0;
      const start = new Date(ws + "T12:00:00");
      const label = start.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
      weeks.push({ week: ws, label, percent: Math.round(pct) });
    }
    return weeks;
  }, [checks]);

  const hasData = historyData.some((w) => w.percent > 0);
  if (!hasData) return null;

  return (
    <div className="glass-card p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Evolução Semanal</h3>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={historyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
            formatter={(v: number) => [`${v}%`, "Completude"]}
          />
          <Line type="monotone" dataKey="percent" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ObservacaoPopover({ currentObs, onSave }: { currentObs: string; onSave: (obs: string) => void }) {
  const [obs, setObs] = useState(currentObs);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) setObs(currentObs); }}>
      <PopoverTrigger asChild>
        <button className="shrink-0 mt-0.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors">
          <MessageSquare className={`h-4 w-4 ${currentObs ? "text-primary" : ""}`} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <p className="text-xs font-semibold mb-2">Observação de campo</p>
        <Textarea
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          placeholder="Escreva uma observação..."
          rows={3}
          className="text-sm"
        />
        <Button
          size="sm"
          className="mt-2 w-full"
          onClick={() => { onSave(obs); setOpen(false); }}
        >
          Salvar
        </Button>
      </PopoverContent>
    </Popover>
  );
}
