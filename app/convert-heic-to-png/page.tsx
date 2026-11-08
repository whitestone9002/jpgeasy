import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('convert-heic-to-png')!;

export const metadata: Metadata = {
  title: 'Convert HEIC to PNG Online Free - Apple iPhone Photo Converter',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/heic-to-png',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function ConvertHeicToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="heic" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
