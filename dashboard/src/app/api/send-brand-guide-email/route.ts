import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const EMAIL = process.env.EMAIL;
    const APP_PASSWORD = process.env.APP_PASSWORD;

    if (!EMAIL || !APP_PASSWORD) {
      return NextResponse.json(
        { error: "Email credentials not configured" },
        { status: 500, headers: CORS },
      );
    }

    const { to, clientName, brandName, pdfBase64, fileName } = body;

    if (!to || !pdfBase64) {
      return NextResponse.json(
        { error: "Missing required fields: to, pdfBase64" },
        { status: 400, headers: CORS },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL, pass: APP_PASSWORD },
    });

    const WEBSITE_URL = process.env.WEBSITE_URL || "";

    const htmlBody = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">
  <div style="background:#1a1a1a;padding:20px;">
    ${WEBSITE_URL ? `<img src="${WEBSITE_URL}/assets/logo-2.webp" alt="Pixelate Nest" style="height:50px;margin-bottom:10px;"/>` : ""}
    <p style="color:#fff;margin:0;font-size:18px;font-weight:bold;">Pixelate Nest</p>
  </div>
  <div style="max-width:600px;margin:0 auto;padding:30px 20px;">
    <h2 style="color:#044bab;font-size:24px;margin-bottom:8px;">Your Brand Guide is Ready</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;">
      Dear <strong>${clientName || "Valued Client"}</strong>,
    </p>
    <p style="color:#555;font-size:15px;line-height:1.6;">
      We're excited to share your brand guide for <strong>${brandName || clientName || "your brand"}</strong>.
      Please find the complete brand guide attached to this email.
    </p>
    <p style="color:#555;font-size:15px;line-height:1.6;">
      Your brand guide includes all the visual identity elements, color palettes, typography guidelines,
      and brand voice documentation needed to maintain a consistent brand presence.
    </p>
    <div style="background:#f0f4ff;border-left:4px solid #044bab;padding:16px;margin:20px 0;border-radius:4px;">
      <p style="margin:0;color:#044bab;font-weight:bold;font-size:14px;">What's inside your brand guide:</p>
      <ul style="color:#555;font-size:14px;margin:8px 0 0 0;padding-left:20px;line-height:1.8;">
        <li>Brand colors &amp; palette</li>
        <li>Typography guidelines</li>
        <li>Logo usage rules</li>
        <li>Brand voice &amp; tone</li>
      </ul>
    </div>
    <p style="color:#555;font-size:14px;line-height:1.6;">
      If you have any questions or need revisions, please don't hesitate to reach out.
    </p>
    <p style="color:#333;font-size:14px;font-weight:bold;">
      Team Pixelate Nest
    </p>
  </div>
  <div style="background:#1a1a1a;color:#666;text-align:center;padding:20px;margin-top:20px;">
    <p style="margin:0;">© 2026 Kalahanu Tech Studios LLP. All Rights Reserved.</p>
  </div>
</body>
</html>
`;

    await transporter.sendMail({
      from: `"Pixelate Nest" <${EMAIL}>`,
      to,
      subject: `Your Brand Guide from Pixelate Nest${brandName ? ` — ${brandName}` : ""}`,
      html: htmlBody,
      attachments: [
        {
          filename: fileName || `Brand-Guide-${brandName || clientName || "document"}.pdf`,
          content: pdfBase64,
          encoding: "base64",
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ success: true }, { status: 200, headers: CORS });
  } catch (e: any) {
    console.error("send-brand-guide-email error", e);
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
