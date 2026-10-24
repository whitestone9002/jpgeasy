'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Cpu, 
  Lock, 
  FileCheck2, 
  Users, 
  ServerOff,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Hero Header */}
      <div className="space-y-4 text-center sm:text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          {t('aboutBadge', 'About JPGEASY')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-base-content tracking-tight">
          Privacy-First File Utilities Built for Pure Speed.
        </h1>
        <p className="text-base sm:text-lg text-base-content/70 leading-relaxed">
          JPGEASY was engineered to eliminate bloated, ad-ridden, and privacy-invasive document tools. 
          We believe converting, compressing, and editing files should be instant, free, and 100% confidential.
        </p>
      </div>

      {/* Mission & Background */}
      <div className="p-8 sm:p-10 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2.5">
          <Users className="w-6 h-6 text-primary shrink-0" />
          Who We Are & Our Mission
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-base-content/80 leading-relaxed">
          <p>
            Developed by <strong>White Stone</strong>, JPGEASY was founded with a singular focus: to give students, job applicants, remote professionals, and everyday web users a transparent, reliable suite of document and image utilities without paywalls or privacy trade-offs.
          </p>
          <p>
            Every day, millions of people need to compress a photograph to an exact 20KB threshold for a government job portal, convert scanned contracts to searchable PDFs, or resize biometric images for visa applications. Yet most online tools force users to register accounts, place ugly watermarks on downloads, throttle processing speeds, or silently store sensitive personal documents on remote cloud servers.
          </p>
          <p>
            JPGEASY changes this paradigm entirely by running file operations <strong>directly in your browser memory</strong>. When you use our tools, your private files never touch permanent remote storage.
          </p>
        </div>
      </div>

      {/* Core Privacy & Architecture */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-primary shrink-0" />
            Our In-Memory Technology Stack
          </h2>
          <p className="text-sm text-base-content/70">
            How we deliver unmatched speed while guaranteeing absolute document privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ServerOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-base-content">Zero Server Storage</h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Your files are loaded into volatile browser RAM buffers and client-side workers. They are never written to permanent disks, cloud databases, or external third-party storage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-base-content">Client-Side WebAssembly</h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              By utilizing HTML5 Canvas, modern WebAssembly, and local JavaScript engines, your images and PDFs are processed natively at computer-hardware speed with zero network lag.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-base-100 border border-base-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-base-content">Instant Memory Purge</h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Once you finish editing or downloading your processed image or PDF document, the memory buffer is immediately destroyed by your browser's garbage collection.
            </p>
          </div>
        </div>
      </div>

      {/* Our 4 Core Guarantees */}
      <div className="p-8 sm:p-10 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
          The JPGEASY Promise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="flex gap-3.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-base-content">No Hidden Paywalls or Subscriptions</h4>
              <p className="text-xs sm:text-sm text-base-content/70">
                All 44 core image and PDF tools are free to use without limits or premium tiers.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-base-content">No Watermarks Ever</h4>
              <p className="text-xs sm:text-sm text-base-content/70">
                Your processed images, compressed documents, and exported PDFs remain 100% clean and professional.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-base-content">No Account or Registration Required</h4>
              <p className="text-xs sm:text-sm text-base-content/70">
                Use any utility instantly. We do not demand email addresses, passwords, or personal credentials.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-base-content">Strict Editorial & Portal Accuracy</h4>
              <p className="text-xs sm:text-sm text-base-content/70">
                Our 300+ guides are meticulously maintained to match official exam guidelines, visa requirements, and dimension standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Guidelines */}
      <div className="p-8 sm:p-10 rounded-3xl bg-base-100 border border-base-300 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2.5">
          <FileCheck2 className="w-6 h-6 text-primary shrink-0" />
          Editorial & Research Standards
        </h2>
        <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
          Every guide and tutorial published in our <Link href="/guides" className="text-primary font-semibold hover:underline">Guides Directory</Link> is researched against real-world technical documentation—including government recruitment portal specifications (e.g., UPSC, SSC, GATE), consular biometric standards (e.g., US DS-160, Schengen Visa), and e-commerce optimization guidelines (Shopify, Etsy, Amazon). We regularly review and update our instructions to ensure maximum accuracy for our global users.
        </p>
      </div>

      {/* Call to Action */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-base-100 to-base-200 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-base-content">Explore Our Free Tools</h3>
          <p className="text-xs sm:text-sm text-base-content/70">
            Browse our full suite of 44 online image and PDF processing tools.
          </p>
        </div>
        <Link 
          href="/tools" 
          className="btn btn-primary btn-sm sm:btn-md gap-2 rounded-xl shadow-sm text-white"
        >
          View All Tools
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
