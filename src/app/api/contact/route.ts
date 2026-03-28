import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "ventas@agrosalasperu.com";
const FROM_EMAIL    = process.env.FROM_EMAIL    ?? "no-reply@agrosalasperu.com";

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim().slice(0, 500);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El correo electrónico no es válido." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const safeName    = sanitize(name);
    const safeEmail   = sanitize(email);
    const safePhone   = sanitize(phone ?? "");
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message);

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #166534, #15803d); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Agrosalas Peru</h1>
          <p style="color: #bbf7d0; margin: 8px 0 0; font-size: 14px;">Nuevo mensaje de contacto</p>
        </div>
        <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; width: 140px; vertical-align: top;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #16a34a;">${safeEmail}</a></td>
            </tr>
            ${safePhone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; vertical-align: top;">Teléfono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${safePhone}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; vertical-align: top;">Asunto</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 600; color: #16a34a;">${safeSubject}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; font-size: 14px; line-height: 1.7;">${safeMessage.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #dcfce7; border-radius: 8px; text-align: center;">
            <a href="mailto:${safeEmail}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              Responder a ${safeName}
            </a>
          </div>

          <p style="font-size: 12px; color: #9ca3af; margin-top: 24px; text-align: center;">
            Este correo fue enviado desde el formulario de contacto de agrosalasperu.com
          </p>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      CONTACT_EMAIL,
      replyTo: safeEmail,
      subject: `[Agrosalas Peru] ${safeSubject} — ${safeName}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[contact/route] Error:", err);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intenta más tarde." },
      { status: 500 }
    );
  }
}
