import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BarChart3, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OPERA Control — Diagnóstico operacional contínuo" },
      { name: "description", content: "OPERA Control: registre eventos, calcule ICO (campo), IR e Margem Corroída e antecipe riscos antes que virem prejuízo. Baseado na Teoria da Degradação Operacional." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold tracking-tight">OC</span>
            <span>OPERA Control</span>
          </Link>
          <Link to="/auth">
            <Button size="sm">Entrar</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Baseado na Teoria da Degradação Operacional
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Identifique a corrosão da sua operação antes que vire prejuízo.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Registre eventos, calcule ICO (campo), IR e Margem Corroída em tempo real, e transforme retrabalhos
              dispersos em diagnóstico estruturado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth">
                <Button size="lg">Começar agora</Button>
              </Link>
              <a href="#como-funciona">
                <Button size="lg" variant="outline">Como funciona</Button>
              </a>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="border-t bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">Três indicadores. Uma decisão.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Feature
                icon={<Activity className="h-5 w-5" />}
                title="ICO (campo) — Índice de Corrosão Operacional"
                body="Impacto × Recorrência × Persistência. Classifica cada evento de Verde a Preto."
              />
              <Feature
                icon={<BarChart3 className="h-5 w-5" />}
                title="IR — Índice de Reincidência"
                body="% da operação concentrada em poucas causas. Mostra se você trata sintoma ou causa."
              />
              <Feature
                icon={<Zap className="h-5 w-5" />}
                title="MC — Margem Corroída"
                body="Quanto a operação está perdendo por mês, acumulado e anualizado."
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                De problema disperso a diagnóstico executivo.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Cadastre as causas raiz da sua operação, registre os ECOs (Eventos de Corrosão
                Operacional) conforme acontecem e exporte um relatório PDF pronto para o C-level.
              </p>
              <div className="mt-6">
                <Link to="/auth"><Button>Criar conta gratuita</Button></Link>
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" /> Exemplo de cálculo
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <Metric label="Impacto" value="2" />
                <Metric label="Recorrência" value="5" />
                <Metric label="Persistência" value="4" />
              </div>
              <div className="mt-6 rounded-lg bg-ico-laranja p-5 text-center text-ico-laranja-fg">
                <div className="text-xs uppercase tracking-wide opacity-80">ICO (campo) calculado</div>
                <div className="num mt-1 text-4xl font-semibold">40</div>
                <div className="mt-1 text-sm font-medium">Laranja — intervenção em semanas</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          OPERA Control · MVP — Baseado na Teoria da Degradação Operacional (TDO)
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="num mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
