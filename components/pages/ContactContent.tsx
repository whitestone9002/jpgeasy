'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  MessageSquare, 
  Inbox, 
  ShieldCheck, 
  Check, 
  Send, 
  HelpCircle, 
  Wrench, 
  Lock,
  AlertTriangle,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// S-Tier Security: URL and link detector regex
const URL_DETECTOR_REGEX = /(https?:\/\/|ftp:\/\/|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|org|net|io|co|xyz|ru|cn|biz|info|me|app|site|online|top|live|shop|club|vip|pro|dev|cc|tk)($|[\/\s\?#:])|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/)/i;

// S-Tier Security: HTML tags, scripts, image embeds, protocol handlers
const HTML_CODE_REGEX = /<[^>]*>|javascript:|data:|vbscript:|onload=|onerror=/i;

// Strict RFC 5322 Syntax Regex
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

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 Hours in milliseconds

export default function ContactContent() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Technical problem',
    message: ''
  });

  // Client-Side 24-Hour Cooldown Checker per Email
  useEffect(() => {
    const trimmedEmail = formData.email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setCooldownRemaining(null);
      return;
    }

    try {
      const storedTime = localStorage.getItem(`jpgeasy_sent_${trimmedEmail}`);
      if (storedTime) {
        const lastSent = parseInt(storedTime, 10);
        const elapsed = Date.now() - lastSent;
        if (elapsed < COOLDOWN_MS) {
          const remainingMs = COOLDOWN_MS - elapsed;
          const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
          const remainingMinutes = Math.ceil((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
          const timeMsg = remainingHours > 0 
            ? `${remainingHours}h ${remainingMinutes}m` 
            : `${remainingMinutes} minutes`;
          setCooldownRemaining(`This email has already sent a message today. Please wait ${timeMsg} before submitting again.`);
          return;
        }
      }
      setCooldownRemaining(null);
    } catch (_) {
      setCooldownRemaining(null);
    }
  }, [formData.email]);

  // Real-time security checks
  const securityViolation = useMemo(() => {
    if (!formData.message && !formData.name && !formData.email) return null;

    // Email check
    if (formData.email.trim()) {
      const emailLower = formData.email.trim().toLowerCase();
      const domain = emailLower.split('@')[1];
      if (domain && DISPOSABLE_DOMAINS.has(domain)) {
        return 'Disposable or temporary email addresses are not permitted. Please use your real, permanent email.';
      }
    }

    if (URL_DETECTOR_REGEX.test(formData.message) || URL_DETECTOR_REGEX.test(formData.name)) {
      return 'Links, URLs, and external web addresses are strictly blocked for security.';
    }

    if (HTML_CODE_REGEX.test(formData.message) || HTML_CODE_REGEX.test(formData.name)) {
      return 'HTML code, scripts, and embedded tags are strictly blocked for security.';
    }

    return null;
  }, [formData.message, formData.name, formData.email]);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Block rich media / file / image pasting
    if (e.clipboardData.files && e.clipboardData.files.length > 0) {
      e.preventDefault();
      setErrorMessage('Image and file attachments cannot be pasted into the message field.');
      return;
    }
    
    // Clean text paste
    const pastedText = e.clipboardData.getData('text/plain');
    if (URL_DETECTOR_REGEX.test(pastedText) || HTML_CODE_REGEX.test(pastedText)) {
      setErrorMessage('Pasted content contains web links or code. Only plain text is accepted.');
    } else {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cooldownRemaining) {
      setErrorMessage(cooldownRemaining);
      return;
    }

    if (securityViolation) {
      setErrorMessage(securityViolation);
      return;
    }

    const emailTrimmed = formData.email.trim().toLowerCase();

    // Syntax validation
    if (!EMAIL_SYNTAX_REGEX.test(emailTrimmed)) {
      setErrorMessage('Please provide a valid, real email address format.');
      return;
    }

    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Strict server-side security, DNS MX verification, and 24h rate-limiting
      const verifyResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: emailTrimmed,
          subject: formData.subject,
          message: formData.message.trim(),
        }),
      });

      const verifyResult = await verifyResponse.json().catch(() => ({}));

      if (!verifyResponse.ok || !verifyResult.success) {
        setIsSubmitting(false);
        setErrorMessage(verifyResult.error || 'Failed to verify message. Please ensure your email is real and your message contains plain text only.');
        return;
      }

      // Step 2: Client-side dispatch to Web3Forms gateway
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '354c2270-1d79-44da-8b3b-600f3743fcd6',
          name: formData.name.trim(),
          email: emailTrimmed,
          subject: `[JPGEASY Support] ${formData.subject} - from ${formData.name.trim()}`,
          message: formData.message.trim(),
          from_name: 'JPGEASY Support Desk'
        })
      });

      const web3Result = await web3Response.json().catch(() => ({}));

      if (!web3Response.ok || !web3Result.success) {
        setIsSubmitting(false);
        setErrorMessage(web3Result.message || 'Service is temporarily unable to dispatch message. Please try again later.');
        return;
      }

      // Step 3: Lock 24-hour rate limit on server and client
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'record', email: emailTrimmed })
        });
        localStorage.setItem(`jpgeasy_sent_${emailTrimmed}`, Date.now().toString());
      } catch (_) {}

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (_) {
      setIsSubmitting(false);
      setErrorMessage('Network error while sending request. Please check your connection and try again.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
          <MessageSquare className="w-3.5 h-3.5" />
          {t('contactBadge', 'Support Desk')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-base-content tracking-tight">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-base-content/70 leading-relaxed">
          Have feedback, a tool suggestion, or found an issue? Send us a message below and our engineering team will log it for our platform updates.
        </p>
      </div>

      {/* Main Layout: Form + Help Details (Identical to iLovePDF architecture) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Interactive Contact Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-6">
          <div className="space-y-1 pb-4 border-b border-base-200">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Send a Request
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70">
              Please provide as much detail as possible in plain text.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-base-content">Message Sent Successfully!</h3>
              <p className="text-sm text-base-content/75 leading-relaxed max-w-md mx-auto">
                Thank you for contacting JPGEASY! Your message and feedback have been received and queued for our engineering review. We appreciate your input as we continue improving our tools.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-base-200 text-xs text-base-content/70">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Next message allowed from this email in 24 hours</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Server or Client Security Alert */}
              {(errorMessage || securityViolation || cooldownRemaining) && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-error" />
                  <div className="space-y-1">
                    <strong className="font-bold block">Security Notice</strong>
                    <span>{errorMessage || securityViolation || cooldownRemaining}</span>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-base-content/85">
                  Your name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrorMessage(null);
                  }}
                  className="input input-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-base-content/85">
                    Your email <span className="text-error">*</span>
                  </label>
                  <div className="flex items-center gap-1 text-[11px] text-base-content/50">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Real email required • 1 msg / 24h</span>
                  </div>
                </div>
                <input
                  type="email"
                  required
                  maxLength={120}
                  placeholder="Enter your real, active email address"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrorMessage(null);
                  }}
                  className={`input input-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100 ${
                    cooldownRemaining ? 'border-error focus:border-error' : ''
                  }`}
                />
                <span className="text-[11px] text-base-content/50 block">
                  Must be a real, reachable email. Temporary or disposable domains are automatically rejected.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-base-content/85">
                  General subject <span className="text-error">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="select select-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100 font-medium"
                >
                  <option value="Technical problem">Technical problem / Tool error</option>
                  <option value="Suggest a feature">Suggest a feature / New tool request</option>
                  <option value="Portal & Specifications">Exam or Visa portal dimension question</option>
                  <option value="Privacy and security">Privacy and security question</option>
                  <option value="DMCA & Legal">DMCA / Copyright / Legal notice</option>
                  <option value="Other">Other general inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-base-content/85">
                    Message <span className="text-error">*</span>
                  </label>
                  <div className="flex items-center gap-1.5 text-[11px] text-base-content/50">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span>Raw text only (no links or code)</span>
                  </div>
                </div>

                <textarea
                  required
                  rows={5}
                  maxLength={2000}
                  onPaste={handlePaste}
                  placeholder="Type your message or describe the issue here in plain text..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    setErrorMessage(null);
                  }}
                  className={`textarea textarea-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100 leading-relaxed ${
                    securityViolation ? 'border-error focus:border-error' : ''
                  }`}
                />

                <div className="flex items-center justify-between text-[11px] text-base-content/50 px-1">
                  <span>
                    {securityViolation ? (
                      <span className="text-error font-medium flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        URLs & HTML code are prohibited
                      </span>
                    ) : (
                      'Plain text only • Max 2,000 characters'
                    )}
                  </span>
                  <span>{formData.message.length} / 2000</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || Boolean(securityViolation) || Boolean(cooldownRemaining)}
                className="btn btn-primary w-full gap-2 rounded-xl text-white shadow-sm disabled:bg-base-300 disabled:text-base-content/40"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    <span>Verifying Email & Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Support & Help Desk Card (Zero Email Shown) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-base-content flex items-center gap-2 pb-4 border-b border-base-200">
              <HelpCircle className="w-5 h-5 text-primary" />
              Support Information
            </h3>

            <div className="space-y-5 text-xs sm:text-sm text-base-content/80">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Inbox className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-base-content text-sm block">Engineering Review Queue</strong>
                  <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed">
                    All bug reports, tool feedback, and portal requests are logged and reviewed periodically by our engineering team to improve the platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-base-content text-sm block">1 Message Per Email / 24 Hours</strong>
                  <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed">
                    To prevent system congestion and automated spam, each verified email address can submit at most 1 inquiry every 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-base-content text-sm block">Strict Verification Gateway</strong>
                  <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed">
                    Every email is verified for active mail server records (DNS MX). Disposable, temporary, or non-existent domains are automatically filtered and rejected.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-base-content text-sm block">Raw Text Firewall</strong>
                  <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed">
                    Links, scripts, attachments, and embedded code are strictly rejected to guarantee complete platform and user security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bug Report Guideline */}
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-base-content uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              Reporting an Issue?
            </h4>
            <p className="text-xs text-base-content/70 leading-relaxed">
              If an image compression or PDF conversion did not perform as expected, please mention your <strong>browser</strong> (Chrome, Safari, Edge, Firefox) and the <strong>approximate file size</strong> in plain text so we can resolve it quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
