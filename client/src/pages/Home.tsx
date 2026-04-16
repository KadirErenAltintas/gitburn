import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import ResultCard from "@/components/ResultCard";
import Mascot, { type MascotPhase } from "@/components/Mascot";
import { analyzeGitHubUser, getErrorMessage, getErrorSuggestion } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import type { FunMode } from "@/lib/modes";

interface BurnoutResult {
  score: number;
  signals: string[];
  personality: string;
  insight: string;
  summary: string;
  roast: string;
}

export default function Home() {
  const { locale, setLocale, t } = useLanguage();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BurnoutResult | null>(null);
  const [error, setError] = useState("");
  const [voiceMode, setVoiceMode] = useState<FunMode>("normal");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setVoiceMode("normal");

    try {
      const data = await analyzeGitHubUser(username);
      setResult(data);
      toast.success(t("analysisComplete"));
    } catch (err: any) {
      const errorMsg = getErrorMessage(err);
      const suggestion = getErrorSuggestion(err);
      const fullError = suggestion ? `${errorMsg} ${suggestion}` : errorMsg;
      setError(fullError);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const mascotPhase: MascotPhase = loading
    ? "loading"
    : error
      ? "error"
      : result
        ? "result"
        : "idle";

  return (
    <div className="min-h-screen bg-background text-foreground terminal-grid">
      {/* Hero Section */}
      <div className="border-b border-border/70">
        <div className="container py-14 md:py-20">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-mono tracking-widest text-primary">
                <span>GB</span>
                <span className="text-primary/80">/</span>
                <span>{t("heroTag")}</span>
              </div>
              <div className="inline-flex items-center gap-2 border border-border/80 bg-card/60 px-2 py-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  {t("language")}
                </span>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`px-2 py-1 text-xs font-mono border transition-colors ${locale === "en" ? "border-primary bg-primary/20 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("tr")}
                  className={`px-2 py-1 text-xs font-mono border transition-colors ${locale === "tr" ? "border-primary bg-primary/20 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  TR
                </button>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl text-display mb-1 burn-glow">
              GITBURN<span className="text-primary">_</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t("heroDesc")}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
              <span className="border border-border/80 bg-card/50 px-2 py-1">
                {t("chipRealtime")}
              </span>
              <span className="border border-border/80 bg-card/50 px-2 py-1">
                {t("chipSarcastic")}
              </span>
              <span className="border border-border/80 bg-card/50 px-2 py-1">
                {t("chipDevNative")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-10 md:py-12 pb-32 md:pb-40">
        <div className="max-w-2xl">
          {/* Input Section */}
          <form onSubmit={handleAnalyze} className="mb-10 terminal-panel p-4 md:p-5">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Input
                type="text"
                placeholder={t("placeholder")}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                className="font-mono bg-background/80 border-border focus:border-primary focus:ring-primary/40 h-11"
                disabled={loading}
                autoComplete="off"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold px-8 h-11 whitespace-nowrap shadow-[0_0_24px_color-mix(in_oklch,var(--primary)_35%,transparent)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("analyzing")}
                  </>
                ) : (
                  t("analyze")
                )}
              </Button>
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-1">
              {t("publicOnly")}
            </p>
            {error && (
              <div className="flex flex-col gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/40 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </form>

          {/* Result Section */}
          {result && (
            <ResultCard
              username={username}
              score={result.score}
              signals={result.signals}
              personality={result.personality}
              summary={result.summary}
              onVoiceModeChange={setVoiceMode}
            />
          )}

          {/* Empty State */}
          {!result && !loading && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-muted-foreground font-mono text-sm border border-border/70 bg-card/40 inline-block px-3 py-2">
                {t("waiting")}
              </p>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && !result && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("readingStream")}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/70 mt-14">
        <div className="container py-8">
          <p className="text-xs text-muted-foreground font-mono text-center">
            {t("footer")}
          </p>
        </div>
      </div>

      <Mascot
        phase={mascotPhase}
        score={result?.score ?? 0}
        funMode={voiceMode}
        analyzedUsername={username.trim()}
      />
    </div>
  );
}
