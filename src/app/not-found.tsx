import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl mb-6">🌿</p>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">
        Ups, esta página no existe o fue removida.
      </p>
      <Link href="/" className="btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}
