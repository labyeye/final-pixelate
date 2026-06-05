import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const formData = await request.formData();

    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const bannerFile = formData.get("banner") as File | null;

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400, headers: CORS },
      );
    }

    const EMAIL = process.env.EMAIL;
    const APP_PASSWORD = process.env.APP_PASSWORD;

    if (!EMAIL || !APP_PASSWORD) {
      return NextResponse.json(
        { error: "Email credentials not configured" },
        { status: 500, headers: CORS },
      );
    }

    const clients = await svc.getClients();
    const recipientEmails = clients
      .map((c: any) => c.email)
      .filter((e: any) => typeof e === "string" && e.includes("@"));

    if (recipientEmails.length === 0) {
      return NextResponse.json(
        { error: "No client emails found to send newsletter to" },
        { status: 400, headers: CORS },
      );
    }

    let bannerHtml = "";
    let bannerAttachment: nodemailer.SendMailOptions["attachments"] = [];

    if (bannerFile && bannerFile.size > 0) {
      const bytes = await bannerFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = bannerFile.type || "image/png";
      const cid = "newsletter-banner@pixelatenest";

      bannerAttachment = [
        {
          filename: bannerFile.name,
          content: buffer,
          cid,
          contentType: mimeType,
        },
      ];

      bannerHtml = `
        <div style="margin-bottom: 24px;">
          <img src="cid:${cid}" alt="Newsletter Banner" style="width: 100%; max-width: 600px; border-radius: 10px; display: block; margin: 0 auto;" />
        </div>`;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL, pass: APP_PASSWORD },
    });

    const emailFooter = `
      <div style="background-color: #1a1a1a; color: #888; text-align: center; padding: 20px; margin-top: 30px; font-size: 13px;">
        <p style="margin: 0 0 6px;">© 2026 Kalahanu Tech Studios LLP. All Rights Reserved.</p>
        <p style="margin: 0;">You are receiving this email because you are a valued client of Pixelate Nest.</p>
      </div>`;

    const emailHeader = `
      <div style="background-color: #1a1a1a; padding: 24px 30px; display: flex; align-items: center;">
        <span style="color: #ff640d; font-size: 22px; font-weight: 900; letter-spacing: -1px;">Pixelate Nest</span>
      </div>`;

    const messageHtml = message
      .split(/\n\n+/)
      .map(
        (para) =>
          `<p style="color: #444; line-height: 1.8; margin: 0 0 16px;">${para
            .split("\n")
            .join("<br/>")}</p>`,
      )
      .join("");

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  ${emailHeader}
  <div style="max-width: 600px; margin: 0 auto; padding: 30px 20px;">
    ${bannerHtml}
    <div style="background-color: #ffffff; padding: 36px 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <h1 style="color: #ff640d; font-size: 26px; margin: 0 0 20px;">${subject}</h1>
      ${messageHtml}
    </div>
  </div>
  ${emailFooter}
</body>
</html>`;

    await transporter.sendMail({
      from: `"Pixelate Nest" <${EMAIL}>`,
      to: EMAIL,
      bcc: recipientEmails,
      subject,
      html: htmlBody,
      attachments: bannerAttachment,
    });

    return NextResponse.json(
      { success: true, sent: recipientEmails.length },
      { status: 200, headers: CORS },
    );
  } catch (e: any) {
    console.error("newsletter error", e);
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
