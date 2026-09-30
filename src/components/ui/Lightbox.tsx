"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

interface Props {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  alt: (i: number) => string;
}

const SWIPE_THRESHOLD = 50;

export function Lightbox({ images, index, onClose, onIndexChange, alt }: Props) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  const total = images.length;

  const go = (delta: number) => {
    if (index === null || total === 0) return;
    onIndexChange((index + delta + total) % total);
  };

  // Al abrir: bloquear scroll del body y mover el foco al botón cerrar.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && total > 0) onIndexChange((index - 1 + total) % total);
      else if (e.key === "ArrowRight" && total > 0) onIndexChange((index + 1) % total);
      else if (e.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll("button");
        if (!buttons || buttons.length === 0) return;
        const focusedButton = document.activeElement as HTMLButtonElement;
        const focusedIndex = Array.from(buttons).indexOf(focusedButton);
        if (e.shiftKey) {
          if (focusedIndex === 0) {
            e.preventDefault();
            buttons[buttons.length - 1]?.focus();
          }
        } else {
          if (focusedIndex === buttons.length - 1) {
            e.preventDefault();
            buttons[0]?.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onIndexChange]);

  if (index === null || !images[index]) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt(index)}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
      }}
    >
      <span className="absolute top-4 left-4 text-sm text-white/80">
        {index + 1} / {total}
      </span>

      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={t("events.lightbox.close")}
        className="absolute top-3 right-3 p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <X className="w-6 h-6" />
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label={t("events.lightbox.prev")}
          className="absolute left-2 md:left-4 p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      <div
        className="relative w-full h-full max-w-5xl max-h-[85vh] mx-12 md:mx-20"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={alt(index)}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label={t("events.lightbox.next")}
          className="absolute right-2 md:right-4 p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
