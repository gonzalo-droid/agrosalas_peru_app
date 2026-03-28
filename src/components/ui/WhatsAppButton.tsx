import Link from "next/link";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/51924262747?text=Hola%2C%20me%20interesa%20obtener%20información%20sobre%20sus%20productos.";

export function WhatsAppButton() {
  return (
    <Link
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm hidden sm:block">¿Necesitas ayuda?</span>
    </Link>
  );
}
