'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, ChevronDown, Image, FileText, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <header className="w-full border-b border-base-300 bg-base-100/90 backdrop-blur-md transition-colors select-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0 shrink-0">
            <Link href="/" className="flex items-center group shrink-0" aria-label="JPGEasy Home">
              <div className="h-[20px] w-auto flex items-center justify-center group-hover:opacity-90 transition-opacity shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-light.png" alt="JPGEasy Logo" className="h-[20px] w-auto object-contain logo-light" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-dark.png" alt="JPGEasy Logo" className="h-[20px] w-auto object-contain logo-dark" />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
              {/* Image Tools Mega Menu */}
              <div className="dropdown dropdown-hover dropdown-bottom">
                <div
                  role="button"
                  tabIndex={0}
                  className="btn btn-ghost btn-sm font-medium gap-1 text-base-content/80 hover:text-base-content cursor-pointer whitespace-nowrap flex-nowrap shrink-0 px-2 xl:px-3"
                >
                  <Image className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="whitespace-nowrap">{t('imageTools', 'Image Tools')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-50 p-4 shadow-2xl bg-base-100 rounded-2xl w-[680px] xl:w-[720px] border border-base-300 grid grid-cols-3 gap-3.5 mt-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                >
                  {/* Column 1: Compress & Target Size */}
                  <div>
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mb-1.5 whitespace-nowrap">
                      {t('compressAndTarget', 'Compress & Target')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/compress-jpg" className="py-1.5 font-semibold text-primary">{t('compressJpg', 'Compress JPG / JPEG')}</Link></li>
                      <li><Link href="/compress-jpg-to-10kb" className="py-1.5 text-primary font-semibold">{t('compressJpg10kb', 'Compress JPG to 10KB')}</Link></li>
                      <li><Link href="/compress-jpg-to-20kb" className="py-1.5">{t('compressJpg20kb', 'Compress JPG to 20KB')}</Link></li>
                      <li><Link href="/compress-jpg-to-50kb" className="py-1.5">{t('compressJpg50kb', 'Compress JPG to 50KB')}</Link></li>
                      <li><Link href="/compress-jpg-to-100kb" className="py-1.5">{t('compressJpg100kb', 'Compress JPG to 100KB')}</Link></li>
                      <li><Link href="/compress-jpg-to-200kb" className="py-1.5">{t('compressJpg200kb', 'Compress JPG to 200KB')}</Link></li>
                      <li><Link href="/compress-jpg-to-500kb" className="py-1.5">{t('compressJpg500kb', 'Compress JPG to 500KB')}</Link></li>
                      <li><Link href="/compress-image" className="py-1.5 text-emerald-600 font-medium">{t('compressImage', 'General Compressor')}</Link></li>
                    </ul>
                  </div>

                  {/* Column 2: Resize, Edit & Popular Converters */}
                  <div className="border-l border-base-200 pl-3">
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mb-1.5 whitespace-nowrap">
                      {t('resizeAndEdit', 'Resize & Edit')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/resize-image" className="py-1.5 font-medium">{t('resizeImage', 'Resize Image')}</Link></li>
                      <li><Link href="/crop-image" className="py-1.5">{t('cropImage', 'Crop Image')}</Link></li>
                      <li><Link href="/rotate-image" className="py-1.5">{t('rotateImage', 'Rotate Image')}</Link></li>
                      <li><Link href="/flip-image" className="py-1.5">{t('flipImage', 'Flip Image')}</Link></li>
                    </ul>
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mt-2.5 mb-1.5 whitespace-nowrap">
                      {t('convertPopular', 'Popular Convert')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/jpg-to-png" className="py-1.5 font-medium text-primary">{t('jpgToPng', 'JPG to PNG')}</Link></li>
                      <li><Link href="/png-to-jpg" className="py-1.5 font-medium">{t('pngToJpg', 'PNG to JPG')}</Link></li>
                      <li><Link href="/jpg-to-webp" className="py-1.5">{t('jpgToWebp', 'JPG to WebP')}</Link></li>
                      <li><Link href="/png-to-webp" className="py-1.5">{t('pngToWebp', 'PNG to WebP')}</Link></li>
                      <li><Link href="/webp-to-jpg" className="py-1.5">{t('webpToJpg', 'WebP to JPG')}</Link></li>
                    </ul>
                  </div>

                  {/* Column 3: Format Converters */}
                  <div className="border-l border-base-200 pl-3">
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mb-1.5 whitespace-nowrap">
                      {t('formatConverters', 'Format Converters')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/heic-to-jpg" className="py-1.5 font-semibold text-primary">{t('heicToJpg', 'HEIC to JPG')}</Link></li>
                      <li><Link href="/webp-to-gif" className="py-1.5 font-medium text-teal-600">{t('webpToGif', 'WebP to GIF')}</Link></li>
                      <li><Link href="/webp-to-png" className="py-1.5">{t('webpToPng', 'WebP to PNG')}</Link></li>
                      <li><Link href="/avif-to-jpg" className="py-1.5">{t('avifToJpg', 'AVIF to JPG')}</Link></li>
                      <li><Link href="/avif-to-png" className="py-1.5">{t('avifToPng', 'AVIF to PNG')}</Link></li>
                      <li><Link href="/jfif-to-jpg" className="py-1.5">{t('jfifToJpg', 'JFIF to JPG')}</Link></li>
                      <li><Link href="/jfif-to-png" className="py-1.5">{t('jfifToPng', 'JFIF to PNG')}</Link></li>
                      <li><Link href="/svg-to-jpg" className="py-1.5">{t('svgToJpg', 'SVG to JPG')}</Link></li>
                      <li><Link href="/svg-to-png" className="py-1.5">{t('svgToPng', 'SVG to PNG')}</Link></li>
                      <li><Link href="/tiff-to-jpg" className="py-1.5">{t('tiffToJpg', 'TIFF to JPG')}</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Merged PDF Tools Dropdown (Organize + Convert) */}
              <div className="dropdown dropdown-hover dropdown-bottom">
                <div
                  role="button"
                  tabIndex={0}
                  className="btn btn-ghost btn-sm font-medium gap-1 text-base-content/80 hover:text-base-content cursor-pointer whitespace-nowrap flex-nowrap shrink-0 px-2 xl:px-3"
                >
                  <FileText className="w-4 h-4 text-purple-500 shrink-0" />
                  <span className="whitespace-nowrap">{t('pdfTools', 'PDF Tools')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-50 p-4 shadow-2xl bg-base-100 rounded-2xl w-[480px] border border-base-300 grid grid-cols-2 gap-4 mt-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                >
                  {/* Column 1: Organize & Manage */}
                  <div>
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mb-1.5 whitespace-nowrap">
                      {t('organizeEdit', 'Organize & Edit')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/organize-pdf" className="font-semibold text-primary py-1.5">{t('organizePdf', 'Visual Page Organizer')}</Link></li>
                      <li><Link href="/split-pdf" className="py-1.5">{t('splitPdf', 'Split PDF')}</Link></li>
                      <li><Link href="/merge-pdf" className="py-1.5">{t('mergePdf', 'Merge PDF')}</Link></li>
                      <li><Link href="/extract-pdf-pages" className="py-1.5">{t('extractPages', 'Extract PDF Pages')}</Link></li>
                      <li><Link href="/delete-pdf-pages" className="py-1.5">{t('deletePages', 'Delete PDF Pages')}</Link></li>
                      <li><Link href="/rotate-pdf" className="py-1.5">{t('rotatePdf', 'Rotate PDF')}</Link></li>
                      <li><Link href="/compress-pdf" className="py-1.5 text-emerald-600 font-medium">{t('compressPdf', 'Compress PDF')}</Link></li>
                    </ul>
                  </div>

                  {/* Column 2: Convert */}
                  <div className="border-l border-base-200 pl-4">
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mb-1.5 whitespace-nowrap">
                      {t('convertPdf', 'Convert PDF & OCR')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/pdf-to-png" className="py-1.5 font-medium text-primary">{t('pdfToPng', 'PDF to PNG')}</Link></li>
                      <li><Link href="/pdf-to-jpg" className="py-1.5">{t('pdfToJpg', 'PDF to JPG')}</Link></li>
                      <li><Link href="/pdf-ocr" className="py-1.5 font-medium text-teal-600">{t('pdfOcr', 'OCR Text Extractor')}</Link></li>
                      <li><Link href="/flatten-pdf" className="py-1.5">{t('flattenPdf', 'Flatten PDF')}</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Edit PDF & Convert to PDF Dropdown */}
              <div className="dropdown dropdown-hover dropdown-bottom">
                <div
                  role="button"
                  tabIndex={0}
                  className="btn btn-ghost btn-sm font-medium gap-1 text-base-content/80 hover:text-base-content cursor-pointer whitespace-nowrap flex-nowrap shrink-0 px-2 xl:px-3"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="whitespace-nowrap">{t('editPdf', 'Edit PDF')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-50 p-4 shadow-2xl bg-base-100 rounded-2xl w-[480px] border border-base-300 grid grid-cols-2 gap-4 mt-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                >
                  {/* Column 1: Edit & Security */}
                  <div>
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mb-1.5 whitespace-nowrap">
                      {t('editAndSecurity', 'Edit & Security')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/sign-pdf" className="text-xs font-semibold py-1.5 text-primary">{t('signPdf', 'Sign PDF (eSign)')}</Link></li>
                      <li><Link href="/add-page-numbers-to-pdf" className="text-xs font-medium py-1.5">{t('pageNumbers', 'Page Numbers')}</Link></li>
                      <li><Link href="/watermark-pdf" className="text-xs font-medium py-1.5">{t('watermarkPdf', 'Watermark PDF')}</Link></li>
                      <li><Link href="/crop-pdf" className="text-xs font-medium py-1.5">{t('cropPdf', 'Crop PDF')}</Link></li>
                      <li><Link href="/pdf-scanner" className="text-xs font-medium py-1.5 text-teal-600">{t('scanner', 'Camera Scanner')}</Link></li>
                    </ul>
                  </div>

                  {/* Column 2: Convert to PDF */}
                  <div className="border-l border-base-200 pl-4">
                    <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-2 block mb-1.5 whitespace-nowrap">
                      {t('convertToPdf', 'Convert to PDF')}
                    </span>
                    <ul className="menu menu-compact p-0 text-xs space-y-0.5">
                      <li><Link href="/image-to-pdf" className="py-1.5 font-semibold text-primary">{t('imageToPdf', 'Image to PDF')}</Link></li>
                      <li><Link href="/jpg-to-pdf" className="py-1.5">{t('jpgToPdf', 'JPG to PDF')}</Link></li>
                      <li><Link href="/webp-to-pdf" className="py-1.5">{t('webpToPdf', 'WebP to PDF')}</Link></li>
                      <li><Link href="/jfif-to-pdf" className="py-1.5">{t('jfifToPdf', 'JFIF to PDF')}</Link></li>
                      <li><Link href="/svg-to-pdf" className="py-1.5">{t('svgToPdf', 'SVG to PDF')}</Link></li>
                      <li><Link href="/tiff-to-pdf" className="py-1.5">{t('tiffToPdf', 'TIFF to PDF')}</Link></li>
                      <li><Link href="/html-to-pdf" className="py-1.5">{t('htmlToPdf', 'HTML to PDF')}</Link></li>
                      <li><Link href="/txt-to-pdf" className="py-1.5">{t('txtToPdf', 'TXT to PDF')}</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <Link
                href="/guides"
                className="hidden xl:inline-flex btn btn-ghost btn-sm font-medium text-base-content/80 hover:text-base-content whitespace-nowrap px-2"
              >
                {t('navGuides', 'Guides')}
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-base-200 hover:bg-base-300/80 border border-base-300 text-xs text-base-content/60 transition-colors whitespace-nowrap shrink-0"
              aria-label={t('searchTools', 'Search tools')}
            >
              <Search className="w-3.5 h-3.5 text-base-content/50 shrink-0" />
              <span className="hidden xl:inline whitespace-nowrap truncate max-w-[120px]">
                {t('searchPlaceholder', 'Search tools...')}
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-base-100 rounded border border-base-300 text-base-content/70">
                Ctrl K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden text-base-content shrink-0"
              aria-label={t('toggleNavMenu', 'Toggle navigation menu')}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-base-300 bg-base-100 p-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              <div className="font-semibold text-xs text-base-content/50 uppercase tracking-wider px-2 py-1">
                {t('imageTools', 'Popular Image Tools')}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Link href="/compress-jpg" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('compressJpg', 'Compress JPG')}</Link>
                <Link href="/compress-jpg-to-10kb" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-semibold text-primary hover:bg-base-200">{t('compressJpg10kb', 'JPG to 10KB')}</Link>
                <Link href="/resize-image" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('resizeImage', 'Resize Image')}</Link>
                <Link href="/jpg-to-png" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('jpgToPng', 'JPG to PNG')}</Link>
                <Link href="/png-to-jpg" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('pngToJpg', 'PNG to JPG')}</Link>
                <Link href="/image-to-pdf" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('imageToPdf', 'Image to PDF')}</Link>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-base-200">
              <div className="font-semibold text-xs text-base-content/50 uppercase tracking-wider px-2 py-1">
                {t('pdfTools', 'PDF Tools')}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Link href="/organize-pdf" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('organizePdf', 'Organize PDF')}</Link>
                <Link href="/merge-pdf" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('mergePdf', 'Merge PDF')}</Link>
                <Link href="/split-pdf" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('splitPdf', 'Split PDF')}</Link>
                <Link href="/pdf-ocr" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('pdfOcr', 'PDF OCR')}</Link>
                <Link href="/compress-pdf" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('compressPdf', 'Compress PDF')}</Link>
                <Link href="/sign-pdf" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-base-200">{t('signPdf', 'Sign PDF')}</Link>
              </div>
            </div>

            <div className="pt-2 border-t border-base-200 flex gap-2">
              <Link
                href="/guides"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-outline btn-sm flex-1"
              >
                {t('navGuides', 'Guides')}
              </Link>
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-primary btn-sm flex-1"
              >
                {t('navTools', 'Tools')}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpen={() => setIsSearchOpen(true)}
      />
    </>
  );
}
