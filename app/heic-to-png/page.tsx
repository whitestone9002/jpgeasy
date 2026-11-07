import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('heic-to-png')!;

export const metadata: Metadata = {
  title: 'HEIC to PNG Converter Online Free - Convert iPhone Photos to Lossless PNG',
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

export default function HeicToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="heic" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
