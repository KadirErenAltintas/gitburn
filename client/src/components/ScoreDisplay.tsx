/**
 * Score display component with emoji and risk level
 */

import { Card } from "@/components/ui/card";
import { getRiskEmoji, getRiskLevel, getRiskColor, getRiskBgColor } from "@/lib/formatters";
import { FunMode } from "@/lib/modes";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScoreDisplayProps {
  score: number;
  mode: FunMode;
}

export default function ScoreDisplay({ score, mode }: ScoreDisplayProps) {
  const { locale, t } = useLanguage();
  const emoji = getRiskEmoji(score);
  const riskLevel = getRiskLevel(score, locale);
  const modeStyles: Record<FunMode, string> = {
    normal: "border-border/70",
    roast: "border-orange-500/60",
    motivational: "border-emerald-500/50",
  };

  return (
    <Card className={`border-2 p-6 md:p-8 ${getRiskBgColor(score)} ${modeStyles[mode]}`}>
      <div className="space-y-4">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.24em] text-center">
          {t("burnoutRisk")}
        </p>
        <div className="flex items-end justify-center gap-3 mb-1">
          <div
            className={`text-7xl font-bold text-display ${getRiskColor(
              score
            )} drop-shadow-lg burn-glow`}
          >
            {score}%
          </div>
          <div className="text-5xl mb-2">{emoji}</div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-background/70 border border-border/80 overflow-hidden">
            <div className="h-full risk-strip transition-all duration-700" style={{ width: `${Math.min(score, 100)}%` }} />
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
  );
}
