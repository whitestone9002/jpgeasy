import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import MakeTransparentTool from '@/components/tools/MakeTransparentTool';

const tool = getToolBySlug('make-transparent')!;

export const metadata: Metadata = {
  title: 'Make Image Transparent Online - Free Background Color Eraser',
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

export default function MakeTransparentPage() {
  return (
    <ToolLayout tool={tool}>
      <MakeTransparentTool />
    </ToolLayout>
  );
}
