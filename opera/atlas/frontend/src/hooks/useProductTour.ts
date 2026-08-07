import { useState, useCallback, useEffect } from "react";

export interface TourStep {
  target: string; // CSS selector or data-tour attribute
  title: string;
  content: string;
  placement: "top" | "bottom" | "left" | "right" | "center";
  action?: string; // optional navigation
}

const TOUR_STEPS: TourStep[] = [
  {
    target: "[data-tour='welcome']",
    title: "Bem-vindo ao O.P.E.R.A.! 🎯",
    content: "Este é o seu painel inteligente para gestão de obras. Vamos conhecer as principais funcionalidades em poucos passos.",
    placement: "center",
  },
  {
    target: "[data-tour='sidebar']",
    title: "Menu de Navegação",
    content: "Aqui você acessa todos os módulos: Organização, Padronização, Eficiência, Redução de Perdas e Análise Contínua.",
    placement: "right",
  },
  {
    target: "[data-tour='global-filters']",
    title: "Filtros Globais",
    content: "Selecione a obra e o período para filtrar todos os dados do dashboard automaticamente.",
    placement: "bottom",
  },
  {
    target: "[data-tour='opera-score']",
    title: "Score O.P.E.R.A.",
    content: "O indicador principal que resume a saúde da sua obra em uma nota de 0 a 100, calculada a partir dos 5 pilares.",
    placement: "bottom",
  },
  {
    target: "[data-tour='kpi-row']",
    title: "KPIs em Tempo Real",
    content: "Acompanhe saldo financeiro, dias sem acidente, absenteísmo e outros indicadores críticos de relance.",
    placement: "top",
  },
  {
    target: "[data-tour='module-nav']",
    title: "Módulos O.P.E.R.A.",
    content: "Cada letra representa um pilar da metodologia. Clique para acessar o módulo detalhado com tabelas e formulários.",
    placement: "top",
  },
  {
    target: "[data-tour='onboarding-guide']",
    title: "Guia de Configuração",
    content: "Siga os 6 passos para configurar sua primeira obra: cadastrar obra, adicionar colaboradores, registrar produção e mais.",
    placement: "bottom",
  },
  {
    target: "[data-tour='export-pdf']",
    title: "Exportar Relatório PDF",
    content: "Gere um relatório completo com todos os indicadores para compartilhar com sua equipe ou investidores.",
    placement: "bottom",
  },
];

const TOUR_KEY = "opera_tour_completed";

export function useProductTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(() => {
    return localStorage.getItem(TOUR_KEY) === "true";
  });

  const steps = TOUR_STEPS;

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeTour();
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const completeTour = useCallback(() => {
    setIsActive(false);
    setHasCompleted(true);
    localStorage.setItem(TOUR_KEY, "true");
  }, []);

  const skipTour = useCallback(() => {
    completeTour();
  }, [completeTour]);

  // Auto-start for first-time users
  useEffect(() => {
    if (!hasCompleted) {
      const timer = setTimeout(() => startTour(), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasCompleted, startTour]);

  return {
    isActive,
    currentStep,
    steps,
    hasCompleted,
    startTour,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
  };
}
