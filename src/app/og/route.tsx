import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";
import { translate } from "@/i18n/translations";

export const runtime = "edge";

// GET /og?locale=en — imagen Open Graph por defecto (1200×630).
export function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("locale") ?? defaultLocale;
  const locale = isLocale(param) ? param : defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          Agrosalas Peru
        </div>
        <div style={{ fontSize: 32, color: "#bbf7d0", fontWeight: 400 }}>
          {translate(locale, "meta.og.tagline")}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
