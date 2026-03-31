/**
 * Fun mode toggle component
 */

import { FunMode, getModeLabelAndEmoji } from "@/lib/modes";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ModeToggleProps {
  currentMode: FunMode;
  onModeChange: (mode: FunMode) => void;
}

export default function ModeToggle({ currentMode, onModeChange }: ModeToggleProps) {
  const { locale } = useLanguage();
  const modes: FunMode[] = ["normal", "roast", "motivational"];
  const styleMap: Record<FunMode, { active: string; idle: string }> = {
    normal: {
      active: "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_35%,transparent)]",
      idle: "border-border/60 hover:border-primary/40 hover:bg-card/80",
    },
    roast: {
      active: "bg-orange-500/85 text-black border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.35)]",
      idle: "border-orange-500/45 text-orange-300 hover:bg-orange-500/10",
    },
    motivational: {
      active: "bg-emerald-500/80 text-black border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.35)]",
      idle: "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10",
    },
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {modes.map((mode) => {
        const { label, emoji } = getModeLabelAndEmoji(mode, locale);
        const isActive = currentMode === mode;
        const style = styleMap[mode];

        return (
          <Button
            key={mode}
            onClick={() => onModeChange(mode)}
            variant={isActive ? "default" : "outline"}
            className={`font-mono text-sm ${
              isActive
                ? style.active
                : style.idle
            }`}
          >
            {emoji} {label}
          </Button>
        );
      })}
    </div>
  );
}
