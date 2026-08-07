import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, CheckCircle2, XCircle, HelpCircle, ArrowLeft, MessageCircle, LogIn } from "lucide-react";

const whatsapp = "5594992193129";

const statusConfig: Record<string, { icon: typeof Clock; color: string; title: string; message: string }> = {
  aguardando_aprovacao: {
    icon: Clock,
    color: "text-chart-4",
    title: "Cadastro em análise",
    message: "Seu cadastro está sendo analisado pela nossa equipe. Você será notificado quando sua conta for aprovada.",
  },
  lista_de_espera: {
    icon: HelpCircle,
    color: "text-muted-foreground",
    title: "Lista de espera",
    message: "Todas as vagas foram preenchidas. Você está na fila de espera e será avisado quando abrirmos novas vagas.",
  },
  aprovado: {
    icon: CheckCircle2,
    color: "text-status-ok",
    title: "Acesso liberado!",
    message: "Seu acesso ao beta foi aprovado. Faça login para acessar o sistema.",
  },
  rejeitado: {
    icon: XCircle,
    color: "text-destructive",
    title: "Cadastro não aprovado",
    message: "Infelizmente seu cadastro não foi aprovado neste momento. Entre em contato para mais informações.",
  },
};

export default function BetaStatusPage() {
  const [betaEntry, setBetaEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkEmail, setCheckEmail] = useState("");
  const [searched, setSearched] = useState(false);

  const searchStatus = async (email: string) => {
    if (!email.trim()) return;
    setLoading(true);
    const { data } = await (supabase as any).rpc("get_beta_status_by_email", {
      _email: email.trim().toLowerCase(),
    });
    const row = Array.isArray(data) ? data[0] : data;
    setBetaEntry(row || null);
    setSearched(true);
    setLoading(false);
  };

  // Check if user is logged in and auto-search
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setCheckEmail(session.user.email);
        searchStatus(session.user.email);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const config = betaEntry ? statusConfig[betaEntry.status] || statusConfig.aguardando_aprovacao : null;
  const Icon = config?.icon || HelpCircle;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {!searched && !loading && (
          <>
            <h1 className="text-2xl font-bold">Verificar Status do Beta</h1>
            <p className="text-muted-foreground text-sm">Informe seu email para verificar o status do seu cadastro.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); searchStatus(checkEmail); }}
              className="space-y-3"
            >
              <input
                type="email"
                value={checkEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" className="w-full">Verificar</Button>
            </form>
          </>
        )}

        {loading && (
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        )}

        {searched && !loading && !betaEntry && (
          <>
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <HelpCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Cadastro não encontrado</h1>
            <p className="text-muted-foreground">
              Não encontramos um cadastro beta com este email. Cadastre-se na lista de espera.
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/beta"><Button className="w-full gap-2">Participar do Beta</Button></Link>
              <Link to="/landing"><Button variant="outline" className="w-full gap-2"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Button></Link>
            </div>
          </>
        )}

        {searched && !loading && betaEntry && config && (
          <>
            <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto`}>
              <Icon className={`h-8 w-8 ${config.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{betaEntry.nome}</p>
              <h1 className="text-2xl font-bold">{config.title}</h1>
            </div>
            <p className="text-muted-foreground">{config.message}</p>
            <p className="text-xs text-muted-foreground">
              Cadastrado em {new Date(betaEntry.created_at).toLocaleDateString("pt-BR")}
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {betaEntry.status === "aprovado" && (
                <Link to="/login"><Button className="w-full gap-2"><LogIn className="h-4 w-4" /> Fazer Login</Button></Link>
              )}
              <Button variant="outline" className="w-full gap-2" asChild>
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de informações sobre meu cadastro beta.\nEmail: ${betaEntry.email}\nNome: ${betaEntry.nome}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> Contatar Suporte
                </a>
              </Button>
              <Link to="/landing">
                <Button variant="ghost" className="w-full gap-2"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
