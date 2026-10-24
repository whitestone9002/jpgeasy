import { NextRequest, NextResponse } from 'next/server';

// S-Tier Security: Strict URL, Domain, and Link Detector
const URL_LINK_REGEX = /(https?:\/\/|ftp:\/\/|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|org|net|io|co|xyz|ru|cn|biz|info|me|app|site|online|top|live|shop|club|vip|pro|dev|cc|tk)($|[\/\s\?#:])|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/)/i;

// S-Tier Security: HTML tags, scripts, image embeds, protocol handlers
const CODE_HTML_REGEX = /<[^>]*>|javascript:|data:|vbscript:|onload=|onerror=/i;

// Valid topic options
const ALLOWED_TOPICS = [
  'Technical problem',
  'Suggest a feature',
  'Portal & Specifications',
  'Privacy and security',
  'DMCA & Legal',
  'Other'
];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    let { name, email, subject, message } = data;

    // 1. Mandatory presence check
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' }, 
        { status: 400 }
      );
    }

    // Clean leading/trailing whitespace
    name = String(name).trim();
    email = String(email).trim();
    subject = String(subject || 'Other').trim();
    message = String(message).trim();

    // 2. Character length validation
    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 80 characters.' }, 
        { status: 400 }
      );
    }

    if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' }, 
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' }, 
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message cannot exceed 2,000 characters.' }, 
        { status: 400 }
      );
    }

    // 3. S-Tier Anti-Link & Anti-Photo Security Barrier
    if (URL_LINK_REGEX.test(message) || URL_LINK_REGEX.test(name)) {
      return NextResponse.json(
        { error: 'For security reasons, web links, URLs, and external domains are strictly prohibited in messages.' }, 
        { status: 400 }
      );
    }

    // 4. S-Tier Anti-Code & Anti-HTML Security Barrier
    if (CODE_HTML_REGEX.test(message) || CODE_HTML_REGEX.test(name)) {
      return NextResponse.json(
        { error: 'For security reasons, HTML tags, scripts, and embedded media are strictly prohibited.' }, 
        { status: 400 }
      );
    }

    // 5. Topic Whitelist Validation
    if (!ALLOWED_TOPICS.includes(subject)) {
      subject = 'Other';
    }

    // In-memory sanitized logging (Zero disk / zero database storage)
    const sanitizedName = name.replace(/[^a-zA-Z0-9\s.-]/g, '');
    console.log(`[Support Ticket Received] Topic: "${subject}" | From: "${sanitizedName}" <${email}> (${message.length} chars)`);

    return NextResponse.json({ 
      success: true, 
      message: 'Support request received successfully.' 
    });
  } catch (_) {
    return NextResponse.json(
      { error: 'Failed to process support request.' }, 
      { status: 500 }
    );
  }
}
