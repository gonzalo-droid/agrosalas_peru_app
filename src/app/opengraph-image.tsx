import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Agrosalas Peru — Menestras peruanas en conserva para exportación";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
        <div
          style={{
            fontSize: 32,
            color: "#bbf7d0",
            fontWeight: 400,
          }}
        >
          Menestras peruanas en conserva para exportación
        </div>
      </div>
    ),
    { ...size }
  );
}
