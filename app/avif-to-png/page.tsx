import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('avif-to-png')!;

export const metadata: Metadata = {
  title: 'AVIF to PNG Converter Online Free - Convert AVIF to Transparent PNG',
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

export default function AvifToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="avif" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
