import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ImageSplitterTool from '@/components/tools/ImageSplitterTool';

const tool = getToolBySlug('split-image')!;

export const metadata: Metadata = {
  title: 'Image Splitter - Split Image into 3x3 Grid & Tiles Online',
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

export default function ImageSplitterPage() {
  return (
    <ToolLayout tool={tool}>
      <ImageSplitterTool />
    </ToolLayout>
  );
}
