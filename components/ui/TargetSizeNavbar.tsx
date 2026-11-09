'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

interface TargetSizeNavbarProps {
  currentSlug: string;
}

interface TargetSizeOption {
  label: string;
  slug: string;
  kb: number;
}

const JPG_SIZES: TargetSizeOption[] = [
  { label: '10 KB', slug: 'compress-jpg-to-10kb', kb: 10 },
  { label: '15 KB', slug: 'compress-jpg-to-15kb', kb: 15 },
  { label: '20 KB', slug: 'compress-jpg-to-20kb', kb: 20 },
  { label: '30 KB', slug: 'compress-jpg-to-30kb', kb: 30 },
  { label: '40 KB', slug: 'compress-jpg-to-40kb', kb: 40 },
  { label: '50 KB', slug: 'compress-jpg-to-50kb', kb: 50 },
  { label: '100 KB', slug: 'compress-jpg-to-100kb', kb: 100 },
  { label: '200 KB', slug: 'compress-jpg-to-200kb', kb: 200 },
  { label: '300 KB', slug: 'compress-jpg-to-300kb', kb: 300 },
  { label: '500 KB', slug: 'compress-jpg-to-500kb', kb: 500 },
  { label: '1 MB', slug: 'compress-jpg-to-1mb', kb: 1024 },
  { label: '2 MB', slug: 'compress-jpg-to-2mb', kb: 2048 },
];

const PNG_SIZES: TargetSizeOption[] = [
  { label: '10 KB', slug: 'compress-png-to-10kb', kb: 10 },
  { label: '20 KB', slug: 'compress-png-to-20kb', kb: 20 },
  { label: '30 KB', slug: 'compress-png-to-30kb', kb: 30 },
  { label: '50 KB', slug: 'compress-png-to-50kb', kb: 50 },
  { label: '100 KB', slug: 'compress-png-to-100kb', kb: 100 },
  { label: '200 KB', slug: 'compress-png-to-200kb', kb: 200 },
  { label: '500 KB', slug: 'compress-png-to-500kb', kb: 500 },
  { label: '1 MB', slug: 'compress-png-to-1mb', kb: 1024 },
];

const PDF_SIZES: TargetSizeOption[] = [
  { label: '100 KB', slug: 'compress-pdf-to-100kb', kb: 100 },
  { label: '200 KB', slug: 'compress-pdf-to-200kb', kb: 200 },
  { label: '300 KB', slug: 'compress-pdf-to-300kb', kb: 300 },
  { label: '400 KB', slug: 'compress-pdf-to-400kb', kb: 400 },
  { label: '500 KB', slug: 'compress-pdf-to-500kb', kb: 500 },
  { label: '1 MB', slug: 'compress-pdf-to-1mb', kb: 1024 },
  { label: '2 MB', slug: 'compress-pdf-to-2mb', kb: 2048 },
];

const IMAGE_SIZES: TargetSizeOption[] = [
  { label: '20 KB', slug: 'compress-image-to-20kb', kb: 20 },
  { label: '50 KB', slug: 'compress-image-to-50kb', kb: 50 },
  { label: '100 KB', slug: 'compress-image-to-100kb', kb: 100 },
  { label: '200 KB', slug: 'compress-image-to-200kb', kb: 200 },
  { label: '500 KB', slug: 'compress-image-to-500kb', kb: 500 },
];

export default function TargetSizeNavbar({ currentSlug }: TargetSizeNavbarProps) {
  const router = useRouter();

  let formatLabel = '';
  let sizes: TargetSizeOption[] = [];

  if (currentSlug.includes('jpg') || currentSlug.includes('jpeg')) {
    formatLabel = 'Target JPG Size';
    sizes = JPG_SIZES;
  } else if (currentSlug.includes('png')) {
    formatLabel = 'Target PNG Size';
    sizes = PNG_SIZES;
  } else if (currentSlug.includes('pdf')) {
    formatLabel = 'Target PDF Size';
    sizes = PDF_SIZES;
  } else if (currentSlug.includes('image') || currentSlug.includes('photo')) {
    formatLabel = 'Target Image Size';
    sizes = IMAGE_SIZES;
  }

  // Only render if this tool belongs to a target compression format
  if (sizes.length === 0) return null;

  return (
    <div className="w-full mb-3 sm:mb-4 bg-base-100/90 rounded-2xl border border-base-300/80 p-2.5 sm:p-3 shadow-xs">
      {/* 1. Mobile Version: Sleek Dropdown (< sm) */}
      <div className="sm:hidden flex items-center justify-between gap-2.5">
        <label
          htmlFor="target-size-dropdown"
          className="text-xs font-bold text-base-content/80 flex items-center gap-1.5 shrink-0"
        >
          <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{formatLabel}:</span>
        </label>
        <div className="flex-1 max-w-[220px]">
          <select
            id="target-size-dropdown"
            value={currentSlug}
            onChange={(e) => {
              if (e.target.value && e.target.value !== currentSlug) {
                router.push(`/${e.target.value}`);
              }
            }}
            className="select select-sm select-bordered w-full text-xs font-semibold bg-base-200/70 border-base-300 focus:border-primary focus:outline-none rounded-xl"
            aria-label="Select target compression size"
          >
            {sizes.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label} (Exact limit)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Desktop Version: Pill Buttons (sm and up) */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>{formatLabel}: Quick Switch</span>
          </span>
          <span className="text-[10px] text-base-content/50">
            Click any size to compress to exact KB limits
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-base-300 no-scrollbar">
          {sizes.map((item) => {
            const isActive = currentSlug === item.slug;
            if (isActive) {
              return (
                <span
                  key={item.slug}
                  className="btn btn-xs sm:btn-sm btn-primary shrink-0 shadow-xs font-bold text-xs pointer-events-none"
                >
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                title={`Compress to ${item.label}`}
                className="btn btn-xs sm:btn-sm btn-ghost bg-base-200/60 hover:bg-primary/10 hover:text-primary hover:border-primary/40 border border-base-300/60 shrink-0 font-medium text-xs transition-all"
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
