'use client';

import React from 'react';
import Link from 'next/link';
import { GuideArticle } from '@/lib/config/guides';
import { ToolMeta } from '@/lib/config/tools';
import ToolCard from '@/components/ui/ToolCard';
import FAQSection from '@/components/ui/FAQSection';
import AdSlot from '@/components/ui/AdSlot';
import { useLanguage, getToolTranslationKey } from '@/lib/i18n/LanguageContext';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Info,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';

interface GuideArticleViewProps {
  guide: GuideArticle;
  primaryTool: ToolMeta | undefined;
  relatedGuides: GuideArticle[];
  relatedTools: ToolMeta[];
}

export default function GuideArticleView({
  guide,
  primaryTool,
  relatedGuides,
  relatedTools,
}: GuideArticleViewProps) {
  const { t } = useLanguage();

  const renderCalloutIcon = (type: 'tip' | 'info' | 'warning') => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />;
    }
  };

  const renderCalloutStyle = (type: 'tip' | 'info' | 'warning') => {
    switch (type) {
      case 'tip':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100';
      case 'warning':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100';
      case 'info':
      default:
        return 'bg-blue-500/10 border-blue-500/30 text-blue-950 dark:text-blue-100';
    }
  };

  return (
    <article className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-10 min-w-0 max-w-full overflow-x-hidden break-words">
      {/* Back Link */}
      <div>
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-xs font-semibold text-base-content/60 hover:text-primary transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{t('backToGuides', 'Back to all guides')}</span>
        </Link>
      </div>

      {/* Top Article Ad Banner */}
      <AdSlot slot="article-top-banner" format="banner" className="my-4 sm:my-6" />

      {/* Article Header */}
      <div className="space-y-3 sm:space-y-4 min-w-0 max-w-full whitespace-normal">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="badge badge-primary badge-sm font-semibold text-[11px] sm:text-xs">
            {t(guide.category, guide.categoryLabel)}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-base-content/50">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{guide.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-base-content/50">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{t('updated', 'Updated')} {guide.updatedAt}</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-base-content leading-snug sm:leading-tight break-words whitespace-normal">
          {t(`${guide.slug}_title`, guide.title)}
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-base-content/75 leading-relaxed font-normal pt-1 break-words whitespace-normal">
          {t(`${guide.slug}_desc`, guide.introduction)}
        </p>
      </div>

      {/* Visual Guide Banner */}
      {guide.coverImage && (
        <div className="flex justify-center w-full my-1 sm:my-3">
          <figure className="w-full max-w-3xl lg:max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border border-base-300 bg-base-100/60 shadow-lg">
            <img
              src={guide.coverImage}
              alt={guide.imageAlt || t(`${guide.slug}_title`, guide.title)}
              title={guide.title}
              width={1360}
              height={850}
              className="w-full h-auto object-cover block aspect-[16/10]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="sr-only">
              {guide.imageAlt || t(`${guide.slug}_title`, guide.title)}
            </figcaption>
          </figure>
        </div>
      )}

      {/* In-Content Primary Tool Callout Banner */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 min-w-0 max-w-full overflow-hidden">
        <div className="space-y-1 sm:space-y-1.5 max-w-xl min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-primary">
            {t('recommendedTool', 'Recommended Free Online Tool')}
          </span>
          <h3 className="text-base sm:text-xl font-bold text-base-content break-words">
            {t(getToolTranslationKey(guide.primaryToolSlug), guide.primaryToolName)}
          </h3>
          <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed break-words">
            {t('processInMemoryBadge', 'Process your files in memory directly in your browser with zero data retention or watermarks.')}
          </p>
        </div>

        <Link
          href={`/${guide.primaryToolSlug}`}
          className="btn btn-primary btn-md gap-2 font-semibold shadow-lg shadow-primary/25 w-full sm:w-auto shrink-0 justify-center text-center whitespace-normal h-auto min-h-[2.75rem] py-2.5 px-4 max-w-full"
        >
          <span className="break-words text-center leading-snug">{t(getToolTranslationKey(guide.primaryToolSlug), guide.primaryToolCtaText)}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </Link>
      </div>

      {/* Mobile Table of Contents Accordion (visible on < lg screens) */}
      {guide.tableOfContents && guide.tableOfContents.length > 0 && (
        <div className="block lg:hidden rounded-2xl bg-base-100 border border-base-300 shadow-xs overflow-hidden min-w-0 max-w-full">
          <details className="group">
            <summary className="p-4 flex items-center justify-between cursor-pointer list-none font-bold text-xs uppercase tracking-wider text-base-content/80 hover:text-primary transition-colors select-none">
              <span className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate">{t('tableOfContents', 'Table of Contents')} ({guide.tableOfContents.length})</span>
              </span>
              <ChevronDown className="w-4 h-4 text-base-content/50 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2" />
            </summary>
            <nav className="px-4 pb-4 pt-1 space-y-1.5 border-t border-base-200/80">
              {guide.tableOfContents.map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-start gap-2 text-xs text-base-content/75 hover:text-primary transition-colors py-1 leading-snug min-w-0"
                >
                  <span className="text-primary font-semibold shrink-0">{idx + 1}.</span>
                  <span className="break-words min-w-0 flex-1">{item.text}</span>
                </a>
              ))}
            </nav>
          </details>
        </div>
      )}

      {/* Main Content Grid: Article Sections + Sticky Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 min-w-0 max-w-full">
        {/* Article Body (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-12 min-w-0 max-w-full">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-3 sm:space-y-4 min-w-0 max-w-full overflow-hidden">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-base-content break-words whitespace-normal">
                {section.title}
              </h2>

              {section.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-base-content/80 leading-relaxed break-words">
                  {p}
                </p>
              ))}

              {/* Optional Callout Box */}
              {section.callout && (
                <div
                  className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border flex items-start gap-3 sm:gap-3.5 my-4 min-w-0 max-w-full overflow-hidden ${renderCalloutStyle(
                    section.callout.type
                  )}`}
                >
                  {renderCalloutIcon(section.callout.type)}
                  <div className="space-y-1 min-w-0 flex-1">
                    {section.callout.title && (
                      <h4 className="font-bold text-xs uppercase tracking-wider break-words">
                        {section.callout.title}
                      </h4>
                    )}
                    <p className="text-xs sm:text-sm leading-relaxed break-words">
                      {section.callout.text}
                    </p>
                  </div>
                </div>
              )}

              {/* Optional Step-by-Step Cards */}
              {section.steps && section.steps.length > 0 && (
                <div className="space-y-3 pt-2 min-w-0 max-w-full">
                  {section.steps.map((step) => (
                    <div
                      key={step.number}
                      className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-base-100 border border-base-300 flex items-start gap-3 sm:gap-4 shadow-xs min-w-0 max-w-full overflow-hidden"
                    >
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-primary text-primary-content font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {step.number}
                      </span>
                      <div className="space-y-1 min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-base-content break-words">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed break-words">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 pt-2 min-w-0 max-w-full">
                  {section.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-base-content/80 min-w-0">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="break-words min-w-0 flex-1">{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Frequently Asked Questions */}
          {guide.faqs && guide.faqs.length > 0 && (
            <div id="frequently-asked-questions" className="scroll-mt-24 pt-6 border-t border-base-300 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content break-words whitespace-normal">
                  {t('faqTitle', 'Frequently Asked Questions')}
                </h2>
              </div>
              <FAQSection faqs={guide.faqs} hideHeader />
            </div>
          )}

          {/* Secondary In-Content CTA */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-base-200/60 border border-base-300 text-center space-y-3 sm:space-y-4 min-w-0 max-w-full overflow-hidden">
            <h3 className="text-base sm:text-lg font-bold text-base-content break-words">
              {t('readyToOptimize', 'Ready to optimize your documents?')}
            </h3>
            <p className="text-xs sm:text-sm text-base-content/70 max-w-md mx-auto leading-relaxed break-words">
              {t('tryFreeToolsDesc', "Use JPGEASY's fast, free, and completely in-memory tools with no file upload limits or registration.")}
            </p>
            <Link
              href={`/${guide.primaryToolSlug}`}
              className="btn btn-primary btn-md gap-2 font-semibold w-full sm:w-auto justify-center inline-flex shadow-md shadow-primary/20 whitespace-normal h-auto min-h-[2.75rem] py-2.5 px-4 max-w-full text-center"
            >
              <span className="break-words text-center leading-snug">{guide.primaryToolCtaText || `${t('openTool', 'Use Tool')} - ${guide.primaryToolName}`}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Sticky Table of Contents & Quick Tools (Desktop only, 4 cols) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-8 min-w-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Table of Contents Card */}
            {guide.tableOfContents && guide.tableOfContents.length > 0 && (
              <div className="p-6 rounded-3xl bg-base-100 border border-base-300 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary shrink-0" />
                  <span>{t('tableOfContents', 'Table of Contents')}</span>
                </h3>
                <nav className="space-y-1.5">
                  {guide.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-base-content/70 hover:text-primary hover:translate-x-0.5 transition-all py-1 leading-snug"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Quick Launch Tool Card */}
            {primaryTool && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-base-100 border border-primary/20 space-y-3">
                <span className="badge badge-primary badge-xs">{t('instantTool', 'Instant Tool')}</span>
                <h4 className="font-bold text-sm text-base-content break-words">
                  {t(getToolTranslationKey(primaryTool.slug), primaryTool.name)}
                </h4>
                <p className="text-xs text-base-content/70 leading-relaxed break-words">
                  {t(`${getToolTranslationKey(primaryTool.slug)}Desc`, primaryTool.description)}
                </p>
                <Link
                  href={`/${primaryTool.slug}`}
                  className="btn btn-primary btn-sm w-full gap-2 mt-2"
                >
                  <span>{t('openTool', 'Use Tool Free')}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Bottom Article Ad Banner */}
      <AdSlot slot="article-bottom-banner" format="banner" className="my-6 sm:my-8" />

      {/* Related Guides Section */}
      {relatedGuides.length > 0 && (
        <div className="pt-8 sm:pt-12 border-t border-base-300 space-y-5 sm:space-y-6 min-w-0 max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 min-w-0">
            <h3 className="text-base sm:text-xl font-bold text-base-content break-words">
              {t('relatedGuidesTitle', 'Related Guides & Tutorials')}
            </h3>
            <Link
              href="/guides"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 self-start sm:self-auto shrink-0 transition-colors"
            >
              <span>{t('viewAllGuides', 'View all guides')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0 max-w-full">
            {relatedGuides.map((rel) => (
              <Link
                key={rel.slug}
                href={`/guides/${rel.slug}`}
                className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-base-100 border border-base-300 hover:border-primary/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0 max-w-full overflow-hidden"
              >
                <div className="space-y-2 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                    {t(rel.category, rel.categoryLabel)}
                  </span>
                  <h4 className="font-bold text-sm text-base-content group-hover:text-primary transition-colors leading-snug break-words">
                    {t(`${rel.slug}_title`, rel.title)}
                  </h4>
                  <p className="text-xs text-base-content/60 line-clamp-2 break-words">
                    {t(`${rel.slug}_desc`, rel.shortDescription)}
                  </p>
                </div>
                <div className="pt-3 text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{t('readGuide', 'Read guide')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <div className="pt-6 sm:pt-8 border-t border-base-300 space-y-4 sm:space-y-6 min-w-0 max-w-full">
          <h3 className="text-base sm:text-xl font-bold text-base-content break-words">
            {t('helpfulToolsMentioned', 'Helpful Tools Mentioned in This Guide')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 min-w-0 max-w-full">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
