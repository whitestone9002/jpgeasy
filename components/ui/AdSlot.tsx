'use client';

import React from 'react';

interface AdSlotProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'banner';
  className?: string;
}

/**
 * Clean AdSlot placeholder.
 * All third-party ad networks (Adsterra, Monetag) have been completely removed.
 * Ready for official Google AdSense integration once approved.
 */
export default function AdSlot(_props: AdSlotProps) {
  return null;
}
