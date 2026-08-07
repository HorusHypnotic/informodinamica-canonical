import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type TourStep } from "@/hooks/useProductTour";

interface ProductTourProps {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function ProductTour({ isActive, currentStep, steps, onNext, onPrev, onSkip }: ProductTourProps) {
  const [targetRect, setTargetRect] = useState<Position | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const step = steps[currentStep];
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Track direction for animations
  const handleNext = useCallback(() => {
    setDirection(1);
    onNext();
  }, [onNext]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    onPrev();
  }, [onPrev]);

  useEffect(() => {
    if (!isActive || !step) return;

    const findTarget = () => {
      if (step.placement === "center") {
        setTargetRect(null);
        return;
      }

      const el = document.querySelector(step.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setTargetRect(null);
      }
    };

    const timer = setTimeout(findTarget, 200);
    window.addEventListener("resize", findTarget);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", findTarget);
    };
  }, [isActive, currentStep, step]);

  if (!isActive || !step) return null;

  const isCenter = step.placement === "center";
  const progress = ((currentStep + 1) / steps.length) * 100;

  const getTooltipPosition = () => {
    if (isCenter || !targetRect) {
      return { top: "50%", left: "50%", x: "-50%", y: "-50%", position: "fixed" as const };
    }

    const pad = 16;
    const tooltipW = 380;
    const tooltipH = 220;

    switch (step.placement) {
      case "bottom":
        return {
          position: "absolute" as const,
          top: targetRect.top + targetRect.height + pad,
          left: Math.max(pad, Math.min(targetRect.left + targetRect.width / 2 - tooltipW / 2, window.innerWidth - tooltipW - pad)),
        };
      case "top":
        return {
          position: "absolute" as const,
          top: targetRect.top - tooltipH - pad,
          left: Math.max(pad, Math.min(targetRect.left + targetRect.width / 2 - tooltipW / 2, window.innerWidth - tooltipW - pad)),
        };
      case "right":
        return {
          position: "absolute" as const,
          top: targetRect.top + targetRect.height / 2 - tooltipH / 2,
          left: targetRect.left + targetRect.width + pad,
        };
      case "left":
        return {
          position: "absolute" as const,
          top: targetRect.top + targetRect.height / 2 - tooltipH / 2,
          left: targetRect.left - tooltipW - pad,
        };
      default:
        return { top: "50%", left: "50%", x: "-50%", y: "-50%", position: "fixed" as const };
    }
  };

  const pos = getTooltipPosition();

  return createPortal(
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          role="dialog"
          aria-label="Tour do produto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Spotlight cutout with pulse */}
          <AnimatePresence mode="wait">
            {targetRect && !isCenter && (
              <motion.div
                key={`spotlight-${currentStep}`}
                className="absolute rounded-xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  top: targetRect.top - 8,
                  left: targetRect.left - 8,
                  width: targetRect.width + 16,
                  height: targetRect.height + 16,
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.6)",
                  border: "2px solid hsl(var(--primary) / 0.5)",
                  zIndex: 1,
                }}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 0px hsl(var(--primary) / 0.4)",
                      "0 0 0 12px hsl(var(--primary) / 0)",
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tooltip-${currentStep}`}
              ref={tooltipRef}
              className="z-10 w-[380px] max-w-[calc(100vw-32px)]"
              style={{
                position: pos.position,
                top: pos.top,
                left: pos.left,
              }}
              initial={{
                opacity: 0,
                x: "x" in pos ? pos.x : direction * 30,
                y: "y" in pos ? pos.y : 10,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: "x" in pos ? pos.x : 0,
                y: "y" in pos ? pos.y : 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: "x" in pos ? pos.x : direction * -20,
                scale: 0.95,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Progress bar */}
                <div className="h-1 bg-secondary">
                  <motion.div
                    className="h-full bg-primary"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Sparkles className="h-4 w-4 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {currentStep + 1} de {steps.length}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={onSkip}
                      className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Fechar tour"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <motion.p
                    className="text-sm text-muted-foreground leading-relaxed mb-5"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    {step.content}
                  </motion.p>

                  {/* Step indicators */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {steps.map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1.5 rounded-full"
                        animate={{
                          width: i === currentStep ? 24 : 6,
                          backgroundColor:
                            i === currentStep
                              ? "hsl(var(--primary))"
                              : i < currentStep
                              ? "hsl(var(--primary) / 0.5)"
                              : "hsl(var(--secondary))",
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={onSkip}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Pular tour
                    </button>
                    <div className="flex gap-2">
                      {currentStep > 0 && (
                        <Button variant="outline" size="sm" onClick={handlePrev} className="gap-1 h-8">
                          <ChevronLeft className="h-3.5 w-3.5" /> Anterior
                        </Button>
                      )}
                      <Button size="sm" onClick={handleNext} className="gap-1 h-8">
                        {currentStep === steps.length - 1 ? (
                          "Concluir 🎉"
                        ) : (
                          <>Próximo <ChevronRight className="h-3.5 w-3.5" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
