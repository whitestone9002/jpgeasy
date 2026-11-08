import React from 'react';
import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/config/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import ConverterTool from '@/components/tools/ConverterTool';

const tool = getToolBySlug('bmp-to-png')!;

export const metadata: Metadata = {
  title: 'BMP to PNG Converter Online Free - Convert Bitmap to PNG',
  description: tool.description,
  keywords: tool.keywords,
  alternates: {
    canonical: 'https://jpgeasy.com/bmp-to-png',
  },
  openGraph: {
    title: `${tool.name} - JPGEASY Tools`,
    description: tool.description,
  },
};

export default function BmpToPngPage() {
  return (
    <ToolLayout tool={tool}>
      <ConverterTool sourceFormat="any" targetFormat="png" fixedTarget={true} />
    </ToolLayout>
  );
}
