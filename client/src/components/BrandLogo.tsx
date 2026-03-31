import { useLanguage } from "@/contexts/LanguageContext";

interface BrandLogoProps {
  compact?: boolean;
}

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  const { t } = useLanguage();
  return (
    <div className={`inline-flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <span
        className={`relative grid place-items-center border border-primary/60 bg-background/80 ${
          compact ? "h-8 w-8" : "h-10 w-10"
        } shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]`}
      >
        <svg
          viewBox="0 0 24 24"
          className={compact ? "h-5 w-5" : "h-6 w-6"}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gb-flame" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.84 0.22 141)" />
              <stop offset="55%" stopColor="oklch(0.72 0.2 45)" />
              <stop offset="100%" stopColor="oklch(0.7 0.23 24)" />
            </linearGradient>
          </defs>
          <path
            d="M12 2.6c1.9 2.6 2.5 4.2 2.2 5.7-.2 1-.8 1.8-1.8 2.6 2.5-.3 4.2-1.9 4.8-4.4 2.4 3 3.2 6.3 2.3 9.2-1 3.3-4.1 5.7-7.5 5.7s-6.5-2.3-7.5-5.7c-.9-2.9-.1-6.2 2.3-9.2.6 2.5 2.3 4.1 4.8 4.4-1-.8-1.6-1.7-1.8-2.6-.3-1.5.3-3.1 2.2-5.7Z"
            fill="url(#gb-flame)"
          />
          <rect
            x="11"
            y="11.5"
            width="2"
            height="5"
            rx="0.6"
            fill="oklch(0.96 0.006 120)"
          />
          <circle cx="12" cy="18.2" r="1.2" fill="oklch(0.96 0.006 120)" />
        </svg>
        <span className="absolute -right-[3px] -bottom-[3px] h-2 w-1 bg-primary animate-pulse" />
      </span>

      <div className="font-mono leading-none">
        <div
          className={`text-foreground tracking-tight ${compact ? "text-sm" : "text-lg"} font-semibold`}
        >
          GIT<span className="text-primary">BURN</span>
          <span className="text-primary/85">_</span>
        </div>
        {!compact && (
          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {t("heatRiskSignal")}
          </div>
        )}
      </div>
    </div>
  );
}
