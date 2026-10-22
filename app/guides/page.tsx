'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, ArrowRight, Sparkles, Image, FileText, PenTool, FileSpreadsheet, Clock, ArrowUpRight } from 'lucide-react';
import { GUIDES, GuideCategory, GUIDE_CATEGORIES } from '@/lib/config/guides';
import { TOOLS } from '@/lib/config/tools';
import { ICON_MAP } from '@/components/ui/ToolCard';
import { useLanguage, getToolTranslationKey } from '@/lib/i18n/LanguageContext';

export default function GuidesIndexPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'all'>('all');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const matchingTools = useMemo(() => {
    if (!normalizedQuery) return [];
    return TOOLS.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery) ||
        tool.slug.toLowerCase().includes(normalizedQuery) ||
        (tool.shortName && tool.shortName.toLowerCase().includes(normalizedQuery)) ||
        tool.category.toLowerCase().includes(normalizedQuery) ||
        tool.keywords.some((k) => k.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [normalizedQuery]);

  const matchingGuides = useMemo(() => {
    if (!normalizedQuery) return [];
    return GUIDES.filter((guide) => {
      return (
        guide.title.toLowerCase().includes(normalizedQuery) ||
        guide.shortDescription.toLowerCase().includes(normalizedQuery) ||
        guide.categoryLabel.toLowerCase().includes(normalizedQuery) ||
        guide.slug.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [normalizedQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (matchingTools.length > 0) {
        e.preventDefault();
        setIsSearchDropdownOpen(false);
        router.push(`/${matchingTools[0].slug}`);
      } else if (matchingGuides.length > 0) {
        e.preventDefault();
        setIsSearchDropdownOpen(false);
        router.push(`/guides/${matchingGuides[0].slug}`);
      }
    } else if (e.key === 'Escape') {
      setIsSearchDropdownOpen(false);
    }
  };

  const filteredGuides = useMemo(() => {
    return GUIDES.filter((guide) => {
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        guide.title.toLowerCase().includes(query) ||
        guide.shortDescription.toLowerCase().includes(query) ||
        guide.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredGuides = useMemo(() => {
    return GUIDES.filter((g) => g.featured);
  }, []);

  const getCategoryIcon = (cat: GuideCategory) => {
    switch (cat) {
      case 'image':
        return <Image className="w-4 h-4 text-blue-500" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'esign':
        return <PenTool className="w-4 h-4 text-emerald-500" />;
      case 'document':
        return <FileSpreadsheet className="w-4 h-4 text-amber-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16 space-y-10 sm:space-y-16 min-w-0">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 min-w-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>{t('learningCenter', 'JPGEASY Learning Center')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-base-content break-words leading-tight">
          {t('guidesTitle', 'Guides & How-To Articles')}
        </h1>
        <p className="text-xs sm:text-base text-base-content/70 leading-relaxed max-w-2xl mx-auto break-words">
          {t('guidesSubtitle', 'Learn how to compress, convert, edit, and optimize your images, PDFs, and documents with step-by-step tutorials, technical insights, and pro tips.')}
        </p>

        {/* Live Search Input with Instant Tool & Guide Dropdown */}
        <div className="pt-3 sm:pt-4 max-w-xl mx-auto relative z-30 min-w-0" ref={searchContainerRef}>
          <div className="relative flex items-center shadow-lg rounded-2xl bg-base-100 border border-base-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all min-w-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-base-content/40 ml-3 sm:ml-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchDropdownOpen(true);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setIsSearchDropdownOpen(true);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder={t('searchGuidesAndTools', 'Search tools and guides (e.g. compress, merge, convert)...')}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-transparent border-none outline-none text-xs sm:text-base text-base-content placeholder:text-base-content/40 rounded-2xl min-w-0"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchDropdownOpen(false);
                }}
                className="btn btn-ghost btn-xs btn-circle mr-2 sm:mr-3 shrink-0"
              >
                ✕
              </button>
            )}
          </div>

          {/* Instant Search Results Dropdown */}
          {isSearchDropdownOpen && normalizedQuery.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-base-100 border border-base-300 rounded-2xl shadow-2xl overflow-hidden z-50 text-left max-h-[60vh] sm:max-h-[460px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
              {matchingTools.length === 0 && matchingGuides.length === 0 ? (
                <div className="py-8 text-center text-base-content/50 px-4">
                  <p className="text-sm font-medium">{t('noResultsMatching', 'No tools or guides found matching')} &quot;{searchQuery}&quot;</p>
                  <p className="text-xs mt-1">{t('trySearchGuidesSuggestions', 'Try searching for "compress", "pdf", "jpg", or "convert".')}</p>
                </div>
              ) : (
                <div className="p-2 space-y-3">
                  {/* Matching Tools Section */}
                  {matchingTools.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-base-content/50 flex items-center justify-between">
                        <span>{t('toolsSection', 'Tools & Utilities')}</span>
                        <span className="badge badge-xs badge-primary font-medium">{matchingTools.length}</span>
                      </div>
                      <div className="divide-y divide-base-200">
                        {matchingTools.slice(0, 5).map((tool) => {
                          const toolKey = getToolTranslationKey(tool.slug);
                          const toolName = t(toolKey, tool.name);
                          const toolDesc = t(`${toolKey}Desc`, tool.description);
                          return (
                            <Link
                              key={tool.id}
                              href={`/${tool.slug}`}
                              onClick={() => setIsSearchDropdownOpen(false)}
                              className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl hover:bg-base-200/80 transition-colors group cursor-pointer min-w-0"
                            >
                              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                                <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                  {ICON_MAP[tool.icon] || <FileText className="w-4 h-4 text-primary" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-xs sm:text-sm text-base-content group-hover:text-primary transition-colors truncate">
                                      {toolName}
                                    </span>
                                    {tool.badge && (
                                      <span className="badge badge-xs badge-primary font-medium shrink-0">
                                        {tool.badge === 'Popular' ? t('badgePopular', 'Popular') : tool.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] sm:text-xs text-base-content/60 line-clamp-1">
                                    {toolDesc}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-base-content/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matching Guides Section */}
                  {matchingGuides.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-base-content/50 flex items-center justify-between">
                        <span>{t('guidesSection', 'Guides & Articles')}</span>
                        <span className="badge badge-xs badge-secondary font-medium">{matchingGuides.length}</span>
                      </div>
                      <div className="divide-y divide-base-200">
                        {matchingGuides.slice(0, 5).map((guide) => (
                          <Link
                            key={guide.slug}
                            href={`/guides/${guide.slug}`}
                            onClick={() => setIsSearchDropdownOpen(false)}
                            className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl hover:bg-base-200/80 transition-colors group cursor-pointer min-w-0"
                          >
                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <BookOpen className="w-4 h-4 text-secondary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-xs sm:text-sm text-base-content group-hover:text-primary transition-colors truncate">
                                    {t(guide.slug, guide.title)}
                                  </span>
                                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-base-200 text-base-content/60 shrink-0">
                                    {t(`guideCat_${guide.category}`, guide.categoryLabel)}
                                  </span>
                                </div>
                                <p className="text-[11px] sm:text-xs text-base-content/60 line-clamp-1">
                                  {t(`${guide.slug}_desc`, guide.shortDescription)}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-base-content/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer summary */}
              {(matchingTools.length > 0 || matchingGuides.length > 0) && (
                <div className="px-4 py-2 bg-base-200/50 border-t border-base-300 flex items-center justify-between text-xs text-base-content/50">
                  <span className="truncate mr-2">
                    {matchingTools.length + matchingGuides.length} {t('totalResultsFound', 'results found')} ({matchingTools.length} {t('toolsCount', 'tools')}, {matchingGuides.length} {t('guidesCount', 'guides')})
                  </span>
                  <span className="text-[11px] font-medium text-primary shrink-0">
                    {t('clickToNavigate', 'Click to open')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-content shadow-md shadow-primary/20'
              : 'bg-base-200 hover:bg-base-300 text-base-content/80'
          }`}
        >
          {t('allGuides', 'All Guides')} ({GUIDES.length})
        </button>

        {GUIDE_CATEGORIES.map((cat) => {
          const count = GUIDES.filter((g) => g.category === cat.id).length;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-primary text-primary-content shadow-md shadow-primary/20'
                  : 'bg-base-200 hover:bg-base-300 text-base-content/80'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{t(cat.id, cat.label)}</span>
              <span className={`text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-base-300 text-base-content/60'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Section (Shown when no search query and All categories selected) */}
      {!searchQuery && selectedCategory === 'all' && featuredGuides.length > 0 && (
        <div className="space-y-4 sm:space-y-6 min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-lg sm:text-2xl font-bold text-base-content">
              {t('featuredGuides', 'Featured How-To Guides')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredGuides.slice(0, 3).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group relative flex flex-col p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-base-100 to-base-200/50 border border-base-300 shadow-xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 min-w-0"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(guide.category)}
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-base-content/60">
                      {t(guide.category, guide.categoryLabel)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-base-content/50">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-base-content group-hover:text-primary transition-colors leading-snug mb-2 break-words">
                  {t(`${guide.slug}_title`, guide.title)}
                </h3>

                <p className="text-xs text-base-content/70 leading-relaxed mb-4 sm:mb-6 flex-1 line-clamp-3 break-words">
                  {t(`${guide.slug}_desc`, guide.shortDescription)}
                </p>

                <div className="flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <span>{t('readFullGuide', 'Read full guide')}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Guides Grid */}
      <div className="space-y-4 sm:space-y-6 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-2xl font-bold text-base-content">
            {selectedCategory === 'all'
              ? t('allArticles', 'All Articles & Tutorials')
              : t(selectedCategory, GUIDE_CATEGORIES.find((c) => c.id === selectedCategory)?.label || '')}
          </h2>
          <span className="text-xs text-base-content/50">
            {filteredGuides.length} {filteredGuides.length === 1 ? t('guide', 'guide') : t('guides', 'guides')}
          </span>
        </div>

        {filteredGuides.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4 bg-base-100 rounded-2xl sm:rounded-3xl border border-base-300">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-base-content/30 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-base-content mb-1">{t('noGuidesFound', 'No guides found')}</h3>
            <p className="text-xs text-base-content/60 max-w-sm mx-auto">
              {t('noGuidesDesc', "We couldn't find any tutorials matching this search. Try another search term or reset category filters.")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-base-100 border border-base-300 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all duration-200 min-w-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(guide.category)}
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                      {t(guide.category, guide.categoryLabel)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-base-content/50">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-base-content group-hover:text-primary transition-colors leading-snug mb-2 break-words">
                  {t(`${guide.slug}_title`, guide.title)}
                </h3>

                <p className="text-xs text-base-content/70 leading-relaxed mb-4 sm:mb-6 flex-1 line-clamp-3 break-words">
                  {t(`${guide.slug}_desc`, guide.shortDescription)}
                </p>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-base-200/80 text-xs">
                  <span className="text-[10px] sm:text-[11px] text-base-content/50">
                    {guide.updatedAt}
                  </span>
                  <span className="font-semibold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {t('read', 'Read')} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Popular Tools Callout Section */}
      <div className="p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-base-200/50 border border-base-300 space-y-4 sm:space-y-6 min-w-0">
        <div className="max-w-2xl min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold text-base-content mb-1 sm:mb-2 break-words">
            {t('tryFreeTools', 'Try Our Free Privacy-First Tools')}
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed break-words">
            {t('tryFreeToolsDesc', 'Every tutorial is backed by our instant in-browser utilities. 100% in-memory, free forever, no signup required.')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {[
            { key: 'compressJpg', fallback: 'Compress JPG', slug: 'compress-jpg' },
            { key: 'compressJpg10kb', fallback: 'JPG to 10KB', slug: 'compress-jpg-to-10kb' },
            { key: 'mergePdf', fallback: 'Merge PDF', slug: 'merge-pdf' },
            { key: 'compressPdf', fallback: 'Compress PDF', slug: 'compress-pdf' },
            { key: 'signPdf', fallback: 'Sign PDF', slug: 'sign-pdf' },
            { key: 'pdfToJpg', fallback: 'PDF to JPG', slug: 'pdf-to-jpg' },
          ].map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-base-100 border border-base-300 hover:border-primary/50 text-xs font-semibold text-base-content group transition-colors min-w-0"
            >
              <span className="truncate mr-1">{t(tool.key, tool.fallback)}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-base-content/40 group-hover:text-primary transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}