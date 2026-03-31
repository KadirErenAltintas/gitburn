/**
 * Share buttons component for copying and sharing results
 */

import { Button } from "@/components/ui/button";
import { Copy, Check, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FunMode } from "@/lib/modes";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShareButtonsProps {
  shareText: string;
  twitterText: string;
  mode: FunMode;
}

export default function ShareButtons({
  shareText,
  twitterText,
  mode,
}: ShareButtonsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const modeClasses: Record<FunMode, { panel: string; x: string }> = {
    normal: {
      panel: "border-border/70 bg-card/50",
      x: "bg-foreground text-background hover:bg-foreground/90",
    },
    roast: {
      panel: "border-orange-500/45 bg-orange-500/10",
      x: "bg-orange-500 text-black hover:bg-orange-400",
    },
    motivational: {
      panel: "border-emerald-500/45 bg-emerald-500/10",
      x: "bg-emerald-500 text-black hover:bg-emerald-400",
    },
  };
  const skin = modeClasses[mode];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success(t("copyToast"));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const encodedText = encodeURIComponent(twitterText);
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedText}`,
      "_blank"
    );
  };

  return (
    <div className={`space-y-3 pt-4 border-t ${skin.panel}`}>
      <div className="flex gap-2">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1 font-mono border-border/60 hover:bg-card/80"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              {t("copied")}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              {t("copyResult")}
            </>
          )}
        </Button>
        <Button
          onClick={handleTwitterShare}
          className={`flex-1 font-mono ${skin.x}`}
        >
          <Share2 className="w-4 h-4 mr-2" />
          {t("shareOnX")}
        </Button>
      </div>
      <div className="border border-border/70 bg-background/50 p-2 font-mono text-xs text-muted-foreground">
        {shareText.split("\n").slice(0, 2).join(" // ")}
      </div>
      <p className="text-xs text-muted-foreground text-center font-mono">
        {t("shareHint")}
      </p>
    </div>
  );
}
