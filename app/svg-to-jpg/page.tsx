import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('svg-to-jpg')!;

export const metadata: Metadata = {
  title: 'SVG to JPG Converter Online Free - Convert Vector SVG to High-Res JPG',
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

export default function SvgToJpgPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="svg" targetFormat="jpeg" fixedTarget={true} />
    </ToolLayout>
  );
}
