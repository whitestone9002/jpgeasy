'use client';

import React, { useState } from 'react';
import { Link2, Check, Share2 } from 'lucide-react';

interface SocialShareBarProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function SocialShareBar({
  url,
  title = 'JPGEASY - Free Online Image & PDF Tools',
  description = 'Fast, free, and 100% private in-browser image compression and PDF tools.',
  className = '',
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://jpgeasy.com');
  const shareText = `${title} — 100% free & private on JPGEASY:`;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or not supported
      }
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-neutral-900 hover:text-white hover:border-neutral-900 dark:hover:bg-white dark:hover:text-black dark:hover:border-white',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-[#E60023] hover:text-white hover:border-[#E60023]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.056.235-.188.285-.433.171-1.614-.752-2.624-3.112-2.624-5.01 0-4.08 2.964-7.828 8.549-7.828 4.488 0 7.977 3.2 7.977 7.474 0 4.46-2.812 8.049-6.716 8.049-1.312 0-2.545-.682-2.967-1.488l-.809 3.085c-.293 1.129-1.087 2.544-1.618 3.407C9.317 23.819 10.627 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-base-200/70 border border-base-300/80 shadow-sm backdrop-blur-sm ${className}`}>
      <span className="text-[11px] sm:text-xs font-semibold text-base-content/60 mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5 text-primary" />
        <span className="hidden sm:inline">Share:</span>
      </span>

      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${item.name}`}
          aria-label={`Share on ${item.name}`}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-base-content/75 bg-base-100 border border-base-300/60 shadow-2xs transition-all duration-200 hover:scale-110 active:scale-95 ${item.color}`}
        >
          {item.icon}
        </a>
      ))}

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? 'Copied to clipboard!' : 'Copy link'}
        aria-label="Copy link"
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border shadow-2xs transition-all duration-200 hover:scale-110 active:scale-95 ${
          copied
            ? 'bg-emerald-500 text-white border-emerald-500 ring-2 ring-emerald-500/30'
            : 'bg-base-100 text-base-content/75 border-base-300/60 hover:bg-primary hover:text-white hover:border-primary'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>

      {/* Copied notification text */}
      {copied && (
        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in pl-0.5 pr-1">
          Copied!
        </span>
      )}
    </div>
  );
}
