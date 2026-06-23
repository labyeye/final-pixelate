import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { requireAuth } from "@/lib/require-auth";

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  const EMAIL = process.env.EMAIL;
  const APP_PASSWORD = process.env.APP_PASSWORD;
  const WEBSITE_URL = process.env.WEBSITE_URL || "https://pixelatenest.com";

  if (!EMAIL || !APP_PASSWORD) {
    return NextResponse.json(
      { error: "Email credentials not configured" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const { to, clientName, quotation, agencyName, agencyPhone, agencyEmail, agencyWebsite } = body as {
      to: string;
      clientName: string;
      agencyName?: string;
      agencyPhone?: string;
      agencyEmail?: string;
      agencyWebsite?: string;
      quotation: {
        quoteId?: string;
        title?: string;
        date?: string;
        services?: Array<{ serviceName: string; price: number; qty: number }>;
        timeline?: Array<{ phase: string; duration: string }>;
        paymentTerms?: string;
        notes?: string;
      };
    };

    if (!to) {
      return NextResponse.json({ error: "Recipient email is required" }, { status: 400 });
    }

    const grandTotal = (quotation.services || []).reduce(
      (sum, s) => sum + s.price * s.qty,
      0,
    );

    const quoteDate = quotation.date
      ? new Date(quotation.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
      : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

    const servicesRows = (quotation.services || [])
      .map(
        (s) => `
        <tr>
          <td style="padding:10px 14px;border:1px solid #ddd;font-weight:600;color:#111;">${s.serviceName}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:center;color:#555;">${s.qty}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:right;color:#555;">Rs.${s.price.toLocaleString("en-IN")}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:700;color:#111;">Rs.${(s.price * s.qty).toLocaleString("en-IN")}</td>
        </tr>`,
      )
      .join("");

    const timelineRows = (quotation.timeline || [])
      .map(
        (t) => `
        <tr>
          <td style="padding:10px 14px;border:1px solid #ddd;font-weight:600;color:#111;">${t.phase}</td>
          <td style="padding:10px 14px;border:1px solid #ddd;text-align:right;color:#555;">${t.duration}</td>
        </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">

  <!-- Header -->
  <div style="background:#111;padding:24px 40px;display:flex;align-items:center;justify-content:space-between;">
    <img src="${WEBSITE_URL}/assets/images/Logo_White_Name_Large.png" alt="${agencyName || "Pixelate Nest"}" style="height:48px;object-fit:contain;">
    <span style="color:#aaa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Quotation</span>
  </div>

  <!-- Body -->
  <div style="max-width:640px;margin:0 auto;padding:32px 20px;">

    <!-- Quote ID + title block -->
    <div style="background:#fff;border:2px solid #111;margin-bottom:24px;">
      <div style="background:#111;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;">
        <span style="color:#fff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;">${quotation.quoteId || "QUOTATION"}</span>
        <span style="color:#aaa;font-size:11px;font-weight:700;">${quoteDate}</span>
      </div>
      <div style="padding:24px;">
        <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#111;text-transform:uppercase;letter-spacing:-0.01em;">${quotation.title || "Project Quotation"}</h1>
        <p style="margin:0;font-size:14px;color:#555;">Prepared for <strong>${clientName}</strong></p>
      </div>
    </div>

    <!-- Greeting -->
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:15px;color:#111;">Dear <strong>${clientName}</strong>,</p>
      <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
        Thank you for considering <strong>${agencyName || "Pixelate Nest"}</strong>. Please find below the details of our quotation for your project. We would be happy to discuss any aspect of this proposal at your convenience.
      </p>
    </div>

    ${servicesRows ? `
    <!-- Services -->
    <div style="margin-bottom:24px;">
      <div style="background:#111;padding:12px 16px;border:2px solid #111 border-bottom:none;">
        <span style="color:#fff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;">Services Breakdown</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:left;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Service</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:center;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Qty</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Price</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Total</th>
          </tr>
        </thead>
        <tbody>${servicesRows}</tbody>
        <tfoot>
          <tr style="background:#111;">
            <td colspan="3" style="padding:14px;border:1px solid #333;text-align:right;color:#fff;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">Grand Total</td>
            <td style="padding:14px;border:1px solid #333;text-align:right;color:#fff;font-weight:900;font-size:18px;">Rs.${grandTotal.toLocaleString("en-IN")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    ` : `
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;text-align:center;">
      <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#555;margin-bottom:8px;">Total Amount</div>
      <div style="font-size:32px;font-weight:900;color:#111;">Rs.${grandTotal.toLocaleString("en-IN")}</div>
    </div>
    `}

    ${timelineRows ? `
    <!-- Timeline -->
    <div style="margin-bottom:24px;">
      <div style="background:#111;padding:12px 16px;">
        <span style="color:#fff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;">Project Timeline</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:left;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Phase</th>
            <th style="padding:10px 14px;border:1px solid #ddd;text-align:right;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Duration</th>
          </tr>
        </thead>
        <tbody>${timelineRows}</tbody>
      </table>
    </div>
    ` : ""}

    ${quotation.paymentTerms ? `
    <!-- Payment Terms -->
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;">
      <div style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#555;margin-bottom:8px;">Payment Terms</div>
      <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">${quotation.paymentTerms}</p>
    </div>
    ` : ""}

    ${quotation.notes ? `
    <!-- Notes -->
    <div style="background:#fff;border:2px solid #111;padding:20px 24px;margin-bottom:24px;">
      <div style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#555;margin-bottom:8px;">Notes</div>
      <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">${quotation.notes}</p>
    </div>
    ` : ""}

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <p style="font-size:14px;color:#555;margin-bottom:16px;">Have questions? We are here to help.</p>
      <a href="mailto:${agencyEmail || EMAIL}" style="display:inline-block;background:#111;color:#fff;padding:14px 32px;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;">Contact Us</a>
    </div>

  </div>

  <!-- Footer -->
  <div style="background:#111;padding:20px 40px;text-align:center;">
    <p style="margin:0 0 6px;color:#aaa;font-size:11px;font-weight:700;">${agencyName || "Pixelate Nest"} &nbsp;|&nbsp; ${agencyPhone || "+91 84069 12345"} &nbsp;|&nbsp; ${agencyEmail || "support@pixelatenest.com"}</p>
    <p style="margin:0;color:#666;font-size:10px;">${agencyWebsite || "www.pixelatenest.com"}</p>
  </div>

</body>
</html>`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL, pass: APP_PASSWORD },
    });

    const mailOptions: any = {
      from: `${agencyName || "Pixelate Nest"} <${EMAIL}>`,
      to,
      subject: `Quotation ${quotation.quoteId || ""} — ${quotation.title || "Project Proposal"} | ${agencyName || "Pixelate Nest"}`,
      html,
    };

    if (body.pdfBase64) {
      const safeTitle = (quotation.title || "Quotation").replace(/[^a-zA-Z0-9-_]/g, "-");
      const attachFilename = body.pdfFilename || `${quotation.quoteId || "Quotation"}-${safeTitle}.pdf`;
      mailOptions.attachments = [
        {
          filename: attachFilename,
          content: body.pdfBase64,
          encoding: "base64",
          contentType: "application/pdf",
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("send-quotation-email error:", e);
    return NextResponse.json({ error: e.message || "Failed to send email" }, { status: 500 });
  }
}
