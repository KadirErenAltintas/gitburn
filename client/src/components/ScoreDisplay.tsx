/**
 * Score display with animated count-up and risk meter
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  getRiskEmoji,
  getRiskLevel,
  getRiskColor,
  getRiskBgColor,
} from "@/lib/formatters";
import { FunMode } from "@/lib/modes";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScoreDisplayProps {
  score: number;
  mode: FunMode;
}

export default function ScoreDisplay({ score, mode }: ScoreDisplayProps) {
  const { locale, t } = useLanguage();
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const end = Math.min(100, Math.max(0, score));
    let raf = 0;
    const t0 = performance.now();
    const duration = 1150;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setDisplayed(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const emoji = getRiskEmoji(score);
  const riskLevel = getRiskLevel(score, locale);
  const modeStyles: Record<FunMode, string> = {
    normal: "border-border/70",
    roast: "border-orange-500/60",
    motivational: "border-emerald-500/50",
  };

  const pulse = score >= 80 ? "animate-pulse" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      <Card
        className={`border-2 p-6 md:p-8 ${getRiskBgColor(score)} ${modeStyles[mode]} ${pulse}`}
      >
        <div className="space-y-4">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.24em] text-center">
            {t("burnoutRisk")}
          </p>
          <div className="flex items-end justify-center gap-3 mb-1">
            <motion.div
              key={score}
              initial={{ scale: 0.85, filter: "blur(4px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={`text-7xl font-bold text-display ${getRiskColor(
                score
              )} drop-shadow-lg burn-glow tabular-nums`}
            >
              {displayed}%
            </motion.div>
            <motion.div
              className="text-5xl mb-2"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {emoji}
            </motion.div>
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-full bg-background/70 border border-border/80 overflow-hidden rounded-[1px]">
              <motion.div
                className="h-full risk-strip rounded-[1px]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(score, 100)}%` }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">
                {t("riskLevel")}
              </p>
              <p className="text-sm font-mono font-semibold uppercase tracking-[0.18em]">
                {riskLevel}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
