import { Card } from "@/components/ui/card";
import { useState } from "react";
import ScoreDisplay from "./ScoreDisplay";
import ShareButtons from "./ShareButtons";
import ModeToggle from "./ModeToggle";
import {
  generateShareText,
  generateTwitterText,
  formatSignals,
} from "@/lib/formatters";
import { generateModeMessages, FunMode } from "@/lib/modes";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultCardProps {
  username: string;
  score: number;
  signals: string[];
  personality: string;
  summary: string;
}

export default function ResultCard({
  username,
  score,
  signals,
  personality,
  summary,
}: ResultCardProps) {
  const { locale, t } = useLanguage();
  const [mode, setMode] = useState<FunMode>("normal");

  const formattedSignals = formatSignals(signals);
  const modeMessages = generateModeMessages(score, personality, signals, mode, locale);
  const shareText = generateShareText(username, score, personality, signals, locale);
  const twitterText = generateTwitterText(username, score, personality, signals, locale);
  const modeSkin: Record<
    FunMode,
    { frame: string; section: string; label: string; roast: string }
  > = {
    normal: {
      frame: "border-border/80",
      section: "border-border/80 bg-card/60",
      label: "text-primary border-primary/45 bg-primary/10",
      roast: "border-destructive/35 bg-destructive/10",
    },
    roast: {
      frame: "border-orange-500/60",
      section: "border-orange-400/45 bg-orange-500/10",
      label: "text-orange-300 border-orange-500/50 bg-orange-500/15",
      roast: "border-red-500/60 bg-red-500/15",
    },
    motivational: {
      frame: "border-emerald-500/45",
      section: "border-emerald-400/35 bg-emerald-500/10",
      label: "text-emerald-300 border-emerald-500/40 bg-emerald-500/15",
      roast: "border-emerald-500/45 bg-emerald-500/10",
    },
  };
  const skin = modeSkin[mode];

  return (
    <div
      className={`space-y-6 terminal-panel p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 ${skin.frame}`}
    >
      {/* Score Card */}
      <ScoreDisplay score={score} mode={mode} />

      {/* Personality Badge */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">
          {t("profile")}
        </span>
        <div
          className={`px-4 py-2 border font-mono text-sm font-semibold ${skin.label}`}
        >
          {personality}
        </div>
      </div>

      {/* Signals */}
      {signals.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            {t("evidenceSignals")}
          </h3>
          <div className="space-y-2">
            {formattedSignals.map((signal, idx) => (
              <div
                key={idx}
                className={`font-mono text-sm border p-3 text-foreground ${skin.section}`}
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode Toggle */}
      <div>
        <h3 className="text-xs font-mono font-semibold text-muted-foreground mb-3 uppercase tracking-[0.2em]">
          {t("voiceMode")}
        </h3>
        <ModeToggle currentMode={mode} onModeChange={setMode} />
      </div>

      {/* Insight */}
      <div>
        <h3 className="text-xs font-mono font-semibold text-muted-foreground mb-3 uppercase tracking-[0.2em]">
          {t("insight")}
        </h3>
        <p className={`text-sm leading-relaxed text-foreground border p-4 ${skin.section}`}>
          {modeMessages.insight}
        </p>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-xs font-mono font-semibold text-muted-foreground mb-3 uppercase tracking-[0.2em]">
          {t("summary")}
        </h3>
        <p className={`text-sm leading-relaxed text-foreground border p-4 ${skin.section}`}>
          {modeMessages.summary}
        </p>
      </div>

      {/* Roast */}
      <div>
        <h3 className="text-xs font-mono font-semibold text-muted-foreground mb-3 uppercase tracking-[0.2em]">
          {t("oneLiner")}
        </h3>
        <div className={`border-2 p-4 ${skin.roast}`}>
          <p className="text-sm font-mono italic text-foreground">
            "{modeMessages.roast}"
          </p>
        </div>
      </div>

      {/* Share Section */}
      <ShareButtons shareText={shareText} twitterText={twitterText} mode={mode} />
    </div>
  );
}
