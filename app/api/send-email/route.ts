import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTE: You must provide RESEND_API_KEY in your .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, message } = body;

    // Validate requirements
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'Golden Pushers <onboarding@resend.dev>', // Use a verified domain in production
      to: 'goldenpushers@gmail.com',
      replyTo: email,
      subject: `New Production Inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Project Type: ${type || 'N/A'}

Message:
${message}
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send communication' },
      { status: 500 }
    );
  }
}
