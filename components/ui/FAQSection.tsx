'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  hideHeader?: boolean;
}

export default function FAQSection({ faqs, hideHeader = false }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  if (!faqs || faqs.length === 0) return null;

  const content = (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden transition-colors min-w-0"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 font-semibold text-xs sm:text-sm text-base-content hover:text-primary transition-colors cursor-pointer"
            >
              <span className="min-w-0 flex-1 break-words leading-snug">{t(faq.q, faq.q)}</span>
              <ChevronDown
                className={`w-4 h-4 text-base-content/50 transition-transform duration-200 shrink-0 mt-0.5 sm:mt-0 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-base-content/75 leading-relaxed border-t border-base-200/60 pt-3 bg-base-200/20 animate-in fade-in duration-150 break-words">
                {t(faq.a, faq.a)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  if (hideHeader) {
    return <div className="w-full min-w-0">{content}</div>;
  }

  return (
    <div className="w-full mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-base-300 min-w-0">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <HelpCircle className="w-5 h-5 text-primary shrink-0" />
        <h3 className="text-lg sm:text-xl font-bold text-base-content">
          {t('faqTitle', 'Frequently Asked Questions')}
        </h3>
      </div>
      {content}
    </div>
  );
}
