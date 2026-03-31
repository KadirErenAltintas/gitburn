import { Locale } from "./i18n";

/**
 * Burnout result formatting utilities for viral-ready output
 */

export interface FormattedResult {
  scoreEmoji: string;
  riskLevel: string;
  riskColor: string;
  shareText: string;
  twitterText: string;
}

export function getRiskEmoji(score: number): string {
  if (score >= 80) return "💀";
  if (score >= 60) return "🔥";
  if (score >= 40) return "⚠️";
  return "✨";
}

export function getRiskLevel(score: number, locale: Locale = "en"): string {
  if (locale === "tr") {
    if (score >= 80) return "KRITIK";
    if (score >= 60) return "YUKSEK";
    if (score >= 40) return "ORTA";
    return "DUSUK";
  }

  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 40) return "MODERATE";
  return "LOW";
}

export function getRiskColor(score: number): string {
  if (score >= 80) return "text-red-500";
  if (score >= 60) return "text-orange-500";
  if (score >= 40) return "text-yellow-500";
  return "text-green-500";
}

export function getRiskBgColor(score: number): string {
  if (score >= 80) return "bg-red-500/10 border-red-500/30";
  if (score >= 60) return "bg-orange-500/10 border-orange-500/30";
  if (score >= 40) return "bg-yellow-500/10 border-yellow-500/30";
  return "bg-green-500/10 border-green-500/30";
}

export function generateShareText(
  username: string,
  score: number,
  personality: string,
  signals: string[],
  locale: Locale = "en"
): string {
  const emoji = getRiskEmoji(score);
  const mainSignal =
    signals.length > 0
      ? signals[0]
      : locale === "tr"
        ? "Ilginc kodlama kaliplari"
        : "Interesting coding patterns";

  if (locale === "tr") {
    return `Tukenmislik skorum ${score}% ${emoji}

${mainSignal}

Kisilik: ${personality}

GitBurn ile analiz edildi 🔥
gitburn.dev`;
  }

  return `My burnout score is ${score}% ${emoji}

${mainSignal}

Personality: ${personality}

Analyzed with GitBurn 🔥
gitburn.dev`;
}

export function generateTwitterText(
  username: string,
  score: number,
  personality: string,
  signals: string[],
  locale: Locale = "en"
): string {
  const emoji = getRiskEmoji(score);
  let text =
    locale === "tr"
      ? `Tukenmislik skorum: ${score}% ${emoji}\n`
      : `My burnout score: ${score}% ${emoji}\n`;
  text += locale === "tr" ? `Tip: ${personality}\n` : `Type: ${personality}\n`;

  if (signals.length > 0) {
    text += `\n${signals[0]}`;
  }

  text += `\n\n#GitBurn #DeveloperLife`;

  return text;
}

export function generateDetailedInsight(
  score: number,
  personality: string,
  signals: string[]
): string {
  const emoji = getRiskEmoji(score);

  let insight = `${emoji} **${personality}** detected!\n\n`;

  if (score >= 80) {
    insight += `You're burning out hard. Your GitHub activity shows patterns of overwork that need immediate attention. Consider taking a break.`;
  } else if (score >= 60) {
    insight += `You're working intensely. While passion is great, make sure you're balancing work with rest and personal time.`;
  } else if (score >= 40) {
    insight += `Your work pattern is moderate. You're maintaining a reasonable balance, though there's room for optimization.`;
  } else {
    insight += `You're maintaining a healthy work-life balance. Your coding habits suggest sustainable productivity.`;
  }

  return insight;
}

export function formatSignals(signals: string[]): string[] {
  return signals.map((signal) => {
    // Add emoji prefixes to signals for better visual appeal
    if (signal.toLowerCase().includes("night")) return `🌙 ${signal}`;
    if (signal.toLowerCase().includes("weekend")) return `📅 ${signal}`;
    if (signal.toLowerCase().includes("rest")) return `😴 ${signal}`;
    if (signal.toLowerCase().includes("streak")) return `🔥 ${signal}`;
    if (signal.toLowerCase().includes("frequency")) return `⚡ ${signal}`;
    return `• ${signal}`;
  });
}
