import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('jfif-to-png')!;

export const metadata: Metadata = {
  title: 'JFIF to PNG Converter Online Free - Convert JFIF to Lossless PNG',
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

export default function JfifToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="jfif" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
