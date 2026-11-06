import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import InvertColorsTool from '@/components/tools/InvertColorsTool';

const tool = getToolBySlug('invert-colors')!;

export const metadata: Metadata = {
  title: 'Invert Image Colors Online - Free Photo Negative Inverter',
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

export default function InvertColorsPage() {
  return (
    <ToolLayout tool={tool}>
      <InvertColorsTool />
    </ToolLayout>
  );
}
