import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('gif-to-png')!;

export const metadata: Metadata = {
  title: 'GIF to PNG Converter Online Free - Convert GIF to Transparent PNG',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/gif-to-png',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function GifToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="any" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
