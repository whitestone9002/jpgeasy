import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('svg-to-webp')!;

export const metadata: Metadata = {
  title: 'SVG to WebP Converter Online Free - Convert Vector SVG to WebP',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/svg-to-webp',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function SvgToWebpPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="svg" targetFormat="webp" fixedTarget={true} />
    </ToolLayout>
  );
}
