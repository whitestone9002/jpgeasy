import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import BlurCensorTool from '@/components/tools/BlurCensorTool';

const tool = getToolBySlug('blur-image')!;

export const metadata: Metadata = {
  title: 'Blur & Censor Image Online - Blur Faces, Text & Sensitive Info',
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

export default function BlurCensorPage() {
  return (
    <ToolLayout tool={tool}>
      <BlurCensorTool />
    </ToolLayout>
  );
}
