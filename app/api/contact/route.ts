import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns/promises';

// S-Tier Security: Strict URL, Domain, and Link Detector
const URL_LINK_REGEX = /(https?:\/\/|ftp:\/\/|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|org|net|io|co|xyz|ru|cn|biz|info|me|app|site|online|top|live|shop|club|vip|pro|dev|cc|tk)($|[\/\s\?#:])|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/)/i;

// S-Tier Security: HTML tags, scripts, image embeds, protocol handlers
const CODE_HTML_REGEX = /<[^>]*>|javascript:|data:|vbscript:|onload=|onerror=/i;

// Strict RFC 5322 Email Syntax Regex
const EMAIL_SYNTAX_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Common fake / throwaway / disposable email domains blacklist
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
  'throwawaymail.com', 'yopmail.com', 'trashmail.com', 'fakemailgenerator.com',
  'sharklasers.com', 'dispostable.com', 'getnada.com', 'inboxkitten.com',
  'temp-mail.org', 'burnermail.io', 'generator.email', 'mohmal.com',
  'mytemp.email', 'crazymailing.com', 'armyspy.com', 'cuvox.de',
  'dayrep.com', 'fleckens.hu', 'gustr.com', 'jourrapide.com',
  'rhyta.com', 'superrito.com', 'teleworm.us', 'einrot.com',
  'example.com', 'test.com', 'fake.com', 'sample.com', 'invalid.com',
  'mailcatch.com', 'maildrop.cc', 'tempmailaddress.com', 'discard.email'
]);

// 24-Hour Cooldown In-Memory Store (normalizedEmail -> timestamp)
const emailRateLimits = new Map<string, number>();
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 Hours in milliseconds

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
    email = String(email).trim().toLowerCase();
    subject = String(subject || 'Other').trim();
    message = String(message).trim();

    // 2. Strict Email Validation: Syntax & Format
    if (email.length > 120 || !EMAIL_SYNTAX_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid, real email address.' }, 
        { status: 400 }
      );
    }

    const domain = email.split('@')[1];
    if (!domain || domain.indexOf('.') === -1) {
      return NextResponse.json(
        { error: 'Invalid email domain format.' }, 
        { status: 400 }
      );
    }

    // 3. Strict Email Validation: Disposable/Burner Domain Check
    if (DISPOSABLE_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: 'Disposable or temporary email addresses are not permitted. Please use your real, permanent email.' }, 
        { status: 400 }
      );
    }

    // 4. Strict Email Validation: Real Internet Domain & Active Mail Server (DNS MX Record) Check
    try {
      const mxRecords = await dns.resolveMx(domain);
      if (!mxRecords || mxRecords.length === 0) {
        return NextResponse.json(
          { error: `The email domain "@${domain}" does not appear to have active mail servers. Please provide an active, existing email address.` }, 
          { status: 400 }
        );
      }
    } catch (dnsErr: any) {
      // Domain does not exist on public DNS or has no MX records
      return NextResponse.json(
        { error: `The email domain "@${domain}" is not a valid, reachable mail server. Please check for spelling mistakes or use a real email.` }, 
        { status: 400 }
      );
    }

    // 5. Strict 24-Hour Cooldown per Email Rule
    const lastSent = emailRateLimits.get(email);
    const now = Date.now();

    if (lastSent && now - lastSent < COOLDOWN_MS) {
      const remainingMs = COOLDOWN_MS - (now - lastSent);
      const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
      const remainingMinutes = Math.ceil((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      
      const timeString = remainingHours > 0 
        ? `${remainingHours} hour${remainingHours > 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`
        : `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;

      return NextResponse.json(
        { error: `This email address has already submitted a message today. To prevent spam, you can only send 1 message every 24 hours. Please wait ${timeString} before submitting again.` }, 
        { status: 429 }
      );
    }

    // 6. Character length validation
    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 80 characters.' }, 
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

    // 7. S-Tier Anti-Link & Anti-Photo Security Barrier
    if (URL_LINK_REGEX.test(message) || URL_LINK_REGEX.test(name)) {
      return NextResponse.json(
        { error: 'For security reasons, web links, URLs, and external domains are strictly prohibited in messages.' }, 
        { status: 400 }
      );
    }

    // 8. S-Tier Anti-Code & Anti-HTML Security Barrier
    if (CODE_HTML_REGEX.test(message) || CODE_HTML_REGEX.test(name)) {
      return NextResponse.json(
        { error: 'For security reasons, HTML tags, scripts, and embedded media are strictly prohibited.' }, 
        { status: 400 }
      );
    }

    // 9. Topic Whitelist Validation
    if (!ALLOWED_TOPICS.includes(subject)) {
      subject = 'Other';
    }

    // 10. Forward to Web3Forms Gateway for Physical Phone Delivery
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: '354c2270-1d79-44da-8b3b-600f3743fcd6',
        name,
        email,
        subject: `[JPGEASY Support] ${subject} - from ${name}`,
        message,
        from_name: 'JPGEASY Security Gateway'
      }),
    });

    const web3Result = await web3Response.json().catch(() => ({}));

    if (!web3Response.ok || !web3Result.success) {
      return NextResponse.json(
        { error: web3Result.message || 'Service is temporarily unable to dispatch message. Please try again later.' }, 
        { status: 502 }
      );
    }

    // Record the 24-hour rate limit timestamp for this verified email
    emailRateLimits.set(email, now);

    // Prune stale rate-limit records older than 24 hours to prevent memory leaks
    if (emailRateLimits.size > 2000) {
      emailRateLimits.forEach((ts, key) => {
        if (now - ts >= COOLDOWN_MS) {
          emailRateLimits.delete(key);
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Support request received and dispatched successfully.' 
    });
  } catch (_) {
    return NextResponse.json(
      { error: 'Failed to process support request.' }, 
      { status: 500 }
    );
  }
}
