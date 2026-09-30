import { NextResponse, type NextRequest } from "next/server";
import { resolveLocaleRoute } from "@/i18n/config";

// Español sin prefijo → rewrite interno a /es/...; /en/... pasa; /es/... → 308 sin prefijo.
// Nunca decide por Accept-Language: Googlebot y usuarios reciben lo mismo.
export function proxy(request: NextRequest) {
  const decision = resolveLocaleRoute(request.nextUrl.pathname);
  if (decision.type === "next") return NextResponse.next();

  const url = request.nextUrl.clone(); // conserva ?query
  url.pathname = decision.path;

  return decision.type === "rewrite"
    ? NextResponse.rewrite(url)
    : NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
