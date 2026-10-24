import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In-memory logging of support request (zero disk/database storage)
    console.log(`[Contact Form Received] Topic: "${subject}" from "${name}" <${email}>`);

    return NextResponse.json({ success: true, message: 'Message received successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
