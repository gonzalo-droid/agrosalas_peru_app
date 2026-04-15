"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  "Solicitud de cotización",
  "Información de productos",
  "Pedido mayorista",
  "Exportación / Distribución",
  "Otro",
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = SUBJECTS.includes(searchParams.get("asunto") ?? "")
    ? (searchParams.get("asunto") as string)
    : "";
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
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Error al enviar el mensaje");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-gray-50 placeholder-gray-400";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-brand-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-500 max-w-sm mb-6">
          Gracias por contactarnos. Te responderemos a{" "}
          <strong>{form.email || "tu correo"}</strong> en menos de 24 horas hábiles.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-primary"
        >
          Enviar otro mensaje
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
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            value={form.name}
            onChange={update("name")}
            placeholder="Juan Pérez"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="juan@empresa.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row: phone + subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Teléfono / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+51 999 000 111"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
            Asunto <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            required
            value={form.subject}
            onChange={update("subject")}
            className={inputClass}
          >
            <option value="">Selecciona un asunto</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          Mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Cuéntanos qué productos te interesan, volúmenes, destino, etc."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error || "Ocurrió un error. Intenta de nuevo."}</span>
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
            Enviando mensaje...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar mensaje
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Al enviar aceptas que procesemos tu información para responderte.
        No compartimos tus datos con terceros.
      </p>
    </form>
  );
}
