import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'Email service configuration incomplete' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Golden Pushers Website <onboarding@resend.dev>', // Replace with custom domain verified in Resend when ready
      to: ['goldenpushers@gmail.com'],
      subject: `New Cinematic Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #D4AF77;">
          <h2 style="color: #D4AF77; text-transform: uppercase; letter-spacing: 2px;">New Inquiry</h2>
          <hr style="border-color: #333;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <h3 style="color: #D4AF77; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">The Vision:</h3>
          <p style="white-space: pre-wrap; font-size: 16px; line-height: 1.6; color: #e5e5e5;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error sending email' }, { status: 500 });
  }
}
