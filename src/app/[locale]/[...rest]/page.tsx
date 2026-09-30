import { notFound } from "next/navigation";

// Cualquier ruta sin página dentro de /[locale] muestra el 404 localizado.
export default function CatchAllPage() {
  notFound();
}
