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
      return NextResponse.json({ error: 'Email credentials not configured' }, { status: 500, headers: CORS })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL, pass: APP_PASSWORD }
    })

    const WEBSITE_URL = process.env.WEBSITE_URL || ''

    const emailHeader = `<div style="background-color: #1a1a1a; color: white; padding: 20px;"><img src="${WEBSITE_URL}/assets/logo-2.png" alt="Pixelate Nest Logo" style="height: 50px; margin-bottom: 20px;"/></div>`
    const emailFooter = `<div style="background-color: #1a1a1a; color: #666; text-align: center; padding: 20px; margin-top: 30px;"><p>© 2025 Pixelate Nest. All Rights Reserved.</p></div>`

    const customerTemplate = (name: string, selectedPlan?: string) => `<!DOCTYPE html><html><body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">${emailHeader}<div style="max-width: 600px; margin: 0 auto; padding: 20px;"><div style="text-align: center; padding: 40px 0;"><h1 style="color: #ff640d; font-size: 32px; margin: 0;">Thank You for Contacting Us</h1><p style="color: #666; font-size: 18px; margin-top: 10px;">Boom! Your message just landed in our inbox ✨</p></div><div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"><h2 style="color: #333; margin-top: 0;">Hello ${name},</h2><p style="color: #666; line-height: 1.6;">We've received your inquiry${selectedPlan ? ` about ${selectedPlan}` : ''}.</p><p style="color: #666; line-height: 1.6;">Our team will review your request and get back to you within 24-48 hours.</p><div style="text-align: center; margin-top: 30px;"><img src="${WEBSITE_URL}/assets/mail_banner.png" alt="Thank You Banner" style="max-width: 100%; border-radius: 8px;"/></div></div></div>${emailFooter}</body></html>`

    const ownerTemplate = (data: any) => `<!DOCTYPE html><html><body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">${emailHeader}<div style="max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #ff640d; margin-bottom: 20px;">New Project Inquiry</h1><div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"><h2 style="color: #333; margin-top: 0;">Client Details</h2><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td></tr><tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.email}</td></tr><tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phone}</td></tr><tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Project Type:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.projectType}</td></tr>${data.selectedPlan ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Selected Plan:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.selectedPlan}</td></tr>` : ``}<tr><td style="padding: 10px 0;"><strong>Message:</strong></td><td style="padding: 10px 0;">${data.message || 'No message provided'}</td></tr></table></div></div>${emailFooter}</body></html>`

    // send email to owner
    await transporter.sendMail({ from: EMAIL, to: EMAIL, subject: `New Project Inquiry: ${body.subject || ''}`, html: ownerTemplate(body) })
    // send confirmation to customer (best effort)
    try { await transporter.sendMail({ from: EMAIL, to: body.email, subject: 'Thank you for contacting Pixelate Nest', html: customerTemplate(body.name || 'Customer', body.selectedPlan) }) } catch (e) { console.warn('Customer email failed', e) }

    return NextResponse.json({ success: true }, { status: 200, headers: CORS })
  } catch (e: any) {
    console.error('send-email error', e)
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
