'use client';

import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Check, 
  Send, 
  HelpCircle, 
  Wrench, 
  Lock,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// S-Tier Security: URL and link detector regex
const URL_DETECTOR_REGEX = /(https?:\/\/|ftp:\/\/|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|org|net|io|co|xyz|ru|cn|biz|info|me|app|site|online|top|live|shop|club|vip|pro|dev|cc|tk)($|[\/\s\?#:])|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/)/i;

// S-Tier Security: HTML tags, scripts, image embeds, protocol handlers
const HTML_CODE_REGEX = /<[^>]*>|javascript:|data:|vbscript:|onload=|onerror=/i;

export default function ContactContent() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Technical problem',
    message: ''
  });

  // Real-time security checks
  const securityViolation = useMemo(() => {
    if (!formData.message && !formData.name) return null;

    if (URL_DETECTOR_REGEX.test(formData.message) || URL_DETECTOR_REGEX.test(formData.name)) {
      return 'Links, URLs, and external web addresses are strictly blocked for security.';
    }

    if (HTML_CODE_REGEX.test(formData.message) || HTML_CODE_REGEX.test(formData.name)) {
      return 'HTML code, scripts, and embedded tags are strictly blocked for security.';
    }

    return null;
  }, [formData.message, formData.name]);

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

    if (securityViolation) {
      setErrorMessage(securityViolation);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '354c2270-1d79-44da-8b3b-600f3743fcd6',
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: `[JPGEASY Support] ${formData.subject} - from ${formData.name.trim()}`,
          message: formData.message.trim(),
          from_name: 'JPGEASY Support Desk'
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        setIsSubmitting(false);
        setErrorMessage(result.message || 'Failed to send message. Please ensure your message contains plain text only.');
        return;
      }

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
          We would love to help you. Fill in the form below and our support team will get back to you as soon as possible.
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
              Please provide as much detail as possible so we can best assist you.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-base-content">Message Sent Successfully!</h3>
              <p className="text-sm text-base-content/75 leading-relaxed max-w-md mx-auto">
                Thank you for contacting JPGEASY. Your inquiry has been received by our technical support desk. We will review your request and reply directly to your email address (<strong>{formData.email}</strong>) shortly.
              </p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Technical problem', message: '' });
                  setErrorMessage(null);
                }}
                className="btn btn-outline btn-sm rounded-xl mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Server or Client Security Alert */}
              {(errorMessage || securityViolation) && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-error" />
                  <div className="space-y-1">
                    <strong className="font-bold block">Security Restriction</strong>
                    <span>{errorMessage || securityViolation}</span>
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
                <label className="text-xs font-semibold text-base-content/85">
                  Your email <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  required
                  maxLength={120}
                  placeholder="Enter your email address (for replies)"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrorMessage(null);
                  }}
                  className="input input-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100"
                />
                <span className="text-[11px] text-base-content/50 block">
                  We will use this email address strictly to reply to your question.
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
                disabled={isSubmitting || Boolean(securityViolation)}
                className="btn btn-primary w-full gap-2 rounded-xl text-white shadow-sm disabled:bg-base-300 disabled:text-base-content/40"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    <span>Verifying & Sending...</span>
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
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-base-content text-sm block">Response Time</strong>
                  <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed">
                    Our team reviews all incoming support tickets and typically responds within <strong>24 to 48 hours</strong> (Monday through Friday).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-base-content text-sm block">100% Confidential</strong>
                  <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed">
                    Your name and email address are strictly used to reply to your question. We never share user information with third parties.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-base-content text-sm block">Security Hardened Desk</strong>
                  <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed">
                    For your protection and system integrity, our intake gateway strictly admits raw text only. Links, attachments, scripts, and executable code are automatically filtered and rejected.
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
