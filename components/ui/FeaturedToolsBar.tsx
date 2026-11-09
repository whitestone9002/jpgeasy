'use client';

import React from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';

interface FeaturedToolsBarProps {
  currentSlug?: string;
}

const FEATURED_ITEMS = [
  { label: 'JPG to PNG', slug: 'jpg-to-png', icon: '🔄' },
  { label: 'Compress 10KB', slug: 'compress-jpg-to-10kb', icon: '⚡' },
  { label: 'Merge PDF', slug: 'merge-pdf', icon: '🔀' },
  { label: 'Add Page Numbers', slug: 'add-page-numbers-to-pdf', icon: '🔢' },
  { label: 'PDF OCR', slug: 'pdf-ocr', icon: '🔍' },
  { label: 'Organize PDF', slug: 'organize-pdf', icon: '📑' },
  { label: 'Circle Crop', slug: 'circle-crop', icon: '✂️' },
  { label: 'PDF Scanner', slug: 'pdf-scanner', icon: '📷' },
  { label: 'Flip Image', slug: 'flip-image', icon: '↔️' },
];

export default function FeaturedToolsBar({ currentSlug }: FeaturedToolsBarProps) {
  return (
    <div className="w-full bg-base-100/60 border-b border-base-300/60 py-2 px-3 select-none">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0 text-primary font-bold text-xs uppercase tracking-wider pr-1">
          <Flame className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="hidden sm:inline">Featured:</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {FEATURED_ITEMS.map((item) => {
            const isCurrent = currentSlug === item.slug;
            return (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-primary text-primary-content border-primary font-semibold shadow-xs'
                    : 'bg-base-200/50 hover:bg-base-200 border-base-300 text-base-content/80 hover:text-primary font-medium'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
