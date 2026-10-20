'use client';

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'banner';
  className?: string;
}

export default function AdSlot({
  slot = 'default',
  format = 'horizontal',
  className = '',
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = adRef.current;
    if (!container) return;

    // Prevent duplicate injections
    if (container.hasChildNodes()) return;

    try {
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.innerHTML = `
        atOptions = {
          'key' : 'a61038487fdc168619ceab6281769008',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = 'https://www.highrevenueformat.com/a61038487fdc168619ceab6281769008/invoke.js';

      container.appendChild(confScript);
      container.appendChild(invokeScript);
    } catch (_) {}
  }, []);

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center text-center overflow-hidden transition-all ${className}`}
      data-ad-slot={slot}
    >
      <div className="w-full flex flex-col items-center justify-center overflow-x-auto py-1">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-base-content/40 mb-1 select-none">
          Advertisement
        </span>
        <div
          ref={adRef}
          className="min-h-[90px] w-full max-w-[728px] flex items-center justify-center overflow-hidden"
        />
      </div>
    </div>
  );
}
