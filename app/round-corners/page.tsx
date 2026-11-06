import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import RoundCornersTool from '@/components/tools/RoundCornersTool';

const tool = getToolBySlug('round-corners')!;

export const metadata: Metadata = {
  title: 'Round Corners Image Online - Smooth Corner Radius Tool',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: `https://jpgeasy.com/${tool.slug}`,
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function RoundCornersPage() {
  return (
    <ToolLayout tool={tool}>
      <RoundCornersTool />
    </ToolLayout>
  );
}
