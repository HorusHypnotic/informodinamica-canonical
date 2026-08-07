import React, { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { 
  Github, 
  Menu, 
  X, 
  ExternalLink, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Loader2,
  AlertCircle,
  FileDown,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const GITHUB_REPO_URL = "https://github.com/HorusHypnotic/informodinamica-canonical";
const GITHUB_PAGES_URL = "https://horushypnotic.github.io/informodinamica-canonical/";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedObsId, setSelectedObsId] = useState<string | null>("OBS-0001");

  // Handle initial hash routing
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Fetch data from tRPC
  const { data: researchPackages, isLoading: loadingRps, error: errorRps } = trpc.tpc.getResearchPackages.useQuery();
  const { data: observations, isLoading: loadingObs, error: errorObs } = trpc.tpc.getObservations.useQuery();
  const { data: guidelines, isLoading: loadingGov, error: errorGov } = trpc.tpc.getGovernanceGuidelines.useQuery();
  const { data: selectedObservation, isLoading: loadingSelectedObs } = trpc.tpc.getObservationByObsId.useQuery(
    { obsId: selectedObsId || "OBS-0001" },
    { enabled: !!selectedObsId }
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header & Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-bold text-lg shadow-inner">
              Ψ
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-wide text-white">TPC</span>
              <span className="text-xs block text-slate-400 font-mono tracking-tight">Informodinâmica</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#overview" className="hover:text-emerald-400 transition-colors">Visão Geral</a>
            <a href="#research-packages" className="hover:text-emerald-400 transition-colors">Research Packages</a>
            <a href="#obs-index" className="hover:text-emerald-400 transition-colors">OBS Index</a>
            <a href="#governance" className="hover:text-emerald-400 transition-colors">Governança</a>
            <a href="#nova-observacao" className="text-emerald-400 hover:text-emerald-300 transition-colors">+ Nova Obs</a>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-medium text-xs"
              asChild
            >
              <a href={GITHUB_PAGES_URL} target="_blank" rel="noopener noreferrer">
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                GitHub Pages
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-700 bg-slate-900/50 text-slate-200 hover:bg-slate-800 hover:text-white text-xs"
              asChild
            >
              <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Repositório
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
            <a 
              href="#overview" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 text-sm font-medium"
            >
              Visão Geral
            </a>
            <a 
              href="#research-packages" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 text-sm font-medium"
            >
              Research Packages
            </a>
            <a 
              href="#obs-index" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 text-sm font-medium"
            >
              OBS Index
            </a>
            <a 
              href="#governance" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 text-sm font-medium"
            >
              Governança
            </a>
            <a 
              href="#nova-observacao" 
              className="block py-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              + Nova Observação
            </a>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a 
                href={GITHUB_PAGES_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-emerald-400 text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                Acessar Vitrine (GitHub Pages)
              </a>
              <a 
                href={GITHUB_REPO_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-slate-300 text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                Ver Código-fonte (Repositório)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="overview" className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Programa Científico Canônico • Fase 3 Ativa</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
              Teoria da Persistência da Coordenação <span className="text-emerald-400 font-sans italic font-normal text-3xl sm:text-5xl block sm:inline">(TPC)</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed mb-8">
              Uma investigação rigorosa sobre a informodinâmica de sistemas sociotécnicos, focada na persistência de representações, latências operacionais (<span className="font-mono text-emerald-400">T₀–T₄</span>) e mitigações de entropia em ambientes híbridos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-900/30"
                asChild
              >
                <a href={GITHUB_PAGES_URL} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  Acessar Vitrine (GitHub Pages)
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                asChild
              >
                <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2 text-emerald-400" />
                  Ver Código-fonte (GitHub)
                </a>
              </Button>
            </div>
          </div>

          {/* Status Panel of RPs */}
          <div id="research-packages" className="mt-16 pt-6">
            {loadingRps ? (
              <div className="flex items-center justify-center py-12 text-slate-400 gap-2 font-mono text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                Carregando painel de Research Packages...
              </div>
            ) : errorRps ? (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                Erro ao carregar o painel. Por favor, recarregue a página.
              </div>
            ) : researchPackages && researchPackages.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {researchPackages.map((rp) => (
                  <div 
                    key={rp.code}
                    id={rp.code.toLowerCase()}
                    className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-semibold text-emerald-400 text-sm">{rp.code}</span>
                        <Badge 
                          variant={rp.status === "Completo" ? "default" : "secondary"}
                          className={rp.status === "Completo" 
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-[10px]" 
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono text-[10px]"
                          }
                        >
                          {rp.status}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-medium text-white line-clamp-2 mb-2">{rp.title}</h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 font-mono mt-3">
                      <span>{rp.version}</span>
                      <a 
                        href={rp.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 font-mono text-sm">Nenhum Research Package encontrado.</div>
            )}
          </div>
        </div>
      </section>

      {/* Section: Research Packages Details */}
      <section className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">Módulos de Publicação</span>
              <h2 className="text-3xl font-serif font-bold text-white">Research Packages (Detalhes Oficiais)</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0">
              Cada pacote de pesquisa constitui uma unidade viva de conhecimento científico estruturada com escopo, claims, pressupostos e código versionado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchPackages?.map((rp) => (
              <Card key={rp.code} className="bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono text-emerald-400 text-sm font-bold">
                        {rp.code.replace("RP-", "")}
                      </div>
                      <span className="font-mono text-xs text-slate-400">{rp.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{rp.version}</span>
                      <Badge className={rp.status === "Completo" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"}>
                        {rp.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-serif text-white">{rp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-sm leading-relaxed">
                    {rp.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Repositório Canônico</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                    asChild
                  >
                    <a href={rp.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Ver Código-fonte <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section: OBS Index & Detailed Observation View */}
      <section id="obs-index" className="py-20 border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">Fase 3 • Evidências de Campo</span>
              <h2 className="text-3xl font-serif font-bold text-white">Índice de Observações de Campo (OBS Index)</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0">
              Corpus empírico padronizado com unidades observacionais (O1–O4), separando observação bruta e análise retrospectiva MET-006.
            </p>
          </div>

          {loadingObs ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            </div>
          ) : errorObs ? (
            <div className="text-red-400 text-center py-8">Erro ao carregar o índice de observações.</div>
          ) : (
            <div className="space-y-8">
              {/* Table Index with explicit columns: ID, Domínio, Tema, Tipo, Status */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-slate-400 tracking-wider">Tabela de Unidades Observacionais</span>
                  <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                    {observations?.length || 0} Registros
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-950/50">
                      <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="font-mono text-xs text-slate-400">ID</TableHead>
                        <TableHead className="font-mono text-xs text-slate-400">Domínio</TableHead>
                        <TableHead className="font-mono text-xs text-slate-400">Tema</TableHead>
                        <TableHead className="font-mono text-xs text-slate-400">Tipo</TableHead>
                        <TableHead className="font-mono text-xs text-slate-400">Status</TableHead>
                        <TableHead className="font-mono text-xs text-slate-400 text-right">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {observations?.map((obs) => (
                        <TableRow 
                          key={obs.obsId} 
                          className={`border-slate-800 cursor-pointer transition-colors ${selectedObsId === obs.obsId ? 'bg-emerald-500/10' : 'hover:bg-slate-850/60'}`}
                          onClick={() => setSelectedObsId(obs.obsId)}
                        >
                          <TableCell className="font-mono font-bold text-emerald-400">{obs.obsId}</TableCell>
                          <TableCell className="text-slate-200 text-sm">{obs.domain}</TableCell>
                          <TableCell className="text-slate-300 text-sm">{obs.theme}</TableCell>
                          <TableCell>
                            <span className="font-mono text-xs bg-slate-800 text-slate-200 px-2 py-0.5 rounded">
                              {obs.obsType}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                              {obs.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs h-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedObsId(obs.obsId);
                              }}
                            >
                              Ver Ficha <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Detailed Observation Standard Card View */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
                {selectedObservation ? (
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-lg font-bold text-emerald-400">{selectedObservation.obsId}</span>
                          <Badge className="bg-slate-800 text-slate-300 font-mono">Tipo {selectedObservation.obsType}</Badge>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono">{selectedObservation.status}</Badge>
                        </div>
                        <p className="text-sm text-slate-400">{selectedObservation.domain} — {selectedObservation.theme}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 font-mono text-xs"
                        onClick={() => {
                          const content = `# Ficha Observacional ${selectedObservation.obsId}
Domínio: ${selectedObservation.domain}
Tema: ${selectedObservation.theme}
Tipo: ${selectedObservation.obsType}
Resumo: ${selectedObservation.summary}
Fenômeno: ${selectedObservation.phenomenon}
Representações: ${selectedObservation.representations}
Agentes: ${selectedObservation.agents}
Canais: ${selectedObservation.channels}
Contradições: ${selectedObservation.contradictions}
Questões em Aberto: ${selectedObservation.openQuestions}`;
                          const blob = new Blob([content], { type: 'text/markdown' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${selectedObservation.obsId}.md`;
                          a.click();
                        }}
                      >
                        <FileDown className="w-3.5 h-3.5 mr-1.5" />
                        Exportar Markdown
                      </Button>
                    </div>

                    <div className="space-y-6 text-sm">
                      <div>
                        <h4 className="font-mono text-xs uppercase text-emerald-400 tracking-wider mb-1">Fenômeno Observado</h4>
                        <p className="text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800">{selectedObservation.phenomenon}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                          <h4 className="font-mono text-xs uppercase text-slate-400 tracking-wider mb-1">Representações Envolvidas</h4>
                          <p className="text-slate-300">{selectedObservation.representations}</p>
                        </div>
                        <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                          <h4 className="font-mono text-xs uppercase text-slate-400 tracking-wider mb-1">Agentes Envolvidos</h4>
                          <p className="text-slate-300">{selectedObservation.agents}</p>
                        </div>
                      </div>

                      <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                        <h4 className="font-mono text-xs uppercase text-slate-400 tracking-wider mb-1">Canais de Circulação</h4>
                        <p className="text-slate-300">{selectedObservation.channels}</p>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs uppercase text-emerald-400 tracking-wider mb-2">Hipóteses Concorrentes (Confronto de Paradigmas)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {Object.entries((selectedObservation.competingHypotheses as any) || {}).map(([key, val]: [string, any]) => (
                            <div key={key} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
                              <span className="font-mono font-bold text-emerald-300 uppercase block mb-1">{key}</span>
                              <p className="text-slate-300">{val}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                          <h4 className="font-mono text-xs uppercase text-amber-400 tracking-wider mb-1">Contradições Encontradas</h4>
                          <p className="text-slate-300 text-xs">{selectedObservation.contradictions}</p>
                        </div>
                        <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                          <h4 className="font-mono text-xs uppercase text-sky-400 tracking-wider mb-1">Questões em Aberto</h4>
                          <p className="text-slate-300 text-xs">{selectedObservation.openQuestions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">Selecione uma observação acima para ver a ficha detalhada.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section: Governance Guidelines */}
      <section id="governance" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-2">Diretrizes Ativas</span>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Governança Científica da TPC</h2>
            <p className="text-slate-400 text-sm">
              Mecanismos institucionais de proteção metodológica que garantem o rigor empírico, a imunidade à inflação conceitual e a falsificabilidade.
            </p>
          </div>

          {loadingGov ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            </div>
          ) : errorGov ? (
            <div className="text-red-400 text-center py-8">Erro ao carregar as diretrizes de governança.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guidelines?.map((item) => (
                <div key={item.slug} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-sm font-medium text-emerald-400 mb-3">{item.summary}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.content}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Status: Ativo</span>
                    <span>Fase 3</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-bold">
              Ψ
            </div>
            <div>
              <span className="font-serif font-bold text-white">Programa TPC</span>
              <span className="text-xs block text-slate-500 font-mono">Informodinâmica Canônica</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a href={GITHUB_PAGES_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> GitHub Pages
            </a>
            <span className="text-slate-700">•</span>
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-emerald-400" /> Repositório Oficial
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
