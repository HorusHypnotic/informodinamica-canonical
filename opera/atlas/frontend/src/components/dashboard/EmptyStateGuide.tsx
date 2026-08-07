import { useNavigate } from "react-router-dom";
import { Building2, Users, Package, Wrench, DollarSign, ShieldAlert, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateGuideProps {
  hasObras: boolean;
  hasRegistros: boolean;
  hasConsumo: boolean;
  hasAtivos: boolean;
  hasLancamentos: boolean;
  hasColaboradores: boolean;
}

const steps = [
  { key: "obras", label: "Cadastrar uma obra", desc: "Crie seu primeiro projeto com orçamento, prazos e responsável", icon: Building2, url: "/obras", done: false },
  { key: "colaboradores", label: "Adicionar colaboradores", desc: "Cadastre sua equipe com diárias e turnos", icon: Users, url: "/colaboradores", done: false },
  { key: "registros", label: "Registrar produção diária", desc: "Adicione registros de mão de obra e atividades", icon: Users, url: "/organizacao", done: false },
  { key: "consumo", label: "Controlar materiais", desc: "Compare consumo real vs. previsto", icon: Package, url: "/padronizacao", done: false },
  { key: "ativos", label: "Mapear equipamentos", desc: "Registre ativos, localização e status", icon: Wrench, url: "/eficiencia", done: false },
  { key: "lancamentos", label: "Lançar receitas e custos", desc: "Registre o fluxo financeiro da obra", icon: DollarSign, url: "/analise-continua", done: false },
];

export function EmptyStateGuide(props: EmptyStateGuideProps) {
  const navigate = useNavigate();

  const stepsWithStatus = steps.map(s => ({
    ...s,
    done: s.key === "obras" ? props.hasObras :
          s.key === "colaboradores" ? props.hasColaboradores :
          s.key === "registros" ? props.hasRegistros :
          s.key === "consumo" ? props.hasConsumo :
          s.key === "ativos" ? props.hasAtivos :
          s.key === "lancamentos" ? props.hasLancamentos : false,
  }));

  const completedCount = stepsWithStatus.filter(s => s.done).length;
  const allDone = completedCount === stepsWithStatus.length;
  const progress = (completedCount / stepsWithStatus.length) * 100;

  if (allDone) return null;

  const nextStep = stepsWithStatus.find(s => !s.done);

  return (
    <div className="glass-card p-6 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 opacity-5">
        <Rocket className="w-full h-full" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Configure sua obra em 6 passos</h3>
            <p className="text-xs text-muted-foreground">{completedCount} de {stepsWithStatus.length} concluídos</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-secondary mb-5 overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {stepsWithStatus.map((step) => (
            <button
              key={step.key}
              onClick={() => navigate(step.url)}
              disabled={step.done}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${
                step.done
                  ? "border-status-ok/30 bg-status-ok/5 opacity-60"
                  : step === nextStep
                  ? "border-primary/50 bg-primary/5 hover:bg-primary/10 ring-1 ring-primary/20"
                  : "border-border hover:border-primary/30 hover:bg-secondary/50"
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                step.done ? "bg-status-ok/20 text-status-ok" : "bg-primary/20 text-primary"
              }`}>
                {step.done ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <step.icon className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-medium ${step.done ? "line-through text-muted-foreground" : ""}`}>{step.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {nextStep && (
          <div className="mt-4 flex justify-center">
            <Button size="sm" className="gap-1.5" onClick={() => navigate(nextStep.url)}>
              {nextStep.label} <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
