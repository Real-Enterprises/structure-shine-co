import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, city, projectType, message } = body;

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Real Enterprises Website <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Enquiry from ${name} — ${projectType || 'General'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td>
            <td style="padding:8px;border:1px solid #ddd">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td>
            <td style="padding:8px;border:1px solid #ddd">${phone}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td>
            <td style="padding:8px;border:1px solid #ddd">${email || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">City</td>
            <td style="padding:8px;border:1px solid #ddd">${city || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Project Type</td>
            <td style="padding:8px;border:1px solid #ddd">${projectType || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td>
            <td style="padding:8px;border:1px solid #ddd">${message || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Submitted</td>
            <td style="padding:8px;border:1px solid #ddd">
              ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}
            </td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Enquiry sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
