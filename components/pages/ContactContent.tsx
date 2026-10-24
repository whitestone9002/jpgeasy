'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Check, 
  Copy, 
  Send,
  HelpCircle, 
  Wrench, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactContent() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const officialEmail = 'jpgeasy.official@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Create mailto link as fallback so user can send directly
    const subjectLine = encodeURIComponent(`[JPGEASY Support] ${formData.subject} - from ${formData.name}`);
    const bodyContent = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    
    // Trigger user's mail client
    window.location.href = `mailto:${officialEmail}?subject=${subjectLine}&body=${bodyContent}`;
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
          <MessageSquare className="w-3.5 h-3.5" />
          {t('contactBadge', 'Contact & Support')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-base-content tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-base sm:text-lg text-base-content/70 leading-relaxed">
          Have a question about our image and PDF tools, spotted a bug, or want to suggest a new feature? 
          Send us a message below or contact our team directly.
        </p>
      </div>

      {/* Main Grid: Form + Direct Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Contact Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-6">
          <div className="space-y-1 pb-4 border-b border-base-200">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70">
              Fill out the form and our support desk will respond to your email.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-base-content">Thank You for Reaching Out!</h3>
              <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed max-w-md mx-auto">
                Your message has been initiated. If your email application did not launch automatically, you can also email us directly at{' '}
                <strong className="text-base-content">{officialEmail}</strong>. We typically respond within 24–48 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn btn-outline btn-xs sm:btn-sm rounded-xl mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-base-content/80">
                    Your Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input input-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-base-content/80">
                    Your Email (for replies) <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input input-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-base-content/80">
                  Topic / Category <span className="text-error">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="select select-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100"
                >
                  <option value="General Inquiry">General Question / Feedback</option>
                  <option value="Bug Report">Bug Report / Tool Not Working</option>
                  <option value="Feature Request">Suggest a New Feature or Tool</option>
                  <option value="Portal Specs">Exam or Visa Portal Specification Question</option>
                  <option value="DMCA & Legal">DMCA / Copyright / Business</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-base-content/80">
                  Your Message <span className="text-error">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your issue or suggestion in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="textarea textarea-bordered w-full text-sm rounded-xl bg-base-200/40 focus:bg-base-100 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full gap-2 rounded-xl text-white shadow-sm mt-2"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-base-200">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-base-content">Direct Support Email</h3>
                <p className="text-xs text-base-content/70">Official JPGEASY channel</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-base-200/50 border border-base-300/60 flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-mono font-medium text-base-content truncate">
                {officialEmail}
              </span>
              <button
                onClick={handleCopyEmail}
                className="btn btn-ghost btn-xs rounded-lg gap-1 shrink-0"
                aria-label="Copy official support email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-base-content/75 pt-1">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-base-content block">Response Hours</strong>
                  <span>We usually respond within 24 to 48 hours (Monday through Friday).</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-base-content block">Privacy Protection</strong>
                  <span>Your email address and inquiry details are never sold or shared.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-base-content block">100% Free Service</strong>
                  <span>Assistance with tool bugs or portal specifications is always free.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-base-content uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Reporting a Tool Issue?
            </h4>
            <p className="text-xs text-base-content/70 leading-relaxed">
              If a tool failed to compress or convert your file, please let us know your <strong>browser type</strong> (Chrome, Safari, Edge) and the <strong>approximate file size</strong> so our engineers can replicate and patch it quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
