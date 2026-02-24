import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const EMAIL = process.env.EMAIL
    const APP_PASSWORD = process.env.APP_PASSWORD

    if (!EMAIL || !APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Email credentials not configured' },
        { status: 500, headers: CORS }
      )
    }

    const { to, invoiceNo, clientName, pdfBase64, fileName, amount, dueDate, status } = body

    if (!to || !pdfBase64) {
      return NextResponse.json(
        { error: 'Missing required fields: to, pdfBase64' },
        { status: 400, headers: CORS }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL, pass: APP_PASSWORD },
    })

    const WEBSITE_URL = process.env.WEBSITE_URL || ''

    const htmlBody = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">
  <div style="background:#1a1a1a;padding:20px;">
    ${WEBSITE_URL ? `<img src="${WEBSITE_URL}/assets/logo-2.png" alt="Pixelate Nest" style="height:50px;margin-bottom:10px;"/>` : ''}
    <p style="color:#fff;margin:0;font-size:18px;font-weight:bold;">Pixelate Nest</p>
  </div>
  <div style="max-width:600px;margin:0 auto;padding:30px 20px;">
    <h2 style="color:#044bab;font-size:24px;margin-bottom:8px;">Invoice from Pixelate Nest</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;">
      Dear <strong>${clientName || 'Valued Client'}</strong>,
    </p>
    <p style="color:#555;font-size:15px;line-height:1.6;">
      Please find your invoice attached to this email. Here's a quick summary:
    </p>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;background:#fff;border:1px solid #e0e0e0;">
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;font-weight:bold;color:#333;width:40%;">Invoice No</td>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#555;">${invoiceNo || '—'}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Amount</td>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#044bab;font-weight:bold;font-size:16px;">₹${Number(amount || 0).toLocaleString('en-IN')}</td>
      </tr>
      ${dueDate ? `<tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;font-weight:bold;color:#333;">Due Date</td>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#555;">${new Date(dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
      </tr>` : ''}
      ${status ? `<tr>
        <td style="padding:12px 16px;font-weight:bold;color:#333;">Status</td>
        <td style="padding:12px 16px;"><span style="background:${status === 'PAID' ? '#dcfce7' : '#fef9c3'};color:${status === 'PAID' ? '#166534' : '#854d0e'};padding:3px 10px;border-radius:4px;font-size:13px;font-weight:bold;">${status}</span></td>
      </tr>` : ''}
    </table>
    <p style="color:#555;font-size:14px;line-height:1.6;">
      If you have any questions about this invoice, please don't hesitate to contact us.
    </p>
    <p style="color:#555;font-size:14px;">
      Thank you for your business! 🙏
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
`

    await transporter.sendMail({
      from: `"Pixelate Nest" <${EMAIL}>`,
      to,
      subject: `Invoice ${invoiceNo ? `#${invoiceNo}` : ''} from Pixelate Nest`,
      html: htmlBody,
      attachments: [
        {
          filename: fileName || `Invoice-${invoiceNo || 'document'}.pdf`,
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf',
        },
      ],
    })

    return NextResponse.json({ success: true }, { status: 200, headers: CORS })
  } catch (e: any) {
    console.error('send-invoice-email error', e)
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS }
    )
  }
}
