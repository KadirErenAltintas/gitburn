import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { FunMode } from "@/lib/modes";

export type MascotPhase = "idle" | "loading" | "error" | "result";

interface MascotProps {
  phase: MascotPhase;
  score?: number;
  funMode?: FunMode;
  analyzedUsername?: string;
}

const TRIPLE_MS = 650;

export default function Mascot({
  phase,
  score = 0,
  funMode = "normal",
  analyzedUsername = "",
}: MascotProps) {
  const { t } = useLanguage();
  const [tripleUnlocked, setTripleUnlocked] = useState(false);
  const [tapIndex, setTapIndex] = useState(0);
  const [hasPoked, setHasPoked] = useState(false);
  const clickRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const octocatEaster =
    phase === "result" && analyzedUsername.toLowerCase() === "octocat";

  const line = useMemo(() => {
    if (tripleUnlocked) return t("mascotEasterTriple");
    if (octocatEaster) return t("mascotEasterOctocat");
    if (phase === "error") return t("mascotError");
    if (phase === "loading") return t("mascotLoading");
    if (phase === "idle") return t("mascotIdle");
    if (phase === "result") {
      if (score <= 0) return t("mascotScoreZero");
      if (score < 40) return t("mascotScoreLow");
      if (score < 60) return t("mascotScoreMid");
      if (score < 80) return t("mascotScoreHigh");
      return t("mascotScoreCritical");
    }
    return t("mascotIdle");
  }, [phase, score, tripleUnlocked, octocatEaster, t]);

  const handleTap = useCallback(() => {
    setHasPoked(true);
    clickRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clickRef.current = 0;
    }, TRIPLE_MS);
    if (clickRef.current >= 3) {
      clickRef.current = 0;
      setTripleUnlocked(true);
      setTimeout(() => setTripleUnlocked(false), 8000);
    }
    setTapIndex((i) => (i + 1) % 3);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const tapLine = useMemo(() => {
    const keys = ["mascotTap1", "mascotTap2", "mascotTap3"] as const;
    return t(keys[tapIndex]!);
  }, [tapIndex, t]);

  const modeGlow =
    funMode === "roast"
      ? "shadow-[0_0_32px_rgba(249,115,22,0.35)] border-orange-500/50"
      : funMode === "motivational"
        ? "shadow-[0_0_28px_rgba(16,185,129,0.3)] border-emerald-500/45"
        : "shadow-[0_0_24px_color-mix(in_oklch,var(--primary)_30%,transparent)] border-primary/40";

  const mouthWide = phase === "loading" || (phase === "result" && score >= 80);
  const sweat = phase === "loading" || (phase === "result" && score >= 60);
  const shake = phase === "error" || (phase === "result" && score >= 80);

  return (
    <motion.div
      className={`fixed bottom-4 right-4 z-50 max-w-[min(100vw-2rem,20rem)] md:max-w-sm ${modeGlow}`}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="terminal-panel border bg-card/90 p-3 backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            {t("mascotName")}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground">
            {t("mascotHint")}
          </span>
        </div>

        <button
          type="button"
          onClick={handleTap}
          className="flex w-full items-start gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Mascot"
        >
          <motion.div
            animate={
              shake
                ? { rotate: [-2, 2, -2, 0], x: [0, -2, 2, 0] }
                : { rotate: 0, x: 0 }
            }
            transition={{
              repeat: shake ? 5 : 0,
              duration: 0.45,
            }}
            className="relative shrink-0"
          >
            <svg
              viewBox="0 0 120 100"
              className="h-20 w-24"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="mascot-body" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.35 0.08 260)" />
                  <stop offset="100%" stopColor="oklch(0.22 0.04 260)" />
                </linearGradient>
                <linearGradient id="mascot-belly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.12 145)" />
                  <stop offset="100%" stopColor="oklch(0.35 0.1 145)" />
                </linearGradient>
              </defs>
              <ellipse
                cx="60"
                cy="58"
                rx="48"
                ry="40"
                fill="url(#mascot-body)"
                stroke="oklch(0.5 0.15 141)"
                strokeWidth="2"
              />
              <ellipse
                cx="60"
                cy="68"
                rx="22"
                ry="16"
                fill="url(#mascot-belly)"
                opacity="0.85"
              />
              <motion.circle
                cx="42"
                cy="48"
                r="10"
                fill="oklch(0.95 0.02 120)"
                animate={{ scaleY: phase === "loading" ? [1, 0.2, 1] : 1 }}
                transition={{ repeat: phase === "loading" ? Infinity : 0, duration: 0.4 }}
              />
              <motion.circle
                cx="78"
                cy="48"
                r="10"
                fill="oklch(0.95 0.02 120)"
                animate={{ scaleY: phase === "loading" ? [1, 0.2, 1] : 1 }}
                transition={{
                  repeat: phase === "loading" ? Infinity : 0,
                  duration: 0.4,
                  delay: 0.1,
                }}
              />
              <circle cx="40" cy="46" r="4" fill="oklch(0.12 0.02 260)" />
              <circle cx="76" cy="46" r="4" fill="oklch(0.12 0.02 260)" />
              <path
                d={
                  mouthWide
                    ? "M 44 72 Q 60 88 76 72"
                    : "M 48 74 Q 60 80 72 74"
                }
                fill="none"
                stroke="oklch(0.15 0.02 260)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {sweat && (
                <>
                  <motion.circle
                    cx="88"
                    cy="38"
                    r="3"
                    fill="oklch(0.7 0.15 220)"
                    animate={{ y: [0, 8], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                  <motion.circle
                    cx="30"
                    cy="40"
                    r="2.5"
                    fill="oklch(0.7 0.15 220)"
                    animate={{ y: [0, 6], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }}
                  />
                </>
              )}
              <path
                d="M 22 52 L 18 48 L 22 44"
                fill="none"
                stroke="oklch(0.55 0.12 145)"
                strokeWidth="2"
              />
              <path
                d="M 98 52 L 102 48 L 98 44"
                fill="none"
                stroke="oklch(0.55 0.12 145)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          <div className="min-w-0 flex-1 space-y-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={line + String(tripleUnlocked) + phase + score}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-xs leading-relaxed text-foreground"
              >
                {line}
              </motion.p>
            </AnimatePresence>
            {hasPoked && (
              <p className="font-mono text-[10px] text-muted-foreground">
                {tapLine}
              </p>
            )}
          </div>
        </button>
      </div>
    </motion.div>
  );
}
