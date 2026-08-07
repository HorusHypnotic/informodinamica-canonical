import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Users, Package, Wrench, ShieldAlert, TrendingUp,
  Check, ArrowRight, Phone, Mail, MapPin,
  BarChart3, Shield, Zap, Brain, ChevronRight,
  Star, CheckCircle2, Building2, MessageCircle, Rocket,
  AlertTriangle, Eye, Target,
} from "lucide-react";

const whatsapp = "5594992193129";

// ── FAQ Data ──
const faqCategories = [
  {
    icon: "💰",
    title: "Custo e valor",
    items: [
      {
        q: "Isso não fica caro?",
        a: "Não é custo de acompanhamento, é controle de desvio. Em obra, pequenos erros de execução e compra normalmente geram perdas maiores do que o próprio sistema evita.",
      },
      {
        q: "Não cabe no orçamento da obra.",
        a: "Na prática, isso não entra como custo adicional da obra, entra como camada de controle para evitar estouro de orçamento ao longo da execução.",
      },
      {
        q: "Consigo alguém mais barato.",
        a: "Sim. A diferença não é preço de execução, é capacidade de enxergar desvio de custo e prazo antes dele virar prejuízo.",
      },
    ],
  },
  {
    icon: "🧱",
    title: "Estrutura atual da obra",
    items: [
      {
        q: "Já tenho engenheiro.",
        a: "Isso cobre bem a execução. O O.P.E.R.A. atua na camada de acompanhamento contínuo de custo, prazo e desvio ao longo da obra.",
      },
      {
        q: "Já tenho mestre de obra.",
        a: "Ótimo para execução diária. O sistema organiza os dados da obra para transformar execução em leitura financeira e operacional.",
      },
      {
        q: "Já uso planilhas.",
        a: "Planilhas registram. O O.P.E.R.A. compara, cruza e sinaliza quando algo começa a sair do padrão ao longo do tempo.",
      },
    ],
  },
  {
    icon: "❓",
    title: "Necessidade",
    items: [
      {
        q: "Minha obra está sob controle.",
        a: "Esse é o cenário mais comum antes de aparecer desvio de custo ou prazo. O foco é justamente identificar isso antes de virar problema.",
      },
      {
        q: "Não vejo necessidade disso.",
        a: "Normalmente a necessidade só fica visível quando já existe impacto em custo ou atraso na obra.",
      },
      {
        q: "Não é prioridade agora.",
        a: "Em obra, controle raramente vira prioridade antes do problema aparecer. O custo normalmente vem depois da decisão.",
      },
    ],
  },
  {
    icon: "⏱️",
    title: "Timing",
    items: [
      {
        q: "Agora não é o momento.",
        a: "Quanto mais a obra avança sem controle contínuo, mais difícil fica corrigir desvio depois.",
      },
      {
        q: "Depois a gente vê.",
        a: "Funciona melhor no início da obra, antes de acumular erro de execução e custo.",
      },
    ],
  },
  {
    icon: "🧠",
    title: "Entendimento do sistema",
    items: [
      {
        q: "Como funciona exatamente?",
        a: "Acompanha a obra de forma contínua, organizando custo, prazo e execução para identificar desvio antes de virar prejuízo.",
      },
      {
        q: "Nunca vi isso antes.",
        a: "Normal. Não é uma ferramenta isolada, é uma camada de controle aplicada diretamente na operação da obra.",
      },
      {
        q: "Tem resultado comprovado?",
        a: "Os ganhos mais comuns estão em redução de desperdício e antecipação de problemas que normalmente só seriam percebidos tarde.",
      },
    ],
  },
  {
    icon: "🏗️",
    title: "Controle interno",
    items: [
      {
        q: "Eu já acompanho isso internamente.",
        a: "A diferença está na consolidação contínua e comparativa dos dados da obra ao longo do tempo.",
      },
      {
        q: "Minha obra já é organizada.",
        a: "Organização não garante visibilidade de desvio durante a execução.",
      },
    ],
  },
  {
    icon: "📊",
    title: "Comparação",
    items: [
      {
        q: "Outro faz mais barato.",
        a: "O ponto não é execução do serviço, é profundidade de leitura de desvio e antecipação de risco.",
      },
      {
        q: "Já existe software disso.",
        a: "Ferramenta sozinha registra dados. O O.P.E.R.A. transforma dados em leitura de obra e alerta operacional.",
      },
    ],
  },
  {
    icon: "🔄",
    title: "Decisão",
    items: [
      {
        q: "Preciso falar com alguém.",
        a: "Importante considerar também risco de custo e prazo, que normalmente impactam diretamente a decisão final.",
      },
      {
        q: "Vou analisar.",
        a: "Posso te enviar um resumo direto aplicado na sua obra para facilitar essa análise.",
      },
    ],
  },
];

// ── Pricing Packages ──
const packages = [
  {
    name: "Essencial",
    subtitle: "Controle básico de obra",
    price: "Sob consulta",
    highlight: false,
    features: [
      "Controle de diárias e produtividade",
      "Consumo de materiais (real vs. previsto)",
      "Mapeamento de ativos e equipamentos",
      "Mapa de riscos operacionais",
      "Dashboard com KPIs básicos",
      "Checklist semanal O.P.E.R.A.",
    ],
    cta: "Começar agora",
  },
  {
    name: "Gestão",
    subtitle: "Para quem quer controle total",
    price: "Sob consulta",
    highlight: true,
    features: [
      "Tudo do pacote Essencial",
      "Análise financeira (fluxo de caixa)",
      "Controle de aditivos e desvios",
      "Sequenciamento (Linha de Balanço)",
      "Inspeção de retrabalhos",
      "Ações corretivas com acompanhamento",
      "Logística interna e ciclos de tarefa",
      "Relatório PDF exportável",
    ],
    cta: "Mais popular",
  },
  {
    name: "Estratégico",
    subtitle: "Inteligência preditiva",
    price: "Sob consulta",
    highlight: false,
    features: [
      "Tudo do pacote Gestão",
      "Previsão de atrasos com IA",
      "Score O.P.E.R.A. automatizado",
      "Alertas preditivos de desperdício",
      "Análise de ranking de produtividade",
      "Consultoria operacional mensal",
      "Suporte prioritário",
    ],
    cta: "Falar com consultor",
  },
];

const operaPillars = [
  { letter: "O", name: "Organização", desc: "Controle de mão de obra, diárias e produtividade por frente de serviço.", icon: Users, color: "from-blue-500 to-blue-600" },
  { letter: "P", name: "Padronização", desc: "Gestão de insumos, consumo real vs. previsto e compras emergenciais.", icon: Package, color: "from-amber-500 to-amber-600" },
  { letter: "E", name: "Eficiência", desc: "Mapeamento de ativos, logística interna e análise de ciclo de tarefa.", icon: Wrench, color: "from-emerald-500 to-emerald-600" },
  { letter: "R", name: "Redução de Perdas", desc: "Linha de Balanço, retrabalhos, mapa de riscos e improdutividade.", icon: ShieldAlert, color: "from-red-500 to-red-600" },
  { letter: "A", name: "Análise Contínua", desc: "Fluxo de caixa, margem, aditivos contratuais e ponto de ruptura.", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
];

const stats = [
  { value: "20-49%", label: "Redução de custos comprovada" },
  { value: "8-11", label: "Frentes simultâneas gerenciadas" },
  { value: "150+", label: "Fornecedores na rede" },
  { value: "5+", label: "Anos de experiência em campo" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", empresa: "", mensagem: "" });
  const [sending, setSending] = useState(false);
  const [vagasRestantes, setVagasRestantes] = useState<number | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState(0);

  useEffect(() => {
    import("@/integrations/supabase/client").then(({ supabase }) => {
      Promise.all([
        supabase.from("beta_config").select("limite_vagas, beta_ativo").limit(1).maybeSingle(),
        (supabase as any).rpc("get_beta_vagas_ocupadas"),
      ]).then(([configRes, vagasRes]: any[]) => {
        if (configRes.data?.beta_ativo) {
          const usado = (vagasRes.data as number) ?? 0;
          setVagasRestantes(Math.max(0, (configRes.data.limite_vagas ?? 5) - usado));
        }
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha ao menos nome e telefone.");
      return;
    }
    setSending(true);

    const msg = encodeURIComponent(
      `Olá Eduardo! Vim pelo site O.P.E.R.A.\n\n` +
      `*Nome:* ${form.nome.trim()}\n` +
      `*Email:* ${form.email.trim() || "—"}\n` +
      `*Telefone:* ${form.telefone.trim()}\n` +
      `*Empresa:* ${form.empresa.trim() || "—"}\n` +
      `*Mensagem:* ${form.mensagem.trim() || "Quero saber mais sobre o sistema"}`
    );
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
    toast.success("Redirecionando para o WhatsApp...");
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">
              OP
            </div>
            <span className="font-bold text-sm tracking-tight">O.P.E.R.A. Control</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#problema" className="hover:text-foreground transition-colors">O Problema</a>
            <a href="#metodo" className="hover:text-foreground transition-colors">Método</a>
            <a href="#faq" className="hover:text-foreground transition-colors">Dúvidas</a>
            <a href="#planos" className="hover:text-foreground transition-colors">Planos</a>
            <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
            <button onClick={() => navigate("/beta")} className="text-primary font-semibold hover:text-primary/80 transition-colors">Beta</button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Entrar</Button>
            <Button size="sm" className="gap-1" onClick={() => navigate("/beta")}>
              Demo grátis <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <Zap className="h-3.5 w-3.5" /> Camada de controle operacional de obra
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Controle de obra que mostra o{" "}
            <span className="text-primary">desvio</span> antes dele virar{" "}
            <span className="text-primary">prejuízo</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Redução de desvio de custo e prazo durante a execução da obra.
            O O.P.E.R.A. transforma execução em leitura contínua de custo, prazo e produtividade.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="gap-2 text-base px-8" onClick={() => navigate("/beta")}>
              <Rocket className="h-4 w-4" /> Participar do Beta
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8" onClick={() => navigate("/login")}>
              Experimentar grátis <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" className="gap-2 text-base px-8" asChild>
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Quero saber mais sobre o O.P.E.R.A. Control")}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
          {vagasRestantes !== null && (
            <p className="mt-4 text-sm text-muted-foreground">
              {vagasRestantes > 0 ? (
                <>🔥 Apenas <span className="text-primary font-bold">{vagasRestantes} vagas</span> disponíveis para o Beta</>
              ) : (
                <>⏳ Beta lotado — entre na lista de espera</>
              )}
            </p>
          )}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Real Problem ── */}
      <section id="problema" className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              O problema que <span className="text-primary">ninguém vê a tempo</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Obra não perde dinheiro no final — perde todos os dias em pequenos desvios invisíveis.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Micro desvios diários",
                desc: "Obra não estoura de uma vez. Estoura em pequenas perdas acumuladas que ninguém percebe enquanto acontecem.",
              },
              {
                icon: Eye,
                title: "Invisibilidade do problema",
                desc: "Ninguém percebe o desvio enquanto ele acontece. Quando aparece, já virou custo real.",
              },
              {
                icon: Target,
                title: "Reação tardia",
                desc: "O problema aparece tarde demais — quando já virou prejuízo consolidado e difícil de reverter.",
              },
            ].map((f) => (
              <div key={f.title} className="glass-card p-8 text-center border-destructive/20">
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-5">
                  <f.icon className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What O.P.E.R.A. Does ── */}
      <section className="py-20 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">O que o O.P.E.R.A. faz</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Transforma execução em leitura contínua de custo, prazo e produtividade.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: "Leitura contínua da obra", desc: "Dados organizados e comparados ao longo do tempo. Não apenas registros — leitura operacional e financeira em tempo real." },
              { icon: Shield, title: "Controle antecipado de desvio", desc: "Identifica desvios de custo e prazo antes de virarem prejuízo. Alertas de ruptura e ponto de equilíbrio." },
              { icon: Brain, title: "Menos surpresa financeira", desc: "Previsão de atrasos, ranking de produtividade e detecção de desperdício. Decisão com dados, não com achismo." },
            ].map((f) => (
              <div key={f.title} className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── O.P.E.R.A. Method ── */}
      <section id="metodo" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              O Método <span className="text-primary">O.P.E.R.A.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              5 pilares que cobrem 100% da operação da sua obra — da mão de obra ao financeiro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {operaPillars.map((p) => (
              <div key={p.letter} className="glass-card p-6 group hover:border-primary/30 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-black text-xl mb-4 group-hover:scale-110 transition-transform`}>
                  {p.letter}
                </div>
                <h3 className="font-bold mb-2">{p.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Dinâmico ── */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Perguntas que toda obra faz
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Respostas diretas, sem enrolação. Clique na categoria para explorar.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {faqCategories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveFaqCategory(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFaqCategory === i
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="glass-card p-6 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqCategories[activeFaqCategory].items.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="planos" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Planos & Pacotes</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Escolha o nível de controle ideal para sua operação.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border p-8 flex flex-col transition-all ${
                  pkg.highlight
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.02]"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {pkg.highlight && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold self-start mb-4">
                    <Star className="h-3 w-3" /> Recomendado
                  </div>
                )}
                <h3 className="text-xl font-black">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.subtitle}</p>
                <p className="text-2xl font-black text-primary mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-status-ok shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full gap-2 ${pkg.highlight ? "" : "variant-outline"}`}
                  variant={pkg.highlight ? "default" : "outline"}
                  asChild
                >
                  <a href="#contato">
                    {pkg.cta} <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="sobre" className="py-20 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-black text-2xl mb-6">
                EM
              </div>
              <h2 className="text-3xl font-black mb-4">Eduardo Martins</h2>
              <p className="text-sm text-primary font-semibold mb-4">
                Gestão Operacional de Obras | Controle de Custos | Supply & Process Structuring
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Especialista em gestão operacional com experiência na coordenação simultânea de 8 a 11 frentes ativas,
                integrando execução de campo, planejamento estratégico, controle financeiro e cadeia de suprimentos.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Desenvolvimento de sistema próprio de cotação estratégica com reduções de custo entre 20% e 49%.
                Perfil orientado a dados, eficiência e tomada de decisão com impacto financeiro direto.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Gestão Multi-frentes", "Supply Chain", "Linha de Balanço", "DRE Operacional", "Controle de Custos"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4">Especialidades de campo</h3>
              {["Piso polido industrial", "Calçadas estruturadas", "Estrutura metálica", "Pré-moldados", "Alvenaria estrutural/vedação", "Fachadas e Galpões comerciais"].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Building2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contato" className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Solicite uma demonstração</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Preencha o formulário ou entre em contato diretamente. Resposta em até 24h.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Nome *</label>
                <Input
                  placeholder="Seu nome completo"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email</label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Telefone / WhatsApp *</label>
                <Input
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  maxLength={20}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Empresa / Construtora</label>
                <Input
                  placeholder="Nome da empresa"
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Mensagem</label>
                <Textarea
                  placeholder="Conte sobre sua necessidade..."
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  rows={3}
                  maxLength={1000}
                />
              </div>
              <Button type="submit" className="w-full gap-2" size="lg" disabled={sending}>
                <MessageCircle className="h-4 w-4" /> Enviar via WhatsApp
              </Button>
            </form>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-bold mb-4">Contato direto</h3>
                <div className="space-y-4">
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium">(94) 99219-3129</p>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                    </div>
                  </a>
                  <a href="mailto:canteirodeobrasdigital@gmail.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">canteirodeobrasdigital@gmail.com</p>
                      <p className="text-xs text-muted-foreground">Email</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium">Redenção — PA</p>
                      <p className="text-xs text-muted-foreground">Atendimento remoto/híbrido</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-bold mb-3">Por que agendar?</h3>
                <ul className="space-y-2">
                  {[
                    "Demonstração personalizada do sistema",
                    "Diagnóstico gratuito da sua operação",
                    "Proposta sob medida para sua empresa",
                    "Sem compromisso — conheça antes de contratar",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-status-ok shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            "Obra não perde dinheiro no final — perde todos os dias."
          </h2>
          <p className="text-muted-foreground mb-8">O controle começa antes do prejuízo.</p>
          <Button size="lg" className="gap-2 text-base px-8" onClick={() => navigate("/login")}>
            Começar agora <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center font-bold text-primary-foreground text-xs">OP</div>
            <span className="text-sm font-bold">O.P.E.R.A. Control</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Eduardo Martins — Gestão Operacional de Obras. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
