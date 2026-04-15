"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

type Status = "idle" | "loading" | "success" | "error";

type SubjectKey = "quote" | "info" | "wholesale" | "export" | "other";

const SUBJECT_KEYS: SubjectKey[] = ["quote", "info", "wholesale", "export", "other"];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: SubjectKey | "";
  message: string;
}

function parseSubjectParam(raw: string | null): SubjectKey | "" {
  if (!raw) return "";
  if ((SUBJECT_KEYS as string[]).includes(raw)) return raw as SubjectKey;
  // legacy: translated Spanish strings from older links
  const legacy: Record<string, SubjectKey> = {
    "Solicitud de cotización": "quote",
    "Información de productos": "info",
    "Pedido mayorista": "wholesale",
    "Exportación / Distribución": "export",
    "Otro": "other",
  };
  return legacy[raw] ?? "";
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const initialSubject = parseSubjectParam(searchParams.get("asunto"));
  const initialMessage = searchParams.get("mensaje") ?? "";

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: initialMessage,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError]   = useState("");

  const update = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value as FormData[typeof key] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const payload = {
        ...form,
        subject: form.subject ? t(`subject.${form.subject}`) : "",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? t("form.errorDefault"));
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("form.errorDefault"));
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-gray-50 placeholder-gray-400";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-brand-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t("form.successTitle")}
        </h3>
        <p className="text-gray-500 max-w-sm mb-6">
          {t("form.successDescBefore")}{" "}
          <strong>{form.email || t("form.successEmailFallback")}</strong>{" "}
          {t("form.successDescAfter")}
        </p>
        <button onClick={() => setStatus("idle")} className="btn-primary">
          {t("form.successButton")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Row: name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("form.name")} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            value={form.name}
            onChange={update("name")}
            placeholder={t("form.namePh")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("form.email")} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder={t("form.emailPh")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row: phone + subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("form.phone")}
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder={t("form.phonePh")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("form.subject")} <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            required
            value={form.subject}
            onChange={update("subject")}
            className={inputClass}
          >
            <option value="">{t("form.subjectPh")}</option>
            {SUBJECT_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`subject.${key}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("form.message")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder={t("form.messagePh")}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error || t("form.errorDefault")}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t("form.submitLoading")}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t("form.submit")}
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">{t("form.privacy")}</p>
    </form>
  );
}
