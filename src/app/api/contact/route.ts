import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, service, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_EMAIL = "hello@jjfilms.studio",
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // SMTP not configured — log and return success so the UI still works
    console.info("[contact] SMTP not configured. Received enquiry:", { name, email, service });
    return NextResponse.json({ ok: true });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2A2520">
      <h2 style="font-size:24px;border-bottom:1px solid #DDD4C5;padding-bottom:12px">
        New enquiry — JJFILMS
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 0;color:#9B9287;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;width:120px">Name</td><td style="padding:8px 0">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#9B9287;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#8B7355">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px 0;color:#9B9287;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ""}
        ${service ? `<tr><td style="padding:8px 0;color:#9B9287;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">Service</td><td style="padding:8px 0">${service}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding:16px;background:#F7F3ED;border-radius:4px">
        <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</p>
      </div>
      <p style="margin-top:24px;font-size:11px;color:#9B9287">
        Reply directly to this email to respond to ${name}.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"JJFILMS Studio" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
