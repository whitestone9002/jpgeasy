'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  Check, 
  Copy, 
  ExternalLink,
  Wrench,
  FileQuestion,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactContent() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  // Easily replaceable contact email
  const contactEmail = 'support@jpgeasy.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Hero Header */}
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
          Our engineering team is here to assist.
        </p>
      </div>

      {/* Main Direct Contact Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-base-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-base-content">Official Support Email</h2>
              <p className="text-xs sm:text-sm text-base-content/70">
                Direct channel for user support, inquiries, and technical reports
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${contactEmail}`}
              className="btn btn-primary btn-sm sm:btn-md gap-2 rounded-xl text-white shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
            <button
              onClick={handleCopyEmail}
              className="btn btn-outline btn-sm sm:btn-md gap-2 rounded-xl"
              aria-label="Copy support email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-base-content/80 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-primary" />
              Response Time
            </div>
            <p className="text-sm text-base-content/70">
              Usually within <strong>24 to 48 hours</strong> (Monday through Friday).
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-base-content/80 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Privacy Commitment
            </div>
            <p className="text-sm text-base-content/70">
              We never share your email address or personal details with any third parties.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-base-content/80 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-pink-500" />
              100% Free Support
            </div>
            <p className="text-sm text-base-content/70">
              Assistance with file processing or portal specifications is always free.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Categories */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2.5">
          <HelpCircle className="w-6 h-6 text-primary shrink-0" />
          Common Inquiry Topics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-base-content">Tool Bug Reports</h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Encountered an unexpected error while compressing an image or converting a document? Please include your browser type and file format so we can fix it quickly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileQuestion className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-base-content">Feature Requests</h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Need a specific target compression size (e.g. 15KB or 30KB) or an exam portal dimension preset? Let us know and we will engineer a dedicated solution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-base-content">DMCA & Legal</h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              For trademark, copyright, privacy policy, or legal notices, our administrative team reviews all official correspondence with top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
