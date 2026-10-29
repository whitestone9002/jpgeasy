import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('svg-to-png')!;

export const metadata: Metadata = {
  title: 'SVG to PNG Converter Online Free - Convert Vector SVG to Transparent PNG',
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

export default function SvgToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="svg" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
