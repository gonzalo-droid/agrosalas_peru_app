"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

interface Props {
  title: string;
  text: string;
  className?: string;
}

export function ShareButton({
  title,
  text,
  className = "btn-secondary flex-1 sm:flex-none sm:px-4 justify-center",
}: Props) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") throw err;
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard not available (HTTP or sandboxed context)
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={className}
      aria-label={t("detail.share")}
    >
      {copied ? (
        <Check className="w-5 h-5" />
      ) : (
        <>
          <span className="sm:hidden">{t("detail.share")}</span>
          <Share2 className="w-5 h-5" />
        </>
      )}
    </button>
  );
}
