import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import BlackAndWhiteTool from '@/components/tools/BlackAndWhiteTool';

const tool = getToolBySlug('black-and-white')!;

export const metadata: Metadata = {
  title: 'Black and White Image Converter - Convert Photos to B&W Online',
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

export default function BlackAndWhitePage() {
  return (
    <ToolLayout tool={tool}>
      <BlackAndWhiteTool />
    </ToolLayout>
  );
}
