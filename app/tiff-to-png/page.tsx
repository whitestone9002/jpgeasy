import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('tiff-to-png')!;

export const metadata: Metadata = {
  title: 'TIFF to PNG Converter Online Free - High Quality TIF to PNG',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/tiff-to-png',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function TiffToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="tiff" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
